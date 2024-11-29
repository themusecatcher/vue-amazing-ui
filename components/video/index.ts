import type { App } from 'vue'
import Video from './Video.vue'
export type { Props } from './Video.vue'

// 使用 install 方法，在 app.use 挂载
Video.install = (app: App) => {
  app.component(Video.__name as string, Video)
  return app
}

export default Video
