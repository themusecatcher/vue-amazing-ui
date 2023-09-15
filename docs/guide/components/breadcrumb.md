# 面包屑 Breadcrumb<BackTop />

<br/>

*显示当前页面在系统层级结构中的位置，并能向上返回*

## 何时使用

- 当系统拥有超过两级以上的层级结构时
- 当需要告知用户『你在哪里』时
- 当需要向上导航的功能时

<script setup lang="ts">
const routes = [
    {
      path: '/first', // 路由地址
      query: { id: 1, tab: 2 }, // 路由参数
      name: '一级路由' // 路由名称
    },
    {
      path: '/second',
      name: '二级路由'
    },
    {
      path: '/third',
      name: '三级路由三级路由三级路由三级路由'
    }
  ]
</script>

## 基本使用

<Breadcrumb :routes="routes" />

::: details Show Code

```vue
<script setup lang="ts">
const routes = [
    {
      path: '/first', // 路由地址
      query: { id: 1, tab: 2 }, // 路由参数
      name: '一级路由' // 路由名称
    },
    {
      path: '/second',
      name: '二级路由'
    },
    {
      path: '/third',
      name: '三级路由三级路由三级路由三级路由'
    }
  ]
</script>
<template>
  <Breadcrumb :routes="routes" />
</template>
```

:::

## 自定义分隔符

<Breadcrumb :routes="routes" separator="/" />

::: details Show Code

```vue
<script setup lang="ts">
const routes = [
    {
      path: '/first', // 路由地址
      query: { id: 1, tab: 2 }, // 路由参数
      name: '一级路由' // 路由名称
    },
    {
      path: '/second',
      name: '二级路由'
    },
    {
      path: '/third',
      name: '三级路由三级路由三级路由三级路由'
    }
  ]
</script>
<template>
  <Breadcrumb :routes="routes" separator="/" />
</template>
```

:::

## 自定义样式

<Breadcrumb :routes="routes" :font-size="16" :height="32" />

::: details Show Code

```vue
<script setup lang="ts">
const routes = [
    {
      path: '/first', // 路由地址
      query: { id: 1, tab: 2 }, // 路由参数
      name: '一级路由' // 路由名称
    },
    {
      path: '/second',
      name: '二级路由'
    },
    {
      path: '/third',
      name: '三级路由三级路由三级路由三级路由三级路由'
    }
  ]
</script>
<template>
  <Breadcrumb :routes="routes" :font-size="16" :height="32" />
</template>
```

:::

## 新页面打开目标链接

<Breadcrumb :routes="routes" target="_blank" />

::: details Show Code

```vue
<script setup lang="ts">
const routes = [
    {
      path: '/first', // 路由地址
      query: { id: 1, tab: 2 }, // 路由参数
      name: '一级路由' // 路由名称
    },
    {
      path: '/second',
      name: '二级路由'
    },
    {
      path: '/third',
      name: '三级路由三级路由三级路由三级路由'
    }
  ]
</script>
<template>
  <Breadcrumb :routes="routes" target="_blank" />
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
routes | 路由数组 | Route[] | [] | true
fontSize | 字体大小，单位px | number | 14 | false
height | 面包屑高度 | number | 36 | false
maxWidth | 文本最大显示宽度，超出后显示省略号，单位px | number | 180 | false
separator | 分隔符，默认 '' 时为箭头 | string | '' | false
target | 如何打开目标URL | '_self' &#124; '_blank' | '_self' | false

## Route Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
path | 路由地址 | string | true
query | 路由查询参数 | [propName: string]: any | false
name | 路由名称 | string | true
