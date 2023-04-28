# 面包屑 Breadcrumb

显示当前页面在系统层级结构中的位置，并能向上返回

## 何时使用

- 当系统拥有超过两级以上的层级结构时
- 当需要告知用户『你在哪里』时
- 当需要向上导航的功能时

## 基本使用

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
      name: '三级路由三级路由三级路由三级路由三级路由三级路由三级路由'
    }
  ]
</script>

<Breadcrumb :routes="routes" />

<details>
<summary>查看代码</summary>

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
      name: '三级路由三级路由三级路由三级路由三级路由三级路由三级路由'
    }
  ]
</script>
<template>
  <Breadcrumb :routes="routes" />
</template>
```

</details>


## 使用自定义分隔符 ('/')

<Breadcrumb :routes="routes" separator="/" :height="36" />

<details>
<summary>查看代码</summary>

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
      name: '三级路由三级路由三级路由三级路由三级路由三级路由三级路由'
    }
  ]
</script>
<template>
  <Breadcrumb :routes="routes" separator="/" :height="36" />
</template>
```

</details>
