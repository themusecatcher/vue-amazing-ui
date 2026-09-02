<script setup lang="ts">
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import { CloudFilled, FireFilled, SoundFilled, ExclamationCircleFilled } from '@ant-design/icons-vue'
import { Button, createDiscreteApi, NotificationProvider, useMessage, useNotification } from 'vue-amazing-ui'
import type {
  DiscreteApiInstance,
  NotificationApi,
  NotificationOptions,
  NotificationReactive,
  NotificationUpdate
} from 'vue-amazing-ui'
// setup 内调用 useNotification()：需外层存在 <NotificationProvider>（本项目已在 App.vue 入口全局包裹）
const notification = useNotification()
// setup 内调用 useMessage()：需外层存在 <MessageProvider>（本项目已在 App.vue 入口全局包裹）
const message = useMessage()
// setup 外调用示例：createDiscreteApi 创建脱离组件树的独立实例
// 惰性单例：仅首次调用时创建，避免重复创建独立实例与挂载 DOM
let discreteNotification: DiscreteApiInstance<'notification'> | null = null
function onDiscreteNotification() {
  if (!discreteNotification) {
    discreteNotification = createDiscreteApi(['notification'])
  }
  discreteNotification.notification.info({
    title: 'Discrete Notification',
    content: 'This notification is opened by createDiscreteApi outside setup'
  })
}
// 基本使用
function onOpen(content: string) {
  notification.open({
    title: 'Notification Title',
    content
  }) // open 调用
}
// 不同类型的通知提醒
function onInfo(content: string) {
  notification.info({
    title: 'Notification Title',
    content
  }) // info 调用
}
function onSuccess(content: string) {
  notification.success({
    title: 'Notification Title',
    content
  }) // success 调用
}
function onWarning(content: string) {
  notification.warning({
    title: 'Notification Title',
    content
  }) // warning 调用
}
function onError(content: string) {
  notification.error({
    title: 'Notification Title',
    content
  }) // error 调用
}
// 自定义图标
function onInfoIcon() {
  notification.info({
    title: 'Notification Title',
    content: 'This is an info notification with a custom icon',
    icon: h(CloudFilled)
  })
}
function onOpenIcon() {
  notification.open({
    title: 'Notification Title',
    content: 'This is an open notification with a custom icon',
    icon: h(FireFilled, { style: 'color: gold' })
  })
}
// icon 也支持渲染函数形态，每次渲染时动态生成图标
function onIconRenderFn() {
  notification.success({
    title: 'Notification Title',
    content: 'icon 渲染函数：每次渲染时动态生成图标',
    icon: () => h(SoundFilled, { style: 'color: #52c41a' })
  })
}
// 自定义样式
function onCustomClass() {
  notification.open({
    title: 'Notification Title',
    content: 'This is a custom class notification',
    icon: h(FireFilled),
    class: 'custom-notification-class'
  })
}
function onStyleCustom() {
  notification.warning({
    title: 'Notification Title',
    content: 'This is a custom style notification',
    icon: h(CloudFilled),
    style: {
      width: '420px',
      color: '#ff6900'
    }
  })
}
// 自定义关闭延时与回调
function onAutoClose() {
  notification.info({
    title: 'Notification Title',
    content: 'The notification will automatically turn off after 3 seconds.',
    duration: 3000,
    onClose: () => {
      // onClose 回调：通知关闭后给出可见反馈
      notification.success({
        title: 'onClose 回调触发',
        content: '上一条通知已自动关闭'
      })
    }
  })
}
// 不自动关闭（duration: null），可点击通知右上角关闭按钮，或通过句柄手动关闭
function onNeverAutoClose() {
  notification.info({
    title: 'Notification Title',
    content: 'This notification will not automatically turn off.',
    duration: null
  })
}
// 复杂内容：title / content 均支持 VNode 与渲染函数
function onVNodeContent() {
  notification.info({
    title: h('span', { style: 'color: #1677ff; font-weight: 600' }, 'VNode 标题'),
    content: h('span', { style: 'color: #1677ff' }, '这是一条 VNode 渲染的富文本内容')
  })
}
function onRenderFnContent() {
  notification.info({
    title: () => h('span', { style: 'color: #d4380d; font-weight: 600' }, '渲染函数标题'),
    content: () => h('span', { style: 'color: #389e0d' }, '这是一条渲染函数动态生成的内容')
  })
}
// 自定义按钮：点击 Confirm 关闭当前通知（对齐 antdv with-btn）
function onAction() {
  const handle = notification.open({
    title: 'Notification Title',
    content:
      'A function will be called after the notification is closed (automatically after the "duration" time of manually).',
    action: () =>
      h(
        Button,
        {
          type: 'primary',
          size: 'small',
          onClick: () => handle.destroy()
        },
        { default: () => 'Confirm' }
      )
  })
}
// 点击通知体：onClick 回调；点击右上角关闭按钮不会触发（已阻止冒泡）
function onClickNotification() {
  notification.info({
    title: '点击通知体',
    content: '点击这条通知会触发 onClick 回调，点击右上角关闭按钮不触发',
    duration: null,
    onClick: () => {
      message.success('已触发 onClick 回调')
    }
  })
}
// 自定义关闭行为：onClose 返回 false 阻止右上角 X 关闭，点击"已读"后才能关闭
function onUnclosable() {
  let markAsRead = false
  const handle = notification.open({
    title: '消息通知',
    content: `I cant get no satisfaction
I cant get no satisfaction
Cause I try and I try and I try and I try
I cant get no, I cant get no`,
    duration: null,
    onClose: () => {
      if (!markAsRead) {
        message.warning('请设为已读')
        return false
      }
    },
    meta: '2030-10-10 10:10',
    action: () =>
      h(
        'a',
        {
          style: 'color: var(--notification-primary-color); cursor: pointer; font-weight: 500; user-select: none',
          onClick: () => {
            markAsRead = true
            handle.destroy()
          }
        },
        '已读'
      )
  })
}
// 隐藏关闭按钮：单条 closable 优先于组件级；组件级 closable 对该实例内的所有通知生效
function onNoClosable() {
  notification.warning({
    title: '隐藏关闭按钮',
    content: 'closable: false 时不渲染右上角关闭按钮，3s 后自动关闭',
    closable: false,
    duration: 3000
  })
}
// 手动关闭：保存句柄，通过 destroy() 手动关闭
let notificationReactive: NotificationReactive | null = null
function onOpenNotification() {
  if (!notificationReactive) {
    notificationReactive = notification.info({
      title: 'Notification Title',
      content: '这是一条通知（duration: null），可通过手动关闭',
      duration: null
    })
  }
}
function onDestroy() {
  if (notificationReactive) {
    notificationReactive.destroy()
    notificationReactive = null
  }
}
// 原地更新 update
const updateTimers: ReturnType<typeof setInterval>[] = []
function onProgressUpload() {
  const percent = ref(0)
  const handle = notification.info({
    title: '上传中',
    // content 传渲染函数：内部引用响应式 percent，进度变化时通知内容自动更新
    content: () =>
      h('span', { style: 'white-space: nowrap' }, [
        '正在上传附件...',
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
      // update 支持 mode：原地把 info 图标切换为 success，并重设时长自动关闭
      const doneOptions: NotificationUpdate = {
        title: '上传成功',
        content: '附件已上传，2 秒后自动关闭',
        mode: 'success',
        duration: 2000
      }
      handle.update(doneOptions)
    }
  }, 100)
  updateTimers.push(timer)
}
// 指定 key：同一 key 重复调用不会叠加，只更新该条并重新计时；也可由 api.destroy(key) 跨调用点关闭
const SYNC_TASK_KEY = 'sync-task'
let keySeed = 0
function onKeyNotification() {
  keySeed += 1
  notification.info({
    key: SYNC_TASK_KEY,
    title: '数据同步',
    content: `第 ${keySeed} 次同步：相同 key 不会新增通知，只更新这一条并重新计时`,
    onClose: () => {
      keySeed = 0
    }
  })
}
function onDestroyByKey() {
  notification.destroy(SYNC_TASK_KEY)
  keySeed = 0
}
onBeforeUnmount(() => {
  updateTimers.forEach((timer) => {
    clearInterval(timer)
  })
})
// placement 之外的组件级配置（top / bottom / keepAliveOnHover / maxCount / to）需通过 <NotificationProvider> 传入
const topNotification = ref<NotificationApi>()
const bottomNotification = ref<NotificationApi>()
const hoverNotification = ref<NotificationApi>()
const noHoverNotification = ref<NotificationApi>()
const maxCountNotification = ref<NotificationApi>()
const toNotification = ref<NotificationApi>()
const toReady = ref(false)
// 目标容器与组件位于同一组件树，需等挂载完成（目标已插入文档）后再渲染组件，Teleport 才能定位到目标
onMounted(() => {
  toReady.value = true
})
let maxCountSeed = 0
function onMaxCountNotification() {
  maxCountSeed += 1
  maxCountNotification.value?.info({
    title: 'Notification Title',
    content: `第 ${maxCountSeed} 条通知，同一位置最多同时存在 3 条`,
    duration: null
  })
}
function onHoverPauseNotification() {
  hoverNotification.value?.info({
    title: 'keepAliveOnHover: true',
    content: '鼠标移入时暂停计时，移出后重新计时 2s 关闭',
    duration: 2000
  })
}
function onHoverNoPauseNotification() {
  noHoverNotification.value?.info({
    title: 'keepAliveOnHover: false',
    content: '鼠标移入不暂停计时，2s 后照常关闭',
    duration: 2000
  })
}
// placement 类型复用组件导出的 Notification 配置类型，避免手写联合类型与组件定义脱节
// NonNullable 用于去掉可选属性带来的 undefined（此处参数为必填）
function onOpenPlacement(placement: NonNullable<NotificationOptions['placement']>) {
  notification.info({
    title: 'Notification Title',
    content: 'This is the content of the notification.',
    placement
  })
}
function onTopNotification() {
  topNotification.value?.info({
    title: 'top: 100',
    content: '这条通知距离页面顶部 100px',
    duration: 2000
  })
}
function onBottomNotification() {
  bottomNotification.value?.info({
    title: 'bottom: 100',
    content: '这条通知距离页面底部 100px',
    duration: 2000
  })
}
function onToNotification() {
  toNotification.value?.info({
    title: 'Notification Title',
    content: '这条通知被挂载到当前虚线容器中',
    duration: null
  })
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
            本页示例在 <code>setup</code> 内通过 <code>useNotification()</code> 获取 api，需在应用入口
            <code>App.vue</code> 用 <code>&lt;NotificationProvider&gt;</code> 包裹（本项目已在入口全局包裹）。<br />
            在 <code>setup</code> 之外（axios 拦截器、路由守卫、Pinia action 等）调用时，改用
            <code>createDiscreteApi(['notification'])</code>，无需外层 Provider：
          </p>
          <Button type="primary" @click="onDiscreteNotification">Discrete Notification（脱离组件树调用）</Button>
        </Space>
      </template>
    </Alert>
    <h2 class="mt30 mb10">基本使用</h2>
    <Button type="primary" @click="onOpen('This is a normal notification')">Open</Button>
    <h2 class="mt30 mb10">不同类型的通知提醒</h2>
    <Space>
      <Button type="primary" @click="onInfo('This is a normal notification')">Info</Button>
      <Button type="primary" @click="onSuccess('This is a success notification')">Success</Button>
      <Button type="primary" @click="onWarning('This is a warning notification')">Warning</Button>
      <Button type="primary" @click="onError('This is a error notification')">Error</Button>
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
      <Button type="primary" @click="onStyleCustom">自定义 style</Button>
    </Space>
    <h2 class="mt30 mb10">弹出位置</h2>
    <div class="notification-placement">
      <Button class="placement-btn tl" type="primary" @click="onOpenPlacement('topLeft')">topLeft</Button>
      <Button class="placement-btn top" type="primary" @click="onOpenPlacement('top')">top</Button>
      <Button class="placement-btn tr" type="primary" @click="onOpenPlacement('topRight')">topRight</Button>
      <Button class="placement-btn bl" type="primary" @click="onOpenPlacement('bottomLeft')">bottomLeft</Button>
      <Button class="placement-btn bottom" type="primary" @click="onOpenPlacement('bottom')">bottom</Button>
      <Button class="placement-btn br" type="primary" @click="onOpenPlacement('bottomRight')">bottomRight</Button>
    </div>
    <h2 class="mt30 mb10">顶部/底部偏移</h2>
    <NotificationProvider :top="100" @ready="topNotification = $event" />
    <NotificationProvider placement="bottomRight" :bottom="100" @ready="bottomNotification = $event" />
    <Space>
      <Button type="primary" @click="onTopNotification">通知距顶部 100px</Button>
      <Button type="primary" @click="onBottomNotification">通知距底部 100px</Button>
    </Space>
    <h2 class="mt30 mb10">自定义关闭延时</h2>
    <Space>
      <Button type="primary" @click="onAutoClose">3s 后自动关闭</Button>
      <Button type="primary" @click="onNeverAutoClose">常驻通知</Button>
    </Space>
    <h2 class="mt30 mb10">复杂内容</h2>
    <p class="mb10">
      <code>title</code> 与 <code>content</code> 均支持三种形态：纯文本、<code>VNode</code> 与返回
      <code>VNode</code> 的渲染函数
    </p>
    <Space>
      <Button type="primary" @click="onVNodeContent">VNode 内容</Button>
      <Button type="primary" @click="onRenderFnContent">渲染函数内容</Button>
    </Space>
    <h2 class="mt30 mb10">自定义操作按钮</h2>
    <Button type="primary" @click="onAction">显示通知</Button>
    <h2 class="mt30 mb10">点击通知</h2>
    <Button type="primary" @click="onClickNotification">可点击的通知</Button>
    <h2 class="mt30 mb10">自定义关闭行为</h2>
    <Button type="primary" @click="onUnclosable">消息通知</Button>
    <h2 class="mt30 mb10">隐藏关闭按钮</h2>
    <Button type="primary" @click="onNoClosable">不显示关闭按钮的通知</Button>
    <h2 class="mt30 mb10">手动关闭</h2>
    <Space>
      <Button type="primary" @click="onOpenNotification">打开</Button>
      <Button @click="onDestroy">关闭</Button>
    </Space>
    <h2 class="mt30 mb10">原地更新</h2>
    <Button type="primary" @click="onProgressUpload">异步上传</Button>
    <h2 class="mt30 mb10">指定 key</h2>
    <p class="mb10">
      指定 <code>key</code> 后，相同 <code>key</code> 重复调用不会叠加，只更新该条内容并重新计时；也可通过
      <code>api.destroy(key)</code> 在任意位置精确关闭
    </p>
    <Space>
      <Button type="primary" @click="onKeyNotification">打开指定 key 的通知</Button>
      <Button type="danger" @click="onDestroyByKey">按 key 关闭</Button>
    </Space>
    <h2 class="mt30 mb10">最大通知数</h2>
    <p class="mb10">
      <code>maxCount</code> 为组件级配置，按 <code>placement</code> 分组各自计数；超出上限时会淘汰最旧的一条（淘汰不触发
      <code>onClose</code>）
    </p>
    <NotificationProvider :max-count="3" @ready="maxCountNotification = $event" />
    <Space>
      <Button type="primary" @click="onMaxCountNotification">打开通知（最多 3 条）</Button>
      <Button type="danger" @click="maxCountNotification?.destroyAll()">全部销毁</Button>
    </Space>
    <h2 class="mt30 mb10">鼠标移入保持显示</h2>
    <NotificationProvider :keep-alive-on-hover="true" @ready="hoverNotification = $event" />
    <NotificationProvider :keep-alive-on-hover="false" @ready="noHoverNotification = $event" />
    <Space>
      <Button type="primary" @click="onHoverPauseNotification">hover 暂停关闭</Button>
      <Button type="primary" @click="onHoverNoPauseNotification">hover 不暂停关闭</Button>
    </Space>
    <h2 class="mt30 mb10">自定义挂载容器</h2>
    <div id="notification-to-container" class="teleport-container"></div>
    <NotificationProvider v-if="toReady" to="#notification-to-container" @ready="toNotification = $event" />
    <Button type="primary" @click="onToNotification">挂载到指定容器</Button>
  </div>
</template>
<style lang="less" scoped>
.teleport-container {
  position: relative;
  transform: translateZ(0); // 建立包含块，使内部 fixed 定位的通知相对该容器定位
  max-width: 800px;
  height: 300px;
  margin-bottom: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
}
.notification-placement {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 400px;
  row-gap: 120px;
}
.placement-btn.tl,
.placement-btn.bl {
  grid-column: 1;
  justify-self: start;
}
.placement-btn.top,
.placement-btn.bottom {
  grid-column: 2;
  justify-self: center;
}
.placement-btn.tr,
.placement-btn.br {
  grid-column: 3;
  justify-self: end;
}
</style>
<style lang="less">
// 通知通过 Teleport 挂载到 body 下，scoped 样式无法命中，需使用全局样式
.custom-notification-class {
  color: #d4380d;
  .notification-title {
    font-weight: 500;
  }
}
</style>
