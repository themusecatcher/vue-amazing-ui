import type { App } from 'vue'
import Statistic from './Statistic.vue'

// 使用install方法，在app.use挂载
Statistic.install = (app: App) => {
  app.component(Statistic.__name as string, Statistic)
}

export default Statistic

