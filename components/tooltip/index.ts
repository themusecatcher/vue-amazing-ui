import type { App } from 'vue'
import Tooltip from './Tooltip.vue'

// 使用install方法，在app.use挂载
Tooltip.install = (app: App): void => {
  app.component(Tooltip.__name as string, Tooltip)
}

export default Tooltip
