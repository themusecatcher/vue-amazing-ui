import type { App } from 'vue'
import Select from './Select.vue'

// 使用install方法，在app.use挂载
Select.install = (app: App): void => {
  app.component(Select.__name as string, Select)
}

export default Select