# 数字输入框 InputNumber

<br/>

*通过鼠标或键盘，输入范围内的数值*

## 何时使用

- 当需要获取标准数值时

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { formatNumber } from 'vue-amazing-ui'
const value = ref(3)
const formatValue = ref(1000)
watchEffect(() => {
  console.log('value:', value.value)
})
watchEffect(() => {
  console.log('formatValue:', formatValue.value)
})
function formatter (num: string): string {
  return formatNumber(num, 2)
}
function onChange (number: number) {
  console.log('number:', number)
}
</script>

## 基本使用

<InputNumber v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <InputNumber v-model:value="value" />
</template>
```

:::

## 步长为小数

<InputNumber :step="0.1" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <InputNumber :step="0.1" v-model:value="value" />
</template>
```

:::

## 设置数值精度

<InputNumber :step="0.3" :precision="2" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <InputNumber :step="0.3" :precision="2" v-model:value="value" />
</template>
```

:::

## 格式化展示

<InputNumber :width="120" :step="10" :formatter="formatter" v-model:value="formatValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { formatNumber } from 'vue-amazing-ui'
const formatValue = ref(1000)
watchEffect(() => {
  console.log('formatValue:', formatValue.value)
})
function formatter (num: string): string {
  return formatNumber(num, 2)
}
</script>
<template>
  <InputNumber :width="120" :step="10" :formatter="formatter" v-model:value="formatValue" />
</template>
```

:::

## 自定义最大最小值

<InputNumber :min="0" :max="10" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <InputNumber :min="0" :max="10" v-model:value="value" />
</template>
```

:::

## 添加前缀图标

<InputNumber prefix="$" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <InputNumber prefix="$" v-model:value="value" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
width | 输入框宽度，单位px | string &#124; number | 90 | false
min | 最小值 | number | -Infinity | false
max | 最大值 | number | Infinity | false
step | 每次改变步数，可以为小数 | number | 1 | false
precision | 数值精度 | number | 0 | false
prefix | 前缀图标 | string &#124; slot | '' | false
formatter | 指定展示值的格式 | Funtion | (value: string) => value | false
keyboard | 是否启用键盘快捷键行为（上方向键增，下方向键减） | boolean | true | false
value <Tag color="cyan">v-model</Tag> | 当前值 | number &#124; null | null | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 变化回调 | (value: number) => void
