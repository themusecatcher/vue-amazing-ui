import type { App } from 'vue'
import Descriptions from './Descriptions.vue'
export type { Props as DescriptionsProps, Responsive } from './Descriptions.vue'

// 使用 install 方法，在 app.use 挂载
Descriptions.install = (app: App) => {
  app.component(Descriptions.__name as string, Descriptions)
  return app
}

export default Descriptions
