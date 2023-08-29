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
    <h2 class="mt30 mb10">禁用</h2>
    <Rate v-model:value="value" disabled />
    <h2 class="mt30 mb10">空心星型</h2>
    <Rate character="star-outlined" :size="30" v-model:value="value"/>
    <h2 class="mt30 mb10">实心心型</h2>
    <Rate character="heart-filled" :size="30" v-model:value="value"/>
    <h2 class="mt30 mb10">空心心型</h2>
    <Rate character="heart-outlined" :size="30" v-model:value="value"/>
    <h2 class="mt30 mb10">支持选中半星</h2>
    <Rate v-model:value="value" :size="30" allow-half />
    <h2 class="mt30 mb10">使用中文文字: 好</h2>
    <Rate
      character="好"
      :size="36"
      v-model:value="value"
      @change="onChange"
      @hover-change="onHoverChange" />
    <h2 class="mt30 mb10">使用英文字母: A</h2>
    <Rate
      character="A"
      :size="48"
      v-model:value="value"
      @change="onChange"
      @hover-change="onHoverChange" />
    <h2 class="mt30 mb10">自定义选中颜色</h2>
    <Rate color="#1677FF" :size="30" v-model:value="value" />
    <h2 class="mt30 mb10">自定义间距</h2>
    <Rate :size="30" :gap="16" v-model:value="value" />
    <h2 class="mt30 mb10">自定义 star 总数</h2>
    <Rate :size="30" :count="10" v-model:value="value" />
    <h2 class="mt30 mb10">Ant Design Vue 评分</h2>
    <a-rate v-model:value="value" allow-half />
  </div>
</template>
