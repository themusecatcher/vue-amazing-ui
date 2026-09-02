# 通知提醒 Notification

<GlobalElement />

_全局展示通知提醒信息_

## 何时使用

- 在页面顶部、底部或四个角显示通知提醒信息
- 系统主动推送

## 使用方式

| 调用方式 | API | 适用位置 |
| :-- | :-- | :-- |
| 组件树内调用 <Tag color="success" size="small">推荐</Tag> | `useNotification()` | 组件 `setup` 内，需外层存在 `<NotificationProvider>` |
| 脱离组件树调用 <Tag color="processing" size="small">无需 NotificationProvider</Tag> | `createDiscreteApi()` | 任意位置（`axios` 拦截器、路由守卫、`Pinia action` 等） |

### 一、组件树内调用：`useNotification()` <Tag color="success" size="small">推荐</Tag>

<br/>

_适用于组件内部调用：先在应用根节点放置一次 `<NotificationProvider>`，之后任意层级组件均可通过 `useNotification()` 取得同一实例_

::: info 关于 `NotificationProvider` 与 `Notification`

- `NotificationProvider` 内部渲染一个 `Notification` 组件，并通过 `provide/inject` 向下提供 `useNotification()` 所需的 API，自身不渲染任何可见内容
- 组件级配置属性（`top` / `bottom` / `duration` / `placement` / `keepAliveOnHover` / `maxCount` / `closable` / `scrollable` / `to`）会透传给内部的 `Notification`，因此直接参考下方 [Notification Props](#notification) 设置即可
- 使用 `useNotification()` 时，组件级配置设置在 `<NotificationProvider>` 上（无法直接接触内部 `Notification`）；每条通知的个性化配置（`key` / `title` / `content` / `icon` / `action` / `meta` / `class` / `style` 等）则在调用 `open` / `info` 等方法时作为参数传入，参考 [NotificationOptions Type](#notificationoptions-type)

:::

**1. 在应用根节点放置 `NotificationProvider`**

::: tip App.vue

```vue
<script setup lang="ts">
import { NotificationProvider } from 'vue-amazing-ui'
</script>
<template>
  <NotificationProvider>
    <RouterView />
  </NotificationProvider>
</template>
```

:::

**2. 在任意层级组件中调用 `useNotification()`**

::: tip XXX.vue

```vue
<script setup lang="ts">
import { useNotification } from 'vue-amazing-ui'
const notification = useNotification()
function onClick() {
  notification.open({
    title: 'Notification Title',
    content: 'This is a normal notification'
  })
}
</script>
<template>
  <Button @click="onClick">按钮</Button>
</template>
```

:::

### 二、脱离组件树调用：`createDiscreteApi()` <Tag color="processing" size="small">无需 NotificationProvider</Tag>

<br/>

_适用于脱离组件树的场景：内部会创建一个独立的应用实例，因此可在任意位置调用，无需外层 `NotificationProvider`_

::: tip 注意

- 主题会随 `ConfigProvider` 自动同步，无需手工传入
- 每次调用都会创建一套独立实例（独立的容器与通知栈），建议缓存返回值复用，避免重复创建；不再使用时可通过返回的 `dispose()` 销毁该实例
- 内部会访问 `document`，`SSR` 场景请在客户端（点击回调、`onMounted` 等）中调用

:::

::: tip 独立实例的复用与销毁（dispose）

_独立实例创建后不会随组件卸载自动销毁，也不会因内部通知全部关闭而回收，需根据使用场景决定是否手动 `dispose()`：_

**场景 A · 全局单例，缓存复用（推荐）**：适用于 `axios` 拦截器、路由守卫、`Pinia action` 等常驻场景，整个应用生命周期内复用同一实例：

```ts
import { createDiscreteApi } from 'vue-amazing-ui'

// 在模块顶层创建一次，全局复用
const { notification } = createDiscreteApi(['notification'])

notification.info({ title: 'Notification Title', content: '这是一条通知' })
```

**场景 B · 临时使用后手动 `dispose()`**：适用于测试用例、单次任务等按需回收场景，用完即销毁：

```ts
import { createDiscreteApi } from 'vue-amazing-ui'
import type { DiscreteApiInstance } from 'vue-amazing-ui'

let discrete: DiscreteApiInstance<'notification'> | null = null
function getNotificationApi() {
  if (!discrete) {
    discrete = createDiscreteApi(['notification'])
  }
  return discrete.notification
}
getNotificationApi().info({ title: 'Notification Title', content: '这是一条通知' })

// 不再需要时手动销毁：卸载内部应用并移除挂载容器
// 重复调用无副作用（内部有 disposed 保护）；再次调用 getNotificationApi() 会安全重建
discrete?.dispose()
discrete = null
```

:::

::: tip XXX.ts（任意 .ts 文件）

```ts
import { createDiscreteApi } from 'vue-amazing-ui'

// 任意位置调用，无需外层 NotificationProvider
const { notification } = createDiscreteApi(['notification'])

// 例：axios 响应拦截器
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    notification.error({ title: '请求失败', content: error.message })
    return Promise.reject(error)
  }
)
```

:::

<Button type="primary" @click="onDiscreteNotification">Discrete Notification（脱离组件树调用）</Button>

<script setup lang="ts">
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import { CloudFilled, FireFilled, SoundFilled } from '@ant-design/icons-vue'
import { Button, createDiscreteApi, useMessage, useNotification } from 'vue-amazing-ui'
import type {
  DiscreteApiInstance,
  NotificationApi,
  NotificationOptions,
  NotificationReactive,
  NotificationUpdate
} from 'vue-amazing-ui'
// setup 内调用 useNotification()：需外层存在 <NotificationProvider>（docs 站点已在主题层全局包裹）
const notification = useNotification()
// setup 内调用 useMessage()：需外层存在 <MessageProvider>（docs 站点已在主题层全局包裹），用于给部分演示提供可见反馈
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
// 弹出位置：placement 类型复用组件导出的 Notification 配置类型，避免手写联合类型与组件定义脱节
// NonNullable 用于去掉可选属性带来的 undefined（此处参数为必填）
function onOpenPlacement(placement: NonNullable<NotificationOptions['placement']>) {
  notification.info({
    title: 'Notification Title',
    content: 'This is the content of the notification.',
    placement
  })
}
// 顶部/底部偏移：top / bottom 为组件级配置，需通过 <NotificationProvider> 传入（页面内局部嵌套演示）
const topNotification = ref<NotificationApi>()
const bottomNotification = ref<NotificationApi>()
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
// 自定义关闭延时
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
// 自定义操作按钮：点击 Confirm 关闭当前通知
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
// 自定义关闭行为：onClose 返回 false 阻止右上角 X 关闭，点击「已读」后才能关闭
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
// 隐藏关闭按钮：单条 closable 优先级高于组件级；组件级 closable 对该实例内的所有通知生效
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
// maxCount / keepAliveOnHover / to 均为组件级配置，需通过 <NotificationProvider> 传入（页面内局部嵌套演示）
const maxCountNotification = ref<NotificationApi>()
const hoverNotification = ref<NotificationApi>()
const noHoverNotification = ref<NotificationApi>()
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
function onToNotification() {
  toNotification.value?.info({
    title: 'Notification Title',
    content: '这条通知被挂载到当前虚线容器中',
    duration: null
  })
}
onBeforeUnmount(() => {
  updateTimers.forEach((timer) => {
    clearInterval(timer)
  })
})
</script>

---

> 本文档网站已在主题层全局包裹 `<NotificationProvider>`，以下演示均通过 `useNotification()` 获取实例（与真实项目用法一致）；需要不同组件级配置的演示，均通过页面内局部嵌套 `<NotificationProvider>` 实现。

## 基本使用

<Button type="primary" @click="onOpen('This is a normal notification')">Open</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { useNotification } from 'vue-amazing-ui'
const notification = useNotification()
function onOpen(content: string) {
  notification.open({
    title: 'Notification Title',
    content
  }) // open 调用
}
</script>
<template>
  <Button type="primary" @click="onOpen('This is a normal notification')">Open</Button>
</template>
```

:::

## 不同类型的通知提醒

<Space>
  <Button type="primary" @click="onInfo('This is a normal notification')">Info</Button>
  <Button type="primary" @click="onSuccess('This is a success notification')">Success</Button>
  <Button type="primary" @click="onWarning('This is a warning notification')">Warning</Button>
  <Button type="primary" @click="onError('This is a error notification')">Error</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useNotification } from 'vue-amazing-ui'
const notification = useNotification()
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
</script>
<template>
  <Space>
    <Button type="primary" @click="onInfo('This is a normal notification')">Info</Button>
    <Button type="primary" @click="onSuccess('This is a success notification')">Success</Button>
    <Button type="primary" @click="onWarning('This is a warning notification')">Warning</Button>
    <Button type="primary" @click="onError('This is a error notification')">Error</Button>
  </Space>
</template>
```

:::

## 自定义图标

<Space>
  <Button type="primary" @click="onInfoIcon">自定义 Info 图标</Button>
  <Button type="primary" @click="onOpenIcon">自定义 Open 图标</Button>
  <Button type="primary" @click="onIconRenderFn">图标渲染函数</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { CloudFilled, FireFilled, SoundFilled } from '@ant-design/icons-vue'
import { useNotification } from 'vue-amazing-ui'
const notification = useNotification()
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
</script>
<template>
  <Space>
    <Button type="primary" @click="onInfoIcon">自定义 Info 图标</Button>
    <Button type="primary" @click="onOpenIcon">自定义 Open 图标</Button>
    <Button type="primary" @click="onIconRenderFn">图标渲染函数</Button>
  </Space>
</template>
```

:::

## 自定义样式

<Space>
  <Button type="primary" @click="onCustomClass">自定义 class</Button>
  <Button type="primary" @click="onStyleCustom">自定义 style</Button>
</Space>

<style lang="less">
// 通知通过 Teleport 挂载到 body 下，scoped 样式无法命中，需使用全局样式
.custom-notification-class {
  color: #d4380d;
  .notification-title {
    font-weight: 500;
  }
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { CloudFilled, FireFilled } from '@ant-design/icons-vue'
import { useNotification } from 'vue-amazing-ui'
const notification = useNotification()
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
</script>
<template>
  <Space>
    <Button type="primary" @click="onCustomClass">自定义 class</Button>
    <Button type="primary" @click="onStyleCustom">自定义 style</Button>
  </Space>
</template>
<style lang="less">
// 通知通过 Teleport 挂载到 body 下，scoped 样式无法命中，需使用全局样式
.custom-notification-class {
  color: #d4380d;
  .notification-title {
    font-weight: 500;
  }
}
</style>
```

:::

## 弹出位置

_`placement` 支持顶部 / 底部居中与四个角共 `6` 个位置，按钮位置与通知实际弹出位置一一对应_

<br/>

<div class="notification-placement">
  <Button class="placement-btn tl" type="primary" @click="onOpenPlacement('topLeft')">topLeft</Button>
  <Button class="placement-btn top" type="primary" @click="onOpenPlacement('top')">top</Button>
  <Button class="placement-btn tr" type="primary" @click="onOpenPlacement('topRight')">topRight</Button>
  <Button class="placement-btn bl" type="primary" @click="onOpenPlacement('bottomLeft')">bottomLeft</Button>
  <Button class="placement-btn bottom" type="primary" @click="onOpenPlacement('bottom')">bottom</Button>
  <Button class="placement-btn br" type="primary" @click="onOpenPlacement('bottomRight')">bottomRight</Button>
</div>

<style lang="less" scoped>
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

::: details Show Code

```vue
<script setup lang="ts">
import { useNotification } from 'vue-amazing-ui'
import type { NotificationOptions } from 'vue-amazing-ui'
const notification = useNotification()
// placement 类型复用组件导出的 Notification 配置类型，避免手写联合类型与组件定义脱节
// NonNullable 用于去掉可选属性带来的 undefined（此处参数为必填）
function onOpenPlacement(placement: NonNullable<NotificationOptions['placement']>) {
  notification.info({
    title: 'Notification Title',
    content: 'This is the content of the notification.',
    placement
  })
}
</script>
<template>
  <div class="notification-placement">
    <Button class="placement-btn tl" type="primary" @click="onOpenPlacement('topLeft')">topLeft</Button>
    <Button class="placement-btn top" type="primary" @click="onOpenPlacement('top')">top</Button>
    <Button class="placement-btn tr" type="primary" @click="onOpenPlacement('topRight')">topRight</Button>
    <Button class="placement-btn bl" type="primary" @click="onOpenPlacement('bottomLeft')">bottomLeft</Button>
    <Button class="placement-btn bottom" type="primary" @click="onOpenPlacement('bottom')">bottom</Button>
    <Button class="placement-btn br" type="primary" @click="onOpenPlacement('bottomRight')">bottomRight</Button>
  </div>
</template>
<style lang="less" scoped>
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
```

:::

## 顶部/底部偏移

<NotificationProvider :top="100" @ready="topNotification = $event" />
<NotificationProvider placement="bottomRight" :bottom="100" @ready="bottomNotification = $event" />

<Space>
  <Button type="primary" @click="onTopNotification">通知距顶部 100px</Button>
  <Button type="primary" @click="onBottomNotification">通知距底部 100px</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NotificationProvider } from 'vue-amazing-ui'
import type { NotificationApi } from 'vue-amazing-ui'
// top / bottom 为组件级配置，需通过局部 <NotificationProvider> 传入，@ready 可取到该 Provider 作用域内的 api
const topNotification = ref<NotificationApi>()
const bottomNotification = ref<NotificationApi>()
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
</script>
<template>
  <NotificationProvider :top="100" @ready="topNotification = $event" />
  <NotificationProvider placement="bottomRight" :bottom="100" @ready="bottomNotification = $event" />
  <Space>
    <Button type="primary" @click="onTopNotification">通知距顶部 100px</Button>
    <Button type="primary" @click="onBottomNotification">通知距底部 100px</Button>
  </Space>
</template>
```

:::

## 自定义关闭延时

_通过 `duration` 控制自动关闭时长，设置 `null` 时通知常驻，需要手动关闭_

<br/>

<Space>
  <Button type="primary" @click="onAutoClose">3s 后自动关闭</Button>
  <Button type="primary" @click="onNeverAutoClose">常驻通知</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useNotification } from 'vue-amazing-ui'
const notification = useNotification()
// 自动关闭：3s 后关闭，onClose 回调给出可见反馈
function onAutoClose() {
  notification.info({
    title: 'Notification Title',
    content: 'The notification will automatically turn off after 3 seconds.',
    duration: 3000,
    onClose: () => {
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
</script>
<template>
  <Space>
    <Button type="primary" @click="onAutoClose">3s 后自动关闭</Button>
    <Button type="primary" @click="onNeverAutoClose">常驻通知</Button>
  </Space>
</template>
```

:::

## 复杂内容

_`title` / `content` 均支持三种形态：纯文本、`VNode` 与返回 `VNode` 的渲染函数_

<br/>

<Space>
  <Button type="primary" @click="onVNodeContent">VNode 内容</Button>
  <Button type="primary" @click="onRenderFnContent">渲染函数内容</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { useNotification } from 'vue-amazing-ui'
const notification = useNotification()
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
</script>
<template>
  <Space>
    <Button type="primary" @click="onVNodeContent">VNode 内容</Button>
    <Button type="primary" @click="onRenderFnContent">渲染函数内容</Button>
  </Space>
</template>
```

:::

## 自定义操作按钮

<Button type="primary" @click="onAction">显示通知</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { Button, useNotification } from 'vue-amazing-ui'
const notification = useNotification()
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
</script>
<template>
  <Button type="primary" @click="onAction">显示通知</Button>
</template>
```

:::

## 点击通知

_通过 `onClick` 监听通知体点击；点击右上角关闭按钮不触发（已阻止冒泡）_

<br/>

<Button type="primary" @click="onClickNotification">可点击的通知</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage, useNotification } from 'vue-amazing-ui'
const notification = useNotification()
const message = useMessage()
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
</script>
<template>
  <Button type="primary" @click="onClickNotification">可点击的通知</Button>
