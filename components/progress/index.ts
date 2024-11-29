import type { App } from 'vue'
import Progress from './Progress.vue'
export type { Props, Gradient } from './Progress.vue'

// 使用 install 方法，在 app.use 挂载
Progress.install = (app: App) => {
  app.component(Progress.__name as string, Progress)
  return app
}

export default Progress
