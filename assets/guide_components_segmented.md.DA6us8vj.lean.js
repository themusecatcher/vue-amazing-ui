import{U}from"./chunks/theme.CXYGFNtC.js";import{d as W,a4 as r,p as e,C as g,c as N,o,j as i,G as t,a5 as E,a as k,w as n,b as c,N as S,t as y,H as z}from"./chunks/framework.D_rhKk2H.js";const Q={style:{padding:"4px"}},w={style:{padding:"4px 4px"}},Y={tabindex:"0"},L={style:{"text-align":"left"}},K=JSON.parse('{"title":"分段控制器 Segmented","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/segmented.md","filePath":"guide/components/segmented.md","lastUpdated":1737444139000}'),J={name:"guide/components/segmented.md"},H=W({...J,setup(R){const d=r(["Daily","Weekly","Monthly","Quarterly","Yearly"]),T=r(["Daily","Weekly","Monthly","Quarterly","Yearly","Long Text Long Text Long Text"]),_=r(["Daily",{label:"Weekly",value:"Weekly",disabled:!0},"Monthly",{label:"Quarterly",value:"Quarterly",disabled:!0},"Yearly"]),l=e(d[0]),B=e("Daily"),P=q=>{console.log("change",q)},u=r(["Daily","Weekly","Monthly"]),m=e(u[0]),C=e(!1),v=e(!1),O=()=>{C.value=!0,setTimeout(()=>{u.push("Quarterly","Yearly"),C.value=!1,v.value=!0},1e3)},A=r([{label:"user1",value:"user1",payload:{src:"https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg",style:{backgroundColor:"#f56a00"}}},{label:"user2",value:"user2",payload:{style:{backgroundColor:"#f56a00"},content:"K"}},{label:"user3",value:"user3",payload:{icon:U,style:{backgroundColor:"#f56a00"}}}]),D=e(A[0].value),b=r([{value:"spring",payload:{title:"Spring",subTitle:"Jan-Mar"}},{value:"summer",payload:{title:"Summer",subTitle:"Apr-Jun"}},{value:"autumn",payload:{title:"Autumn",subTitle:"Jul-Sept"}},{value:"winter",payload:{title:"Winter",subTitle:"Oct-Dec"}}]),f=e(b[0].value);return(q,s)=>{const V=g("GlobalElement"),h=g("Segmented",!0),F=g("Space"),M=g("Button"),x=g("Avatar"),I=g("Tag");return o(),N("div",null,[s[21]||(s[21]=i("h1",{id:"分段控制器-segmented",tabindex:"-1"},[k("分段控制器 Segmented "),i("a",{class:"header-anchor",href:"#分段控制器-segmented","aria-label":'Permalink to "分段控制器 Segmented"'},"​")],-1)),t(V),s[22]||(s[22]=i("p",null,[i("em",null,"分段控制器")],-1)),s[23]||(s[23]=i("h2",{id:"何时使用",tabindex:"-1"},[k("何时使用 "),i("a",{class:"header-anchor",href:"#何时使用","aria-label":'Permalink to "何时使用"'},"​")],-1)),s[24]||(s[24]=i("ul",null,[i("li",null,"用于展示多个选项并允许用户选择其中单个选项"),i("li",null,"当切换选中选项时，关联区域的内容会发生变化")],-1)),s[25]||(s[25]=i("h2",{id:"基本使用",tabindex:"-1"},[k("基本使用 "),i("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1)),t(h,{value:l.value,"onUpdate:value":s[0]||(s[0]=a=>l.value=a),options:d,onChange:P},null,8,["value","options"]),s[26]||(s[26]=E("",2)),t(F,{vertical:""},{default:n(()=>[t(h,{value:l.value,"onUpdate:value":s[1]||(s[1]=a=>l.value=a),disabled:"",options:d},null,8,["value","options"]),t(h,{value:B.value,"onUpdate:value":s[2]||(s[2]=a=>B.value=a),options:_},null,8,["value","options"])]),_:1}),s[27]||(s[27]=E("",2)),t(F,{vertical:""},{default:n(()=>[t(h,{value:m.value,"onUpdate:value":s[3]||(s[3]=a=>m.value=a),options:u},null,8,["value","options"]),t(M,{type:"primary",loading:C.value,disabled:v.value,onClick:O},{default:n(()=>s[10]||(s[10]=[k("Load More")])),_:1},8,["loading","disabled"])]),_:1}),s[28]||(s[28]=E("",2)),t(h,{value:l.value,"onUpdate:value":s[4]||(s[4]=a=>l.value=a),block:"",options:T},null,8,["value","options"]),s[29]||(s[29]=E("",2)),t(F,{vertical:""},{default:n(()=>[t(h,{value:D.value,"onUpdate:value":s[5]||(s[5]=a=>D.value=a),options:A},{label:n(({label:a,payload:p={}})=>[i("div",Q,[p.icon?(o(),c(x,{key:0,style:S(p.style)},{icon:n(()=>[(o(),c(z(p.icon)))]),default:n(()=>[k(" "+y(p.content),1)]),_:2},1032,["style"])):(o(),c(x,{key:1,src:p.src,style:S(p.style)},{default:n(()=>[k(y(p.content),1)]),_:2},1032,["src","style"])),i("div",null,y(a),1)])]),_:1},8,["value","options"]),t(h,{value:f.value,"onUpdate:value":s[6]||(s[6]=a=>f.value=a),options:b},{label:n(({payload:a})=>[i("div",w,[i("div",null,y(a.title),1),i("div",null,y(a.subTitle),1)])]),_:1},8,["value","options"])]),_:1}),s[30]||(s[30]=E("",2)),t(F,{vertical:""},{default:n(()=>[t(h,{value:l.value,"onUpdate:value":s[7]||(s[7]=a=>l.value=a),options:d,size:"large"},null,8,["value","options"]),t(h,{value:l.value,"onUpdate:value":s[8]||(s[8]=a=>l.value=a),options:d},null,8,["value","options"]),t(h,{value:l.value,"onUpdate:value":s[9]||(s[9]=a=>l.value=a),options:d,size:"small"},null,8,["value","options"])]),_:1}),s[31]||(s[31]=E("",3)),i("table",Y,[s[20]||(s[20]=i("thead",null,[i("tr",null,[i("th",{style:{"text-align":"left"}},"参数"),i("th",{style:{"text-align":"left"}},"说明"),i("th",{style:{"text-align":"left"}},"类型"),i("th",{style:{"text-align":"left"}},"默认值")])],-1)),i("tbody",null,[s[16]||(s[16]=i("tr",null,[i("td",{style:{"text-align":"left"}},"block"),i("td",{style:{"text-align":"left"}},"是否将宽度调整为父元素宽度，同时所有选项占据相同的宽度"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[17]||(s[17]=i("tr",null,[i("td",{style:{"text-align":"left"}},"disabled"),i("td",{style:{"text-align":"left"}},"是否禁用"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[18]||(s[18]=i("tr",null,[i("td",{style:{"text-align":"left"}},"options"),i("td",{style:{"text-align":"left"}},"选项数据"),i("td",{style:{"text-align":"left"}},[k("string[] | number[] | "),i("a",{href:"#option-type"},"Option"),k("[]")]),i("td",{style:{"text-align":"left"}},"[]")],-1)),s[19]||(s[19]=i("tr",null,[i("td",{style:{"text-align":"left"}},"size"),i("td",{style:{"text-align":"left"}},"控件尺寸"),i("td",{style:{"text-align":"left"}},"'small' | 'middle' | 'large'"),i("td",{style:{"text-align":"left"}},"'middle'")],-1)),i("tr",null,[i("td",L,[s[12]||(s[12]=k("value ")),t(I,{color:"cyan"},{default:n(()=>s[11]||(s[11]=[k("v-model")])),_:1})]),s[13]||(s[13]=i("td",{style:{"text-align":"left"}},"当前选中的值",-1)),s[14]||(s[14]=i("td",{style:{"text-align":"left"}},"string | number",-1)),s[15]||(s[15]=i("td",{style:{"text-align":"left"}},"undefined",-1))])])]),s[32]||(s[32]=E("",6))])}}});export{K as __pageData,H as default};
