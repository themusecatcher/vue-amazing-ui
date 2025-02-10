# 日历 Calendar

<GlobalElement />

*按照日历形式展示数据的容器*

## 何时使用

- 当数据是日期或按照日期划分时，例如日程、课表、价格日历等；目前支持年/月切换

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { CalendarOutlined } from '@ant-design/icons-vue'
import { format, subDays, addDays } from 'date-fns'
import type { CalendarDayOfWeek, CalendarDefaultWeek, CalendarDateItem, CalendarMonthItem } from 'vue-amazing-ui'
const date = ref(Date.now())
const cardDate = ref(Date.now())
const modeDate = ref(Date.now())
const customCardStyleDate = ref(Date.now())
const headerDate = ref(Date.now())
const startDayOfWeekDate = ref(Date.now())
const formatDate = ref(Date.now())
const noticeDate = ref(Date.now())
const slotDate = ref(Date.now())
const selectDate = ref(new Date('2030-10-06').getTime())
const disableDate = ref(Date.now())
const dateStr = ref(format(Date.now(), 'yyyy-MM-dd'))
const message = ref()
const displayOptions = [
  {
    label: 'panel',
    value: 'panel'
  },
  {
    label: 'card',
    value: 'card'
  }
]
const modeDisplay = ref('card')
const display = ref('panel')
const weekOptions = [
  {
    label: '周一',
    value: 0
  },
  {
    label: '周二',
    value: 1
  },
  {
    label: '周三',
    value: 2
  },
  {
    label: '周四',
    value: 3
  },
  {
    label: '周五',
    value: 4
  },
  {
    label: '周六',
    value: 5
  },
  {
    label: '周日',
    value: 6
  }
]
const startDayOfWeek = ref<CalendarDayOfWeek>(6)
watchEffect(() => {
  console.log('date', date.value)
})
watchEffect(() => {
  console.log('cardDate', cardDate.value)
})
watchEffect(() => {
  console.log('modeDate', modeDate.value)
})
watchEffect(() => {
  console.log('customCardStyleDate', customCardStyleDate.value)
})
watchEffect(() => {
  console.log('headerDate', headerDate.value)
})
watchEffect(() => {
  console.log('startDayOfWeekDate', startDayOfWeekDate.value)
})
watchEffect(() => {
  console.log('formatDate', formatDate.value)
})
watchEffect(() => {
  console.log('noticeDate', noticeDate.value)
})
watchEffect(() => {
  console.log('slotDate', slotDate.value)
})
watchEffect(() => {
  console.log('selectDate', selectDate.value)
})
watchEffect(() => {
  console.log('disableDate', disableDate.value)
})
watchEffect(() => {
  console.log('dateStr', dateStr.value)
})
function cardDateFormat(date: number, timestamp: number) {
  return String(date).padStart(2, '0')
}
function cardWeekFormat(defaultWeek: CalendarDefaultWeek, week: CalendarDayOfWeek) {
  return `周${defaultWeek}`
}
function cardMonthFormat(month: number, timestamp: number) {
  const chineseNumber = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  return `${chineseNumber[month - 1]}月`
}
function panelDateFormat(date: number, timestamp: number) {
  return format(timestamp, 'do')
}
function panelWeekFormat(defaultWeek: CalendarDefaultWeek, week: CalendarDayOfWeek, timestamp: number) {
  return format(timestamp, 'EEEE')
}
function panelMonthFormat(month: number, timestamp: number) {
  return format(timestamp, 'MMM')
}
function disabledDate(timestamp: number): boolean {
  if (subDays(Date.now(), 4).getTime() < timestamp && timestamp < addDays(Date.now(), 3).getTime()) {
    return true
  }
  return false
}
function disabledWeekend(timestamp: number): boolean {
  return ['6', '7'].includes(format(timestamp, 'i'))
}
function onSelect(date: string | number, source: 'date' | 'month') {
  console.log('select', date, source)
  message.value.success(format(date, 'yyyy-MM-dd'))
}
function onChange(date: string | number, dateOrMonth: CalendarDateItem['dateObject'] | CalendarMonthItem['monthObject']) {
  console.log('change', date, dateOrMonth)
}
function onPanelChange(date: string | number, info: { year: number; month?: number }, mode: 'month' | 'year') {
  console.log('panelChange', date, info, mode)
}
</script>

