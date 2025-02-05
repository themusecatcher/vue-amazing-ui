import{S as na,P as ss,a0 as is,a1 as ds}from"./chunks/theme.CXYGFNtC.js";import{d as ts,p,a4 as r,s as la,q as ns,aG as ls,C as o,c as E,o as h,j as s,G as i,a5 as v,a as l,w as n,e as y,t as b,F as A,b as D,k as P,a2 as hs,_ as ks}from"./chunks/framework.D_rhKk2H.js";const ps={key:0},Es={key:2},es={key:0},bs={key:2},vs={key:0},rs={key:2},gs={key:0},ys={key:0,href:"javascript:;"},Fs={key:0,class:"editable-cell"},os={key:0},cs=["onClick"],Cs={key:1},Bs=["onClick"],us={key:0},ms={key:0},As={key:0},Ds={key:0},xs={key:0},fs={tabindex:"0"},qs={style:{"text-align":"left"}},Ps=JSON.parse('{"title":"表格 Table","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/table.md","filePath":"guide/components/table.md","lastUpdated":1736235220000}'),Ss={name:"guide/components/table.md"},ws=ts({...Ss,setup(Is){const j=p(!1),L=p(!1),V=p(!0),z=p(!0),K=p(!0),W=p(!0),H=p(!0),O=p(!0),M=p(!0),U=p(!0),X=r({pageSize:10,page:1}),ha=[{label:"small",value:"small"},{label:"middle",value:"middle"},{label:"large",value:"large"}],$=p("middle"),ka=[{label:"left",value:"left"},{label:"center",value:"center"},{label:"right",value:"right"}],N=p("center"),pa=[{label:"Checkbox",value:"checkbox"},{label:"Radio",value:"radio"}],F=r({columnTitle:void 0,columnWidth:100,fixed:!0,hideSelectAll:!1,type:"checkbox",selectedRowKeys:["3"],onChange:(t,a)=>{console.log("onChange"),console.log("selectedRowKeys",t),console.log("selectedRows",a),F.selectedRowKeys=t},onSelect:(t,a,R,m)=>{console.log("onSelect"),console.log("record",t),console.log("selected",a),console.log("selectedRows",R),console.log("selectedRowKeys",m)},onSelectAll:(t,a,R,m,T)=>{console.log("onSelectAll"),console.log("selected",t),console.log("selectedRows",a),console.log("changeRows",R),console.log("selectedRowKeys",m),console.log("changeRowKeys",T)},getSelectionProps:t=>({disabled:t.key==="5",name:t.name})}),Ea=()=>{F.selectedRowKeys=[]};la(()=>{console.log("rowSelection.selectedRowKeys",F.selectedRowKeys)});const q=r([{title:"Name",width:100,dataIndex:"name",key:"name"},{title:"Age",width:60,dataIndex:"age"},{title:"Job",width:80,dataIndex:"job",key:"job"},{title:"Sex",width:60,dataIndex:"sex",key:"sex"},{title:"Address",width:120,dataIndex:"address"},{title:"Action",width:150,key:"action"}]),ea=r([{title:"Name",dataIndex:"name"},{title:"Age",dataIndex:"age",className:"age"},{title:"Job",dataIndex:"job"},{title:"Address",dataIndex:"address"}]),ba=r([{title:"Name",dataIndex:"name"},{title:"Age",dataIndex:"age"},{title:"Address",dataIndex:"address"}]),Z=r([{title:"Name",align:"center",dataIndex:"name"},{title:"Age",align:"center",dataIndex:"age"},{title:"Address",align:"center",dataIndex:"address"}]);ns(N,()=>{Z.forEach(t=>t.align=N.value)});const va=r([{title:"Name",dataIndex:"name"},{title:"Age",dataIndex:"age"},{title:"Job",dataIndex:"job"},{title:"Address",dataIndex:"address"}]),ra=r([{title:"Name",dataIndex:"name"},{title:"Age",dataIndex:"age",width:80},{title:"Address",dataIndex:"address",ellipsis:!0},{title:"Long Header Cell Long Header Cell",dataIndex:"address",ellipsis:!0},{title:"Long Header Cell",dataIndex:"address",ellipsis:!0},{title:"Long Header Cell",dataIndex:"address",ellipsis:!0}]),aa=(t,a)=>{if(a===4)return{colSpan:0}},ga=r([{title:"Name",dataIndex:"name",customCell:(t,a)=>({colSpan:a<4?1:5})},{title:"Age",dataIndex:"age",customCell:aa},{title:"Home phone",colSpan:2,dataIndex:"tel",customCell:(t,a)=>{if(a===2)return{rowSpan:2};if(a===3)return{rowSpan:0};if(a===4)return{colSpan:0}}},{title:"Phone",colSpan:0,dataIndex:"phone",customCell:(t,a)=>{if(a===1)return{rowSpan:3};if(a===2)return{rowSpan:0};if(a===3)return{rowSpan:0};if(a===4)return{colSpan:0}}},{title:"Address",dataIndex:"address",customCell:aa}]),ya=r([{title:"Name",dataIndex:"name",width:"30%"},{title:"Age",dataIndex:"age"},{title:"Address",dataIndex:"address"},{title:"Action",dataIndex:"action"}]),Fa=r([{title:"Name",dataIndex:"name",width:"25%"},{title:"Age",dataIndex:"age",width:"15%"},{title:"Address",dataIndex:"address",width:"40%"},{title:"Action",dataIndex:"action"}]),oa=r([{title:"Name",dataIndex:"name",key:"name"},{title:"Age",dataIndex:"age",key:"age"},{title:"Address",dataIndex:"address",key:"address"},{title:"Action",key:"action"}]),ca=r([{title:"Full Name",width:100,dataIndex:"name",key:"name",fixed:"left"},{title:"Age",width:100,dataIndex:"age",key:"age",fixed:"left"},{title:"Column 1",dataIndex:"address",key:"1"},{title:"Column 2",dataIndex:"address",key:"2"},{title:"Column 3",dataIndex:"address",key:"3"},{title:"Column 4",dataIndex:"address",key:"4"},{title:"Column 5",dataIndex:"address",key:"5"},{title:"Column 6",dataIndex:"address",key:"6"},{title:"Column 7",dataIndex:"address",key:"7"},{title:"Column 8",dataIndex:"address",key:"8"},{title:"Action",key:"action",fixed:"right",width:100}]),Ca=r([{title:"Name",dataIndex:"name"},{title:"Age",dataIndex:"age"},{title:"Address",dataIndex:"address"}]),Ba=r([{title:"Full Name",width:100,dataIndex:"name",key:"name",fixed:"left"},{title:"Age",width:100,dataIndex:"age",key:"age",fixed:"left"},{title:"Column 1",dataIndex:"address",key:"1",width:150},{title:"Column 2",dataIndex:"address",key:"2",width:150},{title:"Column 3",dataIndex:"address",key:"3",width:150},{title:"Column 4",dataIndex:"address",key:"4",width:150},{title:"Column 5",dataIndex:"address",key:"5",width:150},{title:"Column 6",dataIndex:"address",key:"6",width:150},{title:"Column 7",dataIndex:"address",key:"7",width:150},{title:"Column 8",dataIndex:"address",key:"8"},{title:"Action",key:"action",fixed:"right",width:100}]),ua=r([{title:"Full Name",width:100,dataIndex:"name",key:"name",fixed:"left"},{title:"Age",width:100,dataIndex:"age",key:"age",fixed:"left"},{title:"Column 1",dataIndex:"address",key:"1",width:150},{title:"Column 2",dataIndex:"address",key:"2",width:150},{title:"Column 3",dataIndex:"address",key:"3",width:150},{title:"Column 4",dataIndex:"address",key:"4",width:150},{title:"Column 5",dataIndex:"address",key:"5",width:150},{title:"Column 6",dataIndex:"address",key:"6",width:150},{title:"Column 7",dataIndex:"address",key:"7",width:150},{title:"Column 8",dataIndex:"address",key:"8"},{title:"Action",key:"action",fixed:"right",width:100}]),ma=r([{title:"Name",dataIndex:"name",key:"name",width:100,fixed:"left"},{title:"Other",children:[{title:"Age",dataIndex:"age",key:"age",width:200,sorter:(t,a)=>t.age-a.age},{title:"Address",children:[{title:"Street",dataIndex:"street",key:"street",width:200},{title:"Block",children:[{title:"Building",dataIndex:"building",key:"building",width:100},{title:"Door No.",dataIndex:"number",key:"number",width:100}]}]}]},{title:"Company",children:[{title:"Company Address",dataIndex:"companyAddress",key:"companyAddress",width:200},{title:"Company Name",dataIndex:"companyName",key:"companyName",width:200}]},{title:"Gender",dataIndex:"gender",key:"gender",width:80,fixed:"right"}]),Aa=r([{title:"Name",dataIndex:"name",sorter:(t,a)=>t.name.length-a.name.length,sortDirections:["descend"]},{title:"Age",dataIndex:"age",defaultSortOrder:"descend",sorter:(t,a)=>t.age-a.age},{title:"Address",dataIndex:"address",sorter:(t,a)=>t.address.length-a.address.length,sortDirections:["descend","ascend"]}]),Da=r([{title:"Name",dataIndex:"name"},{title:"Age",dataIndex:"age"},{title:"Address",dataIndex:"address"}]),S=p([{name:"Stephen Curry",age:30,job:"Player",sex:"boy",address:"Chase Center, San Francisco, California"},{name:"the Muse Catcher",age:24,job:"None",sex:"boy",address:"Beijing, China"},{name:"Wonder Woman",age:32,job:"Hero",sex:"girl",address:"Tel Aviv, Israel"},{name:"Superman",age:32,job:"Hero",sex:"boy",address:"United States"},{name:"Leo",age:36,job:"Actor",sex:"boy",address:"Los Angeles"}]),xa=p([{key:"1",name:"Stephen Curry",age:30,job:"Player",address:"Chase Center, GSW"},{key:"2",name:"the Muse Catcher",age:24,job:"None",address:"Beijing, China"},{key:"3",name:"Wonder Woman",age:32,job:"Hero",address:"Tel Aviv, Israel"}]),fa=(t,a)=>t.age>30?"older-row":a%2===1?"even-row":"",qa=p([{key:"1",name:"Stephen Curry",age:30,address:"Chase Center, GSW"},{key:"2",name:"the Muse Catcher",age:24,address:"Beijing, China"},{key:"3",name:"Wonder Woman",age:32,address:"Tel Aviv, Israel"}]),Sa=p([{key:"1",name:"Stephen Curry",age:30,address:"Chase Center, GSW"},{key:"2",name:"the Muse Catcher",age:24,address:"Beijing, China"},{key:"3",name:"Wonder Woman",age:32,address:"Tel Aviv, Israel"}]),wa=p([{name:"Stephen Curry",age:30,job:"Player",address:"Chase Center, San Francisco, California"},{name:"the Muse Catcher",age:24,job:"None",address:"Beijing, China"},{name:"Wonder Woman",age:32,job:"Hero",address:"Tel Aviv, Israel"},{name:"Superman",age:32,job:"Hero",address:"United States"},{name:"Leo",age:36,job:"Actor",address:"Los Angeles"}]),Ia=p([{name:"Stephen Curry",age:30,tel:"0666-12098909",phone:18889898989,address:"Chase Center, San Francisco, California"},{name:"the Muse Catcher",age:24,tel:"0666-22098333",phone:18899998888,address:"Beijing, China"},{name:"Wonder Woman",age:32,tel:"0888-32098909",phone:18899998888,address:"Tel Aviv, Israel"},{name:"Superman",age:32,tel:"0888-32098909",phone:18899998888,address:"United States"},{name:"Leo",age:36,tel:"0575-22098909",phone:18900010002,address:"Los Angeles"}]),f=p([{key:"0",name:"Edward King 0",age:32,address:"London, Park Lane no. 0"},{key:"1",name:"Edward King 1",age:32,address:"London, Park Lane no. 1"},{key:"2",name:"Edward King 2",age:32,address:"London, Park Lane no. 2"}]),w=[];for(let t=0;t<100;t++)w.push({key:t.toString(),name:`Edrward ${t}`,age:32,address:`London, Park Lane no. ${t}`});const G=p(w.slice(0,10)),Ta=p([{key:"1",name:"Superman",age:32,address:"New York No.1 Lake Park",description:"My name is Superman, I am 32 years old, living in New York No.1 Lake Park."},{key:"2",name:"Spiderman",age:22,address:"London No.2 Lake Park",description:"My name is Spiderman, I am 42 years old, living in London No.2 Lake Park."},{key:"3",name:"Ironman",age:36,address:"Sidney No.3 Lake Park",description:"My name is Ironman, I am 32 years old, living in Sidney No.3 Lake Park."}]),_a=p([{key:"1",name:"Stephen Curry",age:30,address:"Chase Center, GSW"},{key:"2",name:"the Muse Catcher",age:24,address:"Beijing, China"},{key:"3",name:"Wonder Woman",age:32,address:"Tel Aviv, Israel"}]),Pa=p(w),Ra=p(w),Na=p(w);function ja(t,a){return t=Math.ceil(t),a=Math.floor(a),Math.floor(Math.random()*(a-t+1))+t}const La=[...Array(100)].map((t,a)=>({key:a.toString(),name:"John Brown",age:ja(0,10),street:"Lake Park",building:"C"+a,number:2035,companyAddress:"Lake Street 42",companyName:"SoftLake Co",gender:"M"})),Va=p([{key:"1",name:"John Brown",age:32,address:"New York No.1 Lake Park"},{key:"2",name:"Jim Green",age:42,address:"London No.1 Lake Park"},{key:"3",name:"Joe Black",age:32,address:"Sidney No.12 Lake Park"},{key:"4",name:"Jim Red",age:32,address:"London No.102 Lake Park"}]),za=p(w);ls(()=>{sa()});function sa(){j.value=!0,setTimeout(()=>{j.value=!1},1500)}function Ka(t,a){X.page=t,X.pageSize=a,sa()}const I=r({}),Wa=()=>{const t=f.value.length,a={key:`${t}`,name:`Edward King ${t}`,age:32,address:`London, Park Lane no. ${t}`};f.value.push(a)},Ha=t=>{I[t]=f.value.filter(a=>t===a.key)[0]},ia=t=>{Object.assign(f.value.filter(a=>t===a.key)[0],I[t]),delete I[t]},Oa=t=>{f.value=f.value.filter(a=>a.key!==t)},u=r({}),Ma=t=>{u[t]=G.value.filter(a=>t===a.key)[0]},Ua=t=>{Object.assign(f.value.filter(a=>t===a.key)[0],u[t]),delete u[t]},$a=t=>{delete u[t]},Ga=(t,a)=>{L.value=!0,setTimeout(()=>{G.value=w.slice((t-1)*a,t*a),L.value=!1},500)},J=p(["1"]);la(()=>{console.log("expandedRowKeys",J.value)});const Ja=(t,a)=>{console.log("expanded",t),console.log("record",a)},Ya=t=>{console.log("expandedRowsChange",t)};function Qa(t,a){console.log("sort column",t),console.log("sort currentDataSource",a)}return(t,a)=>{const R=o("GlobalElement"),m=o("Tag"),T=o("Divider"),e=o("Table",!0),c=o("Flex"),x=o("Switch"),C=o("Space"),Y=o("Radio"),da=o("Button"),Q=o("Input"),ta=o("Popconfirm"),Xa=o("InputNumber"),_=o("Col"),Za=o("Slider"),as=o("Row");return h(),E("div",null,[a[75]||(a[75]=s("h1",{id:"表格-table",tabindex:"-1"},[l("表格 Table "),s("a",{class:"header-anchor",href:"#表格-table","aria-label":'Permalink to "表格 Table"'},"​")],-1)),i(R),a[76]||(a[76]=s("p",null,[s("em",null,"展示行列数据")],-1)),a[77]||(a[77]=s("h2",{id:"何时使用",tabindex:"-1"},[l("何时使用 "),s("a",{class:"header-anchor",href:"#何时使用","aria-label":'Permalink to "何时使用"'},"​")],-1)),a[78]||(a[78]=s("ul",null,[s("li",null,"当有大量结构化的数据需要展现时"),s("li",null,"当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时")],-1)),a[79]||(a[79]=s("h2",{id:"基本使用",tabindex:"-1"},[l("基本使用 "),s("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1)),i(e,{columns:q,dataSource:S.value,pagination:{showTotal:!0},loading:j.value,onChange:Ka},{headerCell:n(({column:d,title:k})=>[d.key==="name"?(h(),E(A,{key:0},[i(P(na)),l(" "+b(k),1)],64)):y("",!0)]),bodyCell:n(({column:d,record:k})=>[d.key==="name"?(h(),E("a",ps," hello "+b(k.name),1)):d.key==="sex"?(h(),E(A,{key:1},[k.sex==="boy"?(h(),D(m,{key:0,color:"volcano"},{default:n(()=>[l(b(k.sex),1)]),_:2},1024)):k.sex==="girl"?(h(),D(m,{key:1,color:"magenta"},{default:n(()=>[l(b(k.sex),1)]),_:2},1024)):y("",!0)],64)):d.key==="action"?(h(),E("span",Es,[s("a",null,"Invite "+b(k.name),1),i(T,{vertical:""}),a[16]||(a[16]=s("a",null,"Delete",-1))])):y("",!0)]),_:1},8,["columns","dataSource","loading"]),a[80]||(a[80]=v("",2)),i(c,{vertical:""},{default:n(()=>[i(e,{columns:q,loading:""},null,8,["columns"]),i(e,{columns:q,loading:"","spin-props":{indicator:"dynamic-circle"}},null,8,["columns"])]),_:1}),a[81]||(a[81]=v("",2)),i(c,{vertical:""},{default:n(()=>[i(e,{columns:q},null,8,["columns"]),i(e,{columns:q,"empty-props":{description:"no data",image:"filled"}},null,8,["columns"])]),_:1}),a[82]||(a[82]=v("",2)),i(e,{columns:q,"data-source":S.value,pagination:{showTotal:!0},bordered:""},{headerCell:n(({column:d,title:k})=>[d.key==="name"?(h(),E(A,{key:0},[i(P(na)),l(" "+b(k),1)],64)):y("",!0)]),bodyCell:n(({column:d,record:k})=>[d.key==="name"?(h(),E("a",es," hello "+b(k.name),1)):d.key==="sex"?(h(),E(A,{key:1},[k.sex==="boy"?(h(),D(m,{key:0,color:"volcano"},{default:n(()=>[l(b(k.sex),1)]),_:2},1024)):k.sex==="girl"?(h(),D(m,{key:1,color:"magenta"},{default:n(()=>[l(b(k.sex),1)]),_:2},1024)):y("",!0)],64)):d.key==="action"?(h(),E("span",bs,[s("a",null,"Invite "+b(k.name),1),i(T,{vertical:""}),a[17]||(a[17]=s("a",null,"Delete",-1))])):y("",!0)]),_:1},8,["columns","data-source"]),a[83]||(a[83]=v("",4)),i(c,{vertical:""},{default:n(()=>[i(C,{align:"center"},{default:n(()=>[a[18]||(a[18]=l(" bordered: ")),i(x,{modelValue:V.value,"onUpdate:modelValue":a[0]||(a[0]=d=>V.value=d)},null,8,["modelValue"])]),_:1}),i(e,{columns:ea,"data-source":xa.value,"row-class-name":fa,bordered:V.value},null,8,["columns","data-source","bordered"])]),_:1}),a[84]||(a[84]=v("",4)),i(c,{vertical:""},{default:n(()=>[i(C,{align:"center"},{default:n(()=>[a[19]||(a[19]=l(" bordered: ")),i(x,{modelValue:z.value,"onUpdate:modelValue":a[1]||(a[1]=d=>z.value=d)},null,8,["modelValue"])]),_:1}),i(C,{align:"center"},{default:n(()=>[a[20]||(a[20]=l(" size: ")),i(Y,{options:ha,value:$.value,"onUpdate:value":a[2]||(a[2]=d=>$.value=d),button:"","button-style":"solid"},null,8,["value"])]),_:1}),i(e,{columns:ba,"data-source":qa.value,bordered:z.value,size:$.value},null,8,["columns","data-source","bordered","size"])]),_:1}),a[85]||(a[85]=v("",2)),i(c,{vertical:""},{default:n(()=>[i(C,{align:"center"},{default:n(()=>[a[21]||(a[21]=l(" bordered: ")),i(x,{modelValue:K.value,"onUpdate:modelValue":a[3]||(a[3]=d=>K.value=d)},null,8,["modelValue"])]),_:1}),i(C,{align:"center"},{default:n(()=>[a[22]||(a[22]=l(" align: ")),i(Y,{options:ka,value:N.value,"onUpdate:value":a[4]||(a[4]=d=>N.value=d),button:"","button-style":"solid"},null,8,["value"])]),_:1}),i(e,{columns:Z,"data-source":Sa.value,bordered:K.value},null,8,["columns","data-source","bordered"])]),_:1}),a[86]||(a[86]=v("",2)),i(c,{vertical:""},{default:n(()=>[i(C,{align:"center"},{default:n(()=>[a[23]||(a[23]=l(" bordered: ")),i(x,{modelValue:W.value,"onUpdate:modelValue":a[5]||(a[5]=d=>W.value=d)},null,8,["modelValue"])]),_:1}),i(e,{columns:va,"data-source":wa.value,striped:"",bordered:W.value},null,8,["columns","data-source","bordered"])]),_:1}),a[87]||(a[87]=v("",2)),i(c,{vertical:""},{default:n(()=>[i(C,{align:"center"},{default:n(()=>[a[24]||(a[24]=l(" bordered: ")),i(x,{modelValue:H.value,"onUpdate:modelValue":a[6]||(a[6]=d=>H.value=d)},null,8,["modelValue"])]),_:1}),i(e,{columns:q,"data-source":S.value,bordered:H.value},{header:n(()=>[l(" Header firstData name: "+b(S.value[0].name),1)]),bodyCell:n(({column:d,text:k})=>[d.key==="name"?(h(),E("a",vs," hello "+b(k),1)):d.key==="sex"?(h(),E(A,{key:1},[k==="boy"?(h(),D(m,{key:0,color:"volcano"},{default:n(()=>[l(b(k),1)]),_:2},1024)):k==="girl"?(h(),D(m,{key:1,color:"magenta"},{default:n(()=>[l(b(k),1)]),_:2},1024)):y("",!0)],64)):d.key==="action"?(h(),E("span",rs,[a[25]||(a[25]=s("a",null,"Invite",-1)),i(T,{vertical:""}),a[26]||(a[26]=s("a",null,"Delete",-1))])):y("",!0)]),footer:n(()=>[l(" Footer lastData name: "+b(S.value[S.value.length-1].name),1)]),_:1},8,["columns","data-source","bordered"])]),_:1}),a[88]||(a[88]=v("",4)),i(e,{columns:ra,"data-source":S.value},{bodyCell:n(({column:d,text:k})=>[d.dataIndex==="name"?(h(),E("a",gs,b(k),1)):y("",!0)]),_:1},8,["columns","data-source"]),a[89]||(a[89]=v("",4)),i(e,{columns:ga,"data-source":Ia.value,bordered:""},{bodyCell:n(({column:d,text:k})=>[d.dataIndex==="name"?(h(),E("a",ys,b(k),1)):y("",!0)]),_:1},8,["columns","data-source"]),a[90]||(a[90]=v("",2)),i(da,{style:{"margin-bottom":"16px"},type:"primary",icon:()=>hs(P(ss)),onClick:Wa},{default:n(()=>a[27]||(a[27]=[l("新增")])),_:1},8,["icon"]),i(e,{columns:ya,"data-source":f.value,bordered:""},{bodyCell:n(({column:d,text:k,record:g})=>[d.dataIndex==="name"?(h(),E("div",Fs,[I[g.key]?(h(),D(c,{key:0,justify:"space-between",align:"center"},{default:n(()=>[i(Q,{value:I[g.key].name,"onUpdate:value":B=>I[g.key].name=B,onEnter:B=>ia(g.key)},null,8,["value","onUpdate:value","onEnter"]),i(P(is),{class:"cell-icon-check",onClick:B=>ia(g.key)},null,8,["onClick"])]),_:2},1024)):(h(),D(c,{key:1,justify:"space-between",align:"center"},{default:n(()=>[l(b(k||" ")+" ",1),i(P(ds),{class:"cell-icon",onClick:B=>Ha(g.key)},null,8,["onClick"])]),_:2},1024))])):d.dataIndex==="action"?(h(),E(A,{key:1},[f.value.length?(h(),D(ta,{key:0,title:"Sure to delete?",onOk:B=>Oa(g.key)},{default:n(()=>a[28]||(a[28]=[s("a",null,"delete",-1)])),_:2},1032,["onOk"])):y("",!0)],64)):y("",!0)]),_:1},8,["columns","data-source"]),a[91]||(a[91]=v("",2)),i(e,{columns:Fa,"data-source":G.value,bordered:"",loading:L.value,pagination:{total:100},onChange:Ga},{bodyCell:n(({column:d,text:k,record:g})=>[["name","address"].includes(d.dataIndex)?(h(),E(A,{key:0},[u[g.key]?(h(),D(Q,{key:0,value:u[g.key][d.dataIndex],"onUpdate:value":B=>u[g.key][d.dataIndex]=B,style:{margin:"-5px 0"}},null,8,["value","onUpdate:value"])):(h(),E(A,{key:1},[l(b(k),1)],64))],64)):d.dataIndex==="age"?(h(),E(A,{key:1},[u[g.key]?(h(),D(Xa,{key:0,width:"100%",value:u[g.key][d.dataIndex],"onUpdate:value":B=>u[g.key][d.dataIndex]=B,style:{margin:"-5px 0"}},null,8,["value","onUpdate:value"])):(h(),E(A,{key:1},[l(b(k),1)],64))],64)):d.dataIndex==="action"?(h(),E(A,{key:2},[u[g.key]?(h(),E("span",os,[s("a",{onClick:B=>Ua(g.key)},"Save",8,cs),i(T,{vertical:""}),i(ta,{title:"Sure to cancel?",onOk:B=>$a(g.key)},{default:n(()=>a[29]||(a[29]=[s("a",null,"Cancel",-1)])),_:2},1032,["onOk"])])):(h(),E("span",Cs,[s("a",{onClick:B=>Ma(g.key)},"Edit",8,Bs)]))],64)):y("",!0)]),_:1},8,["columns","data-source","loading"]),a[92]||(a[92]=v("",4)),i(e,{columns:oa,"data-source":Ta.value,"expand-column-width":100,showExpandColumn:"",expandRowByClick:"",expandFixed:"",expandedRowKeys:J.value,"onUpdate:expandedRowKeys":a[7]||(a[7]=d=>J.value=d),scroll:{x:1600},onExpand:Ja,onExpandedRowsChange:Ya},{expandedRowRender:n(({record:d})=>[l(b(d.description),1)]),expandColumnTitle:n(()=>a[30]||(a[30]=[s("span",{style:{color:"#d4380d"}},"More",-1)])),bodyCell:n(({column:d})=>[d.key==="action"?(h(),E("a",us,"Delete")):y("",!0)]),_:1},8,["columns","data-source","expandedRowKeys"]),a[93]||(a[93]=v("",4)),i(e,{columns:ca,"data-source":_a.value,scroll:{x:1600}},{bodyCell:n(({column:d})=>[d.key==="action"?(h(),E("a",ms,"action")):y("",!0)]),_:1},8,["columns","data-source"]),a[94]||(a[94]=v("",4)),i(e,{columns:Ca,"data-source":Pa.value,scroll:{y:240}},null,8,["columns","data-source"]),a[95]||(a[95]=v("",4)),i(e,{columns:Ba,"data-source":Ra.value,scroll:{x:1500,y:300}},{bodyCell:n(({column:d})=>[d.key==="action"?(h(),E("a",As,"action")):y("",!0)]),_:1},8,["columns","data-source"]),a[96]||(a[96]=v("",4)),i(e,{columns:ua,"data-source":Na.value,sticky:"",scroll:{x:1500}},{bodyCell:n(({column:d})=>[d.key==="action"?(h(),E("a",Ds,"action")):y("",!0)]),_:1},8,["columns","data-source"]),a[97]||(a[97]=v("",4)),i(c,{vertical:""},{default:n(()=>[i(C,{align:"center"},{default:n(()=>[a[31]||(a[31]=l(" bordered: ")),i(x,{modelValue:O.value,"onUpdate:modelValue":a[8]||(a[8]=d=>O.value=d)},null,8,["modelValue"])]),_:1}),i(e,{columns:ma,"data-source":P(La),bordered:O.value,scroll:{x:1500,y:240}},null,8,["columns","data-source","bordered"])]),_:1}),a[98]||(a[98]=v("",2)),i(c,{vertical:""},{default:n(()=>[i(C,{align:"center"},{default:n(()=>[a[32]||(a[32]=l(" bordered: ")),i(x,{modelValue:M.value,"onUpdate:modelValue":a[9]||(a[9]=d=>M.value=d)},null,8,["modelValue"])]),_:1}),i(e,{columns:Aa,"data-source":Va.value,bordered:M.value,onSortChange:Qa},null,8,["columns","data-source","bordered"])]),_:1}),a[99]||(a[99]=v("",4)),i(c,{vertical:""},{default:n(()=>[i(as,{gutter:[24,12]},{default:n(()=>[i(_,{span:6},{default:n(()=>[i(C,{gap:"small",vertical:""},{default:n(()=>[a[33]||(a[33]=l(" bordered: ")),i(x,{modelValue:U.value,"onUpdate:modelValue":a[10]||(a[10]=d=>U.value=d)},null,8,["modelValue"])]),_:1})]),_:1}),i(_,{span:6},{default:n(()=>[i(c,{gap:"small",vertical:""},{default:n(()=>[a[34]||(a[34]=l(" columnTitle: ")),i(Q,{value:F.columnTitle,"onUpdate:value":a[11]||(a[11]=d=>F.columnTitle=d),placeholder:"columnTitle"},null,8,["value"])]),_:1})]),_:1}),i(_,{span:6},{default:n(()=>[i(c,{gap:"small",vertical:""},{default:n(()=>[a[35]||(a[35]=l(" columnWidth: ")),i(Za,{value:F.columnWidth,"onUpdate:value":a[12]||(a[12]=d=>F.columnWidth=d),min:32,max:120},null,8,["value"])]),_:1})]),_:1}),i(_,{span:6},{default:n(()=>[i(C,{gap:"small",vertical:""},{default:n(()=>[a[36]||(a[36]=l(" fixed: ")),i(x,{modelValue:F.fixed,"onUpdate:modelValue":a[13]||(a[13]=d=>F.fixed=d)},null,8,["modelValue"])]),_:1})]),_:1}),i(_,{span:6},{default:n(()=>[i(C,{gap:"small",vertical:""},{default:n(()=>[a[37]||(a[37]=l(" hideSelectAll: ")),i(x,{modelValue:F.hideSelectAll,"onUpdate:modelValue":a[14]||(a[14]=d=>F.hideSelectAll=d)},null,8,["modelValue"])]),_:1})]),_:1}),i(_,{span:6},{default:n(()=>[i(C,{gap:"small",vertical:""},{default:n(()=>[a[38]||(a[38]=l(" type: ")),i(Y,{options:pa,value:F.type,"onUpdate:value":a[15]||(a[15]=d=>F.type=d),button:"","button-style":"solid"},null,8,["value"])]),_:1})]),_:1})]),_:1}),i(C,null,{default:n(()=>[i(da,{onClick:Ea},{default:n(()=>a[39]||(a[39]=[l("清空")])),_:1})]),_:1}),i(e,{columns:Da,"data-source":za.value,"row-selection":F,bordered:U.value,scroll:{x:1500}},{header:n(()=>{var d;return[l(" Selected "+b((d=F.selectedRowKeys)==null?void 0:d.length)+" items ",1)]}),bodyCell:n(({column:d,text:k})=>[d.dataIndex==="name"?(h(),E("a",xs,b(k),1)):y("",!0)]),_:1},8,["columns","data-source","row-selection","bordered"])]),_:1}),a[100]||(a[100]=v("",3)),s("table",fs,[a[74]||(a[74]=s("thead",null,[s("tr",null,[s("th",{style:{"text-align":"left"}},"参数"),s("th",{style:{"text-align":"left"}},"说明"),s("th",{style:{"text-align":"left"}},"类型"),s("th",{style:{"text-align":"left"}},"默认值")])],-1)),s("tbody",null,[a[45]||(a[45]=s("tr",null,[s("td",{style:{"text-align":"left"}},"header"),s("td",{style:{"text-align":"left"}},"表格标题"),s("td",{style:{"text-align":"left"}},"string | slot"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[46]||(a[46]=s("tr",null,[s("td",{style:{"text-align":"left"}},"footer"),s("td",{style:{"text-align":"left"}},"表格尾部"),s("td",{style:{"text-align":"left"}},"string | slot"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[47]||(a[47]=s("tr",null,[s("td",{style:{"text-align":"left"}},"columns"),s("td",{style:{"text-align":"left"}},"表格列的配置项"),s("td",{style:{"text-align":"left"}},[s("a",{href:"#column-type"},"Column"),l("[]")]),s("td",{style:{"text-align":"left"}},"[]")],-1)),a[48]||(a[48]=s("tr",null,[s("td",{style:{"text-align":"left"}},"dataSource"),s("td",{style:{"text-align":"left"}},"表格数据数组"),s("td",{style:{"text-align":"left"}},"object[]"),s("td",{style:{"text-align":"left"}},"[]")],-1)),a[49]||(a[49]=s("tr",null,[s("td",{style:{"text-align":"left"}},"bordered"),s("td",{style:{"text-align":"left"}},"是否展示外边框和列边框"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"false")],-1)),a[50]||(a[50]=s("tr",null,[s("td",{style:{"text-align":"left"}},"rowClassName"),s("td",{style:{"text-align":"left"}},"自定义行的类名"),s("td",{style:{"text-align":"left"}},"string | ((record: any, rowIndex: number) => string)"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[51]||(a[51]=s("tr",null,[s("td",{style:{"text-align":"left"}},"size"),s("td",{style:{"text-align":"left"}},"表格大小"),s("td",{style:{"text-align":"left"}},"'large' | 'middle' | small"),s("td",{style:{"text-align":"left"}},"'large'")],-1)),a[52]||(a[52]=s("tr",null,[s("td",{style:{"text-align":"left"}},"striped"),s("td",{style:{"text-align":"left"}},"是否使用斑马条纹"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"false")],-1)),a[53]||(a[53]=s("tr",null,[s("td",{style:{"text-align":"left"}},"loading"),s("td",{style:{"text-align":"left"}},"是否加载中"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"false")],-1)),a[54]||(a[54]=s("tr",null,[s("td",{style:{"text-align":"left"}},"spinProps"),s("td",{style:{"text-align":"left"}},[s("code",null,"Spin"),l(" 组件属性配置，参考 "),s("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/spin.html#spin",target:"_blank",rel:"noreferrer"},"Spin Props"),l("，用于配置数据加载中")]),s("td",{style:{"text-align":"left"}},"object"),s("td",{style:{"text-align":"left"}},"{}")],-1)),a[55]||(a[55]=s("tr",null,[s("td",{style:{"text-align":"left"}},"emptyProps"),s("td",{style:{"text-align":"left"}},[s("code",null,"Empty"),l(" 组件属性配置，参考 "),s("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/empty.html#empty",target:"_blank",rel:"noreferrer"},"Empty Props"),l("，用于配置暂无数据")]),s("td",{style:{"text-align":"left"}},"object"),s("td",{style:{"text-align":"left"}},"{}")],-1)),a[56]||(a[56]=s("tr",null,[s("td",{style:{"text-align":"left"}},"ellipsisProps"),s("td",{style:{"text-align":"left"}},[s("code",null,"Ellipsis"),l(" 组件属性配置，参考 "),s("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/ellipsis.html#ellipsis",target:"_blank",rel:"noreferrer"},"Ellipsis Props"),l("，用于全局配置文本省略")]),s("td",{style:{"text-align":"left"}},"object"),s("td",{style:{"text-align":"left"}},"{}")],-1)),a[57]||(a[57]=s("tr",null,[s("td",{style:{"text-align":"left"}},"showSorterTooltip"),s("td",{style:{"text-align":"left"}},[l("表头是否显示下一次排序的 "),s("code",null,"tooltip"),l(" 提示")]),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"true")],-1)),a[58]||(a[58]=s("tr",null,[s("td",{style:{"text-align":"left"}},"sortDirections"),s("td",{style:{"text-align":"left"}},"支持的排序方式"),s("td",{style:{"text-align":"left"}},"('ascend' | 'descend')[]"),s("td",{style:{"text-align":"left"}},"['ascend', 'descend']")],-1)),a[59]||(a[59]=s("tr",null,[s("td",{style:{"text-align":"left"}},"sortTooltipProps"),s("td",{style:{"text-align":"left"}},[l("排序 "),s("code",null,"Tooltip"),l(" 组件属性配置，参考 "),s("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip",target:"_blank",rel:"noreferrer"},"Tooltip Props"),l("，用于全局配置排序弹出提示")]),s("td",{style:{"text-align":"left"}},"object"),s("td",{style:{"text-align":"left"}},"{}")],-1)),a[60]||(a[60]=s("tr",null,[s("td",{style:{"text-align":"left"}},"sticky"),s("td",{style:{"text-align":"left"}},"是否设置粘性定位的表头和水平滚动条，设置之后表头和滚动条会跟随页面固定"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"false")],-1)),a[61]||(a[61]=s("tr",null,[s("td",{style:{"text-align":"left"}},"showPagination"),s("td",{style:{"text-align":"left"}},"是否显示分页"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"true")],-1)),a[62]||(a[62]=s("tr",null,[s("td",{style:{"text-align":"left"}},"pagination"),s("td",{style:{"text-align":"left"}},[s("code",null,"Pagination"),l(" 组件属性配置，参考 "),s("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/pagination.html#pagination",target:"_blank",rel:"noreferrer"},"Pagination Props"),l("，用于配置分页功能")]),s("td",{style:{"text-align":"left"}},"object"),s("td",{style:{"text-align":"left"}},"{}")],-1)),a[63]||(a[63]=s("tr",null,[s("td",{style:{"text-align":"left"}},"rowSelection"),s("td",{style:{"text-align":"left"}},"列表项是否可选择"),s("td",{style:{"text-align":"left"}},[s("a",{href:"#selection-type"},"Selection")]),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[64]||(a[64]=s("tr",null,[s("td",{style:{"text-align":"left"}},"scroll"),s("td",{style:{"text-align":"left"}},"表格是否可滚动，也可以指定滚动区域的宽、高"),s("td",{style:{"text-align":"left"}},[s("a",{href:"#scrolloption-type"},"ScrollOption"),l(" | boolean")]),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[65]||(a[65]=s("tr",null,[s("td",{style:{"text-align":"left"}},"scrollbarProps"),s("td",{style:{"text-align":"left"}},[s("code",null,"Scrollbar"),l(" 组件属性配置，参考 "),s("a",{href:"https://themusecatcher.github.io/vue-amazing-ui/guide/components/scrollbar.html#scrollbar",target:"_blank",rel:"noreferrer"},"Scrollbar Props"),l("，用于配置表格滚动条")]),s("td",{style:{"text-align":"left"}},"object"),s("td",{style:{"text-align":"left"}},"{}")],-1)),a[66]||(a[66]=s("tr",null,[s("td",{style:{"text-align":"left"}},"tableLayout"),s("td",{style:{"text-align":"left"}},[l("表格布局方式，设为 "),s("code",null,"fixed"),l(" 表示内容不会影响列的布局，参考 "),s("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout",target:"_blank",rel:"noreferrer"},"table-layout"),l(" 属性，固定表头/列或使用了 "),s("code",null,"column.ellipsis"),l(" 时，默认值为 "),s("code",null,"fixed")]),s("td",{style:{"text-align":"left"}},"'auto' | 'fixed'"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[67]||(a[67]=s("tr",null,[s("td",{style:{"text-align":"left"}},"showExpandColumn"),s("td",{style:{"text-align":"left"}},"是否展示展开列"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"false")],-1)),a[68]||(a[68]=s("tr",null,[s("td",{style:{"text-align":"left"}},"expandColumnTitle"),s("td",{style:{"text-align":"left"}},"自定义展开列表头"),s("td",{style:{"text-align":"left"}},"string | slot"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[69]||(a[69]=s("tr",null,[s("td",{style:{"text-align":"left"}},"expandColumnWidth"),s("td",{style:{"text-align":"left"}},"展开列的宽度"),s("td",{style:{"text-align":"left"}},"string | number"),s("td",{style:{"text-align":"left"}},"48")],-1)),a[70]||(a[70]=s("tr",null,[s("td",{style:{"text-align":"left"}},"expandCell"),s("td",{style:{"text-align":"left"}},"自定义展开按钮"),s("td",{style:{"text-align":"left"}},"slot"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[71]||(a[71]=s("tr",null,[s("td",{style:{"text-align":"left"}},"expandedRowRender"),s("td",{style:{"text-align":"left"}},"自定义额外的展开行内容"),s("td",{style:{"text-align":"left"}},"slot"),s("td",{style:{"text-align":"left"}},"undefined")],-1)),a[72]||(a[72]=s("tr",null,[s("td",{style:{"text-align":"left"}},"expandFixed"),s("td",{style:{"text-align":"left"}},"是否固定展开列"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"false")],-1)),s("tr",null,[s("td",qs,[a[41]||(a[41]=l("expandedRowKeys ")),i(m,{color:"cyan"},{default:n(()=>a[40]||(a[40]=[l("v-model")])),_:1})]),a[42]||(a[42]=s("td",{style:{"text-align":"left"}},[l("展开行的 "),s("code",null,"key"),l(" 数组，控制展开行的属性；需与 "),s("code",null,"dataSource"),l(" 数据中的 "),s("code",null,"key"),l(" 配合使用")],-1)),a[43]||(a[43]=s("td",{style:{"text-align":"left"}},"(string | number)[]",-1)),a[44]||(a[44]=s("td",{style:{"text-align":"left"}},"[]",-1))]),a[73]||(a[73]=s("tr",null,[s("td",{style:{"text-align":"left"}},"expandRowByClick"),s("td",{style:{"text-align":"left"}},"点击行是否展开"),s("td",{style:{"text-align":"left"}},"boolean"),s("td",{style:{"text-align":"left"}},"false")],-1))])]),a[101]||(a[101]=v("",10))])}}}),Rs=ks(ws,[["__scopeId","data-v-b8ad196d"]]);export{Ps as __pageData,Rs as default};
