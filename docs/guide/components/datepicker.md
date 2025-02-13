# 日期选择 DatePicker<Tag color="volcano" style="vertical-align: top; margin-left: 6px;">{{ pkg.dependencies['@vuepic/vue-datepicker'] }}</Tag>

<GlobalElement />

*输入或选择日期的控件*

## 何时使用

- 当用户需要选择或输入一个日期，弹出日期面板进行选择

## 官方文档

- [Vue Datepicker](https://vue3datepicker.com/)
- [Vue Datepicker Documents](https://vue3datepicker.com/installation/)
- [date-fns](https://date-fns.org/)

<script setup lang="ts">
import pkg from '../../../package.json'
import { ref, watchEffect } from 'vue'
import {
  format,
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subMonths,
  addDays,
  startOfWeek,
  endOfWeek,
  addHours,
  addMinutes,
  addSeconds
} from 'date-fns'
const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
const dateTimeValue = ref(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
const rangeValue = ref<string[]>([format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 1), 'yyyy-MM-dd')])
const timeRangeValue = ref([
  {
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds()
  },
  {
    hours: addHours(Date.now(), 1).getHours(),
    minutes: addMinutes(Date.now(), 10).getMinutes(),
    seconds: addSeconds(Date.now(), 30).getSeconds()
  }
])
const presetDates = ref([
  { label: 'Today', value: [new Date(), new Date()] },
  { label: 'This month', value: [startOfMonth(new Date()), endOfMonth(new Date())] },
  {
    label: 'Last month',
    value: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
  },
  { label: 'This year', value: [startOfYear(new Date()).getTime(), endOfYear(new Date()).getTime()] }
])
const timeValue = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
})
const secondsValue = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
  seconds: new Date().getSeconds()
})
// startOfWeek & endOfWeek 默认以周日作为一周的开始，可以传递一个选项对象，以周一作为一周的开始：{ weekStartsOn: 1 }
const options: any = { weekStartsOn: 1 }
const weekValue = ref([startOfWeek(new Date(), options), endOfWeek(new Date(), options)])
const monthValue = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth()
})
const yearValue = ref(new Date().getFullYear())
watchEffect(() => {
  console.log('dateValue', dateValue.value)
})
watchEffect(() => {
  console.log('dateTimeValue', dateTimeValue.value)
})
watchEffect(() => {
  console.log('rangeValue', rangeValue.value)
})
watchEffect(() => {
  console.log('timeRangeValue', timeRangeValue.value)
})
watchEffect(() => {
  console.log('timeValue', timeValue.value)
})
watchEffect(() => {
  console.log('secondsValue', secondsValue.value)
})
watchEffect(() => {
  console.log('weekValue', weekValue.value)
})
watchEffect(() => {
  console.log('monthValue', monthValue.value)
})
watchEffect(() => {
  console.log('yearValue', yearValue.value)
})
</script>

## 基本使用

<DatePicker v-model="dateValue" format="yyyy-MM-dd" placeholder="请选择日期" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
watchEffect(() => {
  console.log('dateValue', dateValue.value)
})
</script>
<template>
  <DatePicker v-model="dateValue" format="yyyy-MM-dd" placeholder="请选择日期" />
</template>
```

:::

## 禁用

<DatePicker disabled v-model="dateValue" format="yyyy-MM-dd" placeholder="请选择日期" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns'
const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
</script>
<template>
  <DatePicker disabled v-model="dateValue" format="yyyy-MM-dd" />
</template>
```

:::

## 禁用过去

<DatePicker v-model="dateValue" :min-date="new Date()" format="yyyy-MM-dd" placeholder="请选择日期" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
watchEffect(() => {
  console.log('dateValue', dateValue.value)
})
</script>
<template>
  <DatePicker v-model="dateValue" :min-date="new Date()" format="yyyy-MM-dd" placeholder="请选择日期" />
</template>
```

:::

## 禁用未来

<DatePicker v-model="dateValue" :min-date="new Date()" format="yyyy-MM-dd" placeholder="请选择日期" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
watchEffect(() => {
  console.log('dateValue', dateValue.value)
})
</script>
<template>
  <DatePicker v-model="dateValue" :min-date="new Date()" format="yyyy-MM-dd" placeholder="请选择日期" />
</template>
```

:::

## 日期时间选择器

<DatePicker
  :width="240"
  v-model="dateTimeValue"
  format="yyyy-MM-dd HH:mm:ss"
  show-time
  enable-seconds
  placeholder="请选择日期时间"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
