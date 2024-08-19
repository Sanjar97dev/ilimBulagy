// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8UlZuFflZ3rtdAJYuFMJO57Rvlr4Afa0",
  authDomain: "registration-f58a0.firebaseapp.com",
  projectId: "registration-f58a0",
  storageBucket: "registration-f58a0.appspot.com",
  messagingSenderId: "128198147027",
  appId: "1:128198147027:web:8d4d4a3cbc40655ec70d26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
