// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_u34Q_zkXqL01J7aPdNGz_KJfttnY7g0",
  authDomain: "sjh-spg.firebaseapp.com",
  projectId: "sjh-spg",
  storageBucket: "sjh-spg.appspot.com",
  messagingSenderId: "469134409101",
  appId: "1:469134409101:web:1d78546ab93c98942311c4",
  measurementId: "G-1NX7R2F99V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);