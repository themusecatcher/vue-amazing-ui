<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { CSSProperties } from 'vue'
import { hsla, hsva, hsv2hsl, rgba, rgb2hsl } from 'seemly'
import type { HSLA } from 'seemly'
import Tooltip from 'components/tooltip'
import Input from 'components/input'
import { useSlotsExist } from 'components/utils'
export type ColorPickerMode = 'rgb' | 'hsl' | 'hsv' | 'hex'
export interface Props {
  keyboard?: boolean // 是否支持按键操作 (enter 显示；esc 关闭)
  tooltipStyle?: CSSProperties // 设置弹出面板的样式
  showAlpha?: boolean // 是否可调节 alpha 通道
  show?: boolean // (v-model) 是否展示面板
  size?: 'small' | 'middle' | 'large' // 颜色选择器的尺寸
  disabled?: boolean // 是否禁用
  value?: string // (v-model) 颜色选择器的值
  modes?: Array<'rgb' | 'hex' | 'hsl' | 'hsv'> // 颜色选择器支持颜色的格式
  actions?: Array<'confirm' | 'clear'> // 显示按钮
}
const props = withDefaults(defineProps<Props>(), {
  keyboard: true,
  tooltipStyle: () => ({}),
  showAlpha: true,
  show: false,
  size: 'middle',
  disabled: false,
  value: 'rgba(0, 0, 0, 1)',
  modes: () => ['rgb', 'hex', 'hsl'],
  actions: () => []
})
const displayedModeRef = ref<ColorPickerMode>(getModeFromValue(props.value) || props.modes[0] || 'rgb') // 当前展示的 mode
console.log('displayedModeRef', displayedModeRef.value)
const emits = defineEmits(['update:show', 'update:value'])
// const slotsExist = useSlotsExist(['title', 'prefix', 'suffix'])
// const showTitle = computed(() => {
//   return slotsExist.title || props.title
// })
// const showPrefix = computed(() => {
//   return slotsExist.prefix || props.prefix
// })
// const showSuffix = computed(() => {
//   return slotsExist.suffix || props.suffix
// })
const layerHandleStyle = computed(() => {
  const style: CSSProperties = {
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    left: 'calc(0% - 6px)',
    bottom: 'calc(0% - 6px)'
  }
  return style
})
const layerHandleFillStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: 'rgb(0, 0, 0)',
    borderRadius: '6px',
    width: '12px',
    height: '12px'
  }
  return style
})
const sliderStyle = computed(() => {
  const style: CSSProperties = {
    height: '12px',
    borderRadius: '6px'
  }
  return style
})
const sliderRailStyle = computed(() => {
  const style: CSSProperties = {
    position: 'relative',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 0px 2px 0px inset',
    backgroundImage:
      'linear-gradient(90deg, red, rgb(255, 255, 0) 16.66%, rgb(0, 255, 0) 33.33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.66%, rgb(255, 0, 255) 83.33%, red)',
    height: '12px',
    borderRadius: '6px'
  }
  return style
})
const sliderColorHandleStyle = computed(() => {
  const style: CSSProperties = {
    left: 'calc(0% - 6px)',
    borderRadius: '6px',
    width: '12px',
    height: '12px'
  }
  return style
})
const sliderColorHandleFillStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: 'rgb(0, 255, 38)',
    borderRadius: '6px',
    width: '12px',
    height: '12px'
  }
  return style
})
const sliderAlphaHandleStyle = computed(() => {
  const style: CSSProperties = {
    left: 'calc(0% - 6px)',
    borderRadius: '6px',
    width: '12px',
    height: '12px'
  }
  return style
})
const sliderAlphaHandleFillStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '6px',
    width: '12px',
    height: '12px'
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
const valueModeRef = computed(() => getModeFromValue(props.value))
let _h: number, // avoid conflict with render function's h
  s: number,
  l: number,
  v: number,
  r: number,
  g: number,
  b: number,
  a: number
