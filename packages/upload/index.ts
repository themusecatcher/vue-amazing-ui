import type { App } from 'vue'
import Upload from './Upload.vue'

// 使用install方法，在app.use挂载
Upload.install = (app: App): void => {
  app.component(Upload.__name as string, Upload)
}

export default Upload