import Menu from './Menu.vue'
export type {
  Props as MenuProps,
  ItemType,
  MenuItemType,
  SubMenuType,
  MenuItemGroupType,
  MenuDividerType,
  MenuItemHoverInfo,
  MenuItemClickInfo,
  MenuMotion
} from './Menu.vue'
import { withInstall } from '../../utils/type'

export default withInstall(Menu)
