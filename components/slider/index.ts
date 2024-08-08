import type { App } from 'vue'
import Slider from './Slider.vue'

// 使用install方法，在app.use挂载
Slider.install = (app: App): void => {
  app.component(Slider.__name as string, Slider)
}

export default Slider
