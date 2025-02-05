import{d as w,p as r,s as q,C as d,c,o as B,j as i,G as n,a5 as p,a as h,w as t,e as x,t as R}from"./chunks/framework.D_rhKk2H.js";const z={key:0,style:{color:"#ff6900"}},V={key:1,style:{color:"#1677ff"}},I={tabindex:"0"},O={style:{"text-align":"left"}},U={style:{"text-align":"left"}},J=JSON.parse('{"title":"单选框 Radio","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/radio.md","filePath":"guide/components/radio.md","lastUpdated":1736152686000}'),N={name:"guide/components/radio.md"},H=w({...N,setup(G){const e=r([{label:"北京市",value:1},{label:"纽约市",value:2},{label:"布宜诺斯艾利斯",value:3},{label:"伊斯坦布尔",value:4},{label:"拜占庭",value:5},{label:"君士坦丁堡",value:6}]),F=r([{label:"北京市",value:1},{label:"纽约市",value:2,disabled:!0},{label:"布宜诺斯艾利斯",value:3},{label:"伊斯坦布尔",value:4},{label:"拜占庭",value:5},{label:"君士坦丁堡",value:6}]),E=r(!1),l=r(2);q(()=>{console.log("checked",E.value)}),q(()=>{console.log("value",l.value)});const o=r(16),u=r(8);function v(b){console.log("change",b)}const _=[{label:"small",value:"small"},{label:"middle",value:"middle"},{label:"large",value:"large"}],g=r("middle");return(b,s)=>{const S=d("GlobalElement"),k=d("Radio",!0),y=d("Space"),A=d("Slider"),C=d("Flex"),f=d("Col"),T=d("Row"),D=d("Tag");return B(),c("div",null,[s[46]||(s[46]=i("h1",{id:"单选框-radio",tabindex:"-1"},[h("单选框 Radio "),i("a",{class:"header-anchor",href:"#单选框-radio","aria-label":'Permalink to "单选框 Radio"'},"​")],-1)),n(S),s[47]||(s[47]=p("",4)),n(k,{checked:E.value,"onUpdate:checked":s[0]||(s[0]=a=>E.value=a),onChange:v},{default:t(()=>s[21]||(s[21]=[h("Radio")])),_:1},8,["checked"]),s[48]||(s[48]=p("",2)),n(k,{options:e.value,value:l.value,"onUpdate:value":s[1]||(s[1]=a=>l.value=a),onChange:v},null,8,["options","value"]),s[49]||(s[49]=p("",2)),n(y,{vertical:""},{default:t(()=>[n(k,{checked:E.value,"onUpdate:checked":s[2]||(s[2]=a=>E.value=a),button:""},{default:t(()=>s[22]||(s[22]=[h("Radio Button")])),_:1},8,["checked"]),n(k,{options:e.value,value:l.value,"onUpdate:value":s[3]||(s[3]=a=>l.value=a),button:""},null,8,["options","value"])]),_:1}),s[50]||(s[50]=p("",2)),n(y,{vertical:""},{default:t(()=>[n(k,{checked:E.value,"onUpdate:checked":s[4]||(s[4]=a=>E.value=a),button:"","button-style":"solid"},{default:t(()=>s[23]||(s[23]=[h("Radio Button Solid")])),_:1},8,["checked"]),n(k,{options:e.value,value:l.value,"onUpdate:value":s[5]||(s[5]=a=>l.value=a),button:"","button-style":"solid"},null,8,["options","value"])]),_:1}),s[51]||(s[51]=p("",2)),n(y,{vertical:""},{default:t(()=>[n(k,{checked:E.value,"onUpdate:checked":s[6]||(s[6]=a=>E.value=a),disabled:""},{default:t(()=>s[24]||(s[24]=[h("Radio")])),_:1},8,["checked"]),n(k,{options:e.value,value:l.value,"onUpdate:value":s[7]||(s[7]=a=>l.value=a),disabled:""},null,8,["options","value"]),n(k,{options:e.value,value:l.value,"onUpdate:value":s[8]||(s[8]=a=>l.value=a),button:"",disabled:""},null,8,["options","value"])]),_:1}),s[52]||(s[52]=p("",2)),n(y,{vertical:""},{default:t(()=>[n(k,{options:F.value,value:l.value,"onUpdate:value":s[9]||(s[9]=a=>l.value=a)},null,8,["options","value"]),n(k,{options:F.value,value:l.value,"onUpdate:value":s[10]||(s[10]=a=>l.value=a),button:""},null,8,["options","value"]),n(k,{options:F.value,value:l.value,"onUpdate:value":s[11]||(s[11]=a=>l.value=a),button:"","button-style":"solid"},null,8,["options","value"])]),_:1}),s[53]||(s[53]=p("",2)),n(k,{vertical:"",options:e.value,value:l.value,"onUpdate:value":s[12]||(s[12]=a=>l.value=a)},null,8,["options","value"]),s[54]||(s[54]=p("",2)),n(k,{options:e.value,value:l.value,"onUpdate:value":s[13]||(s[13]=a=>l.value=a)},{default:t(({option:a,label:P,index:m})=>[m===1?(B(),c("span",z,R(P),1)):x("",!0),m===3?(B(),c("span",V,R(a.label),1)):x("",!0)]),_:1},8,["options","value"]),s[55]||(s[55]=p("",2)),n(C,{vertical:""},{default:t(()=>[n(T,{gutter:24},{default:t(()=>[n(f,{span:12},{default:t(()=>[n(C,{gap:"small",vertical:""},{default:t(()=>[s[25]||(s[25]=h(" horizontal gap: ")),n(A,{value:o.value,"onUpdate:value":s[14]||(s[14]=a=>o.value=a)},null,8,["value"])]),_:1})]),_:1}),n(f,{span:12},{default:t(()=>[n(C,{gap:"small",vertical:""},{default:t(()=>[s[26]||(s[26]=h(" vertical gap: ")),n(A,{value:u.value,"onUpdate:value":s[15]||(s[15]=a=>u.value=a)},null,8,["value"])]),_:1})]),_:1})]),_:1}),n(k,{gap:[o.value,u.value],options:e.value,value:l.value,"onUpdate:value":s[16]||(s[16]=a=>l.value=a)},null,8,["gap","options","value"])]),_:1}),s[56]||(s[56]=p("",2)),n(y,{vertical:""},{default:t(()=>[n(k,{options:_,value:g.value,"onUpdate:value":s[17]||(s[17]=a=>g.value=a)},null,8,["value"]),n(k,{checked:E.value,"onUpdate:checked":s[18]||(s[18]=a=>E.value=a),button:"","button-size":g.value},{default:t(()=>s[27]||(s[27]=[h("Radio Button")])),_:1},8,["checked","button-size"]),n(k,{options:e.value,value:l.value,"onUpdate:value":s[19]||(s[19]=a=>l.value=a),button:"","button-size":g.value},null,8,["options","value","button-size"]),n(k,{options:e.value,value:l.value,"onUpdate:value":s[20]||(s[20]=a=>l.value=a),button:"","button-style":"solid","button-size":g.value},null,8,["options","value","button-size"])]),_:1}),s[57]||(s[57]=p("",3)),i("table",I,[s[45]||(s[45]=i("thead",null,[i("tr",null,[i("th",{style:{"text-align":"left"}},"参数"),i("th",{style:{"text-align":"left"}},"说明"),i("th",{style:{"text-align":"left"}},"类型"),i("th",{style:{"text-align":"left"}},"默认值")])],-1)),i("tbody",null,[s[38]||(s[38]=i("tr",null,[i("td",{style:{"text-align":"left"}},"options"),i("td",{style:{"text-align":"left"}},"单选框选项数据"),i("td",{style:{"text-align":"left"}},[i("a",{href:"#option-type"},"Option"),h("[]")]),i("td",{style:{"text-align":"left"}},"[]")],-1)),s[39]||(s[39]=i("tr",null,[i("td",{style:{"text-align":"left"}},"disabled"),i("td",{style:{"text-align":"left"}},"是否禁用"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[40]||(s[40]=i("tr",null,[i("td",{style:{"text-align":"left"}},"vertical"),i("td",{style:{"text-align":"left"}},[h("是否垂直排列，仅当 "),i("code",null,"button: false"),h(" 时生效")]),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),i("tr",null,[i("td",O,[s[29]||(s[29]=h("checked ")),n(D,{color:"cyan"},{default:t(()=>s[28]||(s[28]=[h("v-model")])),_:1})]),s[30]||(s[30]=i("td",{style:{"text-align":"left"}},"当前是否选中",-1)),s[31]||(s[31]=i("td",{style:{"text-align":"left"}},"boolean",-1)),s[32]||(s[32]=i("td",{style:{"text-align":"left"}},"false",-1))]),s[41]||(s[41]=i("tr",null,[i("td",{style:{"text-align":"left"}},"gap"),i("td",{style:{"text-align":"left"}},[h("多个单选框之间的间距；垂直排列时为垂直间距，单位 "),i("code",null,"px"),h("；数组间距用于水平排列折行时："),i("code",null,"[水平间距, 垂直间距]"),h("；仅当 "),i("code",null,"button: false"),h(" 时生效")]),i("td",{style:{"text-align":"left"}},"number | number[]"),i("td",{style:{"text-align":"left"}},"8")],-1)),s[42]||(s[42]=i("tr",null,[i("td",{style:{"text-align":"left"}},"button"),i("td",{style:{"text-align":"left"}},"是否启用按钮样式"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[43]||(s[43]=i("tr",null,[i("td",{style:{"text-align":"left"}},"buttonStyle"),i("td",{style:{"text-align":"left"}},"按钮样式风格"),i("td",{style:{"text-align":"left"}},"'outline' | 'solid'"),i("td",{style:{"text-align":"left"}},"'outline'")],-1)),s[44]||(s[44]=i("tr",null,[i("td",{style:{"text-align":"left"}},"buttonSize"),i("td",{style:{"text-align":"left"}},[h("按钮大小；仅当 "),i("code",null,"button: true"),h(" 时生效")]),i("td",{style:{"text-align":"left"}},"'small' | 'middle' | 'large'"),i("td",{style:{"text-align":"left"}},"'middle'")],-1)),i("tr",null,[i("td",U,[s[34]||(s[34]=h("value ")),n(D,{color:"cyan"},{default:t(()=>s[33]||(s[33]=[h("v-model")])),_:1})]),s[35]||(s[35]=i("td",{style:{"text-align":"left"}},"当前选中的值",-1)),s[36]||(s[36]=i("td",{style:{"text-align":"left"}},"string | number | boolean",-1)),s[37]||(s[37]=i("td",{style:{"text-align":"left"}},"undefined",-1))])])]),s[58]||(s[58]=p("",6))])}}});export{J as __pageData,H as default};
