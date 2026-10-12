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
// 登记键集合：主题表只登记本库消费主题色的组件（其与 `useInject` 消费方的一致性由测试守护）。
// 用集合判定而不用 `key in componentsThemeColor`：后者对 `__proto__` / `constructor` 等原型链属性同样成立
const registeredThemeKeys = new Set(Object.keys(componentsThemeColor))
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
// 主题依赖签名：`ConfigProvider` 仅由主色派生色阶（`getColorPalettes` 的唯一入参），故依赖收敛到「键名 + 主色值」
// 这一层叶子 —— 主色读取发生在 computed 内，主题整体替换与就地改写都能命中；返回值是原始字符串，值未变时不触发重算
// （同一主题反复传入新对象的情况）。签名含 `common`：未单独配置的组件沿用 `common` 主色，common 变化时组件色阶需一并重算。
const themePrimaryColorsSignature = computed(() =>
  Object.keys(props.theme)
    .sort() // 签名与键顺序无关：仅调整键顺序（如对象字面量重排）不触发重算
    .map((key) => `${key}:${props.theme[key as keyof Theme]?.primaryColor ?? ''}`)
    .join(',')
)
// 监听 common 主题变化
watch(
  () => props.theme.common?.primaryColor,
  (primaryColor) => {
    const colorPalettes = getColorPalettes(primaryColor || '#1677ff')
    commonThemeColor.colorPalettes = colorPalettes
    commonThemeColor.shadowColor = getAlphaColor(colorPalettes[0])
  },
  {
    immediate: true
  }
)
// 组件级主题的写入收敛为「唯二出口」：主题表与主色记录只在这两处被改，避免两处状态失步
// 主色记录用于跳过等值重写 —— 色阶数组是整体替换的，等值替换会让消费组件的 computed 白跑一次重渲染
const appliedPrimaryColors = new Map<string, string>()
// 写入某个组件键的主题色阶；主色未变则跳过
function applyComponentTheme(key: string, primaryColor: string): void {
  if (appliedPrimaryColors.get(key) === primaryColor) {
    return
  }
  const colorPalettes = getColorPalettes(primaryColor)
  componentsThemeColor[key].colorPalettes = colorPalettes
  componentsThemeColor[key].shadowColor = getAlphaColor(colorPalettes[0])
  appliedPrimaryColors.set(key, primaryColor)
}
// 复位为「未配置」，使 `useInject` 回退 common；同步清除主色记录，
// 否则之后重新写入相同主色会被「主色未变」误判为无需写入
function resetComponentTheme(key: string): void {
  componentsThemeColor[key].colorPalettes = []
  componentsThemeColor[key].shadowColor = ''
  appliedPrimaryColors.delete(key)
}
// 上一次写入过组件级覆盖的键：覆盖被移除时要复位为「未配置」，否则会残留上一次的色阶
let componentOverrideKeys: string[] = []
// 监听各个组件主题变化
watch(
  themePrimaryColorsSignature,
  () => {
    // 未单独配置主色的组件沿用 common：common 变化时它们的实际主色随之变化，故不会被跳过重写
    const commonPrimaryColor = props.theme.common?.primaryColor || '#1677ff'
    const currentKeys = Object.keys(props.theme).filter((key) => key !== 'common')
    // 已从主题中移除的组件键复位为「未配置」，使 `useInject` 回退 common
    componentOverrideKeys.forEach((key) => {
      if (!currentKeys.includes(key)) {
        resetComponentTheme(key)
      }
    })
    currentKeys.forEach((key) => {
      // 主题表只登记本库组件：使用方写入库内不存在的键（拼写错误等）时跳过并提示，
      // 避免一个坏键中断整个回调，导致其余组件的主题色不再更新
      if (!registeredThemeKeys.has(key)) {
        if (import.meta.env.DEV) {
          console.warn(`[vue-amazing-ui] ConfigProvider 的 theme 中存在非本库组件键：${key}，已忽略`)
        }
        return
      }
      applyComponentTheme(key, props.theme[key as keyof Theme]?.primaryColor || commonPrimaryColor)
    })
    componentOverrideKeys = currentKeys
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
