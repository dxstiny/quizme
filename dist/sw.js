if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>i(s,r),d={module:{uri:r},exports:u,require:t};e[r]=Promise.all(n.map((s=>d[s]||t(s)))).then((s=>(l(...s),u)))}}define(["./workbox-9517df1b"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/ExpandedDropdown-22dc4f8e.css",revision:null},{url:"assets/ExpandedDropdown-f4b5d74f.js",revision:null},{url:"assets/index-1777068a.js",revision:null},{url:"assets/index-195a41eb.css",revision:null},{url:"assets/index-5d386ee8.css",revision:null},{url:"assets/index-6873e022.css",revision:null},{url:"assets/index-7154427b.css",revision:null},{url:"assets/index-ab382f34.js",revision:null},{url:"assets/index-af5f2833.css",revision:null},{url:"assets/index-b3230b22.js",revision:null},{url:"assets/index-b7c4b165.js",revision:null},{url:"assets/index-bc22c4cd.js",revision:null},{url:"assets/index-c73cface.css",revision:null},{url:"assets/index-ce058887.css",revision:null},{url:"assets/index-e3bf06ec.js",revision:null},{url:"assets/index-ee1a0bba.css",revision:null},{url:"assets/index-ee3d052a.js",revision:null},{url:"assets/index.vue_vue_type_script_setup_true_lang-b305bb4d.js",revision:null},{url:"assets/Redirect-3f6e184d.js",revision:null},{url:"assets/stats-5ed46720.js",revision:null},{url:"assets/WithSidebar-d9f0ae5e.css",revision:null},{url:"assets/WithSidebar.vue_vue_type_style_index_0_lang-02347897.js",revision:null},{url:"index.html",revision:"072f66d71ebcf47aaab5d6bfea0ef1da"},{url:"registerSW.js",revision:"3832d3938e3095f54d74d43c76d9a5c1"},{url:"manifest.webmanifest",revision:"5b26d2dac2a7f5170ad8d30e1a72d59a"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
