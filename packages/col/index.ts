import type { App } from 'vue'
import Col from './Col.vue'

// 使用install方法，在app.use挂载
Col.install = (app: App): void => {
  app.component(Col.__name as string, Col)
}

export default Col
