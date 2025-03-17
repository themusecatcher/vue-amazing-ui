<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { formatNumber } from 'vue-amazing-ui'
const value = ref(3)
const lazyValue = ref(6)
const formatValue1 = ref(1000)
const formatValue2 = ref(100)
const disabled = ref(true)
watchEffect(() => {
  console.log('value', value.value)
})
watchEffect(() => {
  console.log('lazyValue', lazyValue.value)
})
watchEffect(() => {
  console.log('formatValue1', formatValue1.value)
})
watchEffect(() => {
  console.log('formatValue2', formatValue2.value)
})
function formatter(value: number): string {
  return formatNumber(value, 2) + '%'
}
function parser(value: string): number {
  return Number(value.replace(/[,%]/g, ''))
}
function onChange(number: number) {
  console.log('change', number)
}
function onEnter(e: KeyboardEvent) {
  console.log('enter', e)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space gap="small" vertical>
      <Alert type="info">
        .lazy:
        <br />
        默认情况下，v-model 会在每次 input 事件后更新数据 (IME 拼字阶段的状态例外)。
        <br />
        你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据：
        <br />
        {{ '<InputNumber v-model:value.lazy="value" />' }}
      </Alert>
      <InputNumber :width="120" v-model:value="value" placeholder="Basic usage" @change="onChange" @enter="onEnter" />
      <InputNumber
        :width="120"
        v-model:value.lazy="lazyValue"
        placeholder="Lazy usage"
        @change="onChange"
        @enter="onEnter"
      />
    </Space>
    <h2 class="mt30 mb10">步数为小数</h2>
    <InputNumber :step="0.1" v-model:value="value" />
    <h2 class="mt30 mb10">设置数值精度</h2>
    <InputNumber :min="-10" :max="10" :step="0.6" :precision="2" v-model:value="value" />
    <h2 class="mt30 mb10">格式化展示</h2>
    <Space>
      <InputNumber
        :width="120"
        v-model:value="formatValue1"
        :formatter="(value: number) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
      />
      <InputNumber :width="120" v-model:value="formatValue2" :formatter="formatter" :parser="parser" />
    </Space>
    <h2 class="mt30 mb10">自定义最大最小值</h2>
    <InputNumber :min="0" :max="10" v-model:value="value" />
    <h2 class="mt30 mb10">添加前缀图标 $</h2>
    <InputNumber prefix="$" v-model:value="value" />
    <h2 class="mt30 mb10">禁用</h2>
    <Space vertical>
      <Space align="center">disabled: <Switch v-model="disabled" /></Space>
      <InputNumber v-model:value="value" :disabled="disabled" />
    </Space>
  </div>
</template>
