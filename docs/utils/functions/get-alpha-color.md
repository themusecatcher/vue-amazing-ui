# 获取透明度颜色 getAlphaColor

<GlobalElement />

_根据前景色计算透明度颜色的工具函数，一般用作阴影色_

::: details Show Source Code

```ts
import { TinyColor } from '@ctrl/tinycolor'
import { TinyColor } from '@ctrl/tinycolor'

/**
 * 判断 RGB 单通道值是否落在合法区间
 *
 * @param color - 单个通道的取值
 * @returns 是否在 0~255 之间
 */
function isStableColor(color: number): boolean {
  return color >= 0 && color <= 255
}
/**
 * 计算前景色叠在背景色上所需的最小不透明度 α，一般用作阴影色
 *
 * 从 0.01 起逐步增大 α，取第一个能反解出合法 RGB 的取值 —— 这样得到的阴影与背景同色系，
 * 且由浏览器精确还原；前景色本身已带透明度（a < 1）时原样返回。
 *
 * @param frontColor - 前景色
 * @param backgroundColor - 背景色；可选，默认 '#ffffff'
 * @returns rgba 字符串形式的透明度颜色
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
import { TinyColor } from '@ctrl/tinycolor'
import { Tooltip, getAlphaColor } from 'vue-amazing-ui'
// 依据气泡背景色亮度选择可读的文字色（透明度色与前景色 RGB 一致，可按前景色判断）
const tooltipTextColor = (color: string) => {
  const { r, g, b } = new TinyColor(color).toRgb()
  return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? 'rgba(0, 0, 0, 0.88)' : '#fff'
}
// 预计算透明度色与文字色，避免在模板中重复调用
const shadowColors = ['#1677ff', '#ff6900', '#18a058', '#ff4d4f'].map((color) => ({
  color,
  alphaColor: getAlphaColor(color),
  textColor: tooltipTextColor(color)
}))
</script>

## 基本使用

_根据前景色计算带透明度的阴影颜色，一般用作阴影色；悬浮色块可查看计算出的透明度颜色_

<br/>

<div class="shadow-wrap">
  <Tooltip
    v-for="item in shadowColors"
    :key="item.color"
    :tooltip="item.alphaColor"
    :bg-color="item.alphaColor"
    :tooltip-style="{ color: item.textColor }"
  >
    <div
      class="shadow-block"
      :style="{ background: item.color, boxShadow: `0 6px 16px 0 ${item.alphaColor}` }"
    ></div>
  </Tooltip>
</div>

<style lang="less" scoped>
.shadow-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  .shadow-block {
    display: inline-block;
    width: 56px;
    height: 56px;
    border-radius: 8px;
  }
}
</style>

```vue
<script setup lang="ts">
import { TinyColor } from '@ctrl/tinycolor'
import { Tooltip, getAlphaColor } from 'vue-amazing-ui'
// 依据气泡背景色亮度选择可读的文字色（透明度色与前景色 RGB 一致，可按前景色判断）
const tooltipTextColor = (color: string) => {
  const { r, g, b } = new TinyColor(color).toRgb()
  return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? 'rgba(0, 0, 0, 0.88)' : '#fff'
}
// 预计算透明度色与文字色，避免在模板中重复调用
const shadowColors = ['#1677ff', '#ff6900', '#18a058', '#ff4d4f'].map((color) => ({
  color,
  alphaColor: getAlphaColor(color),
  textColor: tooltipTextColor(color)
}))
</script>
<template>
  <div class="shadow-wrap">
    <Tooltip
      v-for="item in shadowColors"
      :key="item.color"
      :tooltip="item.alphaColor"
      :bg-color="item.alphaColor"
      :tooltip-style="{ color: item.textColor }"
    >
      <div
        class="shadow-block"
        :style="{ background: item.color, boxShadow: `0 6px 16px 0 ${item.alphaColor}` }"
      ></div>
    </Tooltip>
  </div>
</template>
<style lang="less" scoped>
.shadow-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  .shadow-block {
    display: inline-block;
    width: 56px;
    height: 56px;
    border-radius: 8px;
  }
}
</style>
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
