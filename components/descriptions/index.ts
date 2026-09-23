import Descriptions from './Descriptions.vue'
import DescriptionsItemComp from './descriptions-item'
import { withInstall } from '../utils/type'

export type { Props as DescriptionsProps, Responsive as DescriptionsResponsive } from './Descriptions.vue'
export type { DescriptionsItemProps } from './descriptions-item'

// 子组件经本地常量再导出（同 select/index.ts）：直接写 `export { DescriptionsItem }` 属纯 re-export，
// 会被 Rollup 转发优化剔除，导致产物 index.js 无此具名导出，而 index.d.ts 仍声明它（类型与运行时不一致）
export const DescriptionsItem = DescriptionsItemComp
export default withInstall(Descriptions)
