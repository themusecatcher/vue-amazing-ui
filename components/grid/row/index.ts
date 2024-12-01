import type { App, Plugin } from 'vue'
import Row from './Row.vue'
export type { Props as RowProps, Responsive } from './Row.vue'

// 使用 install 方法，在 app.use 挂载
Row.install = (app: App) => {
  app.component(Row.__name as string, Row)
  return app
}

export default Row
