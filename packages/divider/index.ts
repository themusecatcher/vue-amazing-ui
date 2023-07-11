import type { App } from 'vue'
import Divider from './Divider.vue'

// 使用install方法，在app.use挂载
Divider.install = (app: App): void => {
  app.component(Divider.__name as string, Divider)
}

export default Divider
