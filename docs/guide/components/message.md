# 全局提示 Message

<GlobalElement />

_全局展示操作反馈信息_

## 何时使用

- 可提供成功、警告和错误等反馈信息
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式

## 使用方式

| 调用方式 | API | 适用位置 |
| :-- | :-- | :-- |
| 组件树内调用 <Tag color="success" size="small">推荐</Tag> | `useMessage()` | 组件 `setup` 内，需外层存在 `<MessageProvider>` |
| 脱离组件树调用 <Tag color="processing" size="small">无需 MessageProvider</Tag> | `createDiscreteApi()` | 任意位置（`axios` 拦截器、路由守卫、`Pinia action` 等） |

### 一、组件树内调用：`useMessage()` <Tag color="success" size="small">推荐</Tag>

<br/>

_适用于组件内部调用：先在应用根节点放置一次 `<MessageProvider>`，之后任意层级组件均可通过 `useMessage()` 取得同一实例_

::: info 关于 `MessageProvider` 与 `Message`

- `MessageProvider` 内部渲染一个 `Message` 组件，并通过 `provide/inject` 向下提供 `useMessage()` 所需的 API，自身不渲染任何可见内容
- 组件级配置属性（`duration` / `top` / `maxCount` / `keepAliveOnHover` / `to`）会透传给内部的 `Message`，因此直接参考下方 [Message Props](#message) 设置即可
- 使用 `useMessage()` 时，组件级配置设置在 `<MessageProvider>` 上（无法直接接触内部 `Message`）；每条消息的个性化配置（`content` / `icon` / `class` / `style` 等）则在调用 `open` / `info` 等方法时作为参数传入，参考 [Message Type](#message-type)

:::

**1. 在应用根节点放置 `MessageProvider`**

::: tip App.vue

```vue
<script setup lang="ts">
import { MessageProvider } from 'vue-amazing-ui'
</script>
<template>
  <MessageProvider>
    <RouterView />
  </MessageProvider>
</template>
```

:::

**2. 在任意层级组件中调用 `useMessage()`**

::: tip XXX.vue

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
function onClick() {
  message.success('点击了按钮')
}
</script>
<template>
  <Button @click="onClick">按钮</Button>
</template>
```

:::

### 二、脱离组件树调用：`createDiscreteApi()` <Tag color="processing" size="small">无需 MessageProvider</Tag>

<br/>

_适用于脱离组件树的场景：内部会创建一个独立的应用实例，因此可在任意位置调用，无需外层 `MessageProvider`_

::: tip 注意

- 主题会随 `ConfigProvider` 自动同步，无需手工传入
- 每次调用都会创建一套独立实例（独立的容器与消息栈），建议缓存返回值复用，避免重复创建；不再使用时可通过返回的 `dispose()` 销毁该实例
- 内部会访问 `document`，`SSR` 场景请在客户端（点击回调、`onMounted` 等）中调用

:::

::: tip 独立实例的复用与销毁（dispose）

_独立实例创建后不会随组件卸载自动销毁，也不会因内部消息全部关闭而回收，需根据使用场景决定是否手动 `dispose()`：_

**场景 A · 全局单例，缓存复用（推荐）**：适用于 `axios` 拦截器、路由守卫、`Pinia action` 等常驻场景，整个应用生命周期内复用同一实例：

```ts
import { createDiscreteApi } from 'vue-amazing-ui'

// 在模块顶层创建一次，全局复用
const { message } = createDiscreteApi(['message'])

message.success('这是一条消息')
```

**场景 B · 临时使用后手动 `dispose()`**：适用于测试用例、单次任务等按需回收场景，用完即销毁：

```ts
import { createDiscreteApi } from 'vue-amazing-ui'
import type { DiscreteApiInstance } from 'vue-amazing-ui'

let discrete: DiscreteApiInstance<'message'> | null = null
function getMessageApi() {
  if (!discrete) {
    discrete = createDiscreteApi(['message'])
  }
  return discrete.message
}
getMessageApi().success('这是一条消息')

// 不再需要时手动销毁：卸载内部应用并移除挂载容器
// 重复调用无副作用（内部有 disposed 保护）；再次调用 getMessageApi() 会安全重建
discrete?.dispose()
discrete = null
```

:::

::: tip XXX.ts（任意 .ts 文件）

```ts
import { createDiscreteApi } from 'vue-amazing-ui'

// 任意位置调用，无需外层 MessageProvider
const { message } = createDiscreteApi(['message'])

// 例：axios 响应拦截器
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    message.error(error.message)
    return Promise.reject(error)
  }
)
```

:::

<Button type="primary" @click="onDiscreteMessage">Discrete Message（脱离组件树调用）</Button>

<script setup lang="ts">
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import { SoundFilled, FireFilled } from '@ant-design/icons-vue'
import { createDiscreteApi, useMessage } from 'vue-amazing-ui'
import type { DiscreteApiInstance, MessageApi, MessageReactive, MessageUpdate } from 'vue-amazing-ui'
// setup 内调用 useMessage()：需外层存在 <MessageProvider>（docs 站点已在主题层全局包裹）
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
function onClassCustom(content: string) {
  message.info({
    content,
    icon: h(SoundFilled),
    class: 'custom-class'
  })
}
function onStyleCustom(content: string) {
  message.warning({
    content,
    icon: h(FireFilled),
    style: {
      color: '#f50'
    }
  })
}
// 自定义关闭延时与回调
function onCustomClose() {
  message.info({
    content: 'This message will automatically turn off after 3 seconds.',
    duration: 3000,
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
// 手动关闭：保存句柄，通过 destroy() 手动关闭
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
function onProgressUpdate() {
  const percent = ref(0)
  const handle = message.loading({
    // content 传渲染函数：内部引用响应式 percent，进度变化时消息内容自动更新
    content: () =>
      h('span', { style: 'white-space: nowrap' }, [
        '提交中...',
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
      const doneOptions: MessageUpdate = { content: '提交成功', mode: 'success', duration: 2000 }
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
// top / maxCount / keepAliveOnHover / to 均为组件级配置，需通过 <MessageProvider> 传入（页面内局部嵌套演示）
const maxCountMessage = ref<MessageApi>()
const hoverMessage = ref<MessageApi>()
const noHoverMessage = ref<MessageApi>()
const topMessage = ref<MessageApi>()
const toMessage = ref<MessageApi>()
const toReady = ref(false)
// 目标与组件位于同一组件树时，需等挂载完成（目标已插入文档）后再渲染组件
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

<MessageProvider :max-count="3" @ready="maxCountMessage = $event" />
<MessageProvider :keep-alive-on-hover="true" @ready="hoverMessage = $event" />
<MessageProvider :keep-alive-on-hover="false" @ready="noHoverMessage = $event" />
<MessageProvider :top="100" @ready="topMessage = $event" />

---

> 本文档网站已在主题层全局包裹 `<MessageProvider>`，以下演示均通过 `useMessage()` 获取实例（与真实项目用法一致）；需要不同组件级配置的演示，均通过页面内局部嵌套 `<MessageProvider>` 实现。

## 基本使用

<Button type="primary" @click="onOpen('This is a normal message')">Open</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
function onOpen(content: string) {
  message.open(content) // open 调用
}
</script>
<template>
  <Button type="primary" @click="onOpen('This is a normal message')">Open</Button>
</template>
```

