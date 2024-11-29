import type { App } from 'vue'
import Result from './Result.vue'
export type { Props } from './Result.vue'

// 使用 install 方法，在 app.use 挂载
Result.install = (app: App) => {
  app.component(Result.__name as string, Result)
  return app
}

export default Result
