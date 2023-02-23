import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/global.less'

// import VueAmazingUI from '../packages/index'
import VueAmazingUI from '../dist/vue-amazing-ui.js'
import '../dist/style.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用history模式，hash模式：createWebHashHistory
  routes: []
})
app.use(router)
app.use(VueAmazingUI)

app.mount('#app')
