// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGSz1oKNRR0FqZHmlY8l0Wc77qmW9zv_o",
  authDomain: "ice-water-8b866.firebaseapp.com",
  projectId: "ice-water-8b866",
  storageBucket: "ice-water-8b866.firebasestorage.app",
  messagingSenderId: "436450429104",
  appId: "1:436450429104:web:e187b700b8480c3f521375"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);