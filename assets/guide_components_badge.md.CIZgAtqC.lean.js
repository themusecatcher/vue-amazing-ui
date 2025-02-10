import{C as A,M as f,P as m}from"./chunks/theme.0Le_zqYP.js";import{d as D,p as g,C as n,c as y,o as F,j as e,G as a,a5 as h,a as v,w as t,k as b,F as _,B as x,_ as S}from"./chunks/framework.D_rhKk2H.js";const N=JSON.parse('{"title":"徽标 Badge","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/badge.md","filePath":"guide/components/badge.md","lastUpdated":1738922672000}'),T={name:"guide/components/badge.md"},P=D({...T,setup(z){const p=g(5),E=g(!0),o=["pink","red","yellow","orange","cyan","green","blue","purple","geekblue","magenta","volcano","gold","lime"];function u(){p.value>=1&&p.value--}function c(){p.value++}return(w,s)=>{const C=n("GlobalElement"),d=n("Avatar"),i=n("Badge",!0),l=n("Space"),r=n("Button"),B=n("Switch"),q=n("Flex");return F(),y("div",null,[s[3]||(s[3]=e("h1",{id:"徽标-badge",tabindex:"-1"},[v("徽标 Badge "),e("a",{class:"header-anchor",href:"#徽标-badge","aria-label":'Permalink to "徽标 Badge"'},"​")],-1)),a(C),s[4]||(s[4]=e("p",null,[e("em",null,"图标右上角的圆形徽标数字或文本前的状态小圆点")],-1)),s[5]||(s[5]=e("h2",{id:"何时使用",tabindex:"-1"},[v("何时使用 "),e("a",{class:"header-anchor",href:"#何时使用","aria-label":'Permalink to "何时使用"'},"​")],-1)),s[6]||(s[6]=e("ul",null,[e("li",null,"一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理")],-1)),s[7]||(s[7]=e("h2",{id:"基本使用",tabindex:"-1"},[v("基本使用 "),e("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1)),a(l,null,{default:t(()=>[a(i,{value:5},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1}),a(i,{value:0,"show-zero":""},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1}),a(i,null,{value:t(()=>[a(b(A),{style:{color:"#f5222d"}})]),default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1})]),_:1}),s[8]||(s[8]=h("",2)),a(l,null,{default:t(()=>[a(i,{value:25}),a(i,{value:4,"value-style":{backgroundColor:"#fff",color:"#999",boxShadow:"0 0 0 1px #d9d9d9 inset"}}),a(i,{value:109,"value-style":{backgroundColor:"#52c41a"}})]),_:1}),s[9]||(s[9]=h("",2)),a(l,{gap:"large"},{default:t(()=>[a(i,{value:99},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1}),a(i,{value:100},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1}),a(i,{value:99,max:10},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1}),a(i,{value:1e3,max:999},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1})]),_:1}),s[10]||(s[10]=h("",2)),a(l,{gap:"large"},{default:t(()=>[a(i,{value:"hello","value-style":{backgroundColor:"#1677FF"}},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1}),a(i,null,{value:t(()=>s[1]||(s[1]=[e("span",{class:"u-value"},"world",-1)])),default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1})]),_:1}),s[11]||(s[11]=h("",2)),a(l,{gap:"large"},{default:t(()=>[a(i,{value:99,"value-style":{backgroundColor:"magenta"}},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1}),a(i,{value:"hello","value-style":{backgroundColor:"gold"}},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1}),a(i,{dot:"","value-style":{width:"10px",height:"10px",backgroundColor:"purple"}},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1})]),_:1}),s[12]||(s[12]=h("",2)),a(l,{gap:"large"},{default:t(()=>[a(i,{value:"9",offset:[-20,10]},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1}),a(i,{dot:"",offset:[-15,10]},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1}),a(i,{dot:"",status:"success",offset:["-50%","30%"]},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1})]),_:1}),s[13]||(s[13]=h("",2)),a(i,{dot:""},{default:t(()=>s[2]||(s[2]=[e("a",{href:"#"},"Link something",-1)])),_:1}),s[14]||(s[14]=h("",2)),a(l,null,{default:t(()=>[a(i,{status:"success",ripple:""}),a(i,{status:"error",ripple:""}),a(i,{status:"default",ripple:""}),a(i,{status:"processing",ripple:""}),a(i,{status:"warning",ripple:""})]),_:1}),s[15]||(s[15]=e("br",null,null,-1)),a(l,{style:{"margin-top":"10px"},vertical:""},{default:t(()=>[a(i,{status:"success",text:"Success"}),a(i,{status:"error",text:"Error"}),a(i,{status:"default",text:"Default"}),a(i,{status:"processing",text:"Processing"}),a(i,{status:"warning",text:"warning"})]),_:1}),s[16]||(s[16]=h("",2)),a(q,{vertical:""},{default:t(()=>[a(l,{gap:"large",align:"center"},{default:t(()=>[a(i,{value:p.value},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1},8,["value"]),a(r,{onClick:u},{default:t(()=>[a(b(f))]),_:1}),a(r,{onClick:c},{default:t(()=>[a(b(m))]),_:1})]),_:1}),a(l,{gap:"large",align:"center"},{default:t(()=>[a(i,{dot:E.value},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1},8,["dot"]),a(B,{modelValue:E.value,"onUpdate:modelValue":s[0]||(s[0]=k=>E.value=k)},null,8,["modelValue"])]),_:1})]),_:1}),s[17]||(s[17]=h("",2)),a(i,{value:5,title:"Custom hover text"},{default:t(()=>[a(d,{shape:"square",size:"large"})]),_:1}),s[18]||(s[18]=h("",3)),a(l,null,{default:t(()=>[(F(),y(_,null,x(o,k=>a(i,{key:k,color:k,text:k},null,8,["color","text"])),64))]),_:1}),s[19]||(s[19]=h("",2)),a(l,null,{default:t(()=>[a(i,{color:"#f50",text:"#f50"}),a(i,{color:"#2db7f5",text:"#2db7f5"}),a(i,{color:"#87d068",text:"#87d068"}),a(i,{color:"#108ee9",text:"#108ee9"})]),_:1}),s[20]||(s[20]=h("",10))])}}}),R=S(P,[["__scopeId","data-v-55d3b5e6"]]);export{N as __pageData,R as default};
