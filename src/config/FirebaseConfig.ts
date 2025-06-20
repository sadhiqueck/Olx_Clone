import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfGghAjOJj0nDHTGcFfeRYN-1LrjW6ZHc",
  authDomain: "olx-clone-8aa46.firebaseapp.com",
  projectId: "olx-clone-8aa46",
  storageBucket: "olx-clone-8aa46.firebasestorage.app",
  messagingSenderId: "1061801521719",
  appId: "1:1061801521719:web:7389783fab452fa41445b2",
  measurementId: "G-ZEWZ4EVNXW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

