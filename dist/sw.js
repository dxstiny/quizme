if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>i(s,r),o={module:{uri:r},exports:u,require:t};e[r]=Promise.all(n.map((s=>o[s]||t(s)))).then((s=>(l(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/ExpandedDropdown-DFTgrQnx.js",revision:null},{url:"assets/ExpandedDropdown-DPoU6msu.css",revision:null},{url:"assets/ImportLink-_bZSrx8d.js",revision:null},{url:"assets/ImportLink-iV3X2q7k.css",revision:null},{url:"assets/index-B2-wBaAD.js",revision:null},{url:"assets/index-By_3FyTu.js",revision:null},{url:"assets/index-ByMe82Ja.js",revision:null},{url:"assets/index-C62slsPi.css",revision:null},{url:"assets/index-CE5oWr-O.js",revision:null},{url:"assets/index-ClXW68vR.js",revision:null},{url:"assets/index-CvibukjZ.css",revision:null},{url:"assets/index-D_iRAqHO.js",revision:null},{url:"assets/index-D63lv_3U.css",revision:null},{url:"assets/index-DBY6VpMi.css",revision:null},{url:"assets/index-DE03WDmk.css",revision:null},{url:"assets/index-DEmPwtdD.css",revision:null},{url:"assets/index-Dkwm47Q5.css",revision:null},{url:"assets/index-Lb536ojB.js",revision:null},{url:"assets/index-Y79YWuPo.css",revision:null},{url:"assets/index.vue_vue_type_script_setup_true_lang-DdXtAwXd.js",revision:null},{url:"assets/Redirect-CpjFBi6R.js",revision:null},{url:"assets/stats-D63w0uXt.js",revision:null},{url:"assets/WithSidebar-B1pCYQfv.css",revision:null},{url:"assets/WithSidebar.vue_vue_type_style_index_0_lang-R0a2T5Ny.js",revision:null},{url:"index.html",revision:"cf0a8ef5b7b35948115cec3ff4eb97e7"},{url:"registerSW.js",revision:"3832d3938e3095f54d74d43c76d9a5c1"},{url:"manifest.webmanifest",revision:"5b26d2dac2a7f5170ad8d30e1a72d59a"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
