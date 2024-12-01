import type { App } from 'vue'
import DescriptionsItem from './DescriptionsItem.vue'
export type { Props as DescriptionsItemProps } from './DescriptionsItem.vue'

// 使用 install 方法，在 app.use 挂载
DescriptionsItem.install = (app: App) => {
  app.component(DescriptionsItem.__name as string, DescriptionsItem)
  return app
}

export default DescriptionsItem
