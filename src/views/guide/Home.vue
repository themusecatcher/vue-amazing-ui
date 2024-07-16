<script setup lang="ts">
import pkg from '/package.json'
import { ref, computed } from 'vue'
import { routes } from '@/router'
import { useFps } from 'packages'
const { fps } = useFps()
const installData = ref([
  {
    header: 'Install',
    text: `pnpm i vue-amazing-ui\n# or\nyarn add vue-amazing-ui\n# or\nnpm i vue-amazing-ui`
  }
])
// import.meta.glob 都支持以字符串形式导入文件，类似于 以字符串形式导入资源
const modules = import.meta.glob('../../../package.json', { eager: true })
const url = '../../../package.json'
// 字符串类型对象
type Recordable<T = any> = Record<string, T>
const dependencies = (modules as Recordable)[url].dependencies
console.log('dependencies', dependencies)

const collapseData = ref([
  {
    header: '以上工具函数 API 使用时直接引入即可:',
    text: `<script setup lang="ts">
import {
  dateFormat,
  formatNumber,
  rafTimeout,
  cancelRaf,
  throttle,
  debounce,
  add,
  downloadFile,
  toggleDark,
  useEventListener,
  useMutationObserver,
  useScrollDirection,
  useFps
} from 'vue-amazing-ui'
<\/script>`
  }
])
const activeKey = ref(0)
const sum = computed(() => {
  return (routes[0].children as Array<any>).length - 2
})
function onOpen() {
  // 打开一个新的窗口，并导航到指定的URL
  // let newWindow = window.open() // 在当前浏览器窗口中打开一个空的标签页
  // let newWindow = window.open('http://localhost:9000/backtop') // 在当前浏览器窗口中打开新的标签页
  // let newWindow = window.open('http://localhost:9000/backtop', 'Backtop') // 在当前浏览器窗口中打开新的标签页
  // 使用弹窗形式打开新的标签页，不指定left，top时，默认紧靠电脑桌面左上角
  let newWindow = window.open('http://localhost:9000/backtop', '_blank', 'popup,width=800,height=600')
  // newWindow?.resizeTo(800, 600)
  // newWindow?.moveTo(100, 100)
}
</script>
<template>
  <div>
    <Space align="top" :gap="6">
      <h1>Vue Amazing UI</h1>
      <Tag color="#FC5404">{{ pkg.version }}</Tag>
    </Space>
    <br />
    <br />
    <Tag color="purple">FPS：{{ fps }}</Tag>
    <br />
    <br />
    <Button type="primary" @click="onOpen">Open New Window</Button>
    <Descriptions class="mb10 mt30" title="生产环境依赖 (dependencies)" :column="{ md: 2, lg: 3, xl: 4 }">
      <DescriptionsItem :label="dependency" v-for="(version, dependency) in pkg.dependencies" :key="dependency">
        <Tag color="volcano">{{ version }}</Tag>
      </DescriptionsItem>
    </Descriptions>
    <Descriptions class="mb10 mt30" title="开发环境依赖 (devDependencies)" :column="{ md: 2, lg: 3, xl: 4 }">
      <DescriptionsItem :label="dependency" v-for="(version, dependency) in pkg.devDependencies" :key="dependency">
        <Tag color="cyan">{{ version }}</Tag>
      </DescriptionsItem>
    </Descriptions>
    <p class="u-tip mb10">
      所有组件
      <Tag color="magenta">CSS</Tag>
      样式均使用
      <Tag color="magenta">box-sizing: border-box;</Tag>
      模式！
    </p>
    <p class="u-tip mb10">
      目前共有
      <Tag color="magenta">{{ sum }}</Tag>
      个常用基础
      <Tag color="magenta">UI</Tag>
      组件，以及
      <Tag color="magenta">12</Tag>
      个常用工具函数，并且持续探索更新中...！
    </p>
    <p class="u-tip">开箱即用！</p>
    <h2 class="mt30 mb10">使用方式：</h2>
    <Collapse lang="bash" :fontSize="16" :collapseData="installData" v-model:activeKey="activeKey" copyable />
    <ul class="m-list">
      <li class="u-tip mb10 mt10">全局引入并注册所有组件</li>
      <li class="u-tip mb10">按需引入并注册部分组件</li>
    </ul>
    <h2 class="mt30">常用工具函数：</h2>
    <ul class="m-list">
      <li class="u-tip mb10 mt10">
        <Tag color="geekblue">dateFormat</Tag>
        : 格式化日期时间字符串函数
      </li>
      <li class="u-tip mb10">
        <Tag color="geekblue">formatNumber</Tag>
        : 数字格式化函数
      </li>
      <li class="u-tip mb10">
        <Tag color="geekblue">rafTimeout</Tag>
        : 使用 requestAnimationFrame 实现的延迟 setTimeout 或间隔 setInterval 调用函数
      </li>
      <li class="u-tip mb10">
        <Tag color="geekblue">cancelRaf</Tag>
        : 用于取消 rafTimeout 函数
      </li>
      <li class="u-tip mb10">
        <Tag color="geekblue">throttle</Tag>
        : 节流函数
      </li>
      <li class="u-tip mb10">
        <Tag color="geekblue">debounce</Tag>
        : 防抖函数
      </li>
      <li class="u-tip mb10">
        <Tag color="geekblue">add</Tag>
        : 消除js加减精度问题的加法函数
      </li>
      <li class="u-tip mb10">
        <Tag color="geekblue">downloadFile</Tag>
        : 下载文件并自定义文件名，未传文件名时，从文件地址中自动提取文件名称
      </li>
      <li class="u-tip mb10">
        <Tag color="geekblue">toggleDark</Tag>
        : 一键切换暗黑模式函数
      </li>
      <li class="u-tip mb10">
        <Tag color="geekblue">useEventListener</Tag>
        : 使用 Vue 的生命周期钩子添加和移除事件监听器
      </li>
      <li class="u-tip mb10">
        <Tag color="geekblue">useMutationObserver</Tag>
        : 使用 MutationObserver 观察 DOM 元素的变化
      </li>
      <li class="u-tip mb10">
        <Tag color="geekblue">useScrollDirection</Tag>
        : 实时监测页面滚动方向
      </li>
      <li class="u-tip mb10">
        <Tag color="geekblue">useFps</Tag>
        : 实时监测浏览器刷新率 FPS
      </li>
    </ul>
    <Collapse lang="vue3" :fontSize="16" :collapseData="collapseData" v-model:activeKey="activeKey" copyable />
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
