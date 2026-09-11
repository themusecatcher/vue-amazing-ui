# 数值动画 NumberAnimation

<GlobalElement />

_数值播放动画_

<script setup lang="ts">
import { ref, computed } from 'vue'
import { TransitionPresets } from '@vueuse/core'
import type { CubicBezierPoints } from '@vueuse/core'
import { NumberAnimation } from 'vue-amazing-ui'
import type { NumberAnimationEasingPreset, RadioOption, SelectOption } from 'vue-amazing-ui'
// 各示例独立的组件实例，用于单独触发播放
type NumberAnimationInstance = InstanceType<typeof NumberAnimation> | null
const basicRef = ref<NumberAnimationInstance>(null)
const precision2Ref = ref<NumberAnimationInstance>(null)
const precision3Ref = ref<NumberAnimationInstance>(null)
const prefixRef = ref<NumberAnimationInstance>(null)
const suffixRef = ref<NumberAnimationInstance>(null)
const separatorRef = ref<NumberAnimationInstance>(null)
const plainRef = ref<NumberAnimationInstance>(null)
const styleRef = ref<NumberAnimationInstance>(null)
const animationRef = ref<NumberAnimationInstance>(null)
const easingRef = ref<NumberAnimationInstance>(null)
const value1 = 100000000.12345
const value2 = 100000000
const from = ref(0)
const to = ref(100000000)
const autoPlay = ref(true)
const bezierEasing: CubicBezierPoints = [0.4, 0, 0.2, 1]
const customEasing = (t: number) => t * t
// easing 的三种取值形式
const easingCategory = ref<'preset' | 'bezier' | 'function'>('preset')
const easingCategoryOptions: RadioOption[] = [
  { label: '预置曲线', value: 'preset' },
  { label: '贝塞尔控制点', value: 'bezier' },
  { label: '缓动函数', value: 'function' }
]
const easingType = ref<NumberAnimationEasingPreset>('easeInOutCubic')
// 预置名称派生自 @vueuse/core，随上游自动同步
const easingOptions: SelectOption[] = Object.keys(TransitionPresets).map((preset) => ({ label: preset, value: preset }))
const selectedEasing = computed(() => {
  if (easingCategory.value === 'bezier') {
    return bezierEasing
  }
  if (easingCategory.value === 'function') {
    return customEasing
  }
  return easingType.value
})
const easingLabel = computed(() => {
  if (easingCategory.value === 'bezier') {
    return '贝塞尔控制点 [0.4, 0, 0.2, 1]'
  }
  if (easingCategory.value === 'function') {
    return '缓动函数 (t) => t * t'
  }
  return easingType.value
})
// 类别或预置名变化时重建组件，触发重新播放
const easingKey = computed(() => `${easingCategory.value}-${easingType.value}`)
function onStarted() {
  console.log('started')
}
function onFinished() {
  console.log('finished')
  ;[from.value, to.value] = [to.value, from.value]
}
</script>

## 基本使用

<ClientOnly>
  <Space vertical>
    <Statistic title="一个小目标" tabular-nums>
      <NumberAnimation ref="basicRef" :to="value1" :autoplay="false" />
    </Statistic>
    <Button type="primary" @click="basicRef?.play()">播放</Button>
  </Space>
</ClientOnly>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NumberAnimation } from 'vue-amazing-ui'
const numberAnimationRef = ref<InstanceType<typeof NumberAnimation> | null>(null)
</script>
<template>
  <Space vertical>
    <Statistic title="一个小目标" tabular-nums>
      <NumberAnimation ref="numberAnimationRef" :to="100000000.12345" :autoplay="false" />
    </Statistic>
    <Button type="primary" @click="numberAnimationRef?.play()">播放</Button>
  </Space>
