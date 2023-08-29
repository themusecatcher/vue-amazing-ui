<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { moneyFormat } from '../../packages'
const value = ref(3)
const formatValue = ref(1000)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (number: number) {
  console.log('number:', number)
}
function formatter (num: string): string {
  return moneyFormat(num, 2)
}
function onAntChange (number: number) {
  console.log('ant:', number)
}
</script>
<template>
  <div>
    <h1>InputNumber 数字输入框</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <InputNumber v-model:value="value" placeholder="请输入" />
    <h2 class="mt30 mb10">步数为小数</h2>
    <InputNumber :step="0.1" v-model:value="value" />
    <h2 class="mt30 mb10">设置数值精度</h2>
    <InputNumber
      :min="-10"
      :max="10"
      :step="0.6"
      :precision="2"
      v-model:value="value" />
    <h2 class="mt30 mb10">格式化展示</h2>
    <InputNumber
      :width="120"
      :step="10"
      :formatter="formatter"
      v-model:value="formatValue" />
    <h2 class="mt30 mb10">自定义最大最小值</h2>
    <InputNumber :min="0" :max="10" v-model:value="value" />
    <h2 class="mt30 mb10">添加前缀图标 $</h2>
    <InputNumber prefix="$" v-model:value="value" />
    <h2 class="mt30 mb10">Ant Design Vue 数字输入框</h2>
    <a-input-number
      :min="-10"
      :max="10"
      :step="0.01"
      :precision="1"
      @change="onAntChange"
      v-model:value="value" />
  </div>
</template>
