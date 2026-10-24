# 时间选择器 TimePicker

<GlobalElement />

_输入或选择时间的控件_

## 何时使用

- 需要输入或选择时间时
- 需要选择一段时间范围时（`type` 为 `timerange`）

<script setup lang="ts">
import { ref } from 'vue'
import { set } from 'date-fns'
import { SmileOutlined } from '@ant-design/icons-vue'
/** 用例初始值：当日指定时刻的时间戳（毫秒） */
function initialTime(hour: number, minute: number = 0, second: number = 0): number {
  return set(new Date(), { hours: hour, minutes: minute, seconds: second, milliseconds: 0 }).getTime()
}
/** 受控组件用例的「不响应变更」一行：取页面加载时刻的快照 */
const fixedSnapshot = new Date()
const basicValue = ref<number | null>(initialTime(8))
const basicFixedTextValue = ref<string | null>('09:00:00')
const addonValue = ref<number | null>(null)
const addonValue2 = ref<number | null>(null)
const addonOpen = ref(false)
const addonOpen2 = ref(false)
// 12 小时制用例：三只各持一个空值，选中后「补零 / 不补零 / 只到分」三种 format 的差异才直接可见
const h12Value = ref<number | null>(null)
const h12FormatValue = ref<number | null>(null)
const h12ShortValue = ref<number | null>(null)
const disabledValue = ref<number | null>(initialTime(12, 8, 23))
const hourMinuteValue = ref<number | null>(initialTime(12, 8))
const intervalValue = ref<number | null>(null)
const sizeValue = ref<number | null>(initialTime(12, 8, 23))
const suffixValue = ref<number | null>(null)
const controlledValue = ref<number | null>(null)
const fixedValue = ref<number | null>(fixedSnapshot.getTime())
const rangePickerValue = ref<[number | null, number | null] | null>(null)
// 事件用例：单选 / 范围各一，绑定后可在控制台查看各事件的触发时机与参数；初始值均为空
const eventValue = ref<number | null>(null)
const eventRangeValue = ref<[number | null, number | null] | null>(null)
const borderedValue = ref<number | null>(null)
const borderedRangeValue = ref<[number | null, number | null] | null>(null)
const errorValue = ref<number | null>(null)
const warningValue = ref<number | null>(null)
const errorRangeValue = ref<[number | null, number | null] | null>(null)
const warningRangeValue = ref<[number | null, number | null] | null>(null)
const placementBottomLeftValue = ref<number | null>(null)
const placementBottomRightValue = ref<number | null>(null)
const placementTopLeftValue = ref<number | null>(null)
const placementTopRightValue = ref<number | null>(null)
const placementRangeBottomLeftValue = ref<[number | null, number | null] | null>(null)
const placementRangeTopLeftValue = ref<[number | null, number | null] | null>(null)
/** 步长用例的间隔：分钟 15、秒 10 */
const intervalMinuteStep = 15
const intervalSecondStep = 10
/** 范围用例的两段提示文字 */
const rangePlaceholder: [string, string] = ['开始时间', '结束时间']
/** 附加内容用例：页脚按钮关闭浮层 */
function closeAddonPanel() {
  addonOpen.value = false
  addonOpen2.value = false
}
/** 附加内容用例：第一只额外接收 `openChange`，与第二只形成「是否接收回调」的对照 */
function onAddonOpenChange(open: boolean) {
  console.log('openChange', open)
}
/** 受控组件用例：`value` 与 `change` 配合使用时由使用方回写（该用例为单选形态，范围形态的元组不回写） */
function onControlledChange(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string, string] | null
): void {
  console.log('onChange', value, formattedValue)
  controlledValue.value = typeof value === 'number' ? value : null
}
/** 值变化时的回调：值与格式化值双轨 */
function onEventChange(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string, string] | null
): void {
  console.log('change', value, formattedValue)
}
/** 范围形态待选段变化时的回调：`info.range` 标识本次改动落在哪一段 */
function onEventCalendarChange(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string, string] | null,
  info: { range: 'start' | 'end' }
): void {
  console.log('calendarChange', value, formattedValue, info)
}
/** 点击「确定」时的回调（「此刻」是快捷入口，不派发） */
function onEventOk(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string, string] | null
): void {
  console.log('ok', value, formattedValue)
}
/** 面板展开收起时的回调 */
function onEventOpenChange(open: boolean): void {
  console.log('openChange', open)
}
/** 输入框获取焦点时的回调 */
function onEventFocus(event: FocusEvent): void {
  console.log('focus', event)
}
/** 输入框失去焦点时的回调 */
function onEventBlur(event: FocusEvent): void {
  console.log('blur', event)
}
</script>