:::

## 不同类型的全局提示

<Space>
  <Button type="primary" @click="onInfo('This is an info message')">Info</Button>
  <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
  <Button type="primary" @click="onError('This is an error message')">Error</Button>
  <Button type="primary" @click="onWarning('This is a warning message')">Warning</Button>
  <Button type="primary" @click="onLoading('This is a loading message')">Loading</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
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
</script>
<template>
  <Space>
    <Button type="primary" @click="onInfo('This is an info message')">Info</Button>
    <Button type="primary" @click="onSuccess('This is a success message')">Success</Button>
    <Button type="primary" @click="onError('This is an error message')">Error</Button>
    <Button type="primary" @click="onWarning('This is a warning message')">Warning</Button>
    <Button type="primary" @click="onLoading('This is a loading message')">Loading</Button>
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
import { SoundFilled, FireFilled } from '@ant-design/icons-vue'
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
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
  <Button type="primary" @click="onClassCustom('This is a custom class message')">自定义类名</Button>
  <Button type="primary" @click="onStyleCustom('This is a custom style message')">自定义样式</Button>
</Space>

<style lang="less" scoped>
::deep(.custom-class) {
  color: #ff6900;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { SoundFilled, FireFilled } from '@ant-design/icons-vue'
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
function onClassCustom(content: string) {
  message.info({
    content,
    icon: h(SoundFilled),
    class: 'custom-class'
  })
}
function onStyleCustom(content: string) {
  message.warning({
    content,
    icon: h(FireFilled),
    style: {
      color: '#f50'
    }
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onClassCustom('This is a custom class message')">自定义类名</Button>
    <Button type="primary" @click="onStyleCustom('This is a custom style message')">自定义样式</Button>
  </Space>
</template>
<style lang="less" scoped>
::deep(.custom-class) {
  color: #ff6900;
}
</style>
```

:::

## 自定义关闭延时

<Space>
  <Button type="primary" @click="onCustomClose">3s 后自动关闭</Button>
  <Button type="primary" @click="onNeverAutoClose">常驻消息，点击关闭</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
function onCustomClose() {
  message.info({
    content: 'This message will automatically turn off after 3 seconds.',
    duration: 3000,
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
</script>
<template>
  <Space>
    <Button type="primary" @click="onCustomClose">3s 后自动关闭</Button>
    <Button type="primary" @click="onNeverAutoClose">常驻消息，点击关闭</Button>
  </Space>
</template>
```

:::

## 复杂内容

_`content` 支持三种形态：纯文本、`VNode` 与返回 `VNode` 的渲染函数_

<br/>

<Space>
  <Button type="primary" @click="onVNodeContent">VNode 内容</Button>
  <Button type="primary" @click="onRenderFnContent">渲染函数内容</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
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
</script>
<template>
  <Space>
    <Button type="primary" @click="onVNodeContent">VNode 内容</Button>
    <Button type="primary" @click="onRenderFnContent">渲染函数内容</Button>
  </Space>
</template>
```

:::

## 手动关闭

<Space>
  <Button type="primary" @click="onOpenMessage">打开</Button>
  <Button @click="onDestroy">关闭</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage } from 'vue-amazing-ui'
import type { MessageReactive } from 'vue-amazing-ui'
const message = useMessage()
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
</script>
<template>
  <Space>
    <Button type="primary" @click="onOpenMessage">打开</Button>
    <Button @click="onDestroy">关闭</Button>
  </Space>
</template>
```

:::

## 原地更新

<Button type="primary" @click="onProgressUpdate">异步提交</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { h, onBeforeUnmount, ref } from 'vue'
import { useMessage } from 'vue-amazing-ui'
import type { MessageUpdate } from 'vue-amazing-ui'
const message = useMessage()
const updateTimers: ReturnType<typeof setInterval>[] = []
function onProgressUpdate() {
  const percent = ref(0)
  const handle = message.loading({
    // content 传渲染函数：内部引用响应式 percent，进度变化时消息内容自动更新
    content: () =>
      h('span', { style: 'white-space: nowrap' }, [
        '提交中...',
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
      const doneOptions: MessageUpdate = { content: '提交成功', mode: 'success', duration: 2000 }
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
  <Button type="primary" @click="onProgressUpdate">异步提交</Button>
</template>
```

:::

## 最大消息数

_`maxCount` 为组件级配置，用于限制同时存在的消息数量，超出上限时淘汰最旧的一条（淘汰不触发 `onClose`）_

<br/>

<Space>
  <Button type="primary" @click="onMaxCountMessage">打开消息（最多 3 条）</Button>
  <Button @click="maxCountMessage?.destroyAll()">全部销毁</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { MessageProvider } from 'vue-amazing-ui'
import type { MessageApi } from 'vue-amazing-ui'
// 组件级配置无法逐条传入，通过局部 <MessageProvider> 演示，@ready 可取到该 Provider 作用域内的 api
const maxCountMessage = ref<MessageApi>()
let maxCountSeed = 0
function onMaxCountMessage() {
  maxCountSeed += 1
  maxCountMessage.value?.info({
    content: `第 ${maxCountSeed} 条消息（最多同时存在 3 条）`,
    duration: null
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onMaxCountMessage">打开消息（最多 3 条）</Button>
    <Button @click="maxCountMessage?.destroyAll()">全部销毁</Button>
  </Space>
  <MessageProvider :max-count="3" @ready="maxCountMessage = $event" />
</template>
```

:::

## 鼠标移入保持显示

<Space>
  <Button type="primary" @click="onHoverPauseMessage">hover 暂停关闭</Button>
  <Button type="primary" @click="onHoverNoPauseMessage">hover 不暂停关闭</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { MessageProvider } from 'vue-amazing-ui'
import type { MessageApi } from 'vue-amazing-ui'
const hoverMessage = ref<MessageApi>()
const noHoverMessage = ref<MessageApi>()
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
</script>
<template>
  <Space>
    <Button type="primary" @click="onHoverPauseMessage">hover 暂停关闭</Button>
    <Button type="primary" @click="onHoverNoPauseMessage">hover 不暂停关闭</Button>
  </Space>
  <!-- 两条消息来自 keepAliveOnHover 不同的 Provider，便于对比 hover 行为 -->
  <MessageProvider :keep-alive-on-hover="true" @ready="hoverMessage = $event" />
  <MessageProvider :keep-alive-on-hover="false" @ready="noHoverMessage = $event" />
</template>
```

:::

## 顶部位置

<MessageProvider :top="100" @ready="topMessage = $event" />

<Button type="primary" @click="onTopMessage">消息距顶部 100px</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { MessageProvider } from 'vue-amazing-ui'
import type { MessageApi } from 'vue-amazing-ui'
const topMessage = ref<MessageApi>()
function onTopMessage() {
  topMessage.value?.info({
    content: '这条消息距离页面顶部 100px',
    duration: 2000
  })
}
</script>
<template>
  <MessageProvider :top="100" @ready="topMessage = $event" />
  <Button type="primary" @click="onTopMessage">消息距顶部 100px</Button>
</template>
```

:::

## 自定义挂载容器

::: tip 提示
`Teleport` 的目标必须已存在于文档中。<br/>
当目标与组件位于同一组件树内时，组件挂载瞬间目标尚未插入文档，需用 `v-if` 将组件延迟到挂载完成后再渲染。
:::

<div id="message-to-container" class="message-to-container"></div>

<MessageProvider v-if="toReady" to="#message-to-container" :top="20" @ready="toMessage = $event" />

<Button type="primary" @click="onToMessage">挂载到指定容器</Button>

<style lang="less" scoped>
.message-to-container {
  position: relative;
  transform: translateZ(0); // 建立包含块，使内部 fixed 定位的消息相对该容器定位
  height: 240px; // 高度按需设置，保证可容纳多条消息
  margin-bottom: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  overflow: hidden; // 超出容器高度的消息被裁切，避免溢出到容器外
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MessageProvider } from 'vue-amazing-ui'
import type { MessageApi } from 'vue-amazing-ui'
const toMessage = ref<MessageApi>()
const toReady = ref(false)
// 目标与组件位于同一组件树时，需等挂载完成（目标已插入文档）后再渲染组件
onMounted(() => {
  toReady.value = true
})
function onToMessage() {
  toMessage.value?.info('这条消息被挂载到当前虚线容器中')
}
</script>
<template>
  <div id="message-to-container" class="message-to-container"></div>
  <MessageProvider v-if="toReady" to="#message-to-container" :top="20" @ready="toMessage = $event" />
  <Button type="primary" @click="onToMessage">挂载到指定容器</Button>
</template>
<style lang="less" scoped>
.message-to-container {
  position: relative;
  transform: translateZ(0); // 建立包含块，使内部 fixed 定位的消息相对该容器定位
  height: 240px; // 高度按需设置，保证可容纳多条消息
  margin-bottom: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  overflow: hidden; // 超出容器高度的消息被裁切，避免溢出到容器外
}
</style>
```

:::

## APIs

### Message

<br/>

_组件级配置属性：使用 `useMessage()` 时设置在 `<MessageProvider>` 上（会透传给内部 `Message`），直接使用 `<Message>` 组件时设置在 `<Message>` 上，两者等价。_

<br/>

_每条消息的个性化配置请参考 [Message Type](#message-type)_

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| duration | 自动关闭的延时，单位 `ms`，设置 `null` 时，不自动关闭 | number &#124; null | 3000 |
| top | 消息距离顶部的位置，单位 `px` | string &#124; number | 30 |
| maxCount | 可同时存在的最大消息数，超出时淘汰最旧的一条 | number | undefined |
| keepAliveOnHover | 鼠标移入时是否暂停自动关闭 | boolean | true |
| to | 消息容器挂载的节点，可选：元素标签名（例如 `'body'`）或者元素本身 | string &#124; HTMLElement | 'body' |

### Message Type

<br/>

_调用时传入的 `Message` 类型（`open` / `info` / `success` / `error` / `warning` / `loading` 的参数），以下属性均具有更高优先级（覆盖组件级配置）_

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| content? | 提示内容 | string &#124; VNode &#124; (() => VNode) | undefined |
| icon? | 自定义图标 | VNode &#124; (() => VNode) | undefined |
| duration? | 自动关闭的延时时长，单位 `ms`；设置 `null` 时，不自动关闭 | number &#124; null | undefined |
| class? | 自定义类名 | string | undefined |
| style? | 自定义样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| onClick? | 点击 `message` 时的回调函数 | () => void | undefined |
| onClose? | 关闭时的回调函数 | () => void | undefined |

## Methods

_`useMessage()` 返回的 `MessageApi`，或通过 `<Message>` / `<MessageProvider>` 的 `@ready` 事件获取：_

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| open | 基本全局提示 | (content: string &#124; [Message](#message-type)) => [MessageReactive](#messagereactive-type) |
| info | 信息全局提示 | (content: string &#124; [Message](#message-type)) => [MessageReactive](#messagereactive-type) |
| success | 成功全局提示 | (content: string &#124; [Message](#message-type)) => [MessageReactive](#messagereactive-type) |
| error | 失败全局提示 | (content: string &#124; [Message](#message-type)) => [MessageReactive](#messagereactive-type) |
| warning | 警告全局提示 | (content: string &#124; [Message](#message-type)) => [MessageReactive](#messagereactive-type) |
| loading | 加载全局提示 | (content: string &#124; [Message](#message-type)) => [MessageReactive](#messagereactive-type) |
| destroyAll | 销毁所有全局提示 | () => void |

### MessageReactive Type

<br/>

_单条消息的句柄，由 `open` / `info` 等方法调用后返回：_

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| key | 该条消息的唯一标识 | string |
| destroy | 关闭该条消息 | () => void |
| update | 更新该条消息，`mode` 可切换内置图标类型 | (options: [MessageUpdate](#messageupdate-type)) => void |

### MessageUpdate Type

<br/>

_`update` 可更新的字段为 `Message` 的全部属性，另支持 `mode` 用于切换内置图标类型（例如 `loading` 消息完成后原地切换为 `success`）。_

> 注意：若该条消息设置了自定义 `icon`，图标不随 `mode` 切换。

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| mode? | 消息类型，决定内置图标（仅 `update` 可传此字段） | 'open' &#124; 'info' &#124; 'success' &#124; 'error' &#124; 'warning' &#124; 'loading' |

## Events

_`click` / `close` 为 `<Message>` / `<MessageProvider>` 组件的原生事件（需通过组件标签监听）；使用 `useMessage()` 时，对应事件请改用每条消息的 `onClick` / `onClose` 回调。_

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| ready | 实例挂载完成时触发，参数为该实例的 api | (api: [MessageApi](#methods)) => void |
| click | 点击 `message` 时触发的回调函数 | (e: Event) => void |
| close | 关闭时触发的回调函数，参数为该条消息的 `key` | (key: string) => void |
