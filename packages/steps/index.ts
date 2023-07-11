import type { App } from 'vue'
import Steps from './Steps.vue'

// 使用install方法，在app.use挂载
Steps.install = (app: App) => {
  app.component(Steps.__name as string, Steps)
}

export default Steps

