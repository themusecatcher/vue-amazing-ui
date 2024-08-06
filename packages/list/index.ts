import type { App } from 'vue'
import List from './List.vue'
import ListItem from './ListItem.vue'
;[List, ListItem].forEach((component: any) => {
  // 使用install方法，在app.use挂载
  component.install = (app: App): void => {
    app.component(component.__name as string, component)
  }
})

export { List, ListItem }
