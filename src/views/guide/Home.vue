<script setup lang="ts">
import pkg from '/package.json'
import { ref, computed } from 'vue'
import { routes } from '@/router'
const installData = ref([
  {
    header: 'Install',
    text: `pnpm i vue-amazing-ui\n# or\nyarn add vue-amazing-ui\n# or\nnpm i vue-amazing-ui`
  }
])
const collapseData = ref([
  {
    header: '以上工具函数 API 使用时直接引入即可:',
    text: `<script setup lang="ts">
\import {
  dateFormat,
  requestAnimationFrame,
  cancelAnimationFrame,
  rafTimeout,
  cancelRaf,
  throttle,
  debounce,
  add,
  downloadFile,
  moneyFormat,
  toggleDark
} from 'vue-amazing-ui'
<\/script>`
  }
])
const activeKey = ref(0)
const sum = computed(() => {
  return (routes[0].children as Array<any>).length - 2
})
</script>
<template>
  <div>
    <Space align="top" :size="6">
      <h1>Vue Amazing UI</h1>
      <Tag color="volcano">{{ pkg.version }}</Tag>
    </Space>
    <Descriptions class="mb10 mt30" title="生产环境依赖" :column="{md: 2, lg: 3, xl: 4}">
      <DescriptionsItem :label="dependency" v-for="(version, dependency) in pkg.dependencies">
        <Tag color="volcano">{{ version }}</Tag>
      </DescriptionsItem>
    </Descriptions>
    <Descriptions class="mb10 mt30" title="开发环境依赖" :column="{md: 2, lg: 3, xl: 4}">
      <DescriptionsItem :label="dependency" v-for="(version, dependency) in pkg.devDependencies">
        <Tag color="volcano">{{ version }}</Tag>
      </DescriptionsItem>
    </Descriptions>
    <p class="u-tip mb10">所有组件 <Tag color="magenta">CSS</Tag> 样式均使用 <Tag color="magenta">box-sizing: border-box;</Tag> 模式！</p>
    <p class="u-tip mb10">目前共有 <Tag color="magenta">{{ sum }}</Tag> 个常用基础 <Tag color="magenta">UI</Tag> 组件，以及 <Tag color="magenta">11</Tag> 个常用工具函数，并且持续探索更新中...！</p>
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
    <h2 class="mt30">常用工具函数：</h2>
    <ul class="m-list">
      <li class="u-tip mb10 mt10"><Tag color="cyan">dateFormat</Tag>: 简单易用的日期格式化函数！</li>
      <li class="u-tip mb10"><Tag color="cyan">requestAnimationFrame</Tag>: 针对不同浏览器进行兼容处理！</li>
      <li class="u-tip mb10"><Tag color="cyan">cancelAnimationFrame</Tag>: 针对不同浏览器进行兼容处理！</li>
      <li class="u-tip mb10"><Tag color="cyan">rafTimeout</Tag>: 使用 requestAnimationFrame 实现的定时器函数，等效替代 (setTimeout 和 setInterval)！</li>
      <li class="u-tip mb10"><Tag color="cyan">cancelRaf</Tag>: 用于取消 rafTimeout 函数！</li>
      <li class="u-tip mb10"><Tag color="cyan">throttle</Tag>: 使用 rafTimeout 实现的节流函数！</li>
      <li class="u-tip mb10"><Tag color="cyan">debounce</Tag>: 使用 rafTimeout 实现的防抖函数！</li>
      <li class="u-tip mb10"><Tag color="cyan">add</Tag>: 消除js加减精度问题的加法函数！</li>
      <li class="u-tip mb10"><Tag color="cyan">downloadFile</Tag>: 下载文件并自定义文件名，未传文件名时，从文件地址中自动获取文件名称！</li>
      <li class="u-tip mb10"><Tag color="cyan">moneyFormat</Tag>: 金额格式化函数！</li>
      <li class="u-tip mb10"><Tag color="cyan">toggleDark</Tag>: 一键切换黑暗模式函数！</li>
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
.u-head {
  font-size: 16px;
}
.u-text {
  font-size: 16px;
}
</style>
