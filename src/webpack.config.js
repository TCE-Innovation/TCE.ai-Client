// webpack.config.js

const { WorkboxPlugin } = require('workbox-webpack-plugin');

module.exports = {
  // ...other webpack configurations
  plugins: [
    // ...other plugins
    new WorkboxPlugin.GenerateSW({
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: '/clearance-calculator',
          handler: 'CacheFirst',
          options: {
            cacheName: 'clearance-calculator-cache',
          },
        },
        // Add more runtime caching rules as needed
      ],
    }),
  ],
};