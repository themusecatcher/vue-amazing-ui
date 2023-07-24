# 按钮

<br/>

*按钮用于开始一个即时操作*

## 何时使用

- 当需要添加一个操作按钮时

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
function onClick (e: Event) {
  console.log('click')
}
</script>

## 基本使用

*五种类型*

<br/>

<Space>
  <Button @click="onClick">Default</Button>
  <Button effect="reverse" @click="onClick">Reverse</Button>
  <Button type="primary" @click="onClick">Primary</Button>
  <Button type="danger" @click="onClick">Danger</Button>
  <Button type="dashed" @click="onClick">Dashed</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
function onClick (e: Event) {
  console.log('click')
}
</script>
<template>
  <Space>
    <Button @click="onClick">Default</Button>
    <Button effect="reverse" @click="onClick">Reverse</Button>
    <Button type="primary" @click="onClick">Primary</Button>
    <Button type="danger" @click="onClick">Danger</Button>
    <Button type="dashed" @click="onClick">Dashed</Button>
  </Space>
</template>

```

:::
## 禁用

<Space>
  <Button disabled @click="onClick">Default</Button>
  <Button disabled effect="reverse" @click="onClick">Reverse</Button>
  <Button disabled type="primary" @click="onClick">Primary</Button>
  <Button disabled type="danger" @click="onClick">Danger</Button>
  <Button disabled type="dashed" @click="onClick">Dashed</Button>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Button disabled>Default</Button>
    <Button disabled effect="reverse">Reverse</Button>
    <Button disabled type="primary">Primary</Button>
    <Button disabled type="danger">Danger</Button>
    <Button disabled type="dashed">Dashed</Button>
  </Space>
</template>

```

:::

## 大、中、小三种尺寸

<Space>
  <Button size="small" @click="onClick">Small</Button>
  <Button @click="onClick">Default</Button>
  <Button size="large" @click="onClick">Large</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
function onClick (e: Event) {
  console.log('click')
}
</script>
<template>
  <Space>
    <Button size="small" @click="onClick">Small</Button>
    <Button @click="onClick">Default</Button>
    <Button size="large" @click="onClick">Large</Button>
  </Space>
</template>

```

:::

## 自定义样式

<Button :width="120" :height="40" :border-radius="8" size="large" @click="onClick">
  <p style="font-size: 18px;">自定义样式</p>
</Button>

::: details Show Code

```vue
<script setup lang="ts">
function onClick (e: Event) {
  console.log('click')
}
</script>
<template>
  <Button :width="120" :height="40" :border-radius="8" size="large" @click="onClick">
    <p style="font-size: 18px;">自定义样式</p>
  </Button>
</template>

```

:::

## 加载中状态

<Space>
  <Button :loading="loading" @click="onClick">Default</Button>
  <Button :loading="loading" type="primary" @click="onClick">Primary</Button>
  <Button :loading="loading" type="danger" @click="onClick">Danger</Button>
</Space>
<br/>
<Space align="center" style="margin-top: 10px;">
  <h3 style="margin-top: 0;">Loading state: </h3>
  <Switch v-model:checked="loading" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
function onClick (e: Event) {
  console.log('click')
}
</script>
<template>
  <Space>
    <Button :loading="loading" @click="onClick">Default</Button>
    <Button :loading="loading" type="primary" @click="onClick">Primary</Button>
    <Button :loading="loading" type="danger" @click="onClick">Danger</Button>
  </Space>
  <br/>
  <Space align="center" style="margin-top: 10px;">
    <h3 style="margin-top: 0;">Loading state: </h3>
    <Switch v-model:checked="loading" />
  </Space>
</template>

```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
name | 默认文本 | string &#124; slot | '按钮' | false
type | 类型 | 'default' &#124; 'primary' &#124; 'danger' | 'default' | false
effect | 悬浮变化效果，只有 `type` 为 `default` 时，`effect` 才生效 | 'fade' &#124; 'reverse' | ''
size | 尺寸 | 'small' &#124; 'middle' &#124; 'large' | '_self' | false
width | 宽度，优先级高于 `size` 属性，为0时自适应内容的宽度 | number | 0 | false
height | 高度，优先级高于 `size` 属性 | number | 0 | false
borderRadius | 圆角，单位px | number | 5 | false
route | 跳转目标URL地址 | {path?: string&#44; query?: object} | {} | false
target | 如何打开目标URL，设置 `route` 时生效 | '_self' &#124; '_blank' | '_self' | false
disabled | 是否禁用 | boolean | false | false
loading | 是否加载中 | boolean | false | false
center | 是否将按钮设置为块级元素并居中展示 | boolean | false | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
click | 点击按钮时的回调，未设置 `route` 时生效 | (e: Event) => void
