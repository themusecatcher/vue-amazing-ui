<script setup lang="ts">
import { computed, nextTick, ref, useSlots } from 'vue'
import type { CSSProperties, TransitionProps, VNode } from 'vue'
import Button from 'components/button'
import Popup from 'components/popup'
import {
  ARROW_PLACEMENTS,
  PANEL_NAV_KEYS,
  PANEL_OPEN_IGNORED_KEYS,
  POPUP_OFFSET,
  PickerIcon,
  PickerPanel,
  PickerTrigger,
  RANGE_POPUP_OFFSET,
  TimePanel,
  formatTimestamp,
  getHourNumber,
  getInputSize,
  getLowerBoundTime,
  getMinuteNumber,
  getSecondNumber,
  isPickerFocusInside,
  mergeTimeStep,
  parseTimestamp,
  setTimeTimestamp,
  usePickerShell,
  type PickerDisabledTime,
  type PickerDisabledTimeUnits,
  type PickerFormattedValue,
  type PickerRangeDisabledTime,
  type PickerRangeFormattedValue,
  type PickerRangeSide,
  type PickerRangeValue,
  type PickerSize,
  type PickerStatus,
  type PickerTimePanelProps,
  type PickerValue
} from 'components/picker'
import type { FloatingPlacement, MountElement } from 'components/utils'
import { FLOATING_LAYER_Z_INDEX } from 'components/utils'
/** 默认展示格式（24 小时制） */
const DEFAULT_FORMAT = 'HH:mm:ss'
/** 12 小时制下的默认展示格式：小时补零，与面板的小时列标签、头部文本同口径（均为两位的 `09`） */
const DEFAULT_12_HOURS_FORMAT = 'hh:mm:ss a'
/** 输入框估宽的字符下限：时间格式短（`HH:mm:ss` 仅 8 字符），沿用日期形态的 10 会让触发器凭空宽出约 14px */
const TIME_INPUT_MIN_SIZE = 8
/** 选择形态：单选（单段值）或范围（两段元组值，双段输入） */
export type TimePickerType = 'time' | 'timerange'
export interface Props {
  value?: PickerValue // (v-model:value) 当前取值；传入即受控
  defaultValue?: PickerValue // 非受控初始值，未绑 v-model:value 时生效
  open?: boolean // (v-model:open) 面板是否展开；传入即受控
  // 双向绑定
  formattedValue?: PickerFormattedValue // 字符串轨道值：父组件传入时以它为准（受控），随选择经 update 事件回写
  // 内容数据
  type?: TimePickerType // 选择形态
  format?: string // 展示格式，date-fns 占位符，默认 `HH:mm:ss`（12 小时制为 `hh:mm:ss a`）
  valueFormat?: string // 绑定值格式，默认与 format 相同
  placeholder?: string | [string, string] // 输入框提示文字，范围形态可分别为两段指定
  disabledTime?: PickerDisabledTime | PickerRangeDisabledTime // 不可选择的时间，范围形态额外接收段标识
  hourStep?: number // 小时选项间隔
  minuteStep?: number // 分钟选项间隔
  secondStep?: number // 秒选项间隔
  use12Hours?: boolean // 使用 12 小时制
  hideDisabledOptions?: boolean // 隐藏禁止选择的选项
  // 形态外观
  width?: string | number // 选择器宽度，不传时随内容自适应
  size?: PickerSize // 选择器大小
  status?: PickerStatus // 校验状态
  bordered?: boolean // 是否展示边框
  // 状态反馈
  disabled?: boolean | [boolean, boolean] // 是否禁用，范围形态可传两段元组逐段禁用
  allowClear?: boolean // 是否展示清除按钮
  allowEmpty?: [boolean, boolean] // 范围形态各段是否允许为空：为 true 时该段为空也能对外派发 change；清空整段仍走 allowClear，清空某段输入框不会置空该段
  inputReadOnly?: boolean // 输入框是否只读（避免移动端唤起键盘）
  // 行为交互
  to?: string | MountElement | false // 面板挂载的容器节点，不传时就近挂载到承载层内容容器
  placement?: FloatingPlacement // 面板弹出位置
  // 范围形态的面板指示箭头：不传时跟随弹出方位（仅左侧对齐的 bottomLeft / topLeft 展示），
  // 传 true 始终展示、传 false 始终隐藏，仅范围形态生效
  showArrow?: boolean
  showNow?: boolean // 是否展示面板底部的「此刻」快捷，仅单选形态生效：范围形态的提交落在单段上，「此刻」无从决定属于哪一段
  // 进阶透传
  renderExtraFooter?: () => VNode | VNode[] // 面板底部的额外页脚，渲染在操作行之上
  suffixIcon?: VNode | (() => VNode) // 自定义选择框后缀图标
  panelClass?: string // 面板额外类名
  panelStyle?: CSSProperties // 面板额外样式
  zIndex?: number // 面板层级，优先级最高
}
/** 范围形态草稿变更的来源信息：本次改动落在哪一段 */
export interface TimePickerRangeInfo {
  range: PickerRangeSide
}
export interface TimePickerSlots {
  suffixIcon?: () => VNode[] // 自定义选择框后缀图标，优先于同名 prop
  separator?: () => VNode[] // 范围形态两段之间的分隔符，默认右向箭头
  renderExtraFooter?: () => VNode[] // 面板底部的额外页脚，优先于同名 prop
}
/**
 * 对外公开的值与配置类型
 *
 * 选择器内核（`components/picker`）不对外导出，这里按本组件文档所引用的类型名逐个别名转出，
 * 使用方 `import type { TimePickerXxx } from 'vue-amazing-ui'` 即可获得对应提示
 */
