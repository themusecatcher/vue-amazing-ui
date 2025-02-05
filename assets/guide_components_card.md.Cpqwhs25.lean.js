import{d as B,p as g,C as h,c as A,o as D,j as i,G as t,a5 as n,a as k,w as a}from"./chunks/framework.D_rhKk2H.js";const m={style:{display:"inline-block",background:"#ececec",padding:"30px","border-radius":"8px"}},f={style:{"background-color":"#ececec",padding:"20px","border-radius":"8px"}},_=JSON.parse('{"title":"卡片 Card","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/card.md","filePath":"guide/components/card.md","lastUpdated":1735183791000}'),b={name:"guide/components/card.md"},S=B({...b,setup(q){const y=[{label:"small",value:"small"},{label:"middle",value:"middle"},{label:"large",value:"large"}],o={small:240,middle:300,large:360},p=g("middle"),E=g(!0);return(x,s)=>{const F=h("GlobalElement"),l=h("Card",!0),C=h("Radio"),e=h("Space"),u=h("Switch"),d=h("Col"),c=h("Row");return D(),A("div",null,[s[27]||(s[27]=i("h1",{id:"卡片-card",tabindex:"-1"},[k("卡片 Card "),i("a",{class:"header-anchor",href:"#卡片-card","aria-label":'Permalink to "卡片 Card"'},"​")],-1)),t(F),s[28]||(s[28]=i("p",null,[i("em",null,"通用卡片容器")],-1)),s[29]||(s[29]=i("h2",{id:"何时使用",tabindex:"-1"},[k("何时使用 "),i("a",{class:"header-anchor",href:"#何时使用","aria-label":'Permalink to "何时使用"'},"​")],-1)),s[30]||(s[30]=i("ul",null,[i("li",null,"最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面")],-1)),s[31]||(s[31]=i("h2",{id:"基本使用",tabindex:"-1"},[k("基本使用 "),i("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1)),t(l,{title:"Default size card",width:300},{extra:a(()=>s[2]||(s[2]=[i("a",{href:"#"},"more",-1)])),default:a(()=>[s[3]||(s[3]=i("p",null,"card content",-1)),s[4]||(s[4]=i("p",null,"card content",-1)),s[5]||(s[5]=i("p",null,"card content",-1))]),_:1}),s[32]||(s[32]=n("",2)),i("div",m,[t(l,{title:"Card title",bordered:!1,width:300},{default:a(()=>s[6]||(s[6]=[i("p",null,"Card content",-1),i("p",null,"Card content",-1),i("p",null,"Card content",-1)])),_:1})]),s[33]||(s[33]=n("",2)),t(l,{width:300},{default:a(()=>s[7]||(s[7]=[i("p",null,"Card content",-1),i("p",null,"Card content",-1),i("p",null,"Card content",-1)])),_:1}),s[34]||(s[34]=n("",2)),t(e,{vertical:""},{default:a(()=>[t(C,{options:y,value:p.value,"onUpdate:value":s[0]||(s[0]=r=>p.value=r),button:"","button-style":"solid"},null,8,["value"]),t(l,{size:p.value,title:`${p.value.toUpperCase()} size card`,width:o[p.value]},{extra:a(()=>s[8]||(s[8]=[i("a",{href:"#"},"more",-1)])),default:a(()=>[s[9]||(s[9]=i("p",null,"card content",-1)),s[10]||(s[10]=i("p",null,"card content",-1)),s[11]||(s[11]=i("p",null,"card content",-1))]),_:1},8,["size","title","width"])]),_:1}),s[35]||(s[35]=n("",2)),t(l,{hoverable:"",title:"Card title",width:300},{default:a(()=>s[12]||(s[12]=[i("p",null,"Card content",-1),i("p",null,"Card content",-1),i("p",null,"Card content",-1)])),_:1}),s[36]||(s[36]=n("",2)),t(e,{vertical:""},{default:a(()=>[t(e,{align:"center"},{default:a(()=>[s[13]||(s[13]=k("Loading State:")),t(u,{modelValue:E.value,"onUpdate:modelValue":s[1]||(s[1]=r=>E.value=r)},null,8,["modelValue"])]),_:1}),t(l,{loading:E.value,title:"Card title",width:300},{default:a(()=>s[14]||(s[14]=[i("p",null,"Card content",-1),i("p",null,"Card content",-1),i("p",null,"Card content",-1)])),_:1},8,["loading"])]),_:1}),s[37]||(s[37]=n("",2)),t(l,{title:"Default size card",width:300,headStyle:{fontSize:"18px",color:"#fff",backgroundColor:"#1677ff"},bodyStyle:{fontSize:"16px",color:"#fff",backgroundColor:"#52c41a"}},{extra:a(()=>s[15]||(s[15]=[i("a",{href:"#"},"more",-1)])),default:a(()=>[s[16]||(s[16]=i("p",null,"card content",-1)),s[17]||(s[17]=i("p",null,"card content",-1)),s[18]||(s[18]=i("p",null,"card content",-1))]),_:1}),s[38]||(s[38]=n("",2)),t(l,{title:"Card title",width:360},{default:a(()=>[s[23]||(s[23]=i("p",{style:{"font-size":"14px",color:"rgba(0, 0, 0, 0.85)","margin-bottom":"16px","font-weight":"500"}}," Group title ",-1)),t(l,{title:"Inner card title"},{extra:a(()=>s[19]||(s[19]=[i("a",{href:"#"},"More",-1)])),default:a(()=>[s[20]||(s[20]=k(" Inner Card content "))]),_:1}),t(l,{title:"Inner card title",style:{marginTop:"16px"}},{extra:a(()=>s[21]||(s[21]=[i("a",{href:"#"},"More",-1)])),default:a(()=>[s[22]||(s[22]=k(" Inner Card content "))]),_:1})]),_:1}),s[39]||(s[39]=n("",2)),i("div",f,[t(c,{gutter:16},{default:a(()=>[t(d,{span:8},{default:a(()=>[t(l,{title:"Card title",bordered:!1},{default:a(()=>s[24]||(s[24]=[i("p",null,"card content",-1)])),_:1})]),_:1}),t(d,{span:8},{default:a(()=>[t(l,{title:"Card title",bordered:!1},{default:a(()=>s[25]||(s[25]=[i("p",null,"card content",-1)])),_:1})]),_:1}),t(d,{span:8},{default:a(()=>[t(l,{title:"Card title",bordered:!1},{default:a(()=>s[26]||(s[26]=[i("p",null,"card content",-1)])),_:1})]),_:1})]),_:1})]),s[40]||(s[40]=n("",6))])}}});export{_ as __pageData,S as default};
