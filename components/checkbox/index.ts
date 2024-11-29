import type { App } from 'vue'
import Checkbox from './Checkbox.vue'
export type { Props, Option } from './Checkbox.vue'

// 使用 install 方法，在 app.use 挂载
Checkbox.install = (app: App) => {
  app.component(Checkbox.__name as string, Checkbox)
  return app
}

export default Checkbox
