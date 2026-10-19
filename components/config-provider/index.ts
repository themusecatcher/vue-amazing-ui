import ConfigProvider from './ConfigProvider.vue'
import { SKIP_LINK_CSS_VARS_KEY as SKIP_LINK_CSS_VARS_KEY_IMPL } from './context'
export type { Props as ConfigProviderProps, Theme as ConfigProviderTheme } from './ConfigProvider.vue'
import { withInstall } from '../utils/type'

// 经本地常量再导出：纯转发会被 Rollup 转发优化剔除（见 development/project-structure.md）
export const SKIP_LINK_CSS_VARS_KEY = SKIP_LINK_CSS_VARS_KEY_IMPL

export default withInstall(ConfigProvider)
