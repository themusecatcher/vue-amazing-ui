import type { App } from 'vue'
import Radio from './Radio.vue'

// 使用install方法，在app.use挂载
Radio.install = (app: App): void => {
  app.component(Radio.__name as string, Radio)
}

export default Radio