<script setup lang="ts">
function onFinish () {
  console.log('countdown finished')
}
</script>

<template>
  <div>
    <h2 class="mb10">Countdown 倒计时基本使用 (format: MM月 DD天 HH:mm:ss)</h2>
    <Countdown
      title="Countdown 1年"
      :countdown="12 * 30 * 24 * 60 * 60 * 1000"
      format="MM月 DD天 HH:mm:ss"
      finishedText="Finished"
      @finish="onFinish">
      <template #prefix>There's only </template>
      <template #suffix> left for the end.</template>
    </CountDown>
    <h2 class="mt30 mb10">毫秒倒计时基本使用 (format: Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒)</h2>
    <Countdown
      title="Countdown"
      :countdown="1714528800000"
      format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
      finishedText="Finished"
      @finish="onFinish">
      <template #title>2024年 五一 Countdown</template>
      <template #prefix>There's only </template>
      <template #suffix> left for the end.</template>
    </CountDown>
    <h2 class="mt30 mb10">倒计时已完成</h2>
    <Countdown
      title="Finished"
      finishedText="Finished"
      @finish="onFinish">
    </CountDown>
  </div>
</template>
