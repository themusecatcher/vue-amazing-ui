# 回到顶部 BackTop

<GlobalElement hide-back-top />

*返回页面顶部的操作按钮*

## 何时使用

- 当页面内容区域比较长时
- 当用户需要频繁返回顶部查看相关内容时

<script setup lang="ts">
import { h, ref } from 'vue'
import { DoubleLeftOutlined, VerticalAlignTopOutlined, ArrowUpOutlined } from '@ant-design/icons-vue'
const defaultCustomStyle = {
  '--backtop-width': '54px',
  '--backtop-height': '54px',
  '--backtop-icon-size': '32px',
  '--backtop-default-color-hover': '#d4380d'
}
const primaryCustomStyle = {
  '--backtop-width': '54px',
  '--backtop-height': '54px',
  '--backtop-icon-size': '32px',
  '--backtop-primary-bg-color': '#d4380d',
  '--backtop-primary-bg-color-hover': '#dd6747',
  '--backtop-primary-shadow-color': 'rgba(221, 103, 71, 0.36)',
  '--backtop-primary-shadow-color-hover': 'rgba(221, 103, 71, 0.36)',
  '--backtop-square-border-radius': '18px'
}
const primaryDescCustomStyle = {
  '--backtop-width': '54px',
  '--backtop-height': '54px',
  '--backtop-icon-with-desc-size': '30px',
  '--backtop-desc-font-size': '16px',
  '--backtop-primary-bg-color': '#d4380d',
  '--backtop-primary-bg-color-hover': '#dd6747',
  '--backtop-primary-shadow-color': 'rgba(221, 103, 71, 0.36)',
  '--backtop-primary-shadow-color-hover': 'rgba(221, 103, 71, 0.36)',
  '--backtop-square-border-radius': '18px'
}
const scrollContainer = ref()
function onShow(show: boolean) {
  console.log('show', show)
}
</script>

## 基本使用

*`BackTop` 会找到首个可滚动的祖先元素并且监听它的滚动事件*

<BackTop @show="onShow" />

::: details Show Code

```vue
<script setup lang="ts">
function onShow (show: boolean) {
  console.log('show', show)
}
</script>
<template>
  <BackTop @show="onShow" />
</template>
```

:::

## 自定义图标

<BackTop :right="100" :icon="() => h(VerticalAlignTopOutlined)" />
<BackTop :right="160">
  <template #icon>
    <DoubleLeftOutlined :rotate="90" />
  </template>
</BackTop>
<BackTop :right="220">
  <template #icon>
    <ArrowUpOutlined />
  </template>
</BackTop>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { DoubleLeftOutlined, VerticalAlignTopOutlined, ArrowUpOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <BackTop :right="100" :icon="() => h(VerticalAlignTopOutlined)" />
  <BackTop :right="160">
    <template #icon>
      <DoubleLeftOutlined :rotate="90" />
    </template>
  </BackTop>
  <BackTop :right="220">
    <template #icon>
      <ArrowUpOutlined />
    </template>
  </BackTop>
</template>
```

:::

## 自定义类型和形状

<BackTop shape="square" :right="100" :bottom="100" />
<BackTop shape="square" description="顶部" :right="160" :bottom="100" />
<BackTop type="primary" :right="220" :bottom="100" />
<BackTop type="primary" shape="square" :right="280" :bottom="100" />
<BackTop type="primary" shape="square" description="顶部" :right="340" :bottom="100" />

::: details Show Code

```vue
<template>
  <BackTop shape="square" :right="100" :bottom="100" />
  <BackTop shape="square" description="顶部" :right="160" :bottom="100" />
  <BackTop type="primary" :right="220" :bottom="100" />
  <BackTop type="primary" shape="square" :right="280" :bottom="100" />
  <BackTop type="primary" shape="square" description="顶部" :right="340" :bottom="100" />
</template>
```

:::

## 文字描述

<BackTop description="顶部" :right="100" :bottom="160" />

::: details Show Code

```vue
<template>
  <BackTop description="顶部" :right="100" :bottom="160" />
</template>
```

:::

## 悬浮提示

<BackTop tooltip="回到顶部" :right="160" :bottom="160" />
<BackTop
  type="primary"
  shape="square"
  tooltip="回到顶部"
  :tooltip-props="{
    bgColor: '#fff',
    tooltipStyle: {
      padding: '8px 12px',
      borderRadius: '12px',
      fontSize: '16px',
      color: 'rgba(0, 0, 0, 0.88)',
      fontWeight: 500
    }
  }"
  :right="220"
  :bottom="160"
/>

::: details Show Code

```vue
<template>
  <BackTop tooltip="回到顶部" :right="160" :bottom="160" />
  <BackTop
    type="primary"
    shape="square"
    tooltip="回到顶部"
    :tooltip-props="{
      bgColor: '#fff',
      tooltipStyle: {
        padding: '8px 12px',
        borderRadius: '12px',
        fontSize: '16px',
        color: 'rgba(0, 0, 0, 0.88)',
        fontWeight: 500
      }
    }"
    :right="220"
    :bottom="160"
  />
