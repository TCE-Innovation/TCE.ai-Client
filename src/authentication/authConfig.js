import { cache } from "react";

export const msalConfig = {
    auth: {
        clientId: '5948db4f-c992-4d98-b5ae-ca25d1010926',
        authority: 'https://login.microsoftonline.com/3539293e-58fa-4bab-a02e-18dc57fa9737',
        redirectUri: (process.env.REACT_APP_ENV === 'dev' || process.env.NODE_ENV === 'development')
            ? "https://dev.tce.tools/private/home"
            : "https://tce.tools/private/home",
        postLogoutRedirectUri: (process.env.REACT_APP_ENV === 'dev' || process.env.NODE_ENV === 'development')
            ? "https://dev.tce.tools"
            : "https://tce.tools",
    },
    cache: {
        cacheLocation: "localStorage", 
        storeAuthStateInCookie: true, 
    },
};

export const loginRequest = {
  scopes: ["User.Read", "Mail.Send"],
};
