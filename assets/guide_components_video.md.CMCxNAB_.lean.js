import{d as B,p as d,C as k,c as m,o as f,j as a,G as i,a5 as n,a as e,w as p}from"./chunks/framework.D_rhKk2H.js";const b=JSON.parse('{"title":"播放器 Video","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components/video.md","filePath":"guide/components/video.md","lastUpdated":1735180868000}'),A={name:"guide/components/video.md"},x=B({...A,setup(v){const t=d("https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.mp4"),h=d("https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.jpg"),E=d();function g(){console.log("play")}function y(){console.log("pause")}const o=()=>{E.value.play()},F=()=>{E.value.pause()};return(D,s)=>{const c=k("GlobalElement"),l=k("Video",!0),r=k("Button"),u=k("Space"),C=k("Flex");return f(),m("div",null,[s[2]||(s[2]=a("h1",{id:"播放器-video",tabindex:"-1"},[e("播放器 Video "),a("a",{class:"header-anchor",href:"#播放器-video","aria-label":'Permalink to "播放器 Video"'},"​")],-1)),i(c),s[3]||(s[3]=a("p",null,[a("em",null,"简易封装的播放器")],-1)),s[4]||(s[4]=a("h2",{id:"何时使用",tabindex:"-1"},[e("何时使用 "),a("a",{class:"header-anchor",href:"#何时使用","aria-label":'Permalink to "何时使用"'},"​")],-1)),s[5]||(s[5]=a("ul",null,[a("li",null,"当需要在网页内播放视频时")],-1)),s[6]||(s[6]=a("h2",{id:"基本使用",tabindex:"-1"},[e("基本使用 "),a("a",{class:"header-anchor",href:"#基本使用","aria-label":'Permalink to "基本使用"'},"​")],-1)),i(l,{src:t.value,poster:h.value,width:"100%",height:"56.25%",onPlay:g,onPause:y},null,8,["src","poster"]),s[7]||(s[7]=n("",2)),i(l,{src:t.value,poster:h.value,width:400,height:225,"icon-size":60},null,8,["src","poster"]),s[8]||(s[8]=n("",4)),i(l,{src:t.value,second:3,width:"100%",height:"56.25%"},null,8,["src"]),s[9]||(s[9]=n("",2)),i(l,{src:t.value,poster:h.value,fit:"cover"},null,8,["src","poster"]),s[10]||(s[10]=n("",8)),i(l,{src:t.value,poster:h.value,autoplay:"",loop:"",width:"100%",height:"56.25%"},null,8,["src","poster"]),s[11]||(s[11]=n("",2)),i(l,{src:t.value,poster:h.value,controls:!1,width:"100%",height:"56.25%"},null,8,["src","poster"]),s[12]||(s[12]=n("",2)),i(l,{src:t.value,poster:h.value,"play-icon":!1,width:"100%",height:"56.25%"},null,8,["src","poster"]),s[13]||(s[13]=n("",2)),i(C,{vertical:""},{default:p(()=>[i(u,null,{default:p(()=>[i(r,{type:"primary",onClick:o},{default:p(()=>s[0]||(s[0]=[e("播放")])),_:1}),i(r,{onClick:F},{default:p(()=>s[1]||(s[1]=[e("暂停")])),_:1})]),_:1}),i(l,{ref_key:"video",ref:E,src:t.value,poster:h.value},null,8,["src","poster"])]),_:1}),s[14]||(s[14]=n("",10))])}}});export{b as __pageData,x as default};
