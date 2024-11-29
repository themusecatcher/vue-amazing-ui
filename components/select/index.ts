import type { App } from 'vue'
import Select from './Select.vue'
export type { Props, Option } from './Select.vue'

// 使用 install 方法，在 app.use 挂载
Select.install = (app: App) => {
  app.component(Select.__name as string, Select)
  return app
}

export default Select
