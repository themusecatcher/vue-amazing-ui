<script setup lang="ts">
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import { SoundFilled, FireFilled, ExclamationCircleFilled } from '@ant-design/icons-vue'
import { useMessage, MessageProvider, createDiscreteApi } from 'vue-amazing-ui'
import type { DiscreteApiInstance, MessageApi, MessageReactive, MessageUpdate } from 'vue-amazing-ui'
const message = useMessage()
// setup 外调用示例：createDiscreteApi 创建脱离组件树的独立实例
// 惰性单例：仅首次调用时创建，避免重复创建独立实例与挂载 DOM
let discreteMessage: DiscreteApiInstance<'message'> | null = null
function onDiscreteMessage() {
  if (!discreteMessage) {
    discreteMessage = createDiscreteApi(['message'])
  }
  discreteMessage.message.info('This message is opened by createDiscreteApi outside setup')
}
// 基本使用
function onOpen(content: string) {
  message.open(content) // open 调用
}
// 不同类型的全局提示
function onInfo(content: string) {
  message.info(content) // info 调用
}
function onSuccess(content: string) {
  message.success(content) // success 调用
}
function onError(content: string) {
  message.error(content) // error 调用
}
function onWarning(content: string) {
  message.warning(content) // warning 调用
}
function onLoading(content: string) {
  message.loading(content) // loading 调用
}
// 自定义图标
function onInfoIcon() {
  message.info({
    content: 'This is an info message with a custom icon',
    icon: h(SoundFilled)
  })
}
function onOpenIcon() {
  message.open({
    content: 'This is an open message with a custom icon',
    icon: h(FireFilled, { style: 'color: gold' })
  })
}
// icon 也支持渲染函数形态，每次渲染时动态生成图标
function onIconRenderFn() {
  message.success({
    content: 'icon 渲染函数：每次渲染时动态生成图标',
    icon: () => h(SoundFilled, { style: 'color: #52c41a' })
  })
}
// 自定义样式
function onCustomClass(content: string) {
  message.info({
    content: 'This is a custom class message',
    icon: h(SoundFilled),
    class: 'custom-message-class'
  })
}
function onCustomStyle(content: string) {
  message.warning({
    content: 'This is a custom style message',
    icon: h(FireFilled),
    style: {
      color: '#f50'
    }
  })
}
// 自动关闭
function onAutoClose() {
  message.info({
    content: 'This message will automatically turn off after 3 seconds.',
    onClose: () => {
      // onClose 回调：消息关闭后给出可见反馈
      message.success('onClose 回调触发: 上一条消息已自动关闭')
    }
  })
}
// 不自动关闭（duration: null），点击消息时通过句柄手动关闭（onClick 回调）
function onNeverAutoClose() {
  const handle = message.info({
    content: 'This message will not automatically turn off. Click it to close.',
    duration: null,
    onClick: () => handle.destroy()
  })
}
// 复杂内容：VNode 与渲染函数
function onVNodeContent() {
  message.info({
    content: h('span', { style: 'color: #1677ff; font-weight: 600' }, '这是一条 VNode 渲染的富文本内容')
  })
}
function onRenderFnContent() {
  message.info({
    content: () => h('span', { style: 'color: #52c41a; font-weight: 600' }, '这是一条渲染函数动态生成的内容')
  })
}
let messageReactive: MessageReactive | null = null
function onOpenMessage() {
  if (!messageReactive) {
    messageReactive = message.info({
      content: '这是一条消息（duration: null），可通过手动关闭',
      duration: null
    })
  }
}
function onDestroy() {
  if (messageReactive) {
    messageReactive.destroy()
    messageReactive = null
  }
}
// 原地更新 update
const updateTimers: ReturnType<typeof setInterval>[] = []
function onProgressUpload() {
  const percent = ref(0)
  const handle = message.loading({
    // content 传渲染函数：内部引用响应式 percent，进度变化时消息内容自动更新
    content: () =>
      h('span', { style: 'white-space: nowrap' }, [
        '上传中...',
        h(
          'span',
          {
            style: `
            display: inline-block;
            min-width: 4ch;
            text-align: right;
            font-variant-numeric: tabular-nums;
          `
          },
          [h('span', { style: 'font-weight: 600; color: #1677ff' }, `${percent.value}%`)]
        )
      ]),
    duration: null
  })
  const timer = setInterval(() => {
    percent.value += 2
    if (percent.value >= 100) {
      clearInterval(timer)
      // update 支持 mode：原地把 loading 图标切换为 success，并重设时长自动关闭
      const doneOptions: MessageUpdate = { content: '上传成功', mode: 'success', duration: 2000 }
      handle.update(doneOptions)
    }
  }, 100)
  updateTimers.push(timer)
}
onBeforeUnmount(() => {
  updateTimers.forEach((timer) => {
    clearInterval(timer)
  })
})
const maxCountMessage = ref<MessageApi>()
const hoverMessage = ref<MessageApi>()
const noHoverMessage = ref<MessageApi>()
const topMessage = ref<MessageApi>()
const toMessage = ref<MessageApi>()
const toReady = ref(false)
// 目标容器与组件位于同一组件树，需等挂载完成（目标已插入文档）后再渲染组件，Teleport 才能定位到目标
onMounted(() => {
  toReady.value = true
})
let maxCountSeed = 0
function onMaxCountMessage() {
  maxCountSeed += 1
  maxCountMessage.value?.info({
    content: `第 ${maxCountSeed} 条消息（最多同时存在 3 条）`,
    duration: null
  })
}
function onHoverPauseMessage() {
  hoverMessage.value?.info({
    content: '鼠标移入时暂停计时，移出后重新计时 2s 关闭',
    duration: 2000
  })
}
function onHoverNoPauseMessage() {
  noHoverMessage.value?.info({
    content: '鼠标移入不暂停计时，2s 后照常关闭',
    duration: 2000
  })
}
function onTopMessage() {
  topMessage.value?.info({
    content: '这条消息距离页面顶部 100px',
    duration: 2000
  })
}
function onToMessage() {
  toMessage.value?.info('这条消息被挂载到当前虚线容器中')
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">使用方式</h2>
    <Alert type="warning" message="提示" show-icon style="max-width: 800px">
      <template #icon>
        <ExclamationCircleFilled />
      </template>
      <template #description>
        <Space vertical>
          <p>
            本页示例在 <code>setup</code> 内通过 <code>useMessage()</code> 获取 api，需在应用入口
            <code>App.vue</code> 用 <code>&lt;MessageProvider&gt;</code> 包裹（本项目已在入口全局包裹）。<br />
            在 <code>setup</code> 之外（axios 拦截器、路由守卫、Pinia action 等）调用时，改用
            <code>createDiscreteApi(['message'])</code>，无需外层 Provider：
          </p>
          <Button type="primary" @click="onDiscreteMessage">Discrete Message（脱离组件树调用）</Button>
        </Space>
      </template>
    </Alert>
    <h2 class="mt30 mb10">基本使用</h2>
    <Button type="primary" @click="onOpen('This is a normal message')">Open</Button>
    <h2 class="mt30 mb10">不同类型的全局提示</h2>
    <Space>
      <Button type="primary" @click="onInfo('This is an info message')">Info</Button>
      <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
      <Button type="primary" @click="onError('This is an error message')">Error</Button>
      <Button type="primary" @click="onWarning('This is a warning message')">Warning</Button>
      <Button type="primary" @click="onLoading('This is a loading message')">Loading</Button>
    </Space>
    <h2 class="mt30 mb10">自定义图标</h2>
    <Space>
      <Button type="primary" @click="onInfoIcon">自定义 Info 图标</Button>
      <Button type="primary" @click="onOpenIcon">自定义 Open 图标</Button>
      <Button type="primary" @click="onIconRenderFn">图标渲染函数</Button>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Space>
      <Button type="primary" @click="onCustomClass">自定义 class</Button>
      <Button type="primary" @click="onCustomStyle">自定义 style</Button>
    </Space>
    <h2 class="mt30 mb10">自定义关闭延时</h2>
    <Space>
      <Button type="primary" @click="onAutoClose">3s 后自动关闭</Button>
      <Button type="primary" @click="onNeverAutoClose">常驻消息，点击关闭</Button>
    </Space>
    <h2 class="mt30 mb10">复杂内容</h2>
    <p class="mb10">
      <code>content</code> 支持三种形态：纯文本、<code>VNode</code> 与返回 <code>VNode</code> 的渲染函数
    </p>
    <Space>
      <Button type="primary" @click="onVNodeContent">VNode 内容</Button>
      <Button type="primary" @click="onRenderFnContent">渲染函数内容</Button>
    </Space>
    <h2 class="mt30 mb10">手动关闭</h2>
    <Space>
      <Button type="primary" @click="onOpenMessage">打开</Button>
      <Button @click="onDestroy">关闭</Button>
    </Space>
    <h2 class="mt30 mb10">原地更新</h2>
    <Button type="primary" @click="onProgressUpload">异步上传</Button>
    <h2 class="mt30 mb10">最大消息数</h2>
    <p class="mb10"> 连续打开消息时，超出上限会淘汰最旧的一条（淘汰不触发 <code>onClose</code>） </p>
    <MessageProvider :max-count="3" @ready="maxCountMessage = $event" />
    <Space>
      <Button type="primary" @click="onMaxCountMessage">打开消息（最多 3 条）</Button>
      <Button @click="maxCountMessage?.destroyAll()">全部销毁</Button>
    </Space>
    <h2 class="mt30 mb10">鼠标移入保持显示</h2>
    <MessageProvider :keep-alive-on-hover="true" @ready="hoverMessage = $event" />
    <MessageProvider :keep-alive-on-hover="false" @ready="noHoverMessage = $event" />
    <Space>
      <Button type="primary" @click="onHoverPauseMessage">hover 暂停关闭</Button>
      <Button type="primary" @click="onHoverNoPauseMessage">hover 不暂停关闭</Button>
    </Space>
    <h2 class="mt30 mb10">顶部位置</h2>
    <MessageProvider :top="100" @ready="topMessage = $event" />
    <Button type="primary" @click="onTopMessage">消息距顶部 100px</Button>
    <h2 class="mt30 mb10">自定义挂载容器</h2>
    <div id="message-to-container" class="message-to-container"></div>
    <MessageProvider v-if="toReady" to="#message-to-container" :top="20" @ready="toMessage = $event" />
    <Button type="primary" @click="onToMessage">挂载到指定容器</Button>
  </div>
</template>
<style lang="less" scoped>
.message-to-container {
  position: relative;
  transform: translateZ(0); // 建立包含块，使内部 fixed 定位的消息相对该容器定位
  max-width: 800px;
  height: 240px;
  margin-bottom: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
}
</style>
<style lang="less">
// 消息通过 Teleport 挂载到 body 下，scoped 样式无法命中，需使用全局样式
.custom-message-class {
  color: #ff6900;
}
</style>
