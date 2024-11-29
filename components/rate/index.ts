import type { App } from 'vue'
import Rate from './Rate.vue'
export type { Props } from './Rate.vue'

// 使用 install 方法，在 app.use 挂载
Rate.install = (app: App) => {
  app.component(Rate.__name as string, Rate)
  return app
}

export default Rate
