<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { CSSProperties, TransitionProps, VNode } from 'vue'
import { TinyColor } from '@ctrl/tinycolor'
import Popup from 'components/popup'
import DatePanel from 'components/picker/DatePanel.vue'
import DatetimePanel from 'components/picker/DatetimePanel.vue'
import PickerIcon from 'components/picker/PickerIcon.vue'
import PickerTrigger from 'components/picker/PickerTrigger.vue'
import RangePanel from 'components/picker/RangePanel.vue'
import {
  formatTimestamp,
  getDefaultFormat,
  getInputSize,
  isOutOfRangeBoundary,
  isRangeType,
  parseTimestamp
} from 'components/picker/date-utils'
import type { StartDayOfWeek } from 'components/picker/date-utils'
import type {
  PickerDisabledTime,
  PickerFormattedValue,
  PickerPanelMode,
  PickerRangeFormattedValue,
  PickerRangeSide,
  PickerRangeValue,
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
  placeholder?: string | [string, string] // 输入框提示文字，范围形态可分别为两段指定
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
  allowEmpty?: [boolean, boolean] // 范围形态各段是否允许为空，为空时该段可被单独清空并对外提交
  inputReadOnly?: boolean // 输入框是否只读（避免移动端唤起键盘）
  // 行为交互
  to?: string | HTMLElement | false // 面板挂载的容器节点，不传时就近挂载到承载层内容容器
  placement?: 'topLeft' | 'top' | 'topRight' | 'bottomLeft' | 'bottom' | 'bottomRight' // 面板弹出位置
  // 范围形态的面板指示箭头：不传时跟随弹出方位（仅左侧对齐的 bottomLeft / topLeft 展示，与参考实现同口径），
  // 传 true 始终展示、传 false 始终隐藏，仅范围形态生效
  showArrow?: boolean
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
/** 范围形态草稿变更的来源信息：本次改动落在哪一段 */
export interface DatePickerRangeInfo {
  range: PickerRangeSide
}
export interface DatePickerSlots {
  suffixIcon?: () => VNode[] // 自定义选择框后缀图标，优先于同名 prop
  separator?: () => VNode[] // 范围形态两段之间的分隔符，默认右向箭头
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
  allowEmpty: () => [false, false],
  inputReadOnly: false,
  to: false,
  placement: 'bottomLeft',
  showArrow: undefined,
  showToday: true,
  showNow: true,
  suffixIcon: undefined,
  panelClass: '',
  panelStyle: undefined,
  zIndex: undefined
})
defineSlots<DatePickerSlots>()
const emits = defineEmits<{
  change: [value: PickerValue, formattedValue: PickerFormattedValue]
  calendarChange: [
    value: PickerRangeValue | null,
    formattedValue: PickerRangeFormattedValue | null,
    info: DatePickerRangeInfo
  ]
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
/** 浮层与触发器的主轴间距（单段形态） */
const POPUP_OFFSET = 4
/** 面板指示箭头的尺寸，与 `.datepicker-range-arrow` 的宽高保持一致 */
const RANGE_ARROW_SIZE = 16
/**
 * 范围形态的浮层间距
 *
 * 需额外留出箭头所在的一段空白（与参考实现给范围下拉加 `箭头尺寸 × 2 / 3` 上下内边距同口径），
 * 否则 16px 的箭头会压住触发器的底边、盖掉输入区下沿。
 */
const RANGE_POPUP_OFFSET = POPUP_OFFSET + (RANGE_ARROW_SIZE * 2) / 3
/** 带面板指示箭头的弹出方位（与参考实现同口径：仅左侧对齐的两个方位，其余方位只展示面板） */
const ARROW_PLACEMENTS: FloatingPlacement[] = ['bottomLeft', 'topLeft']
// 主题变量随组件壳下发，浮层经 Teleport 后不在壳内，需同样注入到面板上
const themeVars = computed(() => {
  const primary = colorPalettes.value[5]
  const primaryTone = new TinyColor(primary)
  return {
    '--picker-primary-color': primary,
    '--picker-primary-color-hover': colorPalettes.value[4],
    '--picker-primary-shadow-color': shadowColor.value,
    // 区间底色取色板最浅一级（与参考实现的 controlItemBgActive 同值）
    '--picker-primary-color-bg': colorPalettes.value[0],
    // 悬浮预览的底色与虚线边界由主色提亮派生（色板中无对应级，与参考实现的
    // pickerBasicCellHoverWithRangeColor / pickerDateHoverRangeBorderColor 逐值同口径）
    '--picker-primary-color-bg-hover': primaryTone.lighten(35).toHexString(),
    '--picker-hover-border-color': primaryTone.lighten(20).toHexString()
  }
})
const wrapperStyle = computed(() => {
  const width =
    props.width === undefined ? undefined : typeof props.width === 'number' ? `${props.width}px` : props.width
  return { ...themeVars.value, '--datepicker-width': width ?? 'auto' } as CSSProperties
})
const mergedPanelClass = computed(() => ['datepicker-panel-container', props.panelClass].filter(Boolean).join(' '))
/** 是否为带时间面板的形态：日期与时间并排，选择只改草稿，点「确定」才提交 */
const isDateTime = computed(() => props.type === 'datetime')
/** 是否为范围形态：双面板、双段输入、值为两段元组 */
const isRange = computed(() => isRangeType(props.type))
/** 浮层与触发器的间距：范围形态额外预留箭头的高度 */
const popupOffset = computed(() => (isRange.value ? RANGE_POPUP_OFFSET : POPUP_OFFSET))
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
/** 单段文本 → 时间戳（空文本视为该段未选） */
function parseSideTimestamp(text: string | null | undefined): number | null {
  return parseTimestamp(text ?? '', mergedValueFormat.value)
}
/** 单段时间戳 → 展示文本（该段未选时为空字符串） */
function formatSideTimestamp(timestamp: number | null | undefined): string {
  return timestamp === null || timestamp === undefined ? '' : formatTimestamp(timestamp, mergedValueFormat.value)
}
/** 范围形态的已提交区间：字符串轨道受控时以其为准，结构不符或解析失败时该段为空 */
const rangeValue = computed<PickerRangeValue | null>(() => {
  if (formattedControlled.value) {
    const formatted = props.formattedValue
    if (!Array.isArray(formatted)) {
      return null
    }
    return [parseSideTimestamp(formatted[0]), parseSideTimestamp(formatted[1])]
  }
  const raw = value.value
  if (!Array.isArray(raw)) {
    return null
  }
  return [raw[0], raw[1]]
})
/** 草稿值：带时间形态在面板展开期间只把选择落在草稿上，点「确定」才提交，关闭即丢弃 */
const draftValue = ref<number | null>(null)
/** 草稿区间：范围形态的选择先落草稿，两段齐全（或该段允许为空）时才对外提交 */
const draftRange = ref<PickerRangeValue | null>(null)
/** 范围形态当前激活的段：决定悬浮预览与下一次选择作用于哪一端 */
const activeSide = ref<PickerRangeSide>('start')
/** 触发器上的激活段下标（0 为起点段） */
const activeTriggerIndex = computed(() => (activeSide.value === 'start' ? 0 : 1))
/** 面板上悬浮的日期：范围形态展开期间在当前激活段显示该日期的预览文本 */
const hoverTimestamp = ref<number | null>(null)
/** 当前展示预览文本（悬浮面板日期产生的临时值）的段：该段文字取提示色（与参考实现同口径） */
const hoverPreviewIndex = computed<0 | 1 | null>(() => {
  // 依赖需先读取：条件短路会让后续依赖在首轮求值时不被收集，之后悬浮变化便不再触发重算
  const hovered = hoverTimestamp.value
  const isRangeType = isRange.value
  const isPanelOpen = open.value
  if (!isRangeType || !isPanelOpen || hovered === null) {
    return null
  }
  return activeTriggerIndex.value
})
/** 面板指示箭头相对输入区左边缘的偏移：与激活段下划线同源、随激活段平移（范围形态专用） */
const rangeArrowLeft = ref(0)
/** 本次展开期间被激活过的段：决定对侧越界日期的禁用（与参考实现的 `openRecords` 同口径，收起即清空） */
const activatedSides = ref<Record<PickerRangeSide, boolean>>({ start: false, end: false })
/** 激活某段：面板展开、选完一段后切换、聚焦某段输入框都算一次激活 */
function activateSide(side: PickerRangeSide) {
  activeSide.value = side
  activatedSides.value[side] = true
}
/** 清空段激活记录（收起面板时调用，与参考实现收起后异步清空同口径） */
function resetActivatedSides() {
  activatedSides.value = { start: false, end: false }
}
/** 面板展示值：带时间形态展开期间取草稿，其余情况跟随已提交值 */
const panelTimestamp = computed(() => {
  const drafting = isDateTime.value && open.value && draftValue.value !== null
  return drafting ? draftValue.value : innerValue.value
})
/** 面板展示区间：范围形态展开期间取草稿，其余情况跟随已提交值 */
const panelRangeValue = computed<PickerRangeValue | null>(() => {
  const drafting = isRange.value && open.value && draftRange.value !== null
  return drafting ? draftRange.value : rangeValue.value
})
/**
 * 范围形态的面板禁用判定
 *
 * 与参考实现 `useRangeDisabled` 同口径：激活段为起点时，本次展开中终点段被激活过且有值 → 禁用「晚于
 * 终点」的日期；激活段为终点时同理禁用「早于起点」的日期。用户传入的 `disabledDate` 始终优先。
 */
const mergedRangeDisabledDate = computed<((timestamp: number) => boolean) | undefined>(() => {
  const userDisabledDate = props.disabledDate
  if (!isRange.value) {
    return userDisabledDate
  }
  const current = panelRangeValue.value
  const isStartSide = activeSide.value === 'start'
  const boundary = (isStartSide ? current?.[1] : current?.[0]) ?? null
  const otherSideActivated = isStartSide ? activatedSides.value.end : activatedSides.value.start
  if (boundary === null || !otherSideActivated) {
    return userDisabledDate
  }
  return (timestamp: number) => {
    if (userDisabledDate?.(timestamp)) {
      return true
    }
    return isOutOfRangeBoundary(timestamp, boundary, !isStartSide)
  }
})
// 受控字符串解析失败时原样展示，避免用户输入被静默丢弃
// （字符串轨道受管时展示以受管文本为准，草稿不回写展示，避免与应用层持有的文本脱节）
const displayText = computed(() => {
  if (formattedControlled.value) {
    return typeof props.formattedValue === 'string' ? props.formattedValue : ''
  }
  return panelTimestamp.value === null ? '' : formatTimestamp(panelTimestamp.value, mergedValueFormat.value)
})
/** 触发器两段文本：字符串轨道受控时以其为准，否则按展示格式逐段生成 */
const displayRangeTexts = computed<[string, string]>(() => {
  const formatted = props.formattedValue
  let texts: [string, string]
  if (formattedControlled.value && Array.isArray(formatted)) {
    texts = [formatted[0] ?? '', formatted[1] ?? '']
  } else {
    const current = panelRangeValue.value
    texts = [formatSideTimestamp(current?.[0]), formatSideTimestamp(current?.[1])]
  }
  // 悬浮面板日期时，当前激活段显示该日期的预览文本（与参考实现的输入框悬浮预览同口径）
  // ⚠️ 依赖先读取：条件短路会让 `hoverTimestamp` 在首轮求值时不被收集，之后悬浮不再触发重算
  const hovered = hoverTimestamp.value
  const isRangeType = isRange.value
  const isPanelOpen = open.value
  if (isRangeType && isPanelOpen && hovered !== null) {
    texts[activeTriggerIndex.value] = formatSideTimestamp(hovered)
  }
  return texts
})
/** 两段输入的提示文字：只给单值时两段共用同一文案 */
const mergedPlaceholders = computed<[string, string]>(() => {
  const placeholder = props.placeholder
  if (Array.isArray(placeholder)) {
    return [placeholder[0] ?? '', placeholder[1] ?? '']
  }
  return [placeholder, placeholder]
})
/** 单段输入的提示文字（范围形态由 `placeholders` 承担，此处传空） */
const singlePlaceholder = computed(() => (Array.isArray(props.placeholder) ? '' : props.placeholder))
const showClear = computed(() => {
  if (!props.allowClear || props.disabled) {
    return false
  }
  if (isRange.value) {
    return (rangeValue.value?.[0] ?? null) !== null || (rangeValue.value?.[1] ?? null) !== null
  }
  return innerValue.value !== null
})
// 实际方向：定位内核翻转 / 次轴自适应后的结果（宿主未挂载时退回期望方向）
const actualPlacement = computed<FloatingPlacement>(() => popupRef.value?.actualPlacement ?? props.placement)
/**
 * 是否展示面板指示箭头
 *
 * 不传 `showArrow` 时按「实际方位」判定（翻转后仍与参考实现一致），传值则以显式开关为准。
 */
const showRangeArrow = computed(() => {
  if (!isRange.value || props.showArrow === false) return false
  return props.showArrow === true || ARROW_PLACEMENTS.includes(actualPlacement.value)
})
/** 面板过渡：仅给 name，类名走 Vue 默认派生（-enter-from/-enter-active/…）；
    展开 / 收起的缩放原点随**实际方位**取，由样式层的方位类给出（见 `datepicker-zoom` 一节），
    过渡名因此与方位无关 —— 首帧实际方位尚未回填时也不会取到反向的动效 */
const panelTransitionProps: TransitionProps = { name: 'datepicker-zoom' }
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
      draftRange.value = rangeValue.value // 展开时以已提交区间为草稿起点
      // 展开即视为激活当前段（与参考实现 triggerOpen(true, index) 同口径）：段由点击的输入框决定，
      // 不强制回到起点段，以免「点第二段却被拉回第一段」
      activateSide(activeSide.value)
      return
    }
    detachDocumentListener()
    draftValue.value = null // 收起即丢弃草稿，未点「确定」的选择不生效
    draftRange.value = null
    resetActivatedSides() // 段激活记录只在本次展开期间有效
    hoverTimestamp.value = null // 收起不重置激活段：参考实现同样保留 activeIndex，下划线因而停在原段
  },
  { immediate: true }
)
onBeforeUnmount(detachDocumentListener)
function requestOpen(next: boolean) {
  if (props.disabled || open.value === next) return
  open.value = next
  emits('openChange', next)
}
/**
 * 点击触发器只负责展开：展开态点击不收起（与参考实现同口径，收起由外部点击 / Esc / 选中值触发）。
 *
 * 展开时按落点确定本次会话的激活段（与参考实现一致：点终点段即激活终点段，点空白区落到起点段），
 * 并把焦点移到该段输入框 —— 聚焦态因此由 focus 驱动，面板收起后下划线不会随之淡出。
 */
