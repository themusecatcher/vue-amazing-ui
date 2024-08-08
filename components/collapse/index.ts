import type { App } from 'vue'
import Collapse from './Collapse.vue'

// 使用install方法，在app.use挂载
Collapse.install = (app: App): void => {
  app.component(Collapse.__name as string, Collapse)
}

export default Collapse
