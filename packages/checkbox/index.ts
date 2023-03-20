import type { App } from 'vue'
import Checkbox from './Checkbox.vue'

// 使用install方法，在app.use挂载
Checkbox.install = (app: App): void => {
  app.component(Checkbox.__name as string, Checkbox)
}

export default Checkbox