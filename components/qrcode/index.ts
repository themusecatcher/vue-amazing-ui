import type { App } from 'vue'
import QRCode from './QRCode.vue'
export type { Props } from './QRCode.vue'

// 使用 install 方法，在 app.use 挂载
QRCode.install = (app: App) => {
  app.component(QRCode.__name as string, QRCode)
  return app
}

export default QRCode