## 基本使用

_点击 `TimePicker` 后可在浮层中选择或输入某一时间_

<br/>

<Space vertical>
  <p class="mb10"><code>v-model:value</code>：绑定毫秒时间戳</p>
  <TimePicker v-model:value="basicValue" placeholder="请选择时间" />
  <p class="mb10"><code>v-model:formatted-value</code>：绑定字符串，格式由 <code>value-format</code> 决定</p>
  <TimePicker v-model:formatted-value="basicFixedTextValue" value-format="HH:mm:ss" placeholder="请选择时间" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { set } from 'date-fns'
/** 用例初始值：当日指定时刻的时间戳（毫秒） */
function initialTime(hour: number, minute: number = 0, second: number = 0): number {
  return set(new Date(), { hours: hour, minutes: minute, seconds: second, milliseconds: 0 }).getTime()
}
const basicValue = ref<number | null>(initialTime(8))
const basicFixedTextValue = ref<string | null>('09:00:00')
</script>
<template>
  <Space vertical>
    <p class="mb10"><code>v-model:value</code>：绑定毫秒时间戳</p>
    <TimePicker v-model:value="basicValue" placeholder="请选择时间" />
    <p class="mb10"><code>v-model:formatted-value</code>：绑定字符串，格式由 <code>value-format</code> 决定</p>
    <TimePicker v-model:formatted-value="basicFixedTextValue" value-format="HH:mm:ss" placeholder="请选择时间" />
  </Space>
</template>
```

:::

## 附加内容

_在 `TimePicker` 选择框底部显示自定义的内容_

<br/>

<Space vertical>
  <p class="mb10">绑定 <code>v-model:open</code> 并接收 <code>openChange</code></p>
  <TimePicker
    v-model:value="addonValue"
    v-model:open="addonOpen"
    placeholder="请选择时间"
    @open-change="onAddonOpenChange"
  >
    <template #renderExtraFooter>
      <Button size="small" type="primary" @click="closeAddonPanel">OK</Button>
    </template>
  </TimePicker>
  <p class="mb10">只绑定 <code>v-model:open</code>（不接收 <code>openChange</code>）</p>
  <TimePicker v-model:value="addonValue2" v-model:open="addonOpen2" placeholder="请选择时间">
    <template #renderExtraFooter>
      <Button size="small" type="primary" @click="closeAddonPanel">OK</Button>
    </template>
  </TimePicker>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref<number | null>(null)
const value2 = ref<number | null>(null)
const open = ref(false)
const open2 = ref(false)
function closePanel() {
  open.value = false
  open2.value = false
}
function onOpenChange(openState: boolean) {
  console.log('openChange', openState)
}
</script>
<template>
  <Space vertical>
    <p class="mb10">绑定 <code>v-model:open</code> 并接收 <code>openChange</code></p>
    <TimePicker v-model:value="value" v-model:open="open" placeholder="请选择时间" @open-change="onOpenChange">
      <template #renderExtraFooter>
        <Button size="small" type="primary" @click="closePanel">OK</Button>
      </template>
    </TimePicker>
    <p class="mb10">只绑定 <code>v-model:open</code>（不接收 <code>openChange</code>）</p>
    <TimePicker v-model:value="value2" v-model:open="open2" placeholder="请选择时间">
      <template #renderExtraFooter>
        <Button size="small" type="primary" @click="closePanel">OK</Button>
      </template>
    </TimePicker>
  </Space>
</template>
```

:::

_额外内容渲染在操作行之上、位于同一块面板区域内，因此不会横跨面板；页脚按钮由使用方自行控制浮层的展开与收起_

## 12 小时制

_`use12Hours` 启用 `12` 小时制，默认的 `format` 为 `hh:mm:ss a`_

<br/>

