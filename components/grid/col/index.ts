import type { App } from 'vue'
import Col from './Col.vue'
export type { Props as ColProps } from './Col.vue'

// 使用 install 方法，在 app.use 挂载
Col.install = (app: App) => {
  app.component(Col.__name as string, Col)
  return app
}

export default Col
