import type { App } from 'vue'
import Waterfall from './Waterfall.vue'
export type { Props, Image } from './Waterfall.vue'

// 使用 install 方法，在 app.use 挂载
Waterfall.install = (app: App) => {
  app.component(Waterfall.__name as string, Waterfall)
  return app
}

export default Waterfall
