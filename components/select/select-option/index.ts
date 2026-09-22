import SelectOption from './SelectOption.vue'
import { withInstall } from '../../utils/type'
import type { Plugin } from 'vue'

export type { Props as SelectOptionProps } from './SelectOption.vue'

// 静态标记：供 Select 从 default 插槽的 vnode.type 上识别本组件（静态标记约定）
const SelectOptionComponent = withInstall(SelectOption) as typeof SelectOption & Plugin & { isSelectOption: boolean }
SelectOptionComponent.isSelectOption = true

export default SelectOptionComponent
