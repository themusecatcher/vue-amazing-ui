import type { App } from 'vue'
import Avatar from './Avatar.vue'
export type { Props, Responsive } from './Avatar.vue'

// 使用 install 方法，在 app.use 挂载
Avatar.install = (app: App) => {
  app.component(Avatar.__name as string, Avatar)
  return app
}

export default Avatar
