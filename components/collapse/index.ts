import type { App } from 'vue'
import Collapse from './Collapse.vue'
export type { Props, Item } from './Collapse.vue'

// 使用 install 方法，在 app.use 挂载
Collapse.install = (app: App) => {
  app.component(Collapse.__name as string, Collapse)
  return app
}

export default Collapse
