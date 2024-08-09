# 面包屑 Breadcrumb

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

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

### Breadcrumb

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
routes | 路由数组 | [Route](#route-type)[] | []
fontSize | 字体大小，单位 `px` | number | 14
height | 面包屑高度 | number | 36
maxWidth | 文本最大显示宽度，超出后显示省略号，单位 `px` | number | 180
separator | 分隔符，默认 '' 时为箭头 | string | undefined
target | 如何打开目标URL | '_self' &#124; '_blank' | '_self'

### Route Type

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
path | 路由地址 | string | undefined
query? | 路由查询参数 | [Query](#query-type) | undefined
name | 路由名称 | string | undefined

### Query Type

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
[propName: string] | 用于包含带有任意数量的其他属性 | any  | undefined