<Space vertical>
  <p class="mb10">默认 <code>format</code>（<code>hh:mm:ss a</code>）：小时补零</p>
  <TimePicker v-model:value="h12Value" use12-hours placeholder="请选择时间" />
  <p class="mb10">显式 <code>format="h:mm:ss a"</code>：小时不补零</p>
  <TimePicker v-model:value="h12FormatValue" use12-hours format="h:mm:ss a" placeholder="请选择时间" />
  <p class="mb10">显式 <code>format="h:mm a"</code>：只到分（面板只有时 / 分两列）</p>
  <TimePicker v-model:value="h12ShortValue" use12-hours format="h:mm a" placeholder="请选择时间" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const h12Value = ref<number | null>(null)
const h12FormatValue = ref<number | null>(null)
const h12ShortValue = ref<number | null>(null)
</script>
<template>
  <Space vertical>
    <p class="mb10">默认 <code>format</code>（<code>hh:mm:ss a</code>）：小时补零</p>
    <TimePicker v-model:value="h12Value" use12-hours placeholder="请选择时间" />
    <p class="mb10">显式 <code>format="h:mm:ss a"</code>：小时不补零</p>
    <TimePicker v-model:value="h12FormatValue" use12-hours format="h:mm:ss a" placeholder="请选择时间" />
    <p class="mb10">显式 <code>format="h:mm a"</code>：只到分（面板只有时 / 分两列）</p>
    <TimePicker v-model:value="h12ShortValue" use12-hours format="h:mm a" placeholder="请选择时间" />
  </Space>
</template>
```

:::

## 禁用

<TimePicker v-model:value="disabledValue" disabled placeholder="请选择时间" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { set } from 'date-fns'
const disabledValue = ref<number | null>(set(new Date(), { hours: 12, minutes: 8, seconds: 23, milliseconds: 0 }).getTime())
</script>
<template>
  <TimePicker v-model:value="disabledValue" disabled placeholder="请选择时间" />
</template>
```

:::

## 选择时分

_浮层中的列随 `format` 变化，略去其中某一部分时对应的列随之消失_

<br/>

<TimePicker v-model:value="hourMinuteValue" format="HH:mm" placeholder="请选择时间" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { set } from 'date-fns'
const hourMinuteValue = ref<number | null>(set(new Date(), { hours: 12, minutes: 8, seconds: 0, milliseconds: 0 }).getTime())
</script>
<template>
  <TimePicker v-model:value="hourMinuteValue" format="HH:mm" placeholder="请选择时间" />
</template>
```

:::

## 步长选项

_使用 `hourStep` `minuteStep` `secondStep` 按步长展示可选的时分秒_

<br/>

<TimePicker
  v-model:value="intervalValue"
  :minute-step="intervalMinuteStep"
  :second-step="intervalSecondStep"
  placeholder="请选择时间"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const intervalValue = ref<number | null>(null)
const intervalMinuteStep = 15
const intervalSecondStep = 10
</script>
<template>
  <TimePicker
    v-model:value="intervalValue"
    :minute-step="intervalMinuteStep"
    :second-step="intervalSecondStep"
    placeholder="请选择时间"
  />
</template>
```

:::

## 三种大小

_三种大小的输入框，大的用在表单中，中的为默认_

<br/>

<Space vertical>
  <TimePicker v-model:value="sizeValue" size="large" placeholder="请选择时间" />
  <TimePicker v-model:value="sizeValue" placeholder="请选择时间" />
  <TimePicker v-model:value="sizeValue" size="small" placeholder="请选择时间" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { set } from 'date-fns'
const sizeValue = ref<number | null>(set(new Date(), { hours: 12, minutes: 8, seconds: 23, milliseconds: 0 }).getTime())
</script>
<template>
  <Space vertical>
    <TimePicker v-model:value="sizeValue" size="large" placeholder="请选择时间" />
    <TimePicker v-model:value="sizeValue" placeholder="请选择时间" />
    <TimePicker v-model:value="sizeValue" size="small" placeholder="请选择时间" />
  </Space>
</template>
```

:::

## 后缀图标

_通过 `suffixIcon` 插槽自定义选择框后缀图标_

<br/>

<TimePicker v-model:value="suffixValue" placeholder="请选择时间">
  <template #suffixIcon>
    <SmileOutlined />
  </template>
</TimePicker>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue'
const suffixValue = ref<number | null>(null)
</script>
<template>
  <TimePicker v-model:value="suffixValue" placeholder="请选择时间">
    <template #suffixIcon>
      <SmileOutlined />
    </template>
  </TimePicker>
</template>
```

:::

## 受控组件

_`value` 和 `@change` 需要配合使用，也可以直接使用 `v-model`_

