<script setup lang="ts">
import { h, ref } from 'vue'
function onPanelChange(info: any, mode: 'month' | 'year') {
  console.log('panelChange', info, mode)
}
</script>
<template>
  <div>
    <!-- <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2> -->
    <Calendar @panelChange="onPanelChange" />
    <!-- <a-calendar @panelChange="onPanelChange" /> -->
    <h2 class="mt30 mb10">卡片模式</h2>
    <Space>
      <Calendar display="card" />
      <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
        <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
      </div>
    </Space>
  </div>
</template>
<style lang="less" scoped></style>
