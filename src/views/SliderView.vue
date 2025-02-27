<script setup lang="ts">
import { ref, h, watchEffect } from 'vue'
import { FireFilled } from '@ant-design/icons-vue'
const singleValue = ref<number>(20)
const doubleValue = ref<number[]>([20, 80])
const disabledSingleValue = ref<number>(20)
const disabledDoubleValue = ref<number[]>([20, 80])
const customScaleSingleValue = ref<number>(0)
const customScaleDoubleValue = ref<number[]>([-5, 5])
const customStepSingleValue = ref<number>(30)
const customStepDoubleValue = ref<number[]>([30, 60])
const markSingleValue1 = ref<number>(37)
const markSingleValue2 = ref<number>(37)
const markSingleValue3 = ref<number>(37)
const markDoubleValue1 = ref<number[]>([20, 65])
const markDoubleValue2 = ref<number[]>([30, 60])
const markDoubleValue3 = ref<number[]>([26, 37])
const verticalSingleValue = ref<number>(37)
const verticalDoubleValue = ref<number[]>([20, 80])
const markVerticalSingleValue = ref<number>(37)
const markVerticalDoubleValue1 = ref<number[]>([20, 65])
const markVerticalDoubleValue2 = ref<number[]>([30, 60])
const markVerticalDoubleValue3 = ref<number[]>([26, 37])
const marks = ref<Record<number, any>>({
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50'
    },
    label: '100°C'
  }
})
const verticalMarks = ref<Record<number, any>>({
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
      fontWeight: 'bold'
    },
    label: h(FireFilled)
  }
})
const inputSingleValue = ref<number>(20)
const smallSingleValue = ref<number>(0.5)
const formatSingleValue = ref<number>(20)
const formatDoubleValue = ref<number[]>([20, 80])
const hideTooltipSingleValue = ref<number>(20)
const hideTooltipDoubleValue = ref<number[]>([20, 80])
const tooltipOpenSingleValue = ref<number>(20)
const tooltipOpenDoubleValue = ref<number[]>([20, 80])
const customStyleSingleValue = ref<number>(20)
const customStyleDoubleValue = ref<number[]>([20, 80])
const singleCustomStyle = {
  '--track-color': '#ffbb96',
  '--track-color-hover': '#d4380d',
  '--handle-color': '#fff2e8',
  '--handle-shadow-color': '#ffbb96',
  '--handle-shadow-color-hover-focus': '#d4380d',
  '--tooltip-color': 'rgba(0, 0, 0, 0.88)',
  '--tooltip-bg-color': '#fff'
}
const rangeCustomStyle = {
  '--rail-color': 'rgb(219, 219, 223)',
  '--rail-color-hover': 'rgb(199, 199, 203)',
  '--track-color': '#ffbb96',
  '--track-color-hover': '#d4380d',
  '--handle-color': '#fff2e8',
  '--handle-shadow-color': '#ffbb96',
  '--handle-shadow-color-hover-focus': '#d4380d',
  '--dot-border-color': 'rgb(219, 219, 223)',
  '--dot-border-color-hover': 'rgb(199, 199, 203)',
  '--dot-color-active': '#ffbb96',
  '--tooltip-color': 'rgba(0, 0, 0, 0.88)',
  '--tooltip-bg-color': '#fff'
}
const tooltipStyle = {
  top: '-40px',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: 1.5,
  height: '40px',
  padding: '8px 12px',
  borderRadius: '8px'
}
watchEffect(() => {
  console.log('singleValue', singleValue.value)
})
watchEffect(() => {
  console.log('doubleValue', doubleValue.value)
})
watchEffect(() => {
  console.log('customScaleSingleValue', customScaleSingleValue.value)
})
watchEffect(() => {
  console.log('customScaleDoubleValue', customScaleDoubleValue.value)
})
watchEffect(() => {
  console.log('customStepSingleValue', customStepSingleValue.value)
})
watchEffect(() => {
  console.log('customStepDoubleValue', customStepDoubleValue.value)
})
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
watchEffect(() => {
  console.log('verticalSingleValue', verticalSingleValue.value)
})
watchEffect(() => {
  console.log('verticalDoubleValue', verticalDoubleValue.value)
})
watchEffect(() => {
  console.log('markVerticalSingleValue', markVerticalSingleValue.value)
})
watchEffect(() => {
  console.log('markVerticalDoubleValue1', markVerticalDoubleValue1.value)
})
watchEffect(() => {
  console.log('markVerticalDoubleValue2', markVerticalDoubleValue2.value)
})
watchEffect(() => {
  console.log('markVerticalDoubleValue3', markVerticalDoubleValue3.value)
})
watchEffect(() => {
  console.log('inputSingleValue', inputSingleValue.value)
})
watchEffect(() => {
  console.log('smallSingleValue', smallSingleValue.value)
})
watchEffect(() => {
  console.log('formatSingleValue', formatSingleValue.value)
})
watchEffect(() => {
  console.log('formatDoubleValue', formatDoubleValue.value)
})
watchEffect(() => {
  console.log('hideTooltipSingleValue', hideTooltipSingleValue.value)
})
watchEffect(() => {
  console.log('hideTooltipDoubleValue', hideTooltipDoubleValue.value)
})
watchEffect(() => {
  console.log('tooltipOpenSingleValue', tooltipOpenSingleValue.value)
})
watchEffect(() => {
  console.log('tooltipOpenDoubleValue', tooltipOpenDoubleValue.value)
})
watchEffect(() => {
  console.log('customStyleSingleValue', customStyleSingleValue.value)
})
watchEffect(() => {
  console.log('customStyleDoubleValue', customStyleDoubleValue.value)
})
function onChange(value: number | number[]) {
  console.log('change', value)
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
      <Slider v-model:value="disabledSingleValue" disabled />
      <Slider v-model:value="disabledDoubleValue" range disabled />
    </Flex>
    <h2 class="mt30 mb10">自定义数值范围</h2>
    <Flex vertical gap="large">
      <Slider :min="-10" :max="10" v-model:value="customScaleSingleValue" />
      <Slider :min="-10" :max="10" range v-model:value="customScaleDoubleValue" />
    </Flex>
    <h2 class="mt30 mb10">自定义步长</h2>
    <Flex vertical gap="large">
      <Slider :step="5" v-model:value="customStepSingleValue" />
      <Slider range :step="5" v-model:value="customStepDoubleValue" />
    </Flex>
    <h2 class="mt30 mb10">自定义刻度标记</h2>
    <h3 class="mb10">使用 marks 属性可以添加刻度标记</h3>
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
    </Flex>
    <h3 class="mb10">同时设置 marks & step 属性</h3>
    <Flex vertical>
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
    </Flex>
    <h3 class="mb10">设置 step 为 'mark'，此时 Slider 的可选值仅有 marks 标记的部分</h3>
    <Flex vertical>
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
    <h2 class="mt30 mb10">垂直模式</h2>
    <Space :gap="36" style="height: 300px">
      <Slider vertical v-model:value="verticalSingleValue" />
      <Slider range vertical v-model:value="verticalDoubleValue" />
      <Slider vertical v-model:value="markVerticalSingleValue" :marks="marks" />
      <Slider vertical range v-model:value="markVerticalDoubleValue1" :marks="marks" />
      <Slider vertical range v-model:value="markVerticalDoubleValue2" :marks="verticalMarks" :step="10" />
      <Slider vertical range v-model:value="markVerticalDoubleValue3" :marks="verticalMarks" step="mark">
        <template #mark="{ label, isVNode, value }">
          <template v-if="isVNode"> {{ value }}°C </template>
          <template v-else>{{ label }}</template>
        </template>
      </Slider>
    </Space>
    <h2 class="mt30 mb10">带输入框的滑块</h2>
    <Row :gutter="[24, 16]">
      <Col :span="18">
        <Slider v-model:value="inputSingleValue" />
      </Col>
      <Col :span="6">
        <InputNumber v-model:value="inputSingleValue" :min="0" :max="100" />
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
      <Slider :format-tooltip="formatter" v-model:value="formatSingleValue" />
      <Slider range :format-tooltip="formatter" v-model:value="formatDoubleValue" />
    </Flex>
    <h2 class="mt30 mb10">隐藏 tooltip</h2>
    <Flex vertical gap="large">
      <Slider :tooltip="false" v-model:value="hideTooltipSingleValue" />
      <Slider range :tooltip="false" v-model:value="hideTooltipDoubleValue" />
    </Flex>
    <h2 class="mt30 mb10">始终显示 Tooltip</h2>
    <Flex vertical :gap="36">
      <Slider tooltip-open v-model:value="tooltipOpenSingleValue" />
      <Slider range tooltip-open v-model:value="tooltipOpenDoubleValue" />
    </Flex>
    <h2 class="mt30 mb10">自定义样式</h2>
    <h3 class="mb10">通过修改样式变量可以自定义滑动输入条样式、标记样式、Tooltip 样式</h3>
    <Flex vertical gap="large">
      <Slider :style="singleCustomStyle" v-model:value="customStyleSingleValue" />
      <Slider
        :style="rangeCustomStyle"
        range
        v-model:value="customStyleDoubleValue"
        :marks="marks"
        :tooltip-style="tooltipStyle"
      />
    </Flex>
  </div>
</template>
