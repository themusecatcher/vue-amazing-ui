import type { App } from 'vue'
import TimePicker from './TimePicker.vue'

// 使用install方法，在app.use挂载
TimePicker.install = (app: App) => {
  app.component(TimePicker.__name as string, TimePicker)
}

export default TimePicker
