import type { App } from 'vue'
import Modal from './Modal.vue'

// 使用install方法，在app.use挂载
Modal.install = (app: App): void => {
  app.component(Modal.__name as string, Modal)
}

export default Modal
