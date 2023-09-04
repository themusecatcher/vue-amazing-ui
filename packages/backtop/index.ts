import type { App } from 'vue'
import BackTop from './BackTop.vue'

// 使用install方法，在app.use挂载
BackTop.install = (app: App): void => {
  app.component(BackTop.__name as string, BackTop)
}

export default BackTop
