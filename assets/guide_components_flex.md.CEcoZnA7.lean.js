import{d as S,p as h,C as e,c,o as g,j as E,G as i,a5 as r,a as l,w as a,F as f,B as v,N as m,b as P,e as z}from"./chunks/framework.D_rhKk2H.js";const N=JSON.parse('{"title":"弹性布局 Flex","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/flex.md","filePath":"guide/components/flex.md","lastUpdated":1735198214000}'),T={name:"guide/components/flex.md"},O=S({...T,setup(w){const b=h([{label:"horizontal",value:"horizontal"},{label:"vertical",value:"vertical"}]),y=h("horizontal"),x={width:"25%",height:"54px"},C=h([{label:"flex-start",value:"flex-start"},{label:"center",value:"center"},{label:"flex-end",value:"flex-end"},{label:"space-between",value:"space-between"},{label:"space-around",value:"space-around"},{label:"space-evenly",value:"space-evenly"}]),B=h([{label:"flex-start",value:"flex-start"},{label:"center",value:"center"},{label:"flex-end",value:"flex-end"}]),F=h(C.value[0].value),o=h(B.value[0].value),A={width:"100%",height:"120px",borderRadius:"6px",border:"1px solid #40a9ff"},D=h([{label:"small",value:"small"},{label:"middle",value:"middle"},{label:"large",value:"large"},{label:"customize",value:"customize"}]),p=h("middle"),u=h(16);return(j,s)=>{const q=e("GlobalElement"),d=e("Radio"),k=e("Flex",!0),n=e("Button"),_=e("Slider");return g(),c("div",null,[s[16]||(s[16]=E("h1",{id:"弹性布局-flex",tabindex:"-1"},[l("弹性布局 Flex "),E("a",{class:"header-anchor",href:"#弹性布局-flex","aria-label":'Permalink to "弹性布局 Flex"'},"​")],-1)),i(q),s[17]||(s[17]=r("",4)),i(k,{vertical:""},{default:a(()=>[i(d,{options:b.value,value:y.value,"onUpdate:value":s[0]||(s[0]=t=>y.value=t)},null,8,["options","value"]),i(k,{vertical:y.value==="vertical"},{default:a(()=>[(g(),c(f,null,v(4,t=>E("div",{key:t,style:m({...x,background:`${t%2?"#1677ffbf":"#1677ff"}`})},null,4)),64))]),_:1},8,["vertical"])]),_:1}),s[18]||(s[18]=r("",2)),i(k,{align:"start",vertical:""},{default:a(()=>[s[9]||(s[9]=E("p",null,"Select justify :",-1)),i(d,{value:F.value,"onUpdate:value":s[1]||(s[1]=t=>F.value=t),button:"",options:C.value},null,8,["value","options"]),s[10]||(s[10]=E("p",null,"Select align :",-1)),i(d,{value:o.value,"onUpdate:value":s[2]||(s[2]=t=>o.value=t),button:"",options:B.value},null,8,["value","options"]),i(k,{style:m({...A}),justify:F.value,align:o.value},{default:a(()=>[i(n,{type:"primary"},{default:a(()=>s[5]||(s[5]=[l("Primary")])),_:1}),i(n,{type:"primary"},{default:a(()=>s[6]||(s[6]=[l("Primary")])),_:1}),i(n,{type:"primary"},{default:a(()=>s[7]||(s[7]=[l("Primary")])),_:1}),i(n,{type:"primary"},{default:a(()=>s[8]||(s[8]=[l("Primary")])),_:1})]),_:1},8,["style","justify","align"])]),_:1}),s[19]||(s[19]=r("",2)),i(k,{vertical:""},{default:a(()=>[i(d,{options:D.value,value:p.value,"onUpdate:value":s[3]||(s[3]=t=>p.value=t)},null,8,["options","value"]),p.value==="customize"?(g(),P(_,{key:0,value:u.value,"onUpdate:value":s[4]||(s[4]=t=>u.value=t)},null,8,["value"])):z("",!0),i(k,{gap:p.value!=="customize"?p.value:u.value},{default:a(()=>[i(n,{type:"primary"},{default:a(()=>s[11]||(s[11]=[l("Primary")])),_:1}),i(n,null,{default:a(()=>s[12]||(s[12]=[l("Default")])),_:1}),i(n,{type:"dashed"},{default:a(()=>s[13]||(s[13]=[l("Dashed")])),_:1}),i(n,{type:"link"},{default:a(()=>s[14]||(s[14]=[l("Link")])),_:1})]),_:1},8,["gap"])]),_:1}),s[20]||(s[20]=r("",2)),i(k,{wrap:"wrap",width:600,gap:[8,16]},{default:a(()=>[(g(),c(f,null,v(16,t=>i(n,{key:t,type:"primary"},{default:a(()=>s[15]||(s[15]=[l("Button")])),_:2},1024)),64))]),_:1}),s[21]||(s[21]=r("",7))])}}});export{N as __pageData,O as default};
