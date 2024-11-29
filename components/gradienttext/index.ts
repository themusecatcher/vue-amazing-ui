import type { App } from 'vue'
import GradientText from './GradientText.vue'
export type { Props, Gradient } from './GradientText.vue'

// 使用 install 方法，在 app.use 挂载
GradientText.install = (app: App) => {
  app.component(GradientText.__name as string, GradientText)
  return app
}

export default GradientText
