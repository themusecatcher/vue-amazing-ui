import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/less/global.less'

import VueAmazingUI from '../packages/index'
// import VueAmazingUI from '../dist/vue-amazing-ui.js'
// import '../dist/style.css'
// import { Breadcrumb } from '../dist/vue-amazing-ui.js'

const app = createApp(App)
app.use(router)
app.use(VueAmazingUI)
// app.use(Breadcrumb)

app.mount('#app')
