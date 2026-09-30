<script setup lang="ts">
import { reactive, computed, watch, watchEffect, provide, inject, onUnmounted } from 'vue'
import { SKIP_LINK_CSS_VARS_KEY } from './context'
import type { CSSProperties, VNode } from 'vue'
import { getColorPalettes, getAlphaColor, createZIndexManager, Z_INDEX_INJECT_KEY } from 'components/utils'
export interface Theme {
  common?: {
    // 优先级低于组件配置
    primaryColor?: string
  }
  Alert?: {
    primaryColor?: string
  }
  AutoComplete?: {
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
  Menu?: {
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
  tag?: string // ConfigProvider 被渲染成的元素，abstract 为 false 时有效
  baseZIndex?: number // 浮层起始层级 (z-index)，传入后甲、乙两类浮层按「后出现者在上」自增分配；不传则各组件沿用自身默认层级
}
// 声明组件插槽类型
export interface ConfigProviderSlots {
  default?: () => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  theme: () => ({}),
  abstract: true,
  tag: 'div',
  baseZIndex: undefined
})
defineSlots<ConfigProviderSlots>()
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
  AutoComplete: {
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
  Menu: {
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
// 链接基座联动：common 主色变化时把对应色阶写入 CSS 变量，供 `:where(a)` 消费（见 components/style/global.less）。
// 变量按作用域分两处写入：最外层实例写 `:root`（全局生效，卸载时移除，使样式表内的 fallback 默认值重新生效）；
// 带包裹元素（`abstract` 为 false）的实例写自身包裹元素 —— `:where(a)` 逐级向上取值，故本子树内就近生效，
// 嵌套实例因此也能在自身范围内改变链接配色，而不影响外层。
// 离散实例（createDiscreteApi 内部挂载的 ConfigProvider）显式跳过 `:root` 写入：避免覆盖主应用写入的值、
// 并在其 dispose() 时把这些变量误清除（主应用不会重跑写入）
// 变量名 → 色阶级位：主色 / 悬停 / 按下 依次取色阶第 6 / 4 / 7 级
const LINK_CSS_VARS: ReadonlyArray<readonly [`--${string}`, number]> = [
  ['--va-link-color', 5],
  ['--va-link-color-hover', 3],
  ['--va-link-color-active', 6]
]
// 包裹元素上的链接色变量：仅非 abstract 形态需要（abstract 无 DOM 节点可承载）
const linkVarStyle = computed<CSSProperties>(() => {
  // 不解构：色阶数组会被整体替换，解构取值会丢失响应性追踪
  const palettes = commonThemeColor.colorPalettes
  if (props.abstract || !palettes.length) {
    return {}
  }
  const style: CSSProperties = {}
  LINK_CSS_VARS.forEach(([name, index]) => {
    style[name] = palettes[index] ?? palettes[0]
  })
  return style
})
if (!inject(SKIP_LINK_CSS_VARS_KEY, false) && inject('common', null) === null && typeof document !== 'undefined') {
  const rootStyle = document.documentElement.style
  watchEffect(() => {
    // 不解构：色阶数组会被整体替换，解构取值会丢失响应性追踪
    const palettes = commonThemeColor.colorPalettes
    if (!palettes.length) {
      return
    }
    LINK_CSS_VARS.forEach(([name, index]) => {
      rootStyle.setProperty(name, palettes[index] ?? palettes[0])
    })
  })
  onUnmounted(() => {
    LINK_CSS_VARS.forEach(([name]) => rootStyle.removeProperty(name))
  })
}
// 层级管理层：传入 baseZIndex 时建立分配器并向下注入，甲、乙两类浮层据此自增分配；
// 未传则不注入，各组件回退到自身既有硬编码层级（可关闭开关）。嵌套 ConfigProvider 未传时会继承外层分配器。
// 注：在 setup 阶段读取一次，运行期改变 baseZIndex 需重新挂载才生效。
if (typeof props.baseZIndex === 'number') {
  provide(Z_INDEX_INJECT_KEY, createZIndexManager(props.baseZIndex))
}
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
</script>
<template>
  <slot v-if="abstract"></slot>
  <component v-else :is="tag" class="config-provider-wrap" :style="linkVarStyle">
    <slot></slot>
  </component>
</template>
