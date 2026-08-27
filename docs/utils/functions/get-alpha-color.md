# 获取透明度颜色 getAlphaColor

<GlobalElement />

_根据前景色计算透明度颜色的工具函数，一般用作阴影色_

::: details Show Source Code

```ts
import { TinyColor } from '@ctrl/tinycolor'
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
import { getAlphaColor } from 'vue-amazing-ui'
const shadowColor = getAlphaColor('#1677ff')
console.log('shadowColor', shadowColor)
// rgba(22, 119, 255, 0.15)
</script>

## 基本使用

_根据前景色计算带透明度的阴影颜色_

```vue
<script setup lang="ts">
import { getAlphaColor } from 'vue-amazing-ui'
const shadowColor = getAlphaColor('#1677ff')
console.log('shadowColor', shadowColor)
// rgba(22, 119, 255, 0.15)
</script>
```

## Params

| 参数 | 说明 | 类型   | 默认值    |
| ---- | ---- | ------ | --------- |
| frontColor | 前景色 | string | undefined |
| backgroundColor | 背景色，用于计算透明度的参照色 | string | '#ffffff' |

## Return

| 类型 | 说明 |
| --- | --- |
| string | 计算出的带透明度的颜色值 |
