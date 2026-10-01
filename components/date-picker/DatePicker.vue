<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { CSSProperties, TransitionProps, VNode } from 'vue'
import Popup from 'components/popup'
import DatePanel from 'components/picker/DatePanel.vue'
import DatetimePanel from 'components/picker/DatetimePanel.vue'
import PickerTrigger from 'components/picker/PickerTrigger.vue'
import { formatTimestamp, getDefaultFormat, getInputSize, parseTimestamp } from 'components/picker/date-utils'
import type { StartDayOfWeek } from 'components/picker/date-utils'
import type {
  PickerDisabledTime,
  PickerFormattedValue,
  PickerPanelMode,
  PickerSize,
  PickerStatus,
  PickerTimePanelProps,
  PickerType,
  PickerValue
} from 'components/picker'
import type { FloatingPlacement } from 'components/utils'
import { FLOATING_LAYER_Z_INDEX, useInject } from 'components/utils'
export interface Props {
  // 双向绑定
  formattedValue?: PickerFormattedValue // 字符串轨道值：父组件传入时以它为准（受控），随选择经 update 事件回写
  // 内容数据
  type?: PickerType // 选择形态
  format?: string // 展示格式，date-fns 占位符，默认随 type 变化
  valueFormat?: string // 绑定值格式，默认与 format 相同
  placeholder?: string // 输入框提示文字
  defaultPickerValue?: number // 面板初始日期（时间戳），默认取 value 或今天
  startDayOfWeek?: StartDayOfWeek // 一周起始日，0 为周一
  disabledDate?: (timestamp: number) => boolean // 不可选择的日期
  disabledTime?: PickerDisabledTime // 不可选择的时间，仅带时间形态生效
  defaultTime?: number // 选中日期时的默认时分秒（只取其中的时分秒）
  timePickerProps?: PickerTimePanelProps // 时间面板选项（步长 / 12 小时制 / 隐藏禁用项）
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
  showNow?: boolean // 是否展示面板底部的「此刻」快捷，仅带时间形态生效
  // 进阶透传
  suffixIcon?: VNode | (() => VNode) // 自定义选择框后缀图标
  panelClass?: string // 面板额外类名
  panelStyle?: CSSProperties // 面板额外样式
  zIndex?: number // 面板层级，优先级最高
}
/**
 * 组件对外 props 类型
 *
 * `value` / `open` 由 `defineModel` 声明（同名出现在 `defineProps` 中会与模型绑定冲突），此处合并回对外
 * 类型，保证使用方获得完整的 props 提示。`formattedValue` 例外：它必须由 `defineProps` 声明，才能从
 * 「父组件是否传入」判定字符串轨道是否受控（模型值无法区分父组件写入与本组件回写）
 */
