import DropdownComp from './dropdown'
import DropdownButtonComp from './dropdown-button'

export type {
  DropdownProps,
  DropdownArrowOptions,
  DropdownTrigger,
  MenuOption as DropdownMenuOption,
  Key as DropdownKey
} from './dropdown'
export type { DropdownButtonProps } from './dropdown-button'

// 经本地常量再导出（同 grid/index.ts）：纯转发模块会被 Rollup 转发优化剔除产物 JS，
// 而 index.d.ts 仍会生成，致「类型有声明、运行时无模块」
export const Dropdown = DropdownComp
export const DropdownButton = DropdownButtonComp
