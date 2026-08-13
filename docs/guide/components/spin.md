# 加载中 Spin

<GlobalElement />

_用于页面和区块的加载中状态_

## 何时使用

- 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑

<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref('middle')
</script>

## 基本使用

<Flex align="center">
  Loading state:<Switch v-model="spinning" />
</Flex>

<br/>

<Spin :spinning="spinning">
  <p class="spin-content">
    当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。
  </p>
</Spin>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Spin :spinning="spinning">
    <p class="spin-content">
      当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
      描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
      描述文案一起水平垂直居中。
    </p>
  </Spin>
</template>
<style lang="less" scoped>
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  border-radius: 6px;
  background-color: #e6f7ff;
  padding: 16px;
}
</style>
```

:::

## 旋转的点

<Spin :spinning="spinning" indicator="spin-dot">
  <p class="spin-content">
    当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。
  </p>
</Spin>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Spin :spinning="spinning" indicator="spin-dot">
    <p class="spin-content">
      当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
      描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
      描述文案一起水平垂直居中。
    </p>
  </Spin>
</template>
<style lang="less" scoped>
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  border-radius: 6px;
  background-color: #e6f7ff;
  padding: 16px;
}
</style>
```

:::

## 旋转的线

<Spin :spinning="spinning" indicator="spin-line">
  <p class="spin-content">
    当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。
  </p>
</Spin>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Spin :spinning="spinning" indicator="spin-line">
    <p class="spin-content">
      当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
      描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
      描述文案一起水平垂直居中。
    </p>
  </Spin>
</template>
<style lang="less" scoped>
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  border-radius: 6px;
  background-color: #e6f7ff;
  padding: 16px;
}
</style>
```

:::

## 圆环指示符

<Spin :spinning="spinning" indicator="ring-circle">
  <p class="spin-content">
    当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。
  </p>
</Spin>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Spin :spinning="spinning" indicator="ring-circle">
    <p class="spin-content">
      当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
      描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
      描述文案一起水平垂直居中。
    </p>
  </Spin>
</template>
<style lang="less" scoped>
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  border-radius: 6px;
  background-color: #e6f7ff;
  padding: 16px;
}
</style>
```

:::

## 圆环轨道指示符

<Spin :spinning="spinning" indicator="ring-rail">
  <p class="spin-content">
    当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
    描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
    描述文案一起水平垂直居中。
  </p>
</Spin>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Spin :spinning="spinning" indicator="ring-rail">
    <p class="spin-content">
      当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
      描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
      描述文案一起水平垂直居中。
    </p>
  </Spin>
</template>
<style lang="less" scoped>
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  border-radius: 6px;
  background-color: #e6f7ff;
  padding: 16px;
}
</style>
```

:::

## 动态圆环指示符

<Spin :spinning="spinning" indicator="dynamic-circle">
  <p class="spin-content">
    当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。
  </p>
</Spin>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Spin :spinning="spinning" indicator="dynamic-circle">
    <p class="spin-content">
      当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
      描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
      描述文案一起水平垂直居中。
    </p>
  </Spin>
</template>
<style lang="less" scoped>
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  border-radius: 6px;
  background-color: #e6f7ff;
  padding: 16px;
}
</style>
```

:::

## 双圆环指示符

<Spin :spinning="spinning" indicator="magic-ring">
  <p class="spin-content">
    当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip 描述文案一起水平垂直居中。
  </p>
</Spin>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Spin :spinning="spinning" indicator="magic-ring">
    <p class="spin-content">
      当 spinning 为 false 时，不显示 loading 状态；当 spinning 为 true 时，显示 loading 效果；如果不设置 tip
      描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
      描述文案一起水平垂直居中。
    </p>
  </Spin>
