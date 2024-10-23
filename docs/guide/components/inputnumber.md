# 数字输入框 InputNumber

<GlobalElement />

*通过鼠标或键盘，输入范围内的数值*

## 何时使用

- 当需要获取标准数值时

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { formatNumber } from 'vue-amazing-ui'
const value = ref(3)
const formatValue1 = ref(1000)
const formatValue2 = ref(100)
watchEffect(() => {
  console.log('value', value.value)
})
watchEffect(() => {
  console.log('formatValue1', formatValue1.value)
})
watchEffect(() => {
  console.log('formatValue2', formatValue2.value)
})
function formatter(value: number): string {
  return formatNumber(value, 2) + '%'
}
function parser(value: string): number {
  return Number(value.replace(/[,%]/g, ''))
}
function onChange(number: number) {
  console.log('change', number)
}
</script>

## 基本使用

::: tip `.lazy`
默认情况下，`v-model` 会在每次 `input` 事件后更新数据 (`IME` 拼字阶段的状态例外)。你可以添加 `lazy` 修饰符来改为在每次 `change` 事件后更新数据

```vue
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<InputNumber v-model:value.lazy="value" />
```

:::

<Space gap="small" vertical>
  <InputNumber
    :width="120"
    v-model:value="value"
    placeholder="Basic usage"
    @change="onChange"
  />
  <InputNumber
  :width="120"
    v-model:value.lazy="value"
    placeholder="Lazy usage"
    @change="onChange"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value', value.value)
})
function onChange (number: number) {
  console.log('change', number)
}
</script>
<template>
  <Space gap="small" vertical>
    <InputNumber
      :width="120"
      v-model:value="value"
      placeholder="Basic usage"
      @change="onChange"
    />
    <InputNumber
    :width="120"
      v-model:value.lazy="value"
      placeholder="Lazy usage"
      @change="onChange"
    />
  </Space>
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
  console.log('value', value.value)
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
  console.log('value', value.value)
})
</script>
<template>
  <InputNumber :step="0.3" :precision="2" v-model:value="value" />
</template>
```

:::

## 格式化展示

<Space>
  <InputNumber
    :width="120"
    v-model:value="formatValue1"
    :formatter="(value: string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
    :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
  />
  <InputNumber
    :width="120"
    v-model:value="formatValue2"
    :formatter="formatter"
    :parser="parser"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { formatNumber } from 'vue-amazing-ui'
const formatValue1 = ref(1000)
const formatValue2 = ref(100)
watchEffect(() => {
  console.log('formatValue1', formatValue1.value)
})
watchEffect(() => {
  console.log('formatValue2', formatValue2.value)
})
function formatter(value: number): string {
  return formatNumber(value, 2) + '%'
}
function parser(value: string): number {
  return Number(value.replace(/[,%]/g, ''))
}
</script>
<template>
  <Space>
    <InputNumber
      :width="120"
      v-model:value="formatValue1"
      :formatter="(value: string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
      :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
    />
    <InputNumber
      :width="120"
      v-model:value="formatValue2"
      :formatter="formatter"
      :parser="parser"
    />
  </Space>
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
  console.log('value', value.value)
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
  console.log('value', value.value)
})
</script>
<template>
  <InputNumber prefix="$" v-model:value="value" />
</template>
```

:::

## 禁用

<InputNumber v-model:value="value" disabled />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
</script>
<template>
  <InputNumber v-model:value="value" disabled />
</template>
```

:::

## APIs

### InputNumber

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
width | 数字输入框宽度，单位 `px` | string &#124; number | 90
min | 最小值 | number | -Infinity
max | 最大值 | number | Infinity
step | 每次改变步数，可以为小数 | number | 1
precision | 数值精度 | number | 0
prefix | 前缀图标 | string &#124; slot | undefined
formatter | 指定展示值的格式 | (value: number \| string) => string | undefined
parser | 指定从 `formatter` 里转换回数字的方式，和 `formatter` 搭配使用 | (value: string) => number | undefined
keyboard | 是否启用键盘快捷键行为（上方向键增，下方向键减） | boolean | true
disabled | 是否禁用 | boolean | false
placeholder | 数字输入的占位符 | string | undefined
value <Tag color="cyan">v-model</Tag> | 当前值 | number | undefined

## Events

名称 | 说明 | 类型
-- | -- | --
change | 变化回调 | (value: number) => void
