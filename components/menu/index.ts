import Menu from './Menu.vue'
export type { Props as MenuProps } from './Menu.vue'
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
import { withInstall } from '../utils/type'

export default withInstall(Menu)
