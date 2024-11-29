import type { App } from 'vue'
import Timeline from './Timeline.vue'
export type { Props, Item } from './Timeline.vue'

// 使用 install 方法，在 app.use 挂载
Timeline.install = (app: App) => {
  app.component(Timeline.__name as string, Timeline)
  return app
}

export default Timeline
