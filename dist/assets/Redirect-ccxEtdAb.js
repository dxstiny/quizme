import{d as t,e as r,s as u}from"./index-D-7qE5hs.js";const c=t({__name:"Redirect",setup(n){const e=u(),s=r();s.courses.length===0&&e.push("/");const o=s.courses[Math.floor(Math.random()*s.courses.length)].id;return e.push(`/quiz/${o}`),()=>{}}});export{c as default};