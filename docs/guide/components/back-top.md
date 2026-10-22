# 回到顶部 BackTop

<GlobalElement hide-back-top />

_返回页面顶部的操作按钮_

## 何时使用

- 当页面内容区域比较长时
- 当用户需要频繁返回顶部查看相关内容时

<script setup lang="ts">
import { h, ref } from 'vue'
import { DoubleLeftOutlined, VerticalAlignTopOutlined, ArrowUpOutlined } from '@ant-design/icons-vue'
const backTopTheme = {
  components: {
    BackTop: { primaryColor: '#d4380d' }
  }
}
const defaultCustomStyle = {
  '--back-top-width': '54px',
  '--back-top-height': '54px',
  '--back-top-icon-size': '32px',
}
const primaryCustomStyle = {
  '--back-top-width': '54px',
  '--back-top-height': '54px',
  '--back-top-icon-size': '32px',
  '--back-top-square-border-radius': '18px'
}
const primaryDescCustomStyle = {
  '--back-top-width': '54px',
  '--back-top-height': '54px',
  '--back-top-icon-with-description-size': '30px',
  '--back-top-description-font-size': '16px',
  '--back-top-square-border-radius': '18px'
}
const scrollContainer = ref<HTMLDivElement>()
function onShow(show: boolean) {
  console.log('show', show)
}
</script>

## 基本使用

_`BackTop` 会找到首个可滚动的祖先元素并且监听它的滚动事件_

<BackTop @show="onShow" />

::: details Show Code

```vue
<script setup lang="ts">
function onShow(show: boolean) {
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

_尺寸 / 圆角变量仍可逐实例覆盖；主色请走 `theme.components.BackTop.primaryColor`（组件级主色，悬停色自动派生），阴影已统一为 `--va-popup-shadow`、不再单独覆盖_

<ConfigProvider :theme="backTopTheme">
  <BackTop :style="defaultCustomStyle" :right="280" :bottom="160" />
  <BackTop :style="primaryCustomStyle" type="primary" shape="square" :right="350" :bottom="160" />
  <BackTop
    :style="primaryDescCustomStyle"
    type="primary"
    shape="square"
    description="顶部"
    :right="420"
    :bottom="160"
  />
</ConfigProvider>

::: details Show Code

```vue
<script setup lang="ts">
const backTopTheme = {
  components: {
    BackTop: { primaryColor: '#d4380d' }
  }
}
const defaultCustomStyle = {
  '--back-top-width': '54px',
  '--back-top-height': '54px',
  '--back-top-icon-size': '32px',
}
const primaryCustomStyle = {
  '--back-top-width': '54px',
  '--back-top-height': '54px',
  '--back-top-icon-size': '32px',
  '--back-top-square-border-radius': '18px'
}
const primaryDescCustomStyle = {
  '--back-top-width': '54px',
  '--back-top-height': '54px',
  '--back-top-icon-with-description-size': '30px',
  '--back-top-description-font-size': '16px',
  '--back-top-square-border-radius': '18px'
}
</script>
<template>
  <ConfigProvider :theme="backTopTheme">
    <BackTop :style="defaultCustomStyle" :right="280" :bottom="160" />
    <BackTop :style="primaryCustomStyle" type="primary" shape="square" :right="350" :bottom="160" />
    <BackTop
      :style="primaryDescCustomStyle"
      type="primary"
      shape="square"
      description="顶部"
      :right="420"
      :bottom="160"
    />
  </ConfigProvider>
</template>
```

:::

## 自定义可视高度

_自定义滚动时触发显示回到顶部的高度_

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

## 自定义层级

_通过 `zIndex` 调整按钮层级；按钮上的气泡为浮层（默认 `1070`），恒在按钮之上_

<br/>

<BackTop tooltip="回到顶部" :right="280" />
<BackTop tooltip="回到顶部" :z-index="3000" :right="340" />

::: details Show Code

```vue
<template>
  <BackTop tooltip="回到顶部" :right="280" />
  <BackTop tooltip="回到顶部" :z-index="3000" :right="340" />
