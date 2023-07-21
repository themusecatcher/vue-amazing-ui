import type { App } from 'vue'
import Textarea from './Textarea.vue'

// 使用install方法，在app.use挂载
Textarea.install = (app: App) => {
  app.component(Textarea.__name as string, Textarea)
}

export default Textarea

