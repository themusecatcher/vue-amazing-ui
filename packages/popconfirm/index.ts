import type { App } from 'vue'
import Popconfirm from './Popconfirm.vue'

// 使用install方法，在app.use挂载
Popconfirm.install = (app: App): void => {
  app.component(Popconfirm.__name as string, Popconfirm)
}

export default Popconfirm
