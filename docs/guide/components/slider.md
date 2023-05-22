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
