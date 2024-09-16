<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const singleValue = ref(20)
const smallSingleValue = ref(0.5)
const singleCustomValue = ref(0)
const doubleValue = ref([20, 80])
const doubleCustomValue = ref([-5, 5])
const singleCustomStepValue = ref(30)
const doubleCustomStepValue = ref([30, 60])
watchEffect(() => {
  console.log('singleValue:', singleValue.value)
})
watchEffect(() => {
  console.log('smallSingleValue:', smallSingleValue.value)
})
watchEffect(() => {
  console.log('singleCustomValue:', singleCustomValue.value)
})
watchEffect(() => {
  console.log('doubleValue:', doubleValue.value)
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
  <div style="width: 80%">
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Slider v-model:value="singleValue" @change="onChange" />
    <h2 class="mt30 mb10">双滑块</h2>
    <Slider range v-model:value="doubleValue" @change="onChange" />
    <h2 class="mt30 mb10">禁用</h2>
    <Flex vertical gap="large">
      <Slider v-model:value="singleValue" disabled />
      <Slider v-model:value="doubleValue" range disabled />
    </Flex>
    <h2 class="mt30 mb10">自定义数值范围</h2>
    <Flex vertical gap="large">
      <Slider :min="-10" :max="10" v-model:value="singleCustomValue" />
      <Slider :min="-10" :max="10" range v-model:value="doubleCustomValue" />
    </Flex>
    <h2 class="mt30 mb10">自定义步长</h2>
    <Flex vertical gap="large">
      <Slider :step="5" v-model:value="singleCustomStepValue" />
      <Slider range :step="5" v-model:value="doubleCustomStepValue" />
    </Flex>
    <h2 class="mt30 mb10">垂直模式</h2>
    <Space :gap="36" style="height: 300px">
      <Slider vertical v-model:value="singleValue" />
      <Slider range vertical v-model:value="doubleValue" />
    </Space>
    <h2 class="mt30 mb10">带输入框的滑块</h2>
    <Row :gutter="[24, 16]">
      <Col :span="18">
        <Slider v-model:value="singleValue" />
      </Col>
      <Col :span="6">
        <InputNumber v-model:value="singleValue" :min="0" :max="100" />
      </Col>
      <Col :span="18">
        <Slider v-model:value="smallSingleValue" :min="0" :max="1" :step="0.01" />
      </Col>
      <Col :span="6">
        <InputNumber v-model:value="smallSingleValue" :min="0" :max="1" :step="0.01" />
      </Col>
    </Row>
    <h2 class="mt30 mb10">格式化 tooltip</h2>
    <Flex vertical gap="large">
      <Slider :format-tooltip="formatter" v-model:value="singleValue" />
      <Slider range :format-tooltip="formatter" v-model:value="doubleValue" />
    </Flex>
    <h2 class="mt30 mb10">隐藏 tooltip</h2>
    <Flex vertical gap="large">
      <Slider :tooltip="false" v-model:value="singleValue" />
      <Slider range :tooltip="false" v-model:value="doubleValue" />
    </Flex>
  </div>
</template>
