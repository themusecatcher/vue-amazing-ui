import type { App } from 'vue'
import Dialog from './Dialog.vue'
export type { Props } from './Dialog.vue'

// 使用 install 方法，在 app.use 挂载
Dialog.install = (app: App) => {
  app.component(Dialog.__name as string, Dialog)
  return app
}

export default Dialog