const hslaRef = computed<HSLA | null>(() => {
  if (!props.value) return null
  switch (valueModeRef.value!) {
    case 'hsl':
      return hsla(props.value)
    case 'hsv':
      ;[_h, s, v, a] = hsva(props.value)
      return [...hsv2hsl(_h, s, v), a]
    case 'rgb':
    case 'hex':
      ;[r, g, b, a] = rgba(props.value)
      return [...rgb2hsl(r, g, b), a]
  }
})
function getModeFromValue(color: string | null): ColorPickerMode | null {
  if (color === null) return null
  if (/^ *#/.test(color)) return 'hex'
  if (color.includes('rgb')) return 'rgb'
  if (color.includes('hsl')) return 'hsl'
  if (color.includes('hsv')) return 'hsv'
  return null
}
function onUpdateMode(): void {
  const currentModeIndex = props.modes.findIndex((mode) => mode === displayedModeRef.value)
  if (currentModeIndex !== -1) {
    displayedModeRef.value = props.modes[(currentModeIndex + 1) % props.modes.length]
  } else {
    displayedModeRef.value = 'rgb'
  }
}
</script>
<template>
  <Tooltip
    style="width: 100%"
    :arrow="false"
    bg-color="#fff"
    :tooltip-style="{
      width: '240px',
      padding: '12px',
      borderRadius: '4px',
      color: 'rgba(0, 0, 0, 0.88)',
      ...tooltipStyle
    }"
    :content-style="{ width: '100%' }"
    trigger="click"
    :keyboard="keyboard"
    :transition-duration="200"
    v-bind="$attrs"
  >
    <template #tooltip>
      <div class="color-picker-pallete">
        <div
          class="color-picker-pallete-layer"
          :style="{ backgroundImage: `linear-gradient(90deg, white, ${value})` }"
        ></div>
        <div
          class="color-picker-pallete-layer pallete-layer-shadowed"
          style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0))"
        ></div>
        <div class="color-picker-handle" :style="layerHandleStyle">
          <div class="color-picker-handle-fill" :style="layerHandleFillStyle"></div>
        </div>
      </div>
      <div class="color-picker-preview">
        <div class="color-picker-preview-sliders">
          <div class="color-picker-slider" :style="sliderStyle">
            <div :style="sliderRailStyle">
              <div style="position: absolute; top: 0px; bottom: 0; left: 6px; right: 6px">
                <div class="color-picker-handle" :style="sliderColorHandleStyle">
                  <div class="color-picker-handle-fill" :style="sliderColorHandleFillStyle"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="color-picker-slider" :style="sliderStyle">
            <div
              style="
                border-radius: 6px;
                position: absolute;
                top: 0px;
                bottom: 0;
                left: 0px;
                right: 0px;
                overflow: hidden;
              "
            >
              <div class="color-picker-checkboard"></div>
              <div
                class="color-picker-slider-image"
                style="background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)"
              ></div>
            </div>
            <div style="position: absolute; top: 0px; bottom: 0; left: 6px; right: 6px">
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
          {{ displayedModeRef.toUpperCase() + (showAlpha ? 'A' : '') }}
        </div>
        <div class="color-picker-input-group">
          <Input />
        </div>
      </div>
    </template>
    <div tabindex="1" class="color-picker" :style="`--color-picker-height: ${colorPickerHeight};`">
      <div class="color-picker-fill">
        <div class="color-picker-checkboard"></div>
        <div class="color-picker-panel" :style="{ backgroundColor: value }"></div>
        <div
          v-if="value && hslaRef"
          class="color-picker-value"
          :style="{ color: hslaRef[2] > 50 || hslaRef[3] < 0.5 ? 'black' : 'white' }"
          >{{ value }}</div
        >
      </div>
    </div>
  </Tooltip>
</template>
<style lang="less" scoped>
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
  }
}
.color-picker {
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
  &:hover {
    border-color: #4096ff;
  }
  &:focus {
    border-color: #4096ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  }
  .color-picker-fill {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 4px;
    right: 4px;
    top: 4px;
    bottom: 4px;
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
    .color-picker-panel {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    .color-picker-value {
      white-space: nowrap;
      position: relative;
    }
  }
}
</style>
