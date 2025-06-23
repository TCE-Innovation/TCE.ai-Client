import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { register } from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker with specific configuration
register({
  onSuccess: () => {
    console.log('Service Worker registered successfully.');
    // Notify the app that offline functionality is available
    window.dispatchEvent(new CustomEvent('swSuccess'));
  },
  onUpdate: (registration) => {
    console.log('New version available. Reload to update.');
    // Provide method for users to update when new version is available
    const updateButton = document.createElement('div');
    updateButton.innerHTML = '<div style="position:fixed;bottom:10px;right:10px;background:#4caf50;color:white;padding:10px;border-radius:5px;cursor:pointer;z-index:9999;">New version available! Click to update.</div>';
    updateButton.addEventListener('click', () => {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    });
    document.body.appendChild(updateButton);
  }
});