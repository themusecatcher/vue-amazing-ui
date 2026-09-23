import SelectOptGroup from './SelectOptGroup.vue'
import { withInstall } from '../../utils/type'
import type { Plugin } from 'vue'

export type { Props as SelectOptGroupProps } from './SelectOptGroup.vue'

// 静态标记：供 Select 从 default 插槽的 vnode.type 上识别本组件（静态标记约定）
const SelectOptGroupComponent = withInstall(SelectOptGroup) as typeof SelectOptGroup &
  Plugin & { isSelectOptGroup: boolean }
SelectOptGroupComponent.isSelectOptGroup = true

export default SelectOptGroupComponent
