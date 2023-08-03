<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(60)

function onIncrease (scale: number) {
  const res = percent.value + scale
  if (res > 100) {
    percent.value = 100
  } else {
    percent.value = res
  }
}
function onDecline (scale: number) {
  const res = percent.value - scale
  if (res < 0) {
    percent.value = 0
  } else {
    percent.value = res
  }
}
</script>
<template>
  <div>
    <h1>Progress 进度条</h1>
    <h2 class="mt30 mb10">基本使用 (width: 900 & type: line)</h2>
    <Progress :width="900" :percent="percent" :stroke-width="10" show-info />
    <h2 class="mt30 mb10">完成进度条 (width: 100% & percent: 100)</h2>
    <Progress width="100%" :percent="100" :stroke-width="10" show-info />
    <h2 class="mt30">渐变进度条 (width: 900)</h2>
    <h3 class="mb10">strokeColor: { '0%': '#108ee9', '100%': '#87d068', direction: 'right' } 或 { from: '#108ee9', to: '#87d068', direction: 'right' }</h3>
    <Progress
      :width="900"
      :percent="percent"
      :stroke-width="10"
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
        direction: 'right'
      }"
      show-info />
    <h2 class="mt30 mb10">进度圈基本使用 (type: circle)</h2>
    <Space align="center" :size="30">
      <Progress
        :width="120"
        :stroke-width="12"
        :percent="percent"
        type="circle" />
      <Button @click="onDecline(5)" size="large">Decline-</Button>
      <Button @click="onIncrease(5)" size="large">Increase+</Button>
    </Space>
    <h2 class="mt30 mb10">Ant Design Vue 进度圈</h2>
    <a-progress
      :width="120"
      :percent="percent"
      :stroke-width="12"
      type="circle" />
  </div>
</template>
