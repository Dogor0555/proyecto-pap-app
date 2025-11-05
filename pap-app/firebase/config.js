import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
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

// Initialize Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
export const db = getFirestore(app);

// Google Sign-In configuration
export const googleSignInConfig = {
  webClientId: '888603960531-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com', // Necesitarás esto
  scopes: ['profile', 'email'],
};

export default app;