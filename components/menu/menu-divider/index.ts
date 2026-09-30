import MenuDivider from './MenuDivider.vue'
import { withInstall } from '../../utils/type'
import type { Plugin } from 'vue'

export type { Props as MenuDividerProps } from './MenuDivider.vue'

// 静态标记：供 Menu 从 default 插槽的 vnode.type 上识别本组件（静态标记约定）
const MenuDividerComponent = withInstall(MenuDivider) as typeof MenuDivider & Plugin & { isMenuDivider: boolean }
MenuDividerComponent.isMenuDivider = true

export default MenuDividerComponent
