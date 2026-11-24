# 倒计时 Countdown

<GlobalElement />

_倒计时_

## 何时使用

- 当要展示倒计时时

### 计时口径

- 各分段从 `format` 中出现的**最大单位**开始切分，未出现的更大单位向下折算：`format="HH:mm:ss"` 的 `HH` 是总小时数（可超过 `24`），`format="mm:ss"` 的 `mm` 是总分钟数
- 年按 `360` 天切分、月按 `30` 天切分
- 剩余时间按**向上取整到秒**展示（`format` 含毫秒时不取整）：`format="HH:mm:ss"` 时剩余 `3.2` 秒展示为 `4` 秒，避免倒计时在最后一秒内提前跳零
- 刷新频率与最小显示单位一致：只展示到秒时每秒刷新一次、只展示到分时每分钟刷新一次，含毫秒时约 `30` 帧/秒
- `render` 属性与 `#render` 插槽的分段参数遵循同一口径

### 准时性边界

`finish` 由页面内定时器驱动，页面切到后台后浏览器会节流定时器（隐藏超过 5 分钟约每分钟一次）、移动端进入后台或页面被冻结时定时器会暂停。仅被节流时事件仍在后台按截止时刻触发；页面被冻结时组件在恢复可见后立即按截止时刻补发，两种情况都只派发一次。但**不承诺业务级准时**：到点打卡、自动提交这类必须精确触发的动作，应以服务端时间为准并辅以轮询或推送。

<script setup lang="ts">
import { ref } from 'vue'
import { Countdown } from 'vue-amazing-ui'
const active = ref(true)
const resetActive = ref(true)
const countdownRef = ref<InstanceType<typeof Countdown> | null>(null)
const shortRef = ref<InstanceType<typeof Countdown> | null>(null)
function onFinish() {
  console.log('countdown finished')
}
function onReset() {
  countdownRef.value?.reset()
}
function onShortFinish() {
  console.log('short countdown finished')
}
function onShortReset() {
  shortRef.value?.reset()
}
</script>

## 基本使用

_`format`: `MM月 DD天 HH:mm:ss`_

<br/>

<Countdown
  title="Countdown 1年"
  :value="12 * 30 * 24 * 60 * 60 * 1000"
  :future="false"
  format="MM月 DD天 HH:mm:ss"
  @finish="onFinish"
/>

::: details Show Code

```vue
<script setup lang="ts">
function onFinish() {
  console.log('countdown finished')
}
</script>
<template>
  <Countdown
    title="Countdown 1年"
    :value="12 * 30 * 24 * 60 * 60 * 1000"
    :future="false"
    format="MM月 DD天 HH:mm:ss"
    @finish="onFinish"
  />
</template>
```

:::

## 自定义字面量

_字面量中用 `[]` 包裹可避免被当成单位解析；`Time left` 含单位字符 `m`，不包裹时会被解析成分钟_

<br/>

<Countdown :value="12 * 60 * 60 * 1000" :future="false" format="[Time left] HH:mm:ss" />

::: details Show Code

```vue
<template>
  <Countdown :value="12 * 60 * 60 * 1000" :future="false" format="[Time left] HH:mm:ss" />
</template>
```

:::

## 毫秒倒计时

_`format`: `Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒`_

<br/>

<Countdown
  title="Million Seconds"
  :value="12 * 30 * 24 * 60 * 60 * 1000"
  :future="false"
  format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
/>

::: details Show Code

```vue
<template>
  <Countdown
    title="Million Seconds"
    :value="12 * 30 * 24 * 60 * 60 * 1000"
    :future="false"
    format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
  />
</template>
```

:::

## 毫秒精度

_`S`、`SS`、`SSS` 分别展示 1、2、3 位毫秒_

<br/>

<Row :gutter="16">
  <Col :span="8">
    <Countdown :value="12 * 60 * 60 * 1000" :future="false" format="HH:mm:ss.S" />
  </Col>
  <Col :span="8">
    <Countdown :value="12 * 60 * 60 * 1000" :future="false" format="HH:mm:ss.SS" />
  </Col>
  <Col :span="8">
    <Countdown :value="12 * 60 * 60 * 1000" :future="false" format="HH:mm:ss.SSS" />
  </Col>
</Row>

::: details Show Code

