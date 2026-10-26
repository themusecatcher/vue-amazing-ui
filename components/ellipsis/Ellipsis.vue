<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import type { VNode } from 'vue'
import Tooltip, { type TooltipProps } from 'components/tooltip'

/**
 * 提示配置：Tooltip 属性中「由本组件接管」的部分不可由使用方下发
 *
 * - `anchor` / `getDisabled`：本组件已接管锚点与展示判定，覆盖会导致提示失效或错锚定
 * - `content` / `contentClass` / `contentStyle` / `tooltip`：均作用于 Tooltip 的触发包裹层或其插槽，
 *   锚点模式下没有消费方；提示内容请用 `#tooltip` 插槽，容器样式直接写在组件上
 */
export type EllipsisTooltipProps = Omit<
  TooltipProps,
  'anchor' | 'getDisabled' | 'content' | 'contentClass' | 'contentStyle' | 'tooltip'
>
export interface Props {
  maxWidth?: string | number // 文本最大宽度，单位 px
  tooltipMaxWidth?: string | number // 弹出提示最大宽度，单位 px，默认为 文本宽度 + 24
  line?: number // 最大行数
  expand?: boolean // 是否启用点击文本展开全部
  tooltip?: boolean | EllipsisTooltipProps // 是否启用文本提示框；传对象即 [文字提示 Tooltip] 的属性配置
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
const emit = defineEmits(['expandChange'])
// 模板存在「文本容器 / 浮层」两个根节点，属性继承需显式下发（只此一处，落点恒定）
defineOptions({ inheritAttrs: false })
const boxRef = ref<HTMLElement | null>(null) // 文本容器引用（同时是提示的锚点）
const tooltipRef = ref<InstanceType<typeof Tooltip> | null>(null) // tooltip 组件引用
const expanded = ref(false) // 是否处于展开态
const truncated = ref(false) // 是否溢出（仅用于指针形状，不参与结构渲染）
const disclosed = ref(false) // 是否已经历过一次揭示交互（决定浮层实例是否挂载）
const measuredTooltipMaxWidth = ref<string>() // 交互时测得的提示最大宽度
// 提示配置：false 关闭；true 用默认；对象即 Tooltip 属性（本组件不再以 $attrs 透传，避免属性语义混杂）
const tooltipConfig = computed<EllipsisTooltipProps | null>(() => {
  if (props.tooltip === false) return null
  return typeof props.tooltip === 'object' ? props.tooltip : {}
})
// 触发方式：决定「首次交互」监听哪一个动作
const triggerMode = computed(() => tooltipConfig.value?.trigger ?? 'hover')
// 受控开合（open / openControl）由使用方决定可见性，不受「是否溢出」拦截
const controlled = computed(() => {
  const config = tooltipConfig.value
  return Boolean(config && (config.open !== undefined || config.openControl))
})
// 浮层实例挂载条件：受控场景需提前挂载（否则 :open="true" 无从生效），其余按首次交互挂载
const tooltipMounted = computed(() => Boolean(tooltipConfig.value) && (disclosed.value || controlled.value))
const textMaxWidth = computed(() => (typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth))
const containerClass = computed(() => [
  props.line ? 'ellipsis-line' : 'not-ellipsis-line',
  {
    // 展开态仍可点击收起，故指针形状要把 expanded 一并算入
    'ellipsis-cursor-pointer': (truncated.value || expanded.value) && Boolean(props.expand),
    'ellipsis-expanded': expanded.value
  }
])
const containerStyle = computed(
  () => `--ellipsis-max-width: ${textMaxWidth.value}; --ellipsis-line: ${props.line ?? 'none'};`
)
const resolvedTooltipMaxWidth = computed(() => {
  const { tooltipMaxWidth } = props
  if (tooltipMaxWidth === undefined) return measuredTooltipMaxWidth.value
  return typeof tooltipMaxWidth === 'number' ? `${tooltipMaxWidth}px` : tooltipMaxWidth
})
onMounted(() => {
  if (controlled.value) {
    measureTooltipMaxWidth()
  }
})
/**
 * 是否溢出
 *
 * 唯一测量入口，只在「交互时」调用：截断本身由 CSS 完成，测量结果只影响提示是否展示与
 * 指针形状，故无需响应式状态、无需 ResizeObserver，读取时浏览器已完成布局，结果必然是最新的
 */
function isTruncated(): boolean {
  const el = boxRef.value
  if (!el) return false
  return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight
}
function measureTooltipMaxWidth(): void {
  const el = boxRef.value
  if (!el) return
  measuredTooltipMaxWidth.value = `${el.offsetWidth + 24}px`
}
/** 提示展示前的动态判定：展开态 / 未溢出不展示（受控开合由使用方决定） */
function getTooltipDisabled(): boolean {
  if (controlled.value) return false
  return expanded.value || !isTruncated()
}
/**
 * 揭示：首次交互时挂载浮层实例并展示
 *
 * 挂载与展示分开是为了「零预挂载开销」：未交互过就没有实例；挂载后同一 tick 内调用 show，
 * 延迟由 Tooltip 的 showDelay 承担，首帧不会丢失
 */
async function disclose(kind: 'hover' | 'click' | 'focus' | 'contextmenu'): Promise<void> {
  if (!tooltipConfig.value || controlled.value || expanded.value) return
  if (triggerMode.value !== kind) return
  if (!isTruncated()) return
  measureTooltipMaxWidth()
  if (!disclosed.value) {
    disclosed.value = true
    await nextTick()
  }
  tooltipRef.value?.show()
}
function onPointerEnter(): void {
  // 指针形状只在启用展开时才需要判定；提示的判定由 disclose 内部完成，避免无谓的强制布局读取
  if (props.expand) truncated.value = isTruncated()
  void disclose('hover')
}
function onFocusIn(): void {
  void disclose('focus')
}
function onContextmenu(): void {
  void disclose('contextmenu')
}
function onBoxClick(): void {
  if (!props.expand) {
    void disclose('click')
    return
  }
  // 展开态允许随时收起；收起后若仍溢出，重新开放展开
  if (!expanded.value && !isTruncated()) return
  expanded.value = !expanded.value
  if (expanded.value) {
    tooltipRef.value?.hide()
  } else {
    tooltipRef.value?.show()
  }
  emit('expandChange', expanded.value)
}
</script>
<template>
  <div
    ref="boxRef"
    class="ellipsis-container"
    :class="containerClass"
    :style="containerStyle"
    :tabindex="triggerMode === 'focus' ? 0 : undefined"
    v-bind="$attrs"
    @pointerenter="onPointerEnter"
    @click="onBoxClick"
    @focusin="onFocusIn"
    @contextmenu="onContextmenu"
  >
    <slot></slot>
  </div>
  <!-- 浮层为兄弟节点（锚点模式）：不包裹文本容器，故类名 / 样式 / data-* 恒落文本容器，
       结构与「是否有提示、是否溢出」无关 -->
  <Tooltip
    v-if="tooltipMounted"
    ref="tooltipRef"
    :anchor="boxRef"
    :get-disabled="getTooltipDisabled"
    :max-width="resolvedTooltipMaxWidth"
    :tooltip-style="{ padding: '8px 12px' }"
    v-bind="tooltipConfig ?? {}"
  >
    <template #tooltip>
      <slot name="tooltip">
        <slot></slot>
      </slot>
    </template>
  </Tooltip>
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
.ellipsis-expanded {
  line-clamp: none;
  -webkit-line-clamp: none;
  white-space: normal;
  text-overflow: clip;
}
</style>
