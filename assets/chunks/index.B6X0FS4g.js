import{l as b,m as T,r as i,k as y,w as F,Y as E,j as h,g as N}from"./framework.Cw4vOG9C.js";function z(t=Date.now(),n="YYYY-MM-DD HH:mm:ss"){try{let e;if(typeof t=="number"||typeof t=="string"){if(e=new Date(t),isNaN(e.getTime()))throw new Error("Invalid date")}else e=t;const r=(o,u=2)=>String(o).padStart(u,"0"),a=o=>{switch(o){case"YYYY":return r(e.getFullYear());case"YY":return r(e.getFullYear()).slice(2,4);case"MM":return r(e.getMonth()+1);case"M":return String(e.getMonth()+1);case"DD":return r(e.getDate());case"D":return String(e.getDate());case"HH":return r(e.getHours());case"H":return String(e.getHours());case"mm":return r(e.getMinutes());case"m":return String(e.getMinutes());case"ss":return r(e.getSeconds());case"s":return String(e.getSeconds());case"SSS":return r(e.getMilliseconds(),3);default:return o}};return n.replace(/(YYYY|YY|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS)/g,a)}catch(e){return console.error("Error formatting date:",e),""}}function U(t,n=2,e=",",r=".",a,o){typeof t!="number"&&typeof t!="string"&&console.warn("Expected value to be of type number or string"),typeof n!="number"&&console.warn("Expected precision to be of type number");const u=Number(t);if(isNaN(u)||!isFinite(u))return"";if(u===0)return u.toFixed(n);let c=u.toFixed(n);if(typeof e=="string"&&e!==""){const[d,m]=c.split(".");c=d.replace(/(\d)(?=(\d{3})+$)/g,"$1"+e)+(m?r+m:"")}return(a||"")+c+(o||"")}function j(t,n=0,e=!1){let r=null;function a(u){if(r||(r=u),u-r>=n){try{t()}catch(c){console.error("Error executing rafTimeout function:",c)}e&&(r=u,o.id=requestAnimationFrame(a))}else o.id=requestAnimationFrame(a)}const o={id:requestAnimationFrame(a)};return o}function B(t){t&&t.id&&typeof t.id=="number"?cancelAnimationFrame(t.id):console.warn("cancelRaf received an invalid id:",t)}function O(t,n=300){let e=!0;return function(...r){return e&&(t(...r),e=!1,setTimeout(()=>{e=!0},n)),!1}}function k(t,n=300){let e=null;return function(...r){e&&clearTimeout(e),e=setTimeout(()=>{t(...r)},n)}}function Q(){const t=document.documentElement;t.classList.toggle("dark"),t.classList.contains("dark")?t.style.colorScheme="dark":t.style.colorScheme="light"}function I(){const t=i(!1),n=N();return n&&b(()=>{t.value=!0},n),t}function x(t){const n=I();return y(()=>(n.value,!!t()))}function V(t,n,e){b(()=>t.addEventListener(n,e)),T(()=>t.removeEventListener(n,e))}function W(t,n,e={}){const r=x(()=>window&&"MutationObserver"in window),a=i(!1);let o;const u=y(()=>{const s=h(t);return s?Array.isArray(s)?s.map(f=>h(f)).filter(f=>f):[s]:[]}),c=()=>{o&&(o.disconnect(),o=void 0)},d=()=>{r.value&&u.value.length&&!a.value&&(o=new MutationObserver(n),u.value.forEach(s=>o.observe(s,e)))};F(()=>u.value,()=>{c(),d()},{immediate:!0,flush:"post"});const m=()=>{a.value=!0,c()},g=()=>{a.value=!1,d()};return E(()=>c()),{stop:m,start:g}}function $(t=window,n=0,e,r){const a=i(0),o=i(0),u=i(0),c=i(0),d=i(!1),m=i(!1),g=i(!1),s=i(!1),f=i(!1),S=i(0),M=i(0);function H(l){d.value=!0;const v=l.target.documentElement??l.target;a.value=v.scrollLeft,u.value=v.scrollTop,m.value=a.value<S.value,g.value=a.value>S.value,s.value=u.value<M.value,f.value=u.value>M.value,S.value=a.value,M.value=u.value,Y(l),e(l)}const A=O(H,n);function q(l){d.value&&(d.value=!1,m.value=!1,g.value=!1,s.value=!1,f.value=!1,r(l))}const Y=k(q,n+200),D=y(()=>h(t)||null);F(()=>D.value,(l,v)=>{var w;if(v&&L(v),l){const p=((w=l==null?void 0:l.document)==null?void 0:w.documentElement)||(l==null?void 0:l.documentElement)||l;o.value=p.scrollWidth-p.clientWidth,c.value=p.scrollHeight-p.clientHeight,p.addEventListener("scroll",A),p.addEventListener("scrollend",Y)}},{immediate:!0,flush:"post"});function L(l){var v;const w=((v=l==null?void 0:l.document)==null?void 0:v.documentElement)||(l==null?void 0:l.documentElement)||l;w.removeEventListener("scroll",A),w.removeEventListener("scrollend",Y)}return E(()=>L(D.value)),{x:a,xScrollMax:o,y:u,yScrollMax:c,isScrolling:d,left:m,right:g,top:s,bottom:f}}function C(){const t=i(0),n=i(0);let e=performance.now();const r=10,a=o=>{if(n.value++,n.value>=r){const u=o-e;t.value=Math.round(1e3/(u/r)),e=o,n.value=0}requestAnimationFrame(a)};return requestAnimationFrame(a),{fps:t}}function G(t){if(t.trim()==="")throw new Error("Invalid mediaQuery parameter. It must be a non-empty string.");const n=i(window&&window.matchMedia(t).matches),e=window.matchMedia(t),r=a=>{n.value=a.matches};return b(()=>{e.addEventListener("change",r)}),E(()=>{e.removeEventListener("change",r)}),{match:n}}function J(t,n,e={}){const r=x(()=>window&&"ResizeObserver"in window);let a;const o=i(!1),u=y(()=>{const s=h(t);return s?Array.isArray(s)?s.map(f=>h(f)).filter(f=>f):[s]:[]}),c=()=>{a&&(a.disconnect(),a=void 0)},d=()=>{r.value&&u.value.length&&!o.value&&(a=new ResizeObserver(n),u.value.forEach(s=>a.observe(s,e)))};F(()=>u.value,()=>{c(),d()},{immediate:!0,flush:"post"});const m=()=>{o.value=!0,c()},g=()=>{o.value=!1,d()};return E(()=>c()),{stop:m,start:g}}export{U as B,Q as G,$ as J,C as K,B as P,J as Q,O as U,V as X,W as Z,G as _,z as j,k as q,j as z};
