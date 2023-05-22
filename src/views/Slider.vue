<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const singleValue = ref(20)
const doubleValue = ref([20, 80])
watchEffect(() => {
  console.log('singleValue:', singleValue.value)
})
watchEffect(() => {
  console.log('doubleValue:', doubleValue.value)
})
function onChange (value: number|number[]) {
  console.log('change:', value)
}
function formatter (value: number) {
  return `${value}%`
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
    <h2 class="mt30 mb10">格式化 Tooltip 的内容</h2>
    <Slider
      :min="0"
      :max="100"
      width="80%"
      range
      :tip-formatter="formatter"
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
    <a-slider v-model:value="doubleValue" :tooltipOpen="true" :min="0" :max="100" range />
  </div>
</template>
