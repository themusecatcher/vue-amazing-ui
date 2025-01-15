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
import { useSlotsExist } from 'components/utils'
export type ColorPickerMode = 'rgb' | 'hsl' | 'hsv' | 'hex'
export interface Props {
  tooltipStyle?: CSSProperties // 设置弹出面板的样式
  showAlpha?: boolean // 是否可调节 alpha 通道
  showPreview?: boolean // 是否展示颜色预览块
  size?: 'small' | 'middle' | 'large' // 颜色选择器的尺寸
  disabled?: boolean // 是否禁用
  value?: string // (v-model) 颜色选择器的值
  modes?: Array<'rgb' | 'hex' | 'hsl' | 'hsv'> // 颜色选择器支持颜色的格式
  swatches?: string[] // 色板的值
  actions?: Array<'confirm' | 'clear'> // 显示按钮
  footer?: string // 底部额外的页脚内容 string | slot
}
const props = withDefaults(defineProps<Props>(), {
  tooltipStyle: () => ({}),
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
const displayedValue = ref<string | undefined>(props.value)
const displayedMode = ref<ColorPickerMode>(getModeFromValue(displayedValue.value) || props.modes[0] || 'rgb') // 当前展示的 mode
const hexValue = ref<string>()
const inputValueArr = ref<string[]>([])
const emits = defineEmits(['update:value', 'confirm', 'clear'])
const slotsExist = useSlotsExist(['footer'])
const showFooter = computed(() => {
  return slotsExist.footer || props.footer
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
const alphaRailBackgroundImage = computed(() => {
  if (!rgbaRef.value) return ''
  return `linear-gradient(to right, rgba(${rgbaRef.value[0]}, ${rgbaRef.value[1]}, ${rgbaRef.value[2]}, 0) 0%, rgba(${rgbaRef.value[0]}, ${rgbaRef.value[1]}, ${rgbaRef.value[2]}, 1) 100%)`
})
const handleColor = computed(() => {
  if (!rgbaRef.value) return ''
  return `rgb(${rgbaRef.value[0]}, ${rgbaRef.value[1]}, ${rgbaRef.value[2]})`
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
    backgroundColor: rgbaRef.value ? toRgbaString(rgbaRef.value) : undefined,
    borderRadius: BORDER_RADIUS,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE
  }
  return style
})
const colorPickerHeight = computed(() => {
  const heightMap = {
    small: 24,
    middle: 32,
    large: 40
  }
  return `${heightMap[props.size]}px`
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
let _h: number, // avoid conflict with render function's h
  s: number,
  l: number,
  v: number,
  r: number,
  g: number,
  b: number,
  a: number
const hsvaRef = computed<HSVA | null>(() => {
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
const rgbaRef = computed<RGBA | null>(() => {
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
const hslaRef = computed<HSLA | null>(() => {
  if (!displayedValue.value) return null
  switch (valueMode.value!) {
    case 'hsl':
      console.log('hsla(displayedValue.value)', displayedValue.value, hsla(displayedValue.value))
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
      return rgbaRef.value
    case 'hsv':
      return hsvaRef.value
    case 'hsl':
      return hslaRef.value
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
    console.log('displayedValue', displayedValue.value)
  }
)
watch(
  displayedMode,
  (to) => {
    if (to === 'hex') {
      hexValue.value =
        displayedValueArr.value === null
          ? undefined
          : (props.showAlpha ? toHexaString : toHexString)(displayedValueArr.value as RGBA)
    }
  },
  {
    immediate: true
  }
)
watch(
  displayedValueArr,
  (to) => {
    console.log('displayedValueArr', to)

    if (to === null) {
      inputValueArr.value = new Array(props.showAlpha ? 4 : 3).fill(undefined)
    } else {
      inputValueArr.value = to.map((value: number, index: number) => {
        if (props.showAlpha && index === 3) {
          return `${Math.floor(value * 100)}%`
        } else {
          return `${Math.floor(value)}`
        }
      })
    }
    console.log('inputValueArr', inputValueArr.value)
  },
  {
    immediate: true
  }
)
watch(
  inputValueArr,
  () => {
    console.log('inputValueArr', inputValueArr.value)
  },
  {
    deep: true
  }
)
watchEffect(() => {
  if (upcomingValue.value === undefined || upcomingValue.value !== displayedValue.value) {
    if (hsvaRef.value) {
      displayedHue.value = hsvaRef.value[0]
      displayedAlpha.value = hsvaRef.value[3]
      displayedSv.value = [hsvaRef.value[1], hsvaRef.value[2]]
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
  // const { nTriggerFormChange, nTriggerFormInput } = formItem
  // const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props
  // if (onUpdateValue)
  //   call(onUpdateValue as OnUpdateValueImpl, value)
  // if (_onUpdateValue)
  //   call(_onUpdateValue as OnUpdateValueImpl, value)
  // nTriggerFormChange()
  // nTriggerFormInput()
  displayedValue.value = value
  console.log('displayedValue', displayedValue.value)
  emits('update:value', value)
}
function handleUpdateSv(s: number, v: number): void {
  const alpha = hsvaRef.value ? hsvaRef.value[3] : 1
  displayedSv.value = [s, v]
  console.log('displayedSv', displayedSv.value)
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
  // on('mousemove', document, handleMouseMove)
  // on('mouseup', document, handleMouseUp)
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
  // emits('complete')
  // off('mousemove', document, handleMouseMove)
  // off('mouseup', document, handleMouseUp)
  // props.onComplete?.()
}
function handleUpdateHue(hue: number): void {
  displayedHue.value = hue
  if (!hsvaRef.value) {
    return
  }
  const [, s, v, a] = hsvaRef.value
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
  // on('mousemove', document, handleMouseMove)
  // on('mouseup', document, handleMouseUp)
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
  // emits('complete')
  // off('mousemove', document, handleMouseMove)
  // off('mouseup', document, handleMouseUp)
  // props.onComplete?.()
}
function handleUpdateAlpha(alpha: number): void {
  switch (displayedMode.value) {
    case 'hsv':
      ;[_h, s, v] = hsvaRef.value!
      onUpdateValue(toHsvaString([_h, s, v, alpha]), 'cursor')
      break
    case 'rgb':
      ;[r, g, b] = rgbaRef.value!
      onUpdateValue(toRgbaString([r, g, b, alpha]), 'cursor')
      break
    case 'hex':
      ;[r, g, b] = rgbaRef.value!
      onUpdateValue(toHexaString([r, g, b, alpha]), 'cursor')
      break
    case 'hsl':
      ;[_h, s, l] = hslaRef.value!
      onUpdateValue(toHslaString([_h, s, l, alpha]), 'cursor')
      break
  }
  displayedAlpha.value = alpha
}
// alpha slider mouse down
function handleAlphaSliderMouseDown(e: MouseEvent): void {
  if (!alphaRailRef.value || !rgbaRef.value) return
  document.addEventListener('mousemove', handleAlphaSliderMouseMove)
  document.addEventListener('mouseup', handleAlphaSliderMouseUp)
  handleAlphaSliderMouseMove(e)
  // on('mousemove', document, handleMouseMove)
  // on('mouseup', document, handleMouseUp)
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
  // emits('complete')
  // off('mousemove', document, handleMouseMove)
  // off('mouseup', document, handleMouseUp)
  // props.onComplete?.()
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
  console.log('displayedMode', displayedMode.value)
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
  // void nextTick(handleComplete)
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
      console.log('displayedValueArr', displayedValueArr.value)
      console.log('nextValueArr', nextValueArr)
      handleInputUpdateValue((props.showAlpha ? toHslaString : toHslString)(nextValueArr as HSLA | HSL))
      break
  }
}
function onInputChange(e: Event, index: number): void {
  const target = e.target as HTMLInputElement
  console.log('index', index)
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
  console.log('displayedValueArr', displayedValueArr.value)
  console.log('originValue', originValue)
  console.log('value', value)
  const mode = index === undefined ? displayedModeComputed.value : displayedModeComputed.value[index]
  console.log('displayedModeComputed', displayedModeComputed.value)
  console.log('mode', mode)
  switch (mode) {
    case 'HEX':
    case 'HEXA':
      valid = normalizeHexaUnit(value)
      if (valid) {
        handleUnitUpdateValue(0, value)
      }
      hexValue.value = getInputString(value, mode)
      console.log('hexValue', hexValue.value)
      break
    case 'H':
      unit = normalizeHueUnit(value)
      console.log('unit', unit)
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
        console.log('index', index)
        console.log('unit', unit)
        handleUnitUpdateValue(index, unit)
      }
      break
    case 'A':
      unit = normalizeAlphaUnit(value)
      console.log('unit', unit)
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
    style="width: 100%"
    max-width="none"
    :arrow="false"
    bg-color="#fff"
    :tooltip-style="{
      width: '240px',
      padding: 0,
      borderRadius: '4px',
      color: 'rgba(0, 0, 0, 0.88)',
      ...tooltipStyle
    }"
    :content-style="{ width: '100%' }"
    trigger="click"
    :transition-duration="200"
    v-bind="$attrs"
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
                  v-if="rgbaRef"
                  :style="`position: absolute; top: 0px; bottom: 0; left: ${BORDER_RADIUS}; right: ${BORDER_RADIUS}`"
                >
                  <div class="color-picker-handle" :style="sliderAlphaHandleStyle">
                    <div class="color-picker-handle-fill" :style="sliderAlphaHandleFillStyle"></div>
                  </div>
                </div>
              </div>
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
                  @change="onInputChange"
                />
              </template>
              <template v-else>
                <Input
                  size="small"
                  :style="`${val === 'A' ? 'flex-grow: 1.25' : ''}`"
                  :placeholder="val"
                  v-model:value.lazy="inputValueArr[index]"
                  @change="onInputChange($event, index)"
                  v-for="(val, index) in displayedModeComputedArr"
                  :key="index"
                />
              </template>
            </div>
          </div>
          <div class="color-picker-swatches">
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
      :class="{ 'color-picker-disabled': disabled }"
      :style="`--color-picker-height: ${colorPickerHeight};`"
    >
      <div class="color-picker-fill">
        <div class="color-picker-checkboard"></div>
        <div
          :style="`position: absolute; left: 0; right: 0; top: 0; bottom: 0; background-color: ${hslaRef ? toHslaString(hslaRef) : ''};`"
        ></div>
        <div
          v-if="displayedValue && hslaRef"
          class="color-picker-value"
          :style="{ color: hslaRef[2] > 50 || hslaRef[3] < 0.5 ? 'black' : 'white' }"
        >
          {{ displayedValue }}
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
            background-image: linear-gradient(45deg, #ddd 25%, #0000 25%), linear-gradient(-45deg, #ddd 25%, #0000 25%),
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
      background-image: linear-gradient(45deg, #ddd 25%, #0000 25%), linear-gradient(-45deg, #ddd 25%, #0000 25%),
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
  position: relative;
  display: inline-block;
  font-size: 14px;
  width: 100%;
  height: var(--color-picker-height);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  &:not(.color-picker-disabled):hover {
    border-color: #4096ff;
  }
  &:not(.color-picker-disabled):focus {
    border-color: #4096ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  }
  .color-picker-fill {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 3px;
    right: 3px;
    top: 3px;
    bottom: 3px;
    border-radius: 4px;
    .color-picker-checkboard {
      background: white;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: 4px;
      &::after {
        background-image: linear-gradient(45deg, #ddd 25%, #0000 25%), linear-gradient(-45deg, #ddd 25%, #0000 25%),
          linear-gradient(45deg, #0000 75%, #ddd 75%), linear-gradient(-45deg, #0000 75%, #ddd 75%);
        --color-picker-block-size: calc((var(--color-picker-height) - 8px) / 3);
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
    }
  }
}
.color-picker-disabled {
  cursor: not-allowed;
}
</style>
