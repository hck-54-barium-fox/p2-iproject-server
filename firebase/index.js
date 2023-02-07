// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'learn-firebase-dcffa.firebaseapp.com',
  projectId: 'learn-firebase-dcffa',
  storageBucket: 'learn-firebase-dcffa.appspot.com',
  messagingSenderId: '234528239601',
  appId: '1:234528239601:web:cd99182a99baf6ee86de50',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
