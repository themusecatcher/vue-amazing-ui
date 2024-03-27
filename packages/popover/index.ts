import type { App } from 'vue'
import Popover from './Popover.vue'

// 使用install方法，在app.use挂载
Popover.install = (app: App): void => {
  app.component(Popover.__name as string, Popover)
}

export default Popover
