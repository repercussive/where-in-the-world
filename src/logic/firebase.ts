import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/firebase-auth';

var firebaseConfig = {
  apiKey: "AIzaSyCTh2ihwqmq1-ebY3BQpT640qMd0bkiyds",
  authDomain: "where-in-the-world-1e249.firebaseapp.com",
  projectId: "where-in-the-world-1e249",
  storageBucket: "where-in-the-world-1e249.appspot.com",
  messagingSenderId: "54537784020",
  appId: "1:54537784020:web:39af78dc86fa8679ee4941",
  measurementId: "G-6HKPRWMTD3"
};

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();
export const auth = firebase.auth;