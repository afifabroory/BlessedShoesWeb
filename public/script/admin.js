"use strict";(self.webpackChunkblessedshoesweb=self.webpackChunkblessedshoesweb||[]).push([[328],{357:(e,t,o)=>{o.d(t,{V:()=>C});var s=o(11),r=o(492);function d(e){e.append(document.createElement("br"))}function n(e,t){for(var o in t)e.setAttribute(o,t[o]);return e}function u(e,t,o=!0,s=null,r=null){var d=document.createElement("div");return d.setAttribute("id",`div-${e}`),o?t.append(d):r(t,d,s),d}function a(e,t,o,s,r=!0,d=null,n=null){var u=document.createElement("button");u.setAttribute("id",e.id),u.innerText=t,u.disabled=o,s.append(u)}function c(e,t,o,s,r=!0,a=null,c=null){s=u(e.id,s,r,c,a);var i=document.createElement("label");i.setAttribute("for",e.id),i.innerText=t,s.append(i);var l=document.createElement("input");(l=n(l,e)).disabled=o,s.append(l),d(s)}function i(e,t,o,s,r=!0,d=null,a=null){s=u(e.id,s,r,a,d);var c=document.createElement("input");(c=n(c,e)).disabled=o;var i=document.createElement("label");i.setAttribute("for",e.id),i.innerText=t,r&&(s.append(c),s.append(i))}function l(e,t,o,s,r=!0,n=null,a=null,c=!1){s=u(t,s,r,a,n);var i=document.createElement("select");i.setAttribute("id",t),i.disabled=c;var l=document.createElement("label");for(var v in l.setAttribute("for",t),l.innerText=o,s.append(l),e){var S=document.createElement("option");S.setAttribute("value",v),S.innerHTML=e[v],i.append(S)}s.append(i),d(s)}function v(e,t,o=!1,s="- ENTER ID FIRST -"){for(var r=e.childNodes.length,d=0;d<r;++d)e.removeChild(e.childNodes[0]);for(d=0;d<t;++d){var n=document.createElement("option");n.setAttribute("value",d),n.innerHTML=o?s:d+1,e.append(n)}}const S=[{0:"Insert",1:"Update",2:"Delete"},{id:"shoesID",type:"text",autocomplete:"off",pattern:"\\d*",title:"NUMBER ONLY!"},{sheoesNo:[{id:"shoesNo",type:"text",autocomplete:"off",value:"1"},"No: ",1],shoesBrand:[{id:"shoesBrand",type:"text",autocomplete:"off"},"Shoes Brand: ",!1],shoesSize:[{id:"shoesSize",type:"text",autocomplete:"off"},"Shoes Size: ",!1]},{service:[{"Deep Clean":"Deep Clean","Fast Clean":"Fast clean","Whitening Treatment":"Whitening Treatment",Repaint:"Repaint",Reglue:"Reglue"},"shoesService","Service: "],status:[{"In Progress":"In Progress",Done:"Done",Canceled:"Canceled"},"shoesStatus","Status: "]},{addBtn:[{id:"addBtn"},"ADD",1],insertBtn:[{id:"insertBtn"},"INSERT",1]}],h=[{0:"- ENTER ID FIRST -"},{id:"updateStatus",type:"checkbox"},{updateBtn:[{id:"updateBtn"},"UPDATE",1]}],m=[{0:"- ENTER ID FIRST -"},{id:"deleteAllCheck",type:"checkbox"},{shoesService:[{id:"shoesService",type:"text",autocomplete:"off"},"Service: ",1],shoesStatus:[{id:"shoesStatus",type:"text",autocomplete:"off"},"Status",1]},{deleteBtn:[{id:"deleteBtn"},"DELETE",1]}],p={"Deep Clean":0,"Fast Clean":1,"Whitening treatment":2,Repaint:3,Regluer:4},y={"In Progress":0,Done:1,Canceled:2};function b(e){var t=document.querySelector("#shoesID");t.addEventListener("input",(()=>{var o=t.value;!function(e){return/^[0-9]*$/.test(e)}(o)?(t.value=t.value.slice(0,-1),alert("ID Input Are Number Only!")):e(o)}))}function q(e){var t=document.querySelector("#shoesID");document.querySelector("#div-shoesNo>#shoesNo").addEventListener("change",(()=>{var o=t.value;e(o,!1)}))}function f(){var e=document.querySelector("#div-shoesNo>#shoesNo");e.disabled=!e.disabled;var t=document.querySelector("#div-deleteAllCheck>#deleteAllCheck");t.disabled=!t.disabled;var o=document.querySelector("#div-Btn>#deleteBtn");o.disabled=!o.disabled}function B(){var e=document.querySelector("#div-shoesNo>#shoesNo");e.disabled=!e.disabled;var t=document.querySelector("#div-shoesBrand>#shoesBrand");t.disabled=!t.disabled;var o=document.querySelector("#div-shoesSize>#shoesSize");o.disabled=!o.disabled;var s=document.querySelector("#div-shoesService>#shoesService");s.disabled=!s.disabled;var r=document.querySelector("#div-shoesStatus>#shoesStatus");r.disabled=!r.disabled}function E(e){var t=document.querySelector("#div-updateStatus>#updateStatus"),o=document.querySelector("#div-Btn>#updateBtn");e?(t.disabled=!1,o.disabled=!1):(t.disabled=!0,o.disabled=!0)}function N(e,t=!0){var o=(0,r.Yu)(e),s=document.querySelector("#div-shoesNo>#shoesNo");const d=document.querySelector("#div-shoesID>#shoesID");var n=!s.disabled;if(o){t&&v(s,o.length),t&&!n&&B();var u=parseInt(s.value);document.querySelector("#div-shoesBrand>#shoesBrand").value=o[u].ShoesBrand,document.querySelector("#div-shoesSize>#shoesSize").value=o[u].Size,document.querySelector("#div-shoesService>#shoesService").getElementsByTagName("option")[p[o[u].Service]].selected="select",document.querySelector("#div-shoesStatus>#shoesStatus").getElementsByTagName("option")[y[o[u].Status]].selected="select"}else 0===d.value.length?v(s,1,!0):v(s,1,!0,""),document.querySelector("#div-shoesBrand>#shoesBrand").value="",document.querySelector("#div-shoesSize>#shoesSize").value="",document.querySelector("#div-shoesService>#shoesService").getElementsByTagName("option")[0].selected="select",document.querySelector("#div-shoesStatus>#shoesStatus").getElementsByTagName("option")[0].selected="select",n&&B();E(!1)}function g(e,t=!0){var o=(0,r.Yu)(e),s=document.querySelector("#div-shoesNo>#shoesNo");const d=document.querySelector("#div-shoesID>#shoesID");var n=!s.disabled;if(o){t&&v(s,o.length),t&&!n&&f();var u=parseInt(s.value);document.querySelector("#div-shoesBrand>#shoesBrand").value=o[u].ShoesBrand,document.querySelector("#div-shoesSize>#shoesSize").value=o[u].Size,document.querySelector("#div-shoesService>#shoesService").value=o[u].Service,document.querySelector("#div-shoesStatus>#shoesStatus").value=o[u].Status}else 0===d.value.length?v(s,1,!0):v(s,1,!0,""),document.querySelector("#div-shoesBrand>#shoesBrand").value="",document.querySelector("#div-shoesSize>#shoesSize").value="",document.querySelector("#div-shoesService>#shoesService").value="",document.querySelector("#div-shoesStatus>#shoesStatus").value="",n&&f()}var I,D,T,A;function z(){I=document.querySelector("#div-shoesID>#shoesID").value,D=document.querySelector("#div-shoesNo>#shoesNo").selectedIndex,T=(0,r.Yu)(I)}const x=(e,t,o)=>e.insertBefore(t,o);function C(e=!0){if(e){0===window.sessionStorage.length&&(console.log("length 0"),(0,s.ij)("/").then((e=>{for(var t in e)(0,r.xG)(t,JSON.stringify(e[t]))}))),document.querySelector("#admin_login").remove();var t=document.createElement("div");t.setAttribute("id","data");var o=document.createElement("hr");o.setAttribute("id","mid"),document.body.prepend(t),document.body.prepend(o)}var d=document.createElement("div");d.setAttribute("id","input"),document.body.prepend(d);var n=document.createElement("h3");for(var v in n.innerText="Insert, Update & Delete Data",d.append(n),l(S[0],"dbOp","Operation: ",d),c(S[1],"ID: ",!0,d),S[2])c(S[2][v][0],S[2][v][1],S[2][v][2],d);for(var v in S[3])l(S[3][v][0],S[3][v][1],S[3][v][2],d);var p=u("Btn",d);for(var v in S[4])a(S[4][v][0],S[4][v][1],S[4][v][2],p);document.querySelector("#dbOp").addEventListener("change",(()=>{var e=document.querySelector("#dbOp").value;if(A!==e){switch(parseInt(document.querySelector("#dbOp").value)){case 0:document.querySelector("div").remove(),C(!1);break;case 1:!function(){var e=document.querySelector("#dbOp").selectedIndex;document.querySelector("#input").remove(),C(!1),document.querySelector("#dbOp").getElementsByTagName("option")[e].selected="selected",document.querySelector("#div-shoesID>#shoesID").removeAttribute("value"),document.querySelector("#div-shoesNo").remove(),document.querySelector("#div-Btn").remove(),document.querySelector("#shoesID").disabled=!1,document.querySelector("#shoesBrand").disabled=!0,document.querySelector("#shoesSize").disabled=!0,document.querySelector("#div-shoesService>#shoesService").disabled=!0,document.querySelector("#div-shoesStatus>#shoesStatus").disabled=!0;var t=document.querySelector("#input");const o=document.querySelector("#div-shoesBrand");l(h[0],"shoesNo","No: ",t,!1,x,o,!0),i(h[1],"Change Status To All",!0,t);var s=u("Btn",t);for(var r in h[2])a(h[2][r][0],h[2][r][1],h[2][r][2],s);b(N),q(N),document.querySelector("#div-shoesBrand>#shoesBrand").addEventListener("input",(()=>{var e=document.querySelector("#shoesBrand");z();var t=e.value!==T[D].ShoesBrand;console.log(t),E(t)})),document.querySelector("#div-shoesSize>#shoesSize").addEventListener("input",(()=>{var e=document.querySelector("#shoesSize");z(),E(e.value!==T[D].Size)})),document.querySelector("#div-shoesService>#shoesService").addEventListener("input",(()=>{var e=document.querySelector("#div-shoesService>#shoesService");z(),E(e.value!==T[D].Service)})),document.querySelector("#div-shoesStatus>#shoesStatus").addEventListener("input",(()=>{var e=document.querySelector("#div-shoesStatus>#shoesStatus");z(),E(e.value!==T[D].Status)}))}();break;case 2:!function(){var e=document.querySelector("#dbOp").selectedIndex;document.querySelector("#input").remove(),C(!1),document.querySelector("#dbOp").getElementsByTagName("option")[e].selected="selected",document.querySelector("#div-shoesID>#shoesID").removeAttribute("value"),document.querySelector("#div-Btn").remove(),document.querySelector("#div-shoesService").remove(),document.querySelector("#div-shoesStatus").remove(),document.querySelector("#div-shoesNo").remove(),document.querySelector("#shoesID").disabled=!1,document.querySelector("#shoesBrand").disabled=!0,document.querySelector("#shoesSize").disabled=!0;var t=document.querySelector("#input");for(var o in m[2])c(m[2][o][0],m[2][o][1],m[2][o][2],t);const s=document.querySelector("#div-shoesBrand");l(m[0],"shoesNo","No: ",t,!1,x,s,!0),i(m[1],"Delete All",!0,t);var r=u("Btn",t);for(var o in m[3])a(m[3][o][0],m[3][o][1],m[3][o][2],r);b(g),q(g)}()}A=e}}))}}},e=>{e.O(0,[642,907],(()=>(357,e(e.s=357)))),e.O()}]);