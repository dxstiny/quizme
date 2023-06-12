import{_ as P,c as W,a as G}from"./index.vue_vue_type_script_setup_true_lang-ee44bf63.js";import{d as H,a as J,j as _,k as R,l as K,m as U,c as v,f as i,F as X,e as t,t as w,g as A,b as E,n as f,I as p,h as Y,o as a,p as Z,i as ee,_ as te}from"./index-c96840f1.js";import{u as se}from"./stats-55ae3cf7.js";import"./ExpandedDropdown-8b2f1e4f.js";const d=m=>(Z("data-v-71f7bcd7"),m=m(),ee(),m),ne={class:"quiz"},oe={class:"header"},ue={class:"flex gap-2"},le=["max","value"],ae={class:"body"},ie={key:0,class:"correct-missed"},re=d(()=>t("h1",null," Let's correct the exercises you got wrong last time! ",-1)),ce=[re],de={key:1,class:"end"},ve=d(()=>t("h1",null,"Well done!",-1)),he={class:"review"},_e={class:"score"},pe=d(()=>t("span",null,"SCORE",-1)),fe={class:"value"},me={class:"time"},ye=d(()=>t("span",null,"TIME",-1)),ke={class:"value"},ge={class:"footer"},we={key:0,class:"check"},be={key:1,class:"check"},qe={key:2,class:"checking"},xe={key:0,class:"correct"},Ce=d(()=>t("div",{class:"continue"},[t("div",{class:"icon"},[t("span",{class:"material-symbols-rounded"},"check")])],-1)),Te=d(()=>t("div",{class:"text"},[t("h2",null,"Correct!")],-1)),Se={class:"continue"},Ie={key:1,class:"wrong"},Me=d(()=>t("div",{class:"continue"},[t("div",{class:"icon"},[t("span",{class:"material-symbols-rounded"},"close")])],-1)),$e={class:"text"},Re=d(()=>t("h2",null,"Correct solution:",-1)),Ae={class:"continue"},Ee=H({__name:"index",setup(m){const y=J(),k=se(),b=_(R().params.id);K(()=>{const s=R().params.id;b.value=s,l.value=0});const r=_({correct:[],wrong:[],startTime:new Date,endTime:null}),o=_(y.getQuiz(b.value)),j=o.value.questions.length,q=U(),l=_(0),n=v(()=>o.value.questions[l.value]),T=v(()=>{var s;const e=n.value;if(!e)return!1;if(e.type==="flashcard")return!0;if(e.type=="matching"){const u=e.answer||{},c=e.solution||{};return Object.keys(c).every($=>u[$]===c[$])}return((s=o.value.questions[l.value])==null?void 0:s.answer)!=null}),B=v(()=>{var e;return((e=o.value.questions[l.value])==null?void 0:e.hint)!=null}),Q=()=>{alert(o.value.questions[l.value].hint)},h=_(!1),S=()=>{if(["flashcard","matching"].includes(n.value.type))return g(),!0;if(n.value.type=="multiple-answer"){const e=n.value.solution||[],s=n.value.answer||[];return e.every(u=>s.includes(u))}if(n.value.type=="ordering"){const e=n.value.solution||[],s=n.value.answer||[];return e.every((u,c)=>u===s[c])}return n.value.type==="text-answer"?W(n.value):n.value.type==="number-answer"?G(n.value):n.value.answer===L.value},z=v(()=>{var e;return["matching","flashcard"].includes((e=n.value)==null?void 0:e.type)?"Continue":"Check"}),L=v(()=>n.value.solution),N=v(()=>{const e=n.value;if(e.type==="multiple-choice")return e.options[e.solution];if(e.type==="multiple-answer")return e.solution.map(s=>e.options[s]).join(", ");if(e.type==="true-false")return e.solution?"True":"False";if(e.type==="text-answer")return e.solution?e.solution:e.solutionRegex?`Matches ${e.solutionRegex}`:e.solutionAny?`Matches any of ${e.solutionAny.join(", ")}`:e.solutionAll?`Matches all of ${e.solutionAll.join(", ")}`:"Any";if(e.type==="number-answer")return e.min!=null&&e.max!=null?"Between "+e.min+" and "+e.max:`${e.solution} (+/- ${e.delta})`;if(e.type==="ordering")return e.solution.join(", ")}),g=()=>{h.value=!1,l.value++,D()},x=()=>l.value===o.value.questions.length,D=()=>{x()&&(r.value.endTime=new Date,k.resetStreak(),k.addRun(r.value))},F=()=>{if(l.value===0){q.push("/");return}confirm("Are you sure you want to quit?")&&q.push("/")},I=()=>{h.value=!0;const e=n.value.id,s=y.getCourse(b.value),u=n.value;if(S()){r.value.correct.push(e),y.onCorrectQuestion(s,u),k.addToStreak();return}r.value.wrong.push(e),y.onIncorrectQuestion(s,u),k.resetStreak(),o.value.questions.filter(c=>c.id===e).length===1&&(o.value.questions.push(u),delete o.value.questions[o.value.questions.length-1].answer)},V=v(()=>{if(r.value.endTime==null)return 0;const e=r.value.endTime.getTime()-r.value.startTime.getTime(),s=Math.floor(e/1e3),u=Math.floor(s/60),c=(s-u*60).toString().padStart(2,"0");return`${u}:${c}`});document.addEventListener("keydown",e=>{if(e.key==="Enter"){if(h.value){g();return}if(!T.value)return;I()}});let C=_(!1),M=null;const O=()=>M?!0:C.value?!1:l.value>=j?(M=window.setTimeout(()=>{C.value=!0},3e3),!0):!1;return(e,s)=>(a(),i("div",ne,[x()?(a(),i("div",de,[ve,t("div",he,[t("div",_e,[pe,t("span",fe,w(Math.round(r.value.correct.length/o.value.questions.length*100))+" % ",1)]),t("div",me,[ye,t("span",ke,w(V.value),1)])])])):(a(),i(X,{key:0},[t("div",oe,[t("h1",null,w(o.value.title),1),t("div",ue,[t("span",{onClick:F,class:"material-symbols-rounded muted cursor-pointer"},"close"),t("progress",{max:o.value.questions.length,value:l.value+(h.value?1:0)},null,8,le)])]),t("div",ae,[O()&&!A(C)?(a(),i("div",ie,ce)):(a(),E(P,{key:1,question:o.value.questions[l.value],disabled:h.value},null,8,["question","disabled"]))])],64)),t("div",ge,[x()?(a(),i("div",we,[f(p,{class:"left",label:"Review Lesson",type:"minimal-grey"}),f(p,{class:"right",label:"Continue",type:"submit",onClick:s[0]||(s[0]=u=>A(q).push("/"))})])):h.value?(a(),i("div",qe,[S()?(a(),i("div",xe,[Ce,Te,t("div",Se,[f(p,{label:"Continue",type:"submit",onClick:g})])])):(a(),i("div",Ie,[Me,t("div",$e,[Re,t("p",null,w(N.value),1)]),t("div",Ae,[f(p,{label:"Continue",type:"action-red",onClick:g})])]))])):(a(),i("div",be,[B.value?(a(),E(p,{key:0,class:"left",icon:"lightbulb",label:"Show Tip",type:"minimal-blue",onClick:Q})):Y("",!0),f(p,{class:"right",label:z.value,type:"submit",disabled:!T.value,onClick:I},null,8,["label","disabled"])]))])]))}});const Le=te(Ee,[["__scopeId","data-v-71f7bcd7"]]);export{Le as default};
