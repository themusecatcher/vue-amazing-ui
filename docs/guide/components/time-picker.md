# 时间选择器 TimePicker

<GlobalElement />

_输入或选择时间的控件_

## 何时使用

- 需要输入或选择时间时

<script setup lang="ts">
import { ref } from 'vue'
import { set } from 'date-fns'
/** 用例初始值：当日指定时刻的时间戳（毫秒） */
function initialTime(hour: number, minute: number = 0, second: number = 0): number {
  return set(new Date(), { hours: hour, minutes: minute, seconds: second, milliseconds: 0 }).getTime()
}
const basicValue = ref<number | null>(initialTime(8))
const basicFixedTextValue = ref<string | null>('09:00:00')
const h12Value = ref<number | null>(null)
const h12FormatValue = ref<number | null>(null)
const h12ShortValue = ref<number | null>(null)
const disabledValue = ref<number | null>(initialTime(12, 8, 23))
const hourMinuteValue = ref<number | null>(initialTime(12, 8))
const intervalValue = ref<number | null>(null)
const sizeValue = ref<number | null>(initialTime(12, 8, 23))
const borderedValue = ref<number | null>(null)
const errorValue = ref<number | null>(null)
const warningValue = ref<number | null>(null)
const placementBottomLeftValue = ref<number | null>(null)
const placementBottomRightValue = ref<number | null>(null)
const placementTopLeftValue = ref<number | null>(null)
const placementTopRightValue = ref<number | null>(null)
/** 步长用例的间隔：分钟 15、秒 10 */
const intervalMinuteStep = 15
const intervalSecondStep = 10
</script>

## 基本使用

_点击 `TimePicker` 后可在浮层中选择或输入某一时间_

<br/>

<Space vertical>
  <TimePicker v-model:value="basicValue" placeholder="请选择时间" />
  <TimePicker v-model:formatted-value="basicFixedTextValue" value-format="HH:mm:ss" placeholder="请选择时间" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const basicValue = ref<number | null>(new Date().getTime())
const basicFixedTextValue = ref<string | null>('09:00:00')
</script>
<template>
  <Space vertical>
    <TimePicker v-model:value="basicValue" placeholder="请选择时间" />
    <TimePicker v-model:formatted-value="basicFixedTextValue" value-format="HH:mm:ss" placeholder="请选择时间" />
  </Space>
</template>
```

:::

## 12 小时制

_`use12Hours` 启用 12 小时制，默认的 `format` 为 `hh:mm:ss a`_

<br/>

<Space vertical>
  <TimePicker v-model:value="h12Value" use12-hours placeholder="请选择时间" />
  <TimePicker v-model:value="h12FormatValue" use12-hours format="h:mm:ss a" placeholder="请选择时间" />
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
    <TimePicker v-model:value="h12Value" use12-hours placeholder="请选择时间" />
    <TimePicker v-model:value="h12FormatValue" use12-hours format="h:mm:ss a" placeholder="请选择时间" />
    <TimePicker v-model:value="h12ShortValue" use12-hours format="h:mm a" placeholder="请选择时间" />
  </Space>
</template>
```

:::

## 禁用

<br/>

<TimePicker v-model:value="disabledValue" disabled placeholder="请选择时间" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const disabledValue = ref<number | null>(new Date().getTime())
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
const hourMinuteValue = ref<number | null>(new Date().getTime())
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
const sizeValue = ref<number | null>(new Date().getTime())
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

## 无边框

<br/>

<TimePicker v-model:value="borderedValue" :bordered="false" placeholder="请选择时间" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const borderedValue = ref<number | null>(null)
</script>
<template>
  <TimePicker v-model:value="borderedValue" :bordered="false" placeholder="请选择时间" />
</template>
```

:::

## 自定义状态

_使用 `status` 添加校验状态，可选 `error` 与 `warning`_

<br/>

<Space vertical>
  <TimePicker v-model:value="errorValue" status="error" placeholder="请选择时间" />
  <TimePicker v-model:value="warningValue" status="warning" placeholder="请选择时间" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const errorValue = ref<number | null>(null)
const warningValue = ref<number | null>(null)
</script>
<template>
  <Space vertical>
    <TimePicker v-model:value="errorValue" status="error" placeholder="请选择时间" />
    <TimePicker v-model:value="warningValue" status="warning" placeholder="请选择时间" />
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
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const placementBottomLeftValue = ref<number | null>(null)
const placementBottomRightValue = ref<number | null>(null)
const placementTopLeftValue = ref<number | null>(null)
const placementTopRightValue = ref<number | null>(null)
</script>
<template>
  <Space vertical>
    <TimePicker v-model:value="placementBottomLeftValue" placement="bottomLeft" placeholder="左下" />
    <TimePicker v-model:value="placementBottomRightValue" placement="bottomRight" placeholder="右下" />
    <TimePicker v-model:value="placementTopLeftValue" placement="topLeft" placeholder="左上" />
    <TimePicker v-model:value="placementTopRightValue" placement="topRight" placeholder="右上" />
  </Space>
</template>
```

:::

## APIs

