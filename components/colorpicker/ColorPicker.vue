<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'
import type { CSSProperties } from 'vue'
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
import Tooltip from 'components/tooltip'
import Input from 'components/input'
import Button from 'components/button'
import { useSlotsExist, useInject } from 'components/utils'
export type ColorPickerMode = 'rgb' | 'hsl' | 'hsv' | 'hex'
export type ColorPickerAction = 'confirm' | 'clear'
export interface Props {
  width?: string | number // 颜色选择器的宽度，单位 px
  label?: (color: string) => string // 展示的内容 function | slot
  tooltipStyle?: CSSProperties // 设置弹出面板的样式
  inputProps?: object // 输入框组件 props，参考 Input 组件 Props
  showAlpha?: boolean // 是否可调节 alpha 通道
  showPreview?: boolean // 是否展示颜色预览块
  size?: 'small' | 'middle' | 'large' // 颜色选择器的尺寸
  disabled?: boolean // 是否禁用
  value?: string // (v-model) 颜色选择器的值
  modes?: ColorPickerMode[] // 颜色选择器支持颜色的格式
  swatches?: string[] // 色板的值
  actions?: ColorPickerAction[] // 显示按钮
  footer?: string // 底部额外的页脚内容 string | slot
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  label: undefined,
  tooltipStyle: () => ({}),
  inputProps: () => ({}),
  showAlpha: true,
  showPreview: false,
  size: 'middle',
  disabled: false,
  value: undefined,
  modes: () => ['rgb', 'hex', 'hsl'],
  swatches: () => [],
  actions: () => [],
  footer: undefined
})
const HANDLE_SIZE = '12px'
const HANDLE_SIZE_NUM = 12
const BORDER_RADIUS = '6px'
const BORDER_RADIUS_NUM = 6
const tooltipRef = ref() // tooltip 模板引用
const palleteRef = ref<HTMLElement | null>(null) // pallete 调色板模板引用
const hueRailRef = ref<HTMLElement | null>(null) // hue 轨道条模板引用
const alphaRailRef = ref<HTMLElement | null>(null) // alpha 轨道条模板引用
const displayedHue = ref<number>(0)
const displayedAlpha = ref<number>(1)
const displayedSv = ref<[number, number]>([0, 0])
const upcomingValue = ref<string | undefined>()
const displayedValue = ref<string | undefined>(props.value) // 展示的值
const displayedMode = ref<ColorPickerMode>(getModeFromValue(displayedValue.value) || props.modes[0] || 'rgb') // 当前展示的 mode
const hexValue = ref<string>() // hex 模式下输入框的绑定值
const inputValueArr = ref<string[]>([]) // 非 hex 模式下多个输入框的绑定值
const { colorPalettes, shadowColor } = useInject('ColorPicker') // 主题色注入
const emits = defineEmits(['update:value', 'complete', 'confirm', 'clear'])
const slotsFooterExist = useSlotsExist('footer')
const showFooter = computed(() => {
  return slotsFooterExist.value || props.footer
})
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
    borderRadius: BORDER_RADIUS
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
const colorPickerBlockSize = computed(() => {
  const gapMap = {
    small: 6,
    middle: 8,
    large: 10
  }
  return `calc((${colorPickerHeight.value} - ${gapMap[props.size]}px) / 3)`
})
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
  if (!displayedValue.value) return null
  switch (valueMode.value!) {
    case 'hsv':
      return hsva(displayedValue.value)
    case 'hsl':
      ;[_h, s, l, a] = hsla(displayedValue.value)
      return [...hsl2hsv(_h, s, l), a]
    case 'rgb':
    case 'hex':
      ;[r, g, b, a] = rgba(displayedValue.value)
      return [...rgb2hsv(r, g, b), a]
  }
})
const rgbaComputed = computed<RGBA | null>(() => {
  if (!displayedValue.value) return null
  switch (valueMode.value!) {
    case 'rgb':
    case 'hex':
      return rgba(displayedValue.value)
    case 'hsv':
      ;[_h, s, v, a] = hsva(displayedValue.value)
      return [...hsv2rgb(_h, s, v), a]
    case 'hsl':
      ;[_h, s, l, a] = hsla(displayedValue.value)
      return [...hsl2rgb(_h, s, l), a]
  }
})
const hslaComputed = computed<HSLA | null>(() => {
  if (!displayedValue.value) return null
  switch (valueMode.value!) {
    case 'hsl':
      return hsla(displayedValue.value)
    case 'hsv':
      ;[_h, s, v, a] = hsva(displayedValue.value)
      return [...hsv2hsl(_h, s, v), a]
    case 'rgb':
    case 'hex':
      ;[r, g, b, a] = rgba(displayedValue.value)
      return [...rgb2hsl(r, g, b), a]
  }
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
watch(
  () => [displayedMode.value, displayedValueArr.value],
  () => {
    if (displayedMode.value === 'hex') {
      hexValue.value =
        displayedValueArr.value === null
          ? undefined
          : (props.showAlpha ? toHexaString : toHexString)(displayedValueArr.value as RGBA)
    } else {
      if (displayedValueArr.value === null) {
        inputValueArr.value = new Array(props.showAlpha ? 4 : 3).fill(undefined)
      } else {
        inputValueArr.value = displayedValueArr.value.map((value: number, index: number) => {
          if (props.showAlpha && index === 3) {
            return `${Math.floor(value * 100)}%`
          } else {
            return `${Math.floor(value)}`
          }
        })
      }
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
  if (updateSource === 'input') {
    emits('complete', value)
  }
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
// pallete mouse down
function handlePalleteMouseDown(e: MouseEvent): void {
  if (!palleteRef.value) return
  document.addEventListener('mousemove', handlePalleteMouseMove)
  document.addEventListener('mouseup', handlePalleteMouseUp)
  handlePalleteMouseMove(e)
}
function handlePalleteMouseMove(e: MouseEvent): void {
  if (!palleteRef.value) return
  const { width, height, left, bottom } = palleteRef.value.getBoundingClientRect()
  const newV = (bottom - e.clientY) / height
  const newS = (e.clientX - left) / width
  const normalizedNewS = 100 * (newS > 1 ? 1 : newS < 0 ? 0 : newS)
  const normalizedNewV = 100 * (newV > 1 ? 1 : newV < 0 ? 0 : newV)
  handleUpdateSv(normalizedNewS, normalizedNewV)
}
function handlePalleteMouseUp(): void {
  document.removeEventListener('mousemove', handlePalleteMouseMove)
  document.removeEventListener('mouseup', handlePalleteMouseUp)
  emits('complete', displayedValue.value)
}
function handleUpdateHue(hue: number): void {
  displayedHue.value = hue
  if (!hsvaComputed.value) {
    return
  }
  const [, s, v, a] = hsvaComputed.value
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
// hue slider mouse down
function handleHueSliderMouseDown(e: MouseEvent): void {
  if (!hueRailRef.value) return
  document.addEventListener('mousemove', handleHueSliderMouseMove)
  document.addEventListener('mouseup', handleHueSliderMouseUp)
  handleHueSliderMouseMove(e)
}
function normalizeHue(hue: number): number {
  hue = Math.round(hue)
  return hue >= 360 ? 359 : hue < 0 ? 0 : hue
}
function handleHueSliderMouseMove(e: MouseEvent): void {
  if (!hueRailRef.value) return
  const { width, left } = hueRailRef.value.getBoundingClientRect()
  const newHue = normalizeHue(((e.clientX - left - BORDER_RADIUS_NUM) / (width - HANDLE_SIZE_NUM)) * 360)
  handleUpdateHue(newHue)
}
function handleHueSliderMouseUp(): void {
  document.removeEventListener('mousemove', handleHueSliderMouseMove)
  document.removeEventListener('mouseup', handleHueSliderMouseUp)
  emits('complete', displayedValue.value)
}
function handleUpdateAlpha(alpha: number): void {
  switch (displayedMode.value) {
    case 'hsv':
      ;[_h, s, v] = hsvaComputed.value!
      onUpdateValue(toHsvaString([_h, s, v, alpha]), 'cursor')
      break
    case 'rgb':
      ;[r, g, b] = rgbaComputed.value!
      onUpdateValue(toRgbaString([r, g, b, alpha]), 'cursor')
      break
    case 'hex':
      ;[r, g, b] = rgbaComputed.value!
      onUpdateValue(toHexaString([r, g, b, alpha]), 'cursor')
      break
    case 'hsl':
      ;[_h, s, l] = hslaComputed.value!
      onUpdateValue(toHslaString([_h, s, l, alpha]), 'cursor')
      break
  }
  displayedAlpha.value = alpha
}
// alpha slider mouse down
function handleAlphaSliderMouseDown(e: MouseEvent): void {
  if (!alphaRailRef.value || !rgbaComputed.value) return
  document.addEventListener('mousemove', handleAlphaSliderMouseMove)
  document.addEventListener('mouseup', handleAlphaSliderMouseUp)
  handleAlphaSliderMouseMove(e)
}
function normalizeAlpha(alpha: number): number {
  alpha = Math.round(alpha * 100) / 100
  return alpha > 1 ? 1 : alpha < 0 ? 0 : alpha
}
function handleAlphaSliderMouseMove(e: MouseEvent): void {
  if (!alphaRailRef.value) return
  const { width, left } = alphaRailRef.value.getBoundingClientRect()
  const newAlpha = normalizeAlpha((e.clientX - left) / (width - HANDLE_SIZE_NUM))
  handleUpdateAlpha(newAlpha)
}
function handleAlphaSliderMouseUp(): void {
  document.removeEventListener('mousemove', handleAlphaSliderMouseMove)
  document.removeEventListener('mouseup', handleAlphaSliderMouseUp)
  emits('complete', displayedValue.value)
}
function getModeFromValue(color: string | undefined): ColorPickerMode | undefined {
  if (color === undefined) return undefined
  if (/^ *#/.test(color)) return 'hex'
  if (color.includes('rgb')) return 'rgb'
  if (color.includes('hsl')) return 'hsl'
  if (color.includes('hsv')) return 'hsv'
  return undefined
}
function onUpdateMode(): void {
  const currentModeIndex = props.modes.findIndex((mode) => mode === displayedMode.value)
  if (currentModeIndex !== -1) {
    displayedMode.value = props.modes[(currentModeIndex + 1) % props.modes.length]
  } else {
    displayedMode.value = 'rgb'
  }
}
function handleColorInputChange(e: Event): void {
  const target = e.target as HTMLInputElement
  const color = convertColor(target.value.toUpperCase(), displayedMode.value, 'hex')
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
// 0 - 100%
function normalizeAlphaUnit(value: string): number | false {
  if (/^\d{1,3}\.?\d*%$/.test(value.trim())) {
    return Math.max(0, Math.min(Number.parseInt(value) / 100, 100))
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
function getInputString(value: string | undefined, mode: string): string {
  if (value === undefined) return ''
  if (mode === 'HEX' || mode === 'HEXA') {
    return value as string
  }
  if (mode === 'A') {
    return `${Math.floor(Number(value) * 100)}%`
  }
  return String(Math.floor(Number(value)))
}
function handleInputUpdateValue(value: string): void {
  onUpdateValue(value, 'input')
}
function handleUnitUpdateValue(index: number, value: number | string) {
  if (displayedMode.value === 'hex') {
    handleInputUpdateValue((props.showAlpha ? toHexaString : toHexString)(value as string))
    return
  }
  let nextValueArr: any
  if (displayedValueArr.value === null) {
    nextValueArr = [0, 0, 0, 0]
  } else {
    nextValueArr = [...displayedValueArr.value]
  }
  switch (displayedMode.value) {
    case 'hsv':
      nextValueArr[index] = value
      handleInputUpdateValue((props.showAlpha ? toHsvaString : toHsvString)(nextValueArr as HSVA | HSV))
      break
    case 'rgb':
      nextValueArr[index] = value
      handleInputUpdateValue((props.showAlpha ? toRgbaString : toRgbString)(nextValueArr as RGBA | RGB))
      break
    case 'hsl':
      nextValueArr[index] = value
      handleInputUpdateValue((props.showAlpha ? toHslaString : toHslString)(nextValueArr as HSLA | HSL))
      break
  }
}
function handleInputChange(e: Event, index: number): void {
  const target = e.target as HTMLInputElement
  let unit: number | false
  let valid: boolean
  let originValue
  const value = target.value
  if (index === undefined) {
    // hex
    originValue = displayedValueArr.value === null ? undefined : displayedValueArr.value
  } else {
    originValue =
      displayedValueArr.value?.[index] === undefined ? undefined : displayedValueArr.value?.[index].toString()
  }
  const mode = index === undefined ? displayedModeComputed.value : displayedModeComputed.value[index]
  switch (mode) {
    case 'HEX':
    case 'HEXA':
      valid = normalizeHexaUnit(value)
      if (valid) {
        handleUnitUpdateValue(0, value)
      }
      hexValue.value = getInputString(value, mode)
      break
    case 'H':
      unit = normalizeHueUnit(value)
      if (unit === false) {
        inputValueArr.value[index] = getInputString(originValue as string, mode)
      } else {
        handleUnitUpdateValue(index, unit)
      }
      break
    case 'S':
    case 'L':
    case 'V':
      unit = normalizeSlvUnit(value)
      if (unit === false) {
        inputValueArr.value[index] = getInputString(originValue as string, mode)
      } else {
        handleUnitUpdateValue(index, unit)
      }
      break
    case 'A':
      unit = normalizeAlphaUnit(value)
      if (unit === false) {
        inputValueArr.value[index] = getInputString(originValue as string, mode)
      } else {
        handleUnitUpdateValue(index, unit)
      }
      break
    case 'R':
    case 'G':
    case 'B':
      unit = normalizeRgbUnit(value)
      if (unit === false) {
        inputValueArr.value[index] = getInputString(originValue as string, mode)
      } else {
        handleUnitUpdateValue(index, unit)
      }
      break
  }
}
// Try to normalize the color values to ensure that they are valid CSS colors
function normalizeColor(color: string, mode: ColorPickerMode | undefined): string {
  if (mode === 'hsv') {
    const [h, s, v, a] = hsva(color)
    return toRgbaString([...hsv2rgb(h, s, v), a])
  }
  // For the mode that is not in preset, we keep the original value.
  // For color names, they are legal to CSS, so we don’t deal with them,
  // and only standardize them when outputting.
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
  const conversions = convert[originalMode]
  return (conversions as any)[mode](value)
}
function normalizeOutput(parsed: ParsedColor): string | undefined {
  let { value, mode: swatchColorMode } = parsed
  // color name is converted to hex
  if (!swatchColorMode) {
    swatchColorMode = 'hex'
    if (/^[a-zA-Z]+$/.test(value)) {
      value = getHexFromName(value)
    } else {
      // for invalid color, make it black
      console.warn('color-picker', `color ${value} in swatches is invalid.`)
      value = '#000000'
    }
  }
  if (swatchColorMode === displayedMode.value) return value
  // swatch value to current mode value
  return convertColor(value, displayedMode.value, swatchColorMode)
}
function onSwatch(swatch: ParsedColor): void {
  onUpdateValue(normalizeOutput(swatch), 'input')
}
function onConfirm() {
  emits('confirm', displayedValue.value)
  tooltipRef.value.hide()
}
function onClear() {
  onUpdateValue(undefined, 'input')
  emits('clear')
  tooltipRef.value.hide()
}
</script>
<template>
  <Tooltip
    ref="tooltipRef"
    :style="`width: ${colorPickerWidth}; height: ${colorPickerHeight};`"
    max-width="none"
    :arrow="false"
    placement="bottom"
    bg-color="#fff"
    :tooltip-style="{
      width: '240px',
      padding: 0,
      borderRadius: '4px',
      color: 'rgba(0, 0, 0, 0.88)',
      ...tooltipStyle
    }"
    :content-style="{ width: '100%', height: '100%' }"
    trigger="click"
    :transition-duration="200"
  >
    <template #tooltip>
      <template v-if="!disabled">
        <div class="color-picker-panel" :class="{ 'panel-with-actions': actions.length }">
          <div ref="palleteRef" class="color-picker-pallete" @mousedown="handlePalleteMouseDown">
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
                <div ref="hueRailRef" :style="sliderRailStyle" @mousedown="handleHueSliderMouseDown">
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
                :style="sliderStyle"
                @mousedown="handleAlphaSliderMouseDown"
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
                :value="circleColor"
                @change.stop="handleColorInputChange"
              />
            </div>
          </div>
          <div class="color-picker-input">
            <div
              class="color-picker-input-mode"
              :style="{ cursor: modes.length === 1 ? '' : 'pointer' }"
              @click="onUpdateMode"
            >
              {{ displayedModeComputed }}
            </div>
            <div class="color-picker-input-group">
              <template v-if="displayedMode === 'hex'">
                <Input
                  size="small"
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
                  :key="index"
                  :placeholder="val"
                  v-model:value.lazy="inputValueArr[index]"
                  @change="handleInputChange($event, index)"
                  v-bind="inputProps"
                />
              </template>
            </div>
          </div>
          <div v-if="parsedSwatches.length" class="color-picker-swatches">
            <div
              tabindex="0"
              class="color-picker-swatch"
              v-for="(swatch, index) in parsedSwatches"
              :key="index"
              @click="onSwatch(swatch)"
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
      </template>
    </template>
    <div
      tabindex="1"
      class="color-picker-display"
      :class="[`color-picker-${size}`, { 'color-picker-disabled': disabled }]"
      :style="`
        --color-picker-width: ${colorPickerWidth};
        --color-picker-height: ${colorPickerHeight};
        --color-picker-block-size: ${colorPickerBlockSize};
        --color-picker-primary-color-hover: ${colorPalettes[4]};
        --color-picker-primary-color-focus: ${colorPalettes[4]};
        --color-picker-primary-shadow-color: ${shadowColor};
      `"
      v-bind="$attrs"
    >
      <div class="color-picker-wrap">
        <div class="color-picker-fill">
          <div class="color-picker-checkboard"></div>
          <div
            :style="`position: absolute; left: 0; right: 0; top: 0; bottom: 0; background-color: ${hslaComputed ? toHslaString(hslaComputed) : ''};`"
          ></div>
          <div
            v-if="displayedValue && hslaComputed"
            class="color-picker-value"
            :style="{ color: hslaComputed[2] > 50 || hslaComputed[3] < 0.5 ? 'black' : 'white' }"
          >
            <slot name="label" :color="displayedValue">{{ label ? label(displayedValue) : displayedValue }}</slot>
          </div>
        </div>
      </div>
    </div>
  </Tooltip>
</template>
<style lang="less" scoped>
.color-picker-panel {
  padding: 12px;
  .color-picker-pallete {
    height: 180px;
    position: relative;
    margin-bottom: 8px;
    cursor: crosshair;
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
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.45);
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
      :deep(.m-input) {
        flex-grow: 1;
        flex-basis: 0;
        &:not(:first-child) {
          margin-left: -1px;
          .input-wrap {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
        &:not(:last-child) {
          .input-wrap {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
        .input-wrap {
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
    }
  }
}
.panel-with-actions {
  padding-bottom: 8px;
}
.color-picker-actions {
  display: flex;
  gap: 8px;
  border-top: 1px solid rgba(5, 5, 5, 0.06);
  padding: 8px 12px;
  justify-content: flex-end;
}
.color-picker-footer {
  border-top: 1px solid rgba(5, 5, 5, 0.06);
  padding: 8px 12px;
}
.color-picker-display {
  display: inline-block;
  width: var(--color-picker-width);
  height: var(--color-picker-height);
  border-radius: 4px;
  position: relative;
  outline: none;
  &:not(.color-picker-disabled):hover {
    .color-picker-wrap {
      border-color: var(--color-picker-primary-color-hover);
    }
  }
  &:not(.color-picker-disabled):focus {
    .color-picker-wrap {
      border-color: var(--color-picker-primary-color-focus);
      box-shadow: 0 0 0 2px var(--color-picker-primary-shadow-color);
    }
  }
  .color-picker-wrap {
    height: 100%;
    cursor: pointer;
    border: 1px solid #d9d9d9;
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
        width: 100%;
        height: 100%;
        position: relative;
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
}
</style>
