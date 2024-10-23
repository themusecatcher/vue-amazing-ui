# 滑动输入条 Slider

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="✨ 成为赞助者 !"
  :tooltip-props="{
    tooltipStyle: {
      fontWeight: 500
    }
  }"
  href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
  target="_blank"
>
  <template #description>
    <span style="font-size: 14px; font-weight: 600;">赞助</span>
  </template>
</FloatButton>
<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*滑动型输入器，展示当前值和可选范围*

## 何时使用

- 当用户需要在数值区间/自定义区间内进行选择时

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

## 基本使用

<Slider v-model:value="singleValue" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const singleValue = ref(20)
watchEffect(() => {
  console.log('singleValue:', singleValue.value)
})
function onChange(value: number | number[]) {
  console.log('change:', value)
}
</script>
<template>
  <Slider v-model:value="singleValue" @change="onChange" />
</template>
```

:::

## 禁用

<Flex vertical gap="large">
  <Slider v-model:value="singleValue" disabled />
  <Slider v-model:value="doubleValue" range disabled />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const singleValue = ref(20)
const doubleValue = ref([20, 80])
</script>
<template>
  <Flex vertical gap="large">
    <Slider v-model:value="singleValue" disabled />
    <Slider v-model:value="doubleValue" range disabled />
  </Flex>
</template>
```

:::

## 双滑块

<Slider range v-model:value="doubleValue" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const doubleValue = ref([20, 80])
watchEffect(() => {
  console.log('doubleValue:', doubleValue.value)
})
function onChange(value: number | number[]) {
  console.log('change:', value)
}
</script>
<template>
  <Slider range v-model:value="doubleValue" @change="onChange" />
</template>
```

:::

## 自定义最大最小值

<Flex vertical gap="large">
  <Slider :min="-10" :max="10" v-model:value="singleCustomValue" />
  <Slider :min="-10" :max="10" range v-model:value="doubleCustomValue" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const singleCustomValue = ref(0)
const doubleCustomValue = ref([-5, 5])
watchEffect(() => {
  console.log('singleCustomValue:', singleCustomValue.value)
})
watchEffect(() => {
  console.log('doubleCustomValue:', doubleCustomValue.value)
})
</script>
<template>
  <Flex vertical gap="large">
    <Slider :min="-10" :max="10" v-model:value="singleCustomValue" />
    <Slider :min="-10" :max="10" range v-model:value="doubleCustomValue" />
  </Flex>
</template>
```

:::

## 自定义步长

<Flex vertical gap="large">
  <Slider :step="5" v-model:value="singleCustomStepValue" />
  <Slider range :step="5" v-model:value="doubleCustomStepValue" />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const singleCustomStepValue = ref(30)
const doubleCustomStepValue = ref([30, 60])
watchEffect(() => {
  console.log('singleCustomStepValue:', singleCustomStepValue.value)
})
watchEffect(() => {
  console.log('doubleCustomStepValue:', doubleCustomStepValue.value)
})
</script>
<template>
  <Flex vertical gap="large">
    <Slider :step="5" v-model:value="singleCustomStepValue" />
    <Slider range :step="5" v-model:value="doubleCustomStepValue" />
  </Flex>
</template>
```

:::

## 垂直模式

<Space :gap="36" style="height: 300px">
  <Slider vertical v-model:value="singleValue" />
  <Slider range vertical v-model:value="doubleValue" />
</Space>

::: details Show Code

```vue
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
</script>
<template>
  <Space :gap="36" style="height: 300px">
    <Slider vertical v-model:value="singleValue" />
    <Slider range vertical v-model:value="doubleValue" />
  </Space>
</template>
```

:::

## 带输入框的滑块

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

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const singleValue = ref(20)
const smallSingleValue = ref(0.5)
watchEffect(() => {
  console.log('singleValue:', singleValue.value)
})
watchEffect(() => {
  console.log('smallSingleValue:', smallSingleValue.value)
})
</script>
<template>
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
</template>
```

:::

## 格式化 tooltip

<Flex vertical gap="large">
  <Slider :format-tooltip="formatter" v-model:value="singleValue" />
  <Slider range :format-tooltip="formatter" v-model:value="doubleValue" />
</Flex>

::: details Show Code

```vue
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
function formatter (value: number) {
  return `${value}%`
}
</script>
<template>
  <Flex vertical gap="large">
    <Slider :format-tooltip="formatter" v-model:value="singleValue" />
    <Slider range :format-tooltip="formatter" v-model:value="doubleValue" />
  </Flex>
</template>
```

:::

## 隐藏 tooltip

<Flex vertical gap="large">
  <Slider :tooltip="false" v-model:value="singleValue" />
  <Slider range :tooltip="false" v-model:value="doubleValue" />
</Flex>

::: details Show Code

```vue
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
</script>
<template>
  <Flex vertical gap="large">
    <Slider :tooltip="false" v-model:value="singleValue" />
    <Slider range :tooltip="false" v-model:value="doubleValue" />
  </Flex>
</template>
```

:::

## APIs

### Slider

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
width | 滑动输入条宽度，单位 `px`，水平模式时生效 | string &#124; number | '100%'
height | 滑动输入条高度，单位 `px`，垂直模式时生效 | string &#124; number | '100%'
vertical | 是否启用垂直模式 | boolean | false
min | 最小值 | number | 0
max | 最大值 | number | 100
disabled | 是否禁用 | boolean | false
range | 是否使用双滑块模式 | boolean | false
step | 步长，取值必须大于 `0`，并且可被 `(max - min)` 整除 | number | 1
formatTooltip | `Slider` 会把当前值传给 `formatTooltip`，并在 `Tooltip` 中显示 `formatTooltip` 的返回值 | (value: number) => string &#124; number | (value: number) => value
tooltip | 是否展示 `Tooltip` | boolean | true
value <Tag color="cyan">v-model</Tag> | 设置当前取值，当 `range` 为 `false` 时，使用 `number`，否则用 `[number, number]` | number &#124; number[] | 0

## Events

名称 | 说明 | 类型
-- | -- | --
change | 当前取值变化后的回调 | (value: number &#124; number[]) => void