</template>
```

:::

## 监听目标

_不指定 `listenTo` 时，`BackTop` 会自动查找距离它最近的可滚动祖先元素，并监听其滚动_

监听目标在组件**挂载时解析一次**（显式传入的 `listenTo` 属性值变化时会重新解析），之后不会因为容器滚动能力变化而重新绑定。

<br/>

按 `BackTop` 与滚动容器的**相对位置**，分三种情况：

- **`BackTop` 位于滚动容器的内容区内**：无需任何配置，会自动命中该滚动祖先（下方「监听 `Scrollbar`」用例即此形态）；
- **`BackTop` 位于滚动容器之外（如兄弟节点）**：必须显式传入 `listenTo`，否则会沿祖先链向上找到页面滚动（`window`），或找不到目标而告警；
- **页面由 `window` 滚动**：保持默认即可；若页面中存在实际不产生滚动的容器，建议显式指定 `listenTo`。

::: warning 注意
显式传入的 `listenTo` 在挂载时必须已经存在；未传时若命中的容器当下并不产生滚动（内容不足、高度为 `auto` 等）而页面实际由 `window` 滚动，按钮也不会显示 —— 这两种情况请显式传入确实可滚动的目标（也可用函数形式延迟取目标，或取 [滚动条 Scrollbar](./scrollbar.md) 实例的 `scrollElement`）。
:::

_自定义设定监听哪个元素来触发 `BackTop`_

<br/>

<BackTop :listen-to="scrollContainer" :bottom="340" :visibility-height="10">
  <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px"> 指定目标 </div>
</BackTop>
<div ref="scrollContainer" style="width: 100%; overflow: auto; height: 100px; line-height: 1.57">
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

_自动监听 `Scrollbar` 来触发 `BackTop`_

<br/>

<Scrollbar style="width: 100%; height: 100px">
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
const scrollContainer = ref<HTMLDivElement>()
</script>
<template>
  <BackTop :listen-to="scrollContainer" :bottom="340" :visibility-height="10">
    <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px"> 指定目标 </div>
  </BackTop>
  <div ref="scrollContainer" style="width: 100%; overflow: auto; height: 100px; line-height: 1.57">
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
  <Scrollbar style="width: 100%; height: 100px">
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
icon | 自定义图标，`prop` 支持 `VNode` / 渲染函数；插槽形态请用同名 `#icon` 插槽 | VNode &#124; (() => VNode) | undefined
description | 文字描述 | string | undefined
tooltip | 文字提示内容 | string | undefined
tooltipProps | `Tooltip` 组件属性配置，参考 [Tooltip Props](./tooltip.md#tooltip) | [TooltipProps](./tooltip.md#tooltip) | {}
type | 设置按钮类型 | 'default' &#124; 'primary' | 'default'
shape | 设置按钮形状 | 'circle' &#124; 'square' | 'circle'
bottom | `BackTop` 距离页面底部的高度，单位 `px` | number &#124; string | 40
right | `BackTop` 距离页面右侧的宽度，单位 `px` | number &#124; string | 40
zIndex | 设置 `BackTop` 的 `z-index` | number | 9
visibilityHeight | 滚动时触发显示回到顶部的高度，单位 `px` | number | 180
to | `BackTop` 渲染的容器节点，可选：`CSS` 选择器（例如 `body`）或者元素本身 | string &#124; HTMLElement | 'body'
listenTo | 监听滚动的元素，如果为 `undefined` 会监听距离最近的一个可滚动的祖先节点；支持 `CSS` 选择器、元素、`Document` 或返回目标的函数 | string &#124; HTMLElement &#124; Document &#124; (() => HTMLElement &#124; Document) | undefined

## Slots

名称 | 说明 | 用法
:-- | :-- | :--
tooltip | 自定义文字提示内容 | v-slot:tooltip
default | 自定义按钮 | v-slot:default
icon | 自定义图标 | v-slot:icon
description | 自定义文字描述 | v-slot:description

## Events

名称 | 说明 | 类型
:-- | :-- | :--
click | 点击按钮的回调函数 | () => void
show | 按钮显示隐藏的回调函数 | (show: boolean) => void
