# 日期格式化<BackTop />

::: details  Show Source Code

```ts
function dateFormat (value: number|string|Date = Date.now(), format = 'YYYY-MM-DD HH:mm:ss'): string {
  if (typeof value === 'number' || typeof value === 'string') {
    var date = new Date(value)
  } else {
    var date = value
  }
  function fixedTwo (value: number): string {
    return value < 10 ? '0' + value : String(value)
  }
  var showTime = format
  if (showTime.includes('SSS')) {
    const S = date.getMilliseconds()
    showTime = showTime.replace('SSS', '0'.repeat(3 - String(S).length) + S)
  }
  if (showTime.includes('YY')) {
    const Y = date.getFullYear()
    showTime = showTime.includes('YYYY') ? showTime.replace('YYYY', String(Y)) : showTime.replace('YY', String(Y).slice(2, 4))
  }
  if (showTime.includes('M')) {
    const M = date.getMonth() + 1
    showTime = showTime.includes('MM') ? showTime.replace('MM', fixedTwo(M)) : showTime.replace('M', String(M))
  }
  if (showTime.includes('D')) {
    const D = date.getDate()
    showTime = showTime.includes('DD') ? showTime.replace('DD', fixedTwo(D)) : showTime.replace('D', String(D))
  }
  if (showTime.includes('H')) {
    const H = date.getHours()
    showTime = showTime.includes('HH') ? showTime.replace('HH', fixedTwo(H)) : showTime.replace('H', String(H))
  }
  if (showTime.includes('m')) {
    var m = date.getMinutes()
    showTime = showTime.includes('mm') ? showTime.replace('mm', fixedTwo(m)) : showTime.replace('m', String(m))
  }
  if (showTime.includes('s')) {
    var s = date.getSeconds()
    showTime = showTime.includes('ss') ? showTime.replace('ss', fixedTwo(s)) : showTime.replace('s', String(s))
  }
  return showTime
}
```

:::

## 何时使用

- 格式化日期时

## 基本使用

*格式化时间戳*

<br/>

**2023-05-31 14:20:45**

```vue
<script setup lang="ts">
import { dateFormat } from 'vue-amazing-ui'

dateFormat(1685514045679) // 2023-05-31 14:20:45
</script>
```

## 格式化字符串

<br/>

**05/31/2023**

```vue
<script setup lang="ts">
import { dateFormat } from 'vue-amazing-ui'

dateFormat('2023-05-31', 'MM/DD/YYYY') // 05/31/2023
</script>
```

## 展示毫秒值

<br/>

**2023-05-31 14:20:45:679**

```vue
<script setup lang="ts">
import { dateFormat } from 'vue-amazing-ui'

dateFormat(1685514045679, 'YYYY-MM-DD HH:mm:ss:SSS') // 2023-05-31 14:20:45:679
</script>
```

## Params

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
value | 13位时间戳；或者可以转化为Date类型的字符串日期；或者Date对象 | number &#124; string &#124; Date | Date.now() | false
format | 格式化目标形式 | string | 'YYYY-MM-DD HH:mm:ss' | false

## format 支持的格式化占位符列表

标识 | 示例 | 描述
-- | -- | --
YY | 23 | 年，两位数
YYYY | 2023 | 年，四位数
M | 1-12 | 月，从1开始
MM | 01-12 | 月，两位数
D | 1-31 | 日
DD | 01-31 | 日，两位数
H | 0-23 | 小时
HH | 00-23 | 小时，两位数
m | 0-59 | 分钟
mm | 00-59 | 分钟，两位数
s | 0-59 | 秒
ss | 00-59 | 秒，两位数
SSS | 000-999 |毫秒，三位数
