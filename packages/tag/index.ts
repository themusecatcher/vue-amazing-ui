import type { App } from 'vue'
import Tag from './Tag.vue'

// 使用install方法，在app.use挂载
Tag.install = (app: App) => {
  app.component(Tag.__name as string, Tag)
}

export default Tag

