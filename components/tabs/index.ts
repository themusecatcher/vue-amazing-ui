import type { App } from 'vue'
import Tabs from './Tabs.vue'
export type { Props, Tab } from './Tabs.vue'

// 使用 install 方法，在 app.use 挂载
Tabs.install = (app: App) => {
  app.component(Tabs.__name as string, Tabs)
  return app
}

export default Tabs
