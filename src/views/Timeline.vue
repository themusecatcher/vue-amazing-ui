<script setup lang="ts">
import { ref } from 'vue'

const timelineData = ref([
  {
    desc: 'Create a services site 2023-05-24',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 2023-05-24',
    color: 'red'
  },
  {
    desc: 'Technical testing 2023-05-24',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2023-05-24'
  },
  {
    desc: 'Network problems being solved 2',
    color: 'gray'
  }
])
</script>
<template>
  <div>
    <h1>Timeline 时间轴</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Timeline :timelineData="timelineData" />
    <h2 class="mb10">自定义样式</h2>
    <Timeline :timelineData="timelineData">
      <template #dot="{ index }">
        <span class="dot" v-if="index===2"></span>
      </template>
      <template #desc="{ index }">
        <p class="desc" v-if="index===2">Create a services site</p>
      </template>
    </Timeline>
    <h2 class="mb10">使用虚线</h2>
    <Timeline :timelineData="timelineData" line-style="dashed" />
    <h2 class="mt30 mb10">Ant Design Vue 时间轴</h2>
    <a-timeline>
      <a-timeline-item color="green">Create a services site 2023-05-24</a-timeline-item>
      <a-timeline-item color="green">Create a services site 2023-05-24</a-timeline-item>
      <a-timeline-item color="red">
        <template #dot><span class="u-dot"></span></template>
        <p>Solve initial network problems 1</p>
        <p>Solve initial network problems 2</p>
        <p>Solve initial network problems 3 2023-05-24</p>
      </a-timeline-item>
      <a-timeline-item>
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2023-05-24</p>
      </a-timeline-item>
      <a-timeline-item color="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2023-05-24</p>
      </a-timeline-item>
      <a-timeline-item color="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2023-05-24</p>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>
<style lang="less" scoped>
.dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 4px solid #1677ff;
  border-radius: 50%;
  background: #FFF;
}
.desc {
  font-size: 16px;
  font-weight: 500;
}
</style>
