import type { App } from 'vue'
import Button from './Button.vue'
export type { Props } from './Button.vue'

// 使用 install 方法，在 app.use 挂载
Button.install = (app: App) => {
  app.component(Button.__name as string, Button)
  return app
}

export default Button
