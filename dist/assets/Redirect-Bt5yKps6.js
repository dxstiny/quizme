import{d as t,e as r,h as u}from"./index-BsjsBPlp.js";const c=t({__name:"Redirect",setup(n){const s=u(),e=r();if(e.courses.length===0)s.push("/");else{const o=e.courses[Math.floor(Math.random()*e.courses.length)].id;s.push(`/quiz/${o}`)}return()=>{}}});export{c as default};
