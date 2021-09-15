import firebase from "firebase/app";
import "firebase/database";
import { displayData } from "../admin/admin";
import { storeData, removeData, getData } from "./local_database"

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
    var data =  firebase.database().ref(id.toUpperCase()).orderByChild("timestampIn").once(eventType).then((dataSnapshot) => {
        if (dataSnapshot.exists()) return dataSnapshot.val();
        else return false;
    }).catch((e) => { console.log(e); });

    return data;
}

/** 
 * Admin only 
 */
 function adminRead(id) {
    var data =  firebase.database().ref(id.toUpperCase()).orderByChild("timestampIn").once("value").then((dataSnapshot) => {
        if (dataSnapshot.exists()) {
            var data = {}
            dataSnapshot.forEach((child) => {
                if (child.val()["timestampOut"] === 0) {
                    data[child.key] = child.val();
                }
            })

            return data;
        } else {
            return false;
        }
    }).catch((e) => {
        console.log(e);
    });

    return data;
}

function itExists(id) {
    console.log(`Calling itExists function in datbaase.js to verify ID ${id}`)
    return firebase.database().ref(id.toUpperCase()).once("value").then((dataSnapshot) => {
        console.log(dataSnapshot.exists())
        return dataSnapshot.exists()
    })
}

function insert(id, data) {
    
    firebase.database().ref(id.toUpperCase()).set(data).then(() => {
        console.log("Success write");
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
        var data = getData("DATA");
        data[childSnapshot.key] = childSnapshot.val();
        //console.log(data);
        //console.log(childSnapshot.val());
        storeData("DATA", JSON.stringify(data));
        console.log("from child_changged listener")
        var listContent = document.querySelectorAll("#display>li");
        listContent.forEach(e => e.remove());
        displayData(data);
    });

    firebase.database().ref("/").on('child_removed', (childSnapshot) => {
        removeData(childSnapshot.key);
    });
}

var db = firebase.database();
var ServerValue = firebase.database.ServerValue

export {read, adminRead, update, insert, remove, itExists, db, ServerValue, init_listner};