import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
//import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmSgJHZvdPFnVh9TB-DVKeCv2jhPRuqcc",
  authDomain: "gangulgee-383d0.firebaseapp.com",
  projectId: "gangulgee-383d0",
  storageBucket: "gangulgee-383d0.appspot.com",
  messagingSenderId: "719366534267",
  appId: "1:719366534267:web:6fc2232880a768a36b1ede",
  measurementId: "G-7DHGBKM4VY",
};

firebase.initializeApp(firebaseConfig);

export const db = getFirestore();

const auth = firebase.auth();

const apiKey = firebaseConfig.apiKey;

//const storage = firebase.storage();

export { auth, apiKey, firebase };
