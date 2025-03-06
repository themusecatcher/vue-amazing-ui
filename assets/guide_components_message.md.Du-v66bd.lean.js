import{g as O}from"./chunks/generate.xgcBSttL.js";import{J as u,K as C}from"./chunks/theme.C8kStjMM.js";import{d as R,p as c,C as p,c as L,o as W,j as f,G as i,a5 as d,a as t,N as B,w as e,a2 as v,_ as U}from"./chunks/framework.bNNjbgDP.js";const H=JSON.parse('{"title":"全局提示 Message","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/message.md","filePath":"guide/components/message.md","lastUpdated":1740971426000}'),G={name:"guide/components/message.md"},X=R({...G,setup(J){const l=c(),y=c(),o=c(),E=c("#ff6900");function m(s){l.value.open(s)}function A(s){l.value.info(s)}function D(s){l.value.success(s)}function q(s){l.value.error(s)}function x(s){l.value.warning(s)}function T(s){l.value.loading(s)}function S(s){l.value.info({content:s,icon:v(u)})}function _(s){l.value.open({content:s,icon:v(C,{style:"color: gold"})})}function M(s){l.value.info({content:s,icon:v(u),class:"custom-class"})}function P(s){y.value.warning({content:s,icon:v(C),top:"30vh",style:{color:"#f50"}})}function w(s){const a=O(s);return{"--button-primary-color":s,"--button-primary-color-hover":a[4],"--button-primary-color-active":a[6],"--button-ripple-color":s}}function I(s){o.value.info(s)}function N(){l.value.info({content:"The message will automatically turn off after 3 seconds.",duration:3e3,onClose:()=>{console.log("custom message closed")}})}function V(){l.value.info({content:"This message will not automatically turn off.",duration:null,onClick:()=>{console.log("custom message clicked")}})}function b(s){console.log("click",s)}function r(){console.log("close")}return(s,a)=>{const F=p("GlobalElement"),g=p("Message",!0),n=p("Button"),k=p("Space"),$=p("ColorPicker");return W(),L("div",null,[a[26]||(a[26]=f("h1",{id:"全局提示-message",tabindex:"-1"},[t("全局提示 Message "),f("a",{class:"header-anchor",href:"#全局提示-message","aria-label":'Permalink to "全局提示 Message"'},"​")],-1)),i(F),a[27]||(a[27]=d("",4)),i(g,{ref_key:"message",ref:l,onClick:b,onClose:r},null,512),i(g,{ref_key:"customMessage",ref:y,onClick:b,onClose:r},null,512),i(g,{ref_key:"customThemeMessage",ref:o,style:B(`--message-primary-color: ${E.value};`),onClick:b,onClose:r},null,8,["style"]),a[28]||(a[28]=f("h2",{id:"基本使用",tabindex:"-1"},[t("基本使用 "),f("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1)),i(n,{type:"primary",onClick:a[0]||(a[0]=h=>m("This is a noraml message"))},{default:e(()=>a[12]||(a[12]=[t("Open")])),_:1}),a[29]||(a[29]=d("",2)),i(k,null,{default:e(()=>[i(n,{type:"primary",onClick:a[1]||(a[1]=h=>A("This is an info message"))},{default:e(()=>a[13]||(a[13]=[t("Info")])),_:1}),i(n,{type:"primary",onClick:a[2]||(a[2]=h=>D("This is a success message"))},{default:e(()=>a[14]||(a[14]=[t("Success")])),_:1}),i(n,{type:"primary",onClick:a[3]||(a[3]=h=>q("This is an error message"))},{default:e(()=>a[15]||(a[15]=[t("Error")])),_:1}),i(n,{type:"primary",onClick:a[4]||(a[4]=h=>x("This is a warning message"))},{default:e(()=>a[16]||(a[16]=[t("Warning")])),_:1}),i(n,{type:"primary",onClick:a[5]||(a[5]=h=>T("This is a loading message"))},{default:e(()=>a[17]||(a[17]=[t("Loading")])),_:1})]),_:1}),a[30]||(a[30]=d("",2)),i(k,null,{default:e(()=>[i(n,{type:"primary",onClick:a[6]||(a[6]=h=>S("This is a custom icon message"))},{default:e(()=>a[18]||(a[18]=[t("Custom Info Icon")])),_:1}),i(n,{type:"primary",onClick:a[7]||(a[7]=h=>_("This is a custom icon message"))},{default:e(()=>a[19]||(a[19]=[t("Custom Icon")])),_:1})]),_:1}),a[31]||(a[31]=d("",2)),i(k,{vertical:""},{default:e(()=>[i(k,null,{default:e(()=>[i(n,{type:"primary",onClick:a[8]||(a[8]=h=>M("This is a custom class message"))},{default:e(()=>a[20]||(a[20]=[t("Custom Class")])),_:1}),i(n,{type:"primary",onClick:a[9]||(a[9]=h=>P("This is a custom style message"))},{default:e(()=>a[21]||(a[21]=[t("Custom Style")])),_:1})]),_:1}),i(k,{align:"center"},{default:e(()=>[a[23]||(a[23]=t(" messagePrimaryColor: ")),i($,{style:{width:"200px"},value:E.value,"onUpdate:value":a[10]||(a[10]=h=>E.value=h)},null,8,["value"]),i(n,{style:B(w(E.value)),type:"primary",onClick:a[11]||(a[11]=h=>I("This is a custom theme message"))},{default:e(()=>a[22]||(a[22]=[t("Custom Theme")])),_:1},8,["style"])]),_:1})]),_:1}),a[32]||(a[32]=d("",2)),i(k,null,{default:e(()=>[i(n,{type:"primary",onClick:N},{default:e(()=>a[24]||(a[24]=[t("Custom Close")])),_:1}),i(n,{type:"primary",onClick:V},{default:e(()=>a[25]||(a[25]=[t("Never Auto Close")])),_:1})]),_:1}),a[33]||(a[33]=d("",17))])}}}),Q=U(X,[["__scopeId","data-v-aefc75be"]]);export{H as __pageData,Q as default};
