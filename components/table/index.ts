import type { App } from 'vue'
import Table from './Table.vue'

// 使用install方法，在app.use挂载
Table.install = (app: App) => {
  app.component(Table.__name as string, Table)
}

export default Table
