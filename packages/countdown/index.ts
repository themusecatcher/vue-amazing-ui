import type { App } from 'vue'
import Countdown from './Countdown.vue'

// 使用install方法，在app.use挂载
Countdown.install = (app: App) => {
  app.component(Countdown.__name as string, Countdown)
}

export default Countdown