</template>
```

:::

## 精度

<ClientOnly>
  <Row>
    <Col :span="12">
      <Space vertical>
        <Statistic title="一个小目标" tabular-nums>
          <NumberAnimation ref="precision2Ref" :from="0.0" :to="value1" :precision="2" :autoplay="false" />
        </Statistic>
        <Button type="primary" @click="precision2Ref?.play()">播放</Button>
      </Space>
    </Col>
    <Col :span="12">
      <Space vertical>
        <Statistic title="一个小目标" tabular-nums>
          <NumberAnimation ref="precision3Ref" :to="value1" :precision="3" :autoplay="false" />
        </Statistic>
        <Button type="primary" @click="precision3Ref?.play()">播放</Button>
      </Space>
    </Col>
  </Row>
</ClientOnly>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NumberAnimation } from 'vue-amazing-ui'
const precision2Ref = ref<InstanceType<typeof NumberAnimation> | null>(null)
const precision3Ref = ref<InstanceType<typeof NumberAnimation> | null>(null)
</script>
<template>
  <Row>
    <Col :span="12">
      <Space vertical>
        <Statistic title="一个小目标" tabular-nums>
          <NumberAnimation ref="precision2Ref" :from="0.0" :to="100000000.12345" :precision="2" :autoplay="false" />
        </Statistic>
        <Button type="primary" @click="precision2Ref?.play()">播放</Button>
      </Space>
    </Col>
    <Col :span="12">
      <Space vertical>
        <Statistic title="一个小目标" tabular-nums>
          <NumberAnimation ref="precision3Ref" :to="100000000.12345" :precision="3" :autoplay="false" />
        </Statistic>
        <Button type="primary" @click="precision3Ref?.play()">播放</Button>
      </Space>
    </Col>
  </Row>
</template>
```

:::

## 自定义前缀 & 后缀

<ClientOnly>
  <Row>
    <Col :span="12">
      <Space vertical>
        <Statistic title="一个小目标" tabular-nums>
          <NumberAnimation ref="prefixRef" prefix="$" :from="0" :to="value2" :autoplay="false" />
        </Statistic>
        <Button type="primary" @click="prefixRef?.play()">播放</Button>
      </Space>
    </Col>
    <Col :span="12">
      <Space vertical>
        <Statistic title="一个小目标" tabular-nums>
          <NumberAnimation ref="suffixRef" :from="0" :to="value2" suffix="元" :autoplay="false" />
        </Statistic>
        <Button type="primary" @click="suffixRef?.play()">播放</Button>
      </Space>
    </Col>
  </Row>
</ClientOnly>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NumberAnimation } from 'vue-amazing-ui'
const prefixRef = ref<InstanceType<typeof NumberAnimation> | null>(null)
const suffixRef = ref<InstanceType<typeof NumberAnimation> | null>(null)
</script>
<template>
  <Row>
    <Col :span="12">
      <Space vertical>
        <Statistic title="一个小目标" tabular-nums>
          <NumberAnimation ref="prefixRef" prefix="$" :from="0" :to="100000000" :autoplay="false" />
        </Statistic>
        <Button type="primary" @click="prefixRef?.play()">播放</Button>
      </Space>
    </Col>
    <Col :span="12">
      <Space vertical>
        <Statistic title="一个小目标" tabular-nums>
          <NumberAnimation ref="suffixRef" :from="0" :to="100000000" suffix="元" :autoplay="false" />
        </Statistic>
        <Button type="primary" @click="suffixRef?.play()">播放</Button>
      </Space>
    </Col>
  </Row>
</template>
```

:::

## 自定义千分位分隔符 & 小数点字符

<ClientOnly>
  <Row>
    <Col :span="12">
      <Space vertical>
        <Statistic title="一个小目标" tabular-nums>
          <NumberAnimation
            ref="separatorRef"
            separator=";"
            decimal=","
            :precision="2"
            :from="0"
            :to="value2"
            :autoplay="false"
          />
        </Statistic>
        <Button type="primary" @click="separatorRef?.play()">播放</Button>
      </Space>
    </Col>
    <Col :span="12">
      <Space vertical>
        <Statistic title="一个小目标" tabular-nums>
          <NumberAnimation ref="plainRef" separator="" :from="0" :to="value2" :autoplay="false" />
        </Statistic>
        <Button type="primary" @click="plainRef?.play()">播放</Button>
      </Space>
    </Col>
  </Row>
</ClientOnly>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NumberAnimation } from 'vue-amazing-ui'
const separatorRef = ref<InstanceType<typeof NumberAnimation> | null>(null)
const plainRef = ref<InstanceType<typeof NumberAnimation> | null>(null)
</script>
<template>
  <Row>
    <Col :span="12">
      <Space vertical>
        <Statistic title="一个小目标" tabular-nums>
          <NumberAnimation
            ref="separatorRef"
            separator=";"
            decimal=","
            :precision="2"
            :from="0"
            :to="100000000.12345"
            :autoplay="false"
          />
        </Statistic>
        <Button type="primary" @click="separatorRef?.play()">播放</Button>
      </Space>
    </Col>
    <Col :span="12">
      <Space vertical>
        <Statistic title="一个小目标" tabular-nums>
          <NumberAnimation ref="plainRef" separator="" :from="0" :to="100000000.12345" :autoplay="false" />
        </Statistic>
        <Button type="primary" @click="plainRef?.play()">播放</Button>
      </Space>
    </Col>
  </Row>
</template>
```

