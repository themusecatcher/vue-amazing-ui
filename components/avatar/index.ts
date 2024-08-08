import type { App } from 'vue'
import Avatar from './Avatar.vue'

// 使用install方法，在app.use挂载
Avatar.install = (app: App): void => {
  app.component(Avatar.__name as string, Avatar)
}

export default Avatar
