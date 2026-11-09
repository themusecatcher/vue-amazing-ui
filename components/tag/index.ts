import Tag from './Tag.vue'
import CheckableTagComp from './checkable-tag'
import { withInstall } from '../utils/type'

export type { Props as TagProps, Item as TagItem, TagSlots } from './Tag.vue'
export type { CheckableTagProps, CheckableTagSlots } from './checkable-tag'

// 子组件经本地常量再导出：纯 re-export 会被 Rollup 转发优化剔除，产物无具名导出而类型声明仍在
export const CheckableTag = CheckableTagComp
export default withInstall(Tag)
