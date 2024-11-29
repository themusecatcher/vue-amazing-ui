import type { App } from 'vue'
import Cascader from './Cascader.vue'
export type { Props, Option } from './Cascader.vue'

// 使用 install 方法，在 app.use 挂载
Cascader.install = (app: App) => {
  app.component(Cascader.__name as string, Cascader)
  return app
}

export default Cascader
