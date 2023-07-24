# 日期选择 DatePicker

<br/>

*输入或选择日期的控件*

## 何时使用

- 当用户需要选择或输入一个日期，弹出日期面板进行选择

## 官方文档

- [Vue Datepicker](https://vue3datepicker.com/)
- [Vue Datepicker Documents](https://vue3datepicker.com/installation/)
- [date-fns](https://date-fns.org/)

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format, endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths, addDays, startOfWeek, endOfWeek, addHours, addMinutes, addSeconds } from 'date-fns'

const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
const dateTimeValue = ref(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
const rangeValue = ref([format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 1), 'yyyy-MM-dd')])
console.log(addHours(Date.now(), 1))

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
const presetRanges = ref([
  { label: 'Today', range: [new Date(), new Date()] },
  { label: 'This month', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
  {
    label: 'Last month',
    range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
  },
  { label: 'This year', range: [startOfYear(new Date()).getTime(), endOfYear(new Date()).getTime()] }
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
const weekValue = ref([startOfWeek(new Date()), endOfWeek(new Date())])
const monthValue = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth()
})
const yearValue = ref(new Date().getFullYear())

watchEffect(() => {
  console.log('dateValue:', dateValue.value)
})
watchEffect(() => {
  console.log('dateTimeValue:', dateTimeValue.value)
})
watchEffect(() => {
  console.log('rangeValue:', rangeValue.value)
})
watchEffect(() => {
  console.log('timeRangeValue:', timeRangeValue.value)
})
watchEffect(() => {
  console.log('timeValue:', timeValue.value)
})
watchEffect(() => {
  console.log('secondsValue:', secondsValue.value)
})
watchEffect(() => {
  console.log('weekValue:', weekValue.value)
})
watchEffect(() => {
  console.log('monthValue:', monthValue.value)
})
watchEffect(() => {
  console.log('yearValue:', yearValue.value)
})
</script>

## 基本使用

<DatePicker placeholder="请选择日期" format="yyyy-MM-dd" v-model="dateValue"/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
watchEffect(() => {
  console.log('dateValue:', dateValue.value)
})
</script>
<template>
  <DatePicker placeholder="请选择日期" format="yyyy-MM-dd" v-model="dateValue"/>
</template>
```

:::

## 禁用过去

<DatePicker
  placeholder="请选择日期"
  :min-date="new Date()"
  format="yyyy-MM-dd"
  v-model="dateValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
watchEffect(() => {
  console.log('dateValue:', dateValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择日期"
    :min-date="new Date()"
    format="yyyy-MM-dd"
    v-model="dateValue" />
</template>
```

:::

## 禁用未来

<DatePicker
  placeholder="请选择日期"
  mode="date"
  :max-date="new Date()"
  format="yyyy-MM-dd"
  v-model="dateValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
watchEffect(() => {
  console.log('dateValue:', dateValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择日期"
    mode="date"
    :max-date="new Date()"
    format="yyyy-MM-dd"
    v-model="dateValue" />
</template>
```

:::

## 日期时间选择器

<DatePicker
  placeholder="请选择日期时间"
  mode="date"
  format="yyyy-MM-dd HH:mm:ss"
  :width="240"
  show-time
  enable-seconds
  v-model="dateTimeValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
const dateTimeValue = ref(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
watchEffect(() => {
  console.log('dateTimeValue:', dateTimeValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择日期时间"
    mode="date"
    format="yyyy-MM-dd HH:mm:ss"
    :width="240"
    show-time
    enable-seconds
    v-model="dateTimeValue" />
</template>
```

:::

## 日期范围选择器

<DatePicker
  placeholder="请选择日期范围"
  range
  format="yyyy-MM-dd"
  :width="280"
  v-model="rangeValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format, addDays } from 'date-fns'
const rangeValue = ref([format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 1), 'yyyy-MM-dd')])
watchEffect(() => {
  console.log('rangeValue:', rangeValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择日期范围"
    range
    format="yyyy-MM-dd"
    :width="280"
    v-model="rangeValue" />
</template>
```

:::

## 双日期面板

<DatePicker
  placeholder="请选择日期范围"
  mode="range"
  format="yyyy-MM-dd"
  :width="280"
  range
  multi-calendars
  v-model="rangeValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format, addDays } from 'date-fns'
const rangeValue = ref([format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 1), 'yyyy-MM-dd')])
watchEffect(() => {
  console.log('rangeValue:', rangeValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择日期范围"
    mode="range"
    format="yyyy-MM-dd"
    :width="280"
    range
    multi-calendars
    v-model="rangeValue" />
</template>
```

:::

## 预设范围

*预设常用的日期范围以提高用户体验*

<br/>

<DatePicker
  placeholder="请选择日期范围"
  mode="range"
  format="yyyy-MM-dd"
  :width="280"
  range
  :presetRanges="presetRanges"
  multi-calendars
  v-model="rangeValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { format, addDays, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from 'date-fns'
const rangeValue = ref([format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 1), 'yyyy-MM-dd')])
const presetRanges = ref([
  { label: 'Today', range: [new Date(), new Date()] },
  { label: 'This month', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
  {
    label: 'Last month',
    range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
  },
  { label: 'This year', range: [startOfYear(new Date()).getTime(), endOfYear(new Date()).getTime()] }
])
watchEffect(() => {
  console.log('rangeValue:', rangeValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择日期范围"
    mode="range"
    format="yyyy-MM-dd"
    :width="280"
    range
    :presetRanges="presetRanges"
    multi-calendars
    v-model="rangeValue" />
</template>
```

:::

## 时分选择器

<DatePicker
  placeholder="请选择时间"
  mode="time"
  show-time
  mode-height="120"
  format="HH:mm"
  :width="120"
  v-model="timeValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const timeValue = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
})
watchEffect(() => {
  console.log('timeValue:', timeValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择时间"
    mode="time"
    show-time
    mode-height="120"
    format="HH:mm"
    :width="120"
    v-model="timeValue" />
</template>
```

:::

## 时分秒选择器

<DatePicker
  placeholder="请选择时间"
  mode="time"
  show-time
  enable-seconds
  mode-height="120"
  format="HH:mm:ss"
  :width="150"
  v-model="secondsValue" />

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
  console.log('secondsValue:', secondsValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择时间"
    mode="time"
    show-time
    enable-seconds
    mode-height="120"
    format="HH:mm:ss"
    :width="150"
    v-model="secondsValue" />
</template>
```

:::

## 时分秒范围选择器

<DatePicker
  placeholder="请选择时间"
  mode="time"
  show-time
  range
  enable-seconds
  mode-height="120"
  format="HH:mm:ss"
  :width="240"
  v-model="timeRangeValue" />

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
  console.log('timeRangeValue:', timeRangeValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择时间"
    mode="time"
    show-time
    range
    enable-seconds
    mode-height="120"
    format="HH:mm:ss"
    :width="240"
    v-model="timeRangeValue" />
</template>
```

:::

## 周选择器

<DatePicker
  placeholder="请选择周"
  mode="week"
  format="yyyy-MM-dd"
  :width="280"
  v-model="weekValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { startOfWeek, endOfWeek } from 'date-fns'
const weekValue = ref([startOfWeek(new Date()), endOfWeek(new Date())])
watchEffect(() => {
  console.log('weekValue:', weekValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择周"
    mode="week"
    format="yyyy-MM-dd"
    :width="280"
    v-model="weekValue" />
</template>
```

:::

## 月选择器

<DatePicker
  placeholder="请选择月"
  mode="month"
  format="yyyy-MM"
  :width="150"
  v-model="monthValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const monthValue = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth()
})
watchEffect(() => {
  console.log('monthValue:', monthValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择月"
    mode="month"
    format="yyyy-MM"
    :width="150"
    v-model="monthValue" />
</template>
```

:::

## 年选择器

<DatePicker
  placeholder="请选择年"
  mode="year"
  format="yyyy"
  :width="120"
  v-model="yearValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const yearValue = ref(new Date().getFullYear())
watchEffect(() => {
  console.log('yearValue:', yearValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择年"
    mode="year"
    format="yyyy"
    :width="120"
    v-model="yearValue" />
</template>
```

:::

## APIs

*更多使用 APIs 请参考[官方文档](https://vue3datepicker.com/)*

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
width | 日期选择器宽度，单位px | number | 180 | false
mode | 选择器模式 | 'time' &#124; 'date' &#124; 'week' &#124; 'month' &#124; 'year' | 'date' | false
showTime | 是否增加时间选择 | boolean | false | false
showToday | 是否展示”今天“按钮 | boolean | false | false
modelType | `v-model` 值类型，可选时间戳(`timestamp`)、字符串(`format`) | 'timestamp' &#124; 'format' | 'format' | false
