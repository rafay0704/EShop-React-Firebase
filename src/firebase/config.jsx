import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

export const firebaseConfig = {
  apiKey: "AIzaSyBxv88eSqutNVwGayi9guGmd8FwU92MmPg",
  authDomain: "eshop-31eb8.firebaseapp.com",
  projectId: "eshop-31eb8",
  storageBucket: "eshop-31eb8.appspot.com",
  messagingSenderId: "411482475073",
  appId: "1:411482475073:web:2dccc027d94aea44a394c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app
