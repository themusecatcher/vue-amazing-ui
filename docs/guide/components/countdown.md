# 倒计时 Countdown

<GlobalElement />

*倒计时*

## 何时使用

- 当要展示倒计时时

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(true)
const resetActive = ref(true)
const countdownRef = ref()
function onFinish() {
  console.log('countdown finished')
}
function onReset() {
  countdownRef.value.reset()
}
</script>

## 基本使用

*format: MM月 DD天 HH:mm:ss*

<br/>

<Countdown
  title="Countdown 1年"
  :value="12 * 30 * 24 * 60 * 60 * 1000"
  :future="false"
  format="MM月 DD天 HH:mm:ss"
  @finish="onFinish" />

::: details Show Code

```vue
<script setup lang="ts">
function onFinish () {
  console.log('countdown finished')
}
</script>
<template>
  <Countdown
    title="Countdown 1年"
    :value="12 * 30 * 24 * 60 * 60 * 1000"
    :future="false"
    format="MM月 DD天 HH:mm:ss"
    @finish="onFinish" />
</template>
```

:::

## 毫秒倒计时

*format: Y 年 M 月 D 天 H 时 m 分 s 秒 SSS*

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

## 随时暂停

<Space vertical>
  <Switch v-model="active" />
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
    <Switch v-model="active" />
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

## 前缀和后缀

<Countdown
  :value="2471875200000"
  format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
>
  <template #title>2048年 五一 Countdown</template>
  <template #prefix>There's only</template>
  <template #suffix>left for the end.</template>
</Countdown>

::: details Show Code

```vue
<template>
  <Countdown
    :value="2471875200000"
    format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
  >
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

## 倒计时已完成

<Space gap="small" vertical>
  <Countdown />
  <Countdown finished-text="Finished" />
</Space>

::: details Show Code

```vue
<template>
  <Space gap="small" vertical>
    <Countdown />
    <Countdown finished-text="Finished" />
  </Space>
</template>
```

:::

## 重置倒计时

<Space vertical>
  <Space align="center">
    <Switch v-model="resetActive" />
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
const resetActive = ref(true)
const countdownRef = ref()
function onReset() {
  countdownRef.value.reset()
}
</script>
<template>
  <Space vertical>
    <Space align="center">
      <Switch v-model="resetActive" />
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

### Countdown

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
title | 倒计时标题 | string &#124; slot | undefined
titleStyle | 设置标题的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
prefix | 倒计时的前缀 | string &#124; slot | undefined
suffix | 倒计时的后缀 | string &#124; slot | undefined
finishedText | 完成后的展示文本 | string &#124; slot | undefined
future | `value` 是否为未来某时刻的时间戳；为 `false` 表示相对剩余时间戳 | boolean | true
format | 倒计时展示格式，(`Y/YY`：年，`M/MM`：月，`D/DD`：日，`H/HH`：时，`m/mm`：分钟，`s/ss`：秒，`SSS`：毫秒) | string | 'HH:mm:ss'
value | 倒计时数值，支持设置未来某时刻的时间戳或相对剩余时间，单位 `ms` | number | 0
valueStyle | 设置倒计时的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
active | 是否处于计时状态，仅当 `future: false` 时生效 | boolean | true

## Methods

名称 | 说明 | 类型
-- | -- | --
reset | 重置倒计时 | () => void

## Events

名称 | 说明 | 类型
-- | -- | --
finish | 倒计时结束的回调 | () => void
