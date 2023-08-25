import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCcXvjMSgMzFGNBIpzqdedg3ctc50RLcLg",
    authDomain: "ai-assistant-tce.firebaseapp.com",
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: "ai-assistant-tce"
});

export default firebaseApp;