function onTriggerClick(index: 0 | 1 = 0) {
  if (open.value) return
  activateSide(index === 0 ? 'start' : 'end')
  requestOpen(true)
  nextTick(() => {
    triggerRef.value?.focus(index)
  })
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
 * 写入范围形态的某一段（面板选择与手输提交共用）
 *
 * 与参考实现同口径：起点晚于终点时丢弃另一端、只保留本次写入；两段齐全（或未选段声明可为空）
 * 才对外提交；只写到一段时保持展开，并由调用场景决定是否把激活段切到另一端。
 */
function applyRangeSide(timestamp: number, side: PickerRangeSide, switchSide: boolean) {
  const current = draftRange.value ?? rangeValue.value ?? [null, null]
  let next: PickerRangeValue = side === 'start' ? [timestamp, current[1]] : [current[0], timestamp]
  if (next[0] !== null && next[1] !== null && next[0] > next[1]) {
    next = side === 'start' ? [timestamp, null] : [null, timestamp]
  }
  const canCommit = canTriggerSide(next[0], 0) && canTriggerSide(next[1], 1)
  draftRange.value = next
  emits('calendarChange', next, formatRangeValue(next), { range: side })
  if (canCommit) {
    commitRange(next)
  }
  // 与参考实现同口径：另一端「本次展开中尚未激活」或「尚无值」时，切到该端继续选并保持展开；
  // 否则视为本次区间已选完 → 收起
  const otherSide: PickerRangeSide = side === 'start' ? 'end' : 'start'
  const currentIndex = side === 'start' ? 0 : 1
  const otherIndex = side === 'start' ? 1 : 0
  const keepOpen =
    switchSide && next[currentIndex] !== null && (!activatedSides.value[otherSide] || next[otherIndex] === null)
  if (keepOpen) {
    activateSide(otherSide)
    // 与参考实现同口径：切到另一端时把焦点一并挪过去（等 DOM 更新后再聚焦），
    // 否则下划线已落到另一端、输入光标还留在原段，接着输入会写进错误的一段
    nextTick(() => triggerRef.value?.focus(otherIndex))
    return
  }
  requestOpen(false)
}
/** 面板选择日期：写入当前激活段，并把激活段切到另一端以接着选第二段 */
function onRangeSelect(timestamp: number, side: PickerRangeSide) {
  applyRangeSide(timestamp, side, true)
}
/** 悬浮日期变更：仅在激活段输入框做预览展示，不改变已选值 */
function onRangeHover(timestamp: number | null) {
  hoverTimestamp.value = timestamp
}
/** 聚焦某一段输入框即把激活段切过去（后续面板选择与悬浮预览都作用于该段） */
function onSideFocus(index: 0 | 1) {
  activateSide(index === 0 ? 'start' : 'end')
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
  if (isRange.value) {
    commitRange(null)
  } else {
    commit(null)
  }
  requestOpen(false)
}
/**
 * 手输文本：解析成功才提交，失败时由触发器回滚为当前合法文本
 *
 * 带时间形态的提交口径与参考实现一致：失焦即取消（丢弃草稿、不提交），回车与「确定」同径（提交并收起）
 * —— 面板展开期间输入框展示的是草稿，若失焦时按手输提交，会把未确认的草稿当成用户输入落值。
 */
function onTextConfirm(text: string, source: 'enter' | 'blur', index: 0 | 1) {
  if (isRange.value) {
    const rangeTimestamp = parseTimestamp(text, mergedValueFormat.value)
    if (rangeTimestamp !== null) {
      // 回车的提交语义与面板选择同径（写入激活段并切到另一端），失焦只落值不切段
      applyRangeSide(rangeTimestamp, index === 0 ? 'start' : 'end', source === 'enter')
    }
    return
  }
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
      :texts="displayRangeTexts"
      :range="isRange"
      :active-index="activeTriggerIndex"
      :preview-index="hoverPreviewIndex"
      :placeholder="singlePlaceholder"
      :placeholders="mergedPlaceholders"
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
      @arrow-change="rangeArrowLeft = $event"
      @side-focus="onSideFocus"
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
      :show="open && !disabled"
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
      <RangePanel
        v-if="isRange"
        :value="panelRangeValue"
        :active-side="activeSide"
        :start-day-of-week="startDayOfWeek"
        :disabled-date="mergedRangeDisabledDate"
        :default-picker-value="defaultPickerValue"
        @select="onRangeSelect"
        @panel-change="onPanelChange"
        @hover-change="onRangeHover"
      />
      <!-- 范围形态的面板指示箭头：与激活段下划线同源平移、随弹出方位上下翻转，展示时机由 showArrow 与方位共同决定 -->
      <div v-if="showRangeArrow" class="datepicker-range-arrow" :style="{ left: `${rangeArrowLeft}px` }" />
      <DatetimePanel
        v-else-if="isDateTime"
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
/* 范围形态的面板指示箭头：left 按激活段给定（宿主经 PickerTrigger 测量后下发），
   几何与 Tooltip 的箭头同构（浮层箭头的几何由各皮肤层自行实现）*/
.datepicker-range-arrow {
  position: absolute;
  top: 0;
  z-index: 1;
  width: 16px;
  height: 16px;
  // 与参考实现的 inputPaddingHorizontal * 1.5 同值
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
    background-color: #fff;
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
</style>
<style lang="less">
/* 以下两类规则必须留在全局：它们作用于 <Popup> 宿主编译出的面板节点（scope id 属宿主），
   且 Teleport 到 body 后不在本组件 DOM 子树内，scoped 与 :deep() 均选不中。
   收口口径：① 面板几何以 .datepicker-panel-container 收口；② 动画类与关键帧统一加 `datepicker-` 前缀，避免与宿主页面撞名 */
.datepicker-panel-container {
  width: max-content;
  outline: none;
}
/* 面板在触发器上方时指示箭头翻转向下（方向类由 <Popup> 落在面板节点上，故此处留在全局） */
.va-popup-placement-top .datepicker-range-arrow,
.va-popup-placement-topLeft .datepicker-range-arrow,
.va-popup-placement-topRight .datepicker-range-arrow {
  top: auto;
  bottom: 0;
  transform: translateY(100%) rotate(180deg);
}
/* 收起过程中选中格直接落色：参考实现的收起会把容器隐藏一帧，令选中格的 0.2s 过渡被浏览器取消，
   故此处显式复刻该观感（仅收起期间抑制格子过渡；面板保持展开时选中/悬浮过渡照常）。
   多带一层 .picker-panel-body 是为了稳定压过日期格 scoped 规则里的过渡声明（同特异性下不依赖源码顺序） */
.datepicker-panel-container.va-popup-leaving .picker-panel-body .picker-panel-cell-inner {
  transition: none;
}
/* 展开 / 收起的缩放原点由 <Popup> 按实际方位写在面板上（面板在下方从自身顶边展开、在上方从自身底边展开，
   与参考实现 slideUp / slideDown 同口径），故这里只保留一条与方位无关的动效：
   按方位取名会让首帧取到兜底方向（实际方位到插入首帧才回填），首次展开方向就反了 */
.datepicker-zoom-enter-active,
.datepicker-zoom-leave-active {
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.datepicker-zoom-enter-active {
  animation-name: datepickerZoomIn;
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
.datepicker-zoom-leave-active {
  animation-name: datepickerZoomOut;
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
}
.datepicker-zoom-enter-from,
.datepicker-zoom-leave-to {
  opacity: 0;
}
/* 关键帧只驱动 transform 与 opacity：缩放原点由 <Popup> 按方位写在面板元素上，
   写进关键帧会覆盖元素上的取值，上下两个方位就都按同一个原点了 */
@keyframes datepickerZoomIn {
  0% {
    opacity: 0;
    transform: scaleY(0.8);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}
@keyframes datepickerZoomOut {
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
