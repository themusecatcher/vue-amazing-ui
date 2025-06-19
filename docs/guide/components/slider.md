# 滑动输入条 Slider

<GlobalElement />

_滑动型输入器，展示当前值和可选范围_

## 何时使用

- 当用户需要在数值区间/自定义区间内进行选择时

<script setup lang="ts">
import { ref, h, watchEffect, isVNode } from 'vue'
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
  '--slider-track-color': '#ffbb96',
  '--slider-track-color-hover': '#d4380d',
  '--slider-handle-color': '#fff2e8',
  '--slider-handle-shadow-color': '#ffbb96',
  '--slider-handle-shadow-color-hover-focus': '#d4380d',
  '--slider-tooltip-color': 'rgba(0, 0, 0, 0.88)',
  '--slider-tooltip-bg-color': '#fff'
}
const rangeCustomStyle = {
  '--slider-rail-color': 'rgb(219, 219, 223)',
  '--slider-rail-color-hover': 'rgb(199, 199, 203)',
  '--slider-track-color': '#ffbb96',
  '--slider-track-color-hover': '#d4380d',
  '--slider-handle-color': '#fff2e8',
  '--slider-handle-shadow-color': '#ffbb96',
  '--slider-handle-shadow-color-hover-focus': '#d4380d',
  '--slider-dot-border-color': 'rgb(219, 219, 223)',
  '--slider-dot-border-color-hover': 'rgb(199, 199, 203)',
  '--slider-dot-color-active': '#ffbb96',
  '--slider-tooltip-color': 'rgba(0, 0, 0, 0.88)',
  '--slider-tooltip-bg-color': '#fff'
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

## 基本使用

<Slider v-model:value="singleValue" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const singleValue = ref<number>(20)
watchEffect(() => {
  console.log('singleValue', singleValue.value)
})
function onChange(value: number | number[]) {
  console.log('change', value)
}
</script>
<template>
  <Slider v-model:value="singleValue" @change="onChange" />
</template>
```

:::

## 双滑块

<Slider range v-model:value="doubleValue" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const doubleValue = ref<number[]>([20, 80])
watchEffect(() => {
  console.log('doubleValue', doubleValue.value)
})
function onChange(value: number | number[]) {
  console.log('change', value)
}
</script>
<template>
  <Slider range v-model:value="doubleValue" @change="onChange" />
</template>
```

:::

## 禁用

<Flex vertical gap="large">
  <Slider v-model:value="disabledSingleValue" disabled />
  <Slider v-model:value="disabledDoubleValue" range disabled />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const disabledSingleValue = ref<number>(20)
const disabledDoubleValue = ref<number[]>([20, 80])
</script>
<template>
  <Flex vertical gap="large">
    <Slider v-model:value="disabledSingleValue" disabled />
    <Slider v-model:value="disabledDoubleValue" range disabled />
  </Flex>
</template>
```

:::

## 自定义数值范围

<Flex vertical gap="large">
  <Slider :min="-10" :max="10" v-model:value="customScaleSingleValue" />
  <Slider :min="-10" :max="10" range v-model:value="customScaleDoubleValue" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const customScaleSingleValue = ref<number>(0)
const customScaleDoubleValue = ref<number[]>([-5, 5])
watchEffect(() => {
  console.log('customScaleSingleValue', customScaleSingleValue.value)
})
watchEffect(() => {
  console.log('customScaleDoubleValue', customScaleDoubleValue.value)
})
</script>
<template>
  <Flex vertical gap="large">
    <Slider :min="-10" :max="10" v-model:value="customScaleSingleValue" />
    <Slider :min="-10" :max="10" range v-model:value="customScaleDoubleValue" />
  </Flex>
</template>
```

:::

## 自定义步长

<Flex vertical gap="large">
  <Slider :step="5" v-model:value="customStepSingleValue" />
  <Slider range :step="5" v-model:value="customStepDoubleValue" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const customStepSingleValue = ref<number>(30)
const customStepDoubleValue = ref<number[]>([30, 60])
watchEffect(() => {
  console.log('customStepSingleValue', customStepSingleValue.value)
})
watchEffect(() => {
  console.log('customStepDoubleValue', customStepDoubleValue.value)
})
</script>
<template>
  <Flex vertical gap="large">
    <Slider :step="5" v-model:value="customStepSingleValue" />
    <Slider range :step="5" v-model:value="customStepDoubleValue" />
  </Flex>
</template>
```

:::

## 自定义刻度标记

_使用 marks 属性可以添加刻度标记_

<br/>

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

_同时设置 `marks` & `step` 属性_

<br/>

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

_设置 `step` 为 `'mark'`，此时 `Slider` 的可选值仅有 `marks` 标记的部分_

<br/>

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

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { FireFilled } from '@ant-design/icons-vue'
const markSingleValue1 = ref<number>(37)
const markSingleValue2 = ref<number>(37)
const markSingleValue3 = ref<number>(37)
const markDoubleValue1 = ref<number[]>([20, 65])
const markDoubleValue2 = ref<number[]>([30, 60])
const markDoubleValue3 = ref<number[]>([26, 37])
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
</script>
<template>
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
</template>
```

:::

## 垂直模式

<Space :gap="36" style="height: 300px">
  <Slider vertical v-model:value="verticalSingleValue" />
  <Slider range vertical v-model:value="verticalDoubleValue" />
  <Slider vertical v-model:value="markVerticalSingleValue" :marks="marks" />
  <Slider vertical range v-model:value="markVerticalDoubleValue1" :marks="marks" />
  <Slider vertical range v-model:value="markVerticalDoubleValue2" :marks="verticalMarks" :step="10" />
  <Slider vertical range v-model:value="markVerticalDoubleValue3" :marks="verticalMarks" step="mark">
    <template #mark="{ label, value }">
      <template v-if="isVNode(label)"> {{ value }}°C </template>
      <template v-else>{{ label }}</template>
    </template>
  </Slider>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, h, watchEffect, isVNode } from 'vue'
