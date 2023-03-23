<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { rafTimeout, cancelAnimationFrame } from '@/utils/util'

const n = ref(0)
function test (n: Ref) {
  n.value++
  console.log('n:', n.value)
  console.log('rafId:', raf.id)
}
const raf = rafTimeout(() => {
  test(n)
}, 1000, true)

rafTimeout(() => {
  cancelAnimationFrame(raf.id)
}, 3000)

</script>
<template>
  <div class="home">
    <h1>Vue Amazing UI</h1>
    <p class="u-tip mb10 mt10">该组件库采用 Vue3 + TS + Vite3 + Less 实现！</p>
    <p class="u-tip">开箱即用！</p>
    <h2 class="mt30">主要有以下三种使用方式：</h2>
    <ul class="m-list">
      <li class="u-tip mb10 mt10">（yarn add vue-amazing-ui）安装组件库后，全局引入所有组件</li>
      <li class="u-tip mb10">（yarn add vue-amazing-ui）安装组件库后，按需引入部分组件</li>
      <li class="u-tip mb10"> git clone<a href="https://github.com/themusecatcher/vue-amazing-ui" target="_blank">组件库项目</a>到本地后，从packages下单独拷贝某个单文件组件（SFC）到需要组件的项目内使用。</li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
</style>
