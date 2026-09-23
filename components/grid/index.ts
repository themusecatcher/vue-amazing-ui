import RowComp from './row'
import ColComp from './col'

export type { RowProps, Responsive as RowResponsive } from './row'
export type { ColProps } from './col'

// 经本地常量再导出（同 select/index.ts）：纯转发模块会被 Rollup 转发优化剔除产物 JS，
// 而 index.d.ts 仍会生成，致「类型有声明、运行时无模块」
export const Row = RowComp
export const Col = ColComp
