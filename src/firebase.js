// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

// import { ​getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXJoG0hxtRgnQ7jyel79fBeg9jxm0lb78",
  authDomain: "saas-873db.firebaseapp.com",
  projectId: "saas-873db",
  storageBucket: "saas-873db.appspot.com",
  messagingSenderId: "345861321458",
  appId: "1:345861321458:web:3127757ae9e5cbc900d66b",
  measurementId: "G-X8PG6GEFS5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
