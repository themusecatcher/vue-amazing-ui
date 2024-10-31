# 全局提示 Message

<GlobalElement />

*全局展示操作反馈信息*

## 何时使用

- 可提供成功、警告和错误等反馈信息
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式

::: tip 使用

- message.value.open(content: string | [Message](#message-type)) // open 调用
- message.value.info(content: string | [Message](#message-type)) // info 调用
- message.value.success(content: string | [Message](#message-type)) // success 调用
- message.value.error(content: string | [Message](#message-type)) // error 调用
- message.value.warning(content: string | [Message](#message-type)) // warning 调用
- message.value.loading(content: string | [Message](#message-type)) // loading 调用

:::

<script setup lang="ts">
import { ref, h } from 'vue'
import { SoundFilled, FireFilled } from '@ant-design/icons-vue'
const message = ref()
function onOpen(content: string) {
  message.value.open(content) // open 调用
}
function onInfo(content: string) {
  message.value.info(content) // info 调用
}
function onSuccess(content: string) {
  message.value.success(content) // success 调用
}
function onError(content: string) {
  message.value.error(content) // error 调用
}
function onWarning(content: string) {
  message.value.warning(content) // warning 调用
}
function onLoading(content: string) {
  message.value.loading(content) // loading 调用
}
function onInfoCustom(content: string) {
  // info 调用, 并自定义图标
  message.value.info({
    content,
    icon: h(SoundFilled)
  })
}
function onOpenCustom(content: string) {
  // open 调用, 并自定义图标
  message.value.open({
    content,
    icon: h(FireFilled, { style: 'color: gold' })
  })
}
function onClassCustom(content: string) {
  message.value.info({
    content,
    icon: h(SoundFilled),
    class: 'custom-class'
  })
}
function onStyleCustom(content: string) {
  message.value.warning({
    content,
    icon: h(FireFilled),
    duration: null,
    top: '30vh',
    style: {
      color: '#f50'
    }
  })
}
function onCustomClose() {
  message.value.info({
    content: 'The message will automatically turn off after 3 seconds.',
    duration: 3000,
    onClose: () => {
      console.log('custom message closed')
    }
  })
}
function onNeverAutoClose() {
  message.value.info({
    content: 'This message will not automatically turn off.',
    duration: null,
    onClick: () => {
      console.log('custom message clicked')
    }
  })
}
function onClick(e: Event) {
  console.log('click', e)
}
function onClose() {
  console.log('close')
}
</script>

<Message ref="message" @click="onClick" @close="onClose" />

## 基本使用

<Button type="primary" @click="onOpen('This is a open message')">Open</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
function onOpen(content: string) {
  message.value.open(content) // open 调用
}
function onClick(e: Event) {
  console.log('click', e)
}
function onClose() {
  console.log('close')
}
</script>
<template>
  <Button type="primary" @click="onOpen('This is a open message')">Open</Button>
  <Message ref="message" @click="onClick" @close="onClose" />
</template>
```

:::

## 不同类型的全局提示

<Space>
  <Button type="primary" @click="onInfo('This is a info message')">Info</Button>
  <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
  <Button type="primary" @click="onError('This is a error message')">Error</Button>
  <Button type="primary" @click="onWarning('This is a warning message')">Warning</Button>
  <Button type="primary" @click="onLoading('This is a loading message')">Loading</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
function onInfo(content: string) {
  message.value.info(content) // info 调用
}
function onSuccess(content: string) {
  message.value.success(content) // success 调用
}
function onError(content: string) {
  message.value.error(content) // error 调用
}
function onWarning(content: string) {
  message.value.warning(content) // warning 调用
}
function onLoading(content: string) {
  message.value.loading(content) // loading 调用
}
function onClose() {
  console.log('close')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onInfo('This is a info message')">Info</Button>
    <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
    <Button type="primary" @click="onError('This is a error message')">Error</Button>
    <Button type="primary" @click="onWarning('This is a warning message')">Warning</Button>
    <Button type="primary" @click="onLoading('This is a loading message')">Loading</Button>
  </Space>
  <Message ref="message" @close="onClose" />
</template>
```

:::

## 自定义图标

<Space>
  <Button type="primary" @click="onInfoCustom('This is a custom icon message')">Custom Info Icon</Button>
  <Button type="primary" @click="onOpenCustom('This is a custom icon message')">Custom Icon</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
import { SoundFilled, FireFilled } from '@ant-design/icons-vue'
const message = ref()
function onInfoCustom(content: string) {
  // info 调用, 并自定义图标
  message.value.info({
    content,
    icon: h(SoundFilled)
  })
}
function onOpenCustom(content: string) {
  // open 调用, 并自定义图标
  message.value.open({
    content,
    icon: h(FireFilled, { style: 'color: gold' })
  })
}
function onClose() {
  console.log('close')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onInfoCustom('This is a custom icon message')">Custom Info Icon</Button>
    <Button type="primary" @click="onOpenCustom('This is a custom icon message')">Custom Icon</Button>
  </Space>
  <Message ref="message" @close="onClose" />
</template>
```

:::

## 自定义样式

<Space>
  <Button type="primary" @click="onClassCustom('This is a custom class message')">Custom Class</Button>
  <Button type="primary" @click="onStyleCustom('This is a custom style message')">Custom Style</Button>
</Space>

<style lang="less" scoped>
:deep(.custom-class) {
  color: #ff6900;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
import { SoundFilled, FireFilled } from '@ant-design/icons-vue'
const message = ref()
function onClassCustom(content: string) {
  message.value.info({
    content,
    icon: h(SoundFilled),
    class: 'custom-class'
  })
}
function onStyleCustom(content: string) {
  message.value.warning({
    content,
    icon: h(FireFilled),
    duration: null,
    top: '30vh',
    style: {
      color: '#f50'
    }
  })
}
function onClose() {
  console.log('close')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onClassCustom('This is a custom class message')">Custom Class</Button>
    <Button type="primary" @click="onStyleCustom('This is a custom style message')">Custom Style</Button>
  </Space>
  <Message ref="message" @close="onClose" />
</template>
<style lang="less" scoped>
:deep(.custom-class) {
  color: #ff6900;
}
</style>
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
const message = ref()
function onCustomClose() {
  message.value.info({
    content: 'The message will automatically turn off after 3 seconds.',
    duration: 3000,
    onClose: () => {
      console.log('custom message closed')
    }
  })
}
function onNeverAutoClose() {
  message.value.info({
    content: 'This message will not automatically turn off.',
    duration: null,
    onClick: () => {
      console.log('custom message clicked')
    }
  })
}
function onClose() {
  console.log('close')
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onCustomClose">Custom Close</Button>
    <Button type="primary" @click="onNeverAutoClose">Never Auto Close</Button>
  </Space>
  <Message ref="message" @close="onClose" />
</template>
```

:::

## APIs

### Message

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
content | 提示内容 | string | undefined
duration | 自动关闭的延时，单位 `ms`，设置 `null` 时，不自动关闭 | number | 3000
top | 消息距离顶部的位置，单位 `px` | string &#124; number | 30

### Message Type

<br/>

*调用时传入的 `Message` 类型，以下属性均具有更高优先级*

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
content? | 提示内容 | string | undefined
icon? | 自定义图标 | VNode | undefined
duration? | 自动关闭的延时时长，单位 `ms`；设置 `null` 时，不自动关闭 | number &#124; null | undefined
top? | 消息距离顶部的位置，单位 `px` | string &#124; number | undefined
class? | 自定义类名 | string | undefined
style? | 自定义样式 | string | undefined
onClick? | 点击 `message` 时的回调函数 | Function | undefined
onClose? | 关闭时的回调函数 | Function | undefined

## Methods

名称 | 说明 | 类型
-- | -- | --
open | 基本全局提示 | (content: string &#124; [Message](#message-type)) => void
info | 信息全局提示 | (content: string &#124; [Message](#message-type)) => void
success | 成功全局提示 | (content: string &#124; [Message](#message-type)) => void
error | 失败全局提示 | (content: string &#124; [Message](#message-type)) => void
warning | 警告全局提示 | (content: string &#124; [Message](#message-type)) => void
loading | 加载全局提示 | (content: string &#124; [Message](#message-type)) => void

## Events

名称 | 说明 | 类型
-- | -- | --
click | 点击 `message` 时触发的回调函数 | (e: Event) => void
close | 关闭时触发的回调函数 | () => void

## 全局挂载使用

- 全局挂载

::: tip App.vue

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
const message = ref()
onMounted(() => {
  window['$message'] = message.value
})
onBeforeUnmount(() => {
  delete window['$message']
})
</script>
<template>
  <RouterView />
  <Message ref="message" />
</template>
```

:::

- 使用

::: tip XXX.vue

```vue
<script setup lang="ts">
const $message = window['$message']
function onClick() {
  $message.success('点击了按钮')
}
</script>
<template>
  <Button @click="onClick">按钮</Button>
</template>
```

:::
