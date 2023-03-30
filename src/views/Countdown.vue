<script setup lang="ts">
function onFinish () {
  console.log('countdown finished')
}
</script>

<template>
  <div>
    <h2 class="mb10">Countdown 倒计时基本使用（format: Y 年 M 月 D 天 H 时 m 分 s 秒）</h2>
    <Countdown
      title="Countdown"
      :countdown="12 * 30 * 24 * 60 * 60 * 1000"
      format="Y 年 M月 D 天 H 时 m 分 s 秒 SSS 毫秒"
      finishedText="Finished"
      @finish="onFinish">
      <template #prefix>There's only </template>
      <!-- <template #finish>&lt; FinishedText slot &gt;</template> -->
      <template #suffix> left for the end.</template>
    </CountDown>
    <h2 class="mt30 mb10">毫秒倒计时基本使用（format: Y 年 M 月 D 天 H 时 m 分 s 秒 SSS）</h2>
    <Countdown
      title="Countdown"
      :countdown="1714528800000"
      format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS"
      finishedText="Finished"
      @finish="onFinish">
      <template #title>2024年 五一 Countdown</template>
      <template #prefix>There's only </template>
      <!-- <template #finish>&lt; FinishedText slot &gt;</template> -->
      <template #suffix> left for the end.</template>
    </CountDown>
  </div>
</template>

<style lang="less" scoped>
</style>
