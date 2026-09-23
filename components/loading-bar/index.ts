import LoadingBar from './LoadingBar.vue'
import LoadingBarProviderComp from './LoadingBarProvider.vue'
import { useLoadingBar as useLoadingBarImpl } from './useLoadingBar'
import { withInstall } from '../utils/type'

export type { Props as LoadingBarProps } from './LoadingBar.vue'
export type { LoadingBarApi } from './useLoadingBar'

// 经本地常量再导出（同 select/grid 的具名导出）：纯 `export { useLoadingBar } from './useLoadingBar'` 会被
// Rollup 转发优化剔除该具名导出，致产物 index.js 缺它、而 index.d.ts 仍有声明（类型与运行时不一致）
export const useLoadingBar = useLoadingBarImpl

// 与普通组件一致，挂 install 以支持 app.use(LoadingBarProvider) 单组件安装
export const LoadingBarProvider = withInstall(LoadingBarProviderComp)

export default withInstall(LoadingBar)
