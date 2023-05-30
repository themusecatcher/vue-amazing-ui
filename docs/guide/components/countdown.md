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
  :countdown="12 * 30 * 24 * 60 * 60 * 1000"
  format="MM月 DD天 HH:mm:ss"
  finished-text="Finished"
  @finish="onFinish" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
function onFinish () {
  console.log('countdown finished')
}
</script>
<template>
  <Countdown
    title="Countdown 1年"
    :countdown="12 * 30 * 24 * 60 * 60 * 1000"
    format="MM月 DD天 HH:mm:ss"
    finished-text="Finished"
    @finish="onFinish" />
</template>
```

</details>

## 毫秒倒计时

*format: Y 年 M 月 D 天 H 时 m 分 s 秒 SSS*

<br/>

<Countdown
  title="Million Seconds"
  :countdown="12 * 30 * 24 * 60 * 60 * 1000"
  format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
  finished-text="Finished"
  @finish="onFinish" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
function onFinish () {
  console.log('countdown finished')
}
</script>
<template>
  <Countdown
    title="Million Seconds"
    :countdown="12 * 30 * 24 * 60 * 60 * 1000"
    format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
    finished-text="Finished"
    @finish="onFinish" />
</template>
```

</details>

## 使用插槽

<Countdown
  :countdown="1714528800000"
  format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
  finished-text="Finished"
  @finish="onFinish">
  <template #title>2024年 五一 Countdown</template>
  <template #prefix>There's only </template>
  <template #suffix> left for the end.</template>
</CountDown>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
function onFinish () {
  console.log('countdown finished')
}
</script>
<template>
  <Countdown
    :countdown="1714528800000"
    format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
    finished-text="Finished"
    @finish="onFinish">
    <template #title>2024年 五一 Countdown</template>
    <template #prefix>There's only </template>
    <template #suffix> left for the end.</template>
  </CountDown>
</template>
```

</details>

## 倒计时已完成

<Countdown title="Finished" finished-text="Finished" @finish="onFinish">
  </CountDown>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
function onFinish () {
  console.log('countdown finished')
}
</script>
<template>
  <Countdown title="Finished" finished-text="Finished" @finish="onFinish">
  </CountDown>
</template>
```

</details>

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
countdown | 倒计时数值支持设置未来某时刻的时间戳或相对剩余时间，单位ms | number | 0 | false
title | 倒计时标题 | string &#124; v-slot | Countdown | false
format | 格式化倒计时展示，(Y：年，M：月，D：日，H：时，m：分钟，s：秒，SSS：毫秒) | string | 'HH:mm:ss' | false
prefix | 倒计时数值的前缀 | string &#124; v-slot | '' | false
suffix | 倒计时数值的后缀 | string &#124; v-slot | '' | false
finishedText | 完成后的展示文本 | string &#124; v-slot | 'Finished'

## Events

事件名称 | 说明 | 参数
-- | -- | --
finish | 倒计时完成时触发 | () => void
