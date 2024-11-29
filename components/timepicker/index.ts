import type { App } from 'vue'
import TimePicker from './TimePicker.vue'
export type { Props, DisabledTime } from './TimePicker.vue'

// 使用 install 方法，在 app.use 挂载
TimePicker.install = (app: App) => {
  app.component(TimePicker.__name as string, TimePicker)
  return app
}

export default TimePicker
