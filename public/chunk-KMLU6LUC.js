import{a as s}from"./chunk-5MDO62B3.js";import{o as e}from"./chunk-EDOQMP4J.js";var r=class{constructor(){this.sessionService=e(s),this.user=this.sessionService.user()??JSON.parse(localStorage.getItem(this.sessionService.STORAGE_USER_NAME)??"{}")}get isAdmin(){return this.user.type==="admin"}get isUser(){return this.user.type==="user"}};export{r as a};