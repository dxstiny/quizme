import{d as t,m as r,a as u}from"./index-ff38adcc.js";const c=t({__name:"Redirect",setup(n){const e=r(),s=u();s.courses.length===0&&e.push("/");const o=s.courses[Math.floor(Math.random()*s.courses.length)].id;return e.push(`/quiz/${o}`),()=>{}}});export{c as default};