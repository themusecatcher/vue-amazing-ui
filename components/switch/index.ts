import type { App } from 'vue'
import Switch from './Switch.vue'

// 使用install方法，在app.use挂载
Switch.install = (app: App) => {
  app.component(Switch.__name as string, Switch)
}

export default Switch
