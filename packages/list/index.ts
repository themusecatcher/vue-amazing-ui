import type { App } from 'vue'
import List from './List.vue'

// 使用install方法，在app.use挂载
List.install = (app: App): void => {
  app.component(List.__name as string, List)
}

export default List
