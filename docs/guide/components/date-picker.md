# 日期选择器 DatePicker

<GlobalElement />

_输入或选择日期的控件_

## 何时使用

- 需要输入或选择日期时
- 需要输入或选择日期与时间时

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { addDays, endOfDay, format, getDay, startOfDay } from 'date-fns'
import type { DatePickerProps } from 'vue-amazing-ui'
interface ValuePair {
  ours: Ref<number | null> // 毫秒时间戳
  compare: Ref<string | null> // 对照组件：经 value-format 降为格式化字符串
}
/**
 * 每条用例独立持有一组值
 *
 * 用例之间不共用状态，避免在一个用例里选日期影响到其它用例。
 */
function createValuePair(offsetDays: number = 0): ValuePair {
  const timestamp = addDays(new Date(), offsetDays).getTime()
  return {
    ours: ref<number | null>(timestamp),
    compare: ref<string | null>(format(timestamp, 'yyyy-MM-dd'))
  }
}
/** 日期时间用例的值对：初始值含时分秒 */
function createDateTimePair(): ValuePair {
  const timestamp = new Date().getTime()
  return {
    ours: ref<number | null>(timestamp),
    compare: ref<string | null>(format(timestamp, 'yyyy-MM-dd HH:mm:ss'))
  }
}
const { ours: basicValue } = createValuePair()
const { ours: slashValue } = createValuePair()
const { ours: chineseValue } = createValuePair()
const { ours: disabledValue } = createValuePair()
const { ours: beforeTodayValue } = createValuePair(-3)
const { ours: afterTodayValue } = createValuePair(3)
const { ours: weekendValue } = createValuePair()
const { ours: sizeCaseValue } = createValuePair()
const { ours: suffixValue } = createValuePair()
const { ours: warningValue } = createValuePair()
const { ours: errorValue } = createValuePair()
const { ours: borderlessValue } = createValuePair()
const { ours: placementBottomLeftValue } = createValuePair()
const { ours: placementBottomRightValue } = createValuePair()
const { ours: placementTopLeftValue } = createValuePair()
const { ours: placementTopRightValue } = createValuePair()
// 日期时间用例：主用例（官网 time）+ 时间面板选项 / 12 小时制 / 隐藏「此刻」三个细项
const { ours: datetimeValue } = createDateTimePair()
const { ours: minuteStepValue } = createDateTimePair()
const { ours: twelveHourValue } = createDateTimePair()
const { ours: showNowValue } = createDateTimePair()
// 不可选择日期和时间用例：初始为空值
const disabledDateTimeValue = ref<number | null>(null)
// 选中日期时的默认时分秒
const defaultTime = startOfDay(new Date()).getTime()
const sizeValue = ref<DatePickerProps['size']>('middle')
const sizeOptions: Array<{ label: string; value: NonNullable<DatePickerProps['size']> }> = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' }
]
// disabledDate 入参为「当日零点」的毫秒时间戳
function disabledDateBefore(timestamp: number): boolean {
  return startOfDay(timestamp).getTime() > startOfDay(new Date()).getTime()
}
function disabledDateAfter(timestamp: number): boolean {
  const current = endOfDay(timestamp).getTime()
  return current <= endOfDay(new Date()).getTime() || current > endOfDay(addDays(new Date(), 7)).getTime()
}
function disabledWeekendDate(timestamp: number): boolean {
  const day = getDay(timestamp)
  return day === 0 || day === 6
}
/** 半开区间 [start, end) 的整数序列 */
function range(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, index) => index + start)
}
/** 不可选择今天及之前 */
function disabledDateTodayOrBefore(timestamp: number): boolean {
  return endOfDay(timestamp).getTime() <= endOfDay(new Date()).getTime()
}
/** 禁用的时间区间：4-23 时 / 30-59 分 / 55-56 秒 */
function disabledDateTimeUnits() {
  return {
    disabledHours: () => range(4, 24),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56]
  }
}
</script>

## 基本使用

<br/>