export type {
  PickerValue as TimePickerValue,
  PickerFormattedValue as TimePickerFormattedValue,
  PickerDisabledTime as TimePickerDisabledTime,
  PickerRangeDisabledTime as TimePickerRangeDisabledTime,
  PickerDisabledTimeUnits as TimePickerDisabledTimeUnits,
  PickerRangeSide as TimePickerRangeSide
} from 'components/picker'
const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  defaultValue: undefined,
  open: undefined,
  formattedValue: undefined,
  type: 'time',
  format: undefined,
  valueFormat: undefined,
  placeholder: '',
  disabledTime: undefined,
  hourStep: undefined,
  minuteStep: undefined,
  secondStep: undefined,
  use12Hours: undefined,
  hideDisabledOptions: false,
  width: undefined,
  size: 'middle',
  status: undefined,
  bordered: true,
  disabled: false,
  allowClear: true,
  allowEmpty: () => [false, false],
  inputReadOnly: false,
  showArrow: undefined,
  showNow: true,
  to: undefined,
  placement: 'bottomLeft',
  renderExtraFooter: undefined,
  suffixIcon: undefined,
  panelClass: '',
  panelStyle: undefined,
  zIndex: undefined
})
defineSlots<TimePickerSlots>()
const emits = defineEmits<{
  change: [value: PickerValue, formattedValue: PickerFormattedValue]
  calendarChange: [
    value: PickerRangeValue | null,
    formattedValue: PickerRangeFormattedValue | null,
    info: TimePickerRangeInfo
  ]
  ok: [value: PickerValue, formattedValue: PickerFormattedValue]
  'update:formattedValue': [value: PickerFormattedValue]
  'update:value': [value: PickerValue]
  'update:open': [open: boolean]
  openChange: [open: boolean]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
// 显式标注插槽类型：`useSlots()` 的返回值参与 `mergedExtraFooter` 的推导，构成推断环
const slots: TimePickerSlots = useSlots()
/** 面板的键盘入口：由 `TimePanel` 经 `defineExpose` 暴露 */
interface PanelKeydownTarget {
  handleKeydown: (event: KeyboardEvent) => boolean
}
const timePanelRef = ref<PanelKeydownTarget | null>(null)
/**
 * 键盘归属：`false` 为文本输入态（方向键移动插入光标），`true` 为面板操作态（方向键操作时间列）
 *
 * 两态由 Tab 切换，面板操作态下输入框置为只读；声明须在收起监听之前（该监听带 `immediate`，初始收起时即会重置本状态）
 */
const keyboardPanelMode = ref(false)
// 主题变量随组件壳下发，浮层经 Teleport 后不在壳内，需同样注入到面板上
const themeVars = computed(() => ({
  '--picker-primary-color': 'var(--va-cp-time-picker-primary-color, var(--va-primary-color))',
  '--picker-primary-color-hover': 'var(--va-cp-time-picker-primary-color-hover, var(--va-primary-color-hover))',
  '--picker-primary-shadow-color': 'var(--va-cp-time-picker-primary-bg-color, var(--va-primary-bg-color))',
  '--picker-primary-color-bg': 'var(--va-cp-time-picker-primary-bg-color, var(--va-primary-bg-color))'
}))
const wrapperStyle = computed(() => {
  const width =
    props.width === undefined ? undefined : typeof props.width === 'number' ? `${props.width}px` : props.width
  return { ...themeVars.value, '--timepicker-width': width ?? 'auto' } as CSSProperties
})
const mergedPanelClass = computed(() => ['timepicker-panel-container', props.panelClass].filter(Boolean).join(' '))
/** 展示格式：未指定时按 12 小时制开关取默认值 */
const mergedFormat = computed(() => props.format ?? (props.use12Hours ? DEFAULT_12_HOURS_FORMAT : DEFAULT_FORMAT))
/** 展示与回写共用的格式：`valueFormat` 优先，未指定时跟随展示格式 */
const mergedValueFormat = computed(() => props.valueFormat ?? mergedFormat.value)
/** 输入框按**绑定值格式**估宽：下限取时间格式的 8 字符（沿用日期形态的 10 会让触发器凭空宽出约 14px），宽度与展示文本一致 */
const inputSize = computed(() => getInputSize(mergedValueFormat.value, TIME_INPUT_MIN_SIZE))
/** 是否为范围形态：双段输入，值为两段元组 */
const isRange = computed(() => props.type === 'timerange')
/** 值与开合的共享内核：与形态无关的值逻辑与 `DatePicker` 共用一份实现 */
const {
  openModel,
  triggerRef,
  popupRef,
  wrapperRef,
  formattedControlled,
  disabledSides,
  fullyDisabled,
  innerValue,
  rangeValue,
  formatSideTimestamp,
  showClear,
  draftValue,
  draftRange,
  activeSide,
  activeTriggerIndex,
  activateSide,
  panelRangeValue,
  commit,
  applyRangeSide,
  requestOpen,
  onSideFocus,
  onClear,
  onEscKeydown,
  focus,
  blur
} = usePickerShell({
  props,
  isRange,
  valueFormat: mergedValueFormat,
  onChange: (value, formattedValue) => emits('change', value, formattedValue),
  onFormattedChange: (value) => emits('update:formattedValue', value),
  onCalendarChange: (value, formattedValue, range) => emits('calendarChange', value, formattedValue, { range }),
  onOpenChange: (open) => emits('openChange', open),
  // 收起时把键盘交还文本输入态（形态自有状态）
  onOpenToggle: (open) => {
    if (!open) {
      keyboardPanelMode.value = false
    }
  }
})
/** 激活段在元组中的下标 */
const activeSideIndex = computed(() => (activeSide.value === 'start' ? 0 : 1))
/** 对端在元组中的下标 */
const otherSideIndex = computed(() => (activeSide.value === 'start' ? 1 : 0))
/** 面板展示值：范围形态取激活段，单选形态取单值（展开期间有草稿则取草稿） */
const panelTimestamp = computed(() => {
  if (isRange.value) {
    return panelRangeValue.value?.[activeSideIndex.value] ?? null
  }
  const drafting = openModel.value && draftValue.value !== null
  return drafting ? draftValue.value : innerValue.value
})
/**
 * 合成新时间戳的日期基准：范围形态下激活段自身优先，为空时取另一端（两段都空则由面板退回当前时刻）
 *
 * 时间列只表达时分秒，落值仍要一个日期承接 —— 取另一端那一日，同一区间的两段因此落在同一天上。
 */
const panelBaseTimestamp = computed(() => {
  if (!isRange.value) return undefined
  return panelRangeValue.value?.[activeSideIndex.value] ?? panelRangeValue.value?.[otherSideIndex.value] ?? undefined
})
/** 输入框展示文本：字符串轨道受控时原样展示（解析失败也不丢弃用户输入），否则按展示格式生成 */
const displayText = computed(() => {
  if (formattedControlled.value) {
    return typeof props.formattedValue === 'string' ? props.formattedValue : ''
  }
  return panelTimestamp.value === null ? '' : formatTimestamp(panelTimestamp.value, mergedValueFormat.value)
})
/** 范围形态的两段文本：字符串轨道受控时以其为准，否则按展示格式逐段生成 */
const displayRangeTexts = computed<[string, string]>(() => {
  const formatted = props.formattedValue
  if (formattedControlled.value && Array.isArray(formatted)) {
    return [formatted[0] ?? '', formatted[1] ?? '']
  }
  const current = panelRangeValue.value
  return [formatSideTimestamp(current?.[0]), formatSideTimestamp(current?.[1])]
})
/** 两段输入的提示文字：只给单值时两段共用同一文案 */
const mergedPlaceholders = computed<[string, string]>(() => {
  const placeholder = props.placeholder
  if (Array.isArray(placeholder)) {
    return [placeholder[0] ?? '', placeholder[1] ?? '']
  }
  return [placeholder, placeholder]
})
/** 单段输入的提示文字（范围形态由两段提示文字承担，此处传空） */
const singlePlaceholder = computed(() => (Array.isArray(props.placeholder) ? '' : props.placeholder))
/** 时间面板选项：把扁平属性组装成内核口径 */
const timePanelProps = computed<PickerTimePanelProps>(() => ({
  hourStep: props.hourStep,
  minuteStep: props.minuteStep,
  secondStep: props.secondStep,
  use12Hours: props.use12Hours,
  hideDisabledOptions: props.hideDisabledOptions
}))
/** 禁用时间的判定基准：激活段自身优先，为空时取另一端，两段都空取当前时刻 */
const disabledBase = computed(() => (isRange.value ? panelBaseTimestamp.value : panelTimestamp.value) ?? Date.now())
/** 禁用时间：范围形态把段标识注入判定函数（对外口径为 `(timestamp, side)`） */
const disabledUnits = computed<PickerDisabledTimeUnits>(() => {
  const disabledTime = props.disabledTime
  if (!disabledTime) return {}
  return isRange.value
    ? (disabledTime as PickerRangeDisabledTime)(disabledBase.value, activeSide.value)
    : (disabledTime as PickerDisabledTime)(disabledBase.value)
})
/** 「确定」是否可点：激活段（单选形态即该段自身）没有可提交的时间 */
const okDisabled = computed(() => panelTimestamp.value === null)
/**
 * 面板底部的额外页脚：同名插槽优先于 prop，两轨统一为「入参 → VNode[]」的函数下发给内核
 * （内核只收函数：VNode 需在其渲染上下文内创建，`computed` 里直接求值会产生「无主的 hoisted vnode」）
 */
const mergedExtraFooter = computed<(() => VNode[]) | undefined>(() => {
  // #renderExtraFooter 是渲染委托型插槽，按「是否提供」判断（空内容会被内容探测误判为未提供）
  if (slots.renderExtraFooter) {
    return () => slots.renderExtraFooter?.() ?? []
  }
  const render = props.renderExtraFooter
  if (!render) return undefined
  return () => {
    const node = render()
    return Array.isArray(node) ? node : [node]
  }
})
/** 实际方向：定位内核翻转 / 次轴自适应后的结果（宿主未挂载时退回期望方位） */
const actualPlacement = computed<FloatingPlacement>(() => popupRef.value?.actualPlacement ?? props.placement)
/** 面板指示箭头相对输入区左边缘的偏移：与激活段下划线同源，由触发器测量后下发 */
const rangeArrowLeft = ref(0)
/** 是否展示面板指示箭头：不传 `showArrow` 时按「实际方位」判定，传值则以显式开关为准 */
const showRangeArrow = computed(() => {
  if (!isRange.value || props.showArrow === false) return false
  return props.showArrow === true || ARROW_PLACEMENTS.includes(actualPlacement.value)
})
/** 浮层与触发器的间距：范围形态额外预留箭头所在的那一段空白 */
const popupOffset = computed(() => (isRange.value ? RANGE_POPUP_OFFSET : POPUP_OFFSET))
/** 面板过渡：仅给 name，类名走 Vue 默认派生（-enter-from/-enter-active/…），缩放原点由 <Popup> 按方位写入 */
const panelTransitionProps: TransitionProps = { name: 'timepicker-zoom' }
/**
 * 点击触发器只负责展开（展开态点击不收起，收起由外部点击 / Esc / 提交触发）：
 * 按落点确定本次会话的激活段（点终点段即激活终点段），并把焦点移到该段输入框
 */
function onTriggerClick(index: 0 | 1 = 0) {
  // 面板操作态下输入框是只读的，点击输入区即把键盘收回文本输入态，恢复手输
  if (keyboardPanelMode.value) {
    keyboardPanelMode.value = false
  }
  if (openModel.value) return
  // 该段被禁用时不展开：禁用段不可编辑，展开后也没有可选的段
  if (disabledSides.value[index]) return
  activateSide(index === 0 ? 'start' : 'end')
  requestOpen(true)
  nextTick(() => {
    triggerRef.value?.focus(index)
  })
}
/** 面板选择：只把选择落在激活段的草稿上，由「确定」统一提交 */
function onSelect(timestamp: number) {
  if (isRange.value) {
    const current = draftRange.value ?? rangeValue.value ?? [null, null]
    draftRange.value = activeSide.value === 'start' ? [timestamp, current[1]] : [current[0], timestamp]
    return
  }
  draftValue.value = timestamp
}
/**
 * 提交面板当前的时间点：「确定」与面板操作态的回车共用一个入口
 *
 * 落在面板时间点（而非输入框文本）上，值的日期部分才不被丢掉；没有可提交的时间时返回 `null`。
 */
function submitPanelValue(): { value: PickerValue; formatted: PickerFormattedValue } | null {
  const timestamp = panelTimestamp.value
  if (timestamp === null) return null
  if (isRange.value) {
    // 范围形态的提交落在激活段上，是否继续编辑另一端由 `applyRangeSide` 决定
    const { value, formatted } = applyRangeSide(timestamp, activeSide.value, true)
    return { value, formatted }
  }
  const formatted = commit(timestamp)
  requestOpen(false)
  return { value: timestamp, formatted }
}
/** 「确定」：提交并收起（无值可提交时按钮已禁用），并派发 `ok`（与「此刻」区分） */
function onOk() {
  const result = submitPanelValue()
  if (result === null) return
  emits('ok', result.value, result.formatted)
}
/**
 * 「此刻」：取当前时刻并按步长向下取整后即提交，与既有带时间形态同口径
 *
 * 快捷入口直接落值，不派发「确定」语义之外的事件。
 */
function onNow() {
  const now = Date.now()
  const [hour, minute, second] = getLowerBoundTime(
    getHourNumber(now),
    getMinuteNumber(now),
    getSecondNumber(now),
    mergeTimeStep('hour', props.hourStep),
    mergeTimeStep('minute', props.minuteStep),
    mergeTimeStep('second', props.secondStep)
  )
  commit(setTimeTimestamp(now, hour, minute, second))
  requestOpen(false)
}
/**
 * 手输文本：解析成功才提交，失败时由触发器回滚为当前合法文本；失焦按取消处理 —— 此刻输入框展示的
 * 可能是面板草稿（非用户键入内容），否则未点「确定」的选择会被当成用户输入落值
 *
 * 面板操作态下输入框是只读的，此刻的回车不是「提交键入的文本」而是「确认面板上的时间点」，
 * 与「确定」同径（提交草稿并收起），时间戳因此仍带着原来的日期。
 */
function onTextConfirm(text: string, source: 'enter' | 'blur', index: 0 | 1 = 0) {
  if (source === 'blur') {
    draftValue.value = null
    draftRange.value = null
    return
  }
  if (keyboardPanelMode.value) {
    submitPanelValue()
    return
  }
  // 范围形态的提交落在键入的那一段上，并按「确定」同径继续编辑另一端
  const rangeTimestamp = parseTimestamp(text, mergedValueFormat.value)
  if (isRange.value) {
    if (rangeTimestamp !== null) {
      applyRangeSide(rangeTimestamp, index === 0 ? 'start' : 'end', true)
    }
    return
  }
  if (rangeTimestamp === null) return
  commit(rangeTimestamp)
  requestOpen(false)
}
/* ============================== 键盘导航 ============================== */
/**
 * 按键按下时的展开态快照
 *
 * 展开态的回车会先被输入框的文本提交消费（提交并收起面板），事件随后才冒泡到这里 —— 用此刻的
 * 展开态判断会把同一次回车变成「关了又开」，故以按下时的状态为准。
 */
let openAtKeydown = false
function onWrapperKeydownCapture(): void {
  openAtKeydown = openModel.value
}
/**
 * 本次焦点变化是否由「按在组件内」的指针操作引起
 *
 * 点触发器的非输入区（图标、内边距）同样会让输入框失焦，但那是「点自己」，不该收起面板；
 * 复位放在下一轮事件循环 —— 同一次点击的焦点变化就在本轮任务内。
 */
let pointerInside = false
function onWrapperMousedown(): void {
  pointerInside = true
  setTimeout(() => {
    pointerInside = false
  }, 0)
}
function onTabKeydown(event: KeyboardEvent): void {
  if (event.shiftKey) {
    // 面板操作态下 Shift+Tab 收回键盘（焦点不动）；文本输入态直接交还浏览器移出焦点
    if (keyboardPanelMode.value) {
      keyboardPanelMode.value = false
      event.preventDefault()
    }
    return
  }
  // 面板操作态不再拦截：交还浏览器把焦点移出组件（随之收起面板）
  if (keyboardPanelMode.value) {
    return
  }
  keyboardPanelMode.value = true
  event.preventDefault()
}
/** 输入框内容被改动：键盘归属收回文本输入态，方向键随之回到输入光标 */
function onTriggerInput(): void {
  keyboardPanelMode.value = false
}
/**
 * 触发器的按键入口：面板未展开时任意输入键唤起面板，展开后按键盘归属把导航键转给时间面板
 *
 * 回车两态分工：收起态唤起面板；展开态由触发器的文本提交消费（提交并收起，无值可提交则保持展开）。
 */
function onWrapperKeydown(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    event.preventDefault()
    if (!openAtKeydown) {
      requestOpen(true)
    }
    return
  }
  if (event.key === 'Tab') {
    if (openModel.value && !fullyDisabled.value) {
      onTabKeydown(event)
    }
    return
  }
  if (!openModel.value) {
    if (!PANEL_OPEN_IGNORED_KEYS.includes(event.key)) {
      requestOpen(true)
    }
    return
  }
  if (!keyboardPanelMode.value || !PANEL_NAV_KEYS.includes(event.key)) {
    return
  }
  timePanelRef.value?.handleKeydown(event)
}
/**
 * 焦点离开组件即收起面板并丢弃草稿，键盘归位到文本输入态
 *
 * 落点落在面板里（如焦点移到「确定」按钮）不算离开；由组件内部的按下引起的失焦同样不算。
 */
