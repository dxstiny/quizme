import{m as S,i as k,n as f,c as r}from"./index-55da20c8.js";const n="quizme.stats",h=S("stats",()=>{const o=JSON.parse(localStorage.getItem(n)||"{}"),s=k(o),u=()=>{s.value.start&&new Date(s.value.start).getDate()===new Date().getDate()||(s.value={start:new Date().toISOString(),streaks:[],runs:[]})};f(s,t=>{localStorage.setItem(n,JSON.stringify(t))},{deep:!0}),u();const i=r(()=>s.value.runs.reduce((t,e)=>{if(!e.endTime)return t;typeof e.endTime=="string"&&(e.endTime=new Date(e.endTime)),typeof e.startTime=="string"&&(e.startTime=new Date(e.startTime));const d=e.endTime.getTime()-e.startTime.getTime();return t+d},0)),c=r(()=>s.value.runs.reduce((t,e)=>t+e.correct.length,0)),l=(t=!0)=>{const e=s.value.streaks;if(!t){a();return}e.length===0&&e.push(0),e[e.length-1]+=1,console.log("current streak",e[e.length-1])},a=()=>{const t=s.value.streaks;console.log("streak ended!",t[t.length-1]),t.push(0)},m=t=>{s.value.runs.push(t)},g=r(()=>s.value.streaks.length===0?0:Math.max(...s.value.streaks));return{stats:s,timeSpent:i,correctQuestions:c,addToStreak:l,resetStreak:a,addRun:m,bestStreak:g,streaksOver:t=>s.value.streaks.filter(e=>e>=t).length}});export{h as u};
