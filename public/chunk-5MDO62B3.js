import{E as i,c as l,k as a}from"./chunk-EDOQMP4J.js";var h=(()=>{let t=class t{constructor(){this.STORAGE_USER_NAME="APP_USER",this.STORAGE_TOKEN="APP_TOKEN",this.user=i(null),this.token=i(null)}setSession(n){var r=n,{token:o}=r,e=l(r,["token"]);localStorage.setItem(this.STORAGE_USER_NAME,JSON.stringify(e)),localStorage.setItem(this.STORAGE_TOKEN,o),this.user.set(e),this.token.set(o)}clearSession(){localStorage.removeItem(this.STORAGE_USER_NAME),localStorage.removeItem(this.STORAGE_TOKEN),this.user.set(null),this.token.set(null)}};t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=a({token:t,factory:t.\u0275fac,providedIn:"root"});let s=t;return s})();export{h as a};
