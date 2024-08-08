import type { App } from 'vue'
import FloatButton from './FloatButton.vue'

// 使用install方法，在app.use挂载
FloatButton.install = (app: App): void => {
  app.component(FloatButton.__name as string, FloatButton)
}

export default FloatButton
