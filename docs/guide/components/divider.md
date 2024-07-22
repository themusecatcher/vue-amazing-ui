# 分割线 Divider

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" :z-index="30" />

<br/>

*区隔内容的分割线*

## 何时使用

- 对不同章节的文本段落进行分割
- 对行内文字/链接进行分割

## 基本使用

<Divider>Center Text</Divider>
<Divider border-style="dashed">Center Text</Divider>

::: details Show Code

```vue
<template>
  <Divider>Center Text</Divider>
  <Divider border-style="dashed">Center Text</Divider>
</template>
```

:::

## 中间无文字

<Divider />
<Divider border-style="dashed" />

::: details Show Code

```vue
<template>
  <Divider />
  <Divider border-style="dashed" />
</template>
```

:::

## 指定文字位置

<Divider>Center Text</Divider>
<Divider orientation="left">Left Text</Divider>
<Divider orientation="right">Right Text</Divider>

::: details Show Code

```vue
<template>
  <Divider>Center Text</Divider>
  <Divider orientation="left">Left Text</Divider>
  <Divider orientation="right">Right Text</Divider>
</template>
```

:::

## 垂直分割线

<div>
  Text
  <Divider vertical />
  <a href="#">Link</a>
  <Divider vertical />
  <a href="#">Link</a>
</div>

::: details Show Code

```vue
<template>
  <Divider orientation="left">Left Text</Divider>
  <Divider orientation="right">Right Text</Divider>
</template>
```

:::

## 自定义垂直线高度

<Divider vertical :border-width="3" :height="60" />
<Divider vertical :border-width="3" :height="60" border-style="dashed" />
<Divider vertical :border-width="3" :height="60" border-style="dotted" />

::: details Show Code

```vue
<template>
  <Divider vertical :border-width="3" :height="60" />
  <Divider vertical :border-width="3" :height="60" border-style="dashed" />
  <Divider vertical :border-width="3" :height="60" border-style="dotted" />
</template>
```

:::

## 自定义文字边距

*文字居左(右)并距左(右)边 120px*

<Divider orientation="left" :orientation-margin="120">Left Text</Divider>
<Divider orientation="right" :orientation-margin="120">Right Text</Divider>

::: details Show Code

```vue
<template>
  <Divider orientation="left" :orientation-margin="120">Left Text</Divider>
  <Divider orientation="right" :orientation-margin="120">Right Text</Divider>
</template>
```

:::

## 自定义样式

<Divider :border-width="3" border-color="orange" />
<Divider :border-width="3" border-style="dashed" border-color="orange" />
<Divider :border-width="3" border-style="dotted" border-color="orange" />
<Flex style="height: 120px;">
  <Divider vertical :border-width="3" border-color="orange" height="auto" />
  <Divider vertical :border-width="3" border-style="dashed" border-color="orange" :height="120" />
  <Divider vertical :border-width="3" border-style="dotted" border-color="orange" height="100%" />
</Flex>

::: details Show Code

```vue
<template>
  <Divider :border-width="3" border-color="orange" />
  <Divider :border-width="3" border-style="dashed" border-color="orange" />
  <Divider :border-width="3" border-style="dotted" border-color="orange" />
  <Flex style="height: 120px;">
    <Divider vertical :border-width="3" border-color="orange" height="auto" />
    <Divider vertical :border-width="3" border-style="dashed" border-color="orange" :height="120" />
    <Divider vertical :border-width="3" border-style="dotted" border-color="orange" height="100%" />
  </Flex>
</template>
```

:::

## APIs

### Divider

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
orientation | 分割线标题的位置 | 'left' &#124; 'center' &#124; 'right' | 'center' | false
orientationMargin | 标题和最近 `left` / `right` 边框之间的距离，去除了分割线，同时 `orientation` 必须为 `left` 或 `right` | string &#124; number | '' | false
borderWidth | 分割线宽度，单位`px` | number | 1 | false
borderStyle | 分割线样式 | 'solid' &#124; 'dashed' &#124; 'dotted' &#124; 'double' &#124; 'groove' &#124; 'ridge' &#124; 'inset' &#124; 'outset' | 'solid' | false
borderColor | 分割线颜色 | string | 'rgba(5, 5, 5, 0.06)' | false
vertical | 垂直分割线高度，仅当 `vertical: true` 时生效 | string &#124; number | '0.9em' | false