## 基本使用

<Calendar v-model:value="date" @change="onChange" @panelChange="onPanelChange" />

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const date = ref(Date.now())
watchEffect(() => {
  console.log('date', date.value)
})
function onChange(
  date: string | number,
  dateOrMonth: CalendarDateItem['dateObject'] | CalendarMonthItem['monthObject']
) {
  console.log('change', date, dateOrMonth)
}
function onPanelChange(date: string | number, info: { year: number; month?: number }, mode: 'month' | 'year') {
  console.log('panelChange', date, info, mode)
}
</script>
<template>
  <Calendar v-model:value="date" @change="onChange" @panelChange="onPanelChange" />
</template>
```

:::

## 卡片模式

<Calendar v-model:value="cardDate" display="card" @change="onChange" @panelChange="onPanelChange" />

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const cardDate = ref(Date.now())
watchEffect(() => {
  console.log('cardDate', cardDate.value)
})
function onChange(
  date: string | number,
  dateOrMonth: CalendarDateItem['dateObject'] | CalendarMonthItem['monthObject']
) {
  console.log('change', date, dateOrMonth)
}
function onPanelChange(date: string | number, info: { year: number; month?: number }, mode: 'month' | 'year') {
  console.log('panelChange', date, info, mode)
}
</script>
<template>
  <Calendar v-model:value="cardDate" display="card" @change="onChange" @panelChange="onPanelChange" />
</template>
```

:::

## 初始模式

<Flex vertical>
  <Space align="center">
    display:<Radio :options="displayOptions" v-model:value="modeDisplay" button button-style="solid" />
  </Space>
  <Calendar v-model:value="modeDate" mode="year" :display="modeDisplay" />
</Flex>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const modeDate = ref(Date.now())
const displayOptions = [
  {
    label: 'panel',
    value: 'panel'
  },
  {
    label: 'card',
    value: 'card'
  }
]
const modeDisplay = ref('card')
watchEffect(() => {
  console.log('modeDate', modeDate.value)
})
</script>
<template>
  <Flex vertical>
    <Space align="center">
      display:<Radio :options="displayOptions" v-model:value="modeDisplay" button button-style="solid" />
    </Space>
    <Calendar v-model:value="modeDate" mode="year" :display="modeDisplay" />
  </Flex>
</template>
```

:::

## 自定义头部内容

<Space>
  <Calendar v-model:value="headerDate" header="Custom header" display="card" @panelChange="onPanelChange" />
  <Calendar v-model:value="headerDate" display="card" @panelChange="onPanelChange">
    <template #header>
      <CalendarOutlined /> 日历
    </template>
  </Calendar>
</Space>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { CalendarOutlined } from '@ant-design/icons-vue'
const headerDate = ref(Date.now())
watchEffect(() => {
  console.log('headerDate', headerDate.value)
})
function onPanelChange(date: string | number, info: { year: number; month?: number }, mode: 'month' | 'year') {
  console.log('panelChange', date, info, mode)
}
</script>
<template>
  <Space>
    <Calendar v-model:value="headerDate" header="Custom header" display="card" @panelChange="onPanelChange" />
    <Calendar v-model:value="headerDate" display="card" @panelChange="onPanelChange">
      <template #header>
        <CalendarOutlined /> 日历
      </template>
    </Calendar>
  </Space>
</template>
```

:::

## 自定义一周的开始

<Flex vertical>
  <Space align="center">
    startDayOfWeek:<Radio :options="weekOptions" v-model:value="startDayOfWeek" button button-style="solid" />
  </Space>
  <Calendar v-model:value="startDayOfWeekDate" :start-day-of-week="startDayOfWeek" @panelChange="onPanelChange" />
