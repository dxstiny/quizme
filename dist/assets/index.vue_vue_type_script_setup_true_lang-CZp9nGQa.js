import{d as defineComponent,r as ref,w as watch,f as computed,a as openBlock,c as createElementBlock,y as renderSlot,v as withDirectives,x as vModelText,z as withModifiers,A as withKeys,B as normalizeClass,C as nextTick,_ as _export_sfc,t as toDisplayString,k as createCommentVNode,E as createTextVNode,b as createBaseVNode,g as createBlock,m as createVNode,i as withCtx,F as Fragment,l as renderList,o as onMounted,j as unref,I as IconButton,G as resolveDynamicComponent}from"./index-fkUfuDGG.js";import{d as draggable}from"./FillInTheBlank.vue_vue_type_style_index_0_lang-CFw6Gsvs.js";import{E as ExpandedDropdown}from"./ExpandedDropdown-BxRWDugF.js";const _hoisted_1$b=["placeholder"],_sfc_main$c=defineComponent({__name:"EditableText",props:{modelValue:{type:String,required:!0},locked:{type:Boolean,default:!1},noOutline:{type:Boolean,default:!1},placeholder:{type:String,default:"Click to edit"}},emits:["update:modelValue","change"],setup(t,{emit:e}){const o=t,u=ref(o.modelValue);watch(()=>o.modelValue,i=>u.value=i);const n=ref(!1),l=e,p=ref(null),d=()=>{o.locked||(n.value=!0,nextTick(()=>{p.value&&(m(),p.value.focus())}))},s=computed(()=>o.locked?!0:n.value?!1:u.value),r=i=>{u.value=i,l("change",i),l("update:modelValue",i)},m=()=>{p.value&&(p.value.style.height="auto",p.value.style.height=p.value.scrollHeight+"px")},a=i=>{i.shiftKey||(i.preventDefault(),n.value=!n.value)};return(i,c)=>(openBlock(),createElementBlock("div",{class:normalizeClass(["editable-text",{outlined:!t.noOutline&&n.value}]),onDblclick:withModifiers(d,["stop"])},[s.value?renderSlot(i.$slots,"default",{key:0},void 0,!0):withDirectives((openBlock(),createElementBlock("textarea",{key:1,ref_key:"area",ref:p,"onUpdate:modelValue":c[0]||(c[0]=f=>u.value=f),onChange:c[1]||(c[1]=f=>r(f.target.value)),onInput:c[2]||(c[2]=f=>m()),onClick:c[3]||(c[3]=withModifiers(f=>n.value=!0,["stop"])),onKeydown:[withKeys(a,["enter"]),c[4]||(c[4]=withKeys(f=>n.value=!1,["esc"]))],onBlur:c[5]||(c[5]=f=>n.value=!1),placeholder:t.placeholder},null,40,_hoisted_1$b)),[[vModelText,u.value]])],34))}}),EditableText=_export_sfc(_sfc_main$c,[["__scopeId","data-v-5c22ad80"]]),_hoisted_1$a={class:"tag"},_hoisted_2$9={key:0,class:"material-symbols-rounded"},_sfc_main$b=defineComponent({__name:"Tag",props:{label:String,icon:String},setup(t){return(e,o)=>(openBlock(),createElementBlock("div",_hoisted_1$a,[t.icon?(openBlock(),createElementBlock("span",_hoisted_2$9,toDisplayString(t.icon),1)):createCommentVNode("",!0),createTextVNode(" "+toDisplayString(t.label),1)]))}}),Tag=_export_sfc(_sfc_main$b,[["__scopeId","data-v-5305512e"]]),_hoisted_1$9={class:"question multiple-choice"},_hoisted_2$8={class:"header"},_hoisted_3$8={class:"options"},_hoisted_4$7=["onClick","onKeypress"],_hoisted_5$5=["onClick"],_sfc_main$a=defineComponent({__name:"MultipleChoice",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1},showCorrection:{type:Boolean,default:!1}},setup(t){const e=t,o=ref([]),u=()=>{if(e.editable){o.value=e.question.options;return}const d=e.question.options[e.question.solution];o.value=e.question.options.sort(()=>Math.random()-.5),e.question.solution=o.value.findIndex(s=>s===d),e.question.options=e.question.options};u(),watch(()=>e.question.options,u);const n=d=>{if(!e.disabled){if(e.editable){e.question.solution=d;return}e.question.answer=d}},l=d=>{if(e.editable&&e.question.solution===d||e.showCorrection&&e.question.solution===d&&e.question.answer===d)return!0},p=d=>{if(e.showCorrection&&e.question.solution!==d&&e.question.answer===d||e.showCorrection&&e.question.solution===d&&e.question.answer!==d)return!0};return(d,s)=>(openBlock(),createElementBlock("div",_hoisted_1$9,[createBaseVNode("div",_hoisted_2$8,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Multiple Choice",icon:"rule"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":s[0]||(s[0]=r=>t.question.title=r),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":s[1]||(s[1]=r=>t.question.question=r)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),createBaseVNode("div",_hoisted_3$8,[(openBlock(!0),createElementBlock(Fragment,null,renderList(o.value,(r,m)=>(openBlock(),createElementBlock("div",{class:normalizeClass(["option",{selected:!t.editable&&e.question.answer===m,correct:l(m),wrong:p(m)}]),tabindex:"0",onClick:a=>n(m),onKeypress:withKeys(withModifiers(a=>n(m),["stop"]),["space"])},[createVNode(EditableText,{locked:!t.editable,"no-outline":"",modelValue:o.value[m],"onUpdate:modelValue":a=>o.value[m]=a},{default:withCtx(()=>[createBaseVNode("span",null,toDisplayString(r),1)]),_:2},1032,["locked","modelValue","onUpdate:modelValue"]),t.editable?(openBlock(),createElementBlock("span",{key:0,class:"material-symbols-rounded delete",onClick:withModifiers(a=>e.question.options.splice(m,1),["stop"])}," delete ",8,_hoisted_5$5)):createCommentVNode("",!0)],42,_hoisted_4$7))),256)),t.editable?(openBlock(),createElementBlock("div",{key:0,class:"option add",onClick:s[2]||(s[2]=withModifiers(r=>e.question.options.push("Option"),["stop"]))},s[3]||(s[3]=[createBaseVNode("span",{class:"material-symbols-rounded add"}," add ",-1),createTextVNode(" Add ")]))):createCommentVNode("",!0)])]))}}),MultipleChoice=_export_sfc(_sfc_main$a,[["__scopeId","data-v-20881473"]]),_hoisted_1$8={class:"question multiple-choice"},_hoisted_2$7={class:"header"},_hoisted_3$7={class:"options"},_hoisted_4$6=["onClick","onKeypress"],_hoisted_5$4=["onClick"],_sfc_main$9=defineComponent({__name:"MultipleAnswers",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1},showCorrection:{type:Boolean,default:!1}},setup(t){const e=t,o=ref([]),u=()=>{if(e.editable){o.value=e.question.options;return}const d=e.question.solution.map(s=>e.question.options[s]);o.value=e.question.options.sort(()=>Math.random()-.5),e.question.solution=d.map(s=>o.value.findIndex(r=>r===s)),e.question.options=e.question.options,e.question.answer=e.question.answer??[]};u(),watch(()=>e.question.options,u);const n=d=>{if(!e.disabled){if(e.editable){if(e.question.solution.includes(d)){e.question.solution.splice(e.question.solution.findIndex(s=>s===d),1);return}e.question.solution.push(d);return}if(e.question.answer||(e.question.answer=[]),e.question.answer.includes(d)){e.question.answer.splice(e.question.answer.findIndex(s=>s===d),1);return}e.question.answer.push(d)}},l=d=>{var s;return!!(e.editable&&e.question.solution.includes(d)||e.showCorrection&&e.question.solution.includes(d)&&((s=e.question.answer)!=null&&s.includes(d)))},p=d=>{var s,r;return e.showCorrection?!!(!e.question.solution.includes(d)&&((s=e.question.answer)!=null&&s.includes(d))||e.question.solution.includes(d)&&!((r=e.question.answer)!=null&&r.includes(d))):!1};return onMounted(()=>{e.question.answer=[]}),(d,s)=>(openBlock(),createElementBlock("div",_hoisted_1$8,[createBaseVNode("div",_hoisted_2$7,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Multiple Answer",icon:"checklist_rtl"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":s[0]||(s[0]=r=>t.question.title=r),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":s[1]||(s[1]=r=>t.question.question=r)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),createBaseVNode("div",_hoisted_3$7,[(openBlock(!0),createElementBlock(Fragment,null,renderList(o.value,(r,m)=>{var a,i;return openBlock(),createElementBlock("div",{class:normalizeClass(["option",{selected:!t.editable&&((i=(a=e.question)==null?void 0:a.answer)==null?void 0:i.includes(m)),correct:l(m),wrong:p(m)}]),tabindex:"0",onClick:c=>n(m),onKeypress:withKeys(withModifiers(c=>n(m),["stop"]),["space"])},[createVNode(EditableText,{locked:!t.editable,"no-outline":"",onKeypress:s[2]||(s[2]=withKeys(withModifiers(()=>{},["stop"]),["space"])),modelValue:o.value[m],"onUpdate:modelValue":c=>o.value[m]=c},{default:withCtx(()=>[createBaseVNode("span",null,toDisplayString(r),1)]),_:2},1032,["locked","modelValue","onUpdate:modelValue"]),t.editable?(openBlock(),createElementBlock("span",{key:0,class:"material-symbols-rounded delete",onClick:withModifiers(c=>e.question.options.splice(m,1),["stop"])}," delete ",8,_hoisted_5$4)):createCommentVNode("",!0)],42,_hoisted_4$6)}),256)),t.editable?(openBlock(),createElementBlock("div",{key:0,class:"option add",onClick:s[3]||(s[3]=withModifiers(r=>e.question.options.push("Option"),["stop"]))},s[4]||(s[4]=[createBaseVNode("span",{class:"material-symbols-rounded add"}," add ",-1),createTextVNode(" Add ")]))):createCommentVNode("",!0)])]))}}),MultipleAnswers=_export_sfc(_sfc_main$9,[["__scopeId","data-v-7ebaadc9"]]),_hoisted_1$7={class:"question multiple-choice"},_hoisted_2$6={class:"header"},_hoisted_3$6={class:"optionlist"},_hoisted_4$5={class:"options"},_hoisted_5$3=["onClick","onKeypress"],_hoisted_6$2=["onClick","onKeypress"],_sfc_main$8=defineComponent({__name:"Matching",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(t){const e=t,o=ref({left:[],right:[]}),u=ref({left:[],right:[]}),n=ref({left:[],right:[]}),l=()=>{const a=Object.keys(e.question.solution),i=Object.values(e.question.solution);if(u.value.left=[],u.value.right=[],e.editable){o.value.left=a,o.value.right=i;return}o.value.left=a.sort(()=>Math.random()-.5),o.value.right=i.sort(()=>Math.random()-.5)};l(),watch(()=>e.question.solution,l,{deep:!0});const p=(a,i,c)=>Object.keys(a).reduce((h,q)=>(q===i?h[c]=a[i]:h[q]=a[q],h),{}),d=(a,i,c)=>{if(e.editable)if(a=="left"){const f=o.value.left[i],v=c;e.question.solution=p(e.question.solution,f,v)}else{const f=o.value.left[i];e.question.solution[f]=c}},s=ref({left:null,right:null}),r=(a,i,c)=>{if(!e.editable){m(i,c);return}if(a.shiftKey)return;a.preventDefault();const v=a.target.querySelector("div");if(v){const h=new MouseEvent("dblclick",{view:window,bubbles:!0,cancelable:!0});v.dispatchEvent(h);return}},m=(a,i)=>{if(e.disabled||e.editable||(e.question.answer||(e.question.answer={}),u.value[i].includes(a)))return;if(s.value[i]===a){s.value[i]=null;return}if(s.value[i]=a,s.value.left===null||s.value.right===null)return;const c=o.value.left[s.value.left],f=o.value.right[s.value.right];if(e.question.answer[c]=f,e.question.solution[c]===f)u.value.left.push(s.value.left),u.value.right.push(s.value.right);else{n.value.left.push(s.value.left),n.value.right.push(s.value.right);const v=s.value.left,h=s.value.right;setTimeout(()=>{n.value.left=n.value.left.filter(q=>q!==v),n.value.right=n.value.right.filter(q=>q!==h)},1e3)}s.value.left=null,s.value.right=null};return(a,i)=>(openBlock(),createElementBlock("div",_hoisted_1$7,[createBaseVNode("div",_hoisted_2$6,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Matching",icon:"signpost"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":i[0]||(i[0]=c=>t.question.title=c),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":i[1]||(i[1]=c=>t.question.question=c)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),createBaseVNode("div",_hoisted_3$6,[(openBlock(!0),createElementBlock(Fragment,null,renderList(o.value.left,(c,f)=>(openBlock(),createElementBlock("div",_hoisted_4$5,[(openBlock(),createElementBlock(Fragment,null,renderList(["left","right"],v=>createBaseVNode("div",{class:normalizeClass(["option",{selected:!t.editable&&s.value[v]===f,correct:!t.editable&&u.value[v].includes(f),wrong:!t.editable&&n.value[v].includes(f)}]),tabindex:"0",onClick:h=>m(f,v),onKeypress:[withKeys(withModifiers(h=>m(f,v),["stop"]),["space"]),withKeys(h=>r(h,f,v),["enter"])]},[createVNode(EditableText,{locked:!t.editable,"no-outline":"",onChange:h=>d(v,f,h),modelValue:o.value[v][f],"onUpdate:modelValue":h=>o.value[v][f]=h},{default:withCtx(()=>[createBaseVNode("span",null,toDisplayString(o.value[v][f]),1)]),_:2},1032,["locked","onChange","modelValue","onUpdate:modelValue"])],42,_hoisted_5$3)),64)),t.editable?(openBlock(),createElementBlock("span",{key:0,class:"material-symbols-rounded delete",tabindex:"0",onClick:withModifiers(v=>delete e.question.solution[c],["stop"]),onKeypress:withKeys(withModifiers(v=>delete e.question.solution[c],["stop"]),["enter"])}," delete ",40,_hoisted_6$2)):createCommentVNode("",!0)]))),256)),t.editable?(openBlock(),createElementBlock("div",{key:0,class:"option add",tabindex:"0",onClick:i[2]||(i[2]=withModifiers(c=>e.question.solution.A="B",["stop"])),onKeypress:i[3]||(i[3]=withKeys(c=>e.question.solution.A="B",["enter"]))},i[4]||(i[4]=[createBaseVNode("span",{class:"material-symbols-rounded add"}," add ",-1),createTextVNode(" Add ")]),32)):createCommentVNode("",!0)])]))}}),Matching=_export_sfc(_sfc_main$8,[["__scopeId","data-v-948b83f3"]]),_hoisted_1$6={class:"switch"},_sfc_main$7=defineComponent({__name:"Switch",props:{modelValue:{type:Boolean,default:!1},label:{type:String,default:""}},emits:["update:modelValue"],setup(t,{emit:e}){const o=t,u=e,n=()=>{u("update:modelValue",!o.modelValue)};return(l,p)=>(openBlock(),createElementBlock("div",_hoisted_1$6,[createBaseVNode("div",{class:normalizeClass(["toggle-switch",{"toggle-switch--on":t.modelValue}]),onClick:n},null,2),createBaseVNode("label",null,toDisplayString(t.label),1)]))}}),levenshtein=(t,e)=>{if(t===e)return 0;var o=t.length,u=e.length;if(o===0||u===0)return o+u;var n=0,l,p,d,s,r,m,a,i,c=new Array(o);for(l=0;l<o;)c[l]=++l;for(;n+3<u;n+=4){var f=e.charCodeAt(n),v=e.charCodeAt(n+1),h=e.charCodeAt(n+2),q=e.charCodeAt(n+3);for(s=n,d=n+1,r=n+2,m=n+3,a=n+4,l=0;l<o;l++)i=t.charCodeAt(l),p=c[l],p<s||d<s?s=p>d?d+1:p+1:f!==i&&s++,s<d||r<d?d=s>r?r+1:s+1:v!==i&&d++,d<r||m<r?r=d>m?m+1:d+1:h!==i&&r++,r<m||a<m?m=r>a?a+1:r+1:q!==i&&m++,c[l]=a=m,m=r,r=d,d=s,s=p}for(;n<u;){var V=e.charCodeAt(n);for(s=n,r=++n,l=0;l<o;l++)p=c[l],p<s||r<s?r=p>r?r+1:p+1:V!==t.charCodeAt(l)?r=s+1:r=s,c[l]=r,s=p;a=r}return a},safeEval=t=>new Function("return "+t)(),_hoisted_1$5={class:"question"},_hoisted_2$5={class:"header"},_hoisted_3$5={key:0,class:"input"},_hoisted_4$4={class:"line"},_hoisted_5$2=["disabled"],_hoisted_6$1={class:"line notepad"},_hoisted_7$1={key:1},_hoisted_8$1={key:1,class:"settings"},_hoisted_9$1={class:"type-and-help"},_hoisted_10$1={class:"label"},_hoisted_11$1={key:0},_hoisted_12$1={class:"settings"},_hoisted_13={class:"pair"},_hoisted_14={class:"pair"},_hoisted_15={class:"pair"},_hoisted_16={class:"pair"},_sfc_main$6=defineComponent({__name:"NumberInput",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(__props){ref();const props=__props,value=ref(props.editable?props.question.solution:null),cachedQuestionId=ref(props.question.id);watch(value,()=>{if(value.value!=null){if(props.editable){props.question.solution=value.value;return}props.question.answer=value.value}}),watch(()=>props.question,()=>{if(cachedQuestionId.value!=props.question.id){if(cachedQuestionId.value=props.question.id,props.editable){value.value=props.question.solution;return}value.value=0}},{deep:!0});const typeOptions=[{label:"Exact",value:"exact"},{label:"Range",value:"range"}],type=ref("");watch(type,()=>{type.value==="exact"?(props.question.solution=props.question.solution||0,props.question.delta=props.question.delta||0,delete props.question.min,delete props.question.max):(props.question.solution=0,delete props.question.delta,props.question.min=props.question.min||0,props.question.max=props.question.max||0)}),onMounted(()=>{if(props.editable){if(props.question.allowNotes==null&&(props.question.allowNotes=!0),props.question.min!=null||props.question.max!=null){type.value="range";return}type.value="exact"}});const notes=ref(""),calculate=()=>{var t;if(!props.question.allowNotes||!props.question.allowCalculator)return;const latestLine=(t=notes.value.split(`
`).at(-1))==null?void 0:t.trim();if(latestLine!=null&&latestLine.endsWith("=")){const result=eval(latestLine.slice(0,-1));typeof result=="number"&&(value.value=result,notes.value+=result)}},autoResize=t=>{if(!t)return;const e=t;e.style.height="auto",e.style.height=e.scrollHeight+"px"};return(t,e)=>(openBlock(),createElementBlock("div",_hoisted_1$5,[createBaseVNode("div",_hoisted_2$5,[__props.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Number Input",icon:"calculate"})),createVNode(EditableText,{locked:!__props.editable,modelValue:__props.question.title,"onUpdate:modelValue":e[0]||(e[0]=o=>__props.question.title=o),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(__props.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!__props.editable,modelValue:__props.question.question,"onUpdate:modelValue":e[1]||(e[1]=o=>__props.question.question=o)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(__props.question.question),1)]),_:1},8,["locked","modelValue"])]),__props.editable?(openBlock(),createElementBlock("div",_hoisted_8$1,[createBaseVNode("div",_hoisted_9$1,[createVNode(ExpandedDropdown,{options:typeOptions,modelValue:type.value,"onUpdate:modelValue":e[5]||(e[5]=o=>type.value=o)},{label:withCtx(({option:o})=>[createBaseVNode("div",_hoisted_10$1,[createBaseVNode("h3",null,toDisplayString(o.label),1),o.description?(openBlock(),createElementBlock("p",_hoisted_11$1,toDisplayString(o.description),1)):createCommentVNode("",!0)])]),_:1},8,["modelValue"]),createBaseVNode("div",_hoisted_12$1,[createVNode(_sfc_main$7,{label:"allow calculator",modelValue:__props.question.allowCalculator,"onUpdate:modelValue":e[6]||(e[6]=o=>__props.question.allowCalculator=o)},null,8,["modelValue"]),createVNode(_sfc_main$7,{label:"allow notes",modelValue:__props.question.allowNotes,"onUpdate:modelValue":e[7]||(e[7]=o=>__props.question.allowNotes=o)},null,8,["modelValue"])])]),type.value=="exact"?(openBlock(),createElementBlock(Fragment,{key:0},[createBaseVNode("div",_hoisted_13,[e[15]||(e[15]=createBaseVNode("label",null,"Value",-1)),withDirectives(createBaseVNode("input",{"onUpdate:modelValue":e[8]||(e[8]=o=>__props.question.solution=o),type:"number"},null,512),[[vModelText,__props.question.solution]])]),createBaseVNode("div",_hoisted_14,[e[16]||(e[16]=createBaseVNode("label",null,"Tolerance (delta)",-1)),withDirectives(createBaseVNode("input",{"onUpdate:modelValue":e[9]||(e[9]=o=>__props.question.delta=o),type:"number"},null,512),[[vModelText,__props.question.delta]])])],64)):(openBlock(),createElementBlock(Fragment,{key:1},[createBaseVNode("div",_hoisted_15,[e[17]||(e[17]=createBaseVNode("label",null,"Minimum",-1)),withDirectives(createBaseVNode("input",{"onUpdate:modelValue":e[10]||(e[10]=o=>__props.question.min=o),type:"number"},null,512),[[vModelText,__props.question.min]])]),createBaseVNode("div",_hoisted_16,[e[18]||(e[18]=createBaseVNode("label",null,"Maximum",-1)),withDirectives(createBaseVNode("input",{"onUpdate:modelValue":e[11]||(e[11]=o=>__props.question.max=o),type:"number"},null,512),[[vModelText,__props.question.max]])])],64))])):(openBlock(),createElementBlock("div",_hoisted_3$5,[createBaseVNode("div",_hoisted_4$4,[e[12]||(e[12]=createBaseVNode("span",{class:"material-symbols-rounded"}," calculate ",-1)),withDirectives(createBaseVNode("input",{"onUpdate:modelValue":e[2]||(e[2]=o=>value.value=o),type:"number",disabled:__props.disabled,placeholder:"Enter your answer here"},null,8,_hoisted_5$2),[[vModelText,value.value]])]),__props.question.allowNotes||__props.question.allowCalculator?(openBlock(),createElementBlock(Fragment,{key:0},[e[14]||(e[14]=createBaseVNode("hr",null,null,-1)),createBaseVNode("div",_hoisted_6$1,[__props.question.allowNotes?withDirectives((openBlock(),createElementBlock("textarea",{key:0,class:"notes",placeholder:"Notes",onKeypress:withKeys(calculate,["enter"]),onInput:e[3]||(e[3]=o=>autoResize(o.target)),"onUpdate:modelValue":e[4]||(e[4]=o=>notes.value=o)},null,544)),[[vModelText,notes.value]]):createCommentVNode("",!0),__props.question.allowCalculator?(openBlock(),createElementBlock("span",_hoisted_7$1,e[13]||(e[13]=[createBaseVNode("span",{class:"material-symbols-rounded"}," info ",-1),createTextVNode(" Calculator enabled. Terminate your calculation with an = and press enter. ")]))):createCommentVNode("",!0)])],64)):createCommentVNode("",!0)]))]))}}),NumberInput=_export_sfc(_sfc_main$6,[["__scopeId","data-v-376a4b47"]]),checkTextAnswer=t=>{let e=t.answer,o=t.solution,u=t.solutionAll,n=t.solutionAny;if(e==null)return!1;if(t.ignoreCase&&(e=e.toLowerCase(),o=o.toLowerCase(),u=u==null?void 0:u.map(l=>l.toLowerCase()),n=n==null?void 0:n.map(l=>l.toLowerCase())),t.ignoreWhitespace&&(e=e.replace(/\s/g,""),o=o.replace(/\s/g,""),u=u==null?void 0:u.map(l=>l.replace(/\s/g,"")),n=n==null?void 0:n.map(l=>l.replace(/\s/g,""))),t.ignorePunctuation){const l=/[.,\/#!$%\^&\*;:{}=\-_`~()]/g;e=e.replace(l,""),o=o.replace(l,""),u=u==null?void 0:u.map(p=>p.replace(l,"")),n=n==null?void 0:n.map(p=>p.replace(l,""))}if(t.solutionRegex){let l=safeEval(t.solutionRegex);return l instanceof RegExp||(l=new RegExp(t.solutionRegex)),l.test(e)}return u!=null&&u.length?u.every(l=>e==null?void 0:e.includes(l)):n!=null&&n.length?n.some(l=>e==null?void 0:e.includes(l)):t.levenshtein?levenshtein(e,o)<=t.levenshtein:e==o},checkNumber=t=>{const e=t.answer;return e==null||t.min!=null&&e<t.min||t.max!=null&&e>t.max?!1:t.min!=null||t.max!=null?!0:t.delta?Math.abs(e-t.solution)<=t.delta:e==t.solution},_hoisted_1$4={class:"question multiple-choice"},_hoisted_2$4={class:"header"},_hoisted_3$4={key:0,class:"input"},_hoisted_4$3=["disabled"],_hoisted_5$1={class:"settings"},_hoisted_6={class:"basic"},_hoisted_7={class:"label"},_hoisted_8={key:0},_hoisted_9=["disabled"],_hoisted_10={class:"advanced"},_hoisted_11={class:"levenshtein"},_hoisted_12={class:"tryout"},_sfc_main$5=defineComponent({__name:"TextInput",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(t){const e=t,o=ref("exact"),u=ref(""),n=ref("");onMounted(()=>{var m,a;l.value="",e.editable&&(l.value=e.question.solution,e.question.ignoreCase==null&&(e.question.ignoreCase=!0),e.question.ignoreWhitespace==null&&(e.question.ignoreWhitespace=!1),e.question.ignorePunctuation==null&&(e.question.ignorePunctuation=!1),e.question.levenshtein==null&&(e.question.levenshtein=0),e.question.solution&&(o.value="exact",n.value=e.question.solution),e.question.solutionRegex&&(o.value="regex",n.value=e.question.solutionRegex),(m=e.question.solutionAll)!=null&&m.length&&(o.value="all",n.value=e.question.solutionAll.join(",")),(a=e.question.solutionAny)!=null&&a.length&&(o.value="any",n.value=e.question.solutionAny.join(",")))});const l=ref(e.editable?e.question.solution:""),p=ref(e.question.id);watch(l,()=>{if(e.editable){e.question.solution=l.value;return}e.question.answer=l.value}),watch(()=>e.question,()=>{if(p.value!=e.question.id){if(p.value=e.question.id,e.editable){l.value=e.question.solution;return}l.value=""}},{deep:!0});const d=[{value:"exact",label:"Exact Match"},{value:"regex",label:"Regular Expression"},{value:"all",label:"All",description:"comma separated"},{value:"any",label:"Any",description:"comma separated"}],s=()=>{if(e.editable){if(o.value==="exact"){e.question.solution=n.value,e.question.solutionRegex="",e.question.solutionAll=[],e.question.solutionAny=[];return}if(o.value==="regex"){e.question.solution="",e.question.solutionRegex=n.value,e.question.solutionAll=[],e.question.solutionAny=[];return}if(o.value==="all"){e.question.solution="",e.question.solutionRegex="",e.question.solutionAll=n.value.split(","),e.question.solutionAny=[];return}if(o.value==="any"){e.question.solution="",e.question.solutionRegex="",e.question.solutionAll=[],e.question.solutionAny=n.value.split(",");return}}};watch(o,s);const r=computed(()=>checkTextAnswer({...e.question,answer:u.value}));return(m,a)=>(openBlock(),createElementBlock("div",_hoisted_1$4,[createBaseVNode("div",_hoisted_2$4,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Text Input",icon:"edit_note"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":a[0]||(a[0]=i=>t.question.title=i),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":a[1]||(a[1]=i=>t.question.question=i)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),t.editable?(openBlock(),createElementBlock(Fragment,{key:1},[createBaseVNode("div",_hoisted_5$1,[createBaseVNode("div",_hoisted_6,[createVNode(ExpandedDropdown,{options:d,modelValue:o.value,"onUpdate:modelValue":a[3]||(a[3]=i=>o.value=i)},{label:withCtx(({option:i})=>[createBaseVNode("div",_hoisted_7,[createBaseVNode("h3",null,toDisplayString(i.label),1),i.description?(openBlock(),createElementBlock("p",_hoisted_8,toDisplayString(i.description),1)):createCommentVNode("",!0)])]),_:1},8,["modelValue"]),withDirectives(createBaseVNode("input",{"onUpdate:modelValue":a[4]||(a[4]=i=>n.value=i),onChange:s,type:"text",disabled:t.disabled},null,40,_hoisted_9),[[vModelText,n.value]])]),createBaseVNode("div",_hoisted_10,[createVNode(_sfc_main$7,{label:"ignore case",modelValue:t.question.ignoreCase,"onUpdate:modelValue":a[5]||(a[5]=i=>t.question.ignoreCase=i)},null,8,["modelValue"]),createVNode(_sfc_main$7,{label:"ignore punctuation",modelValue:t.question.ignorePunctuation,"onUpdate:modelValue":a[6]||(a[6]=i=>t.question.ignorePunctuation=i)},null,8,["modelValue"]),createVNode(_sfc_main$7,{label:"ignore whitespace",modelValue:t.question.ignoreWhitespace,"onUpdate:modelValue":a[7]||(a[7]=i=>t.question.ignoreWhitespace=i)},null,8,["modelValue"]),createBaseVNode("div",_hoisted_11,[a[11]||(a[11]=createBaseVNode("label",null," Levenshtein Distance (typo tolerance) ",-1)),withDirectives(createBaseVNode("input",{"onUpdate:modelValue":a[8]||(a[8]=i=>t.question.levenshtein=i),type:"number"},null,512),[[vModelText,t.question.levenshtein]])])])]),a[13]||(a[13]=createBaseVNode("hr",null,null,-1)),createBaseVNode("div",_hoisted_12,[a[12]||(a[12]=createBaseVNode("label",null,"Tryout",-1)),withDirectives(createBaseVNode("input",{class:normalizeClass({correct:r.value,incorrect:!r.value}),"onUpdate:modelValue":a[9]||(a[9]=i=>u.value=i),type:"text"},null,2),[[vModelText,u.value]])])],64)):(openBlock(),createElementBlock("div",_hoisted_3$4,[a[10]||(a[10]=createBaseVNode("span",{class:"material-symbols-rounded"}," edit_note ",-1)),withDirectives(createBaseVNode("input",{"onUpdate:modelValue":a[2]||(a[2]=i=>l.value=i),type:"text",disabled:t.disabled},null,8,_hoisted_4$3),[[vModelText,l.value]])]))]))}}),TextInput=_export_sfc(_sfc_main$5,[["__scopeId","data-v-18d1e261"]]),_hoisted_1$3={class:"question multiple-choice"},_hoisted_2$3={class:"header"},_hoisted_3$3={class:"options"},_sfc_main$4=defineComponent({__name:"TrueFalse",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(t){const e=t,o=u=>{if(e.editable){e.question.solution=u;return}e.question.answer=u};return onMounted(()=>{e.question.answer=void 0}),(u,n)=>(openBlock(),createElementBlock("div",_hoisted_1$3,[createBaseVNode("div",_hoisted_2$3,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"True or False",icon:"check"})),createVNode(EditableText,{modelValue:t.question.title,"onUpdate:modelValue":n[0]||(n[0]=l=>t.question.title=l),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":n[1]||(n[1]=l=>t.question.question=l)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),createBaseVNode("div",_hoisted_3$3,[createBaseVNode("div",{class:normalizeClass(["option",{selected:!t.editable&&t.question.answer===!0,correct:t.editable&&t.question.solution===!0}]),onClick:n[2]||(n[2]=l=>o(!0))},n[4]||(n[4]=[createBaseVNode("span",{class:"material-symbols-rounded"},"check",-1),createTextVNode(" True ")]),2),createBaseVNode("div",{class:normalizeClass(["option",{selected:!t.editable&&t.question.answer===!1,correct:t.editable&&t.question.solution===!1}]),onClick:n[3]||(n[3]=l=>o(!1))},n[5]||(n[5]=[createBaseVNode("span",{class:"material-symbols-rounded"},"close",-1),createTextVNode(" False ")]),2)])]))}}),TrueFalse=_export_sfc(_sfc_main$4,[["__scopeId","data-v-86a8a704"]]),_hoisted_1$2={class:"question multiple-choice"},_hoisted_2$2={class:"header"},_hoisted_3$2={class:"options"},_hoisted_4$2=["onClick","onKeypress"],_sfc_main$3=defineComponent({__name:"Ordering",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1},showCorrection:{type:Boolean,default:!1}},setup(t){const e=t,o=ref(e.editable?e.question.solution:[]),u=()=>{if(e.editable)return;const n=JSON.parse(JSON.stringify(e.question.solution));e.question.answer=n.sort(()=>Math.random()-.5),o.value=e.question.answer};return watch(o,()=>{if(e.editable){e.question.solution=o.value;return}e.question.answer=o.value},{deep:!0}),watch(()=>e.question.id,u),onMounted(u),(n,l)=>(openBlock(),createElementBlock("div",_hoisted_1$2,[createBaseVNode("div",_hoisted_2$2,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Ordering",icon:"sort"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":l[0]||(l[0]=p=>t.question.title=p),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":l[1]||(l[1]=p=>t.question.question=p)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),createBaseVNode("div",_hoisted_3$2,[createVNode(unref(draggable),{modelValue:o.value,"onUpdate:modelValue":l[2]||(l[2]=p=>o.value=p),"item-key":"id",tag:"div",class:"options"},{item:withCtx(({element:p,index:d})=>[createBaseVNode("div",{class:normalizeClass(["option",{wrong:t.showCorrection&&t.question.solution[d]!==p}])},[createVNode(EditableText,{locked:!t.editable,"no-outline":"",modelValue:o.value[d],"onUpdate:modelValue":s=>o.value[d]=s},{default:withCtx(()=>[createBaseVNode("span",null,toDisplayString(p),1)]),_:2},1032,["locked","modelValue","onUpdate:modelValue"]),t.editable?(openBlock(),createElementBlock("span",{key:0,class:"material-symbols-rounded delete",tabindex:"0",onClick:withModifiers(s=>e.question.solution.splice(d,1),["stop"]),onKeypress:withKeys(withModifiers(s=>e.question.solution.splice(d,1),["stop"]),["enter"])}," delete ",40,_hoisted_4$2)):createCommentVNode("",!0)],2)]),_:1},8,["modelValue"]),t.editable?(openBlock(),createElementBlock("div",{key:0,class:"option add",tabindex:"0",onClick:l[3]||(l[3]=withModifiers(p=>e.question.solution.push("Item"),["stop"])),onKeypress:l[4]||(l[4]=withKeys(withModifiers(p=>e.question.solution.push("Item"),["stop"]),["enter"]))},l[5]||(l[5]=[createBaseVNode("span",{class:"material-symbols-rounded add"}," add ",-1),createTextVNode(" Add ")]),32)):createCommentVNode("",!0)])]))}}),Ordering=_export_sfc(_sfc_main$3,[["__scopeId","data-v-10af5702"]]),_hoisted_1$1={class:"question multiple-choice"},_hoisted_2$1={class:"header"},_hoisted_3$1={class:"back"},_hoisted_4$1={class:"placeholder"},_sfc_main$2=defineComponent({__name:"Flashcard",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(t){const e=t,o=ref(!1);watch(()=>e.question.id,()=>{o.value=!1});const u=computed(()=>e.question.solution.replace(/\w/g,"c"));return(n,l)=>(openBlock(),createElementBlock("div",_hoisted_1$1,[createBaseVNode("div",_hoisted_2$1,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Flashcard",icon:"bolt"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":l[0]||(l[0]=p=>t.question.title=p),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":l[1]||(l[1]=p=>t.question.question=p)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),t.editable?(openBlock(),createBlock(EditableText,{key:0,class:"back",locked:!1,modelValue:t.question.solution,"onUpdate:modelValue":l[2]||(l[2]=p=>t.question.solution=p),onClick:l[3]||(l[3]=withModifiers(()=>{},["stop"])),placeholder:"Click to edit the solution"},{default:withCtx(()=>[createBaseVNode("h3",null,toDisplayString(t.question.solution),1)]),_:1},8,["modelValue"])):(openBlock(),createElementBlock("div",{key:1,class:normalizeClass(["card",{revealed:o.value}]),onClick:l[4]||(l[4]=p=>o.value=!o.value)},[createBaseVNode("h3",_hoisted_3$1,toDisplayString(t.question.solution),1),l[5]||(l[5]=createBaseVNode("div",{class:"front"},[createBaseVNode("p",{class:"muted"},"Click to reveal")],-1)),createBaseVNode("h3",_hoisted_4$1,toDisplayString(u.value),1)],2))]))}}),Flashcard=_export_sfc(_sfc_main$2,[["__scopeId","data-v-872b52bb"]]),_hoisted_1={class:"question fill-in-the-blank"},_hoisted_2={class:"header"},_hoisted_3={key:0,class:"input editor"},_hoisted_4={key:1},_hoisted_5={class:"input"},_sfc_main$1=defineComponent({__name:"FillInTheBlank",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(t){const e=t,o=ref(),u=ref(),n=ref([]),l=()=>{if(!u.value)return[];const r=u.value.querySelectorAll(".gap");return Array.from(r).map(m=>m.value)},p=r=>{if(!u.value||!r)return;const m=/-\[(.*)\]-/g,a=r.matchAll(m),i=Array.from(a,c=>{const f=c.index||0,v=c[0].length;return{index:f,length:v,value:c[0],gap:c[1]}});window.onGapInput=c=>{const f=c.target,v=parseInt(f.dataset.index||"0");n.value[v]=f.value,e.question.answer=n.value};for(let c=i.length-1;c>=0;c--){const f=i[c],v=document.createElement("input");v.classList.add("gap"),v.value=e.editable?f.gap:"",v.size=(f.length-4)*2,v.dataset.index=`${c}`,v.disabled=e.editable,r=r.replace(f.value,v.outerHTML.replace("<input",`<input oninput='onGapInput(event)' value='${v.value}'`))}u.value.innerHTML=r,n.value=l()};onMounted(()=>{e.editable&&(o.value.innerHTML=e.question.text),p(e.question.text)});const d=()=>{o.value&&(p(o.value.innerHTML),e.question.text=o.value.innerHTML,e.question.solution=n.value)},s=()=>{o.value.innerHTML+="-[gap]-",d()};return(r,m)=>(openBlock(),createElementBlock("div",_hoisted_1,[createBaseVNode("div",_hoisted_2,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Fill in the Blank",icon:"edit"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":m[0]||(m[0]=a=>t.question.title=a),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":m[1]||(m[1]=a=>t.question.question=a)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),t.editable?(openBlock(),createElementBlock("div",_hoisted_3,[createBaseVNode("div",{class:"textarea",contenteditable:!0,ref_key:"editor",ref:o,onFocusout:d},null,544),createVNode(IconButton,{label:"Add gap",icon:"add",onClick:s})])):createCommentVNode("",!0),t.editable?(openBlock(),createElementBlock("h4",_hoisted_4,"Preview")):createCommentVNode("",!0),createBaseVNode("div",_hoisted_5,[createBaseVNode("div",{class:"textarea",ref_key:"quiz",ref:u},null,512)])]))}}),_sfc_main=defineComponent({__name:"index",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},showCorrection:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(t){const e={"multiple-choice":MultipleChoice,"multiple-answer":MultipleAnswers,matching:Matching,"number-answer":NumberInput,"text-answer":TextInput,"true-false":TrueFalse,ordering:Ordering,flashcard:Flashcard,"fill-in-the-blank":_sfc_main$1};return(o,u)=>(openBlock(),createBlock(resolveDynamicComponent(e[t.question.type]),{question:t.question,disabled:t.disabled,editable:t.editable,showCorrection:t.showCorrection},null,8,["question","disabled","editable","showCorrection"]))}});export{EditableText as E,_sfc_main as _,checkNumber as a,_sfc_main$7 as b,checkTextAnswer as c};
