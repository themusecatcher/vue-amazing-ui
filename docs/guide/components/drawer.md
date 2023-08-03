# 抽屉 Drawer

<br/>

*屏幕边缘滑出的浮层面板*

## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象

<script lang="ts" setup>
import { ref } from 'vue'

const open1 = ref(false)
const open2 = ref(false)
const open3 = ref(false)
const open4 = ref(false)
const options = ref([
    {
      label: 'top',
      value: 'top'
    },
    {
      label: 'right',
      value: 'right'
    },
    {
      label: 'bottom',
      value: 'bottom'
    },
    {
      label: 'left',
      value: 'left'
    }
  ])
const placement = ref('right')
const showDrawer1 = () => {
  open1.value = true
}
const showDrawer2 = () => {
  open2.value = true
}
const showDrawer3 = () => {
  open3.value = true
}
const showDrawer4 = () => {
  open4.value = true
}
const onClose = () => {
  open3.value = false
  console.log('close')
}
</script>

## 基本使用

<Button type="primary" @click="showDrawer1">Open</Button>
<Drawer v-model:open="open1" title="Basic Drawer">
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const open1 = ref(false)
const placement = ref('right')
const showDrawer1 = () => {
  open1.value = true
}
</script>
<template>
  <Button type="primary" @click="showDrawer1">Open</Button>
  <Drawer v-model:open="open1" title="Basic Drawer">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

:::

## 额外操作

<Button type="primary" @click="showDrawer2">Open</Button>
<Drawer
  :width="480"
  title="Basic Drawer"
  v-model:open="open2"
  @close="onClose">
  <template #extra>
    <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
    <Button type="primary" @click="onClose">Submit</Button>
  </template>
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const open2 = ref(false)
const showDrawer2 = () => {
  open2.value = true
}
const onClose = () => {
  console.log('close')
}
</script>
<template>
  <Drawer
    :width="480"
    title="Basic Drawer"
    v-model:open="open2"
    @close="onClose">
    <template #extra>
      <Button style="margin-right: 8px" @click="onClose">Cancel</Button>
      <Button type="primary" @click="onClose">Submit</Button>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

:::

## 自定义位置

<Space align="center" :size="20">
  <Radio v-model:value="placement" :options="options">
  </Radio>
  <Button type="primary" @click="showDrawer3">Open</Button>
</Space>
<Drawer
  title="Basic Drawer"
  :placement="placement"
  :open="open3"
  @close="onClose">
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const open3 = ref(false)
const options = ref([
    {
      label: 'top',
      value: 'top'
    },
    {
      label: 'right',
      value: 'right'
    },
    {
      label: 'bottom',
      value: 'bottom'
    },
    {
      label: 'left',
      value: 'left'
    }
  ])
const placement = ref('right')
const showDrawer3 = () => {
  open3.value = true
}
const onClose = () => {
  open3.value = false
  console.log('close')
}
</script>
<template>
  <Space align="center" :size="20">
    <Radio v-model:value="placement" :options="options">
    </Radio>
    <Button type="primary" @click="showDrawer3">Open</Button>
  </Space>
  <Drawer
    title="Basic Drawer"
    :placement="placement"
    :open="open3"
    @close="onClose">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

:::

## 关闭时销毁子元素

<Button type="primary" @click="showDrawer4">Open</Button>
<Drawer
  destroyOnClose
  title="Basic Drawer"
  v-model:open="open4">
  <p>Some contents...</p>
  <p>Some contents...</p>
  <p>Some contents...</p>
</Drawer>

::: details Show Code

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const open4 = ref(false)
const showDrawer4 = () => {
  open4.value = true
}
</script>
<template>
  <Button type="primary" @click="showDrawer4">Open</Button>
  <Drawer
    destroyOnClose
    title="Basic Drawer"
    v-model:open="open4">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>
```

:::

<style>
p {
  color: rgba(0, 0, 0, .88);
}
</style>

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
title | 标题 | string &#124; slot | '' | false
width | 宽度，在 `placement` 为 `right` 或 `left` 时使用 | string &#124; number | 378 | false
height | 高度，在 `placement` 为 `top` 或 `bottom` 时使用 | string &#124; number | 378 | false
closable | 是否显示左上角的关闭按钮 | boolean | true | false
destroyOnClose | 关闭时是否销毁 `Drawer` 里的子元素 | boolean | false | false
extra | 抽屉右上角的操作区域 | string &#124; slot | '' | false
placement | 抽屉的方向 | 'top' &#124; 'right' &#124; 'bottom' &#124; 'left' | 'right' | false
zIndex | 设置 `Drawer` 的 `z-index` | number | 1000 | false
open(v-model) | 抽屉是否可见 | boolean | false | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
close | 点击遮罩层或左上角叉或取消按钮的回调 | (e: Event) => void
