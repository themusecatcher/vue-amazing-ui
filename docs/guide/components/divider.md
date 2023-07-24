# 分割线 Divider

<br/>

*区隔内容的分割线*

## 何时使用

- 对不同章节的文本段落进行分割
- 对行内文字/链接进行分割

## 基本使用

<Divider>Center Text</Divider>

::: details Show Code

```vue
<template>
  <Divider>Center Text</Divider>
</template>
```

:::

## 中间无文字

<Divider />

::: details Show Code

```vue
<template>
  <Divider />
</template>
```

:::

## 指定文字位置

<Divider orientation="left">Left Text</Divider>
<Divider orientation="right">Right Text</Divider>

::: details Show Code

```vue
<template>
  <Divider orientation="left">Left Text</Divider>
  <Divider orientation="right">Right Text</Divider>
</template>
```

:::

## 自定义文字位置

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

## 使用虚线

<Divider dashed>Center Text</Divider>

::: details Show Code

```vue
<template>
  <Divider dashed>Center Text</Divider>
</template>
```

:::

## 自定义线宽

*线宽 3px*

<Divider :borderWidth="3">Center Text</Divider>

::: details Show Code

```vue
<template>
  <Divider :borderWidth="3">Center Text</Divider>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
dashed | 是否为虚线 | boolean | false | false
orientation | 分割线标题的位置 | 'left' &#124; 'center' &#124; 'right' | 'center' | false
orientationMargin | 标题和最近 `left` / `right` 边框之间的距离，去除了分割线，同时 `orientation` 必须为 `left` 或 `right` | string &#124; number | '' | false
borderWidth | 分割线宽度，单位px | number | 1 | false
