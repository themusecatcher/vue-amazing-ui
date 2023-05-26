# 空状态 Empty

<br/>

*空状态时的展示占位图*

## 何时使用

- 当没有数据时，用于显式的用户提示

## 基本使用

**预置风格1**

<Empty />

<details>
<summary>查看代码</summary>

```vue
<template>
  <Empty />
</template>
```

</details>

<br/>

**预置风格2**

<Empty image="2" />

<details>
<summary>查看代码</summary>

```vue
<template>
  <Empty image="2" />
</template>
```

</details>

## 无描述

<Empty :description="null" />

<details>
<summary>查看代码</summary>

```vue
<template>
  <Empty :description="null" />
</template>
```

</details>

## 自定义图片地址、描述内容和样式

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

<details>
<summary>查看代码</summary>

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

</details>

## APIs

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
name |  |  |

## Events

事件名称 | 说明 | 参数
-- | -- | --
change |  |
