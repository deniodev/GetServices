// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "home-services-moz.firebaseapp.com",
  projectId: "home-services-moz",
  storageBucket: "home-services-moz.appspot.com",
  messagingSenderId: "865028684467",
  appId: "1:865028684467:web:2a15ef92dcbb1752664ec6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);