import{g as P}from"./chunks/theme.BlCQUBt_.js";import{d as T,p as n,C as h,c as O,o as I,j as s,G as t,a5 as p,a as e,w as d,N as A,_ as R}from"./chunks/framework.Bnu6xMP_.js";const V={tabindex:"0"},N={style:{"text-align":"left"}},J=JSON.parse('{"title":"抽屉 Drawer","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/drawer.md","filePath":"guide/components/drawer.md","lastUpdated":1741052255000}'),U={name:"guide/components/drawer.md"},z=T({...U,setup($){const F=n(!1),o=n(!1),v=n(!1),b=n(!1),u=n(!1),g=n(!1),C=n([{label:"top",value:"top"},{label:"right",value:"right"},{label:"bottom",value:"bottom"},{label:"left",value:"left"}]),B=n("right"),m=n("right"),c=n("right"),r=n("#ff6900");function f(y){const a=P(y);return{"--button-primary-color":y,"--button-primary-color-hover":a[4],"--button-primary-color-active":a[6],"--button-ripple-color":y}}function k(){v.value=!1,b.value=!1,g.value=!1,console.log("close")}return(y,a)=>{const q=h("GlobalElement"),l=h("Button"),E=h("Drawer",!0),D=h("Radio"),x=h("ColorPicker"),S=h("Space"),w=h("Tag");return I(),O("div",null,[a[63]||(a[63]=s("h1",{id:"抽屉-drawer",tabindex:"-1"},[e("抽屉 Drawer "),s("a",{class:"header-anchor",href:"#抽屉-drawer","aria-label":'Permalink to "抽屉 Drawer"'},"​")],-1)),t(q),a[64]||(a[64]=s("p",null,[s("em",null,"屏幕边缘滑出的浮层面板")],-1)),a[65]||(a[65]=s("h2",{id:"何时使用",tabindex:"-1"},[e("何时使用 "),s("a",{class:"header-anchor",href:"#何时使用","aria-label":'Permalink to "何时使用"'},"​")],-1)),a[66]||(a[66]=s("blockquote",null,[s("p",null,"抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。")],-1)),a[67]||(a[67]=s("ul",null,[s("li",null,"当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容"),s("li",null,"当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象")],-1)),a[68]||(a[68]=s("h2",{id:"基本使用",tabindex:"-1"},[e("基本使用 "),s("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1)),t(l,{type:"primary",onClick:a[0]||(a[0]=i=>F.value=!0)},{default:d(()=>a[16]||(a[16]=[e("Open")])),_:1}),t(E,{open:F.value,"onUpdate:open":a[1]||(a[1]=i=>F.value=i),title:"Basic Drawer",onClose:k},{default:d(()=>a[17]||(a[17]=[s("p",null,"Some contents...",-1),s("p",null,"Some contents...",-1),s("p",null,"Some contents...",-1)])),_:1},8,["open"]),a[69]||(a[69]=p("",2)),t(D,{value:B.value,"onUpdate:value":a[2]||(a[2]=i=>B.value=i),options:C.value,style:{"margin-right":"8px"}},null,8,["value","options"]),t(l,{type:"primary",onClick:a[3]||(a[3]=i=>o.value=!0)},{default:d(()=>a[18]||(a[18]=[e("Open")])),_:1}),t(E,{open:o.value,"onUpdate:open":a[4]||(a[4]=i=>o.value=i),title:"Basic Drawer",closable:!1,extra:"extra",footer:"footer",placement:B.value},{default:d(()=>a[19]||(a[19]=[s("p",null,"Some contents...",-1),s("p",null,"Some contents...",-1),s("p",null,"Some contents...",-1)])),_:1},8,["open","placement"]),a[70]||(a[70]=p("",2)),t(D,{value:m.value,"onUpdate:value":a[5]||(a[5]=i=>m.value=i),options:C.value,style:{"margin-right":"8px"}},null,8,["value","options"]),t(l,{type:"primary",onClick:a[6]||(a[6]=i=>v.value=!0)},{default:d(()=>a[20]||(a[20]=[e("Open")])),_:1}),t(E,{open:v.value,"onUpdate:open":a[7]||(a[7]=i=>v.value=i),title:"Basic Drawer",placement:m.value},{extra:d(()=>[t(l,{style:{"margin-right":"8px"},onClick:k},{default:d(()=>a[21]||(a[21]=[e("Cancel")])),_:1}),t(l,{type:"primary",onClick:k},{default:d(()=>a[22]||(a[22]=[e("Submit")])),_:1})]),default:d(()=>[a[23]||(a[23]=s("p",null,"Some contents...",-1)),a[24]||(a[24]=s("p",null,"Some contents...",-1)),a[25]||(a[25]=s("p",null,"Some contents...",-1))]),_:1},8,["open","placement"]),a[71]||(a[71]=p("",2)),t(D,{value:c.value,"onUpdate:value":a[8]||(a[8]=i=>c.value=i),options:C.value,style:{"margin-right":"8px"}},null,8,["value","options"]),t(l,{type:"primary",onClick:a[9]||(a[9]=i=>b.value=!0)},{default:d(()=>a[26]||(a[26]=[e("Open")])),_:1}),t(E,{open:b.value,"onUpdate:open":a[10]||(a[10]=i=>b.value=i),title:"Basic Drawer",placement:c.value,"footer-style":{textAlign:"right"}},{footer:d(()=>[t(l,{style:{"margin-right":"8px"},onClick:k},{default:d(()=>a[27]||(a[27]=[e("Cancel")])),_:1}),t(l,{type:"primary",onClick:k},{default:d(()=>a[28]||(a[28]=[e("Submit")])),_:1})]),default:d(()=>[a[29]||(a[29]=s("p",null,"Some contents...",-1)),a[30]||(a[30]=s("p",null,"Some contents...",-1)),a[31]||(a[31]=s("p",null,"Some contents...",-1))]),_:1},8,["open","placement"]),a[72]||(a[72]=p("",2)),t(l,{type:"primary",onClick:a[11]||(a[11]=i=>u.value=!0)},{default:d(()=>a[32]||(a[32]=[e("Open")])),_:1}),t(E,{open:u.value,"onUpdate:open":a[12]||(a[12]=i=>u.value=i),closable:!1,title:"Basic Drawer","header-style":{textAlign:"center"},"body-style":{textAlign:"center"}},{default:d(()=>a[33]||(a[33]=[s("p",null,"Some contents...",-1),s("p",null,"Some contents...",-1),s("p",null,"Some contents...",-1)])),_:1},8,["open"]),a[73]||(a[73]=p("",2)),t(S,{align:"center"},{default:d(()=>[a[35]||(a[35]=e(" primaryColor: ")),t(x,{style:{width:"200px"},value:r.value,"onUpdate:value":a[13]||(a[13]=i=>r.value=i)},null,8,["value"]),t(l,{style:A(f(r.value)),type:"primary",onClick:a[14]||(a[14]=i=>g.value=!0)},{default:d(()=>a[34]||(a[34]=[e("Open")])),_:1},8,["style"])]),_:1}),t(E,{open:g.value,"onUpdate:open":a[15]||(a[15]=i=>g.value=i),closable:!1,title:"Basic Drawer","footer-style":{textAlign:"right"}},{footer:d(()=>[t(l,{style:A([{"margin-right":"8px"},f(r.value)]),onClick:k},{default:d(()=>a[36]||(a[36]=[e("Cancel")])),_:1},8,["style"]),t(l,{style:A(f(r.value)),type:"primary",onClick:k},{default:d(()=>a[37]||(a[37]=[e("Submit")])),_:1},8,["style"])]),default:d(()=>[a[38]||(a[38]=s("p",null,"Some contents...",-1)),a[39]||(a[39]=s("p",null,"Some contents...",-1)),a[40]||(a[40]=s("p",null,"Some contents...",-1))]),_:1},8,["open"]),a[74]||(a[74]=p("",3)),s("table",V,[a[62]||(a[62]=s("thead",null,[s("tr",null,[s("th",{style:{"text-align":"left"}},"参数"),s("th",{style:{"text-align":"left"}},"说明"),s("th",{style:{"text-align":"left"}},"类型"),s("th",{style:{"text-align":"left"}},"默认值")])],-1)),s("tbody",null,[a[46]||(a[46]=s("tr",null,[s("td",{style:{"text-align":"left"}},"width"),s("td",{style:{"text-align":"left"}},[e("抽屉宽度，在 "),s("code",null,"placement"),e(" 为 "),s("code",null,"right"),e(" 或 "),s("code",null,"left"),e(" 时使用，单位 "),s("code",null,"px")]),s("td",{style:{"text-align":"left"}},"string | number"),s("td",{style:{"text-align":"left"}},"378")],-1)),a[47]||(a[47]=s("tr",null,[s("td",{style:{"text-align":"left"}},"height"),s("td",{style:{"text-align":"left"}},[e("抽屉高度，在 "),s("code",null,"placement"),e(" 为 "),s("code",null,"top"),e(" 或 "),s("code",null,"bottom"),e(" 时使用，单位 "),s("code",null,"px")]),s("td",{style:{"text-align":"left"}},"string | number"),s("td",{style:{"text-align":"left"}},"378")],-1)),a[48]||(a[48]=s("tr",null,[s("td",{style:{"text-align":"left"}},"title"),s("td",{style:{"text-align":"left"}},"标题"),s("td",{style:{"text-align":"left"}},"string | slot"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[49]||(a[49]=s("tr",null,[s("td",{style:{"text-align":"left"}},"closable"),s("td",{style:{"text-align":"left"}},"是否显示左上角的关闭按钮"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"true")],-1)),a[50]||(a[50]=s("tr",null,[s("td",{style:{"text-align":"left"}},"placement"),s("td",{style:{"text-align":"left"}},"抽屉的方向"),s("td",{style:{"text-align":"left"}},"'top' | 'right' | 'bottom' | 'left'"),s("td",{style:{"text-align":"left"}},"'right'")],-1)),a[51]||(a[51]=s("tr",null,[s("td",{style:{"text-align":"left"}},"headerClass"),s("td",{style:{"text-align":"left"}},[e("设置 "),s("code",null,"Drawer"),e(" 头部的类名")]),s("td",{style:{"text-align":"left"}},"string"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[52]||(a[52]=s("tr",null,[s("td",{style:{"text-align":"left"}},"headerStyle"),s("td",{style:{"text-align":"left"}},[e("设置 "),s("code",null,"Drawer"),e(" 头部的样式")]),s("td",{style:{"text-align":"left"}},[s("a",{href:"https://cn.vuejs.org/api/utility-types.html#cssproperties",target:"_blank",rel:"noreferrer"},"CSSProperties")]),s("td",{style:{"text-align":"left"}},"{}")],-1)),a[53]||(a[53]=s("tr",null,[s("td",{style:{"text-align":"left"}},"bodyClass"),s("td",{style:{"text-align":"left"}},[e("设置 "),s("code",null,"Drawer"),e(" 内容部分的类名")]),s("td",{style:{"text-align":"left"}},"string"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[54]||(a[54]=s("tr",null,[s("td",{style:{"text-align":"left"}},"bodyStyle"),s("td",{style:{"text-align":"left"}},[e("设置 "),s("code",null,"Drawer"),e(" 内容部分的样式")]),s("td",{style:{"text-align":"left"}},[s("a",{href:"https://cn.vuejs.org/api/utility-types.html#cssproperties",target:"_blank",rel:"noreferrer"},"CSSProperties")]),s("td",{style:{"text-align":"left"}},"{}")],-1)),a[55]||(a[55]=s("tr",null,[s("td",{style:{"text-align":"left"}},"scrollbarProps"),s("td",{style:{"text-align":"left"}},[s("code",null,"Scrollbar"),e(" 组件属性配置，参考 "),s("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html#scrollbar",target:"_blank",rel:"noreferrer"},"Scrollbar Props"),e("，用于设置内容滚动条的样式")]),s("td",{style:{"text-align":"left"}},"object"),s("td",{style:{"text-align":"left"}},"{}")],-1)),a[56]||(a[56]=s("tr",null,[s("td",{style:{"text-align":"left"}},"extra"),s("td",{style:{"text-align":"left"}},"抽屉右上角的操作区域"),s("td",{style:{"text-align":"left"}},"string | slot"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[57]||(a[57]=s("tr",null,[s("td",{style:{"text-align":"left"}},"footer"),s("td",{style:{"text-align":"left"}},"抽屉的页脚"),s("td",{style:{"text-align":"left"}},"string | slot"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[58]||(a[58]=s("tr",null,[s("td",{style:{"text-align":"left"}},"footerClass"),s("td",{style:{"text-align":"left"}},[e("设置 "),s("code",null,"Drawer"),e(" 页脚的类名")]),s("td",{style:{"text-align":"left"}},"string"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[59]||(a[59]=s("tr",null,[s("td",{style:{"text-align":"left"}},"footerStyle"),s("td",{style:{"text-align":"left"}},[e("设置 "),s("code",null,"Drawer"),e(" 页脚的样式")]),s("td",{style:{"text-align":"left"}},[s("a",{href:"https://cn.vuejs.org/api/utility-types.html#cssproperties",target:"_blank",rel:"noreferrer"},"CSSProperties")]),s("td",{style:{"text-align":"left"}},"{}")],-1)),a[60]||(a[60]=s("tr",null,[s("td",{style:{"text-align":"left"}},"destroyOnClose"),s("td",{style:{"text-align":"left"}},[e("关闭时是否销毁 "),s("code",null,"Drawer"),e(" 里的子元素")]),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"false")],-1)),a[61]||(a[61]=s("tr",null,[s("td",{style:{"text-align":"left"}},"zIndex"),s("td",{style:{"text-align":"left"}},[e("设置 "),s("code",null,"Drawer"),e(" 的 "),s("code",null,"z-index")]),s("td",{style:{"text-align":"left"}},"number"),s("td",{style:{"text-align":"left"}},"1000")],-1)),s("tr",null,[s("td",N,[a[42]||(a[42]=e("open ")),t(w,{color:"cyan"},{default:d(()=>a[41]||(a[41]=[e("v-model")])),_:1})]),a[43]||(a[43]=s("td",{style:{"text-align":"left"}},"抽屉是否可见",-1)),a[44]||(a[44]=s("td",{style:{"text-align":"left"}},"boolean",-1)),a[45]||(a[45]=s("td",{style:{"text-align":"left"}},"false",-1))])])]),a[75]||(a[75]=p("",4))])}}}),H=R(z,[["__scopeId","data-v-71ebed1e"]]);export{J as __pageData,H as default};
