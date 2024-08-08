import type { App } from 'vue'
import Space from './Space.vue'

// 使用install方法，在app.use挂载
Space.install = (app: App): void => {
  app.component(Space.__name as string, Space)
}

export default Space