export type DatePickerProps = Props & {
  value?: PickerValue
  open?: boolean
}
// value / open 两个双向绑定项的默认值由 defineModel 声明，此处不重复
const props = withDefaults(defineProps<Props>(), {
  formattedValue: undefined,
  type: 'date',
  format: undefined,
  valueFormat: undefined,
  placeholder: '',
  defaultPickerValue: undefined,
  startDayOfWeek: 0,
  disabledDate: undefined,
  disabledTime: undefined,
  defaultTime: undefined,
  timePickerProps: undefined,
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
  showNow: true,
  suffixIcon: undefined,
  panelClass: '',
  panelStyle: undefined,
  zIndex: undefined
})
const emits = defineEmits<{
  change: [value: PickerValue, formattedValue: PickerFormattedValue]
  ok: [value: PickerValue, formattedValue: PickerFormattedValue]
  'update:formattedValue': [value: PickerFormattedValue]
  openChange: [open: boolean]
  panelChange: [value: number, mode: PickerPanelMode]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
const value = defineModel<PickerValue>('value', { default: null })
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
/** 是否为带时间面板的形态：日期与时间并排，选择只改草稿，点「确定」才提交 */
const isDateTime = computed(() => props.type === 'datetime')
/** 展示格式：未指定时随形态取默认值；面板的时间列显隐也按它推导（与参考实现的 `format` 口径一致） */
const mergedFormat = computed(() => props.format ?? getDefaultFormat(props.type))
/** 展示与回写共用的格式：`valueFormat` 优先，未指定时跟随展示格式 */
const mergedValueFormat = computed(() => props.valueFormat ?? mergedFormat.value)
/** 输入框按格式长度估宽，避免浏览器按 20 字符默认估宽导致触发器明显偏宽 */
const inputSize = computed(() => getInputSize(mergedValueFormat.value))
/** 字符串轨道受控：父组件传入 `formattedValue` 时以它为准，与主轨道解耦 */
const formattedControlled = computed(() => props.formattedValue !== undefined)
const innerValue = computed<number | null>(() => {
  if (formattedControlled.value) {
    return typeof props.formattedValue === 'string'
      ? parseTimestamp(props.formattedValue, mergedValueFormat.value)
      : null
  }
  return typeof value.value === 'number' ? value.value : null
})
/** 草稿值：带时间形态在面板展开期间只把选择落在草稿上，点「确定」才提交，关闭即丢弃 */
const draftValue = ref<number | null>(null)
/** 面板展示值：带时间形态展开期间取草稿，其余情况跟随已提交值 */
const panelTimestamp = computed(() => {
  const drafting = isDateTime.value && open.value && draftValue.value !== null
  return drafting ? draftValue.value : innerValue.value
})
// 受控字符串解析失败时原样展示，避免用户输入被静默丢弃
// （字符串轨道受管时展示以受管文本为准，草稿不回写展示，避免与应用层持有的文本脱节）
const displayText = computed(() => {
  if (formattedControlled.value) {
    return typeof props.formattedValue === 'string' ? props.formattedValue : ''
  }
  return panelTimestamp.value === null ? '' : formatTimestamp(panelTimestamp.value, mergedValueFormat.value)
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
    draftValue.value = null // 收起即丢弃草稿，未点「确定」的选择不生效
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
/** 回写两条轨道：主轨道始终同步，字符串轨道按同一格式生成；返回回写的字符串，供「确定」事件复用 */
function commit(timestamp: number | null): PickerFormattedValue {
  const nextFormatted = timestamp === null ? null : formatTimestamp(timestamp, mergedValueFormat.value)
  value.value = timestamp
  emits('update:formattedValue', nextFormatted)
  emits('change', timestamp, nextFormatted)
  return nextFormatted
}
function onSelect(timestamp: number) {
  commit(timestamp)
  requestOpen(false)
}
/** 草稿变更：只更新面板草稿，不提交（带时间形态的选择由「确定」统一提交） */
function onDraftChange(timestamp: number) {
  draftValue.value = timestamp
}
/**
 * 「确定」/「此刻」的提交：都回写双轨、派发 `change` 并收起面板（与参考实现同口径：
 * 两者都走 `triggerSelect(..., 'submit')` → `triggerOpen(false)`），收起时草稿由 `open` 的监听统一丢弃。
 *
 * 差异仅在事件：`ok` 只由「确定」派发，「此刻」是「跳到当前时刻」的快捷入口、不派发 `ok`。
 */
function onConfirm(timestamp: number, source: 'ok' | 'now') {
  const nextFormatted = commit(timestamp)
  requestOpen(false)
  if (source === 'ok') {
    emits('ok', timestamp, nextFormatted)
  }
}
function onClear() {
  commit(null)
  requestOpen(false)
}
/**
 * 手输文本：解析成功才提交，失败时由触发器回滚为当前合法文本
 *
 * 带时间形态的提交口径与参考实现一致：失焦即取消（丢弃草稿、不提交），回车与「确定」同径（提交并收起）
 * —— 面板展开期间输入框展示的是草稿，若失焦时按手输提交，会把未确认的草稿当成用户输入落值。
 */
function onTextConfirm(text: string, source: 'enter' | 'blur') {
  if (isDateTime.value && source === 'blur') {
    draftValue.value = null
    return
  }
  const timestamp = parseTimestamp(text, mergedValueFormat.value)
  if (timestamp === null) return
  commit(timestamp)
  if (isDateTime.value) {
    draftValue.value = null
    requestOpen(false)
  }
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
      <DatetimePanel
        v-if="isDateTime"
        :value="panelTimestamp"
        :format="mergedFormat"
        :header-format="format"
        :time-props="timePickerProps"
        :disabled-date="disabledDate"
        :disabled-time="disabledTime"
        :default-time="defaultTime"
        :default-picker-value="defaultPickerValue"
        :start-day-of-week="startDayOfWeek"
        :show-now="showNow"
        :active="open"
        @change="onDraftChange"
        @confirm="onConfirm"
        @panel-change="onPanelChange"
      />
      <DatePanel
        v-else
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
