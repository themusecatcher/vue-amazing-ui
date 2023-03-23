import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/less/global.less'

import VueAmazingUI from '../packages/index'
import { rafTimeout } from '../packages/index'
// import VueAmazingUI from '../dist/vue-amazing-ui.js'
// import '../dist/style.css'
// import { Breadcrumb } from '../dist/vue-amazing-ui.js'

const app = createApp(App)
// window.rafTimeout = rafTimeout // 挂载到window上，全局可用，无需引入
app.use(router)
app.use(VueAmazingUI)
// app.use(Breadcrumb)

app.mount('#app')
