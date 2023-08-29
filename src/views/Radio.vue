<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市',
        value: 2,
        disabled: true
      },
      {
        label: '纽约市',
        value: 3
      },
      {
        label: '旧金山',
        value: 4
      },
      {
        label: '布宜诺斯艾利斯',
        value: 5
      },
      {
        label: '伊斯坦布尔',
        value: 6
      },
      {
        label: '拜占庭',
        value: 7
      },
      {
        label: '君士坦丁堡',
        value: 8
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
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (value: any) {
  console.log('change:', value)
}
</script>
<template>
  <div>
    <h1>Radio 单选框</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Radio :options="options" v-model:value="value" />
    <h2 class="mt30 mb10">禁用</h2>
    <Radio :options="options" v-model:value="value" disabled />
    <h2 class="mt30 mb10">禁用选项</h2>
    <Radio :options="optionsDisabled" v-model:value="value" />
    <h2 class="mt30 mb10">垂直排列</h2>
    <Radio vertical :options="options" v-model:value="value" />
    <h2 class="mt30 mb10">自定义间距</h2>
    <Radio :gap="24" :options="options" v-model:value="value" />
    <h2 class="mt30 mb10">Ant Design Vue 的 a-radio-group 组件</h2>
    <a-radio-group @change="onChange($event.target.value)" v-model:value="value" :options="options" />
  </div>
</template>
