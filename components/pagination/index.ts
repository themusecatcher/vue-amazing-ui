import type { App } from 'vue'
import Pagination from './Pagination.vue'
export type { Props } from './Pagination.vue'

// 使用 install 方法，在 app.use 挂载
Pagination.install = (app: App) => {
  app.component(Pagination.__name as string, Pagination)
  return app
}

export default Pagination