</template>
```

:::

## 自定义样式

<BackTop :style="defaultCustomStyle" :right="280" :bottom="160" />
<BackTop :style="primaryCustomStyle" type="primary" shape="square" :right="350" :bottom="160" />
<BackTop :style="primaryDescCustomStyle" type="primary" shape="square" description="顶部" :right="420" :bottom="160" />

::: details Show Code

```vue
<script setup lang="ts">
const defaultCustomStyle = {
  '--backtop-width': '54px',
  '--backtop-height': '54px',
  '--backtop-icon-size': '32px',
  '--backtop-default-color-hover': '#d4380d'
}
const primaryCustomStyle = {
  '--backtop-width': '54px',
  '--backtop-height': '54px',
  '--backtop-icon-size': '32px',
  '--backtop-primary-bg-color': '#d4380d',
  '--backtop-primary-bg-color-hover': '#dd6747',
  '--backtop-primary-shadow-color': 'rgba(221, 103, 71, 0.36)',
  '--backtop-primary-shadow-color-hover': 'rgba(221, 103, 71, 0.36)',
  '--backtop-square-border-radius': '18px'
}
const primaryDescCustomStyle = {
  '--backtop-width': '54px',
  '--backtop-height': '54px',
  '--backtop-icon-with-desc-size': '30px',
  '--backtop-desc-font-size': '16px',
  '--backtop-primary-bg-color': '#d4380d',
  '--backtop-primary-bg-color-hover': '#dd6747',
  '--backtop-primary-shadow-color': 'rgba(221, 103, 71, 0.36)',
  '--backtop-primary-shadow-color-hover': 'rgba(221, 103, 71, 0.36)',
  '--backtop-square-border-radius': '18px'
}
</script>
<template>
  <BackTop :style="defaultCustomStyle" :right="280" :bottom="160" />
  <BackTop :style="primaryCustomStyle" type="primary" shape="square" :right="350" :bottom="160" />
  <BackTop :style="primaryDescCustomStyle" type="primary" shape="square" description="顶部" :right="420" :bottom="160" />
</template>
```

:::

## 自定义可视高度

*自定义滚动时触发显示回到顶部的高度*

<BackTop :bottom="280" :visibility-height="300">
  <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px">
    可视高度：300px
  </div>
</BackTop>

::: details Show Code

```vue
<template>
  <BackTop :bottom="280" :visibility-height="300">
    <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px">
      可视高度：300px
    </div>
  </BackTop>
</template>
```

:::

## 自定义位置

<BackTop :right="260" :bottom="280">
  <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px">改变位置</div>
</BackTop>

::: details Show Code

```vue
<template>
  <BackTop :right="260" :bottom="280">
    <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px">改变位置</div>
  </BackTop>