import { FireFilled } from '@ant-design/icons-vue'
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
</script>
<template>
  <Space :gap="36" style="height: 300px">
    <Slider vertical v-model:value="verticalSingleValue" />
    <Slider range vertical v-model:value="verticalDoubleValue" />
    <Slider vertical v-model:value="markVerticalSingleValue" :marks="marks" />
    <Slider vertical range v-model:value="markVerticalDoubleValue1" :marks="marks" />
    <Slider vertical range v-model:value="markVerticalDoubleValue2" :marks="verticalMarks" :step="10" />
    <Slider vertical range v-model:value="markVerticalDoubleValue3" :marks="verticalMarks" step="mark">
      <template #mark="{ label, value }">
        <template v-if="isVNode(label)"> {{ value }}°C </template>
        <template v-else>{{ label }}</template>
      </template>
    </Slider>
  </Space>
</template>
```

:::

## 带输入框的滑块

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

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const inputSingleValue = ref<number>(20)
const smallSingleValue = ref<number>(0.5)
watchEffect(() => {
  console.log('inputSingleValue', inputSingleValue.value)
})
watchEffect(() => {
  console.log('smallSingleValue', smallSingleValue.value)
})
</script>
<template>
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
</template>
```

:::

## 格式化 tooltip

<Flex vertical gap="large">
  <Slider :format-tooltip="formatter" v-model:value="formatSingleValue" />
  <Slider range :format-tooltip="formatter" v-model:value="formatDoubleValue" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const formatSingleValue = ref<number>(20)
const formatDoubleValue = ref<number[]>([20, 80])
watchEffect(() => {
  console.log('formatSingleValue', formatSingleValue.value)
})
watchEffect(() => {
  console.log('formatDoubleValue', formatDoubleValue.value)
})
function formatter(value: number) {
  return `${value}%`
}
</script>
<template>
  <Flex vertical gap="large">
    <Slider :format-tooltip="formatter" v-model:value="formatSingleValue" />
    <Slider range :format-tooltip="formatter" v-model:value="formatDoubleValue" />
  </Flex>
</template>
```

:::

## 隐藏 tooltip

<Flex vertical gap="large">
  <Slider :tooltip="false" v-model:value="hideTooltipSingleValue" />
  <Slider range :tooltip="false" v-model:value="hideTooltipDoubleValue" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const hideTooltipSingleValue = ref<number>(20)
const hideTooltipDoubleValue = ref<number[]>([20, 80])
watchEffect(() => {
  console.log('hideTooltipSingleValue', hideTooltipSingleValue.value)
})
watchEffect(() => {
  console.log('hideTooltipDoubleValue', hideTooltipDoubleValue.value)
})
</script>
<template>
  <Flex vertical gap="large">
    <Slider :tooltip="false" v-model:value="hideTooltipSingleValue" />
    <Slider range :tooltip="false" v-model:value="hideTooltipDoubleValue" />
  </Flex>
</template>
```

:::

## 始终显示 Tooltip

<Flex vertical :gap="36">
  <Slider tooltip-open v-model:value="tooltipOpenSingleValue" />
  <Slider range tooltip-open v-model:value="tooltipOpenDoubleValue" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const tooltipOpenSingleValue = ref<number>(20)
