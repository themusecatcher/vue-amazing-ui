import type { App } from 'vue'
import Result from './Result.vue'

// 使用install方法，在app.use挂载
Result.install = (app: App): void => {
  app.component(Result.__name as string, Result)
}

export default Result
