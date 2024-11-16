import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZArXcxHb15qQaMgUq843OdUOMZzRXG0Y",
  authDomain: "buzzz-4aa45.firebaseapp.com",
  projectId: "buzzz-4aa45",
  storageBucket: "buzzz-4aa45.firebasestorage.app",
  messagingSenderId: "718213192721",
  appId: "1:718213192721:web:b4caba6a6fdcac3bcbe5b0",
  measurementId: "G-78SQ8KLCJY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);