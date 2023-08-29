<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const singleValue = ref(20)
const singleCustomValue = ref(0)
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
    <h1>Slider 滑动输入条</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Slider
      width="80%"
      v-model:value="singleValue"
      @change="onChange" />
    <h2 class="mt30 mb10">禁用</h2>
    <Slider
      width="80%"
      v-model:value="singleValue"
      disabled
      @change="onChange" />
    <h2 class="mt30 mb10">双滑块</h2>
    <Slider
      width="80%"
      range
      v-model:value="doubleValue" />
    <h2 class="mt30 mb10">格式化提示内容</h2>
    <Slider
      width="80%"
      range
      :tip-formatter="formatter"
      v-model:value="doubleValue" />
    <h2 class="mt30 mb10">自定义最大最小值</h2>
    <Slider :min="-10" :max="10" v-model:value="singleCustomValue" />
    <h2 class="mt30 mb10">自定义步长</h2>
    <Slider :step="5" v-model:value="singleValue" />
    <Slider range :step="5" v-model:value="doubleValue" />
    <h2 class="mt30 mb10">Ant Design Slider</h2>
    <a-slider v-model:value="doubleValue" range />
  </div>
</template>
