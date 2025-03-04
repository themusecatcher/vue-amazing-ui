# 气泡卡片 Popover

<GlobalElement />

*点击/鼠标移入元素，弹出气泡式的卡片浮层。*

## 何时使用

- 当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。
- 和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
function openChange(open: boolean) {
  console.log('open', open)
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
  console.log('open', open)
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
  bg-color="#000"
  :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
  :content-style="{ color: '#fff' }"
  :tooltip-style="{ padding: '12px 18px', borderRadius: '12px' }"
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
    bg-color="#000"
    :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
    :content-style="{ color: '#fff' }"
    :tooltip-style="{ padding: '12px 18px', borderRadius: '12px' }"
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

## 从浮层内关闭

*使用 `show` 属性控制显示隐藏*

<br/>

<Popover v-model:show="show" title="Click Title" trigger="click">
  <template #content>
    <a @click="show = false">Close</a>
  </template>
  <Button type="primary">Click Me</Button>
</Popover>

<style lang="less" scoped>
.popover-content a {
  color: #1677ff;
  text-decoration: none;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #4096ff;
  }
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <Popover v-model:show="show" title="Click Title" trigger="click">
    <template #content>
      <a @click="show = false">Close</a>
    </template>
    <Button type="primary">Click Me</Button>
  </Popover>
</template>
```

:::

## 自定义过渡动画时间

<Popover title="Transition Duration 300ms" :transition-duration="300">
  <template #content>
    <p>Content</p>
    <p>Content</p>
  </template>
  <Button type="primary">Transition Duration 300ms</Button>
</Popover>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <Popover title="Transition Duration 300ms" :transition-duration="300">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <Button type="primary">Transition Duration 300ms</Button>
  </Popover>
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

<Popover :arrow="false" title="Title">
  <template #content>
    <p>Content</p>
    <p>Content</p>
  </template>
  <Button type="primary">Hide Arrow</Button>
</Popover>

::: details Show Code

```vue
<template>
  <Popover :arrow="false" title="Title">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <Button type="primary">Hide Arrow</Button>
  </Popover>
</template>
```

:::

<br/>

> *更多使用方式请参考 [文字提示 Tooltip](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html)*

## APIs

### Popover

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
title | 卡片标题 | string &#124; slot | undefined
titleStyle | 卡片标题样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
content | 卡片内容 | string &#124; slot | undefined
contentStyle | 卡片内容样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
keyboard | 是否支持按键操作 (`enter` 显示；`esc` 关闭) | boolean | true
tooltipStyle | 设置弹出提示的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}

更多属性请参考 [Tooltip](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip)

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
title | 自定义卡片标题 | v-slot:title
content | 自定义卡片内容 | v-slot:content
default | 自定义内容 | v-solt:default

## Events

名称 | 说明 | 类型
:-- | :-- | :--
openChange | 显示隐藏的回调 | (open: boolean) => void
