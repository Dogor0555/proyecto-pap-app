import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTnsotiPBEmU3VrZX40CHrLP9gv9aBipQ",
  authDomain: "segundoparcial-80eeb.firebaseapp.com",
  projectId: "segundoparcial-80eeb",
  storageBucket: "segundoparcial-80eeb.firebasestorage.app",
  messagingSenderId: "888603960531",
  appId: "1:888603960531:web:069044ced17c047baba026",
  measurementId: "G-P4MRTC6Z2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;