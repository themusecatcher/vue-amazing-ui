import type { App } from 'vue'
import Empty from './Empty.vue'
export type { Props } from './Empty.vue'

// 使用 install 方法，在 app.use 挂载
Empty.install = (app: App) => {
  app.component(Empty.__name as string, Empty)
  return app
}

export default Empty
