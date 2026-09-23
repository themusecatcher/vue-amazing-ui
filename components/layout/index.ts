import LayoutComp from './layout'
import LayoutContentComp from './layoutcontent'
import LayoutFooterComp from './layoutfooter'
import LayoutHeaderComp from './layoutheader'
import LayoutSiderComp from './layoutsider'

export type { LayoutProps } from './layout'
export type { LayoutContentProps } from './layoutcontent'
export type { LayoutFooterProps } from './layoutfooter'
export type { LayoutHeaderProps } from './layoutheader'
export type { LayoutSiderProps } from './layoutsider'

// 经本地常量再导出（同 grid/index.ts）：纯转发模块会被 Rollup 转发优化剔除产物 JS，
// 而 index.d.ts 仍会生成，致「类型有声明、运行时无模块」
export const Layout = LayoutComp
export const LayoutContent = LayoutContentComp
export const LayoutFooter = LayoutFooterComp
export const LayoutHeader = LayoutHeaderComp
export const LayoutSider = LayoutSiderComp
