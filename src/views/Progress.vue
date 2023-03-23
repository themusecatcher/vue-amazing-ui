<script setup lang="ts">

</script>
<template>
  <div>
    <h2 class="mb10">进度条基本使用</h2>
    <Progress :width="900" :percent="36" :strokeWidth="10" :showInfo="true" />
    <h2 class="mt30 mb10">完成进度条（width: 100% & percent: 100）</h2>
    <Progress width="100%" :percent="100" :strokeWidth="10" :showInfo="true" />
    <h2 class="mt30">渐变进度条</h2>
    <h3 class="mb10">strokeColor: { '0%': '#108ee9', '100%': '#87d068', direction: 'right' } 或 { from: '#108ee9', to: '#87d068', direction: 'right' }</h3>
    <Progress
      :width="900"
      :percent="60"
      :strokeWidth="10"
      :strokeColor="{
        '0%': '#108ee9',
        '100%': '#87d068',
        direction: 'right'
      }"
      :showInfo="true" />
  </div>
</template>
<style lang="less" scoped>

</style>
