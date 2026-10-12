<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { CSSProperties, TransitionProps, VNode } from 'vue'
import { TinyColor } from '@ctrl/tinycolor'
import Button from 'components/button'
import Popup from 'components/popup'
import PickerPanel from 'components/picker/PickerPanel.vue'
import PickerTrigger from 'components/picker/PickerTrigger.vue'
import TimePanel from 'components/picker/TimePanel.vue'
import {
  formatTimestamp,
  getHourNumber,
  getInputSize,
  getLowerBoundTime,
  getMinuteNumber,
  getSecondNumber,
  mergeTimeStep,
  parseTimestamp,
  setTimeTimestamp
} from 'components/picker/date-utils'
import { PANEL_NAV_KEYS } from 'components/picker/keyboard'
import type {
  PickerDisabledTime,
  PickerDisabledTimeUnits,
  PickerSize,
  PickerStatus,
  PickerTimePanelProps
} from 'components/picker'
import type { FloatingPlacement } from 'components/utils'
import { FLOATING_LAYER_Z_INDEX, useInject } from 'components/utils'
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
export interface Props {
  // 双向绑定
  formattedValue?: string | null // 字符串轨道值：父组件传入时以它为准（受控），随选择经 update 事件回写
  // 内容数据
  format?: string // 展示格式，date-fns 占位符，默认 `HH:mm:ss`（12 小时制为 `hh:mm:ss a`）
  valueFormat?: string // 绑定值格式，默认与 format 相同
  placeholder?: string // 输入框提示文字
  disabledTime?: PickerDisabledTime // 不可选择的时间
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
  disabled?: boolean // 是否禁用
  allowClear?: boolean // 是否展示清除按钮
  inputReadOnly?: boolean // 输入框是否只读（避免移动端唤起键盘）
  // 行为交互
  to?: string | HTMLElement | false // 面板挂载的容器节点，不传时就近挂载到承载层内容容器
  placement?: FloatingPlacement // 面板弹出位置
  showNow?: boolean // 是否展示面板底部的「此刻」快捷
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
export type TimePickerProps = Props & {
  value?: number | null
  open?: boolean
}
export interface TimePickerSlots {
  suffixIcon?: () => VNode[] // 自定义选择框后缀图标，优先于同名 prop
}
const props = withDefaults(defineProps<Props>(), {
  formattedValue: undefined,
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
  inputReadOnly: false,
  showNow: true,
  to: false,
  placement: 'bottomLeft',
  suffixIcon: undefined,
  panelClass: '',
  panelStyle: undefined,
  zIndex: undefined
})
defineSlots<TimePickerSlots>()
const emits = defineEmits<{
  change: [value: number | null, formattedValue: string | null]
  ok: [value: number, formattedValue: string | null]
  'update:formattedValue': [value: string | null]
  openChange: [open: boolean]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
const value = defineModel<number | null>('value', { default: null })
const open = defineModel<boolean>('open', { default: false })
const { colorPalettes, shadowColor } = useInject('TimePicker') // 主题色注入
const triggerRef = ref<InstanceType<typeof PickerTrigger> | null>(null)
const popupRef = ref<InstanceType<typeof Popup> | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
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
const themeVars = computed(() => {
  const primary = colorPalettes.value[5]
  return {
    '--picker-primary-color': primary,
    '--picker-primary-color-hover': colorPalettes.value[4],
    '--picker-primary-shadow-color': shadowColor.value,
    '--picker-primary-color-bg': colorPalettes.value[0],
    '--picker-time-column-active-bg': new TinyColor(colorPalettes.value[0]).setAlpha(0.2).toRgbString()
  }
})
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
const innerValue = computed<number | null>(() => {
  if (formattedControlled.value) {
    return typeof props.formattedValue === 'string'
      ? parseTimestamp(props.formattedValue, mergedValueFormat.value)
      : null
  }
  return typeof value.value === 'number' ? value.value : null
})
/**
 * 面板草稿值：面板内的选择只落在草稿上，点「确定」才提交，收起即丢弃
 *
 * 时间面板的每一列都只是完整时间的一部分，鼠标点一列不足以表达一次完整的选择，
 * 故与既有带时间形态同口径 —— 选择只改草稿，由底部「确定」统一提交。
 */
const draftValue = ref<number | null>(null)
/** 面板展示值：展开期间有草稿则取草稿，其余情况跟随已提交值 */
const panelTimestamp = computed(() => {
  const drafting = open.value && draftValue.value !== null
  return drafting ? draftValue.value : innerValue.value
})
/** 输入框展示文本：字符串轨道受控时原样展示（解析失败也不丢弃用户输入），否则按展示格式生成 */
const displayText = computed(() => {
  if (formattedControlled.value) {
    return typeof props.formattedValue === 'string' ? props.formattedValue : ''
  }
  return panelTimestamp.value === null ? '' : formatTimestamp(panelTimestamp.value, mergedValueFormat.value)
})
/** 时间面板选项：把扁平属性组装成内核口径 */
const timePanelProps = computed<PickerTimePanelProps>(() => ({
  hourStep: props.hourStep,
  minuteStep: props.minuteStep,
  secondStep: props.secondStep,
  use12Hours: props.use12Hours,
  hideDisabledOptions: props.hideDisabledOptions
}))
/** 禁用时间的判定基准：有值取该时刻，无值取当前时刻 */
const disabledUnits = computed<PickerDisabledTimeUnits>(
  () => props.disabledTime?.(panelTimestamp.value ?? Date.now()) ?? {}
)
const showClear = computed(() => props.allowClear && !props.disabled && innerValue.value !== null)
/** 「确定」是否可点：草稿与已提交值都为空时没有可提交的时间 */
const okDisabled = computed(() => panelTimestamp.value === null)
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
      return
    }
    detachDocumentListener()
    draftValue.value = null
    keyboardPanelMode.value = false // 面板收起后不再保留上一次的键盘归属
  },
  { immediate: true }
)
onBeforeUnmount(detachDocumentListener)
function requestOpen(next: boolean) {
  if (props.disabled || open.value === next) return
  open.value = next
  emits('openChange', next)
}
/** 点击触发器只负责展开（展开态点击不收起，收起由外部点击 / Esc / 提交触发） */
function onTriggerClick() {
  // 面板操作态下输入框是只读的，点击输入区即把键盘收回文本输入态，恢复手输
  if (keyboardPanelMode.value) {
    keyboardPanelMode.value = false
  }
  if (open.value) return
  requestOpen(true)
  nextTick(() => {
    triggerRef.value?.focus()
  })
}
/** 回写两条轨道：主轨道始终同步，字符串轨道按同一格式生成；返回回写的字符串 */
function commit(timestamp: number | null): string | null {
  const nextFormatted = timestamp === null ? null : formatTimestamp(timestamp, mergedValueFormat.value)
  value.value = timestamp
  emits('update:formattedValue', nextFormatted)
  emits('change', timestamp, nextFormatted)
  return nextFormatted
}
/** 面板选择：只把选择落在草稿上，由「确定」统一提交 */
function onSelect(timestamp: number) {
  draftValue.value = timestamp
}
/** 「确定」：提交草稿并收起（草稿为空时按钮已禁用），并派发 `ok`（与「此刻」区分） */
function onOk() {
  const timestamp = panelTimestamp.value
  if (timestamp === null) return
  const nextFormatted = commit(timestamp)
  requestOpen(false)
  emits('ok', timestamp, nextFormatted)
}
/**
 * 「此刻」：取当前时刻并按步长向下取整后即提交
 *
 * 与既有带时间形态同口径 —— 快捷入口直接落值，不派发「确定」语义之外的事件。
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
  commit(null)
  requestOpen(false)
}
/**
 * 手输文本：解析成功才提交，失败时由触发器回滚为当前合法文本
 *
 * 失焦按取消处理 —— 此刻输入框展示的可能是面板草稿（非用户键入内容），
 * 否则未点「确定」的选择会被当成用户输入落值。
 */
