<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import TimelineItem from './timeline-item'
export interface Props {
  mode?: 'left' | 'alternate' | 'right' // 时间轴与内容的相对位置
  start?: 'left' | 'right' // 交替模式下内容从哪一侧开始出现
  reverse?: boolean // 节点是否倒序排列
  horizontal?: boolean // 是否水平排列
  size?: 'small' | 'middle' | 'large' // 尺寸档位
  iconSize?: number // 轴点区域的边长，同时决定连线起点与内容偏移，单位 px
  lineType?: 'solid' | 'dashed' | 'dotted' // 整轴线型，时间轴项可覆盖
  pending?: boolean | string | VNode // 幽灵节点：为 true 时只表示进行中，字符串或 VNode 作为其内容
  pendingDot?: string | VNode // 幽灵节点的轴点，未指定时使用内置加载环
}
// 声明组件插槽类型
export interface TimelineSlots {
  default?: () => VNode[]
  pending?: () => VNode[]
  pendingDot?: () => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'left',
  start: 'right',
  reverse: false,
  horizontal: false,
  size: 'middle',
  iconSize: undefined,
  lineType: 'solid',
  pending: false,
  pendingDot: undefined
})
defineSlots<TimelineSlots>()
// 根节点显式 role="list"：list-style: none 会让 Safari 丢掉列表语义；
// 幽灵节点用 aria-busy 表达「进行中」，载入环本身 aria-hidden，无文案时读屏仍能感知
const rootClasses = computed(() => {
  return [
    `timeline-${props.mode}`,
    `timeline-${props.size}`,
    `timeline-line-${props.lineType}`,
    {
      'timeline-start-left': props.start === 'left',
      'timeline-horizontal': props.horizontal,
      'timeline-reverse': props.reverse,
      'timeline-pending': Boolean(props.pending)
    }
  ]
})
// 只覆写轴点区域基准尺寸：连线起点与内容偏移都由该变量推导，改一处即可整体缩放
const rootStyle = computed<CSSProperties | undefined>(() => {
  return props.iconSize === undefined ? undefined : { '--timeline-head-size': `${props.iconSize}px` }
})
// boolean 形态只表达「进行中」，不携带内容
const pendingContent = computed(() => {
  return typeof props.pending === 'boolean' ? undefined : props.pending
})
</script>
<template>
  <ul class="timeline-wrap" :class="rootClasses" :style="rootStyle" role="list">
    <slot></slot>
    <TimelineItem v-if="pending" class="timeline-item-pending" aria-busy="true">
      <template #dot>
        <slot name="pendingDot">
          <span v-if="typeof pendingDot === 'string'" class="timeline-pending-dot-text">{{ pendingDot }}</span>
          <component :is="pendingDot" v-else-if="pendingDot" />
          <svg v-else class="timeline-pending-dot" viewBox="0 0 16 16" aria-hidden="true">
            <circle
              cx="8"
              cy="8"
              r="6.5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-dasharray="30 11"
            />
          </svg>
        </slot>
      </template>
      <slot name="pending">{{ pendingContent }}</slot>
    </TimelineItem>
  </ul>
</template>
<style lang="less" scoped>
.timeline-wrap {
  --timeline-head-size: 10px;
  --timeline-head-border-width: 3px;
  --timeline-line-width: 2px;
  --timeline-line-height: 22px;
  // 内容上移补偿 = 行盒高 − 字号 − 1px 线宽修正：文字在行盒内垂直居中，不补偿会让首行比轴点低一截；
  // 由行高派生而非写死，覆盖 --timeline-line-height 时内容、轴点、连线一起跟随；14px 须与下方 font-size 保持一致
  --timeline-content-offset: calc(var(--timeline-line-height, 22px) - 14px - 1px);
  --timeline-gap: 20px;
  --timeline-content-gap: 16px;
  --timeline-horizontal-gap: calc(var(--timeline-gap) * 2);
  --timeline-alt-offset: 12px;
  --timeline-title-font-size: 14px;
  --timeline-meta-font-size: 12px;
  --timeline-line-color: var(--va-border-split-color);
  --timeline-head-bg: var(--va-bg-container-color);
  --timeline-head-color: var(--va-cp-timeline-primary-color, var(--va-primary-color));
  display: flex;
  flex-direction: column;
  gap: var(--timeline-gap);
  margin: 0;
  padding: 0;
  // 内容区整体上移了补偿量，容器补同量上内边距：否则首行文字溢出上边界，与上方内容的间距被吃掉
  &:not(.timeline-horizontal) {
    padding-top: var(--timeline-content-offset);
  }
  font-size: 14px;
  line-height: 1.5714285714285714;
  color: var(--va-text-color-1);
  list-style: none;
  &.timeline-small {
    --timeline-head-size: 8px;
    --timeline-gap: 16px;
  }
  &.timeline-large {
    --timeline-head-size: 14px;
    --timeline-gap: 24px;
    --timeline-title-font-size: 16px;
  }
  &.timeline-line-solid {
    --timeline-line-type: solid;
  }
  &.timeline-line-dashed {
    --timeline-line-type: dashed;
  }
  &.timeline-line-dotted {
    --timeline-line-type: dotted;
  }
  &.timeline-reverse {
    flex-direction: column-reverse;
  }
  &.timeline-horizontal {
    flex-direction: row;
    gap: var(--timeline-horizontal-gap);
    overflow-x: auto;
    &.timeline-reverse {
      flex-direction: row-reverse;
    }
  }
  // 幽灵节点加载环：SVG 弧线，线宽与端点固定，避免小尺寸下被描边挤压变形
  .timeline-pending-dot {
    display: block;
    width: calc(var(--timeline-head-size) + 6px);
    height: calc(var(--timeline-head-size) + 6px);
    color: var(--timeline-head-color);
    transform-origin: center;
    animation: timeline-pending-rotate 1s linear infinite;
  }
}
@keyframes timeline-pending-rotate {
  to {
    transform: rotate(360deg);
  }
}
// 尊重系统的减少动效偏好，加载环改为静态
@media (prefers-reduced-motion: reduce) {
  .timeline-wrap .timeline-pending-dot {
    animation: none;
  }
}
</style>
