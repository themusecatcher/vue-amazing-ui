# 信息提示 Modal

<br/>

*模态对话框*

## 何时使用

- 在当前页面正中打开一个浮层，承载相应的操作或者提示内容

<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const center = ref(true)
const loading = ref(false)
const visible = ref(false)
function showConfirmModal (content: string) {
  modal.value.confirm({
    title: 'Do you Want to submit these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function showEraseModal (content: string) {
  modal.value.erase({
    title: 'Do you Want to delete these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function showInfoModal (content: string) {
  modal.value.info({
    title: 'Do you See these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function showSuccessModal (content: string) {
  modal.value.success({
    title: 'Do you See these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function showErrorModal (content: string) {
  modal.value.error({
    title: 'Do you See these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function showWarnModal (content: string) {
  modal.value.warn({
    title: 'Do you See these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function showFixModal (content: string) {
  modal.value.info({
    title: 'Do you See these items ?',
    content: content
  })
  center.value = false
  visible.value = true
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
function onKnow () { // “我知道了”按钮回调
  visible.value = false
}
</script>

<Modal
  ref="modal"
  :top="120"
  :center="center"
  :loading="loading"
  :visible="visible"
  @cancel="onCancel"
  @ok="onConfirm"
  @know="onKnow" />

## confirm

<Button type="primary" @click="showConfirmModal('Some descriptions ...')">Confirm</Button>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const loading = ref(false)
const visible = ref(false)
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
  <Button type="primary" @click="showConfirmModal('Some descriptions ...')">Confirm</Button>
  <Modal
    ref="modal"
    :loading="loading"
    :visible="visible"
    @cancel="onCancel"
    @ok="onConfirm" />
</template>
```

</details>

## erase

<Button type="primary" @click="showEraseModal('Some descriptions ...')">Erase</Button>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const loading = ref(false)
const visible = ref(false)
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
  <Button type="primary" @click="showEraseModal('Some descriptions ...')">Erase</Button>
  <Modal
    ref="modal"
    :loading="loading"
    :visible="visible"
    @cancel="onCancel"
    @ok="onConfirm" />
</template>
```

</details>

## info

<Button type="primary" @click="showInfoModal('Some descriptions ...')">Info</Button>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const visible = ref(false)
function onKnow () { // “我知道了”按钮回调
  visible.value = false
}
</script>
<template>
  <Button type="primary" @click="showInfoModal('Some descriptions ...')">Info</Button>
  <Modal
    ref="modal"
    :visible="visible"
    @know="onKnow" />
</template>
```

</details>

## Success

<Button type="primary" @click="showSuccessModal('Some descriptions ...')">Success</Button>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const visible = ref(false)
function onKnow () { // “我知道了”按钮回调
  visible.value = false
}
</script>
<template>
  <Button type="primary" @click="showSuccessModal('Some descriptions ...')">Success</Button>
  <Modal
    ref="modal"
    :visible="visible"
    @know="onKnow" />
</template>
```

</details>

## error

<Button type="primary" @click="showErrorModal('Some descriptions ...')">Error</Button>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const visible = ref(false)
function onKnow () { // “我知道了”按钮回调
  visible.value = false
}
</script>
<template>
  <Button type="primary" @click="showErrorModal('Some descriptions ...')">Error</Button>
  <Modal
    ref="modal"
    :visible="visible"
    @know="onKnow" />
</template>
```

</details>

## warn

<Button type="primary" @click="showWarnModal('Some descriptions ...')">Warn</Button>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const visible = ref(false)
function onKnow () { // “我知道了”按钮回调
  visible.value = false
}
</script>
<template>
  <Button type="primary" @click="showWarnModal('Some descriptions ...')">Warn</Button>
  <Modal
    ref="modal"
    :visible="visible"
    @know="onKnow" />
</template>
```

</details>

## 高度固定

<Button type="primary" @click="showFixModal('Some descriptions ...')">高度固定</Button>

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const visible = ref(false)
function onKnow () { // “我知道了”按钮回调
  visible.value = false
}
</script>
<template>
  <Button type="primary" @click="showFixModal('Some descriptions ...')">高度固定</Button>
  <Modal
    ref="modal"
    :center="false"
    :top="120"
    :visible="visible"
    @know="onKnow" />
</template>
```

</details>