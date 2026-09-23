<script setup lang="ts">
import { ref, computed, watch, isVNode } from 'vue'
import type { Ref, VNode, CSSProperties } from 'vue'
import { useFloating, useResizeObserver, useInject } from 'components/utils'
export type Marks = {
  [markValue: number]: string | VNode | (() => VNode) | { style: CSSProperties; label: string | VNode | (() => VNode) }
}

export interface Props {
  width?: string | number // 滑动输入条宽度，单位 px，水平模式时生效
  height?: string | number // 滑动输入条高度，单位 px，垂直模式时生效
  vertical?: boolean // 是否启用垂直模式
  min?: number // 最小值
  max?: number // 最大值
  marks?: Marks // 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式
  disabled?: boolean // 是否禁用
  range?: boolean // 是否使用双滑块模式
  step?: number | 'mark' // 步长，取值必须大于 0，并且可被 (max - min) 整除；当 marks 不为空对象时，可以设置 step 为 'mark'，此时 Slider 的可选值仅有 marks 标记的部分
  tooltip?: boolean // 是否展示 Tooltip
  tooltipOpen?: boolean // 是否一直显示 tooltip
  tooltipStyle?: CSSProperties // 自定义 Tooltip 样式
  tooltipClass?: string // 自定义 Tooltip 类名
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right' // Tooltip 弹出位置，默认为水平模式 top、垂直模式 right
  formatTooltip?: (value: number) => string | number // Slider 会把当前值传给 formatTooltip，并在 Tooltip 中显示 formatTooltip 的返回值
  value?: number | number[] // (v-model) 设置当前取值，当 range 为 false 时为单个值，否则为区间值
}
// 声明组件插槽类型
export interface SliderSlots {
  mark?: (props: { label: string | VNode | null; value: number }) => VNode[]
  tooltip?: (props: { value: string | number | null }) => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  vertical: false,
  min: 0,
  max: 100,
  marks: () => ({}),
  disabled: false,
  range: false,
  step: 1,
  tooltip: true,
  tooltipOpen: false,
  tooltipStyle: () => ({}),
  formatTooltip: (value: number) => value,
  value: 0
})
defineSlots<SliderSlots>()
const sliderRef = ref<HTMLElement | null>(null) // slider 模板引用
const sliderWidth = ref<number>(0) // 滑动输入条宽度
const sliderHeight = ref<number>(0) // 滑动输入条高度
const low = ref<number>(0) // 左/下滑块距离滑动条左/上端的距离
const high = ref<number>(0) // 右/上滑动距离滑动条左/上端的距离
const lowHandleRef = ref<HTMLElement | null>(null) // low handle DOM 引用
const lowTooltipRef = ref<HTMLElement | null>(null) // low tooltip DOM 引用
const highHandleRef = ref<HTMLElement | null>(null) // high handle DOM 引用
const highTooltipRef = ref<HTMLElement | null>(null) // high tooltip DOM 引用
const lowTooltipShow = ref<boolean>(false) // 左 / 下手柄气泡的交互态显隐（拖动 / 聚焦期间为真，悬浮另由 CSS 承担）
const highTooltipShow = ref<boolean>(false) // 右 / 上手柄气泡的交互态显隐（拖动 / 聚焦期间为真，悬浮另由 CSS 承担）
const { colorPalettes } = useInject('Slider') // 主题色注入
/**
 * 手柄气泡的定位内核
 *
 * 气泡是手柄的子元素、手柄自身即 `position: absolute` 的定位盒，故 `offsetContainer` 直接取手柄本身：
 * 面板 top / left 相对手柄的 padding box 计算，锚点移动由 `sync()` 主动重对齐。
 * - 期望方向：水平模式正上方（top）、垂直模式右侧（right）；可由 `tooltipPlacement` 覆盖；
 * - `flip` 开启：主轴空间不足时自动翻到对侧（与 `Tooltip` 一致）——
 *   手柄贴近视口 / 滚动容器边缘时气泡不再被裁掉；
 * - `shift` 关闭：次轴仍不做对齐自适应与内推，气泡以手柄居中是有意为之的视觉契约；
 * - `offset = 16`：气泡距手柄 16px（水平为上方、垂直为右侧）；
 * - `sync()`：拖动 / 点击 / 键盘操作与容器尺寸重算都会改动手柄位置，锚点随之持续平移 —— 这类变化不产生
 *   滚动 / resize 事件，必须主动帧级强制重对齐。手柄定位盒恒为 10px
 *   （hover / focus 的放大由 `::after` 承担，不改变定位盒），故悬浮态无需同步。
 *
 * 两个手柄的参数完全一致（仅锚点 / 面板不同），故收敛为一个工厂。
 */
