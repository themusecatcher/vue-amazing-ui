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

::: details Show Code

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

:::

## 禁用

<Rate v-model:value="value" disabled />

::: details Show Code

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

:::

## 空心星型

<Rate character="star-outlined" :size="30" v-model:value="value" />

::: details Show Code

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

:::

## 实心心型

<Rate character="heart-filled" :size="30" v-model:value="value" />

::: details Show Code

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

:::

## 空心心型

<Rate character="heart-outlined" :size="30" v-model:value="value" />

::: details Show Code

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

:::

## 支持选中半星

<Rate v-model:value="value" :size="30" allow-half />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate v-model:value="value" allow-half />
</template>
```

:::

## 使用中文文字: 好

<Rate
  character="好"
  :size="36"
  v-model:value="value"
  @change="onChange"
  @hover-change="onHoverChange" />

::: details Show Code

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

:::

## 使用英文字母: A

<Rate
  character="A"
  :size="48"
  v-model:value="value"
  @change="onChange"
  @hover-change="onHoverChange" />

::: details Show Code

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

:::

## 自定义选中颜色

<Rate color="#1677FF" :size="30" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate color="#1677FF" :size="30" v-model:value="value" />
</template>
```

:::

## 自定义间距

<Rate :size="30" :gap="16" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate :size="30" :gap="16" v-model:value="value" />
</template>
```

:::

## 自定义 star 总数

<Rate :size="30" :count="10" v-model:value="value" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
<template>
  <Rate :size="30" :count="10" v-model:value="value" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
allowClear | 是否允许再次点击后清除 | boolean | true | false
allowHalf | 是否允许半选 | boolean | false | false
count | `star` 总数 | number | 5 | false
character | 自定义字符，预置 `'star-outlined'` `'star-filled'` `'heart-outlined'` `'heart-filled'` 四种svg图标 | string &#124; slot | 'star-filled' | false
size | 字符时是字体高度，图标时是图片大小 | number | 20 | false
color | 字符选中颜色 | string | '#fadb14' | false
gap | 字符间距，单位px | number | 8 | false
disabled | 只读，无法进行交互 | boolean | false | false
value <Tag color="cyan">v-model</Tag> | 当前数，受控值 `1,2,3...` | number | 0 | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 选择时的回调 | (value: number) => void
hoverChange | 鼠标经过时数值变化的回调 | (value: number) => void
