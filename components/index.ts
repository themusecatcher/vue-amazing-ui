import './less/global.less'
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
  useSlotsExist
} from './utils'
export { VueAmazingUIResolver } from './utils/resolver'

export const install = function (app: App) {
  Object.values(components).forEach((component) => {
    if (component.install) {
      app.use(component as unknown as Plugin)
    }
  })
  return app // 用于支持链式调用，例如: app.use(A).use(B)
}

export default {
  install
}
