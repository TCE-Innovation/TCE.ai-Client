//REACT
import React from 'react';
import { createRoot } from 'react-dom/client';

//CSS
//import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//COMPONENTS
import App from './components/General/App';

//AUTH
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authentication/authConfig';

//SERVICE WORKER
// import { register } from './serviceWorkerRegistration';

const msalInstance = new PublicClientApplication(msalConfig);
const root = createRoot(document.getElementById('root'));

if (window.location.hash !== '') {
  console.log("hash found" + window.location.hash);
} else {
  root.render(
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  );
}

// Register the service worker for caching data
// register();

if ('service-worker' in navigator) {
  navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`)
  .then(registration => {
    console.log('Service Worker registered:', registration);
  })
  .catch(error => {
    console.error('Service Worker registration failed:', error);
  });
} else {
  console.error('Service workers are not supported.')
}
