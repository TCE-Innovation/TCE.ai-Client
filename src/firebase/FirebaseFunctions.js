import firebase from 'firebase/compat/app';
import 'firebase/auth';

async function MicrosoftSignIn() {
    console.log("Signing into Microsoft Account")
    var provider = new firebase.auth.OAuthProvider('microsoft.com');
    provider.setCustomParameters({
        tenant: '3539293e-58fa-4bab-a02e-18dc57fa9737'
    });

    try {
        const result = await firebase.auth().signInWithPopup(provider);
        // User is signed in
        const user = result.user;
        

        // Retrieve the name
        const name = user.displayName;
        const email = user.email;
        console.log(email)
        console.log(name)
    
    return email;

    /*if (response.status === 200) {
      const thumbnailUrls = response.data?.value;
      const profilePictureUrl = thumbnailUrls?.[0]?.thumbnailUrl;
      // Use the profilePictureUrl as the profile picture
      console.log(name, profilePictureUrl);
    } else {
      console.log('Error retrieving profile picture');
    }*/
  } catch (error) {
    console.log('Error signing in with Microsoft', error);
  }
}

async function doSignOut() {
    await firebase.auth().signOut()
}

export {
    doSignOut,
    MicrosoftSignIn
}