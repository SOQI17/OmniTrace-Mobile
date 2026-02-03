import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW1kIiBrnDf8Hu_L5rCT41rfmV2_sQXwE",
  authDomain: "oritrace-d383e.firebaseapp.com",
  projectId: "oritrace-d383e",
  storageBucket: "oritrace-d383e.firebasestorage.app",
  messagingSenderId: "848694444863",
  appId: "1:848694444863:web:62be780b822473426e498a",
  measurementId: "G-C0T608SNE9"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = firebase.app();

// Initialize Services needed for the app
// Using compat exports allows keeping existing code (db.collection, auth.signIn...) working
export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();

export default app;