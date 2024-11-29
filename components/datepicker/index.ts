import type { App } from 'vue'
import DatePicker from './DatePicker.vue'
export type { Props } from './DatePicker.vue'

// 使用 install 方法，在 app.use 挂载
DatePicker.install = (app: App) => {
  app.component(DatePicker.__name as string, DatePicker)
  return app
}

export default DatePicker
