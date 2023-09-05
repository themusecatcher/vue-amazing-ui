# 数字格式化

::: details  Show Source Code

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
  const x = value.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  function isNumber (val: any) {
    return Object.prototype.toString.call(val) === '[object Number]'
  }
  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2')
    }
  }
  return prefix + x1 + x2 + suffix
}
```

:::

## 何时使用

- 格式化数字时

## 基本使用

**自定义保留 `precision` 位小数，并使用 `separator` 分隔符进行数字格式化**

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
