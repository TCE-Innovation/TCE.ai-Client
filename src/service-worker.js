/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Required to keep somewhere in file, but we don't want to use...
// eslint-disable-next-line no-unused-vars
const ignored = self.__WB_MANIFEST;

self.skipWaiting()
clientsClaim();

// define URLs to cache  
const urls = [
  '/',
]

// Set up App Shell-style routing to cache urls 
registerRoute(
  ({ request, url }) => {

    // eslint-disable-next-line no-unused-vars
    const ignored = request;

    // don't cache subway map, because only shown on web (not essential for tool)
    if (url.pathname.startsWith('/images/blurred_subway_map.png')) { return false; }

    // Check if url.pathname starts with any URL in urls
    if (urls.some(cacheUrl => url.pathname.startsWith(cacheUrl))) {
      return true;
    }

    if (url.pathname.startsWith('/static/css/main.')) { return true; }
    if (url.pathname.startsWith('/static/js/main.')) { return true; }

    // Do not cache if not in urls...
    return false;
  },
  new StaleWhileRevalidate({
    cacheName: 'CalculatorCache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100, // Adjust as necessary
        maxAgeSeconds: 100 * 365 * 24 * 60 * 60, // 100 years
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