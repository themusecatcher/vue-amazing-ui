import DefaultTheme from 'vitepress/theme'
import { defineComponent, h } from 'vue'
import './global.less' // global less
import GlobalElement from './components/GlobalElement.vue'
import VersionDateTag from './components/VersionDateTag.vue'
// import VueAmazingUI from 'vue-amazing-ui'
// import 'vue-amazing-ui/css'
import VueAmazingUI from '../../../dist/index'
// 注意：Provider 必须与页面演示 script 中的 useXxx 共享同一 injection key。
// 页面 script 的 import { useMessage } from 'vue-amazing-ui' 走 vite alias 指向源码出口（components/index.ts），
// 若此处从 dist 导入 Provider，dist 与源码各生成独立的 Symbol('messageApi')，inject 将无法命中。
import { MessageProvider, ModalProvider, NotificationProvider } from 'vue-amazing-ui'
import '../../../dist/style.css'

// 全局包裹各 Provider，使 docs 页面内可直接使用 useMessage / useModal / useNotification（与 demo 应用 App.vue 保持一致）
const Layout = defineComponent({
  setup() {
    return () =>
      h(MessageProvider, null, {
        default: () =>
          h(ModalProvider, null, {
            default: () =>
              h(NotificationProvider, null, {
                default: () => h(DefaultTheme.Layout)
              })
          })
      })
  }
})

export default {
  extends: DefaultTheme, // or ...DefaultTheme
  enhanceApp({ app }) {
    app.component('GlobalElement', GlobalElement)
    app.component('VersionDateTag', VersionDateTag)
    app.use(VueAmazingUI)
  },
  Layout
}
