# 获取依赖注入 useInject

<GlobalElement />

_读取主题色（颜色调色板与阴影色）的组合式函数，未注入时回退到默认主题色_

::: details Show Source Code

```ts
import { TinyColor } from '@ctrl/tinycolor'
import { generate } from '@ant-design/colors'
import { inject, reactive, toRefs } from 'vue'
import type { Ref } from 'vue'
/**
 * 使用依赖注入的函数
 * 用于获取颜色调色板和阴影颜色
 * 如果在组件中使用，则会尝试从组件的依赖注入中获取颜色配置
 * 如果未找到，则回退到全局的默认颜色配置
 *
 * @param {string} key 组件名，用于在组件的依赖注入中查找颜色配置
 * @returns {{ colorPalettes: Ref<string[]>, shadowColor: Ref<string> }} 返回包含颜色调色板和阴影颜色的主题对象
 */
export function useInject(key: string): { colorPalettes: Ref<string[]>; shadowColor: Ref<string> } {
  // 获取默认的颜色调色板
  const colorPalettes = getColorPalettes('#1677ff')
  // 获取 common 的依赖注入
  const commonInjectValue = inject('common', reactive({ colorPalettes, shadowColor: getAlphaColor(colorPalettes[0]) }))
  // 获取组件的依赖注入
  const componentsInjectValue = inject('components', null) as Record<
    string,
    { colorPalettes: string[]; shadowColor: string }
  > | null
  if (
    componentsInjectValue !== null &&
    key in componentsInjectValue &&
    componentsInjectValue[key].colorPalettes.length
  ) {
    return toRefs(componentsInjectValue[key])
  }
  return toRefs(commonInjectValue)
}
/**
 * 获取颜色调色板
 *
 * @param {string} primaryColor 主色
 * @returns {string[]} 返回颜色调色板
 */
export function getColorPalettes(primaryColor: string): string[] {
  return generate(primaryColor)
}
/**
 * 是否为可靠的颜色值
 *
 * @param {number} color 颜色值
 * @returns {boolean} 返回颜色值是否可靠
 */
function isStableColor(color: number): boolean {
  return color >= 0 && color <= 255
}
/**
 * 获取透明度颜色，一般用作阴影色
 *
 * @param {string} frontColor 前景色
 * @param {string} [backgroundColor = '#ffffff'] 背景色
 * @returns {string} 返回透明度颜色
 */
export function getAlphaColor(frontColor: string, backgroundColor: string = '#ffffff'): string {
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
```

:::

<script setup lang="ts">
import { h, ref } from 'vue'
import { TinyColor } from '@ctrl/tinycolor'
import { Tooltip, useInject } from 'vue-amazing-ui'
const primaryColor = ref('#1677ff')
const presetColors = ['#1677ff', '#ff6900', '#18a058', '#ff4d4f']
// 内联组件：在 ConfigProvider 内部调用 useInject，读取注入的主题色
const ThemePreview = {
  setup() {
    const { colorPalettes, shadowColor } = useInject('Button')
    const labelStyle = 'font-size: 13px'
    const swatchStyle = (color: string) =>
      `display: inline-block; width: 28px; height: 28px; border-radius: 4px; background: ${color}`
    // 依据气泡背景色亮度选择可读的文字色
    const tooltipTextColor = (color: string) => {
      const { r, g, b } = new TinyColor(color).toRgb()
      return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? 'rgba(0, 0, 0, 0.88)' : '#fff'
    }
    return () => {
      const shadowBlockStyle =
        `width: 56px; height: 28px; border-radius: 4px; background: #fff;` +
        ` border: 1px solid rgba(0, 0, 0, 0.06); box-shadow: 0 6px 16px 0 ${shadowColor.value}`
      return h('div', { style: 'display: flex; flex-direction: column; gap: 12px' }, [
        h('div', { style: 'display: flex; align-items: center; gap: 8px' }, [
          h('span', { style: labelStyle }, 'colorPalettes:'),
          h(
            'div',
            { style: 'display: flex; align-items: center; gap: 4px' },
            colorPalettes.value.map((color: string) =>
              h(
                Tooltip,
                { key: color, tooltip: color, bgColor: color, tooltipStyle: { color: tooltipTextColor(color) } },
                { default: () => h('span', { style: swatchStyle(color) }) }
              )
            )
          )
        ]),
        h('div', { style: 'display: flex; align-items: center; gap: 8px' }, [
          h('span', { style: labelStyle }, 'shadowColor:'),
          h('span', { style: shadowBlockStyle }),
          h('span', { style: labelStyle }, shadowColor.value)
        ])
      ])
    }
  }
}
</script>

