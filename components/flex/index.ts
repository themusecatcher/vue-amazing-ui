import type { App } from 'vue'
import Flex from './Flex.vue'

// 使用install方法，在app.use挂载
Flex.install = (app: App): void => {
  app.component(Flex.__name as string, Flex)
}

export default Flex
