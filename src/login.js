'use strict';

import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth();

function signInOut(email, password) {
  if (auth.currentUser) {
    auth.signOut();
  } else {
    auth.setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
      auth.signInWithEmailAndPassword(email, password).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);  
        }
        console.log(error);
      });
    });
  }
}

document.querySelector("#admin_login>#inputBtn").addEventListener("click", () => {
  var email = document.querySelector("#admin_login>#user").value + "@gmail.com";
  var password = document.querySelector("#admin_login>#password").value;
  signInOut(email, password);
  console.log(auth.currentUser);
})