</template>
```

:::

## 自定义关闭行为

_通过 `onClose` 返回 `false` 取消本次关闭：右上角 `X` 无法关闭通知，点击「已读」后才能关闭_

<br/>

<Button type="primary" @click="onUnclosable">消息通知</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { useMessage, useNotification } from 'vue-amazing-ui'
const notification = useNotification()
const message = useMessage()
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
</script>
<template>
  <Button type="primary" @click="onUnclosable">消息通知</Button>
</template>
```

:::

## 隐藏关闭按钮

<Button type="primary" @click="onNoClosable">不显示关闭按钮的通知</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { useNotification } from 'vue-amazing-ui'
const notification = useNotification()
function onNoClosable() {
  notification.warning({
    title: '隐藏关闭按钮',
    content: 'closable: false 时不渲染右上角关闭按钮，3s 后自动关闭',
    closable: false,
    duration: 3000
  })
}
</script>
<template>
  <Button type="primary" @click="onNoClosable">不显示关闭按钮的通知</Button>
</template>
```

:::

## 手动关闭

<Space>
  <Button type="primary" @click="onOpenNotification">打开</Button>
  <Button @click="onDestroy">关闭</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useNotification } from 'vue-amazing-ui'
import type { NotificationReactive } from 'vue-amazing-ui'
const notification = useNotification()
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
</script>
<template>
  <Space>
    <Button type="primary" @click="onOpenNotification">打开</Button>
    <Button @click="onDestroy">关闭</Button>
  </Space>
</template>
```

