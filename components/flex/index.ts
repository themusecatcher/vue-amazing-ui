import type { App } from 'vue'
import Flex from './Flex.vue'
export type { Props } from './Flex.vue'

// 使用 install 方法，在 app.use 挂载
Flex.install = (app: App) => {
  app.component(Flex.__name as string, Flex)
  return app
}

export default Flex
