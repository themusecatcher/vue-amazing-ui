import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/global.less'

import { Pagination, Breadcrumb } from '../packages/index'
// import { Pagination, Breadcrumb } from '../dist/vue-amazing-ui.js'
// import '../dist/style.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(), // 使用history模式，hash模式：createWebHashHistory
  routes: []
})
// @ts-ignore
app.use(Pagination).use(Breadcrumb)
app.use(router)
app.mount('#app')
