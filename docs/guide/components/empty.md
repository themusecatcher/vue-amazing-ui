# 空状态 Empty

<br/>

*空状态时的展示占位图*

## 何时使用

- 当没有数据时，用于显式的用户提示

## 基本使用

- **预置风格 1**

<Empty />

::: details Show Code

```vue
<template>
  <Empty />
</template>
```

:::

- **预置风格 2**

<Empty image="2" />

::: details Show Code

```vue
<template>
  <Empty image="2" />
</template>
```

:::

## 无描述

<Empty :description="null" />

::: details Show Code

```vue
<template>
  <Empty :description="null" />
</template>
```

:::

## 自定义

*自定义图片地址、描述内容和样式*

<br/>

<Empty
  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
  :image-style="{
    width: '100px',
    height: '60px'
  }">
  <template #description>
    <span>
      Customize
      <a href="#API">Description</a>
    </span>
  </template>
</Empty>

::: details Show Code

```vue
<template>
  <Empty
    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
    :image-style="{
      width: '100px',
      height: '60px'
    }">
    <template #description>
      <span>
        Customize
        <a href="#API">Description</a>
      </span>
    </template>
  </Empty>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
description | 自定义描述内容 | string &#124; slot | '暂无数据' | false
image | 显示图片的链接，或者 选择预置的两种风格图片，可选 `'1'` &#124; `'2'` | string | '1' | false
imageStyle | 图片样式 | CSSProperties | {} | false
