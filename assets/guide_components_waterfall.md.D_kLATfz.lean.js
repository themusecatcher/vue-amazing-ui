import{d as u,p as c,a4 as C,aE as m,C as e,c as B,o as x,j as v,G as s,a5 as f,a as n,w as t,_ as A}from"./chunks/framework.bNNjbgDP.js";const I=JSON.parse('{"title":"瀑布流 Waterfall","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/waterfall.md","filePath":"guide/components/waterfall.md","lastUpdated":1737105497000}'),D={name:"guide/components/waterfall.md"},b=u({...D,setup(q){const p=c([]),i=C({columnCount:3,columnGap:20,backgroundColor:"#e6f4ff",borderRadius:12});function g(){for(let l=1;l<=10;l++)p.value.push({name:`image-${l}`,src:`https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/${l}.jpg`,link:`https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/${l}.jpg`})}return m(()=>{g()}),(l,a)=>{const y=e("GlobalElement"),r=e("Waterfall",!0),E=e("Slider"),h=e("Flex"),k=e("Col"),F=e("ColorPicker"),o=e("Row");return x(),B("div",null,[a[8]||(a[8]=v("h1",{id:"瀑布流-waterfall",tabindex:"-1"},[n("瀑布流 Waterfall "),v("a",{class:"header-anchor",href:"#瀑布流-waterfall","aria-label":'Permalink to "瀑布流 Waterfall"'},"​")],-1)),s(y),a[9]||(a[9]=f("",3)),s(r,{images:p.value},null,8,["images"]),a[10]||(a[10]=f("",2)),s(o,{gutter:24},{default:t(()=>[s(k,{span:6},{default:t(()=>[s(h,{vertical:"",gap:"middle"},{default:t(()=>[a[4]||(a[4]=n(" columnCount: ")),s(E,{min:1,max:6,value:i.columnCount,"onUpdate:value":a[0]||(a[0]=d=>i.columnCount=d)},null,8,["value"])]),_:1})]),_:1}),s(k,{span:6},{default:t(()=>[s(h,{vertical:"",gap:"middle"},{default:t(()=>[a[5]||(a[5]=n(" columnGap: ")),s(E,{min:10,max:100,value:i.columnGap,"onUpdate:value":a[1]||(a[1]=d=>i.columnGap=d)},null,8,["value"])]),_:1})]),_:1}),s(k,{span:6},{default:t(()=>[s(h,{vertical:"",gap:"middle"},{default:t(()=>[a[6]||(a[6]=n(" borderRadius: ")),s(E,{min:0,max:100,value:i.borderRadius,"onUpdate:value":a[2]||(a[2]=d=>i.borderRadius=d)},null,8,["value"])]),_:1})]),_:1}),s(k,{span:6},{default:t(()=>[s(h,{vertical:""},{default:t(()=>[a[7]||(a[7]=n(" backgroundColor: ")),s(F,{value:i.backgroundColor,"onUpdate:value":a[3]||(a[3]=d=>i.backgroundColor=d)},null,8,["value"])]),_:1})]),_:1})]),_:1}),s(r,{class:"mt30",images:p.value,"column-count":i.columnCount,"column-gap":i.columnGap,"background-color":i.backgroundColor,"border-radius":i.borderRadius},null,8,["images","column-count","column-gap","background-color","border-radius"]),a[11]||(a[11]=f("",6))])}}}),P=A(b,[["__scopeId","data-v-53e8d42f"]]);export{I as __pageData,P as default};
