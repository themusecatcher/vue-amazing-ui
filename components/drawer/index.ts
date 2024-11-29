import type { App } from 'vue'
import Drawer from './Drawer.vue'
export type { Props } from './Drawer.vue'

// 使用 install 方法，在 app.use 挂载
Drawer.install = (app: App) => {
  app.component(Drawer.__name as string, Drawer)
  return app
}

export default Drawer
