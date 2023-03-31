<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { rafTimeout } from '../../packages'

const options = ref([
      {
        label: '北京市',
        value: 1
      },
      {
        label: '上海市上海市上海市上海市',
        value: 2,
        disabled: true
      },
      {
        label: '郑州市',
        value: 3
      },
      {
        label: '纽约市纽约市纽约市纽约市',
        value: 4
      },
      {
        label: '旧金山',
        value: 5
      },
      {
        label: '悉尼市',
        value: 6
      },
      {
        label: '伦敦市',
        value: 7
      },
      {
        label: '巴黎市',
        value: 8
      }
    ])
const selectedValue = ref(1)

watch(selectedValue, (to) => {
  console.log('selectedValue:', to)
})
onMounted(() => {
  rafTimeout(() => { // 模拟接口调用
    selectedValue.value = 3
  }, 1000)
})
function onChange (value: string|number, label: string,  index: number) {
  console.log('item:', value, label, index)
}
</script>
<template>
  <div>
    <h2 class="mb10">Select 选择器基本使用</h2>
    <Select
      :options="options"
      label="label"
      value="value"
      placeholder="请选择城市"
      :disabled="false"
      :width="160"
      :height="36"
      :num="6"
      v-model:selectedValue="selectedValue"
      @change="onChange" />
    <h2 class="mt30 mb10">Select 选择器支持清除（allowClear）</h2>
    <Select
      :options="options"
      label="label"
      value="value"
      placeholder="请选择城市"
      :disabled="false"
      :width="160"
      :height="36"
      :num="6"
      allowClear
      v-model:selectedValue="selectedValue"
      @change="onChange" />
    <h2 class="mt30 mb10">Ant Design Vue 选择器支持清除（allowClear）</h2>
    <a-select
      class="border-box"
      :options="options"
      style="width: 180px"
      placeholder="请选择城市"
      :disabled="false"
      allowClear
      v-model:value="selectedValue"
      @change="onChange" />
  </div>
</template>
<style lang="less" scoped>
.border-box {
  :deep(*), :deep(:before), :deep(:after) {
    box-sizing: border-box;
  }
}
</style>
