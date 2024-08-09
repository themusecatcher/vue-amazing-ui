# 全局提示 Message

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*全局展示操作反馈信息*

## 何时使用

- 可提供成功、警告和错误等反馈信息
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式

::: tip 使用

- message.value.info(content: string) // info 调用
- message.value.success(content: string) // success 调用
- message.value.error(content: string) // error 调用
- message.value.warning(content: string) // warning 调用
- message.value.loading(content: string) // loading 调用

:::

<script setup lang="ts">
import { ref } from 'vue'
const message = ref()

function onInfo (content: string) {
  message.value.info(content) // info调用
}
function onSuccess (content: string) {
  message.value.success(content) // success调用
}
function onError (content: string) {
  message.value.error(content) // error调用
}
function onWarning (content: string) {
  message.value.warning(content) // warning调用
}
function onLoading (content: string) {
  message.value.loading(content) // loading调用
}
function onClose () {
  console.log('close')
}
</script>

<Message ref="message" @close="onClose" />

## 基本使用

<Button type="primary" @click="onInfo('This is a normal message')">Info</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()

function onInfo (content: string) {
  message.value.info(content) // info调用
}
function onClose () {
  console.log('close')
}
</script>
<template>
  <Button type="primary" @click="onInfo('This is a normal message')">Info</Button>
  <Message ref="message" @close="onClose" />
</template>
```

:::

## 成功提示

<Button type="primary" @click="onSuccess('This is a success message')">Success</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()

function onSuccess (content: string) {
  message.value.success(content) // success调用
}
function onClose () {
  console.log('close')
}
</script>
<template>
  <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
  <Message ref="message" @close="onClose" />
</template>
```

:::

## 失败提示

<Button type="primary" @click="onError('This is a error message')">Error</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()

function onError (content: string) {
  message.value.error(content) // error调用
}
function onClose () {
  console.log('close')
}
</script>
<template>
  <Button type="primary" @click="onError('This is a error message')">Error</Button>
  <Message ref="message" @close="onClose" />
</template>
```

:::

## 警告提示

<Button type="primary" @click="onWarning('This is a warning message')">Warning</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()

function onWarning (content: string) {
  message.value.warning(content) // warning调用
}
function onClose () {
  console.log('close')
}
</script>
<template>
  <Button type="primary" @click="onWarning('This is a warning message')">Warning</Button>
  <Message ref="message" @close="onClose" />
</template>
```

:::

## 加载提示

<Button type="primary" @click="onLoading('This is a loading message')">Loading</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()

function onLoading (content: string) {
  message.value.loading(content) // loading调用
}
function onClose () {
  console.log('close')
}
</script>
<template>
  <Button type="primary" @click="onLoading('This is a loading message')">Loading</Button>
  <Message ref="message" @close="onClose" />
</template>
```

:::

## APIs

### Message

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
duration | 自动关闭的延时，单位 `ms` | number | 3000
top | 消息距离顶部的位置，单位 `px` | number &#124; string | 30

## Methods

名称 | 说明 | 类型
-- | -- | --
info | 基本信息提示 | (content: string) => void
success | 成功信息提示 | (content: string) => void
error | 失败信息提示 | (content: string) => void
warning | 警告信息提示 | (content: string) => void
loading | 加载信息提示 | (content: string) => void

## Events

名称 | 说明 | 类型
-- | -- | --
close | 关闭时触发的回调函数 | () => void
