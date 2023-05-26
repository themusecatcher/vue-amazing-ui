# 评分 Rate

## 何时使用

- 对评价进行展示
- 对事物进行快速的评级操作

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (value: number) {
  console.log('change value:', value)
}
function onHoverChange (value: number) {
  console.log('hover value:', value)
}
</script>

## 基本使用

<Rate v-model:value="value" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate v-model:value="value" />
</template>
```

</details>

## 禁用

<Rate v-model:value="value" disabled />

<Rate character="star-outlined" :size="30" v-model:value="value" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate v-model:value="value" disabled />
</template>
```

</details>

## 空心星型

<Rate character="star-outlined" :size="30" v-model:value="value" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate character="star-outlined" :size="30" v-model:value="value" />
</template>
```

</details>

## 实心心型

<Rate character="heart-filled" :size="30" v-model:value="value" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate character="heart-filled" :size="30" v-model:value="value" />
</template>
```

</details>

## 空心心型

<Rate character="heart-outlined" :size="30" v-model:value="value" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate character="heart-outlined" :size="30" v-model:value="value" />
</template>
```

</details>

## 支持选中半星，自定义选中颜色

<Rate  color="#1677FF" :size="30" v-model:value="value" allow-half />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate  color="#1677FF" :size="30" v-model:value="value" allow-half />
</template>
```

</details>

## 使用中文文字: 好

<Rate
  character="好"
  :size="36"
  v-model:value="value"
  @change="onChange"
  @hover-change="onHoverChange" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (value: number) {
  console.log('change value:', value)
}
function onHoverChange (value: number) {
  console.log('hover value:', value)
}
</script>
<template>
  <Rate
    character="好"
    :size="36"
    v-model:value="value"
    @change="onChange"
    @hover-change="onHoverChange" />
</template>
```

</details>

## 使用英文字母: A

<Rate
  character="A"
  :size="48"
  v-model:value="value"
  @change="onChange"
  @hover-change="onHoverChange" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (value: number) {
  console.log('change value:', value)
}
function onHoverChange (value: number) {
  console.log('hover value:', value)
}
</script>
<template>
  <Rate
    character="A"
    :size="48"
    v-model:value="value"
    @change="onChange"
    @hover-change="onHoverChange" />
</template>
```

</details>

## APIs

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
name |  |  |

## Events

事件名称 | 说明 | 参数
-- | -- | --
change |  |
