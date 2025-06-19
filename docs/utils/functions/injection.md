# 获取依赖注入 useInject

<GlobalElement />

_使用依赖注入的自定义函数_

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
 * @param key 组件名，用于在组件的依赖注入中查找颜色配置
 * @returns 返回包含颜色调色板和阴影颜色的主题对象
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
```

:::

## 基本使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useInject } from 'vue-amazing-ui'
const { colorPalettes, shadowColor } = useInject('Input') // 获取颜色调色板和阴影颜色
console.log('colorPalettes', colorPalettes.value)
console.log('shadowColor', shadowColor.value)
</script>
```

## Params

| 参数 | 说明   | 类型   | 默认值    |
| ---- | ------ | ------ | --------- |
| key  | 组件名 | string | undefined |
