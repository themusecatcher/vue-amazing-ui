# 对话框 Dialog

## 何时使用

- 在当前页面正中打开一个浮层，承载相应的操作或者展示内容

<script setup lang="ts">
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
const visible5 = ref(false)
const center = ref(true)
const footer = ref(false)
const loading = ref(false)
const title = ref('Dialog Title')
const content = ref('Content of the modal ...')
function showDialog () {
  visible1.value = true
}
function showCustomHeightDialog () {
  visible2.value = true
}
function showFooterDialog () {
  visible3.value = true
}
function showFixPositionDialog () {
  visible4.value = true
}
function showFullScreenDialog () {
  visible5.value = true
}
function onClose () { // 关闭回调
  visible1.value = false
  visible2.value = false
  visible3.value = false
  visible4.value = false
  visible5.value = false
}
function onCancel () { // “取消”按钮回调
  visible3.value = false
}
function onConfirm () { // “确定”,“知道了”按钮回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    visible3.value = false
    loading.value = false
  }, 500)
}
</script>

## 基本使用

<Button type="primary" @click="showDialog">默认对话框</Button>
<Dialog :visible="visible1" @close="onClose">
  <template #title>Title</template>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
function showDialog () {
  visible.value = true
}
function onClose () {
  visible.value = false
}
</script>
<template>
  <Button type="primary" @click="showDialog">默认对话框</Button>
  <Dialog :visible="visible" @close="onClose">
    <template #title>Title</template>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 内容高度自定义

<Button type="primary" @click="showCustomHeightDialog">内容高度自定义</Button>
<Dialog
  :height="360"
  @close="onClose"
  :visible="visible2">
  <template #title>Title</template>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
function showCustomHeightDialog (info: string) {
  visible.value = true
}
function onClose () {
  visible.value = false
}
</script>
<template>
  <Button type="primary" @click="showCustomHeightDialog">内容高度自定义</Button>
  <Dialog
    :height="360"
    @close="onClose"
    :visible="visible">
    <template #title>Title</template>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 有底部按钮

<Button type="primary" @click="showFooterDialog">有底部按钮</Button>
<Dialog
  footer
  @close="onClose"
  @cancel="onCancel"
  @ok="onConfirm"
  :loading="loading"
  :visible="visible3">
  <template #title>Title</template>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
const loading = ref(false)
function showFooterDialog () {
  visible.value = true
}
function onClose () {
  visible.value = false
}
function onCancel () { // “取消”按钮回调
  visible.value = false
}
function onConfirm () { // “确定”按钮回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    visible.value = false
    loading.value = false
  }, 500)
}
</script>
<template>
  <Button type="primary" @click="showFooterDialog">有底部按钮</Button>
  <Dialog
    footer
    @close="onClose"
    @cancel="onCancel"
    @ok="onConfirm"
    :loading="loading"
    :visible="visible">
    <template #title>Title</template>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 位置高度自定义

<Button type="primary" @click="showFixPositionDialog">位置高度自定义</Button>
<Dialog
  :center="false"
  :top="120"
  @close="onClose"
  :visible="visible4">
  <template #title>Title</template>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
function showFixPositionDialog () {
  visible.value = true
}
function onClose () {
  visible.value = false
}
</script>
<template>
  <Button type="primary" @click="showFixPositionDialog">位置高度自定义</Button>
  <Dialog
    :center="false"
    :top="120"
    @close="onClose"
    :visible="visible">
    <template #title>Title</template>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 允许切换全屏

<Button type="primary" @click="showFullScreenDialog">允许切换全屏</Button>
<Dialog
  switch-fullscreen
  @close="onClose"
  :visible="visible5">
  <template #title>Title</template>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
function showFullScreenDialog () {
  visible.value = true
}
function onClose () {
  visible.value = false
}
</script>
<template>
  <Button type="primary" @click="showFullScreenDialog">允许切换全屏</Button>
  <Dialog
    switch-fullscreen
    @close="onClose"
    :visible="visible">
    <template #title>Title</template>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
title | 标题 | string &#124; slot | '提示' | false
content | 内容 | string &#124; slot | '' | false
width | 宽度，单位px | number | 640 | false
height | 高度，默认 `auto`，自适应内容高度 | number &#124; string | 'auto' | false
switchFullscreen | 是否允许切换全屏，允许后右上角会出现一个按钮 | boolean | false | false
cancelText | 取消按钮文字 | string | '取消' | false
okText | 确定按钮文字 | string | '确定' | false
footer | 是否显示底部按钮，默认不显示 | boolean | false | false
center | `true`: 水平垂直居中；`false`: 固定高度水平居中 | boolean | true | false
top | 固定高度水平居中时，距顶部高度，单位px | number | 100 | false
loading | 加载中 | boolean | false | false
visible | 是否可见 | boolean | false | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
close | 点击遮罩层或右上角叉的回调 | () => void
cancel | 点击取消回调 | () => void
ok | 点击确定回调 | () => void
