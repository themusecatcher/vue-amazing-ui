import './less/global.less'
import type { App } from 'vue'
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

export const install = function (app: App) {
  Object.keys(components).forEach((key) => {
    const component = components[key as keyof typeof components]
    if (component.install) {
      app.use(component)
    }
  })
  return app // 用于支持链式调用，例如: app.use(A).use(B)
}

export default {
  install
}
