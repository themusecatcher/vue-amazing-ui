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
<h4>Loading state: <Switch v-model:checked="spinning" /></h4>

<details>
<summary>查看代码</summary>

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
<style>
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 16px;
}
</style>
```

</details>

## 圆形加载指示符

<Spin :spinning="spinning" indicator="circle" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const spinning = ref(true)
</script>
<template>
  <Spin :spinning="spinning" indicator="circle" />
</template>
```

</details>

## 自定义描述文案

<Spin tip="加载中..." :spinning="spinning" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const spinning = ref(true)
</script>
<template>
  <Spin tip="加载中..." :spinning="spinning" />
</template>
```

</details>

## 各种大小

<Spin class="u-spin" :spinning="spinning" size="small" />
<Spin class="u-spin" :spinning="spinning" />
<Spin class="u-spin" :spinning="spinning" size="large" />
<Spin class="u-spin" :spinning="spinning" size="small" indicator="circle" />
<Spin class="u-spin" :spinning="spinning" indicator="circle" />
<Spin class="u-spin" :spinning="spinning" size="large"  indicator="circle" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const spinning = ref(true)
</script>
<template>
  <Spin class="u-spin" :spinning="spinning" size="small" />
  <Spin class="u-spin" :spinning="spinning" />
  <Spin class="u-spin" :spinning="spinning" size="large" />
  <Spin class="u-spin" :spinning="spinning" size="small" indicator="circle" />
  <Spin class="u-spin" :spinning="spinning" indicator="circle" />
  <Spin class="u-spin" :spinning="spinning" size="large"  indicator="circle" />
</template>
<style>
.u-spin {
  display: inline-block;
  width: 100px !important;
  height: 100px !important;
}
</style>
```

</details>

<style>
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
