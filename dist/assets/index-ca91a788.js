import{d as p,h,a as v,w as C,o as a,b as s,k as t,l as c,I as n,e as r,r as b,t as _,F as m,p as f,g as k,_ as $}from"./index-55da20c8.js";import{_ as g}from"./WithSidebar.vue_vue_type_style_index_0_lang-0f7b1232.js";const x=o=>(f("data-v-100becb9"),o=o(),k(),o),I={class:"dashboard"},S={class:"head"},B=x(()=>s("h1",null,"Courses",-1)),w={class:"actions"},y={class:"courses"},F={class:"course"},N={class:"info"},q={class:"muted"},E={class:"actions"},L=p({__name:"index",setup(o){const i=h();return(d,l)=>(a(),v(g,null,{default:C(()=>[s("div",I,[s("div",S,[B,s("div",w,[t(n,{icon:"add",label:"Add",type:"action-green",onClick:l[0]||(l[0]=e=>c(i).addCourse({title:"New Course",description:"Course description",questions:[],id:Math.random().toString(36).substring(7)}))}),t(n,{icon:"file_upload",label:"Upload",onClick:c(i).addFromUpload},null,8,["onClick"])])]),s("div",y,[(a(!0),r(m,null,b(c(i).courses,e=>(a(),r("div",F,[s("div",N,[s("h2",null,_(e.title),1),s("p",q,_(e.description),1)]),s("div",E,[t(n,{label:"Edit",icon:"edit",onClick:u=>d.$router.push(`/courses/${e.id}`)},null,8,["onClick"]),t(n,{label:"Learn",icon:"school",onClick:u=>d.$router.push(`/quiz/${e.id}`)},null,8,["onClick"])])]))),256))])])]),_:1}))}});const z=$(L,[["__scopeId","data-v-100becb9"]]);export{z as default};