import type { App } from 'vue'
import GradientText from './GradientText.vue'

// 使用install方法，在app.use挂载
GradientText.install = (app: App): void => {
  app.component(GradientText.__name as string, GradientText)
}

export default GradientText
