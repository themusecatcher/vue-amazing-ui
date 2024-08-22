import type { App } from 'vue'
import InputSearch from './InputSearch.vue'

// 使用install方法，在app.use挂载
InputSearch.install = (app: App): void => {
  app.component(InputSearch.__name as string, InputSearch)
}

export default InputSearch
