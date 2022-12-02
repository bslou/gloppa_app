// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMamoSrw1u8DesMVX5PsfrC78OHu_SEZM",
  authDomain: "gloppa.firebaseapp.com",
  projectId: "gloppa",
  storageBucket: "gloppa.appspot.com",
  messagingSenderId: "823759246108",
  appId: "1:823759246108:web:a2d25db50419d05dda20d9",
  measurementId: "G-H0Y7ELLQQW",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
