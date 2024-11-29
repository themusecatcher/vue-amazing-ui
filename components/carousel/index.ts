import type { App } from 'vue'
import Carousel from './Carousel.vue'
export type { Props, Image } from './Carousel.vue'

// 使用 install 方法，在 app.use 挂载
Carousel.install = (app: App) => {
  app.component(Carousel.__name as string, Carousel)
  return app
}

export default Carousel
