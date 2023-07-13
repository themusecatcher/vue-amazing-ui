<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const value = ref(2.99)
watchEffect(() => {
  console.log('value:', value.value)
})
function onChange (value: number) {
  console.log('change value:', value)
}
function onHoverChange (value: number) {
  console.log('hover value:', value)
}
</script>
<template>
  <div>
    <h1>Rate 评分</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Rate v-model:value="value"/>
    <h2 class="mt30 mb10">空心星型图标，高度30px (character: star-outlined & size: 30)</h2>
    <Rate character="star-outlined" :size="30" v-model:value="value"/>
    <h2 class="mt30 mb10">实心心型图标，高度30px (character: heart-filled & size: 30)</h2>
    <Rate character="heart-filled" :size="30" v-model:value="value"/>
    <h2 class="mt30 mb10">空心心型图标，高度30px (character: heart-outlined & size: 30)</h2>
    <Rate character="heart-outlined" :size="30" v-model:value="value"/>
    <h2 class="mt30 mb10">支持选中半星，选中颜色：#1677FF，高度30px (allowHalf: true & color: #1677FF & size: 30)</h2>
    <Rate allowHalf :size="30" color="#1677FF" v-model:value="value"/>
    <h2 class="mt30 mb10">使用中文文字: 好，高度36px (character: 好 & size: 36)</h2>
    <Rate
      allowHalf
      character="好"
      :size="36"
      v-model:value="value"
      @change="onChange"
      @hover-change="onHoverChange"/>
    <h2 class="mt30 mb10">使用英文字母: A (character: A & size: 48)</h2>
    <Rate
      allowHalf
      character="A"
      :size="48"
      v-model:value="value"
      @change="onChange"
      @hover-change="onHoverChange"/>
    <h2 class="mt30 mb10">Ant Design Vue 评分</h2>
    <a-rate v-model:value="value" allow-half />
  </div>
</template>
