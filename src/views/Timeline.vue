<script setup lang="ts">
import { ref } from 'vue'

const timelineData = ref([
  {
    desc: 'Create a services site 2015-09-01',
    color: 'green'
  },
  {
    desc: 'Solve initial network problems 1 Solve initial network problems 2 Solve initial network problems 3 2015-09-01',
    color: 'red'
  },
  {
    desc: 'Technical testing 2015-09-01',
    color: 'blue'
  },
  {
    desc: 'Network problems being solved 2015-09-01'
  },
  {
    desc: 'Network problems being solved 2',
    color: 'gray'
  }
])
</script>
<template>
  <div>
    <h2 class="mb10">Timeline 时间轴基本使用</h2>
    <Timeline
      :timelineData="timelineData"
      :width="480">
      <template #dot="{ index }">
        <span class="u-dot" v-if="index===2"></span>
      </template>
      <template #desc="{ index }">
        <p class="u-desc" v-if="index===2">Create a services site</p>
      </template>
    </Timeline>
    <h2 class="mb10">使用虚线</h2>
    <Timeline
      :timelineData="timelineData"
      :width="480"
      line-style="dashed" />
    <h2 class="mt30 mb10">Ant Design Vue 时间轴</h2>
    <a-timeline>
      <a-timeline-item color="green">Create a services site 2015-09-01</a-timeline-item>
      <a-timeline-item color="green">Create a services site 2015-09-01</a-timeline-item>
      <a-timeline-item color="red">
        <template #dot><span class="u-dot"></span></template>
        <p>Solve initial network problems 1</p>
        <p>Solve initial network problems 2</p>
        <p>Solve initial network problems 3 2015-09-01</p>
      </a-timeline-item>
      <a-timeline-item>
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </a-timeline-item>
      <a-timeline-item color="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </a-timeline-item>
      <a-timeline-item color="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>
<style lang="less" scoped>
.u-dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 4px solid @themeColor;
  border-radius: 50%;
  background: #FFF;
}
.u-desc {
  font-size: 16px;
  font-weight: 500;
}
</style>
