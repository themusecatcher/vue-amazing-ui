# 加载中 Spin

<br/>

*用于页面和区块的加载中状态*

## 何时使用

- 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑

<script setup lang="ts">
import { ref } from 'vue'

const tip = ref('加载中...')
const spinning = ref(true)
</script>

## 基本使用

<Spin :spinning="spinning">
  <p class="spin-content">当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。</p>
</Spin>
<br/>
<div class="m-flex">
  <h3 class="u-h3">Loading state: </h3>
  <Switch v-model:checked="spinning" />
</div>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Spin :spinning="spinning">
    <p class="spin-content">当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。</p>
  </Spin>
  <br/>
  <h4>Loading state: <Switch v-model:checked="spinning" /></h4>
</template>
<style lang="less" scoped>
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 16px;
}
</style>
```

:::

## 四分之一圆形指示符

<br/>
<Spin :spinning="spinning" indicator="quarter-circle" />
<br/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Spin :spinning="spinning" indicator="quarter-circle" />
</template>
```

:::

## 四分之三圆形指示符

<br/>
<Spin :spinning="spinning" indicator="three-quarters-circle" />
<br/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Spin :spinning="spinning" indicator="three-quarters-circle" />
</template>
```

:::

## 动态圆形指示符

<br/>
<Spin :spinning="spinning" indicator="dynamic-circle" />
<br/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Spin :spinning="spinning" indicator="dynamic-circle" />
</template>
```

:::

## 自定义描述文案

<br/>
<Spin tip="加载中..." :spinning="spinning" />
<br/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Spin tip="加载中..." :spinning="spinning" />
</template>
```

:::

## 自定义颜色

<Space>
  <Spin class="u-spin" color="#fadb14" :spinning="spinning" />
  <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="quarter-circle" />
  <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="three-quarters-circle" />
  <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="dynamic-circle" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Space>
    <Spin class="u-spin" color="#fadb14" :spinning="spinning" />
    <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="quarter-circle" />
    <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="three-quarters-circle" />
    <Spin class="u-spin" color="#fadb14" :spinning="spinning" indicator="dynamic-circle" />
  </Space>
</template>
<style lang="less" scoped>
.u-spin {
  display: inline-block;
  width: 100px !important;
  height: 100px !important;
}
</style>
```

:::

## 各种大小

<Space direction="vertical">
  <Space>
    <Spin class="u-spin" :spinning="spinning" size="small" />
    <Spin class="u-spin" :spinning="spinning" />
    <Spin class="u-spin" :spinning="spinning" size="large" />
  </Space>
  <Space>
    <Spin class="u-spin" :spinning="spinning" size="small" indicator="quarter-circle" />
    <Spin class="u-spin" :spinning="spinning" indicator="quarter-circle" />
    <Spin class="u-spin" :spinning="spinning" size="large"  indicator="quarter-circle" />
  </Space>
  <Space>
    <Spin class="u-spin" :spinning="spinning" size="small" indicator="three-quarters-circle" />
    <Spin class="u-spin" :spinning="spinning" indicator="three-quarters-circle" />
    <Spin class="u-spin" :spinning="spinning" size="large"  indicator="three-quarters-circle" />
  </Space>
  <Space>
    <Spin class="u-spin" :spinning="spinning" size="small" indicator="dynamic-circle" />
    <Spin class="u-spin" :spinning="spinning" indicator="dynamic-circle" />
    <Spin class="u-spin" :spinning="spinning" size="large"  indicator="dynamic-circle" />
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Space direction="vertical">
    <Space>
      <Spin class="u-spin" :spinning="spinning" size="small" />
      <Spin class="u-spin" :spinning="spinning" />
      <Spin class="u-spin" :spinning="spinning" size="large" />
    </Space>
    <Space>
      <Spin class="u-spin" :spinning="spinning" size="small" indicator="quarter-circle" />
      <Spin class="u-spin" :spinning="spinning" indicator="quarter-circle" />
      <Spin class="u-spin" :spinning="spinning" size="large"  indicator="quarter-circle" />
    </Space>
    <Space>
      <Spin class="u-spin" :spinning="spinning" size="small" indicator="three-quarters-circle" />
      <Spin class="u-spin" :spinning="spinning" indicator="three-quarters-circle" />
      <Spin class="u-spin" :spinning="spinning" size="large"  indicator="three-quarters-circle" />
    </Space>
    <Space>
      <Spin class="u-spin" :spinning="spinning" size="small" indicator="dynamic-circle" />
      <Spin class="u-spin" :spinning="spinning" indicator="dynamic-circle" />
      <Spin class="u-spin" :spinning="spinning" size="large"  indicator="dynamic-circle" />
    </Space>
  </Space>
</template>
<style lang="less" scoped>
.u-spin {
  display: inline-block;
  width: 100px !important;
  height: 100px !important;
}
</style>
```

:::

<style lang="less" scoped>
.m-flex {
  display: flex;
  gap: 12px;
  align-items: center;
}
.u-h3 {
  margin-top: 0 !important;
}
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 16px;
}
.u-spin {
  display: inline-block;
  width: 100px !important;
  height: 100px !important;
}
</style>

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
spinning | 是否为加载中状态 | boolean | true | false
size | 组件大小 | 'small' &#124; 'default' &#124; 'large' | 'default' | false
tip | 描述文案 | string | '' | false
indicator | 加载指示符 | 'dot' &#124; 'quarter-circle' &#124; 'three-quarters-circle' &#124; 'dynamic-circle' | 'dot' | false
color | 主题颜色 | string | '#1677FF' | false
