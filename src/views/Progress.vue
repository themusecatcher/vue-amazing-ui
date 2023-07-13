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
console.log(Math.PI)
</script>
<template>
  <div>
    <h1>Progress 进度条</h1>
    <h2 class="mt30 mb10">基本使用 (width: 900 & type: line)</h2>
    <Progress :width="900" :percent="percent" :strokeWidth="10" :showInfo="true" />
    <h2 class="mt30 mb10">完成进度条 (width: 100% & percent: 100)</h2>
    <Progress width="100%" :percent="100" :strokeWidth="10" :showInfo="true" />
    <h2 class="mt30">渐变进度条 (width: 900)</h2>
    <h3 class="mb10">strokeColor: { '0%': '#108ee9', '100%': '#87d068', direction: 'right' } 或 { from: '#108ee9', to: '#87d068', direction: 'right' }</h3>
    <Progress
      :width="900"
      :percent="percent"
      :strokeWidth="10"
      :strokeColor="{
        '0%': '#108ee9',
        '100%': '#87d068',
        direction: 'right'
      }"
      :showInfo="true" />
    <br/>
    <Button @click="onIncrease(5)" size="large" class="mt30 mr30">Increase+</Button>
    <Button @click="onDecline(5)" size="large">Decline-</Button>
    <h2 class="mt30 mb10">进度圈基本使用 (type: circle)</h2>
    <Progress
      :width="120"
      :percent="percent"
      :strokeWidth="10"
      :showInfo="true"
      type="circle" />
    <h2 class="mt30 mb10">Ant Design Vue 进度圈</h2>
    <a-progress
      :width="120"
      :percent="percent"
      :strokeWidth="12"
      type="circle" />
  </div>
</template>
