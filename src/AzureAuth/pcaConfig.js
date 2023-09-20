import { PublicClientApplication } from '@azure/msal-browser';
console.log("in azure auth pca config")
const msalConfig = {
    auth: {
        clientId: '5948db4f-c992-4d98-b5ae-ca25d1010926',
        authority: 'https://login.microsoftonline.com/3539293e-58fa-4bab-a02e-18dc57fa9737',
        redirectUri: "https://tce.ai/"
        //clientType: PublicClientApplication
    }
};

const pca = new PublicClientApplication(msalConfig);

async function initialize() {
    await pca.initialize();
}

initialize();

export { pca };