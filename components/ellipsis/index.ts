import type { App } from 'vue'
import Ellipsis from './Ellipsis.vue'
export type { Props } from './Ellipsis.vue'

// 使用 install 方法，在 app.use 挂载
Ellipsis.install = (app: App) => {
  app.component(Ellipsis.__name as string, Ellipsis)
  return app
}

export default Ellipsis
