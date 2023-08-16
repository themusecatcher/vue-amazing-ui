# 弹出确认 Popconfirm

<br/>

*点击元素，弹出气泡式的确认框*

## 何时使用

- 目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户

<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log(e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log(e)
  message.value.error('Click on No')
}
</script>

## 基本使用

<Popconfirm
  title="Are you sure delete this task?"
  @ok="confirm"
  @cancel="cancel">
  <Button type="danger">Delete</Button>
</Popconfirm>
<Message ref="message" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const message = ref()
const confirm = (e: MouseEvent) => {
  console.log(e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log(e)
  message.value.error('Click on No')
}
</script>
<template>
  <Popconfirm
    title="Are you sure delete this task?"
    @ok="confirm"
    @cancel="cancel">
    <Button type="danger">Delete</Button>
  </Popconfirm>
  <Message ref="message" />
</template>
```

:::

## 自定义按钮文字

<Popconfirm title="Are you sure？" ok-text="Yes" cancel-text="No">
  <Button type="danger">Delete</Button>
</Popconfirm>

::: details Show Code

```vue
<template>
  <Popconfirm title="Are you sure？" ok-text="Yes" cancel-text="No">
    <Button type="danger">Delete</Button>
  </Popconfirm>
</template>
```

:::

## 预置四种 Icon 图标

<Space>
  <Popconfirm title="Are you sure delete this task?">
    <Button type="primary">Warning</Button>
  </Popconfirm>
  <Popconfirm title="Are you sure delete this task?" icon-type="info">
    <Button type="primary">Info</Button>
  </Popconfirm>
  <Popconfirm title="Are you sure delete this task?" icon-type="success">
    <Button type="primary">Success</Button>
  </Popconfirm>
  <Popconfirm title="Are you sure delete this task?" icon-type="error">
    <Button type="primary">Error</Button>
  </Popconfirm>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Popconfirm title="Are you sure delete this task?">
      <Button type="primary">Warning</Button>
    </Popconfirm>
    <Popconfirm title="Are you sure delete this task?" icon-type="info">
      <Button type="primary">Info</Button>
    </Popconfirm>
    <Popconfirm title="Are you sure delete this task?" icon-type="success">
      <Button type="primary">Success</Button>
    </Popconfirm>
    <Popconfirm title="Are you sure delete this task?" icon-type="error">
      <Button type="primary">Error</Button>
    </Popconfirm>
  </Space>
</template>
```

:::
## 自定义 Icon 图标

<Popconfirm title="Are you sure？">
  <template #icon>
    <svg focusable="false" class="u-svg" data-icon="question-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg>
  </template>
  <Button type="danger">Delete</Button>
</Popconfirm>

::: details Show Code

```vue
<template>
  <Popconfirm title="Are you sure？">
    <template #icon>
      <svg focusable="false" class="u-svg" data-icon="question-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg>
    </template>
    <Button type="danger">Delete</Button>
  </Popconfirm>
</template>
<style lang="less" scoped>
.u-svg {
  fill: #ff4d4f;
}
</style>
```

:::

## 隐藏取消按钮

<Popconfirm
  title="friendly reminder ..."
  :show-cancel="false">
  <Button type="primary">Hidden Cancel Btn</Button>
</Popconfirm>

::: details Show Code

```vue
<template>
  <Popconfirm
    title="friendly reminder ..."
    :show-cancel="false">
    <Button type="primary">Hidden Cancel Btn</Button>
  </Popconfirm>
</template>
```

:::

<style lang="less" scoped>
.u-svg {
  fill: #ff4d4f;
}
</style>

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
title | 确认框的标题 | string &#124; slot | '' | false
description | 确认框的内容描述 | string &#124; slot | '' | false
content | 展示的文本 | string &#124; slot | '' | false
icon | 自定义弹出确认框 `Icon` 图标 | string &#124; slot | '' | false
iconType | 弹出确认框 `Icon` 图标类型 | 'success' &#124; 'info' &#124; 'warning' &#124; 'error' | 'warning' | false
maxWidth | 弹出确认框内容最大宽度 | string &#124; number | 'auto' | false
cancelText | 取消按钮文字 | string &#124; slot | '取消' | false
cancelType | 取消按钮类型 | string | 'default' | false
okText | 确认按钮文字 | string &#124; slot | '确定' | false
okType | 确认按钮类型 | string | 'primary' | false
showCancel | 是否显示取消按钮 | boolean | true | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
cancel | 点击取消的回调 | (e: Event) => void
ok | 点击确认的回调 | (e: Event) => void
openChange | 显示隐藏的回调 | (visible: boolean) => void
