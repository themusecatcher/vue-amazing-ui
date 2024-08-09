# 气泡卡片 Popover

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*点击/鼠标移入元素，弹出气泡式的卡片浮层。*

## 何时使用

- 当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。
- 和 Tooltip 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

<script setup lang="ts">
function openChange (visible: boolean) {
  console.log('visible:', visible)
}
</script>

## 基本使用

<Popover title="Title" @open-change="openChange">
  <template #content>
    <p>Content</p>
    <p>Content</p>
  </template>
  <Button type="primary">Hover me</Button>
</Popover>

::: details Show Code

```vue
<script setup lang="ts">
function openChange (visible: boolean) {
  console.log('visible:', visible)
}
</script>
<template>
  <Popover title="Title" @open-change="openChange">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <Button type="primary">Hover me</Button>
  </Popover>
</template>
```

:::

## 不同的触发方式

<Popover title="Title" trigger="click">
  <template #content>
    <p>Content</p>
    <p>Content</p>
  </template>
  <Button type="primary">Click me</Button>
</Popover>

::: details Show Code

```vue
<template>
  <Popover title="Title" trigger="click">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <Button type="primary">Click me</Button>
  </Popover>
</template>
```

:::

## 自定义样式

<Popover
  title="TitleTitleTitleTitleTitleTitleTitleTitleTitle"
  :max-width="240"
  :overlayStyle="{ padding: '12px 18px', borderRadius: '12px' }">
  <template #content>
    <p>Content</p>
    <p>Content</p>
  </template>
  <Button type="primary">Hover me</Button>
</Popover>

::: details Show Code

```vue
<template>
  <Popover
    title="TitleTitleTitleTitleTitleTitleTitleTitleTitle"
    :max-width="240"
    :overlayStyle="{ padding: '12px 18px', borderRadius: '12px' }">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <Button type="primary">Hover me</Button>
  </Popover>
</template>
```

:::

## APIs

### Popover

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
title | 卡片标题 | string &#124; slot | undefined
content | 卡片内容 | string &#124; slot | undefined
maxWidth | 卡片内容最大宽度 | string &#124; number | 'auto'
trigger | 卡片触发方式 | 'hover' &#124; 'click' | 'hover'
overlayStyle | 卡片样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}

## Events

名称 | 说明 | 类型
-- | -- | --
openChange | 显示隐藏的回调 | (visible: boolean) => void
