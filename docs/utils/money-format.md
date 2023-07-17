# 金额格式化

::: details  Show Source Code

```ts
function moneyFormat (value: number|string, decimal = 2, split = ',') {
  function thousandFormat (numStr: string): string {
    const len = numStr.length
    return len <= 3 ? numStr : thousandFormat(numStr.slice(0, len - 3)) + split + numStr.slice(len - 3, len)
  }
  const money = String(value)
  if (isFinite(parseFloat(money))) { // num是数字
    if (parseFloat(money) === 0) { // 为0
      return parseFloat(money).toFixed(decimal)
    } else { // 非0
      var res = ''
      var dotIndex = money.indexOf('.')
      if (dotIndex === -1) { // 整数
        if (decimal === 0) {
          res = thousandFormat(money)
        } else {
          res = thousandFormat(money) + '.' + '0'.repeat(decimal)
        }
      } else { // 非整数
        // 四舍五入 Math.round()：正数时4舍5入，负数时5舍6入
        // Math.round(1.5) = 2
        // Math.round(-1.5) = -1
        // Math.round(-1.6) = -2
        // 保留decimals位小数
        const numStr = String((Math.round(parseFloat(money) * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal)) // 四舍五入，然后固定保留2位小数
        const decimals = numStr.slice(dotIndex, dotIndex + decimal + 1) // 截取小数位
        res = thousandFormat(numStr.slice(0, dotIndex)) + decimals
      }
      return res
    }
  } else {
    return '--'
  }
}
```

:::

## 何时使用

- 格式化金额时

## 基本使用

**自定义保留 `decimal` 位小数，并使用 `split` 分隔符进行数字格式化**

```vue
<script setup lang="ts">
import { moneyFormat } from 'vue-amazing-ui'

moneyFormat(123456789.87654321, 2, ',') // 123,456,789.88
</script>
```

## Params

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
value | 需要格式化的目标数字 | number &#124; string | - | true
decimal | 保留几位小数 | number | 2 | false
split | 千分位分隔符 | string | ',' | false
