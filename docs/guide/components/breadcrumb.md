# 面包屑 Breadcrumb

<GlobalElement />

*显示当前页面在系统层级结构中的位置，并能向上返回*

## 何时使用

- 当系统拥有超过两级以上的层级结构时
- 当需要告知用户『你在哪里』时
- 当需要向上导航的功能时

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRightOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'
import type { BreadcrumbRoute } from 'vue-amazing-ui'
const routes = ref<BreadcrumbRoute[]>([
  {
    name: '一级路由',
    path: '/first'
  },
  {
    name: '二级路由',
    path: '/second',
    query: { id: 1, tab: 2 }
  },
  {
    name: '三级路由'
  }
])
const longNameRoutes = ref<BreadcrumbRoute[]>([
  {
    name: '一级路由'
  },
  {
    name: '二级路由',
    path: '/second',
    query: { id: 1, tab: 2 }
  },
  {
    name: '我是一个名字超长的三级路由'
  }
])
const customStyle = {
  '--breadcrumb-color': 'rgba(0, 0, 0, 0.65)',
  '--breadcrumb-bg-color-hover': 'rgba(0, 0, 0, 0.1)',
  '--breadcrumb-color-hover': '#ff6900',
  '--breadcrumb-color-active': '#ff6900',
  '--breadcrumb-padding': '4px 8px',
  '--breadcrumb-border-radius': '8px',
  '--breadcrumb-separator-color': 'rgba(0, 0, 0, 0.65)'
}
</script>

## 基本使用

<Breadcrumb :routes="routes" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { BreadcrumbRoute } from 'vue-amazing-ui'
const routes = ref<BreadcrumbRoute[]>([
  {
    name: '一级路由',
    path: '/first'
  },
  {
    name: '二级路由',
    path: '/second',
    query: { id: 1, tab: 2 }
  },
  {
    name: '三级路由'
  }
])
</script>
<template>
  <Breadcrumb :routes="routes" />
</template>
```

:::

## 自定义分隔符

<Flex vertical>
  <Breadcrumb :routes="routes" separator="/" />
  <Breadcrumb :routes="routes">
    <template #separator>
      <ArrowRightOutlined />
    </template>
  </Breadcrumb>
  <Breadcrumb :routes="routes">
    <template #separator>
      <DoubleRightOutlined />
    </template>
  </Breadcrumb>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRightOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'
import type { BreadcrumbRoute } from 'vue-amazing-ui'
const routes = ref<BreadcrumbRoute[]>([
  {
    name: '一级路由',
    path: '/first'
  },
  {
    name: '二级路由',
    path: '/second',
    query: { id: 1, tab: 2 }
  },
  {
    name: '三级路由'
  }
])
</script>
<template>
  <Flex vertical>
    <Breadcrumb :routes="routes" separator="/" />
    <Breadcrumb :routes="routes">
      <template #separator>
        <ArrowRightOutlined />
      </template>
    </Breadcrumb>
    <Breadcrumb :routes="routes">
      <template #separator>
        <DoubleRightOutlined />
      </template>
    </Breadcrumb>
  </Flex>
</template>
```

:::

## 自定义样式

<Flex vertical>
  <Breadcrumb
    :routes="longNameRoutes"
    breadcrumb-class="custom-breadcrumb-class"
    :max-width="210"
    :style="customStyle"
  />
  <Breadcrumb
    :routes="longNameRoutes"
    :max-width="210"
    :breadcrumb-style="{ fontSize: '20px' }"
    :style="customStyle"
  />
  <Breadcrumb
    :routes="longNameRoutes"
    :breadcrumb-style="{ fontSize: '20px', height: '40px' }"
    :separator-style="{ fontSize: '18px' }"
    :max-width="210"
  />
  <Breadcrumb
    :routes="longNameRoutes"
    :breadcrumb-style="{ fontSize: '20px', height: '40px' }"
    :separator-style="{ fontSize: '18px' }"
    :max-width="210"
  >
    <template #separator>
      <ArrowRightOutlined />
    </template>
  </Breadcrumb>
  <Breadcrumb
    :routes="longNameRoutes"
    :breadcrumb-style="{ fontSize: '20px', height: '40px' }"
    :separator-style="{ fontSize: '18px' }"
    :max-width="210"
  >
    <template #separator="{ index }">
      <ArrowRightOutlined v-if="index === 0" />
      <DoubleRightOutlined v-if="index === 1" />
    </template>
  </Breadcrumb>
</Flex>

