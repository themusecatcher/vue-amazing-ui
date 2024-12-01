import type { App } from 'vue'
import Alert from './Alert.vue'
export type { Props } from './Alert.vue'

// 使用 install 方法，在 app.use 挂载
Alert.install = (app: App) => {
  app.component(Alert.__name as string, Alert)
  return app
}

export default Alert
