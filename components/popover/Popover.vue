<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import Tooltip from 'components/tooltip'
import { useSlotsExist } from 'components/utils'
// 基类型必须是相对路径的纯 .ts：compiler-sfc 解析 extends 基类型时不认别名，也不认 .vue
import type { TooltipProps } from '../tooltip/types'
import { TOOLTIP_INHERITED_DEFAULTS } from '../tooltip/types'

// 排除名单独立成类型：Omit 的 K 约束是 keyof any，拼错会静默漏剔除，
// 用 AssertKeys 补上 key 存在性校验（pnpm type-check 会拦住）
type OmittedTooltipKeys = 'content' | 'contentClass' | 'contentStyle' | 'tooltip' | 'tooltipStyle'
type AssertKeys<T extends keyof TooltipProps> = T
type _OmittedKeysExist = AssertKeys<OmittedTooltipKeys>

/**
 * 继承而非属性袋（tooltipProps）：`<Popover trigger="click">` 这类「属性直接写在组件上」的用法
 * 已被文档化，改成具名属性袋属破坏性变更；rest 全量下发是唯一兼容解。
 *
 * `anchor` 予以保留：锚点模式下 `#tooltip` 卡片仍正常渲染，是有效能力
 * （但此时默认插槽不渲染触发元素，需自行提供锚点）。
 */
export interface Props extends Omit<TooltipProps, OmittedTooltipKeys> {
  title?: string // 卡片标题
  titleStyle?: CSSProperties // 卡片标题样式
  content?: string // 卡片内容
  contentStyle?: CSSProperties // 卡片内容样式
  tooltipStyle?: CSSProperties // 设置弹出提示的样式
}
// 声明组件插槽类型
export interface PopoverSlots {
  title?: () => VNode[]
  content?: () => VNode[]
  default?: () => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  // 默认值为 true 的布尔项必须显式继承：缺省会被 Vue 强转成 false 并覆盖 Tooltip 的默认值
  ...TOOLTIP_INHERITED_DEFAULTS,
  title: undefined,
  titleStyle: () => ({}),
  content: undefined,
  contentStyle: () => ({}),
  tooltipStyle: () => ({}),
  maxWidth: 'auto',
  bgColor: 'var(--va-bg-elevated-color)', // 必须是 CSS 变量，硬编码会失去换肤能力
  transitionDuration: 200,
  // `to` 的联合类型含 `false`，运行时类型因此带 Boolean —— 缺省时 Vue 会把它转成 `false`，
  // 下发给 Tooltip 后等价于「就地渲染」，浮层不再挂进承载层（Modal / Select 面板）内。
  // 必须显式给 `undefined`，Vue 才不会对该 boolean 型 prop 做缺省转换
  to: undefined
})
// 声明 open 后 Vue 会丢弃 onUpdate:open 的 attrs 透传（runtime-core filterModelListeners），
// 故必须自行声明 emits 并在模板转发，否则 v-model:open 静默失效
const emits = defineEmits(['update:open', 'openChange', 'animationend'])
defineSlots<PopoverSlots>()

// 必须用 computed 包裹：直接解构 props 会丢响应性，rest 变成一次性快照。
// 下方解构出的自有字段仅用于「从 rest 中剔除」，故按 rest 兄弟变量处理
const tooltipBindings = computed(() => {
  const { title, titleStyle, content, contentStyle, tooltipStyle, ...rest } = props
  return rest
})
const slotsExist = useSlotsExist(['title', 'content'])
const showTitle = computed(() => {
  return slotsExist.title || props.title
})
const showContent = computed(() => {
  return slotsExist.content || props.content
})
</script>
<template>
  <Tooltip
    v-bind="tooltipBindings"
    :tooltip-style="{
      padding: '12px',
      borderRadius: '8px',
      textAlign: 'start',
      ...tooltipStyle
    }"
    @update:open="emits('update:open', $event)"
    @open-change="emits('openChange', $event)"
    @animationend="emits('animationend', $event)"
  >
    <template #tooltip>
      <div v-if="showTitle" class="popover-title" :class="{ mb8: showContent }" :style="titleStyle">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="showContent" class="popover-content" :style="contentStyle">
        <slot name="content">{{ content }}</slot>
      </div>
    </template>
    <slot></slot>
  </Tooltip>
</template>
<style lang="less" scoped>
.popover-title {
  min-width: 176px;
  color: var(--va-text-color-1);
  font-weight: 600;
}
.mb8 {
  margin-bottom: 8px;
}
.popover-content {
  color: var(--va-text-color-1);
}
</style>
