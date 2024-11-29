import type { App } from 'vue'
import NumberAnimation from './NumberAnimation.vue'
export type { Props } from './NumberAnimation.vue'

// 使用 install 方法，在 app.use 挂载
NumberAnimation.install = (app: App) => {
  app.component(NumberAnimation.__name as string, NumberAnimation)
  return app
}

export default NumberAnimation
