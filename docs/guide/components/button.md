# 按钮 Button<BackTop />

<br/>

*按钮用于开始一个即时操作*

## 何时使用

- 当需要添加一个操作按钮时

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</script>

## 基本使用

*六种类型*

<br/>

<Space>
  <Button>Default Button</Button>
  <Button effect="reverse">Reverse Button</Button>
  <Button type="primary">Primary Button</Button>
  <Button type="danger">Danger Button</Button>
  <Button type="dashed">Dashed Button</Button>
  <Button type="text">Text Button</Button>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Button>Default Button</Button>
    <Button effect="reverse">Reverse Button</Button>
    <Button type="primary">Primary Button</Button>
    <Button type="danger">Danger Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
  </Space>
</template>
```

:::
## 禁用

<Space>
  <Button disabled>Default Button</Button>
  <Button disabled effect="reverse">Reverse Button</Button>
  <Button disabled type="primary">Primary Button</Button>
  <Button disabled type="danger">Danger Button</Button>
  <Button disabled type="dashed">Dashed Button</Button>
  <Button disabled type="text">Text Button</Button>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Button disabled>Default Button</Button>
    <Button disabled effect="reverse">Reverse Button</Button>
    <Button disabled type="primary">Primary Button</Button>
    <Button disabled type="danger">Danger Button</Button>
    <Button disabled type="dashed">Dashed Button</Button>
    <Button disabled type="text">Text Button</Button>
  </Space>
</template>
```

:::

## 三种尺寸

<Space>
  <Button size="small">Small</Button>
  <Button>Default</Button>
  <Button size="large">Large</Button>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Button size="small">Small</Button>
    <Button>Default</Button>
    <Button size="large">Large</Button>
  </Space>
</template>
```

:::

## 自定义样式

<Button style="width: 120px; height: 40px;" size="large">
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
  <Button style="width: 120px; height: 40px;" size="large">
    <p style="font-size: 18px;">自定义样式</p>
  </Button>
</template>
```

:::

## 加载中状态

<Space>
  <Button :loading="loading">Default Button</Button>
  <Button effect="reverse" :loading="loading">Reverse Button</Button>
  <Button type="primary" :loading="loading">Primary Button</Button>
  <Button type="danger" :loading="loading">Danger Button</Button>
  <Button type="dashed" :loading="loading">Dashed Button</Button>
  <Button type="text" :loading="loading">Text Button</Button>
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
</script>
<template>
  <Space>
    <Button :loading="loading">Default Button</Button>
    <Button effect="reverse" :loading="loading">Reverse Button</Button>
    <Button type="primary" :loading="loading">Primary Button</Button>
    <Button type="danger" :loading="loading">Danger Button</Button>
    <Button type="dashed" :loading="loading">Dashed Button</Button>
    <Button type="text" :loading="loading">Text Button</Button>
  </Space>
  <br/>
  <Space align="center" style="margin-top: 10px;">
    <h3 style="margin-top: 0;">Loading state: </h3>
    <Switch v-model:checked="loading" />
  </Space>
</template>
```

:::

## 居中展示

<Button center>Default Button</Button>

::: details Show Code

```vue
<template>
  <Button center>Default Button</Button>
</template>
```

:::
## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
name | 按钮文本 | string &#124; slot | '按钮' | false
type | 按钮类型 | 'default' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' | 'default' | false
effect | 悬浮变化效果，只有 `type` 为 `default` 时，`effect` 才生效 | 'fade' &#124; 'reverse' | 'fade' | false
size | 按钮尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle' | false
route | 跳转目标 `URL` 地址 | {path?: string&#44; query?: object} | {} | false
target | 如何打开目标URL，设置 `route` 时生效 | '_self' &#124; '_blank' | '_self' | false
disabled | 是否禁用 | boolean | false | false
loading | 是否加载中 | boolean | false | false
center | 是否将按钮宽度调整为其父宽度并居中展示 | boolean | false | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
click | 点击按钮时的回调，未设置 `route` 时生效 | (e: Event) => void
