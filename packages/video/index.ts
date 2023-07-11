import type { App } from 'vue'
import Video from './Video.vue'

// 使用install方法，在app.use挂载
Video.install = (app: App): void => {
  app.component(Video.__name as string, Video)
}

export default Video