const dateTimeValue = ref(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
watchEffect(() => {
  console.log('dateTimeValue', dateTimeValue.value)
})
</script>
<template>
  <DatePicker
    :width="240"
    v-model="dateTimeValue"
    format="yyyy-MM-dd HH:mm:ss"
    show-time
    enable-seconds
    placeholder="请选择日期时间"
  />
</template>
```

:::

## 日期范围选择器

<DatePicker
  :width="280"
  v-model="rangeValue"
  range
  :preset-dates="presetDates"
  format="yyyy-MM-dd"
  placeholder="请选择日期范围"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format, addDays } from 'date-fns'
const rangeValue = ref<string[]>([format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 1), 'yyyy-MM-dd')])
watchEffect(() => {
  console.log('rangeValue', rangeValue.value)
})
</script>
<template>
  <DatePicker
    :width="280"
    v-model="rangeValue"
    range
    :preset-dates="presetDates"
    format="yyyy-MM-dd"
    placeholder="请选择日期范围"
  />
</template>
```

:::

## 双日期面板

<DatePicker
  :width="280"
  v-model="rangeValue"
  mode="range"
  format="yyyy-MM-dd"
  range
  multi-calendars
  placeholder="请选择日期范围"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format, addDays } from 'date-fns'
const rangeValue = ref<string[]>([format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 1), 'yyyy-MM-dd')])
watchEffect(() => {
  console.log('rangeValue', rangeValue.value)
})
</script>
<template>
  <DatePicker
    :width="280"
    v-model="rangeValue"
    mode="range"
    format="yyyy-MM-dd"
    range
    multi-calendars
    placeholder="请选择日期范围"
  />
</template>
```

:::

## 预设范围

*预设常用的日期范围以提高用户体验*

<br/>

<DatePicker
  :width="280"
  v-model="rangeValue"
  mode="range"
  format="yyyy-MM-dd"
  range
  :preset-dates="presetDates"
  multi-calendars
  placeholder="请选择日期范围"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format, addDays, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from 'date-fns'
const rangeValue = ref<string[]>([format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 1), 'yyyy-MM-dd')])
const presetDates = ref([
  { label: 'Today', value: [new Date(), new Date()] },
  { label: 'This month', value: [startOfMonth(new Date()), endOfMonth(new Date())] },
  {
    label: 'Last month',
    value: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
  },
  { label: 'This year', value: [startOfYear(new Date()).getTime(), endOfYear(new Date()).getTime()] }
])
watchEffect(() => {
  console.log('rangeValue', rangeValue.value)
})
</script>
<template>
  <DatePicker
    :width="280"
    v-model="rangeValue"
    mode="range"
    format="yyyy-MM-dd"
    range
    :preset-dates="presetDates"
    multi-calendars
    placeholder="请选择日期范围"
  />
</template>
```

:::

## 时分选择器

<DatePicker
  :width="120"
  v-model="timeValue"
  mode="time"
  show-time
  mode-height="120"
  format="HH:mm"
  placeholder="请选择时间"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const timeValue = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
})
watchEffect(() => {
  console.log('timeValue', timeValue.value)
})
</script>
<template>
  <DatePicker
    :width="120"
    v-model="timeValue"
    mode="time"
    show-time
    mode-height="120"
    format="HH:mm"
    placeholder="请选择时间"
  />
</template>
```

:::

## 时分秒选择器

<DatePicker
  :width="150"
  v-model="secondsValue"
  mode="time"
  format="HH:mm:ss"
  show-time
  enable-seconds
  mode-height="120"
  placeholder="请选择时间"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const secondsValue = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
  seconds: new Date().getSeconds()
})
watchEffect(() => {
  console.log('secondsValue', secondsValue.value)
})
</script>
<template>
  <DatePicker
    :width="150"
    v-model="secondsValue"
    mode="time"
    format="HH:mm:ss"
    show-time
    enable-seconds
    mode-height="120"
    placeholder="请选择时间"
  />
</template>
```

:::

## 时分秒范围选择器

<DatePicker
  :width="240"
  v-model="timeRangeValue"
  mode="time"
  format="HH:mm:ss"
  show-time
  range
  enable-seconds
  mode-height="120"
  placeholder="请选择时间"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { addHours, addMinutes, addSeconds } from 'date-fns'
const timeRangeValue = ref([
  {
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds()
  },
  {
    hours: addHours(Date.now(), 1).getHours(),
    minutes: addMinutes(Date.now(), 10).getMinutes(),
    seconds: addSeconds(Date.now(), 30).getSeconds()
  }
])
watchEffect(() => {
  console.log('timeRangeValue', timeRangeValue.value)
})
</script>
<template>
  <DatePicker
    :width="240"
    v-model="timeRangeValue"
    mode="time"
    format="HH:mm:ss"
    show-time
    range
    enable-seconds
    mode-height="120"
    placeholder="请选择时间"
  />
