import type { App } from 'vue'
import Scrollbar from './Scrollbar.vue'

// 使用install方法，在app.use挂载
Scrollbar.install = (app: App): void => {
  app.component(Scrollbar.__name as string, Scrollbar)
}

export default Scrollbar