</Flex>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import type { CalendarDayOfWeek } from 'vue-amazing-ui'
const startDayOfWeekDate = ref(Date.now())
const weekOptions = [
  {
    label: '周一',
    value: 0
  },
  {
    label: '周二',
    value: 1
  },
  {
    label: '周三',
    value: 2
  },
  {
    label: '周四',
    value: 3
  },
  {
    label: '周五',
    value: 4
  },
  {
    label: '周六',
    value: 5
  },
  {
    label: '周日',
    value: 6
  }
]
const startDayOfWeek = ref<CalendarDayOfWeek>(6)
watchEffect(() => {
  console.log('startDayOfWeekDate', startDayOfWeekDate.value)
})
function onPanelChange(date: string | number, info: { year: number; month?: number }, mode: 'month' | 'year') {
  console.log('panelChange', date, info, mode)
}
</script>
<template>
  <Flex vertical>
    <Space align="center">
      startDayOfWeek:<Radio :options="weekOptions" v-model:value="startDayOfWeek" button button-style="solid" />
    </Space>
    <Calendar v-model:value="startDayOfWeekDate" :start-day-of-week="startDayOfWeek" @panelChange="onPanelChange" />
  </Flex>
</template>
```

:::

## 自定义展示格式

*使用 `weekFormat` / `dateFormat` / `monthFormat` 自定义日期/星期/月的展示格式*

<br/>

<Space>
  <Calendar
    header="Date format"
    display="card"
    v-model:value="formatDate"
    :date-format="cardDateFormat"
    @panelChange="onPanelChange"
  />
  <Calendar
    header="Week format"
    display="card"
    v-model:value="formatDate"
    :week-format="cardWeekFormat"
    @panelChange="onPanelChange"
  />
  <Calendar
    header="Month format"
    mode="year"
    display="card"
    v-model:value="formatDate"
    :month-format="cardMonthFormat"
    @panelChange="onPanelChange"
  />
</Space>
<Calendar
  v-model:value="formatDate"
  :date-format="panelDateFormat"
  :week-format="panelWeekFormat"
  :month-format="panelMonthFormat"
  @panelChange="onPanelChange"
/>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
const formatDate = ref(Date.now())
watchEffect(() => {
  console.log('formatDate', formatDate.value)
})
function cardDateFormat(date: number, timestamp: number) {
  return String(date).padStart(2, '0')
}
function cardWeekFormat(defaultWeek: CalendarDefaultWeek, week: CalendarDayOfWeek) {
  return `周${defaultWeek}`
}
function cardMonthFormat(month: number, timestamp: number) {
  const chineseNumber = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  return `${chineseNumber[month - 1]}月`
}
function panelDateFormat(date: number, timestamp: number) {
  return format(timestamp, 'do')
}
function panelWeekFormat(defaultWeek: CalendarDefaultWeek, week: CalendarDayOfWeek, timestamp: number) {
  return format(timestamp, 'EEEE')
}
function panelMonthFormat(month: number, timestamp: number) {
  return format(timestamp, 'MMM')
}
function onPanelChange(date: string | number, info: { year: number; month?: number }, mode: 'month' | 'year') {
  console.log('panelChange', date, info, mode)
}
</script>
<template>
  <Space>
    <Calendar
      header="Date format"
      display="card"
      v-model:value="formatDate"
      :date-format="cardDateFormat"
      @panelChange="onPanelChange"
    />
    <Calendar
      header="Week format"
      display="card"
      v-model:value="formatDate"
      :week-format="cardWeekFormat"
      @panelChange="onPanelChange"
    />
    <Calendar
      header="Month format"
      mode="year"
      display="card"
      v-model:value="formatDate"
      :month-format="cardMonthFormat"
      @panelChange="onPanelChange"
    />
  </Space>
  <Calendar
    v-model:value="formatDate"
    :date-format="panelDateFormat"
    :week-format="panelWeekFormat"
    :month-format="panelMonthFormat"
    @panelChange="onPanelChange"
  />
</template>
```

