<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { formatNumber } from 'vue-amazing-ui'
const value = ref(3)
const value2 = ref(3)
const formatValue = ref(1000)
watchEffect(() => {
  console.log('value:', value.value)
})
watchEffect(() => {
  console.log('value2:', value2.value)
})
watchEffect(() => {
  console.log('formatValue:', formatValue.value)
})
function formatter(num: string): string {
  return formatNumber(num, 2) + '%'
}
function onChange(number: number) {
  console.log('change:', number)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space gap="small" vertical>
      <Alert>
        <template #message>
          .lazy:
          <br />
          默认情况下，v-model 会在每次 input 事件后更新数据 (IME 拼字阶段的状态例外)。
          <br />
          你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据：
          <br />
          {{ '<InputNumber v-model:value.lazy="value" />' }}
        </template>
      </Alert>
      <InputNumber :width="120" v-model:value="value" placeholder="Basic usage" @change="onChange" />
      <InputNumber :width="120" v-model:value.lazy="value" placeholder="Lazy usage" @change="onChange" />
    </Space>
    <h2 class="mt30 mb10">步数为小数</h2>
    <InputNumber :step="0.1" v-model:value="value" />
    <h2 class="mt30 mb10">设置数值精度</h2>
    <InputNumber :min="-10" :max="10" :step="0.6" :precision="2" v-model:value="value" />
    <h2 class="mt30 mb10">格式化展示</h2>
    <!-- <a-input-number
      v-model:value="value2"
      :min="0"
      :max="100"
      :formatter="(value) => `${value}%`"
      :parser="(value) => value.replace('%', '')"
      @change="onChange"
    /> -->
    <InputNumber
      v-model:value="value2"
      :min="0"
      :max="100"
      :formatter="(value: number) => `${value}%`"
      :parser="(value: string) => value.replace('%', '')"
      @change="onChange"
    />
    <InputNumber :width="120" :step="10" :max="10000" :formatter="formatter" v-model:value="formatValue" />
    <h2 class="mt30 mb10">自定义最大最小值</h2>
    <InputNumber :min="0" :max="10" v-model:value="value" />
    <h2 class="mt30 mb10">添加前缀图标 $</h2>
    <InputNumber prefix="$" v-model:value="value" />
    <h2 class="mt30 mb10">禁用</h2>
    <InputNumber v-model:value="value" disabled />
  </div>
</template>
