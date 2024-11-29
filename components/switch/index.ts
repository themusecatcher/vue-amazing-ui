import type { App } from 'vue'
import Switch from './Switch.vue'
export type { Props } from './Switch.vue'

// 使用 install 方法，在 app.use 挂载
Switch.install = (app: App) => {
  app.component(Switch.__name as string, Switch)
  return app
}

export default Switch