:::

## 原地更新

<Button type="primary" @click="onProgressUpload">异步上传</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { h, onBeforeUnmount, ref } from 'vue'
import { useNotification } from 'vue-amazing-ui'
import type { NotificationUpdate } from 'vue-amazing-ui'
const notification = useNotification()
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
onBeforeUnmount(() => {
  updateTimers.forEach((timer) => {
    clearInterval(timer)
  })
})
</script>
<template>
  <Button type="primary" @click="onProgressUpload">异步上传</Button>
</template>
```

:::

## 指定 key

_指定 `key` 后，相同 `key` 重复调用不会叠加，只更新该条内容并重新计时；也可通过 `api.destroy(key)` 在任意位置精确关闭_

<br/>

<Space>
  <Button type="primary" @click="onKeyNotification">打开指定 key 的通知</Button>
  <Button type="danger" @click="onDestroyByKey">按 key 关闭</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useNotification } from 'vue-amazing-ui'
const notification = useNotification()
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
</script>
<template>
  <Space>
    <Button type="primary" @click="onKeyNotification">打开指定 key 的通知</Button>
    <Button type="danger" @click="onDestroyByKey">按 key 关闭</Button>
  </Space>
</template>
```

:::

## 最大通知数

_通过组件级 `maxCount` 限制同一 `placement` 下同时存在的通知数量，超出上限时淘汰最旧的一条（淘汰不触发 `onClose`）_

