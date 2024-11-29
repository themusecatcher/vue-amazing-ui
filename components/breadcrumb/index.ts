import type { App } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
export type { Props, Route, Query } from './Breadcrumb.vue'

// 使用 install 方法，在 app.use 挂载
Breadcrumb.install = (app: App) => {
  app.component(Breadcrumb.__name as string, Breadcrumb)
  return app
}

export default Breadcrumb
