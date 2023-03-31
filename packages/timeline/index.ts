import type { App } from 'vue'
import Timeline from './Timeline.vue'

// 使用install方法，在app.use挂载
Timeline.install = (app: App) => {
  app.component(Timeline.__name as string, Timeline)
}

export default Timeline