<DatePicker v-model:value="basicValue" placeholder="请选择日期" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const basicValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <DatePicker v-model:value="basicValue" placeholder="请选择日期" />
</template>
```

::::

## 日期格式

_使用 `format` 定制展示格式_

<br/>

<Space vertical>
  <DatePicker v-model:value="slashValue" format="yyyy/MM/dd" placeholder="请选择日期" />
  <DatePicker v-model:value="chineseValue" format="yyyy年MM月dd日" placeholder="请选择日期" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const slashValue = ref<number | null>(new Date().getTime())
const chineseValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="slashValue" format="yyyy/MM/dd" placeholder="请选择日期" />
    <DatePicker v-model:value="chineseValue" format="yyyy年MM月dd日" placeholder="请选择日期" />
  </Space>
</template>
```

::::

## 日期时间选择

_`type="datetime"` 增加选择时间功能，时间面板选项经 `timePickerProps` 透传；展开期间的选择只落在草稿值上，点「确定」或「此刻」才提交，关闭面板则丢弃草稿_

<br/>

<DatePicker v-model:value="datetimeValue" type="datetime" placeholder="请选择日期时间" />

_分钟按 `5` 分钟步长选择_

<br/>

<DatePicker
  v-model:value="minuteStepValue"
  type="datetime"
  :time-picker-props="{ minuteStep: 5 }"
  placeholder="请选择日期时间"
/>

_12 小时制：`use12Hours` 与 12 小时制格式（`hh`）配合使用_

<br/>

<DatePicker
  v-model:value="twelveHourValue"
  type="datetime"
  format="yyyy-MM-dd hh:mm:ss"
  :time-picker-props="{ use12Hours: true }"
  placeholder="请选择日期时间"
/>

_隐藏「此刻」快捷_

<br/>

<DatePicker v-model:value="showNowValue" type="datetime" :show-now="false" placeholder="请选择日期时间" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const datetimeValue = ref<number | null>(new Date().getTime())
const minuteStepValue = ref<number | null>(new Date().getTime())
const twelveHourValue = ref<number | null>(new Date().getTime())
const showNowValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="datetimeValue" type="datetime" placeholder="请选择日期时间" />
    <DatePicker
      v-model:value="minuteStepValue"
      type="datetime"
      :time-picker-props="{ minuteStep: 5 }"
      placeholder="请选择日期时间"
    />
    <DatePicker
      v-model:value="twelveHourValue"
      type="datetime"
      format="yyyy-MM-dd hh:mm:ss"
      :time-picker-props="{ use12Hours: true }"
      placeholder="请选择日期时间"
    />
    <DatePicker v-model:value="showNowValue" type="datetime" :show-now="false" placeholder="请选择日期时间" />
  </Space>
</template>
```

::::

## 禁用

<br/>

<DatePicker disabled v-model:value="disabledValue" placeholder="请选择日期" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const disabledValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <DatePicker disabled v-model:value="disabledValue" placeholder="请选择日期" />
</template>
```

::::

## 不可选择日期和时间

_`disabledDate` 与 `disabledTime` 分别禁止选择部分日期与时间，`disabledTime` 需与带时间的形态配合使用_

<br/>

<DatePicker
  v-model:value="disabledDateTimeValue"
  type="datetime"
  :disabled-date="disabledDateTodayOrBefore"
  :disabled-time="disabledDateTimeUnits"
  :default-time="defaultTime"
  placeholder="请选择日期时间"
/>

_不可选择今天之后的日期_

<br/>

<DatePicker v-model:value="beforeTodayValue" :disabled-date="disabledDateBefore" placeholder="请选择日期" />

_只能选择未来七天内的日期_

<br/>

<DatePicker v-model:value="afterTodayValue" :disabled-date="disabledDateAfter" placeholder="请选择日期" />

_不可选择周六与周日_

<br/>

