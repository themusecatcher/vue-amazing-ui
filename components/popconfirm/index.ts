import type { App } from 'vue'
import Popconfirm from './Popconfirm.vue'
export type { Props } from './Popconfirm.vue'

// 使用 install 方法，在 app.use 挂载
Popconfirm.install = (app: App) => {
  app.component(Popconfirm.__name as string, Popconfirm)
  return app
}

export default Popconfirm
