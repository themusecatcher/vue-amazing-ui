<script setup lang="ts">
import { ref, watch } from 'vue'

const value = ref(2.99)
const desc = ref(['terrible', 'bad', 'normal', 'good', 'wonderful'])
watch(value, (to) => {
  console.log('p to:', to)
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
    <h2 class="mb10">Rate 评分基本使用 (character: star)</h2>
    <Rate
      :count="5"
      character="star"
      :disabled="false"
      v-model:value="value"
      @change="onChange"
      @hoverChange="onHoverChange"/>
    <h2 class="mt30 mb10">使用预置的心型字符图标，并设置高度为30px (character: heart & size: 30)</h2>
    <Rate
      :allowClear="true"
      :allowHalf="true"
      :count="5"
      character="heart"
      :size="30"
      :disabled="false"
      v-model:value="value"
      @change="onChange"
      @hoverChange="onHoverChange"/>
    <h2 class="mt30 mb10">使用中文: 好 (character: 好 & size: 30)</h2>
    <Rate
      :allowClear="false"
      :allowHalf="true"
      :count="5"
      character="好"
      :size="30"
      v-model:value="value"
      @change="onChange"
      @hoverChange="onHoverChange"/>
    <h2 class="mt30 mb10">使用英文字母: A (character: A & size: 50)</h2>
    <Rate
      :allowClear="false"
      :allowHalf="true"
      :count="5"
      character="A"
      :size="50"
      v-model:value="value"
      @change="onChange"
      @hoverChange="onHoverChange"/>
    <h2 class="mt30 mb10">Ant Design Vue 评分</h2>
    <a-rate v-model:value="value" @change="onChange" />
  </div>
</template>
<style lang="less" scoped>
</style>
