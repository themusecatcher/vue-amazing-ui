import type { App } from 'vue'
import InputSearch from './InputSearch.vue'
export type { Props } from './InputSearch.vue'

// 使用 install 方法，在 app.use 挂载
InputSearch.install = (app: App) => {
  app.component(InputSearch.__name as string, InputSearch)
  return app
}

export default InputSearch
