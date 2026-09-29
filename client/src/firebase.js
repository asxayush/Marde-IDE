// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArBjCK0HDzyMjeHC7RREvPqtcwLaLn3gU",
  authDomain: "marde-ai.firebaseapp.com",
  projectId: "marde-ai",
  storageBucket: "marde-ai.firebasestorage.app",
  messagingSenderId: "410944203945",
  appId: "1:410944203945:web:fe45dfff5d557f9fb48db8",
  measurementId: "G-ZCGEW6XHMS"
};

// Initialize Firebase

// Check if apiKey is present and has a valid string value
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