<br/>

<NotificationProvider :max-count="3" @ready="maxCountNotification = $event" />

<Space>
  <Button type="primary" @click="onMaxCountNotification">打开通知（最多 3 条）</Button>
  <Button type="danger" @click="maxCountNotification?.destroyAll()">全部销毁</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NotificationProvider } from 'vue-amazing-ui'
import type { NotificationApi } from 'vue-amazing-ui'
// 组件级配置无法逐条传入，通过局部 <NotificationProvider> 演示，@ready 可取到该 Provider 作用域内的 api
const maxCountNotification = ref<NotificationApi>()
let maxCountSeed = 0
function onMaxCountNotification() {
  maxCountSeed += 1
  maxCountNotification.value?.info({
    title: 'Notification Title',
    content: `第 ${maxCountSeed} 条通知，同一位置最多同时存在 3 条`,
    duration: null
  })
}
</script>
<template>
  <NotificationProvider :max-count="3" @ready="maxCountNotification = $event" />
  <Space>
    <Button type="primary" @click="onMaxCountNotification">打开通知（最多 3 条）</Button>
    <Button type="danger" @click="maxCountNotification?.destroyAll()">全部销毁</Button>
  </Space>
</template>
```

:::

## 鼠标移入保持显示

<NotificationProvider :keep-alive-on-hover="true" @ready="hoverNotification = $event" />
<NotificationProvider :keep-alive-on-hover="false" @ready="noHoverNotification = $event" />

<Space>
  <Button type="primary" @click="onHoverPauseNotification">hover 暂停关闭</Button>
  <Button type="primary" @click="onHoverNoPauseNotification">hover 不暂停关闭</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NotificationProvider } from 'vue-amazing-ui'
import type { NotificationApi } from 'vue-amazing-ui'
// 组件级配置无法逐条传入，通过局部 <NotificationProvider> 演示
// 两条通知来自 keepAliveOnHover 不同的 Provider，便于对比 hover 行为
const hoverNotification = ref<NotificationApi>()
const noHoverNotification = ref<NotificationApi>()
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
</script>
<template>
  <NotificationProvider :keep-alive-on-hover="true" @ready="hoverNotification = $event" />
  <NotificationProvider :keep-alive-on-hover="false" @ready="noHoverNotification = $event" />
  <Space>
    <Button type="primary" @click="onHoverPauseNotification">hover 暂停关闭</Button>
    <Button type="primary" @click="onHoverNoPauseNotification">hover 不暂停关闭</Button>
  </Space>
</template>
```