function onWrapperFocusout(event: FocusEvent): void {
  const next = event.relatedTarget as Node | null
  // 键盘一律交还文本输入态，焦点是否真的离开组件决定面板去留
  keyboardPanelMode.value = false
  if (pointerInside || isPickerFocusInside(wrapperRef.value, popupRef.value, next)) {
    return
  }
  requestOpen(false)
}
defineExpose({ focus, blur })
</script>
<template>
  <div
    ref="wrapperRef"
    class="timepicker-wrap"
    :style="wrapperStyle"
    @keydown.capture="onWrapperKeydownCapture"
    @keydown="onWrapperKeydown"
    @keydown.esc="onEscKeydown"
    @keydown.enter.stop
    @focusout="onWrapperFocusout"
    @mousedown="onWrapperMousedown"
    @input="onTriggerInput"
  >
    <PickerTrigger
      ref="triggerRef"
      :text="displayText"
      :texts="displayRangeTexts"
      :range="isRange"
      :active-index="activeTriggerIndex"
      :placeholder="singlePlaceholder"
      :placeholders="mergedPlaceholders"
      :size="size"
      :status="status"
      :bordered="bordered"
      :disabled="fullyDisabled"
      :disabled-sides="disabledSides"
      :input-read-only="inputReadOnly || keyboardPanelMode"
      :allow-clear="showClear"
      :open="openModel"
      :input-size="inputSize"
      icon="clock-circle"
      :suffix-icon="suffixIcon"
      @click="onTriggerClick"
      @clear="onClear"
      @side-focus="onSideFocus"
      @arrow-change="rangeArrowLeft = $event"
      @text-confirm="onTextConfirm"
      @focus="emits('focus', $event)"
      @blur="emits('blur', $event)"
    >
      <template #suffix>
        <slot name="suffixIcon">
          <component :is="suffixIcon" v-if="suffixIcon" />
        </slot>
      </template>
      <template #separator>
        <slot name="separator">
          <PickerIcon name="swap-right" />
        </slot>
      </template>
    </PickerTrigger>
    <Popup
      ref="popupRef"
      :show="openModel && !fullyDisabled"
      :to="to"
      :anchor="wrapperRef"
      :placement="placement"
      :offset="popupOffset"
      :panel-class="mergedPanelClass"
      :panel-style="{ ...panelStyle, ...themeVars }"
      :z-index="zIndex"
      :default-z-index="FLOATING_LAYER_Z_INDEX.select"
      :transition-props="panelTransitionProps"
      close-on-outside-click
      @keydown.esc="onEscKeydown"
      @outside-click="requestOpen(false)"
    >
      <PickerPanel class="timepicker-panel" show-footer :extra-footer="mergedExtraFooter">
        <TimePanel
          ref="timePanelRef"
          hide-header
          :value="panelTimestamp"
          :base-timestamp="panelBaseTimestamp"
          :format="mergedFormat"
          :header-format="format"
          :time-props="timePanelProps"
          :disabled-units="disabledUnits"
          :active="openModel"
          :panel-active="keyboardPanelMode"
          @change="onSelect"
        />
        <template #footer>
          <ul class="timepicker-panel-ranges">
            <li v-if="showNow && !isRange" class="timepicker-panel-now">
              <a class="timepicker-panel-now-btn" @click="onNow">此刻</a>
            </li>
            <li class="timepicker-panel-ok">
              <Button size="small" type="primary" :disabled="okDisabled" @click="onOk">确定</Button>
            </li>
          </ul>
        </template>
      </PickerPanel>
      <!-- 范围形态的面板指示箭头：与激活段下划线同源平移、随弹出方位上下翻转 -->
      <div v-if="showRangeArrow" class="timepicker-range-arrow" :style="{ left: `${rangeArrowLeft}px` }" />
    </Popup>
  </div>
