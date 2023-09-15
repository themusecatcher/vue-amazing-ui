# 通知提醒 Notification<BackTop />

<br/>

*全局展示通知提醒信息*

## 何时使用

- 在系统四个角显示通知提醒信息
- 系统主动推送

<br/>

::: tip 使用

- notification.value.open(notification: Notification) // 默认使用
- notification.value.info(notification: Notification) // info调用
- notification.value.success(notification: Notification) // success调用
- notification.value.error(notification: Notification) // error调用
- notification.value.warning(notification: Notification) // warning调用

:::

<script setup lang="ts">
import { ref } from 'vue'

const notification = ref()

function onOpen (info: string) {
  notification.value.open({
    message: 'Notification Title',
    description: info
  }) // 默认使用
}
function onInfo (info: string) {
  notification.value.info({
    message: 'Notification Title',
    description: info
  }) // info调用
}
function onSuccess (info: string) {
  notification.value.success({
    message: 'Notification Title',
    description: info
  }) // success调用
}
function onWarning (info: string) {
  notification.value.warning({
    message: 'Notification Title',
    description: info
  }) // warning调用
}
function onError (info: string) {
  notification.value.error({
    message: 'Notification Title',
    description: info
  }) // error调用
}
function onOpenPlacement (place: string) {
  notification.value.info({
    message: 'Notification Title',
    description: 'This is the content of the notification.',
    placement: place
  })
}
function onClose () { // 点击默认关闭按钮时触发的回调函数
  console.log('关闭notification')
}
</script>

<Notification ref="notification" @close="onClose" />

## 基本使用

<Button type="primary" @click="onOpen('This is a normal notification')">Open</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onOpen (info: string) {
  notification.value.open({
    message: 'Notification Title',
    description: info
  }) // 默认使用
}
function onClose () {
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onOpen('This is a normal notification')">Open</Button>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## info

<Button type="primary" @click="onInfo('This is a normal notification')">Info</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onInfo (info: string) {
  notification.value.info({
    message: 'Notification Title',
    description: info
  }) // info调用
}
function onClose () {
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onInfo('This is a normal notification')">Info</Button>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## success

<Button type="primary" @click="onSuccess('This is a success notification')">Success</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onSuccess (info: string) {
  notification.value.success({
    message: 'Notification Title',
    description: info
  }) // success调用
}
function onClose () {
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onSuccess('This is a success notification')">Success</Button>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## error

<Button type="primary" @click="onError('This is a error notification')">Error</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onError (info: string) {
  notification.value.error({
    message: 'Notification Title',
    description: info
  }) // error调用
}
function onClose () {
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onError('This is a error notification')">Error</Button>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## warning

<Button type="primary" @click="onWarning('This is a warning notification')">Warning</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onWarning (info: string) {
  notification.value.warning({
    message: 'Notification Title',
    description: info
  }) // warning调用
}
function onClose () {
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onWarning('This is a warning notification')">Warning</Button>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## 左上角弹出

<Button type="primary" @click="onOpenPlacement('topLeft')">topLeft</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onOpenPlacement (place: string) {
  notification.value.info({
    message: 'Notification Title',
    description: 'This is the content of the notification.',
    placement: place
  })
}
function onClose () {
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onOpenPlacement('topLeft')">topLeft</Button>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## 右下角弹出

<Button type="primary" @click="onOpenPlacement('bottomRight')">bottomRight</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onOpenPlacement (place: string) {
  notification.value.info({
    message: 'Notification Title',
    description: 'This is the content of the notification.',
    placement: place
  })
}
function onClose () {
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onOpenPlacement('bottomRight')">bottomRight</Button>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## 左下角弹出

<Button type="primary" @click="onOpenPlacement('bottomLeft')">bottomLeft</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onOpenPlacement (place: string) {
  notification.value.info({
    message: 'Notification Title',
    description: 'This is the content of the notification.',
    placement: place
  })
}
function onClose () {
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onOpenPlacement('bottomLeft')">bottomLeft</Button>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
message | 全局通知提醒标题，优先级低于 `Notification` 中的 `message` | string | '温馨提示' | false
duration | 自动关闭的延时时长，单位ms，默认 `4500ms`；设置 `null` 时，不自动关闭 | number &#124; null | 4500 | false
top | 消息从顶部弹出时，距离顶部的位置，单位px | number | 24 | false
bottom | 消息从底部弹出时，距离底部的位置，单位px | number | 24 | false
placement | 消息弹出位置，优先级低于 `Notification` 中的 `placement` | 'topLeft' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottomRight' | 'topRight' | false

## Notification Type

*调用时传入的 Notification 参数*

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
message | 通知提醒标题 | string | false
description | 通知提醒内容 | string | true
mode | 通知提醒类型 | 'open' &#124; 'info' &#124; 'success' &#124; 'warning' &#124; 'error' | false
placement | 通知提醒弹出位置 | 'topLeft' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottomRight' | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
close | 关闭时的回调 | () => void
