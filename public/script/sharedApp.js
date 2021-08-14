/*! For license information please see sharedApp.js.LICENSE.txt */
(()=>{"use strict";var e,t={99:(e,t,r)=>{r.d(t,{Z:()=>E});var n,i,o=r(655),a=r(589),s=r(909),c=r(594),u=((n={})["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",n["bad-app-name"]="Illegal App name: '{$appName}",n["duplicate-app"]="Firebase App named '{$appName}' already exists",n["app-deleted"]="Firebase App named '{$appName}' already deleted",n["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",n["invalid-log-argument"]="First argument to `onLog` must be null or a function.",n),l=new a.LL("app","Firebase",u),h="@firebase/app",f="[DEFAULT]",p=((i={})[h]="fire-core",i["@firebase/analytics"]="fire-analytics",i["@firebase/app-check"]="fire-app-check",i["@firebase/auth"]="fire-auth",i["@firebase/database"]="fire-rtdb",i["@firebase/functions"]="fire-fn",i["@firebase/installations"]="fire-iid",i["@firebase/messaging"]="fire-fcm",i["@firebase/performance"]="fire-perf",i["@firebase/remote-config"]="fire-rc",i["@firebase/storage"]="fire-gcs",i["@firebase/firestore"]="fire-fst",i["fire-js"]="fire-js",i["firebase-wrapper"]="fire-js-all",i),d=new c.Yd("@firebase/app"),v=function(){function e(e,t,r){var n=this;this.firebase_=r,this.isDeleted_=!1,this.name_=t.name,this.automaticDataCollectionEnabled_=t.automaticDataCollectionEnabled||!1,this.options_=(0,a.p$)(e),this.container=new s.H0(t.name),this._addComponent(new s.wA("app",(function(){return n}),"PUBLIC")),this.firebase_.INTERNAL.components.forEach((function(e){return n._addComponent(e)}))}return Object.defineProperty(e.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed_(),this.automaticDataCollectionEnabled_},set:function(e){this.checkDestroyed_(),this.automaticDataCollectionEnabled_=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this.checkDestroyed_(),this.name_},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"options",{get:function(){return this.checkDestroyed_(),this.options_},enumerable:!1,configurable:!0}),e.prototype.delete=function(){var e=this;return new Promise((function(t){e.checkDestroyed_(),t()})).then((function(){return e.firebase_.INTERNAL.removeApp(e.name_),Promise.all(e.container.getProviders().map((function(e){return e.delete()})))})).then((function(){e.isDeleted_=!0}))},e.prototype._getService=function(e,t){var r;void 0===t&&(t=f),this.checkDestroyed_();var n=this.container.getProvider(e);return n.isInitialized()||"EXPLICIT"!==(null===(r=n.getComponent())||void 0===r?void 0:r.instantiationMode)||n.initialize(),n.getImmediate({identifier:t})},e.prototype._removeServiceInstance=function(e,t){void 0===t&&(t=f),this.container.getProvider(e).clearInstance(t)},e.prototype._addComponent=function(e){try{this.container.addComponent(e)}catch(t){d.debug("Component "+e.name+" failed to register with FirebaseApp "+this.name,t)}},e.prototype._addOrOverwriteComponent=function(e){this.container.addOrOverwriteComponent(e)},e.prototype.toJSON=function(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}},e.prototype.checkDestroyed_=function(){if(this.isDeleted_)throw l.create("app-deleted",{appName:this.name_})},e}();v.prototype.name&&v.prototype.options||v.prototype.delete||console.log("dc");var y=function e(){var t=function(e){var t={},r=new Map,n={__esModule:!0,initializeApp:function(r,i){void 0===i&&(i={}),"object"==typeof i&&null!==i||(i={name:i});var o=i;void 0===o.name&&(o.name=f);var s=o.name;if("string"!=typeof s||!s)throw l.create("bad-app-name",{appName:String(s)});if((0,a.r3)(t,s))throw l.create("duplicate-app",{appName:s});var c=new e(r,o,n);return t[s]=c,c},app:i,registerVersion:function(e,t,r){var n,i=null!==(n=p[e])&&void 0!==n?n:e;r&&(i+="-"+r);var a=i.match(/\s|\//),c=t.match(/\s|\//);if(a||c){var u=['Unable to register library "'+i+'" with version "'+t+'":'];return a&&u.push('library name "'+i+'" contains illegal characters (whitespace or "/")'),a&&c&&u.push("and"),c&&u.push('version name "'+t+'" contains illegal characters (whitespace or "/")'),void d.warn(u.join(" "))}o(new s.wA(i+"-version",(function(){return{library:i,version:t}}),"VERSION"))},setLogLevel:c.Ub,onLog:function(e,t){if(null!==e&&"function"!=typeof e)throw l.create("invalid-log-argument");(0,c.Am)(e,t)},apps:null,SDK_VERSION:"8.8.1",INTERNAL:{registerComponent:o,removeApp:function(e){delete t[e]},components:r,useAsService:function(e,t){return"serverAuth"===t?null:t}}};function i(e){if(e=e||f,!(0,a.r3)(t,e))throw l.create("no-app",{appName:e});return t[e]}function o(o){var s=o.name;if(r.has(s))return d.debug("There were multiple attempts to register component "+s+"."),"PUBLIC"===o.type?n[s]:null;if(r.set(s,o),"PUBLIC"===o.type){var c=function(e){if(void 0===e&&(e=i()),"function"!=typeof e[s])throw l.create("invalid-app-argument",{appName:s});return e[s]()};void 0!==o.serviceProps&&(0,a.ZB)(c,o.serviceProps),n[s]=c,e.prototype[s]=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._getService.bind(this,s).apply(this,o.multipleInstances?e:[])}}for(var u=0,h=Object.keys(t);u<h.length;u++){var f=h[u];t[f]._addComponent(o)}return"PUBLIC"===o.type?n[s]:null}return n.default=n,Object.defineProperty(n,"apps",{get:function(){return Object.keys(t).map((function(e){return t[e]}))}}),i.App=e,n}(v);return t.INTERNAL=(0,o.pi)((0,o.pi)({},t.INTERNAL),{createFirebaseNamespace:e,extendNamespace:function(e){(0,a.ZB)(t,e)},createSubscribe:a.ne,ErrorFactory:a.LL,deepExtend:a.ZB}),t}(),b=function(){function e(e){this.container=e}return e.prototype.getPlatformInfoString=function(){return this.container.getProviders().map((function(e){if(function(e){var t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){var t=e.getImmediate();return t.library+"/"+t.version}return null})).filter((function(e){return e})).join(" ")},e}();if((0,a.jU)()&&void 0!==self.firebase){d.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");var g=self.firebase.SDK_VERSION;g&&g.indexOf("LITE")>=0&&d.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}var m=y.initializeApp;y.initializeApp=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return(0,a.UG)()&&d.warn('\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the @rollup/plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/@rollup/plugin-node-resolve\n      '),m.apply(void 0,e)};var _=y;!function(e,t){e.INTERNAL.registerComponent(new s.wA("platform-logger",(function(e){return new b(e)}),"PRIVATE")),e.registerVersion(h,"0.6.29",void 0),e.registerVersion("fire-js","")}(_);const E=_},909:(e,t,r)=>{r.d(t,{wA:()=>o,H0:()=>c,zt:()=>s});var n=r(655),i=r(589),o=function(){function e(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},e}(),a="[DEFAULT]",s=function(){function e(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.onInitCallbacks=new Map}return e.prototype.get=function(e){var t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){var r=new i.BH;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{var n=this.getOrInitializeService({instanceIdentifier:t});n&&r.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise},e.prototype.getImmediate=function(e){var t,r=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),n=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(r)&&!this.shouldAutoInitialize()){if(n)return null;throw Error("Service "+this.name+" is not available")}try{return this.getOrInitializeService({instanceIdentifier:r})}catch(e){if(n)return null;throw e}},e.prototype.getComponent=function(){return this.component},e.prototype.setComponent=function(e){var t,r;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}(e))try{this.getOrInitializeService({instanceIdentifier:a})}catch(e){}try{for(var i=(0,n.XA)(this.instancesDeferred.entries()),o=i.next();!o.done;o=i.next()){var s=(0,n.CR)(o.value,2),c=s[0],u=s[1],l=this.normalizeInstanceIdentifier(c);try{var h=this.getOrInitializeService({instanceIdentifier:l});u.resolve(h)}catch(e){}}}catch(e){t={error:e}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(t)throw t.error}}}},e.prototype.clearInstance=function(e){void 0===e&&(e=a),this.instancesDeferred.delete(e),this.instances.delete(e)},e.prototype.delete=function(){return(0,n.mG)(this,void 0,void 0,(function(){var e;return(0,n.Jh)(this,(function(t){switch(t.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all((0,n.ev)((0,n.ev)([],(0,n.CR)(e.filter((function(e){return"INTERNAL"in e})).map((function(e){return e.INTERNAL.delete()})))),(0,n.CR)(e.filter((function(e){return"_delete"in e})).map((function(e){return e._delete()})))))];case 1:return t.sent(),[2]}}))}))},e.prototype.isComponentSet=function(){return null!=this.component},e.prototype.isInitialized=function(e){return void 0===e&&(e=a),this.instances.has(e)},e.prototype.initialize=function(e){var t,r;void 0===e&&(e={});var i=e.options,o=void 0===i?{}:i,a=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(a))throw Error(this.name+"("+a+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var s=this.getOrInitializeService({instanceIdentifier:a,options:o});try{for(var c=(0,n.XA)(this.instancesDeferred.entries()),u=c.next();!u.done;u=c.next()){var l=(0,n.CR)(u.value,2),h=l[0],f=l[1];a===this.normalizeInstanceIdentifier(h)&&f.resolve(s)}}catch(e){t={error:e}}finally{try{u&&!u.done&&(r=c.return)&&r.call(c)}finally{if(t)throw t.error}}return s},e.prototype.onInit=function(e,t){var r,n=this.normalizeInstanceIdentifier(t),i=null!==(r=this.onInitCallbacks.get(n))&&void 0!==r?r:new Set;i.add(e),this.onInitCallbacks.set(n,i);var o=this.instances.get(n);return o&&e(o,n),function(){i.delete(e)}},e.prototype.invokeOnInitCallbacks=function(e,t){var r,i,o=this.onInitCallbacks.get(t);if(o)try{for(var a=(0,n.XA)(o),s=a.next();!s.done;s=a.next()){var c=s.value;try{c(e,t)}catch(e){}}}catch(e){r={error:e}}finally{try{s&&!s.done&&(i=a.return)&&i.call(a)}finally{if(r)throw r.error}}},e.prototype.getOrInitializeService=function(e){var t,r=e.instanceIdentifier,n=e.options,i=void 0===n?{}:n,o=this.instances.get(r);if(!o&&this.component&&(o=this.component.instanceFactory(this.container,{instanceIdentifier:(t=r,t===a?void 0:t),options:i}),this.instances.set(r,o),this.invokeOnInitCallbacks(o,r),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,r,o)}catch(e){}return o||null},e.prototype.normalizeInstanceIdentifier=function(e){return void 0===e&&(e=a),this.component?this.component.multipleInstances?e:a:e},e.prototype.shouldAutoInitialize=function(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode},e}(),c=function(){function e(e){this.name=e,this.providers=new Map}return e.prototype.addComponent=function(e){var t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);t.setComponent(e)},e.prototype.addOrOverwriteComponent=function(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},e.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var t=new s(e,this);return this.providers.set(e,t),t},e.prototype.getProviders=function(){return Array.from(this.providers.values())},e}()},594:(e,t,r)=>{function n(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),i=0;for(t=0;t<r;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)n[i]=o[a];return n}var i;r.d(t,{in:()=>o,Yd:()=>h,Ub:()=>f,Am:()=>p});var o,a=[];!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(o||(o={}));var s={debug:o.DEBUG,verbose:o.VERBOSE,info:o.INFO,warn:o.WARN,error:o.ERROR,silent:o.SILENT},c=o.INFO,u=((i={})[o.DEBUG]="log",i[o.VERBOSE]="log",i[o.INFO]="info",i[o.WARN]="warn",i[o.ERROR]="error",i),l=function(e,t){for(var r=[],i=2;i<arguments.length;i++)r[i-2]=arguments[i];if(!(t<e.logLevel)){var o=(new Date).toISOString(),a=u[t];if(!a)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")");console[a].apply(console,n(["["+o+"]  "+e.name+":"],r))}},h=function(){function e(e){this.name=e,this._logLevel=c,this._logHandler=l,this._userLogHandler=null,a.push(this)}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in o))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?s[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,n([this,o.DEBUG],e)),this._logHandler.apply(this,n([this,o.DEBUG],e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,n([this,o.VERBOSE],e)),this._logHandler.apply(this,n([this,o.VERBOSE],e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,n([this,o.INFO],e)),this._logHandler.apply(this,n([this,o.INFO],e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,n([this,o.WARN],e)),this._logHandler.apply(this,n([this,o.WARN],e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,n([this,o.ERROR],e)),this._logHandler.apply(this,n([this,o.ERROR],e))},e}();function f(e){a.forEach((function(t){t.setLogLevel(e)}))}function p(e,t){for(var r=function(r){var n=null;t&&t.level&&(n=s[t.level]),r.userLogHandler=null===e?null:function(t,r){for(var i=[],a=2;a<arguments.length;a++)i[a-2]=arguments[a];var s=i.map((function(e){if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}})).filter((function(e){return e})).join(" ");r>=(null!=n?n:t.logLevel)&&e({level:o[r].toLowerCase(),message:s,args:i,type:t.name})}},n=0,i=a;n<i.length;n++)r(i[n])}},589:(e,t,r)=>{r.d(t,{BH:()=>f,LL:()=>_,gQ:()=>R,hu:()=>i,g5:()=>o,US:()=>s,h$:()=>c,r3:()=>N,Sg:()=>p,ne:()=>k,p$:()=>l,ZB:()=>h,gK:()=>x,m9:()=>U,GJ:()=>C,jU:()=>y,xb:()=>D,uI:()=>d,UG:()=>v,Yr:()=>g,b$:()=>b,w9:()=>I,cI:()=>O,UI:()=>T,xO:()=>j,DV:()=>L,ug:()=>H,dS:()=>V,Pz:()=>S,Dv:()=>z,Wj:()=>F,lb:()=>M});var n=r(655),i=function(e,t){if(!e)throw o(t)},o=function(e){return new Error("Firebase Database (${JSCORE_VERSION}) INTERNAL ASSERT FAILED: "+e)},a=function(e){for(var t=[],r=0,n=0;n<e.length;n++){var i=e.charCodeAt(n);i<128?t[r++]=i:i<2048?(t[r++]=i>>6|192,t[r++]=63&i|128):55296==(64512&i)&&n+1<e.length&&56320==(64512&e.charCodeAt(n+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++n)),t[r++]=i>>18|240,t[r++]=i>>12&63|128,t[r++]=i>>6&63|128,t[r++]=63&i|128):(t[r++]=i>>12|224,t[r++]=i>>6&63|128,t[r++]=63&i|128)}return t},s={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray:function(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[],i=0;i<e.length;i+=3){var o=e[i],a=i+1<e.length,s=a?e[i+1]:0,c=i+2<e.length,u=c?e[i+2]:0,l=o>>2,h=(3&o)<<4|s>>4,f=(15&s)<<2|u>>6,p=63&u;c||(p=64,a||(f=64)),n.push(r[l],r[h],r[f],r[p])}return n.join("")},encodeString:function(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(a(e),t)},decodeString:function(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){for(var t=[],r=0,n=0;r<e.length;){var i=e[r++];if(i<128)t[n++]=String.fromCharCode(i);else if(i>191&&i<224){var o=e[r++];t[n++]=String.fromCharCode((31&i)<<6|63&o)}else if(i>239&&i<365){var a=((7&i)<<18|(63&(o=e[r++]))<<12|(63&(s=e[r++]))<<6|63&e[r++])-65536;t[n++]=String.fromCharCode(55296+(a>>10)),t[n++]=String.fromCharCode(56320+(1023&a))}else{o=e[r++];var s=e[r++];t[n++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&s)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray:function(e,t){this.init_();for(var r=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[],i=0;i<e.length;){var o=r[e.charAt(i++)],a=i<e.length?r[e.charAt(i)]:0,s=++i<e.length?r[e.charAt(i)]:64,c=++i<e.length?r[e.charAt(i)]:64;if(++i,null==o||null==a||null==s||null==c)throw Error();var u=o<<2|a>>4;if(n.push(u),64!==s){var l=a<<4&240|s>>2;if(n.push(l),64!==c){var h=s<<6&192|c;n.push(h)}}}return n},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},c=function(e){var t=a(e);return s.encodeByteArray(t,!0)},u=function(e){try{return s.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function l(e){return h(void 0,e)}function h(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(var r in t)t.hasOwnProperty(r)&&"__proto__"!==r&&(e[r]=h(e[r],t[r]));return e}var f=function(){function e(){var e=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise((function(t,r){e.resolve=t,e.reject=r}))}return e.prototype.wrapCallback=function(e){var t=this;return function(r,n){r?t.reject(r):t.resolve(n),"function"==typeof e&&(t.promise.catch((function(){})),1===e.length?e(r):e(r,n))}},e}();function p(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');var r=t||"demo-project",i=e.iat||0,o=e.sub||e.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");var a=(0,n.pi)({iss:"https://securetoken.google.com/"+r,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},e);return[s.encodeString(JSON.stringify({alg:"none",type:"JWT"}),!1),s.encodeString(JSON.stringify(a),!1),""].join(".")}function d(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:"")}function v(){try{return"[object process]"===Object.prototype.toString.call(r.g.process)}catch(e){return!1}}function y(){return"object"==typeof self&&self.self===self}function b(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function g(){return!1}var m=function(e){function t(r,n,i){var o=e.call(this,n)||this;return o.code=r,o.customData=i,o.name="FirebaseError",Object.setPrototypeOf(o,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,_.prototype.create),o}return(0,n.ZT)(t,e),t}(Error),_=function(){function e(e,t,r){this.service=e,this.serviceName=t,this.errors=r}return e.prototype.create=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=t[0]||{},i=this.service+"/"+e,o=this.errors[e],a=o?E(o,n):"Error",s=this.serviceName+": "+a+" ("+i+").",c=new m(i,s,n);return c},e}();function E(e,t){return e.replace(w,(function(e,r){var n=t[r];return null!=n?String(n):"<"+r+"?>"}))}var w=/\{\$([^}]+)}/g;function O(e){return JSON.parse(e)}function S(e){return JSON.stringify(e)}var A=function(e){var t={},r={},n={},i="";try{var o=e.split(".");t=O(u(o[0])||""),r=O(u(o[1])||""),i=o[2],n=r.d||{},delete r.d}catch(e){}return{header:t,claims:r,data:n,signature:i}},I=function(e){var t=A(e).claims;return!!t&&"object"==typeof t&&t.hasOwnProperty("iat")},C=function(e){var t=A(e).claims;return"object"==typeof t&&!0===t.admin};function N(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function L(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function D(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function T(e,t,r){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=t.call(r,e[i],i,e));return n}function j(e){for(var t=[],r=function(e,r){Array.isArray(r)?r.forEach((function(r){t.push(encodeURIComponent(e)+"="+encodeURIComponent(r))})):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r))},n=0,i=Object.entries(e);n<i.length;n++){var o=i[n];r(o[0],o[1])}return t.length?"&"+t.join("&"):""}var R=function(){function e(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(var e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}return e.prototype.reset=function(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0},e.prototype.compress_=function(e,t){t||(t=0);var r=this.W_;if("string"==typeof e)for(var n=0;n<16;n++)r[n]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(n=0;n<16;n++)r[n]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(n=16;n<80;n++){var i=r[n-3]^r[n-8]^r[n-14]^r[n-16];r[n]=4294967295&(i<<1|i>>>31)}var o,a,s=this.chain_[0],c=this.chain_[1],u=this.chain_[2],l=this.chain_[3],h=this.chain_[4];for(n=0;n<80;n++)n<40?n<20?(o=l^c&(u^l),a=1518500249):(o=c^u^l,a=1859775393):n<60?(o=c&u|l&(c|u),a=2400959708):(o=c^u^l,a=3395469782),i=(s<<5|s>>>27)+o+h+a+r[n]&4294967295,h=l,l=u,u=4294967295&(c<<30|c>>>2),c=s,s=i;this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+c&4294967295,this.chain_[2]=this.chain_[2]+u&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+h&4294967295},e.prototype.update=function(e,t){if(null!=e){void 0===t&&(t=e.length);for(var r=t-this.blockSize,n=0,i=this.buf_,o=this.inbuf_;n<t;){if(0===o)for(;n<=r;)this.compress_(e,n),n+=this.blockSize;if("string"==typeof e){for(;n<t;)if(i[o]=e.charCodeAt(n),++n,++o===this.blockSize){this.compress_(i),o=0;break}}else for(;n<t;)if(i[o]=e[n],++n,++o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=t}},e.prototype.digest=function(){var e=[],t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(var r=this.blockSize-1;r>=56;r--)this.buf_[r]=255&t,t/=256;this.compress_(this.buf_);var n=0;for(r=0;r<5;r++)for(var i=24;i>=0;i-=8)e[n]=this.chain_[r]>>i&255,++n;return e},e}();function k(e,t){var r=new P(e,t);return r.subscribe.bind(r)}var P=function(){function e(e,t){var r=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((function(){e(r)})).catch((function(e){r.error(e)}))}return e.prototype.next=function(e){this.forEachObserver((function(t){t.next(e)}))},e.prototype.error=function(e){this.forEachObserver((function(t){t.error(e)})),this.close(e)},e.prototype.complete=function(){this.forEachObserver((function(e){e.complete()})),this.close()},e.prototype.subscribe=function(e,t,r){var n,i=this;if(void 0===e&&void 0===t&&void 0===r)throw new Error("Missing Observer.");void 0===(n=function(e,t){if("object"!=typeof e||null===e)return!1;for(var r=0,n=["next","error","complete"];r<n.length;r++){var i=n[r];if(i in e&&"function"==typeof e[i])return!0}return!1}(e)?e:{next:e,error:t,complete:r}).next&&(n.next=B),void 0===n.error&&(n.error=B),void 0===n.complete&&(n.complete=B);var o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((function(){try{i.finalError?n.error(i.finalError):n.complete()}catch(e){}})),this.observers.push(n),o},e.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},e.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},e.prototype.sendOne=function(e,t){var r=this;this.task.then((function(){if(void 0!==r.observers&&void 0!==r.observers[e])try{t(r.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}}))},e.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((function(){t.observers=void 0,t.onNoObservers=void 0})))},e}();function B(){}var z=function(e,t,r,n){var i;if(n<t?i="at least "+t:n>r&&(i=0===r?"none":"no more than "+r),i)throw new Error(e+" failed: Was called with "+n+(1===n?" argument.":" arguments.")+" Expects "+i+".")};function x(e,t){return e+" failed: "+t+" argument "}function F(e,t,r,n){if((!n||r)&&"function"!=typeof r)throw new Error(x(e,t)+"must be a valid function.")}function M(e,t,r,n){if((!n||r)&&("object"!=typeof r||null===r))throw new Error(x(e,t)+"must be a valid context object.")}var V=function(e){for(var t=[],r=0,n=0;n<e.length;n++){var o=e.charCodeAt(n);if(o>=55296&&o<=56319){var a=o-55296;n++,i(n<e.length,"Surrogate pair missing trail surrogate."),o=65536+(a<<10)+(e.charCodeAt(n)-56320)}o<128?t[r++]=o:o<2048?(t[r++]=o>>6|192,t[r++]=63&o|128):o<65536?(t[r++]=o>>12|224,t[r++]=o>>6&63|128,t[r++]=63&o|128):(t[r++]=o>>18|240,t[r++]=o>>12&63|128,t[r++]=o>>6&63|128,t[r++]=63&o|128)}return t},H=function(e){for(var t=0,r=0;r<e.length;r++){var n=e.charCodeAt(r);n<128?t++:n<2048?t+=2:n>=55296&&n<=56319?(t+=4,r++):t+=3}return t};function U(e){return e&&e._delegate?e._delegate:e}},503:(e,t,r)=>{r.d(t,{Z:()=>n.Z});var n=r(99),i="8.9.0";n.Z.registerVersion("firebase",i,"app"),n.Z.SDK_VERSION=i},655:(e,t,r)=>{r.d(t,{ZT:()=>i,pi:()=>o,mG:()=>a,Jh:()=>s,XA:()=>c,CR:()=>u,ev:()=>l});var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var o=function(){return(o=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function a(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function s(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))}function s(e,t){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function c(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function u(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,i,o=r.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)a.push(n.value)}catch(e){i={error:e}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(i)throw i.error}}return a}function l(e,t,r){if(r||2===arguments.length)for(var n,i=0,o=t.length;i<o;i++)!n&&i in t||(n||(n=Array.prototype.slice.call(t,0,i)),n[i]=t[i]);return e.concat(n||t)}Object.create,Object.create}},r={};function n(e){var i=r[e];if(void 0!==i)return i.exports;var o=r[e]={id:e,loaded:!1,exports:{}};return t[e](o,o.exports,n),o.loaded=!0,o.exports}n.m=t,e=[],n.O=(t,r,i,o)=>{if(!r){var a=1/0;for(l=0;l<e.length;l++){for(var[r,i,o]=e[l],s=!0,c=0;c<r.length;c++)(!1&o||a>=o)&&Object.keys(n.O).every((e=>n.O[e](r[c])))?r.splice(c--,1):(s=!1,o<a&&(a=o));if(s){e.splice(l--,1);var u=i();void 0!==u&&(t=u)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[r,i,o]},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={138:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var i,o,[a,s,c]=r,u=0;for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(c)var l=c(n);for(t&&t(r);u<a.length;u++)o=a[u],n.o(e,o)&&e[o]&&e[o][0](),e[a[u]]=0;return n.O(l)},r=self.webpackChunkblessedshoesweb=self.webpackChunkblessedshoesweb||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var i=n(503);i=n.O(i)})();