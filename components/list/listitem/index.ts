import type { App } from 'vue'
import ListItem from './ListItem.vue'
export type { Props as ListItemProps } from './ListItem.vue'

// 使用 install 方法，在 app.use 挂载
// 使用 install 方法，在 app.use 挂载
ListItem.install = (app: App) => {
  app.component(ListItem.__name as string, ListItem)
  return app
}

export default ListItem
