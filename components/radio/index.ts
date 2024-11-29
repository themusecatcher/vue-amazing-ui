import type { App } from 'vue'
import Radio from './Radio.vue'
export type { Props, Option } from './Radio.vue'

// 使用 install 方法，在 app.use 挂载
Radio.install = (app: App) => {
  app.component(Radio.__name as string, Radio)
  return app
}

export default Radio
