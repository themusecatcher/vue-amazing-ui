<script setup lang="ts">
import { ref } from 'vue'
import type { Countdown, CountdownRenderParams } from 'vue-amazing-ui'
const active = ref(true)
const shortRef = ref<InstanceType<typeof Countdown> | null>(null)
const resetActive = ref(true)
const countdownRef = ref<InstanceType<typeof Countdown> | null>(null)
// 分段渲染拿到的都是数字，补零需要自行处理
const pad = (value: number) => String(value).padStart(2, '0')
function renderText(parts: CountdownRenderParams) {
  return `${pad(parts.hours)} 时 ${pad(parts.minutes)} 分 ${pad(parts.seconds)} 秒`
}
function onFinish() {
  console.log('countdown finished')
}
function onShortFinish() {
  console.log('short countdown finished')
}
function onShortReset() {
  shortRef.value?.reset()
}
function onReset() {
  countdownRef.value?.reset()
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10"><code>format</code>: <code>MM月 DD天 HH:mm:ss</code></p>
    <Countdown
      title="Countdown 1年"
      :value="12 * 30 * 24 * 60 * 60 * 1000"
      :future="false"
      format="MM月 DD天 HH:mm:ss"
      @finish="onFinish"
    />
    <h2 class="mt30 mb10">自定义字面量</h2>
    <p class="mb10">
      字面量中用 <code>[]</code> 包裹可避免被当成单位解析；<code>Time left</code> 含单位字符
      <code>m</code>，不包裹时会被解析成分钟
    </p>
    <Countdown :value="12 * 60 * 60 * 1000" :future="false" format="[Time left] HH:mm:ss" />
    <h2 class="mt30 mb10">毫秒倒计时</h2>
    <p class="mb10"><code>format</code>: <code>Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒</code></p>
    <Countdown
      title="Million Seconds"
      :value="12 * 30 * 24 * 60 * 60 * 1000"
      :future="false"
      format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
    />
    <h2 class="mt30 mb10">毫秒精度</h2>
    <p class="mb10"><code>S</code>、<code>SS</code>、<code>SSS</code> 分别展示 1、2、3 位毫秒</p>
    <Row :gutter="16">
      <Col :span="8">
        <Countdown :value="12 * 60 * 60 * 1000" :future="false" format="HH:mm:ss.S" />
      </Col>
      <Col :span="8">
        <Countdown :value="12 * 60 * 60 * 1000" :future="false" format="HH:mm:ss.SS" />
      </Col>
      <Col :span="8">
        <Countdown :value="12 * 60 * 60 * 1000" :future="false" format="HH:mm:ss.SSS" />
      </Col>
    </Row>
    <h2 class="mt30 mb10">前缀和后缀</h2>
    <Countdown :value="2471875200000" format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒">
      <template #title>2048年 五一 Countdown</template>
      <template #prefix>There's only</template>
      <template #suffix>left for the end.</template>
    </Countdown>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Countdown
      :value="2485094400000"
      format="Y 年 MM 月 DD 天 HH 时 mm 分 ss 秒 SSS 毫秒"
      :title-style="{ fontWeight: 500, fontSize: '18px' }"
      :value-style="{ fontWeight: 600, color: '#1677ff' }"
    >
      <template #title>2048年 十一 Countdown</template>
    </Countdown>
    <h2 class="mt30 mb10">自定义分段渲染</h2>
    <p class="mb10">
      <code>render</code> 属性与 <code>#render</code> 插槽都能接管排版：作用域参数一致，同时提供时插槽优先
    </p>
    <Space vertical>
      <Countdown :value="12 * 60 * 60 * 1000" :future="false" :render="renderText" />
      <Countdown :value="12 * 60 * 60 * 1000" :future="false">
        <template #render="{ hours, minutes, seconds }">
          <span style="padding: 0 4px; border-radius: 4px; background: var(--va-fill-color-2)">{{ pad(hours) }}</span>
          <span>:</span>
          <span style="padding: 0 4px; border-radius: 4px; background: var(--va-fill-color-2)">{{ pad(minutes) }}</span>
          <span>:</span>
          <span style="padding: 0 4px; border-radius: 4px; background: var(--va-fill-color-2)">{{ pad(seconds) }}</span>
        </template>
      </Countdown>
    </Space>
    <h2 class="mt30 mb10">随时暂停</h2>
    <Space vertical>
      <Switch v-model:value="active" />
      <Countdown
        :active="active"
        title="Pause at any time"
        :value="24 * 60 * 60 * 1000"
        :future="false"
        format="HH:mm:ss:SSS"
      />
    </Space>
    <h2 class="mt30 mb10">完成回调</h2>
    <p class="mb10">倒计时结束后派发一次 <code>finish</code>，可点击按钮重新开始</p>
    <Space align="center">
      <Countdown ref="shortRef" :value="10 * 1000" :future="false" format="mm:ss" @finish="onShortFinish" />
      <Button type="primary" @click="onShortReset">重新开始</Button>
    </Space>
    <h2 class="mt30 mb10">倒计时已完成</h2>
    <Row :gutter="16">
      <Col :span="8">
        <Countdown />
      </Col>
      <Col :span="8">
        <Countdown finish="Finished" />
      </Col>
      <Col :span="8">
        <Countdown>
          <template #finish>已完成</template>
        </Countdown>
      </Col>
    </Row>
    <h2 class="mt30 mb10">重置倒计时</h2>
    <Space vertical>
      <Space align="center">
        <Switch v-model:value="resetActive" />
        <Button type="primary" @click="onReset">Reset</Button>
      </Space>
      <Countdown
        ref="countdownRef"
        :active="resetActive"
        :value="24 * 60 * 60 * 1000"
        :future="false"
        format="HH:mm:ss:SSS"
      />
    </Space>
  </div>
</template>
