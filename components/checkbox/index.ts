import Checkbox from './Checkbox.vue'
import CheckboxGroupComp from './checkbox-group'
import { withInstall } from '../utils/type'

export type { Props as CheckboxProps, Option as CheckboxOption } from './Checkbox.vue'
export type { CheckboxGroupProps, CheckboxGroupOption } from './checkbox-group'

// 子组件经本地常量再导出（同 menu/index.ts）：直接写 `export { CheckboxGroup }` 属纯 re-export，
// 会被 Rollup 转发优化剔除，导致产物 index.js 无此具名导出，而 index.d.ts 仍声明它（类型与运行时不一致）
export const CheckboxGroup = CheckboxGroupComp

export default withInstall(Checkbox)
