import type { App } from 'vue'
import Swiper from './Swiper.vue'

// 使用install方法，在app.use挂载
Swiper.install = (app: App) => {
  app.component(Swiper.__name as string, Swiper)
}

export default Swiper
