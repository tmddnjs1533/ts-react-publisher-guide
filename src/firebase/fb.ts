import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const {
  REACT_APP_API_KEY,
  REACT_APP_PROJECT_ID,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: `${REACT_APP_PROJECT_ID}.firebaseapp.com`,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: `${REACT_APP_PROJECT_ID}.appspot.com`,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  databaseURL:
    "https://publisher-guide-default-rtdb.asia-southeast1.firebasedatabase.app/",
  appId: REACT_APP_APP_ID,
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(app);
export const database = getDatabase(app);