</template>
<style lang="less" scoped>
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  border-radius: 6px;
  background-color: #e6f7ff;
  padding: 16px;
}
</style>
```

:::

## 各种大小

<Space vertical>
  <Space>
    <Spin class="spin-size" :spinning="spinning" size="small" />
    <Spin class="spin-size" :spinning="spinning" />
    <Spin class="spin-size" :spinning="spinning" size="large" />
    <Spin class="spin-size" :spinning="spinning" size="small" indicator="spin-dot" />
    <Spin class="spin-size" :spinning="spinning" indicator="spin-dot" />
    <Spin class="spin-size" :spinning="spinning" size="large" indicator="spin-dot" />
    <Spin class="spin-size" :spinning="spinning" size="small" indicator="spin-line" />
    <Spin class="spin-size" :spinning="spinning" indicator="spin-line" />
    <Spin class="spin-size" :spinning="spinning" size="large" indicator="spin-line" />
    <Spin class="spin-size" :spinning="spinning" size="small" indicator="ring-circle" />
    <Spin class="spin-size" :spinning="spinning" indicator="ring-circle" />
    <Spin class="spin-size" :spinning="spinning" size="large" indicator="ring-circle" />
    <Spin class="spin-size" :spinning="spinning" size="small" indicator="ring-rail" />
    <Spin class="spin-size" :spinning="spinning" indicator="ring-rail" />
    <Spin class="spin-size" :spinning="spinning" size="large" indicator="ring-rail" />
    <Spin class="spin-size" :spinning="spinning" size="small" indicator="dynamic-circle" />
    <Spin class="spin-size" :spinning="spinning" indicator="dynamic-circle" />
    <Spin class="spin-size" :spinning="spinning" size="large" indicator="dynamic-circle" />
    <Spin class="spin-size" :spinning="spinning" size="small" indicator="magic-ring" />
    <Spin class="spin-size" :spinning="spinning" indicator="magic-ring" />
    <Spin class="spin-size" :spinning="spinning" size="large" indicator="magic-ring" />
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Space vertical>
    <Space>
      <Spin class="spin-size" :spinning="spinning" size="small" />
      <Spin class="spin-size" :spinning="spinning" />
      <Spin class="spin-size" :spinning="spinning" size="large" />
      <Spin class="spin-size" :spinning="spinning" size="small" indicator="spin-dot" />
      <Spin class="spin-size" :spinning="spinning" indicator="spin-dot" />
      <Spin class="spin-size" :spinning="spinning" size="large" indicator="spin-dot" />
      <Spin class="spin-size" :spinning="spinning" size="small" indicator="spin-line" />
      <Spin class="spin-size" :spinning="spinning" indicator="spin-line" />
      <Spin class="spin-size" :spinning="spinning" size="large" indicator="spin-line" />
      <Spin class="spin-size" :spinning="spinning" size="small" indicator="ring-circle" />
      <Spin class="spin-size" :spinning="spinning" indicator="ring-circle" />
      <Spin class="spin-size" :spinning="spinning" size="large" indicator="ring-circle" />
      <Spin class="spin-size" :spinning="spinning" size="small" indicator="ring-rail" />
      <Spin class="spin-size" :spinning="spinning" indicator="ring-rail" />
      <Spin class="spin-size" :spinning="spinning" size="large" indicator="ring-rail" />
      <Spin class="spin-size" :spinning="spinning" size="small" indicator="dynamic-circle" />
      <Spin class="spin-size" :spinning="spinning" indicator="dynamic-circle" />
      <Spin class="spin-size" :spinning="spinning" size="large" indicator="dynamic-circle" />
      <Spin class="spin-size" :spinning="spinning" size="small" indicator="magic-ring" />
      <Spin class="spin-size" :spinning="spinning" indicator="magic-ring" />
      <Spin class="spin-size" :spinning="spinning" size="large" indicator="magic-ring" />
    </Space>
  </Space>
</template>
<style lang="less" scoped>
.spin-size {
  width: 100px;
  height: 100px;
}
</style>
```

:::

## 自定义描述文案

<Space vertical>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Space>
    <Spin class="spin-item" :size="size" tip="加载中..." :spinning="spinning" />
    <Spin class="spin-item" :size="size" tip="加载中..." :spinning="spinning" indicator="spin-dot" />
    <Spin class="spin-item" :size="size" tip="加载中..." :spinning="spinning" indicator="spin-line" />
    <Spin class="spin-item" :size="size" tip="加载中..." :spinning="spinning" indicator="ring-circle" />
    <Spin class="spin-item" :size="size" tip="加载中..." :spinning="spinning" indicator="ring-rail" />
    <Spin class="spin-item" :size="size" tip="加载中..." :spinning="spinning" indicator="dynamic-circle" />
    <Spin class="spin-item" :size="size" :spinning="spinning" indicator="magic-ring">
      <template #tip>加载中...</template>
    </Spin>
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref('middle')
</script>
<template>
  <Space vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Space>
      <Spin class="spin-item" :size="size" tip="加载中..." :spinning="spinning" />
      <Spin class="spin-item" :size="size" tip="加载中..." :spinning="spinning" indicator="spin-dot" />
      <Spin class="spin-item" :size="size" tip="加载中..." :spinning="spinning" indicator="spin-line" />
      <Spin class="spin-item" :size="size" tip="加载中..." :spinning="spinning" indicator="ring-circle" />
      <Spin class="spin-item" :size="size" tip="加载中..." :spinning="spinning" indicator="ring-rail" />
      <Spin class="spin-item" :size="size" tip="加载中..." :spinning="spinning" indicator="dynamic-circle" />
      <Spin class="spin-item" :size="size" :spinning="spinning" indicator="magic-ring">
        <template #tip>加载中...</template>
      </Spin>
    </Space>
  </Space>
