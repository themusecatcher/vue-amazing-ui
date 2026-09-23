import List from './List.vue'
import ListItemComp from './list-item'
import { withInstall } from '../utils/type'

export type { Props as ListProps } from './List.vue'
export type { ListItemProps } from './list-item'

// 子组件经本地常量再导出（同 select/index.ts），避免纯 re-export 被 Rollup 转发优化剔除
export const ListItem = ListItemComp
export default withInstall(List)
