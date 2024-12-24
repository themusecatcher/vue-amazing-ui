const e="vue-amazing-ui",s="2.0.1",i="module",t="theMuseCatcher",n="https://themusecatcher.github.io/vue-amazing-ui",o="An Amazing Vue3 UI Components Library, Uses TypeScript.",r={type:"git",url:"git+https://github.com/themusecatcher/vue-amazing-ui.git"},u=["Vue3","TypeScript","Vite","Less","SFC","Amazing","UI","Components","Tools","Functions","Tree Shaking"],c=["dist","es","lib","package.json","README.md","README.zh-CN.md"],p=!1,d="lib/index.cjs",l="es/index.js",a="dist/index.iife.js",v="dist/index.iife.js",m="es/index.d.ts",g={"./dist/*":"./dist/*","./es/*":"./es/*","./lib/*":"./lib/*","./css":"./dist/style.css",".":{types:"./es/index.d.ts",import:"./es/index.js",require:"./lib/index.cjs"}},b={"docs:dev":"vitepress dev docs --port 8000 --open","docs:build":"vitepress build docs","docs:deploy":"sh scripts/deploy.sh",dev:"vite",pub:"sh scripts/publish.sh",push:"sh scripts/push.sh",build:"run-s format clean build:components",format:"prettier --write src/ components/",clean:"rimraf dist es lib","build:components":"run-p type-check build:dist build:browser build-only","type-check":"vue-tsc --build --force","build:dist":"vite build -- dir=dist","build:browser":"vite build -- dir=dist f=iife","build-only":"vite build",preview:"vite preview",lint:"eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"},h={"@vuepic/vue-datepicker":"^10.0.0","@vueuse/core":"^12.0.0","@vueuse/integrations":"^12.0.0",qrcode:"^1.5.4",swiper:"^11.1.15"},y={"@ant-design/icons-vue":"^7.0.1","@rollup/plugin-terser":"^0.4.4","@tsconfig/node22":"^22.0.0","@types/minimist":"^1.2.5","@types/node":"^22.10.1","@vitejs/plugin-vue":"^5.2.1","@vue/eslint-config-prettier":"^10.1.0","@vue/eslint-config-typescript":"^14.1.4","@vue/tsconfig":"^0.7.0","ant-design-vue":"^4.2.6","date-fns":"^4.1.0",eslint:"^9.16.0","eslint-plugin-vue":"^9.32.0",less:"^4.2.1",minimist:"^1.2.8","naive-ui":"^2.40.3","npm-run-all2":"^7.0.1",prettier:"^3.4.1",rimraf:"^6.0.1","rollup-plugin-visualizer":"^5.12.0",typescript:"^5.6.3","unplugin-auto-import":"^0.18.6","unplugin-vue-components":"^0.27.5",vite:"^6.0.2","vite-plugin-dts":"^4.3.0","vite-plugin-style-import":"^2.0.0",vitepress:"^1.5.0",vue:"^3.5.13","vue-amazing-ui":"2.0.1","vue-router":"^4.5.0","vue-tsc":"^2.1.10"},f="MIT",x={url:"https://github.com/themusecatcher/vue-amazing-ui/issues"},j=["> 1%","last 2 versions","not dead"],k={name:e,version:s,private:!1,type:i,author:t,homepage:n,description:o,repository:r,keywords:u,files:c,sideEffects:p,main:d,module:l,unpkg:a,jsdelivr:v,types:m,exports:g,scripts:b,dependencies:h,devDependencies:y,license:f,bugs:x,browserslist:j};export{k as p};
