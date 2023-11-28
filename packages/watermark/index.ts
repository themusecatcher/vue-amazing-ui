import type { App } from 'vue'
import Watermark from './Watermark.vue'

// 使用install方法，在app.use挂载
Watermark.install = (app: App): void => {
  app.component(Watermark.__name as string, Watermark)
}

export default Watermark
