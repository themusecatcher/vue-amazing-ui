# 渐变文字 GradientText

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" :z-index="30" />

<br/>

*这个东西看起来没啥用，实际上也确实没啥用😁😁*

## 基本使用

<Space vertical>
  <GradientText>basic</GradientText>
  <GradientText type="info">info</GradientText>
  <GradientText type="success">success</GradientText>
  <GradientText type="warning">warning</GradientText>
  <GradientText type="error">error</GradientText>
</Space>

::: details Show Code

```vue
<template>
  <Space vertical>
    <GradientText>basic</GradientText>
    <GradientText type="info">info</GradientText>
    <GradientText type="success">success</GradientText>
    <GradientText type="warning">warning</GradientText>
    <GradientText type="error">error</GradientText>
  </Space>
</template>
```

:::

## 文字大小

<Space vertical>
  <GradientText :size="36" type="info">Live Forever</GradientText>
  <GradientText :size="36" type="error">Live Forever</GradientText>
  <GradientText :size="24" type="warning">Married with Children</GradientText>
  <GradientText :size="24" type="success">Back in the USSR</GradientText>
</Space>

::: details Show Code

```vue
<template>
  <Space vertical>
    <GradientText :size="36" type="info">Live Forever</GradientText>
    <GradientText :size="36" type="error">Live Forever</GradientText>
    <GradientText :size="24" type="warning">Married with Children</GradientText>
    <GradientText :size="24" type="success">Back in the USSR</GradientText>
  </Space>
</template>
```

:::

## 自定义颜色

<Space vertical>
  <GradientText
    :size="24"
    :gradient="{
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
    >定制颜色</GradientText
  >
  <GradientText
    :size="24"
    :gradient="{
      deg: 180,
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
    >定制颜色</GradientText
  >
  <GradientText
    :size="28"
    :gradient="{
      deg: '90deg',
      from: '#09c8ce',
      to: '#eb2f96'
    }"
    >和标题一样的颜色</GradientText
  >
  <GradientText :size="24" gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">瞎写的颜色</GradientText>
</Space>

::: details Show Code

```vue
<template>
  <Space vertical>
    <GradientText
      :size="24"
      :gradient="{
        from: 'rgb(85, 85, 85)',
        to: 'rgb(170, 170, 170)'
      }"
      >定制颜色</GradientText
    >
    <GradientText
      :size="24"
      :gradient="{
        deg: 180,
        from: 'rgb(85, 85, 85)',
        to: 'rgb(170, 170, 170)'
      }"
      >定制颜色</GradientText
    >
    <GradientText
      :size="28"
      :gradient="{
        deg: '90deg',
        from: '#09c8ce',
        to: '#eb2f96'
      }"
      >和标题一样的颜色</GradientText
    >
    <GradientText :size="24" gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">瞎写的颜色</GradientText>
  </Space>
</template>
```

:::

## APIs

### GradientText

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
gradient | 文字渐变色参数 | string &#124; [Gradient](#gradient-type) | undefined | false
size | 文字大小，不指定单位时，默认单位 `px` | number &#124; string | 14 | false
type | 渐变文字的类型 | 'primary' &#124; 'info' &#124; 'success' &#124; 'warning' &#124; 'error' | 'primary' | false

### Gradient Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
from | 起始颜色 | string | true
to | 终点颜色 | string | true
deg | 渐变角度，单位 `deg` | number &#124; string | false