## 基本使用

_在 `ConfigProvider` 内部调用 `useInject`，即可读取注入的组件 / 全局主题色；悬浮色块可查看对应色值_

<br/>

<Space vertical>
  <Space :gap="8">
    <span>primaryColor</span>
    <Button
      v-for="color in presetColors"
      :key="color"
      type="primary"
      :color="color"
      size="small"
      @click="primaryColor = color"
    >
      {{ color }}
    </Button>
  </Space>
  <ConfigProvider :theme="{ common: { primaryColor } }">
    <ThemePreview />
  </ConfigProvider>
</Space>

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { TinyColor } from '@ctrl/tinycolor'
import { Tooltip, useInject } from 'vue-amazing-ui'
const primaryColor = ref('#1677ff')
const presetColors = ['#1677ff', '#ff6900', '#18a058', '#ff4d4f']
// 内联组件：在 ConfigProvider 内部调用 useInject，读取注入的主题色
const ThemePreview = {
  setup() {
    const { colorPalettes, shadowColor } = useInject('Button')
    const labelStyle = 'font-size: 13px'
    const swatchStyle = (color: string) =>
      `display: inline-block; width: 28px; height: 28px; border-radius: 4px; background: ${color}`
    // 依据气泡背景色亮度选择可读的文字色
    const tooltipTextColor = (color: string) => {
      const { r, g, b } = new TinyColor(color).toRgb()
      return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? 'rgba(0, 0, 0, 0.88)' : '#fff'
    }
    return () => {
      const shadowBlockStyle =
        `width: 56px; height: 28px; border-radius: 4px; background: #fff;` +
        ` border: 1px solid rgba(0, 0, 0, 0.06); box-shadow: 0 6px 16px 0 ${shadowColor.value}`
      return h('div', { style: 'display: flex; flex-direction: column; gap: 12px' }, [
        h('div', { style: 'display: flex; align-items: center; gap: 8px' }, [
          h('span', { style: labelStyle }, 'colorPalettes:'),
          h(
            'div',
            { style: 'display: flex; align-items: center; gap: 4px' },
            colorPalettes.value.map((color: string) =>
              h(
                Tooltip,
                { key: color, tooltip: color, bgColor: color, tooltipStyle: { color: tooltipTextColor(color) } },
                { default: () => h('span', { style: swatchStyle(color) }) }
              )
            )
          )
        ]),
        h('div', { style: 'display: flex; align-items: center; gap: 8px' }, [
          h('span', { style: labelStyle }, 'shadowColor:'),
          h('span', { style: shadowBlockStyle }),
          h('span', { style: labelStyle }, shadowColor.value)
        ])
      ])
    }
  }
}
</script>
<template>
  <Space vertical>
    <Space :gap="8">
      <span>primaryColor</span>
      <Button
        v-for="color in presetColors"
        :key="color"
        type="primary"
        :color="color"
        size="small"
        @click="primaryColor = color"
      >
        {{ color }}
      </Button>
    </Space>
    <ConfigProvider :theme="{ common: { primaryColor } }">
      <ThemePreview />
    </ConfigProvider>
  </Space>
</template>
```

## Params

| 参数 | 说明   | 类型   | 默认值    |
| ---- | ------ | ------ | --------- |
| key  | 组件名 | string | undefined |

## Return

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| colorPalettes | 颜色调色板数组 | Ref&lt;string[]&gt; |
| shadowColor | 阴影颜色 | Ref&lt;string&gt; |

## 注意事项

- 主题色通过 `Vue` 的 `inject` 读取，注入来源为 `ConfigProvider` 提供的 `common` / `components`；组件内部使用时会优先取对应组件的配置，`key` 不存在或未配置时回退到全局调色板
- 未注册 `ConfigProvider` 时返回默认主题色，可脱离 `ConfigProvider` 独立使用