function useHandleTooltip(handleRef: Ref<HTMLElement | null>, tooltipRef: Ref<HTMLElement | null>) {
  return useFloating(tooltipRef, {
    anchor: handleRef,
    offsetContainer: handleRef,
    placement: () => props.tooltipPlacement ?? (props.vertical ? 'right' : 'top'),
    flip: true,
    shift: false,
    offset: 16,
    enabled: () => props.tooltip
  })
}
const {
  panelStyle: lowTooltipPanelStyle,
  actualPlacement: lowTooltipPlacement,
  transformOrigin: lowTooltipOrigin,
  sync: syncLowTooltip
} = useHandleTooltip(lowHandleRef, lowTooltipRef)
const {
  panelStyle: highTooltipPanelStyle,
  actualPlacement: highTooltipPlacement,
  transformOrigin: highTooltipOrigin,
  sync: syncHighTooltip
} = useHandleTooltip(highHandleRef, highTooltipRef)
// 气泡内联样式：内核输出（定位 + 动画原点）+ 使用者自定义样式（后者优先）
const lowTooltipStyle = computed<CSSProperties>(() => ({
  ...lowTooltipPanelStyle.value,
  transformOrigin: lowTooltipOrigin.value,
  ...props.tooltipStyle
}))
const highTooltipStyle = computed<CSSProperties>(() => ({
  ...highTooltipPanelStyle.value,
  transformOrigin: highTooltipOrigin.value,
  ...props.tooltipStyle
}))
const emits = defineEmits(['update:value', 'change'])
const sliderSize = computed(() => {
  if (!props.vertical) {
    return sliderWidth.value
  } else {
    return sliderHeight.value
  }
})
const sliderStyle = computed(() => {
  if (!props.vertical) {
    return {
      width: typeof props.width === 'number' ? `${props.width}px` : props.width
    }
  } else {
    return {
      height: typeof props.height === 'number' ? `${props.height}px` : props.height
    }
  }
})
const trackStyle = computed(() => {
  if (!props.vertical) {
    return {
      left: `${low.value}px`,
      right: 'auto',
      width: `${high.value - low.value}px`
    }
  } else {
    return {
      bottom: `${low.value}px`,
      top: 'auto',
      height: `${high.value - low.value}px`
    }
  }
})
const lowHandleStyle = computed(() => {
  if (!props.vertical) {
    return {
      left: `${low.value}px`,
      right: 'auto',
      transform: 'translate(-50%, -50%)'
    }
  } else {
    return {
      bottom: `${low.value}px`,
      top: 'auto',
      transform: 'translate(-50%, 50%)'
    }
  }
})
const highHandleStyle = computed(() => {
  if (!props.vertical) {
    return {
      left: `${high.value}px`,
      right: 'auto',
      transform: 'translate(-50%, -50%)'
    }
  } else {
    return {
      bottom: `${high.value}px`,
      top: 'auto',
      transform: 'translate(-50%, 50%)'
    }
  }
})
// 是否存在刻度标记
const hasMarks = computed(() => {
  return Object.keys(props.marks).length > 0
})
// 刻度标记数值数组
const marksDot = computed(() => {
  let dots: number[] = []
  if (hasMarks.value) {
    dots = Object.keys(props.marks)
      .map(parseFloat)
      .sort((a, b) => a - b)
  }
  return dots
})
// 刻度标记位置数组
const marksPosition = computed(() => {
  const positions: number[] = []
  if (marksDot.value.length > 0) {
    marksDot.value.forEach((markValue: number) => {
      positions.push(getPositionFromValue(markValue))
    })
  }
  return positions
})
// 获取 step 的值
const stepValue = computed(() => {
  if (props.step === 'mark') return 1
  return props.step
})
// 获取 step 数值精度
const precision = computed(() => {
  const stepValueStrArr = stepValue.value.toString().split('.')
  return stepValueStrArr[1]?.length ?? 0
})
// 刻度标记数值精度（取最大值）
const markPrecision = computed(() => {
  let maxPrecision = 0
  marksDot.value.forEach((markValue: number) => {
    const markValueStrArr = markValue.toString().split('.')
    // 注意 `??` 优先级低于 `>`，必须显式加括号，否则会被解析为 `length ?? (0 > maxPrecision)`
    const decimalLength = markValueStrArr[1]?.length ?? 0
    if (decimalLength > maxPrecision) {
      maxPrecision = decimalLength
    }
  })
  return maxPrecision
})
// 滑动输入条的值（通过 handle 位置计算得出）（总体数据流向也是由位置获得数值）
const sliderValue = computed(() => {
  if (sliderSize.value === 0) return props.value
  let highValue
  if (high.value === sliderSize.value) {
    highValue = props.max
  } else {
    highValue = getValueFromPosition(high.value)
    if (props.step === 'mark') {
      // 仅可选 marks 标记的部分
      highValue = findClosestMark(highValue, marksDot.value)
    } else {
      // 大于 1 且不在 marksDot 中时取整，否则保留精度
      if (props.step > 1 && !marksDot.value.includes(highValue)) {
        highValue = Math.round(highValue / props.step) * props.step
      }
    }
  }
  if (props.range) {
    let lowValue
    if (low.value === 0) {
      lowValue = props.min
    } else {
      lowValue = getValueFromPosition(low.value)
      if (props.step === 'mark') {
        // 仅可选 marks 标记的部分
        lowValue = findClosestMark(lowValue, marksDot.value)
      } else {
        // 大于 1 且不在 marksDot 中时取整，否则保留精度
        if (props.step > 1 && !marksDot.value.includes(lowValue)) {
          lowValue = Math.round(lowValue / props.step) * props.step
        }
      }
    }
    return [lowValue, highValue]
  }
  return highValue
})
const lowTooltipValue = computed(() => {
  if (props.range) {
    return props.formatTooltip((sliderValue.value as number[])[0])
  }
  return null
})
const highTooltipValue = computed(() => {
  if (props.range) {
    return props.formatTooltip((sliderValue.value as number[])[1])
  }
  return props.formatTooltip(sliderValue.value as number)
})
watch(
  [() => props.min, () => props.max, () => props.step, () => props.vertical, () => props.value],
  () => {
    updateSliderPosition()
  },
  {
    flush: 'post'
  }
)
watch(sliderValue, (to) => {
  if (JSON.stringify(to) !== JSON.stringify(props.value)) {
    emits('update:value', to)
    emits('change', to)
  }
})
// 手柄位置变化（拖动 / 点击 / 键盘 / 尺寸重算）时强制重对齐气泡：锚点持续移动却不产生滚动 / resize 事件，
// 故主动帧级同步（同一帧内多次调用只重算一次）
watch(
  [low, high],
  () => {
    syncLowTooltip()
    syncHighTooltip()
  },
  { flush: 'post' }
)
useResizeObserver(sliderRef, () => {
  getSliderSize()
})
// 获取滑动输入条尺寸
function getSliderSize(): void {
  if (!sliderRef.value) return
  sliderWidth.value = sliderRef.value.offsetWidth
  sliderHeight.value = sliderRef.value.offsetHeight
  updateSliderPosition()
}
// 使用目标值更新双滑块时的下/左滑块位置
function updateLowHandlePosition(value: number): void {
  const lowValue = pixelStepOperation((checkLow(value) - props.min) / stepValue.value, '*')
  low.value = fixedDigit(lowValue, 2)
}
// 使用目标值更新双滑块时的上/右滑块位置
function updateHighHandlePosition(value: number): void {
  const highValue = pixelStepOperation((checkHigh(value) - props.min) / stepValue.value, '*')
  high.value = fixedDigit(highValue, 2)
}
// 使用目标值更新单滑块的滑块位置
function updateSingleHandlePosition(value: number): void {
  const highValue = pixelStepOperation((checkValue(value) - props.min) / stepValue.value, '*')
  high.value = fixedDigit(highValue, 2)
}
// 通过数值更新滑块位置
function updateSliderPosition(): void {
  if (props.range) {
    // 双滑块模式
    updateLowHandlePosition((props.value as number[])[0])
    updateHighHandlePosition((props.value as number[])[1])
  } else {
    // 单滑块模式
    updateSingleHandlePosition(props.value as number)
  }
}
function checkLow(value: number): number {
  if (value < props.min) {
    return props.min
  }
  return value
}
function checkHigh(value: number): number {
  if (value > props.max) {
    return props.max
  }
  return value
}
function checkValue(value: number): number {
  if (value < props.min) {
    return props.min
  }
  if (value > props.max) {
    return props.max
  }
  return value
}
// 获取目标值/位置最接近的 mark 标记值/位置
function findClosestMark(target: number, marks: number[]): number {
  if (!hasMarks.value) {
    console.warn('Please set the marks property')
    return 0
  }
  let closestValue = marks[0]
  let smallestDifference = Math.abs(target - closestValue)
  const len = marks.length
  for (let i = 1; i < len; i++) {
    const currentDifference = Math.abs(target - marks[i])
    if (currentDifference < smallestDifference) {
      smallestDifference = currentDifference
      closestValue = marks[i]
    }
  }
  return closestValue
}
// 获取指定位置对应的数值，依赖于 step 步长
function getValueFromPosition(position: number): number {
  const targetValue = pixelStepOperation(position, '/') * stepValue.value + props.min
  if (marksDot.value.includes(fixedDigit(targetValue, markPrecision.value))) {
    return fixedDigit(targetValue, markPrecision.value)
  }
  return fixedDigit(targetValue, precision.value)
}
// 获取指定数值对应的滑块位置，不依赖于 step 步长
function getPositionFromValue(value: number): number {
  const position = ((value - props.min) / (props.max - props.min)) * sliderSize.value
  return fixedDigit(position, 2)
}
// 格式化为指定精度的数值
function fixedDigit(num: number, precision: number): number {
  return parseFloat(num.toFixed(precision))
}
/** 手柄气泡的交互态显隐句柄：按手柄取对应的状态 ref（模板中 ref 会被自动解包，故传键名而非 ref 本身） */
type HandleKey = 'low' | 'high'
function tooltipShownOf(which: HandleKey): Ref<boolean> {
  return which === 'low' ? lowTooltipShow : highTooltipShow
}
/** 拖动结束 / 失焦：收起气泡（悬浮由样式表的 :hover 规则独立承担，两者取并集） */
function handlerBlur(which: HandleKey): void {
  tooltipShownOf(which).value = false
}
// 拖动开始 / 点击选中手柄 / 手柄获得焦点：展开气泡，并把焦点移入手柄以便继续键盘操作
function handlerFocus(handler: HTMLElement | null, which: HandleKey): void {
  handler?.focus()
  if (props.tooltip && !props.tooltipOpen) {
    tooltipShownOf(which).value = true
  }
}
// 获取指针事件触发时的点击位置 & 步长位置
function getSliderPosition(e: PointerEvent): { originalPosition: number; stepPosition: number } {
  let originalPosition // 指针点击位置
  let stepPosition // 只考虑步长时将要移动的位置
  if (!sliderRef.value) {
    return { originalPosition: 0, stepPosition: 0 }
  }
  if (!props.vertical) {
    // horizontal
    const leftX = sliderRef.value.getBoundingClientRect().left // 滑动条左端距离屏幕可视区域左边界的距离
    // e.clientX 返回事件被触发时指针相对于浏览器可视窗口的水平坐标
    originalPosition = e.clientX - leftX
    const position = Math.round(pixelStepOperation(originalPosition, '/'))
    stepPosition = fixedDigit(pixelStepOperation(position, '*'), 2)
  } else {
    const bottomY = sliderRef.value.getBoundingClientRect().bottom // 滑动条下端距离屏幕可视区域上边界的距离
    // e.clientY 返回事件被触发时指针相对于浏览器可视窗口的垂直坐标
    originalPosition = bottomY - e.clientY
    const position = Math.round(pixelStepOperation(originalPosition, '/'))
    stepPosition = fixedDigit(pixelStepOperation(position, '*'), 2)
  }
  return {
    originalPosition,
    stepPosition
  }
}
// 根据初始位置和步长位置 获取将要移动的目标位置
function getTargetPosition(originalPosition: number, stepPosition: number): number {
  if (hasMarks.value) {
    // 有刻度标记
    // 获取距离点击位置最近的 mark 标记位置
    const closestPosition = findClosestMark(originalPosition, marksPosition.value)
    if (Math.abs(originalPosition - closestPosition) < Math.abs(originalPosition - stepPosition)) {
      return closestPosition
    } else {
      return stepPosition
    }
  } else {
    // 无刻度标记
    return stepPosition
  }
}
// 点击滑动输入条任意位置
function onClickSliderPoint(e: PointerEvent): void {
  const {
    originalPosition, // 指针点击位置
    stepPosition // 只考虑步长时将要移动的位置
  } = getSliderPosition(e)
  let targetPosition // 考虑步长和刻度标记时，将要移动的目标位置
  if (props.step === 'mark') {
    // 仅可选 marks 标记的部分
    // 获取距离点击位置最近的 mark 标记位置
    const closestPosition = findClosestMark(originalPosition, marksPosition.value)
    if (props.range) {
      // 双滑块模式
      // 距离 closestPosition 更近的 handle 将被选中
      if (Math.abs(closestPosition - low.value) < Math.abs(closestPosition - high.value)) {
        if (closestPosition !== low.value) {
          low.value = closestPosition
        }
        handlerFocus(lowHandleRef.value, 'low')
      } else {
        if (closestPosition !== high.value) {
          high.value = closestPosition
        }
        handlerFocus(highHandleRef.value, 'high')
      }
    } else {
      // 单滑块模式
      if (closestPosition !== high.value) {
        high.value = closestPosition
      }
      handlerFocus(highHandleRef.value, 'high')
    }
  } else {
    targetPosition = getTargetPosition(originalPosition, stepPosition)
    if (props.range) {
      // 双滑块模式
      // 距离 targetPosition 更近的 handle 将被选中进行移动
      if (Math.abs(targetPosition - low.value) < Math.abs(targetPosition - high.value)) {
        if (targetPosition !== low.value) {
          low.value = targetPosition
        }
        handlerFocus(lowHandleRef.value, 'low')
      } else {
        if (targetPosition !== high.value) {
          high.value = targetPosition
        }
        handlerFocus(highHandleRef.value, 'high')
      }
    } else {
      // 单滑块模式
      if (targetPosition !== high.value) {
        high.value = targetPosition
      }
      handlerFocus(highHandleRef.value, 'high')
    }
  }
}
function handleLowPointerDown(e: PointerEvent): void {
  if (!lowHandleRef.value) return
  // 捕获指针，确保即使移出元素也能继续跟踪
  lowHandleRef.value.setPointerCapture(e.pointerId)
  document.addEventListener('pointermove', handleLowPointerMove)
  document.addEventListener('pointerup', handleLowPointerUp)
  document.addEventListener('pointercancel', handleLowPointerUp)
  handleLowPointerMove(e)
}
// 在滑动输入条上拖动较小数值滑块
function handleLowPointerMove(e: PointerEvent): void {
  const {
    originalPosition, // 初始位置
    stepPosition // 只考虑步长时将要移动的位置
  } = getSliderPosition(e)
  let targetPosition // 考虑步长和刻度标记时，将要移动的目标位置
  if (props.tooltip && !props.tooltipOpen) {
    lowTooltipShow.value = true
  }
  if (props.step === 'mark') {
    // 仅可选 marks 标记的部分
    // 获取距离点击位置最近的 mark 标记位置
    const closestPosition = findClosestMark(originalPosition, marksPosition.value)
    if (closestPosition <= high.value) {
      if (closestPosition !== low.value) {
        low.value = closestPosition
      }
    } else {
      low.value = high.value
      highHandleRef.value?.focus()
      handleLowPointerUp()
      handleHighPointerDown(e)
    }
  } else {
    targetPosition = getTargetPosition(originalPosition, stepPosition)
    if (targetPosition < 0) {
      low.value = 0
    } else if (0 <= targetPosition && targetPosition <= high.value) {
      low.value = targetPosition
    } else {
      // targetPosition > high
      low.value = high.value
      highHandleRef.value?.focus()
      handleLowPointerUp()
      handleHighPointerDown(e)
    }
  }
}
function handleLowPointerUp(): void {
  if (props.tooltip && !props.tooltipOpen) {
    lowTooltipShow.value = false
  }
  document.removeEventListener('pointermove', handleLowPointerMove)
  document.removeEventListener('pointerup', handleLowPointerUp)
  document.removeEventListener('pointercancel', handleLowPointerUp)
}
function handleHighPointerDown(e: PointerEvent): void {
  if (!highHandleRef.value) return
  // 捕获指针，确保即使移出元素也能继续跟踪
  highHandleRef.value.setPointerCapture(e.pointerId)
  document.addEventListener('pointermove', handleHighPointerMove)
  document.addEventListener('pointerup', handleHighPointerUp)
  document.addEventListener('pointercancel', handleHighPointerUp)
  handleHighPointerMove(e)
}
// 在滑动输入条上拖动较大数值滑块
function handleHighPointerMove(e: PointerEvent): void {
  const {
    originalPosition, // 初始位置
    stepPosition // 只考虑步长时将要移动的位置
  } = getSliderPosition(e)
  let targetPosition // 考虑步长和刻度标记时，将要移动的目标位置
  if (props.tooltip && !props.tooltipOpen) {
    highTooltipShow.value = true
  }
  if (props.step === 'mark') {
    // 仅可选 marks 标记的部分
    // 获取距离点击位置最近的 mark 标记位置
    const closestPosition = findClosestMark(originalPosition, marksPosition.value)
    if (closestPosition >= low.value) {
      if (closestPosition !== high.value) {
        high.value = closestPosition
      }
    } else {
      high.value = low.value
      if (props.range) {
        lowHandleRef.value?.focus()
        handleHighPointerUp()
        handleLowPointerDown(e)
      }
    }
  } else {
    targetPosition = getTargetPosition(originalPosition, stepPosition)
    if (targetPosition > sliderSize.value) {
      high.value = sliderSize.value
    } else if (low.value <= targetPosition && targetPosition <= sliderSize.value) {
      high.value = targetPosition
    } else {
      // targetPosition < low
      high.value = low.value
      if (props.range) {
        lowHandleRef.value?.focus()
        handleHighPointerUp()
        handleLowPointerDown(e)
      }
    }
  }
}
function handleHighPointerUp(): void {
  if (props.tooltip && !props.tooltipOpen) {
    highTooltipShow.value = false
  }
  document.removeEventListener('pointermove', handleHighPointerMove)
  document.removeEventListener('pointerup', handleHighPointerUp)
  document.removeEventListener('pointercancel', handleHighPointerUp)
}
function getDotStyle(value: number): CSSProperties {
  const offset = `${(Math.abs(value - props.min) / (props.max - props.min)) * 100}%`
  if (!props.vertical) {
    return {
      left: offset
    }
  } else {
    return {
      bottom: offset
    }
  }
}
function isDotActive(value: number): boolean {
  if (props.range) {
    return (sliderValue.value as number[])[0] <= value && value <= (sliderValue.value as number[])[1]
  }
  return value <= (sliderValue.value as number)
}
function getMarkLabel(value: number): string | VNode | null {
  const mark = props.marks[value]
  const markIsObject = typeof mark === 'object' && !isVNode(mark)
  const markLabel = markIsObject ? mark.label : mark
  if (!markLabel) return null
  return typeof markLabel === 'function' ? markLabel() : markLabel
}
function getMarkStyle(value: number): CSSProperties {
  const offset = `${(Math.abs(value - props.min) / (props.max - props.min)) * 100}%`
  let markLabelStyle = {}
  const mark = props.marks[value]
  const markIsObject = typeof mark === 'object' && !isVNode(mark)
  if (markIsObject && 'style' in mark) {
    markLabelStyle = mark.style
  }
  if (!props.vertical) {
    return {
      transform: 'translateX(-50%)',
      left: offset,
      ...markLabelStyle
    }
  } else {
    return {
      transform: 'translateY(50%)',
      bottom: offset,
      ...markLabelStyle
    }
  }
}
function onClickMark(index: number): void {
  const targetPosition = marksPosition.value[index]
  if (props.range) {
    // 双滑块模式
    // 距离 targetPosition 更近的 handle 将被选中进行移动
    if (Math.abs(targetPosition - low.value) < Math.abs(targetPosition - high.value)) {
      if (targetPosition !== low.value) {
        low.value = targetPosition
      }
      handlerFocus(lowHandleRef.value, 'low')
    } else {
      if (targetPosition !== high.value) {
        high.value = targetPosition
      }
      handlerFocus(highHandleRef.value, 'high')
    }
  } else {
    // 单滑块模式
    if (targetPosition !== high.value) {
      high.value = targetPosition
    }
    handlerFocus(highHandleRef.value, 'high')
  }
}
function handleLowSlide(source: number, place: string): void {
  const targetDistance = pixelStepOperation(source, '-')
  if (place === 'low') {
    // 左/下滑块左/下移
    if (targetDistance < 0) {
      low.value = 0
    } else {
      low.value = targetDistance
    }
  } else {
    // 右/上滑块左/下移
    if (targetDistance >= low.value) {
      high.value = targetDistance
    } else {
      high.value = low.value
      low.value = targetDistance
      lowHandleRef.value?.focus()
    }
  }
}
function handleHighSlide(source: number, place: string): void {
  const targetDistance = pixelStepOperation(source, '+')
  if (place === 'high') {
    // 右/上滑块右/上移
    if (targetDistance > sliderSize.value) {
      high.value = sliderSize.value
    } else {
      high.value = targetDistance
    }
  } else {
    // 左/下滑块右/上移
    if (targetDistance <= high.value) {
      low.value = targetDistance
    } else {
      low.value = high.value
      high.value = targetDistance
      highHandleRef.value?.focus()
    }
  }
}
// 计算像素步长操作
function pixelStepOperation(target: number, operator: '+' | '-' | '*' | '/'): number {
  if (operator === '+') {
    return target + (sliderSize.value * stepValue.value) / (props.max - props.min)
  }
  if (operator === '-') {
    return target - (sliderSize.value * stepValue.value) / (props.max - props.min)
  }
  if (operator === '*') {
    return (target * sliderSize.value * stepValue.value) / (props.max - props.min)
  }
  if (operator === '/') {
    return (target * (props.max - props.min)) / (sliderSize.value * stepValue.value)
  }
  return target
}
</script>
<template>
  <div
    ref="sliderRef"
    class="slider-wrap"
    :class="{
      'slider-horizontal': !vertical,
      'slider-vertical': vertical,
      'slider-with-marks': Object.keys(marks).length > 0,
      'slider-disabled': disabled
    }"
    :style="[
      sliderStyle,
      `
        --slider-rail-color: rgba(0, 0, 0, 0.04);
        --slider-rail-color-hover: rgba(0, 0, 0, 0.1);
        --slider-rail-color-disabled: rgba(0, 0, 0, 0.06);
        --slider-track-color: ${colorPalettes[2]};
        --slider-track-color-hover: ${colorPalettes[5]};
        --slider-track-color-disabled: rgba(0, 0, 0, 0.25);
        --slider-handle-color: #fff;
        --slider-handle-shadow-color: ${colorPalettes[2]};
        --slider-handle-shadow-color-hover-focus: ${colorPalettes[5]};
        --slider-handle-shadow-color-disabled: #bfbfbf;
        --slider-dot-color: #fff;
        --slider-dot-border-color: #f0f0f0;
        --slider-dot-border-color-hover: rgba(0, 0, 0, 0.1);
        --slider-dot-color-active: ${colorPalettes[2]};
        --slider-mark-color: rgba(0, 0, 0, 0.45);
        --slider-mark-color-active: rgba(0, 0, 0, 0.88);
        --slider-tooltip-color: #fff;
        --slider-tooltip-bg-color: rgba(0, 0, 0, 0.85);
      `
    ]"
    @pointerdown="disabled ? () => false : onClickSliderPoint($event)"
  >
    <div class="slider-rail"></div>
    <div class="slider-track" :style="trackStyle"></div>
    <template v-if="Object.keys(marks).length > 0">
      <div class="slider-dots">
        <span
          class="slider-dot"
          :class="{ 'slider-dot-active': isDotActive(markValue) }"
          :style="getDotStyle(markValue)"
          v-for="(markValue, index) in marksDot"
          :key="index"
        ></span>
      </div>
      <div class="slider-marks">
        <span
          class="slider-mark"
          :class="{ 'slider-mark-active': isDotActive(markValue) }"
          :style="getMarkStyle(markValue)"
          v-for="(markValue, index) in marksDot"
          :key="index"
          @click.stop="disabled ? () => false : onClickMark(index)"
        >
          <slot name="mark" :label="getMarkLabel(markValue)" :value="markValue">
            <template v-if="typeof getMarkLabel(markValue) === 'string'">{{ getMarkLabel(markValue) }}</template>
            <component v-else :is="getMarkLabel(markValue)" />
          </slot>
        </span>
      </div>
    </template>
    <div
      v-if="range"
      tabindex="0"
      ref="lowHandleRef"
      class="slider-handle"
      :style="lowHandleStyle"
      @keydown.left.prevent="disabled ? () => false : handleLowSlide(low, 'low')"
      @keydown.right.prevent="disabled ? () => false : handleHighSlide(low, 'low')"
      @keydown.down.prevent="disabled ? () => false : handleLowSlide(low, 'low')"
      @keydown.up.prevent="disabled ? () => false : handleHighSlide(low, 'low')"
      @pointerdown="disabled ? () => false : handleLowPointerDown($event)"
      @focus="tooltip && !disabled && !tooltipOpen ? handlerFocus(lowHandleRef, 'low') : () => false"
      @blur="tooltip && !disabled && !tooltipOpen ? handlerBlur('low') : () => false"
    >
      <div
        v-if="tooltip"
        ref="lowTooltipRef"
        class="slider-tooltip"
        :class="[
          tooltipClass,
          `slider-tooltip-${lowTooltipPlacement}`,
          { 'slider-tooltip-visible': tooltipOpen || lowTooltipShow }
        ]"
        :style="lowTooltipStyle"
      >
        <slot name="tooltip" :value="lowTooltipValue">{{ lowTooltipValue }}</slot>
        <div class="slider-tooltip-arrow"></div>
      </div>
    </div>
    <div
      tabindex="0"
      ref="highHandleRef"
      class="slider-handle"
      :style="highHandleStyle"
      @keydown.left.prevent="disabled ? () => false : handleLowSlide(high, 'high')"
      @keydown.right.prevent="disabled ? () => false : handleHighSlide(high, 'high')"
      @keydown.down.prevent="disabled ? () => false : handleLowSlide(high, 'high')"
      @keydown.up.prevent="disabled ? () => false : handleHighSlide(high, 'high')"
      @pointerdown="disabled ? () => false : handleHighPointerDown($event)"
      @focus="tooltip && !disabled && !tooltipOpen ? handlerFocus(highHandleRef, 'high') : () => false"
      @blur="tooltip && !disabled && !tooltipOpen ? handlerBlur('high') : () => false"
    >
      <div
        v-if="tooltip"
        ref="highTooltipRef"
        class="slider-tooltip"
        :class="[
          tooltipClass,
          `slider-tooltip-${highTooltipPlacement}`,
          { 'slider-tooltip-visible': tooltipOpen || highTooltipShow }
        ]"
        :style="highTooltipStyle"
      >
        <slot name="tooltip" :value="highTooltipValue">{{ highTooltipValue }}</slot>
        <div class="slider-tooltip-arrow"></div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