const tooltipOpenDoubleValue = ref<number[]>([20, 80])
watchEffect(() => {
  console.log('tooltipOpenSingleValue', tooltipOpenSingleValue.value)
})
watchEffect(() => {
  console.log('tooltipOpenDoubleValue', tooltipOpenDoubleValue.value)
})
</script>
<template>
  <Flex vertical :gap="36">
    <Slider tooltip-open v-model:value="tooltipOpenSingleValue" />
    <Slider range tooltip-open v-model:value="tooltipOpenDoubleValue" />
  </Flex>
</template>
```

:::

## 自定义样式

_通过修改样式变量可以自定义滑动输入条样式、标记样式、`Tooltip` 样式_

<Flex vertical gap="large">
  <Slider :style="singleCustomStyle" v-model:value="customStyleSingleValue" />
  <Slider :style="rangeCustomStyle" range v-model:value="customStyleDoubleValue" :marks="marks" :tooltip-style="tooltipStyle" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const customStyleSingleValue = ref<number>(20)
const customStyleDoubleValue = ref<number[]>([20, 80])
const singleCustomStyle = {
  '--slider-track-color': '#ffbb96',
  '--slider-track-color-hover': '#d4380d',
  '--slider-handle-color': '#fff2e8',
  '--slider-handle-shadow-color': '#ffbb96',
  '--slider-handle-shadow-color-hover-focus': '#d4380d',
  '--slider-tooltip-color': 'rgba(0, 0, 0, 0.88)',
  '--slider-tooltip-bg-color': '#fff'
}
const rangeCustomStyle = {
  '--slider-rail-color': 'rgb(219, 219, 223)',
  '--slider-rail-color-hover': 'rgb(199, 199, 203)',
  '--slider-track-color': '#ffbb96',
  '--slider-track-color-hover': '#d4380d',
  '--slider-handle-color': '#fff2e8',
  '--slider-handle-shadow-color': '#ffbb96',
  '--slider-handle-shadow-color-hover-focus': '#d4380d',
  '--slider-dot-border-color': 'rgb(219, 219, 223)',
  '--slider-dot-border-color-hover': 'rgb(199, 199, 203)',
  '--slider-dot-color-active': '#ffbb96',
  '--slider-tooltip-color': 'rgba(0, 0, 0, 0.88)',
  '--slider-tooltip-bg-color': '#fff'
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
  console.log('customStyleSingleValue', customStyleSingleValue.value)
})
watchEffect(() => {
  console.log('customStyleDoubleValue', customStyleDoubleValue.value)
})
</script>
<template>
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
</template>
```

:::

## APIs

### Slider

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| width | 滑动输入条宽度，单位 `px`，水平模式时生效 | string &#124; number | '100%' |
| height | 滑动输入条高度，单位 `px`，垂直模式时生效 | string &#124; number | '100%' |
| vertical | 是否启用垂直模式 | boolean | false |
| min | 最小值 | number | 0 |
| max | 最大值 | number | 100 |
| marks | 刻度标记，`key` 的类型必须为 `number` 且取值在闭区间 `[min, max]` 内，每个标记可以单独设置样式 | [Marks](#marks-type) | {} |
| disabled | 是否禁用 | boolean | false |
| range | 是否使用双滑块模式 | boolean | false |
| step | 步长，取值必须大于 `0`，并且可被 `(max - min)` 整除；当 `marks` 不为空对象时，可以设置 `step` 为 `'mark'`，此时 `Slider` 的可选值仅有 `marks` 标记的部分 | number &#124; 'mark' | 1 |
| tooltip | 是否展示 `Tooltip` | boolean | true |
| tooltipOpen | 是否一直显示 `tooltip` | boolean | false |
| tooltipStyle | 自定义 `Tooltip` 样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| formatTooltip | `Slider` 会把当前值传给 `formatTooltip`，并在 `Tooltip` 中显示 `formatTooltip` 的返回值 | (value: number) => string &#124; number | (value: number) => value |
| value <Tag color="cyan">v-model</Tag> | 设置当前取值，当 `range` 为 `false` 时，使用 `number`，否则用 `[number, number]` | number &#124; number[] | 0 |

### Marks Type

| 名称 | 值 |
| :-- | :-- |
| Marks | { [markValue: number]: string &#124; VNode &#124; (() => VNode) &#124; { style: [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties), label: string &#124; VNode &#124; (() => VNode) } } |

## Slots

| 名称 | 说明           | 类型                           |
| :--- | :------------- | :----------------------------- |
| mark | 自定义刻度标记 | v-slot:mark="{ label, value }" |

## Events

| 名称   | 说明                 | 类型                                    |
| :----- | :------------------- | :-------------------------------------- |
| change | 当前取值变化后的回调 | (value: number &#124; number[]) => void |
