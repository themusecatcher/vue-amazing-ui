import type { App } from 'vue'
import Countdown from './Countdown.vue'
export type { Props } from './Countdown.vue'

// 使用 install 方法，在 app.use 挂载
Countdown.install = (app: App) => {
  app.component(Countdown.__name as string, Countdown)
  return app
}

export default Countdown