/* 手柄气泡显示态：悬浮（hover 规则）/ 拖动 / 聚焦 / tooltipOpen 共用，避免多处重复声明。
   各落点必须用**复合选择器**建立确定性优先级：显示态与基础隐藏态落在同一个气泡元素上，
   单类写法只能靠「谁声明在后」决胜（见 .slider-handle 内的调用点）
   ⚠️ 显示态只切换视觉（opacity / scale），**不**恢复指针事件：气泡是滑块的后代，一旦可点击，
   `pointerdown` 会冒泡到 `.slider-wrap` 被当作「点击轨道」而改值。 */
.tooltip-visible-state() {
  opacity: 1;
  scale: 1;
}
.slider-wrap {
  position: relative;
  cursor: pointer;
  touch-action: none;
  .slider-rail {
    // 灰色轨道颜色
    position: absolute;
    background-color: var(--slider-rail-color);
    border-radius: 2px;
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .slider-track {
    // 蓝色轨道颜色
    position: absolute;
    background-color: var(--slider-track-color);
    border-radius: 2px;
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .slider-dots {
    position: absolute;
    background: transparent;
    pointer-events: none;
    .slider-dot {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: var(--slider-dot-color);
      border: 2px solid var(--slider-dot-border-color);
      border-radius: 50%;
      cursor: pointer;
      transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .slider-dot-active {
      border-color: var(--slider-dot-color-active);
    }
  }
  .slider-marks {
    position: absolute;
    font-size: 14px;
    .slider-mark {
      position: absolute;
      display: inline-block;
      color: var(--slider-mark-color);
      text-align: center;
      word-break: keep-all;
      cursor: pointer;
      user-select: none;
      // 仅用于适配 vitepress 文档样式
      :deep(strong) {
        color: inherit;
      }
      :deep(svg) {
        fill: currentColor;
      }
    }
    .slider-mark-active {
      color: var(--slider-mark-color-active);
    }
  }
  &:hover {
    .slider-rail {
      // 灰色轨道悬浮色
      background: var(--slider-rail-color-hover);
    }
    .slider-track {
      // 蓝色轨道悬浮色
      background: var(--slider-track-color-hover);
    }
    .slider-dots {
      .slider-dot {
        border-color: var(--slider-dot-border-color-hover);
      }
      .slider-dot-active {
        border-color: var(--slider-track-color-hover);
      }
    }
  }
  .slider-handle {
    // 滑块
    /* 定位盒固定 10px、不随交互变化：气泡是手柄的绝对定位子元素，参照盒（padding box）一旦
       随 hover / focus 放大，气泡便会整体漂移。故把「圆点 + 光环」这层视觉交由 ::after 承载 */
    position: absolute;
    width: 10px;
    height: 10px;
    outline: none;
    &::before {
      content: '';
      position: absolute;
      left: -2px;
      top: -2px;
      width: 14px;
      height: 14px;
      background-color: transparent;
    }
    // 视觉层：圆点（白）+ 光环（主题色），hover / focus 时放大
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 10px;
      height: 10px;
      background: var(--slider-handle-color);
      box-shadow: 0 0 0 2px var(--slider-handle-shadow-color);
      border-radius: 50%;
      translate: -50% -50%;
      transition:
        width 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        height 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .hover-focus-handle() {
      width: 12px;
      height: 12px;
      box-shadow: 0 0 0 4px var(--slider-handle-shadow-color-hover-focus);
    }
    &:hover,
    &:focus {
      &::after {
        .hover-focus-handle();
      }
      &::before {
        left: -5px;
        top: -5px;
        width: 20px;
        height: 20px;
      }
    }
    /* 手柄气泡：位置由定位内核写内联样式（top / left / translate），无需组件侧几何；
       缩放改用独立变换属性 scale —— 否则 transition / keyframes 里的 transform 会覆盖内联定位 */
    .slider-tooltip {
      position: absolute;
      width: max-content;
      min-width: 32px;
      max-width: 250px;
      padding: 6px 8px;
      height: 32px;
      font-size: 14px;
      color: var(--slider-tooltip-color);
      line-height: 20px;
      text-align: center;
      border-radius: 6px;
      background: var(--slider-tooltip-bg-color);
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
      // 气泡不接收指针事件：否则点击气泡会冒泡到 .slider-wrap
      // 触发「点击轨道改值」，悬浮气泡还会把 hover 态传导给滑块
      pointer-events: none;
      user-select: none;
      outline: none;
      scale: 0.8;
      opacity: 0;
      transition:
        scale 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      .slider-tooltip-arrow {
        /* 箭头尺寸：元素尺寸与「贴到气泡外的偏移」共用同一变量，避免两处硬编码 */
        --arrow-size: 16px;
        position: absolute;
        /* 必须绘制在气泡**之上**：气泡自带 box-shadow，若箭头置于其下会被阴影染出一条暗带。
           拼接处（相切）的淡色细缝由内核把浮层位置取整到整数像素消除，此处无需重叠补偿 */
        z-index: 9;
        display: block;
        pointer-events: none;
        width: var(--arrow-size);
        height: var(--arrow-size);
        overflow: hidden;
        &::before {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 16px;
          height: 8px;
          background-color: var(--slider-tooltip-bg-color);
          clip-path: path(
            'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
          );
          content: '';
        }
        &::after {
          position: absolute;
          width: 8.970562748477143px;
          height: 8.970562748477143px;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          border-radius: 0 0 2px 0;
          transform: translateY(50%) rotate(-135deg);
          box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
          /* 置于三角形**之下**：这层只负责延续投影，若压在三角形之上会把浅色箭头染成灰色 */
          z-index: -1;
          background: transparent;
          content: '';
        }
      }
      /* 方向几何：由气泡上的方向类（`slider-tooltip-{top|bottom|left|right}`，值取内核输出）驱动，
         零 JS 箭头运算。四条规则读法一致 ——「沿该边居中」= 该轴 `50%` + `translate` 回退自身一半；
         「整块贴到该边外侧」= 该边负偏移一个箭头尺寸；「尖端朝向」= 把「尖朝上」的箭头
         旋转 90° 的整数倍（top 180° / bottom 0° / left 90° / right -90°）。
         形状与 Tooltip 的箭头同源，仅贴边距离不同：气泡没有「箭头槽」，箭头紧贴气泡边缘相切 */
      &.slider-tooltip-top .slider-tooltip-arrow {
        left: 50%;
        bottom: calc(var(--arrow-size) * -1);
        translate: -50%;
        rotate: 180deg;
      }
      &.slider-tooltip-bottom .slider-tooltip-arrow {
        left: 50%;
        top: calc(var(--arrow-size) * -1);
        translate: -50%;
        rotate: 0deg;
      }
      &.slider-tooltip-left .slider-tooltip-arrow {
        top: 50%;
        right: calc(var(--arrow-size) * -1);
        translate: 0 -50%;
        rotate: 90deg;
      }
      &.slider-tooltip-right .slider-tooltip-arrow {
        top: 50%;
        left: calc(var(--arrow-size) * -1);
        translate: 0 -50%;
        rotate: -90deg;
      }
    }
    /* 常显态（tooltipOpen）与拖动 / 聚焦态：复合选择器比基础隐藏态 `.slider-tooltip` 多一个
       类级成分，靠**特异性**压过它（与下方 `&:hover .slider-tooltip` 同为一类 + 伪类/多类，
       且两者声明值一致），不再依赖「谁声明在后」 */
    .slider-tooltip.slider-tooltip-visible {
      .tooltip-visible-state();
    }
    // 悬浮手柄时显示气泡（拖动 / 聚焦由状态类承担，两者取并集）
    &:hover .slider-tooltip {
      .tooltip-visible-state();
    }
  }
}
.slider-horizontal {
  padding-block: 4px;
  height: 12px;
  margin: 10px 5px;
  .slider-rail {
    height: 4px;
    width: 100%;
  }
  .slider-track {
    height: 4px;
  }
  .slider-dots {
    left: 0;
    top: 4px;
    width: 100%;
    height: 4px;
    .slider-dot {
      margin-left: -4px;
      position: absolute;
      top: -2px;
    }
  }
  .slider-marks {
    left: 0;
    top: 14px;
    width: 100%;
  }
  .slider-handle {
    top: 50%;
  }
}
.slider-horizontal.slider-with-marks {
  margin-bottom: 30px;
}
.slider-vertical {
  padding-inline: 4px;
  width: 12px;
  margin: 5px 10px;
  .slider-rail {
    width: 4px;
    height: 100%;
  }
  .slider-track {
    width: 4px;
  }
  .slider-dots {
    left: 4px;
    top: 0;
    height: 100%;
    width: 4px;
    .slider-dot {
      margin-bottom: -4px;
      position: absolute;
      left: -2px;
    }
  }
  .slider-marks {
    left: 18px;
    top: 0;
    height: 100%;
  }
  .slider-handle {
    left: 50%;
  }
}
.slider-disabled {
  cursor: not-allowed;
  .slider-rail {
    background: var(--slider-rail-color-disabled);
  }
  .slider-track {
    background: var(--slider-track-color-disabled);
  }
  .slider-handle {
    &::after {
      box-shadow: 0 0 0 2px var(--slider-handle-shadow-color-disabled);
    }
    &:hover,
    &:focus {
      &::after {
        width: 10px;
        height: 10px;
        box-shadow: 0 0 0 2px var(--slider-handle-shadow-color-disabled);
      }
    }
  }
  &:hover {
    .slider-rail {
      background: var(--slider-rail-color-disabled);
    }
    .slider-track {
      background: var(--slider-track-color-disabled);
    }
  }
}
.slider-vertical.slider-with-marks {
  margin-right: 36px;
}
</style>
