import type { App } from 'vue'
import Spin from './Spin.vue'

// 使用install方法，在app.use挂载
Spin.install = (app: App) => {
  app.component(Spin.__name as string, Spin)
}

export default Spin