<DatePicker v-model:value="weekendValue" :disabled-date="disabledWeekendDate" placeholder="请选择日期" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { addDays, endOfDay, getDay, startOfDay } from 'date-fns'
const disabledDateTimeValue = ref<number | null>(null)
const beforeTodayValue = ref<number | null>(new Date().getTime())
const afterTodayValue = ref<number | null>(new Date().getTime())
const weekendValue = ref<number | null>(new Date().getTime())
// 选中日期时的默认时分秒
const defaultTime = startOfDay(new Date()).getTime()
/** 半开区间 [start, end) 的整数序列 */
function range(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, index) => index + start)
}
function disabledDateTodayOrBefore(timestamp: number): boolean {
  return endOfDay(timestamp).getTime() <= endOfDay(new Date()).getTime()
}
function disabledDateBefore(timestamp: number): boolean {
  return startOfDay(timestamp).getTime() > startOfDay(new Date()).getTime()
}
function disabledDateAfter(timestamp: number): boolean {
  const current = endOfDay(timestamp).getTime()
  return current <= endOfDay(new Date()).getTime() || current > endOfDay(addDays(new Date(), 7)).getTime()
}
function disabledWeekendDate(timestamp: number): boolean {
  const day = getDay(timestamp)
  return day === 0 || day === 6
}
function disabledDateTimeUnits() {
  return {
    disabledHours: () => range(4, 24),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56]
  }
}
</script>
<template>
  <Space vertical>
    <DatePicker
      v-model:value="disabledDateTimeValue"
      type="datetime"
      :disabled-date="disabledDateTodayOrBefore"
      :disabled-time="disabledDateTimeUnits"
      :default-time="defaultTime"
      placeholder="请选择日期时间"
    />
    <DatePicker v-model:value="beforeTodayValue" :disabled-date="disabledDateBefore" placeholder="请选择日期" />
    <DatePicker v-model:value="afterTodayValue" :disabled-date="disabledDateAfter" placeholder="请选择日期" />
    <DatePicker v-model:value="weekendValue" :disabled-date="disabledWeekendDate" placeholder="请选择日期" />
  </Space>
</template>
```

::::

## 三种大小

<br/>

<Radio v-model:value="sizeValue" :options="sizeOptions" button button-style="solid" />
<div class="mt10">
  <DatePicker v-model:value="sizeCaseValue" :size="sizeValue" placeholder="请选择日期" />
</div>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DatePickerProps } from 'vue-amazing-ui'
const sizeCaseValue = ref<number | null>(new Date().getTime())
const sizeValue = ref<DatePickerProps['size']>('middle')
const sizeOptions: Array<{ label: string; value: NonNullable<DatePickerProps['size']> }> = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' }
]
</script>
<template>
  <Radio v-model:value="sizeValue" :options="sizeOptions" button button-style="solid" />
  <div class="mt10">
    <DatePicker v-model:value="sizeCaseValue" :size="sizeValue" placeholder="请选择日期" />
  </div>
</template>
```

::::

## 后缀图标

<br/>

<DatePicker v-model:value="suffixValue" placeholder="请选择日期">
  <template #suffixIcon>
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <path
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
      />
      <path
        d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
      />
    </svg>
  </template>
</DatePicker>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const suffixValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <DatePicker v-model:value="suffixValue" placeholder="请选择日期">
    <template #suffixIcon>
      <svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor" focusable="false" aria-hidden="true">
        <path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
        />
        <path
          d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
        />
      </svg>
    </template>
  </DatePicker>
</template>
```

::::

## 自定义状态

<br/>

<Space vertical>
  <DatePicker v-model:value="warningValue" status="warning" placeholder="请选择日期" />
  <DatePicker v-model:value="errorValue" status="error" placeholder="请选择日期" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const warningValue = ref<number | null>(new Date().getTime())
const errorValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <Space vertical>
    <DatePicker v-model:value="warningValue" status="warning" placeholder="请选择日期" />
    <DatePicker v-model:value="errorValue" status="error" placeholder="请选择日期" />
  </Space>
</template>
```

::::

## 无边框

<br/>

