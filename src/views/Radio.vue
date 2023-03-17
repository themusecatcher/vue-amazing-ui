<script setup lang="ts">
import { ref, watch } from 'vue'

const options = ref([
      {
        label: '北京市',
        value: '1'
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

const value = ref()
watch(value, (to) => {
  console.log('p to:', to)
})
</script>
<template>
  <div>
    <Radio
      :options="options"
      :gap="16"
      v-model:value="value" />
  </div>
</template>
<style lang="less" scoped>

</style>
