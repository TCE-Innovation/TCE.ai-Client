/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkOnly } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';

// Required to keep somewhere in file, but activate it properly
const manifest = self.__WB_MANIFEST;
precacheAndRoute(manifest);

self.skipWaiting();
clientsClaim();

// Define app shell routes to cache (adjust based on your app's essential URLs)
const urls = [
  '/',
  '/index.html',
  '/static/js/',
  '/static/css/'
];

// Define exclusions - files that should NEVER be cached
const exclusions = [
  '/images/blurred_subway_map.png'
];

// Cache app shell resources
registerRoute(
  ({ request, url }) => {
    // First check exclusions - if it matches an exclusion, don't cache it
    if (exclusions.some(exclusion => url.pathname.endsWith(exclusion))) {
      return false;
    }
    
    // Cache static assets
    if (request.destination === 'style' || 
        request.destination === 'script' || 
        request.destination === 'font') {
      return true;
    }

    // Check essential URLs
    if (urls.some(cacheUrl => url.pathname.startsWith(cacheUrl))) {
      return true;
    }

    return false;
  },
  new CacheFirst({
    cacheName: 'app-shell-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, 
        maxAgeSeconds: 100 * 365 * 24 * 60 * 60, // 100 years
        purgeOnQuotaError: true // Auto-cleanup if storage is full
      }),
    ],
  })
);

// Cache dynamic content
registerRoute(
  ({ request, url }) => {
    // Don't cache the excluded image
    if (exclusions.some(exclusion => url.pathname.endsWith(exclusion))) {
      return false;
    }
    
    return request.destination === 'image';
  },
  new StaleWhileRevalidate({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 100 * 365 * 24 * 60 * 60, // 100 years
      }),
    ],
  })
);

// Add a specific route for excluded files to ensure they're always fetched from network
registerRoute(
  ({ url }) => exclusions.some(exclusion => url.pathname.endsWith(exclusion)),
  new NetworkOnly()
);

// Add offline fallback route
const networkOnly = new NavigationRoute(
  new StaleWhileRevalidate({
    cacheName: 'navigations',
  })
);
registerRoute(networkOnly);

// Listen for message events from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CONNECTION_STATUS') {
    // Broadcast connection status to all clients
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'CONNECTION_STATUS_UPDATE',
          online: event.data.online
        });
      });
    });
  }
});

// Add event listener for online/offline status changes
self.addEventListener('fetch', (event) => {
  // Only handle navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    const isOnline = self.navigator.onLine;
    
    // Broadcast to all clients when online status changes
    if (typeof self._lastOnlineStatus === 'undefined' || self._lastOnlineStatus !== isOnline) {
      self._lastOnlineStatus = isOnline;
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'CONNECTION_STATUS_UPDATE',
            online: isOnline
          });
        });
      });
    }
  }
});