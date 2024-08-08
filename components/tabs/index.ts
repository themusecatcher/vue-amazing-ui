import type { App } from 'vue'
import Tabs from './Tabs.vue'

// 使用install方法，在app.use挂载
Tabs.install = (app: App): void => {
  app.component(Tabs.__name as string, Tabs)
}

export default Tabs
