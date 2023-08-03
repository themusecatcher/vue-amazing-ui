# 步骤条 Steps

<br/>

*引导用户按照流程完成任务的导航条*

## 何时使用

- 当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const steps = ref([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  }
])
const current = ref(2)
watchEffect(() => {
  console.log('current:', current.value)
})

function onChange (index: number) { // 父组件获取切换后的选中步骤
  console.log('current:', index)
}
function onPrevious () {
  if (current.value > 1) {
    current.value--
  }
}
function onNext () {
  if (steps.value.length >= current.value) {
    current.value++
  }
}
</script>

## 基本使用

<Steps :steps="steps" :current="current" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const steps = ref([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  }
])
const current = ref(2)
</script>
<template>
  <Steps :steps="steps" :current="current" />
</template>
```

:::

## 可点击

*设置 v-model: current 后即可点击*

<br/>
<Steps :steps="steps" v-model:current="current" @change="onChange" />
<br/>
<Space>
  <Button @click="onPrevious()" class="mt30 mr30">Previous</Button>
  <Button @click="onNext()">Next</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const steps = ref([
  {
    title: 'Step 1',
    description: 'description 1'
  },
  {
    title: 'Step 2',
    description: 'description 2'
  },
  {
    title: 'Step 3',
    description: 'description 3'
  }
])
const current = ref(2)
watchEffect(() => {
  console.log('current:', current.value)
})
function onChange (index: number) { // 父组件获取切换后的选中步骤
  console.log('current:', index)
}
function onPrevious () {
  if (current.value > 1) {
    current.value--
  }
}
function onNext () {
  if (steps.value.length >= current.value) {
    current.value++
  }
}
</script>
<template>
  <Steps :steps="steps" v-model:current="current" @change="onChange" />
  <br/>
  <Space>
    <Button @click="onPrevious()" class="mt30 mr30">Previous</Button>
    <Button @click="onNext()">Next</Button>
  </Space>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
steps | 步骤数组 | Step[] | [] | true
current(v-model) | 当前选中的步骤，设置 `v-model` 后，`Steps` 变为可点击状态。从 `1` 开始计数 | number | 1 | false
width | 步骤条总宽度，单位px | number &#124; string | '100%' | false
descMaxWidth | 描述文本最大宽度，单位px | number | 120 | false

## Step Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
title | 标题 | string | false
description | 描述 | string | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 点击切换步骤时触发 | (index: number) => void
