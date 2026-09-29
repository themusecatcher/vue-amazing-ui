import Menu from './Menu.vue'
import MenuDividerComp from './menu-divider'
import MenuItemComp from './menu-item'
import MenuItemGroupComp from './menu-item-group'
import MenuSubMenuComp from './menu-sub-menu'
import { withInstall } from '../utils/type'

export type { Props as MenuProps } from './Menu.vue'
export type { MenuDividerProps } from './menu-divider'
export type { MenuItemProps } from './menu-item'
export type { MenuItemGroupProps } from './menu-item-group'
export type { MenuSubMenuProps } from './menu-sub-menu'
export type {
  ItemType,
  MenuKey,
  MenuMode,
  MenuTheme,
  MenuNode,
  MenuIcon,
  MenuInfo,
  MenuTitleInfo,
  MenuExpandIconInfo,
  MenuTriggerAction,
  MenuItemType,
  SubMenuType,
  MenuItemGroupType,
  MenuDividerType,
  SelectInfo
} from './interface'

// 子组件经本地常量再导出（同 layout/index.ts）：直接写 `export { MenuItem }` 属纯 re-export，
// 会被 Rollup 转发优化剔除，导致产物 index.js 无此具名导出，而 index.d.ts 仍声明它（类型与运行时不一致）
export const MenuDivider = MenuDividerComp
export const MenuItem = MenuItemComp
export const MenuItemGroup = MenuItemGroupComp
export const MenuSubMenu = MenuSubMenuComp

export default withInstall(Menu)
