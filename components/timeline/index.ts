import Timeline from './Timeline.vue'
import TimelineItemComp from './timeline-item'
import { withInstall } from '../utils/type'

export type { Props as TimelineProps, TimelineSlots } from './Timeline.vue'
export type { TimelineItemProps, TimelineItemSlots } from './timeline-item'

// 子组件经本地常量再导出（同 radio/index.ts）：直接写 `export { TimelineItem }` 属纯 re-export，
// 会被 Rollup 转发优化剔除，导致产物 index.js 缺该具名导出、而 index.d.ts 仍有声明
export const TimelineItem = TimelineItemComp

export default withInstall(Timeline)
