import type { App } from 'vue'
import Descriptions from './Descriptions.vue'
import DescriptionsItem from './DescriptionsItem.vue'
export type { Props as DescriptionsProps, Responsive } from './Descriptions.vue'
export type { Props as DescriptionsItemProps } from './DescriptionsItem.vue'

const components = [Descriptions, DescriptionsItem]
components.forEach((component: any) => {
  // 使用 install 方法，在 app.use 挂载
  component.install = (app: App) => {
    app.component(component.__name as string, component)
    return app
  }
})

export { Descriptions, DescriptionsItem }
