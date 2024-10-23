# 通知提醒 Notification

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="✨ 成为赞助者 !"
  :tooltip-props="{
    tooltipStyle: {
      fontWeight: 500
    }
  }"
  href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
  target="_blank"
>
  <template #description>
    <span style="font-size: 14px; font-weight: 600;">赞助</span>
  </template>
</FloatButton>
<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*全局展示通知提醒信息*

## 何时使用

- 在系统四个角显示通知提醒信息
- 系统主动推送

::: tip 使用

- notification.value.open(data: [Notification](#notification-type)) // open 调用
- notification.value.info(data: [Notification](#notification-type)) // info 调用
- notification.value.success(data: [Notification](#notification-type)) // success 调用
- notification.value.error(data: [Notification](#notification-type)) // error 调用
- notification.value.warning(data: [Notification](#notification-type)) // warning 调用

:::

<script setup lang="ts">
import { ref, h } from 'vue'
import { CloudFilled, FireFilled } from '@ant-design/icons-vue'

const notification = ref()
function onOpen(description: string) {
  notification.value.open({
    title: 'Notification Title',
    description
  }) // open 调用
}
function onInfo(description: string) {
  notification.value.info({
    title: 'Notification Title',
    description
  }) // info 调用
}
function onSuccess(description: string) {
  notification.value.success({
    title: 'Notification Title',
    description
  }) // success 调用
}
function onWarning(description: string) {
  notification.value.warning({
    title: 'Notification Title',
    description
  }) // warning 调用
}
function onError(description: string) {
  notification.value.error({
    title: 'Notification Title',
    description
  }) // error 调用
}
function onInfoCustom(description: string) {
  notification.value.info({
    title: 'Notification Title',
    icon: h(CloudFilled),
    description
  })
}
function onOpenCustom(description: string) {
  notification.value.open({
    title: 'Notification Title',
    icon: h(FireFilled, { style: 'color: gold' }),
    description
  })
}
function onClassCustom(description: string) {
  notification.value.open({
    title: 'Notification Title',
    description,
    icon: h(FireFilled),
    class: 'custom-class'
  })
}
function onStyleCustom(description: string) {
  notification.value.open({
    title: 'Notification Title',
    description,
    icon: h(CloudFilled),
    style: {
      width: '500px',
      color: '#ff6900'
    }
  })
}
function onOpenPlacement(placement: string) {
  notification.value.info({
    title: 'Notification Title',
    description: 'This is the content of the notification.',
    placement
  })
}
function onCustomClose() {
  notification.value.info({
    title: 'Notification Title',
    description: 'The notification will automatically turn off after 3 seconds.',
    duration: 3000,
    onClose: () => {
      console.log('custom notification closed')
    }
  })
}
function onNeverAutoClose() {
  notification.value.info({
    title: 'Notification Title',
    description: 'This notification will not automatically turn off.',
    duration: null
  })
}
function onClose() {
  // 通知提醒关闭时的回调函数
  console.log('notification closed')
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
function onOpen(description: string) {
  notification.value.open({
    title: 'Notification Title',
    description
  }) // open 调用
}
function onClose() {
  // 通知提醒关闭时的回调函数
  console.log('notification closed')
}
</script>
<template>
  <Button type="primary" @click="onOpen('This is a normal notification')">Open</Button>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## 不同类型的通知提醒

<Space>
  <Button type="primary" @click="onInfo('This is a normal notification')">Info</Button>
  <Button type="primary" @click="onSuccess('This is a success notification')">Success</Button>
  <Button type="primary" @click="onWarning('This is a warning notification')">Warning</Button>
  <Button type="primary" @click="onError('This is a error notification')">Error</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onInfo(description: string) {
  notification.value.info({
    title: 'Notification Title',
    description
  }) // info 调用
}
function onSuccess(description: string) {
  notification.value.success({
    title: 'Notification Title',
    description
  }) // success 调用
}
function onWarning(description: string) {
  notification.value.warning({
    title: 'Notification Title',
    description
  }) // warning 调用
}
function onError(description: string) {
  notification.value.error({
    title: 'Notification Title',
    description
  }) // error 调用
}
function onClose() {
  // 通知提醒关闭时的回调函数
  console.log('notification closed')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onInfo('This is a normal notification')">Info</Button>
    <Button type="primary" @click="onSuccess('This is a success notification')">Success</Button>
    <Button type="primary" @click="onWarning('This is a warning notification')">Warning</Button>
    <Button type="primary" @click="onError('This is a error notification')">Error</Button>
  </Space>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## 自定义图标

<Space>
  <Button type="primary" @click="onInfoCustom('This is a custom icon notification')">Custom Info Icon</Button>
  <Button type="primary" @click="onOpenCustom('This is a custom icon notification')">Custom Icon</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
import { CloudFilled, FireFilled } from '@ant-design/icons-vue'
const notification = ref()
function onInfoCustom(description: string) {
  notification.value.info({
    title: 'Notification Title',
    icon: h(CloudFilled),
    description
  })
}
function onOpenCustom(description: string) {
  notification.value.open({
    title: 'Notification Title',
    icon: h(FireFilled, { style: 'color: gold' }),
    description
  })
}
function onClose() {
  // 通知提醒关闭时的回调函数
  console.log('notification closed')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onInfoCustom('This is a custom icon notification')">Custom Info Icon</Button>
    <Button type="primary" @click="onOpenCustom('This is a custom icon notification')">Custom Icon</Button>
  </Space>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## 自定义样式

<Space>
  <Button type="primary" @click="onClassCustom('This is a custom class notification')">Custom Class</Button>
  <Button type="primary" @click="onStyleCustom('This is a custom style notification')">Custom Style</Button>
</Space>

<style lang="less" scoped>
:deep(.custom-class) {
  color: #d4380d;
  .notification-title {
    font-weight: 500;
  }
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
import { CloudFilled, FireFilled } from '@ant-design/icons-vue'
const notification = ref()
function onClassCustom(description: string) {
  notification.value.open({
    title: 'Notification Title',
    description,
    icon: h(FireFilled),
    class: 'custom-class'
  })
}
function onStyleCustom(description: string) {
  notification.value.open({
    title: 'Notification Title',
    description,
    icon: h(CloudFilled),
    style: {
      width: '500px',
      color: '#ff6900'
    }
  })
}
function onClose() {
  // 通知提醒关闭时的回调函数
  console.log('notification closed')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onClassCustom('This is a custom class notification')">Custom Class</Button>
    <Button type="primary" @click="onStyleCustom('This is a custom style notification')">Custom Style</Button>
  </Space>
  <Notification ref="notification" @close="onClose" />
</template>
<style lang="less" scoped>
:deep(.custom-class) {
  color: #d4380d;
  .notification-title {
    font-weight: 500;
  }
}
</style>
```

:::

## 弹出位置

<Space>
  <Button type="primary" @click="onOpenPlacement('topLeft')">topLeft</Button>
  <Button type="primary" @click="onOpenPlacement('topRight')">topRight</Button>
  <Button type="primary" @click="onOpenPlacement('bottomLeft')">bottomLeft</Button>
  <Button type="primary" @click="onOpenPlacement('bottomRight')">bottomRight</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onOpenPlacement(placement: string) {
  notification.value.info({
    title: 'Notification Title',
    description: 'This is the content of the notification.',
    placement
  })
}
function onClose() {
  // 通知提醒关闭时的回调函数
  console.log('notification closed')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onOpenPlacement('topLeft')">topLeft</Button>
    <Button type="primary" @click="onOpenPlacement('topRight')">topRight</Button>
    <Button type="primary" @click="onOpenPlacement('bottomLeft')">bottomLeft</Button>
    <Button type="primary" @click="onOpenPlacement('bottomRight')">bottomRight</Button>
  </Space>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## 自定义关闭延时

<Space>
  <Button type="primary" @click="onCustomClose">Custom Close</Button>
  <Button type="primary" @click="onNeverAutoClose">Never Auto Close</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const notification = ref()
function onCustomClose() {
  notification.value.info({
    title: 'Notification Title',
    description: 'The notification will automatically turn off after 3 seconds.',
    duration: 3000,
    onClose: () => {
      console.log('custom notification closed')
    }
  })
}
function onNeverAutoClose() {
  notification.value.info({
    title: 'Notification Title',
    description: 'This notification will not automatically turn off.',
    duration: null
  })
}
function onClose() {
  // 通知提醒关闭时的回调函数
  console.log('notification closed')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onCustomClose">Custom Close</Button>
    <Button type="primary" @click="onNeverAutoClose">Never Auto Close</Button>
  </Space>
  <Notification ref="notification" @close="onClose" />
</template>
```

:::

## APIs

### Notification

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
title | 通知提醒标题，优先级低于 [Notification](#notification-type) 中的 `title` | string | undefined
description | 通知提醒内容，优先级低于 [Notification](#notification-type) 中的 `description` | string | undefined
duration | 自动关闭的延时时长，单位 `ms`，默认 `4500ms`；设置 `null` 时，不自动关闭，优先级低于 [Notification](#notification-type) 中的 `duration` | number &#124; null | 4500
top | 消息从顶部弹出时，距离顶部的位置，单位 `px` | number | 24
bottom | 消息从底部弹出时，距离底部的位置，单位 `px` | number | 24
placement | 消息弹出位置，优先级低于 [Notification](#notification-type) 中的 `placement` | 'topLeft' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottomRight' | 'topRight'

### Notification Type

<br/>

*调用时传入的 `Notification` 类型，以下属性均具有更高优先级*

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
title? | 通知提醒标题 | string | undefined
description? | 通知提醒内容 | string | undefined
icon? | 自定义图标 | VNode | undefined
class? | 自定义类名 | string | undefined
style? | 自定义样式 | string | undefined
duration? | 自动关闭的延时时长，单位 `ms`；设置 `null` 时，不自动关闭 | number &#124; null | undefined
placement? | 通知提醒弹出位置 | 'topLeft' &#124; 'topRight' &#124; 'bottomLeft' &#124; 'bottomRight' | undefined
onClose | 关闭时的回调函数 | Function | undefined

## Methods

名称 | 说明 | 类型
-- | -- | --
open | 基本通知提醒 | (data: [Notification](#notification-type)) => void
info | 信息通知提醒 | (data: [Notification](#notification-type)) => void
success | 成功通知提醒 | (data: [Notification](#notification-type)) => void
error | 失败通知提醒 | (data: [Notification](#notification-type)) => void
warning | 警告通知提醒 | (data: [Notification](#notification-type)) => void

## Events

名称 | 说明 | 类型
-- | -- | --
close | 通知提醒关闭时的回调 | () => void
