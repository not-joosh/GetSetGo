import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { collection } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD8lPfnlWsuwd7aOIj926vNAjhoF65b9Q4",
  authDomain: "getsetgo-f3264.firebaseapp.com",
  projectId: "getsetgo-f3264",
  storageBucket: "getsetgo-f3264.appspot.com",
  messagingSenderId: "973126207159",
  appId: "1:973126207159:web:a82f4db7f1c1620c83ef32"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Collections
export const usersRef = collection(db, 'users');
export const productsRef = collection(db, 'products');
export const orderHistoryRef = collection(db, 'orderHistory');
export const pastOrdersRef = collection(db, 'pastOrders');
export const faqRef = collection(db, 'faq');