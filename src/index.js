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
import { register } from './serviceWorkerRegistration';

const msalInstance = new PublicClientApplication(msalConfig);
const root = createRoot(document.getElementById('root'));

if (window.location.hash !== '') {
  console.log("hash found" + window.location.hash);
} 

root.render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);

// Register the service worker for caching data
register();