import type { App } from 'vue'
import BackTop from './BackTop.vue'
export type { Props } from './BackTop.vue'

// 使用 install 方法，在 app.use 挂载
BackTop.install = (app: App) => {
  app.component(BackTop.__name as string, BackTop)
  return app
}

export default BackTop
