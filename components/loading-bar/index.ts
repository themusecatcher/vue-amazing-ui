import LoadingBar from './LoadingBar.vue'
import LoadingBarProviderComp from './LoadingBarProvider.vue'
import { withInstall } from '../utils/type'

export type { Props as LoadingBarProps } from './LoadingBar.vue'
export type { LoadingBarApi } from './useLoadingBar'
export { useLoadingBar } from './useLoadingBar'

// 与普通组件一致，挂 install 以支持 app.use(LoadingBarProvider) 单组件安装
export const LoadingBarProvider = withInstall(LoadingBarProviderComp)

export default withInstall(LoadingBar)
