import type { App } from 'vue'
import Divider from './Divider.vue'
export type { Props } from './Divider.vue'

// 使用 install 方法，在 app.use 挂载
Divider.install = (app: App) => {
  app.component(Divider.__name as string, Divider)
  return app
}

export default Divider
