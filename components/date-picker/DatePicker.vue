<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { CSSProperties, TransitionProps, VNode } from 'vue'
import Popup from 'components/popup'
import DatePanel from 'components/picker/DatePanel.vue'
import PickerTrigger from 'components/picker/PickerTrigger.vue'
import { formatTimestamp, getDefaultFormat, getInputSize, parseTimestamp } from 'components/picker/date-utils'
import type { StartDayOfWeek } from 'components/picker/date-utils'
import type {
  PickerFormattedValue,
  PickerPanelMode,
  PickerSize,
  PickerStatus,
  PickerType,
  PickerValue
} from 'components/picker'
import type { FloatingPlacement } from 'components/utils'
import { FLOATING_LAYER_Z_INDEX, useInject } from 'components/utils'
export interface Props {
  // 内容数据
  type?: PickerType // 选择形态
  format?: string // 展示格式，date-fns 占位符，默认随 type 变化
  valueFormat?: string // 绑定值格式，默认与 format 相同
  placeholder?: string // 输入框提示文字
  defaultPickerValue?: number // 面板初始日期（时间戳），默认取 value 或今天
  startDayOfWeek?: StartDayOfWeek // 一周起始日，0 为周一
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  // 形态外观
  width?: string | number // 选择器宽度，不传时随内容自适应
  size?: PickerSize // 选择器大小
  status?: PickerStatus // 校验状态
  bordered?: boolean // 是否展示边框
  // 状态反馈
  disabled?: boolean // 是否禁用
  allowClear?: boolean // 是否展示清除按钮
  inputReadOnly?: boolean // 输入框是否只读（避免移动端唤起键盘）
  // 行为交互
  to?: string | HTMLElement | false // 面板挂载的容器节点，不传时就近挂载到承载层内容容器
  placement?: 'topLeft' | 'top' | 'topRight' | 'bottomLeft' | 'bottom' | 'bottomRight' // 面板弹出位置
  showToday?: boolean // 是否展示面板底部的「今天」快捷，面板切到月/年视图时隐藏
  // 进阶透传
  suffixIcon?: VNode | (() => VNode) // 自定义选择框后缀图标
  panelClass?: string // 面板额外类名
  panelStyle?: CSSProperties // 面板额外样式
  zIndex?: number // 面板层级，优先级最高
}
/**
 * 组件对外 props 类型
 *
 * `value` / `formattedValue` / `open` 由 `defineModel` 声明（同名出现在 `defineProps` 中会与
 * 模型绑定冲突），此处合并回对外类型，保证使用方获得完整的 props 提示
 */
