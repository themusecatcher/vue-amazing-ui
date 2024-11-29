import type { App } from 'vue'
import Swiper from './Swiper.vue'
export type { Props, Image } from './Swiper.vue'

// 使用 install 方法，在 app.use 挂载
Swiper.install = (app: App) => {
  app.component(Swiper.__name as string, Swiper)
  return app
}

export default Swiper