</template>
```

:::

## 周选择器

<Space vertical>
  <GradientText
    :size="24"
    :weight="600"
    :gradient="{
      deg: '90deg',
      from: '#09c8ce',
      to: '#eb2f96'
    }"
  >
    {{ format(weekValue[0], 'yyyy-MM-dd') + ' ~ ' + format(weekValue[1], 'yyyy-MM-dd') }}
  </GradientText>
  <DatePicker :width="200" v-model="weekValue" mode="week" format="yyyy年 第ww周" placeholder="请选择周" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { startOfWeek, endOfWeek } from 'date-fns'
// startOfWeek & endOfWeek 默认以周日作为一周的开始，可以传递一个选项对象，以周一作为一周的开始：{ weekStartsOn: 1 }
const options: any = { weekStartsOn: 1 }
const weekValue = ref([startOfWeek(new Date(), options), endOfWeek(new Date(), options)])
watchEffect(() => {
  console.log('weekValue', weekValue.value)
})
</script>
<template>
  <Space vertical>
    <GradientText
      :size="24"
      :weight="600"
      :gradient="{
        deg: '90deg',
        from: '#09c8ce',
        to: '#eb2f96'
      }"
    >
      {{ format(weekValue[0], 'yyyy-MM-dd') + ' ~ ' + format(weekValue[1], 'yyyy-MM-dd') }}
    </GradientText>
    <DatePicker :width="200" v-model="weekValue" mode="week" format="yyyy年 第ww周" placeholder="请选择周" />
  </Space>
</template>
```

:::

## 月选择器

<DatePicker :width="150" v-model="monthValue" mode="month" format="yyyy-MM" placeholder="请选择月" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const monthValue = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth()
})
watchEffect(() => {
  console.log('monthValue', monthValue.value)
})
</script>
<template>
  <DatePicker :width="150" v-model="monthValue" mode="month" format="yyyy-MM" placeholder="请选择月" />
</template>
```

:::

## 年选择器

<DatePicker :width="120" v-model="yearValue" mode="year" format="yyyy" placeholder="请选择年" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const yearValue = ref(new Date().getFullYear())
watchEffect(() => {
  console.log('yearValue', yearValue.value)
})
</script>
<template>
  <DatePicker :width="120" v-model="yearValue" mode="year" format="yyyy" placeholder="请选择年" />
</template>
```

:::

## APIs

### DatePicker

<br/>

*更多使用 `API` 请参考 [官方文档](https://vue3datepicker.com/)*

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
width | 日期选择器宽度，单位 `px` | number | 180
mode | 选择器模式 | 'time' &#124; 'date' &#124; 'week' &#124; 'month' &#124; 'year' | 'date'
[format](#format-支持的格式化占位符列表) | 日期展示格式 | string &#124; ((date: Date) => string) &#124; ((dates: Date[]) => string) | [DefaultFormat](#defaultformat-value)
showTime | 是否增加时间选择 | boolean | false
showToday | 是否展示”今天“按钮 | boolean | false
modelValue <Tag color="cyan">v-model</Tag> | 双向绑定值 | number &#124; string &#124; object &#124; array | null
modelType | `v-model` 值类型，可选 `timestamp`: 时间戳、`format`: 字符串，`mode` 为 `week` 或 `year` 时，该配置不生效 | 'timestamp' &#124; 'format' | 'format'

### DefaultFormat Value

类型 | 值
:-- | :--
Single picker | 'MM/dd/yyyy HH:mm'
Range picker | 'MM/dd/yyyy HH:mm - MM/dd/yyyy HH:mm'
Month picker | 'MM/yyyy'
Time picker | 'HH:mm'
Time picker range | 'HH:mm - HH:mm'
Week picker | 'ww-yyyy'

### format 支持的格式化占位符列表

标识 | 示例 | 描述
:-- | :-- | :--
yy | 23 | 年，两位数
yyyy | 2023 | 年，四位数
M | 1-12 | 月
MM | 01-12 | 月，两位数
d | 1-31 | 日
dd | 01-31 | 日，两位数
H | 0-23 | 小时
HH | 00-23 | 小时，两位数
m | 0-59 | 分钟
mm | 00-59 | 分钟，两位数
s | 0-59 | 秒
ss | 00-59 | 秒，两位数
w | 1-52 | 第几周
ww | 01-52 | 第几周，两位数
