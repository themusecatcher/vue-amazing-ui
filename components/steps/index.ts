import type { App } from 'vue'
import Steps from './Steps.vue'
export type { Props, Step } from './Steps.vue'

// 使用 install 方法，在 app.use 挂载
Steps.install = (app: App) => {
  app.component(Steps.__name as string, Steps)
  return app
}

export default Steps
