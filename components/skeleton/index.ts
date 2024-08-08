import type { App } from 'vue'
import Skeleton from './Skeleton.vue'

// 使用install方法，在app.use挂载
Skeleton.install = (app: App): void => {
  app.component(Skeleton.__name as string, Skeleton)
}

export default Skeleton
