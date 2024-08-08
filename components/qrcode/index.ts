import type { App } from 'vue'
import QRCode from './QRCode.vue'

// 使用install方法，在app.use挂载
QRCode.install = (app: App): void => {
  app.component(QRCode.__name as string, QRCode)
}

export default QRCode
