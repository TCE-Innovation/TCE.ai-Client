import {
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";

import {
  msalConfig,
  loginRequest,
} from "../../../../authentication/authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const initialize = async () => {
  await msalInstance.initialize();
};

export const requestAccessToken = () => {
  return new Promise((res) => {
    setTimeout(async () => {
      await initialize();
      const account = msalInstance.getAllAccounts()[0];
      const request = {
        scopes: [...loginRequest.scopes, "openid", "profile"],
        account,
      };
      try {
        const result = await msalInstance.acquireTokenSilent(request);
        res(result.accessToken);
      } catch (err) {
        if (err instanceof InteractionRequiredAuthError) {
          try {
            const response = await msalInstance.acquireTokenPopup(request);
            return response.accessToken;
          } catch (err) {
            console.error(err);
            return res(null);
          }
        } else {
          console.error(err);
          return res(null);
        }
      }
    }, 0);
  });
};
