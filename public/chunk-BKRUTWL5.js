import{a as x}from"./chunk-N4C3QDGY.js";import{a as b,b as s,c as y,d as C,e as F,g as N,h as L,i as _,j as w}from"./chunk-IHONKXOH.js";import"./chunk-GU6JWO6J.js";import{a as v}from"./chunk-5MDO62B3.js";import{B as c,H as f,M as r,N as o,O as d,Q as g,S as n,Y as h,ka as l,la as S,o as i,q as p}from"./chunk-EDOQMP4J.js";var q=(()=>{let t=class t{constructor(){this.router=i(l),this.fb=i(_),this.loginService=i(x),this.sessionService=i(v),this._router=i(l),this.form=this.fb.group({email:["",[s.required,s.email]],password:["",s.required]})}login(){if(this.form.invalid)return this.form.markAllAsTouched();let a=this.form.value;this.loginService.create(a).subscribe({next:({data:e})=>{e&&(this.sessionService.setSession(e),this._router.navigateByUrl("/app/product/list",{replaceUrl:!0}))}})}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=p({type:t,selectors:[["app-login"]],standalone:!0,features:[h],decls:9,vars:1,consts:[[3,"ngSubmit","formGroup"],["placeholder","Email","type","email","formControlName","email"],["placeholder","********","type","password","formControlName","password"],["type","submit"],["routerLink","/auth/register"]],template:function(e,u){e&1&&(r(0,"h1"),n(1,"Login"),o(),r(2,"form",0),g("ngSubmit",function(){return u.login()}),d(3,"input",1)(4,"input",2),r(5,"button",3),n(6,"Iniciar sesi\xF3n"),o()(),r(7,"a",4),n(8,"Registrarse"),o()),e&2&&(c(2),f("formGroup",u.form))},dependencies:[S,w,F,b,y,C,N,L]});let m=t;return m})();export{q as LoginComponent};