<DatePicker v-model:value="borderlessValue" :bordered="false" placeholder="请选择日期" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const borderlessValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <DatePicker v-model:value="borderlessValue" :bordered="false" placeholder="请选择日期" />
</template>
```

::::

## 弹出位置

<br/>

<Space wrap>
  <DatePicker v-model:value="placementBottomLeftValue" placement="bottomLeft" placeholder="左下" />
  <DatePicker v-model:value="placementBottomRightValue" placement="bottomRight" placeholder="右下" />
  <DatePicker v-model:value="placementTopLeftValue" placement="topLeft" placeholder="左上" />
  <DatePicker v-model:value="placementTopRightValue" placement="topRight" placeholder="右上" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const bottomLeftValue = ref<number | null>(new Date().getTime())
const bottomRightValue = ref<number | null>(new Date().getTime())
const topLeftValue = ref<number | null>(new Date().getTime())
const topRightValue = ref<number | null>(new Date().getTime())
</script>
<template>
  <Space wrap>
    <DatePicker v-model:value="bottomLeftValue" placement="bottomLeft" placeholder="左下" />
    <DatePicker v-model:value="bottomRightValue" placement="bottomRight" placeholder="右下" />
    <DatePicker v-model:value="topLeftValue" placement="topLeft" placeholder="左上" />
    <DatePicker v-model:value="topRightValue" placement="topRight" placeholder="右上" />
  </Space>
</template>
```

::::

## APIs

