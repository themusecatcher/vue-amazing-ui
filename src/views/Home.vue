<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { rafTimeout, cancelRaf } from '../../packages'

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
  cancelRaf(raf)
  // cancelAnimationFrame(raf.id)
}, 3000)

const collapseData = ref([
  {
    header: '以上六个 API 使用时只需:',
    text: `import { requestAnimationFrame, cancelAnimationFrame, rafTimeout, cancelRaf, throttle, debounce } from 'vue-amazing-ui'`
  }
])
const activeKey = ref(0)
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
    <h2 class="mt30">除此以外，Vue Amazing UI 还提供了六个常用 API ：</h2>
    <ul class="m-list">
      <li class="u-tip mb10 mt10">requestAnimationFrame: 针对不同浏览器进行兼容处理！</li>
      <li class="u-tip mb10">cancelAnimationFrame: 针对不同浏览器进行兼容处理！</li>
      <li class="u-tip mb10">rafTimeout: 使用 requestAnimationFrame 实现的定时器函数，等效替代（setTimeout 和 setInterval）！</li>
      <li class="u-tip mb10">cancelRaf: 用于取消 rafTimeout 函数！</li>
      <li class="u-tip mb10">throttle: 使用 rafTimeout 实现的节流函数！</li>
      <li class="u-tip mb10">debounce: 使用 rafTimeout 实现的防抖函数！</li>
    </ul>
    <Collapse
      lang="ts"
      :fontSize="16"
      :collapseData="collapseData"
      v-model:activeKey="activeKey"
      copyable />
  </div>
</template>
<style lang="less">
.u-head {
  font-size: 16px;
}
.u-text {
  font-size: 16px;
}
</style>
