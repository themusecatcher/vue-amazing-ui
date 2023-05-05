# 对话框 Dialog

## 何时使用

- 在当前页面正中打开一个浮层，承载相应的操作

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

<details>
<summary>查看代码</summary>

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

</details>

## 弹窗高度自定义的对话框

<Button type="primary" @click="showCustomHeightDialog">弹窗高度自定义的对话框</Button>
<Dialog
  :height="360"
  @close="onClose"
  :visible="visible2">
  <template #title>Title</template>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

<details>
<summary>查看代码</summary>

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
  <Button type="primary" @click="showCustomHeightDialog">弹窗高度自定义的对话框</Button>
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

</details>

## 有底部按钮的对话框

<Button type="primary" @click="showFooterDialog">有底部按钮的对话框</Button>
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

<details>
<summary>查看代码</summary>

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
  <Button type="primary" @click="showFooterDialog">有底部按钮的对话框</Button>
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

</details>

## 弹窗位置固定高度的对话框

<Button type="primary" @click="showFixPositionDialog">弹窗位置固定高度的对话框</Button>
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

<details>
<summary>查看代码</summary>

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
  <Button type="primary" @click="showFixPositionDialog">弹窗位置固定高度的对话框</Button>
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

</details>

## 允许切换全屏的对话框

<Button type="primary" @click="showFullScreenDialog">允许切换全屏的对话框</Button>
<Dialog
  switchFullscreen
  @close="onClose"
  :visible="visible5">
  <template #title>Title</template>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

<details>
<summary>查看代码</summary>

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
  <Button type="primary" @click="showFullScreenDialog">允许切换全屏的对话框</Button>
  <Dialog
    switchFullscreen
    @close="onClose"
    :visible="visible">
    <template #title>Title</template>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

</details>
