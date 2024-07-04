import{b as N,E as O,_ as j}from"./index.vue_vue_type_script_setup_true_lang-DGa4SZSt.js";import{d as A,r as b,e as G,o as H,x as P,f as Q,a as c,c as _,b as e,F as x,t as k,k as i,I as d,l as $,y as R,z,p as I,m as B,_ as E,g as D,h as U,n as Y,s as L,j as l,i as K,D as W}from"./index-D-7qE5hs.js";import{_ as X}from"./WithSidebar.vue_vue_type_style_index_0_lang----b3IkS.js";import"./FillInTheBlank.vue_vue_type_style_index_0_lang-uG_iiaDO.js";import"./ExpandedDropdown-CcY9vh6G.js";/* empty css                                                                         */import"./_commonjsHelpers-C4iS2aBk.js";const Z=[{label:"Multiple Choice",value:"multiple-choice"},{label:"Multiple Answer",value:"multiple-answer"},{label:"Text Answer",value:"text-answer"},{label:"Number Answer",value:"number-answer"},{label:"True/False",value:"true-false"},{label:"Fill in the Blank",value:"fill-in-the-blank"},{label:"Matching",value:"matching"},{label:"Ordering",value:"ordering"},{label:"Flashcard",value:"flashcard"}],C=m=>(I("data-v-856da437"),m=m(),B(),m),q={class:"options"},ee={key:0,class:"option"},le=C(()=>e("div",{class:"info"},[e("h3",null,"Update remote"),e("p",null," This course is already shared. Update the remote to share the latest changes. ")],-1)),se={class:"option"},oe=C(()=>e("div",{class:"info"},[e("h3",null,"New share"),e("p",null," Share this course for the first time. This will create a new gist on GitHub. ")],-1)),te={class:"option"},ae=C(()=>e("div",{class:"info"},[e("h3",null,"Download"),e("p",null," Download the course as a JSON file. This can be used to import the course on another device. ")],-1)),ne=C(()=>e("h1",null,"GitHub Gists PAT",-1)),ie=C(()=>e("p",null," To use this feature, you need to provide a GitHub Gists PAT. This is used to create gists for sharing courses. ",-1)),re={key:0},ue=C(()=>e("p",null,"Your share link:",-1)),de=["value"],ce={key:1},pe=C(()=>e("p",null," To share this course, click the button below. This will create a gist on GitHub with the course data. ",-1)),ve={class:"options"},he=A({__name:"ShareModal",setup(m,{expose:V}){const g=b(!1),p=b(""),w=b(!1),t=b(!1),v=b(),h=b(null),S=G(),o=b(""),s=b();H(()=>{const r=P.pat();g.value=!!r});const y=r=>{var n,u;h.value=null,(n=s.value)==null||n.showModal(),r.id!==((u=v.value)==null?void 0:u.id)&&(w.value=!1,t.value=!1,p.value=""),v.value=r},a=()=>{P.setPat(o.value),g.value=!0},T=async()=>{const r=v.value;if(!r)return;const n=JSON.parse(JSON.stringify(r));delete n.remote,w.value||(n.score={}),p.value=await S.shareCourse(n,t.value)??""},f=()=>{var r;S.downloadCourse(v.value),(r=s.value)==null||r.close()},J=()=>{var u;const r=v.value;if(!r)return;const n=JSON.parse(JSON.stringify(r));w.value||(n.score={}),S.shareCourse(n,t.value),(u=s.value)==null||u.close()},F=Q(()=>{var n,u;if(!((u=(n=v.value)==null?void 0:n.remote)!=null&&u.length))return!1;const r=v.value.remote[0].identifier;return P.isMine(r)});return V({open:y}),(r,n)=>(c(),_("dialog",{ref_key:"dialog",ref:s},[e("span",{class:"material-symbols-rounded close",onClick:n[0]||(n[0]=u=>{var M;return(M=s.value)==null?void 0:M.close()})}," close "),!h.value&&v.value?(c(),_(x,{key:0},[e("h1",null,'Share "'+k(v.value.title)+'"',1),e("div",q,[F.value?(c(),_("div",ee,[le,i(d,{type:"action-green",icon:"update",label:"Update",onClick:J})])):$("",!0),e("div",se,[oe,i(d,{type:"action-green",icon:"share",label:"Share",onClick:n[1]||(n[1]=u=>h.value="gist")})]),e("div",te,[ae,i(d,{type:"action-green",icon:"download",label:"Download",onClick:f})])])],64)):!g.value&&h.value?(c(),_(x,{key:1},[ne,ie,R(e("input",{type:"text","onUpdate:modelValue":n[2]||(n[2]=u=>o.value=u),placeholder:"Enter your PAT here"},null,512),[[z,o.value]]),i(d,{type:"action-green",icon:"done",label:"Save",disabled:!o.value.length,onClick:a},null,8,["disabled"])],64)):h.value=="gist"&&v.value?(c(),_(x,{key:2},[e("h1",null,'Share "'+k(v.value.title)+'"',1),p.value?(c(),_("div",re,[ue,e("input",{type:"text",readonly:"",value:p.value},null,8,de)])):(c(),_("div",ce,[pe,e("div",ve,[i(N,{label:"Include Progress",modelValue:w.value,"onUpdate:modelValue":n[3]||(n[3]=u=>w.value=u)},null,8,["modelValue"]),i(N,{label:"Public Gist",modelValue:t.value,"onUpdate:modelValue":n[4]||(n[4]=u=>t.value=u)},null,8,["modelValue"])]),i(d,{type:"action-green",icon:"share",label:"Share",onClick:T})]))],64)):$("",!0)],512))}}),_e=E(he,[["__scopeId","data-v-856da437"]]),me=m=>(I("data-v-08bc4b38"),m=m(),B(),m),fe={class:"wrap"},be={class:"editor"},ge={key:0,class:"meta"},ye={class:"muted"},ke={class:"card"},we=me(()=>e("h3",null,"Progress",-1)),Ce={class:"progress"},$e={class:"bar"},Se=["value"],Ve={class:"muted"},xe={class:"actions"},Te={key:1,class:"questions"},Pe={class:"question-wrapper"},Ue={class:"header"},Me={class:"left"},Ne={class:"muted"},Oe={class:"middle"},De={class:"right"},Ae=["onClick"],Ge={key:0,class:"content"},Ie={class:"actions"},Be=A({__name:"index",setup(m){const V=Y(),g=L(),p=G(),w=V.params.id,t=p.courses.find(o=>o.id===w);t||g.push("/");const v=(o,s)=>{const y=o.type;if(y===s)return!1;let a=!1;return typeof o.solution=="array"?a=o.solution.length>0:typeof o.solution=="object"?a=Object.keys(o.solution).length>0:a=!!o.solution,a&&!confirm("Are you sure you want to change the question type?")?!1:(s==="multiple-choice"?y==="multiple-answer"?o.solution=o.solution[0]:(o.options=[],o.solution=-1):s==="multiple-answer"?y==="multiple-choice"?o.solution=[o.solution]:(o.options=[],o.solution=[]):s==="ordering"?o.solution=[]:s==="fill-in-the-blank"?o.solution=[]:s==="matching"?o.solution={}:o.solution="",o.type=s,!0)},h=b([]),S=o=>{h.value.includes(o)?h.value=h.value.filter(s=>s!==o):h.value.push(o)};return(o,s)=>(c(),D(X,null,{default:U(()=>{var y;return[i(_e,{ref:"shareModal"},null,512),e("div",fe,[e("div",be,[l(t)?(c(),_("div",ge,[i(O,{modelValue:l(t).title,"onUpdate:modelValue":s[0]||(s[0]=a=>l(t).title=a),class:"h1"},{default:U(()=>[e("h1",null,k(l(t).title),1)]),_:1},8,["modelValue"]),i(O,{modelValue:l(t).description,"onUpdate:modelValue":s[1]||(s[1]=a=>l(t).description=a)},{default:U(()=>[e("p",ye,k(l(t).description),1)]),_:1},8,["modelValue"]),e("div",ke,[we,i(d,{icon:"replay",label:"Reset",onClick:s[2]||(s[2]=a=>l(p).resetProgress(l(t)))}),e("div",Ce,[e("div",$e,[e("progress",{value:l(p).progress(l(t)),max:"100"},null,8,Se)]),e("span",Ve,k(l(p).progress(l(t)))+"%",1)])]),e("div",xe,[(y=l(t).remote)!=null&&y.length?(c(),D(d,{key:0,icon:"file_download",label:"Pull",onClick:s[3]||(s[3]=a=>l(p).pull({course:l(t)}))})):$("",!0),i(d,{icon:"file_upload",label:"Share",onClick:s[4]||(s[4]=a=>o.$refs.shareModal.open(l(t)))}),i(d,{icon:"code",label:"Edit in JSON",onClick:s[5]||(s[5]=a=>l(g).push(`${l(V).path}/json`))}),i(d,{icon:"school",label:"Start",type:"action-green",onClick:s[6]||(s[6]=a=>l(g).push(`/quiz/${l(t).id}`))}),i(d,{icon:"delete",label:"Delete",type:"action-red",onClick:s[7]||(s[7]=a=>l(p).removeCourse(l(t).id)&&l(g).push("/courses"))})])])):$("",!0),l(t)?(c(),_("div",Te,[(c(!0),_(x,null,K(l(t).questions,(a,T)=>(c(),_("div",Pe,[e("div",Ue,[e("div",Me,[i(d,{icon:"arrow_upward",onClick:f=>l(p).moveQuestionUp(l(t),a)},null,8,["onClick"]),e("span",Ne,k(T+1)+" / "+k(l(t).questions.length),1),i(d,{icon:"arrow_downward",onClick:f=>l(p).moveQuestionDown(l(t),a)},null,8,["onClick"])]),e("div",Oe,[i(W,{options:l(Z),modelValue:a.type,"onUpdate:modelValue":f=>a.type=f,onChange:f=>v(a,f),label:"type"},null,8,["options","modelValue","onUpdate:modelValue","onChange"]),i(d,{icon:"delete",type:"action-red",onClick:f=>l(t).questions.splice(l(t).questions.indexOf(a),1)},null,8,["onClick"])]),e("div",De,[e("span",{class:"muted material-symbols-rounded cursor-pointer",onClick:f=>S(a.id)},k(h.value.includes(a.id)?"expand_less":"expand_more"),9,Ae)])]),h.value.includes(a.id)?$("",!0):(c(),_("div",Ge,[i(j,{question:a,editable:""},null,8,["question"])]))]))),256)),e("div",Ie,[i(d,{icon:"add",label:"Add",type:"action-green",onClick:s[8]||(s[8]=a=>l(t).questions.push({id:Math.random().toString(36).substring(2,9),type:"text-answer",title:"",question:"",solution:""}))})])])):$("",!0)])])]}),_:1}))}}),ze=E(Be,[["__scopeId","data-v-08bc4b38"]]);export{ze as default};
