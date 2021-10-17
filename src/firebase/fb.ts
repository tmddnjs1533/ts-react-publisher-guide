import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
  appId: REACT_APP_APP_ID,
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();