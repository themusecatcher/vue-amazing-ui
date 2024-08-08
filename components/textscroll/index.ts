import type { App } from 'vue'
import TextScroll from './TextScroll.vue'

// 使用install方法，在app.use挂载
TextScroll.install = (app: App) => {
  app.component(TextScroll.__name as string, TextScroll)
}

export default TextScroll
