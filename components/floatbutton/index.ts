import type { App } from 'vue'
import FloatButton from './FloatButton.vue'
export type { Props } from './FloatButton.vue'

// 使用 install 方法，在 app.use 挂载
FloatButton.install = (app: App) => {
  app.component(FloatButton.__name as string, FloatButton)
  return app
}

export default FloatButton
