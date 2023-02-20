import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.less'

// import { Pagination, Breadcrumb } from '../packages/index'
import { Pagination, Breadcrumb } from '../dist/vue-amazing-ui.js'
import '../dist/style.css'


const app = createApp(App)
app.use(Pagination).use(Breadcrumb)

app.mount('#app')
