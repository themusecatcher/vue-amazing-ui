import type { App } from 'vue'
import Row from './Row.vue'
import Col from './Col.vue'
export type { Props as RowProps, Responsive } from './Row.vue'
export type { Props as ColProps } from './Col.vue'

// 使用 install 方法，在 app.use 挂载
Row.install = (app: App) => {
  app.component(Row.__name as string, Row)
  return app
}
Col.install = (app: App) => {
  app.component(Col.__name as string, Col)
  return app
}

export { Row, Col }
