<script setup lang="ts">
import { ref, computed, watch, watchEffect, onBeforeUnmount, nextTick } from 'vue'
import type { CSSProperties, TransitionProps, VNode, VNodeChild } from 'vue'
import {
  hsla,
  hsva,
  rgba,
  hsl2hsv,
  rgb2hsv,
  hsv2rgb,
  hsl2rgb,
  hsv2hsl,
  rgb2hsl,
  toHsvaString,
  toHsvString,
  toHslaString,
  toHslString,
  toRgbaString,
  toRgbString,
  toHexaString,
  toHexString
} from 'seemly'
import type { HSVA, RGBA, HSLA, HSV, RGB, HSL } from 'seemly'
import { TinyColor, isReadable } from '@ctrl/tinycolor'
import Popup from 'components/popup'
import Input, { type InputProps } from 'components/input'
import Button from 'components/button'
import { FLOATING_LAYER_Z_INDEX, useSlotsExist, log } from 'components/utils'
import type { FloatingPlacement } from 'components/utils'
export type ColorPickerMode = 'rgb' | 'hsl' | 'hsv' | 'hex'
export type ColorPickerAction = 'confirm' | 'clear'

export interface Props {
  // 双向绑定与受控核心
  value?: string // (v-model) 颜色选择器的值
  defaultValue?: string // 未受控时颜色选择器的初始值
  defaultOpen?: boolean // 未受控时面板的初始显隐
  // 内容与数据源
  label?: (color: string) => VNodeChild // 展示的内容，返回值同时支持字符串与 VNode
  swatches?: string[] // 色板的值
  footer?: string // 底部额外的页脚内容
  // 外观与尺寸
  modes?: ColorPickerMode[] // 颜色选择器支持颜色的格式
  width?: string | number // 颜色选择器的宽度，单位 px
  size?: 'small' | 'middle' | 'large' // 颜色选择器的尺寸
  showAlpha?: boolean // 是否可调节 alpha 通道
  showPreview?: boolean // 是否展示颜色预览块
  placement?: FloatingPlacement // 弹出面板的位置
  // 状态与反馈
  disabled?: boolean // 是否禁用
  // 行为与交互
  actions?: ColorPickerAction[] // 显示按钮
  // 进阶与透传
  panelClass?: string // 面板的类名（皮肤挂载点）
  panelStyle?: CSSProperties // 面板样式，在定位 / 层级之后合并
  zIndex?: number // 面板层级，优先级最高（未传时使用默认层级或 ConfigProvider 的 baseZIndex 分配）
  offset?: number // 面板与触发器的主轴间距，单位 px
  destroyOnHide?: boolean // 隐藏后是否卸载面板 DOM
  to?: string | HTMLElement | false // 弹出面板挂载的容器节点，可选：元素标签名 (例如 'body') 或者元素本身，false 会待在原地
  inputProps?: InputProps // 输入框组件 props，透传给内部 Input 组件
}
/**
 * 组件对外 props 类型
 *
 * `open` 由 `defineModel` 声明（同名出现在 `defineProps` 中会与模型绑定冲突），此处合并回对外类型，
 * 保证使用方获得完整的 props 提示
 */
