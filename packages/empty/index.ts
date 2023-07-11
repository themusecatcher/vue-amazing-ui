import type { App } from 'vue'
import Empty from './Empty.vue'

// 使用install方法，在app.use挂载
Empty.install = (app: App): void => {
  app.component(Empty.__name as string, Empty)
}

export default Empty
