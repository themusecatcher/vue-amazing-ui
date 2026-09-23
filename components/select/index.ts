import Select from './Select.vue'
import SelectOptionComp from './select-option'
import SelectOptGroupComp from './select-optgroup'
import { withInstall } from '../utils/type'
import type { Option as SelectOptionType } from './Select.vue'

export type { Props as SelectProps, FieldNames as SelectFieldNames, SelectValue } from './Select.vue'
// 子类型在 SFC 内以短名定义，入口处按「组件名 + 子类型」重命名转出（与 Option as SelectOption 同规则）
export type { LabeledValue as SelectLabeledValue } from './Select.vue'
export type { SelectOptionProps } from './select-option'
export type { SelectOptGroupProps } from './select-optgroup'

// 选项元素类型与子组件同名，二者共存（类型位 = 选项数据对象，值位 = 选项子组件）：
// const options: SelectOption[] = [...] 与 <SelectOption value="jack">Jack</SelectOption> 均为合法用法
export type SelectOption = SelectOptionType
export const SelectOption = SelectOptionComp
export const SelectOptGroup = SelectOptGroupComp

export default withInstall(Select)
