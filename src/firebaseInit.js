import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA4-PsDCaElqrk9i6CYpTglUtW5m6-7cVA",
    authDomain: "test-955e0.firebaseapp.com",
    databaseURL: "https://test-955e0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-955e0",
    storageBucket: "test-955e0.appspot.com",
    messagingSenderId: "942278511213",
    appId: "1:942278511213:web:64865f6a05762a805c8d64",
    measurementId: "G-50B8KY0NX9"
};
firebase.initializeApp(firebaseConfig);

firebase.analytics();

export const db = firebase.database();
export const serverValue = firebase.database.ServerValue;

db.useEmulator("localhost", 9000); // Development Purposes 