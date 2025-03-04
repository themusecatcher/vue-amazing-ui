import{g as $}from"./chunks/generate.xgcBSttL.js";import{N as c,K as u}from"./chunks/theme.DBz6r7pF.js";import{d as V,p as r,C as p,c as O,o as L,j as v,G as s,a5 as d,a as n,N as C,w as t,a2 as b,_ as W}from"./chunks/framework.D9rtbYX4.js";const J=JSON.parse('{"title":"通知提醒 Notification","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/notification.md","filePath":"guide/components/notification.md","lastUpdated":1741052315000}'),M={name:"guide/components/notification.md"},U=V({...M,setup(G){const h=r(),g=r(),e=r("#ff6900");function B(i){h.value.open({title:"Notification Title",description:i})}function m(i){h.value.info({title:"Notification Title",description:i})}function A(i){h.value.success({title:"Notification Title",description:i})}function D(i){h.value.warning({title:"Notification Title",description:i})}function q(i){h.value.error({title:"Notification Title",description:i})}function x(i){h.value.info({title:"Notification Title",icon:b(c),description:i})}function T(i){h.value.open({title:"Notification Title",icon:b(u,{style:"color: gold"}),description:i})}function N(i){h.value.open({title:"Notification Title",description:i,icon:b(u),class:"custom-class"})}function S(i){h.value.open({title:"Notification Title",description:i,icon:b(c),style:{width:"500px",color:"#ff6900"}})}function _(i){const a=$(i);return{"--button-primary-color":i,"--button-primary-color-hover":a[4],"--button-primary-color-active":a[6]}}function P(i){g.value.info({title:"Notification Title",description:i})}function E(i){h.value.info({title:"Notification Title",description:"This is the content of the notification.",placement:i})}function w(){h.value.info({title:"Notification Title",description:"The notification will automatically turn off after 3 seconds.",duration:3e3,onClose:()=>{console.log("custom notification closed")}})}function I(){h.value.info({title:"Notification Title",description:"This notification will not automatically turn off.",duration:null})}function y(){console.log("notification closed")}return(i,a)=>{const o=p("GlobalElement"),F=p("Notification",!0),l=p("Button"),k=p("Space"),R=p("ColorPicker");return L(),O("div",null,[a[32]||(a[32]=v("h1",{id:"通知提醒-notification",tabindex:"-1"},[n("通知提醒 Notification "),v("a",{class:"header-anchor",href:"#通知提醒-notification","aria-label":'Permalink to "通知提醒 Notification"'},"​")],-1)),s(o),a[33]||(a[33]=d("",4)),s(F,{ref_key:"notification",ref:h,onClose:y},null,512),s(F,{ref_key:"customNotification",ref:g,style:C(`--notification-primary-color: ${e.value};`),onClose:y},null,8,["style"]),a[34]||(a[34]=v("h2",{id:"基本使用",tabindex:"-1"},[n("基本使用 "),v("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1)),s(l,{type:"primary",onClick:a[0]||(a[0]=f=>B("This is a normal notification"))},{default:t(()=>a[15]||(a[15]=[n("Open")])),_:1}),a[35]||(a[35]=d("",2)),s(k,null,{default:t(()=>[s(l,{type:"primary",onClick:a[1]||(a[1]=f=>m("This is a normal notification"))},{default:t(()=>a[16]||(a[16]=[n("Info")])),_:1}),s(l,{type:"primary",onClick:a[2]||(a[2]=f=>A("This is a success notification"))},{default:t(()=>a[17]||(a[17]=[n("Success")])),_:1}),s(l,{type:"primary",onClick:a[3]||(a[3]=f=>D("This is a warning notification"))},{default:t(()=>a[18]||(a[18]=[n("Warning")])),_:1}),s(l,{type:"primary",onClick:a[4]||(a[4]=f=>q("This is a error notification"))},{default:t(()=>a[19]||(a[19]=[n("Error")])),_:1})]),_:1}),a[36]||(a[36]=d("",2)),s(k,null,{default:t(()=>[s(l,{type:"primary",onClick:a[5]||(a[5]=f=>x("This is a custom icon notification"))},{default:t(()=>a[20]||(a[20]=[n("Custom Info Icon")])),_:1}),s(l,{type:"primary",onClick:a[6]||(a[6]=f=>T("This is a custom icon notification"))},{default:t(()=>a[21]||(a[21]=[n("Custom Icon")])),_:1})]),_:1}),a[37]||(a[37]=d("",2)),s(k,{vertical:""},{default:t(()=>[s(k,null,{default:t(()=>[s(l,{type:"primary",onClick:a[7]||(a[7]=f=>N("This is a custom class notification"))},{default:t(()=>a[22]||(a[22]=[n("Custom Class")])),_:1}),s(l,{type:"primary",onClick:a[8]||(a[8]=f=>S("This is a custom style notification"))},{default:t(()=>a[23]||(a[23]=[n("Custom Style")])),_:1})]),_:1}),s(k,{align:"center"},{default:t(()=>[a[25]||(a[25]=n(" notificationPrimaryColor: ")),s(R,{style:{width:"200px"},value:e.value,"onUpdate:value":a[9]||(a[9]=f=>e.value=f)},null,8,["value"]),s(l,{style:C(_(e.value)),type:"primary",onClick:a[10]||(a[10]=f=>P("This is a custom theme notification"))},{default:t(()=>a[24]||(a[24]=[n(" Custom Theme ")])),_:1},8,["style"])]),_:1})]),_:1}),a[38]||(a[38]=d("",2)),s(k,null,{default:t(()=>[s(l,{type:"primary",onClick:a[11]||(a[11]=f=>E("topLeft"))},{default:t(()=>a[26]||(a[26]=[n("topLeft")])),_:1}),s(l,{type:"primary",onClick:a[12]||(a[12]=f=>E("topRight"))},{default:t(()=>a[27]||(a[27]=[n("topRight")])),_:1}),s(l,{type:"primary",onClick:a[13]||(a[13]=f=>E("bottomLeft"))},{default:t(()=>a[28]||(a[28]=[n("bottomLeft")])),_:1}),s(l,{type:"primary",onClick:a[14]||(a[14]=f=>E("bottomRight"))},{default:t(()=>a[29]||(a[29]=[n("bottomRight")])),_:1})]),_:1}),a[39]||(a[39]=d("",2)),s(k,null,{default:t(()=>[s(l,{type:"primary",onClick:w},{default:t(()=>a[30]||(a[30]=[n("Custom Close")])),_:1}),s(l,{type:"primary",onClick:I},{default:t(()=>a[31]||(a[31]=[n("Never Auto Close")])),_:1})]),_:1}),a[40]||(a[40]=d("",17))])}}}),K=W(U,[["__scopeId","data-v-b72f7afa"]]);export{J as __pageData,K as default};
