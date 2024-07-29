import type { App } from 'vue'
import Row from './Row.vue'
import Col from './Col.vue'

[Row, Col].forEach((component: any) => {
  // 使用install方法，在app.use挂载
  component.install = (app: App): void => {
    app.component(component.__name as string, component)
  }
})

export { Row, Col }