</template>
```

:::

## 自定义监听目标

*自定义设定监听哪个元素来触发 `BackTop`*

<br/>

<BackTop :listen-to="scrollContainer" :bottom="340" :visibility-height="10">
  <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px"> 指定目标 </div>
</BackTop>
<div ref="scrollContainer" style="width: 600px; overflow: auto; height: 100px; line-height: 1.57">
  这块应该写一个有意思的笑话。<br />
  这块应该写一个有意思的笑话。<br />
  这块应该写一个有意思的笑话。<br />
  这块应该写一个有意思的笑话。<br />
  这块应该写一个有意思的笑话。<br />
  这块应该写一个有意思的笑话。<br />
  这块应该写一个有意思的笑话。<br />
  这块应该写一个有意思的笑话。<br />
  这块应该写一个有意思的笑话。<br />
  这块应该写一个有意思的笑话。<br />
</div>

<br/>

*自动监听 `Scrollbar` 来触发 `BackTop`*

<br/>

<Scrollbar style="width: 600px; height: 100px">
  <BackTop :bottom="340" :right="260" :visibility-height="10">
    <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px">
      监听 Scrollbar
    </div>
  </BackTop>
  这块应该写一个有意思的笑话。
  <br />
  这块应该写一个有意思的笑话。
  <br />
  这块应该写一个有意思的笑话。
  <br />
  这块应该写一个有意思的笑话。
  <br />
  这块应该写一个有意思的笑话。
  <br />
  这块应该写一个有意思的笑话。
  <br />
  这块应该写一个有意思的笑话。
  <br />
  这块应该写一个有意思的笑话。
  <br />
  这块应该写一个有意思的笑话。
  <br />
  这块应该写一个有意思的笑话。
  <br />
</Scrollbar>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const scrollContainer = ref()
</script>
<template>
  <BackTop :listen-to="scrollContainer" :bottom="340" :visibility-height="10">
    <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px"> 指定目标 </div>
  </BackTop>
  <div ref="scrollContainer" style="width: 600px; overflow: auto; height: 100px; line-height: 1.57">
    这块应该写一个有意思的笑话。<br />
    这块应该写一个有意思的笑话。<br />
    这块应该写一个有意思的笑话。<br />
    这块应该写一个有意思的笑话。<br />
    这块应该写一个有意思的笑话。<br />
    这块应该写一个有意思的笑话。<br />
    这块应该写一个有意思的笑话。<br />
    这块应该写一个有意思的笑话。<br />
    这块应该写一个有意思的笑话。<br />
    这块应该写一个有意思的笑话。<br />
  </div>
  <br />
  <Scrollbar style="width: 600px; height: 100px">
    <BackTop :bottom="340" :right="260" :visibility-height="10">
      <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px">
        监听 Scrollbar
      </div>
    </BackTop>
    这块应该写一个有意思的笑话。
    <br />
    这块应该写一个有意思的笑话。
    <br />
    这块应该写一个有意思的笑话。
    <br />
    这块应该写一个有意思的笑话。
    <br />
    这块应该写一个有意思的笑话。
    <br />
    这块应该写一个有意思的笑话。
    <br />
    这块应该写一个有意思的笑话。
    <br />
    这块应该写一个有意思的笑话。
    <br />
    这块应该写一个有意思的笑话。
    <br />
    这块应该写一个有意思的笑话。
    <br />
  </Scrollbar>
</template>
```

:::

## APIs

### BackTop

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
icon | 自定义图标 | VNode &#124; Slot | undefined
description | 文字描述 | string &#124; slot | undefined
tooltip | 文字提示内容 | string &#124; slot | undefined
tooltipProps | `Tooltip` 组件属性配置，参考 [Tooltip Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip) | object | {}
type | 设置按钮类型 | 'default' &#124; 'primary' | 'default'
shape | 设置按钮形状 | 'circle' &#124; 'square' | 'circle'
bottom | `BackTop` 距离页面底部的高度，单位 `px` | number &#124; string | 40
right | `BackTop` 距离页面右侧的宽度，单位 `px` | number &#124; string | 40
zIndex | 设置 `BackTop` 的 `z-index` | number | 9
visibilityHeight | 滚动时触发显示回到顶部的高度，单位 `px` | number | 180
to | `BackTop` 渲染的容器节点，可选：元素标签名（例如 `body`）或者元素本身，下同 | string &#124; HTMLElement | 'body'
listenTo | 监听滚动的元素，如果为 `undefined` 会监听距离最近的一个可滚动的祖先节点 | string &#124; HTMLElement | undefined

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
default | 自定义按钮 | v-slot:default
icon | 自定义图标 | v-slot:icon
description | 自定义文字描述 | v-slot:description
tooltip | 自定义文字提示内容 | v-slot:tooltip

## Events

名称 | 说明 | 类型
:-- | :-- | :--
click | 点击按钮的回调函数 | () => void
show | 按钮显示隐藏的回调函数 | (show: boolean) => void
