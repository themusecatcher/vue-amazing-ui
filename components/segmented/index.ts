import type { App } from 'vue'
import Segmented from './Segmented.vue'
export type { Props, Option } from './Segmented.vue'

// 使用 install 方法，在 app.use 挂载
Segmented.install = (app: App) => {
  app.component(Segmented.__name as string, Segmented)
  return app
}

export default Segmented
