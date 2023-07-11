import type { App } from 'vue'
import Drawer from './Drawer.vue'

// 使用install方法，在app.use挂载
Drawer.install = (app: App): void => {
  app.component(Drawer.__name as string, Drawer)
}

export default Drawer
