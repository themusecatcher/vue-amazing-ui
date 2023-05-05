<script setup lang="ts">
import { ref, watch } from 'vue'

const singleValue = ref(20)
const doubleValue = ref([20, 80])
watch(singleValue, (to) => {
  console.log('p to:', to)
})
watch(doubleValue, (to) => {
  console.log('p to:', to)
})
function onChange (val: number|number[]) {
  console.log('change:', val)
}
</script>
<template>
  <div>
    <h2 class="mb10">Slider 单滑块滑动输入条基本使用 ({{  singleValue }})</h2>
    <Slider
      :min="0"
      :max="100"
      width="80%"
      v-model:value="singleValue"
      @change="onChange"/>
    <h2 class="mt30 mb10">双滑块滑动输入条基本使用 (range & {{ doubleValue }})</h2>
    <Slider
      :min="0"
      :max="100"
      width="80%"
      range
      v-model:value="doubleValue"
      @change="onChange"/>
    <h2 class="mt30 mb10">禁用双滑块滑动输入条 (range & disabled & {{ doubleValue }})</h2>
    <Slider
      :min="0"
      :max="100"
      width="80%"
      disabled
      range
      v-model:value="doubleValue"
      @change="onChange"/>
    <h2 class="mt30 mb10">Ant Design Vue 滑动输入条</h2>
    <a-slider v-model:value="doubleValue" :min="0" :max="100" range />
  </div>
</template>
<style lang="less" scoped>
</style>
