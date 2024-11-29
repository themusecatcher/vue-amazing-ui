import type { App } from 'vue'
import Space from './Space.vue'
export type { Props } from './Space.vue'

// 使用 install 方法，在 app.use 挂载
Space.install = (app: App) => {
  app.component(Space.__name as string, Space)
  return app
}

export default Space
