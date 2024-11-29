import type { App } from 'vue'
import Popover from './Popover.vue'
export type { Props } from './Popover.vue'

// 使用 install 方法，在 app.use 挂载
Popover.install = (app: App) => {
  app.component(Popover.__name as string, Popover)
  return app
}

export default Popover
