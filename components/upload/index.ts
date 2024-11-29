import type { App } from 'vue'
import Upload from './Upload.vue'
export type { Props, MessageType, FileType } from './Upload.vue'

// 使用 install 方法，在 app.use 挂载
Upload.install = (app: App) => {
  app.component(Upload.__name as string, Upload)
  return app
}

export default Upload
