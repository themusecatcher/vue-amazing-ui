import type { App } from 'vue'
import Carousel from './Carousel.vue'

// 使用install方法，在app.use挂载
Carousel.install = (app: App) => {
  app.component(Carousel.__name as string, Carousel)
}

export default Carousel
