import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEqo9DslCfju0FsPrlN-c5WBkwbrAeAaA",
  authDomain: "jatayu-57614.firebaseapp.com",
  projectId: "jatayu-57614",
  storageBucket: "jatayu-57614.firebasestorage.app",
  messagingSenderId: "805568992908",
  appId: "1:805568992908:web:f87cc544453243fe8ecda9",
  measurementId: "G-2CK18MNVJQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