:::

## 自定义挂载容器

::: tip 提示
`Teleport` 的目标必须已存在于文档中。<br/>
当目标与组件位于同一组件树内时，组件挂载瞬间目标尚未插入文档，需用 `v-if` 将组件延迟到挂载完成后再渲染。
:::

<div id="notification-to-container" class="notification-to-container"></div>

<NotificationProvider v-if="toReady" to="#notification-to-container" @ready="toNotification = $event" />

<Button type="primary" @click="onToNotification">挂载到指定容器</Button>

<style lang="less" scoped>
.notification-to-container {
  position: relative;
  transform: translateZ(0); // 建立包含块，使内部 fixed 定位的通知相对该容器定位
  max-width: 800px;
  height: 300px;
  margin-bottom: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  overflow: hidden; // 超出容器高度的通知被裁切，避免溢出到容器外
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { NotificationProvider } from 'vue-amazing-ui'
import type { NotificationApi } from 'vue-amazing-ui'
const toNotification = ref<NotificationApi>()
const toReady = ref(false)
// 目标容器与组件位于同一组件树，需等挂载完成（目标已插入文档）后再渲染组件，Teleport 才能定位到目标
onMounted(() => {
  toReady.value = true
})
function onToNotification() {
  toNotification.value?.info({
    title: 'Notification Title',
    content: '这条通知被挂载到当前虚线容器中',
    duration: null
  })
}
</script>
<template>
  <div id="notification-to-container" class="notification-to-container"></div>
  <NotificationProvider v-if="toReady" to="#notification-to-container" @ready="toNotification = $event" />
  <Button type="primary" @click="onToNotification">挂载到指定容器</Button>
</template>
<style lang="less" scoped>
.notification-to-container {
  position: relative;
  transform: translateZ(0); // 建立包含块，使内部 fixed 定位的通知相对该容器定位
  max-width: 800px;
  height: 300px;
  margin-bottom: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  overflow: hidden; // 超出容器高度的通知被裁切，避免溢出到容器外
}
</style>
```

:::

## APIs

### Notification

<br/>

_组件级配置属性：使用 `useNotification()` 时设置在 `<NotificationProvider>` 上（会透传给内部 `Notification`），直接使用 `<Notification>` 组件时设置在 `<Notification>` 上，两者等价。_

<br/>

_每条通知的个性化配置请参考 [NotificationOptions Type](#notificationoptions-type)_

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| top | 顶部弹出（`top` / `topLeft` / `topRight`）时通知列表距视口顶部的距离，单位 `px` | number | 16 |
| bottom | 底部弹出（`bottom` / `bottomLeft` / `bottomRight`）时通知列表距视口底部的距离，单位 `px` | number | 16 |
| duration | 自动关闭的延时时长，单位 `ms`；设置 `null` 时，不自动关闭（单条通知中的 `duration` 优先级更高） | number &#124; null | 4500 |
| placement | 通知弹出位置 | 'top' &#124; 'topLeft' &#124; 'topRight' &#124; 'bottom' &#124; 'bottomLeft' &#124; 'bottomRight' | 'topRight' |
| keepAliveOnHover | 鼠标移入时是否暂停自动关闭 | boolean | true |
| maxCount | 同一 `placement` 下可同时存在的最大通知数，超出时淘汰最旧的一条 | number | undefined |
| closable | 是否显示关闭按钮，优先级低于单条通知中的 `closable` | boolean | true |
| scrollable | 通知列表是否可滚动，通知过多超出视口高度时滚动显示 | boolean | true |
| to | 通知容器挂载的节点，可选：元素标签名（例如 `'body'`）或者元素本身 | string &#124; HTMLElement | 'body' |

### NotificationOptions Type

<br/>

_调用时传入的 `NotificationOptions` 类型（`open` / `info` / `success` / `error` / `warning` 的参数），以下属性均具有更高优先级（覆盖组件级配置）_

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| key? | 该条通知的唯一标识，未指定时自动生成；指定后相同 `key` 调用不会叠加，只更新该条并重新计时，也可由 `destroy(key)` 精确关闭 | string | undefined |
| title? | 通知提醒标题，支持纯文本、`VNode` 与返回 `VNode` 的渲染函数三种形态 | string &#124; VNode &#124; (() => VNode) | undefined |
| content? | 通知提醒内容，支持纯文本、`VNode` 与返回 `VNode` 的渲染函数三种形态 | string &#124; VNode &#124; (() => VNode) | undefined |
| icon? | 自定义图标，支持 `VNode` 与返回 `VNode` 的渲染函数两种形态 | VNode &#124; (() => VNode) | undefined |
| action? | 自定义操作区域（如底部按钮），渲染在通知底部右侧，支持三种形态 | string &#124; VNode &#124; (() => VNode) | undefined |
| meta? | meta 信息，渲染在通知底部左侧，与 `action` 同行左右分布，支持三种形态 | string &#124; VNode &#124; (() => VNode) | undefined |
| class? | 自定义类名 | string | undefined |
| style? | 自定义样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| closable? | 是否显示右上角关闭按钮，优先级高于组件级 `closable` | boolean | undefined |
| duration? | 自动关闭的延时时长，单位 `ms`；设置 `null` 时，不自动关闭 | number &#124; null | undefined |
| placement? | 通知提醒弹出位置 | 'top' &#124; 'topLeft' &#124; 'topRight' &#124; 'bottom' &#124; 'bottomLeft' &#124; 'bottomRight' | undefined |
| onClick? | 点击通知体时的回调函数；点击右上角关闭按钮不触发 | (e: MouseEvent) => void | undefined |
| onClose? | 关闭时的回调函数；返回 `false`（或 `Promise` `resolve` `false`）时取消本次关闭 | () => void &#124; boolean &#124; Promise&lt;void &#124; boolean&gt; | undefined |

## Methods

_`useNotification()` 返回的 `NotificationApi`，或通过 `<Notification>` / `<NotificationProvider>` 的 `@ready` 事件获取：_

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| open | 基本通知提醒 | (options: [NotificationOptions](#notificationoptions-type)) => [NotificationReactive](#notificationreactive-type) |
| info | 信息通知提醒 | (options: [NotificationOptions](#notificationoptions-type)) => [NotificationReactive](#notificationreactive-type) |
| success | 成功通知提醒 | (options: [NotificationOptions](#notificationoptions-type)) => [NotificationReactive](#notificationreactive-type) |
| error | 失败通知提醒 | (options: [NotificationOptions](#notificationoptions-type)) => [NotificationReactive](#notificationreactive-type) |
| warning | 警告通知提醒 | (options: [NotificationOptions](#notificationoptions-type)) => [NotificationReactive](#notificationreactive-type) |
| destroy | 关闭指定 `key` 的通知提醒，可在任意调用点精确关闭 | (key: string) => void |
| destroyAll | 销毁所有通知提醒 | () => void |

### NotificationReactive Type

<br/>

_单条通知的句柄，由 `open` / `info` 等方法调用后返回：_

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| key | 该条通知的唯一标识 | string |
| destroy | 关闭该条通知 | () => void |
| update | 更新该条通知，`mode` 可切换内置图标类型 | (options: [NotificationUpdate](#notificationupdate-type)) => void |

### NotificationUpdate Type

<br/>

_`update` 可更新的字段为 `NotificationOptions` 除 `key` 外的全部属性（`key` 是身份标识，创建后不可变更），另支持 `mode` 用于切换内置图标类型。_

> 注意：若该条通知设置了自定义 `icon`，图标不随 `mode` 切换。

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| mode? | 通知类型，决定内置图标（仅 `update` 可传此字段） | 'open' &#124; 'info' &#124; 'success' &#124; 'error' &#124; 'warning' |

## Events

_`close` 为 `<Notification>` / `<NotificationProvider>` 组件的事件（需通过组件标签监听）；使用 `useNotification()` 时，单条通知的点击 / 关闭回调请分别使用 `onClick` / `onClose`。_

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| ready | 实例挂载完成时触发，参数为该实例的 api | (api: [NotificationApi](#methods)) => void |
| close | 通知提醒关闭时的回调，参数为该条通知的 `key` | (key: string) => void |