export type DatePickerProps = Props & {
  value?: PickerValue
  formattedValue?: PickerFormattedValue
  open?: boolean
}
// value / formattedValue / open 三个双向绑定项的默认值由 defineModel 声明，此处不重复
const props = withDefaults(defineProps<Props>(), {
  type: 'date',
  format: undefined,
  valueFormat: undefined,
  placeholder: '',
  defaultPickerValue: undefined,
  startDayOfWeek: 0,
  disabledDate: undefined,
  width: undefined,
  size: 'middle',
  status: undefined,
  bordered: true,
  disabled: false,
  allowClear: true,
  inputReadOnly: false,
  to: false,
  placement: 'bottomLeft',
  showToday: true,
  suffixIcon: undefined,
  panelClass: '',
  panelStyle: undefined,
  zIndex: undefined
})
const emits = defineEmits<{
  change: [value: PickerValue, formattedValue: PickerFormattedValue]
  openChange: [open: boolean]
  panelChange: [value: number, mode: PickerPanelMode]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
const value = defineModel<PickerValue>('value', { default: null })
const formattedValue = defineModel<PickerFormattedValue>('formattedValue')
const open = defineModel<boolean>('open', { default: false })
const { colorPalettes, shadowColor } = useInject('DatePicker') // 主题色注入
const triggerRef = ref<InstanceType<typeof PickerTrigger> | null>(null)
const popupRef = ref<InstanceType<typeof Popup> | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
// 主题变量随组件壳下发，浮层经 Teleport 后不在壳内，需同样注入到面板上
const themeVars = computed(() => ({
  '--picker-primary-color': colorPalettes.value[5],
  '--picker-primary-color-hover': colorPalettes.value[4],
  '--picker-primary-shadow-color': shadowColor.value
}))
const wrapperStyle = computed(() => {
  const width =
    props.width === undefined ? undefined : typeof props.width === 'number' ? `${props.width}px` : props.width
  return { ...themeVars.value, '--datepicker-width': width ?? 'auto' } as CSSProperties
})
const mergedPanelClass = computed(() => ['datepicker-panel-container', props.panelClass].filter(Boolean).join(' '))
/** 展示与回写共用的格式：`valueFormat` 优先，未指定时跟随展示格式 */
const mergedValueFormat = computed(() => props.valueFormat ?? props.format ?? getDefaultFormat(props.type))
/** 输入框按格式长度估宽，避免浏览器按 20 字符默认估宽导致触发器明显偏宽 */
const inputSize = computed(() => getInputSize(mergedValueFormat.value))
/** 字符串轨道受控：传入 `formattedValue` 时以它为准，与主轨道解耦 */
const formattedControlled = computed(() => formattedValue.value !== undefined)
const innerValue = computed<number | null>(() => {
  if (formattedControlled.value) {
    return typeof formattedValue.value === 'string'
      ? parseTimestamp(formattedValue.value, mergedValueFormat.value)
      : null
  }
  return typeof value.value === 'number' ? value.value : null
})
// 受控字符串解析失败时原样展示，避免用户输入被静默丢弃
const displayText = computed(() => {
  if (formattedControlled.value) {
    return typeof formattedValue.value === 'string' ? formattedValue.value : ''
  }
  return innerValue.value === null ? '' : formatTimestamp(innerValue.value, mergedValueFormat.value)
})
const showClear = computed(() => props.allowClear && !props.disabled && innerValue.value !== null)
// 实际方向：定位内核翻转 / 次轴自适应后的结果（宿主未挂载时退回期望方向）
const actualPlacement = computed<FloatingPlacement>(() => popupRef.value?.actualPlacement ?? props.placement)
// 动效按**实际**方向取：面板在上方时从下边缘收起（scaleY 原点 100% 100%），在下方时从上边缘收起；
// 仅给 name，类名走 Vue 默认派生（-enter-from/-enter-active/…）
const panelTransitionProps = computed<TransitionProps>(() => ({
  name: actualPlacement.value.startsWith('top') ? 'datepicker-slide-down' : 'datepicker-slide-up'
}))
let documentListenerAttached = false // 外部点击监听是否已注册，确保注册与移除一一对应
function attachDocumentListener() {
  if (documentListenerAttached || typeof document === 'undefined') return
  document.addEventListener('click', handleDocumentClick, true)
  documentListenerAttached = true
}
function detachDocumentListener() {
  if (!documentListenerAttached || typeof document === 'undefined') return
  document.removeEventListener('click', handleDocumentClick, true)
  documentListenerAttached = false
}
// 点击触发器与面板内部都不关闭，其余位置视为外部点击
function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node | null
  if (!target) return
  if (wrapperRef.value?.contains(target) || popupRef.value?.panelRef?.contains(target)) return
  requestOpen(false)
}
watch(
  () => open.value,
  (next) => {
    if (next) {
      attachDocumentListener()
      return
    }
    detachDocumentListener()
  },
  { immediate: true }
)
onBeforeUnmount(detachDocumentListener)
function requestOpen(next: boolean) {
  if (props.disabled || open.value === next) return
  open.value = next
  emits('openChange', next)
}
// 点击触发器只负责展开：展开态点击不收起（与参考实现同口径，收起由外部点击 / Esc / 选中值触发）
function onTriggerClick() {
  if (!open.value) {
    requestOpen(true)
  }
}
/** 回写两条轨道：主轨道始终同步，字符串轨道按同一格式生成 */
function commit(timestamp: number | null) {
  const nextFormatted = timestamp === null ? null : formatTimestamp(timestamp, mergedValueFormat.value)
  value.value = timestamp
  formattedValue.value = nextFormatted
  emits('change', timestamp, nextFormatted)
}
function onSelect(timestamp: number) {
  commit(timestamp)
  requestOpen(false)
}
function onClear() {
  commit(null)
  requestOpen(false)
}
// 手输文本：解析成功才提交，失败时由触发器回滚为当前合法文本
function onTextConfirm(text: string) {
  const timestamp = parseTimestamp(text, mergedValueFormat.value)
  if (timestamp === null) return
  commit(timestamp)
}
function onEscKeydown() {
  if (open.value) {
    requestOpen(false)
  }
}
function onPanelChange(timestamp: number, mode: PickerPanelMode) {
  emits('panelChange', timestamp, mode)
}
function focus() {
  triggerRef.value?.focus()
}
function blur() {
  triggerRef.value?.blur()
}
defineExpose({ focus, blur })
</script>
<template>
  <div ref="wrapperRef" class="datepicker-wrap" :style="wrapperStyle" @keydown.esc="onEscKeydown" @keydown.enter.stop>
    <PickerTrigger
      ref="triggerRef"
      :text="displayText"
      :placeholder="placeholder"
      :size="size"
      :status="status"
      :bordered="bordered"
      :disabled="disabled"
      :input-read-only="inputReadOnly"
      :allow-clear="allowClear && showClear"
      :open="open"
      :input-size="inputSize"
      :suffix-icon="suffixIcon"
      @click="onTriggerClick"
      @clear="onClear"
      @text-confirm="onTextConfirm"
      @focus="emits('focus', $event)"
      @blur="emits('blur', $event)"
    >
      <template #suffix>
        <slot name="suffixIcon">
          <component :is="suffixIcon" v-if="suffixIcon" />
        </slot>
      </template>
    </PickerTrigger>
    <Popup
      ref="popupRef"
      :show="open && !disabled"
      :to="to"
      :anchor="wrapperRef"
      :placement="placement"
      :offset="4"
      :panel-class="mergedPanelClass"
      :panel-style="{ ...panelStyle, ...themeVars }"
      :z-index="zIndex"
      :default-z-index="FLOATING_LAYER_Z_INDEX.select"
      :transition-props="panelTransitionProps"
      @keydown.esc="onEscKeydown"
    >
      <DatePanel
        :value="innerValue"
        :start-day-of-week="startDayOfWeek"
        :disabled-date="disabledDate"
        :default-picker-value="defaultPickerValue"
        :show-today="showToday"
        @select="onSelect"
        @panel-change="onPanelChange"
      />
    </Popup>
  </div>
