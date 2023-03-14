import type { App } from 'vue'
import Dialog from './Dialog.vue'

// 使用install方法，在app.use挂载
Dialog.install = (app: App): void => {
  app.component(Dialog.__name as string, Dialog)
}

export default Dialog