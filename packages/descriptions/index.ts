import type { App } from 'vue'
import Descriptions from './Descriptions.vue'
import DescriptionsItem from './DescriptionsItem.vue'
;[Descriptions, DescriptionsItem].forEach((component: any) => {
  // 使用install方法，在app.use挂载
  component.install = (app: App): void => {
    app.component(component.__name as string, component)
  }
})

export { Descriptions, DescriptionsItem }
