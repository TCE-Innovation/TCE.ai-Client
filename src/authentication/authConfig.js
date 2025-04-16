export const msalConfig = {
    auth: {
        clientId: '5948db4f-c992-4d98-b5ae-ca25d1010926',
        authority: 'https://login.microsoftonline.com/3539293e-58fa-4bab-a02e-18dc57fa9737',
        // redirectUri: "http://localhost:3000/private/welcome"
        redirectUri: (process.env.REACT_APP_ENV === 'dev' || process.env.NODE_ENV === 'development')
            // ? "https://dev.tcig.nyc/private/welcome"
            ? "https://dev.tce.tools/private/welcome" // Updated dev url
            : "https://tcig.nyc/private/welcome",  // OLd URL
            // : "https://tce.tools/private/welcome",  // Updated URL
    },
};

export const loginRequest = {
  scopes: ["User.Read", "Mail.Send"],
};
