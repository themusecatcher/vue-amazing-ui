# 数字格式化<BackTop />

::: details Show Source Code

```ts
function formatNumber (value: number|string, precision = 2, separator = ',', decimal = '.', prefix = '', suffix = ''): string {
  if (Number(value) === 0) {
    return Number(value).toFixed(precision)
  }
  if (!value) {
    return ''
  }
  value = Number(value).toFixed(precision)
  value += ''
  const nums = value.split('.')
  let integer = nums[0]
  const decimals = nums.length > 1 ? decimal + nums[1] : ''
  const reg = /(\d+)(\d{3})/
  function isNumber (value: any) {
    return Object.prototype.toString.call(value) === '[object Number]'
  }
  if (separator && !isNumber(separator)) {
    while (reg.test(integer)) {
      integer = integer.replace(reg, '$1' + separator + '$2')
    }
  }
  return prefix + integer + decimals + suffix
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

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
value | 需要格式化的目标数字 | number &#124; string | undefined | true
precision | 精度，保留小数点后几位 | number | 2 | false
separator | 千分位分隔符 | string | ',' | false
decimal | 小数点字符 | string | '.' | false
prefix | 前缀字符 | string | '' | false
suffix | 后缀字符 | string | '' | false
