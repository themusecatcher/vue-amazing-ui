# 空状态 Empty

<FloatButton
  :bottom="96"
  type="primary"
  tooltip="成为赞助者✨"
  :tooltip-props="{
    tooltipStyle: {
      fontWeight: 500
    }
  }"
  href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
  target="_blank"
>
  <template #description>
    <span style="font-size: 14px; font-weight: 600;">赞助</span>
  </template>
</FloatButton>
<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*空状态时的展示占位图*

## 何时使用

- 当没有数据时，用于显式的用户提示

## 基本使用

*预置风格: filled*

<Empty />

::: details Show Code

```vue
<template>
  <Empty />
</template>
```

:::

*预置风格: outlined*

<Empty image="outlined" />

::: details Show Code

```vue
<template>
  <Empty image="outlined" />
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

## 自定义风格

*自定义图片地址、描述内容和样式*

<br/>

<Empty
  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
  :image-style="{
    height: '60px'
  }"
>
  <template #description>
    <span>
      Customize
      <a href="#api">Description</a>
    </span>
  </template>
  <template #footer>
    <Button type="primary">Create Now</Button>
  </template>
</Empty>

::: details Show Code

```vue
<template>
  <Empty
    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
    :image-style="{
      height: '60px'
    }"
  >
    <template #description>
      <span>
        Customize
        <a href="#api">Description</a>
      </span>
    </template>
    <template #footer>
      <Button type="primary">Create Now</Button>
    </template>
  </Empty>
</template>
```

:::

## 插槽自定义

<Empty :image-style="{ height: '48px' }" :description-style="{ color: 'rgb(169, 174, 184)' }">
  <svg
    class="u-svg"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    stroke-width="4"
    stroke-linecap="butt"
    stroke-linejoin="miter"
  >
    <path
      d="M24 5v6m7 1 4-4m-18 4-4-4m28.5 22H28s-1 3-4 3-4-3-4-3H6.5M40 41H8a2 2 0 0 1-2-2v-8.46a2 2 0 0 1 .272-1.007l6.15-10.54A2 2 0 0 1 14.148 18H33.85a2 2 0 0 1 1.728.992l6.149 10.541A2 2 0 0 1 42 30.541V39a2 2 0 0 1-2 2Z"
    ></path>
  </svg>
</Empty>

<style lang="less" scoped>
.u-svg {
  display: inline-block;
  vertical-align: bottom;
  width: 48px;
  height: 48px;
  fill: none;
  stroke: rgb(169, 174, 184);
}
</style>

::: details Show Code

```vue
<template>
  <Empty :image-style="{ height: '48px' }" :description-style="{ color: 'rgb(169, 174, 184)' }">
    <svg
      class="u-svg"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      stroke-linecap="butt"
      stroke-linejoin="miter"
    >
      <path
        d="M24 5v6m7 1 4-4m-18 4-4-4m28.5 22H28s-1 3-4 3-4-3-4-3H6.5M40 41H8a2 2 0 0 1-2-2v-8.46a2 2 0 0 1 .272-1.007l6.15-10.54A2 2 0 0 1 14.148 18H33.85a2 2 0 0 1 1.728.992l6.149 10.541A2 2 0 0 1 42 30.541V39a2 2 0 0 1-2 2Z"
      ></path>
    </svg>
  </Empty>
</template>
<style lang="less" scoped>
.u-svg {
  display: inline-block;
  vertical-align: bottom;
  width: 48px;
  height: 48px;
  fill: none;
  stroke: rgb(169, 174, 184);
}
</style>
```

:::

## APIs

### Empty

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
description | 自定义描述内容 | string &#124; slot | '暂无数据'
descriptionStyle | 设置描述文本的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
image | 显示图片的链接，或者选择两种预置风格图片 | 'filled' &#124; 'outlined' &#124; string &#124; slot  | 'filled'
imageStyle | 设置图片的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
footer | 设置底部内容 | slot | undefined
