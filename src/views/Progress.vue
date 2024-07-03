<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(80)

function onIncrease(scale: number) {
  const res = percent.value + scale
  if (res > 100) {
    percent.value = 100
  } else {
    percent.value = res
  }
}
function onDecline(scale: number) {
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
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Progress :width="900" :stroke-width="10" :percent="percent" />
    <h2 class="mt30 mb10">进度圈</h2>
    <Space align="center" gap="middle">
      <Progress type="circle" :width="120" :stroke-width="12" :percent="percent" />
      <Button @click="onDecline(5)" size="large">Decline -</Button>
      <Button @click="onIncrease(5)" size="large">Increase +</Button>
    </Space>
    <h2 class="mt30 mb10">完成进度条</h2>
    <Flex vertical :width="900">
      <Progress :stroke-width="10" :percent="100" />
      <Progress type="circle" :width="120" :stroke-width="10" :percent="100" />
    </Flex>
    <h2 class="mt30">渐变进度条</h2>
    <h3 class="mb10">
      strokeColor: { '0%': '#108ee9', '100%': '#87d068', direction: 'right' } 或 { from: '#108ee9', to: '#87d068',
      direction: 'right' }
    </h3>
    <Flex vertical gap="middle" :width="900">
      <Progress
        :stroke-width="10"
        :stroke-color="{
          '0%': '#108ee9',
          '100%': '#87d068',
          direction: 'right'
        }"
        :percent="percent"
      />
      <Space align="center" gap="middle">
        <Progress
          type="circle"
          :width="120"
          :stroke-width="12"
          :stroke-color="{
            '0%': '#108ee9',
            '100%': '#87d068',
            direction: 'right'
          }"
          :percent="percent"
        />
        <Button @click="onDecline(5)" size="large">Decline -</Button>
        <Button @click="onIncrease(5)" size="large">Increase +</Button>
      </Space>
    </Flex>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Flex vertical gap="middle" :width="600">
      <Progress
        :stroke-width="28"
        :stroke-color="{
          '0%': '#108ee9',
          '100%': '#87d068',
          direction: 'left'
        }"
        stroke-linecap="butt"
        :percent="percent"
      />
      <Space align="center" gap="middle">
        <Progress
          type="circle"
          :width="180"
          :stroke-width="18"
          :stroke-color="{
            '0%': '#108ee9',
            '100%': '#87d068',
            direction: 'left'
          }"
          stroke-linecap="butt"
          :percent="percent"
        />
        <Button @click="onDecline(5)" size="large">Decline -</Button>
        <Button @click="onIncrease(5)" size="large">Increase +</Button>
      </Space>
    </Flex>
    <h2 class="mt30 mb10">自定义文字</h2>
    <Space align="center" gap="middle">
      <Progress
        type="circle"
        :width="160"
        :stroke-width="12"
        :percent="percent"
        :format="(percent: number) => `${percent} Days`"
        success="Done"
      />
      <Progress type="circle" :width="160" :stroke-width="12" :percent="percent">
        <template #format="{ percent }">
          <span style="color: magenta">{{ percent }}%</span>
        </template>
        <template #success>
          <span style="color: magenta">Bingo</span>
        </template>
      </Progress>
      <Button @click="onDecline(5)" size="large">Decline -</Button>
      <Button @click="onIncrease(5)" size="large">Increase +</Button>
    </Space>
  </div>
</template>
