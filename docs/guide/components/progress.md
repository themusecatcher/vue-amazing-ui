# 进度条 Progress

<br/>

*展示操作的当前进度*

## 何时使用

- 当需要显示当前进度和状态时
- 当需要显示一个操作完成的百分比时

<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(60)
function onIncrease (scale: number) {
  const res = percent.value + scale
  if (res > 100) {
    percent.value = 100
  } else {
    percent.value = res
  }
}
function onDecline (scale: number) {
  const res = percent.value - scale
  if (res < 0) {
    percent.value = 0
  } else {
    percent.value = res
  }
}
</script>

## 基本使用

<Progress :percent="percent" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(60)
</script>
<template>
  <Progress :percent="percent" />
</template>
```

:::

## 完成进度条

<Progress width="100%" :percent="100" />

::: details Show Code

```vue
<template>
  <Progress width="100%" :percent="100" />
</template>
```

:::

## 渐变进度条

*strokeColor: { '0%': '#108ee9', '100%': '#87d068', direction: 'right' } 或 { from: '#108ee9', to: '#87d068', direction: 'right' }*

<br/>

<Progress
  :percent="percent"
  :strokeColor="{
    '0%': '#108ee9',
    '100%': '#87d068',
    direction: 'right'
  }" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(60)
</script>
<template>
  <Progress
  :percent="percent"
  :strokeColor="{
    '0%': '#108ee9',
    '100%': '#87d068',
    direction: 'right'
  }" />
</template>
```

:::

## 进度圈

<Space align="center" :size="30">
  <Progress
    :width="120"
    :percent="percent"
    type="circle" />
  <Button @click="onDecline(5)" size="large">Decline-</Button>
  <Button @click="onIncrease(5)" size="large">Increase+</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const percent = ref(60)
function onIncrease (scale: number) {
  const res = percent.value + scale
  if (res > 100) {
    percent.value = 100
  } else {
    percent.value = res
  }
}
function onDecline (scale: number) {
  const res = percent.value - scale
  if (res < 0) {
    percent.value = 0
  } else {
    percent.value = res
  }
}
</script>
<template>
  <Space align="center" :size="30">
    <Progress
      :width="120"
      :percent="percent"
      type="circle" />
    <Button @click="onDecline(5)" size="large">Decline-</Button>
    <Button @click="onIncrease(5)" size="large">Increase+</Button>
  </Space>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
width | 进度条总宽度 | number &#124; string | '100%' | false
percent | 当前进度百分比 | number | 0 | false
strokeColor | 进度条的色彩，传入 `string` 时为纯色，传入 `Gradient` 时为渐变 | string &#124; Gradient | '#1677FF' | false
strokeWidth | 进度条线的宽度，单位px | number | 8 | false
showInfo | 是否显示进度数值或状态图标 | boolean | true | false
type | 进度条类型 | 'line' &#124; 'circle' | 'line' | false

## Gradient Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
'0%' | 起始值 | string | false
'100%' | 终点值 | string | false
from | 起始值 | string | false
to | 终点值 | string | false
direction | 渐变方向 | 'right' &#124; 'left' | false