### DatePicker

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value <Tag color="cyan">v-model</Tag> | 双向绑定值，毫秒时间戳 | number &#124; [number, number] &#124; null | null |
| formattedValue <Tag color="cyan">v-model</Tag> | 字符串轨道的双向绑定值，传入时以它为准（受控）；显示格式由 `format` / `valueFormat` 决定 | string &#124; [string, string] &#124; null | null |
| open <Tag color="cyan">v-model</Tag> | 面板是否展开 | boolean | false |
| type | 选择形态 | [DatePickerType](#datepickertype-type) | 'date' |
| format | 日期展示格式，参考 [format](https://date-fns.org/v4.1.0/docs/format) | string | [DefaultFormat](#defaultformat-value) |
| valueFormat | 绑定值格式，默认与 `format` 相同 | string | undefined |
| placeholder | 输入框提示文字 | string | '' |
| defaultPickerValue | 面板初始日期（毫秒时间戳），默认取 `value` 或今天 | number | undefined |
| startDayOfWeek | 一周的开始是星期几，`0-6`，`0` 是周一 | 0 &#124; 1 &#124; 2 &#124; 3 &#124; 4 &#124; 5 &#124; 6 | 0 |
| disabledDate | 不可选择的日期，入参为「当日零点」的毫秒时间戳 | (timestamp: number) => boolean | undefined |
| disabledTime | 不可选择的时间，仅带时间的形态生效，入参为当前面板草稿值的时间戳 | [DatePickerDisabledTime](#datepickerdisabledtime-type) | undefined |
| defaultTime | 选中日期时的默认时分秒（只取其中的时分秒），毫秒时间戳 | number | undefined |
| timePickerProps | 时间面板选项（步长 / 12 小时制 / 隐藏禁用项） | [DatePickerTimeProps](#datepickertimeprops-type) | undefined |
| width | 选择器宽度，单位 `px`，不传时随内容自适应 | string &#124; number | undefined |
| size | 选择器大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| status | 校验状态 | 'warning' &#124; 'error' | undefined |
| bordered | 是否展示边框 | boolean | true |
| disabled | 是否禁用 | boolean | false |
| allowClear | 是否展示清除按钮 | boolean | true |
| inputReadOnly | 输入框是否只读（避免移动端唤起键盘） | boolean | false |
| to | 面板挂载的容器节点：显式传入时按此挂载（元素标签名 (例如 'body') 或元素本身，`false` 会待在原地）；**不传时优先挂到最近的承载层内容容器**（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body` | string &#124; HTMLElement &#124; false | false |
| placement | 面板弹出位置 | 'topLeft' &#124; 'top' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottom' &#124; 'bottomRight' | 'bottomLeft' |
| showToday | 是否展示面板底部的「今天」快捷，面板切到月/年视图时隐藏 | boolean | true |
| showNow | 是否展示面板底部的「此刻」快捷，仅带时间的形态生效 | boolean | true |
| suffixIcon | 自定义选择框后缀图标 | VNode &#124; (() => VNode) | undefined |
| panelClass | 面板额外类名 | string | '' |
| panelStyle | 面板额外样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| zIndex | 面板层级，优先级最高（覆盖默认层级与 `ConfigProvider` 的 `baseZIndex` 自动分配） | number | undefined |

### DatePickerType Type

| 名称 | 值 |
| :-- | :-- |
| DatePickerType | 'date' &#124; 'datetime' &#124; 'week' &#124; 'month' &#124; 'quarter' &#124; 'year' &#124; 'daterange' &#124; 'datetimerange' &#124; 'monthrange' &#124; 'quarterrange' &#124; 'yearrange' |

### DatePickerDisabledTime Type

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| DatePickerDisabledTime | 不可选择的时间判定 | (timestamp: number) => [DatePickerDisabledTimeUnits](#datepickerdisabledtimeunits-type) | undefined |

### DatePickerDisabledTimeUnits Type

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| disabledHours | 禁用的「时」 | () => number[] | undefined |
| disabledMinutes | 禁用的「分」，入参为选中的「时」 | (hour: number) => number[] | undefined |
| disabledSeconds | 禁用的「秒」，入参为选中的「时」「分」 | (hour: number, minute: number) => number[] | undefined |

### DatePickerTimeProps Type

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| hourStep | 「时」的步长，须能整除 `24`，否则按 `1` 处理 | number | 1 |
| minuteStep | 「分」的步长，须能整除 `60`，否则按 `1` 处理 | number | 1 |
| secondStep | 「秒」的步长，须能整除 `60`，否则按 `1` 处理 | number | 1 |
| use12Hours | 是否使用 12 小时制，与 12 小时制格式（`hh`）配合使用 | boolean | false |
| hideDisabledOptions | 是否隐藏禁用的选项 | boolean | false |

### DefaultFormat Value

| 类型 | 值 |
| :-- | :-- |
| date | 'yyyy-MM-dd' |
| datetime | 'yyyy-MM-dd HH:mm:ss' |
| week | 'yyyy-ww' |
| month | 'yyyy-MM' |
| quarter | 'yyyy-QQ' |
| year | 'yyyy' |
| daterange | 'yyyy-MM-dd' |
| datetimerange | 'yyyy-MM-dd HH:mm:ss' |
| monthrange | 'yyyy-MM' |
| quarterrange | 'yyyy-QQ' |
| yearrange | 'yyyy' |

### format 支持的格式化占位符列表

`format` / `valueFormat` 采用 [date-fns](https://date-fns.org/v4.1.0/docs/format) 占位符，常用占位符：

| 标识 | 示例 | 描述 |
| :-- | :-- | :-- |
| yy | 26 | 年，两位数 |
| yyyy | 2026 | 年，四位数 |
| M | 1-12 | 月 |
| MM | 01-12 | 月，两位数 |
| d | 1-31 | 日 |
| dd | 01-31 | 日，两位数 |
| h | 1-12 | 小时，12 小时制 |
| hh | 01-12 | 小时，12 小时制，两位数 |
| H | 0-23 | 小时 |
| HH | 00-23 | 小时，两位数 |
| m | 0-59 | 分钟 |
| mm | 00-59 | 分钟，两位数 |
| s | 0-59 | 秒 |
| ss | 00-59 | 秒，两位数 |
| ww | 01-53 | 第几周，两位数 |

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| suffixIcon | 自定义选择框后缀图标 | v-slot:suffixIcon |

## Methods

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| focus | 使选择器获取焦点 | () => void |
| blur | 使选择器失去焦点 | () => void |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| change | 值变化时的回调 | (value: number &#124; [number, number] &#124; null, formattedValue: string &#124; [string, string] &#124; null) => void |
| ok | 带时间的形态点击「确定」时的回调 | (value: number &#124; [number, number] &#124; null, formattedValue: string &#124; [string, string] &#124; null) => void |
| openChange | 面板展开收起时的回调 | (open: boolean) => void |
| panelChange | 面板视图切换时的回调 | (value: number, mode: string) => void |
| focus | 输入框获取焦点时的回调 | (event: FocusEvent) => void |
| blur | 输入框失去焦点时的回调 | (event: FocusEvent) => void |
