import{d as g,e as b,r as d,o as w,b_ as C,g as N,i as $,n as A,h as B,a as o,b as t,c as n,t as p,E as I,F as V,l as j,m as a,I as i,j as v,k as q,s as E,_ as G}from"./index-fkUfuDGG.js";import{_ as L}from"./WithSidebar.vue_vue_type_style_index_0_lang-CPpWWZ8t.js";const P={class:"wrap"},R={key:0,class:"flex-col"},S={key:0,class:"text-muted italic text-sm"},T={key:1,class:"mt-4 w-max flex flex-col gap-4"},F={class:"items"},H={class:"card flex gap-2 items-center"},M={class:"flex flex-col"},D={class:"text-muted"},O={class:"mt-4 text-muted text-sm uppercase italic"},W={class:"buttons flex gap-2"},Y={key:1,class:"error flex-col"},z={class:"flex gap-2"},J={key:2,class:"error flex-col"},K={class:"card"},Q=["value"],U=g({__name:"ImportLink",setup(X){const h=A(),r=B(),_=b(),f=d(""),u=d([]),c=d(null),m=d("");w(async()=>{const s=h.params.id,e=await C(s);if(e.error){c.value=e.error;return}u.value=[e.course],f.value=e.author??"(unknown)"});const k=async()=>{const s=u.value[0];s.remote??(s.remote=[]),s.remote.push({identifier:h.params.id}),await _.addCourse(s),r.push(`/courses/${u.value[0].id}`)},x=()=>{const s=Math.random().toString(36).substring(7);_.addCourse({title:"New Course",description:"",questions:[],id:s}),r.push(`/courses/${s}`)},y=()=>{E.setPat(m.value),window.location.reload()};return(s,e)=>(o(),N(L,null,{default:$(()=>[t("div",P,[c.value==null?(o(),n("div",R,[t("span",null,[t("strong",null,p(f.value),1),e[3]||(e[3]=I(" wants to share: "))]),u.value.length==0?(o(),n("span",S,"Nothing")):(o(),n("div",T,[t("div",F,[(o(!0),n(V,null,j(u.value,l=>(o(),n("div",H,[t("div",M,[t("h1",null,p(l.title),1),t("span",D,p(l.description),1),t("span",O,p(l.questions.length)+" questions ",1)])]))),256))]),t("div",W,[a(i,{type:"action-green",icon:"check",label:"Accept",onClick:k}),a(i,{type:"action-red",icon:"close",label:"Reject",onClick:e[0]||(e[0]=l=>v(r).push("/"))})])]))])):c.value=="not-found"?(o(),n("div",Y,[e[4]||(e[4]=t("h1",null,"Guess you'll have to create it yourself...",-1)),e[5]||(e[5]=t("p",null," No course was found at the link you provided. The course may have been deleted or the link may be incorrect. ",-1)),t("div",z,[a(i,{type:"action-green",icon:"add",label:"Create New Course",onClick:x}),a(i,{icon:"home",label:"Home",onClick:e[1]||(e[1]=l=>v(r).push("/"))})])])):c.value=="not-allowed"?(o(),n("div",J,[e[7]||(e[7]=t("h1",null,"Not Allowed",-1)),e[8]||(e[8]=t("p",null,"You don't have permission to view this course.",-1)),t("div",K,[e[6]||(e[6]=t("p",null,"Wait, this is my Gist!",-1)),t("input",{type:"text",value:m.value,placeholder:"Enter your GitHub PAT here"},null,8,Q),a(i,{type:"action-green",icon:"check",label:"Accept",onClick:y,disabled:!m.value.length},null,8,["disabled"])]),a(i,{type:"action-red",icon:"close",label:"Close",onClick:e[2]||(e[2]=l=>v(r).push("/"))})])):q("",!0)])]),_:1}))}}),te=G(U,[["__scopeId","data-v-3c23d2bd"]]);export{te as default};
