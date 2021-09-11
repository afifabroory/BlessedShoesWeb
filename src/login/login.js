'use strict';

import firebase from 'firebase/app';
import 'firebase/auth';

import { 
  defaultAdmin, 
  //initOperationListener,
  //initBtnListener_Insert
} from '../admin/admin'

// import {
//   insert_state_listener
// } from "../utils/admin_data"

import { init_listner } from "../database/database"

function signInOut(email, password) {
  const auth = firebase.auth();
  if (auth.currentUser) {
    auth.signOut();
  } else {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      auth.signInWithEmailAndPassword(email, password).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);  
        }
  
      });
    });
  }
}

function initBtnListener() {
  document.querySelector("#admin_login>div>div>#inputBtn").addEventListener("click", () => {
    var email = document.querySelector("#admin_login>div>div>#user").value + "@gmail.com";
    var password = document.querySelector("#admin_login>div>div>#password").value;
    signInOut(email, password);
  })
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector(".preload-page").style.display = "none";
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.querySelector("body").classList.remove("align");
      console.log("login")
      defaultAdmin();
      //initOperationListener();
      //insert_state_listener();
      //initBtnListener_Insert(); 
      init_listner(); // Listener for database
    } else {
      console.log("logout")
      document.querySelector("#admin_login").style.display = "";
      initBtnListener()
    }
  });
});