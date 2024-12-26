# 文本省略 Ellipsis

<GlobalElement />

*文本过长自动处理省略号，支持按照文本长度和最大行数两种方式截取*

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
  bg-color="#4096ff"
  :tooltip-style="{
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '16px',
    backgroundColor: '#4096ff'
  }"
>
  住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
</Ellipsis>

::: details Show Code

```vue
<template>
  <Ellipsis
    :max-width="240"
    bg-color="#4096ff"
    :tooltip-style="{
      padding: '12px 16px',
      borderRadius: '12px',
      fontSize: '16px',
      backgroundColor: '#4096ff'
    }"
  >
    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
</template>
```

:::

## 自定义过渡动画时间

<Ellipsis :max-width="240" :transition-duration="300">
  住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
</Ellipsis>

::: details Show Code

```vue
<template>
  <Ellipsis :max-width="240" :transition-duration="300">
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
  <Ellipsis :max-width="240" trigger="click">
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
    <Ellipsis :max-width="240" trigger="click">
      Click Me 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    </Ellipsis>
  </Space>
</template>
```

:::

## 延迟显示隐藏

<Space>
  <Ellipsis :max-width="240" :show-delay="300" :hide-delay="300">
    Delay 300ms 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
  <Ellipsis :max-width="240" :show-delay="500" :hide-delay="500">
    Delay 500ms 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Ellipsis :max-width="240" :show-delay="300" :hide-delay="300">
      Delay 300ms 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    </Ellipsis>
    <Ellipsis :max-width="240" :show-delay="500" :hide-delay="500">
      Delay 500ms 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
    </Ellipsis>
  </Space>
</template>
```

:::

## 隐藏箭头

<Ellipsis :max-width="240" :arrow="false">
  Hide Arrow 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
</Ellipsis>

::: details Show Code

```vue
<template>
  <Ellipsis :max-width="240" :arrow="false">
    Hide Arrow 住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
  </Ellipsis>
</template>
```

:::

<br/>

> *更多使用方式请参考 [文字提示 Tooltip](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html)*

## APIs

### Ellipsis

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
maxWidth | 文本最大宽度，单位 `px` | string &#124; number | '100%'
tooltipMaxWidth | 弹出提示最大宽度，单位 `px`，默认为 `文本宽度 + 24` | string &#124; number | undefined
line | 最大行数 | number | undefined
expand | 是否启用点击文本展开全部 | boolean | false
tooltip | 是否启用文本提示框，可自定义设置弹出提示内容 | boolean &#124; slot | true

更多属性请参考 [Tooltip](https://themusecatcher.github.io/vue-amazing-ui/guide/components/tooltip.html#tooltip)

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
tooltip | 自定义弹出提示内容 | v-slot:tooltip
default | 自定义展示内容 | v-slot:default

## Events

名称 | 说明 | 类型
:-- | :-- | :--
expandChange | 点击文本展开收起时的回调 | (expand: boolean) => void
