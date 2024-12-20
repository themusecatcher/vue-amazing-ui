<script setup lang="ts">
import { ref } from 'vue'
import { ClockCircleOutlined } from '@ant-design/icons-vue'
const timelineItems = ref([
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
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Timeline :items="timelineItems" />
    <h2 class="mb10">自定义样式</h2>
    <Timeline :items="timelineItems">
      <template #dot="{ index }">
        <span class="big-dot" v-if="index === 2"></span>
        <ClockCircleOutlined
          v-if="index === 3"
          style="font-size: 16px; color: #1668dc; background: #fff; border-radius: 50%"
        />
      </template>
      <template #desc="{ index }">
        <p class="desc" v-if="index === 2">Create a services site</p>
      </template>
    </Timeline>
    <h2 class="mb10">使用虚线</h2>
    <Timeline :items="timelineItems" line-style="dashed" />
    <h2 class="mb10">右侧时间轴点</h2>
    <Timeline :items="timelineItems" mode="right" :width="540" />
    <h2 class="mb10">中间时间轴点</h2>
    <h3 class="mb10">内容从左边开始交替展现</h3>
    <Timeline :items="timelineItems" mode="center" :width="540">
      <template #dot="{ index }">
        <span class="big-dot" v-if="index === 2"></span>
      </template>
    </Timeline>
    <h3 class="mb10">内容从右边开始交替展现</h3>
    <Timeline :items="timelineItems" mode="center" position="right" :width="640">
      <template #dot="{ index }">
        <span class="big-dot" v-if="index === 2"></span>
      </template>
    </Timeline>
    <h3 class="mb10">水平时间轴</h3>
    <Timeline horizontal :items="timelineItems">
      <template #dot="{ index }">
        <span class="big-dot" v-if="index === 2"></span>
      </template>
    </Timeline>
  </div>
</template>
<style lang="less" scoped>
.big-dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 4px solid #1677ff;
  border-radius: 50%;
  background: #fff;
}
.desc {
  font-size: 16px;
  font-weight: 500;
}
</style>
