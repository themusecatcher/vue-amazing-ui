import LoadingBarProviderComp from './LoadingBarProvider.vue'
import { withInstall } from '../utils/type'

export type { Props as LoadingBarProps } from './LoadingBar.vue'
export type { LoadingBarApi } from './useLoadingBar'
export { useLoadingBar } from './useLoadingBar'

// LoadingBar 已内部化为 Provider 的渲染内核（与 Popup 同类，不对外导出），
// 与普通组件一致，挂 install 以支持 app.use(LoadingBarProvider) 单组件安装
export const LoadingBarProvider = withInstall(LoadingBarProviderComp)

export default LoadingBarProvider
