import{p as I}from"./chunks/package.DIhqZqqb.js";import{d as P,p as u,aE as j,aF as $,C as t,c as y,o as F,j as m,G as i,a5 as l,a as E,w as n,t as M,k as V,F as f,B as A,N}from"./chunks/framework.bNNjbgDP.js";const R={id:"触摸滑动插件-swiper-pkg-dependencies-swiper",tabindex:"-1"},J=JSON.parse('{"title":"触摸滑动插件 Swiper{{ pkg.dependencies.swiper }}","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/swiper.md","filePath":"guide/components/swiper.md","lastUpdated":1741245691000}'),z={name:"guide/components/swiper.md"},L=P({...z,setup(O){const h=u([]),d=u("#ff6900");function D(){for(let a=1;a<=6;a++)h.value.push({name:`image-${a}`,src:`https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${a}.jpg`,link:`https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/${a}.jpg`})}j(()=>{D()});function o(a){console.log("slider change",a)}const v=["slide","fade","cube","flip","coverflow","cards"],q=[{prev:{shadow:!0,translate:[0,0,-400]},next:{translate:["100%",0,0]}},{prev:{shadow:!0,translate:["-120%",0,-500]},next:{shadow:!0,translate:["120%",0,-500]}},{prev:{shadow:!0,translate:["-20%",0,-1]},next:{translate:["100%",0,0]}},{prev:{shadow:!0,translate:[0,0,-800],rotate:[180,0,0]},next:{shadow:!0,translate:[0,0,-800],rotate:[-180,0,0]}},{prev:{shadow:!0,translate:["-125%",0,-800],rotate:[0,0,-90]},next:{shadow:!0,translate:["125%",0,-800],rotate:[0,0,90]}},{prev:{shadow:!0,origin:"left center",translate:["-5%",0,-200],rotate:[0,100,0]},next:{origin:"right center",translate:["5%",0,-200],rotate:[0,-100,0]}}],k=$({});function x(a){console.log("carousel",a),k.prevEl=a.navigation.prevEl,k.prevEl.style.display="none",k.nextEl=a.navigation.nextEl,k.nextEl.style.display="none"}function b(){k.prevEl.click()}function w(){k.nextEl.click()}return(a,s)=>{const _=t("Tag"),S=t("GlobalElement"),p=t("Swiper",!0),c=t("Badge"),r=t("Flex"),C=t("Button"),B=t("Space"),T=t("ColorPicker");return F(),y("div",null,[m("h1",R,[s[1]||(s[1]=E("触摸滑动插件 Swiper")),i(_,{color:"volcano",style:{"vertical-align":"top","margin-left":"6px"}},{default:n(()=>[E(M(V(I).dependencies.swiper),1)]),_:1}),s[2]||(s[2]=E()),s[3]||(s[3]=m("a",{class:"header-anchor",href:"#触摸滑动插件-swiper-pkg-dependencies-swiper","aria-label":'Permalink to "触摸滑动插件 Swiper<Tag color="volcano" style="vertical-align: top; margin-left: 6px;">{{ pkg.dependencies.swiper }}</Tag>"'},"​",-1))]),i(S),s[7]||(s[7]=l("",6)),i(p,{images:h.value,height:450,speed:800,pagination:{dynamicBullets:!0,clickable:!0},onChange:o},null,8,["images"]),s[8]||(s[8]=l("",2)),i(r,{gap:36,wrap:"wrap"},{default:n(()=>[(F(),y(f,null,A(v,(e,g)=>i(c,{style:{width:"30%"},value:e,color:"volcano",key:g},{default:n(()=>[i(p,{style:{display:"inline-block"},images:h.value,height:160,speed:600,pagination:{dynamicBullets:!0,clickable:!0},effect:e},null,8,["images","effect"])]),_:2},1032,["value"])),64))]),_:1}),s[9]||(s[9]=l("",2)),i(r,{gap:36,wrap:"wrap"},{default:n(()=>[(F(),y(f,null,A(q,(e,g)=>i(c,{style:{width:"30%"},value:"creative",color:"cyan",key:g},{default:n(()=>[i(p,{style:{display:"inline-block"},images:h.value,height:160,speed:600,pagination:{dynamicBullets:!0,clickable:!0},effect:"creative",creativeEffect:e},null,8,["images","creativeEffect"])]),_:2},1024)),64))]),_:1}),s[10]||(s[10]=l("",2)),i(p,{images:h.value,mode:"carousel",height:200,"slides-per-view":3,"space-between":20,speed:2500},null,8,["images"]),s[11]||(s[11]=l("",2)),i(r,{vertical:"",gap:"middle"},{default:n(()=>[i(B,null,{default:n(()=>[i(C,{type:"primary",onClick:b},{default:n(()=>s[4]||(s[4]=[E("Prev")])),_:1}),i(C,{type:"primary",onClick:w},{default:n(()=>s[5]||(s[5]=[E("Next")])),_:1})]),_:1}),i(p,{images:h.value,mode:"broadcast",height:200,speed:600,pagination:{dynamicBullets:!0,clickable:!0},"slides-per-view":3,"space-between":30,navigation:"",mousewheel:"",onSwiper:x},null,8,["images"])]),_:1}),s[12]||(s[12]=l("",2)),i(r,{vertical:""},{default:n(()=>[i(B,{align:"center"},{default:n(()=>[s[6]||(s[6]=E(" primaryColor:")),i(T,{style:{width:"200px"},value:d.value,"onUpdate:value":s[0]||(s[0]=e=>d.value=e)},null,8,["value"])]),_:1}),i(p,{style:N(`--swiper-primary-color: ${d.value}; --swiper-navigation-size: 32px;`),images:h.value,height:450,speed:400,navigation:"",pagination:{dynamicBullets:!0,clickable:!0},onChange:o},null,8,["style","images"])]),_:1}),s[13]||(s[13]=l("",8))])}}});export{J as __pageData,L as default};