### TimePicker

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value <Tag color="cyan">v-model</Tag> | 双向绑定值，毫秒时间戳 | number &#124; null | null |
| formattedValue <Tag color="cyan">v-model</Tag> | 字符串轨道的双向绑定值，传入时以它为准（受控）；显示格式由 `format` / `valueFormat` 决定 | string &#124; null | null |
| open <Tag color="cyan">v-model</Tag> | 面板是否展开 | boolean | false |
| format | 时间展示格式，参考 [format](https://date-fns.org/v4.1.0/docs/format) | string | [DefaultFormat](#defaultformat-value) |
| valueFormat | 绑定值格式，默认与 `format` 相同 | string | undefined |
| placeholder | 输入框提示文字 | string | '' |
| disabledTime | 不可选择的时间，入参为当前面板值的时间戳 | [TimePickerDisabledTime](#timepickerdisabledtime-type) | undefined |
| hourStep | 「时」的步长，须能整除 `24`，否则按 `1` 处理 | number | 1 |
| minuteStep | 「分」的步长，须能整除 `60`，否则按 `1` 处理 | number | 1 |
| secondStep | 「秒」的步长，须能整除 `60`，否则按 `1` 处理 | number | 1 |
| use12Hours | 是否使用 12 小时制，启用后面板追加上午 / 下午列，默认 `format` 为 `hh:mm:ss a` | boolean | false |
| hideDisabledOptions | 是否隐藏禁用的选项 | boolean | false |
| width | 选择器宽度，单位 `px`，不传时随内容自适应 | string &#124; number | undefined |
| size | 选择器大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| status | 校验状态 | 'warning' &#124; 'error' | undefined |
| bordered | 是否展示边框 | boolean | true |
| disabled | 是否禁用 | boolean | false |
| allowClear | 是否展示清除按钮 | boolean | true |
| inputReadOnly | 输入框是否只读（避免移动端唤起键盘） | boolean | false |
| to | 面板挂载的容器节点：显式传入时按此挂载（元素标签名 (例如 'body') 或元素本身，`false` 会待在原地）；**不传时优先挂到最近的承载层内容容器**（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body` | string &#124; HTMLElement &#124; false | false |
| placement | 面板弹出位置 | 'topLeft' &#124; 'top' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottom' &#124; 'bottomRight' | 'bottomLeft' |
| showNow | 是否展示面板底部的「此刻」快捷 | boolean | true |
| suffixIcon | 自定义选择框后缀图标 | VNode &#124; (() => VNode) | undefined |
| panelClass | 面板额外类名 | string | '' |
| panelStyle | 面板额外样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| zIndex | 面板层级，优先级最高（覆盖默认层级与 `ConfigProvider` 的 `baseZIndex` 自动分配） | number | undefined |

> 时间面板的选择只落在草稿值上：点时间列不落值，点「确定」才提交并收起面板，收起（点击外部 / `Esc`）则丢弃未确认的选择；「此刻」是取当前时刻并按步长向下取整后直接提交的快捷入口。

### TimePickerDisabledTime Type

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| TimePickerDisabledTime | 不可选择的时间判定 | (timestamp: number) => [TimePickerDisabledTimeUnits](#timepickerdisabledtimeunits-type) | undefined |

### TimePickerDisabledTimeUnits Type

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| disabledHours | 禁用的「时」 | () => number[] | undefined |
| disabledMinutes | 禁用的「分」，入参为选中的「时」 | (hour: number) => number[] | undefined |
| disabledSeconds | 禁用的「秒」，入参为选中的「时」「分」 | (hour: number, minute: number) => number[] | undefined |

### DefaultFormat Value

| 类型 | 值 |
| :-- | :-- |
| 24 小时制 | 'HH:mm:ss' |
| 12 小时制（`use12Hours`） | 'hh:mm:ss a' |

### format 支持的格式化占位符列表

`format` / `valueFormat` 采用 [date-fns](https://date-fns.org/v4.1.0/docs/format) 占位符，时间相关占位符：

| 标识 | 示例 | 描述 |
| :-- | :-- | :-- |
| h | 1-12 | 小时，12 小时制 |
| hh | 01-12 | 小时，12 小时制，两位数 |
| H | 0-23 | 小时 |
| HH | 00-23 | 小时，两位数 |
| m | 0-59 | 分钟 |
| mm | 00-59 | 分钟，两位数 |
| s | 0-59 | 秒 |
| ss | 00-59 | 秒，两位数 |
| a | AM | 上午 / 下午标记 |

> 面板列的显隐由 `format` 推导：格式中含 `s` / `m` / `H`·`h` 才展示对应列，含 `a` 则启用 12 小时制（显式传入的 `use12Hours` 优先）。

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| suffixIcon | 自定义选择框后缀图标，优先于同名属性 | v-slot:suffixIcon |

## Methods

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| focus | 使选择器获取焦点 | () => void |
| blur | 使选择器失去焦点 | () => void |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| change | 值变化时的回调 | (value: number &#124; null, formattedValue: string &#124; null) => void |
| ok | 点击「确定」时的回调 | (value: number, formattedValue: string &#124; null) => void |
| openChange | 面板展开收起时的回调 | (open: boolean) => void |
| focus | 输入框获取焦点时的回调 | (event: FocusEvent) => void |
| blur | 输入框失去焦点时的回调 | (event: FocusEvent) => void |
