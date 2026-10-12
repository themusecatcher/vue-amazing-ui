# 加载中 Spin

<GlobalElement />

_用于页面和区块的加载中状态_

## 何时使用

- 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑

<script setup lang="ts">
import { h, ref } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
const spinning = ref(true)
// 自定义指示符的两条属性路径：已构造的 VNode 与返回 VNode 的渲染函数（第三条路径为 #indicator 插槽）
function renderCustomIndicator(color: string) {
  return h(LoadingOutlined, { spin: true, style: `font-size: 24px; color: ${color}` })
}
const customIndicatorVNode = renderCustomIndicator('#1677ff')
const customIndicatorFn = () => renderCustomIndicator('#52c41a')
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
const tipSize = ref('middle') // 「自定义描述文案」用例的尺寸
const colorSize = ref('middle') // 「自定义样式」用例的尺寸
// delay 演示：手动切换状态，观察「切换过快时不出现加载效果」
const delaySpinning = ref(false)
const delay = ref(500)
</script>

## 基本使用

<Flex align="center">
  Loading state:<Switch v-model:value="spinning" />
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

## 八点轮 `dot-wheel`

<Spin :spinning="spinning" indicator="dot-wheel">
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
  <Spin :spinning="spinning" indicator="dot-wheel">
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

## 八线轮 `line-wheel`

<Spin :spinning="spinning" indicator="line-wheel">
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
  <Spin :spinning="spinning" indicator="line-wheel">
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

## 圆环 `ring-circle`

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

## 圆环轨道 `ring-rail`

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

## 动态圆环 `dynamic-circle`

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

