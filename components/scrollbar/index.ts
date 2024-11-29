import type { App } from 'vue'
import Scrollbar from './Scrollbar.vue'
export type { Props } from './Scrollbar.vue'

// 使用 install 方法，在 app.use 挂载
Scrollbar.install = (app: App) => {
  app.component(Scrollbar.__name as string, Scrollbar)
  return app
}

export default Scrollbar
