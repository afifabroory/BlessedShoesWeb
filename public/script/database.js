"use strict";(self.webpackChunkblessedshoesweb=self.webpackChunkblessedshoesweb||[]).push([[907],{11:(e,a,t)=>{t.d(a,{ij:()=>o,Vx:()=>r,$T:()=>i,Od:()=>c});var s=t(503),n=(t(642),t(492));function o(e,a="value"){return s.Z.database().ref(e).once(a).then((e=>!!e.exists()&&e.val())).catch((()=>{console.log("Something wrong!")}))}function i(e,a){const t=[];for(var n,o=0;o<a.length;++o)n=a[o],t.push({ShoesBrand:n.brand,Service:n.service,Size:n.size,Status:n.status,TimestampIn:s.Z.database.ServerValue.TIMESTAMP,TimestampOut:"-"});s.Z.database().ref(e).set(t).then((()=>{console.log("Success")})).catch((()=>{console.log("Something wrong!")}))}function r(e,a){s.Z.database().ref(e).update(a)}function c(e){s.Z.database().ref(e).remove()}s.Z.initializeApp({apiKey:"AIzaSyA4-PsDCaElqrk9i6CYpTglUtW5m6-7cVA",authDomain:"test-955e0.firebaseapp.com",databaseURL:"https://test-955e0-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"test-955e0",appId:"1:942278511213:web:64865f6a05762a805c8d64",measurementId:"G-50B8KY0NX9"}),s.Z.database().useEmulator("localhost",9e3),s.Z.database().ref("/").on("child_changed",(function(e){(0,n.xG)(e.key,JSON.stringify(e.val()))})),s.Z.database().ref("/").on("child_added",(function(e){(0,n.xG)(e.key,JSON.stringify(e.val()))})),s.Z.database().ref("/").on("child_removed",(function(e){(0,n.NU)(e.key)}))},492:(e,a,t)=>{t.d(a,{Yu:()=>n,xG:()=>o,NU:()=>i});var s=window.sessionStorage;function n(e){return JSON.parse(s.getItem(e))}function o(e,a){s.setItem(e,a)}function i(e){s.removeItem(e)}}},e=>{e.O(0,[642],(()=>(11,e(e.s=11)))),e.O()}]);