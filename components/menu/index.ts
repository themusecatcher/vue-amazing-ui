import MenuComp from './menu'
import MenuItemComp from './menuitem'

export type {
  MenuProps,
  ItemType,
  MenuItemType,
  SubMenuType,
  MenuItemGroupType,
  MenuDividerType,
  MenuItemHoverInfo,
  MenuItemClickInfo,
  MenuMotion
} from './menu'
export type { MenuItemProps } from './menuitem'

// 经本地常量再导出（同 grid/index.ts）：纯转发模块会被 Rollup 转发优化剔除产物 JS，
// 而 index.d.ts 仍会生成，致「类型有声明、运行时无模块」
export const Menu = MenuComp
export const MenuItem = MenuItemComp
