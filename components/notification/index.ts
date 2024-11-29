import type { App } from 'vue'
import Notification from './Notification.vue'
export type { Props, Notification } from './Notification.vue'

// 使用 install 方法，在 app.use 挂载
Notification.install = (app: App) => {
  app.component(Notification.__name as string, Notification)
  return app
}

export default Notification
