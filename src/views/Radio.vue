<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const optionsDisabled = ref([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2,
    disabled: true
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const value = ref(2)
watchEffect(() => {
  console.log('value:', value.value)
})
const radioGap = ref(24)
function onChange(value: any) {
  console.log('change:', value)
}
const sizeOptions = [
  {
    label: 'large',
    value: 'large'
  },
  {
    label: 'default',
    value: 'default'
  },
  {
    label: 'small',
    value: 'small'
  }
]
const buttonSize = ref('large')
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Radio :options="options" v-model:value="value" @change="onChange" />
    <h2 class="mt30 mb10">按钮样式</h2>
    <Radio :options="options" v-model:value="value" button />
    <h2 class="mt30 mb10">填底的按钮样式</h2>
    <Radio :options="options" v-model:value="value" button button-style="solid" />
    <h2 class="mt30 mb10">禁用</h2>
    <Space vertical gap="middle">
      <Radio :options="options" v-model:value="value" disabled />
      <Radio :options="options" v-model:value="value" button disabled />
    </Space>
    <h2 class="mt30 mb10">禁用选项</h2>
    <Space vertical gap="middle">
      <Radio :options="optionsDisabled" v-model:value="value" />
      <Radio :options="optionsDisabled" v-model:value="value" button />
      <Radio :options="optionsDisabled" v-model:value="value" button button-style="solid" />
    </Space>
    <h2 class="mt30 mb10">垂直排列</h2>
    <Radio vertical :options="options" v-model:value="value" />
    <h2 class="mt30 mb10">自定义间距</h2>
    <Flex vertical gap="middle">
      <Slider v-model:value="radioGap" width="50%" />
      <Radio :gap="radioGap" :options="options" v-model:value="value" />
    </Flex>
    <h2 class="mt30 mb10">按钮大小</h2>
    <Space vertical gap="middle">
      <Radio :options="sizeOptions" v-model:value="buttonSize" />
      <Radio :options="options" v-model:value="value" button :button-size="buttonSize" />
      <Radio :options="options" v-model:value="value" button button-style="solid" :button-size="buttonSize" />
    </Space>
  </div>
</template>
