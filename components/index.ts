import './style/global.less'
import type { App, Plugin } from 'vue'
import * as components from './components'
export * from './components'
export {
  dateFormat,
  formatNumber,
  rafTimeout,
  cancelRaf,
  throttle,
  debounce,
  add,
  downloadFile,
  toggleDark,
  useEventListener,
  useMutationObserver,
  useScroll,
  useFps,
  useMediaQuery,
  useResizeObserver,
  useSlotsExist,
  useInject,
  useOptionsSupported,
  getColorPalettes,
  getAlphaColor,
  getScrollParent,
  lockScroll,
  useScrollParent,
  useFloatingPosition
} from './utils'
export type { AnimationFrameID, DownloadOptions, DownloadStrategy, ScrollParentOptions } from './utils'
export { VueAmazingUIResolver } from './utils/resolver'
export type { VueAmazingUIResolverOptions } from './utils/resolver'

export const install = function (app: App) {
  Object.values(components).forEach((component) => {
    // 组件与 Provider 经 withInstall 包装后均带 install 方法，可直接作为插件安装；
    // useXxx / createDiscreteApi 等函数导出无 install，会被自然过滤
    const plugin = component as Plugin
    if (typeof plugin.install === 'function') {
      app.use(plugin)
    }
  })
  return app // 返回 app 以支持链式调用：app.use(A).use(B)
}

export default {
  install
}
