if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const d=s=>i(s,r),t={module:{uri:r},exports:u,require:d};e[r]=Promise.all(n.map((s=>t[s]||d(s)))).then((s=>(l(...s),u)))}}define(["./workbox-9517df1b"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/ExpandedDropdown-52738ad8.js",revision:null},{url:"assets/ExpandedDropdown-e9e66329.css",revision:null},{url:"assets/index-009b57e5.js",revision:null},{url:"assets/index-14f28eee.js",revision:null},{url:"assets/index-2bc1026d.js",revision:null},{url:"assets/index-3116d0a1.css",revision:null},{url:"assets/index-538d0ee7.css",revision:null},{url:"assets/index-65a4c047.css",revision:null},{url:"assets/index-7ae3a4d7.js",revision:null},{url:"assets/index-81f4eb58.js",revision:null},{url:"assets/index-8ffc6307.css",revision:null},{url:"assets/index-95f2581c.css",revision:null},{url:"assets/index-b00d2720.css",revision:null},{url:"assets/index-c0f3b1d9.css",revision:null},{url:"assets/index-c86d6406.js",revision:null},{url:"assets/index-cd54a012.css",revision:null},{url:"assets/index-ef11cdee.js",revision:null},{url:"assets/index.vue_vue_type_script_setup_true_lang-6e1e130e.js",revision:null},{url:"assets/Redirect-3db36755.js",revision:null},{url:"assets/stats-0249dcbc.js",revision:null},{url:"assets/WithSidebar-df9ec44c.css",revision:null},{url:"assets/WithSidebar.vue_vue_type_style_index_0_lang-4f57b5ec.js",revision:null},{url:"index.html",revision:"eb83b1876db8e6b07b6534739dbed713"},{url:"registerSW.js",revision:"3832d3938e3095f54d74d43c76d9a5c1"},{url:"manifest.webmanifest",revision:"5b26d2dac2a7f5170ad8d30e1a72d59a"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
