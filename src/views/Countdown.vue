<script setup lang="ts">
function onFinish () {
  console.log('countdown finished')
}
</script>

<template>
  <Countdown
    title="Countdown"
    :countdown="12 * 30 * 24 * 60 * 60"
    format="Y 年 M 月 D 天 H 时 m 分 s 秒"
    finishedText="Finished"
    @finish="onFinish">
    <template #prefix>There's only </template>
    <!-- <template #finish>&lt; FinishedText slot &gt;</template> -->
    <template #suffix> left for the end.</template>
  </CountDown>
</template>

<style lang="less" scoped>
</style>
