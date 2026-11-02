import Tabs from './Tabs.vue'
import TabPaneComp from './tab-pane'
import { withInstall } from '../utils/type'

export type { Props as TabsProps, TabsAddable, TabsBeforeLeave, TabsJustifyContent } from './Tabs.vue'
export type { TabsDisplayDirective } from './slotItems'
export type { TabPaneProps } from './tab-pane'

// 子组件经本地常量再导出（同 menu/index.ts）：直接写 `export { TabPane }` 属纯 re-export，
// 会被 Rollup 转发优化剔除，导致产物 index.js 无此具名导出，而 index.d.ts 仍声明它（类型与运行时不一致）
export const TabPane = TabPaneComp

export default withInstall(Tabs)
