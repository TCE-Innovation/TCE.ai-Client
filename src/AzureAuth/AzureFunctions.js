import {pca} from './pcaConfig'; // Import the MSAL instance from azureAuth.js

async function MicrosoftSignIn() {
    console.log("in microsoft sign in function")
    try {
        const loginResponse = await pca.loginPopup({
            scopes: ['openid', 'profile', 'email'], // Add required scopes
        });

        // User is signed in
        const user = loginResponse.account;

        // Retrieve user information
        const name = user.name;
        const email = user.username;
        console.log(email);
        console.log(name);

        return email;
    } catch (error) {
        console.log('Error signing in with Microsoft', error);
    }
}

async function doSignOut() {
  try {
      await pca.logoutPopup();
  } catch (error) {
      console.log('Error signing out', error);
  }
}

export {
    doSignOut,
    MicrosoftSignIn
}