import type { App } from 'vue'
import Watermark from './Watermark.vue'
export type { Props, Font } from './Watermark.vue'

// 使用 install 方法，在 app.use 挂载
Watermark.install = (app: App) => {
  app.component(Watermark.__name as string, Watermark)
  return app
}

export default Watermark
