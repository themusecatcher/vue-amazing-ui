# 渐变文字 GradientText

<GlobalElement />

*这个东西看起来没啥用，实际上也确实没啥用😁😁*

## 基本使用

<Space gap="small" vertical>
  <GradientText>basic</GradientText>
  <GradientText type="info">info</GradientText>
  <GradientText type="success">success</GradientText>
  <GradientText type="warning">warning</GradientText>
  <GradientText type="error">error</GradientText>
</Space>

::: details Show Code

```vue
<template>
  <Space gap="small" vertical>
    <GradientText>basic</GradientText>
    <GradientText type="info">info</GradientText>
    <GradientText type="success">success</GradientText>
    <GradientText type="warning">warning</GradientText>
    <GradientText type="error">error</GradientText>
  </Space>
</template>
```

:::

## 文字样式

<Space gap="small" vertical>
  <GradientText type="info" :size="36" :weight="500">Live Forever</GradientText>
  <GradientText type="error" :size="36" :weight="600">Live Forever</GradientText>
  <GradientText type="warning" :size="24" :weight="700">Married with Children</GradientText>
  <GradientText type="success" :size="24" :weight="800">Back in the USSR</GradientText>
</Space>

::: details Show Code

```vue
<template>
  <Space gap="small" vertical>
    <GradientText type="info" :size="36" :weight="500">Live Forever</GradientText>
    <GradientText type="error" :size="36" :weight="600">Live Forever</GradientText>
    <GradientText type="warning" :size="24" :weight="700">Married with Children</GradientText>
    <GradientText type="success" :size="24" :weight="800">Back in the USSR</GradientText>
  </Space>
</template>
```

:::

## 自定义颜色

<Space gap="small" vertical>
  <GradientText
    :size="24"
    :weight="500"
    :gradient="{
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
    >定制颜色</GradientText
  >
  <GradientText
    :size="24"
    :weight="500"
    :gradient="{
      deg: 180,
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
    >定制颜色</GradientText
  >
  <GradientText
    :size="28"
    :weight="500"
    :gradient="{
      deg: '90deg',
      from: '#09c8ce',
      to: '#eb2f96'
    }"
    >和标题一样的颜色</GradientText
  >
  <GradientText :size="24" :weight="500" gradient="linear-gradient(90deg, #1677ff 0%, lime 50%, #ff6900 100%)">瞎写的颜色</GradientText>
</Space>

::: details Show Code

```vue
<template>
  <Space gap="small" vertical>
    <GradientText
      :size="24"
      :weight="500"
      :gradient="{
        from: 'rgb(85, 85, 85)',
        to: 'rgb(170, 170, 170)'
      }"
      >定制颜色</GradientText
    >
    <GradientText
      :size="24"
      :weight="500"
      :gradient="{
        deg: 180,
        from: 'rgb(85, 85, 85)',
        to: 'rgb(170, 170, 170)'
      }"
      >定制颜色</GradientText
    >
    <GradientText
      :size="28"
      :weight="500"
      :gradient="{
        deg: '90deg',
        from: '#09c8ce',
        to: '#eb2f96'
      }"
      >和标题一样的颜色</GradientText
    >
    <GradientText :size="24" :weight="500" gradient="linear-gradient(90deg, #1677ff 0%, lime 50%, #ff6900 100%)">瞎写的颜色</GradientText>
  </Space>
</template>
```

:::

## APIs

### GradientText

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
gradient | 文字渐变色参数 | string &#124; [GradientTextGradient](#gradient-type) | undefined
size | 文字大小，不指定单位时，默认单位 `px` | number &#124; string | 14
weight | 文字粗细 | number | 400
type | 渐变文字的类型 | 'primary' &#124; 'info' &#124; 'success' &#124; 'warning' &#124; 'error' | 'primary'

### Gradient Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
from | 起始颜色 | string | undefined
to | 终点颜色 | string | undefined
deg? | 渐变角度，单位 `deg` | number &#124; string | 252

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
default | 自定义内容 | v-slot:default
