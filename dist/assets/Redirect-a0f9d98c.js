import{d as t,n as r,a as n}from"./index-c328ba18.js";const c=t({__name:"Redirect",setup(u){const e=r(),s=n();s.courses.length===0&&e.push("/");const o=s.courses[Math.floor(Math.random()*s.courses.length)].id;return e.push(`/quiz/${o}`),()=>{}}});export{c as default};