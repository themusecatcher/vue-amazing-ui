import type { App } from 'vue'
import Badge from './Badge.vue'
export type { Props } from './Badge.vue'

// 使用 install 方法，在 app.use 挂载
Badge.install = (app: App) => {
  app.component(Badge.__name as string, Badge)
  return app
}

export default Badge
