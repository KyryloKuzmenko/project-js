(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();function i(r){const o="L6DfZAiGwsspJd4cvUrj1Vf1mjnqIGAcaSeAWdUf3Fo",n="https://api.unsplash.com",s="/search/photos",e=new URLSearchParams({client_id:o,query:r,page:1,per_page:12,orientation:"portrait"});return fetch(`${n}${s}?${e}`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()})}i("cat").then(r=>console.log(r)).catch(r=>console.log(r));
//# sourceMappingURL=commonHelpers.js.map