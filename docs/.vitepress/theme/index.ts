import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed, defineComponent, h } from 'vue'
import './global.less' // global less
import GlobalElement from './components/GlobalElement.vue'
import VersionBadge from './components/VersionBadge.vue'
import VersionDateTag from './components/VersionDateTag.vue'
import { themePrimary } from './theme-color'
// 组件库统一从构建产物 dist 引入，不使用 'vue-amazing-ui' 说明符（该说明符在 src 演示环境指向源码出口）
import VueAmazingUI, {
  ConfigProvider,
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

// 版本号常驻展示：桌面/中屏在导航栏右侧，<768px 隐藏导航栏徽标、由移动端菜单承载
const layoutSlots = {
  'nav-bar-content-after': () => h(VersionBadge),
  'nav-screen-content-after': () => h(VersionBadge, { screen: true })
}

// 全局包裹各 Provider，使 docs 页面内可直接使用 useLoadingBar / useMessage / useModal / useNotification / useDialog（与 demo 应用 App.vue 保持一致）
// 最外层的 ConfigProvider 把文档站的 appearance 开关与自定义主色接到组件库主题上：
//   `useData().isDark`（VitePress 的 html.dark）→ `theme.mode` → 库的暗色变量表
//   `themePrimary`（右下角常驻浮钮里的取色器）→ `theme.seed.primary` → 主色系变量
// `abstract` 显式传 true：文档站有大量 Teleport 到 body 的浮层（弹窗、消息、选择面板），
// 只有写 `<html>` 才能让它们跟上暗色与主色；默认值 false 只覆盖 Provider 自己的子树
const Layout = defineComponent({
  setup() {
    const { isDark } = useData()
    const theme = computed(() => ({
      mode: isDark.value ? ('dark' as const) : ('light' as const),
      seed: { primary: themePrimary.value }
    }))
    return () =>
      h(
        ConfigProvider,
        { theme: theme.value, abstract: true },
        {
          default: () =>
            h(LoadingBarProvider, null, {
              default: () =>
                h(MessageProvider, null, {
                  default: () =>
                    h(ModalProvider, null, {
                      default: () =>
                        h(DialogProvider, null, {
                          default: () =>
                            h(NotificationProvider, null, {
                              default: () => h(DefaultTheme.Layout, null, layoutSlots)
                            })
                        })
                    })
                })
            })
        }
      )
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
