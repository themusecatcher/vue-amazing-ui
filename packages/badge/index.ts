import type { App } from 'vue'
import Badge from './Badge.vue'

// 使用install方法，在app.use挂载
Badge.install = (app: App) => {
  app.component(Badge.__name as string, Badge)
}

export default Badge