</template>
<style lang="less" scoped>
.spin-item {
  width: 100px !important;
  height: 100px !important;
}
</style>
```

:::

## 自定义样式

<Space vertical>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Space>
    <Spin class="spin-item" :size="size" color="#fadb14" :spinning="spinning" />
    <Spin class="spin-item" :size="size" color="#fadb14" :spinning="spinning" indicator="spin-dot" />
    <Spin class="spin-item" :size="size" color="#fadb14" :spinning="spinning" indicator="spin-line" />
    <Spin
      class="spin-item"
      :size="size"
      color="#fadb14"
      :spinning="spinning"
      :spin-circle-percent="50"
      indicator="ring-circle"
    />
    <Spin
      class="spin-item"
      :size="size"
      color="#fadb14"
      :spin-circle-percent="50"
      ring-rail-color="rgba(212, 136, 6, 0.6)"
      :spinning="spinning"
      indicator="ring-rail"
    />
    <Spin class="spin-item" :size="size" color="#fadb14" :spinning="spinning" indicator="dynamic-circle" />
    <Spin
      class="spin-item"
      :size="size"
      color="#fadb14"
      magic-ring-color="#ffe58f"
      :spinning="spinning"
      indicator="magic-ring"
    />
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref('middle')
</script>
<template>
  <Space vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Space>
      <Spin class="spin-item" :size="size" color="#fadb14" :spinning="spinning" />
      <Spin class="spin-item" :size="size" color="#fadb14" :spinning="spinning" indicator="spin-dot" />
      <Spin class="spin-item" :size="size" color="#fadb14" :spinning="spinning" indicator="spin-line" />
      <Spin
        class="spin-item"
        :size="size"
        color="#fadb14"
        :spinning="spinning"
        :spin-circle-percent="50"
        indicator="ring-circle"
      />
      <Spin
        class="spin-item"
        :size="size"
        color="#fadb14"
        :spin-circle-percent="50"
        ring-rail-color="rgba(212, 136, 6, 0.6)"
        :spinning="spinning"
        indicator="ring-rail"
      />
      <Spin class="spin-item" :size="size" color="#fadb14" :spinning="spinning" indicator="dynamic-circle" />
      <Spin
        class="spin-item"
        :size="size"
        color="#fadb14"
        magic-ring-color="#ffe58f"
        :spinning="spinning"
        indicator="magic-ring"
      />
    </Space>
  </Space>
</template>
<style lang="less" scoped>
.spin-item {
  width: 100px;
  height: 100px;
}
</style>
```

:::

<style lang="less" scoped>
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
.spin-item {
  width: 100px;
  height: 100px;
}
.spin-size {
  width: 100px;
  height: 100px;
}
</style>

## APIs

### Spin

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| spinning | 是否为加载中状态 | boolean | true |
| size | 加载中尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| tip | 描述文案 | string &#124; slot | undefined |
| indicator | 加载指示符 | 'dot' &#124; 'spin-dot' &#124; 'spin-line' &#124; 'ring-circle' &#124; 'ring-rail' &#124; 'dynamic-circle' &#124; 'magic-ring' | 'dot' |
| color | 指示符颜色，当 `indicator: 'magic-ring'` 时为外环颜色 | string | undefined |
| spinCircleWidth | 圆环宽度，单位是加载指示符宽度的百分比，仅当 `indicator: 'ring-circle' \| 'ring-rail'` 时生效 | number | 12 |
| spinCirclePercent | 圆环长度百分比 (`0～100`)，单位是圆环周长的百分比，仅当 `indicator: 'ring-circle' \| 'ring-rail'` 时生效 | number | 33 |
| ringRailColor | 圆环轨道颜色，仅当 `indicator: 'ring-rail'` 时生效 | string | 'rgba(0, 0, 0, 0.12)' |
| magicRingColor | 内环颜色，仅当 `indicator: 'magic-ring'` 时生效 | string | undefined |
| rotate | `spin-dot` 或 `spin-line` 初始是否旋转，仅当 `indicator: 'spin-dot' \| 'spin-line'` 时生效 | boolean | false |
| speed | `spin-dot` 或 `spin-line` 渐变旋转的动画速度，单位 `ms`，仅当 `indicator: 'spin-dot' \| 'spin-line'` 时生效 | number | 800 |

## Slots

| 名称    | 说明           | 类型           |
| :------ | :------------- | :------------- |
| tip     | 自定义描述文案 | v-slot:tip     |
| default | 自定义内容     | v-slot:default |