export type ColorPickerProps = Props & {
  open?: boolean
}
// 自定义触发器的插槽参数：值由使用方渲染，点击开合 / 面板定位与外点判定均由组件外壳接管
export interface ColorPickerTriggerSlotProps {
  value: string | undefined
}
export interface ColorPickerSlots {
  label?: (props: { color: string | undefined }) => VNode[]
  footer?: () => VNode[]
  trigger?: (props: ColorPickerTriggerSlotProps) => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  defaultValue: undefined,
  defaultOpen: false,
  label: undefined,
  modes: () => ['rgb', 'hex', 'hsl'],
  swatches: () => [],
  actions: () => [],
  footer: undefined,
  width: '100%',
  size: 'middle',
  showAlpha: true,
  showPreview: false,
  panelClass: undefined,
  panelStyle: () => ({}),
  zIndex: undefined,
  // 面板与触发器的主轴间距（实测值）：默认 6 可避免面板位置跳动
  offset: 6,
  destroyOnHide: false,
  disabled: false,
  inputProps: () => ({}),
  placement: 'bottomLeft',
  to: undefined
})
defineSlots<ColorPickerSlots>()
const HANDLE_SIZE = '12px'
const HANDLE_SIZE_NUM = 12
const BORDER_RADIUS = '6px'
const BORDER_RADIUS_NUM = 6
// 面板显隐：不传 open 时为非受控，由组件自持（初始值取 defaultOpen）；传了则以父组件为准
const open = defineModel<boolean | undefined>('open', { default: undefined })
const popupRef = ref<InstanceType<typeof Popup> | null>(null) // 浮层宿主模板引用
const wrapperRef = ref<HTMLElement | null>(null) // 外壳模板引用：触发区、浮层锚点与外点判定范围
const palleteRef = ref<HTMLElement | null>(null) // pallete 调色板模板引用
const hueRailRef = ref<HTMLElement | null>(null) // hue 轨道条模板引用
const alphaRailRef = ref<HTMLElement | null>(null) // alpha 轨道条模板引用
const displayedHue = ref<number>(0)
const displayedAlpha = ref<number>(1)
const displayedSv = ref<[number, number]>([0, 0])
const upcomingValue = ref<string | undefined>()
const displayedValue = ref<string | undefined>(props.value ?? props.defaultValue) // 展示的值
const displayedMode = ref<ColorPickerMode>(getModeFromValue(displayedValue.value) || props.modes[0] || 'rgb') // 当前展示的 mode
const hexValue = ref<string>() // hex 模式下输入框的绑定值
const inputValueArr = ref<string[]>([]) // 非 hex 模式下多个输入框的绑定值
const inputRefreshKey = ref<number>(0) // 输入框重建令牌：非法输入后强制其回滚到组件内部值
const emits = defineEmits(['update:value', 'complete', 'confirm', 'clear', 'openChange'])
const slotsExist = useSlotsExist(['footer', 'trigger'])
// 面板是否展开：open 未受控（undefined）时恒为收起，写入由 requestOpen 统一驱动
const panelOpen = computed(() => open.value === true)
// 对外表达的展开态：禁用时不展开（面板同样被抑制），故无障碍语义以实际可见性为准
const panelExpanded = computed(() => panelOpen.value && !props.disabled)
const showFooter = computed(() => {
  return slotsExist.footer || props.footer
})
const showTrigger = computed(() => {
  return slotsExist.trigger
})
const triggerSlotProps = computed<ColorPickerTriggerSlotProps>(() => ({
  value: displayedValue.value
}))
// 面板皮肤：由组件自持的面板容器承担，使用者的 panelStyle / panelClass 追加在其上
const mergedPanelClass = computed(() => ['color-picker-panel-container', props.panelClass].filter(Boolean).join(' '))
// 主题变量随组件壳下发，面板经 Teleport 后不在壳内，需同样注入到面板上
const themeVars = computed(() => ({
  '--color-picker-primary-color-hover': 'var(--va-cp-color-picker-primary-color-hover, var(--va-primary-color-hover))',
  '--color-picker-primary-color-focus': 'var(--va-cp-color-picker-primary-color, var(--va-primary-color))',
  '--color-picker-primary-shadow-color': 'var(--va-cp-color-picker-primary-bg-color, var(--va-primary-bg-color))'
}))
const panelTransitionProps: TransitionProps = { name: 'color-picker-zoom' }
const layerHandleStyle = computed(() => {
  const style: CSSProperties = {
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: BORDER_RADIUS,
    left: `calc(${displayedSv.value[0]}% - ${BORDER_RADIUS})`,
    bottom: `calc(${displayedSv.value[1]}% - ${BORDER_RADIUS})`
  }
  return style
})
const handleColor = computed(() => {
  if (!rgbaComputed.value) return ''
  return `rgb(${rgbaComputed.value[0]}, ${rgbaComputed.value[1]}, ${rgbaComputed.value[2]})`
})
const layerHandleFillStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: handleColor.value,
    borderRadius: BORDER_RADIUS,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE
  }
  return style
})
const sliderStyle = computed(() => {
  const style: CSSProperties = {
    height: HANDLE_SIZE,
    borderRadius: BORDER_RADIUS
  }
  return style
})
const sliderRailStyle = computed(() => {
  const style: CSSProperties = {
    position: 'relative',
    boxShadow: 'inset 0 0 2px 0 rgba(0, 0, 0, 0.24)',
    backgroundImage: 'linear-gradient(90deg, red, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, red)',
    height: HANDLE_SIZE,
    borderRadius: BORDER_RADIUS,
    touchAction: 'none'
  }
  return style
})
const sliderColorHandleStyle = computed(() => {
  const style: CSSProperties = {
    left: `calc((${displayedHue.value}%) / 359 * 100 - ${BORDER_RADIUS})`,
    borderRadius: BORDER_RADIUS,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE
  }
  return style
})
const sliderColorHandleFillStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: `hsl(${displayedHue.value}, 100%, 50%)`,
    borderRadius: BORDER_RADIUS,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE
  }
  return style
})
// 不透明度 alpha 轨道条的背景
const alphaRailBackgroundImage = computed(() => {
  if (!rgbaComputed.value) return ''
  return `linear-gradient(to right, rgba(${rgbaComputed.value[0]}, ${rgbaComputed.value[1]}, ${rgbaComputed.value[2]}, 0) 0%, rgba(${rgbaComputed.value[0]}, ${rgbaComputed.value[1]}, ${rgbaComputed.value[2]}, 1) 100%)`
})
const sliderAlphaHandleStyle = computed(() => {
  const style: CSSProperties = {
    left: `calc(${displayedAlpha.value * 100}% - ${BORDER_RADIUS})`,
    borderRadius: BORDER_RADIUS,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE
  }
  return style
})
const sliderAlphaHandleFillStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: rgbaComputed.value ? toRgbaString(rgbaComputed.value) : undefined,
    borderRadius: BORDER_RADIUS,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE
  }
  return style
})
// 颜色预览块的颜色
const circleColor = computed(() => {
  return rgbaComputed.value && toHexString(rgbaComputed.value)
})
// 触发器标签文字颜色：半透明色先与白色底板（棋盘格底色）合成，再按 WCAG AA 对比度取黑 / 白
// （亮度阈值在中间色上给出的对比度不足，故走 WCAG）
const labelColor = computed(() => {
  const hslaValue = hslaComputed.value
  if (!hslaValue) return undefined
  const { r, g, b, a } = new TinyColor(toHslaString(hslaValue)).toRgb()
  const blendChannel = (channel: number): number => Math.round(channel * a + 255 * (1 - a))
  const blendedColor = { r: blendChannel(r), g: blendChannel(g), b: blendChannel(b) }
  return isReadable(blendedColor, '#ffffff', { level: 'AA', size: 'small' }) ? 'white' : 'black'
})
const colorPickerWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const colorPickerHeight = computed(() => {
  const heightMap = {
    small: 24,
    middle: 32,
    large: 40
  }
  return `${heightMap[props.size]}px`
})
// 外壳样式：内置触发器按 width / height 撑满触发区；自定义触发器由 .color-picker-custom-trigger 随内容
// 自适应（内联 width: 100% 会撑成整行）。主题变量随外壳下发，面板另行注入（见 themeVars）
const wrapperStyle = computed(() => {
  if (showTrigger.value) return themeVars.value
  return {
    ...themeVars.value,
    width: colorPickerWidth.value,
    height: colorPickerHeight.value
  } as CSSProperties
})
const colorPickerBlockSize = computed(() => {
  const gapMap = {
    small: 6,
    middle: 8,
    large: 10
  }
  return `calc((${colorPickerHeight.value} - ${gapMap[props.size]}px) / 3)`
})
// 展示区（内置触发器）样式：棋盘格尺寸与主题变量随尺寸一起下发
const displayStyle = computed(
  () =>
    ({
      ...themeVars.value,
      '--color-picker-block-size': colorPickerBlockSize.value
    }) as CSSProperties
)
const valueMode = computed(() => {
  return getModeFromValue(displayedValue.value)
})
const displayedModeComputed = computed(() => {
  return displayedMode.value.toUpperCase() + (props.showAlpha ? 'A' : '')
})
const displayedModeComputedArr = computed(() => {
  return displayedModeComputed.value.split('')
})
let _h: number, // avoid conflict with render function's
  s: number,
  l: number,
  v: number,
  r: number,
  g: number,
  b: number,
  a: number
