import type { App } from 'vue'
import Textarea from './Textarea.vue'
export type { Props } from './Textarea.vue'

// 使用 install 方法，在 app.use 挂载
Textarea.install = (app: App) => {
  app.component(Textarea.__name as string, Textarea)
  return app
}

export default Textarea
