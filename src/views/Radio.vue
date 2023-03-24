<script setup lang="ts">
import { ref, watch } from 'vue'

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

const value = ref(1)
watch(value, (to) => {
  console.log('p to:', to)
})
function onChange (value: any) {
  console.log('change:', value)
}
</script>
<template>
  <div>
    <h2>Radio 组件</h2>
    <p class="u-intro">用于在多个备选项中选中单个状态</p>
    <Radio
      :options="options"
      :gap="16"
      :vertical="false"
      @change="onChange"
      v-model:value="value" />
    <h2 class="mt30 mb10">Ant Design Vue 的 a-radio-group 组件</h2>
    <a-radio-group class="border-box" @change="onChange($event.target.value)" v-model:value="value" :options="options" />
  </div>
</template>
<style lang="less" scoped>
.border-box {
  :deep(*), :deep(:before), :deep(:after) {
    box-sizing: border-box;
  }
}
</style>
