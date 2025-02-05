import{p as T}from"./chunks/package.Q7sa2rEW.js";import{k as d,l as M,m as S,n as P,o as H,s as A,p as v,q as I,r as O,t as q,u as R,v as N}from"./chunks/theme.CXYGFNtC.js";import{d as U,p as k,s as e,C as g,c as Y,o as W,j as i,G as t,a5 as n,a as h,w as y,t as w,k as B}from"./chunks/framework.D_rhKk2H.js";const G={id:"日期选择-datepicker-pkg-dependencies-vuepic-vue-datepicker",tabindex:"-1"},j={tabindex:"0"},z={style:{"text-align":"left"}},$=JSON.parse(`{"title":"日期选择 DatePicker{{ pkg.dependencies['@vuepic/vue-datepicker'] }}","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/datepicker.md","filePath":"guide/components/datepicker.md","lastUpdated":1735180868000}`),L={name:"guide/components/datepicker.md"},ss=U({...L,setup(J){const p=k(d(new Date,"yyyy-MM-dd")),F=k(d(new Date,"yyyy-MM-dd HH:mm:ss")),E=k([d(new Date,"yyyy-MM-dd"),d(M(new Date,1),"yyyy-MM-dd")]),o=k([{hours:new Date().getHours(),minutes:new Date().getMinutes(),seconds:new Date().getSeconds()},{hours:H(Date.now(),1).getHours(),minutes:P(Date.now(),10).getMinutes(),seconds:S(Date.now(),30).getSeconds()}]),b=k([{label:"Today",value:[new Date,new Date]},{label:"This month",value:[A(new Date),v(new Date)]},{label:"Last month",value:[A(q(new Date,1)),v(q(new Date,1))]},{label:"This year",value:[I(new Date).getTime(),O(new Date).getTime()]}]),u=k({hours:new Date().getHours(),minutes:new Date().getMinutes()}),c=k({hours:new Date().getHours(),minutes:new Date().getMinutes(),seconds:new Date().getSeconds()}),f={weekStartsOn:1},r=k([R(new Date,f),N(new Date,f)]),C=k({year:new Date().getFullYear(),month:new Date().getMonth()}),m=k(new Date().getFullYear());return e(()=>{console.log("dateValue",p.value)}),e(()=>{console.log("dateTimeValue",F.value)}),e(()=>{console.log("rangeValue",E.value)}),e(()=>{console.log("timeRangeValue",o.value)}),e(()=>{console.log("timeValue",u.value)}),e(()=>{console.log("secondsValue",c.value)}),e(()=>{console.log("weekValue",r.value)}),e(()=>{console.log("monthValue",C.value)}),e(()=>{console.log("yearValue",m.value)}),(K,s)=>{const D=g("Tag"),V=g("GlobalElement"),l=g("DatePicker"),x=g("GradientText"),_=g("Space");return W(),Y("div",null,[i("h1",G,[s[13]||(s[13]=h("日期选择 DatePicker")),t(D,{color:"volcano",style:{"vertical-align":"top","margin-left":"6px"}},{default:y(()=>[h(w(B(T).dependencies["@vuepic/vue-datepicker"]),1)]),_:1}),s[14]||(s[14]=h()),s[15]||(s[15]=i("a",{class:"header-anchor",href:"#日期选择-datepicker-pkg-dependencies-vuepic-vue-datepicker","aria-label":`Permalink to "日期选择 DatePicker<Tag color="volcano" style="vertical-align: top; margin-left: 6px;">{{ pkg.dependencies['@vuepic/vue-datepicker'] }}</Tag>"`},"​",-1))]),t(V),s[28]||(s[28]=n("",6)),t(l,{placeholder:"请选择日期",format:"yyyy-MM-dd",modelValue:p.value,"onUpdate:modelValue":s[0]||(s[0]=a=>p.value=a)},null,8,["modelValue"]),s[29]||(s[29]=n("",2)),t(l,{placeholder:"请选择日期","min-date":new Date,format:"yyyy-MM-dd",modelValue:p.value,"onUpdate:modelValue":s[1]||(s[1]=a=>p.value=a)},null,8,["min-date","modelValue"]),s[30]||(s[30]=n("",2)),t(l,{placeholder:"请选择日期",mode:"date","max-date":new Date,format:"yyyy-MM-dd",modelValue:p.value,"onUpdate:modelValue":s[2]||(s[2]=a=>p.value=a)},null,8,["max-date","modelValue"]),s[31]||(s[31]=n("",2)),t(l,{placeholder:"请选择日期时间",mode:"date",format:"yyyy-MM-dd HH:mm:ss",width:240,"show-time":"","enable-seconds":"",modelValue:F.value,"onUpdate:modelValue":s[3]||(s[3]=a=>F.value=a)},null,8,["modelValue"]),s[32]||(s[32]=n("",2)),t(l,{placeholder:"请选择日期范围",range:"",format:"yyyy-MM-dd",width:280,modelValue:E.value,"onUpdate:modelValue":s[4]||(s[4]=a=>E.value=a)},null,8,["modelValue"]),s[33]||(s[33]=n("",2)),t(l,{placeholder:"请选择日期范围",mode:"range",format:"yyyy-MM-dd",width:280,range:"","multi-calendars":"",modelValue:E.value,"onUpdate:modelValue":s[5]||(s[5]=a=>E.value=a)},null,8,["modelValue"]),s[34]||(s[34]=n("",4)),t(l,{placeholder:"请选择日期范围",mode:"range",format:"yyyy-MM-dd",width:280,range:"","preset-dates":b.value,"multi-calendars":"",modelValue:E.value,"onUpdate:modelValue":s[6]||(s[6]=a=>E.value=a)},null,8,["preset-dates","modelValue"]),s[35]||(s[35]=n("",2)),t(l,{placeholder:"请选择时间",mode:"time","show-time":"","mode-height":"120",format:"HH:mm",width:120,modelValue:u.value,"onUpdate:modelValue":s[7]||(s[7]=a=>u.value=a)},null,8,["modelValue"]),s[36]||(s[36]=n("",2)),t(l,{placeholder:"请选择时间",mode:"time","show-time":"","enable-seconds":"","mode-height":"120",format:"HH:mm:ss",width:150,modelValue:c.value,"onUpdate:modelValue":s[8]||(s[8]=a=>c.value=a)},null,8,["modelValue"]),s[37]||(s[37]=n("",2)),t(l,{placeholder:"请选择时间",mode:"time","show-time":"",range:"","enable-seconds":"","mode-height":"120",format:"HH:mm:ss",width:240,modelValue:o.value,"onUpdate:modelValue":s[9]||(s[9]=a=>o.value=a)},null,8,["modelValue"]),s[38]||(s[38]=n("",2)),t(_,{vertical:""},{default:y(()=>[t(x,{size:24,weight:600,gradient:{deg:"90deg",from:"#09c8ce",to:"#eb2f96"}},{default:y(()=>[h(w(B(d)(r.value[0],"yyyy-MM-dd")+" ~ "+B(d)(r.value[1],"yyyy-MM-dd")),1)]),_:1}),t(l,{placeholder:"请选择周",modelValue:r.value,"onUpdate:modelValue":s[10]||(s[10]=a=>r.value=a),mode:"week",format:"yyyy年 第ww周",width:200},null,8,["modelValue"])]),_:1}),s[39]||(s[39]=n("",2)),t(l,{placeholder:"请选择月",mode:"month",format:"yyyy-MM",width:150,modelValue:C.value,"onUpdate:modelValue":s[11]||(s[11]=a=>C.value=a)},null,8,["modelValue"]),s[40]||(s[40]=n("",2)),t(l,{placeholder:"请选择年",mode:"year",format:"yyyy",width:120,modelValue:m.value,"onUpdate:modelValue":s[12]||(s[12]=a=>m.value=a)},null,8,["modelValue"]),s[41]||(s[41]=n("",5)),i("table",j,[s[27]||(s[27]=i("thead",null,[i("tr",null,[i("th",{style:{"text-align":"left"}},"参数"),i("th",{style:{"text-align":"left"}},"说明"),i("th",{style:{"text-align":"left"}},"类型"),i("th",{style:{"text-align":"left"}},"默认值")])],-1)),i("tbody",null,[s[21]||(s[21]=i("tr",null,[i("td",{style:{"text-align":"left"}},"width"),i("td",{style:{"text-align":"left"}},[h("日期选择器宽度，单位 "),i("code",null,"px")]),i("td",{style:{"text-align":"left"}},"number"),i("td",{style:{"text-align":"left"}},"180")],-1)),s[22]||(s[22]=i("tr",null,[i("td",{style:{"text-align":"left"}},"mode"),i("td",{style:{"text-align":"left"}},"选择器模式"),i("td",{style:{"text-align":"left"}},"'time' | 'date' | 'week' | 'month' | 'year'"),i("td",{style:{"text-align":"left"}},"'date'")],-1)),s[23]||(s[23]=i("tr",null,[i("td",{style:{"text-align":"left"}},[i("a",{href:"#format-支持的格式化占位符列表"},"format")]),i("td",{style:{"text-align":"left"}},"日期展示格式"),i("td",{style:{"text-align":"left"}},"string | ((date: Date) => string) | ((dates: Date[]) => string)"),i("td",{style:{"text-align":"left"}},[i("a",{href:"#defaultformat-value"},"DefaultFormat")])],-1)),s[24]||(s[24]=i("tr",null,[i("td",{style:{"text-align":"left"}},"showTime"),i("td",{style:{"text-align":"left"}},"是否增加时间选择"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),s[25]||(s[25]=i("tr",null,[i("td",{style:{"text-align":"left"}},"showToday"),i("td",{style:{"text-align":"left"}},"是否展示”今天“按钮"),i("td",{style:{"text-align":"left"}},"boolean"),i("td",{style:{"text-align":"left"}},"false")],-1)),i("tr",null,[i("td",z,[s[17]||(s[17]=h("modelValue ")),t(D,{color:"cyan"},{default:y(()=>s[16]||(s[16]=[h("v-model")])),_:1})]),s[18]||(s[18]=i("td",{style:{"text-align":"left"}},"双向绑定值",-1)),s[19]||(s[19]=i("td",{style:{"text-align":"left"}},"number | string | object | array",-1)),s[20]||(s[20]=i("td",{style:{"text-align":"left"}},"null",-1))]),s[26]||(s[26]=i("tr",null,[i("td",{style:{"text-align":"left"}},"modelType"),i("td",{style:{"text-align":"left"}},[i("code",null,"v-model"),h(" 值类型，可选 "),i("code",null,"timestamp"),h(": 时间戳、"),i("code",null,"format"),h(": 字符串，"),i("code",null,"mode"),h(" 为 "),i("code",null,"week"),h(" 或 "),i("code",null,"year"),h(" 时，该配置不生效")]),i("td",{style:{"text-align":"left"}},"'timestamp' | 'format'"),i("td",{style:{"text-align":"left"}},"'format'")],-1))])]),s[42]||(s[42]=n("",4))])}}});export{$ as __pageData,ss as default};
