# 按钮 Button

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*按钮用于开始一个即时操作*

## 何时使用

- 当需要添加一个操作按钮时

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
function onClick(e: Event) {
  console.log('click', e)
}
</script>

## 基本使用

*七种类型*

<br/>

<Space>
  <Button>Default Button</Button>
  <Button type="reverse">Reverse Button</Button>
  <Button type="primary">Primary Button</Button>
  <Button type="danger">Danger Button</Button>
  <Button type="dashed">Dashed Button</Button>
  <Button type="text">Text Button</Button>
  <Button type="link">Link Button</Button>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Button>Default Button</Button>
    <Button type="reverse">Reverse Button</Button>
    <Button type="primary">Primary Button</Button>
    <Button type="danger">Danger Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Space>
</template>
```

:::
## 禁用

<Space>
  <Button disabled>Default Button</Button>
  <Button disabled type="reverse">Reverse Button</Button>
  <Button disabled type="primary">Primary Button</Button>
  <Button disabled type="danger">Danger Button</Button>
  <Button disabled type="dashed">Dashed Button</Button>
  <Button disabled type="text">Text Button</Button>
  <Button disabled type="link">Link Button</Button>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Button disabled>Default Button</Button>
    <Button disabled type="reverse">Reverse Button</Button>
    <Button disabled type="primary">Primary Button</Button>
    <Button disabled type="danger">Danger Button</Button>
    <Button disabled type="dashed">Dashed Button</Button>
    <Button disabled type="text">Text Button</Button>
    <Button disabled type="link">Link Button</Button>
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
<template>
  <Button style="width: 120px; height: 40px;" size="large">
    <p style="font-size: 18px;">自定义样式</p>
  </Button>
</template>
```

:::

## 自定义跳转

<Button href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank">跳转按钮</Button>

::: details Show Code

```vue
<template>
  <Button href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html" target="_blank">跳转按钮</Button>
</template>
```

:::

## 加载中状态

<Space>
  <Button :loading="loading">Default Button</Button>
  <Button type="reverse" :loading="loading">Reverse Button</Button>
  <Button type="primary" :loading="loading">Primary Button</Button>
  <Button type="danger" :loading="loading">Danger Button</Button>
  <Button type="dashed" :loading="loading">Dashed Button</Button>
  <Button type="text" :loading="loading">Text Button</Button>
  <Button type="link" :loading="loading">Link Button</Button>
</Space>
<br/>
<br/>
<Space align="center">
  Loading state:<Switch v-model:checked="loading" />
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
    <Button type="reverse" :loading="loading">Reverse Button</Button>
    <Button type="primary" :loading="loading">Primary Button</Button>
    <Button type="danger" :loading="loading">Danger Button</Button>
    <Button type="dashed" :loading="loading">Dashed Button</Button>
    <Button type="text" :loading="loading">Text Button</Button>
    <Button type="link" :loading="loading">Link Button</Button>
  </Space>
  <br/>
  <br/>
  <Space align="center">
    Loading state:<Switch v-model:checked="loading" />
  </Space>
</template>
```

:::

## 居中展示

<Button center @click="onClick">Default Button</Button>

::: details Show Code

```vue
<script setup lang="ts">
function onClick(e: Event) {
  console.log('click', e)
}
</script>
<template>
  <Button center @click="onClick">Default Button</Button>
</template>
```

:::
## APIs

### Button

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
name | 按钮文本 | string &#124; slot | '按钮' | false
type | 按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | 'default' | false
size | 按钮尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle' | false
href | 点击跳转的地址，与 `a` 链接的 `href` 属性一致 | string | '' | false
target | 相当于 `a` 链接的 `target` 属性，`href` 存在时生效 | '_self' &#124; '_blank' | '_self' | false
disabled | 是否禁用 | boolean | false | false
loading | 是否加载中 | boolean | false | false
center | 是否将按钮宽度调整为其父宽度并居中展示 | boolean | false | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
click | 点击按钮时的回调 | (e: Event) => void
