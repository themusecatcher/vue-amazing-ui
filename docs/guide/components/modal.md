# 信息提示 Modal

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" :z-index="30" />

<br/>

*模态对话框*

## 何时使用

- 在当前页面正中打开一个浮层，承载相应的操作或者提示内容

<br/>

::: tip 使用

- modal.value.info(content: string) // info 调用
- modal.value.success(content: string) // success 调用
- modal.value.error(content: string) // error 调用
- modal.value.warning(content: string) // warning 调用
- modal.value.confirm(content: string) // confirm 调用
- modal.value.erase(content: string) // erase 调用

:::

<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const center = ref(true)
const loading = ref(false)
const show = ref(false)

function showInfoModal() {
  modal.value.info({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
  center.value = true
}
function showSuccessModal() {
  modal.value.success({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
  center.value = true
}
function showErrorModal() {
  modal.value.error({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
  center.value = true
}
function showWarningModal() {
  modal.value.warning({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
  center.value = true
}
function showConfirmModal() {
  modal.value.confirm({
    title: 'Do you Want to submit these items ?',
    content: 'Some descriptions ...'
  })
  center.value = true
}
function showEraseModal() {
  modal.value.erase({
    title: 'Do you Want to delete these items ?',
    content: 'Some descriptions ...'
  })
  center.value = true
}
function showFixModal() {
  modal.value.info({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
  center.value = false
}
function onCancel() {
  // 点击遮罩层或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // “确定”按钮回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    show.value = false
    loading.value = false
  }, 2000)
}
function onKnow() {
  // “我知道了”按钮回调
  console.log('know')
}
</script>

<Modal
  ref="modal"
  v-model:show="show"
  :width="420"
  cancelText="取消"
  okText="确认"
  noticeText="知道了"
  :center="center"
  :top="120"
  :loading="loading"
  @cancel="onCancel"
  @ok="onOk"
  @know="onKnow"
/>

## Info Modal

<Button type="primary" @click="showInfoModal">Info Modal</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const show = ref(false)
function showInfoModal() {
  modal.value.info({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
}
function onKnow () { // “我知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Button type="primary" @click="showInfoModal">Info Modal</Button>
  <Modal
    ref="modal"
    v-model:show="show"
    @know="onKnow" />
</template>
```

:::

## Success Modal

<Button type="primary" @click="showSuccessModal">Success Modal</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const show = ref(false)
function showSuccessModal() {
  modal.value.success({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
}
function onKnow () { // “我知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Button type="primary" @click="showSuccessModal">Success Modal</Button>
  <Modal
    ref="modal"
    v-model:show="show"
    @know="onKnow" />
</template>
```

:::

## Error Modal

<Button type="primary" @click="showErrorModal">Error Modal</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const show = ref(false)
function showErrorModal() {
  modal.value.error({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
}
function onKnow () { // “我知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Button type="primary" @click="showErrorModal">Error Modal</Button>
  <Modal
    ref="modal"
    v-model:show="show"
    @know="onKnow" />
</template>
```

:::

## Warning Modal

<Button type="primary" @click="showWarningModal">Warning Modal</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const show = ref(false)
function showWarningModal() {
  modal.value.warning({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
}
function onKnow () { // “我知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Button type="primary" @click="showWarningModal">Warning Modal</Button>
  <Modal
    ref="modal"
    v-model:show="show"
    @know="onKnow" />
</template>
```

:::

## Confirm Modal

<Button type="primary" @click="showConfirmModal">Confirm Modal</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const show = ref(false)
function showConfirmModal() {
  modal.value.confirm({
    title: 'Do you Want to submit these items ?',
    content: 'Some descriptions ...'
  })
}
function onKnow () { // “我知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Button type="primary" @click="showConfirmModal">Confirm Modal</Button>
  <Modal
    ref="modal"
    v-model:show="show"
    @know="onKnow" />
</template>
```

:::

## Erase Modal

<Button type="primary" @click="showEraseModal">Erase Modal</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const loading = ref(false)
const show = ref(false)
function showEraseModal() {
  modal.value.erase({
    title: 'Do you Want to delete these items ?',
    content: 'Some descriptions ...'
  })
}
function onCancel() {
  // 点击遮罩层或取消按钮的回调
  console.log('cancel')
}
function onOk() {
  // “确定”按钮回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    show.value = false
    loading.value = false
  }, 2000)
}
</script>
<template>
  <Button type="primary" @click="showEraseModal">Erase Modal</Button>
  <Modal
    ref="modal"
    v-model:show="show"
    :loading="loading"
    @cancel="onCancel"
    @ok="onOk" />
</template>
```

:::

## Height Fixed Modal

<Button type="primary" @click="showFixModal">Height Fixed Modal</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const show = ref(false)
function showFixModal() {
  modal.value.info({
    title: 'Do you See these items ?',
    content: 'Some descriptions ...'
  })
}
function onKnow () { // “我知道了”按钮回调
  console.log('know')
}
</script>
<template>
  <Button type="primary" @click="showFixModal">Height Fixed Modal</Button>
  <Modal
    ref="modal"
    v-model:show="show"
    :center="false"
    :top="120"
    @know="onKnow" />
</template>
```

:::

## APIs

### Modal

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
width | 提示框宽度，单位`px` | number | 420 | false
cancelText | 取消按钮文字 | string | '取消' | false
okText | 确认按钮文字 | string | '确定' | false
noticeText | 通知按钮文字 | string | '知道了' | false
center | `true`: 水平垂直居中；`false`: 固定高度水平居中 | boolean | true | false
top | 固定高度水平居中时，距顶部高度，仅当 `center: false` 时生效，单位`px` | number | 100 | false
loading | 确定按钮 `loading` | boolean | false | false
show | 提示框是否可见 | boolean | false | false

## Events

名称 | 说明 | 类型
-- | -- | --
cancel | 点击遮罩层或取消按钮的回调 | () => void
ok | 点击确定回调 | () => void
know | 点击知道了的回调 | () => void
