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
// 「动画速度、环宽与配色」用例：参数与加载状态独立，便于逐个参数核对
const rotateSpinning = ref(true)
const speed = ref(800)
const circleWidth = ref(13)
const color = ref('#1677ff')
const ringColor = ref('#0958d9')
const rotate = ref(false)
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

## 八点轮

_`indicator` 取值 `dot-wheel`_

<br/>

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

## 八线轮

_`indicator` 取值 `line-wheel`_

<br/>

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

## 圆环

_`indicator` 取值 `ring-circle`_

<br/>

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

## 圆环轨道

_`indicator` 取值 `ring-rail`_

<br/>

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

## 动态圆环

_`indicator` 取值 `dynamic-circle`_

<br/>

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

## 翻转双环

_`indicator` 取值 `magic-ring`_

<br/>

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
  <RadioGroup :options="sizeOptions" v-model:value="tipSize" option-type="button" button-style="solid" />
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
    <RadioGroup :options="sizeOptions" v-model:value="tipSize" option-type="button" button-style="solid" />
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
// 叠加组件根类名提高特异性：组件根节点为 width / height 100%，同特异性下会随样式注入顺序反转
div.spin-wrap.spin-item {
  width: 100px;
  height: 100px;
}
</style>
```

:::

## 自定义样式

<Space vertical>
  <RadioGroup :options="sizeOptions" v-model:value="colorSize" option-type="button" button-style="solid" />
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
    <RadioGroup :options="sizeOptions" v-model:value="colorSize" option-type="button" button-style="solid" />
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
// 叠加组件根类名提高特异性：组件根节点为 width / height 100%，同特异性下会随样式注入顺序反转
div.spin-wrap.spin-item {
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
// 「宽度贴合内容」用例的父容器：宽度即展示区宽度，虚线框标示遮罩居中基准
// 内容盒不声明宽度、由文案撑开（.spin-content 为 inline-block）；若写成百分比，会与 fitContent
// 收缩后的根节点互相引用而塌陷（实测 80% 会塌成「80% × 内容宽度」）
.spin-parent {
  display: flex;
  width: 100%;
  padding: 12px 8px;
  outline: 1px dashed #d9d9d9;
}
// 「宽度贴合内容」用例的行标签：说明该行的遮罩居中基准
.spin-parent-label {
  color: rgba(0, 0, 0, 0.65);
}
// 叠加组件根类名提高特异性：组件根节点为 width / height 100%，同特异性下会随样式注入顺序反转
div.spin-wrap.spin-item {
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

::: details Show Code

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

:::

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

::: details Show Code

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
// 叠加组件根类名提高特异性：组件根节点为 width / height 100%，同特异性下会随样式注入顺序反转
div.spin-wrap.spin-item {
  width: 100px;
  height: 100px;
}
</style>
```

:::

## 宽度贴合内容

_内容比父容器窄时，`fitContent` 让遮罩与加载效果一起按内容宽度居中；不开启时二者以父容器为基准_

<br/>

<Flex vertical>
  <Flex vertical gap="small">
    <span class="spin-parent-label">不开启：遮罩与加载效果以父容器为基准</span>
    <div class="spin-parent">
      <Spin :spinning="spinning">
        <p class="spin-content">内容盒宽度由文案撑开，窄于父容器</p>
      </Spin>
    </div>
  </Flex>
  <Flex vertical gap="small">
    <span class="spin-parent-label">开启 <code>fitContent</code>：遮罩与加载效果随内容盒居中</span>
    <div class="spin-parent">
      <Spin fit-content :spinning="spinning">
        <p class="spin-content">内容盒宽度由文案撑开，窄于父容器</p>
      </Spin>
    </div>
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const spinning = ref(true)
</script>
<template>
  <Flex vertical>
    <Flex vertical gap="small">
      <span class="spin-parent-label">不开启：遮罩与加载效果以父容器为基准</span>
      <div class="spin-parent">
        <Spin :spinning="spinning">
          <p class="spin-content">内容盒宽度由文案撑开，窄于父容器</p>
        </Spin>
      </div>
    </Flex>
    <Flex vertical gap="small">
      <span class="spin-parent-label">开启 <code>fitContent</code>：遮罩与加载效果随内容盒居中</span>
      <div class="spin-parent">
        <Spin fit-content :spinning="spinning">
          <p class="spin-content">内容盒宽度由文案撑开，窄于父容器</p>
        </Spin>
      </div>
    </Flex>
  </Flex>
