# 滑动输入条 Slider

<br/>

*滑动型输入器，展示当前值和可选范围*

## 何时使用

- 当用户需要在数值区间/自定义区间内进行选择时

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
function onChange (val: number|number[]) {
  console.log('change:', val)
}
function formatter (value: number) {
  return `${value}%`
}
</script>

## 基本使用

<Slider
  :min="0"
  :max="100"
  v-model:value="singleValue"
  @change="onChange"/>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const singleValue = ref(20)
watchEffect(() => {
  console.log('singleValue:', singleValue.value)
})
function onChange (val: number) {
  console.log('change:', val)
}
</script>
<template>
  <Slider
    :min="0"
    :max="100"
    v-model:value="singleValue"
    @change="onChange"/>
</template>
```

</details>

## 双滑块

<Slider
  :min="0"
  :max="100"
  range
  v-model:value="doubleValue"
  @change="onChange"/>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const doubleValue = ref([20, 80])
watchEffect(() => {
  console.log('doubleValue:', doubleValue.value)
})
function onChange (val: number[]) {
  console.log('change:', val)
}
</script>
<template>
  <Slider
    :min="0"
    :max="100"
    range
    v-model:value="doubleValue"
    @change="onChange"/>
</template>
```

</details>

## 格式化 Tooltip 的内容

<Slider
  :min="0"
  :max="100"
  width="80%"
  range
  :tip-formatter="formatter"
  v-model:value="doubleValue"
  @change="onChange"/>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const doubleValue = ref([20, 80])
watchEffect(() => {
  console.log('doubleValue:', doubleValue.value)
})
function onChange (val: number[]) {
  console.log('change:', val)
}
function formatter (value: number) {
  return `${value}%`
}
</script>
<template>
  <Slider
    :min="0"
    :max="100"
    range
    :tip-formatter="formatter"
    v-model:value="doubleValue"
    @change="onChange"/>
</template>
```

</details>

## 禁用

<Slider
  :min="0"
  :max="100"
  disabled
  range
  v-model:value="doubleValue" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const doubleValue = ref([20, 80])
</script>
<template>
  <Slider
    :min="0"
    :max="100"
    disabled
    range
    v-model:value="doubleValue" />
</template>
```

</details>

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
width | 宽度 | string &#124; number | '100%' | false
min | 最小值 | number | 0 | false
max | 最大值 | number | 100 | false
disabled | 是否禁用 | boolean | false | false
range | 是否双滑块模式 | boolean | false | false
step | 步长，取值必须大于0，并且可被 (max - min) 整除 | number | 1 | false
tipFormatter | Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip | Function &#124; null | () => {} | false
value(v-model) | 设置当前取值，当 range 为 false 时，使用 number，否则用 [number, number] | number &#124; number[] | 0 | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 当前取值变化后的回调 | (value: number &#124; number[]) => void
