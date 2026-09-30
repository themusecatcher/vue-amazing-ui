import MenuItemGroup from './MenuItemGroup.vue'
import { withInstall } from '../../utils/type'
import type { Plugin } from 'vue'

export type { Props as MenuItemGroupProps } from './MenuItemGroup.vue'

// 静态标记：供 Menu 从 default 插槽的 vnode.type 上识别本组件（静态标记约定）
const MenuItemGroupComponent = withInstall(MenuItemGroup) as typeof MenuItemGroup &
  Plugin & { isMenuItemGroup: boolean }
MenuItemGroupComponent.isMenuItemGroup = true

export default MenuItemGroupComponent
