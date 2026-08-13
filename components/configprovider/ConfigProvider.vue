<script setup lang="ts">
import { reactive, computed, watch, provide } from 'vue'
import { TinyColor } from '@ctrl/tinycolor'
import { generate } from '@ant-design/colors'
export interface Theme {
  common?: {
    // 优先级低于组件配置
    primaryColor?: string
  }
  Alert?: {
    primaryColor?: string
  }
  BackTop?: {
    primaryColor?: string
  }
  Button?: {
    primaryColor?: string
  }
  Calendar?: {
    primaryColor?: string
  }
  Carousel?: {
    primaryColor?: string
  }
  Checkbox?: {
    primaryColor?: string
  }
  ColorPicker?: {
    primaryColor?: string
  }
  DatePicker?: {
    primaryColor?: string
  }
  FloatButton?: {
    primaryColor?: string
  }
  Image?: {
    primaryColor?: string
  }
  Input?: {
    primaryColor?: string
  }
  InputNumber?: {
    primaryColor?: string
  }
  InputSearch?: {
    primaryColor?: string
  }
  LoadingBar?: {
    primaryColor?: string
  }
  Message?: {
    primaryColor?: string
  }
  Modal?: {
    primaryColor?: string
  }
  Notification?: {
    primaryColor?: string
  }
  Pagination?: {
    primaryColor?: string
  }
  Popconfirm?: {
    primaryColor?: string
  }
  Progress?: {
    primaryColor?: string
  }
  Radio?: {
    primaryColor?: string
  }
  Select?: {
    primaryColor?: string
  }
  Slider?: {
    primaryColor?: string
  }
  Spin?: {
    primaryColor?: string
  }
  Steps?: {
    primaryColor?: string
  }
  Swiper?: {
    primaryColor?: string
  }
  Switch?: {
    primaryColor?: string
  }
  Tabs?: {
    primaryColor?: string
  }
  Textarea?: {
    primaryColor?: string
  }
  TextScroll?: {
    primaryColor?: string
  }
  Upload?: {
    primaryColor?: string
  }
}
export interface Props {
  theme?: Theme // 主题对象
  abstract?: boolean // 是否不存在 DOM 包裹元素
  tag?: string // ConfigProvider 被渲染成的元素，abstract 为 true 时有效
}
const props = withDefaults(defineProps<Props>(), {
  theme: () => ({}),
  abstract: true,
  tag: 'div'
})
interface ThemeColor {
  colorPalettes: string[]
  shadowColor: string
}
// 通用主题颜色
const commonThemeColor = reactive<ThemeColor>({
  colorPalettes: [],
  shadowColor: ''
})
// 各个组件的主题颜色
const componentsThemeColor = reactive<Record<string, ThemeColor>>({
  Alert: {
    colorPalettes: [],
    shadowColor: ''
  },
  BackTop: {
    colorPalettes: [],
    shadowColor: ''
  },
  Button: {
    colorPalettes: [],
    shadowColor: ''
  },
  Calendar: {
    colorPalettes: [],
    shadowColor: ''
  },
  Carousel: {
    colorPalettes: [],
    shadowColor: ''
  },
  Checkbox: {
    colorPalettes: [],
    shadowColor: ''
  },
  ColorPicker: {
    colorPalettes: [],
    shadowColor: ''
  },
  DatePicker: {
    colorPalettes: [],
    shadowColor: ''
  },
  FloatButton: {
    colorPalettes: [],
    shadowColor: ''
  },
  Image: {
    colorPalettes: [],
    shadowColor: ''
  },
  Input: {
    colorPalettes: [],
    shadowColor: ''
  },
  InputNumber: {
    colorPalettes: [],
    shadowColor: ''
  },
  InputSearch: {
    colorPalettes: [],
    shadowColor: ''
  },
  LoadingBar: {
    colorPalettes: [],
    shadowColor: ''
  },
  Message: {
    colorPalettes: [],
    shadowColor: ''
  },
  Modal: {
    colorPalettes: [],
    shadowColor: ''
  },
  Notification: {
    colorPalettes: [],
    shadowColor: ''
  },
  Pagination: {
    colorPalettes: [],
    shadowColor: ''
  },
  Popconfirm: {
    colorPalettes: [],
    shadowColor: ''
  },
  Progress: {
    colorPalettes: [],
    shadowColor: ''
  },
  Radio: {
    colorPalettes: [],
    shadowColor: ''
  },
  Select: {
    colorPalettes: [],
    shadowColor: ''
  },
  Slider: {
    colorPalettes: [],
    shadowColor: ''
  },
  Spin: {
    colorPalettes: [],
    shadowColor: ''
  },
  Steps: {
    colorPalettes: [],
    shadowColor: ''
  },
  Swiper: {
    colorPalettes: [],
    shadowColor: ''
  },
  Switch: {
    colorPalettes: [],
    shadowColor: ''
  },
  Tabs: {
    colorPalettes: [],
    shadowColor: ''
  },
  Textarea: {
    colorPalettes: [],
    shadowColor: ''
  },
  TextScroll: {
    colorPalettes: [],
    shadowColor: ''
  },
  Upload: {
    colorPalettes: [],
    shadowColor: ''
  }
})
provide('common', commonThemeColor)
provide('components', componentsThemeColor)
const commonTheme = computed(() => {
  if ('common' in props.theme) {
    return props.theme.common
  }
  return null
})
const componentsTheme = computed(() => {
  const themes = { ...props.theme }
  if ('common' in themes) {
    delete themes.common
  }
  return themes
})
// 监听 common 主题变化
watch(
  commonTheme,
  (to) => {
    const colorPalettes = getColorPalettes(to?.primaryColor || '#1677ff')
    commonThemeColor.colorPalettes = colorPalettes
    commonThemeColor.shadowColor = getAlphaColor(colorPalettes[0])
  },
  {
    immediate: true
  }
)
// 监听各个组件主题变化
watch(
  componentsTheme,
  (to) => {
    Object.keys(to).forEach((key: string) => {
      const primaryColor = to[key as keyof Theme]?.primaryColor || commonTheme.value?.primaryColor || '#1677ff'
      const colorPalettes = getColorPalettes(primaryColor)
      componentsThemeColor[key].colorPalettes = colorPalettes
      componentsThemeColor[key].shadowColor = getAlphaColor(colorPalettes[0])
    })
  },
  {
    immediate: true
  }
)
function getColorPalettes(primaryColor: string): string[] {
  return generate(primaryColor)
}
function isStableColor(color: number): boolean {
  return color >= 0 && color <= 255
}
function getAlphaColor(frontColor: string, backgroundColor: string = '#ffffff'): string {
  const { r: fR, g: fG, b: fB, a: originAlpha } = new TinyColor(frontColor).toRgb()
  if (originAlpha < 1) return frontColor
  const { r: bR, g: bG, b: bB } = new TinyColor(backgroundColor).toRgb()
  for (let fA = 0.01; fA <= 1; fA += 0.01) {
    const r = Math.round((fR - bR * (1 - fA)) / fA)
    const g = Math.round((fG - bG * (1 - fA)) / fA)
    const b = Math.round((fB - bB * (1 - fA)) / fA)
    if (isStableColor(r) && isStableColor(g) && isStableColor(b)) {
      return new TinyColor({ r, g, b, a: Math.round(fA * 100) / 100 }).toRgbString()
    }
  }
  return new TinyColor({ r: fR, g: fG, b: fB, a: 1 }).toRgbString()
}
</script>
<template>
  <slot v-if="abstract"></slot>
  <component v-else :is="tag" class="config-provider-wrap">
    <slot></slot>
  </component>
</template>
