import type { App } from 'vue'
import Waterfall from './Waterfall.vue'

// 使用install方法，在app.use挂载
Waterfall.install = (app: App): void => {
  app.component(Waterfall.__name as string, Waterfall)
}

export default Waterfall
