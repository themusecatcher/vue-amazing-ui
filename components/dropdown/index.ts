import Dropdown from './Dropdown.vue'
import DropdownButtonComp from './dropdown-button'
import { withInstall } from '../utils/type'

export type {
  Props as DropdownProps,
  DropdownArrowOptions,
  DropdownTrigger,
  MenuOption as DropdownMenuOption,
  Key as DropdownKey
} from './Dropdown.vue'
export type { DropdownButtonProps } from './dropdown-button'

// 子组件经本地常量再导出（同 descriptions/index.ts）：纯 re-export 会被 Rollup 转发优化剔除，
// 导致产物 index.js 缺该具名导出，而 index.d.ts 仍声明它（类型与运行时不一致）
export const DropdownButton = DropdownButtonComp
export default withInstall(Dropdown)
