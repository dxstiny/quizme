import{d as h,u as f,b as m,w as d,o as g,e as t,n as c,t as u,g as e,bN as b,bO as y,y as v,z as x,p as V,i as w,a8 as r,_ as D}from"./index-Cl-6axvi.js";import{_ as S}from"./WithSidebar.vue_vue_type_style_index_0_lang-Dp1SVAtl.js";import{E as _}from"./ExpandedDropdown-Dyksbmcr.js";const o=n=>(V("data-v-df6a885c"),n=n(),w(),n),k={class:"wrap"},I={class:"settings"},L={class:"main"},q=o(()=>t("h1",null,"Settings",-1)),N=o(()=>t("h2",null,"Quiz Length",-1)),U={class:"label"},B=o(()=>t("hr",null,null,-1)),z=o(()=>t("h2",null,"Quest Difficulty",-1)),C={class:"label"},E={class:"other"},Q={class:"card"},T=o(()=>t("h2",null,"About you",-1)),A=o(()=>t("p",{class:"muted"},[r(" We want to "),t("span",{class:"strikethrough"},"sell your data to facebook "),r("personalise the UI for you, to make you feel at home! ")],-1)),M={class:"input"},O=o(()=>t("span",{class:"material-symbols-rounded"}," person ",-1)),W=h({__name:"index",setup(n){const a=f(),p=i=>i==-1?"all":i==-2?"not yet mastered":i;return(i,l)=>(g(),m(S,null,{default:d(()=>[t("div",k,[t("div",I,[t("div",L,[q,N,c(_,{options:e(b),modelValue:e(a).settings.defaultLength,"onUpdate:modelValue":l[0]||(l[0]=s=>e(a).settings.defaultLength=s)},{label:d(({option:s})=>[t("div",U,[t("h3",null,u(s.label),1),t("p",null,u(p(s.value))+" questions ",1)])]),_:1},8,["options","modelValue"]),B,z,c(_,{options:e(y),modelValue:e(a).settings.questDifficulty,"onUpdate:modelValue":l[1]||(l[1]=s=>e(a).settings.questDifficulty=s)},{label:d(({option:s})=>[t("div",C,[t("h3",null,u(s.label),1)])]),_:1},8,["options","modelValue"])]),t("div",E,[t("div",Q,[T,A,t("div",M,[O,v(t("input",{"onUpdate:modelValue":l[2]||(l[2]=s=>e(a).settings.username=s),type:"text",placeholder:"Your name"},null,512),[[x,e(a).settings.username]])])])])])])]),_:1}))}}),F=D(W,[["__scopeId","data-v-df6a885c"]]);export{F as default};