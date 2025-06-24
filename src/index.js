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
    
    // Store the registration for later use
    window.swRegistration = registration;
    
    // Create a single div with proper ID for easier selection
    const updateButton = document.createElement('div');
    updateButton.id = 'sw-update-notification';
    updateButton.style.position = 'fixed';
    updateButton.style.bottom = '10px';
    updateButton.style.right = '10px';
    updateButton.style.background = '#4caf50';
    updateButton.style.color = 'white';
    updateButton.style.padding = '10px';
    updateButton.style.borderRadius = '5px';
    updateButton.style.cursor = 'pointer';
    updateButton.style.zIndex = '9999';
    updateButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    updateButton.textContent = 'New version available! Click to update.';
    
    // Add the click handler directly to the main element
    updateButton.addEventListener('click', function() {
      console.log('Update button clicked');
      
      try {
        // Check if registration is available either through closure or global
        const swReg = registration || window.swRegistration;
        
        if (swReg && swReg.waiting) {
          console.log('Sending skip waiting message');
          // Send message to skip waiting
          swReg.waiting.postMessage({ type: 'SKIP_WAITING' });
          
          // Add a small delay before reload to ensure message is processed
          setTimeout(() => {
            console.log('Reloading page');
            window.location.reload();
          }, 300);
        } else {
          console.warn('No waiting service worker found');
          // Force reload anyway
          window.location.reload();
        }
      } catch (err) {
        console.error('Error updating service worker:', err);
        // Fallback - just reload the page
        window.location.reload();
      }
    });
    
    // Remove any existing notification before adding a new one
    const existingNotification = document.getElementById('sw-update-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    document.body.appendChild(updateButton);
    
    // Dispatch event for other components to react to
    window.dispatchEvent(new CustomEvent('swUpdate', { detail: registration }));
  }
});