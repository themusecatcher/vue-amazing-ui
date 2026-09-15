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
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space vertical>
      <Statistic title="一个小目标" tabular-nums>
        <NumberAnimation ref="basicRef" :to="value1" :autoplay="false" />
      </Statistic>
      <Button type="primary" @click="basicRef?.play()">播放</Button>
    </Space>
    <h2 class="mt30 mb10">精度</h2>
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
    <h2 class="mt30 mb10">前缀 & 后缀</h2>
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
    <h2 class="mt30 mb10">千分位分隔符 & 小数点字符</h2>
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
            <NumberAnimation ref="plainRef" separator="" :precision="2" :from="0" :to="value2" :autoplay="false" />
          </Statistic>
          <Button type="primary" @click="plainRef?.play()">播放</Button>
        </Space>
      </Col>
    </Row>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Space vertical>
      <Statistic title="一个小目标" tabular-nums>
        <NumberAnimation
          ref="styleRef"
          :value-style="{ fontSize: '30px', fontWeight: 600, color: '#ff6900' }"
          :from="0"
          :to="value2"
          :autoplay="false"
        />
      </Statistic>
      <Button type="primary" @click="styleRef?.play()">播放</Button>
    </Space>
    <h2 class="mt30 mb10">播放和动画时间</h2>
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
    <h2 class="mt30 mb10">自动播放</h2>
    <Space vertical>
      <Space align="center">autoplay：<Switch v-model="autoPlay" /></Space>
      <Statistic title="一个小目标" tabular-nums>
        <NumberAnimation :autoplay="autoPlay" :from="0" :to="value2" />
      </Statistic>
    </Space>
    <h2 class="mt30 mb10">动画过渡效果</h2>
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
  </div>
</template>