</template>
<style lang="less" scoped>
.timepicker-wrap {
  // 行内弹性容器：未传 width 时收缩为内容宽，不被父容器拉伸
  display: inline-flex;
  width: var(--timepicker-width, auto);
  :deep(.picker-trigger) {
    flex: auto;
    min-width: 0;
  }
}
/* 范围形态的面板指示箭头：left 按激活段给定（宿主经 PickerTrigger 测量后下发），
   几何与浮层皮肤层的箭头同构（浮层箭头的几何由各皮肤层自行实现） */
.timepicker-range-arrow {
  position: absolute;
  top: 0;
  z-index: 1;
  width: 16px;
  height: 16px;
  // 取触发器水平内边距的 1.5 倍
  margin-left: 16.5px;
  overflow: hidden;
  pointer-events: none;
  // 面板在触发器下方：贴上边缘并向上突出（尖朝上）
  transform: translateY(-100%);
  transition: left 0.3s ease-out;
  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 16px;
    height: 8px;
    // 与面板同底：箭头自绘三角形，必须取 .picker-panel 的同一底色变量，
    // 否则暗色下浮层底（elevated）比容器底（container）亮一档，箭头会显成一块更暗的补丁
    background-color: var(--picker-panel-bg-color, var(--va-bg-elevated-color));
    clip-path: polygon(
      1.6568542494923806px 100%,
      50% 1.6568542494923806px,
      14.34314575050762px 100%,
      1.6568542494923806px 100%
    );
    clip-path: path(
      'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
    );
    content: '';
  }
  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 8.970562748477143px;
    height: 8.970562748477143px;
    margin: auto;
    // 只延续投影：置于三角形之下，压在三角形之上会把浅色箭头染灰
    z-index: -1;
    background: transparent;
    border-radius: 0 0 2px 0;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
    transform: translateY(50%) rotate(-135deg);
    content: '';
  }
}
// 面板宽度交给时间列内容（内核面板默认 280px 是日期列宽度）；尾随占位取「列可视高 - 格高」：本形态
// 216px → 188px，末项滚到底正好落在列顶、完整可悬浮（内核默认 204px 属日期时间形态，其列被撑到 232px）
.picker-panel.timepicker-panel {
  width: auto;
  --picker-time-column-trailing-height: 188px;
}
.timepicker-panel-ranges {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 4px 12px;
  line-height: 34px;
  text-align: start;
  list-style: none;
  > li {
    display: inline-block;
    // 面板就地渲染（`to` 默认 false）会落在宿主文档的内容区内，宿主会给相邻 li 补外边距（如
    // VitePress 的 `.vp-doc li + li`），使「确定」相对「此刻」下沉；此处归零，间距由本组件自行掌控
    margin: 0;
  }
  // 隐藏「此刻」时底部只剩「确定」，靠自身外边距顶到行尾；高度须显式取页脚行高（flex 后行高不再参与
  // 内在高度，不声明则页脚矮 10px），弹性居中用于补偿按钮根节点为 inline-block div 的基线偏移
  .timepicker-panel-ok {
    display: flex;
    align-items: center;
    height: 34px;
    margin-inline-start: auto;
  }
}
.timepicker-panel-now-btn {
  // 还原被宿主文档链接样式接管的字重与下划线
  color: var(--picker-primary-color, var(--va-cp-time-picker-primary-color, var(--va-primary-color)));
  font-weight: normal;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: var(
      --picker-primary-color-hover,
      var(--va-cp-time-picker-primary-color-hover, var(--va-primary-color-hover))
    );
  }
}
</style>
<style lang="less">
/* 以下规则必须留在全局：它们作用于 <Popup> 宿主编译出的面板节点（scope id 属宿主），
   且 Teleport 到 body 后不在本组件 DOM 子树内，scoped 与 :deep() 均选不中。
   收口口径：① 面板几何以 .timepicker-panel-container 收口；② 动画类与关键帧统一加 `timepicker-` 前缀，避免与宿主页面撞名 */
