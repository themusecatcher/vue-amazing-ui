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
function showWarningModal (content: string) {
  modal.value.warning({
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

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const loading = ref(false)
const visible = ref(false)
function showConfirmModal (content: string) {
  modal.value.confirm({
    title: 'Do you Want to submit these items ?',
    content: content
  })
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

:::

## erase

<Button type="primary" @click="showEraseModal('Some descriptions ...')">Erase</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const loading = ref(false)
const visible = ref(false)
function showEraseModal (content: string) {
  modal.value.erase({
    title: 'Do you Want to delete these items ?',
    content: content
  })
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

:::

## info

<Button type="primary" @click="showInfoModal('Some descriptions ...')">Info</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const visible = ref(false)
function showInfoModal (content: string) {
  modal.value.info({
    title: 'Do you See these items ?',
    content: content
  })
  visible.value = true
}
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

:::

## success

<Button type="primary" @click="showSuccessModal('Some descriptions ...')">Success</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const visible = ref(false)
function showSuccessModal (content: string) {
  modal.value.success({
    title: 'Do you See these items ?',
    content: content
  })
  visible.value = true
}
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

:::

## error

<Button type="primary" @click="showErrorModal('Some descriptions ...')">Error</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const visible = ref(false)
function showErrorModal (content: string) {
  modal.value.error({
    title: 'Do you See these items ?',
    content: content
  })
  visible.value = true
}
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

:::

## warning

<Button type="primary" @click="showWarningModal('Some descriptions ...')">Warning</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const visible = ref(false)
function showWarningModal (content: string) {
  modal.value.warning({
    title: 'Do you See these items ?',
    content: content
  })
  center.value = true
  visible.value = true
}
function onKnow () { // “我知道了”按钮回调
  visible.value = false
}
</script>
<template>
  <Button type="primary" @click="showWarningModal('Some descriptions ...')">Warning</Button>
  <Modal
    ref="modal"
    :visible="visible"
    @know="onKnow" />
</template>
```

:::

## 高度固定

<Button type="primary" @click="showFixModal('Some descriptions ...')">高度固定</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const visible = ref(false)
function showFixModal (content: string) {
  modal.value.info({
    title: 'Do you See these items ?',
    content: content
  })
  visible.value = true
}
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

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
width | 提示框宽度，单位px | number | 420 | false
cancelText | 取消按钮文字 | string | '取消' | false
okText | 确认按钮文字 | string | '确定' | false
noticeText | 通知按钮文字 | string | '知道了' | false
center | `true`: 水平垂直居中；`false`: 固定高度水平居中 | boolean | true | false
top | 固定高度水平居中时，距顶部高度，单位px | number | 100 | false
loading | 加载中 | boolean | false | false
visible | 是否可见 | boolean | false | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
cancel | 点击遮罩层或取消按钮的回调 | () => void
ok | 点击确定回调 | () => void
know | 点击知道了的回调 | () => void
