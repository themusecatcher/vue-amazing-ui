import Layout from './Layout.vue'
import LayoutContentComp from './layout-content'
import LayoutFooterComp from './layout-footer'
import LayoutHeaderComp from './layout-header'
import LayoutSiderComp from './layout-sider'
import { withInstall } from '../utils/type'

export type { Props as LayoutProps } from './Layout.vue'
export type { LayoutSiderProps, LayoutSiderResponsive } from './layout-sider'

// 子组件经本地常量再导出（同 descriptions/index.ts）：直接写 `export { LayoutHeader }` 属纯 re-export，
// 会被 Rollup 转发优化剔除，导致产物 index.js 无此具名导出，而 index.d.ts 仍声明它（类型与运行时不一致）
export const LayoutContent = LayoutContentComp
export const LayoutFooter = LayoutFooterComp
export const LayoutHeader = LayoutHeaderComp
export const LayoutSider = LayoutSiderComp

export default withInstall(Layout)