const hsvaComputed = computed<HSVA | null>(() => {
  const currentValue = displayedValue.value
  const currentMode = valueMode.value
  if (!currentValue || !currentMode) return null
  return safeParseColor(() => {
    switch (currentMode) {
      case 'hsv':
        return hsva(currentValue)
      case 'hsl':
        ;[_h, s, l, a] = hsla(currentValue)
        return [...hsl2hsv(_h, s, l), a]
      case 'rgb':
      case 'hex':
        ;[r, g, b, a] = rgba(currentValue)
        return [...rgb2hsv(r, g, b), a]
    }
  })
})
const rgbaComputed = computed<RGBA | null>(() => {
  const currentValue = displayedValue.value
  const currentMode = valueMode.value
  if (!currentValue || !currentMode) return null
  return safeParseColor(() => {
    switch (currentMode) {
      case 'rgb':
      case 'hex':
        return rgba(currentValue)
      case 'hsv':
        ;[_h, s, v, a] = hsva(currentValue)
        return [...hsv2rgb(_h, s, v), a]
      case 'hsl':
        ;[_h, s, l, a] = hsla(currentValue)
        return [...hsl2rgb(_h, s, l), a]
    }
  })
})
const hslaComputed = computed<HSLA | null>(() => {
  const currentValue = displayedValue.value
  const currentMode = valueMode.value
  if (!currentValue || !currentMode) return null
  return safeParseColor(() => {
    switch (currentMode) {
      case 'hsl':
        return hsla(currentValue)
      case 'hsv':
        ;[_h, s, v, a] = hsva(currentValue)
        return [...hsv2hsl(_h, s, v), a]
      case 'rgb':
      case 'hex':
        ;[r, g, b, a] = rgba(currentValue)
        return [...rgb2hsl(r, g, b), a]
    }
  })
})
const displayedValueArr = computed(() => {
  switch (displayedMode.value) {
    case 'rgb':
    case 'hex':
      return rgbaComputed.value
    case 'hsv':
      return hsvaComputed.value
    case 'hsl':
      return hslaComputed.value
  }
})
interface ParsedColor {
  value: string
  mode: ColorPickerMode | undefined
  legalValue: string
}
const parsedSwatches = computed<ParsedColor[]>(() =>
  props.swatches.map((value: string) => {
    const mode = getModeFromValue(value)
    return {
      value,
      mode,
      legalValue: normalizeColor(value, mode)
    }
  })
)
watch(
  () => props.value,
  (to) => {
    displayedValue.value = to
  }
)
// modes 运行时变动使当前模式失效时，收敛到首个可用模式：否则面板会停留在已被移除的模式上
// （输入框组与模式标签都还是旧模式）。空列表无可收敛目标，保持现状
// deep：使用方原地增删（如 splice / push）同样要收敛，仅换引用才监听会漏掉原地写法
watch(
  () => props.modes,
  (modes) => {
    if (!modes.length || modes.includes(displayedMode.value)) return
    displayedMode.value = modes[0]
  },
  { deep: true }
)
watch(
  () => [displayedMode.value, displayedValueArr.value],
  () => {
    if (displayedMode.value === 'hex') {
      hexValue.value = formatHexValue()
    } else {
      inputValueArr.value = formatInputValueArr()
    }
  },
  {
    immediate: true,
    deep: true
  }
)
watchEffect(() => {
  if (upcomingValue.value === undefined || upcomingValue.value !== displayedValue.value) {
    if (hsvaComputed.value) {
      displayedHue.value = hsvaComputed.value[0]
      displayedAlpha.value = hsvaComputed.value[3]
      displayedSv.value = [hsvaComputed.value[1], hsvaComputed.value[2]]
    }
  }
  upcomingValue.value = undefined
})
function onUpdateValue(value: string | undefined, updateSource: 'cursor' | 'input'): void {
  if (updateSource === 'cursor') {
    upcomingValue.value = value
  } else {
    upcomingValue.value = undefined
  }
  displayedValue.value = value
  emits('update:value', value)
}
function handleUpdateSv(s: number, v: number): void {
  const alpha = hsvaComputed.value ? hsvaComputed.value[3] : 1
  displayedSv.value = [s, v]
  switch (displayedMode.value) {
    case 'hsv':
      onUpdateValue((props.showAlpha ? toHsvaString : toHsvString)([displayedHue.value, s, v, alpha]), 'cursor')
      break
    case 'hsl':
      onUpdateValue(
        (props.showAlpha ? toHslaString : toHslString)([...hsv2hsl(displayedHue.value, s, v), alpha]),
        'cursor'
      )
      break
    case 'rgb':
      onUpdateValue(
        (props.showAlpha ? toRgbaString : toRgbString)([...hsv2rgb(displayedHue.value, s, v), alpha]),
        'cursor'
      )
      break
    case 'hex':
      onUpdateValue(
        (props.showAlpha ? toHexaString : toHexString)([...hsv2rgb(displayedHue.value, s, v), alpha]),
        'cursor'
      )
      break
  }
}
function handlePalletePointerDown(e: PointerEvent): void {
  if (!palleteRef.value) return
  // 捕获指针：移出元素后仍继续跟踪
  palleteRef.value.setPointerCapture(e.pointerId)
  document.addEventListener('pointermove', handlePalletePointerMove)
  document.addEventListener('pointerup', handlePalletePointerUp)
  document.addEventListener('pointercancel', handlePalletePointerUp)
  handlePalletePointerMove(e)
}
function handlePalletePointerMove(e: PointerEvent): void {
  if (!palleteRef.value) return
  const { width, height, left, bottom } = palleteRef.value.getBoundingClientRect()
  const newV = (bottom - e.clientY) / height
  const newS = (e.clientX - left) / width
  const normalizedNewS = 100 * (newS > 1 ? 1 : newS < 0 ? 0 : newS)
  const normalizedNewV = 100 * (newV > 1 ? 1 : newV < 0 ? 0 : newV)
  handleUpdateSv(normalizedNewS, normalizedNewV)
}
function handlePalletePointerUp(): void {
  document.removeEventListener('pointermove', handlePalletePointerMove)
  document.removeEventListener('pointerup', handlePalletePointerUp)
  document.removeEventListener('pointercancel', handlePalletePointerUp)
  emits('complete', displayedValue.value)
}
function handleUpdateHue(hue: number): void {
  displayedHue.value = hue
  // 无值时按纯色兜底，保证空值状态下色相同样可调
  const [, s, v, a] = hsvaComputed.value ?? [hue, 100, 100, 1]
  switch (displayedMode.value) {
    case 'hsv':
      onUpdateValue((props.showAlpha ? toHsvaString : toHsvString)([hue, s, v, a]), 'cursor')
      break
    case 'rgb':
      onUpdateValue((props.showAlpha ? toRgbaString : toRgbString)([...hsv2rgb(hue, s, v), a]), 'cursor')
      break
    case 'hex':
      onUpdateValue((props.showAlpha ? toHexaString : toHexString)([...hsv2rgb(hue, s, v), a]), 'cursor')
      break
    case 'hsl':
      onUpdateValue((props.showAlpha ? toHslaString : toHslString)([...hsv2hsl(hue, s, v), a]), 'cursor')
      break
  }
}
function handleHueSliderPointerDown(e: PointerEvent): void {
  if (!hueRailRef.value) return
  // 捕获指针：移出元素后仍继续跟踪
  hueRailRef.value.setPointerCapture(e.pointerId)
  document.addEventListener('pointermove', handleHueSliderPointerMove)
  document.addEventListener('pointerup', handleHueSliderPointerUp)
  document.addEventListener('pointercancel', handleHueSliderPointerUp)
  handleHueSliderPointerMove(e)
}
function normalizeHue(hue: number): number {
  hue = Math.round(hue)
  return hue >= 360 ? 359 : hue < 0 ? 0 : hue
}
function handleHueSliderPointerMove(e: PointerEvent): void {
  if (!hueRailRef.value) return
  const { width, left } = hueRailRef.value.getBoundingClientRect()
  const newHue = normalizeHue(((e.clientX - left - BORDER_RADIUS_NUM) / (width - HANDLE_SIZE_NUM)) * 360)
  handleUpdateHue(newHue)
}
function handleHueSliderPointerUp(): void {
  document.removeEventListener('pointermove', handleHueSliderPointerMove)
  document.removeEventListener('pointerup', handleHueSliderPointerUp)
  document.removeEventListener('pointercancel', handleHueSliderPointerUp)
  emits('complete', displayedValue.value)
}
function handleUpdateAlpha(alpha: number): void {
  // 拖拽期间父组件可能把值清空或改成非法色值：此时各解析结果均为 null，无颜色可写，忽略本次变更
  // （不能沿用非空断言，否则 pointermove 解构 null 会直接抛错）
  const hsvaValue = hsvaComputed.value
  const rgbaValue = rgbaComputed.value
  const hslaValue = hslaComputed.value
  if (!hsvaValue || !rgbaValue || !hslaValue) return
  switch (displayedMode.value) {
    case 'hsv':
      ;[_h, s, v] = hsvaValue
      onUpdateValue(toHsvaString([_h, s, v, alpha]), 'cursor')
      break
    case 'rgb':
      ;[r, g, b] = rgbaValue
      onUpdateValue(toRgbaString([r, g, b, alpha]), 'cursor')
      break
    case 'hex':
      ;[r, g, b] = rgbaValue
      onUpdateValue(toHexaString([r, g, b, alpha]), 'cursor')
      break
    case 'hsl':
      ;[_h, s, l] = hslaValue
      onUpdateValue(toHslaString([_h, s, l, alpha]), 'cursor')
      break
  }
  displayedAlpha.value = alpha
}
function handleAlphaSliderPointerDown(e: PointerEvent): void {
  if (!alphaRailRef.value) return
  // 空值态无颜色可调（也无手柄可拖），忽略指针事件：既不改值、也不在抬起时补发 complete
  if (!rgbaComputed.value) return
  // 捕获指针：移出元素后仍继续跟踪
  alphaRailRef.value.setPointerCapture(e.pointerId)
  document.addEventListener('pointermove', handleAlphaSliderPointerMove)
  document.addEventListener('pointerup', handleAlphaSliderPointerUp)
  document.addEventListener('pointercancel', handleAlphaSliderPointerUp)
  handleAlphaSliderPointerMove(e)
}
function normalizeAlpha(alpha: number): number {
  alpha = Math.round(alpha * 100) / 100
  return alpha > 1 ? 1 : alpha < 0 ? 0 : alpha
}
function handleAlphaSliderPointerMove(e: PointerEvent): void {
  if (!alphaRailRef.value) return
  const { width, left } = alphaRailRef.value.getBoundingClientRect()
  const newAlpha = normalizeAlpha((e.clientX - left - BORDER_RADIUS_NUM) / (width - HANDLE_SIZE_NUM))
  handleUpdateAlpha(newAlpha)
}
function handleAlphaSliderPointerUp(): void {
  document.removeEventListener('pointermove', handleAlphaSliderPointerMove)
  document.removeEventListener('pointerup', handleAlphaSliderPointerUp)
  document.removeEventListener('pointercancel', handleAlphaSliderPointerUp)
  emits('complete', displayedValue.value)
}
// 卸载时统一清理拖拽残留的全局指针监听与外点监听
onBeforeUnmount(() => {
  document.removeEventListener('pointermove', handlePalletePointerMove)
  document.removeEventListener('pointerup', handlePalletePointerUp)
  document.removeEventListener('pointercancel', handlePalletePointerUp)
  document.removeEventListener('pointermove', handleHueSliderPointerMove)
  document.removeEventListener('pointerup', handleHueSliderPointerUp)
  document.removeEventListener('pointercancel', handleHueSliderPointerUp)
  document.removeEventListener('pointermove', handleAlphaSliderPointerMove)
  document.removeEventListener('pointerup', handleAlphaSliderPointerUp)
  document.removeEventListener('pointercancel', handleAlphaSliderPointerUp)
  detachDocumentListener()
})
function getModeFromValue(color: string | undefined): ColorPickerMode | undefined {
  if (color === undefined) return undefined
  if (/^ *#/.test(color)) return 'hex'
  if (color.includes('rgb')) return 'rgb'
  if (color.includes('hsl')) return 'hsl'
  if (color.includes('hsv')) return 'hsv'
  return undefined
}
// 解析失败的色值（如 CSS4 带 alpha 的 hsl()）会抛错：兜底为 null，让调用方按「空值」降级
function safeParseColor<T>(parse: () => T): T | null {
  try {
    return parse()
  } catch {
    return null
  }
}
/* 浮层交互：Popup（宿主）只按 show 渲染，点击开合 / 外点关闭 / Esc / 键盘可达由本组件接管 */
// 显隐的统一入口：禁用拦截 + 幂等（受控时以父组件回传为准，非受控时组件自持）
function requestOpen(next: boolean): void {
  if (props.disabled || panelOpen.value === next) return
  open.value = next
}
// 外壳点击：内置触发器与自定义触发器内容都渲染在外壳内部，点击由外壳统一接管；
// 面板就地渲染（to: false）时其 DOM 也在外壳内，故需排除面板内部的点击（拖拽指针 / 输入框聚焦等）
function onWrapperClick(event: MouseEvent): void {
  const target = event.target as Node | null
  if (!target) return
  if (popupRef.value?.panelRef?.contains(target)) return
  requestOpen(!panelOpen.value)
}
// 键盘可达：Enter / Space 与点击同语义（展开 / 收起）；面板内的按键留给面板内容（如色板的 Enter 选色）
function onWrapperKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Enter' && event.key !== ' ') return
  const target = event.target as Node | null
  if (target && popupRef.value?.panelRef?.contains(target)) return
  event.preventDefault()
  requestOpen(!panelOpen.value)
}
let documentListenerAttached = false // 外部点击监听是否已注册，确保注册与移除一一对应
function attachDocumentListener(): void {
  if (documentListenerAttached || typeof document === 'undefined') return
  document.addEventListener('click', handleDocumentClick, true)
  documentListenerAttached = true
}
function detachDocumentListener(): void {
  if (!documentListenerAttached || typeof document === 'undefined') return
  document.removeEventListener('click', handleDocumentClick, true)
  documentListenerAttached = false
}
// 触发器与面板内部都不关闭，其余视为外部点击（capture 阶段：不与面板内的拖拽冒泡链耦合）
function handleDocumentClick(event: MouseEvent): void {
  const target = event.target as Node | null
  if (!target) return
  if (wrapperRef.value?.contains(target) || popupRef.value?.panelRef?.contains(target)) return
  requestOpen(false)
}
watch(
  () => panelOpen.value,
  (next) => {
    if (next) {
      attachDocumentListener()
      // 展开时把焦点交给面板容器：面板内的键盘操作（Esc 收起）与读屏器进入 dialog 语义都依赖它
      nextTick(() => popupRef.value?.panelRef?.focus({ preventScroll: true }))
      return
    }
    detachDocumentListener()
  },
  { immediate: true }
)
// openChange 即「展开状态变化」通知：内部开合与受控 open 被外部改值统一由此派发；
// 状态未变时不派发（天然幂等），也不随 disabled 拦截而误报
watch(panelOpen, (next) => {
  emits('openChange', next)
})
// Esc 收起并把焦点交还触发区（键盘操作不因收起而丢失落点）
function onEscKeydown(): void {
  if (!panelOpen.value) return
  requestOpen(false)
  wrapperRef.value?.focus({ preventScroll: true })
}
// 非受控时的初始显隐：父组件未传 open 时套用 defaultOpen（受控时交由父组件决定）
if (props.defaultOpen && open.value === undefined && !props.disabled) {
  open.value = true
}
// 触发器展示内容：label 函数可返回字符串或 VNode，未提供时直接展示颜色值
function renderLabelContent(): VNodeChild {
  const { label } = props
  const color = displayedValue.value
  if (label && color !== undefined) return label(color)
  return color ?? ''
}
function onUpdateMode(): void {
  const { modes } = props
  // 无可切换的模式：保持现状
  if (!modes.length) return
  const currentModeIndex = modes.findIndex((mode) => mode === displayedMode.value)
  // 当前模式不在 modes 中时索引为 -1，取模后正好落到首个可用模式；
  // 若写死 'rgb'，使用方自定义 modes 不含 rgb 时切换器会停在不可用模式上、点击无反应
  displayedMode.value = modes[(currentModeIndex + 1) % modes.length]
}
function handleColorInputChange(e: Event): void {
  const target = e.target as HTMLInputElement
  const color = convertColor(target.value.toUpperCase(), displayedMode.value, 'hex')
  // 原生取色器只会给出合法 hex：转换失败时忽略本次变更，不写入组件值
  if (color === undefined) return
  onUpdateValue(color, 'input')
}
function normalizeHexaUnit(value: string): boolean {
  const trimmedValue = value.trim()
  if (/^#[0-9a-fA-F]+$/.test(trimmedValue)) {
    return [4, 5, 7, 9].includes(trimmedValue.length)
  }
  return false
}
// 0 - 360
function normalizeHueUnit(value: string): number | false {
  if (/^\d{1,3}\.?\d*$/.test(value.trim())) {
    return Math.max(0, Math.min(Number.parseInt(value), 360))
  }
  return false
}
// 0 - 100
function normalizeSlvUnit(value: string): number | false {
  if (/^\d{1,3}\.?\d*$/.test(value.trim())) {
    return Math.max(0, Math.min(Number.parseInt(value), 100))
  }
  return false
}
// 0 - 100%，换算为 0 - 1
function normalizeAlphaUnit(value: string): number | false {
  if (/^\d{1,3}\.?\d*%$/.test(value.trim())) {
    return Math.max(0, Math.min(Number.parseInt(value) / 100, 1))
  }
  return false
}
// 0 - 255
function normalizeRgbUnit(value: string): number | false {
  if (/^\d{1,3}\.?\d*$/.test(value.trim())) {
    return Math.max(0, Math.min(Number.parseInt(value), 255))
  }
  return false
}
// 组件内部值 → 输入框显示串（alpha 通道按百分比显示）
function formatInputValueArr(): string[] {
  const valueArr = displayedValueArr.value
  if (!valueArr) return new Array(props.showAlpha ? 4 : 3).fill(undefined)
  return valueArr.map((value: number, index: number) =>
    props.showAlpha && index === 3 ? `${Math.floor(value * 100)}%` : `${Math.floor(value)}`
  )
}
// 组件内部值 → hex 输入框显示串
function formatHexValue(): string | undefined {
  const valueArr = displayedValueArr.value
  return valueArr ? (props.showAlpha ? toHexaString : toHexString)(valueArr as RGBA) : undefined
}
// 非法输入：回滚为组件内部值，并重建输入框以清掉其自身状态
function restoreInput(): void {
  hexValue.value = formatHexValue()
  inputValueArr.value = formatInputValueArr()
  inputRefreshKey.value += 1
}
function handleInputUpdateValue(value: string): void {
  const previousValue = displayedValue.value
  onUpdateValue(value, 'input')
  emits('complete', value)
  // 收敛后的值可能与原值相同（如 alpha 输入 300% → 100%），输入框收不到新 props 不会刷新，
  // 故主动回滚文本，保证「输入框文本 ≡ 内部值」
  if (displayedValue.value === previousValue) restoreInput()
}
function handleUnitUpdateValue(index: number, value: number | string) {
  if (displayedMode.value === 'hex') {
    handleInputUpdateValue((props.showAlpha ? toHexaString : toHexString)(value as string))
    return
  }
  const nextValueArr: number[] = displayedValueArr.value ? [...displayedValueArr.value] : [0, 0, 0, 0]
  nextValueArr[index] = value as number
  switch (displayedMode.value) {
    case 'hsv':
      handleInputUpdateValue((props.showAlpha ? toHsvaString : toHsvString)(nextValueArr as HSVA | HSV))
      break
    case 'rgb':
      handleInputUpdateValue((props.showAlpha ? toRgbaString : toRgbString)(nextValueArr as RGBA | RGB))
      break
    case 'hsl':
      handleInputUpdateValue((props.showAlpha ? toHslaString : toHslString)(nextValueArr as HSLA | HSL))
      break
  }
}
function handleInputChange(e: Event, index: number): void {
  const target = e.target as HTMLInputElement
  const value = target.value
  const mode = index === undefined ? displayedModeComputed.value : displayedModeComputed.value[index]
  let unit: number | false
  switch (mode) {
    case 'HEX':
    case 'HEXA':
      if (normalizeHexaUnit(value)) {
        handleUnitUpdateValue(0, value)
      } else {
        restoreInput()
      }
      break
    case 'H':
      unit = normalizeHueUnit(value)
      if (unit === false) {
        restoreInput()
      } else {
        handleUnitUpdateValue(index, unit)
      }
      break
    case 'S':
    case 'L':
    case 'V':
      unit = normalizeSlvUnit(value)
      if (unit === false) {
        restoreInput()
      } else {
        handleUnitUpdateValue(index, unit)
      }
      break
    case 'A':
      unit = normalizeAlphaUnit(value)
      if (unit === false) {
        restoreInput()
      } else {
        handleUnitUpdateValue(index, unit)
      }
      break
    case 'R':
    case 'G':
    case 'B':
      unit = normalizeRgbUnit(value)
      if (unit === false) {
        restoreInput()
      } else {
        handleUnitUpdateValue(index, unit)
      }
      break
  }
}
// 色板底色归一化：hsv 预设不是浏览器可识别的 CSS 颜色，转为等价的 rgba 串；
// 其余模式与颜色名本身合法，保持原值（输出时再按当前模式格式化）
function normalizeColor(color: string, mode: ColorPickerMode | undefined): string {
  if (mode === 'hsv') {
    const hsvValue = safeParseColor(() => hsva(color))
    // 无法解析时保留原值：底色交给浏览器按非法 CSS 处理，点击该色板也不会写入组件值
    if (!hsvValue) return color
    const [h, s, v, a] = hsvValue
    return toRgbaString([...hsv2rgb(h, s, v), a])
  }
  return color
}
function getHexFromName(color: string): string {
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) {
    return '#000000'
  }
  ctx.fillStyle = color
  return ctx.fillStyle
}
function convertColor(
  value: string,
  mode: ColorPickerMode,
  originalMode?: ColorPickerMode | undefined
): string | undefined {
  originalMode = originalMode || getModeFromValue(value)
  if (!originalMode) return undefined
  if (originalMode === mode) return value
  const convert = {
    rgb: {
      hex(value: string): string {
        return toHexaString(rgba(value))
      },
      hsl(value: string): string {
        const [r, g, b, a] = rgba(value)
        return toHslaString([...rgb2hsl(r, g, b), a])
      },
      hsv(value: string): string {
        const [r, g, b, a] = rgba(value)
        return toHsvaString([...rgb2hsv(r, g, b), a])
      }
    },
    hex: {
      rgb(value: string): string {
        return toRgbaString(rgba(value))
      },
      hsl(value: string): string {
        const [r, g, b, a] = rgba(value)
        return toHslaString([...rgb2hsl(r, g, b), a])
      },
      hsv(value: string): string {
        const [r, g, b, a] = rgba(value)
        return toHsvaString([...rgb2hsv(r, g, b), a])
      }
    },
    hsl: {
      hex(value: string): string {
        const [h, s, l, a] = hsla(value)
        return toHexaString([...hsl2rgb(h, s, l), a])
      },
      rgb(value: string): string {
        const [h, s, l, a] = hsla(value)
        return toRgbaString([...hsl2rgb(h, s, l), a])
      },
      hsv(value: string): string {
        const [h, s, l, a] = hsla(value)
        return toHsvaString([...hsl2hsv(h, s, l), a])
      }
    },
    hsv: {
      hex(value: string): string {
        const [h, s, v, a] = hsva(value)
        return toHexaString([...hsv2rgb(h, s, v), a])
      },
      rgb(value: string) {
        const [h, s, v, a] = hsva(value)
        return toRgbaString([...hsv2rgb(h, s, v), a])
      },
      hsl(value: string): string {
        const [h, s, v, a] = hsva(value)
        return toHslaString([...hsv2hsl(h, s, v), a])
      }
    }
  }
  const conversions = convert[originalMode] as Record<string, (value: string) => string>
  // 非法色值会让转换抛错：兜底为 undefined（调用方按「无法转换」处理）
  return safeParseColor(() => conversions[mode](value)) ?? undefined
}
function normalizeOutput(parsed: ParsedColor): string | undefined {
  let { value, mode: swatchColorMode } = parsed
  // 色板未标注模式：按 hex 处理，颜色名（如 red）先换算为等价的 hex
  if (!swatchColorMode) {
    swatchColorMode = 'hex'
    // 颜色名未必合法（如拼错的色名）：canvas 对非法值会静默沿用默认黑色，
    // 故先用 tinycolor 判合法，非法色板一律忽略并提示使用方（与文档口径一致）
    if (/^[a-zA-Z]+$/.test(value) && new TinyColor(value).isValid) {
      value = getHexFromName(value)
    } else {
      log('warn', 'ColorPicker', `色板中的颜色 ${value} 无效，已忽略该色板`)
      return undefined
    }
  }
  if (swatchColorMode === displayedMode.value) return value
  // 色板值与该模式不同源，转换为当前模式的输出
  return convertColor(value, displayedMode.value, swatchColorMode)
}
function onSwatch(swatch: ParsedColor): void {
  const swatchValue = normalizeOutput(swatch)
  // 无法转换的色板（非法色值）忽略本次选择，不写入组件值
  if (swatchValue === undefined) return
  onUpdateValue(swatchValue, 'input')
}
function onConfirm() {
  emits('confirm', displayedValue.value)
  requestOpen(false)
}
function onClear() {
  onUpdateValue(undefined, 'input')
  emits('clear')
  requestOpen(false)
}
</script>
<template>
  <!-- 外壳即触发区：点击开合、面板锚点与外点判定范围都由它承担；
       透传属性（class / style / id / 事件等）自动落到外壳这一处，面板定制走 panelClass / panelStyle -->
  <div
    ref="wrapperRef"
    class="color-picker"
    :class="{ 'color-picker-custom-trigger': showTrigger }"
    :style="wrapperStyle"
    :role="showTrigger ? 'button' : undefined"
    :tabindex="showTrigger ? 0 : -1"
    :aria-haspopup="showTrigger ? 'dialog' : undefined"
    :aria-expanded="showTrigger ? panelExpanded : undefined"
    @click="onWrapperClick"
    @keydown="onWrapperKeydown"
    @keydown.esc="onEscKeydown"
  >
    <!-- 浮层宿主承担 Teleport / 定位 / 翻转自适应 / 层级 / 过渡 / 字体承接；
         面板级监听经宿主的 $attrs 落到面板上（宿主根节点是 Teleport，需显式透传） -->
    <Popup
      ref="popupRef"
      :show="panelOpen && !disabled"
      :to="to"
      :anchor="wrapperRef"
      :placement="placement"
      :offset="offset"
      :panel-class="mergedPanelClass"
      :panel-style="{ ...panelStyle, ...themeVars }"
      :z-index="zIndex"
      :default-z-index="FLOATING_LAYER_Z_INDEX.select"
      :destroy-on-hide="destroyOnHide"
      :transition-props="panelTransitionProps"
      @keydown.esc="onEscKeydown"
    >
      <div
        class="color-picker-panel"
        :class="{ 'panel-with-actions': actions.length }"
        role="dialog"
        aria-label="颜色选择器"
        tabindex="-1"
      >
        <div ref="palleteRef" class="color-picker-pallete" @pointerdown="handlePalletePointerDown">
          <div
            class="color-picker-pallete-layer"
            :style="{ backgroundImage: `linear-gradient(90deg, white, hsl(${displayedHue}, 100%, 50%))` }"
          ></div>
          <div
            class="color-picker-pallete-layer pallete-layer-shadowed"
            style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))"
          ></div>
          <div class="color-picker-handle" :style="layerHandleStyle">
            <div class="color-picker-handle-fill" :style="layerHandleFillStyle"></div>
          </div>
        </div>
        <div class="color-picker-preview">
          <div class="color-picker-preview-sliders">
            <div class="color-picker-slider" :style="sliderStyle">
              <div ref="hueRailRef" :style="sliderRailStyle" @pointerdown="handleHueSliderPointerDown">
                <div
                  :style="`position: absolute; top: 0px; bottom: 0; left: ${BORDER_RADIUS}; right: ${BORDER_RADIUS}`"
                >
                  <div class="color-picker-handle" :style="sliderColorHandleStyle">
                    <div class="color-picker-handle-fill" :style="sliderColorHandleFillStyle"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="showAlpha"
              ref="alphaRailRef"
              class="color-picker-slider"
              :class="{ 'slider-empty': !rgbaComputed }"
              :style="sliderStyle"
              @pointerdown="handleAlphaSliderPointerDown"
            >
              <div
                :style="`
                    border-radius: ${BORDER_RADIUS};
                    position: absolute;
                    top: 0px;
                    bottom: 0;
                    left: 0px;
                    right: 0px;
                    overflow: hidden;
                  `"
              >
                <div class="color-picker-checkboard"></div>
                <div class="color-picker-slider-image" :style="`background-image: ${alphaRailBackgroundImage}`"></div>
              </div>
              <div
                v-if="rgbaComputed"
                :style="`position: absolute; top: 0px; bottom: 0; left: ${BORDER_RADIUS}; right: ${BORDER_RADIUS}`"
              >
                <div class="color-picker-handle" :style="sliderAlphaHandleStyle">
                  <div class="color-picker-handle-fill" :style="sliderAlphaHandleFillStyle"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showPreview" class="color-picker-preview-circle">
            <span class="color-picker-circle-fill" :style="`background: ${circleColor || '#000000'};`"></span>
            <input
              class="color-picker-circle-input"
              type="color"
              :value="circleColor || '#000000'"
              @change.stop="handleColorInputChange"
            />
          </div>
        </div>
        <div class="color-picker-input">
          <div
            class="color-picker-input-mode"
            :style="{ cursor: modes.length <= 1 ? '' : 'pointer' }"
            @click="onUpdateMode"
          >
            {{ displayedModeComputed }}
          </div>
          <div class="color-picker-input-group">
            <template v-if="displayedMode === 'hex'">
              <Input
                size="small"
                :key="`hex-${inputRefreshKey}`"
                :placeholder="displayedModeComputed"
                v-model:value.lazy="hexValue"
                @change="handleInputChange"
                v-bind="inputProps"
              />
            </template>
            <template v-else>
              <Input
                size="small"
                :style="`${val === 'A' ? 'flex-grow: 1.25' : ''}`"
                v-for="(val, index) in displayedModeComputedArr"
                :key="`${index}-${inputRefreshKey}`"
                :placeholder="val"
                v-model:value.lazy="inputValueArr[index]"
                @change="handleInputChange($event, index)"
                v-bind="inputProps"
              />
            </template>
          </div>
        </div>
        <div v-if="parsedSwatches.length" class="color-picker-swatches">
          <!-- 色板可聚焦：Enter 选色与鼠标点击等效，保证键盘可达；
               role / aria-label 让读屏器把色板识别为按钮并播报其色值 -->
          <div
            tabindex="0"
            role="button"
            :aria-label="swatch.value"
            class="color-picker-swatch"
            v-for="(swatch, index) in parsedSwatches"
            :key="index"
            @click="onSwatch(swatch)"
            @keydown.enter="onSwatch(swatch)"
          >
            <div class="color-picker-swatch-fill" :style="`background: ${swatch.legalValue};`"></div>
          </div>
        </div>
      </div>
      <div v-if="actions.length" class="color-picker-actions">
        <Button v-if="actions.includes('confirm')" type="primary" size="small" @click="onConfirm">确认</Button>
        <Button v-if="actions.includes('clear')" size="small" @click="onClear">清除</Button>
      </div>
      <div v-if="showFooter" class="color-picker-footer">
        <slot name="footer">{{ footer }}</slot>
      </div>
    </Popup>
    <!-- 自定义触发器：内容渲染在外壳内部，点击开合、锚点定位与外点判定均由外壳接管 -->
    <slot v-if="showTrigger" name="trigger" v-bind="triggerSlotProps" />
    <!-- 内置触发器：尺寸由外壳给定（width / height 内联在外壳上），展示区撑满外壳 -->
    <div
      v-else
      class="color-picker-display"
      :class="[`color-picker-${size}`, { 'color-picker-disabled': disabled }]"
      :style="displayStyle"
      role="button"
      tabindex="0"
      aria-haspopup="dialog"
      :aria-expanded="panelExpanded"
    >
      <div class="color-picker-wrap">
        <div class="color-picker-fill">
          <div class="color-picker-checkboard"></div>
          <div
            :style="`position: absolute; left: 0; right: 0; top: 0; bottom: 0; background-color: ${hslaComputed ? toHslaString(hslaComputed) : ''};`"
          ></div>
          <div v-if="displayedValue && hslaComputed" class="color-picker-value" :style="{ color: labelColor }">
            <slot name="label" :color="displayedValue">
              <component :is="renderLabelContent" />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.color-picker-panel {
  padding: 12px;
  .color-picker-pallete {
    height: 180px;
    position: relative;
    margin-bottom: 8px;
    cursor: crosshair;
    touch-action: none;
    .color-picker-pallete-layer {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    .pallete-layer-shadowed {
      box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, 0.24);
    }
  }
  .color-picker-preview {
    display: flex;
    .color-picker-preview-sliders {
      flex: 1 0 auto;
      .color-picker-slider {
        margin-bottom: 8px;
        position: relative;
        cursor: pointer;
        touch-action: none;
        // 空值态不可交互的轨道（alpha）回落为默认箭头，避免误示「可拖动」
        &.slider-empty {
          cursor: default;
        }
        &::after {
          content: '';
          position: absolute;
          border-radius: inherit;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, 0.24);
          pointer-events: none;
        }
        .color-picker-checkboard {
          background: white;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          &::after {
            background-image:
              linear-gradient(45deg, #ddd 25%, #0000 25%), linear-gradient(-45deg, #ddd 25%, #0000 25%),
              linear-gradient(45deg, #0000 75%, #ddd 75%), linear-gradient(-45deg, #0000 75%, #ddd 75%);
            background-size: 12px 12px;
            background-position:
              0 0,
              0 6px,
              6px -6px,
              -6px 0px;
            background-repeat: repeat;
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
          }
        }
        .color-picker-slider-image {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }
      }
    }
    .color-picker-preview-circle {
      position: relative;
      height: 30px;
      width: 30px;
      margin: 0 0 8px 6px;
      border-radius: 50%;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
      overflow: hidden;
      .color-picker-circle-fill {
        display: block;
        width: 30px;
        height: 30px;
      }
      .color-picker-circle-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        opacity: 0;
        z-index: 1;
      }
    }
  }
  .color-picker-handle {
    z-index: 1;
    box-shadow: 0 0 2px 0 var(--va-text-color-3);
    position: absolute;
    background-color: white;
    overflow: hidden;
    .color-picker-handle-fill {
      border: 2px solid white;
    }
  }
  .color-picker-input {
    display: flex;
    align-items: center;
    .color-picker-input-mode {
      width: 72px;
      text-align: center;
    }
    .color-picker-input-group {
      display: inline-flex;
      width: 100%;
      flex-wrap: nowrap;
      vertical-align: bottom;
      :deep(.input-wrap) {
        flex-grow: 1;
        flex-basis: 0;
        &:not(:first-child) {
          margin-left: -1px;
          .input-container {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
        &:not(:last-child) {
          .input-container {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
        .input-container {
          padding: 1px 4px;
        }
        .input-item {
          text-align: center;
        }
      }
    }
  }
  .color-picker-swatches {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    position: relative;
    margin-top: 10px;
    .color-picker-swatch {
      width: 18px;
      height: 18px;
      background-image:
        linear-gradient(45deg, #ddd 25%, #0000 25%), linear-gradient(-45deg, #ddd 25%, #0000 25%),
        linear-gradient(45deg, #0000 75%, #ddd 75%), linear-gradient(-45deg, #0000 75%, #ddd 75%);
      background-size: 8px 8px;
      background-position:
        0px 0,
        0px 4px,
        4px -4px,
        -4px 0px;
      background-repeat: repeat;
      .color-picker-swatch-fill {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
        cursor: pointer;
      }
      &:focus {
        outline: none;
        .color-picker-swatch-fill::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: inherit;
          filter: blur(2px);
          content: '';
        }
      }
    }
  }
}
.panel-with-actions {
  padding-bottom: 8px;
}
.color-picker-actions {
  display: flex;
  gap: 8px;
  border-top: 1px solid var(--va-border-split-color);
  padding: 8px 12px;
  justify-content: flex-end;
}
.color-picker-footer {
  border-top: 1px solid var(--va-border-split-color);
  padding: 8px 12px;
}
/* 外壳：透传属性（含 style）的落点，也是浮层锚点与外点判定范围。
   外壳只作编程式聚焦落点（Esc 收起后回焦），故不绘制浏览器默认焦点环 ——
   聚焦指示由内部可交互元素（.color-picker-display）承担 */
.color-picker {
  display: inline-block;
  outline: none;
  /* 自定义触发器内容由使用者传入，外壳给出本组件默认字号（正文基准 14px），不依赖宿主继承；
     内置触发器的文本字号由 .color-picker-value 按尺寸档位覆盖 */
  font-size: 14px;
}
/* 自定义触发器形态：随内容自适应宽度，并避开行盒支柱把块级触发器（如色块圆点）顶偏 */
.color-picker-custom-trigger {
  display: inline-flex;
  outline: none;
}
.color-picker-display {
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  position: relative;
  outline: none;
  &:not(.color-picker-disabled):hover {
    .color-picker-wrap {
      border-color: var(--va-cp-color-picker-primary-color-hover, var(--va-primary-color-hover));
    }
  }
  /* 聚焦视觉与库内 Input 同构：边框转主色 + 2px 浅色阴影环；
     展开期间焦点已交给面板容器（键盘 / 读屏需要），故以 aria-expanded 复用同一套视觉，
     让「点击展开」也保持与聚焦一致的反馈 */
  &:not(.color-picker-disabled):focus,
  &[aria-expanded='true'] {
    .color-picker-wrap {
      border-color: var(--va-cp-color-picker-primary-color, var(--va-primary-color));
      box-shadow: 0 0 0 2px
        var(--color-picker-primary-shadow-color, var(--va-cp-color-picker-primary-bg-color, var(--va-primary-bg-color)));
    }
  }
  .color-picker-wrap {
    height: 100%;
    cursor: pointer;
    border: 1px solid var(--va-border-color);
    border-radius: 4px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    .color-picker-fill {
      position: absolute;
      left: 4px;
      right: 4px;
      top: 4px;
      bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      .color-picker-checkboard {
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        &::after {
          background-image:
            linear-gradient(45deg, #ddd 25%, #0000 25%), linear-gradient(-45deg, #ddd 25%, #0000 25%),
            linear-gradient(45deg, #0000 75%, #ddd 75%), linear-gradient(-45deg, #0000 75%, #ddd 75%);
          background-size: calc(var(--color-picker-block-size) * 2) calc(var(--color-picker-block-size) * 2);
          background-position:
            0 0,
            0 var(--color-picker-block-size),
            var(--color-picker-block-size) calc(-1 * var(--color-picker-block-size)),
            calc(-1 * var(--color-picker-block-size)) 0px;
          background-repeat: repeat;
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }
      }
      .color-picker-value {
        white-space: nowrap;
        position: relative;
        font-size: 14px;
        line-height: 1.7142857142857142;
      }
    }
  }
}
.color-picker-small {
  .color-picker-wrap {
    .color-picker-fill {
      left: 3px;
      right: 3px;
      top: 3px;
      bottom: 3px;
      .color-picker-value {
        line-height: 1.2857142857142858;
      }
    }
  }
}
.color-picker-large {
  .color-picker-wrap {
    .color-picker-fill {
      left: 5px;
      right: 5px;
      top: 5px;
      bottom: 5px;
      .color-picker-value {
        font-size: 16px;
        line-height: 1.875;
      }
    }
  }
}
.color-picker-disabled {
  cursor: not-allowed;
  // 内层 wrap 铺满整个展示区且自带 pointer，需一并覆盖，否则悬浮在内层仍是小手
  .color-picker-wrap {
    cursor: not-allowed;
  }
}
</style>
<style lang="less">
/* 面板皮肤与动画必须留在全局：前者作用于 <Popup> 宿主编译出的面板节点（scope id 属宿主），
   后者由 <Transition> 的类名落在同一个节点上；且 Teleport 到 body 后不在本组件 DOM 子树内，
   scoped 与 :deep() 均选不中。收口口径：① 面板几何以 .color-picker-panel-container 收口；
   ② 动画类与关键帧统一加 `color-picker-` 前缀，避免与宿主页面撞名 */
.color-picker-panel-container {
  width: 240px;
  padding: 0;
  /* 字号：面板属「浮层面板」容器，由面板根声明正文基准字号（见 development/component-design.md §字体口径）。
     不声明则面板内自绘文本会跟随宿主页面字号（文档站 `html` 为 16px），模式标签与页脚被整体放大 */
  font-size: 14px;
  color: var(--va-text-color-1);
  // 面板是浮层：底取 elevated，
  // 既避免写死 #fff 造成暗色白底白字，也保证与容器（#141414）拉开层级
  background-color: var(--va-bg-elevated-color);
  border-radius: 4px;
  box-shadow:
    0 6px 16px 0 var(--va-shadow-color),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  outline: none;
}
/* 展开 / 收起的缩放原点由 <Popup> 按实际方位写在面板上，故这里只保留一条与方位无关的动效：
   按方位取名会让首帧取到兜底方向（实际方位到插入首帧才回填），首次展开方向就反了 */
.color-picker-zoom-enter-active,
.color-picker-zoom-leave-active {
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.color-picker-zoom-enter-active {
  animation-name: colorPickerZoomIn;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
.color-picker-zoom-leave-active {
  animation-name: colorPickerZoomOut;
  animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
}
.color-picker-zoom-enter-from,
.color-picker-zoom-leave-to {
  opacity: 0;
}
/* 关键帧只驱动 transform 与 opacity：缩放原点由 <Popup> 写在面板元素上，
   写进关键帧会覆盖元素上的取值；起始缩放 0.9 与「展开 ease-out / 收起 ease-in」为同一套过渡参数 */
@keyframes colorPickerZoomIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes colorPickerZoomOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
