"use strict";(self.webpackChunkblessedshoesweb=self.webpackChunkblessedshoesweb||[]).push([[535,328,907],{357:(e,t,o)=>{o.d(t,{V:()=>D});var s=o(11),n=o(492);function r(e){e.append(document.createElement("br"))}function d(e,t){for(var o in t)e.setAttribute(o,t[o]);return e}function a(e,t,o=!0,s=null,n=null){var r=document.createElement("div");return r.setAttribute("id",`div-${e}`),o?t.append(r):n(t,r,s),r}function u(e,t,o,s,n=!0,r=null,d=null){var a=document.createElement("button");a.setAttribute("id",e.id),a.innerText=t,a.disabled=o,s.append(a)}function c(e,t,o,s,n=!0,u=null,c=null){s=a(e.id,s,n,c,u);var i=document.createElement("label");i.setAttribute("for",e.id),i.innerText=t,s.append(i);var l=document.createElement("input");(l=d(l,e)).disabled=o,s.append(l),r(s)}function i(e,t,o,s,n=!0,r=null,u=null){s=a(e.id,s,n,u,r);var c=document.createElement("input");(c=d(c,e)).disabled=o;var i=document.createElement("label");i.setAttribute("for",e.id),i.innerText=t,n&&(s.append(c),s.append(i))}function l(e,t,o,s,n=!0,d=null,u=null,c=!1){s=a(t,s,n,u,d);var i=document.createElement("select");i.setAttribute("id",t),i.disabled=c;var l=document.createElement("label");for(var v in l.setAttribute("for",t),l.innerText=o,s.append(l),e){var m=document.createElement("option");m.setAttribute("value",v),m.innerHTML=e[v],i.append(m)}s.append(i),r(s)}function v(e,t,o=!1,s="- ENTER ID FIRST -"){for(var n=e.childNodes.length,r=0;r<n;++r)e.removeChild(e.childNodes[0]);for(r=0;r<t;++r){var d=document.createElement("option");d.setAttribute("value",r),d.innerHTML=o?s:r+1,e.append(d)}}const m=[{0:"Insert",1:"Update",2:"Delete"},{id:"shoesID",type:"text",autocomplete:"off",pattern:"\\d*",title:"NUMBER ONLY!"},{sheoesNo:[{id:"shoesNo",type:"text",autocomplete:"off",value:"1"},"No: ",1],shoesBrand:[{id:"shoesBrand",type:"text",autocomplete:"off"},"Shoes Brand: ",!1],shoesSize:[{id:"shoesSize",type:"text",autocomplete:"off"},"Shoes Size: ",!1]},{service:[{"Deep Clean":"Deep Clean","Fast Clean":"Fast clean","Whitening Treatment":"Whitening Treatment",Repaint:"Repaint",Reglue:"Reglue"},"shoesService","Service: "],status:[{"In Progress":"In Progress",Done:"Done",Canceled:"Canceled"},"shoesStatus","Status: "]},{addBtn:[{id:"addBtn"},"ADD",1],insertBtn:[{id:"insertBtn"},"INSERT",1]}],S=[{0:"- ENTER ID FIRST -"},{id:"updateStatus",type:"checkbox"},{updateBtn:[{id:"updateBtn"},"UPDATE",1]}],h=[{0:"- ENTER ID FIRST -"},{id:"deleteAllCheck",type:"checkbox"},{shoesService:[{id:"shoesService",type:"text",autocomplete:"off"},"Service: ",1],shoesStatus:[{id:"shoesStatus",type:"text",autocomplete:"off"},"Status",1]},{deleteBtn:[{id:"deleteBtn"},"DELETE",1]}],p={"Deep Clean":0,"Fast Clean":1,"Whitening treatment":2,Repaint:3,Regluer:4},y={"In Progress":0,Done:1,Canceled:2};function b(e){var t=document.querySelector("#shoesID");t.addEventListener("input",(()=>{var o=t.value;/^[0-9]*$/.test(o)?e(o):(t.value=t.value.slice(0,-1),alert("ID Input Are Number Only!"))}))}function f(e){var t=document.querySelector("#shoesID");document.querySelector("#div-shoesNo>#shoesNo").addEventListener("change",(()=>{var o=t.value;e(o,!1)}))}function q(){var e=document.querySelector("#div-shoesNo>#shoesNo");e.disabled=!e.disabled;var t=document.querySelector("#div-deleteAllCheck>#deleteAllCheck");t.disabled=!t.disabled;var o=document.querySelector("#div-Btn>#deleteBtn");o.disabled=!o.disabled}function g(){var e=document.querySelector("#div-shoesNo>#shoesNo");e.disabled=!e.disabled;var t=document.querySelector("#div-shoesBrand>#shoesBrand");t.disabled=!t.disabled;var o=document.querySelector("#div-shoesSize>#shoesSize");o.disabled=!o.disabled;var s=document.querySelector("#div-shoesService>#shoesService");s.disabled=!s.disabled;var n=document.querySelector("#div-shoesStatus>#shoesStatus");n.disabled=!n.disabled;var r=document.querySelector("#div-updateStatus>#updateStatus");r.disabled=!r.disabled;var d=document.querySelector("#div-Btn>#updateBtn");d.disabled=!d.disabled}function B(e,t=!0){var o=(0,n.Yu)(e),s=document.querySelector("#div-shoesNo>#shoesNo");const r=document.querySelector("#div-shoesID>#shoesID");var d=!s.disabled;if(o){t&&v(s,o.length),t&&!d&&g();var a=parseInt(s.value);document.querySelector("#div-shoesBrand>#shoesBrand").value=o[a].ShoesBrand,document.querySelector("#div-shoesSize>#shoesSize").value=o[a].Size,document.querySelector("#div-shoesService>#shoesService").getElementsByTagName("option")[p[o[a].Service]].selected="select",document.querySelector("#div-shoesStatus>#shoesStatus").getElementsByTagName("option")[y[o[a].Status]].selected="select"}else 0===r.value.length?v(s,1,!0):v(s,1,!0,""),document.querySelector("#div-shoesBrand>#shoesBrand").value="",document.querySelector("#div-shoesSize>#shoesSize").value="",document.querySelector("#div-shoesService>#shoesService").getElementsByTagName("option")[0].selected="select",document.querySelector("#div-shoesStatus>#shoesStatus").getElementsByTagName("option")[0].selected="select",d&&g()}function I(e,t=!0){var o=(0,n.Yu)(e),s=document.querySelector("#div-shoesNo>#shoesNo");const r=document.querySelector("#div-shoesID>#shoesID");var d=!s.disabled;if(o){t&&v(s,o.length),t&&!d&&q();var a=parseInt(s.value);document.querySelector("#div-shoesBrand>#shoesBrand").value=o[a].ShoesBrand,document.querySelector("#div-shoesSize>#shoesSize").value=o[a].Size,document.querySelector("#div-shoesService>#shoesService").value=o[a].Service,document.querySelector("#div-shoesStatus>#shoesStatus").value=o[a].Status}else 0===r.value.length?v(s,1,!0):v(s,1,!0,""),document.querySelector("#div-shoesBrand>#shoesBrand").value="",document.querySelector("#div-shoesSize>#shoesSize").value="",document.querySelector("#div-shoesService>#shoesService").value="",document.querySelector("#div-shoesStatus>#shoesStatus").value="",d&&q()}var E;const N=(e,t,o)=>e.insertBefore(t,o);function D(e=!0){if(e){0===window.sessionStorage.length&&(console.log("length 0"),(0,s.ij)("/").then((e=>{for(var t in e)(0,n.xG)(t,JSON.stringify(e[t]))}))),document.querySelector("#admin_login").remove();var t=document.createElement("div");t.setAttribute("id","data");var o=document.createElement("hr");o.setAttribute("id","mid"),document.body.prepend(t),document.body.prepend(o)}var r=document.createElement("div");r.setAttribute("id","input"),document.body.prepend(r);var d=document.createElement("h3");for(var v in d.innerText="Insert, Update & Delete Data",r.append(d),l(m[0],"dbOp","Operation: ",r),c(m[1],"ID: ",!0,r),m[2])c(m[2][v][0],m[2][v][1],m[2][v][2],r);for(var v in m[3])l(m[3][v][0],m[3][v][1],m[3][v][2],r);var p=a("Btn",r);for(var v in m[4])u(m[4][v][0],m[4][v][1],m[4][v][2],p);document.querySelector("#dbOp").addEventListener("change",(()=>{var e=document.querySelector("#dbOp").value;if(E!==e){switch(parseInt(document.querySelector("#dbOp").value)){case 0:document.querySelector("div").remove(),D(!1);break;case 1:!function(){var e=document.querySelector("#dbOp").selectedIndex;document.querySelector("#input").remove(),D(!1),document.querySelector("#dbOp").getElementsByTagName("option")[e].selected="selected",document.querySelector("#div-shoesID>#shoesID").removeAttribute("value"),document.querySelector("#div-shoesNo").remove(),document.querySelector("#div-Btn").remove(),document.querySelector("#shoesID").disabled=!1,document.querySelector("#shoesBrand").disabled=!0,document.querySelector("#shoesSize").disabled=!0,document.querySelector("#div-shoesService>#shoesService").disabled=!0,document.querySelector("#div-shoesStatus>#shoesStatus").disabled=!0;var t=document.querySelector("#input");const o=document.querySelector("#div-shoesBrand");l(S[0],"shoesNo","No: ",t,!1,N,o,!0),i(S[1],"Change Status To All",!0,t);var s=a("Btn",t);for(var n in S[2])u(S[2][n][0],S[2][n][1],S[2][n][2],s);b(B),f(B)}();break;case 2:!function(){var e=document.querySelector("#dbOp").selectedIndex;document.querySelector("#input").remove(),D(!1),document.querySelector("#dbOp").getElementsByTagName("option")[e].selected="selected",document.querySelector("#div-shoesID>#shoesID").removeAttribute("value"),document.querySelector("#div-Btn").remove(),document.querySelector("#div-shoesService").remove(),document.querySelector("#div-shoesStatus").remove(),document.querySelector("#div-shoesNo").remove(),document.querySelector("#shoesID").disabled=!1,document.querySelector("#shoesBrand").disabled=!0,document.querySelector("#shoesSize").disabled=!0;var t=document.querySelector("#input");for(var o in h[2])c(h[2][o][0],h[2][o][1],h[2][o][2],t);const s=document.querySelector("#div-shoesBrand");l(h[0],"shoesNo","No: ",t,!1,N,s,!0),i(h[1],"Delete All",!0,t);var n=a("Btn",t);for(var o in h[3])u(h[3][o][0],h[3][o][1],h[3][o][2],n);b(I),f(I)}()}E=e}}))}},11:(e,t,o)=>{o.d(t,{ij:()=>r,Vx:()=>a,$T:()=>d,Od:()=>u});var s=o(503),n=(o(642),o(492));function r(e,t="value"){return s.Z.database().ref(e).once(t).then((e=>!!e.exists()&&e.val())).catch((()=>{console.log("Something wrong!")}))}function d(e,t){const o=[];for(var n,r=0;r<t.length;++r)n=t[r],o.push({ShoesBrand:n.brand,Service:n.service,Size:n.size,Status:n.status,TimestampIn:s.Z.database.ServerValue.TIMESTAMP,TimestampOut:"-"});s.Z.database().ref(e).set(o).then((()=>{console.log("Success")})).catch((()=>{console.log("Something wrong!")}))}function a(e,t){s.Z.database().ref(e).update(t)}function u(e){s.Z.database().ref(e).remove()}s.Z.initializeApp({apiKey:"AIzaSyA4-PsDCaElqrk9i6CYpTglUtW5m6-7cVA",authDomain:"test-955e0.firebaseapp.com",databaseURL:"https://test-955e0-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"test-955e0",appId:"1:942278511213:web:64865f6a05762a805c8d64",measurementId:"G-50B8KY0NX9"}),s.Z.database().useEmulator("localhost",9e3),s.Z.database().ref("/").on("child_changed",(function(e){(0,n.xG)(e.key,JSON.stringify(e.val()))})),s.Z.database().ref("/").on("child_added",(function(e){(0,n.xG)(e.key,JSON.stringify(e.val()))})),s.Z.database().ref("/").on("child_removed",(function(e){(0,n.NU)(e.key)}))},492:(e,t,o)=>{o.d(t,{Yu:()=>n,xG:()=>r,NU:()=>d});var s=window.sessionStorage;function n(e){return JSON.parse(s.getItem(e))}function r(e,t){s.setItem(e,t)}function d(e){s.removeItem(e)}},328:(e,t,o)=>{var s=o(503),n=(o(397),o(357));document.addEventListener("DOMContentLoaded",(()=>{s.Z.auth().onAuthStateChanged((e=>{e?(0,n.V)():(document.querySelector("#admin_login").hidden=!1,document.querySelector("#admin_login>#inputBtn").addEventListener("click",(()=>{!function(e,t){const o=s.Z.auth();o.currentUser?o.signOut():o.setPersistence(s.Z.auth.Auth.Persistence.LOCAL).then((()=>{o.signInWithEmailAndPassword(e,t).catch((e=>{var t=e.code,o=e.message;"auth/wrong-password"===t?alert("Wrong password."):alert(o)}))}))}(document.querySelector("#admin_login>#user").value+"@gmail.com",document.querySelector("#admin_login>#password").value)})))}))}))}},e=>{e.O(0,[642,397],(()=>(328,e(e.s=328)))),e.O()}]);