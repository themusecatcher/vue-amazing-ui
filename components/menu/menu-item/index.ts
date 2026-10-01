import MenuItem from './MenuItem.vue'
import { withInstall } from '../../utils/type'
import type { Plugin } from 'vue'

export type { Props as MenuItemProps } from './MenuItem.vue'

// 静态标记：供 Menu 从 default 插槽的 vnode.type 上识别本组件（静态标记约定）
const MenuItemComponent = withInstall(MenuItem) as typeof MenuItem & Plugin & { isMenuItem: boolean }
MenuItemComponent.isMenuItem = true

export default MenuItemComponent
