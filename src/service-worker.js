/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';

// Required to keep somewhere in file, but we don't want to use...
// eslint-disable-next-line no-unused-vars
const ignored = self.__WB_MANIFEST;

self.skipWaiting()
clientsClaim();

const longTermUrls = [
  '/icons/TCE_192.png',
  '/icons/TCE_512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon.ico',
  '/translations.json',
]

// define specific URLs to cache  
const shortTermUrls = [
  '/apps/clearance-calculator',
  '/clearance-manifest.json',
  '/static/js/bundle.js',
  '/service-worker.js',
]

// Set up App Shell-style routing to cache shortTermUrls
registerRoute(
  ({ request, url }) => {

    // eslint-disable-next-line no-unused-vars
    const ignored = request;

    // Check if url.pathname starts with any URL in shortTermUrls
    if (shortTermUrls.some(cacheUrl => url.pathname.startsWith(cacheUrl))) {
      return true;
    }

    if (url.pathname.startsWith('/static/css/main.')) { return true; }
    if (url.pathname.startsWith('/static/js/main.')) { return true; }

    // Do not cache if not in shortTermUrls...
    return false;
  },
  new StaleWhileRevalidate({
    cacheName: 'DynamicClearanceCache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100, // Adjust as necessary
        maxAgeSeconds: 100 * 365 * 24 * 60 * 60, // 100 year
      }),
    ]
  })
);

// Set up App Shell-style routing to cache longTermUrls
registerRoute(
  ({ request, url }) => {

    // eslint-disable-next-line no-unused-vars
    const ignored = request;

    // Check if url.pathname starts with any URL in longTermUrls
    if (longTermUrls.some(cacheUrl => url.pathname.startsWith(cacheUrl))) {
      return true;
    }

    // Do not cache if not in urlsToCache...
    return false;
  },
  new CacheFirst({
    cacheName: 'StaticClearanceCache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100, // Adjust as necessary
        maxAgeSeconds: 100 * 365 * 24 * 60 * 60, // 100 year
      }),
    ]
  })
);

// This allows the web app to trigger skipWaiting via
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
