// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_KEY,
  authDomain: "anonymous-15188.firebaseapp.com",
  projectId: "anonymous-15188",
  storageBucket: "anonymous-15188.appspot.com",
  messagingSenderId: "707600152847",
  appId: "1:707600152847:web:dcd4df111d2d88aee7e67a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
