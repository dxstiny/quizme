import{d,g as _,i as b,G as m,j as v,a as u,b as t,t as r,c0 as g,_ as f,r as h,o as y,c as S,m as o,y as x,z as k}from"./index-BsjsBPlp.js";const q={class:"entry"},w={class:"material-symbols-rounded"},z={class:"label"},C=d({__name:"NavLink",props:{icon:{type:String,required:!1},label:{type:String,required:!0},to:{type:String,required:!0}},setup(a){return(e,i)=>(u(),_(m(a.to?v(g):"div"),{to:a.to,class:"link"},{default:b(()=>[t("div",q,[t("span",w,r(a.icon),1),t("span",z,r(a.label),1)])]),_:1},8,["to"]))}}),s=f(C,[["__scopeId","data-v-55f07b4e"]]),B={class:"wrapper"},N={class:"slot"},c="quizme.sidebar-expanded",E=d({__name:"WithSidebar",setup(a){const e=h(!1),i=()=>{const n=document.querySelector("body");n&&n.style.setProperty("--sidebar-width",e.value?"260px":"88px")};y(()=>{e.value=window.localStorage.getItem(c)==="true",i()});const p=()=>{e.value=!e.value,window.localStorage.setItem(c,e.value.toString()),i()};return(n,l)=>(u(),S("div",B,[t("div",{class:x(["sidebar",{expanded:e.value}])},[l[0]||(l[0]=t("h1",{class:"logo"},"Qz",-1)),o(s,{to:"/",icon:"home",label:"Home"}),o(s,{to:"/quiz",icon:"school",label:"Quiz Me"}),o(s,{to:"/courses",icon:"edit",label:"Courses"}),o(s,{to:"/about",icon:"question_mark",label:"About"}),l[1]||(l[1]=t("div",{class:"spacer"},null,-1)),o(s,{to:"",onClick:p,icon:e.value?"chevron_left":"chevron_right",label:"Hide Sidebar"},null,8,["icon"]),o(s,{to:"/settings",icon:"settings",label:"Settings"})],2),t("div",N,[k(n.$slots,"default")])]))}});export{E as _};
