// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYf4FdWCZwkS6so3OmKKbMThkgl4rZsgE",
  authDomain: "week7-yizhou.firebaseapp.com",
  projectId: "week7-yizhou",
  storageBucket: "week7-yizhou.firebasestorage.app",
  messagingSenderId: "669343241309",
  appId: "1:669343241309:web:011076e097cb8a29ade9b4"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db ;