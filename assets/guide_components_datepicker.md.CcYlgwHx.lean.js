import{p as P}from"./chunks/package.93Bp7TZ5.js";import{h as d,j as H,n as I,o as O,p as R,q as b,r as w,t as N,u as U,v as V,w as z,x as Y}from"./chunks/theme.CED_SsHt.js";import{d as W,p,s as e,C as r,c as G,o as j,j as i,G as t,a5 as l,a as h,w as y,t as x,k as f}from"./chunks/framework.Da-Rsspo.js";const L={id:"日期选择-datepicker-pkg-dependencies-vuepic-vue-datepicker",tabindex:"-1"},J={tabindex:"0"},K={style:{"text-align":"left"}},as=JSON.parse(`{"title":"日期选择 DatePicker{{ pkg.dependencies['@vuepic/vue-datepicker'] }}","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/datepicker.md","filePath":"guide/components/datepicker.md","lastUpdated":1739438087000}`),Q={name:"guide/components/datepicker.md"},ts=W({...Q,setup(X){const k=p(d(new Date,"yyyy-MM-dd")),F=p(d(new Date,"yyyy-MM-dd HH:mm:ss")),E=p([d(new Date,"yyyy-MM-dd"),d(H(new Date,1),"yyyy-MM-dd")]),o=p([{hours:new Date().getHours(),minutes:new Date().getMinutes(),seconds:new Date().getSeconds()},{hours:R(Date.now(),1).getHours(),minutes:O(Date.now(),10).getMinutes(),seconds:I(Date.now(),30).getSeconds()}]),D=p([{label:"Today",value:[new Date,new Date]},{label:"This month",value:[b(new Date),w(new Date)]},{label:"Last month",value:[b(V(new Date,1)),w(V(new Date,1))]},{label:"This year",value:[N(new Date).getTime(),U(new Date).getTime()]}]),u=p({hours:new Date().getHours(),minutes:new Date().getMinutes()}),C=p({hours:new Date().getHours(),minutes:new Date().getMinutes(),seconds:new Date().getSeconds()}),A={weekStartsOn:1},g=p([z(new Date,A),Y(new Date,A)]),c=p({year:new Date().getFullYear(),month:new Date().getMonth()}),m=p(new Date().getFullYear()),_=[{label:"small",value:"small"},{label:"middle",value:"middle"},{label:"large",value:"large"}],B=p("middle");return e(()=>{console.log("dateValue",k.value)}),e(()=>{console.log("dateTimeValue",F.value)}),e(()=>{console.log("rangeValue",E.value)}),e(()=>{console.log("timeRangeValue",o.value)}),e(()=>{console.log("timeValue",u.value)}),e(()=>{console.log("secondsValue",C.value)}),e(()=>{console.log("weekValue",g.value)}),e(()=>{console.log("monthValue",c.value)}),e(()=>{console.log("yearValue",m.value)}),(Z,s)=>{const v=r("Tag"),T=r("GlobalElement"),n=r("DatePicker"),M=r("Radio"),q=r("Space"),S=r("GradientText");return j(),G("div",null,[i("h1",L,[s[16]||(s[16]=h("日期选择 DatePicker")),t(v,{color:"volcano",style:{"vertical-align":"top","margin-left":"6px"}},{default:y(()=>[h(x(f(P).dependencies["@vuepic/vue-datepicker"]),1)]),_:1}),s[17]||(s[17]=h()),s[18]||(s[18]=i("a",{class:"header-anchor",href:"#日期选择-datepicker-pkg-dependencies-vuepic-vue-datepicker","aria-label":`Permalink to "日期选择 DatePicker<Tag color="volcano" style="vertical-align: top; margin-left: 6px;">{{ pkg.dependencies['@vuepic/vue-datepicker'] }}</Tag>"`},"​",-1))]),t(T),s[32]||(s[32]=l("",6)),t(n,{modelValue:k.value,"onUpdate:modelValue":s[0]||(s[0]=a=>k.value=a),format:"yyyy-MM-dd",placeholder:"请选择日期"},null,8,["modelValue"]),s[33]||(s[33]=l("",2)),t(q,{vertical:""},{default:y(()=>[t(M,{options:_,value:B.value,"onUpdate:value":s[1]||(s[1]=a=>B.value=a),button:"","button-style":"solid"},null,8,["value"]),t(n,{size:B.value,modelValue:k.value,"onUpdate:modelValue":s[2]||(s[2]=a=>k.value=a),format:"yyyy-MM-dd",placeholder:"请选择日期"},null,8,["size","modelValue"])]),_:1}),s[34]||(s[34]=l("",2)),t(n,{disabled:"",modelValue:k.value,"onUpdate:modelValue":s[3]||(s[3]=a=>k.value=a),format:"yyyy-MM-dd",placeholder:"请选择日期"},null,8,["modelValue"]),s[35]||(s[35]=l("",4)),t(n,{modelValue:k.value,"onUpdate:modelValue":s[4]||(s[4]=a=>k.value=a),"min-date":new Date,format:"yyyy-MM-dd",placeholder:"请选择日期"},null,8,["modelValue","min-date"]),s[36]||(s[36]=l("",3)),t(n,{modelValue:k.value,"onUpdate:modelValue":s[5]||(s[5]=a=>k.value=a),"max-date":new Date,format:"yyyy-MM-dd",placeholder:"请选择日期"},null,8,["modelValue","max-date"]),s[37]||(s[37]=l("",2)),t(n,{width:240,modelValue:F.value,"onUpdate:modelValue":s[6]||(s[6]=a=>F.value=a),format:"yyyy-MM-dd HH:mm:ss","show-time":"","enable-seconds":"",placeholder:"请选择日期时间"},null,8,["modelValue"]),s[38]||(s[38]=l("",2)),t(n,{width:280,modelValue:E.value,"onUpdate:modelValue":s[7]||(s[7]=a=>E.value=a),range:"","preset-dates":D.value,format:"yyyy-MM-dd",placeholder:"请选择日期范围"},null,8,["modelValue","preset-dates"]),s[39]||(s[39]=l("",2)),t(n,{width:280,modelValue:E.value,"onUpdate:modelValue":s[8]||(s[8]=a=>E.value=a),mode:"range",format:"yyyy-MM-dd",range:"","multi-calendars":"",placeholder:"请选择日期范围"},null,8,["modelValue"]),s[40]||(s[40]=l("",4)),t(n,{width:280,modelValue:E.value,"onUpdate:modelValue":s[9]||(s[9]=a=>E.value=a),mode:"range",format:"yyyy-MM-dd",range:"","preset-dates":D.value,"multi-calendars":"",placeholder:"请选择日期范围"},null,8,["modelValue","preset-dates"]),s[41]||(s[41]=l("",2)),t(n,{width:120,modelValue:u.value,"onUpdate:modelValue":s[10]||(s[10]=a=>u.value=a),mode:"time","show-time":"","mode-height":"120",format:"HH:mm",placeholder:"请选择时间"},null,8,["modelValue"]),s[42]||(s[42]=l("",2)),t(n,{width:150,modelValue:C.value,"onUpdate:modelValue":s[11]||(s[11]=a=>C.value=a),mode:"time",format:"HH:mm:ss","show-time":"","enable-seconds":"","mode-height":"120",placeholder:"请选择时间"},null,8,["modelValue"]),s[43]||(s[43]=l("",2)),t(n,{width:240,modelValue:o.value,"onUpdate:modelValue":s[12]||(s[12]=a=>o.value=a),mode:"time",format:"HH:mm:ss","show-time":"",range:"","enable-seconds":"","mode-height":"120",placeholder:"请选择时间"},null,8,["modelValue"]),s[44]||(s[44]=l("",2)),t(q,{vertical:""},{default:y(()=>[t(S,{size:24,weight:600,gradient:{deg:"90deg",from:"#09c8ce",to:"#eb2f96"}},{default:y(()=>[h(x(f(d)(g.value[0],"yyyy-MM-dd")+" ~ "+f(d)(g.value[1],"yyyy-MM-dd")),1)]),_:1}),t(n,{width:200,modelValue:g.value,"onUpdate:modelValue":s[13]||(s[13]=a=>g.value=a),mode:"week",format:"yyyy年 第ww周",placeholder:"请选择周"},null,8,["modelValue"])]),_:1}),s[45]||(s[45]=l("",2)),t(n,{width:150,modelValue:c.value,"onUpdate:modelValue":s[14]||(s[14]=a=>c.value=a),mode:"month",format:"yyyy-MM",placeholder:"请选择月"},null,8,["modelValue"]),s[46]||(s[46]=l("",2)),t(n,{width:120,modelValue:m.value,"onUpdate:modelValue":s[15]||(s[15]=a=>m.value=a),mode:"year",format:"yyyy",placeholder:"请选择年"},null,8,["modelValue"]),s[47]||(s[47]=l("",5)),i("table",J,[s[31]||(s[31]=i("thead",null,[i("tr",null,[i("th",{style:{"text-align":"left"}},"参数"),i("th",{style:{"text-align":"left"}},"说明"),i("th",{style:{"text-align":"left"}},"类型"),i("th",{style:{"text-align":"left"}},"默认值")])],-1)),i("tbody",null,[s[24]||(s[24]=i("tr",null,[i("td",{style:{"text-align":"left"}},"width"),i("td",{style:{"text-align":"left"}},[h("日期选择器宽度，单位 "),i("code",null,"px")]),i("td",{style:{"text-align":"left"}},"number"),i("td",{style:{"text-align":"left"}},"180")],-1)),s[25]||(s[25]=i("tr",null,[i("td",{style:{"text-align":"left"}},"size"),i("td",{style:{"text-align":"left"}},"日期选择器大小"),i("td",{style:{"text-align":"left"}},"'small' | 'middle' | 'large'"),i("td",{style:{"text-align":"left"}},"'middle'")],-1)),s[26]||(s[26]=i("tr",null,[i("td",{style:{"text-align":"left"}},"mode"),i("td",{style:{"text-align":"left"}},"选择器模式"),i("td",{style:{"text-align":"left"}},"'time' | 'date' | 'week' | 'month' | 'year'"),i("td",{style:{"text-align":"left"}},"'date'")],-1)),s[27]||(s[27]=i("tr",null,[i("td",{style:{"text-align":"left"}},[i("a",{href:"#format-支持的格式化占位符列表"},"format")]),i("td",{style:{"text-align":"left"}},"日期展示格式"),i("td",{style:{"text-align":"left"}},"string | ((date: Date) => string) | ((dates: Date[]) => string)"),i("td",{style:{"text-align":"left"}},[i("a",{href:"#defaultformat-value"},"DefaultFormat")])],-1)),s[28]||(s[28]=i("tr",null,[i("td",{style:{"text-align":"left"}},"showTime"),i("td",{style:{"text-align":"left"}},"是否增加时间选择"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[29]||(s[29]=i("tr",null,[i("td",{style:{"text-align":"left"}},"showToday"),i("td",{style:{"text-align":"left"}},"是否展示”今天“按钮"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),i("tr",null,[i("td",K,[s[20]||(s[20]=h("modelValue ")),t(v,{color:"cyan"},{default:y(()=>s[19]||(s[19]=[h("v-model")])),_:1})]),s[21]||(s[21]=i("td",{style:{"text-align":"left"}},"双向绑定值",-1)),s[22]||(s[22]=i("td",{style:{"text-align":"left"}},"number | string | object | array",-1)),s[23]||(s[23]=i("td",{style:{"text-align":"left"}},"null",-1))]),s[30]||(s[30]=i("tr",null,[i("td",{style:{"text-align":"left"}},"modelType"),i("td",{style:{"text-align":"left"}},[i("code",null,"v-model"),h(" 值类型，可选 "),i("code",null,"timestamp"),h(": 时间戳、"),i("code",null,"format"),h(": 字符串，"),i("code",null,"mode"),h(" 为 "),i("code",null,"week"),h(" 或 "),i("code",null,"year"),h(" 时，该配置不生效")]),i("td",{style:{"text-align":"left"}},"'timestamp' | 'format'"),i("td",{style:{"text-align":"left"}},"'format'")],-1))])]),s[48]||(s[48]=l("",4))])}}});export{as as __pageData,ts as default};