## 翻转双环 `magic-ring`

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
    <Spin class="spin-size" :spinning="spinning" size="small" indicator="dot-wheel" />
    <Spin class="spin-size" :spinning="spinning" indicator="dot-wheel" />
    <Spin class="spin-size" :spinning="spinning" size="large" indicator="dot-wheel" />
    <Spin class="spin-size" :spinning="spinning" size="small" indicator="line-wheel" />
    <Spin class="spin-size" :spinning="spinning" indicator="line-wheel" />
    <Spin class="spin-size" :spinning="spinning" size="large" indicator="line-wheel" />
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
      <Spin class="spin-size" :spinning="spinning" size="small" indicator="dot-wheel" />
      <Spin class="spin-size" :spinning="spinning" indicator="dot-wheel" />
      <Spin class="spin-size" :spinning="spinning" size="large" indicator="dot-wheel" />
      <Spin class="spin-size" :spinning="spinning" size="small" indicator="line-wheel" />
      <Spin class="spin-size" :spinning="spinning" indicator="line-wheel" />
      <Spin class="spin-size" :spinning="spinning" size="large" indicator="line-wheel" />
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
  <Radio :options="sizeOptions" v-model:value="tipSize" button button-style="solid" />
  <Space>
    <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" />
    <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="dot-wheel" />
    <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="line-wheel" />
    <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="ring-circle" />
    <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="ring-rail" />
    <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="dynamic-circle" />
    <Spin class="spin-item" :size="tipSize" :spinning="spinning" indicator="magic-ring">
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
const tipSize = ref('middle')
</script>
<template>
  <Space vertical>
    <Radio :options="sizeOptions" v-model:value="tipSize" button button-style="solid" />
    <Space>
      <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" />
      <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="dot-wheel" />
      <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="line-wheel" />
      <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="ring-circle" />
      <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="ring-rail" />
      <Spin class="spin-item" :size="tipSize" tip="加载中..." :spinning="spinning" indicator="dynamic-circle" />
      <Spin class="spin-item" :size="tipSize" :spinning="spinning" indicator="magic-ring">
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
  <Radio :options="sizeOptions" v-model:value="colorSize" button button-style="solid" />
  <Space>
    <Spin class="spin-item" :size="colorSize" color="#fadb14" :spinning="spinning" />
    <Spin class="spin-item" :size="colorSize" color="#fadb14" :spinning="spinning" indicator="dot-wheel" />
    <Spin class="spin-item" :size="colorSize" color="#fadb14" :spinning="spinning" indicator="line-wheel" />
    <Spin
      class="spin-item"
      :size="colorSize"
      color="#fadb14"
      :spinning="spinning"
      :spin-circle-percent="50"
      indicator="ring-circle"
    />
    <Spin
      class="spin-item"
      :size="colorSize"
      color="#fadb14"
      :spin-circle-percent="50"
      ring-rail-color="rgba(212, 136, 6, 0.6)"
      :spinning="spinning"
      indicator="ring-rail"
    />
    <Spin class="spin-item" :size="colorSize" color="#fadb14" :spinning="spinning" indicator="dynamic-circle" />
    <Spin
      class="spin-item"
      :size="colorSize"
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
const colorSize = ref('middle')
</script>
<template>
  <Space vertical>
    <Radio :options="sizeOptions" v-model:value="colorSize" button button-style="solid" />
    <Space>
      <Spin class="spin-item" :size="colorSize" color="#fadb14" :spinning="spinning" />
      <Spin class="spin-item" :size="colorSize" color="#fadb14" :spinning="spinning" indicator="dot-wheel" />
      <Spin class="spin-item" :size="colorSize" color="#fadb14" :spinning="spinning" indicator="line-wheel" />
      <Spin
        class="spin-item"
        :size="colorSize"
        color="#fadb14"
        :spinning="spinning"
        :spin-circle-percent="50"
        indicator="ring-circle"
      />
      <Spin
        class="spin-item"
        :size="colorSize"
        color="#fadb14"
        :spin-circle-percent="50"
        ring-rail-color="rgba(212, 136, 6, 0.6)"
        :spinning="spinning"
        indicator="ring-rail"
      />
      <Spin class="spin-item" :size="colorSize" color="#fadb14" :spinning="spinning" indicator="dynamic-circle" />
      <Spin
        class="spin-item"
        :size="colorSize"
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
// 「宽度贴合内容」用例的两行容器：块级 → 宽度即展示区宽度
.spin-fit-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
// 父容器：对齐展示区最大宽度（并作为容器，供内容盒按父容器宽度取比例）
.spin-parent {
  display: flex;
  width: 100%;
  max-width: 100%;
  padding: 12px 8px;
  outline: 1px dashed #d9d9d9;
  container-type: inline-size;
}
// 内容盒宽度 = 父容器内容区宽度的 60%（相对展示区，两行一致）
.spin-parent .spin-content {
  width: 60cqw;
}
.spin-parent-label {
  color: rgba(0, 0, 0, 0.65);
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

## 延迟显示

_打开开关后，加载效果需等 `delay` 时长才出现，从而避免请求过快时闪烁_

<br/>

<Flex align="center"> loading state:<Switch v-model:value="delaySpinning" /> </Flex>

<br />

<Flex align="center"> delay:<InputNumber v-model:value="delay" :min="0" /> ms </Flex>

<br />

<Spin :delay="delay" :spinning="delaySpinning" tip="加载中...">
  <p class="spin-content">
    请求进行中时，此区域会变淡且不可交互；若在这段时间内请求已经结束（再次关闭开关），加载效果不会出现。
  </p>
</Spin>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const delaySpinning = ref(false)
const delay = ref(500)
</script>
<template>
  <Flex align="center"> loading state:<Switch v-model:value="delaySpinning" /> </Flex>
  <br />
  <Flex align="center"> delay:<InputNumber v-model:value="delay" :min="0" /> ms </Flex>
  <br />
  <Spin :delay="delay" :spinning="delaySpinning" tip="加载中...">
    <p class="spin-content">
      请求进行中时，此区域会变淡且不可交互；若在这段时间内请求已经结束（再次关闭开关），加载效果不会出现。
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

::::

## 自定义指示符

_通过 `indicator` 传入 `VNode` 或渲染函数，或用 `#indicator` 插槽，替换内置指示符_

<br/>

<Space>
  <Spin class="spin-item" :spinning="spinning" :indicator="customIndicatorVNode" />
  <Spin class="spin-item" :spinning="spinning" :indicator="customIndicatorFn" />
  <Spin class="spin-item" :spinning="spinning">
    <template #indicator>
      <LoadingOutlined spin style="font-size: 24px; color: #faad14" />
    </template>
  </Spin>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
const spinning = ref(true)
// 自定义指示符的两条属性路径：已构造的 VNode 与返回 VNode 的渲染函数（第三条路径为 #indicator 插槽）
function renderCustomIndicator(color: string) {
  return h(LoadingOutlined, { spin: true, style: `font-size: 24px; color: ${color}` })
}
const customIndicatorVNode = renderCustomIndicator('#1677ff')
const customIndicatorFn = () => renderCustomIndicator('#52c41a')
</script>
<template>
  <Space>
    <Spin class="spin-item" :spinning="spinning" :indicator="customIndicatorVNode" />
    <Spin class="spin-item" :spinning="spinning" :indicator="customIndicatorFn" />
    <Spin class="spin-item" :spinning="spinning">
      <template #indicator>
        <LoadingOutlined spin style="font-size: 24px; color: #faad14" />
      </template>
    </Spin>
  </Space>
</template>
<style lang="less" scoped>
.spin-item {
  width: 100px;
  height: 100px;
}
</style>
```

::::

## 宽度贴合内容

_内容比父容器窄时，`fitContent` 让遮罩与加载效果一起按内容宽度居中；不开启时二者以父容器为基准_

<br/>

<div class="spin-fit-list">
  <span class="spin-parent-label">不开启：遮罩与加载效果以父容器为基准</span>
  <div class="spin-parent">
    <Spin :spinning="spinning">
      <p class="spin-content">内容盒宽度约为父容器的 60%</p>
    </Spin>
  </div>
  <span class="spin-parent-label">开启 <code>fit-content</code>：遮罩与加载效果随内容盒居中</span>
  <div class="spin-parent">
    <Spin fit-content :spinning="spinning">
      <p class="spin-content">内容盒宽度约为父容器的 60%</p>
    </Spin>
  </div>
</div>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <div class="spin-fit-list">
    <span class="spin-parent-label">不开启：遮罩与加载效果以父容器为基准</span>
    <div class="spin-parent">
      <Spin :spinning="spinning">
        <p class="spin-content">内容盒宽度约为父容器的 60%</p>
      </Spin>
    </div>
    <span class="spin-parent-label">开启 <code>fit-content</code>：遮罩与加载效果随内容盒居中</span>
    <div class="spin-parent">
      <Spin fit-content :spinning="spinning">
        <p class="spin-content">内容盒宽度约为父容器的 60%</p>
      </Spin>
    </div>
  </div>
</template>
<style lang="less" scoped>
.spin-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
// 「宽度贴合内容」用例的两行容器：块级 → 宽度即展示区宽度
.spin-fit-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
// 父容器：对齐展示区最大宽度（并作为容器，供内容盒按父容器宽度取比例）
.spin-parent {
  display: flex;
  width: 100%;
  max-width: 100%;
  padding: 12px 8px;
  outline: 1px dashed #d9d9d9;
  container-type: inline-size;
}
// 内容盒宽度 = 父容器内容区宽度的 60%（相对展示区，两行一致）
.spin-parent .spin-content {
  width: 60cqw;
}
.spin-parent-label {
  color: rgba(0, 0, 0, 0.65);
}
</style>
```

::::

## APIs

### Spin

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| spinning | 是否为加载中状态 | boolean | true |
| size | 加载中尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| fitContent | 根节点宽度是否贴合内容宽度（内容比父容器窄时，遮罩与加载效果一起按内容宽度居中）；无内容时不生效 | boolean | false |
| tip | 描述文案 | string | undefined |
| delay | 延迟显示加载效果的时间（`ms`）；`0` 表示不延迟，可避免请求过快时 `loading` 一闪而过；仅在显示方向生效，隐藏始终立即 | number | 0 |
| indicator | 加载指示符：7 种内置枚举（`dot` 四点闪烁 / `dot-wheel` 八点轮 / `line-wheel` 八线轮 / `ring-circle` 圆环 / `ring-rail` 圆环轨道 / `dynamic-circle` 动态圆环 / `magic-ring` 翻转双环）/ 也可传入 `VNode` 或渲染函数自定义（插槽形态请用 `#indicator`）/ 传 `null` 时不渲染 | 'dot' &#124; 'dot-wheel' &#124; 'line-wheel' &#124; 'ring-circle' &#124; 'ring-rail' &#124; 'dynamic-circle' &#124; 'magic-ring' &#124; VNode &#124; (() => VNode) &#124; null | 'dot' |
| color | 指示符颜色；`indicator` 为 `magic-ring` 时表示外环颜色 | string | undefined |
| spinCircleWidth | 圆环宽度（指示符宽度的百分比；`magic-ring` 收敛到 `1～26` 以保证内环仍呈环形）；仅 `ring-circle` / `ring-rail` / `magic-ring` 生效 | number | undefined（`ring-circle` / `ring-rail` 取 `12`、`magic-ring` 取 `13`） |
| spinCirclePercent | 圆环弧长（`0～100`，圆环周长的百分比）；仅 `ring-circle` / `ring-rail` 生效 | number | 33 |
| ringRailColor | 圆环轨道颜色；仅 `ring-rail` 生效 | string | 'rgba(0, 0, 0, 0.12)' |
| magicRingColor | 内环颜色；仅 `magic-ring` 生效 | string | undefined |
| rotate | 出现时是否整体旋转一圈；仅 `dot-wheel` / `line-wheel` 生效 | boolean | false |
| speed | 动画周期（`ms`），值越小越快：`dot-wheel` / `line-wheel` 为亮度扫过一圈、`magic-ring` 为翻面一圈；仅 `dot-wheel` / `line-wheel` / `magic-ring` 生效 | number | undefined（`dot-wheel` / `line-wheel` 取 `800`、`magic-ring` 取 `1500`） |

## Slots

| 名称      | 说明           | 用法             |
| :-------- | :------------- | :--------------- |
| tip       | 自定义描述文案 | v-slot:tip       |
| indicator | 自定义指示符   | v-slot:indicator |
| default   | 自定义内容     | v-slot:default   |
