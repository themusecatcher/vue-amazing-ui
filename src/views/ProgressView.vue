<!-- <script setup lang="ts">
import { h, ref } from 'vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { ProgressProps } from 'vue-amazing-ui'
const percent = ref(80)
const lineCapOptions = [
  {
    label: 'round',
    value: 'round'
  },
  {
    label: 'butt',
    value: 'butt'
  }
]
const lineCap = ref<ProgressProps['lineCap']>('butt')
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
  <div style="width: 900px">
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Progress :percent="percent" />
    <h2 class="mt30 mb10">进度圈</h2>
    <Space align="center">
      <Progress type="circle" :percent="percent" />
      <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
      <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
    </Space>
    <h2 class="mt30 mb10">完成进度条</h2>
    <Flex vertical>
      <Progress :percent="100" />
      <Progress type="circle" :percent="100" />
    </Flex>
    <h2 class="mt30">渐变进度条</h2>
    <h3 class="mb10">
      strokeColor: { '0%': '#108ee9', '100%': '#87d068', direction: 'right' } 或 { from: '#108ee9', to: '#87d068',
      direction: 'right' }
    </h3>
    <Flex vertical>
      <Progress
        :line-color="{
          '0%': '#108ee9',
          '100%': '#87d068'
        }"
        :percent="percent"
      />
      <Space align="center">
        <Progress
          type="circle"
          :line-color="{
            '0%': '#108ee9',
            '100%': '#87d068'
          }"
          :percent="percent"
        />
        <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
        <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
      </Space>
    </Flex>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Flex vertical>
      <Progress
        :line-size="24"
        :line-color="{
          '0%': '#108ee9',
          '100%': '#87d068',
          direction: 'left'
        }"
        :info-size="24"
        :percent="percent"
      />
      <Space align="center">
        <Progress
          style="--success-color: #108ee9"
          type="circle"
          :width="180"
          :line-size="14"
          :line-color="{
            '0%': '#108ee9',
            '100%': '#87d068',
            direction: 'left'
          }"
          :info-size="28"
          :percent="percent"
        />
        <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
        <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
      </Space>
    </Flex>
    <h2 class="mt30 mb10">自定义边缘形状</h2>
    <Flex vertical>
      <Radio :options="lineCapOptions" v-model:value="lineCap" button button-style="solid" />
      <Progress
        :line-size="20"
        :line-color="{
          '0%': 'white',
          '100%': 'pink'
        }"
        :line-cap="lineCap"
        :info-size="20"
        :percent="percent"
      />
      <Space align="center">
        <Progress
          type="circle"
          :width="160"
          :line-size="12"
          :line-color="{
            '0%': '#e3f2fd',
            '100%': '#2080f0'
          }"
          :line-cap="lineCap"
          :info-size="24"
          :percent="percent"
        />
        <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
        <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
      </Space>
    </Flex>
    <h2 class="mt30 mb10">自定义文字</h2>
    <Flex vertical>
      <Progress
        :line-size="20"
        :info-size="20"
        :percent="percent"
        :format="(percent: number) => `$${percent}`"
        success="Done"
      />
      <Progress style="--success-color: #d48806" :line-size="20" :info-size="20" :percent="percent">
        <template #format="{ percent }">
          <span style="color: #d4380d">{{ percent }}%</span>
        </template>
        <template #success>
          <span style="color: #d48806">Bingo</span>
        </template>
      </Progress>
      <Space align="center">
        <Progress
          type="circle"
          :width="160"
          :line-size="12"
          :info-size="24"
          :percent="percent"
          :format="(percent: number) => `${percent} Days`"
          success="Done"
        />
        <Progress
          style="--success-color: #d48806"
          type="circle"
          :width="160"
          :line-size="12"
          :info-size="24"
          :percent="percent"
        >
          <template #format="{ percent }">
            <span style="color: #d4380d">{{ percent }}%</span>
          </template>
          <template #success>
            <span style="color: #d48806">Bingo</span>
          </template>
        </Progress>
        <Button @click="onDecline(5)" size="large" :icon="() => h(MinusOutlined)">Decline</Button>
        <Button @click="onIncrease(5)" size="large" :icon="() => h(PlusOutlined)">Increase</Button>
      </Space>
    </Flex>
  </div>
</template> -->
