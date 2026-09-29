import MenuSubMenu from './MenuSubMenu.vue'
import { withInstall } from '../../utils/type'
import type { Plugin } from 'vue'

export type { Props as MenuSubMenuProps } from './MenuSubMenu.vue'

// 静态标记：供 Menu 从 default 插槽的 vnode.type 上识别本组件（静态标记约定）
const MenuSubMenuComponent = withInstall(MenuSubMenu) as typeof MenuSubMenu & Plugin & { isMenuSubMenu: boolean }
MenuSubMenuComponent.isMenuSubMenu = true

export default MenuSubMenuComponent
