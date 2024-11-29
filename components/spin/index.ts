import type { App } from 'vue'
import Spin from './Spin.vue'
export type { Props } from './Spin.vue'

// 使用 install 方法，在 app.use 挂载
Spin.install = (app: App) => {
  app.component(Spin.__name as string, Spin)
  return app
}

export default Spin
