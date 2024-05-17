export const msalConfig = {
    auth: {
        clientId: '5948db4f-c992-4d98-b5ae-ca25d1010926',
        authority: 'https://login.microsoftonline.com/3539293e-58fa-4bab-a02e-18dc57fa9737',
        redirectUri: "https://tcig.nyc/private/welcome",
    },
};

export const loginRequest = {
    scopes: ["User.Read", "Mail.Send"]
};
