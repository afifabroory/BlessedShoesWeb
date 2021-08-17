import firebase from "firebase/app";
import "firebase/database";
import { storeData } from "./local_database"

firebase.initializeApp({
    apiKey: "AIzaSyA4-PsDCaElqrk9i6CYpTglUtW5m6-7cVA",
    authDomain: "test-955e0.firebaseapp.com",
    databaseURL: "https://test-955e0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-955e0",
    appId: "1:942278511213:web:64865f6a05762a805c8d64",
    measurementId: "G-50B8KY0NX9"
});

firebase.database().useEmulator("localhost", 9000); // Development Purposes 

// Admin & User
function read(id, eventType="value") {
    return firebase.database().ref(id).once(eventType).then((dataSnapshot) => {
        if (dataSnapshot.exists()) {
            return dataSnapshot.val();
        } else {
            return false;
        }
    }).catch(() => {
        console.log("Something wrong!");
    });
}

/** 
 * Admin only 
 */
function insert(id, data) {
    
    const dtArr = [];
    var dt;
    
    for (var i = 0; i < data.length; ++i) {
        dt = data[i];
        dtArr.push({
            "ShoesBrand": dt.brand,
            "Service"   : dt.service,
            "Size"      : dt.size,
            "Status"    : dt.status,
            "TimestampIn" : firebase.database.ServerValue.TIMESTAMP,
            "TimestampOut": "-"
        });
    }

    firebase.database().ref(id).set(dtArr).then(() => {
        console.log("Success");
    }).catch(() => {
        console.log("Something wrong!");
    });
}

function update(id, data) {
    firebase.database().ref(id).update(data);
}

function remove(id) {
    firebase.database().ref(id).remove();
}

function init_dbChange() {
    firebase.database().ref("/").on('child_changed', function(childSnapshot) {
        storeData(childSnapshot.key, JSON.stringify(childSnapshot.val()));
    });
}

init_dbChange();

export {read, update, insert, remove, init_dbChange};