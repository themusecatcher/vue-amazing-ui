import{d as D,p as k,C as p,c as A,o as x,j as a,G as e,a5 as h,a as i,w as l,_ as b}from"./chunks/framework.Bnu6xMP_.js";const q={tabindex:"0"},S={style:{"text-align":"left"}},I=JSON.parse('{"title":"抽屉 Drawer","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/drawer.md","filePath":"guide/components/drawer.md","lastUpdated":1741935096000}'),w={name:"guide/components/drawer.md"},P=D({...w,setup(T){const r=k(!1),v=k(!1),d=k(!1),E=k(!1),g=k(!1),y=k([{label:"top",value:"top"},{label:"right",value:"right"},{label:"bottom",value:"bottom"},{label:"left",value:"left"}]),F=k("right"),o=k("right"),u=k("right");function f(){d.value=!1,E.value=!1,console.log("close")}return(O,s)=>{const B=p("GlobalElement"),n=p("Button"),c=p("Drawer",!0),C=p("Radio"),m=p("Tag");return x(),A("div",null,[s[53]||(s[53]=a("h1",{id:"抽屉-drawer",tabindex:"-1"},[i("抽屉 Drawer "),a("a",{class:"header-anchor",href:"#抽屉-drawer","aria-label":'Permalink to "抽屉 Drawer"'},"​")],-1)),e(B),s[54]||(s[54]=a("p",null,[a("em",null,"屏幕边缘滑出的浮层面板")],-1)),s[55]||(s[55]=a("h2",{id:"何时使用",tabindex:"-1"},[i("何时使用 "),a("a",{class:"header-anchor",href:"#何时使用","aria-label":'Permalink to "何时使用"'},"​")],-1)),s[56]||(s[56]=a("blockquote",null,[a("p",null,"抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。")],-1)),s[57]||(s[57]=a("ul",null,[a("li",null,"当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容"),a("li",null,"当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象")],-1)),s[58]||(s[58]=a("h2",{id:"基本使用",tabindex:"-1"},[i("基本使用 "),a("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1)),e(n,{type:"primary",onClick:s[0]||(s[0]=t=>r.value=!0)},{default:l(()=>s[13]||(s[13]=[i("Open")])),_:1}),e(c,{open:r.value,"onUpdate:open":s[1]||(s[1]=t=>r.value=t),title:"Basic Drawer",onClose:f},{default:l(()=>s[14]||(s[14]=[a("p",null,"Some contents...",-1),a("p",null,"Some contents...",-1),a("p",null,"Some contents...",-1)])),_:1},8,["open"]),s[59]||(s[59]=h("",2)),e(C,{value:F.value,"onUpdate:value":s[2]||(s[2]=t=>F.value=t),options:y.value,style:{"margin-right":"8px"}},null,8,["value","options"]),e(n,{type:"primary",onClick:s[3]||(s[3]=t=>v.value=!0)},{default:l(()=>s[15]||(s[15]=[i("Open")])),_:1}),e(c,{open:v.value,"onUpdate:open":s[4]||(s[4]=t=>v.value=t),title:"Basic Drawer",closable:!1,extra:"extra",footer:"footer",placement:F.value},{default:l(()=>s[16]||(s[16]=[a("p",null,"Some contents...",-1),a("p",null,"Some contents...",-1),a("p",null,"Some contents...",-1)])),_:1},8,["open","placement"]),s[60]||(s[60]=h("",2)),e(C,{value:o.value,"onUpdate:value":s[5]||(s[5]=t=>o.value=t),options:y.value,style:{"margin-right":"8px"}},null,8,["value","options"]),e(n,{type:"primary",onClick:s[6]||(s[6]=t=>d.value=!0)},{default:l(()=>s[17]||(s[17]=[i("Open")])),_:1}),e(c,{open:d.value,"onUpdate:open":s[7]||(s[7]=t=>d.value=t),title:"Basic Drawer",placement:o.value},{extra:l(()=>[e(n,{style:{"margin-right":"8px"},onClick:f},{default:l(()=>s[18]||(s[18]=[i("Cancel")])),_:1}),e(n,{type:"primary",onClick:f},{default:l(()=>s[19]||(s[19]=[i("Submit")])),_:1})]),default:l(()=>[s[20]||(s[20]=a("p",null,"Some contents...",-1)),s[21]||(s[21]=a("p",null,"Some contents...",-1)),s[22]||(s[22]=a("p",null,"Some contents...",-1))]),_:1},8,["open","placement"]),s[61]||(s[61]=h("",2)),e(C,{value:u.value,"onUpdate:value":s[8]||(s[8]=t=>u.value=t),options:y.value,style:{"margin-right":"8px"}},null,8,["value","options"]),e(n,{type:"primary",onClick:s[9]||(s[9]=t=>E.value=!0)},{default:l(()=>s[23]||(s[23]=[i("Open")])),_:1}),e(c,{open:E.value,"onUpdate:open":s[10]||(s[10]=t=>E.value=t),title:"Basic Drawer",placement:u.value,"footer-style":{textAlign:"right"}},{footer:l(()=>[e(n,{style:{"margin-right":"8px"},onClick:f},{default:l(()=>s[24]||(s[24]=[i("Cancel")])),_:1}),e(n,{type:"primary",onClick:f},{default:l(()=>s[25]||(s[25]=[i("Submit")])),_:1})]),default:l(()=>[s[26]||(s[26]=a("p",null,"Some contents...",-1)),s[27]||(s[27]=a("p",null,"Some contents...",-1)),s[28]||(s[28]=a("p",null,"Some contents...",-1))]),_:1},8,["open","placement"]),s[62]||(s[62]=h("",2)),e(n,{type:"primary",onClick:s[11]||(s[11]=t=>g.value=!0)},{default:l(()=>s[29]||(s[29]=[i("Open")])),_:1}),e(c,{open:g.value,"onUpdate:open":s[12]||(s[12]=t=>g.value=t),closable:!1,title:"Basic Drawer","header-style":{textAlign:"center"},"body-style":{textAlign:"center"}},{default:l(()=>s[30]||(s[30]=[a("p",null,"Some contents...",-1),a("p",null,"Some contents...",-1),a("p",null,"Some contents...",-1)])),_:1},8,["open"]),s[63]||(s[63]=h("",3)),a("table",q,[s[52]||(s[52]=a("thead",null,[a("tr",null,[a("th",{style:{"text-align":"left"}},"参数"),a("th",{style:{"text-align":"left"}},"说明"),a("th",{style:{"text-align":"left"}},"类型"),a("th",{style:{"text-align":"left"}},"默认值")])],-1)),a("tbody",null,[s[36]||(s[36]=a("tr",null,[a("td",{style:{"text-align":"left"}},"width"),a("td",{style:{"text-align":"left"}},[i("抽屉宽度，在 "),a("code",null,"placement"),i(" 为 "),a("code",null,"right"),i(" 或 "),a("code",null,"left"),i(" 时使用，单位 "),a("code",null,"px")]),a("td",{style:{"text-align":"left"}},"string | number"),a("td",{style:{"text-align":"left"}},"378")],-1)),s[37]||(s[37]=a("tr",null,[a("td",{style:{"text-align":"left"}},"height"),a("td",{style:{"text-align":"left"}},[i("抽屉高度，在 "),a("code",null,"placement"),i(" 为 "),a("code",null,"top"),i(" 或 "),a("code",null,"bottom"),i(" 时使用，单位 "),a("code",null,"px")]),a("td",{style:{"text-align":"left"}},"string | number"),a("td",{style:{"text-align":"left"}},"378")],-1)),s[38]||(s[38]=a("tr",null,[a("td",{style:{"text-align":"left"}},"title"),a("td",{style:{"text-align":"left"}},"标题"),a("td",{style:{"text-align":"left"}},"string | slot"),a("td",{style:{"text-align":"left"}},"undefined")],-1)),s[39]||(s[39]=a("tr",null,[a("td",{style:{"text-align":"left"}},"closable"),a("td",{style:{"text-align":"left"}},"是否显示左上角的关闭按钮"),a("td",{style:{"text-align":"left"}},"boolean"),a("td",{style:{"text-align":"left"}},"true")],-1)),s[40]||(s[40]=a("tr",null,[a("td",{style:{"text-align":"left"}},"placement"),a("td",{style:{"text-align":"left"}},"抽屉的方向"),a("td",{style:{"text-align":"left"}},"'top' | 'right' | 'bottom' | 'left'"),a("td",{style:{"text-align":"left"}},"'right'")],-1)),s[41]||(s[41]=a("tr",null,[a("td",{style:{"text-align":"left"}},"headerClass"),a("td",{style:{"text-align":"left"}},[i("设置 "),a("code",null,"Drawer"),i(" 头部的类名")]),a("td",{style:{"text-align":"left"}},"string"),a("td",{style:{"text-align":"left"}},"undefined")],-1)),s[42]||(s[42]=a("tr",null,[a("td",{style:{"text-align":"left"}},"headerStyle"),a("td",{style:{"text-align":"left"}},[i("设置 "),a("code",null,"Drawer"),i(" 头部的样式")]),a("td",{style:{"text-align":"left"}},[a("a",{href:"https://cn.vuejs.org/api/utility-types.html#cssproperties",target:"_blank",rel:"noreferrer"},"CSSProperties")]),a("td",{style:{"text-align":"left"}},"{}")],-1)),s[43]||(s[43]=a("tr",null,[a("td",{style:{"text-align":"left"}},"bodyClass"),a("td",{style:{"text-align":"left"}},[i("设置 "),a("code",null,"Drawer"),i(" 内容部分的类名")]),a("td",{style:{"text-align":"left"}},"string"),a("td",{style:{"text-align":"left"}},"undefined")],-1)),s[44]||(s[44]=a("tr",null,[a("td",{style:{"text-align":"left"}},"bodyStyle"),a("td",{style:{"text-align":"left"}},[i("设置 "),a("code",null,"Drawer"),i(" 内容部分的样式")]),a("td",{style:{"text-align":"left"}},[a("a",{href:"https://cn.vuejs.org/api/utility-types.html#cssproperties",target:"_blank",rel:"noreferrer"},"CSSProperties")]),a("td",{style:{"text-align":"left"}},"{}")],-1)),s[45]||(s[45]=a("tr",null,[a("td",{style:{"text-align":"left"}},"scrollbarProps"),a("td",{style:{"text-align":"left"}},[a("code",null,"Scrollbar"),i(" 组件属性配置，参考 "),a("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html#scrollbar",target:"_blank",rel:"noreferrer"},"Scrollbar Props"),i("，用于设置内容滚动条的样式")]),a("td",{style:{"text-align":"left"}},"object"),a("td",{style:{"text-align":"left"}},"{}")],-1)),s[46]||(s[46]=a("tr",null,[a("td",{style:{"text-align":"left"}},"extra"),a("td",{style:{"text-align":"left"}},"抽屉右上角的操作区域"),a("td",{style:{"text-align":"left"}},"string | slot"),a("td",{style:{"text-align":"left"}},"undefined")],-1)),s[47]||(s[47]=a("tr",null,[a("td",{style:{"text-align":"left"}},"footer"),a("td",{style:{"text-align":"left"}},"抽屉的页脚"),a("td",{style:{"text-align":"left"}},"string | slot"),a("td",{style:{"text-align":"left"}},"undefined")],-1)),s[48]||(s[48]=a("tr",null,[a("td",{style:{"text-align":"left"}},"footerClass"),a("td",{style:{"text-align":"left"}},[i("设置 "),a("code",null,"Drawer"),i(" 页脚的类名")]),a("td",{style:{"text-align":"left"}},"string"),a("td",{style:{"text-align":"left"}},"undefined")],-1)),s[49]||(s[49]=a("tr",null,[a("td",{style:{"text-align":"left"}},"footerStyle"),a("td",{style:{"text-align":"left"}},[i("设置 "),a("code",null,"Drawer"),i(" 页脚的样式")]),a("td",{style:{"text-align":"left"}},[a("a",{href:"https://cn.vuejs.org/api/utility-types.html#cssproperties",target:"_blank",rel:"noreferrer"},"CSSProperties")]),a("td",{style:{"text-align":"left"}},"{}")],-1)),s[50]||(s[50]=a("tr",null,[a("td",{style:{"text-align":"left"}},"destroyOnClose"),a("td",{style:{"text-align":"left"}},[i("关闭时是否销毁 "),a("code",null,"Drawer"),i(" 里的子元素")]),a("td",{style:{"text-align":"left"}},"boolean"),a("td",{style:{"text-align":"left"}},"false")],-1)),s[51]||(s[51]=a("tr",null,[a("td",{style:{"text-align":"left"}},"zIndex"),a("td",{style:{"text-align":"left"}},[i("设置 "),a("code",null,"Drawer"),i(" 的 "),a("code",null,"z-index")]),a("td",{style:{"text-align":"left"}},"number"),a("td",{style:{"text-align":"left"}},"1000")],-1)),a("tr",null,[a("td",S,[s[32]||(s[32]=i("open ")),e(m,{color:"cyan"},{default:l(()=>s[31]||(s[31]=[i("v-model")])),_:1})]),s[33]||(s[33]=a("td",{style:{"text-align":"left"}},"抽屉是否可见",-1)),s[34]||(s[34]=a("td",{style:{"text-align":"left"}},"boolean",-1)),s[35]||(s[35]=a("td",{style:{"text-align":"left"}},"false",-1))])])]),s[64]||(s[64]=h("",4))])}}}),V=b(P,[["__scopeId","data-v-9e4cf2fc"]]);export{I as __pageData,V as default};
