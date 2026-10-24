<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useSlots, watch } from 'vue'
import type { CSSProperties, TransitionProps, VNode } from 'vue'
import Button from 'components/button'
import Popup from 'components/popup'
import {
  PickerIcon,
  PickerPanel,
  PickerTrigger,
  TimePanel,
  formatTimestamp,
  getHourNumber,
  getInputSize,
  getLowerBoundTime,
  getMinuteNumber,
  getSecondNumber,
  mergeTimeStep,
  PANEL_NAV_KEYS,
  parseTimestamp,
  setTimeTimestamp,
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
import type { FloatingPlacement } from 'components/utils'
import { FLOATING_LAYER_Z_INDEX, useSlotsExist } from 'components/utils'
/** 默认展示格式（24 小时制） */
const DEFAULT_FORMAT = 'HH:mm:ss'
/** 12 小时制下的默认展示格式：小时补零，与面板的小时列标签、头部文本同口径（均为两位的 `09`） */
const DEFAULT_12_HOURS_FORMAT = 'hh:mm:ss a'
/** 输入框估宽的字符下限：时间格式短（`HH:mm:ss` 仅 8 字符），沿用日期形态的 10 会让触发器凭空宽出约 14px */
const TIME_INPUT_MIN_SIZE = 8
/** 浮层与触发器的主轴间距 */
const POPUP_OFFSET = 4
/** 唤起面板的按键中不作数的一类：修饰键不是输入意图，Esc / 回车另有既有语义 */
const PANEL_OPEN_IGNORED_KEYS = ['Shift', 'Control', 'Alt', 'Meta', 'Escape', 'Enter']
/** 选择形态：单选（单段值）或范围（两段元组值，双段输入） */
export type TimePickerType = 'time' | 'timerange'
/** 带面板指示箭头的弹出方位（仅左侧对齐的两个方位，其余方位只展示面板） */
const ARROW_PLACEMENTS: FloatingPlacement[] = ['bottomLeft', 'topLeft']
/** 面板指示箭头的尺寸，与 `.timepicker-range-arrow` 的宽高保持一致 */
const RANGE_ARROW_SIZE = 16
/**
 * 范围形态的浮层间距
 *
 * 需额外留出箭头所在的一段空白（箭头尺寸的 2 / 3），
 * 否则 16px 的箭头会压住触发器的底边、盖掉输入区下沿。
 */
const RANGE_POPUP_OFFSET = POPUP_OFFSET + (RANGE_ARROW_SIZE * 2) / 3
export interface Props {
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
  allowEmpty?: [boolean, boolean] // 范围形态各段是否允许为空，为空时该段可被单独清空并对外提交
  inputReadOnly?: boolean // 输入框是否只读（避免移动端唤起键盘）
  // 行为交互
  to?: string | HTMLElement | false // 面板挂载的容器节点，不传时就近挂载到承载层内容容器
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
/**
 * 组件对外 props 类型
 *
 * `value` / `open` 由 `defineModel` 声明（同名出现在 `defineProps` 中会与模型绑定冲突），此处合并回对外
 * 类型，保证使用方获得完整的 props 提示。`formattedValue` 例外：它必须由 `defineProps` 声明，才能从
 * 「父组件是否传入」判定字符串轨道是否受控（模型值无法区分父组件写入与本组件回写）
 */
export type TimePickerProps = Props & {
  value?: PickerValue
  open?: boolean
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
  openChange: [open: boolean]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
const value = defineModel<PickerValue>('value', { default: null })
const open = defineModel<boolean>('open', { default: false })
const triggerRef = ref<InstanceType<typeof PickerTrigger> | null>(null)
const popupRef = ref<InstanceType<typeof Popup> | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
// 显式标注插槽类型：`useSlots()` 的返回值参与 `mergedExtraFooter` 的推导，构成推断环
const slots: TimePickerSlots = useSlots()
const slotsExist = useSlotsExist(['renderExtraFooter'])
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
  '--picker-primary-color-bg': 'var(--va-cp-time-picker-primary-bg-color, var(--va-primary-bg-color))',
  '--picker-time-column-active-bg': 'var(--va-cp-time-picker-primary-bg-color, var(--va-primary-bg-color))'
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
/** 字符串轨道受控：父组件传入 `formattedValue` 时以它为准，与主轨道解耦 */
const formattedControlled = computed(() => props.formattedValue !== undefined)
/** 是否为范围形态：双段输入，值为两段元组 */
const isRange = computed(() => props.type === 'timerange')
/**
 * 逐段禁用状态
 *
 * 范围形态支持两段元组逐段禁用；单选形态只接受布尔值，传数组时任一项为真即视为整体禁用
 * （避免「传了数组却被静默当成启用」这类歧义）。
 */
const disabledSides = computed<[boolean, boolean]>(() => {
  const { disabled } = props
  if (Array.isArray(disabled)) {
    return isRange.value ? [disabled[0], disabled[1]] : [disabled[0] || disabled[1], disabled[0] || disabled[1]]
  }
  return [disabled, disabled]
})
/** 是否整体禁用：范围形态两段都禁用、单选形态同段状态 */
const fullyDisabled = computed(() => disabledSides.value[0] && disabledSides.value[1])
/** 单段文本 → 时间戳（空文本 / 结构不符视为该段未选） */
function parseSideTimestamp(text: string | null | undefined): number | null {
  return parseTimestamp(text ?? '', mergedValueFormat.value)
}
/** 单段时间戳 → 展示文本（该段未选时为空字符串） */
function formatSideTimestamp(timestamp: number | null | undefined): string {
  return timestamp === null || timestamp === undefined ? '' : formatTimestamp(timestamp, mergedValueFormat.value)
}
/** 单选形态的值：范围形态下不适用，恒为空 */
const innerValue = computed<number | null>(() => {
  if (isRange.value) return null
  if (formattedControlled.value) {
    return typeof props.formattedValue === 'string'
      ? parseTimestamp(props.formattedValue, mergedValueFormat.value)
      : null
  }
  return typeof value.value === 'number' ? value.value : null
})
/** 范围形态的已提交区间：字符串轨道受控时以其为准，结构不符或解析失败时该段为空 */
const rangeValue = computed<PickerRangeValue | null>(() => {
  if (!isRange.value) return null
  if (formattedControlled.value) {
    const formatted = props.formattedValue
    if (!Array.isArray(formatted)) return null
    return [parseSideTimestamp(formatted[0]), parseSideTimestamp(formatted[1])]
  }
  const raw = value.value
  if (!Array.isArray(raw)) return null
  return [raw[0], raw[1]]
})
/**
 * 面板草稿值：面板内的选择只落在草稿上，点「确定」才提交，收起即丢弃
 *
 * 时间面板的每一列都只是完整时间的一部分，鼠标点一列不足以表达一次完整的选择，
 * 故与既有带时间形态同口径 —— 选择只改草稿，由底部「确定」统一提交。
 */
const draftValue = ref<number | null>(null)
/** 草稿区间：范围形态的选择先落草稿，两段都取到值（或该段允许为空）时才对外提交 */
const draftRange = ref<PickerRangeValue | null>(null)
/** 范围形态当前激活的段：双段输入中正在编辑的那一段，面板与「确定」都作用于它 */
const activeSide = ref<PickerRangeSide>('start')
/** 本次展开期间被激活过的段：决定选完一段后是继续编辑另一端还是收起（收起即清空） */
const activatedSides = ref<Record<PickerRangeSide, boolean>>({ start: false, end: false })
/**
 * 激活某段
 *
 * 段由点击的输入框决定，不强制回到起点段 —— 否则「点第二段却被拉回第一段」。
 */
function activateSide(side: PickerRangeSide) {
  activeSide.value = side
  activatedSides.value[side] = true
}
/** 清空段激活记录（收起面板时调用） */
function resetActivatedSides() {
  activatedSides.value = { start: false, end: false }
}
/** 触发器上的激活段下标（0 为起点段） */
const activeTriggerIndex = computed(() => (activeSide.value === 'start' ? 0 : 1))
/** 激活段在元组中的下标 */
const activeSideIndex = computed(() => (activeSide.value === 'start' ? 0 : 1))
/** 对端在元组中的下标 */
const otherSideIndex = computed(() => (activeSide.value === 'start' ? 1 : 0))
/** 面板展示区间：展开期间有草稿则取草稿，其余情况跟随已提交区间 */
const panelRangeValue = computed<PickerRangeValue | null>(() => {
  const drafting = isRange.value && open.value && draftRange.value !== null
  return drafting ? draftRange.value : rangeValue.value
})
/** 面板展示值：范围形态取激活段，单选形态取单值（展开期间有草稿则取草稿） */
const panelTimestamp = computed(() => {
  if (isRange.value) {
    return panelRangeValue.value?.[activeSideIndex.value] ?? null
  }
  const drafting = open.value && draftValue.value !== null
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
const showClear = computed(() => {
  if (!props.allowClear || fullyDisabled.value) return false
  if (isRange.value) {
    return (rangeValue.value?.[0] ?? null) !== null || (rangeValue.value?.[1] ?? null) !== null
  }
  return innerValue.value !== null
})
/** 「确定」是否可点：激活段（单选形态即该段自身）没有可提交的时间 */
const okDisabled = computed(() => panelTimestamp.value === null)
/**
 * 面板底部的额外页脚：同名插槽优先于 prop，两轨统一为「入参 → VNode[]」的函数下发给内核
 * （内核只收函数：VNode 需在其渲染上下文内创建，`computed` 里直接求值会产生「无主的 hoisted vnode」）
 */
const mergedExtraFooter = computed<(() => VNode[]) | undefined>(() => {
  if (slotsExist.renderExtraFooter) {
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
// 收起即丢弃草稿：未点「确定」的选择不生效
watch(
  () => open.value,
  (next) => {
    if (next) {
      attachDocumentListener()
      draftRange.value = rangeValue.value // 展开时以已提交区间为草稿起点
      activateSide(activeSide.value) // 展开即视为激活当前段：段由点击的输入框决定，不强制回到起点段
      return
    }
    detachDocumentListener()
    draftValue.value = null
    draftRange.value = null
    keyboardPanelMode.value = false // 面板收起后不再保留上一次的键盘归属
    resetActivatedSides() // 段激活记录只在本次展开期间有效
  },
  { immediate: true }
)
onBeforeUnmount(detachDocumentListener)
function requestOpen(next: boolean) {
  if (fullyDisabled.value || open.value === next) return
  open.value = next
  emits('openChange', next)
}
/**
 * 点击触发器只负责展开（展开态点击不收起，收起由外部点击 / Esc / 提交触发）：
 * 按落点确定本次会话的激活段（点终点段即激活终点段），并把焦点移到该段输入框
 */
function onTriggerClick(index: 0 | 1 = 0) {
  // 面板操作态下输入框是只读的，点击输入区即把键盘收回文本输入态，恢复手输
  if (keyboardPanelMode.value) {
    keyboardPanelMode.value = false
  }
  if (open.value) return
  // 该段被禁用时不展开：禁用段不可编辑，展开后也没有可选的段
  if (disabledSides.value[index]) return
  activateSide(index === 0 ? 'start' : 'end')
  requestOpen(true)
  nextTick(() => {
    triggerRef.value?.focus(index)
  })
}
/** 聚焦某一段输入框即把激活段切过去（面板的展示值与「确定」都随之作用于该段） */
function onSideFocus(index: 0 | 1) {
  activateSide(index === 0 ? 'start' : 'end')
}
/** 回写两条轨道：主轨道始终同步，字符串轨道按同一格式生成；返回回写的字符串 */
function commit(timestamp: number | null): PickerFormattedValue {
  const nextFormatted = timestamp === null ? null : formatTimestamp(timestamp, mergedValueFormat.value)
  value.value = timestamp
  emits('update:formattedValue', nextFormatted)
  emits('change', timestamp, nextFormatted)
  return nextFormatted
}
/** 范围形态的两段文本（该段未选时为空字符串） */
function formatRangeValue(range: PickerRangeValue | null): PickerRangeFormattedValue | null {
  if (range === null) {
    return null
  }
  return [formatSideTimestamp(range[0]), formatSideTimestamp(range[1])]
}
/** 回写范围形态的两条轨道，返回回写的文本供事件复用 */
function commitRange(range: PickerRangeValue | null): PickerRangeFormattedValue | null {
  const nextFormatted = formatRangeValue(range)
  value.value = range
  emits('update:formattedValue', nextFormatted)
  emits('change', range, nextFormatted)
  return nextFormatted
}
/** 该段的值是否可对外提交：有值即可，为空时需该段声明「允许为空」 */
function canTriggerSide(timestamp: number | null, index: 0 | 1): boolean {
  return timestamp !== null || (props.allowEmpty[index] ?? false)
}
/**
 * 写入范围形态的某一段（「确定」与手输提交共用）：起点晚于终点时丢弃另一端、只保留本次写入，
 * 两段齐全（或未选段声明可为空）才对外提交；只写到一段时保持展开，并把激活段切到另一端继续选
 *
 * @returns 写入后的区间与其文本（未提交时即为草稿），供 `ok` 事件复用
 */
function applyRangeSide(timestamp: number, side: PickerRangeSide, switchSide: boolean) {
  const current = draftRange.value ?? rangeValue.value ?? [null, null]
  let next: PickerRangeValue = side === 'start' ? [timestamp, current[1]] : [current[0], timestamp]
  if (next[0] !== null && next[1] !== null && next[0] > next[1]) {
    next = side === 'start' ? [timestamp, null] : [null, timestamp]
  }
  const nextFormatted = formatRangeValue(next)
  const canCommit = canTriggerSide(next[0], 0) && canTriggerSide(next[1], 1)
  draftRange.value = next
  emits('calendarChange', next, nextFormatted, { range: side })
  if (canCommit) {
    commitRange(next)
  }
  // 另一端「本次展开中尚未激活」或「尚无值」且未被禁用时，切到该端继续选并保持展开；
  // 否则视为本次区间已选完 → 收起（对端被禁用即属此类：它没有可继续选的段）
  const otherSide: PickerRangeSide = side === 'start' ? 'end' : 'start'
  const currentIndex = side === 'start' ? 0 : 1
  const otherIndex = side === 'start' ? 1 : 0
  const otherSideDisabled = disabledSides.value[otherIndex]
  const keepOpen =
    switchSide &&
    !otherSideDisabled &&
    next[currentIndex] !== null &&
    (!activatedSides.value[otherSide] || next[otherIndex] === null)
  if (keepOpen) {
    activateSide(otherSide)
    // 切到另一端时把焦点一并挪过去（等 DOM 更新后再聚焦），
    // 否则下划线已落到另一端、输入光标还留在原段，接着输入会写进错误的一段
    nextTick(() => triggerRef.value?.focus(otherIndex))
    return { value: next, formatted: nextFormatted }
  }
  requestOpen(false)
  return { value: next, formatted: nextFormatted }
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
/** 「确定」：提交并收起（无值可提交时按钮已禁用），并派发 `ok`（与「此刻」区分） */
function onOk() {
  const timestamp = panelTimestamp.value
  if (timestamp === null) return
  if (isRange.value) {
    // 范围形态的提交落在激活段上，是否继续编辑另一端由 `applyRangeSide` 决定
    const { value: range, formatted } = applyRangeSide(timestamp, activeSide.value, true)
    emits('ok', range, formatted)
    return
  }
  const nextFormatted = commit(timestamp)
  requestOpen(false)
  emits('ok', timestamp, nextFormatted)
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
function onClear() {
  if (isRange.value) {
    commitRange(null)
  } else {
    commit(null)
  }
  requestOpen(false)
}
/**
 * 手输文本：解析成功才提交，失败时由触发器回滚为当前合法文本；失焦按取消处理 —— 此刻输入框展示的
 * 可能是面板草稿（非用户键入内容），否则未点「确定」的选择会被当成用户输入落值
 */
function onTextConfirm(text: string, source: 'enter' | 'blur', index: 0 | 1 = 0) {
  if (source === 'blur') {
    draftValue.value = null
    draftRange.value = null
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
function onEscKeydown() {
  if (open.value) {
    requestOpen(false)
  }
}
/* ============================== 键盘导航 ============================== */
function onTabKeydown(event: KeyboardEvent): void {
  if (!keyboardPanelMode.value) {
    keyboardPanelMode.value = true
    event.preventDefault()
  }
}
/** 输入框内容被改动：键盘归属收回文本输入态，方向键随之回到输入光标 */
function onTriggerInput(): void {
  keyboardPanelMode.value = false
}
/**
 * 触发器的按键入口：面板未展开时任意输入键唤起面板，展开后按键盘归属把导航键转给时间面板；
 * 回车不在此处理（由触发器的文本提交消费，与「回车提交」的既有口径一致）
 */
function onWrapperKeydown(event: KeyboardEvent): void {
  if (event.key === 'Tab') {
    if (open.value && !fullyDisabled.value) {
      onTabKeydown(event)
    }
    return
  }
  if (!open.value) {
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
function focus() {
  triggerRef.value?.focus()
}
function blur() {
  triggerRef.value?.blur()
}
defineExpose({ focus, blur })
</script>
<template>
  <div
    ref="wrapperRef"
    class="timepicker-wrap"
    :style="wrapperStyle"
    @keydown="onWrapperKeydown"
    @keydown.esc="onEscKeydown"
    @keydown.enter.stop
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
      :open="open"
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
      :show="open && !fullyDisabled"
      :to="to"
      :anchor="wrapperRef"
      :placement="placement"
      :offset="popupOffset"
      :panel-class="mergedPanelClass"
      :panel-style="{ ...panelStyle, ...themeVars }"
      :z-index="zIndex"
      :default-z-index="FLOATING_LAYER_Z_INDEX.select"
      :transition-props="panelTransitionProps"
      @keydown.esc="onEscKeydown"
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
          :active="open"
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
