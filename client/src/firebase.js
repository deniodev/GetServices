import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'home-services-moz.firebaseapp.com',
  projectId: 'home-services-moz',
  storageBucket: 'home-services-moz.appspot.com',
  messagingSenderId: '865028684467',
  appId: '1:865028684467:web:2a15ef92dcbb1752664ec6',
};

export const app = initializeApp(firebaseConfig);
