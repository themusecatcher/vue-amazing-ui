import type { App } from 'vue'
import Pagination from './Pagination.vue'

// 使用install方法，在app.use挂载
Pagination.install = (app: App): void => {
  app.component(Pagination.__name as string, Pagination)
}

export default Pagination
