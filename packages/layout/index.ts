import type { App } from 'vue'
import Layout from './Layout.vue'

// 使用install方法，在app.use挂载
Layout.install = (app: App): void => {
  app.component(Layout.__name as string, Layout)
}

export default Layout
