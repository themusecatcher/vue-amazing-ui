<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (number: number) {
  console.log('number:', number)
}
function onAntChange (number: number) {
  console.log('ant:', number)
}
</script>
<template>
  <div>
    <h2 class="mb10">InputNumber 数字输入框基本使用</h2>
    <InputNumber v-model:value="value" />
    <h2 class="mt30 mb10">步数为小数</h2>
    <InputNumber :step="0.1" v-model:value="value" />
    <h2 class="mt30 mb10">限制最大最小值</h2>
    <InputNumber :min="0" :max="10" v-model:value="value" />
    <h2 class="mt30 mb10">添加前缀图标 $</h2>
    <InputNumber prefix="$" v-model:value="value" />
    <h2 class="mt30 mb10">Ant Design Vue 数字输入框</h2>
    <a-input-number
      :min="-10"
      :max="10"
      :step="1"
      @change="onAntChange"
      v-model:value="value" />
  </div>
</template>