:::

## 自定义样式

<ClientOnly>
  <Space vertical>
    <Statistic title="一个小目标" tabular-nums>
      <NumberAnimation
        ref="styleRef"
        :value-style="{ fontSize: '30px', fontWeight: 600, color: '#d4380d' }"
        :from="0"
        :to="value2"
        :autoplay="false"
      />
    </Statistic>
    <Button type="primary" @click="styleRef?.play()">播放</Button>
  </Space>
</ClientOnly>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NumberAnimation } from 'vue-amazing-ui'
const styleRef = ref<InstanceType<typeof NumberAnimation> | null>(null)
</script>
<template>
  <Space vertical>
    <Statistic title="一个小目标" tabular-nums>
      <NumberAnimation
        ref="styleRef"
        :value-style="{ fontSize: '30px', fontWeight: 600, color: '#d4380d' }"
        :from="0"
        :to="100000000"
        :autoplay="false"
      />
    </Statistic>
    <Button type="primary" @click="styleRef?.play()">播放</Button>
  </Space>
</template>
```

:::

## 自定义播放和动画时间

<Space vertical>
  <Statistic title="一个小目标" tabular-nums>
    <NumberAnimation
      ref="animationRef"
      :from="from"
      :to="to"
      :duration="5000"
      :precision="2"
      :autoplay="false"
      @started="onStarted"
      @finished="onFinished"
    />
  </Statistic>
  <Button type="primary" @click="animationRef?.play()">播放</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NumberAnimation } from 'vue-amazing-ui'
const numberAnimationRef = ref<InstanceType<typeof NumberAnimation> | null>(null)
const from = ref(0)
const to = ref(100000000)
function onStarted() {
  console.log('started')
}
function onFinished() {
  console.log('finished')
  ;[from.value, to.value] = [to.value, from.value]
}
</script>
<template>
  <Space vertical>
    <Statistic title="一个小目标" tabular-nums>
      <NumberAnimation
        ref="numberAnimationRef"
        :from="from"
        :to="to"
        :duration="5000"
        :precision="2"
        :autoplay="false"
        @started="onStarted"
        @finished="onFinished"
      />
    </Statistic>
    <Button type="primary" @click="numberAnimationRef?.play()">播放</Button>
  </Space>
</template>
```

:::

## 自动播放

<Space vertical>
  <Space align="center">autoplay：<Switch v-model="autoPlay" /></Space>
  <Statistic title="一个小目标" tabular-nums>
    <NumberAnimation :autoplay="autoPlay" :from="0" :to="value2" />
  </Statistic>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const autoPlay = ref(true)
const value = ref(100000000)
</script>
<template>
  <Space vertical>
    <Space align="center">autoplay：<Switch v-model="autoPlay" /></Space>
    <Statistic title="一个小目标" tabular-nums>
      <NumberAnimation :autoplay="autoPlay" :from="0" :to="value" />
    </Statistic>
  </Space>
