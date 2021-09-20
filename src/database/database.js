import firebase from "firebase/app";
import "firebase/database";
import "firebase/analytics"
import { displayData } from "../admin/admin";
import { storeData, removeData, getData } from "./local_database";

firebase.initializeApp({
  apiKey: "AIzaSyC0l3-_sy48C2dcxqaQCXdh7jFgkbwzmFQ",
  authDomain: "laundrysepatublessed.firebaseapp.com",
  databaseURL:
    "https://laundrysepatublessed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "laundrysepatublessed",
  storageBucket: "laundrysepatublessed.appspot.com",
  messagingSenderId: "386283696729",
  appId: "1:386283696729:web:80e160c3c167a7f6627748",
  measurementId: "G-H9B9P32NT1",
});

const analytics = firebase.analytics();
//firebase.database().useEmulator("localhost", 9000); // Development Purposes

// User
function read(id, eventType = "value") {
  analytics.logEvent(`User enter code: ${id}`);
  var data = firebase
    .database()
    .ref(id.toUpperCase())
    .orderByChild("timestampIn")
    .once(eventType)
    .then((dataSnapshot) => {
      if (dataSnapshot.exists()) return dataSnapshot.val();
      else return false;
    })
    .catch((e) => {
      analytics.logEvent(e);
    });

  return data;
}

/**
 * Admin only
 */
function adminRead(id) {
  var data = firebase
    .database()
    .ref(id.toUpperCase())
    .orderByChild("timestampIn")
    .once("value")
    .then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        var data = {};
        dataSnapshot.forEach((child) => {
          if (child.val()["timestampOut"] === 0) {
            data[child.key] = child.val();
          }
        });

        return data;
      } else {
        return false;
      }
    })
    .catch((e) => {
      console.log(e);
    });

  return data;
}

function itExists(id) {
  console.log(`Calling itExists function in datbaase.js to verify ID ${id}`);
  return firebase
    .database()
    .ref(id.toUpperCase())
    .once("value")
    .then((dataSnapshot) => {
      console.log(dataSnapshot.exists());
      return dataSnapshot.exists();
    });
}

function insert(id, data) {
  firebase
    .database()
    .ref(id.toUpperCase())
    .set(data)
    .then(() => {
      console.log("Success write");
    })
    .catch(() => {
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
  firebase
    .database()
    .ref("/")
    .on("child_changed", (childSnapshot) => {
      var data = getData("DATA");

      if (childSnapshot.val()["timestampOut"] !== 0)
        delete data[childSnapshot.key];
      else data[childSnapshot.key] = childSnapshot.val();
      //console.log(data);
      //console.log(childSnapshot.val());
      storeData("DATA", JSON.stringify(data));
      var listContent = document.querySelectorAll("#display>li");
      listContent.forEach((e) => e.remove());
      displayData(data);
    });

  firebase
    .database()
    .ref("/")
    .on("child_removed", (childSnapshot) => {
      removeData(childSnapshot.key);
    });
}

var db = firebase.database();
var ServerValue = firebase.database.ServerValue;

export {
  read,
  adminRead,
  update,
  insert,
  remove,
  itExists,
  db,
  ServerValue,
  init_listner
};
