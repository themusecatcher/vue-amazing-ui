import type { App } from 'vue'
import InputNumber from './InputNumber.vue'

// 使用install方法，在app.use挂载
InputNumber.install = (app: App): void => {
  app.component(InputNumber.__name as string, InputNumber)
}

export default InputNumber
