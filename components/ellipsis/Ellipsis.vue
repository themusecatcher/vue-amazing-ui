<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { VNode } from 'vue'
import Tooltip from 'components/tooltip'
import { useResizeObserver } from 'components/utils'

export interface Props {
  maxWidth?: string | number // 文本最大宽度，单位 px
  tooltipMaxWidth?: string | number // 弹出提示最大宽度，单位 px，默认为 文本宽度 + 24
  line?: number // 最大行数
  expand?: boolean // 是否启用点击文本展开全部
  tooltip?: boolean // 是否启用文本提示框，可自定义设置弹出提示内容
}
// 声明组件插槽类型
export interface EllipsisSlots {
  tooltip?: () => VNode[]
  default?: () => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: '100%',
  tooltipMaxWidth: undefined,
  line: undefined,
  expand: false,
  tooltip: true
})
defineSlots<EllipsisSlots>()
// 模板存在「Tooltip / 文本容器」两个条件根，属性继承需显式下发（见模板中的 v-bind="$attrs"）
defineOptions({ inheritAttrs: false })
const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null) // tooltip 组件引用
const showTooltip = ref(false) // 是否显示提示框
const showExpand = ref(false) // 是否可以启用点击展开
const expanded = ref(false) // 启用点击展开时，是否展开
const ellipsisRef = ref<HTMLElement | null>(null) // 文本 DOM 引用
const computedTooltipMaxWidth = ref<string>() // 计算后的弹出提示最大宽度
const ellipsisLine = ref<number | 'none'>() // 行数
const stopObservation = ref(false)
const emit = defineEmits(['expandChange'])
const textMaxWidth = computed(() => {
  if (typeof props.maxWidth === 'number') {
    return `${props.maxWidth}px`
  }
  return props.maxWidth
})
/**
 * 是否需要挂载 Tooltip 实例
 *
 * 未溢出（或使用者显式关闭 `tooltip`）时不创建浮层实例与包裹层，仅保留文本容器；
 * `expanded` 期间需保留实例：点击展开后靠 Tooltip 的 `animationend` 复位提示态，
 * 提前卸载会切断 `hide()` 与动画链，导致展开状态卡死。
 */
const tooltipEnabled = computed(() => showTooltip.value || expanded.value)
// 文本容器的类名 / 样式 / 点击行为：两个渲染分支共用，避免模板重复出现属性差异
const containerClass = computed(() => [
  props.line ? 'ellipsis-line' : 'not-ellipsis-line',
  { 'ellipsis-cursor-pointer': showExpand.value }
])
const containerStyle = computed(
  () => `--ellipsis-max-width: ${textMaxWidth.value}; --ellipsis-line: ${ellipsisLine.value};`
)
function onContainerClick() {
  if (showExpand.value) {
    onExpand()
  }
}
watch(
  () => props.line,
  (to) => {
    if (to !== undefined) {
      ellipsisLine.value = to
    } else {
      ellipsisLine.value = 'none'
    }
  },
  {
    immediate: true
  }
)
watch(
  [() => props.maxWidth, () => props.line, () => props.tooltip, () => props.tooltipMaxWidth],
  () => {
    updateTooltipShow()
  },
  {
    flush: 'post'
  }
)
useResizeObserver(ellipsisRef, () => {
  if (stopObservation.value) {
    setTimeout(() => {
      stopObservation.value = false
    })
  } else {
    updateTooltipShow()
  }
})
onMounted(() => {
  updateTooltipShow()
})
function updateTooltipShow() {
  const el = ellipsisRef.value
  if (!el) return
  const scrollWidth = el.scrollWidth
  const scrollHeight = el.scrollHeight
  const clientWidth = el.clientWidth
  const clientHeight = el.clientHeight
  computedTooltipMaxWidth.value = resolveTooltipMaxWidth(el.offsetWidth)
  if (scrollWidth > clientWidth || scrollHeight > clientHeight) {
    if (props.expand) {
      showExpand.value = true
    }
    if (props.tooltip) {
      showTooltip.value = true
    }
  } else {
    if (props.expand) {
      showExpand.value = false
    }
    if (props.tooltip) {
      showTooltip.value = false
    }
  }
}
// 弹出提示最大宽度：未传入 tooltipMaxWidth 时跟随文本宽度（+ 24 预留内边距），传入时以其为准
function resolveTooltipMaxWidth(offsetWidth: number): string {
  const { tooltipMaxWidth } = props
  if (tooltipMaxWidth === undefined) {
    return `${offsetWidth + 24}px`
  }
  return typeof tooltipMaxWidth === 'number' ? `${tooltipMaxWidth}px` : tooltipMaxWidth
}
function onExpand() {
  stopObservation.value = true
  if (ellipsisLine.value !== 'none') {
    ellipsisLine.value = 'none'
    if (props.tooltip && showTooltip.value) {
      expanded.value = true
      // 实例可能未挂载（如 tooltip 关闭），故用可选调用兜底
      tooltipRef.value?.hide?.()
    }
    emit('expandChange', true)
  } else {
    ellipsisLine.value = props.line ?? 'none'
    if (props.tooltip && !showTooltip.value) {
      expanded.value = false
      showTooltip.value = true
      tooltipRef.value?.show?.()
    }
    emit('expandChange', false)
  }
}
function onAnimationEnd() {
  if (expanded.value) {
    showTooltip.value = false
  }
}
</script>
<template>
  <Tooltip
    v-if="tooltipEnabled"
    ref="tooltipRef"
    :style="`max-width: ${textMaxWidth}`"
    :max-width="computedTooltipMaxWidth"
    :content-style="{ maxWidth: textMaxWidth }"
    :tooltip-style="{ padding: '8px 12px' }"
    @animationend="onAnimationEnd"
    v-bind="$attrs"
  >
    <template #tooltip>
      <slot v-if="showTooltip" name="tooltip">
        <slot></slot>
      </slot>
    </template>
    <div
      ref="ellipsisRef"
      class="ellipsis-container"
      :class="containerClass"
      :style="containerStyle"
      @click="onContainerClick"
    >
      <slot></slot>
    </div>
  </Tooltip>
  <div
    v-else
    ref="ellipsisRef"
    class="ellipsis-container"
    :class="containerClass"
    :style="containerStyle"
    @click="onContainerClick"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.ellipsis-container {
  overflow: hidden;
  cursor: text;
  max-width: var(--ellipsis-max-width);
  font-size: inherit; // 文本由使用者传入，字号跟随上下文
}
.ellipsis-line {
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  line-clamp: var(--ellipsis-line);
  -webkit-line-clamp: var(--ellipsis-line);
}
.not-ellipsis-line {
  display: inline-block;
  vertical-align: bottom;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ellipsis-cursor-pointer {
  cursor: pointer;
}
</style>
