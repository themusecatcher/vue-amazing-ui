import{a2 as S}from"./chunks/theme.CesfPw8X.js";import{d as x,p as e,s as V,C as d,c as _,o as T,j as i,G as h,a5 as k,a as l,w as r,N as P}from"./chunks/framework.Bnu6xMP_.js";const w={tabindex:"0"},O={style:{"text-align":"left"}},U=JSON.parse('{"title":"选择器 Select","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/select.md","filePath":"guide/components/select.md","lastUpdated":1741835115000}'),z={name:"guide/components/select.md"},G=x({...z,setup(I){const p=e([{label:"北京市",value:1},{label:"上海市",value:2},{label:"纽约市",value:3},{label:"旧金山",value:4},{label:"布宜诺斯艾利斯",value:5},{label:"伊斯坦布尔",value:6},{label:"拜占庭",value:7},{label:"君士坦丁堡",value:8}]),u=e([{label:"北京市",value:1},{label:"上海市",value:2,disabled:!0},{label:"纽约市",value:3},{label:"旧金山",value:4},{label:"布宜诺斯艾利斯",value:5},{label:"伊斯坦布尔",value:6},{label:"拜占庭",value:7},{label:"君士坦丁堡",value:8}]),B=e([{name:"北京市",id:1},{name:"上海市",id:2},{name:"纽约市",id:3},{name:"旧金山",id:4},{name:"布宜诺斯艾利斯",id:5},{name:"伊斯坦布尔",id:6},{name:"拜占庭",id:7},{name:"君士坦丁堡",id:8}]),m=[{label:"small",value:"small"},{label:"middle",value:"middle"},{label:"large",value:"large"}],g=e("large"),n=e(5),o=e("#ff6900"),c=e("rgba(255, 116, 32, 0.1)");V(()=>{console.log("selectedValue",n.value)});function v(E){const s=S(E);return{"--select-primary-color-hover":s[4],"--select-primary-color-focus":s[4],"--select-primary-shadow-color":c.value,"--select-item-bg-color-active":s[0]}}function f(E,s,y){console.log("value",E),console.log("label",s),console.log("index",y)}function A(E){console.log("openChange",E)}function b(E,s){return s.value>E}return(E,s)=>{const y=d("GlobalElement"),t=d("Select",!0),D=d("Radio"),F=d("Space"),C=d("ColorPicker"),q=d("Tag");return T(),_("div",null,[s[37]||(s[37]=i("h1",{id:"选择器-select",tabindex:"-1"},[l("选择器 Select "),i("a",{class:"header-anchor",href:"#选择器-select","aria-label":'Permalink to "选择器 Select"'},"​")],-1)),h(y),s[38]||(s[38]=k("",4)),h(t,{options:p.value,modelValue:n.value,"onUpdate:modelValue":s[0]||(s[0]=a=>n.value=a),onChange:f,onOpenChange:A},null,8,["options","modelValue"]),s[39]||(s[39]=k("",2)),h(t,{options:p.value,modelValue:n.value,"onUpdate:modelValue":s[1]||(s[1]=a=>n.value=a),disabled:""},null,8,["options","modelValue"]),s[40]||(s[40]=k("",2)),h(t,{options:u.value,modelValue:n.value,"onUpdate:modelValue":s[2]||(s[2]=a=>n.value=a)},null,8,["options","modelValue"]),s[41]||(s[41]=k("",2)),h(t,{options:B.value,label:"name",value:"id",modelValue:n.value,"onUpdate:modelValue":s[3]||(s[3]=a=>n.value=a)},null,8,["options","modelValue"]),s[42]||(s[42]=k("",2)),h(t,{width:150,height:36,options:p.value,modelValue:n.value,"onUpdate:modelValue":s[4]||(s[4]=a=>n.value=a)},null,8,["options","modelValue"]),s[43]||(s[43]=k("",2)),h(F,{vertical:""},{default:r(()=>[h(D,{options:m,value:g.value,"onUpdate:value":s[5]||(s[5]=a=>g.value=a),button:"","button-style":"solid"},null,8,["value"]),h(t,{options:p.value,modelValue:n.value,"onUpdate:modelValue":s[6]||(s[6]=a=>n.value=a),size:g.value},null,8,["options","modelValue","size"]),h(t,{options:p.value,search:"",allowClear:"",modelValue:n.value,"onUpdate:modelValue":s[7]||(s[7]=a=>n.value=a),size:g.value},null,8,["options","modelValue","size"])]),_:1}),s[44]||(s[44]=k("",2)),h(t,{options:p.value,"allow-clear":"",modelValue:n.value,"onUpdate:modelValue":s[8]||(s[8]=a=>n.value=a)},null,8,["options","modelValue"]),s[45]||(s[45]=k("",2)),h(t,{options:p.value,"allow-clear":"",search:"",modelValue:n.value,"onUpdate:modelValue":s[9]||(s[9]=a=>n.value=a)},null,8,["options","modelValue"]),s[46]||(s[46]=k("",2)),h(t,{options:p.value,search:"",filter:b,modelValue:n.value,"onUpdate:modelValue":s[10]||(s[10]=a=>n.value=a)},null,8,["options","modelValue"]),s[47]||(s[47]=k("",2)),h(t,{options:p.value,"max-display":5,modelValue:n.value,"onUpdate:modelValue":s[11]||(s[11]=a=>n.value=a)},null,8,["options","modelValue"]),s[48]||(s[48]=k("",2)),h(t,{options:p.value,modelValue:n.value,"onUpdate:modelValue":s[12]||(s[12]=a=>n.value=a),"scrollbar-props":{size:8,delay:2e3}},null,8,["options","modelValue"]),s[49]||(s[49]=k("",2)),h(F,{vertical:""},{default:r(()=>[h(F,{align:"center"},{default:r(()=>[s[16]||(s[16]=l(" primaryColor:")),h(C,{style:{width:"200px"},value:o.value,"onUpdate:value":s[13]||(s[13]=a=>o.value=a)},null,8,["value"])]),_:1}),h(F,{align:"center"},{default:r(()=>[s[17]||(s[17]=l(" primaryShadowColor:")),h(C,{style:{width:"200px"},value:c.value,"onUpdate:value":s[14]||(s[14]=a=>c.value=a)},null,8,["value"])]),_:1}),h(t,{style:P(v(o.value)),search:"",options:p.value,modelValue:n.value,"onUpdate:modelValue":s[15]||(s[15]=a=>n.value=a)},null,8,["style","options","modelValue"])]),_:1}),s[50]||(s[50]=k("",3)),i("table",w,[s[36]||(s[36]=i("thead",null,[i("tr",null,[i("th",{style:{"text-align":"left"}},"参数"),i("th",{style:{"text-align":"left"}},"说明"),i("th",{style:{"text-align":"left"}},"类型"),i("th",{style:{"text-align":"left"}},"默认值")])],-1)),i("tbody",null,[s[23]||(s[23]=i("tr",null,[i("td",{style:{"text-align":"left"}},"options"),i("td",{style:{"text-align":"left"}},"选项数据"),i("td",{style:{"text-align":"left"}},[i("a",{href:"#option-type"},"Option"),l("[]")]),i("td",{style:{"text-align":"left"}},"[]")],-1)),s[24]||(s[24]=i("tr",null,[i("td",{style:{"text-align":"left"}},"label"),i("td",{style:{"text-align":"left"}},[l("选项的 "),i("code",null,"label"),l(" 文本字段名")]),i("td",{style:{"text-align":"left"}},"string"),i("td",{style:{"text-align":"left"}},"'label'")],-1)),s[25]||(s[25]=i("tr",null,[i("td",{style:{"text-align":"left"}},"value"),i("td",{style:{"text-align":"left"}},[l("选项的 "),i("code",null,"value"),l(" 值字段名")]),i("td",{style:{"text-align":"left"}},"string"),i("td",{style:{"text-align":"left"}},"'value'")],-1)),s[26]||(s[26]=i("tr",null,[i("td",{style:{"text-align":"left"}},"placeholder"),i("td",{style:{"text-align":"left"}},"默认占位文本"),i("td",{style:{"text-align":"left"}},"string"),i("td",{style:{"text-align":"left"}},"'请选择'")],-1)),s[27]||(s[27]=i("tr",null,[i("td",{style:{"text-align":"left"}},"disabled"),i("td",{style:{"text-align":"left"}},"是否禁用"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[28]||(s[28]=i("tr",null,[i("td",{style:{"text-align":"left"}},"width"),i("td",{style:{"text-align":"left"}},[l("选择器宽度，单位 "),i("code",null,"px")]),i("td",{style:{"text-align":"left"}},"string | number"),i("td",{style:{"text-align":"left"}},"'auto'")],-1)),s[29]||(s[29]=i("tr",null,[i("td",{style:{"text-align":"left"}},"height"),i("td",{style:{"text-align":"left"}},[l("选择器高度，单位 "),i("code",null,"px")]),i("td",{style:{"text-align":"left"}},"number"),i("td",{style:{"text-align":"left"}},"undefined")],-1)),s[30]||(s[30]=i("tr",null,[i("td",{style:{"text-align":"left"}},"size"),i("td",{style:{"text-align":"left"}},"选择器大小"),i("td",{style:{"text-align":"left"}},"'small' | 'middle' | 'large'"),i("td",{style:{"text-align":"left"}},"'middle'")],-1)),s[31]||(s[31]=i("tr",null,[i("td",{style:{"text-align":"left"}},"allowClear"),i("td",{style:{"text-align":"left"}},"是否支持清除"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[32]||(s[32]=i("tr",null,[i("td",{style:{"text-align":"left"}},"search"),i("td",{style:{"text-align":"left"}},"是否支持搜索"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[33]||(s[33]=i("tr",null,[i("td",{style:{"text-align":"left"}},"filter"),i("td",{style:{"text-align":"left"}},[l("过滤条件函数，仅当支持搜索时生效，根据输入项进行筛选："),i("li",null,[l("默认为 "),i("code",null,"true"),l(" 时，筛选每个选项的文本字段 "),i("code",null,"label"),l(" 是否包含输入项，包含时返回 "),i("code",null,"true"),l("，反之返回 "),i("code",null,"false")]),i("li",null,[l("当其为函数 "),i("code",null,"Function"),l(" 时，接受 "),i("code",null,"inputValue"),l(),i("code",null,"option"),l(" 两个参数，当 "),i("code",null,"option"),l(" 符合筛选条件时，应返回 "),i("code",null,"true"),l("，反之则返回 "),i("code",null,"false")])]),i("td",{style:{"text-align":"left"}},"Function | true"),i("td",{style:{"text-align":"left"}},"true")],-1)),s[34]||(s[34]=i("tr",null,[i("td",{style:{"text-align":"left"}},"scrollbarProps"),i("td",{style:{"text-align":"left"}},[l("下拉面板滚动条 "),i("code",null,"scrollbar"),l(" 组件属性配置，参考 "),i("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html#scrollbar",target:"_blank",rel:"noreferrer"},"Scrollbar Props")]),i("td",{style:{"text-align":"left"}},"object"),i("td",{style:{"text-align":"left"}},"{}")],-1)),s[35]||(s[35]=i("tr",null,[i("td",{style:{"text-align":"left"}},"maxDisplay"),i("td",{style:{"text-align":"left"}},"下拉面板最多能展示的下拉项数，超过后滚动显示"),i("td",{style:{"text-align":"left"}},"number"),i("td",{style:{"text-align":"left"}},"6")],-1)),i("tr",null,[i("td",O,[s[19]||(s[19]=l("modelValue ")),h(q,{color:"cyan"},{default:r(()=>s[18]||(s[18]=[l("v-model")])),_:1})]),s[20]||(s[20]=i("td",{style:{"text-align":"left"}},[l("当前选中的 "),i("code",null,"option"),l(" 条目值")],-1)),s[21]||(s[21]=i("td",{style:{"text-align":"left"}},"number | string",-1)),s[22]||(s[22]=i("td",{style:{"text-align":"left"}},"undefined",-1))])])]),s[51]||(s[51]=k("",4))])}}});export{U as __pageData,G as default};
