import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'less/global.less'

import VueAmazingUI from 'components/index'
// import VueAmazingUI from '../dist/index.js'
// import '../dist/style.css'

const app = createApp(App)
// pinia 必须先于 router 安装：路由守卫会从主题 store 取当前主题（见 router/index.ts 的 getLoadingBar）
app.use(createPinia())
app.use(router)
app.use(VueAmazingUI)
app.mount('#app')
