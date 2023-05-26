# 日期选择 DatePicker

<br/>

*输入或选择日期的控件*

## 何时使用

- 当用户需要选择或输入一个日期，弹出日期面板进行选择

## 参考文档

- [Vue Datepicker](https://vue3datepicker.com/)
- [Vue Datepicker Documents](https://vue3datepicker.com/installation/)

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths, addDays, startOfWeek, endOfWeek, addHours, addMinutes, addSeconds } from 'date-fns'

const dateValue = ref(Date.now())
const rangeValue = ref<number[]>([Date.now(), addDays(new Date(), 1).getTime()])
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
  console.log('rangeValue:', rangeValue.value)
})
watchEffect(() => {
  console.log('timeValue:', timeValue.value)
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

<DatePicker placeholder="请选择日期" v-model:date="dateValue"/>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const dateValue = ref(Date.now())
watchEffect(() => {
  console.log('dateValue:', dateValue.value)
})
</script>
<template>
  <DatePicker placeholder="请选择日期" v-model:date="dateValue"/>
</template>
```

</details>

## 禁用过去的日期选择器

<DatePicker
  placeholder="请选择日期"
  v-model:date="dateValue"
  :min-date="new Date()"
  format="yyyy-MM-dd" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const dateValue = ref(Date.now())
watchEffect(() => {
  console.log('dateValue:', dateValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择日期"
    v-model:date="dateValue"
    :min-date="new Date()"
    format="yyyy-MM-dd" />
</template>
```

</details>

## 禁用未来的日期选择器

<DatePicker
  placeholder="请选择日期"
  v-model:date="dateValue"
  mode="date"
  :max-date="new Date()"
  format="yyyy-MM-dd" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const dateValue = ref(Date.now())
watchEffect(() => {
  console.log('dateValue:', dateValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择日期"
    v-model:date="dateValue"
    mode="date"
    :max-date="new Date()"
    format="yyyy-MM-dd" />
</template>
```

</details>

## 日期时间选择器

<DatePicker
  placeholder="请选择日期时间"
  v-model:date="dateValue"
  mode="date"
  format="yyyy-MM-dd HH:mm:ss"
  :width="240"
  show-time
  enable-seconds />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const dateValue = ref(Date.now())
watchEffect(() => {
  console.log('dateValue:', dateValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择日期时间"
    v-model:date="dateValue"
    mode="date"
    format="yyyy-MM-dd HH:mm:ss"
    :width="240"
    show-time
    enable-seconds />
</template>
```

</details>

## 日期范围选择器

<DatePicker
  placeholder="请选择日期范围"
  v-model:date="rangeValue"
  range
  :preset-ranges="presetRanges"
  format="yyyy-MM-dd"
  :width="280" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const rangeValue = ref<number[]>([Date.now(), addDays(new Date(), 1).getTime()])
watchEffect(() => {
  console.log('rangeValue:', rangeValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择日期范围"
    v-model:date="rangeValue"
    range
    :preset-ranges="presetRanges"
    format="yyyy-MM-dd"
    :width="280" />
</template>
```

</details>

## 日期范围选择器，双日期面板

<DatePicker
  placeholder="请选择日期范围"
  v-model:date="rangeValue"
  mode="range"
  format="yyyy-MM-dd"
  :width="280"
  range
  multi-calendars />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const rangeValue = ref<number[]>([Date.now(), addDays(new Date(), 1).getTime()])
watchEffect(() => {
  console.log('rangeValue:', rangeValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择日期范围"
    v-model:date="rangeValue"
    mode="range"
    format="yyyy-MM-dd"
    :width="280"
    range
    multi-calendars />
</template>
```

</details>

## 时分选择器

<DatePicker
  placeholder="请选择时间"
  v-model:date="timeValue"
  mode="time"
  show-time
  mode-height="120"
  format="HH:mm"
  :width="120" />

<details>
<summary>查看代码</summary>

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
    v-model:date="timeValue"
    mode="time"
    show-time
    mode-height="120"
    format="HH:mm"
    :width="120" />
</template>
```

</details>

## 时分秒选择器

<DatePicker
  placeholder="请选择时间"
  v-model:date="secondsValue"
  mode="time"
  show-time
  enable-seconds
  mode-height="120"
  format="HH:mm:ss"
  :width="150" />

<details>
<summary>查看代码</summary>

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
    v-model:date="secondsValue"
    mode="time"
    show-time
    enable-seconds
    mode-height="120"
    format="HH:mm:ss"
    :width="150" />
</template>
```

</details>

## 时分秒范围选择器

<DatePicker
  placeholder="请选择时间"
  v-model:date="timeRangeValue"
  mode="time"
  show-time
  range
  enable-seconds
  mode-height="120"
  format="HH:mm:ss"
  :width="240" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
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
    v-model:date="timeRangeValue"
    mode="time"
    show-time
    range
    enable-seconds
    mode-height="120"
    format="HH:mm:ss"
    :width="240" />
</template>
```

</details>

## 周选择器

<DatePicker
  placeholder="请选择周"
  v-model:date="weekValue"
  mode="week"
  format="yyyy-MM-dd"
  :width="280" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const weekValue = ref([startOfWeek(new Date()), endOfWeek(new Date())])
watchEffect(() => {
  console.log('weekValue:', weekValue.value)
})
</script>
<template>
  <DatePicker
    placeholder="请选择周"
    v-model:date="weekValue"
    mode="week"
    format="yyyy-MM-dd"
    :width="280" />
</template>
```

</details>

## 月选择器

<DatePicker
  placeholder="请选择月"
  v-model:date="monthValue"
  mode="month"
  format="yyyy-MM"
  :width="150" />

<details>
<summary>查看代码</summary>

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
    v-model:date="monthValue"
    mode="month"
    format="yyyy-MM"
    :width="150" />
</template>
```

</details>

## 年选择器

<DatePicker
  placeholder="请选择年"
  v-model:date="yearValue"
  mode="year"
  format="yyyy"
  :width="120" />

<details>
<summary>查看代码</summary>

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
    v-model:date="yearValue"
    mode="year"
    format="yyyy"
    :width="120" />
</template>
```

</details>

## APIs

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
name |  |  |

## Events

事件名称 | 说明 | 参数
-- | -- | --
change |  |
