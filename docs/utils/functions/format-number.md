# 数字格式化 formatNumber

<GlobalElement />

_格式化数字为指定格式的工具函数_

::: details Show Source Code

```ts
/**
 * 数字格式化
 *
 * 支持精度、千分位分隔符、小数点字符、前后缀的自由组合（如金额 `$1,234.50`）。
 *
 * @param value - 要格式化的数字或数字字符串
 * @param precision - 保留的小数位数，默认 2
 * @param separator - 千分位分隔符，默认 `','`
 * @param decimal - 小数点字符，默认 `'.'`
 * @param prefix - 前缀，默认无
 * @param suffix - 后缀，默认无
 * @returns 格式化后的字符串；`value` 无法转为有效数字时返回空字符串（类型不符仅告警）
 */
export function formatNumber(
  value: number | string,
  precision: number = 2,
  separator: string = ',',
  decimal: string = '.',
  prefix?: string,
  suffix?: string
): string {
  // 类型检查
  if (typeof value !== 'number' && typeof value !== 'string') {
    console.warn('Expected value to be of type number or string')
  }
  if (typeof precision !== 'number') {
    console.warn('Expected precision to be of type number')
  }
  // 转换为数字，非数值 / NaN / Infinity 一律返回空串
  const numValue = Number(value)
  if (isNaN(numValue) || !isFinite(numValue)) {
    return ''
  }
  const [integerPart, decimalPart] = numValue.toFixed(precision).split('.')
  // separator 非字符串或为空串时跳过千分位，避免拼入非法字符
  const formattedInteger =
    typeof separator === 'string' && separator !== ''
      ? integerPart.replace(/(\d)(?=(\d{3})+$)/g, `$1${separator}`)
      : integerPart
  const formatValue = decimalPart ? `${formattedInteger}${decimal}${decimalPart}` : formattedInteger
  return `${prefix || ''}${formatValue}${suffix || ''}`
}
```

:::

<script setup lang="ts">
import { formatNumber } from 'vue-amazing-ui'
const samples = [
  { label: '默认（保留 2 位小数 + 千分位）', value: formatNumber(123456789.87654321) },
  { label: '保留 4 位小数', value: formatNumber(123456789.87654321, 4) },
  { label: '空格作千分位分隔符', value: formatNumber(123456789.87654321, 2, ' ') },
  { label: '自定义小数点 + 前后缀', value: formatNumber(1234567.89, 2, ',', '.', '¥', ' 元') },
  { label: '无法转为有效数字', value: formatNumber('abc') }
]
</script>

## 基本使用

_自定义保留 `precision` 位小数，并使用 `separator` 分隔符进行数字格式化_

<br/>

<Space vertical align="stretch" :gap="8">
  <Alert v-for="item in samples" :key="item.label" type="info" :message="`${item.label}：${item.value}`" />
</Space>

```vue
<script setup lang="ts">
import { formatNumber } from 'vue-amazing-ui'
const samples = [
  { label: '默认（保留 2 位小数 + 千分位）', value: formatNumber(123456789.87654321) },
  { label: '保留 4 位小数', value: formatNumber(123456789.87654321, 4) },
  { label: '空格作千分位分隔符', value: formatNumber(123456789.87654321, 2, ' ') },
  { label: '自定义小数点 + 前后缀', value: formatNumber(1234567.89, 2, ',', '.', '¥', ' 元') },
  { label: '无法转为有效数字', value: formatNumber('abc') }
]
</script>
<template>
  <Space vertical align="stretch" :gap="8">
    <Alert v-for="item in samples" :key="item.label" type="info" :message="`${item.label}：${item.value}`" />
  </Space>
</template>
```

## Params

| 参数      | 说明                       | 类型                 | 默认值    |
| --------- | -------------------------- | -------------------- | --------- |
| value     | 要格式化的数字或数字字符串 | number &#124; string | undefined |
| precision | 小数点后的位数             | number               | 2         |
| separator | 千分位分隔符               | string               | ','       |
| decimal   | 小数点字符                 | string               | '.'       |
| prefix?   | 数字前的字符串             | string               | undefined |
| suffix?   | 数字后的字符串             | string               | undefined |

## Return

| 类型 | 说明 |
| --- | --- |
| string | 格式化后的数字字符串 |

## 注意事项

- `value` 无法转换为有效数字（如非数字字符串、`NaN`、`Infinity`）时返回空字符串 `''`
- `value` 或 `precision` 类型不符时仅通过 `console.warn` 告警，不会中断执行
- `separator` 非字符串或为空串时跳过千分位分组，整数部分原样输出
