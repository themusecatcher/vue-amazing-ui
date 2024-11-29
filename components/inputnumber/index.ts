import type { App } from 'vue'
import InputNumber from './InputNumber.vue'
export type { Props } from './InputNumber.vue'

// 使用 install 方法，在 app.use 挂载
InputNumber.install = (app: App) => {
  app.component(InputNumber.__name as string, InputNumber)
  return app
}

export default InputNumber
