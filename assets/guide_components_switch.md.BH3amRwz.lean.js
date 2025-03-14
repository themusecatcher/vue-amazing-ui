import{d as c,p as v,s as u,C as b,c as g,o as r,j as s,G as t,a5 as k,a as h,w as n,t as y,_ as C}from"./chunks/framework.Bnu6xMP_.js";const B={key:0,xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",viewBox:"0 0 24 24",class:"svg-dark"},m={key:1,xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",viewBox:"0 0 24 24",class:"svg-light"},f={tabindex:"0"},A={style:{"text-align":"left"}},w=JSON.parse('{"title":"开关 Switch","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/switch.md","filePath":"guide/components/switch.md","lastUpdated":1741939962000}'),q={name:"guide/components/switch.md"},D=c({...q,setup(x){const e=v(!0),p=v("no"),E=v(2);return u(()=>{console.log("checked",e.value)}),(S,a)=>{const F=b("GlobalElement"),l=b("Switch",!0),d=b("Space"),o=b("Tag");return r(),g("div",null,[a[35]||(a[35]=s("h1",{id:"开关-switch",tabindex:"-1"},[h("开关 Switch "),s("a",{class:"header-anchor",href:"#开关-switch","aria-label":'Permalink to "开关 Switch"'},"​")],-1)),t(F),a[36]||(a[36]=s("p",null,[s("em",null,"开关选择器")],-1)),a[37]||(a[37]=s("h2",{id:"何时使用",tabindex:"-1"},[h("何时使用 "),s("a",{class:"header-anchor",href:"#何时使用","aria-label":'Permalink to "何时使用"'},"​")],-1)),a[38]||(a[38]=s("ul",null,[s("li",null,"需要表示开关状态/两种状态之间的切换时")],-1)),a[39]||(a[39]=s("h2",{id:"基本使用",tabindex:"-1"},[h("基本使用 "),s("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1)),t(l,{modelValue:e.value,"onUpdate:modelValue":a[0]||(a[0]=i=>e.value=i)},null,8,["modelValue"]),a[40]||(a[40]=k("",2)),t(l,{modelValue:e.value,"onUpdate:modelValue":a[1]||(a[1]=i=>e.value=i),disabled:""},null,8,["modelValue"]),a[41]||(a[41]=k("",2)),t(d,null,{default:n(()=>[t(l,{modelValue:e.value,"onUpdate:modelValue":a[2]||(a[2]=i=>e.value=i),size:"small"},null,8,["modelValue"]),t(l,{modelValue:e.value,"onUpdate:modelValue":a[3]||(a[3]=i=>e.value=i)},null,8,["modelValue"]),t(l,{modelValue:e.value,"onUpdate:modelValue":a[4]||(a[4]=i=>e.value=i),size:"large"},null,8,["modelValue"])]),_:1}),a[42]||(a[42]=k("",2)),t(d,null,{default:n(()=>[t(l,{modelValue:e.value,"onUpdate:modelValue":a[5]||(a[5]=i=>e.value=i),size:"small",loading:""},null,8,["modelValue"]),t(l,{modelValue:e.value,"onUpdate:modelValue":a[6]||(a[6]=i=>e.value=i),loading:""},null,8,["modelValue"]),t(l,{modelValue:e.value,"onUpdate:modelValue":a[7]||(a[7]=i=>e.value=i),size:"large",loading:""},null,8,["modelValue"])]),_:1}),a[43]||(a[43]=k("",2)),t(d,null,{default:n(()=>[t(l,{modelValue:e.value,"onUpdate:modelValue":a[8]||(a[8]=i=>e.value=i),checked:"开",unchecked:"关"},null,8,["modelValue"]),t(l,{modelValue:e.value,"onUpdate:modelValue":a[9]||(a[9]=i=>e.value=i),checked:"1",unchecked:"0"},null,8,["modelValue"]),t(l,{modelValue:e.value,"onUpdate:modelValue":a[10]||(a[10]=i=>e.value=i),checked:"yes",unchecked:"no"},null,8,["modelValue"])]),_:1}),a[44]||(a[44]=k("",2)),t(l,{class:"theme-switch",modelValue:e.value,"onUpdate:modelValue":a[11]||(a[11]=i=>e.value=i),"ripple-color":"#faad14","circle-style":{background:e.value?"#001529":"#fff"}},{node:n(({checked:i})=>[i?(r(),g("svg",B,a[14]||(a[14]=[s("path",{d:"M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"},null,-1)]))):(r(),g("svg",m,a[15]||(a[15]=[s("path",{d:"M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"},null,-1),s("path",{d:"M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"},null,-1),s("path",{d:"M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"},null,-1),s("path",{d:"M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"},null,-1),s("path",{d:"M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"},null,-1),s("path",{d:"M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"},null,-1),s("path",{d:"M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"},null,-1),s("path",{d:"M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"},null,-1),s("path",{d:"M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"},null,-1)])))]),_:1},8,["modelValue","circle-style"]),a[45]||(a[45]=k("",2)),t(d,{gap:"large"},{default:n(()=>[t(d,{vertical:"",align:"center"},{default:n(()=>[t(l,{modelValue:p.value,"onUpdate:modelValue":a[12]||(a[12]=i=>p.value=i),"checked-value":"on","unchecked-value":"off"},{checked:n(()=>a[16]||(a[16]=[h("on")])),unchecked:n(()=>a[17]||(a[17]=[h("off")])),_:1},8,["modelValue"]),h(" Current Value: "+y(p.value),1)]),_:1}),t(d,{vertical:"",align:"center"},{default:n(()=>[t(l,{modelValue:E.value,"onUpdate:modelValue":a[13]||(a[13]=i=>E.value=i),"checked-value":1,"unchecked-value":2},{checked:n(()=>a[18]||(a[18]=[h("yes")])),unchecked:n(()=>a[19]||(a[19]=[h("no")])),_:1},8,["modelValue"]),h(" Current Value: "+y(E.value),1)]),_:1})]),_:1}),a[46]||(a[46]=k("",3)),s("table",f,[a[34]||(a[34]=s("thead",null,[s("tr",null,[s("th",{style:{"text-align":"left"}},"参数"),s("th",{style:{"text-align":"left"}},"说明"),s("th",{style:{"text-align":"left"}},"类型"),s("th",{style:{"text-align":"left"}},"默认值")])],-1)),s("tbody",null,[a[25]||(a[25]=s("tr",null,[s("td",{style:{"text-align":"left"}},"checked"),s("td",{style:{"text-align":"left"}},"选中时的内容"),s("td",{style:{"text-align":"left"}},"string | slot"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[26]||(a[26]=s("tr",null,[s("td",{style:{"text-align":"left"}},"checkedValue"),s("td",{style:{"text-align":"left"}},"选中时的值"),s("td",{style:{"text-align":"left"}},"boolean | string | number"),s("td",{style:{"text-align":"left"}},"true")],-1)),a[27]||(a[27]=s("tr",null,[s("td",{style:{"text-align":"left"}},"unchecked"),s("td",{style:{"text-align":"left"}},"未选中时的内容"),s("td",{style:{"text-align":"left"}},"string | slot"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[28]||(a[28]=s("tr",null,[s("td",{style:{"text-align":"left"}},"uncheckedValue"),s("td",{style:{"text-align":"left"}},"未选中时的值"),s("td",{style:{"text-align":"left"}},"boolean | string | number"),s("td",{style:{"text-align":"left"}},"false")],-1)),a[29]||(a[29]=s("tr",null,[s("td",{style:{"text-align":"left"}},"loading"),s("td",{style:{"text-align":"left"}},"是否加载中"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"false")],-1)),a[30]||(a[30]=s("tr",null,[s("td",{style:{"text-align":"left"}},"disabled"),s("td",{style:{"text-align":"left"}},"是否禁用"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"false")],-1)),a[31]||(a[31]=s("tr",null,[s("td",{style:{"text-align":"left"}},"size"),s("td",{style:{"text-align":"left"}},"开关大小"),s("td",{style:{"text-align":"left"}},"'small' | 'middle' | 'large'"),s("td",{style:{"text-align":"left"}},"'middle'")],-1)),a[32]||(a[32]=s("tr",null,[s("td",{style:{"text-align":"left"}},"rippleColor"),s("td",{style:{"text-align":"left"}},"点击时的波纹颜色，当自定义选中颜色时需要设置"),s("td",{style:{"text-align":"left"}},"string"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[33]||(a[33]=s("tr",null,[s("td",{style:{"text-align":"left"}},"circleStyle"),s("td",{style:{"text-align":"left"}},"圆点样式"),s("td",{style:{"text-align":"left"}},[s("a",{href:"https://cn.vuejs.org/api/utility-types.html#cssproperties",target:"_blank",rel:"noreferrer"},"CSSProperties")]),s("td",{style:{"text-align":"left"}},"{}")],-1)),s("tr",null,[s("td",A,[a[21]||(a[21]=h("modelValue ")),t(o,{color:"cyan"},{default:n(()=>a[20]||(a[20]=[h("v-model")])),_:1})]),a[22]||(a[22]=s("td",{style:{"text-align":"left"}},"指定当前是否选中",-1)),a[23]||(a[23]=s("td",{style:{"text-align":"left"}},"boolean | string | number",-1)),a[24]||(a[24]=s("td",{style:{"text-align":"left"}},"false",-1))])])]),a[47]||(a[47]=k("",4))])}}}),T=C(D,[["__scopeId","data-v-be79e7b2"]]);export{w as __pageData,T as default};
