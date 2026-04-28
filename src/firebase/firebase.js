// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\firebase\firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKMQs7evK00-Uhlj8QhyDzY7uhfgxkz9E",
  authDomain: "pokemon-e59ab.firebaseapp.com",
  projectId: "pokemon-e59ab",
  storageBucket: "pokemon-e59ab.firebasestorage.app",
  messagingSenderId: "641378910867",
  appId: "1:641378910867:web:25fbfc518bc1628a060366",
  measurementId: "G-5D0TY2ZSD1",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Keep this alias because some files may import firestore instead of db.
export const firestore = db;

export const analyticsPromise = isSupported()
  .then((supported) => (supported ? getAnalytics(app) : null))
  .catch(() => null);