import{d as b,p as d,s as y,C as F,c as q,o as T,j as s,G as h,a5 as p,a,w as f}from"./chunks/framework.D_rhKk2H.js";const L={tabindex:"0"},U={style:{"text-align":"left"}},S=JSON.parse('{"title":"上传 Upload","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/upload.md","filePath":"guide/components/upload.md","lastUpdated":1736157361000}'),w={name:"guide/components/upload.md"},j=b({...w,setup(P){const E=d(),e=d([]),k=d([{name:"1.jpg",url:"https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg"},{name:"Markdown.pdf",url:"https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf"}]),o=d([{name:"1.jpg",url:"https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg"}]),c=d([{name:"Markdown.pdf",url:"https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf"}]);y(()=>{console.log("files",e.value)}),y(()=>{console.log("fileList",k.value)}),y(()=>{console.log("imageList",o.value)}),y(()=>{console.log("pdfList",c.value)});function B(l){return l.size>500*1024?(E.value.warning("文件必须小于 500KB"),!1):(console.log("file",l),console.log("type",l.type),l.type.includes("image")?!0:(E.value.error("只能上传图片"),!1))}function m(l){const i=["application/pdf"];return l.size>500*1024?(E.value.warning("文件必须小于 500KB"),!1):i.includes(l.type)?!0:(E.value.error("只能上传 pdf 格式的文件"),!1)}function A(l){return new Promise((i,u)=>{setTimeout(()=>{if(l.type==="application/pdf")var n={name:"Markdown.pdf",url:"https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/Markdown.pdf"};else var n={name:"1.jpg",url:"https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg"};n?i(n):u("upload request fail ...")},1e3)})}function v(l){console.log("drop",l)}function r(l){console.log("change",l)}function D(l){console.log("preview",l)}function g(l){console.log("remove",l)}return(l,i)=>{const u=F("GlobalElement"),n=F("Upload",!0),C=F("Space"),x=F("Tag");return T(),q("div",null,[i[32]||(i[32]=s("h1",{id:"上传-upload",tabindex:"-1"},[a("上传 Upload "),s("a",{class:"header-anchor",href:"#上传-upload","aria-label":'Permalink to "上传 Upload"'},"​")],-1)),h(u),i[33]||(i[33]=s("p",null,[s("em",null,"文件选择上传和拖拽上传控件")],-1)),i[34]||(i[34]=s("h2",{id:"何时使用",tabindex:"-1"},[a("何时使用 "),s("a",{class:"header-anchor",href:"#何时使用","aria-label":'Permalink to "何时使用"'},"​")],-1)),i[35]||(i[35]=s("ul",null,[s("li",null,"当需要上传一个或一些文件时"),s("li",null,"当需要展现上传的进度时"),s("li",null,"当需要使用拖拽交互时")],-1)),i[36]||(i[36]=s("h2",{id:"基本使用",tabindex:"-1"},[a("基本使用 "),s("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1)),h(n,{fileList:e.value,"onUpdate:fileList":i[0]||(i[0]=t=>e.value=t),onDrop:v,onChange:r,onPreview:D,onRemove:g},null,8,["fileList"]),i[37]||(i[37]=p("",4)),h(n,{disabled:"",fileList:k.value,"onUpdate:fileList":i[1]||(i[1]=t=>k.value=t)},null,8,["fileList"]),i[38]||(i[38]=p("",4)),h(C,{vertical:""},{default:f(()=>[h(n,{"max-count":1,tip:"maxCount: 1",fileList:e.value,"onUpdate:fileList":i[2]||(i[2]=t=>e.value=t)},null,8,["fileList"]),h(n,{"max-count":3,tip:"maxCount: 3",fileList:k.value,"onUpdate:fileList":i[3]||(i[3]=t=>k.value=t)},null,8,["fileList"])]),_:1}),i[39]||(i[39]=p("",4)),h(n,{multiple:"",fileList:e.value,"onUpdate:fileList":i[4]||(i[4]=t=>e.value=t)},null,8,["fileList"]),i[40]||(i[40]=p("",4)),h(n,{tip:"上传",fit:"cover",fileList:k.value,"onUpdate:fileList":i[5]||(i[5]=t=>k.value=t)},null,8,["fileList"]),i[41]||(i[41]=p("",3)),h(n,{"space-props":{gap:"middle"},"spin-props":{indicator:"spin-dot",color:"#ff6900",tip:"上传中..."},fileList:k.value,"onUpdate:fileList":i[6]||(i[6]=t=>k.value=t)},null,8,["fileList"]),i[42]||(i[42]=p("",2)),h(n,{"action-message":{upload:"upload success",remove:"remove success"},fileList:k.value,"onUpdate:fileList":i[7]||(i[7]=t=>k.value=t)},null,8,["fileList"]),i[43]||(i[43]=p("",4)),h(C,{vertical:""},{default:f(()=>[h(n,{ref_key:"uploadRef",ref:E,accept:"image/*",tip:"Only Image","before-upload":B,fileList:o.value,"onUpdate:fileList":i[8]||(i[8]=t=>o.value=t),onChange:r,onRemove:g},null,8,["fileList"]),h(n,{ref_key:"uploadRef",ref:E,accept:"application/pdf",tip:"Only PDF","before-upload":m,fileList:c.value,"onUpdate:fileList":i[9]||(i[9]=t=>c.value=t),onChange:r,onRemove:g},null,8,["fileList"])]),_:1}),i[44]||(i[44]=p("",2)),h(n,{multiple:"","upload-mode":"custom","custom-request":A,fileList:k.value,"onUpdate:fileList":i[10]||(i[10]=t=>k.value=t),onChange:r,onRemove:g},null,8,["fileList"]),i[45]||(i[45]=p("",3)),s("table",L,[i[31]||(i[31]=s("thead",null,[s("tr",null,[s("th",{style:{"text-align":"left"}},"参数"),s("th",{style:{"text-align":"left"}},"说明"),s("th",{style:{"text-align":"left"}},"类型"),s("th",{style:{"text-align":"left"}},"默认值")])],-1)),s("tbody",null,[i[16]||(i[16]=s("tr",null,[s("td",{style:{"text-align":"left"}},"accept"),s("td",{style:{"text-align":"left"}},[a("接受上传的文件类型，与"),s("code",null,'<input type="file" />'),a("的 "),s("code",null,"accept"),a(" 属性一致，参考 "),s("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/accept",target:"_blank",rel:"noreferrer"},"input accept Attribute")]),s("td",{style:{"text-align":"left"}},"string"),s("td",{style:{"text-align":"left"}},"'*'")],-1)),i[17]||(i[17]=s("tr",null,[s("td",{style:{"text-align":"left"}},"multiple"),s("td",{style:{"text-align":"left"}},"是否支持多选文件，开启后可选择多个文件"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"false")],-1)),i[18]||(i[18]=s("tr",null,[s("td",{style:{"text-align":"left"}},"maxCount"),s("td",{style:{"text-align":"left"}},[a("限制上传数量。当为 "),s("code",null,"1"),a(" 时，始终用最新上传的文件代替当前文件")]),s("td",{style:{"text-align":"left"}},"number"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),i[19]||(i[19]=s("tr",null,[s("td",{style:{"text-align":"left"}},"tip"),s("td",{style:{"text-align":"left"}},"上传描述文字"),s("td",{style:{"text-align":"left"}},"string"),s("td",{style:{"text-align":"left"}},"'Upload'")],-1)),i[20]||(i[20]=s("tr",null,[s("td",{style:{"text-align":"left"}},"fit"),s("td",{style:{"text-align":"left"}},[a("预览图片缩放规则，参考 "),s("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit",target:"_blank",rel:"noreferrer"},"object-fit"),a("，仅当上传文件为图片时生效")]),s("td",{style:{"text-align":"left"}},"'fill' | 'contain' | 'cover' | 'none' | 'scale-down'"),s("td",{style:{"text-align":"left"}},"'contain'")],-1)),i[21]||(i[21]=s("tr",null,[s("td",{style:{"text-align":"left"}},"draggable"),s("td",{style:{"text-align":"left"}},"是否支持拖拽上传，开启后可拖拽文件到选择框上传"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"true")],-1)),i[22]||(i[22]=s("tr",null,[s("td",{style:{"text-align":"left"}},"disabled"),s("td",{style:{"text-align":"left"}},"是否禁用，只能预览，不能删除和上传"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"false")],-1)),i[23]||(i[23]=s("tr",null,[s("td",{style:{"text-align":"left"}},"spaceProps"),s("td",{style:{"text-align":"left"}},[s("code",null,"Space"),a(" 组件属性配置，参考 "),s("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/space.html#space",target:"_blank",rel:"noreferrer"},"Space Props"),a("，用于配置多个文件时的排列方式")]),s("td",{style:{"text-align":"left"}},"object"),s("td",{style:{"text-align":"left"}},"{}")],-1)),i[24]||(i[24]=s("tr",null,[s("td",{style:{"text-align":"left"}},"spinProps"),s("td",{style:{"text-align":"left"}},[s("code",null,"Spin"),a(" 组件属性配置，参考 "),s("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/spin.html#spin",target:"_blank",rel:"noreferrer"},"Spin Props"),a("，用于配置上传中样式")]),s("td",{style:{"text-align":"left"}},"object"),s("td",{style:{"text-align":"left"}},"{}")],-1)),i[25]||(i[25]=s("tr",null,[s("td",{style:{"text-align":"left"}},"imageProps"),s("td",{style:{"text-align":"left"}},[s("code",null,"Image"),a(" 组件属性配置，参考 "),s("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/image.html#image",target:"_blank",rel:"noreferrer"},"Image Props"),a("，用于配置图片预览")]),s("td",{style:{"text-align":"left"}},"object"),s("td",{style:{"text-align":"left"}},"{}")],-1)),i[26]||(i[26]=s("tr",null,[s("td",{style:{"text-align":"left"}},"messageProps"),s("td",{style:{"text-align":"left"}},[s("code",null,"Message"),a(" 组件属性配置，参考 "),s("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/message.html#message",target:"_blank",rel:"noreferrer"},"Message Props"),a("，用于配置操作消息提示")]),s("td",{style:{"text-align":"left"}},"object"),s("td",{style:{"text-align":"left"}},"{}")],-1)),i[27]||(i[27]=s("tr",null,[s("td",{style:{"text-align":"left"}},"actionMessage"),s("td",{style:{"text-align":"left"}},[a("操作成功的消息提示，传 "),s("code",null,"{}"),a(" 即可不显示任何消息提示")]),s("td",{style:{"text-align":"left"}},[s("a",{href:"#messagetype-type"},"MessageType")]),s("td",{style:{"text-align":"left"}},"{ upload: '上传成功', remove: '删除成功' }")],-1)),i[28]||(i[28]=s("tr",null,[s("td",{style:{"text-align":"left"}},"beforeUpload"),s("td",{style:{"text-align":"left"}},[a("上传文件之前的钩子，参数为上传的文件，返回 "),s("code",null,"false"),a(" 则停止上传，返回 "),s("code",null,"true"),a(" 开始上传；支持返回一个 "),s("code",null,"Promise"),a(" 对象（如服务端校验等），"),s("code",null,"Promise"),a(" 对象 "),s("code",null,"reject"),a(" 时停止上传，"),s("code",null,"resolve"),a(" 时开始上传；通常用来校验用户上传的文件格式和大小")]),s("td",{style:{"text-align":"left"}},"Function"),s("td",{style:{"text-align":"left"}},"() => true")],-1)),i[29]||(i[29]=s("tr",null,[s("td",{style:{"text-align":"left"}},"uploadMode"),s("td",{style:{"text-align":"left"}},[a("上传文件的方式，可选 "),s("code",null,"'base64'"),a(" | "),s("code",null,"'custom'")]),s("td",{style:{"text-align":"left"}},"'base64' | 'custom'"),s("td",{style:{"text-align":"left"}},"'base64'")],-1)),i[30]||(i[30]=s("tr",null,[s("td",{style:{"text-align":"left"}},"customRequest"),s("td",{style:{"text-align":"left"}},[a("自定义上传行为，只有 "),s("code",null,"uploadMode: custom"),a(" 时，才会使用 "),s("code",null,"customRequest"),a(" 自定义上传行为")]),s("td",{style:{"text-align":"left"}},"Function"),s("td",{style:{"text-align":"left"}},"() => {}")],-1)),s("tr",null,[s("td",U,[i[12]||(i[12]=a("fileList ")),h(x,{color:"cyan"},{default:f(()=>i[11]||(i[11]=[a("v-model")])),_:1})]),i[13]||(i[13]=s("td",{style:{"text-align":"left"}},"已上传的文件列表",-1)),i[14]||(i[14]=s("td",{style:{"text-align":"left"}},[s("a",{href:"#filetype-type"},"FileType"),a("[]")],-1)),i[15]||(i[15]=s("td",{style:{"text-align":"left"}},"[]",-1))])])]),i[46]||(i[46]=p("",10))])}}});export{S as __pageData,j as default};
