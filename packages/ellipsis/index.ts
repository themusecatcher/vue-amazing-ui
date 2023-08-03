import type { App } from 'vue'
import Ellipsis from './Ellipsis.vue'

// 使用install方法，在app.use挂载
Ellipsis.install = (app: App): void => {
  app.component(Ellipsis.__name as string, Ellipsis)
}

export default Ellipsis
