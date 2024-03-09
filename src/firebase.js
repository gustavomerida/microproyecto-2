/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
// eslint-disable-next-line no-unused-vars
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTys0X8cC35huQAISE3-J5hy6qcE1Lhqo",
  authDomain: "microproyecto-2-baf61.firebaseapp.com",
  projectId: "microproyecto-2-baf61",
  storageBucket: "microproyecto-2-baf61.appspot.com",
  messagingSenderId: "460715829882",
  appId: "1:460715829882:web:e7eeeaf514edf3c9e1e9c3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

auth.setPersistence(browserLocalPersistence);
googleProvider.setCustomParameters({ prompt: "select_account" });
