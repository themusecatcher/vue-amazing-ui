import type { App } from 'vue'
import Breadcrumb from './Breadcrumb.vue'

// 使用install方法，在app.use挂载
Breadcrumb.install = (app: App) => {
  app.component(Breadcrumb.name, Breadcrumb)
}

export default Breadcrumb