//REACT
import React from 'react';
import ReactDOM from 'react-dom';

//CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//COMPONENTS
import App from './components/General/App';

//AUTH
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authentication/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <MsalProvider instance={msalInstance}>
          <App />
      </MsalProvider>
  </React.StrictMode>
);