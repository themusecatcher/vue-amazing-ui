<script setup lang="ts">
import { ref, h, watchEffect } from 'vue'
import { FireFilled } from '@ant-design/icons-vue'
const singleValue = ref<number>(20)
const smallSingleValue = ref<number>(0.5)
const singleCustomValue = ref<number>(0)
const doubleValue = ref<number[]>([20, 80])
const doubleCustomValue = ref<number[]>([-5, 5])
const markSingleValue1 = ref<number>(24)
const markSingleValue2 = ref<number>(30)
const markSingleValue3 = ref<number>(37)
const markDoubleValue1 = ref<number[]>([20, 55])
const markDoubleValue2 = ref<number[]>([30, 60])
const markDoubleValue3 = ref<number[]>([0, 37])
const marks = ref<Record<number, any>>({
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: '100°C'
    // label: h(FireFilled)
  }
})
const singleCustomStepValue = ref<number>(30)
const doubleCustomStepValue = ref<number[]>([30, 60])
const customStyle = {
  '--track-color': '#ffbb96',
  '--track-color-hover': '#d4380d',
  '--handle-color': '#fff2e8',
  '--handle-shadow-color': '#ffbb96',
  '--handle-shadow-color-hover-focus': '#d4380d'
}
const rangeCustomStyle = {
  '--rail-color': 'rgb(219, 219, 223)',
  '--rail-color-hover': 'rgb(199, 199, 203)',
  '--track-color': '#ffbb96',
  '--track-color-hover': '#d4380d',
  '--handle-color': '#fff2e8',
  '--handle-shadow-color': '#ffbb96',
  '--handle-shadow-color-hover-focus': '#d4380d'
}
// watchEffect(() => {
//   console.log('singleValue', singleValue.value)
// })
// watchEffect(() => {
//   console.log('smallSingleValue', smallSingleValue.value)
// })
// watchEffect(() => {
//   console.log('singleCustomValue', singleCustomValue.value)
// })
// watchEffect(() => {
//   console.log('doubleValue', doubleValue.value)
// })
// watchEffect(() => {
//   console.log('doubleCustomValue', doubleCustomValue.value)
// })
watchEffect(() => {
  console.log('markSingleValue1', markSingleValue1.value)
})
watchEffect(() => {
  console.log('markSingleValue2', markSingleValue2.value)
})
watchEffect(() => {
  console.log('markSingleValue3', markSingleValue3.value)
})
watchEffect(() => {
  console.log('markDoubleValue1', markDoubleValue1.value)
})
watchEffect(() => {
  console.log('markDoubleValue2', markDoubleValue2.value)
})
watchEffect(() => {
  console.log('markDoubleValue3', markDoubleValue3.value)
})
// watchEffect(() => {
//   console.log('singleCustomStepValue', singleCustomStepValue.value)
// })
// watchEffect(() => {
//   console.log('doubleCustomStepValue', doubleCustomStepValue.value)
// })
function onChange(value: number | number[]) {
  console.log('change', value)
}
function formatter(value: number) {
  return `${value}%`
}
const markSingleValue4 = ref(32)
</script>
<template>
  <div style="width: 80%">
    <!-- <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
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
    </Flex> -->
    <h2 class="mt30 mb10">自定义刻度标记</h2>
    <Flex vertical>
      <Slider v-model:value="markSingleValue1" :marks="marks">
        <template #mark="{ label, value }">
          <template v-if="value === 100">
            <strong>{{ label }}</strong>
          </template>
          <template v-else>{{ label }}</template>
        </template>
      </Slider>
      <Slider range v-model:value="markDoubleValue1" :marks="marks">
        <template #mark="{ label, value }">
          <template v-if="value === 100">
            <strong>{{ label }}</strong>
          </template>
          <template v-else>{{ label }}</template>
        </template>
      </Slider>
      <n-slider v-model:value="markSingleValue4" :marks="marks" :step="10" />
      <Slider v-model:value="markSingleValue2" :marks="marks" :step="10">
        <template #mark="{ label, value }">
          <template v-if="value === 100">
            <FireFilled />
          </template>
          <template v-else>{{ label }}</template>
        </template>
      </Slider>
      <Slider range v-model:value="markDoubleValue2" :marks="marks" :step="10">
        <template #mark="{ label, value }">
          <template v-if="value === 100">
            <FireFilled />
          </template>
          <template v-else>{{ label }}</template>
        </template>
      </Slider>
      <Slider v-model:value="markSingleValue3" :marks="marks" step="mark">
        <template #mark="{ label, value }">
          <template v-if="value === 100">
            <strong>{{ label }}</strong>
          </template>
          <template v-else>{{ label }}</template>
        </template>
      </Slider>
      <Slider range v-model:value="markDoubleValue3" :marks="marks" step="mark">
        <template #mark="{ label, value }">
          <template v-if="value === 100">
            <strong>{{ label }}</strong>
          </template>
          <template v-else>{{ label }}</template>
        </template>
      </Slider>
    </Flex>
    <!-- <h2 class="mt30 mb10">自定义步长</h2>
    <Flex vertical gap="large">
      <Slider :step="5" v-model:value="singleCustomStepValue" />
      <Slider range :step="5" v-model:value="doubleCustomStepValue" />
    </Flex> -->
    <h2 class="mt30 mb10">垂直模式</h2>
    <Space :gap="36" style="height: 300px">
      <!-- <Slider vertical v-model:value="singleValue" />
      <Slider range vertical v-model:value="doubleValue" /> -->
      <!-- <Slider vertical v-model:value="markSingleValue" :marks="marks" />
      <a-slider vertical v-model:value="markSingleValue" :marks="marks" /> -->
    </Space>
    <!-- <h2 class="mt30 mb10">带输入框的滑块</h2>
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
    <h2 class="mt30 mb10">自定义样式</h2>
    <Flex vertical gap="large">
      <Slider :style="customStyle" v-model:value="singleValue" />
      <Slider :style="rangeCustomStyle" range v-model:value="doubleValue" />
    </Flex> -->
  </div>
</template>
