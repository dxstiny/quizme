import{d as t,j as r,h as u}from"./index-fbf9f22c.js";const i=t({__name:"Redirect",setup(n){const s=r(),e=u();e.courses.length===0&&s.push("/");const o=e.courses[0].id;return s.push(`/quiz/${o}`),()=>{}}});export{i as default};