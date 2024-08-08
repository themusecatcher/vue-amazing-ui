import type { App } from 'vue'
import Segmented from './Segmented.vue'

// 使用install方法，在app.use挂载
Segmented.install = (app: App): void => {
  app.component(Segmented.__name as string, Segmented)
}

export default Segmented
