# 日期格式化 dateFormat

<GlobalElement />

_格式化日期为指定格式的工具函数_

::: details Show Source Code

```ts
/**
 * 格式化日期时间字符串
 *
 * @param {number | string | Date} [value = Date.now()] 待格式化的日期时间值，支持数字、字符串和 Date 类型，默认为当前时间戳
 * @param {string} [format = 'YYYY-MM-DD HH:mm:ss'] 格式化字符串，默认为'YYYY-MM-DD HH:mm:ss'，支持格式化参数：YY：年，M：月，D：日，H：时，m：分钟，s：秒，SSS：毫秒
 * @returns {string} 返回格式化后的日期时间字符串
 */
export function dateFormat(value: number | string | Date = Date.now(), format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  try {
    let date: Date
    if (typeof value === 'number' || typeof value === 'string') {
      date = new Date(value)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }
    } else {
      date = value
    }
    const padZero = (value: number, len: number = 2): string => {
      // 左侧补零函数
      return String(value).padStart(len, '0')
    }
    const replacement = (match: string) => {
      switch (match) {
        case 'YYYY':
          return padZero(date.getFullYear())
        case 'YY':
          return padZero(date.getFullYear()).slice(2, 4)
        case 'MM':
          return padZero(date.getMonth() + 1)
        case 'M':
          return String(date.getMonth() + 1)
        case 'DD':
          return padZero(date.getDate())
        case 'D':
          return String(date.getDate())
        case 'HH':
          return padZero(date.getHours())
        case 'H':
          return String(date.getHours())
        case 'mm':
          return padZero(date.getMinutes())
        case 'm':
          return String(date.getMinutes())
        case 'ss':
          return padZero(date.getSeconds())
        case 's':
          return String(date.getSeconds())
        case 'SSS':
          return padZero(date.getMilliseconds(), 3)
        default:
          return match
      }
    }
    return format.replace(/(YYYY|YY|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS)/g, replacement)
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}
```

:::

<script setup lang="ts">
import { ref } from 'vue'
import { dateFormat } from 'vue-amazing-ui'
const date = ref(dateFormat(new Date()))
const updateDate = () => {
  date.value = dateFormat(new Date())
  requestAnimationFrame(updateDate)
}
requestAnimationFrame(updateDate)
const realTime = ref(dateFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss:SSS'))
const updateTime = () => {
  realTime.value = dateFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss:SSS')
  requestAnimationFrame(updateTime)
}
requestAnimationFrame(updateTime)
</script>

## 基本使用

_格式化时间戳_

<br/>

<Alert :message="date" type="info" />

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { dateFormat } from 'vue-amazing-ui'
const date = ref(dateFormat(new Date()))
const updateDate = () => {
  date.value = dateFormat(new Date())
  requestAnimationFrame(updateDate)
}
requestAnimationFrame(updateDate)
</script>
```

## 格式化字符串

<Alert message="10/10/2025" type="info" />

```vue
<script setup lang="ts">
import { dateFormat } from 'vue-amazing-ui'
dateFormat('2025-10-10', 'MM/DD/YYYY') // 10/10/2025
</script>
```

## 展示毫秒值

<Alert :message="realTime" type="info" />

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { dateFormat } from 'vue-amazing-ui'
const realTime = ref(dateFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss:SSS'))
const updateTime = () => {
  realTime.value = dateFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss:SSS')
  requestAnimationFrame(updateTime)
}
requestAnimationFrame(updateTime)
</script>
```

## Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 待格式化的日期时间值，支持数字、字符串和 `Date` 类型，默认为当前时间戳 | number &#124; string &#124; Date | Date.now() |
| format | 格式化字符串 | string | 'YYYY-MM-DD HH:mm:ss' |

## format 支持的格式化占位符列表

| 标识 | 示例    | 描述         |
| ---- | ------- | ------------ |
| YY   | 23      | 年，两位数   |
| YYYY | 2023    | 年，四位数   |
| M    | 1-12    | 月，从1开始  |
| MM   | 01-12   | 月，两位数   |
| D    | 1-31    | 日           |
| DD   | 01-31   | 日，两位数   |
| H    | 0-23    | 小时         |
| HH   | 00-23   | 小时，两位数 |
| m    | 0-59    | 分钟         |
| mm   | 00-59   | 分钟，两位数 |
| s    | 0-59    | 秒           |
| ss   | 00-59   | 秒，两位数   |
| SSS  | 000-999 | 毫秒，三位数 |
