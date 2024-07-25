import type { App } from 'vue'
import Descriptions from './Descriptions.vue'
import DescriptionsItem from './DescriptionsItem.vue'

// 使用install方法，在app.use挂载
Descriptions.install = (app: App): void => {
  app.component(Descriptions.__name as string, Descriptions)
}
DescriptionsItem.install = (app: App): void => {
  app.component(DescriptionsItem.__name as string, DescriptionsItem)
}

export { Descriptions, DescriptionsItem } 
