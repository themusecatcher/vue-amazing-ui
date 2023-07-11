import type { App } from 'vue'
import Notification from './Notification.vue'

// 使用install方法，在app.use挂载
Notification.install = (app: App): void => {
  app.component(Notification.__name as string, Notification)
}

export default Notification
