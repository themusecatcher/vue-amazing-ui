/**
 * 日期 / 时间选择器壳层的共享内核：只承载**与形态无关**的值与开合逻辑（双轨值、逐段禁用、草稿与
 * 段激活、范围写入与回写、开合与承载层联动）；展示文本、面板选择、确认语义、键盘互动态与主题变量
 * 仍归各壳层，经 {@link PickerShellOptions} 的回调与形态自有的 ref 承接
 */

import { computed, nextTick, ref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import type { FloatingPlacement } from 'components/utils'
import { useContainerClose, useControlledModel } from 'components/utils'
import { formatTimestamp, isSameRangeValue, parseTimestamp } from './date-utils'
import type {
  PickerFormattedValue,
  PickerRangeFormattedValue,
  PickerRangeSide,
  PickerRangeValue,
  PickerValue
} from './types'

/** 浮层与触发器的主轴间距（单段形态） */
export const POPUP_OFFSET = 4
/** 面板指示箭头的尺寸，与两个壳层里 `.xxx-range-arrow` 的宽高保持一致 */
export const RANGE_ARROW_SIZE = 16
/**
 * 范围形态的浮层间距
 *
 * 需额外留出箭头所在的一段空白（箭头尺寸的 2 / 3），
 * 否则 16px 的箭头会压住触发器的底边、盖掉输入区下沿。
 */
export const RANGE_POPUP_OFFSET = POPUP_OFFSET + (RANGE_ARROW_SIZE * 2) / 3
/** 带面板指示箭头的弹出方位（仅左侧对齐的两个方位，其余方位只展示面板） */
export const ARROW_PLACEMENTS: FloatingPlacement[] = ['bottomLeft', 'topLeft']
/** 唤起面板的按键中不作数的一类：修饰键不是输入意图，Esc / 回车另有既有语义 */
export const PANEL_OPEN_IGNORED_KEYS = ['Shift', 'Control', 'Alt', 'Meta', 'Escape', 'Enter']

/** 触发器对外暴露的能力（只声明壳层用到的部分，避免组合式函数依赖 .vue 文件类型） */
export interface PickerTriggerExpose {
  focus: (index?: 0 | 1) => void
  blur: () => void
}
/** 浮层对外暴露的能力 */
export interface PickerPopupExpose {
  actualPlacement: FloatingPlacement
  panelRef?: HTMLElement | null
}

/**
 * 焦点是否仍落在选择器内（包裹层或浮层面板）
 *
 * 面板经 Teleport 挂到承载层（多为 `body`）下，不在包裹层的 DOM 子树里；只判断包裹层会把「焦点移到
 * 面板里的按钮」误判成移出组件，面板随即收起、按钮还没点上就消失了。
 */
export function isPickerFocusInside(
  wrapper: HTMLElement | null,
  popup: PickerPopupExpose | null,
  target: Node | null
): boolean {
  if (!target) {
    return false
  }
  if (wrapper?.contains(target)) {
    return true
  }
  return popup?.panelRef?.contains(target) ?? false
}

/** 本组合式函数读取的 props 子集（壳层直接传 `props`，多余字段无影响） */
export interface PickerShellProps {
  value?: PickerValue
  defaultValue?: PickerValue
  open?: boolean
  formattedValue?: PickerFormattedValue
  allowClear: boolean
  allowEmpty: [boolean, boolean]
  disabled: boolean | [boolean, boolean]
}

export interface PickerShellOptions {
  props: PickerShellProps
  /** 是否为范围形态（双段值、双段输入） */
  isRange: ComputedRef<boolean>
  /** 展示与回写共用的格式：`valueFormat` 优先，未指定时跟随展示格式 */
  valueFormat: ComputedRef<string>
  /** 主轨道值变化：派发 `change` */
  onChange: (value: PickerValue, formatted: PickerFormattedValue) => void
  /** 字符串轨道回写：派发 `update:formattedValue` */
  onFormattedChange: (value: PickerFormattedValue) => void
  /** 范围形态草稿段变更：派发 `calendarChange` */
  onCalendarChange: (
    range: PickerRangeValue,
    formatted: PickerRangeFormattedValue | null,
    side: PickerRangeSide
  ) => void
  /** 面板开合上报：派发 `openChange` */
  onOpenChange: (open: boolean) => void
  /**
   * 展开 / 收起时的形态自有复位（悬浮预览、键盘互动态等）
   *
   * 草稿与段激活记录由本组合式函数统一复位，此处只承接壳层额外持有的状态。
   */
  onOpenToggle?: (open: boolean) => void
}

/**
 * 建立一套选择器壳层的值与开合状态
 *
 * @param options - 形态自有的格式、判定与事件出口
 * @returns 受控模型、模板引用、值与禁用、范围会话与各类动作
 */
export function usePickerShell(options: PickerShellOptions) {
  const { props, isRange, valueFormat } = options
  const valueModel = useControlledModel<PickerValue>('value', props.defaultValue ?? null)
  const openModel = useControlledModel<boolean>('open', false)
  const triggerRef = ref<PickerTriggerExpose | null>(null)
  const popupRef = ref<PickerPopupExpose | null>(null)
  const wrapperRef = ref<HTMLElement | null>(null)
  /** 字符串轨道受控：父组件传入 `formattedValue` 时以它为准，与主轨道解耦 */
  const formattedControlled = computed(() => props.formattedValue !== undefined)
  /**
   * 逐段禁用状态：范围形态支持两段元组逐段禁用；单选形态只接受布尔值，传数组时任一项为真即视为
   * 整体禁用（避免「传了数组却被静默当成启用」这类歧义）
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
  /** 单选形态的已提交值：字符串轨道受控时以其解析结果为准，范围形态恒为空 */
  const innerValue = computed<number | null>(() => {
    if (isRange.value) {
      return null
    }
    if (formattedControlled.value) {
      return typeof props.formattedValue === 'string' ? parseTimestamp(props.formattedValue, valueFormat.value) : null
    }
    return typeof valueModel.value === 'number' ? valueModel.value : null
  })
  /** 单段时间戳 → 展示文本（该段未选时为空字符串） */
  function formatSideTimestamp(timestamp: number | null | undefined): string {
    return timestamp === null || timestamp === undefined ? '' : formatTimestamp(timestamp, valueFormat.value)
  }
  /** 单段文本 → 时间戳（空文本 / 结构不符视为该段未选） */
  function parseSideTimestamp(text: string | null | undefined): number | null {
    return parseTimestamp(text ?? '', valueFormat.value)
  }
  /** 范围形态的已提交区间：字符串轨道受控时以其为准，结构不符或解析失败时该段为空 */
  const rangeValue = computed<PickerRangeValue | null>(() => {
    if (!isRange.value) {
      return null
    }
    if (formattedControlled.value) {
      const formatted = props.formattedValue
      return Array.isArray(formatted) ? [parseSideTimestamp(formatted[0]), parseSideTimestamp(formatted[1])] : null
    }
    const raw = valueModel.value
    return Array.isArray(raw) ? [raw[0], raw[1]] : null
  })
  /**
   * 单段草稿值：带确认语义的形态在面板展开期间只把选择落在草稿上，收起即丢弃
   *
   * 鼠标选择在单选非确认形态下即时提交、不会留下草稿，唯一会产生草稿的是键盘导航
   * —— 它只把光标落在草稿上（连同输入框文本），由回车或「确定」落值。
   */
  const draftValue = ref<number | null>(null)
  /** 范围形态的草稿区间：选择先落草稿，两段齐全（或该段允许为空）时才对外提交 */
  const draftRange = ref<PickerRangeValue | null>(null)
  /** 范围形态当前激活的段：决定悬浮预览与下一次选择作用于哪一端 */
  const activeSide = ref<PickerRangeSide>('start')
  /** 触发器上的激活段下标（0 为起点段） */
  const activeTriggerIndex = computed(() => (activeSide.value === 'start' ? 0 : 1))
  /** 本次展开期间被激活过的段：决定选完一段后是继续编辑另一端还是收起（收起即清空） */
  const activatedSides = ref<Record<PickerRangeSide, boolean>>({ start: false, end: false })
  /** 激活某段：面板展开、选完一段后切换、聚焦某段输入框都算一次激活 */
  function activateSide(side: PickerRangeSide) {
    activeSide.value = side
    activatedSides.value[side] = true
  }
  /** 清空段激活记录（收起面板时调用） */
  function resetActivatedSides() {
    activatedSides.value = { start: false, end: false }
  }
  /** 面板展示区间：展开期间取草稿，其余情况跟随已提交值 */
  const panelRangeValue = computed<PickerRangeValue | null>(() => {
    const drafting = isRange.value && openModel.value && draftRange.value !== null
    return drafting ? draftRange.value : rangeValue.value
  })
  /**
   * 回写两条轨道：主轨道始终同步，字符串轨道按同一格式生成；返回回写的字符串，供「确定」事件复用
   *
   * 与已提交值相同即不再派发 `change` / `update:formattedValue`：
   * 带时间形态连续点「确定」、或再次点中已选中的格子时，同值的 `change` 只会让应用侧白跑一次副作用
   */
  function commit(timestamp: number | null): PickerFormattedValue {
    const nextFormatted = timestamp === null ? null : formatTimestamp(timestamp, valueFormat.value)
    const changed = innerValue.value !== timestamp
    // 主轨道照常写入：两条轨道可能因字符串轨道受控而暂时不同步，等值写入可一并纠正
    valueModel.value = timestamp
    if (changed) {
      options.onFormattedChange(nextFormatted)
      options.onChange(timestamp, nextFormatted)
    }
    return nextFormatted
  }
  /** 范围形态的两段文本（该段未选时为空字符串） */
  function formatRangeValue(range: PickerRangeValue | null): PickerRangeFormattedValue | null {
    if (range === null) {
      return null
    }
    return [formatSideTimestamp(range[0]), formatSideTimestamp(range[1])]
  }
  /** 回写范围形态的两条轨道，返回回写的文本供事件复用（区间与已提交值相同时不重复派发 `change`） */
  function commitRange(range: PickerRangeValue | null): PickerRangeFormattedValue | null {
    const nextFormatted = formatRangeValue(range)
    const changed = !isSameRangeValue(range, rangeValue.value)
    valueModel.value = range
    if (changed) {
      options.onFormattedChange(nextFormatted)
      options.onChange(range, nextFormatted)
    }
    return nextFormatted
  }
  /**
   * 该段的值是否可对外提交：有值即可，为空时需该段声明「允许为空」
   *
   * 空段只认 `allowEmpty`：「禁用段 + 空值」是需要显式声明 `allowEmpty` 的用法。
   */
  function canTriggerSide(timestamp: number | null, index: 0 | 1): boolean {
    return timestamp !== null || (props.allowEmpty[index] ?? false)
  }
  /**
   * 写入范围形态的某一段（面板选择、手输提交、「确定」共用）：起点晚于终点时丢弃另一端、
   * 只保留本次写入，两段齐全（或未选段声明可为空）才对外提交；只写到一段时保持展开，
   * 由调用场景决定是否切到另一端。返回写入后的区间与其文本（未提交时即为草稿），供 `ok` 事件复用
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
    options.onCalendarChange(next, nextFormatted, side)
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
  /** 清除按钮的可见性：宿主据此把 `allowClear` 折算成布尔后下发给触发器 */
  const showClear = computed(() => {
    if (!props.allowClear || fullyDisabled.value) {
      return false
    }
    if (isRange.value) {
      return (rangeValue.value?.[0] ?? null) !== null || (rangeValue.value?.[1] ?? null) !== null
    }
    return innerValue.value !== null
  })
  /**
   * 请求展开 / 收起
   *
   * 打开受禁用拦截（禁用态没有可操作的面板）；关闭不拦 —— 禁用是在面板已展开时生效的，
   * 状态必须能随之收起来，否则解除禁用时面板会自己弹开。
   */
  function requestOpen(next: boolean) {
    if (openModel.value === next) {
      return
    }
    if (next && fullyDisabled.value) {
      return
    }
    openModel.value = next
    options.onOpenChange(next)
  }
  // 承载层（Modal / Drawer / Dialog / 外层浮层面板）关闭时收起：容器关闭只是 v-show 隐藏、不派发任何
  // 指针或焦点事件，面板会停在打开态并占着层级槽位，容器重开时以「仍打开」的样子出现。
  // 收起走同一个入口，草稿复位由下面的 open watcher 承担
  useContainerClose(() => requestOpen(false))
  // 禁用即收起：可见性虽是 `open && !disabled`，但状态若停在打开态，解除禁用时面板会自己弹开、
  // `openChange` 从未通知（父侧的「是否展开」与界面不符），触发器还会残留聚焦描边
  watch(fullyDisabled, (disabled) => {
    if (disabled) {
      requestOpen(false)
    }
  })
  // 展开即视为激活当前段：段由点击的输入框决定，不强制回到起点段，以免「点第二段却被拉回第一段」；
  // 收起即丢弃草稿（未点「确定」的选择不生效），段激活记录只在本次展开期间有效
  watch(
    () => openModel.value,
    (next) => {
      if (next) {
        draftRange.value = rangeValue.value // 展开时以已提交区间为草稿起点
        activateSide(activeSide.value)
      } else {
        draftValue.value = null
        draftRange.value = null
        resetActivatedSides()
      }
      options.onOpenToggle?.(next)
    },
    // 初始收起时即复位一次：壳层的键盘互动态等状态同样以「未展开」为初值
    { immediate: true }
  )
  /** 聚焦某一段输入框即把激活段切过去（面板的展示值与「确定」都随之作用于该段） */
  function onSideFocus(index: 0 | 1) {
    activateSide(index === 0 ? 'start' : 'end')
  }
  function onClear() {
    if (isRange.value) {
      commitRange(null)
    } else {
      commit(null)
    }
    requestOpen(false)
  }
  function onEscKeydown() {
    if (openModel.value) {
      requestOpen(false)
    }
  }
  function focus() {
    triggerRef.value?.focus()
  }
  function blur() {
    triggerRef.value?.blur()
  }
  return {
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
    activatedSides,
    activateSide,
    panelRangeValue,
    commit,
    commitRange,
    applyRangeSide,
    requestOpen,
    onSideFocus,
    onClear,
    onEscKeydown,
    focus,
    blur
  }
}
