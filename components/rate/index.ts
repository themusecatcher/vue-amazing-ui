import type { App } from 'vue'
import Rate from './Rate.vue'

// 使用install方法，在app.use挂载
Rate.install = (app: App): void => {
  app.component(Rate.__name as string, Rate)
}

export default Rate