:::

## 通知事项日历

<Calendar v-model:value="noticeDate" @panelChange="onPanelChange">
  <template #dateValue="{ dateObject, timestamp }">
    <span v-if="[8, 12, 16].includes(dateObject.date)">{{ dateObject.date }}日</span>
  </template>
  <template #dateContent="{ dateObject, timestamp }">
    <template v-if="[8, 12, 16].includes(dateObject.date)">
      <Badge status="warning" text="This is warning event." />
      <Badge status="success" text="This is usual event." />
      <Badge color="volcano" text="This is volcano event" />
    </template>
  </template>
  <template #monthValue="{ monthObject, timestamp }">
    <template v-if="[1, 7].includes(monthObject.month)">
      <template v-if="monthObject.month === 1">二月</template>
      <template v-if="monthObject.month === 7">八月</template>
    </template>
  </template>
  <template #monthContent="{ monthObject, timestamp }">
    <template v-if="[1, 7].includes(monthObject.month)">
      <Badge status="warning" text="This is warning event." />
      <Badge status="success" text="This is usual event." />
      <Badge color="volcano" text="This is volcano event" />
    </template>
  </template>
</Calendar>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const noticeDate = ref(Date.now())
watchEffect(() => {
  console.log('noticeDate', noticeDate.value)
})
function onPanelChange(date: string | number, info: { year: number; month?: number }, mode: 'month' | 'year') {
  console.log('panelChange', date, info, mode)
}
</script>
<template>
  <Calendar v-model:value="noticeDate" @panelChange="onPanelChange">
    <template #dateValue="{ dateObject, timestamp }">
      <span v-if="[8, 12, 16].includes(dateObject.date)">{{ dateObject.date }}日</span>
    </template>
    <template #dateContent="{ dateObject, timestamp }">
      <template v-if="[8, 12, 16].includes(dateObject.date)">
        <Badge status="warning" text="This is warning event." />
        <Badge status="success" text="This is usual event." />
        <Badge color="volcano" text="This is volcano event" />
      </template>
    </template>
    <template #monthValue="{ monthObject, timestamp }">
      <template v-if="[1, 7].includes(monthObject.month)">
        <template v-if="monthObject.month === 1">二月</template>
        <template v-if="monthObject.month === 7">八月</template>
      </template>
    </template>
    <template #monthContent="{ monthObject, timestamp }">
      <template v-if="[1, 7].includes(monthObject.month)">
        <Badge status="warning" text="This is warning event." />
        <Badge status="success" text="This is usual event." />
        <Badge color="volcano" text="This is volcano event" />
      </template>
    </template>
  </Calendar>
