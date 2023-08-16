# 全局提示 Message

<br/>

*全局展示操作反馈信息*

## 何时使用

- 可提供成功、警告和错误等反馈信息
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式

<script setup lang="ts">
import { ref } from 'vue'
const message = ref()

function onInfo (content: any) {
  message.value.info(content) // info调用
}
function onSuccess (content: any) {
  message.value.success(content) // success调用
}
function onError (content: any) {
  message.value.error(content) // error调用
}
function onWarning (content: any) {
  message.value.warning(content) // warning调用
}
function onLoading (content: string) {
  message.value.loading(content) // loading调用
}
function onClose () {
  console.log('close')
}
</script>

<Message ref="message" :duration="3000" :top="30" @close="onClose" />

## 基本使用

<Button type="primary" @click="onInfo('This is a normal message')">Info</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()

function onInfo (content: any) {
  message.value.info(content) // info调用
}
function onClose () {
  console.log('close')
}
</script>
<template>
  <Button type="primary" @click="onInfo('This is a normal message')">Info</Button>
  <Message ref="message" :duration="3000" :top="30" @close="onClose" />
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

function onSuccess (content: any) {
  message.value.success(content) // success调用
}
function onClose () {
  console.log('close')
}
</script>
<template>
  <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
  <Message ref="message" :duration="3000" :top="30" @close="onClose" />
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

function onError (content: any) {
  message.value.error(content) // error调用
}
function onClose () {
  console.log('close')
}
</script>
<template>
  <Button type="primary" @click="onError('This is a error message')">Error</Button>
  <Message ref="message" :duration="3000" :top="30" @close="onClose" />
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

function onWarning (content: any) {
  message.value.warning(content) // warning调用
}
function onClose () {
  console.log('close')
}
</script>
<template>
  <Button type="primary" @click="onWarning('This is a warning message')">Warning</Button>
  <Message ref="message" :duration="3000" :top="30" @close="onClose" />
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
  <Message ref="message" :duration="3000" :top="30" @close="onClose" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
duration | 自动关闭的延时，单位ms | number | 3000 | false
top | 消息距离顶部的位置，单位px | number | 30 | false
## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 关闭时触发的回调函数 | () => void
