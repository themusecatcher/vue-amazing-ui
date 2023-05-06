# 数字输入框 InputNumber

<br/>

*通过鼠标或键盘，输入范围内的数值*

## 何时使用

- 当需要获取标准数值时

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (number: number) {
  console.log('number:', number)
}
function onAntChange (number: number) {
  console.log('ant:', number)
}
</script>

## 基本使用

<InputNumber
  :min="-10"
  :max="10"
  :step="1"
  @change="onChange"
  v-model:value="value" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (number: number) {
  console.log('number:', number)
}
</script>
<template>
  <InputNumber
    :min="-10"
    :max="10"
    :step="1"
    @change="onChange"
    v-model:value="value" />
</template>
```

</details>

## 添加前缀图标 $

<InputNumber
  :min="-10"
  :max="10"
  :step="1"
  prefix="$"
  @change="onChange"
  v-model:value="value" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (number: number) {
  console.log('number:', number)
}
</script>
<template>
  <InputNumber
    :min="-10"
    :max="10"
    :step="1"
    prefix="$"
    @change="onChange"
    v-model:value="value" />
</template>
```

</details>
