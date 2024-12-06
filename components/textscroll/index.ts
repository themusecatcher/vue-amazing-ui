import type { App } from 'vue'
import TextScroll from './TextScroll.vue'
export type { Props, Item } from './TextScroll.vue'

// 使用 install 方法，在 app.use 挂载
TextScroll.install = (app: App) => {
  app.component(TextScroll.__name as string, TextScroll)
  return app
}

export default TextScroll