</template>
<style lang="less" scoped>
.datepicker-wrap {
  // 行内弹性容器：未传 width 时收缩为内容宽，不被父容器拉伸
  display: inline-flex;
  width: var(--datepicker-width, auto);
  :deep(.picker-trigger) {
    flex: auto;
    min-width: 0;
  }
}
</style>
<style lang="less">
/* 以下两类规则必须留在全局：它们作用于 <Popup> 宿主编译出的面板节点（scope id 属宿主），
   且 Teleport 到 body 后不在本组件 DOM 子树内，scoped 与 :deep() 均选不中。
   收口口径：① 面板几何以 .datepicker-panel-container 收口；② 动画类与关键帧统一加 `datepicker-` 前缀，避免与宿主页面撞名 */
.datepicker-panel-container {
  width: max-content;
  outline: none;
}
/* 收起过程中选中格直接落色：参考实现的收起会把容器隐藏一帧，令选中格的 0.2s 过渡被浏览器取消，
   故此处显式复刻该观感（仅收起期间抑制格子过渡；面板保持展开时选中/悬浮过渡照常）。
   多带一层 .picker-panel-body 是为了稳定压过日期格 scoped 规则里的过渡声明（同特异性下不依赖源码顺序） */
.datepicker-panel-container.va-popup-leaving .picker-panel-body .picker-panel-cell-inner {
  transition: none;
}
// 面板在触发器下方：从上方边缘展开 / 收起（参考实现 slideUp 动效：缩放原点 0% 0%）
.datepicker-slide-up-enter-active,
.datepicker-slide-up-leave-active {
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.datepicker-slide-up-enter-active {
  animation-name: datepickerSlideUpIn;
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
.datepicker-slide-up-leave-active {
  animation-name: datepickerSlideUpOut;
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
}
.datepicker-slide-up-enter-from,
.datepicker-slide-up-leave-to {
  opacity: 0;
}
@keyframes datepickerSlideUpIn {
  0% {
    opacity: 0;
    transform: scaleY(0.8);
    transform-origin: 0% 0%;
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: 0% 0%;
  }
}
@keyframes datepickerSlideUpOut {
  0% {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: 0% 0%;
  }
  100% {
    opacity: 0;
    transform: scaleY(0.8);
    transform-origin: 0% 0%;
  }
}
// 面板在触发器上方：从下方边缘展开 / 收起（参考实现 slideDown 动效：缩放原点 100% 100%）
.datepicker-slide-down-enter-active,
.datepicker-slide-down-leave-active {
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.datepicker-slide-down-enter-active {
  animation-name: datepickerSlideDownIn;
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
.datepicker-slide-down-leave-active {
  animation-name: datepickerSlideDownOut;
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
}
.datepicker-slide-down-enter-from,
.datepicker-slide-down-leave-to {
  opacity: 0;
}
@keyframes datepickerSlideDownIn {
  0% {
    opacity: 0;
    transform: scaleY(0.8);
    transform-origin: 100% 100%;
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: 100% 100%;
  }
}
@keyframes datepickerSlideDownOut {
  0% {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: 100% 100%;
  }
  100% {
    opacity: 0;
    transform: scaleY(0.8);
    transform-origin: 100% 100%;
  }
}
</style>
