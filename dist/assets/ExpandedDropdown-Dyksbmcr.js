import{d as c,j as i,v as p,o as s,f as o,F as m,r as v,aK as _,b3 as f,_ as k}from"./index-Cl-6axvi.js";const V={class:"dropdown"},h=["onClick"],w=c({__name:"ExpandedDropdown",props:{modelValue:{required:!0},options:{type:Array,required:!0}},emits:["update:modelValue"],setup(t,{emit:n}){const l=t,r=i(l.modelValue);p(()=>l.modelValue,e=>r.value=e);const d=n,u=e=>{d("update:modelValue",e)};return(e,x)=>(s(),o("div",V,[(s(!0),o(m,null,v(t.options,a=>(s(),o("div",{class:_(["option",{selected:a.value===r.value}]),key:a.value,onClick:C=>u(a.value)},[f(e.$slots,"label",{option:a},void 0,!0)],10,h))),128))]))}}),b=k(w,[["__scopeId","data-v-0454de7b"]]);export{b as E};