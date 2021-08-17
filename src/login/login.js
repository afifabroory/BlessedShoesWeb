'use strict';

import firebase from 'firebase/app';
import 'firebase/auth';
import { defaultAdmin } from '../admin/admin'

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
  document.querySelector("#admin_login>#inputBtn").addEventListener("click", () => {
    var email = document.querySelector("#admin_login>#user").value + "@gmail.com";
    var password = document.querySelector("#admin_login>#password").value;
    signInOut(email, password);
  })
}

document.addEventListener('DOMContentLoaded', () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      defaultAdmin();
    } else {
      document.querySelector("#admin_login").hidden = false
      initBtnListener()
    }
  });
});