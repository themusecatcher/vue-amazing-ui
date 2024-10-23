# 气泡卡片 Popover

<FloatButton
  :width="44"
  :height="44"
  :bottom="96"
  :right="40"
  type="primary"
  tooltip="成为赞助者✨"
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

*点击/鼠标移入元素，弹出气泡式的卡片浮层。*

## 何时使用

- 当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。
- 和 Tooltip 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

<script setup lang="ts">
function openChange (open: boolean) {
  console.log('open:', open)
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
function openChange (open: boolean) {
  console.log('open:', open)
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

## 自定义样式

<Popover
  :max-width="180"
  :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
  :content-style="{ color: '#fff' }"
  bg-color="rgba(0, 0, 0.8)"
  :popover-style="{ padding: '12px 18px', borderRadius: '12px' }"
>
  <template #title> Custom Title </template>
  <template #content>
    <p>Custom Content</p>
    <p>Custom Content</p>
  </template>
  <Button type="primary">Hover me</Button>
</Popover>

::: details Show Code

```vue
<template>
  <Popover
    :max-width="180"
    :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
    :content-style="{ color: '#fff' }"
    bg-color="rgba(0, 0, 0.8)"
    :popover-style="{ padding: '12px 18px', borderRadius: '12px' }"
  >
    <template #title> Custom Title </template>
    <template #content>
      <p>Custom Content</p>
      <p>Custom Content</p>
    </template>
    <Button type="primary">Hover me</Button>
  </Popover>
</template>
```

:::

## 不同的触发方式

<Space>
  <Popover title="Hover Title">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <Button type="primary">Hover Me</Button>
  </Popover>
  <Popover title="Click Title" trigger="click">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <Button type="primary">Click Me</Button>
  </Popover>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Popover title="Hover Title">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Hover Me</Button>
    </Popover>
    <Popover title="Click Title" trigger="click">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Click Me</Button>
    </Popover>
  </Space>
</template>
```

:::

## 延迟显示隐藏

<Space>
  <Popover
    :show-delay="300"
    :hide-delay="300"
    title="delay 300ms"
    content="Vue Amazing UI"
  >
    <Button type="primary">Delay 300ms Popover</Button>
  </Popover>
  <Popover
    :show-delay="500"
    :hide-delay="500"
    title="delay 500ms"
    content="Vue Amazing UI"
  >
    <Button type="primary">Delay 500ms Popover</Button>
  </Popover>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Popover
      :show-delay="300"
      :hide-delay="300"
      title="delay 300ms"
      content="Vue Amazing UI"
    >
      <Button type="primary">Delay 300ms Popover</Button>
    </Popover>
    <Popover
      :show-delay="500"
      :hide-delay="500"
      title="delay 500ms"
      content="Vue Amazing UI"
    >
      <Button type="primary">Delay 500ms Popover</Button>
    </Popover>
  </Space>
</template>
```

:::

## 隐藏箭头

<Popover :arrow="false" content="Vue Amazing UI">
  <Button type="primary">Hide Arrow</Button>
</Popover>

::: details Show Code

```vue
<template>
  <Popover :arrow="false" content="Vue Amazing UI">
    <Button type="primary">Hide Arrow</Button>
  </Popover>
</template>
```

:::

## APIs

### Popover

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
maxWidth | 弹出卡片最大宽度，单位 `px` | string &#124; number | 'auto'
title | 卡片标题 | string &#124; slot | undefined
titleStyle | 卡片标题样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
content | 卡片内容 | string &#124; slot | undefined
contentStyle | 卡片内容样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
bgColor | 弹出卡片背景颜色 | string | '#fff'
popoverStyle | 卡片容器样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
arrow | 是否显示箭头 | boolean | true
trigger | 弹出卡片触发方式 | 'hover' &#124; 'click' | 'hover'
showDelay | 弹出卡片显示的延迟时间，单位 `ms` | number | 100
hideDelay | 弹出卡片隐藏的延迟时间，单位 `ms` | number | 100
show <Tag color="cyan">v-model</Tag> | 弹出卡片是否显示 | boolean | false

## Events

名称 | 说明 | 类型
-- | -- | --
openChange | 显示隐藏的回调 | (open: boolean) => void
