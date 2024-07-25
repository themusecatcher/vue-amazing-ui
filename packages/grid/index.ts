import type { App } from 'vue'
import Row from './Row.vue'
import Col from './Col.vue'

// 使用install方法，在app.use挂载
Row.install = (app: App): void => {
  app.component(Row.__name as string, Row)
}
Col.install = (app: App): void => {
  app.component(Col.__name as string, Col)
}

export { Row, Col }
