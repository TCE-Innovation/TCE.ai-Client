import {
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";

import {
  msalConfig,
  loginRequest,
} from "../../../../authentication/authConfig";

export { getUserProfilePic } from "../../../../data/Graph";

const msalInstance = new PublicClientApplication(msalConfig);

const CHATBOT_ACCESS_TOKEN_KEY = "CHATBOT_ACCESS_TOKEN";

const initialize = async () => {
  await msalInstance.initialize();
};

const setAccessToken = (token) => {
  localStorage.setItem(CHATBOT_ACCESS_TOKEN_KEY, JSON.stringify(token));
};

const clearAccessToken = () => {
  localStorage.removeItem(CHATBOT_ACCESS_TOKEN_KEY);
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

export const getAccessToken = () => {
  return new Promise(async (res, rej) => {
    let token = localStorage.getItem(CHATBOT_ACCESS_TOKEN_KEY);
    if (token) return res(JSON.parse(token));
    try {
      token = await requestAccessToken();
      setAccessToken(token);
      res(token);
    } catch (err) {
      clearAccessToken();
      rej(err);
    }
  });
};
