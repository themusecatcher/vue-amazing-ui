# 通知提醒框 Notification

<br/>

*全局展示通知提醒信息*

## 何时使用

- 在系统四个角显示通知提醒信息
- 系统主动推送

<script setup lang="ts">
import { ref } from 'vue'

const notification = ref()
const placement = ref('')
function onOpen (info: string) {
  notification.value.open(info) // 默认使用
  placement.value = 'topRight'
}
function onInfo (info: string) {
  notification.value.info(info) // info调用
  placement.value = 'topRight'
}
function onSuccess (info: string) {
  notification.value.success(info) // success调用
  placement.value = 'topRight'
}
function onError (info: string) {
  notification.value.error(info) // error调用
  placement.value = 'topRight'
}
function onWarn (info: string) {
  notification.value.warn(info) // warn调用
  placement.value = 'topRight'
}
function onClose () { // 点击默认关闭按钮时触发的回调函数
  console.log('关闭notification')
}
function onTopLeft (info: string) {
  notification.value.info(info)
  placement.value = 'topLeft'
}
function onBottomRight (info: string) {
  notification.value.info(info)
  placement.value = 'bottomRight'
}
function onBottomLeft (info: string) {
  notification.value.info(info)
  placement.value = 'bottomLeft'
}
</script>

<Notification
  ref="notification"
  :placement="placement"
  @close="onClose" />

## 基本使用

<Button type="primary" @click="onOpen('This is a normal notification')">Open</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onOpen (info: string) {
  notification.value.open(info) // warn调用
}
function onClose () { // 点击默认关闭按钮时触发的回调函数
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
  notification.value.info(info) // warn调用
}
function onClose () { // 点击默认关闭按钮时触发的回调函数
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
  notification.value.success(info) // warn调用
}
function onClose () { // 点击默认关闭按钮时触发的回调函数
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
  notification.value.error(info) // warn调用
}
function onClose () { // 点击默认关闭按钮时触发的回调函数
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onError('This is a error notification')">Error</Button>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## warn

<Button type="primary" @click="onWarn('This is a warn notification')">Warn</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onWarn (info: string) {
  notification.value.warn(info) // warn调用
}
function onClose () { // 点击默认关闭按钮时触发的回调函数
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onWarn('This is a warn notification')">Warn</Button>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## 左上角弹出

<Button type="primary" @click="onTopLeft('This is a topLeft notification')">TopLeft</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onTopLeft (info: string) {
  notification.value.info(info)
  placement.value = 'topLeft'
}
function onClose () { // 点击默认关闭按钮时触发的回调函数
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onTopLeft('This is a topLeft notification')">TopLeft</Button>
  <Notification ref="notification" placement="topLeft" @close="onClose" />
</template>
```

:::

## 右下角弹出

<Button type="primary" @click="onBottomRight('This is a bottomRight notification')">BottomRight</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onBottomRight (info: string) {
  notification.value.info(info)
  placement.value = 'bottomRight'
}
function onClose () { // 点击默认关闭按钮时触发的回调函数
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onBottomRight('This is a bottomRight notification')">BottomRight</Button>
  <Notification ref="notification" placement="bottomRight" @close="onClose" />
</template>
```

:::

## 左下角弹出

<Button type="primary" @click="onBottomLeft('This is a bottomLeft notification')">BottomLeft</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onBottomLeft (info: string) {
  notification.value.info(info)
  placement.value = 'bottomLeft'
}
function onClose () { // 点击默认关闭按钮时触发的回调函数
  console.log('关闭notification')
}
</script>
<template>
  <Button type="primary" @click="onBottomLeft('This is a bottomLeft notification')">BottomLeft</Button>
  <Notification ref="notification" placement="bottomLeft" @close="onClose" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
title | 消息的标题 | string | '温馨提示' | false
duration | 自动关闭的延时时长，单位ms，默认`4500ms`；设置0时，不自动关闭 | number | 4500 | false
top | 消息从顶部弹出时，距离顶部的位置，单位px | number | 24 | false
bottom | 消息从底部弹出时，距离底部的位置，单位px | number | 24 | false
placement | 消息弹出位置：上左、上右、下左、下右 | 'topLeft' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottomRight' | 'topRight' | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
close | 关闭时的回调 | () => void
