import firebase from "firebase/compat/app";
import "firebase/compat/auth";

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

const auth = firebase.auth();

const apiKey = firebaseConfig.apiKey;

export { auth, apiKey, firebase };
