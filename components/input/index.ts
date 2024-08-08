import type { App } from 'vue'
import Input from './Input.vue'

// 使用install方法，在app.use挂载
Input.install = (app: App): void => {
  app.component(Input.__name as string, Input)
}

export default Input