```vue
<template>
  <Row :gutter="16">
    <Col :span="8">
      <Countdown :value="12 * 60 * 60 * 1000" :future="false" format="HH:mm:ss.S" />
    </Col>
    <Col :span="8">
      <Countdown :value="12 * 60 * 60 * 1000" :future="false" format="HH:mm:ss.SS" />
    </Col>
    <Col :span="8">
      <Countdown :value="12 * 60 * 60 * 1000" :future="false" format="HH:mm:ss.SSS" />
    </Col>
  </Row>
</template>
```

:::

## 前缀和后缀

<Countdown :value="2471875200000" format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒">
  <template #title>2048年 五一 Countdown</template>
  <template #prefix>There's only</template>
  <template #suffix>left for the end.</template>
</Countdown>

::: details Show Code

```vue
<template>
  <Countdown :value="2471875200000" format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒">
    <template #title>2048年 五一 Countdown</template>
    <template #prefix>There's only</template>
    <template #suffix>left for the end.</template>
  </Countdown>
</template>
```

:::

## 自定义样式

<Countdown
  :value="2485094400000"
  format="Y 年 MM 月 DD 天 HH 时 mm 分 ss 秒 SSS 毫秒"
  :title-style="{ fontWeight: 500, fontSize: '18px' }"
  :value-style="{ fontWeight: 600, color: '#1677ff' }"
>
  <template #title>2048年 十一 Countdown</template>
</Countdown>

::: details Show Code

```vue
<template>
  <Countdown
    :value="2485094400000"
    format="Y 年 MM 月 DD 天 HH 时 mm 分 ss 秒 SSS 毫秒"
    :title-style="{ fontWeight: 500, fontSize: '18px' }"
    :value-style="{ fontWeight: 600, color: '#1677ff' }"
  >
    <template #title>2048年 十一 Countdown</template>
  </Countdown>
</template>
```

:::

## 自定义分段渲染

_通过 `#render` 插槽接管各时间段的排版，作用域参数与 `render` 属性一致_

<br/>

<Countdown :value="12 * 60 * 60 * 1000" :future="false">
  <template #render="{ hours, minutes, seconds }">
    <span style="padding: 0 4px; border-radius: 4px; background: var(--va-fill-color-2)">{{ hours }}</span>
    <span>:</span>
    <span style="padding: 0 4px; border-radius: 4px; background: var(--va-fill-color-2)">{{ minutes }}</span>
    <span>:</span>
    <span style="padding: 0 4px; border-radius: 4px; background: var(--va-fill-color-2)">{{ seconds }}</span>
  </template>
</Countdown>

::: details Show Code

```vue
<template>
  <Countdown :value="12 * 60 * 60 * 1000" :future="false">
    <template #render="{ hours, minutes, seconds }">
      <span style="padding: 0 4px; border-radius: 4px; background: var(--va-fill-color-2)">{{ hours }}</span>
      <span>:</span>
      <span style="padding: 0 4px; border-radius: 4px; background: var(--va-fill-color-2)">{{ minutes }}</span>
      <span>:</span>
      <span style="padding: 0 4px; border-radius: 4px; background: var(--va-fill-color-2)">{{ seconds }}</span>
    </template>
  </Countdown>
</template>
```

:::

## 随时暂停

<Space vertical>
  <Switch v-model:value="active" />
  <Countdown
    :active="active"
    title="Pause at any time"
    :value="24 * 60 * 60 * 1000"
    :future="false"
    format="HH:mm:ss:SSS"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(true)
</script>
<template>
  <Space vertical>
    <Switch v-model:value="active" />
    <Countdown
      :active="active"
      title="Pause at any time"
      :value="24 * 60 * 60 * 1000"
      :future="false"
      format="HH:mm:ss:SSS"
    />
  </Space>
</template>
```

:::

## 完成回调

_倒计时结束后派发一次 `finish`，可点击按钮重新开始_

<br/>

<Space align="center">
  <Countdown ref="shortRef" :value="10 * 1000" :future="false" format="mm:ss" @finish="onShortFinish" />
  <Button type="primary" @click="onShortReset">重新开始</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Countdown } from 'vue-amazing-ui'
const shortRef = ref<InstanceType<typeof Countdown> | null>(null)
function onShortFinish() {
  console.log('short countdown finished')
}
function onShortReset() {
  shortRef.value?.reset()
}
</script>
<template>
  <Space align="center">
    <Countdown ref="shortRef" :value="10 * 1000" :future="false" format="mm:ss" @finish="onShortFinish" />
    <Button type="primary" @click="onShortReset">重新开始</Button>
  </Space>
</template>
```

:::

## 倒计时已完成