.timepicker-panel-container {
  width: max-content;
  outline: none;
}
/* 面板在触发器上方时指示箭头翻转向下（方向类由 <Popup> 落在面板节点上，故此处留在全局） */
.va-popup-placement-top .timepicker-range-arrow,
.va-popup-placement-topLeft .timepicker-range-arrow,
.va-popup-placement-topRight .timepicker-range-arrow {
  top: auto;
  bottom: 0;
  transform: translateY(100%) rotate(180deg);
}
/* 展开 / 收起的缩放原点由 <Popup> 按实际方位写在面板上，
   故这里只保留一条与方位无关的动效（按方位取名会让首帧取到兜底方向） */
.timepicker-zoom-enter-active,
.timepicker-zoom-leave-active {
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.timepicker-zoom-enter-active {
  animation-name: timepickerZoomIn;
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
.timepicker-zoom-leave-active {
  animation-name: timepickerZoomOut;
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
}
.timepicker-zoom-enter-from,
.timepicker-zoom-leave-to {
  opacity: 0;
}
/* 关键帧只驱动 transform 与 opacity：缩放原点由 <Popup> 按方位写在面板元素上 */
@keyframes timepickerZoomIn {
  0% {
    opacity: 0;
    transform: scaleY(0.8);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}
@keyframes timepickerZoomOut {
  0% {
    opacity: 1;
    transform: scaleY(1);
  }
  100% {
    opacity: 0;
    transform: scaleY(0.8);
  }
}
</style>
