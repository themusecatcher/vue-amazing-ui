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
    <InputNumber
      :min="-10"
      :max="10"
      :step="1"
      @change="onChange"
      v-model:value="value" />
    <h2 class="mt30 mb10">前缀图标$ (prefix: '$')</h2>
    <InputNumber
      :min="-10"
      :max="10"
      :step="1"
      prefix="$"
      @change="onChange"
      v-model:value="value" />
    <h2 class="mt30 mb10">Ant Design Vue 数字输入框</h2>
    <a-input-number
      :min="-10"
      :max="10"
      :step="1"
      @change="onAntChange"
      v-model:value="value" />
  </div>
</template>
