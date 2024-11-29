import type { App } from 'vue'
import Input from './Input.vue'
export type { Props } from './Input.vue'

// 使用 install 方法，在 app.use 挂载
Input.install = (app: App) => {
  app.component(Input.__name as string, Input)
  return app
}

export default Input