<Row :gutter="16">
  <Col :span="8">
    <Countdown />
  </Col>
  <Col :span="8">
    <Countdown finish="Finished" />
  </Col>
  <Col :span="8">
    <Countdown>
      <template #finish>已完成</template>
    </Countdown>
  </Col>
</Row>

::: details Show Code

```vue
<template>
  <Row :gutter="16">
    <Col :span="8">
      <Countdown />
    </Col>
    <Col :span="8">
      <Countdown finish="Finished" />
    </Col>
    <Col :span="8">
      <Countdown>
        <template #finish>已完成</template>
      </Countdown>
    </Col>
  </Row>
</template>
```

:::

## 重置倒计时

<Space vertical>
  <Space align="center">
    <Switch v-model:value="resetActive" />
    <Button type="primary" @click="onReset">Reset</Button>
  </Space>
  <Countdown
    ref="countdownRef"
    :active="resetActive"
    :value="24 * 60 * 60 * 1000"
    :future="false"
    format="HH:mm:ss:SSS"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Countdown } from 'vue-amazing-ui'
const resetActive = ref(true)
const countdownRef = ref<InstanceType<typeof Countdown> | null>(null)
function onReset() {
  countdownRef.value?.reset()
}
</script>
<template>
  <Space vertical>
    <Space align="center">
      <Switch v-model:value="resetActive" />
      <Button type="primary" @click="onReset">Reset</Button>
    </Space>
    <Countdown
      ref="countdownRef"
      :active="resetActive"
      :value="24 * 60 * 60 * 1000"
      :future="false"
      format="HH:mm:ss:SSS"
    />
  </Space>
</template>
```

:::

## APIs

### Countdown Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| title | 倒计时标题 | string | undefined |
| prefix | 倒计时的前缀 | string | undefined |
| suffix | 倒计时的后缀 | string | undefined |
| finish | 倒计时完成后的展示文本 | string | undefined |
| format | 倒计时展示格式，支持的单位见下文的占位符列表 | string | 'HH:mm:ss' |
| value | 倒计时数值，`future` 为 `true` 时是未来某时刻的时间戳，否则是相对剩余时间，单位 `ms` | number | 0 |
| future | `value` 是否为未来某时刻的时间戳；为 `false` 表示相对剩余时间 | boolean | true |
| titleStyle | 设置标题的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| valueStyle | 设置倒计时的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| active | 是否处于计时状态，仅当 `future` 为 `false` 时生效 | boolean | true |
| render | 自定义倒计时的分段渲染，返回内容将替换默认的文本输出 | (params: [CountdownRenderParams](#countdownrenderparams-type)) => VNode &#124; string | undefined |

### format 支持的格式化占位符列表

| 标识 | 示例 | 描述 |
| :-- | :-- | :-- |
| Y | 1 | 年，不补零 |
| YY | 01 | 年，补零到 2 位 |
| YYYY | 0001 | 年，补零到 4 位 |
| M | 1 | 月，不补零 |
| MM | 01 | 月，补零到 2 位 |
| D | 1 | 日，不补零 |
| DD | 01 | 日，补零到 2 位 |
| H | 1 | 时，不补零 |
| HH | 01 | 时，补零到 2 位 |
| m | 1 | 分，不补零 |
| mm | 01 | 分，补零到 2 位 |
| s | 1 | 秒，不补零 |
| ss | 01 | 秒，补零到 2 位 |
| S | 1 | 毫秒的高 1 位 |
| SS | 01 | 毫秒的高 2 位 |
| SSS | 001 | 毫秒的 3 位 |
| [文本] | [Day] | 原样输出，不参与单位解析 |

### CountdownRenderParams Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| years | 剩余年数 | number |
| months | 剩余月数 | number |
| days | 剩余天数 | number |
| hours | 剩余小时数 | number |
| minutes | 剩余分钟数 | number |
| seconds | 剩余秒数 | number |
| milliseconds | 剩余毫秒数 | number |

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| title | 自定义倒计时标题 | v-slot:title |
| prefix | 自定义倒计时的前缀 | v-slot:prefix |
| suffix | 自定义倒计时的后缀 | v-slot:suffix |
| finish | 自定义完成后的展示文本 | v-slot:finish |
| render | 自定义倒计时的分段渲染，优先于 `render` 属性 | v-slot:render="{ hours, minutes, seconds }" |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| finish | 倒计时结束的回调，单次倒计时只派发一次 | () => void |

## Methods

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| reset | 重置为初始剩余时间并重新开始计时；`active` 为 `false` 时重置后保持暂停 | () => void |
