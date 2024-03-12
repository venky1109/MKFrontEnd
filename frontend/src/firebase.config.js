// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    // apiKey:"AIzaSyD7cKysQZXucU-RJNJKiBiF9U4Ldm7qQ5w",
    // authDomain:"manakirana-988b3.firebaseapp.com",
    // projectId:"manakirana-988b3",
    // storageBucket:"manakirana-988b3.appspot.com",
    // messagingSenderId:"106629784752",
    // appId:"1:106629784752:web:e60520d9c6bff63517c775"

    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
