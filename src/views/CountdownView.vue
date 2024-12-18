<script setup lang="ts">
import { ref } from 'vue'
const active = ref(true)
const resetActive = ref(true)
const countdownRef = ref()
function onFinish() {
  console.log('countdown finished')
}
function onReset() {
  countdownRef.value.reset()
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <h3 class="mb10">format: MM月 DD天 HH:mm:ss</h3>
    <Countdown
      title="Countdown 1年"
      :value="12 * 30 * 24 * 60 * 60 * 1000"
      :future="false"
      format="MM月 DD天 HH:mm:ss"
      @finish="onFinish"
    />
    <h2 class="mt30 mb10">毫秒倒计时</h2>
    <h3 class="mb10">format: Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒</h3>
    <Countdown
      title="Million Seconds"
      :value="12 * 30 * 24 * 60 * 60 * 1000"
      :future="false"
      format="Y 年 M 月 D 天 H 时 m 分 s 秒 SSS 毫秒"
    />
    <h2 class="mt30 mb10">随时暂停</h2>
    <Space vertical>
      <Switch v-model="active" />
      <Countdown
        :active="active"
        title="Pause at any time"
        :value="24 * 60 * 60 * 1000"
        :future="false"
        format="HH:mm:ss:SSS"
      />
    </Space>
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
    <h2 class="mt30 mb10">倒计时已完成</h2>
    <Space gap="small" vertical>
      <Countdown />
      <Countdown finished-text="Finished" />
    </Space>
    <h2 class="mt30 mb10">重置倒计时</h2>
    <Space vertical>
      <Space align="center">
        <Switch v-model="resetActive" />
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
