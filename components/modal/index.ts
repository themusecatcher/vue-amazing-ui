import type { App } from 'vue'
import Modal from './Modal.vue'
export type { Props, Modal } from './Modal.vue'

// 使用 install 方法，在 app.use 挂载
Modal.install = (app: App) => {
  app.component(Modal.__name as string, Modal)
  return app
}

export default Modal
