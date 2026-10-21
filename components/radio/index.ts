import Radio from './Radio.vue'
import RadioButtonComp from './radio-button'
import RadioGroupComp from './radio-group'
import { withInstall } from '../utils/type'

export type { Props as RadioProps } from './Radio.vue'
export type { RadioButtonProps } from './radio-button'
export type { RadioGroupProps, RadioGroupOption } from './radio-group'
export type { RadioValue, RadioButtonStyle, RadioSize, RadioChangeTarget, RadioChangeEvent } from './context'

// 子组件经本地常量再导出（同 menu/index.ts）：直接写 `export { RadioGroup }` 属纯 re-export，
// 会被 Rollup 转发优化剔除，导致产物 index.js 无此具名导出，而 index.d.ts 仍声明它（类型与运行时不一致）
export const RadioButton = RadioButtonComp
export const RadioGroup = RadioGroupComp

export default withInstall(Radio)
