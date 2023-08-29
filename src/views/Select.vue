<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市',
        value: 2
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
      },
      {
        label: '墨尔本',
        value: 9
      }
    ])
const optionsDisabled = ref([
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
const optionsCustom = ref([
      {
        name: '北京市',
        id: 1
      },
      {
        name: '上海市',
        id: 2
      },
      {
        name: '纽约市',
        id: 3
      },
      {
        name: '旧金山',
        id: 4
      },
      {
        name: '布宜诺斯艾利斯',
        id: 5
      },
      {
        name: '伊斯坦布尔',
        id: 6
      },
      {
        name: '拜占庭',
        id: 7
      },
      {
        name: '君士坦丁堡',
        id: 8
      }
    ])
const selectedValue = ref(1)
watchEffect(() => {
  console.log('selectedValue:', selectedValue.value)
})
function onChange (value: string|number, label: string,  index: number) {
  console.log('value:', value)
  console.log('label:', label)
  console.log('index:', index)
}
// 自定义过滤函数，但选项的 value 值大于 输入项时返回 true
function filter (inputValue: string, option: any) {
  return option.value > inputValue
}
function onAntChange (value: string|number, option: any) {
  console.log('value:', value)
  console.log('option:', option)
}
</script>
<template>
  <div>
    <h1>Select 选择器</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Select :options="options" v-model="selectedValue" />
    <h2 class="mt30 mb10">禁用</h2>
    <Select
      :options="options"
      disabled
      v-model="selectedValue" />
    <h2 class="mt30 mb10">禁用选项</h2>
    <Select :options="optionsDisabled" v-model="selectedValue" />
    <h2 class="mt30 mb10">支持清除</h2>
    <Select
      :options="options"
      allow-clear
      v-model="selectedValue"
      @change="onChange" />
    <h2 class="mt30 mb10">支持搜索</h2>
    <Select
      :options="options"
      search
      v-model="selectedValue" />
    <h2 class="mt30 mb10">自定义搜索过滤函数</h2>
    <Select
      :options="options"
      search
      :filter="filter"
      v-model="selectedValue" />
    <h2 class="mt30 mb10">自定义样式</h2>
    <Select
      :width="160"
      :height="36"
      search
      :options="options"
      v-model="selectedValue"
      @change="onChange" />
    <h2 class="mt30 mb10">自定义节点 lable、value 字段名</h2>
    <Select
      :options="optionsCustom"
      label="name"
      value="id"
      v-model="selectedValue" />
    <h2 class="mt30 mb10">自定义下拉面板数</h2>
    <Select
      :options="options"
      :max-display="8"
      v-model="selectedValue" />
    <h2 class="mt30 mb10">Ant Design Vue 选择器支持清除 (allowClear)</h2>
    <a-select
      :options="options"
      style="width: 120px"
      placeholder="请选择城市"
      :disabled="false"
      allowClear
      show-search
      v-model:value="selectedValue"
      @change="onAntChange" />
  </div>
</template>