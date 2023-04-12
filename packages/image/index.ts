import type { App } from 'vue'
import Image from './Image.vue'

// 使用install方法，在app.use挂载
Image.install = (app: App): void => {
  app.component(Image.__name as string, Image)
}

export default Image