<br/>

<Space vertical>
  <p class="mb10">使用 <code>value</code> 和 <code>@change</code></p>
  <TimePicker :value="controlledValue" placeholder="请选择时间" @change="onControlledChange" />
  <p class="mb10">使用 <code>v-model</code></p>
  <TimePicker v-model:value="controlledValue" placeholder="请选择时间" />
  <p class="mb10">只传 <code>value</code> 不回写（不响应变更）</p>
  <TimePicker :value="fixedValue" placeholder="请选择时间" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const controlledValue = ref<number | null>(null)
const fixedValue = ref<number | null>(new Date().getTime())
function onControlledChange(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string, string] | null
): void {
  console.log('onChange', value, formattedValue)
  controlledValue.value = typeof value === 'number' ? value : null
}
</script>
<template>
  <Space vertical>
    <p class="mb10">使用 <code>value</code> 和 <code>@change</code></p>
    <TimePicker :value="controlledValue" placeholder="请选择时间" @change="onControlledChange" />
    <p class="mb10">使用 <code>v-model</code></p>
    <TimePicker v-model:value="controlledValue" placeholder="请选择时间" />
    <p class="mb10">只传 <code>value</code> 不回写（不响应变更）</p>
    <TimePicker :value="fixedValue" placeholder="请选择时间" />
  </Space>
</template>
```

:::

## 范围选择器

_`type` 为 `timerange` 时使用时间范围选择器_

<br/>

<TimePicker v-model:value="rangePickerValue" type="timerange" :placeholder="rangePlaceholder" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const rangeValue = ref<[number | null, number | null] | null>(null)
const rangePlaceholder: [string, string] = ['开始时间', '结束时间']
</script>
<template>
  <TimePicker v-model:value="rangeValue" type="timerange" :placeholder="rangePlaceholder" />
</template>
```

:::

_范围形态的两段共用同一个时间面板，点「确定」提交当前段并自动切到另一端，两段都确定后才收起；展开期间的选择只落在草稿上，关闭面板则丢弃草稿。起点晚于终点时丢弃另一端；配合 `allowEmpty` 可放行单段区间，配合 `disabledTime` 可按段禁用时分秒_

## 事件

_单选形态绑定 `change`、`ok`、`openChange`、`focus`、`blur`，范围形态绑定 `change`、`calendarChange`、`ok`、`openChange`；各事件的参数都会打印到控制台_

<br/>

<Space vertical>
  <TimePicker
    v-model:value="eventValue"
    placeholder="请选择时间"
    @change="onEventChange"
    @ok="onEventOk"
    @open-change="onEventOpenChange"
    @focus="onEventFocus"
    @blur="onEventBlur"
  />
  <TimePicker
    v-model:value="eventRangeValue"
    type="timerange"
    :placeholder="rangePlaceholder"
    @change="onEventChange"
    @calendar-change="onEventCalendarChange"
    @ok="onEventOk"
    @open-change="onEventOpenChange"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const eventValue = ref<number | null>(null)
const eventRangeValue = ref<[number | null, number | null] | null>(null)
const rangePlaceholder: [string, string] = ['开始时间', '结束时间']
/** 值变化时的回调：值与格式化值双轨 */
function onEventChange(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string, string] | null
): void {
  console.log('change', value, formattedValue)
}
/** 范围形态待选段变化时的回调：`info.range` 标识本次改动落在哪一段 */
function onEventCalendarChange(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string, string] | null,
  info: { range: 'start' | 'end' }
): void {
  console.log('calendarChange', value, formattedValue, info)
}
/** 点击「确定」时的回调（「此刻」是快捷入口，不派发） */
function onEventOk(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string, string] | null
): void {
  console.log('ok', value, formattedValue)
}
/** 面板展开收起时的回调 */
function onEventOpenChange(open: boolean): void {
  console.log('openChange', open)
}
/** 输入框获取焦点时的回调 */
function onEventFocus(event: FocusEvent): void {
  console.log('focus', event)
}
/** 输入框失去焦点时的回调 */
function onEventBlur(event: FocusEvent): void {
  console.log('blur', event)
}
</script>
<template>
  <Space vertical>
    <TimePicker
      v-model:value="eventValue"
      placeholder="请选择时间"
      @change="onEventChange"
      @ok="onEventOk"
      @open-change="onEventOpenChange"
      @focus="onEventFocus"
      @blur="onEventBlur"
    />
    <TimePicker
      v-model:value="eventRangeValue"
      type="timerange"
      :placeholder="rangePlaceholder"
      @change="onEventChange"
      @calendar-change="onEventCalendarChange"
      @ok="onEventOk"
      @open-change="onEventOpenChange"
    />
  </Space>
