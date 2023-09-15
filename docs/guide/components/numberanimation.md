# 数值动画 NumberAnimation<BackTop />

<br/>

*数值播放动画*

<br/>

<Button type="primary" @click="onPlay">Play</Button>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(100000000.12345)
const value2 = ref(100000000)

function onPlay () {
  if (value1.value || value2.value) {
    value1.value = 0
    value2.value = 0
  } else {
    value1.value = 100000000.12345
    value2.value = 100000000
  }
}
function onStarted () {
  console.log('started')
}
function onFinished () {
  console.log('finished')
}
const animationRef = ref()
function onClick () {
  animationRef.value.play()
}
</script>

## 基本使用

<ClientOnly>
  <Row>
    <Col :span="12">
      <Statistic title="一个小目标">
        <NumberAnimation :to="value1" />
      </Statistic>
    </Col>
    <Col :span="12">
      <Statistic title="一个小目标">
        <NumberAnimation :to="value1" separator="" />
      </Statistic>
    </Col>
  </Row>
</ClientOnly>

::: details Show Code

```vue
<template>
  <Row>
    <Col :span="12">
      <Statistic title="一个小目标">
        <NumberAnimation :to="100000000.12345" />
      </Statistic>
    </Col>
    <Col :span="12">
      <Statistic title="一个小目标">
        <NumberAnimation :to="100000000.12345" separator="" />
      </Statistic>
    </Col>
  </Row>
</template>
```

:::

## 精度

<ClientOnly>
  <Row>
    <Col :span="12">
      <Statistic title="一个小目标">
        <NumberAnimation :from="0.00" :to="value1" :precision="2" />
      </Statistic>
    </Col>
    <Col :span="12">
      <Statistic title="一个小目标">
        <NumberAnimation :to="value1" :precision="3" />
      </Statistic>
    </Col>
  </Row>
</ClientOnly>

::: details Show Code

```vue
<template>
  <Row>
    <Col :span="12">
      <Statistic title="一个小目标">
        <NumberAnimation :from="0.00" :to="100000000.12345" :precision="2" />
      </Statistic>
    </Col>
    <Col :span="12">
      <Statistic title="一个小目标">
        <NumberAnimation :to="100000000.12345" :precision="3" />
      </Statistic>
    </Col>
  </Row>
</template>
```

:::

## 自定义前缀 & 后缀

<ClientOnly>
  <Row>
    <Col :span="12">
      <Statistic title="一个小目标">
        <NumberAnimation
          prefix="$"
          :from="0"
          :to="value2" />
      </Statistic>
    </Col>
    <Col :span="12">
      <Statistic title="一个小目标">
        <NumberAnimation
          :from="0"
          :to="value2"
          suffix="元" />
      </Statistic>
    </Col>
  </Row>
</ClientOnly>

::: details Show Code

```vue
<template>
  <Row>
    <Col :span="12">
      <Statistic title="一个小目标">
        <NumberAnimation
          prefix="$"
          :from="0"
          :to="100000000" />
      </Statistic>
    </Col>
    <Col :span="12">
      <Statistic title="一个小目标">
        <NumberAnimation
          :from="0"
          :to="100000000"
          suffix="元" />
      </Statistic>
    </Col>
  </Row>
</template>
```

:::

## 自定义样式

<ClientOnly>
  <Statistic title="一个小目标">
    <NumberAnimation
      :value-style="{fontSize: '30px', fontWeight: 600, color: '#d4380d'}"
      :from="0"
      :to="value2" />
  </Statistic>
</ClientOnly>

::: details Show Code

```vue
<template>
  <Statistic title="一个小目标">
    <NumberAnimation
      :value-style="{fontSize: '30px', fontWeight: 600, color: '#d4380d'}"
      :from="0"
      :to="100000000" />
  </Statistic>
</template>
```

:::

## 自定义播放和动画时间

<ClientOnly>
  <Statistic title="一个小目标">
    <NumberAnimation
      ref="animationRef"
      :from="0"
      :to="100000000"
      :duration="5000"
      :precision="2"
      :autoplay="false"
      @started="onStarted"
      @finished="onFinished" />
  </Statistic>
  <Button @click="onClick">播放</Button>
</ClientOnly>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'

function onStarted () {
  console.log('started')
}
function onFinished () {
  console.log('finished')
}
const animationRef = ref()
function onClick () {
  animationRef.value.play()
}
</script>
<template>
  <Statistic title="一个小目标">
    <NumberAnimation
      ref="animationRef"
      :from="0"
      :to="100000000"
      :duration="5000"
      :precision="2"
      :autoplay="false"
      @started="onStarted"
      @finished="onFinished" />
  </Statistic>
  <Button @click="onClick">播放</Button>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
from | 数值动画起始数值 | number | 0 | false
to | 数值目标值 | number | 1000 | false
duration | 数值动画持续时间，单位ms | number | 3000 | false
autoplay | 是否自动开始动画 | boolean | true | false
precision | 精度，保留小数点后几位 | number | 0 | false
prefix | 前缀 | string | '' | false
suffix | 后缀 | string | '' | false
separator | 千分位分隔符 | string | ',' | false
decimal | 小数点字符 | string | '.' | false
valueStyle | 数值文本样式 | CSSProperties | {} | false
transition | 动画过渡效果 | [TransitionFunc](https://vueuse.org/core/useTransition/#usetransition) | TransitionFunc['easeInOutCubic'] | false

## Methods

事件名称 | 说明 | 参数
-- | -- | --
play | 播放动画 | () => void

## Events

事件名称 | 说明 | 参数
-- | -- | --
started | 动画开始播放 | () => void
finished | 动画播放完成 | () => void