function onTextConfirm(text: string, source: 'enter' | 'blur') {
  if (source === 'blur') {
    draftValue.value = null
    return
  }
  const timestamp = parseTimestamp(text, mergedValueFormat.value)
  if (timestamp === null) return
  commit(timestamp)
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
 * 触发器的按键入口：面板未展开时任意输入键唤起面板，展开后按键盘归属把导航键转给时间面板
 *
 * 回车不在此处理：它由触发器的文本提交消费，与「回车提交」的既有口径一致。
 */
function onWrapperKeydown(event: KeyboardEvent): void {
  if (event.key === 'Tab') {
    if (open.value && !props.disabled) {
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
      :placeholder="placeholder"
      :size="size"
      :status="status"
      :bordered="bordered"
      :disabled="disabled"
      :input-read-only="inputReadOnly || keyboardPanelMode"
      :allow-clear="showClear"
      :open="open"
      :input-size="inputSize"
      icon="clock-circle"
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
      :offset="POPUP_OFFSET"
      :panel-class="mergedPanelClass"
      :panel-style="{ ...panelStyle, ...themeVars }"
      :z-index="zIndex"
      :default-z-index="FLOATING_LAYER_Z_INDEX.select"
      :transition-props="panelTransitionProps"
      @keydown.esc="onEscKeydown"
    >
      <PickerPanel class="timepicker-panel" show-footer>
        <TimePanel
          ref="timePanelRef"
          hide-header
          :value="panelTimestamp"
          :format="mergedFormat"
          :header-format="format"
          :time-props="timePanelProps"
          :disabled-units="disabledUnits"
          :active="open"
          @change="onSelect"
        />
        <template #footer>
          <ul class="timepicker-panel-ranges">
            <li v-if="showNow" class="timepicker-panel-now">
              <a class="timepicker-panel-now-btn" @click="onNow">此刻</a>
            </li>
            <li class="timepicker-panel-ok">
              <Button size="small" type="primary" :disabled="okDisabled" @click="onOk">确定</Button>
            </li>
          </ul>
        </template>
      </PickerPanel>
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
// 面板宽度交给时间列内容：内核面板默认 280px（日期列宽度）。
// 时间列的尾随占位与日期时间形态同口径（列可视高 - 格高）：本形态列可视高 216px → 188px，
// 末项滚到底时正好落在列顶、完整可悬浮；内核默认值 204px 属日期时间形态（其列被日期列撑到 232px）
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
  // 隐藏「此刻」时底部只剩「确定」，靠自身外边距顶到行尾；
  // 高度取页脚行高（display: flex 后行高不再参与内在高度，不声明则页脚矮 10px），
  // 弹性居中补偿按钮根节点为 inline-block div 的基线偏移（原生 button 按基线排布即居中）
  .timepicker-panel-ok {
    display: flex;
    align-items: center;
    height: 34px;
    margin-inline-start: auto;
  }
}
.timepicker-panel-now-btn {
  // 还原被宿主文档链接样式接管的字重与下划线
  color: var(--picker-primary-color, #1677ff);
  font-weight: normal;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: var(--picker-primary-color-hover, #4096ff);
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