<style lang="less" scoped>
.custom-breadcrumb-class {
  font-size: 20px;
  color: #1677ff;
  height: 40px;
  :deep(.breadcrumb-item) {
    .breadcrumb-link {
      color: rgba(22, 119, 255, 0.72);
      padding: 0 8px;
      border-radius: 8px;
    }
    .link-hover {
      &:hover {
        color: #fff;
        background: #4096ff;
      }
    }
    .link-active {
      color: #1677ff;
    }
    .breadcrumb-separator {
      color: rgba(22, 119, 255, 0.72);
    }
  }
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRightOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'
import type { BreadcrumbRoute } from 'vue-amazing-ui'
const longNameRoutes = ref<BreadcrumbRoute[]>([
  {
    name: '一级路由'
  },
  {
    name: '二级路由',
    path: '/second',
    query: { id: 1, tab: 2 }
  },
  {
    name: '我是一个名字超长的三级路由'
  }
])
const customStyle = {
  '--breadcrumb-color': 'rgba(0, 0, 0, 0.65)',
  '--breadcrumb-bg-color-hover': 'rgba(0, 0, 0, 0.1)',
  '--breadcrumb-color-hover': '#ff6900',
  '--breadcrumb-color-active': '#ff6900',
  '--breadcrumb-padding': '4px 8px',
  '--breadcrumb-border-radius': '8px',
  '--breadcrumb-separator-color': 'rgba(0, 0, 0, 0.65)'
}
</script>
<template>
  <Flex vertical>
    <Breadcrumb
      :routes="longNameRoutes"
      breadcrumb-class="custom-breadcrumb-class"
      :max-width="210"
      :style="customStyle"
    />
    <Breadcrumb
      :routes="longNameRoutes"
      :max-width="210"
      :breadcrumb-style="{ fontSize: '20px' }"
      :style="customStyle"
    />
    <Breadcrumb
      :routes="longNameRoutes"
      :breadcrumb-style="{ fontSize: '20px', height: '40px' }"
      :separator-style="{ fontSize: '18px' }"
      :max-width="210"
    />
    <Breadcrumb
      :routes="longNameRoutes"
      :breadcrumb-style="{ fontSize: '20px', height: '40px' }"
      :separator-style="{ fontSize: '18px' }"
      :max-width="210"
    >
      <template #separator>
        <ArrowRightOutlined />
      </template>
    </Breadcrumb>
    <Breadcrumb
      :routes="longNameRoutes"
      :breadcrumb-style="{ fontSize: '20px', height: '40px' }"
      :separator-style="{ fontSize: '18px' }"
      :max-width="210"
    >
      <template #separator="{ index }">
        <ArrowRightOutlined v-if="index === 0" />
        <DoubleRightOutlined v-if="index === 1" />
      </template>
    </Breadcrumb>
  </Flex>
</template>
<style lang="less" scoped>
.custom-breadcrumb-class {
  font-size: 20px;
  color: #1677ff;
  height: 40px;
  :deep(.breadcrumb-item) {
    .breadcrumb-link {
      color: rgba(22, 119, 255, 0.72);
      padding: 0 8px;
      border-radius: 8px;
    }
    .link-hover {
      &:hover {
        color: #fff;
        background: #4096ff;
      }
    }
    .link-active {
      color: #1677ff;
    }
    .breadcrumb-separator {
      color: rgba(22, 119, 255, 0.72);
    }
  }
}
</style>
```

:::

## 新页面打开目标链接

<Breadcrumb :routes="routes" target="_blank" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { BreadcrumbRoute } from 'vue-amazing-ui'
const routes = ref<BreadcrumbRoute[]>([
  {
    name: '一级路由',
    path: '/first'
  },
  {
    name: '二级路由',
    path: '/second',
    query: { id: 1, tab: 2 }
  },
  {
    name: '三级路由'
  }
])
</script>
<template>
  <Breadcrumb :routes="routes" target="_blank" />
</template>
```

:::

## APIs

### Breadcrumb

参数 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
routes | 路由数组 | [Route](#route-type)[] | []
breadcrumbClass | 设置面包屑类名 | string | undefined
breadcrumbStyle | 设置面包屑样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
maxWidth | 设置文本最大显示宽度，超出后显示省略号，单位 `px` | string &#124; number | '100%'
separator | 自定义分隔符，默认为 `>` | string &#124; slot | undefined
separatorStyle | 设置分隔符样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {}
target | 如何打开目标URL | '_self' &#124; '_blank' | '_self'

### Route Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
name | 路由名称 | string | undefined
path? | 路由地址 | string | undefined
query? | 路由查询参数 | [Query](#query-type) | undefined

### Query Type

名称 | 说明 | 类型 | 默认值
:-- | :-- | :-- | :--
[propName: string] | 用于包含带有任意数量的其他属性 | any  | undefined

## Slots

名称 | 说明 | 类型
:-- | :-- | :--
separator | 自定义分隔符 | v-slot:separator="{ route, index }"
