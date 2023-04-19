import type { App } from 'vue'
import CodeMirror from './CodeMirror.vue'

// 使用install方法，在app.use挂载
CodeMirror.install = (app: App): void => {
  app.component(CodeMirror.__name as string, CodeMirror)
}

export default CodeMirror