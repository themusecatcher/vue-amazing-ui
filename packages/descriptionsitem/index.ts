import type { App } from 'vue'
import DescriptionsItem from './DescriptionsItem.vue'

// 使用install方法，在app.use挂载
DescriptionsItem.install = (app: App): void => {
  app.component(DescriptionsItem.__name as string, DescriptionsItem)
}

export default DescriptionsItem
