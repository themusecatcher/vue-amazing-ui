import type { App } from 'vue'
import List from './List.vue'
import ListItem from './ListItem.vue'
export type { Props as ListProps } from './List.vue'
export type { Props as ListItemProps } from './ListItem.vue'

const components = [List, ListItem]
components.forEach((component: any) => {
  // 使用 install 方法，在 app.use 挂载
  component.install = (app: App) => {
    app.component(component.__name as string, component)
    return app
  }
})

export { List, ListItem }