</template>
```

::::

## 动画过渡效果

<Space vertical>
  <Space align="center">
    <Radio v-model:value="easingCategory" :options="easingCategoryOptions" button button-style="solid" />
    <Select v-if="easingCategory === 'preset'" v-model="easingType" :options="easingOptions" width="200" search />
    <Button type="primary" @click="easingRef?.play()">播放</Button>
  </Space>
  <Statistic :title="easingLabel" tabular-nums>
    <NumberAnimation
      :key="easingKey"
      ref="easingRef"
      :easing="selectedEasing"
      :from="0"
      :to="value2"
      :duration="2000"
    />
  </Statistic>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { TransitionPresets } from '@vueuse/core'
import type { CubicBezierPoints } from '@vueuse/core'
import { NumberAnimation } from 'vue-amazing-ui'
import type { NumberAnimationEasingPreset, RadioOption, SelectOption } from 'vue-amazing-ui'
const easingRef = ref<InstanceType<typeof NumberAnimation> | null>(null)
const bezierEasing: CubicBezierPoints = [0.4, 0, 0.2, 1]
const customEasing = (t: number) => t * t
// easing 的三种取值形式
const easingCategory = ref<'preset' | 'bezier' | 'function'>('preset')
const easingCategoryOptions: RadioOption[] = [
  { label: '预置曲线', value: 'preset' },
  { label: '贝塞尔控制点', value: 'bezier' },
  { label: '缓动函数', value: 'function' }
]
const easingType = ref<NumberAnimationEasingPreset>('easeInOutCubic')
const easingOptions: SelectOption[] = Object.keys(TransitionPresets).map((preset) => ({ label: preset, value: preset }))
const selectedEasing = computed(() => {
  if (easingCategory.value === 'bezier') {
    return bezierEasing
  }
  if (easingCategory.value === 'function') {
    return customEasing
  }
  return easingType.value
})
const easingLabel = computed(() => {
  if (easingCategory.value === 'bezier') {
    return '贝塞尔控制点 [0.4, 0, 0.2, 1]'
  }
  if (easingCategory.value === 'function') {
    return '缓动函数 (t) => t * t'
  }
  return easingType.value
})
// 类别或预置名变化时重建组件，触发重新播放
const easingKey = computed(() => `${easingCategory.value}-${easingType.value}`)
</script>
<template>
  <Space vertical>
    <Space align="center">
      <Radio v-model:value="easingCategory" :options="easingCategoryOptions" button button-style="solid" />
      <Select v-if="easingCategory === 'preset'" v-model="easingType" :options="easingOptions" width="200" search />
      <Button type="primary" @click="easingRef?.play()">播放</Button>
    </Space>
    <Statistic :title="easingLabel" tabular-nums>
      <NumberAnimation
        :key="easingKey"
        ref="easingRef"
        :easing="selectedEasing"
        :from="0"
        :to="100000000"
        :duration="2000"
      />
    </Statistic>
  </Space>
</template>
```

:::

## APIs

### NumberAnimation

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| from | 数值动画起始数值 | number | 0 |
| to | 数值目标值 | number | 1000 |
| duration | 数值动画持续时间，单位 `ms` | number | 3000 |
| autoplay | 是否自动开始动画（由 `false` 变为 `true` 时重新播放） | boolean | true |
| precision | 精度，保留小数点后几位 | number | 0 |
| prefix | 前缀 | string | undefined |
| suffix | 后缀 | string | undefined |
| separator | 千分位分隔符 | string | ',' |
| decimal | 小数点字符 | string | '.' |
| valueStyle | 数值文本样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| easing | 动画缓动曲线，除预置名称外还可传三次贝塞尔控制点数组或缓动函数 | [EasingPreset](#easingpreset-type) &#124; [CubicBezierPoints](https://vueuse.org/core/useTransition/) &#124; [EasingFunction](https://vueuse.org/core/useTransition/) | 'easeInOutCubic' |

`easing` 的取值与动画驱动方法 `transition` 均来自 `@vueuse/core` 的 [`useTransition`](https://vueuse.org/core/useTransition/) 模块，其中 `CubicBezierPoints` 为三次贝塞尔控制点数组，`EasingFunction` 为 `(t: number) => number` 缓动函数：

```vue
<NumberAnimation :easing="[0.4, 0, 0.2, 1]" :to="1000" />
<NumberAnimation :easing="(t) => t * t" :to="1000" />
```

### EasingPreset Type

<br/>

预置名称源自 `@vueuse/core` 的 `TransitionPresets`

| 名称 | 值 |
| :-- | :-- |
| EasingPreset | 'linear' &#124; 'easeInSine' &#124; 'easeOutSine' &#124; 'easeInOutSine' &#124; 'easeInQuad' &#124; 'easeOutQuad' &#124; 'easeInOutQuad' &#124; 'easeInCubic' &#124; 'easeOutCubic' &#124; 'easeInOutCubic' &#124; 'easeInQuart' &#124; 'easeOutQuart' &#124; 'easeInOutQuart' &#124; 'easeInQuint' &#124; 'easeOutQuint' &#124; 'easeInOutQuint' &#124; 'easeInExpo' &#124; 'easeOutExpo' &#124; 'easeInOutExpo' &#124; 'easeInCirc' &#124; 'easeOutCirc' &#124; 'easeInOutCirc' &#124; 'easeInBack' &#124; 'easeOutBack' &#124; 'easeInOutBack' |

## Methods

| 名称 | 说明    | 类型       |
| :--- | :------- | :--------- |
| play | 播放动画（动画进行中调用会被忽略，播放结束后可重复调用重新播放） | () => void |

## Events

| 名称    | 说明        | 类型       |
| :------- | :----------- | :--------- |
| started | 动画开始播放 | () => void |
| finished | 动画播放完成 | () => void |