</template>
```

:::

## 无边框

<Space vertical>
  <TimePicker v-model:value="borderedValue" :bordered="false" placeholder="请选择时间" />
  <TimePicker
    v-model:value="borderedRangeValue"
    type="timerange"
    :bordered="false"
    :placeholder="rangePlaceholder"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const borderedValue = ref<number | null>(null)
const borderedRangeValue = ref<[number | null, number | null] | null>(null)
const rangePlaceholder: [string, string] = ['开始时间', '结束时间']
</script>
<template>
  <Space vertical>
    <TimePicker v-model:value="borderedValue" :bordered="false" placeholder="请选择时间" />
    <TimePicker
      v-model:value="borderedRangeValue"
      type="timerange"
      :bordered="false"
      :placeholder="rangePlaceholder"
    />
  </Space>
</template>
```

:::

## 自定义状态

_使用 `status` 添加校验状态，可选 `error` 与 `warning`_

<br/>

<Space vertical>
  <TimePicker v-model:value="errorValue" status="error" placeholder="请选择时间" />
  <TimePicker v-model:value="warningValue" status="warning" placeholder="请选择时间" />
  <TimePicker v-model:value="errorRangeValue" type="timerange" status="error" :placeholder="rangePlaceholder" />
  <TimePicker
    v-model:value="warningRangeValue"
    type="timerange"
    status="warning"
    :placeholder="rangePlaceholder"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const errorValue = ref<number | null>(null)
const warningValue = ref<number | null>(null)
const errorRangeValue = ref<[number | null, number | null] | null>(null)
const warningRangeValue = ref<[number | null, number | null] | null>(null)
const rangePlaceholder: [string, string] = ['开始时间', '结束时间']
</script>
<template>
  <Space vertical>
    <TimePicker v-model:value="errorValue" status="error" placeholder="请选择时间" />
    <TimePicker v-model:value="warningValue" status="warning" placeholder="请选择时间" />
    <TimePicker v-model:value="errorRangeValue" type="timerange" status="error" :placeholder="rangePlaceholder" />
    <TimePicker
      v-model:value="warningRangeValue"
      type="timerange"
      status="warning"
      :placeholder="rangePlaceholder"
    />
  </Space>
</template>
```

:::

## 弹出位置

_通过 `placement` 手动指定弹出的位置_

<br/>

<Space vertical>
  <TimePicker v-model:value="placementBottomLeftValue" placement="bottomLeft" placeholder="左下" />
  <TimePicker v-model:value="placementBottomRightValue" placement="bottomRight" placeholder="右下" />
  <TimePicker v-model:value="placementTopLeftValue" placement="topLeft" placeholder="左上" />
  <TimePicker v-model:value="placementTopRightValue" placement="topRight" placeholder="右上" />
  <TimePicker
    v-model:value="placementRangeBottomLeftValue"
    type="timerange"
    placement="bottomLeft"
    :placeholder="rangePlaceholder"
  />
  <TimePicker
    v-model:value="placementRangeTopLeftValue"
    type="timerange"
    placement="topLeft"
    :placeholder="rangePlaceholder"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const placementBottomLeftValue = ref<number | null>(null)
const placementBottomRightValue = ref<number | null>(null)
const placementTopLeftValue = ref<number | null>(null)
const placementTopRightValue = ref<number | null>(null)
const placementRangeBottomLeftValue = ref<[number | null, number | null] | null>(null)
const placementRangeTopLeftValue = ref<[number | null, number | null] | null>(null)
const rangePlaceholder: [string, string] = ['开始时间', '结束时间']
</script>
<template>
  <Space vertical>
    <TimePicker v-model:value="placementBottomLeftValue" placement="bottomLeft" placeholder="左下" />
    <TimePicker v-model:value="placementBottomRightValue" placement="bottomRight" placeholder="右下" />
    <TimePicker v-model:value="placementTopLeftValue" placement="topLeft" placeholder="左上" />
    <TimePicker v-model:value="placementTopRightValue" placement="topRight" placeholder="右上" />
    <TimePicker
      v-model:value="placementRangeBottomLeftValue"
      type="timerange"
      placement="bottomLeft"
      :placeholder="rangePlaceholder"
    />
    <TimePicker
      v-model:value="placementRangeTopLeftValue"
      type="timerange"
      placement="topLeft"
      :placeholder="rangePlaceholder"
    />
  </Space>
</template>
```

