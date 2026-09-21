import DefaultTheme from 'vitepress/theme'
import { defineComponent, h } from 'vue'
import './global.less' // global less
import GlobalElement from './components/GlobalElement.vue'
import VersionDateTag from './components/VersionDateTag.vue'
// 组件库统一从构建产物 dist 引入，不使用 'vue-amazing-ui' 说明符（该说明符在 src 演示环境指向源码出口）
import VueAmazingUI, {
  LoadingBarProvider,
  MessageProvider,
  ModalProvider,
  DialogProvider,
  NotificationProvider
} from '../../../dist/index'
// 注意：Provider 必须与页面演示 script 中的 useXxx 共享同一 injection key。
// 页面 script 写作 import { useMessage } from 'vue-amazing-ui'，由 docs/.vitepress/config.ts
// 的 resolveId 钩子同样指向 dist 产物，二者 Symbol 同源，inject 方可命中。
import '../../../dist/style.css'

// 全局包裹各 Provider，使 docs 页面内可直接使用 useLoadingBar / useMessage / useModal / useNotification / useDialog（与 demo 应用 App.vue 保持一致）
const Layout = defineComponent({
  setup() {
    return () =>
      h(LoadingBarProvider, null, {
        default: () =>
          h(MessageProvider, null, {
            default: () =>
              h(ModalProvider, null, {
                default: () =>
                  h(DialogProvider, null, {
                    default: () =>
                      h(NotificationProvider, null, {
                        default: () => h(DefaultTheme.Layout)
                      })
                  })
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
