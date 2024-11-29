import type { App } from 'vue'
import Row from './Row.vue'
import Col from './Col.vue'
export type { Props as RowProps, Responsive } from './Row.vue'
export type { Props as ColProps } from './Col.vue'

const components = [Row, Col]
components.forEach((component: any) => {
  // 使用 install 方法，在 app.use 挂载
  component.install = (app: App) => {
    app.component(component.__name as string, component)
    return app
  }
})

export { Row, Col }
