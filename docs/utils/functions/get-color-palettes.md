# 获取颜色调色板 getColorPalettes

<GlobalElement />

_根据主色生成颜色调色板的工具函数_

::: details Show Source Code

```ts
import { generate } from '@ant-design/colors'

/**
 * 获取主色对应的调色板
 *
 * @param primaryColor - 主色（如 `#1677ff`）
 * @returns 由浅到深共 10 个色值的数组（@ant-design/colors 生成）
 */
export function getColorPalettes(primaryColor: string): string[] {
  return generate(primaryColor)
}
```

:::

<script setup lang="ts">
import { TinyColor } from '@ctrl/tinycolor'
import { Tooltip, getColorPalettes } from 'vue-amazing-ui'
// 依据气泡背景色亮度选择可读的文字色
const tooltipTextColor = (color: string) => {
  const { r, g, b } = new TinyColor(color).toRgb()
  return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? 'rgba(0, 0, 0, 0.88)' : '#fff'
}
// 预计算各主色的调色板与文字色，避免在模板中重复调用
const paletteGroups = ['#1677ff', '#ff6900', '#18a058', '#ff4d4f'].map((primaryColor) => ({
  primaryColor,
  colors: getColorPalettes(primaryColor).map((color, index) => ({
    color,
    label: `${index + 1} · ${color}`,
    textColor: tooltipTextColor(color)
  }))
}))
</script>

## 基本使用

_根据主色生成 `1-10` 的颜色调色板；悬浮色块可查看档位与色值_

<br/>

<div class="palette-list">
  <div v-for="group in paletteGroups" :key="group.primaryColor" class="palette-group">
    <div class="palette-title">
      <span class="title-dot" :style="{ background: group.primaryColor }"></span>
      {{ group.primaryColor }}
    </div>
    <div class="palette-wrap">
      <Tooltip
        v-for="item in group.colors"
        :key="item.color"
        :tooltip="item.label"
        :bg-color="item.color"
        :tooltip-style="{ color: item.textColor }"
      >
        <div class="palette-block" :style="{ background: item.color }"></div>
      </Tooltip>
    </div>
  </div>
</div>

<style lang="less" scoped>
.palette-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.palette-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  .palette-title {
    display: flex;
    align-items: center;
    gap: 6px;
    .title-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
  }
  .palette-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    .palette-block {
      display: inline-block;
      width: 56px;
      height: 56px;
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 6px;
    }
  }
}
</style>

```vue
<script setup lang="ts">
import { TinyColor } from '@ctrl/tinycolor'
import { Tooltip, getColorPalettes } from 'vue-amazing-ui'
// 依据气泡背景色亮度选择可读的文字色
const tooltipTextColor = (color: string) => {
  const { r, g, b } = new TinyColor(color).toRgb()
  return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? 'rgba(0, 0, 0, 0.88)' : '#fff'
}
// 预计算各主色的调色板与文字色，避免在模板中重复调用
const paletteGroups = ['#1677ff', '#ff6900', '#18a058', '#ff4d4f'].map((primaryColor) => ({
  primaryColor,
  colors: getColorPalettes(primaryColor).map((color, index) => ({
    color,
    label: `${index + 1} · ${color}`,
    textColor: tooltipTextColor(color)
  }))
}))
</script>
<template>
  <div class="palette-list">
    <div v-for="group in paletteGroups" :key="group.primaryColor" class="palette-group">
      <div class="palette-title">
        <span class="title-dot" :style="{ background: group.primaryColor }"></span>
        {{ group.primaryColor }}
      </div>
      <div class="palette-wrap">
        <Tooltip
          v-for="item in group.colors"
          :key="item.color"
          :tooltip="item.label"
          :bg-color="item.color"
          :tooltip-style="{ color: item.textColor }"
        >
          <div class="palette-block" :style="{ background: item.color }"></div>
        </Tooltip>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.palette-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.palette-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  .palette-title {
    display: flex;
    align-items: center;
    gap: 6px;
    .title-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
  }
  .palette-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    .palette-block {
      display: inline-block;
      width: 56px;
      height: 56px;
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 6px;
    }
  }
}
</style>
```

## Params

| 参数 | 说明 | 类型   | 默认值    |
| ---- | ---- | ------ | --------- |
| primaryColor | 主色 | string | undefined |

## Return

| 类型 | 说明 |
| --- | --- |
| string[] | 根据主色生成的 `1-10` 颜色调色板 |
