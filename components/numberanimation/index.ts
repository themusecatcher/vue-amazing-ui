import type { App } from 'vue'
import NumberAnimation from './NumberAnimation.vue'

// 使用install方法，在app.use挂载
NumberAnimation.install = (app: App): void => {
  app.component(NumberAnimation.__name as string, NumberAnimation)
}

export default NumberAnimation
