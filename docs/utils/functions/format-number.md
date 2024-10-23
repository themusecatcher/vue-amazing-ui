# 数字格式化 formatNumber

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="成为赞助者 !"
  :tooltip-props="{
    tooltipStyle: {
      fontWeight: 500
    }
  }"
  href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
  target="_blank"
>
  <template #description>
    <span style="font-size: 14px; font-weight: 600;">赞助</span>
  </template>
</FloatButton>
<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

::: details Show Source Code

```ts
/**
 * 数字格式化函数
 *
 * 该函数提供了一种灵活的方式将数字格式化为字符串，包括设置精度、千位分隔符、小数点字符、前缀和后缀
 *
 * @param value 要格式化的数字或数字字符串
 * @param precision 小数点后的位数，默认为 2
 * @param separator 千分位分隔符，默认为 ','
 * @param decimal 小数点字符，默认为 '.'
 * @param prefix 数字前的字符串，默认为 undefined
 * @param suffix 数字后的字符串，默认为 undefined
 * @returns 格式化后的字符串；如果输入值不是数字或字符串，则抛出类型错误
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
  // 处理非数值或NaN的情况
  const numValue = Number(value)
  if (isNaN(numValue) || !isFinite(numValue)) {
    return ''
  }
  if (numValue === 0) {
    return numValue.toFixed(precision)
  }
  let formatValue = numValue.toFixed(precision)
  // 如果 separator 是数值而非字符串，会导致错误，此处进行检查
  if (typeof separator === 'string' && separator !== '') {
    const [integerPart, decimalPart] = formatValue.split('.')
    formatValue =
      integerPart.replace(/(\d)(?=(\d{3})+$)/g, '$1' + separator) + (decimalPart ? decimal + decimalPart : '')
  }
  return (prefix || '') + formatValue + (suffix || '')
}
```

:::

## 何时使用

- 格式化数字时

<script setup lang="ts">
import { formatNumber } from 'vue-amazing-ui'
</script>

## 基本使用

**自定义保留 `precision` 位小数，并使用 `separator` 分隔符进行数字格式化**

<h4>{{ formatNumber(123456789.87654321, 2, ',') }}</h4>

```vue
<script setup lang="ts">
import { formatNumber } from 'vue-amazing-ui'

formatNumber(123456789.87654321, 2, ',') // 123,456,789.88
</script>
```

## Params

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
value | 要格式化的数字或数字字符串 | number &#124; string | undefined
precision | 小数点后的位数 | number | 2
separator | 千分位分隔符 | string | ','
decimal | 小数点字符 | string | '.'
prefix? | 数字前的字符串 | string | undefined
suffix? | 数字后的字符串 | string | undefined
