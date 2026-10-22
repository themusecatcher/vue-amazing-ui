import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'less/global.less'

import VueAmazingUI from 'components/index'
// import VueAmazingUI from '../dist/index.js'
// import '../dist/style.css'

const app = createApp(App)
app.use(router)
app.use(VueAmazingUI)
app.mount('#app')
