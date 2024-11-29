import type { App } from 'vue'
import Slider from './Slider.vue'
export type { Props } from './Slider.vue'

// 使用 install 方法，在 app.use 挂载
Slider.install = (app: App) => {
  app.component(Slider.__name as string, Slider)
  return app
}

export default Slider
