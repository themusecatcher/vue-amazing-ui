# 文本省略 Ellipsis

<br/>

*文本过长自动处理省略号，支持按照文本长度和最大行数两种方式截取*

## 何时使用

- 当文本长度超过展示区域，需要自动处理省略号时

## 基本使用

<Ellipsis :maxWidth="240">
  住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
</Ellipsis>

::: details Show Code

```vue
<template>
  <Ellipsis :maxWidth="240">
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

<Ellipsis expand :line="2">
  电灯熄灭 物换星移 泥牛入海<br>黑暗好像 一颗巨石 按在胸口<br>独脚大盗
  百万富翁 摸爬滚打<br>黑暗好像 一颗巨石 按在胸口
</Ellipsis>

::: details Show Code

```vue
<template>
  <Ellipsis expand :line="2">
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

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
maxWidth | 文本最大宽度 | number &#124; string | '100%' | false
line | 最大行数 | number | undefined | false
expand | 是否启用点击文本展开全部 | boolean | false | false
tooltip | 是否启用文本提示框 | boolean | true | false
tooltipMaxWidth | 提示框内容最大宽度，单位px，默认不设置时，提示文本内容自动与展示文本宽度保持一致 | number | undefined | false
tooltipFontSize | 提示文本字体大小，单位px，优先级高于 `overlayStyle` | number | 14 | false
tooltipColor | 提示文本字体颜色，优先级高于 `overlayStyle` | string | '#FFF' | false
tooltipBackgroundColor | 提示框背景颜色，优先级高于 `overlayStyle` | string | 'rgba(0, 0, 0, .85)' | false
tooltipOverlayStyle | 提示框内容区域样式 | CSSProperties | {padding: \'8px 12px', textAlign: 'justify'} | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
expandChange | 点击文本展开收起时的回调 | (expand: boolean) => void
