import{_ as m}from"./WithSidebar.vue_vue_type_style_index_0_lang-e7e2e8d9.js";import{u as v}from"./stats-dc6b1889.js";import{d as g,u as x,c as l,a as f,w as S,o as a,b as s,e as i,f as b,r as k,t as c,F as y,p as w,g as B,_ as D}from"./index-e6ae33e5.js";const r=o=>(w("data-v-01bb5584"),o=o(),B(),o),I={class:"wrap"},$={class:"dashboard"},C=r(()=>s("div",{class:"progress"},[s("h1",null,"Dashboard"),s("p",{class:"muted"},"Welcome back!")],-1)),q={class:"other"},F={key:0,class:"card"},G=r(()=>s("h2",null,"Goals",-1)),M=[G],N={class:"card"},Q=r(()=>s("h2",null,"Daily Quests",-1)),V={class:"quests"},E={class:"quest"},L={class:"icon"},W={class:"material-symbols-rounded"},j={class:"info"},z={class:"progress"},A=["value","max"],H=g({__name:"index",setup(o){const n=v(),d=x(),u=l(()=>[]),p=d.settings.questDifficulty,t=[15,5,5].map(_=>_*p),h=l(()=>[{title:`Solve ${t[0]} questions`,icon:"school",progress:n.correctQuestions,max:t[0]},{title:`Spend ${t[1]} minutes learning`,icon:"timer",progress:n.timeSpent/60/1e3,max:t[1]},{title:`Get ${t[2]} questions correct in a row`,icon:"check",progress:n.bestStreak,max:t[2]}]);return(_,J)=>(a(),f(m,null,{default:S(()=>[s("div",I,[s("div",$,[C,s("div",q,[u.value.length?(a(),i("div",F,M)):b("",!0),s("div",N,[Q,s("div",V,[(a(!0),i(y,null,k(h.value,e=>(a(),i("div",E,[s("div",L,[s("span",W,c(e.icon),1)]),s("div",j,[s("h3",null,c(e.title),1),s("div",z,[s("progress",{value:e.progress,max:e.max},null,8,A),s("span",null,c(Math.round(e.progress))+" / "+c(e.max),1)])])]))),256))])])])])])]),_:1}))}});const R=D(H,[["__scopeId","data-v-01bb5584"]]);export{R as default};
