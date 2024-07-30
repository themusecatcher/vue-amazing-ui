import type { App } from 'vue'
import LoadingBar from './LoadingBar.vue'

// 使用install方法，在app.use挂载
LoadingBar.install = (app: App): void => {
  app.component(LoadingBar.__name as string, LoadingBar)
}

export default LoadingBar
