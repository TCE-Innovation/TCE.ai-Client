import {
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";

import {
  msalConfig,
  loginRequest,
} from "../../../../authentication/authConfig";
import { ROLES } from "../constants/admin";
import { ROLES_TO_PERMISSIONS } from "../constants/permissions";

export { getUserProfilePic } from "../../../../data/Graph";

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

export const getAccessToken = () => {
  return new Promise(async (res, rej) => {
    try {
      const token = await requestAccessToken();
      res(token);
    } catch (err) {
      rej(err);
    }
  });
};

export const getUserDetails = (users, userEmail) => {
  return (
    users.find(
      (user) => user.email.toLowerCase() === userEmail.toLowerCase()
    ) || null
  );
};

export const checkPermission = (user, resource) => {
  try {
    if (!user) return false;
    if (user.role === ROLES.ADMIN) return true;

    if (!resource || !Array.isArray(resource)) return false;
    const [targetModule, targetPermission] = resource;
    if (!targetModule || !targetPermission) return false;
    const modules = ROLES_TO_PERMISSIONS[user.role];
    if (!modules) return false;
    return modules.some(
      ({ module, permissions }) =>
        module === targetModule &&
        permissions.some((permission) => permission === targetPermission)
    );
  } catch (err) {
    console.log(err);
  }
};

export const isAdminUser = (users, targetUser) => {
  return users.some((user) => {
    if (user.email.toLowerCase() === targetUser.toLowerCase()) {
      return user.role !== ROLES.USER;
    }
    return false;
  });
};
