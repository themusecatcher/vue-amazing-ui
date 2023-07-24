# 倒计时 Countdown

## 何时使用

- 当要展示倒计时时

<script setup lang="ts">
function onFinish () {
  console.log('countdown finished')
}
</script>

## 基本使用

*format: MM月 DD天 HH:mm:ss*

<br/>

<Countdown
  title="Countdown 1年"
  :value="12 * 30 * 24 * 60 * 60 * 1000"
  format="MM月 DD天 HH:mm:ss"
  finished-text="Finished"
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
    format="MM月 DD天 HH:mm:ss"
    finished-text="Finished"
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
  format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
  finished-text="Finished"
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
    title="Million Seconds"
    :value="12 * 30 * 24 * 60 * 60 * 1000"
    format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
    finished-text="Finished"
    @finish="onFinish" />
</template>
```

:::

## 使用插槽

<Countdown
  :value="1714528800000"
  format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
  finished-text="Finished"
  @finish="onFinish">
  <template #title>2024年 五一 Countdown</template>
  <template #prefix>There's only </template>
  <template #suffix> left for the end.</template>
</CountDown>

::: details Show Code

```vue
<script setup lang="ts">
function onFinish () {
  console.log('countdown finished')
}
</script>
<template>
  <Countdown
    :value="1714528800000"
    format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
    finished-text="Finished"
    @finish="onFinish">
    <template #title>2024年 五一 Countdown</template>
    <template #prefix>There's only </template>
    <template #suffix> left for the end.</template>
  </CountDown>
</template>
```

:::

## 自定义倒计时标题和数值样式

<Countdown
  :value="1696089600000"
  format="M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
  :title-style="{fontWeight: 500, fontSize: '18px'}"
  :value-style="{fontWeight: 600, color: '#1677ff'}"
  @finish="onFinish">
  <template #title>2023年 十一 Countdown</template>
</CountDown>

::: details Show Code

```vue
<script setup lang="ts">
function onFinish () {
  console.log('countdown finished')
}
</script>
<template>
  <Countdown
    :value="1696089600000"
    format="M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
    :title-style="{fontWeight: 500, fontSize: '18px'}"
    :value-style="{fontWeight: 600, color: '#1677ff'}"
    @finish="onFinish">
    <template #title>2023年 十一 Countdown</template>
  </CountDown>
</template>
```

:::

## 倒计时已完成

<Countdown :value="3000" @finish="onFinish" />

::: details Show Code

```vue
<script setup lang="ts">
function onFinish () {
  console.log('countdown finished')
}
</script>
<template>
  <Countdown :value="3000" @finish="onFinish" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
title | 倒计时标题 | string &#124; slot | Countdown | false
value | 倒计时数值支持设置未来某时刻的时间戳或相对剩余时间，单位ms | number | 0 | false
format | 格式化倒计时展示，(`Y/YY`：年，`M/MM`：月，`D/DD`：日，`H/HH`：时，`m/mm`：分钟，`s/ss`：秒，`SSS`：毫秒) | string | 'HH:mm:ss' | false
prefix | 倒计时数值的前缀 | string &#124; slot | '' | false
suffix | 倒计时数值的后缀 | string &#124; slot | '' | false
titleStyle | 设置标题的样式 | CSSProperties | {} | false
valueStyle | 设置数值的样式 | CSSProperties | {} | false
finishedText | 完成后的展示文本 | string &#124; slot | 'Finished' | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
finish | 倒计时完成时触发 | () => void
