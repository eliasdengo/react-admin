
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "ijob-clone-app-a34e9.firebaseapp.com",
  databaseURL: "https://ijob-clone-app-a34e9-default-rtdb.firebaseio.com",
  projectId: "ijob-clone-app-a34e9",
  storageBucket: "ijob-clone-app-a34e9.appspot.com",
  messagingSenderId: "718713868592",
  appId: "1:718713868592:web:5c2955d08d9c655bd738f5"
};


const app = initializeApp(firebaseConfig);
export  const db=getFirestore(app);
export const auth = getAuth();
export const storage=getStorage(app);