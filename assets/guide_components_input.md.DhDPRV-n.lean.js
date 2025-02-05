import{I as C,U as c,z as q,B as x,E as b}from"./chunks/theme.CXYGFNtC.js";import{d as _,p as F,s as B,C as E,c as T,o as S,j as i,G as a,a5 as k,a as g,w as n,k as e}from"./chunks/framework.D_rhKk2H.js";const w={tabindex:"0"},I={style:{"text-align":"left"}},U=JSON.parse('{"title":"输入框 Input","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/input.md","filePath":"guide/components/input.md","lastUpdated":1736846127000}'),P={name:"guide/components/input.md"},N=_({...P,setup(z){const l=F(""),y=F(""),v=[{label:"small",value:"small"},{label:"middle",value:"middle"},{label:"large",value:"large"}],d=F("middle");B(()=>{console.log("value",l.value)}),B(()=>{console.log("lazyValue",y.value)});function o(r){console.log("change",r)}function u(r){console.log("enter",r)}return(r,s)=>{const f=E("GlobalElement"),h=E("Input",!0),p=E("Space"),m=E("Tooltip"),A=E("Radio"),D=E("Tag");return S(),T("div",null,[s[33]||(s[33]=i("h1",{id:"输入框-input",tabindex:"-1"},[g("输入框 Input "),i("a",{class:"header-anchor",href:"#输入框-input","aria-label":'Permalink to "输入框 Input"'},"​")],-1)),a(f),s[34]||(s[34]=k("",5)),a(p,{gap:"small",vertical:"",width:200},{default:n(()=>[a(h,{value:l.value,"onUpdate:value":s[0]||(s[0]=t=>l.value=t),placeholder:"Basic usage",onChange:o,onEnter:u},null,8,["value"]),a(h,{value:y.value,"onUpdate:value":s[1]||(s[1]=t=>y.value=t),valueModifiers:{lazy:!0},placeholder:"Lazy usage",onChange:o,onEnter:u},null,8,["value"])]),_:1}),s[35]||(s[35]=k("",2)),a(p,{gap:"small",vertical:"",width:300},{default:n(()=>[a(h,{value:l.value,"onUpdate:value":s[2]||(s[2]=t=>l.value=t),placeholder:"Basic usage",prefix:"￥",suffix:"RMB"},null,8,["value"]),a(h,{value:l.value,"onUpdate:value":s[3]||(s[3]=t=>l.value=t),placeholder:"Basic usage"},{prefix:n(()=>[a(e(c))]),suffix:n(()=>[a(m,{"max-width":150,tooltip:"Extra information"},{default:n(()=>[a(e(C))]),_:1})]),_:1},8,["value"])]),_:1}),s[36]||(s[36]=k("",2)),a(p,{gap:"small",vertical:"",width:300},{default:n(()=>[a(h,{value:l.value,"onUpdate:value":s[4]||(s[4]=t=>l.value=t),placeholder:"Basic usage","addon-before":"Http://","addon-after":".com"},null,8,["value"]),a(h,{value:l.value,"onUpdate:value":s[5]||(s[5]=t=>l.value=t),placeholder:"Basic usage"},{addonAfter:n(()=>[a(e(q))]),_:1},8,["value"])]),_:1}),s[37]||(s[37]=k("",2)),a(p,{gap:"small",vertical:"",width:300},{default:n(()=>[a(A,{options:v,value:d.value,"onUpdate:value":s[6]||(s[6]=t=>d.value=t),button:"","button-style":"solid"},null,8,["value"]),a(h,{value:l.value,"onUpdate:value":s[7]||(s[7]=t=>l.value=t),size:d.value,placeholder:"Basic usage"},null,8,["value","size"]),a(h,{value:l.value,"onUpdate:value":s[8]||(s[8]=t=>l.value=t),size:d.value,placeholder:"Basic usage"},{prefix:n(()=>[a(e(c))]),suffix:n(()=>[a(e(C))]),_:1},8,["value","size"]),a(h,{value:l.value,"onUpdate:value":s[9]||(s[9]=t=>l.value=t),size:d.value,placeholder:"Basic usage"},{addonBefore:n(()=>[a(e(b))]),addonAfter:n(()=>[a(e(x))]),_:1},8,["value","size"])]),_:1}),s[38]||(s[38]=k("",2)),a(p,null,{default:n(()=>[a(h,{"allow-clear":"",value:l.value,"onUpdate:value":s[10]||(s[10]=t=>l.value=t),placeholder:"input with clear icon"},null,8,["value"])]),_:1}),s[39]||(s[39]=k("",2)),a(p,null,{default:n(()=>[a(h,{password:"",value:l.value,"onUpdate:value":s[11]||(s[11]=t=>l.value=t),placeholder:"input password"},null,8,["value"])]),_:1}),s[40]||(s[40]=k("",2)),a(p,{vertical:""},{default:n(()=>[a(h,{"show-count":"","allow-clear":"",value:l.value,"onUpdate:value":s[12]||(s[12]=t=>l.value=t),placeholder:"please input"},null,8,["value"]),a(h,{"show-count":"","allow-clear":"",value:l.value,"onUpdate:value":s[13]||(s[13]=t=>l.value=t),maxlength:20,placeholder:"please input"},null,8,["value"])]),_:1}),s[41]||(s[41]=k("",2)),a(h,{disabled:"",value:l.value,"onUpdate:value":s[14]||(s[14]=t=>l.value=t),placeholder:"disabled input"},null,8,["value"]),s[42]||(s[42]=k("",3)),i("table",w,[s[32]||(s[32]=i("thead",null,[i("tr",null,[i("th",{style:{"text-align":"left"}},"参数"),i("th",{style:{"text-align":"left"}},"说明"),i("th",{style:{"text-align":"left"}},"类型"),i("th",{style:{"text-align":"left"}},"默认值")])],-1)),i("tbody",null,[s[20]||(s[20]=i("tr",null,[i("td",{style:{"text-align":"left"}},"width"),i("td",{style:{"text-align":"left"}},[g("输入框宽度，单位 "),i("code",null,"px")]),i("td",{style:{"text-align":"left"}},"string | number"),i("td",{style:{"text-align":"left"}},"'100%'")],-1)),s[21]||(s[21]=i("tr",null,[i("td",{style:{"text-align":"left"}},"size"),i("td",{style:{"text-align":"left"}},"输入框大小"),i("td",{style:{"text-align":"left"}},"'small' | 'middle' | 'large'"),i("td",{style:{"text-align":"left"}},"'middle'")],-1)),s[22]||(s[22]=i("tr",null,[i("td",{style:{"text-align":"left"}},"addonBefore"),i("td",{style:{"text-align":"left"}},"设置前置标签"),i("td",{style:{"text-align":"left"}},"string | slot"),i("td",{style:{"text-align":"left"}},"undefined")],-1)),s[23]||(s[23]=i("tr",null,[i("td",{style:{"text-align":"left"}},"addonAfter"),i("td",{style:{"text-align":"left"}},"设置后置标签"),i("td",{style:{"text-align":"left"}},"string | slot"),i("td",{style:{"text-align":"left"}},"undefined")],-1)),s[24]||(s[24]=i("tr",null,[i("td",{style:{"text-align":"left"}},"prefix"),i("td",{style:{"text-align":"left"}},"前缀图标"),i("td",{style:{"text-align":"left"}},"string | slot"),i("td",{style:{"text-align":"left"}},"undefined")],-1)),s[25]||(s[25]=i("tr",null,[i("td",{style:{"text-align":"left"}},"suffix"),i("td",{style:{"text-align":"left"}},"后缀图标"),i("td",{style:{"text-align":"left"}},"string | slot"),i("td",{style:{"text-align":"left"}},"undefined")],-1)),s[26]||(s[26]=i("tr",null,[i("td",{style:{"text-align":"left"}},"allowClear"),i("td",{style:{"text-align":"left"}},"可以点击清除图标删除内容"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[27]||(s[27]=i("tr",null,[i("td",{style:{"text-align":"left"}},"password"),i("td",{style:{"text-align":"left"}},"是否启用密码框"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[28]||(s[28]=i("tr",null,[i("td",{style:{"text-align":"left"}},"disabled"),i("td",{style:{"text-align":"left"}},"是否禁用"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[29]||(s[29]=i("tr",null,[i("td",{style:{"text-align":"left"}},"placeholder"),i("td",{style:{"text-align":"left"}},"文本输入的占位符"),i("td",{style:{"text-align":"left"}},"string"),i("td",{style:{"text-align":"left"}},"undefined")],-1)),s[30]||(s[30]=i("tr",null,[i("td",{style:{"text-align":"left"}},"maxlength"),i("td",{style:{"text-align":"left"}},"最大长度"),i("td",{style:{"text-align":"left"}},"number"),i("td",{style:{"text-align":"left"}},"undefined")],-1)),s[31]||(s[31]=i("tr",null,[i("td",{style:{"text-align":"left"}},"showCount"),i("td",{style:{"text-align":"left"}},"是否展示字数"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),i("tr",null,[i("td",I,[s[16]||(s[16]=g("value ")),a(D,{color:"cyan"},{default:n(()=>s[15]||(s[15]=[g("v-model")])),_:1})]),s[17]||(s[17]=i("td",{style:{"text-align":"left"}},"输入框内容",-1)),s[18]||(s[18]=i("td",{style:{"text-align":"left"}},"string",-1)),s[19]||(s[19]=i("td",{style:{"text-align":"left"}},"undefined",-1))])])]),s[43]||(s[43]=k("",4))])}}});export{U as __pageData,N as default};
