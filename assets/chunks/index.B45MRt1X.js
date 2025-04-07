import{p as i,v as Y,$ as y,x as T,h as E,a8 as w,q as x,a3 as I}from"./framework.DLuUSK6a.js";function z(t=Date.now(),n="YYYY-MM-DD HH:mm:ss"){try{let e;if(typeof t=="number"||typeof t=="string"){if(e=new Date(t),isNaN(e.getTime()))throw new Error("Invalid date")}else e=t;const r=(u,o=2)=>String(u).padStart(o,"0"),a=u=>{switch(u){case"YYYY":return r(e.getFullYear());case"YY":return r(e.getFullYear()).slice(2,4);case"MM":return r(e.getMonth()+1);case"M":return String(e.getMonth()+1);case"DD":return r(e.getDate());case"D":return String(e.getDate());case"HH":return r(e.getHours());case"H":return String(e.getHours());case"mm":return r(e.getMinutes());case"m":return String(e.getMinutes());case"ss":return r(e.getSeconds());case"s":return String(e.getSeconds());case"SSS":return r(e.getMilliseconds(),3);default:return u}};return n.replace(/(YYYY|YY|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS)/g,a)}catch(e){return console.error("Error formatting date:",e),""}}function $(t,n=2,e=",",r=".",a,u){typeof t!="number"&&typeof t!="string"&&console.warn("Expected value to be of type number or string"),typeof n!="number"&&console.warn("Expected precision to be of type number");const o=Number(t);if(isNaN(o)||!isFinite(o))return"";if(o===0)return o.toFixed(n);let c=o.toFixed(n);if(typeof e=="string"&&e!==""){const[v,m]=c.split(".");c=v.replace(/(\d)(?=(\d{3})+$)/g,"$1"+e)+(m?r+m:"")}return(a||"")+c+(u||"")}function C(t,n=0,e=!1){let r=null;function a(o){if(r||(r=o),o-r>=n){try{t()}catch(c){console.error("Error executing rafTimeout function:",c)}e&&(r=o,u.id=requestAnimationFrame(a))}else u.id=requestAnimationFrame(a)}const u={id:requestAnimationFrame(a)};return u}function Q(t){t&&t.id&&typeof t.id=="number"?cancelAnimationFrame(t.id):console.warn("cancelRaf received an invalid id:",t)}function N(t,n=300){let e=!0;return function(...r){if(!e)return!1;e&&(t(...r),e=!1,setTimeout(()=>{e=!0},n))}}function O(t,n=300){let e=null;return function(...r){e&&clearTimeout(e),e=setTimeout(()=>{t(...r)},n)}}function U(){const t=document.documentElement;t.classList.toggle("dark"),t.classList.contains("dark")?t.style.colorScheme="dark":t.style.colorScheme="light"}function R(){const t=i(!1),n=I();return n&&Y(()=>{t.value=!0},n),t}function A(t){const n=R();return E(()=>(n.value,!!t()))}function V(t,n,e){Y(()=>t.addEventListener(n,e)),T(()=>t.removeEventListener(n,e))}function W(t,n,e={}){const r=A(()=>window&&"MutationObserver"in window),a=i(!1);let u;const o=E(()=>{const l=w(t);return l?Array.isArray(l)?l.map(f=>w(f)).filter(f=>f):[l]:[]}),c=()=>{u&&(u.disconnect(),u=void 0)},v=()=>{r.value&&o.value.length&&!a.value&&(u=new MutationObserver(n),o.value.forEach(l=>u.observe(l,e)))};x(()=>o.value,()=>{c(),v()},{immediate:!0,flush:"post"});const m=()=>{a.value=!0,c()},g=()=>{a.value=!1,v()};return y(()=>c()),{stop:m,start:g}}function B(t=window,n=0,e,r){const a=i(0),u=i(0),o=i(0),c=i(0),v=i(!1),m=i(!1),g=i(!1),l=i(!1),f=i(!1),M=i(0),S=i(0);function H(s){v.value=!0;const d=s.target.documentElement??s.target;a.value=d.scrollLeft,o.value=d.scrollTop,m.value=a.value<M.value,g.value=a.value>M.value,l.value=o.value<S.value,f.value=o.value>S.value,M.value=a.value,S.value=o.value,b(s),e&&e(s)}const F=N(H,n);function q(s){v.value&&(v.value=!1,m.value=!1,g.value=!1,l.value=!1,f.value=!1,r&&r(s))}const b=O(q,n+200),D=E(()=>w(t)||null);x(()=>D.value,(s,d)=>{var p;if(d&&L(d),s){const h=((p=s==null?void 0:s.document)==null?void 0:p.documentElement)||(s==null?void 0:s.documentElement)||s;u.value=h.scrollWidth-h.clientWidth,c.value=h.scrollHeight-h.clientHeight,h.addEventListener("scroll",F),h.addEventListener("scrollend",b)}},{immediate:!0,flush:"post"});function L(s){var d;const p=((d=s==null?void 0:s.document)==null?void 0:d.documentElement)||(s==null?void 0:s.documentElement)||s;p.removeEventListener("scroll",F),p.removeEventListener("scrollend",b)}return y(()=>L(D.value)),{x:a,xScrollMax:u,y:o,yScrollMax:c,isScrolling:v,left:m,right:g,top:l,bottom:f}}function G(){const t=i(0),n=i(0);let e=performance.now();const r=10,a=u=>{if(n.value++,n.value>=r){const o=u-e;t.value=Math.round(1e3/(o/r)),e=u,n.value=0}requestAnimationFrame(a)};return requestAnimationFrame(a),{fps:t}}function X(t){if(t.trim()==="")throw new Error("Invalid mediaQuery parameter. It must be a non-empty string.");const n=i(window&&window.matchMedia(t).matches),e=window.matchMedia(t),r=a=>{n.value=a.matches};return Y(()=>{e.addEventListener("change",r)}),y(()=>{e.removeEventListener("change",r)}),{match:n}}function _(t,n,e={}){const r=A(()=>window&&"ResizeObserver"in window);let a;const u=i(!1),o=E(()=>{const l=w(t);return l?Array.isArray(l)?l.map(f=>w(f)).filter(f=>f):[l]:[]}),c=()=>{a&&(a.disconnect(),a=void 0)},v=()=>{r.value&&o.value.length&&!u.value&&(a=new ResizeObserver(n),o.value.forEach(l=>a.observe(l,e)))};x(()=>o.value,()=>{c(),v()},{immediate:!0,flush:"post"});const m=()=>{u.value=!0,c()},g=()=>{u.value=!1,v()};return y(()=>c()),{stop:m,start:g}}export{N as C,C as Q,z as X,$ as _,B as c,Q as e,_ as i,X as l,V as o,U as r,W as s,G as u,O as z};
