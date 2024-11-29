import type { App } from 'vue'
import Tag from './Tag.vue'
export type { Props, Tag } from './Tag.vue'

// 使用 install 方法，在 app.use 挂载
Tag.install = (app: App) => {
  app.component(Tag.__name as string, Tag)
  return app
}

export default Tag
