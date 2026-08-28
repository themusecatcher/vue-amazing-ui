# 获取颜色调色板 getColorPalettes

<GlobalElement />

_根据主色生成颜色调色板的工具函数_

::: details Show Source Code

```ts
import { generate } from '@ant-design/colors'
/**
 * 获取颜色调色板
 *
 * @param {string} primaryColor 主色
 * @returns {string[]} 返回颜色调色板
 */
export function getColorPalettes(primaryColor: string): string[] {
  return generate(primaryColor)
}
```

:::

<script setup lang="ts">
import { getColorPalettes } from 'vue-amazing-ui'
const colorPalettes = getColorPalettes('#1677ff')
console.log('colorPalettes', colorPalettes)
// ['#e6f4ff', '#bae0ff', '#91caff', '#69b1ff', '#4096ff', '#1677ff', '#0958d9', '#003eb3', '#002c8c', '#001d66']
</script>

## 基本使用

_根据主色生成 `1-10` 的颜色调色板_

```vue
<script setup lang="ts">
import { getColorPalettes } from 'vue-amazing-ui'
const colorPalettes = getColorPalettes('#1677ff')
console.log('colorPalettes', colorPalettes)
// ['#e6f4ff', '#bae0ff', '#91caff', '#69b1ff', '#4096ff', '#1677ff', '#0958d9', '#003eb3', '#002c8c', '#001d66']
</script>
```

## Params

| 参数 | 说明 | 类型   | 默认值    |
| ---- | ---- | ------ | --------- |
| primaryColor | 主色 | string | undefined |

## Return

| 类型 | 说明 |
| --- | --- |
| string[] | 根据主色生成的 `1-10` 颜色调色板 |