</template>
<style lang="less" scoped>
.m-badge {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
```

:::

## 自定义插槽

<Calendar v-model:value="slotDate" @panelChange="onPanelChange">
  <template #week="{ defaultWeek, week, timestamp }">
    {{ format(timestamp, 'EEE') }}
  </template>
  <template #dateValue="{ dateObject, timestamp }">
    {{ dateObject.date }}日
  </template>
  <template #monthValue="{ monthObject, timestamp }">
    {{ format(timestamp, 'MMMM') }}
  </template>
</Calendar>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
const slotDate = ref(Date.now())
watchEffect(() => {
  console.log('slotDate', slotDate.value)
})
function onPanelChange(date: string | number, info: { year: number; month?: number }, mode: 'month' | 'year') {
  console.log('panelChange', date, info, mode)
}
</script>
<template>
  <Calendar v-model:value="slotDate" @panelChange="onPanelChange">
    <template #week="{ defaultWeek, week, timestamp }">
      {{ format(timestamp, 'EEE') }}
    </template>
    <template #dateValue="{ dateObject, timestamp }">
      {{ dateObject.date }}日
    </template>
    <template #monthValue="{ monthObject, timestamp }">
      {{ format(timestamp, 'MMMM') }}
    </template>
  </Calendar>
</template>
```

:::

## 选择功能

<Alert type="info" :message="`You selected date: ${format(selectDate, 'yyyy-MM-dd')}`" />
<Calendar v-model:value="selectDate" @select="onSelect" @panelChange="onPanelChange" />

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
const selectDate = ref(new Date('2030-10-06').getTime())
const message = ref()
watchEffect(() => {
  console.log('selectDate', selectDate.value)
})
function onSelect(date: string | number, source: 'date' | 'month') {
  console.log('select', date, source)
  message.value.success(format(date, 'yyyy-MM-dd'))
}
function onPanelChange(date: string | number, info: { year: number; month?: number }, mode: 'month' | 'year') {
  console.log('panelChange', date, info, mode)
}
</script>
<template>
  <Alert type="info" :message="`You selected date: ${format(selectDate, 'yyyy-MM-dd')}`" />
  <Calendar v-model:value="selectDate" @select="onSelect" @panelChange="onPanelChange" />
  <Message ref="message" />
</template>
```

:::

## 禁用日期

<Flex vertical>
  <Space align="center">
    display:<Radio :options="displayOptions" v-model:value="display" button button-style="solid" />
  </Space>
  <Space>
    <Flex vertical>
      <Alert type="info" message="禁用指定日期 (以今天为准的前三天和后三天)" />
      <Calendar v-model:value="disableDate" :disabled-date="disabledDate" :display="display" @select="onSelect" @panelChange="onPanelChange" />
    </Flex>
    <Flex vertical>
      <Alert type="info" message="禁用所有周末 (星期六 & 星期日)" />
      <Calendar v-model:value="disableDate" :disabled-date="disabledWeekend" :display="display" @select="onSelect" @panelChange="onPanelChange" />
    </Flex>
  </Space>
</Flex>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { format, subDays, addDays } from 'date-fns'
const disableDate = ref(Date.now())
const message = ref()
const displayOptions = [
  {
    label: 'panel',
    value: 'panel'
  },
  {
    label: 'card',
    value: 'card'
  }
]
const display = ref('panel')
watchEffect(() => {
  console.log('disableDate', disableDate.value)
})
function disabledDate(timestamp: number): boolean {
  if (subDays(Date.now(), 4).getTime() < timestamp && timestamp < addDays(Date.now(), 3).getTime()) {
    return true
  }
  return false
}
function disabledWeekend(timestamp: number): boolean {
  return ['6', '7'].includes(format(timestamp, 'i'))
}
function onSelect(date: string | number, source: 'date' | 'month') {
  console.log('select', date, source)
  message.value.success(format(date, 'yyyy-MM-dd'))
}
function onPanelChange(date: string | number, info: { year: number; month?: number }, mode: 'month' | 'year') {
  console.log('panelChange', date, info, mode)
}
</script>
<template>
  <Flex vertical>
    <Space align="center">
      display:<Radio :options="displayOptions" v-model:value="display" button button-style="solid" />
    </Space>
    <Space>
      <Flex vertical>
        <Alert type="info" message="禁用指定日期 (以今天为准的前三天和后三天)" />
        <Calendar v-model:value="disableDate" :disabled-date="disabledDate" :display="display" @select="onSelect" @panelChange="onPanelChange" />
      </Flex>
      <Flex vertical>
        <Alert type="info" message="禁用所有周末 (星期六 & 星期日)" />
        <Calendar v-model:value="disableDate" :disabled-date="disabledWeekend" :display="display" @select="onSelect" @panelChange="onPanelChange" />
      </Flex>
    </Space>
  </Flex>
  <Message ref="message" />
</template>
```

:::

## 自定义日期格式

<Alert type="info" :message="`You selected date: ${dateStr}`" />
<Calendar v-model:value="dateStr" value-format="yyyy-MM-dd" @panelChange="onPanelChange" />

::: details Show Code

```vue
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { format } from 'date-fns'
const dateStr = ref(format(Date.now(), 'yyyy-MM-dd'))
watchEffect(() => {
  console.log('dateStr', dateStr.value)
})
function onPanelChange(date: string | number, info: { year: number; month?: number }, mode: 'month' | 'year') {
  console.log('panelChange', date, info, mode)
}
</script>
<template>
  <Alert type="info" :message="`You selected date: ${dateStr}`" />
  <Calendar v-model:value="dateStr" value-format="yyyy-MM-dd" @panelChange="onPanelChange" />
</template>
```

:::

<Message ref="message" />

<style lang="less" scoped>
.m-badge {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

## APIs

### Calendar

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
display | 日历展示方式，面板/卡片 | 'panel' &#124; 'card' | 'panel'
mode | 初始模式 | 'month' &#124; 'year' | 'month'
header | 自定义日历头部内容 | string &#124; slot | undefined
startDayOfWeek | 一周的开始是星期几，`0-6`，`0` 是周一 | [DayOfWeek](#dayofweek-type) | 0
dateStrip | 日历面板默认会显示六周的日期，当最后一周的日期不包含当月日期时，是否去掉 | boolean | true
dateFormat | 自定义日期展示格式 | (date: number, timestamp: number) => string | undefined
weekFormat | 自定义星期展示格式 (defaultWeek: [DefaultWeek](#defaultweek-type), week: number, timestamp: number) => string | undefined
monthFormat | 自定义月展示格式 | (month: number, timestamp: number) => string | undefined
disabledDate | 不可选择的日期 | (timestamp: number) => boolean | undefined
valueFormat | 被选中日期的格式，默认为时间戳；参考 [format](https://date-fns.org/v4.1.0/docs/format) | string | undefined
value <Tag color="cyan">v-model</Tag> | 当前被选中的日期的时间戳 | string &#124; number | undefined

### DayOfWeek Type

名称 | 值
:-- | :--
DayOfWeek | 0 &#124; 1 &#124; 2 &#124; 3 &#124; 4 &#124; 5 &#124; 6

### DefaultWeek Type

名称 | 值
:-- | :--
DefaultWeek | '一' &#124; '二' &#124; '三' &#124; '四' &#124; '五' &#124; '六' &#124; '日'

### DateItem Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
type | 类型 | 'date' | undefined
dateObject | 日期对象 | \{ date: number, month: number, year: number } | undefined
timestamp | 时间戳 | number | undefined
inCurrentMonth | 是否在当前月 | boolean | undefined
isCurrentDate | 是否为今天 | boolean | undefined

### MonthItem Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
type | 类型 | 'month' | undefined
monthObject | 月份对象 | \{ month: number, year: number } | undefined
timestamp | 时间戳 | number | undefined
isCurrent | 是否为当前月 | boolean | undefined

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
header | 自定义日历头部内容 | v-slot:header
week | 自定义周展示 | v-slot:week="{ defaultWeek, week, timestamp }"
dateValue | 自定义日期展示 | v-slot:dateValue="{ type, dateObject, timestamp, inCurrentMonth, isCurrentDate }"
dateContent | 自定义日期内容展示 | v-slot:dateContent="{ type, dateObject, timestamp, inCurrentMonth, isCurrentDate }"
monthValue | 自定义月份展示 | v-slot:dateValue="{ type, monthObject, timestamp, isCurrent }"
monthContent | 自定义月份内容展示 | v-slot:dateContent="{ type, monthObject, timestamp, isCurrent }"

## Events

名称 | 说明 | 类型
:-- | :-- | :--
change | 日期变化时的回调 | (date: string &#124; number, dateOrMonth: [DateItem](#dateitem-type)['dateObject'] &#124; [MonthItem](#monthitem-type)['monthObject']) => void
panelChange | 日期面板变化的回调 | (date: string &#124; number, info: { year: number, month?: number }, mode: 'month' &#124; 'year') => void
select | 选择日期回调，包含来源信息 | (date: string &#124; number, source: 'date' &#124; 'month') => void
