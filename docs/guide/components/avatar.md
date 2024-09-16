# 头像 Avatar

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*用来代表用户或事物，支持图片、图标或字符展示*

<script setup lang="ts">
import { h } from 'vue'
import { UserOutlined, TeamOutlined, SketchOutlined } from '@ant-design/icons-vue'
</script>

## 基本使用

*三种尺寸，两种形状*

<br/>

<Space vertical>
  <Space align="center">
    <Avatar :size="64">
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
    <Avatar size="large">
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
    <Avatar>
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
    <Avatar size="small">
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
  </Space>
  <Space align="center">
    <Avatar shape="square" :size="64">
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
    <Avatar shape="square" size="large">
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
    <Avatar shape="square">
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
    <Avatar shape="square" size="small">
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Space vertical>
    <Space align="center">
      <Avatar :size="64">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
      <Avatar size="large">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
      <Avatar>
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
      <Avatar size="small">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
    </Space>
    <Space align="center">
      <Avatar shape="square" :size="64">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
      <Avatar shape="square" size="large">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
      <Avatar shape="square">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
      <Avatar shape="square" size="small">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
    </Space>
  </Space>
</template>
```

:::

## 自定义图标类型

<Space align="center">
  <Avatar :icon="() => h(TeamOutlined)" />
  <Avatar>
    <template #icon>
      <UserOutlined />
    </template>
  </Avatar>
  <Avatar>U</Avatar>
  <Avatar :size="40">USER</Avatar>
  <Avatar :size="40" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
  <Avatar style="color: #f56a00; background-color: #fde3cf">U</Avatar>
  <Avatar style="background-color: #87d068">
    <template #icon>
      <UserOutlined />
    </template>
  </Avatar>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { UserOutlined, TeamOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Space align="center">
    <Avatar :icon="() => h(TeamOutlined)" />
    <Avatar>
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
    <Avatar>U</Avatar>
    <Avatar :size="40">USER</Avatar>
    <Avatar :size="40" src="https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.5/1.jpg" />
    <Avatar style="color: #f56a00; background-color: #fde3cf">U</Avatar>
    <Avatar style="background-color: #87d068">
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
  </Space>
</template>
```

:::

## 带徽标的头像

<Space>
  <Badge :count="1">
    <Avatar shape="square">
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
  </Badge>
  <Badge dot>
    <Avatar shape="square">
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
  </Badge>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Space>
    <Badge :count="1">
      <Avatar shape="square">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
    </Badge>
    <Badge dot>
      <Avatar shape="square">
        <template #icon>
          <UserOutlined />
        </template>
      </Avatar>
    </Badge>
  </Space>
</template>
```

:::

## 响应式尺寸

<Avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">
  <template #icon>
    <SketchOutlined />
  </template>
</Avatar>

::: details Show Code

```vue
<script setup lang="ts">
import { SketchOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">
    <template #icon>
      <SketchOutlined />
    </template>
  </Avatar>
</template>
```

:::

## APIs

### Avatar

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
shape | 指定头像的形状 | 'circle' &#124; 'square' | 'circle'
size | 设置头像的大小，`number`类型时单位 `px` | number &#124; 'small' &#124; 'default' &#124; 'large' &#124; [Responsive](#responsive-type) | 'default'
src | 图片类头像资源地址 | string | undefined
alt | 图片无法显示时的替代文本 | string | undefined
icon | 设置头像的图标 | VNode &#124; slot | undefined

### Responsive Type

名称 | 说明 | 类型 | 默认值
-- | -- | -- | --
xs | `<576px` 响应式栅格 | number | undefined
sm | `≥576px` 响应式栅格 | number | undefined
md | `≥768px` 响应式栅格 | number | undefined
lg | `≥992px` 响应式栅格 | number | undefined
xl | `≥1200px` 响应式栅格 | number | undefined
xxl | `≥1600px` 响应式栅格 | number | undefined
