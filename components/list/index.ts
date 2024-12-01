import type { App } from 'vue'
import List from './List.vue'
import ListItem from './ListItem.vue'
export type { Props as ListProps } from './List.vue'
export type { Props as ListItemProps } from './ListItem.vue'

// 使用 install 方法，在 app.use 挂载
List.install = (app: App) => {
  app.component(List.__name as string, List)
  return app
}
// 使用 install 方法，在 app.use 挂载
ListItem.install = (app: App) => {
  app.component(ListItem.__name as string, ListItem)
  return app
}

export { List, ListItem }
