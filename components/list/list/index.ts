import type { App } from 'vue'
import List from './List.vue'
export type { Props as ListProps } from './List.vue'

// 使用 install 方法，在 app.use 挂载
List.install = (app: App) => {
  app.component(List.__name as string, List)
  return app
}

export default List
