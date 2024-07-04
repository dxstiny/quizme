import{d as defineComponent,r as ref,w as watch,f as computed,a as openBlock,c as createElementBlock,A as renderSlot,y as withDirectives,z as vModelText,B as withModifiers,C as withKeys,E as normalizeClass,G as nextTick,_ as _export_sfc,t as toDisplayString,l as createCommentVNode,H as createTextVNode,b as createBaseVNode,g as createBlock,k as createVNode,h as withCtx,F as Fragment,i as renderList,p as pushScopeId,m as popScopeId,o as onMounted,j as unref,I as IconButton,J as resolveDynamicComponent}from"./index-D-7qE5hs.js";import{d as draggable}from"./FillInTheBlank.vue_vue_type_style_index_0_lang-uG_iiaDO.js";import{E as ExpandedDropdown}from"./ExpandedDropdown-CcY9vh6G.js";const _hoisted_1$b=["placeholder"],_sfc_main$c=defineComponent({__name:"EditableText",props:{modelValue:{type:String,required:!0},locked:{type:Boolean,default:!1},noOutline:{type:Boolean,default:!1},placeholder:{type:String,default:"Click to edit"}},emits:["update:modelValue","change"],setup(t,{emit:e}){const o=t,u=ref(o.modelValue);watch(()=>o.modelValue,a=>u.value=a);const s=ref(!1),l=e,p=ref(null),d=()=>{o.locked||(s.value=!0,nextTick(()=>{p.value&&(m(),p.value.focus())}))},n=computed(()=>o.locked?!0:s.value?!1:u.value),r=a=>{u.value=a,l("change",a),l("update:modelValue",a)},m=()=>{p.value&&(p.value.style.height="auto",p.value.style.height=p.value.scrollHeight+"px")},i=a=>{a.shiftKey||(a.preventDefault(),s.value=!s.value)};return(a,c)=>(openBlock(),createElementBlock("div",{class:normalizeClass(["editable-text",{outlined:!t.noOutline&&s.value}]),onDblclick:withModifiers(d,["stop"])},[n.value?renderSlot(a.$slots,"default",{key:0},void 0,!0):withDirectives((openBlock(),createElementBlock("textarea",{key:1,ref_key:"area",ref:p,"onUpdate:modelValue":c[0]||(c[0]=h=>u.value=h),onChange:c[1]||(c[1]=h=>r(h.target.value)),onInput:c[2]||(c[2]=h=>m()),onClick:c[3]||(c[3]=withModifiers(h=>s.value=!0,["stop"])),onKeydown:[withKeys(i,["enter"]),c[4]||(c[4]=withKeys(h=>s.value=!1,["esc"]))],onBlur:c[5]||(c[5]=h=>s.value=!1),placeholder:t.placeholder},null,40,_hoisted_1$b)),[[vModelText,u.value]])],34))}}),EditableText=_export_sfc(_sfc_main$c,[["__scopeId","data-v-824fa419"]]),_hoisted_1$a={class:"tag"},_hoisted_2$9={key:0,class:"material-symbols-rounded"},_sfc_main$b=defineComponent({__name:"Tag",props:{label:String,icon:String},setup(t){return(e,o)=>(openBlock(),createElementBlock("div",_hoisted_1$a,[t.icon?(openBlock(),createElementBlock("span",_hoisted_2$9,toDisplayString(t.icon),1)):createCommentVNode("",!0),createTextVNode(" "+toDisplayString(t.label),1)]))}}),Tag=_export_sfc(_sfc_main$b,[["__scopeId","data-v-5305512e"]]),_withScopeId$7=t=>(pushScopeId("data-v-26516d5b"),t=t(),popScopeId(),t),_hoisted_1$9={class:"question multiple-choice"},_hoisted_2$8={class:"header"},_hoisted_3$8={class:"options"},_hoisted_4$8=["onClick","onKeypress"],_hoisted_5$8=["onClick"],_hoisted_6$4=_withScopeId$7(()=>createBaseVNode("span",{class:"material-symbols-rounded add"}," add ",-1)),_sfc_main$a=defineComponent({__name:"MultipleChoice",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1},showCorrection:{type:Boolean,default:!1}},setup(t){const e=t,o=ref([]),u=()=>{if(e.editable){o.value=e.question.options;return}const d=e.question.options[e.question.solution];o.value=e.question.options.sort(()=>Math.random()-.5),e.question.solution=o.value.findIndex(n=>n===d),e.question.options=e.question.options};u(),watch(()=>e.question.options,u);const s=d=>{if(!e.disabled){if(e.editable){e.question.solution=d;return}e.question.answer=d}},l=d=>{if(e.editable&&e.question.solution===d||e.showCorrection&&e.question.solution===d&&e.question.answer===d)return!0},p=d=>{if(e.showCorrection&&e.question.solution!==d&&e.question.answer===d||e.showCorrection&&e.question.solution===d&&e.question.answer!==d)return!0};return(d,n)=>(openBlock(),createElementBlock("div",_hoisted_1$9,[createBaseVNode("div",_hoisted_2$8,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Multiple Choice",icon:"rule"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":n[0]||(n[0]=r=>t.question.title=r),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":n[1]||(n[1]=r=>t.question.question=r)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),createBaseVNode("div",_hoisted_3$8,[(openBlock(!0),createElementBlock(Fragment,null,renderList(o.value,(r,m)=>(openBlock(),createElementBlock("div",{class:normalizeClass(["option",{selected:!t.editable&&e.question.answer===m,correct:l(m),wrong:p(m)}]),tabindex:"0",onClick:i=>s(m),onKeypress:withKeys(withModifiers(i=>s(m),["stop"]),["space"])},[createVNode(EditableText,{locked:!t.editable,"no-outline":"",modelValue:o.value[m],"onUpdate:modelValue":i=>o.value[m]=i},{default:withCtx(()=>[createBaseVNode("span",null,toDisplayString(r),1)]),_:2},1032,["locked","modelValue","onUpdate:modelValue"]),t.editable?(openBlock(),createElementBlock("span",{key:0,class:"material-symbols-rounded delete",onClick:withModifiers(i=>e.question.options.splice(m,1),["stop"])}," delete ",8,_hoisted_5$8)):createCommentVNode("",!0)],42,_hoisted_4$8))),256)),t.editable?(openBlock(),createElementBlock("div",{key:0,class:"option add",onClick:n[2]||(n[2]=withModifiers(r=>e.question.options.push("Option"),["stop"]))},[_hoisted_6$4,createTextVNode(" Add ")])):createCommentVNode("",!0)])]))}}),MultipleChoice=_export_sfc(_sfc_main$a,[["__scopeId","data-v-26516d5b"]]),_withScopeId$6=t=>(pushScopeId("data-v-e2fd7eaa"),t=t(),popScopeId(),t),_hoisted_1$8={class:"question multiple-choice"},_hoisted_2$7={class:"header"},_hoisted_3$7={class:"options"},_hoisted_4$7=["onClick","onKeypress"],_hoisted_5$7=["onClick"],_hoisted_6$3=_withScopeId$6(()=>createBaseVNode("span",{class:"material-symbols-rounded add"}," add ",-1)),_sfc_main$9=defineComponent({__name:"MultipleAnswers",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1},showCorrection:{type:Boolean,default:!1}},setup(t){const e=t,o=ref([]),u=()=>{if(e.editable){o.value=e.question.options;return}const d=e.question.solution.map(n=>e.question.options[n]);o.value=e.question.options.sort(()=>Math.random()-.5),e.question.solution=d.map(n=>o.value.findIndex(r=>r===n)),e.question.options=e.question.options,e.question.answer=e.question.answer??[]};u(),watch(()=>e.question.options,u);const s=d=>{if(!e.disabled){if(e.editable){if(e.question.solution.includes(d)){e.question.solution.splice(e.question.solution.findIndex(n=>n===d),1);return}e.question.solution.push(d);return}if(e.question.answer||(e.question.answer=[]),e.question.answer.includes(d)){e.question.answer.splice(e.question.answer.findIndex(n=>n===d),1);return}e.question.answer.push(d)}},l=d=>{var n;return!!(e.editable&&e.question.solution.includes(d)||e.showCorrection&&e.question.solution.includes(d)&&((n=e.question.answer)!=null&&n.includes(d)))},p=d=>{var n,r;return e.showCorrection?!!(!e.question.solution.includes(d)&&((n=e.question.answer)!=null&&n.includes(d))||e.question.solution.includes(d)&&!((r=e.question.answer)!=null&&r.includes(d))):!1};return onMounted(()=>{e.question.answer=[]}),(d,n)=>(openBlock(),createElementBlock("div",_hoisted_1$8,[createBaseVNode("div",_hoisted_2$7,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Multiple Answer",icon:"checklist_rtl"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":n[0]||(n[0]=r=>t.question.title=r),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":n[1]||(n[1]=r=>t.question.question=r)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),createBaseVNode("div",_hoisted_3$7,[(openBlock(!0),createElementBlock(Fragment,null,renderList(o.value,(r,m)=>{var i,a;return openBlock(),createElementBlock("div",{class:normalizeClass(["option",{selected:!t.editable&&((a=(i=e.question)==null?void 0:i.answer)==null?void 0:a.includes(m)),correct:l(m),wrong:p(m)}]),tabindex:"0",onClick:c=>s(m),onKeypress:withKeys(withModifiers(c=>s(m),["stop"]),["space"])},[createVNode(EditableText,{locked:!t.editable,"no-outline":"",onKeypress:n[2]||(n[2]=withKeys(withModifiers(()=>{},["stop"]),["space"])),modelValue:o.value[m],"onUpdate:modelValue":c=>o.value[m]=c},{default:withCtx(()=>[createBaseVNode("span",null,toDisplayString(r),1)]),_:2},1032,["locked","modelValue","onUpdate:modelValue"]),t.editable?(openBlock(),createElementBlock("span",{key:0,class:"material-symbols-rounded delete",onClick:withModifiers(c=>e.question.options.splice(m,1),["stop"])}," delete ",8,_hoisted_5$7)):createCommentVNode("",!0)],42,_hoisted_4$7)}),256)),t.editable?(openBlock(),createElementBlock("div",{key:0,class:"option add",onClick:n[3]||(n[3]=withModifiers(r=>e.question.options.push("Option"),["stop"]))},[_hoisted_6$3,createTextVNode(" Add ")])):createCommentVNode("",!0)])]))}}),MultipleAnswers=_export_sfc(_sfc_main$9,[["__scopeId","data-v-e2fd7eaa"]]),_withScopeId$5=t=>(pushScopeId("data-v-e7f4da73"),t=t(),popScopeId(),t),_hoisted_1$7={class:"question multiple-choice"},_hoisted_2$6={class:"header"},_hoisted_3$6={class:"optionlist"},_hoisted_4$6={class:"options"},_hoisted_5$6=["onClick","onKeypress"],_hoisted_6$2=["onClick","onKeypress"],_hoisted_7$2=_withScopeId$5(()=>createBaseVNode("span",{class:"material-symbols-rounded add"}," add ",-1)),_sfc_main$8=defineComponent({__name:"Matching",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(t){const e=t,o=ref({left:[],right:[]}),u=ref({left:[],right:[]}),s=ref({left:[],right:[]}),l=()=>{const i=Object.keys(e.question.solution),a=Object.values(e.question.solution);if(u.value.left=[],u.value.right=[],e.editable){o.value.left=i,o.value.right=a;return}o.value.left=i.sort(()=>Math.random()-.5),o.value.right=a.sort(()=>Math.random()-.5)};l(),watch(()=>e.question.solution,l,{deep:!0});const p=(i,a,c)=>Object.keys(i).reduce((v,q)=>(q===a?v[c]=i[a]:v[q]=i[q],v),{}),d=(i,a,c)=>{if(e.editable)if(i=="left"){const h=o.value.left[a],f=c;e.question.solution=p(e.question.solution,h,f)}else{const h=o.value.left[a];e.question.solution[h]=c}},n=ref({left:null,right:null}),r=(i,a,c)=>{if(!e.editable){m(a,c);return}if(i.shiftKey)return;i.preventDefault();const f=i.target.querySelector("div");if(f){const v=new MouseEvent("dblclick",{view:window,bubbles:!0,cancelable:!0});f.dispatchEvent(v);return}},m=(i,a)=>{if(e.disabled||e.editable||(e.question.answer||(e.question.answer={}),u.value[a].includes(i)))return;if(n.value[a]===i){n.value[a]=null;return}if(n.value[a]=i,n.value.left===null||n.value.right===null)return;const c=o.value.left[n.value.left],h=o.value.right[n.value.right];if(e.question.answer[c]=h,e.question.solution[c]===h)u.value.left.push(n.value.left),u.value.right.push(n.value.right);else{s.value.left.push(n.value.left),s.value.right.push(n.value.right);const f=n.value.left,v=n.value.right;setTimeout(()=>{s.value.left=s.value.left.filter(q=>q!==f),s.value.right=s.value.right.filter(q=>q!==v)},1e3)}n.value.left=null,n.value.right=null};return(i,a)=>(openBlock(),createElementBlock("div",_hoisted_1$7,[createBaseVNode("div",_hoisted_2$6,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Matching",icon:"signpost"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":a[0]||(a[0]=c=>t.question.title=c),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":a[1]||(a[1]=c=>t.question.question=c)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),createBaseVNode("div",_hoisted_3$6,[(openBlock(!0),createElementBlock(Fragment,null,renderList(o.value.left,(c,h)=>(openBlock(),createElementBlock("div",_hoisted_4$6,[(openBlock(),createElementBlock(Fragment,null,renderList(["left","right"],f=>createBaseVNode("div",{class:normalizeClass(["option",{selected:!t.editable&&n.value[f]===h,correct:!t.editable&&u.value[f].includes(h),wrong:!t.editable&&s.value[f].includes(h)}]),tabindex:"0",onClick:v=>m(h,f),onKeypress:[withKeys(withModifiers(v=>m(h,f),["stop"]),["space"]),withKeys(v=>r(v,h,f),["enter"])]},[createVNode(EditableText,{locked:!t.editable,"no-outline":"",onChange:v=>d(f,h,v),modelValue:o.value[f][h],"onUpdate:modelValue":v=>o.value[f][h]=v},{default:withCtx(()=>[createBaseVNode("span",null,toDisplayString(o.value[f][h]),1)]),_:2},1032,["locked","onChange","modelValue","onUpdate:modelValue"])],42,_hoisted_5$6)),64)),t.editable?(openBlock(),createElementBlock("span",{key:0,class:"material-symbols-rounded delete",tabindex:"0",onClick:withModifiers(f=>delete e.question.solution[c],["stop"]),onKeypress:withKeys(withModifiers(f=>delete e.question.solution[c],["stop"]),["enter"])}," delete ",40,_hoisted_6$2)):createCommentVNode("",!0)]))),256)),t.editable?(openBlock(),createElementBlock("div",{key:0,class:"option add",tabindex:"0",onClick:a[2]||(a[2]=withModifiers(c=>e.question.solution.A="B",["stop"])),onKeypress:a[3]||(a[3]=withKeys(c=>e.question.solution.A="B",["enter"]))},[_hoisted_7$2,createTextVNode(" Add ")],32)):createCommentVNode("",!0)])]))}}),Matching=_export_sfc(_sfc_main$8,[["__scopeId","data-v-e7f4da73"]]),_hoisted_1$6={class:"switch"},_sfc_main$7=defineComponent({__name:"Switch",props:{modelValue:{type:Boolean,default:!1},label:{type:String,default:""}},emits:["update:modelValue"],setup(t,{emit:e}){const o=t,u=e,s=()=>{u("update:modelValue",!o.modelValue)};return(l,p)=>(openBlock(),createElementBlock("div",_hoisted_1$6,[createBaseVNode("div",{class:normalizeClass(["toggle-switch",{"toggle-switch--on":t.modelValue}]),onClick:s},null,2),createBaseVNode("label",null,toDisplayString(t.label),1)]))}}),levenshtein=(t,e)=>{if(t===e)return 0;var o=t.length,u=e.length;if(o===0||u===0)return o+u;var s=0,l,p,d,n,r,m,i,a,c=new Array(o);for(l=0;l<o;)c[l]=++l;for(;s+3<u;s+=4){var h=e.charCodeAt(s),f=e.charCodeAt(s+1),v=e.charCodeAt(s+2),q=e.charCodeAt(s+3);for(n=s,d=s+1,r=s+2,m=s+3,i=s+4,l=0;l<o;l++)a=t.charCodeAt(l),p=c[l],p<n||d<n?n=p>d?d+1:p+1:h!==a&&n++,n<d||r<d?d=n>r?r+1:n+1:f!==a&&d++,d<r||m<r?r=d>m?m+1:d+1:v!==a&&r++,r<m||i<m?m=r>i?i+1:r+1:q!==a&&m++,c[l]=i=m,m=r,r=d,d=n,n=p}for(;s<u;){var V=e.charCodeAt(s);for(n=s,r=++s,l=0;l<o;l++)p=c[l],p<n||r<n?r=p>r?r+1:p+1:V!==t.charCodeAt(l)?r=n+1:r=n,c[l]=r,n=p;i=r}return i},safeEval=t=>new Function("return "+t)(),_withScopeId$4=t=>(pushScopeId("data-v-12e793f3"),t=t(),popScopeId(),t),_hoisted_1$5={class:"question"},_hoisted_2$5={class:"header"},_hoisted_3$5={key:0,class:"input"},_hoisted_4$5={class:"line"},_hoisted_5$5=_withScopeId$4(()=>createBaseVNode("span",{class:"material-symbols-rounded"}," calculate ",-1)),_hoisted_6$1=["disabled"],_hoisted_7$1=_withScopeId$4(()=>createBaseVNode("hr",null,null,-1)),_hoisted_8$1={class:"line notepad"},_hoisted_9$1={key:1},_hoisted_10$1=_withScopeId$4(()=>createBaseVNode("span",{class:"material-symbols-rounded"}," info ",-1)),_hoisted_11$1={key:1,class:"settings"},_hoisted_12$1={class:"type-and-help"},_hoisted_13$1={class:"label"},_hoisted_14$1={key:0},_hoisted_15$1={class:"settings"},_hoisted_16$1={class:"pair"},_hoisted_17=_withScopeId$4(()=>createBaseVNode("label",null,"Value",-1)),_hoisted_18={class:"pair"},_hoisted_19=_withScopeId$4(()=>createBaseVNode("label",null,"Tolerance (delta)",-1)),_hoisted_20={class:"pair"},_hoisted_21=_withScopeId$4(()=>createBaseVNode("label",null,"Minimum",-1)),_hoisted_22={class:"pair"},_hoisted_23=_withScopeId$4(()=>createBaseVNode("label",null,"Maximum",-1)),_sfc_main$6=defineComponent({__name:"NumberInput",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(__props){ref();const props=__props,value=ref(props.editable?props.question.solution:null),cachedQuestionId=ref(props.question.id);watch(value,()=>{if(value.value!=null){if(props.editable){props.question.solution=value.value;return}props.question.answer=value.value}}),watch(()=>props.question,()=>{if(cachedQuestionId.value!=props.question.id){if(cachedQuestionId.value=props.question.id,props.editable){value.value=props.question.solution;return}value.value=0}},{deep:!0});const typeOptions=[{label:"Exact",value:"exact"},{label:"Range",value:"range"}],type=ref("");watch(type,()=>{type.value==="exact"?(props.question.solution=props.question.solution||0,props.question.delta=props.question.delta||0,delete props.question.min,delete props.question.max):(props.question.solution=0,delete props.question.delta,props.question.min=props.question.min||0,props.question.max=props.question.max||0)}),onMounted(()=>{if(props.editable){if(props.question.allowNotes==null&&(props.question.allowNotes=!0),props.question.min!=null||props.question.max!=null){type.value="range";return}type.value="exact"}});const notes=ref(""),calculate=()=>{var t;if(!props.question.allowNotes||!props.question.allowCalculator)return;const latestLine=(t=notes.value.split(`
`).at(-1))==null?void 0:t.trim();if(latestLine!=null&&latestLine.endsWith("=")){const result=eval(latestLine.slice(0,-1));typeof result=="number"&&(value.value=result,notes.value+=result)}},autoResize=t=>{if(!t)return;const e=t;e.style.height="auto",e.style.height=e.scrollHeight+"px"};return(t,e)=>(openBlock(),createElementBlock("div",_hoisted_1$5,[createBaseVNode("div",_hoisted_2$5,[__props.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Number Input",icon:"calculate"})),createVNode(EditableText,{locked:!__props.editable,modelValue:__props.question.title,"onUpdate:modelValue":e[0]||(e[0]=o=>__props.question.title=o),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(__props.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!__props.editable,modelValue:__props.question.question,"onUpdate:modelValue":e[1]||(e[1]=o=>__props.question.question=o)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(__props.question.question),1)]),_:1},8,["locked","modelValue"])]),__props.editable?(openBlock(),createElementBlock("div",_hoisted_11$1,[createBaseVNode("div",_hoisted_12$1,[createVNode(ExpandedDropdown,{options:typeOptions,modelValue:type.value,"onUpdate:modelValue":e[5]||(e[5]=o=>type.value=o)},{label:withCtx(({option:o})=>[createBaseVNode("div",_hoisted_13$1,[createBaseVNode("h3",null,toDisplayString(o.label),1),o.description?(openBlock(),createElementBlock("p",_hoisted_14$1,toDisplayString(o.description),1)):createCommentVNode("",!0)])]),_:1},8,["modelValue"]),createBaseVNode("div",_hoisted_15$1,[createVNode(_sfc_main$7,{label:"allow calculator",modelValue:__props.question.allowCalculator,"onUpdate:modelValue":e[6]||(e[6]=o=>__props.question.allowCalculator=o)},null,8,["modelValue"]),createVNode(_sfc_main$7,{label:"allow notes",modelValue:__props.question.allowNotes,"onUpdate:modelValue":e[7]||(e[7]=o=>__props.question.allowNotes=o)},null,8,["modelValue"])])]),type.value=="exact"?(openBlock(),createElementBlock(Fragment,{key:0},[createBaseVNode("div",_hoisted_16$1,[_hoisted_17,withDirectives(createBaseVNode("input",{"onUpdate:modelValue":e[8]||(e[8]=o=>__props.question.solution=o),type:"number"},null,512),[[vModelText,__props.question.solution]])]),createBaseVNode("div",_hoisted_18,[_hoisted_19,withDirectives(createBaseVNode("input",{"onUpdate:modelValue":e[9]||(e[9]=o=>__props.question.delta=o),type:"number"},null,512),[[vModelText,__props.question.delta]])])],64)):(openBlock(),createElementBlock(Fragment,{key:1},[createBaseVNode("div",_hoisted_20,[_hoisted_21,withDirectives(createBaseVNode("input",{"onUpdate:modelValue":e[10]||(e[10]=o=>__props.question.min=o),type:"number"},null,512),[[vModelText,__props.question.min]])]),createBaseVNode("div",_hoisted_22,[_hoisted_23,withDirectives(createBaseVNode("input",{"onUpdate:modelValue":e[11]||(e[11]=o=>__props.question.max=o),type:"number"},null,512),[[vModelText,__props.question.max]])])],64))])):(openBlock(),createElementBlock("div",_hoisted_3$5,[createBaseVNode("div",_hoisted_4$5,[_hoisted_5$5,withDirectives(createBaseVNode("input",{"onUpdate:modelValue":e[2]||(e[2]=o=>value.value=o),type:"number",disabled:__props.disabled,placeholder:"Enter your answer here"},null,8,_hoisted_6$1),[[vModelText,value.value]])]),__props.question.allowNotes||__props.question.allowCalculator?(openBlock(),createElementBlock(Fragment,{key:0},[_hoisted_7$1,createBaseVNode("div",_hoisted_8$1,[__props.question.allowNotes?withDirectives((openBlock(),createElementBlock("textarea",{key:0,class:"notes",placeholder:"Notes",onKeypress:withKeys(calculate,["enter"]),onInput:e[3]||(e[3]=o=>autoResize(o.target)),"onUpdate:modelValue":e[4]||(e[4]=o=>notes.value=o)},null,544)),[[vModelText,notes.value]]):createCommentVNode("",!0),__props.question.allowCalculator?(openBlock(),createElementBlock("span",_hoisted_9$1,[_hoisted_10$1,createTextVNode(" Calculator enabled. Terminate your calculation with an = and press enter. ")])):createCommentVNode("",!0)])],64)):createCommentVNode("",!0)]))]))}}),NumberInput=_export_sfc(_sfc_main$6,[["__scopeId","data-v-12e793f3"]]),checkTextAnswer=t=>{let e=t.answer,o=t.solution,u=t.solutionAll,s=t.solutionAny;if(e==null)return!1;if(t.ignoreCase&&(e=e.toLowerCase(),o=o.toLowerCase(),u=u==null?void 0:u.map(l=>l.toLowerCase()),s=s==null?void 0:s.map(l=>l.toLowerCase())),t.ignoreWhitespace&&(e=e.replace(/\s/g,""),o=o.replace(/\s/g,""),u=u==null?void 0:u.map(l=>l.replace(/\s/g,"")),s=s==null?void 0:s.map(l=>l.replace(/\s/g,""))),t.ignorePunctuation){const l=/[.,\/#!$%\^&\*;:{}=\-_`~()]/g;e=e.replace(l,""),o=o.replace(l,""),u=u==null?void 0:u.map(p=>p.replace(l,"")),s=s==null?void 0:s.map(p=>p.replace(l,""))}if(t.solutionRegex){let l=safeEval(t.solutionRegex);return l instanceof RegExp||(l=new RegExp(t.solutionRegex)),l.test(e)}return u!=null&&u.length?u.every(l=>e==null?void 0:e.includes(l)):s!=null&&s.length?s.some(l=>e==null?void 0:e.includes(l)):t.levenshtein?levenshtein(e,o)<=t.levenshtein:e==o},checkNumber=t=>{const e=t.answer;return e==null||t.min!=null&&e<t.min||t.max!=null&&e>t.max?!1:t.min!=null||t.max!=null?!0:t.delta?Math.abs(e-t.solution)<=t.delta:e==t.solution},_withScopeId$3=t=>(pushScopeId("data-v-ce12444c"),t=t(),popScopeId(),t),_hoisted_1$4={class:"question multiple-choice"},_hoisted_2$4={class:"header"},_hoisted_3$4={key:0,class:"input"},_hoisted_4$4=_withScopeId$3(()=>createBaseVNode("span",{class:"material-symbols-rounded"}," edit_note ",-1)),_hoisted_5$4=["disabled"],_hoisted_6={class:"settings"},_hoisted_7={class:"basic"},_hoisted_8={class:"label"},_hoisted_9={key:0},_hoisted_10=["disabled"],_hoisted_11={class:"advanced"},_hoisted_12={class:"levenshtein"},_hoisted_13=_withScopeId$3(()=>createBaseVNode("label",null," Levenshtein Distance (typo tolerance) ",-1)),_hoisted_14=_withScopeId$3(()=>createBaseVNode("hr",null,null,-1)),_hoisted_15={class:"tryout"},_hoisted_16=_withScopeId$3(()=>createBaseVNode("label",null,"Tryout",-1)),_sfc_main$5=defineComponent({__name:"TextInput",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(t){const e=t,o=ref("exact"),u=ref(""),s=ref("");onMounted(()=>{var m,i;l.value="",e.editable&&(l.value=e.question.solution,e.question.ignoreCase==null&&(e.question.ignoreCase=!0),e.question.ignoreWhitespace==null&&(e.question.ignoreWhitespace=!1),e.question.ignorePunctuation==null&&(e.question.ignorePunctuation=!1),e.question.levenshtein==null&&(e.question.levenshtein=0),e.question.solution&&(o.value="exact",s.value=e.question.solution),e.question.solutionRegex&&(o.value="regex",s.value=e.question.solutionRegex),(m=e.question.solutionAll)!=null&&m.length&&(o.value="all",s.value=e.question.solutionAll.join(",")),(i=e.question.solutionAny)!=null&&i.length&&(o.value="any",s.value=e.question.solutionAny.join(",")))});const l=ref(e.editable?e.question.solution:""),p=ref(e.question.id);watch(l,()=>{if(e.editable){e.question.solution=l.value;return}e.question.answer=l.value}),watch(()=>e.question,()=>{if(p.value!=e.question.id){if(p.value=e.question.id,e.editable){l.value=e.question.solution;return}l.value=""}},{deep:!0});const d=[{value:"exact",label:"Exact Match"},{value:"regex",label:"Regular Expression"},{value:"all",label:"All",description:"comma separated"},{value:"any",label:"Any",description:"comma separated"}],n=()=>{if(e.editable){if(o.value==="exact"){e.question.solution=s.value,e.question.solutionRegex="",e.question.solutionAll=[],e.question.solutionAny=[];return}if(o.value==="regex"){e.question.solution="",e.question.solutionRegex=s.value,e.question.solutionAll=[],e.question.solutionAny=[];return}if(o.value==="all"){e.question.solution="",e.question.solutionRegex="",e.question.solutionAll=s.value.split(","),e.question.solutionAny=[];return}if(o.value==="any"){e.question.solution="",e.question.solutionRegex="",e.question.solutionAll=[],e.question.solutionAny=s.value.split(",");return}}};watch(o,n);const r=computed(()=>checkTextAnswer({...e.question,answer:u.value}));return(m,i)=>(openBlock(),createElementBlock("div",_hoisted_1$4,[createBaseVNode("div",_hoisted_2$4,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Text Input",icon:"edit_note"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":i[0]||(i[0]=a=>t.question.title=a),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":i[1]||(i[1]=a=>t.question.question=a)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),t.editable?(openBlock(),createElementBlock(Fragment,{key:1},[createBaseVNode("div",_hoisted_6,[createBaseVNode("div",_hoisted_7,[createVNode(ExpandedDropdown,{options:d,modelValue:o.value,"onUpdate:modelValue":i[3]||(i[3]=a=>o.value=a)},{label:withCtx(({option:a})=>[createBaseVNode("div",_hoisted_8,[createBaseVNode("h3",null,toDisplayString(a.label),1),a.description?(openBlock(),createElementBlock("p",_hoisted_9,toDisplayString(a.description),1)):createCommentVNode("",!0)])]),_:1},8,["modelValue"]),withDirectives(createBaseVNode("input",{"onUpdate:modelValue":i[4]||(i[4]=a=>s.value=a),onChange:n,type:"text",disabled:t.disabled},null,40,_hoisted_10),[[vModelText,s.value]])]),createBaseVNode("div",_hoisted_11,[createVNode(_sfc_main$7,{label:"ignore case",modelValue:t.question.ignoreCase,"onUpdate:modelValue":i[5]||(i[5]=a=>t.question.ignoreCase=a)},null,8,["modelValue"]),createVNode(_sfc_main$7,{label:"ignore punctuation",modelValue:t.question.ignorePunctuation,"onUpdate:modelValue":i[6]||(i[6]=a=>t.question.ignorePunctuation=a)},null,8,["modelValue"]),createVNode(_sfc_main$7,{label:"ignore whitespace",modelValue:t.question.ignoreWhitespace,"onUpdate:modelValue":i[7]||(i[7]=a=>t.question.ignoreWhitespace=a)},null,8,["modelValue"]),createBaseVNode("div",_hoisted_12,[_hoisted_13,withDirectives(createBaseVNode("input",{"onUpdate:modelValue":i[8]||(i[8]=a=>t.question.levenshtein=a),type:"number"},null,512),[[vModelText,t.question.levenshtein]])])])]),_hoisted_14,createBaseVNode("div",_hoisted_15,[_hoisted_16,withDirectives(createBaseVNode("input",{class:normalizeClass({correct:r.value,incorrect:!r.value}),"onUpdate:modelValue":i[9]||(i[9]=a=>u.value=a),type:"text"},null,2),[[vModelText,u.value]])])],64)):(openBlock(),createElementBlock("div",_hoisted_3$4,[_hoisted_4$4,withDirectives(createBaseVNode("input",{"onUpdate:modelValue":i[2]||(i[2]=a=>l.value=a),type:"text",disabled:t.disabled},null,8,_hoisted_5$4),[[vModelText,l.value]])]))]))}}),TextInput=_export_sfc(_sfc_main$5,[["__scopeId","data-v-ce12444c"]]),_withScopeId$2=t=>(pushScopeId("data-v-63d0d5e4"),t=t(),popScopeId(),t),_hoisted_1$3={class:"question multiple-choice"},_hoisted_2$3={class:"header"},_hoisted_3$3={class:"options"},_hoisted_4$3=_withScopeId$2(()=>createBaseVNode("span",{class:"material-symbols-rounded"},"check",-1)),_hoisted_5$3=_withScopeId$2(()=>createBaseVNode("span",{class:"material-symbols-rounded"},"close",-1)),_sfc_main$4=defineComponent({__name:"TrueFalse",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(t){const e=t,o=u=>{if(e.editable){e.question.solution=u;return}e.question.answer=u};return onMounted(()=>{e.question.answer=void 0}),(u,s)=>(openBlock(),createElementBlock("div",_hoisted_1$3,[createBaseVNode("div",_hoisted_2$3,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"True or False",icon:"check"})),createVNode(EditableText,{modelValue:t.question.title,"onUpdate:modelValue":s[0]||(s[0]=l=>t.question.title=l),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":s[1]||(s[1]=l=>t.question.question=l)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),createBaseVNode("div",_hoisted_3$3,[createBaseVNode("div",{class:normalizeClass(["option",{selected:!t.editable&&t.question.answer===!0,correct:t.editable&&t.question.solution===!0}]),onClick:s[2]||(s[2]=l=>o(!0))},[_hoisted_4$3,createTextVNode(" True ")],2),createBaseVNode("div",{class:normalizeClass(["option",{selected:!t.editable&&t.question.answer===!1,correct:t.editable&&t.question.solution===!1}]),onClick:s[3]||(s[3]=l=>o(!1))},[_hoisted_5$3,createTextVNode(" False ")],2)])]))}}),TrueFalse=_export_sfc(_sfc_main$4,[["__scopeId","data-v-63d0d5e4"]]),_withScopeId$1=t=>(pushScopeId("data-v-36f16552"),t=t(),popScopeId(),t),_hoisted_1$2={class:"question multiple-choice"},_hoisted_2$2={class:"header"},_hoisted_3$2={class:"options"},_hoisted_4$2=["onClick","onKeypress"],_hoisted_5$2=_withScopeId$1(()=>createBaseVNode("span",{class:"material-symbols-rounded add"}," add ",-1)),_sfc_main$3=defineComponent({__name:"Ordering",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1},showCorrection:{type:Boolean,default:!1}},setup(t){const e=t,o=ref(e.editable?e.question.solution:[]),u=()=>{if(e.editable)return;const s=JSON.parse(JSON.stringify(e.question.solution));e.question.answer=s.sort(()=>Math.random()-.5),o.value=e.question.answer};return watch(o,()=>{if(e.editable){e.question.solution=o.value;return}e.question.answer=o.value},{deep:!0}),watch(()=>e.question.id,u),onMounted(u),(s,l)=>(openBlock(),createElementBlock("div",_hoisted_1$2,[createBaseVNode("div",_hoisted_2$2,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Ordering",icon:"sort"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":l[0]||(l[0]=p=>t.question.title=p),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":l[1]||(l[1]=p=>t.question.question=p)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),createBaseVNode("div",_hoisted_3$2,[createVNode(unref(draggable),{modelValue:o.value,"onUpdate:modelValue":l[2]||(l[2]=p=>o.value=p),"item-key":"id",tag:"div",class:"options"},{item:withCtx(({element:p,index:d})=>[createBaseVNode("div",{class:normalizeClass(["option",{wrong:t.showCorrection&&t.question.solution[d]!==p}])},[createVNode(EditableText,{locked:!t.editable,"no-outline":"",modelValue:o.value[d],"onUpdate:modelValue":n=>o.value[d]=n},{default:withCtx(()=>[createBaseVNode("span",null,toDisplayString(p),1)]),_:2},1032,["locked","modelValue","onUpdate:modelValue"]),t.editable?(openBlock(),createElementBlock("span",{key:0,class:"material-symbols-rounded delete",tabindex:"0",onClick:withModifiers(n=>e.question.solution.splice(d,1),["stop"]),onKeypress:withKeys(withModifiers(n=>e.question.solution.splice(d,1),["stop"]),["enter"])}," delete ",40,_hoisted_4$2)):createCommentVNode("",!0)],2)]),_:1},8,["modelValue"]),t.editable?(openBlock(),createElementBlock("div",{key:0,class:"option add",tabindex:"0",onClick:l[3]||(l[3]=withModifiers(p=>e.question.solution.push("Item"),["stop"])),onKeypress:l[4]||(l[4]=withKeys(withModifiers(p=>e.question.solution.push("Item"),["stop"]),["enter"]))},[_hoisted_5$2,createTextVNode(" Add ")],32)):createCommentVNode("",!0)])]))}}),Ordering=_export_sfc(_sfc_main$3,[["__scopeId","data-v-36f16552"]]),_withScopeId=t=>(pushScopeId("data-v-59fc9250"),t=t(),popScopeId(),t),_hoisted_1$1={class:"question multiple-choice"},_hoisted_2$1={class:"header"},_hoisted_3$1={class:"back"},_hoisted_4$1=_withScopeId(()=>createBaseVNode("div",{class:"front"},[createBaseVNode("p",{class:"muted"},"Click to reveal")],-1)),_hoisted_5$1={class:"placeholder"},_sfc_main$2=defineComponent({__name:"Flashcard",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(t){const e=t,o=ref(!1);watch(()=>e.question.id,()=>{o.value=!1});const u=computed(()=>e.question.solution.replace(/\w/g,"c"));return(s,l)=>(openBlock(),createElementBlock("div",_hoisted_1$1,[createBaseVNode("div",_hoisted_2$1,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Flashcard",icon:"bolt"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":l[0]||(l[0]=p=>t.question.title=p),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":l[1]||(l[1]=p=>t.question.question=p)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),t.editable?(openBlock(),createBlock(EditableText,{key:0,class:"back",locked:!1,modelValue:t.question.solution,"onUpdate:modelValue":l[2]||(l[2]=p=>t.question.solution=p),onClick:l[3]||(l[3]=withModifiers(()=>{},["stop"])),placeholder:"Click to edit the solution"},{default:withCtx(()=>[createBaseVNode("h3",null,toDisplayString(t.question.solution),1)]),_:1},8,["modelValue"])):(openBlock(),createElementBlock("div",{key:1,class:normalizeClass(["card",{revealed:o.value}]),onClick:l[4]||(l[4]=p=>o.value=!o.value)},[createBaseVNode("h3",_hoisted_3$1,toDisplayString(t.question.solution),1),_hoisted_4$1,createBaseVNode("h3",_hoisted_5$1,toDisplayString(u.value),1)],2))]))}}),Flashcard=_export_sfc(_sfc_main$2,[["__scopeId","data-v-59fc9250"]]),_hoisted_1={class:"question fill-in-the-blank"},_hoisted_2={class:"header"},_hoisted_3={key:0,class:"input editor"},_hoisted_4={key:1},_hoisted_5={class:"input"},_sfc_main$1=defineComponent({__name:"FillInTheBlank",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(t){const e=t,o=ref(),u=ref(),s=ref([]),l=()=>{if(!u.value)return[];const r=u.value.querySelectorAll(".gap");return Array.from(r).map(m=>m.value)},p=r=>{if(!u.value||!r)return;const m=/-\[(.*)\]-/g,i=r.matchAll(m),a=Array.from(i,c=>{const h=c.index||0,f=c[0].length;return{index:h,length:f,value:c[0],gap:c[1]}});window.onGapInput=c=>{const h=c.target,f=parseInt(h.dataset.index||"0");s.value[f]=h.value,e.question.answer=s.value};for(let c=a.length-1;c>=0;c--){const h=a[c],f=document.createElement("input");f.classList.add("gap"),f.value=e.editable?h.gap:"",f.size=(h.length-4)*2,f.dataset.index=`${c}`,f.disabled=e.editable,r=r.replace(h.value,f.outerHTML.replace("<input",`<input oninput='onGapInput(event)' value='${f.value}'`))}u.value.innerHTML=r,s.value=l()};onMounted(()=>{e.editable&&(o.value.innerHTML=e.question.text),p(e.question.text)});const d=()=>{o.value&&(p(o.value.innerHTML),e.question.text=o.value.innerHTML,e.question.solution=s.value)},n=()=>{o.value.innerHTML+="-[gap]-",d()};return(r,m)=>(openBlock(),createElementBlock("div",_hoisted_1,[createBaseVNode("div",_hoisted_2,[t.editable?createCommentVNode("",!0):(openBlock(),createBlock(Tag,{key:0,label:"Fill in the Blank",icon:"edit"})),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.title,"onUpdate:modelValue":m[0]||(m[0]=i=>t.question.title=i),class:"h1"},{default:withCtx(()=>[createBaseVNode("h1",null,toDisplayString(t.question.title),1)]),_:1},8,["locked","modelValue"]),createVNode(EditableText,{locked:!t.editable,modelValue:t.question.question,"onUpdate:modelValue":m[1]||(m[1]=i=>t.question.question=i)},{default:withCtx(()=>[createBaseVNode("p",null,toDisplayString(t.question.question),1)]),_:1},8,["locked","modelValue"])]),t.editable?(openBlock(),createElementBlock("div",_hoisted_3,[createBaseVNode("div",{class:"textarea",contenteditable:!0,ref_key:"editor",ref:o,onFocusout:d},null,544),createVNode(IconButton,{label:"Add gap",icon:"add",onClick:n})])):createCommentVNode("",!0),t.editable?(openBlock(),createElementBlock("h4",_hoisted_4,"Preview")):createCommentVNode("",!0),createBaseVNode("div",_hoisted_5,[createBaseVNode("div",{class:"textarea",ref_key:"quiz",ref:u},null,512)])]))}}),_sfc_main=defineComponent({__name:"index",props:{question:{type:Object,required:!0},disabled:{type:Boolean,default:!1},showCorrection:{type:Boolean,default:!1},editable:{type:Boolean,default:!1}},setup(t){const e={"multiple-choice":MultipleChoice,"multiple-answer":MultipleAnswers,matching:Matching,"number-answer":NumberInput,"text-answer":TextInput,"true-false":TrueFalse,ordering:Ordering,flashcard:Flashcard,"fill-in-the-blank":_sfc_main$1};return(o,u)=>(openBlock(),createBlock(resolveDynamicComponent(e[t.question.type]),{question:t.question,disabled:t.disabled,editable:t.editable,showCorrection:t.showCorrection},null,8,["question","disabled","editable","showCorrection"]))}});export{EditableText as E,_sfc_main as _,checkNumber as a,_sfc_main$7 as b,checkTextAnswer as c};
