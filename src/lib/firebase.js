
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "snap-talk-ac399.firebaseapp.com",
  projectId: "snap-talk-ac399",
  storageBucket: "snap-talk-ac399.appspot.com",
  messagingSenderId: "1039254790281",
  appId: "1:1039254790281:web:8c507e29f943441fbca658",
  measurementId: "G-870SLLD4D1"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();



