import type { App } from 'vue'
import Descriptions from './Descriptions.vue'

// 使用install方法，在app.use挂载
Descriptions.install = (app: App): void => {
  app.component(Descriptions.__name as string, Descriptions)
}

export default Descriptions
