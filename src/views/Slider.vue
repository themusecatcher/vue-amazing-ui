<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const singleValue = ref(20)
const singleCustomValue = ref(0)
const doubleValue = ref([20, 80])
const doubleCustomValue = ref([-5, 5])
const singleCustomStepValue = ref(30)
const doubleCustomStepValue = ref([30, 60])
watchEffect(() => {
  console.log('singleValue:', singleValue.value)
})
watchEffect(() => {
  console.log('doubleValue:', doubleValue.value)
})
watchEffect(() => {
  console.log('singleCustomValue:', singleCustomValue.value)
})
watchEffect(() => {
  console.log('doubleCustomValue:', doubleCustomValue.value)
})
watchEffect(() => {
  console.log('singleCustomStepValue:', singleCustomStepValue.value)
})
watchEffect(() => {
  console.log('doubleCustomStepValue:', doubleCustomStepValue.value)
})
function onChange(value: number | number[]) {
  console.log('change:', value)
}
function formatter(value: number) {
  return `${value}%`
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Slider v-model:value="singleValue" @change="onChange" />
    <h2 class="mt30 mb10">禁用</h2>
    <Flex vertical gap="large" width="80%">
      <Slider v-model:value="singleValue" disabled />
      <Slider v-model:value="doubleValue" range disabled />
    </Flex>
    <h2 class="mt30 mb10">双滑块</h2>
    <Slider width="80%" range v-model:value="doubleValue" @change="onChange" />
    <h2 class="mt30 mb10">自定义最大最小值</h2>
    <Flex vertical gap="large" width="80%">
      <Slider :min="-10" :max="10" v-model:value="singleCustomValue" />
      <Slider :min="-10" :max="10" range v-model:value="doubleCustomValue" />
    </Flex>
    <h2 class="mt30 mb10">自定义步长</h2>
    <Flex vertical gap="large" width="80%">
      <Slider :step="5" v-model:value="singleCustomStepValue" />
      <Slider range :step="5" v-model:value="doubleCustomStepValue" />
    </Flex>
    <h2 class="mt30 mb10">隐藏 tooltip</h2>
    <Flex vertical gap="large" width="80%">
      <Slider :tooltip="false" v-model:value="singleValue" />
      <Slider range :tooltip="false" v-model:value="doubleValue" />
    </Flex>
    <h2 class="mt30 mb10">格式化 tooltip</h2>
    <Flex vertical gap="large" width="80%">
      <Slider :format-tooltip="formatter" v-model:value="singleValue" />
      <Slider range :format-tooltip="formatter" v-model:value="doubleValue" />
    </Flex>
  </div>
</template>
