# 文本省略 Ellipsis

<GlobalElement />

_文本过长自动处理省略号，支持按照文本长度和最大行数两种方式截取_

## 何时使用

- 当文本长度超过展示区域，需要自动展示省略号时

<script setup lang="ts">
function expandChange(open: boolean) {
  console.log('open', open)
}
</script>

## 基本使用

<Ellipsis :max-width="240">
  住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
</Ellipsis>

::: details Show Code

```vue
<template>
  <Ellipsis :max-width="240">
    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
</template>
```

:::

## 多行省略

<Ellipsis :line="2">
  电灯熄灭 物换星移 泥牛入海<br>黑暗好像 一颗巨石 按在胸口<br>独脚大盗
  百万富翁 摸爬滚打<br>黑暗好像 一颗巨石 按在胸口
</Ellipsis>

::: details Show Code

```vue
<template>
  <Ellipsis :line="2">
    电灯熄灭 物换星移 泥牛入海<br>黑暗好像 一颗巨石 按在胸口<br>独脚大盗
    百万富翁 摸爬滚打<br>黑暗好像 一颗巨石 按在胸口
  </Ellipsis>
</template>
```

:::

## 点击展开

_设置 `expand` 后，点击文本展开全部内容，再次点击收起；单行与多行均支持_

<br/>

<Ellipsis expand :line="2" @expandChange="expandChange">
  电灯熄灭 物换星移 泥牛入海<br>黑暗好像 一颗巨石 按在胸口<br>独脚大盗
  百万富翁 摸爬滚打<br>黑暗好像 一颗巨石 按在胸口
</Ellipsis>

::: details Show Code

```vue
<script setup lang="ts">
function expandChange(open: boolean) {
  console.log('open', open)
}
</script>
<template>
  <Ellipsis expand :line="2" @expandChange="expandChange">
    电灯熄灭 物换星移 泥牛入海<br>黑暗好像 一颗巨石 按在胸口<br>独脚大盗
    百万富翁 摸爬滚打<br>黑暗好像 一颗巨石 按在胸口
  </Ellipsis>
</template>
```

:::

## 单行展开

<Ellipsis expand :max-width="240">
  住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
</Ellipsis>

::: details Show Code

```vue
<template>
  <Ellipsis expand :max-width="240">
    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
</template>
```

:::

## 定制 Tooltip 内容

<Ellipsis :max-width="240">
  住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  <template #tooltip>
    <div style="text-align: center">
      《秦皇岛》<br>住在我心里孤独的<br>孤独的海怪 痛苦之王<br>开始厌倦
      深海的光 停滞的海浪
    </div>
  </template>
</Ellipsis>

::: details Show Code

```vue
<template>
  <Ellipsis :max-width="240">
    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    <template #tooltip>
      <div style="text-align: center">
        《秦皇岛》<br>住在我心里孤独的<br>孤独的海怪 痛苦之王<br>开始厌倦
        深海的光 停滞的海浪
      </div>
    </template>
  </Ellipsis>
</template>
```

:::

## 自定义 Tooltip 样式

<Ellipsis
  :max-width="240"
  :tooltip="{
    bgColor: '#4096ff',
    tooltipStyle: {
      padding: '12px 16px',
      borderRadius: '12px',
      fontSize: '16px',
      backgroundColor: '#4096ff'
    }
  }"
>
  住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
</Ellipsis>

::: details Show Code

```vue
<template>
  <Ellipsis
    :max-width="240"
    :tooltip="{
      bgColor: '#4096ff',
      tooltipStyle: {
        padding: '12px 16px',
        borderRadius: '12px',
        fontSize: '16px',
        backgroundColor: '#4096ff'
      }
    }"
  >
    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
</template>
```

:::

## 自定义过渡动画时间

<Ellipsis :max-width="240" :tooltip="{ transitionDuration: 300 }">
  住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
</Ellipsis>

::: details Show Code

