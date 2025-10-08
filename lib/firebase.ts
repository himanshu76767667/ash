// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjxvB6I_O0OEmrcBs6r0psCg_0rwftJbY",
  authDomain: "ash-e9641.firebaseapp.com",
  projectId: "ash-e9641",
  storageBucket: "ash-e9641.firebasestorage.app",
  messagingSenderId: "400419881689",
  appId: "1:400419881689:web:f54127b9e6b44c1f5eb4c8",
  measurementId: "G-5S6SM46LKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
export const db = getFirestore(app);

