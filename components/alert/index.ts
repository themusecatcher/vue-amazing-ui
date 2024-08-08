import type { App } from 'vue'
import Alert from './Alert.vue'

// 使用install方法，在app.use挂载
Alert.install = (app: App): void => {
  app.component(Alert.__name as string, Alert)
}

export default Alert