:::

## APIs

### TimePicker Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value <Tag color="cyan">v-model</Tag> | 双向绑定值，毫秒时间戳；范围形态为两段元组 | [TimePickerValue](#timepickervalue-type) | null |
| formattedValue <Tag color="cyan">v-model</Tag> | 字符串轨道的双向绑定值，传入时以它为准（受控）；显示格式由 `format` / `valueFormat` 决定 | [TimePickerFormattedValue](#timepickerformattedvalue-type) | null |
| open <Tag color="cyan">v-model</Tag> | 面板是否展开 | boolean | false |
| type | 选择形态：`time` 为单选，`timerange` 为范围（双段输入） | [TimePickerType](#timepickertype-type) | 'time' |
| format | 时间展示格式，参考 [format](https://date-fns.org/v4.1.0/docs/format) | string | [DefaultFormat](#defaultformat-value) |
| valueFormat | 绑定值格式，默认与 `format` 相同 | string | undefined |
| placeholder | 输入框提示文字，范围形态可分别为两段指定 | string &#124; [string, string] | '' |
| disabledTime | 不可选择的时间，入参为当前面板值的时间戳；范围形态追加当前段标识 | [TimePickerDisabledTime](#timepickerdisabledtime-type) | undefined |
| hourStep | 「时」的步长，须能整除 `24`，否则按 `1` 处理 | number | 1 |
| minuteStep | 「分」的步长，须能整除 `60`，否则按 `1` 处理 | number | 1 |
| secondStep | 「秒」的步长，须能整除 `60`，否则按 `1` 处理 | number | 1 |
| use12Hours | 是否使用 `12` 小时制，启用后面板追加上午 / 下午列，默认 `format` 为 `hh:mm:ss a` | boolean | false |
| hideDisabledOptions | 是否隐藏禁用的选项 | boolean | false |
| width | 选择器宽度，单位 `px`，不传时随内容自适应 | string &#124; number | undefined |
| size | 选择器大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| status | 校验状态 | 'warning' &#124; 'error' | undefined |
| bordered | 是否展示边框 | boolean | true |
| disabled | 是否禁用，范围形态可传两段元组逐段禁用 | boolean &#124; [boolean, boolean] | false |
| allowClear | 是否展示清除按钮 | boolean | true |
| allowEmpty | 范围形态各段是否允许为空，为空时该段可被单独清空并对外提交 | [boolean, boolean] | [false, false] |
| inputReadOnly | 输入框是否只读（避免移动端唤起键盘） | boolean | false |
| to | 面板挂载的容器节点：显式传入时按此挂载（元素标签名 (例如 `'body'`) 或元素本身，`false` 会待在原地）；**不传时优先挂到最近的承载层内容容器**（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body` | string &#124; HTMLElement &#124; false | undefined |
| placement | 面板弹出位置 | 'topLeft' &#124; 'top' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottom' &#124; 'bottomRight' | 'bottomLeft' |
| showArrow | 范围形态的面板指示箭头是否展示：不传时跟随弹出方位（仅左侧对齐的 `bottomLeft` / `topLeft` 展示），`true` 始终展示、`false` 始终隐藏 | boolean | undefined |
| showNow | 是否展示面板底部的「此刻」快捷，仅单选形态生效 | boolean | true |
| renderExtraFooter | 面板底部的额外页脚，渲染在操作行之上 | () => VNode &#124; VNode[] | undefined |
| suffixIcon | 自定义选择框后缀图标 | VNode &#124; (() => VNode) | undefined |
| panelClass | 面板额外类名 | string | '' |
| panelStyle | 面板额外样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| zIndex | 面板层级，优先级最高（覆盖默认层级与 `ConfigProvider` 的 `baseZIndex` 自动分配） | number | undefined |

> 时间面板的选择只落在草稿值上：点时间列不落值，点「确定」才提交并收起面板，收起（点击外部 / `Esc`）则丢弃未确认的选择；「此刻」是取当前时刻并按步长向下取整后直接提交的快捷入口（仅单选形态）。

### TimePickerType Type

选择形态。

| 名称 | 值 |
| :-- | :-- |
| TimePickerType | 'time' &#124; 'timerange' |

### TimePickerValue Type

双向绑定值，毫秒时间戳；范围形态为两段元组。

| 名称 | 值 |
| :-- | :-- |
| TimePickerValue | number &#124; [number &#124; null, number &#124; null] &#124; null |

### TimePickerFormattedValue Type

字符串轨道的双向绑定值，格式由 `valueFormat` 决定；范围形态两段未选时分别为空字符串。

| 名称 | 值 |
| :-- | :-- |
| TimePickerFormattedValue | string &#124; [string, string] &#124; null |

### TimePickerDisabledTime Type

不可选择的时间判定（范围形态的判定额外接收当前段标识）。

| 名称 | 值 |
| :-- | :-- |
| TimePickerDisabledTime | (timestamp: number, side?: [TimePickerRangeSide](#timepickerrangeside-type)) => [TimePickerDisabledTimeUnits](#timepickerdisabledtimeunits-type) |

### TimePickerRangeSide Type

范围形态的段标识。

| 名称 | 值 |
| :-- | :-- |
| TimePickerRangeSide | 'start' &#124; 'end' |

### TimePickerRangeInfo Type

范围形态草稿变更的来源信息。

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| range | 草稿变更落在哪一段 | [TimePickerRangeSide](#timepickerrangeside-type) |

### TimePickerDisabledTimeUnits Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| disabledHours? | 禁用的「时」 | () => number[] |
| disabledMinutes? | 禁用的「分」，入参为选中的「时」 | (hour: number) => number[] |
| disabledSeconds? | 禁用的「秒」，入参为选中的「时」「分」 | (hour: number, minute: number) => number[] |

### DefaultFormat Value

| 类型 | 值 |
| :-- | :-- |
| `24` 小时制 | 'HH:mm:ss' |
| `12` 小时制（`use12Hours`） | 'hh:mm:ss a' |

### format 支持的格式化占位符列表

`format` / `valueFormat` 采用 [date-fns](https://date-fns.org/v4.1.0/docs/format) 占位符，时间相关占位符：

| 标识 | 示例 | 描述 |
| :-- | :-- | :-- |
| `h` | 1-12 | 小时，`12` 小时制 |
| `hh` | 01-12 | 小时，`12` 小时制，两位数 |
| `H` | 0-23 | 小时 |
| `HH` | 00-23 | 小时，两位数 |
| `m` | 0-59 | 分钟 |
| `mm` | 00-59 | 分钟，两位数 |
| `s` | 0-59 | 秒 |
| `ss` | 00-59 | 秒，两位数 |
| `a` | AM | 上午 / 下午标记 |

> 面板列的显隐由 `format` 推导：格式中含 `s` / `m` / `H`·`h` 才展示对应列，含 `a` 则启用 `12` 小时制（显式传入的 `use12Hours` 优先）。

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| suffixIcon | 自定义选择框后缀图标，优先于同名属性 | v-slot:suffixIcon |
| separator | 范围形态两段之间的分隔符，默认右向箭头 | v-slot:separator |
| renderExtraFooter | 面板底部的额外页脚，渲染在操作行之上，优先于同名属性 | v-slot:renderExtraFooter |

## Methods

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| focus | 使选择器获取焦点 | () => void |
| blur | 使选择器失去焦点 | () => void |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| change | 值变化时的回调 | (value: [TimePickerValue](#timepickervalue-type), formattedValue: [TimePickerFormattedValue](#timepickerformattedvalue-type)) => void |
| calendarChange | 范围形态草稿段变更时的回调，`info.range` 标注本次改动的段 | (value: [TimePickerValue](#timepickervalue-type), formattedValue: [TimePickerFormattedValue](#timepickerformattedvalue-type), info: [TimePickerRangeInfo](#timepickerrangeinfo-type)) => void |
| ok | 点击「确定」时的回调 | (value: [TimePickerValue](#timepickervalue-type), formattedValue: [TimePickerFormattedValue](#timepickerformattedvalue-type)) => void |
| openChange | 面板展开收起时的回调 | (open: boolean) => void |
| focus | 输入框获取焦点时的回调 | (event: FocusEvent) => void |
| blur | 输入框失去焦点时的回调 | (event: FocusEvent) => void |
