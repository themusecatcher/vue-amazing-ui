import{N as K}from"./chunks/theme.CSQ_AuuV.js";import{d as rs,p as h,a2 as gs,s as n,C as o,c as r,o as e,j as i,G as l,a5 as g,a as k,w as p,t as d,F as u,b as is,k as as}from"./chunks/framework.BVN1edjA.js";const ds={key:0},ys={key:0},Fs={key:0},os={key:0},us={tabindex:"0"},Cs={style:{"text-align":"left"}},Ds=JSON.parse('{"title":"滑动输入条 Slider","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/slider.md","filePath":"guide/components/slider.md","lastUpdated":1742200388000}'),Bs={name:"guide/components/slider.md"},As=rs({...Bs,setup(cs){const v=h(20),D=h([20,80]),L=h(20),Q=h([20,80]),A=h(0),f=h([-5,5]),b=h(30),q=h([30,60]),S=h(37),V=h(37),x=h(37),T=h([20,65]),_=h([30,60]),w=h([26,37]),P=h(37),U=h([20,80]),I=h(37),N=h([20,65]),R=h([30,60]),O=h([26,37]),F=h({0:"0°C",26:"26°C",37:"37°C",100:{style:{color:"#f50"},label:"100°C"}}),X=h({0:"0°C",26:"26°C",37:"37°C",100:{style:{color:"#f50",fontWeight:"bold"},label:gs(K)}}),C=h(20),B=h(.5),M=h(20),W=h([20,80]),j=h(20),G=h([20,80]),z=h(20),H=h([20,80]),$=h(20),J=h([20,80]),ls={"--slider-track-color":"#ffbb96","--slider-track-color-hover":"#d4380d","--slider-handle-color":"#fff2e8","--slider-handle-shadow-color":"#ffbb96","--slider-handle-shadow-color-hover-focus":"#d4380d","--slider-tooltip-color":"rgba(0, 0, 0, 0.88)","--slider-tooltip-bg-color":"#fff"},ks={"--slider-rail-color":"rgb(219, 219, 223)","--slider-rail-color-hover":"rgb(199, 199, 203)","--slider-track-color":"#ffbb96","--slider-track-color-hover":"#d4380d","--slider-handle-color":"#fff2e8","--slider-handle-shadow-color":"#ffbb96","--slider-handle-shadow-color-hover-focus":"#d4380d","--slider-dot-border-color":"rgb(219, 219, 223)","--slider-dot-border-color-hover":"rgb(199, 199, 203)","--slider-dot-color-active":"#ffbb96","--slider-tooltip-color":"rgba(0, 0, 0, 0.88)","--slider-tooltip-bg-color":"#fff"},hs={top:"-40px",fontSize:"16px",fontWeight:500,lineHeight:1.5,height:"40px",padding:"8px 12px",borderRadius:"8px"};n(()=>{console.log("singleValue",v.value)}),n(()=>{console.log("doubleValue",D.value)}),n(()=>{console.log("customScaleSingleValue",A.value)}),n(()=>{console.log("customScaleDoubleValue",f.value)}),n(()=>{console.log("customStepSingleValue",b.value)}),n(()=>{console.log("customStepDoubleValue",q.value)}),n(()=>{console.log("markSingleValue1",S.value)}),n(()=>{console.log("markSingleValue2",V.value)}),n(()=>{console.log("markSingleValue3",x.value)}),n(()=>{console.log("markDoubleValue1",T.value)}),n(()=>{console.log("markDoubleValue2",_.value)}),n(()=>{console.log("markDoubleValue3",w.value)}),n(()=>{console.log("verticalSingleValue",P.value)}),n(()=>{console.log("verticalDoubleValue",U.value)}),n(()=>{console.log("markVerticalSingleValue",I.value)}),n(()=>{console.log("markVerticalDoubleValue1",N.value)}),n(()=>{console.log("markVerticalDoubleValue2",R.value)}),n(()=>{console.log("markVerticalDoubleValue3",O.value)}),n(()=>{console.log("inputSingleValue",C.value)}),n(()=>{console.log("smallSingleValue",B.value)}),n(()=>{console.log("formatSingleValue",M.value)}),n(()=>{console.log("formatDoubleValue",W.value)}),n(()=>{console.log("hideTooltipSingleValue",j.value)}),n(()=>{console.log("hideTooltipDoubleValue",G.value)}),n(()=>{console.log("tooltipOpenSingleValue",z.value)}),n(()=>{console.log("tooltipOpenDoubleValue",H.value)}),n(()=>{console.log("customStyleSingleValue",$.value)}),n(()=>{console.log("customStyleDoubleValue",J.value)});function Y(c){console.log("change",c)}function Z(c){return`${c}%`}return(c,s)=>{const ts=o("GlobalElement"),t=o("Slider",!0),y=o("Flex"),ns=o("Space"),m=o("Col"),ss=o("InputNumber"),ps=o("Row"),es=o("Tag");return e(),r("div",null,[s[51]||(s[51]=i("h1",{id:"滑动输入条-slider",tabindex:"-1"},[k("滑动输入条 Slider "),i("a",{class:"header-anchor",href:"#滑动输入条-slider","aria-label":'Permalink to "滑动输入条 Slider"'},"​")],-1)),l(ts),s[52]||(s[52]=i("p",null,[i("em",null,"滑动型输入器，展示当前值和可选范围")],-1)),s[53]||(s[53]=i("h2",{id:"何时使用",tabindex:"-1"},[k("何时使用 "),i("a",{class:"header-anchor",href:"#何时使用","aria-label":'Permalink to "何时使用"'},"​")],-1)),s[54]||(s[54]=i("ul",null,[i("li",null,"当用户需要在数值区间/自定义区间内进行选择时")],-1)),s[55]||(s[55]=i("h2",{id:"基本使用",tabindex:"-1"},[k("基本使用 "),i("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1)),l(t,{value:v.value,"onUpdate:value":s[0]||(s[0]=a=>v.value=a),onChange:Y},null,8,["value"]),s[56]||(s[56]=g("",2)),l(t,{range:"",value:D.value,"onUpdate:value":s[1]||(s[1]=a=>D.value=a),onChange:Y},null,8,["value"]),s[57]||(s[57]=g("",2)),l(y,{vertical:"",gap:"large"},{default:p(()=>[l(t,{value:L.value,"onUpdate:value":s[2]||(s[2]=a=>L.value=a),disabled:""},null,8,["value"]),l(t,{value:Q.value,"onUpdate:value":s[3]||(s[3]=a=>Q.value=a),range:"",disabled:""},null,8,["value"])]),_:1}),s[58]||(s[58]=g("",2)),l(y,{vertical:"",gap:"large"},{default:p(()=>[l(t,{min:-10,max:10,value:A.value,"onUpdate:value":s[4]||(s[4]=a=>A.value=a)},null,8,["value"]),l(t,{min:-10,max:10,range:"",value:f.value,"onUpdate:value":s[5]||(s[5]=a=>f.value=a)},null,8,["value"])]),_:1}),s[59]||(s[59]=g("",2)),l(y,{vertical:"",gap:"large"},{default:p(()=>[l(t,{step:5,value:b.value,"onUpdate:value":s[6]||(s[6]=a=>b.value=a)},null,8,["value"]),l(t,{range:"",step:5,value:q.value,"onUpdate:value":s[7]||(s[7]=a=>q.value=a)},null,8,["value"])]),_:1}),s[60]||(s[60]=g("",4)),l(y,{vertical:""},{default:p(()=>[l(t,{value:S.value,"onUpdate:value":s[8]||(s[8]=a=>S.value=a),marks:F.value},{mark:p(({label:a,value:E})=>[E===100?(e(),r("strong",ds,d(a),1)):(e(),r(u,{key:1},[k(d(a),1)],64))]),_:1},8,["value","marks"]),l(t,{range:"",value:T.value,"onUpdate:value":s[9]||(s[9]=a=>T.value=a),marks:F.value},{mark:p(({label:a,value:E})=>[E===100?(e(),r("strong",ys,d(a),1)):(e(),r(u,{key:1},[k(d(a),1)],64))]),_:1},8,["value","marks"])]),_:1}),s[61]||(s[61]=i("p",null,[i("em",null,[k("同时设置 "),i("code",null,"marks"),k(" & "),i("code",null,"step"),k(" 属性")])],-1)),s[62]||(s[62]=i("br",null,null,-1)),l(y,{vertical:""},{default:p(()=>[l(t,{value:V.value,"onUpdate:value":s[10]||(s[10]=a=>V.value=a),marks:F.value,step:10},{mark:p(({label:a,value:E})=>[E===100?(e(),is(as(K),{key:0})):(e(),r(u,{key:1},[k(d(a),1)],64))]),_:1},8,["value","marks"]),l(t,{range:"",value:_.value,"onUpdate:value":s[11]||(s[11]=a=>_.value=a),marks:F.value,step:10},{mark:p(({label:a,value:E})=>[E===100?(e(),is(as(K),{key:0})):(e(),r(u,{key:1},[k(d(a),1)],64))]),_:1},8,["value","marks"])]),_:1}),s[63]||(s[63]=i("p",null,[i("em",null,[k("设置 "),i("code",null,"step"),k(" 为 "),i("code",null,"'mark'"),k("，此时 "),i("code",null,"Slider"),k(" 的可选值仅有 "),i("code",null,"marks"),k(" 标记的部分")])],-1)),s[64]||(s[64]=i("br",null,null,-1)),l(y,{vertical:""},{default:p(()=>[l(t,{value:x.value,"onUpdate:value":s[12]||(s[12]=a=>x.value=a),marks:F.value,step:"mark"},{mark:p(({label:a,value:E})=>[E===100?(e(),r("strong",Fs,d(a),1)):(e(),r(u,{key:1},[k(d(a),1)],64))]),_:1},8,["value","marks"]),l(t,{range:"",value:w.value,"onUpdate:value":s[13]||(s[13]=a=>w.value=a),marks:F.value,step:"mark"},{mark:p(({label:a,value:E})=>[E===100?(e(),r("strong",os,d(a),1)):(e(),r(u,{key:1},[k(d(a),1)],64))]),_:1},8,["value","marks"])]),_:1}),s[65]||(s[65]=g("",2)),l(ns,{gap:36,style:{height:"300px"}},{default:p(()=>[l(t,{vertical:"",value:P.value,"onUpdate:value":s[14]||(s[14]=a=>P.value=a)},null,8,["value"]),l(t,{range:"",vertical:"",value:U.value,"onUpdate:value":s[15]||(s[15]=a=>U.value=a)},null,8,["value"]),l(t,{vertical:"",value:I.value,"onUpdate:value":s[16]||(s[16]=a=>I.value=a),marks:F.value},null,8,["value","marks"]),l(t,{vertical:"",range:"",value:N.value,"onUpdate:value":s[17]||(s[17]=a=>N.value=a),marks:F.value},null,8,["value","marks"]),l(t,{vertical:"",range:"",value:R.value,"onUpdate:value":s[18]||(s[18]=a=>R.value=a),marks:X.value,step:10},null,8,["value","marks"]),l(t,{vertical:"",range:"",value:O.value,"onUpdate:value":s[19]||(s[19]=a=>O.value=a),marks:X.value,step:"mark"},{mark:p(({label:a,isVNode:E,value:Es})=>[E?(e(),r(u,{key:0},[k(d(Es)+"°C ",1)],64)):(e(),r(u,{key:1},[k(d(a),1)],64))]),_:1},8,["value","marks"])]),_:1}),s[66]||(s[66]=g("",2)),l(ps,{gutter:[24,16]},{default:p(()=>[l(m,{span:18},{default:p(()=>[l(t,{value:C.value,"onUpdate:value":s[20]||(s[20]=a=>C.value=a)},null,8,["value"])]),_:1}),l(m,{span:6},{default:p(()=>[l(ss,{value:C.value,"onUpdate:value":s[21]||(s[21]=a=>C.value=a),min:0,max:100},null,8,["value"])]),_:1}),l(m,{span:18},{default:p(()=>[l(t,{value:B.value,"onUpdate:value":s[22]||(s[22]=a=>B.value=a),min:0,max:1,step:.01},null,8,["value"])]),_:1}),l(m,{span:6},{default:p(()=>[l(ss,{value:B.value,"onUpdate:value":s[23]||(s[23]=a=>B.value=a),min:0,max:1,step:.01},null,8,["value"])]),_:1})]),_:1}),s[67]||(s[67]=g("",2)),l(y,{vertical:"",gap:"large"},{default:p(()=>[l(t,{"format-tooltip":Z,value:M.value,"onUpdate:value":s[24]||(s[24]=a=>M.value=a)},null,8,["value"]),l(t,{range:"","format-tooltip":Z,value:W.value,"onUpdate:value":s[25]||(s[25]=a=>W.value=a)},null,8,["value"])]),_:1}),s[68]||(s[68]=g("",2)),l(y,{vertical:"",gap:"large"},{default:p(()=>[l(t,{tooltip:!1,value:j.value,"onUpdate:value":s[26]||(s[26]=a=>j.value=a)},null,8,["value"]),l(t,{range:"",tooltip:!1,value:G.value,"onUpdate:value":s[27]||(s[27]=a=>G.value=a)},null,8,["value"])]),_:1}),s[69]||(s[69]=g("",2)),l(y,{vertical:"",gap:36},{default:p(()=>[l(t,{"tooltip-open":"",value:z.value,"onUpdate:value":s[28]||(s[28]=a=>z.value=a)},null,8,["value"]),l(t,{range:"","tooltip-open":"",value:H.value,"onUpdate:value":s[29]||(s[29]=a=>H.value=a)},null,8,["value"])]),_:1}),s[70]||(s[70]=g("",3)),l(y,{vertical:"",gap:"large"},{default:p(()=>[l(t,{style:ls,value:$.value,"onUpdate:value":s[30]||(s[30]=a=>$.value=a)},null,8,["value"]),l(t,{style:ks,range:"",value:J.value,"onUpdate:value":s[31]||(s[31]=a=>J.value=a),marks:F.value,"tooltip-style":hs},null,8,["value","marks"])]),_:1}),s[71]||(s[71]=g("",3)),i("table",us,[s[50]||(s[50]=i("thead",null,[i("tr",null,[i("th",{style:{"text-align":"left"}},"参数"),i("th",{style:{"text-align":"left"}},"说明"),i("th",{style:{"text-align":"left"}},"类型"),i("th",{style:{"text-align":"left"}},"默认值")])],-1)),i("tbody",null,[s[37]||(s[37]=i("tr",null,[i("td",{style:{"text-align":"left"}},"width"),i("td",{style:{"text-align":"left"}},[k("滑动输入条宽度，单位 "),i("code",null,"px"),k("，水平模式时生效")]),i("td",{style:{"text-align":"left"}},"string | number"),i("td",{style:{"text-align":"left"}},"'100%'")],-1)),s[38]||(s[38]=i("tr",null,[i("td",{style:{"text-align":"left"}},"height"),i("td",{style:{"text-align":"left"}},[k("滑动输入条高度，单位 "),i("code",null,"px"),k("，垂直模式时生效")]),i("td",{style:{"text-align":"left"}},"string | number"),i("td",{style:{"text-align":"left"}},"'100%'")],-1)),s[39]||(s[39]=i("tr",null,[i("td",{style:{"text-align":"left"}},"vertical"),i("td",{style:{"text-align":"left"}},"是否启用垂直模式"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[40]||(s[40]=i("tr",null,[i("td",{style:{"text-align":"left"}},"min"),i("td",{style:{"text-align":"left"}},"最小值"),i("td",{style:{"text-align":"left"}},"number"),i("td",{style:{"text-align":"left"}},"0")],-1)),s[41]||(s[41]=i("tr",null,[i("td",{style:{"text-align":"left"}},"max"),i("td",{style:{"text-align":"left"}},"最大值"),i("td",{style:{"text-align":"left"}},"number"),i("td",{style:{"text-align":"left"}},"100")],-1)),s[42]||(s[42]=i("tr",null,[i("td",{style:{"text-align":"left"}},"marks"),i("td",{style:{"text-align":"left"}},[k("刻度标记，"),i("code",null,"key"),k(" 的类型必须为 "),i("code",null,"number"),k(" 且取值在闭区间 "),i("code",null,"[min, max]"),k(" 内，每个标记可以单独设置样式")]),i("td",{style:{"text-align":"left"}},[i("a",{href:"#marks-type"},"Marks")]),i("td",{style:{"text-align":"left"}},"{}")],-1)),s[43]||(s[43]=i("tr",null,[i("td",{style:{"text-align":"left"}},"disabled"),i("td",{style:{"text-align":"left"}},"是否禁用"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[44]||(s[44]=i("tr",null,[i("td",{style:{"text-align":"left"}},"range"),i("td",{style:{"text-align":"left"}},"是否使用双滑块模式"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[45]||(s[45]=i("tr",null,[i("td",{style:{"text-align":"left"}},"step"),i("td",{style:{"text-align":"left"}},[k("步长，取值必须大于 "),i("code",null,"0"),k("，并且可被 "),i("code",null,"(max - min)"),k(" 整除；当 "),i("code",null,"marks"),k(" 不为空对象时，可以设置 "),i("code",null,"step"),k(" 为 "),i("code",null,"'mark'"),k("，此时 "),i("code",null,"Slider"),k(" 的可选值仅有 "),i("code",null,"marks"),k(" 标记的部分")]),i("td",{style:{"text-align":"left"}},"number | 'mark'"),i("td",{style:{"text-align":"left"}},"1")],-1)),s[46]||(s[46]=i("tr",null,[i("td",{style:{"text-align":"left"}},"tooltip"),i("td",{style:{"text-align":"left"}},[k("是否展示 "),i("code",null,"Tooltip")]),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"true")],-1)),s[47]||(s[47]=i("tr",null,[i("td",{style:{"text-align":"left"}},"tooltipOpen"),i("td",{style:{"text-align":"left"}},[k("是否一直显示 "),i("code",null,"tooltip")]),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[48]||(s[48]=i("tr",null,[i("td",{style:{"text-align":"left"}},"tooltipStyle"),i("td",{style:{"text-align":"left"}},[k("自定义 "),i("code",null,"Tooltip"),k(" 样式")]),i("td",{style:{"text-align":"left"}},[i("a",{href:"https://cn.vuejs.org/api/utility-types.html#cssproperties",target:"_blank",rel:"noreferrer"},"CSSProperties")]),i("td",{style:{"text-align":"left"}},"{}")],-1)),s[49]||(s[49]=i("tr",null,[i("td",{style:{"text-align":"left"}},"formatTooltip"),i("td",{style:{"text-align":"left"}},[i("code",null,"Slider"),k(" 会把当前值传给 "),i("code",null,"formatTooltip"),k("，并在 "),i("code",null,"Tooltip"),k(" 中显示 "),i("code",null,"formatTooltip"),k(" 的返回值")]),i("td",{style:{"text-align":"left"}},"(value: number) => string | number"),i("td",{style:{"text-align":"left"}},"(value: number) => value")],-1)),i("tr",null,[i("td",Cs,[s[33]||(s[33]=k("value ")),l(es,{color:"cyan"},{default:p(()=>s[32]||(s[32]=[k("v-model")])),_:1})]),s[34]||(s[34]=i("td",{style:{"text-align":"left"}},[k("设置当前取值，当 "),i("code",null,"range"),k(" 为 "),i("code",null,"false"),k(" 时，使用 "),i("code",null,"number"),k("，否则用 "),i("code",null,"[number, number]")],-1)),s[35]||(s[35]=i("td",{style:{"text-align":"left"}},"number | number[]",-1)),s[36]||(s[36]=i("td",{style:{"text-align":"left"}},"0",-1))])])]),s[72]||(s[72]=g("",6))])}}});export{Ds as __pageData,As as default};
