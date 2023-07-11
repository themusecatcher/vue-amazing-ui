import type { App } from 'vue'
import Cascader from './Cascader.vue'

// 使用install方法，在app.use挂载
Cascader.install = (app: App) => {
  app.component(Cascader.__name as string, Cascader)
}

export default Cascader
