import firebase from "firebase/app";
import "firebase/database";
import { storeData, removeData } from "./local_database"
console.log("test");
firebase.initializeApp({
    apiKey: "AIzaSyA4-PsDCaElqrk9i6CYpTglUtW5m6-7cVA",
    authDomain: "test-955e0.firebaseapp.com",
    databaseURL: "https://test-955e0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-955e0",
    appId: "1:942278511213:web:64865f6a05762a805c8d64",
    measurementId: "G-50B8KY0NX9"
});

//firebase.database().useEmulator("localhost", 9000); // Development Purposes 

// User
function read(id, eventType="value") {
    var data =  firebase.database().ref(id.toUpperCase()).once(eventType).then((dataSnapshot) => {
        console.log("Request read DB")
        if (dataSnapshot.exists()) {
            return dataSnapshot.val();
        } else {
            return false;
        }
    }).catch((e) => {
        console.log(e);
    });

    return data;
}

/** 
 * Admin only 
 */
function insert(id, data) {
    
    firebase.database().ref(id.toUpperCase()).set(data).then(() => {
        console.log("Success");
    }).catch(() => {
        console.log("Something wrong!");
    });
}

function update(id, data) {
    firebase.database().ref(id.toUpperCase()).set(data);
}

function remove(id) {
    firebase.database().ref(id.toUpperCase()).remove();
}

function init_listner() {
    firebase.database().ref("/").on('child_changed', (childSnapshot) => {
        storeData(childSnapshot.key, JSON.stringify(childSnapshot.val()));
    });

    firebase.database().ref("/").on('child_removed', (childSnapshot) => {
        removeData(childSnapshot.key);
    });
}

var db = firebase.database();
var ServerValue = firebase.database.ServerValue

export {read, update, insert, remove, db, ServerValue, init_listner};