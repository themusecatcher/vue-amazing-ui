import type { App } from 'vue'
import Progress from './Progress.vue'

// 使用install方法，在app.use挂载
Progress.install = (app: App): void => {
  app.component(Progress.__name as string, Progress)
}

export default Progress
