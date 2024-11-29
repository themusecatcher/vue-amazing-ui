import type { App } from 'vue'
import Table from './Table.vue'
export type { Props, Column } from './Table.vue'

// 使用 install 方法，在 app.use 挂载
Table.install = (app: App) => {
  app.component(Table.__name as string, Table)
  return app
}

export default Table
