<script setup lang="ts">
import { ref, computed } from 'vue'
import { routes } from '../../router'
const installData = ref([
  {
    header: 'Install',
    text: `pnpm i vue-amazing-ui\n# or\nyarn add vue-amazing-ui\n# or\nnpm i vue-amazing-ui`
  }
])
const collapseData = ref([
  {
    header: '以上十个 API 使用时直接引入即可:',
    text: `<script setup lang="ts">
\import { dateFormat, requestAnimationFrame, cancelAnimationFrame, rafTimeout, cancelRaf, throttle, debounce, add, downloadFile, moneyFormat } from 'vue-amazing-ui'
<\/script>`
  }
])
const activeKey = ref(0)
const sum = computed(() => {
  return (routes[0].children as Array<any>).length - 1
})
function onFinish () {
  console.log('Off Duty！')
}
const getOffDate = (time: string): number => {
  const date = new Date()
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  return new Date(`${Y} ${M} ${D} ${time}`).getTime() + 9 * 60 * 60 * 1000
}
const countdown = computed(() => {
  return getOffDate('9:02')
})
</script>
<template>
  <div>
    <Countdown
      class="countdown"
      title="Off Duty"
      :value="countdown"
      format="HH:mm:ss"
      finished-text="GO GO GO"
      @finish="onFinish" />
    <h1>Vue Amazing UI</h1>
    <p class="u-tip mb10 mt30">该组件库采用 Vue3@3.3.4 + TypeScript@4.7.4 + Vite4.4.7 + Less@4.1.3 实现！</p>
    <p class="u-tip mb10">所有组件 CSS 样式均使用 box-sizing: border-box; 模式！</p>
    <p class="u-tip mb10">目前共有 {{ sum }} 个常用基础 UI 组件，以及 10 个常用工具函数，并且持续探索更新中...！</p>
    <p class="u-tip">开箱即用！</p>
    <h2 class="mt30 mb10">使用方式：</h2>
    <Collapse
      lang="bash"
      :fontSize="16"
      :collapseData="installData"
      v-model:activeKey="activeKey"
      copyable />
    <ul class="m-list">
      <li class="u-tip mb10 mt10">全局引入并注册所有组件</li>
      <li class="u-tip mb10">按需引入并注册部分组件</li>
    </ul>
    <h2 class="mt30">除此以外，Vue Amazing UI 还提供了十个常用工具函数 ：</h2>
    <ul class="m-list">
      <li class="u-tip mb10 mt10">dateFormat: 简单易用的日期格式化函数！</li>
      <li class="u-tip mb10">requestAnimationFrame: 针对不同浏览器进行兼容处理！</li>
      <li class="u-tip mb10">cancelAnimationFrame: 针对不同浏览器进行兼容处理！</li>
      <li class="u-tip mb10">rafTimeout: 使用 requestAnimationFrame 实现的定时器函数，等效替代 (setTimeout 和 setInterval)！</li>
      <li class="u-tip mb10">cancelRaf: 用于取消 rafTimeout 函数！</li>
      <li class="u-tip mb10">throttle: 使用 rafTimeout 实现的节流函数！</li>
      <li class="u-tip mb10">debounce: 使用 rafTimeout 实现的防抖函数！</li>
      <li class="u-tip mb10">add: 消除js加减精度问题的加法函数！</li>
      <li class="u-tip mb10">downloadFile: 下载文件并自定义文件名，未传文件名时，从文件地址中自动获取文件名称！</li>
      <li class="u-tip mb10">moneyFormat: 金额格式化函数！</li>
    </ul>
    <Collapse
      lang="vue3"
      :fontSize="16"
      :collapseData="collapseData"
      v-model:activeKey="activeKey"
      copyable />
  </div>
</template>
<style lang="less">
.countdown {
  position: fixed;
  top: 36px;
  right: 36px;
  z-index: 1;
}
.u-head {
  font-size: 16px;
}
.u-text {
  font-size: 16px;
}
</style>