```vue
<template>
  <Ellipsis :max-width="240" :tooltip="{ transitionDuration: 300 }">
    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
</template>
```

:::

## 不同的触发方式

<Space>
  <Ellipsis :max-width="240">
    Hover Me 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
  <Ellipsis :max-width="240" :tooltip="{ trigger: 'click' }">
    Click Me 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Ellipsis :max-width="240">
      Hover Me 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    </Ellipsis>
    <Ellipsis :max-width="240" :tooltip="{ trigger: 'click' }">
      Click Me 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    </Ellipsis>
  </Space>
</template>
```

:::

## 延迟显示隐藏

<Space>
  <Ellipsis :max-width="240" :tooltip="{ showDelay: 300, hideDelay: 300 }">
    Delay 300ms 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
  <Ellipsis :max-width="240" :tooltip="{ showDelay: 500, hideDelay: 500 }">
    Delay 500ms 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Ellipsis :max-width="240" :tooltip="{ showDelay: 300, hideDelay: 300 }">
      Delay 300ms 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    </Ellipsis>
    <Ellipsis :max-width="240" :tooltip="{ showDelay: 500, hideDelay: 500 }">
      Delay 500ms 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    </Ellipsis>
  </Space>
</template>
```

:::

## 隐藏箭头

<Ellipsis :max-width="240" :tooltip="{ arrow: false }">
  Hide Arrow 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
</Ellipsis>

::: details Show Code

```vue
<template>
  <Ellipsis :max-width="240" :tooltip="{ arrow: false }">
    Hide Arrow 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
</template>
```

:::

<br/>

> _更多使用方式请参考 [文字提示 Tooltip](./tooltip.md)_

## APIs

### Ellipsis Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| maxWidth | 文本最大宽度，`number` 按 `px` 处理 | string &#124; number | '100%' |
| line | 最多展示行数；不传时为单行省略 | number | undefined |
| expand | 文本溢出时点击展开 / 收起全部 | boolean | false |
| tooltip | 是否显示提示框，**仅在文本溢出时出现**；传对象即 [文字提示 Tooltip](./tooltip.md#tooltip-props) 的属性配置 | boolean &#124; EllipsisTooltipProps | true |
| tooltipMaxWidth | 提示框最大宽度，`number` 按 `px` 处理，默认为文本容器宽度 `+ 24` | string &#124; number | undefined |

`expand` 展开时提示框会收起，再次收起后若文本仍溢出则恢复显示。

`tooltip` 传对象时的类型是 `EllipsisTooltipProps`（从包入口导出）：

```ts
type EllipsisTooltipProps = Omit<
  TooltipProps,
  'anchor' | 'getDisabled' | 'content' | 'contentClass' | 'contentStyle' | 'tooltip'
>
```

被 `Omit` 的字段按用途分三类，其余 [Tooltip Props](./tooltip.md#tooltip-props) 均可下发：

- 锚点与展示判定（`anchor` / `getDisabled`）：由本组件接管，覆盖会导致提示错位或失效
- 提示内容（`content` / `tooltip`）：内容源由默认插槽与 `#tooltip` 插槽决定
- 包裹层样式（`contentClass` / `contentStyle`）：只作用于 `Tooltip` 的触发包裹层，本组件以锚点模式渲染、没有该节点，传入不生效；调整提示框样式请用 `tooltipStyle` / `popupStyle`

**提示宽度**优先级从高到低：提示的 `maxWidth`（经 `:tooltip="{ maxWidth }"` 下发）→ `tooltipMaxWidth` → 默认「文本容器宽度 `+ 24`」。
两者同名易混：本组件的 `maxWidth` 是**文本**最大宽度，`{ maxWidth }` 是**提示**最大宽度，互不影响。

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| default | 文本内容；未使用 `tooltip` 插槽时，它同时是提示框的内容 | v-slot:default |
| tooltip | 自定义提示框内容，优先于默认插槽 | v-slot:tooltip |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| expandChange | 点击文本展开收起时的回调 | (expand: boolean) => void |
