import type { App } from 'vue'
import Statistic from './Statistic.vue'
export type { Props } from './Statistic.vue'

// 使用 install 方法，在 app.use 挂载
Statistic.install = (app: App) => {
  app.component(Statistic.__name as string, Statistic)
  return app
}

export default Statistic