</template>
<style lang="less" scoped>
.spin-content {
  display: inline-block; // 宽度贴合文案：内容盒因此天然窄于父容器，无需声明宽度
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
// 父容器：宽度即展示区宽度，虚线框标示遮罩居中基准；flex 消除 inline-block 的行盒空隙
// 注意：内容盒若写成百分比，会与 fitContent 收缩后的根节点互相引用而塌陷（实测 80% 会塌成「80% × 内容宽度」）
.spin-parent {
  display: flex;
  width: 100%;
  padding: 12px 8px;
  outline: 1px dashed #d9d9d9;
}
.spin-parent-label {
  color: rgba(0, 0, 0, 0.65);
}
</style>
```

:::

## 动画速度、环宽与配色

_通过 `speed` 调节动画周期（值越小越快），`spinCircleWidth` 调节 `magic-ring` 的环宽（内外环同步），`color` / `magicRingColor` 分别设置外环与内环颜色；开启 `rotate` 后，`dot-wheel` / `line-wheel` 出现时会整体旋转一圈_

<br/>

<Space vertical>
  <Flex align="center"> loading state:<Switch v-model:value="rotateSpinning" /> </Flex>
  <Flex align="center"> speed:<InputNumber v-model:value="speed" :min="1" :step="100" /> ms </Flex>
  <Flex align="center"> spinCircleWidth:<InputNumber v-model:value="circleWidth" :min="6" :max="26" /> % </Flex>
  <Flex align="center"> color:<ColorPicker :width="200" v-model:value="color" /> </Flex>
  <Flex align="center"> magicRingColor:<ColorPicker :width="200" v-model:value="ringColor" /> </Flex>
  <Flex align="center"> rotate:<Switch v-model:value="rotate" /> </Flex>
  <Space>
    <Spin
      class="spin-item"
      :spinning="rotateSpinning"
      :speed="speed"
      :color="color"
      :rotate="rotate"
      indicator="dot-wheel"
    />
    <Spin
      class="spin-item"
      :spinning="rotateSpinning"
      :speed="speed"
      :color="color"
      :rotate="rotate"
      indicator="line-wheel"
    />
    <Spin
      class="spin-item"
      :spinning="rotateSpinning"
      :speed="speed"
      :color="color"
      :magic-ring-color="ringColor"
      :spin-circle-width="circleWidth"
      indicator="magic-ring"
    />
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const rotateSpinning = ref(true)
const speed = ref(800)
const circleWidth = ref(13)
const color = ref('#1677ff')
const ringColor = ref('#0958d9')
const rotate = ref(false)
</script>
<template>
  <Space vertical>
    <Flex align="center"> loading state:<Switch v-model:value="rotateSpinning" /> </Flex>
    <Flex align="center"> speed:<InputNumber v-model:value="speed" :min="1" :step="100" /> ms </Flex>
    <Flex align="center"> spinCircleWidth:<InputNumber v-model:value="circleWidth" :min="6" :max="26" /> % </Flex>
    <Flex align="center"> color:<ColorPicker :width="200" v-model:value="color" /> </Flex>
    <Flex align="center"> magicRingColor:<ColorPicker :width="200" v-model:value="ringColor" /> </Flex>
    <Flex align="center"> rotate:<Switch v-model:value="rotate" /> </Flex>
    <Space>
      <Spin
        class="spin-item"
        :spinning="rotateSpinning"
        :speed="speed"
        :color="color"
        :rotate="rotate"
        indicator="dot-wheel"
      />
      <Spin
        class="spin-item"
        :spinning="rotateSpinning"
        :speed="speed"
        :color="color"
        :rotate="rotate"
        indicator="line-wheel"
      />
      <Spin
        class="spin-item"
        :spinning="rotateSpinning"
        :speed="speed"
        :color="color"
        :magic-ring-color="ringColor"
        :spin-circle-width="circleWidth"
        indicator="magic-ring"
      />
    </Space>
  </Space>
</template>
<style lang="less" scoped>
// 叠加组件根类名提高特异性：组件根节点为 width / height 100%，同特异性下会随样式注入顺序反转
div.spin-wrap.spin-item {
  width: 100px;
  height: 100px;
}
</style>
```

:::

## APIs

### Spin

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| spinning | 是否为加载中状态 | boolean | true |
| size | 加载中尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| fitContent | 根节点宽度是否贴合内容宽度（内容比父容器窄时，遮罩与加载效果一起按内容宽度居中）；无内容时不生效 | boolean | false |
| tip | 描述文案 | string | undefined |
| delay | 延迟显示加载效果的时间（`ms`）；`0` 表示不延迟，可避免请求过快时 `loading` 一闪而过；仅在显示方向生效，隐藏始终立即 | number | 0 |
| indicator | 加载指示符：7 种内置枚举（`dot` 四点闪烁 / `dot-wheel` 八点轮 / `line-wheel` 八线轮 / `ring-circle` 圆环 / `ring-rail` 圆环轨道 / `dynamic-circle` 动态圆环 / `magic-ring` 翻转双环）/ 也可传入 `VNode` 或渲染函数自定义（插槽形态请用 `#indicator`）/ 传 `null` 时不渲染 | [SpinIndicator](#indicator-type) | 'dot' |
| color | 指示符颜色；`indicator` 为 `magic-ring` 时表示外环颜色 | string | undefined |
| spinCircleWidth | 圆环宽度（指示符宽度的百分比；`magic-ring` 收敛到 `6～26` 以保证两环定位与翻面动效有效）；仅 `ring-circle` / `ring-rail` / `magic-ring` 生效 | number | undefined（`ring-circle` / `ring-rail` 取 `12`、`magic-ring` 取 `13`） |
| spinCirclePercent | 圆环弧长（`0～100`，圆环周长的百分比）；仅 `ring-circle` / `ring-rail` 生效 | number | 33 |
| ringRailColor | 圆环轨道颜色；仅 `ring-rail` 生效 | string | 'rgba(0, 0, 0, 0.12)' |
| magicRingColor | 内环颜色；仅 `magic-ring` 生效 | string | undefined |
| rotate | 出现时是否整体旋转一圈；仅 `dot-wheel` / `line-wheel` 生效 | boolean | false |
| speed | 动画周期（`ms`），值越小越快：`dot-wheel` / `line-wheel` 为亮度扫过一圈、`magic-ring` 为翻面一圈；仅 `dot-wheel` / `line-wheel` / `magic-ring` 生效 | number | undefined（`dot-wheel` / `line-wheel` 取 `800`、`magic-ring` 取 `1500`） |

### Indicator Type

<br/>

`indicator` 的取值类型（入口导出名），内置枚举为其子集：

| 名称 | 值 |
| :-- | :-- |
| SpinIndicator | SpinBuiltinIndicator &#124; VNode &#124; (() => VNode) &#124; null |
| SpinBuiltinIndicator | 'dot' &#124; 'dot-wheel' &#124; 'line-wheel' &#124; 'ring-circle' &#124; 'ring-rail' &#124; 'dynamic-circle' &#124; 'magic-ring' |

## Slots

| 名称      | 说明           | 用法             |
| :-------- | :------------- | :--------------- |
| tip       | 自定义描述文案 | v-slot:tip       |
| indicator | 自定义指示符   | v-slot:indicator |
| default   | 自定义内容     | v-slot:default   |
