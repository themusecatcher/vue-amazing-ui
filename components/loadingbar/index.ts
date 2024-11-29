import type { App } from 'vue'
import LoadingBar from './LoadingBar.vue'
export type { Props } from './LoadingBar.vue'

// 使用 install 方法，在 app.use 挂载
LoadingBar.install = (app: App) => {
  app.component(LoadingBar.__name as string, LoadingBar)
  return app
}

export default LoadingBar
