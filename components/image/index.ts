import type { App } from 'vue'
import Image from './Image.vue'
export type { Props, Image } from './Image.vue'

// 使用 install 方法，在 app.use 挂载
Image.install = (app: App) => {
  app.component(Image.__name as string, Image)
  return app
}

export default Image
