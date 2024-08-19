// firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB8UlZuFflZ3rtdAJYuFMJO57Rvlr4Afa0",
  authDomain: "registration-f58a0.firebaseapp.com",
  projectId: "registration-f58a0",
  databaseURL: "https://registration-f58a0-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "registration-f58a0.appspot.com",
  messagingSenderId: "128198147027",
  appId: "1:128198147027:web:8d4d4a3cbc40655ec70d26"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const database = getDatabase(app);
