import type { App } from 'vue'
import Row from './Row.vue'

// 使用install方法，在app.use挂载
Row.install = (app: App): void => {
  app.component(Row.__name as string, Row)
}

export default Row
