// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const checkIfAdmin = async (user) => {
  if (!user || !user.email) return false;
  const normalizedEmail = user.email.trim().toLowerCase();
  try {
    const adminRef = doc(db, "admins", normalizedEmail);
    const adminSnap = await getDoc(adminRef);
    return adminSnap.exists();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

export const signInWithGoogle = async (setUser, setIsAdmin) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user || !user.email) {
      alert("Login failed: No email detected.");
      await signOut(auth);
      return;
    }

    const isAdmin = await checkIfAdmin(user);
    if (!isAdmin) {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
      return; 
    }

    setUser(user);
    setIsAdmin(true);
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please try again.");
  }
};


export const logout = async (setUser, setIsAdmin) => {
  try {
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
