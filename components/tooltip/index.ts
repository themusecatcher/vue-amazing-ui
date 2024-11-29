import type { App } from 'vue'
import Tooltip from './Tooltip.vue'
export type { Props } from './Tooltip.vue'

// 使用 install 方法，在 app.use 挂载
Tooltip.install = (app: App) => {
  app.component(Tooltip.__name as string, Tooltip)
  return app
}

export default Tooltip
