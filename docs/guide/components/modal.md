# 模态框 Modal

<GlobalElement />

*模态对话框*

## 何时使用

- 在当前页面正中打开一个浮层，承载相应的操作或者提示内容

## 使用方式

| 调用方式 | API | 适用位置 |
| :-- | :-- | :-- |
| 组件树内调用 <Tag color="success" size="small">推荐</Tag> | `useModal()` | 组件 `setup` 内，需外层存在 `<ModalProvider>` |
| 声明式用法 <Tag color="warning" size="small">插槽自定义</Tag> | `<Modal v-model:open>` | 模板中，标题 / 内容 / 底部需用插槽自定义时 |
| 脱离组件树调用 <Tag color="processing" size="small">无需 ModalProvider</Tag> | `createDiscreteApi()` | 任意位置（`axios` 拦截器、路由守卫、`Pinia action` 等） |

### 一、组件树内调用：`useModal()` <Tag color="success" size="small">推荐</Tag>

<br/>

_适用于命令式调用：先在应用根节点放置一次 `<ModalProvider>`，之后任意层级组件均可通过 `useModal()` 取得同一实例_

::: info 关于 `ModalProvider` 与 `Modal`

- `ModalProvider` 内部渲染一个 `Modal` 组件，并通过 `provide/inject` 向下提供 `useModal()` 所需的 API，自身不渲染任何可见内容
- 组件级配置属性（`width` / `height` / `centered` / `top` / `blockScroll` / `to` 等）会透传给内部的 `Modal`，因此直接参考下方 [Modal Props](#modal) 设置即可
- 使用 `useModal()` 时，组件级配置设置在 `<ModalProvider>` 上（无法直接接触内部 `Modal`）；每次调用的个性化配置（`title` / `content` / `icon` / `width` / `onOk` 等）则在调用 `info` / `confirm` 等方法时作为参数传入，参考 [ModalOptions Type](#modaloptions-type)

:::

**1. 在应用根节点放置 `ModalProvider`**

::: tip App.vue

```vue
<script setup lang="ts">
import { ModalProvider } from 'vue-amazing-ui'
</script>
<template>
  <ModalProvider>
    <RouterView />
  </ModalProvider>
</template>
```

:::

**2. 在任意层级组件中调用 `useModal()`**

::: tip XXX.vue

```vue
<script setup lang="ts">
import { useModal } from 'vue-amazing-ui'
const modal = useModal()
function onClick() {
  modal.confirm({
    title: 'Confirm Title',
    content: 'Some descriptions ...',
    onOk: () => {
      console.log('点击了确定按钮')
    },
    onCancel: () => {
      console.log('点击了取消按钮')
    }
  })
}
</script>
<template>
  <Button @click="onClick">按钮</Button>
</template>
```

:::

### 二、声明式用法：`<Modal v-model:open>` <Tag color="warning" size="small">插槽自定义</Tag>

<br/>

_适用于内容需要用插槽自定义的场景：由 `v-model:open` 驱动显隐，标题、内容、底部均可交由插槽接管_

::: tip XXX.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from 'vue-amazing-ui'
const open = ref(false)
</script>
<template>
  <Button type="primary" @click="open = true">打开弹窗</Button>
  <Modal v-model:open="open" title="This is a declarative modal" content="Some descriptions ..." />
</template>
```

:::

::: tip 命令式与声明式的差异

- **实例生命周期**：命令式（`info` / `confirm` 等）每次调用入栈一个新实例，默认关闭即销毁（`destroyOnClose: true`）；声明式实例常驻（默认 `destroyOnClose: false`），关闭后内容 DOM 与内部状态保留
- **默认行为**：命令式默认不显示右上角关闭按钮、不响应遮罩点击，需显式传 `closable: true` / `maskClosable: true`；声明式回落到组件默认值（`closable: false`、`maskClosable: true`）
- **内容来源**：命令式通过 `title` / `content` 等参数传入；声明式除参数外，还可用 `#icon` / `#title` / `#default` / `#footer` / `#closeIcon` 插槽自定义

:::

### 三、脱离组件树调用：`createDiscreteApi()` <Tag color="processing" size="small">无需 ModalProvider</Tag>

<br/>

_适用于脱离组件树的场景：内部会创建一个独立的应用实例，因此可在任意位置调用，无需外层 `ModalProvider`_

::: tip 注意

- 主题会随 `ConfigProvider` 自动同步，无需手工传入
- 每次调用都会创建一套独立实例（独立的容器与弹窗栈），建议缓存返回值复用，避免重复创建；不再使用时可通过返回的 `dispose()` 销毁该实例
- 内部会访问 `document`，`SSR` 场景请在客户端（点击回调、`onMounted` 等）中调用

:::

::: tip 独立实例的复用与销毁（dispose）

_独立实例创建后不会随组件卸载自动销毁，也不会因内部弹窗全部关闭而回收，需根据使用场景决定是否手动 `dispose()`：_

**场景 A · 全局单例，缓存复用（推荐）**：适用于 `axios` 拦截器、路由守卫、`Pinia action` 等常驻场景，整个应用生命周期内复用同一实例：

```ts
import { createDiscreteApi } from 'vue-amazing-ui'

// 在模块顶层创建一次，全局复用
const { modal } = createDiscreteApi(['modal'])

modal.info({ title: 'Modal Title', content: '这是一个弹窗' })
```

**场景 B · 临时使用后手动 `dispose()`**：适用于测试用例、单次任务等按需回收场景，用完即销毁：

```ts
import { createDiscreteApi } from 'vue-amazing-ui'
import type { DiscreteApiInstance } from 'vue-amazing-ui'

let discrete: DiscreteApiInstance<'modal'> | null = null
function getModalApi() {
  if (!discrete) {
    discrete = createDiscreteApi(['modal'])
  }
  return discrete.modal
}
getModalApi().info({ title: 'Modal Title', content: '这是一个弹窗' })

// 不再需要时手动销毁：卸载内部应用并移除挂载容器
// 重复调用无副作用（内部有 disposed 保护）；再次调用 getModalApi() 会安全重建
discrete?.dispose()
discrete = null
```

:::

::: tip XXX.ts（任意 .ts 文件）

```ts
import { createDiscreteApi } from 'vue-amazing-ui'

// 任意位置调用，无需外层 ModalProvider
const { modal } = createDiscreteApi(['modal'])

// 例：路由守卫中离开页面前二次确认
router.beforeEach((to, from, next) => {
  if (to.meta.needConfirm) {
    modal.confirm({
      title: '离开当前页面',
      content: '存在未保存的修改，确认离开？',
      onOk: () => next(),
      onCancel: () => next(false)
    })
    return
  }
  next()
})
```

:::

<Button type="primary" @click="onDiscreteModal">Discrete Modal（脱离组件树调用）</Button>

<script setup lang="ts">
import { computed, defineComponent, h, onBeforeUnmount, onMounted, reactive, ref, withDirectives } from 'vue'
import type { CSSProperties, Directive, PropType, VNode } from 'vue'
import {
  CloseCircleFilled,
  CloudFilled,
  CrownFilled,
  ExclamationCircleFilled,
  FireFilled,
  NotificationFilled,
  SoundFilled
} from '@ant-design/icons-vue'
import { format } from 'date-fns'
import { Button, Switch, createDiscreteApi, useMessage, useModal } from 'vue-amazing-ui'
import type { DiscreteApiInstance, ModalApi, ModalReactive, ModalUpdate } from 'vue-amazing-ui'
// setup 内调用 useModal()：需外层存在 <ModalProvider>（docs 站点已在主题层全局包裹）
const modal = useModal()
// setup 内调用 useMessage()：用于把各类回调结果反馈到页面上，避免只能看控制台
const message = useMessage()
// setup 外调用示例：createDiscreteApi 创建脱离组件树的独立实例
// 惰性单例：仅首次调用时创建，避免重复创建独立实例与挂载 DOM
let discreteModal: DiscreteApiInstance<'modal'> | null = null
function onDiscreteModal() {
  if (!discreteModal) {
    discreteModal = createDiscreteApi(['modal'])
  }
  discreteModal.modal.info({
    title: 'Discrete Modal',
    content: 'This modal is opened by createDiscreteApi outside setup'
  })
}
// 基本使用：六种内置形态
// info / success / error / warning 为单按钮（知道了），confirm / erase 为双按钮（取消 + 确定）
function onInfo() {
  modal.info({
    title: 'This is an info modal',
    content: 'Some descriptions ...',
    onKnow: () => message.info('点击了「知道了」')
  })
}
function onSuccess() {
  modal.success({
    title: 'This is a success modal',
    content: 'Some descriptions ...',
    onKnow: () => message.success('点击了「知道了」')
  })
}
function onError() {
  modal.error({
    title: 'This is an error modal',
    content: 'Some descriptions ...',
    onKnow: () => message.error('点击了「知道了」')
  })
}
function onWarning() {
  modal.warning({
    title: 'This is a warning modal',
    content: 'Some descriptions ...',
    onKnow: () => message.warning('点击了「知道了」')
  })
}
function onConfirm() {
  modal.confirm({
    title: 'This is a confirm modal',
    content: 'Some descriptions ...',
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => message.error('点击了「取消」')
  })
}
function onErase() {
  modal.erase({
    title: 'This is an erase modal',
    content: 'Some descriptions ...',
    okType: 'danger',
    onOk: () => message.success('点击了「删除」'),
    onCancel: () => message.error('点击了「取消」')
  })
}
// 声明式用法
const basicOpen = ref(false)
const slotOpen = ref(false)
function onDeclarativeChange(open: boolean, key: string) {
  message.info(`最近一次 change 事件：open: ${open}，key: ${key}`)
}
function onDeclarativeOk() {
  message.success('点击了「确定」，v-model:open 已同步为 false')
}
function onDeclarativeCancel() {
  message.warning('点击了「取消」/ 遮罩 / Esc，v-model:open 已同步为 false')
}
function onSlotOk() {
  message.success('已提交处理')
  slotOpen.value = false
}
// 内容保留、预渲染与关闭回调
// renderBeforeOpen 演示用：统计内容已渲染的时长，用于对比懒渲染与预渲染
// 页面级计时状态：弹窗内的渲染时长实时同步到页面，打开弹窗前即可看出懒渲染与预渲染的差异
const renderSeconds = reactive<{ lazy: number | null; pre: number | null }>({ lazy: null, pre: null })
function formatRenderSeconds(seconds: number | null): string {
  return seconds === null ? '未渲染' : `已渲染 ${seconds} 秒`
}
// 未渲染时置灰，已渲染时高亮，直观区分懒渲染与预渲染
function renderValueStyle(seconds: number | null): CSSProperties {
  return { fontSize: '20px', color: seconds === null ? 'rgba(0, 0, 0, 0.45)' : '#1677ff' }
}
const lazyRender = computed(() => ({
  text: formatRenderSeconds(renderSeconds.lazy),
  style: renderValueStyle(renderSeconds.lazy)
}))
const preRender = computed(() => ({
  text: formatRenderSeconds(renderSeconds.pre),
  style: renderValueStyle(renderSeconds.pre)
}))
// Statistic 默认 24px 字号在卡片内偏大，统一收窄
const statisticValueStyle: CSSProperties = { fontSize: '20px' }
const ContentTimer = defineComponent({
  emits: ['tick'],
  setup(_, { emit }) {
    const elapsed = ref(0)
    // 定时器在 onMounted 中启动：SSR 阶段不执行挂载生命周期，window 仅在客户端可用
    let timer: number | undefined
    onMounted(() => {
      timer = window.setInterval(() => {
        elapsed.value += 1
        // 上报渲染时长，供页面级状态展示
        emit('tick', elapsed.value)
      }, 1000)
    })
    onBeforeUnmount(() => {
      window.clearInterval(timer)
    })
    return () => h('p', { style: 'margin: 0' }, `内容已渲染 ${elapsed.value} 秒`)
  }
})
function onLazyRenderTick(seconds: number): void {
  renderSeconds.lazy = seconds
}
function onPreRenderTick(seconds: number): void {
  renderSeconds.pre = seconds
}
const lazyOpen = ref(false)
const preRenderOpen = ref(false)
// destroyOnClose: false 时关闭不销毁内容，组件实例保留，内部状态持久化
let draftModal: ModalReactive | null = null
const draftOpenCount = ref(0)
const onceOpenCount = ref(0)
const afterCloseCount = ref(0)
const lastAfterCloseTime = ref<string | null>(null)
// Switch 是受控组件（点击只 emit update:modelValue），需自行持有选中态才能响应点击；
// 状态随组件实例存活：destroyOnClose: false 时实例保留则状态持久化，true 时销毁重建则状态重置
const SwitchDemo = defineComponent({
  setup() {
    const checked = ref(false)
    return () =>
      h(Switch, {
        modelValue: checked.value,
        'onUpdate:modelValue': (value: boolean) => {
          checked.value = value
        }
      })
  }
})
function onOpenDraftModal() {
  draftOpenCount.value += 1
  if (draftModal) {
    draftModal.show()
    return
  }
  draftModal = modal.confirm({
    title: '开关状态',
    content: () =>
      h('div', { style: 'display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 4px;' }, [
        h('span', { style: 'flex: 1' }, '打开开关后关闭弹窗，重新打开对比状态是否保留：'),
        h(SwitchDemo)
      ]),
    destroyOnClose: false,
    onOk: () => message.success('已保存开关状态（组件实例保留）')
  })
}
function onOpenOnceModal() {
  onceOpenCount.value += 1
  modal.confirm({
    title: '开关状态',
    content: () =>
      h('div', { style: 'display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 4px;' }, [
        h('span', { style: 'flex: 1' }, '打开开关后关闭弹窗，重新打开对比状态是否重置：'),
        h(SwitchDemo)
      ]),
    destroyOnClose: true,
    onOk: () => message.success('已提交（组件实例已销毁，下次打开全新）')
  })
}
function onAfterCloseModal() {
  modal.info({
    title: 'afterClose 回调',
    content: '关闭动画结束后才触发 afterClose，适合做资源清理或跳转。',
    afterClose: () => {
      afterCloseCount.value += 1
      lastAfterCloseTime.value = format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
      message.success('afterClose 触发：弹窗已完全关闭')
    }
  })
}
// 内容区高度与滚动
// 生成演示用的超长内容：每次调用返回新的 VNode，避免复用同一 VNode 实例导致渲染异常
function createLongContent(): VNode {
  return h(
    'div',
    null,
    Array.from({ length: 30 }, (_, index) =>
      h('p', { style: 'margin: 0 0 8px' }, `第 ${index + 1} 行：这是一段用于演示超高内容滚动行为的示例文本。`)
    )
  )
}
// height 为 auto（默认）时内容由弹框自然撑开，超高后整个弹框随外层容器滚动
function onWholeScrollModal() {
  modal.info({
    title: '整体弹框滚动（height 默认 auto）',
    content: createLongContent,
    centered: true,
    width: 520
  })
}
// 指定 height 后内容区内部滚动，标题与按钮固定可见
function onInnerScrollModal() {
  modal.info({
    title: '内容区内部滚动（height + scrollbarProps）',
    content: createLongContent,
    height: 300,
    scrollbarProps: { trigger: 'none', contentStyle: { paddingRight: '12px' } },
    centered: true,
    width: 520
  })
}
// scrollbarProps 透传给内置 Scrollbar，可定制滚动条大小与位置
function onCustomScrollbarModal() {
  modal.info({
    title: '自定义滚动条',
    content: createLongContent,
    height: 300,
    scrollbarProps: { trigger: 'none', size: 10, yPlacement: 'left', contentStyle: { paddingLeft: '12px' } },
    centered: true,
    width: 520
  })
}
// 自定义宽度
function onNumberWidthModal() {
  modal.info({
    title: '数值宽度',
    content: 'Some descriptions ...',
    width: 365
  })
}
function onPercentWidthModal() {
  modal.confirm({
    title: '百分比宽度',
    content: 'Some descriptions ...',
    width: '28%'
  })
}
// 自定义图标
function onVNodeIconModal() {
  modal.info({
    title: '节点图标',
    content: 'Some descriptions ...',
    icon: h(CloudFilled)
  })
}
// icon 也支持渲染函数形态，每次渲染时动态生成图标
function onRenderFnIconModal() {
  modal.confirm({
    title: '渲染函数图标',
    content: 'Some descriptions ...',
    icon: () => h(SoundFilled, { style: 'color: gold' })
  })
}
// 自定义样式
function onCustomClassModal() {
  modal.info({
    title: '自定义内容样式类',
    content: 'Some descriptions ...',
    icon: h(FireFilled),
    bodyClass: 'custom-modal-body'
  })
}
function onBodyMaskStyleModal() {
  modal.confirm({
    title: '自定义内容与遮罩样式',
    content: 'Some descriptions ...',
    icon: h(NotificationFilled),
    bodyStyle: {
      padding: '24px',
      borderRadius: '12px'
    },
    maskStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }
  })
}
function onTitleContentStyleModal() {
  modal.success({
    title: '自定义标题与内容样式',
    content: 'Some descriptions ...',
    icon: h(CrownFilled),
    titleStyle: {
      color: '#52c41a'
    },
    contentStyle: {
      color: '#52c41a'
    }
  })
}
// containerStyle 优先级高于 width / top / zIndex 等内置样式
function onContainerStyleModal() {
  modal.info({
    title: '自定义容器样式',
    content: 'width 传的是 420，但 containerStyle 中的 560px 优先级更高。',
    width: 420,
    containerStyle: { width: '560px' }
  })
}
// 自定义按钮
function onNoticeBtnModal() {
  modal.info({
    title: '自定义按钮文案',
    content: 'Some descriptions ...',
    noticeText: 'Noted',
    noticeProps: {
      shape: 'round'
    },
    onKnow: () => message.success('点击了 Noted')
  })
}
function onConfirmBtnsModal() {
  modal.confirm({
    title: '自定义确认按钮',
    content: 'Some descriptions ...',
    cancelText: 'No',
    cancelProps: { type: 'danger', ghost: true },
    okText: 'Yes',
    okType: 'danger',
    okProps: { ghost: true },
    onOk: () => message.success('点击了 Yes'),
    onCancel: () => message.error('点击了 No')
  })
}
// showCancel 仅在 confirm / erase 双按钮形态生效
function onHideCancelModal() {
  modal.confirm({
    title: '隐藏取消按钮',
    content: 'showCancel: false 时只保留确定按钮。',
    showCancel: false,
    okText: '知道了',
    onOk: () => message.success('点击了「知道了」')
  })
}
// 自定义底部区域
// footer 传渲染函数时完全接管底部，内置按钮组不再渲染
function onFooterRenderModal() {
  const handle: ModalReactive = modal.info({
    title: '自定义底部渲染',
    content: 'footer 传渲染函数时，底部区域完全由该函数接管。',
    closable: true,
    footer: () =>
      h('div', { style: 'display: flex; justify-content: flex-end; gap: 8px' }, [
        h(Button, { onClick: () => handle.destroy() }, { default: () => '稍后处理' }),
        h(
          Button,
          {
            type: 'primary',
            onClick: () => {
              message.success('已立即处理')
              handle.destroy()
            }
          },
          { default: () => '立即处理' }
        )
      ])
  })
}
function onFooterlessModal() {
  modal.info({
    title: '无底部按钮',
    content: 'footer: false 时底部整块隐藏，配合 closable 用右上角关闭。',
    closable: true,
    footer: false
  })
}
// 完全自定义 create()
// create() 不渲染内置图标与按钮组，图标、底部均由 icon / footer 自行组合
function onCreateModal() {
  const handle: ModalReactive = modal.create({
    title: 'Custom Modal（create）',
    content: h('p', { style: 'margin: 0' }, '通过 create() 创建，图标、内容、底部按钮均完全自定义。'),
    width: 480,
    closable: true,
    icon: h(CrownFilled, { style: 'color: #faad14' }),
    footer: () =>
      h('div', { style: 'display: flex; justify-content: flex-end; gap: 8px' }, [
        h(Button, { onClick: () => handle.destroy() }, { default: () => '取消' }),
        h(
          Button,
          {
            type: 'primary',
            onClick: () => {
              message.success('自定义确定')
              handle.destroy()
            }
          },
          { default: () => '确定' }
        )
      ])
  })
}
// 关闭按钮
// 命令式弹窗默认无关闭按钮，closable: true 显示右上角 X
function onClosableModal() {
  modal.confirm({
    title: '显示关闭按钮',
    content: '命令式弹窗默认不显示右上角关闭按钮，设置 closable: true 后显示。',
    closable: true,
    onOk: () => message.success('点击了「确定」')
  })
}
// closeIcon 支持 VNode 与渲染函数
function onCustomCloseIconModal() {
  modal.confirm({
    title: '自定义关闭图标',
    content: 'closeIcon 支持 VNode 与渲染函数两种形态。',
    closable: true,
    closeIcon: () => h(CloseCircleFilled, { style: 'color: #ff4d4f' }),
    onOk: () => message.success('点击了「确定」')
  })
}
// 自定义位置
function onNumberTopModal() {
  modal.info({
    title: '60px This is a number fixed modal',
    content: 'Some descriptions ...',
    centered: false,
    top: 60
  })
}
function onPercentTopModal() {
  modal.info({
    title: '20% This is a percent fixed modal',
    content: 'Some descriptions ...',
    centered: false,
    top: '20%'
  })
}
function onCenteredModal() {
  modal.info({
    title: 'This is a vertically centered modal',
    content: 'Some descriptions ...',
    centered: true
  })
}
// 动画出现位置
function onMouseOriginModal() {
  modal.info({
    title: '从鼠标位置展开（默认）',
    content: 'transformOrigin: mouse 时，弹窗从鼠标点击位置放大。',
    transformOrigin: 'mouse'
  })
}
function onCenterOriginModal() {
  modal.info({
    title: '从中心展开',
    content: 'transformOrigin: center 时，弹窗从自身中心放大。',
    transformOrigin: 'center'
  })
}
// 异步关闭与阻止关闭
// onOk 返回 Promise：resolve 后自动关闭，期间按钮保持 loading
function onAsyncOkModal() {
  modal.confirm({
    title: '确认提交这些项？',
    content: '点击确定后等待 1.5s，Promise resolve 后自动关闭。',
    icon: h(ExclamationCircleFilled),
    onOk: () =>
      new Promise<boolean>((resolve) => {
        setTimeout(() => {
          message.success('提交成功')
          resolve(true)
        }, 1500)
      }),
    onCancel: () => message.error('已取消提交')
  })
}
// onOk 返回的 Promise reject 时阻止关闭（在 catch 中返回 false，避免异常冒泡到控制台）
function onRejectOkModal() {
  modal.confirm({
    title: '确认删除这些项？',
    content: '点击确定后服务端校验失败，Promise reject 并阻止关闭。',
    icon: h(ExclamationCircleFilled),
    onOk: () =>
      new Promise((_resolve, reject) => {
        setTimeout(() => reject(new Error('服务端校验失败')), 1200)
      }).catch(() => {
        message.error('校验失败，弹窗保持打开')
        return false
      })
  })
}
// onOk 同步返回 false 同样阻止关闭
function onPreventOkModal() {
  let submitted = false
  modal.confirm({
    title: '同步阻止关闭',
    content: '首次点击「确定」返回 false 阻止关闭，再次点击则正常关闭。',
    onOk: () => {
      if (!submitted) {
        submitted = true
        message.warning('还有必填项未完成，已阻止关闭')
        return false
      }
      message.success('校验通过，弹窗关闭')
    }
  })
}
// onCancel 返回 false 时，遮罩 / Esc / 取消按钮都无法关闭
function onPreventCancelModal() {
  modal.confirm({
    title: '取消时阻止关闭',
    content: '点击遮罩、按下 Esc 或点击「取消」都会被阻止，只有「确定」可关闭。',
    maskClosable: true,
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => {
      message.warning('操作未完成，已阻止关闭')
      return false
    }
  })
}
// 原地更新 update
// 页面级定时器统一登记，卸载时清理，避免组件销毁后仍在跑
const timers: number[] = []
function onProgressUpload() {
  const percent = ref(0)
  const handle = modal.info({
    title: '正在上传附件',
    // content 传渲染函数：内部引用响应式 percent，进度变化时弹窗内容自动更新
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
            font-weight: 600;
            color: #1677ff;
          `
          },
          `${percent.value}%`
        )
      ]),
    noticeText: '上传中…',
    // 上传未完成时阻止关闭
    onKnow: () => {
      message.warning('上传完成前不可关闭')
      return false
    }
  })
  // update 支持 loading：手动驱动按钮 loading
  handle.update({ loading: true })
  const timer = window.setInterval(() => {
    percent.value += 4
    if (percent.value < 100) {
      return
    }
    clearInterval(timer)
    // update 支持 mode：原地把 info 切换为 success，并重设文案与回调
    const doneOptions: ModalUpdate = {
      title: '上传完成',
      content: '附件已上传，mode 已切换为 success。',
      mode: 'success',
      noticeText: '知道了',
      loading: false,
      onKnow: () => message.success('已确认上传结果')
    }
    handle.update(doneOptions)
  }, 120)
  timers.push(timer)
}
// 多实例层叠
// 遮罩会挡住页面，弹窗打开后无法再点击页面按钮，故一次点击开启多层以便观察层叠与逐层关闭
function openStackLayers(content: string): void {
  for (let layer = 1; layer <= 3; layer += 1) {
    modal.info({
      title: `第 ${layer} 层弹窗`,
      content,
      zIndex: 1000 + layer * 20,
      maskClosable: true
    })
  }
}
function onStackModal() {
  openStackLayers('点击遮罩或「知道了」只关闭栈顶弹窗；各实例按自身 zIndex 分层（遮罩取 zIndex，弹窗取 zIndex + 10）。')
}
// destroyAll 同样无法在弹窗打开后从页面触发，故开启多层后用定时器演示一次性全部销毁
function onDestroyAllModals() {
  openStackLayers('2s 后 destroyAll() 会一次性关闭并销毁全部弹窗。')
  timers.push(
    window.setTimeout(() => {
      modal.destroyAll()
      message.success('destroyAll：已关闭全部弹窗')
    }, 2000)
  )
}
// 遮罩、键盘与滚动锁定
function onNoMaskModal() {
  modal.info({
    title: '无遮罩',
    content: '不渲染遮罩层，背景仍可交互，只能通过底部按钮关闭。',
    mask: false,
    maskClosable: false
  })
}
// 命令式调用默认 maskClosable: false，需显式开启
function onMaskClosableModal() {
  modal.confirm({
    title: '点击遮罩关闭',
    content: '命令式调用默认 maskClosable: false，此处显式传 true。',
    maskClosable: true,
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => message.error('点击了遮罩 / Esc / 取消')
  })
}
// keyboard: false 禁用 Esc 关闭，但 onEsc 回调仍会触发
function onNoKeyboardModal() {
  modal.info({
    title: '禁用 Esc 关闭',
    content: '按下 Esc 不会关闭弹窗，但 onEsc 回调仍会触发。',
    keyboard: false,
    onEsc: () => message.info('onEsc 回调触发，但已禁用 Esc 关闭')
  })
}
// onMaskClick / onEsc 无论是否允许关闭都会触发
function onMaskEscCallbackModal() {
  modal.info({
    title: '遮罩与 Esc 回调',
    content: '遮罩点击与 Esc 均被禁用关闭，但两个回调仍会触发。',
    maskClosable: false,
    keyboard: false,
    onMaskClick: () => message.info('onMaskClick 回调触发'),
    onEsc: () => message.info('onEsc 回调触发')
  })
}
function onBlockScrollModal() {
  modal.info({
    title: 'blockScroll: true（默认）',
    content: '打开时锁定背景滚动，此时滚动页面无效，全部关闭后自动解锁。'
  })
}
function onNoBlockScrollModal() {
  modal.info({
    title: 'blockScroll: false',
    content: '不锁定背景滚动，可用滚轮滚动页面，与上一例对比即可看出差异。',
    blockScroll: false
  })
}
// 焦点管理
function onAutoFocusOkModal() {
  modal.confirm({
    title: '聚焦确定按钮（默认）',
    content: '入场动画结束后，焦点自动落在「确定」按钮上。',
    autoFocusButton: 'ok',
    onOk: () => message.success('点击了「确定」')
  })
}
function onAutoFocusCancelModal() {
  modal.confirm({
    title: '聚焦取消按钮',
    content: '入场动画结束后，焦点自动落在「取消」按钮上。',
    autoFocusButton: 'cancel',
    onCancel: () => message.error('点击了「取消」')
  })
}
function onAutoFocusNullModal() {
  modal.confirm({
    title: '不自动聚焦',
    content: '不自动聚焦按钮，焦点落在弹窗容器上，Esc 依旧可用。',
    autoFocusButton: null,
    onOk: () => message.success('点击了「确定」')
  })
}
function onNoTrapFocusModal() {
  modal.confirm({
    title: '取消焦点陷阱',
    content: '关闭焦点锁定后，Tab / Shift + Tab 可以移到背景页面。',
    trapFocus: false,
    onOk: () => message.success('点击了「确定」')
  })
}
function onNoFocusRestoreModal() {
  modal.confirm({
    title: '关闭不归还焦点',
    content: '关闭后焦点不归还给触发按钮；默认 true 时会归还。',
    focusTriggerAfterClose: false,
    onOk: () => message.success('点击了「确定」')
  })
}
// 自定义渲染 modalRender（拖拽）
// 指令卸载时移除监听，避免实例销毁后残留
const dragCleanups = new WeakMap<HTMLElement, () => void>()
// 把弹窗内容包进一层可拖拽容器：按住标题栏即可拖动，常用于拖拽场景
const vDragModal: Directive<HTMLElement> = {
  mounted(el) {
    let offsetX = 0
    let offsetY = 0
    function onMousedown(e: MouseEvent) {
      // 仅按住标题栏才触发拖拽，避免影响文本选择与按钮点击
      if (!(e.target as HTMLElement).closest('.modal-header')) {
        return
      }
      e.preventDefault()
      const startX = e.clientX - offsetX
      const startY = e.clientY - offsetY
      function onMousemove(event: MouseEvent) {
        offsetX = event.clientX - startX
        offsetY = event.clientY - startY
        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`
      }
      function onMouseup() {
        document.removeEventListener('mousemove', onMousemove)
        document.removeEventListener('mouseup', onMouseup)
        document.body.style.userSelect = ''
      }
      document.addEventListener('mousemove', onMousemove)
      document.addEventListener('mouseup', onMouseup)
      document.body.style.userSelect = 'none'
    }
    el.addEventListener('mousedown', onMousedown)
    dragCleanups.set(el, () => {
      el.removeEventListener('mousedown', onMousedown)
      document.body.style.userSelect = ''
    })
  },
  unmounted(el) {
    dragCleanups.get(el)?.()
    dragCleanups.delete(el)
  }
}
function onDraggableModal() {
  modal.info({
    title: '按住标题栏拖动我',
    content: 'modalRender 可拿到默认内容节点 originVNode，包一层自定义容器即可实现拖拽。',
    width: 460,
    centered: true,
    modalRender: ({ originVNode }) =>
      withDirectives(h('div', { class: 'draggable-modal' }, [originVNode]), [[vDragModal]])
  })
}
// 声明式拖拽：与命令式等价，改用 #modalRender 作用域插槽拿到 originVNode
const dragModalOpen = ref(false)
// 模板无法直接摆放已构造的 VNode，用透传组件承接 originVNode 后原样渲染
const VNodeRenderer = defineComponent({
  props: {
    vnode: {
      type: Object as PropType<VNode>,
      required: true
    }
  },
  setup(props) {
    return () => props.vnode
  }
})
// 自定义挂载容器 to
// to 为 Provider 级配置，无法逐条传入，故在页面局部嵌套 Provider 演示；@ready 可取到该 Provider 作用域内的 api
const toModal = ref<ModalApi>()
const toReady = ref(false)
// 目标容器与组件位于同一组件树，需等挂载完成（目标已插入文档）后再渲染组件，Teleport 才能定位到目标
onMounted(() => {
  toReady.value = true
})
function onToModal() {
  toModal.value?.info({
    title: '自定义挂载容器',
    content: '这个弹窗被挂载到下方虚线容器中'
  })
}
onBeforeUnmount(() => {
  timers.forEach((timer) => {
    clearInterval(timer)
  })
})
</script>

---

> 本文档网站已在主题层全局包裹 `<ModalProvider>`，以下演示均通过 `useModal()` 获取实例（与真实项目用法一致）；需要不同组件级配置的演示，均通过页面内局部嵌套 `<ModalProvider>` 实现。

## 基本使用

_共有六种内置形态：`info` / `success` / `error` / `warning` 为单按钮（知道了），`confirm` / `erase` 为双按钮（取消 + 确定）_

<br/>

<Space>
  <Button type="primary" @click="onInfo">Info</Button>
  <Button type="primary" @click="onSuccess">Success</Button>
  <Button type="primary" @click="onError">Error</Button>
  <Button type="primary" @click="onWarning">Warning</Button>
  <Button type="primary" @click="onConfirm">Confirm</Button>
  <Button type="primary" @click="onErase">Erase</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage, useModal } from 'vue-amazing-ui'
const modal = useModal()
const message = useMessage()
// info / success / error / warning 为单按钮（知道了）
function onInfo() {
  modal.info({
    title: 'This is an info modal',
    content: 'Some descriptions ...',
    onKnow: () => message.info('点击了「知道了」')
  })
}
function onSuccess() {
  modal.success({
    title: 'This is a success modal',
    content: 'Some descriptions ...',
    onKnow: () => message.success('点击了「知道了」')
  })
}
function onError() {
  modal.error({
    title: 'This is an error modal',
    content: 'Some descriptions ...',
    onKnow: () => message.error('点击了「知道了」')
  })
}
function onWarning() {
  modal.warning({
    title: 'This is a warning modal',
    content: 'Some descriptions ...',
    onKnow: () => message.warning('点击了「知道了」')
  })
}
// confirm / erase 为双按钮（取消 + 确定）
function onConfirm() {
  modal.confirm({
    title: 'This is a confirm modal',
    content: 'Some descriptions ...',
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => message.error('点击了「取消」')
  })
}
function onErase() {
  modal.erase({
    title: 'This is an erase modal',
    content: 'Some descriptions ...',
    okType: 'danger',
    onOk: () => message.success('点击了「删除」'),
    onCancel: () => message.error('点击了「取消」')
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onInfo">Info</Button>
    <Button type="primary" @click="onSuccess">Success</Button>
    <Button type="primary" @click="onError">Error</Button>
    <Button type="primary" @click="onWarning">Warning</Button>
    <Button type="primary" @click="onConfirm">Confirm</Button>
    <Button type="primary" @click="onErase">Erase</Button>
  </Space>
</template>
```

:::

## 声明式用法

_用 `v-model:open` 控制显隐，标题、内容、底部均可用插槽自定义；`change` 事件在每次开关时触发，并携带该实例的 `key`_

<br/>

<Space>
  <Button type="primary" @click="basicOpen = true">打开声明式弹窗</Button>
  <Button type="primary" @click="slotOpen = true">插槽自定义标题与底部</Button>
</Space>

<Modal v-model:open="basicOpen" title="This is a declarative modal" content="v-model:open 为 true 时打开，点击确定 / 取消 / 遮罩 / Esc 均会同步回写 false。" @ok="onDeclarativeOk" @cancel="onDeclarativeCancel" @change="onDeclarativeChange" />
<Modal v-model:open="slotOpen" :width="460">
  <template #icon>
    <FireFilled style="color: #ff6900" />
  </template>
  <template #title>
    <span>Vue Amazing UI</span>
  </template>
  <p>Some descriptions ...</p>
  <p>Some descriptions ...</p>
  <template #footer>
    <Space>
      <Button @click="slotOpen = false">稍后处理</Button>
      <Button type="primary" @click="onSlotOk">立即处理</Button>
    </Space>
  </template>
</Modal>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FireFilled } from '@ant-design/icons-vue'
import { useMessage } from 'vue-amazing-ui'
const message = useMessage()
const basicOpen = ref(false)
const slotOpen = ref(false)
// change 事件在每次开关时触发，并携带该实例的 key
function onDeclarativeChange(open: boolean, key: string) {
  message.info(`最近一次 change 事件：open: ${open}，key: ${key}`)
}
function onDeclarativeOk() {
  message.success('点击了「确定」，v-model:open 已同步为 false')
}
function onDeclarativeCancel() {
  message.warning('点击了「取消」/ 遮罩 / Esc，v-model:open 已同步为 false')
}
function onSlotOk() {
  message.success('已提交处理')
  slotOpen.value = false
}
</script>
<template>
  <Space>
    <Button type="primary" @click="basicOpen = true">打开声明式弹窗</Button>
    <Button type="primary" @click="slotOpen = true">插槽自定义标题与底部</Button>
  </Space>
  <Modal
    v-model:open="basicOpen"
    title="This is a declarative modal"
    content="v-model:open 为 true 时打开，点击确定 / 取消 / 遮罩 / Esc 均会同步回写 false。"
    @ok="onDeclarativeOk"
    @cancel="onDeclarativeCancel"
    @change="onDeclarativeChange"
  />
  <Modal v-model:open="slotOpen" :width="460">
    <template #icon>
      <FireFilled style="color: #ff6900" />
    </template>
    <template #title>
      <span>Vue Amazing UI</span>
    </template>
    <p>Some descriptions ...</p>
    <p>Some descriptions ...</p>
    <template #footer>
      <Space>
        <Button @click="slotOpen = false">稍后处理</Button>
        <Button type="primary" @click="onSlotOk">立即处理</Button>
      </Space>
    </template>
  </Modal>
</template>
```

:::

## 内容保留、预渲染与关闭回调

_命令式弹窗默认 `destroyOnClose: true`，关闭即销毁；声明式弹窗默认 `false`，关闭后保留内容。下面分三组演示内容保留、预渲染与关闭回调的差异_

<br/>

<Card class="demo-group">
  <template #title>
    <Space :gap="8">
      <Badge :value="1" color="blue" />
      <span>destroyOnClose：内容是否保留</span>
    </Space>
  </template>
  <p class="demo-group-desc">
    两个弹窗都含 <code>Switch</code> 开关：打开开关 → 关闭 → 重新打开，对比开关状态是否保留。
  </p>
  <Flex wrap="wrap" :gap="16">
    <Card class="demo-variant">
      <template #title>
        <Button type="primary" @click="onOpenDraftModal">草稿弹窗（保留内容）</Button>
      </template>
      <p class="demo-variant-desc">实例保留，重复打开复用同一实例，内部状态持久化</p>
      <Statistic title="已打开" :value="draftOpenCount" suffix="次" :value-style="statisticValueStyle" />
    </Card>
    <Card class="demo-variant">
      <template #title>
        <Button type="primary" @click="onOpenOnceModal">一次性弹窗（关闭销毁）</Button>
      </template>
      <p class="demo-variant-desc">实例销毁，每次打开都创建全新实例，状态重置</p>
      <Statistic title="已打开" :value="onceOpenCount" suffix="次" :value-style="statisticValueStyle" />
    </Card>
  </Flex>
</Card>

<Card class="demo-group">
  <template #title>
    <Space :gap="8">
      <Badge :value="2" color="blue" />
      <span>renderBeforeOpen：预渲染</span>
    </Space>
  </template>
  <p class="demo-group-desc">
    弹窗内容的渲染时长实时同步到下方：懒渲染<b>首次打开前为「未渲染」</b>，预渲染<b>打开前已在计时</b>。
  </p>
  <Flex wrap="wrap" :gap="16">
    <Card class="demo-variant">
      <template #title>
        <Button type="primary" @click="lazyOpen = true">懒渲染（默认）</Button>
      </template>
      <template #extra>
        <Tag>false</Tag>
      </template>
      <p class="demo-variant-desc">首次打开时才渲染内容</p>
      <Statistic title="渲染状态" :value-style="lazyRender.style">{{ lazyRender.text }}</Statistic>
    </Card>
    <Card class="demo-variant">
      <template #title>
        <Button type="primary" @click="preRenderOpen = true">预渲染</Button>
      </template>
      <template #extra>
        <Tag color="success">true</Tag>
      </template>
      <p class="demo-variant-desc">随页面一起渲染，打开即可见已有计时</p>
      <Statistic title="渲染状态" :value-style="preRender.style">{{ preRender.text }}</Statistic>
    </Card>
  </Flex>
  <Modal v-model:open="lazyOpen" title="懒渲染（默认）">
    <ContentTimer @tick="onLazyRenderTick" />
  </Modal>
  <Modal v-model:open="preRenderOpen" title="预渲染（render-before-open）" render-before-open>
    <ContentTimer @tick="onPreRenderTick" />
  </Modal>
</Card>

<Card class="demo-group">
  <template #title>
    <Space :gap="8">
      <Badge :value="3" color="blue" />
      <span>afterClose：关闭后回调</span>
    </Space>
  </template>
  <p class="demo-group-desc">
    点击「知道了」或按 <code>Esc</code> 关闭均可触发，回调在<b>关闭动画播放结束后</b>才执行。
  </p>
  <Flex wrap="wrap" :gap="16">
    <Card class="demo-variant">
      <template #title>
        <Button type="primary" @click="onAfterCloseModal">打开弹窗</Button>
      </template>
      <p class="demo-variant-desc">适合做资源清理或路由跳转</p>
      <Space :gap="32" wrap>
        <Statistic title="触发次数" :value="afterCloseCount" :value-style="statisticValueStyle" />
        <Statistic title="最近触发" :value-style="statisticValueStyle">
          {{ lastAfterCloseTime ?? '—' }}
        </Statistic>
      </Space>
    </Card>
  </Flex>
</Card>

<style lang="less" scoped>
.demo-group + .demo-group {
  margin-top: 16px;
}
.demo-group-desc {
  margin: 0 0 16px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.6;
}
.demo-variant {
  flex: 1 1 280px;
  min-width: 260px;
}
.demo-variant-desc {
  margin: 0 0 12px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.6;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { computed, defineComponent, h, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { format } from 'date-fns'
import { Switch, useMessage, useModal } from 'vue-amazing-ui'
import type { ModalReactive } from 'vue-amazing-ui'
const modal = useModal()
const message = useMessage()
// Statistic 默认 24px 字号在卡片内偏大，统一收窄
const statisticValueStyle: CSSProperties = { fontSize: '20px' }
// 一、destroyOnClose：内容是否保留
// destroyOnClose: false 时关闭不销毁内容，组件实例保留，内部状态持久化
let draftModal: ModalReactive | null = null
const draftOpenCount = ref(0)
const onceOpenCount = ref(0)
// Switch 是受控组件（点击只 emit update:modelValue），需自行持有选中态才能响应点击；
// 状态随组件实例存活：destroyOnClose: false 时实例保留则状态持久化，true 时销毁重建则状态重置
const SwitchDemo = defineComponent({
  setup() {
    const checked = ref(false)
    return () =>
      h(Switch, {
        modelValue: checked.value,
        'onUpdate:modelValue': (value: boolean) => {
          checked.value = value
        }
      })
  }
})
function onOpenDraftModal() {
  draftOpenCount.value += 1
  if (draftModal) {
    draftModal.show()
    return
  }
  draftModal = modal.confirm({
    title: '开关状态',
    content: () =>
      h('div', { style: 'display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 4px;' }, [
        h('span', { style: 'flex: 1' }, '打开开关后关闭弹窗，重新打开对比状态是否保留：'),
        h(SwitchDemo)
      ]),
    destroyOnClose: false,
    onOk: () => message.success('已保存开关状态（组件实例保留）')
  })
}
function onOpenOnceModal() {
  onceOpenCount.value += 1
  modal.confirm({
    title: '开关状态',
    content: () =>
      h('div', { style: 'display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 4px;' }, [
        h('span', { style: 'flex: 1' }, '打开开关后关闭弹窗，重新打开对比状态是否重置：'),
        h(SwitchDemo)
      ]),
    destroyOnClose: true,
    onOk: () => message.success('已提交（组件实例已销毁，下次打开全新）')
  })
}
// 二、renderBeforeOpen：预渲染
// 页面级计时状态：弹窗内的渲染时长实时同步到页面，打开弹窗前即可看出懒渲染与预渲染的差异
const renderSeconds = reactive<{ lazy: number | null; pre: number | null }>({ lazy: null, pre: null })
function formatRenderSeconds(seconds: number | null): string {
  return seconds === null ? '未渲染' : `已渲染 ${seconds} 秒`
}
// 未渲染时置灰，已渲染时高亮，直观区分懒渲染与预渲染
function renderValueStyle(seconds: number | null): CSSProperties {
  return { fontSize: '20px', color: seconds === null ? 'rgba(0, 0, 0, 0.45)' : '#1677ff' }
}
const lazyRender = computed(() => ({
  text: formatRenderSeconds(renderSeconds.lazy),
  style: renderValueStyle(renderSeconds.lazy)
}))
const preRender = computed(() => ({
  text: formatRenderSeconds(renderSeconds.pre),
  style: renderValueStyle(renderSeconds.pre)
}))
const ContentTimer = defineComponent({
  emits: ['tick'],
  setup(_, { emit }) {
    const elapsed = ref(0)
    // 定时器在 onMounted 中启动：SSR 阶段不执行挂载生命周期，window 仅在客户端可用
    let timer: number | undefined
    onMounted(() => {
      timer = window.setInterval(() => {
        elapsed.value += 1
        // 上报渲染时长，供页面级状态展示
        emit('tick', elapsed.value)
      }, 1000)
    })
    onBeforeUnmount(() => {
      window.clearInterval(timer)
    })
    return () => h('p', { style: 'margin: 0' }, `内容已渲染 ${elapsed.value} 秒`)
  }
})
function onLazyRenderTick(seconds: number): void {
  renderSeconds.lazy = seconds
}
function onPreRenderTick(seconds: number): void {
  renderSeconds.pre = seconds
}
const lazyOpen = ref(false)
const preRenderOpen = ref(false)
// 三、afterClose：关闭后回调
const afterCloseCount = ref(0)
const lastAfterCloseTime = ref<string | null>(null)
function onAfterCloseModal() {
  modal.info({
    title: 'afterClose 回调',
    content: '关闭动画结束后才触发 afterClose，适合做资源清理或跳转。',
    afterClose: () => {
      afterCloseCount.value += 1
      lastAfterCloseTime.value = format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
      message.success('afterClose 触发：弹窗已完全关闭')
    }
  })
}
</script>
<template>
  <Card class="demo-group">
    <template #title>
      <Space :gap="8">
        <Badge :value="1" color="blue" />
        <span>destroyOnClose：内容是否保留</span>
      </Space>
    </template>
    <p class="demo-group-desc">
      两个弹窗都含 <code>Switch</code> 开关：打开开关 → 关闭 → 重新打开，对比开关状态是否保留。
    </p>
    <Flex wrap="wrap" :gap="16">
      <Card class="demo-variant">
        <template #title>
          <Button type="primary" @click="onOpenDraftModal">草稿弹窗（保留内容）</Button>
        </template>
        <p class="demo-variant-desc">实例保留，重复打开复用同一实例，内部状态持久化</p>
        <Statistic title="已打开" :value="draftOpenCount" suffix="次" :value-style="statisticValueStyle" />
      </Card>
      <Card class="demo-variant">
        <template #title>
          <Button type="primary" @click="onOpenOnceModal">一次性弹窗（关闭销毁）</Button>
        </template>
        <p class="demo-variant-desc">实例销毁，每次打开都创建全新实例，状态重置</p>
        <Statistic title="已打开" :value="onceOpenCount" suffix="次" :value-style="statisticValueStyle" />
      </Card>
    </Flex>
  </Card>

  <Card class="demo-group">
    <template #title>
      <Space :gap="8">
        <Badge :value="2" color="blue" />
        <span>renderBeforeOpen：预渲染</span>
      </Space>
    </template>
    <p class="demo-group-desc">
      弹窗内容的渲染时长实时同步到下方：懒渲染<b>首次打开前为「未渲染」</b>，预渲染<b>打开前已在计时</b>。
    </p>
    <Flex wrap="wrap" :gap="16">
      <Card class="demo-variant">
        <template #title>
          <Button type="primary" @click="lazyOpen = true">懒渲染（默认）</Button>
        </template>
        <template #extra>
          <Tag>false</Tag>
        </template>
        <p class="demo-variant-desc">首次打开时才渲染内容</p>
        <Statistic title="渲染状态" :value-style="lazyRender.style">{{ lazyRender.text }}</Statistic>
      </Card>
      <Card class="demo-variant">
        <template #title>
          <Button type="primary" @click="preRenderOpen = true">预渲染</Button>
        </template>
        <template #extra>
          <Tag color="success">true</Tag>
        </template>
        <p class="demo-variant-desc">随页面一起渲染，打开即可见已有计时</p>
        <Statistic title="渲染状态" :value-style="preRender.style">{{ preRender.text }}</Statistic>
      </Card>
    </Flex>
    <Modal v-model:open="lazyOpen" title="懒渲染（默认）">
      <ContentTimer @tick="onLazyRenderTick" />
    </Modal>
    <Modal v-model:open="preRenderOpen" title="预渲染（render-before-open）" render-before-open>
      <ContentTimer @tick="onPreRenderTick" />
    </Modal>
  </Card>

  <Card class="demo-group">
    <template #title>
      <Space :gap="8">
        <Badge :value="3" color="blue" />
        <span>afterClose：关闭后回调</span>
      </Space>
    </template>
    <p class="demo-group-desc">
      点击「知道了」或按 <code>Esc</code> 关闭均可触发，回调在<b>关闭动画播放结束后</b>才执行。
    </p>
    <Flex wrap="wrap" :gap="16">
      <Card class="demo-variant">
        <template #title>
          <Button type="primary" @click="onAfterCloseModal">打开弹窗</Button>
        </template>
        <p class="demo-variant-desc">适合做资源清理或路由跳转</p>
        <Space :gap="32" wrap>
          <Statistic title="触发次数" :value="afterCloseCount" :value-style="statisticValueStyle" />
          <Statistic title="最近触发" :value-style="statisticValueStyle">
            {{ lastAfterCloseTime ?? '—' }}
          </Statistic>
        </Space>
      </Card>
    </Flex>
  </Card>
</template>
<style lang="less" scoped>
.demo-group + .demo-group {
  margin-top: 16px;
}
.demo-group-desc {
  margin: 0 0 16px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.6;
}
.demo-variant {
  flex: 1 1 280px;
  min-width: 260px;
}
.demo-variant-desc {
  margin: 0 0 12px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.6;
}
</style>
```

:::

## 内容区高度与滚动

<Space>
  <Button type="primary" @click="onWholeScrollModal">整体弹框滚动</Button>
  <Button type="primary" @click="onInnerScrollModal">内容区内部滚动</Button>
  <Button type="primary" @click="onCustomScrollbarModal">自定义滚动条</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import type { VNode } from 'vue'
import { useModal } from 'vue-amazing-ui'
const modal = useModal()
// 生成演示用的超长内容：每次调用返回新的 VNode，避免复用同一 VNode 实例导致渲染异常
function createLongContent(): VNode {
  return h(
    'div',
    null,
    Array.from({ length: 30 }, (_, index) =>
      h('p', { style: 'margin: 0 0 8px' }, `第 ${index + 1} 行：这是一段用于演示超高内容滚动行为的示例文本。`)
    )
  )
}
// height 为 auto（默认）时内容由弹框自然撑开，超高后整个弹框随外层容器滚动
function onWholeScrollModal() {
  modal.info({
    title: '整体弹框滚动（height 默认 auto）',
    content: createLongContent,
    centered: true,
    width: 520
  })
}
// 指定 height 后内容区内部滚动，标题与按钮固定可见
function onInnerScrollModal() {
  modal.info({
    title: '内容区内部滚动（height + scrollbarProps）',
    content: createLongContent,
    height: 300,
    scrollbarProps: { trigger: 'none', contentStyle: { paddingRight: '12px' } },
    centered: true,
    width: 520
  })
}
// scrollbarProps 透传给内置 Scrollbar，可定制滚动条大小与位置
function onCustomScrollbarModal() {
  modal.info({
    title: '自定义滚动条',
    content: createLongContent,
    height: 300,
    scrollbarProps: { trigger: 'none', size: 10, yPlacement: 'left', contentStyle: { paddingLeft: '12px' } },
    centered: true,
    width: 520
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onWholeScrollModal">整体弹框滚动</Button>
    <Button type="primary" @click="onInnerScrollModal">内容区内部滚动</Button>
    <Button type="primary" @click="onCustomScrollbarModal">自定义滚动条</Button>
  </Space>
</template>
```

:::

## 自定义宽度

<Space>
  <Button type="primary" @click="onNumberWidthModal">数值宽度</Button>
  <Button type="primary" @click="onPercentWidthModal">百分比宽度</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useModal } from 'vue-amazing-ui'
const modal = useModal()
function onNumberWidthModal() {
  modal.info({
    title: '数值宽度',
    content: 'Some descriptions ...',
    width: 365
  })
}
function onPercentWidthModal() {
  modal.confirm({
    title: '百分比宽度',
    content: 'Some descriptions ...',
    width: '28%'
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onNumberWidthModal">数值宽度</Button>
    <Button type="primary" @click="onPercentWidthModal">百分比宽度</Button>
  </Space>
</template>
```

:::

## 自定义图标

_`icon` 支持 `VNode` 与返回 `VNode` 的渲染函数两种形态_

<br/>

<Space>
  <Button type="primary" @click="onVNodeIconModal">VNode 图标</Button>
  <Button type="primary" @click="onRenderFnIconModal">渲染函数图标</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { CloudFilled, SoundFilled } from '@ant-design/icons-vue'
import { useModal } from 'vue-amazing-ui'
const modal = useModal()
function onVNodeIconModal() {
  modal.info({
    title: '节点图标',
    content: 'Some descriptions ...',
    icon: h(CloudFilled)
  })
}
// icon 也支持渲染函数形态，每次渲染时动态生成图标
function onRenderFnIconModal() {
  modal.confirm({
    title: '渲染函数图标',
    content: 'Some descriptions ...',
    icon: () => h(SoundFilled, { style: 'color: gold' })
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onVNodeIconModal">VNode 图标</Button>
    <Button type="primary" @click="onRenderFnIconModal">渲染函数图标</Button>
  </Space>
</template>
```

:::

## 自定义样式

<Space>
  <Button type="primary" @click="onCustomClassModal">自定义内容样式类</Button>
  <Button type="primary" @click="onBodyMaskStyleModal">自定义内容与遮罩样式</Button>
  <Button type="primary" @click="onTitleContentStyleModal">自定义标题与内容样式</Button>
  <Button type="primary" @click="onContainerStyleModal">自定义容器样式</Button>
</Space>

<style lang="less">
.custom-modal-body {
  .modal-header {
    color: #ff6900 !important;
    .modal-title {
      color: #ff6900 !important;
    }
  }
  .modal-content {
    color: #ff6900 !important;
  }
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { CrownFilled, FireFilled, NotificationFilled } from '@ant-design/icons-vue'
import { useModal } from 'vue-amazing-ui'
const modal = useModal()
function onCustomClassModal() {
  modal.info({
    title: '自定义内容样式类',
    content: 'Some descriptions ...',
    icon: h(FireFilled),
    bodyClass: 'custom-modal-body'
  })
}
function onBodyMaskStyleModal() {
  modal.confirm({
    title: '自定义内容与遮罩样式',
    content: 'Some descriptions ...',
    icon: h(NotificationFilled),
    bodyStyle: {
      padding: '24px',
      borderRadius: '12px'
    },
    maskStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }
  })
}
function onTitleContentStyleModal() {
  modal.success({
    title: '自定义标题与内容样式',
    content: 'Some descriptions ...',
    icon: h(CrownFilled),
    titleStyle: {
      color: '#52c41a'
    },
    contentStyle: {
      color: '#52c41a'
    }
  })
}
// containerStyle 优先级高于 width / top / zIndex 等内置样式
function onContainerStyleModal() {
  modal.info({
    title: '自定义容器样式',
    content: 'width 传的是 420，但 containerStyle 中的 560px 优先级更高。',
    width: 420,
    containerStyle: { width: '560px' }
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onCustomClassModal">自定义内容样式类</Button>
    <Button type="primary" @click="onBodyMaskStyleModal">自定义内容与遮罩样式</Button>
    <Button type="primary" @click="onTitleContentStyleModal">自定义标题与内容样式</Button>
    <Button type="primary" @click="onContainerStyleModal">自定义容器样式</Button>
  </Space>
</template>
<style lang="less">
.custom-modal-body {
  .modal-header {
    color: #ff6900 !important;
    .modal-title {
      color: #ff6900 !important;
    }
  }
  .modal-content {
    color: #ff6900 !important;
  }
}
</style>
```

:::

## 自定义按钮

<Space>
  <Button type="primary" @click="onNoticeBtnModal">自定义按钮文案</Button>
  <Button type="primary" @click="onConfirmBtnsModal">自定义确认按钮</Button>
  <Button type="primary" @click="onHideCancelModal">隐藏取消按钮</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage, useModal } from 'vue-amazing-ui'
const modal = useModal()
const message = useMessage()
function onNoticeBtnModal() {
  modal.info({
    title: '自定义按钮文案',
    content: 'Some descriptions ...',
    noticeText: 'Noted',
    noticeProps: {
      shape: 'round'
    },
    onKnow: () => message.success('点击了 Noted')
  })
}
function onConfirmBtnsModal() {
  modal.confirm({
    title: '自定义确认按钮',
    content: 'Some descriptions ...',
    cancelText: 'No',
    cancelProps: { type: 'danger', ghost: true },
    okText: 'Yes',
    okType: 'danger',
    okProps: { ghost: true },
    onOk: () => message.success('点击了 Yes'),
    onCancel: () => message.error('点击了 No')
  })
}
// showCancel 仅在 confirm / erase 双按钮形态生效
function onHideCancelModal() {
  modal.confirm({
    title: '隐藏取消按钮',
    content: 'showCancel: false 时只保留确定按钮。',
    showCancel: false,
    okText: '知道了',
    onOk: () => message.success('点击了「知道了」')
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onNoticeBtnModal">自定义按钮文案</Button>
    <Button type="primary" @click="onConfirmBtnsModal">自定义确认按钮</Button>
    <Button type="primary" @click="onHideCancelModal">隐藏取消按钮</Button>
  </Space>
</template>
```

:::

## 自定义底部区域

<Space>
  <Button type="primary" @click="onFooterRenderModal">自定义底部渲染</Button>
  <Button type="primary" @click="onFooterlessModal">无底部按钮</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { Button, useMessage, useModal } from 'vue-amazing-ui'
import type { ModalReactive } from 'vue-amazing-ui'
const modal = useModal()
const message = useMessage()
// footer 传渲染函数时完全接管底部，内置按钮组不再渲染
function onFooterRenderModal() {
  const handle: ModalReactive = modal.info({
    title: '自定义底部渲染',
    content: 'footer 传渲染函数时，底部区域完全由该函数接管。',
    closable: true,
    footer: () =>
      h('div', { style: 'display: flex; justify-content: flex-end; gap: 8px' }, [
        h(Button, { onClick: () => handle.destroy() }, { default: () => '稍后处理' }),
        h(
          Button,
          {
            type: 'primary',
            onClick: () => {
              message.success('已立即处理')
              handle.destroy()
            }
          },
          { default: () => '立即处理' }
        )
      ])
  })
}
function onFooterlessModal() {
  modal.info({
    title: '无底部按钮',
    content: 'footer: false 时底部整块隐藏，配合 closable 用右上角关闭。',
    closable: true,
    footer: false
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onFooterRenderModal">自定义底部渲染</Button>
    <Button type="primary" @click="onFooterlessModal">无底部按钮</Button>
  </Space>
</template>
```

:::

## 完全自定义

_`create()` 不渲染内置图标与按钮组，图标、内容、底部均由 `icon` / `content` / `footer` 自行组合_

<br/>

<Button type="primary" @click="onCreateModal">自定义模态框</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { CrownFilled } from '@ant-design/icons-vue'
import { Button, useMessage, useModal } from 'vue-amazing-ui'
import type { ModalReactive } from 'vue-amazing-ui'
const modal = useModal()
const message = useMessage()
// create() 不渲染内置图标与按钮组，图标、底部均由 icon / footer 自行组合
function onCreateModal() {
  const handle: ModalReactive = modal.create({
    title: 'Custom Modal（create）',
    content: h('p', { style: 'margin: 0' }, '通过 create() 创建，图标、内容、底部按钮均完全自定义。'),
    width: 480,
    closable: true,
    icon: h(CrownFilled, { style: 'color: #faad14' }),
    footer: () =>
      h('div', { style: 'display: flex; justify-content: flex-end; gap: 8px' }, [
        h(Button, { onClick: () => handle.destroy() }, { default: () => '取消' }),
        h(
          Button,
          {
            type: 'primary',
            onClick: () => {
              message.success('自定义确定')
              handle.destroy()
            }
          },
          { default: () => '确定' }
        )
      ])
  })
}
</script>
<template>
  <Button type="primary" @click="onCreateModal">自定义模态框</Button>
</template>
```

:::

## 关闭按钮

_命令式弹窗默认不显示右上角关闭按钮，`closable: true` 时显示；`closeIcon` 支持 `VNode` 与渲染函数两种形态_

<br/>

<Space>
  <Button type="primary" @click="onClosableModal">显示关闭按钮</Button>
  <Button type="primary" @click="onCustomCloseIconModal">自定义关闭图标</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { CloseCircleFilled } from '@ant-design/icons-vue'
import { useMessage, useModal } from 'vue-amazing-ui'
const modal = useModal()
const message = useMessage()
// 命令式弹窗默认无关闭按钮，closable: true 显示右上角 X
function onClosableModal() {
  modal.confirm({
    title: '显示关闭按钮',
    content: '命令式弹窗默认不显示右上角关闭按钮，设置 closable: true 后显示。',
    closable: true,
    onOk: () => message.success('点击了「确定」')
  })
}
// closeIcon 支持 VNode 与渲染函数
function onCustomCloseIconModal() {
  modal.confirm({
    title: '自定义关闭图标',
    content: 'closeIcon 支持 VNode 与渲染函数两种形态。',
    closable: true,
    closeIcon: () => h(CloseCircleFilled, { style: 'color: #ff4d4f' }),
    onOk: () => message.success('点击了「确定」')
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onClosableModal">显示关闭按钮</Button>
    <Button type="primary" @click="onCustomCloseIconModal">自定义关闭图标</Button>
  </Space>
</template>
```

:::

## 自定义位置

<Space>
  <Button type="primary" @click="onNumberTopModal">数值顶距</Button>
  <Button type="primary" @click="onPercentTopModal">百分比顶距</Button>
  <Button type="primary" @click="onCenteredModal">垂直居中</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useModal } from 'vue-amazing-ui'
const modal = useModal()
function onNumberTopModal() {
  modal.info({
    title: '60px This is a number fixed modal',
    content: 'Some descriptions ...',
    centered: false,
    top: 60
  })
}
function onPercentTopModal() {
  modal.info({
    title: '20% This is a percent fixed modal',
    content: 'Some descriptions ...',
    centered: false,
    top: '20%'
  })
}
function onCenteredModal() {
  modal.info({
    title: 'This is a vertically centered modal',
    content: 'Some descriptions ...',
    centered: true
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onNumberTopModal">数值顶距</Button>
    <Button type="primary" @click="onPercentTopModal">百分比顶距</Button>
    <Button type="primary" @click="onCenteredModal">垂直居中</Button>
  </Space>
</template>
```

:::

## 动画出现位置

<Space>
  <Button type="primary" @click="onMouseOriginModal">从鼠标位置展开（默认）</Button>
  <Button type="primary" @click="onCenterOriginModal">从中心展开</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useModal } from 'vue-amazing-ui'
const modal = useModal()
function onMouseOriginModal() {
  modal.info({
    title: '从鼠标位置展开（默认）',
    content: 'transformOrigin: mouse 时，弹窗从鼠标点击位置放大。',
    transformOrigin: 'mouse'
  })
}
function onCenterOriginModal() {
  modal.info({
    title: '从中心展开',
    content: 'transformOrigin: center 时，弹窗从自身中心放大。',
    transformOrigin: 'center'
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onMouseOriginModal">从鼠标位置展开（默认）</Button>
    <Button type="primary" @click="onCenterOriginModal">从中心展开</Button>
  </Space>
</template>
```

:::

## 异步关闭与阻止关闭

_`onOk` / `onKnow` / `onCancel` 返回 `false` 或 `Promise` `reject` 时阻止关闭，其余情况（含 `Promise` `resolve`）自动关闭；返回 `Promise` 期间按钮保持 `loading`_

<br/>

<Space>
  <Button type="primary" @click="onAsyncOkModal">异步关闭（自动）</Button>
  <Button type="primary" @click="onRejectOkModal">阻止关闭（失败）</Button>
  <Button type="primary" @click="onPreventOkModal">阻止关闭（同步）</Button>
  <Button type="primary" @click="onPreventCancelModal">阻止取消</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
import { useMessage, useModal } from 'vue-amazing-ui'
const modal = useModal()
const message = useMessage()
// onOk 返回 Promise：resolve 后自动关闭，期间按钮保持 loading
function onAsyncOkModal() {
  modal.confirm({
    title: '确认提交这些项？',
    content: '点击确定后等待 1.5s，Promise resolve 后自动关闭。',
    icon: h(ExclamationCircleFilled),
    onOk: () =>
      new Promise<boolean>((resolve) => {
        setTimeout(() => {
          message.success('提交成功')
          resolve(true)
        }, 1500)
      }),
    onCancel: () => message.error('已取消提交')
  })
}
// onOk 返回的 Promise reject 时阻止关闭（在 catch 中返回 false，避免异常冒泡到控制台）
function onRejectOkModal() {
  modal.confirm({
    title: '确认删除这些项？',
    content: '点击确定后服务端校验失败，Promise reject 并阻止关闭。',
    icon: h(ExclamationCircleFilled),
    onOk: () =>
      new Promise((_resolve, reject) => {
        setTimeout(() => reject(new Error('服务端校验失败')), 1200)
      }).catch(() => {
        message.error('校验失败，弹窗保持打开')
        return false
      })
  })
}
// onOk 同步返回 false 同样阻止关闭
function onPreventOkModal() {
  let submitted = false
  modal.confirm({
    title: '同步阻止关闭',
    content: '首次点击「确定」返回 false 阻止关闭，再次点击则正常关闭。',
    onOk: () => {
      if (!submitted) {
        submitted = true
        message.warning('还有必填项未完成，已阻止关闭')
        return false
      }
      message.success('校验通过，弹窗关闭')
    }
  })
}
// onCancel 返回 false 时，遮罩 / Esc / 取消按钮都无法关闭
function onPreventCancelModal() {
  modal.confirm({
    title: '取消时阻止关闭',
    content: '点击遮罩、按下 Esc 或点击「取消」都会被阻止，只有「确定」可关闭。',
    maskClosable: true,
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => {
      message.warning('操作未完成，已阻止关闭')
      return false
    }
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onAsyncOkModal">异步关闭（自动）</Button>
    <Button type="primary" @click="onRejectOkModal">阻止关闭（失败）</Button>
    <Button type="primary" @click="onPreventOkModal">阻止关闭（同步）</Button>
    <Button type="primary" @click="onPreventCancelModal">阻止取消</Button>
  </Space>
</template>
```

:::

## 原地更新

_`update` 可更新 `ModalOptions` 的全部属性，另支持 `mode`（切换弹窗类型与内置按钮组）与 `loading`（手动驱动按钮 `loading`）_

<br/>

<Button type="primary" @click="onProgressUpload">异步上传</Button>

::: details Show Code

```vue
<script setup lang="ts">
import { h, onBeforeUnmount, ref } from 'vue'
import { useMessage, useModal } from 'vue-amazing-ui'
import type { ModalUpdate } from 'vue-amazing-ui'
const modal = useModal()
const message = useMessage()
// 页面级定时器统一登记，卸载时清理，避免组件销毁后仍在跑
const timers: number[] = []
function onProgressUpload() {
  const percent = ref(0)
  const handle = modal.info({
    title: '正在上传附件',
    // content 传渲染函数：内部引用响应式 percent，进度变化时弹窗内容自动更新
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
            font-weight: 600;
            color: #1677ff;
          `
          },
          `${percent.value}%`
        )
      ]),
    noticeText: '上传中…',
    // 上传未完成时阻止关闭
    onKnow: () => {
      message.warning('上传完成前不可关闭')
      return false
    }
  })
  // update 支持 loading：手动驱动按钮 loading
  handle.update({ loading: true })
  const timer = window.setInterval(() => {
    percent.value += 4
    if (percent.value < 100) {
      return
    }
    clearInterval(timer)
    // update 支持 mode：原地把 info 切换为 success，并重设文案与回调
    const doneOptions: ModalUpdate = {
      title: '上传完成',
      content: '附件已上传，mode 已切换为 success。',
      mode: 'success',
      noticeText: '知道了',
      loading: false,
      onKnow: () => message.success('已确认上传结果')
    }
    handle.update(doneOptions)
  }, 120)
  timers.push(timer)
}
onBeforeUnmount(() => {
  timers.forEach((timer) => {
    clearInterval(timer)
  })
})
</script>
<template>
  <Button type="primary" @click="onProgressUpload">异步上传</Button>
</template>
```

:::

## 多实例层叠

_连续调用依次入栈，各实例按自身 `zIndex` 分层（遮罩取 `zIndex`，弹窗取 `zIndex + 10`）；点击遮罩只关闭栈顶，`destroyAll()` 关闭并销毁全部_

<br/>

<Space>
  <Button type="primary" @click="onStackModal">开启 3 层弹窗</Button>
  <Button type="danger" @click="onDestroyAllModals">开启 3 层并 2 秒后全部销毁</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage, useModal } from 'vue-amazing-ui'
const modal = useModal()
const message = useMessage()
const timers: number[] = []
// 遮罩会挡住页面，弹窗打开后无法再点击页面按钮，故一次点击开启多层以便观察层叠与逐层关闭
function openStackLayers(content: string): void {
  for (let layer = 1; layer <= 3; layer += 1) {
    modal.info({
      title: `第 ${layer} 层弹窗`,
      content,
      zIndex: 1000 + layer * 20,
      maskClosable: true
    })
  }
}
function onStackModal() {
  openStackLayers('点击遮罩或「知道了」只关闭栈顶弹窗；各实例按自身 zIndex 分层（遮罩取 zIndex，弹窗取 zIndex + 10）。')
}
// destroyAll 同样无法在弹窗打开后从页面触发，故开启多层后用定时器演示一次性全部销毁
function onDestroyAllModals() {
  openStackLayers('2s 后 destroyAll() 会一次性关闭并销毁全部弹窗。')
  timers.push(
    window.setTimeout(() => {
      modal.destroyAll()
      message.success('destroyAll：已关闭全部弹窗')
    }, 2000)
  )
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onStackModal">开启 3 层弹窗</Button>
    <Button type="danger" @click="onDestroyAllModals">开启 3 层并 2 秒后全部销毁</Button>
  </Space>
</template>
```

:::

## 遮罩、键盘与滚动锁定

_命令式调用默认 `maskClosable: false`、`keyboard: true`、`blockScroll: true`；`onMaskClick` / `onEsc` 无论是否允许关闭都会触发_

<br/>

<Space>
  <Button type="primary" @click="onNoMaskModal">无遮罩</Button>
  <Button type="primary" @click="onMaskClosableModal">点击遮罩关闭</Button>
  <Button type="primary" @click="onNoKeyboardModal">禁用 Esc 关闭</Button>
  <Button type="primary" @click="onMaskEscCallbackModal">遮罩与 Esc 回调</Button>
  <Button type="primary" @click="onBlockScrollModal">锁定背景滚动</Button>
  <Button type="primary" @click="onNoBlockScrollModal">不锁定滚动</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage, useModal } from 'vue-amazing-ui'
const modal = useModal()
const message = useMessage()
function onNoMaskModal() {
  modal.info({
    title: '无遮罩',
    content: '不渲染遮罩层，背景仍可交互，只能通过底部按钮关闭。',
    mask: false,
    maskClosable: false
  })
}
// 命令式调用默认 maskClosable: false，需显式开启
function onMaskClosableModal() {
  modal.confirm({
    title: '点击遮罩关闭',
    content: '命令式调用默认 maskClosable: false，此处显式传 true。',
    maskClosable: true,
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => message.error('点击了遮罩 / Esc / 取消')
  })
}
// keyboard: false 禁用 Esc 关闭，但 onEsc 回调仍会触发
function onNoKeyboardModal() {
  modal.info({
    title: '禁用 Esc 关闭',
    content: '按下 Esc 不会关闭弹窗，但 onEsc 回调仍会触发。',
    keyboard: false,
    onEsc: () => message.info('onEsc 回调触发，但已禁用 Esc 关闭')
  })
}
// onMaskClick / onEsc 无论是否允许关闭都会触发
function onMaskEscCallbackModal() {
  modal.info({
    title: '遮罩与 Esc 回调',
    content: '遮罩点击与 Esc 均被禁用关闭，但两个回调仍会触发。',
    maskClosable: false,
    keyboard: false,
    onMaskClick: () => message.info('onMaskClick 回调触发'),
    onEsc: () => message.info('onEsc 回调触发')
  })
}
function onBlockScrollModal() {
  modal.info({
    title: 'blockScroll: true（默认）',
    content: '打开时锁定背景滚动，此时滚动页面无效，全部关闭后自动解锁。'
  })
}
function onNoBlockScrollModal() {
  modal.info({
    title: 'blockScroll: false',
    content: '不锁定背景滚动，可用滚轮滚动页面，与上一例对比即可看出差异。',
    blockScroll: false
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onNoMaskModal">无遮罩</Button>
    <Button type="primary" @click="onMaskClosableModal">点击遮罩关闭</Button>
    <Button type="primary" @click="onNoKeyboardModal">禁用 Esc 关闭</Button>
    <Button type="primary" @click="onMaskEscCallbackModal">遮罩与 Esc 回调</Button>
    <Button type="primary" @click="onBlockScrollModal">锁定背景滚动</Button>
    <Button type="primary" @click="onNoBlockScrollModal">不锁定滚动</Button>
  </Space>
</template>
```

:::

## 焦点管理

_`autoFocusButton` 控制入场后自动聚焦的按钮，`trapFocus` 将 `Tab` 焦点锁定在弹窗内循环，`focusTriggerAfterClose` 控制关闭后是否把焦点归还触发元素_

<br/>

<Space>
  <Button type="primary" @click="onAutoFocusOkModal">聚焦确定按钮</Button>
  <Button type="primary" @click="onAutoFocusCancelModal">聚焦取消按钮</Button>
  <Button type="primary" @click="onAutoFocusNullModal">不自动聚焦</Button>
  <Button type="primary" @click="onNoTrapFocusModal">取消焦点陷阱</Button>
  <Button type="primary" @click="onNoFocusRestoreModal">关闭不归还焦点</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { useMessage, useModal } from 'vue-amazing-ui'
const modal = useModal()
const message = useMessage()
function onAutoFocusOkModal() {
  modal.confirm({
    title: '聚焦确定按钮（默认）',
    content: '入场动画结束后，焦点自动落在「确定」按钮上。',
    autoFocusButton: 'ok',
    onOk: () => message.success('点击了「确定」')
  })
}
function onAutoFocusCancelModal() {
  modal.confirm({
    title: '聚焦取消按钮',
    content: '入场动画结束后，焦点自动落在「取消」按钮上。',
    autoFocusButton: 'cancel',
    onCancel: () => message.error('点击了「取消」')
  })
}
function onAutoFocusNullModal() {
  modal.confirm({
    title: '不自动聚焦',
    content: '不自动聚焦按钮，焦点落在弹窗容器上，Esc 依旧可用。',
    autoFocusButton: null,
    onOk: () => message.success('点击了「确定」')
  })
}
function onNoTrapFocusModal() {
  modal.confirm({
    title: '取消焦点陷阱',
    content: '关闭焦点锁定后，Tab / Shift + Tab 可以移到背景页面。',
    trapFocus: false,
    onOk: () => message.success('点击了「确定」')
  })
}
function onNoFocusRestoreModal() {
  modal.confirm({
    title: '关闭不归还焦点',
    content: '关闭后焦点不归还给触发按钮；默认 true 时会归还。',
    focusTriggerAfterClose: false,
    onOk: () => message.success('点击了「确定」')
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onAutoFocusOkModal">聚焦确定按钮</Button>
    <Button type="primary" @click="onAutoFocusCancelModal">聚焦取消按钮</Button>
    <Button type="primary" @click="onAutoFocusNullModal">不自动聚焦</Button>
    <Button type="primary" @click="onNoTrapFocusModal">取消焦点陷阱</Button>
    <Button type="primary" @click="onNoFocusRestoreModal">关闭不归还焦点</Button>
  </Space>
</template>
```

:::

## 自定义渲染

_`modalRender` 可拿到默认内容节点 `originVNode`，包一层自定义容器即可叠加拖拽等增强能力；声明式用法下也可使用同名的 `#modalRender` 作用域插槽，属性优先级更高_

<br/>

<Space>
  <Button type="primary" @click="onDraggableModal">可拖拽模态框（命令式）</Button>
  <Button type="primary" @click="dragModalOpen = true">可拖拽模态框（声明式）</Button>
</Space>

<Modal v-model:open="dragModalOpen" title="按住标题栏拖动我（声明式）" :width="460" centered>
  <template #modalRender="{ originVNode }">
    <div class="draggable-modal" v-drag-modal>
      <VNodeRenderer :vnode="originVNode" />
    </div>
  </template>
  <p>
    声明式用法下同样通过 <code>#modalRender</code> 作用域插槽拿到 <code>originVNode</code>，
    外包一层 <code>.draggable-modal</code> 容器并挂上 <code>v-drag-modal</code> 指令即可。
  </p>
</Modal>

<style lang="less">
.draggable-modal {
  .modal-header {
    cursor: move;
    user-select: none;
  }
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { defineComponent, h, ref, withDirectives } from 'vue'
import type { Directive, PropType, VNode } from 'vue'
import { Modal, useModal } from 'vue-amazing-ui'
const modal = useModal()
// 指令卸载时移除监听，避免实例销毁后残留
const dragCleanups = new WeakMap<HTMLElement, () => void>()
// 把弹窗内容包进一层可拖拽容器：按住标题栏即可拖动，常用于拖拽场景
const vDragModal: Directive<HTMLElement> = {
  mounted(el) {
    let offsetX = 0
    let offsetY = 0
    function onMousedown(e: MouseEvent) {
      // 仅按住标题栏才触发拖拽，避免影响文本选择与按钮点击
      if (!(e.target as HTMLElement).closest('.modal-header')) {
        return
      }
      e.preventDefault()
      const startX = e.clientX - offsetX
      const startY = e.clientY - offsetY
      function onMousemove(event: MouseEvent) {
        offsetX = event.clientX - startX
        offsetY = event.clientY - startY
        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`
      }
      function onMouseup() {
        document.removeEventListener('mousemove', onMousemove)
        document.removeEventListener('mouseup', onMouseup)
        document.body.style.userSelect = ''
      }
      document.addEventListener('mousemove', onMousemove)
      document.addEventListener('mouseup', onMouseup)
      document.body.style.userSelect = 'none'
    }
    el.addEventListener('mousedown', onMousedown)
    dragCleanups.set(el, () => {
      el.removeEventListener('mousedown', onMousedown)
      document.body.style.userSelect = ''
    })
  },
  unmounted(el) {
    dragCleanups.get(el)?.()
    dragCleanups.delete(el)
  }
}
function onDraggableModal() {
  modal.info({
    title: '按住标题栏拖动我',
    content: 'modalRender 可拿到默认内容节点 originVNode，包一层自定义容器即可实现拖拽。',
    width: 460,
    centered: true,
    modalRender: ({ originVNode }) =>
      withDirectives(h('div', { class: 'draggable-modal' }, [originVNode]), [[vDragModal]])
  })
}
// 声明式：与命令式等价，改用 #modalRender 作用域插槽拿到 originVNode
const dragModalOpen = ref(false)
// 模板无法直接摆放已构造的 VNode，用透传组件承接 originVNode 后原样渲染
const VNodeRenderer = defineComponent({
  props: {
    vnode: {
      type: Object as PropType<VNode>,
      required: true
    }
  },
  setup(props) {
    return () => props.vnode
  }
})
</script>
<template>
  <Button type="primary" @click="onDraggableModal">可拖拽模态框（命令式）</Button>
  <Button type="primary" @click="dragModalOpen = true">可拖拽模态框（声明式）</Button>
  <Modal v-model:open="dragModalOpen" title="按住标题栏拖动我（声明式）" :width="460" centered>
    <template #modalRender="{ originVNode }">
      <div class="draggable-modal" v-drag-modal>
        <VNodeRenderer :vnode="originVNode" />
      </div>
    </template>
    <p>
      声明式用法下同样通过 <code>#modalRender</code> 作用域插槽拿到 <code>originVNode</code>，
      外包一层 <code>.draggable-modal</code> 容器并挂上 <code>v-drag-modal</code> 指令即可。
    </p>
  </Modal>
</template>
<style lang="less">
.draggable-modal {
  .modal-header {
    cursor: move;
    user-select: none;
  }
}
</style>
```

:::

## 自定义挂载容器

::: tip 提示
`Teleport` 的目标必须已存在于文档中。<br/>
当目标与组件位于同一组件树内时，组件挂载瞬间目标尚未插入文档，需用 `v-if` 将组件延迟到挂载完成后再渲染。
:::

<ModalProvider v-if="toReady" to="#modal-to-container" @ready="toModal = $event" />

<div id="modal-to-container" class="modal-to-container"></div>

<Button type="primary" @click="onToModal">挂载到指定容器</Button>

<style lang="less" scoped>
.modal-to-container {
  position: relative;
  transform: translateZ(0); // 建立包含块，使内部 fixed 定位的蒙层与弹窗相对该容器定位
  max-width: 800px;
  height: 320px;
  margin-bottom: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ModalProvider } from 'vue-amazing-ui'
import type { ModalApi } from 'vue-amazing-ui'
// to 为 Provider 级配置，无法逐条传入，故在页面局部嵌套 Provider 演示；@ready 可取到该 Provider 作用域内的 api
const toModal = ref<ModalApi>()
const toReady = ref(false)
// 目标容器与组件位于同一组件树，需等挂载完成（目标已插入文档）后再渲染组件，Teleport 才能定位到目标
onMounted(() => {
  toReady.value = true
})
function onToModal() {
  toModal.value?.info({
    title: '自定义挂载容器',
    content: '这个弹窗被挂载到下方虚线容器中'
  })
}
</script>
<template>
  <ModalProvider v-if="toReady" to="#modal-to-container" @ready="toModal = $event" />
  <div id="modal-to-container" class="modal-to-container"></div>
  <Button type="primary" @click="onToModal">挂载到指定容器</Button>
</template>
<style lang="less" scoped>
.modal-to-container {
  position: relative;
  transform: translateZ(0); // 建立包含块，使内部 fixed 定位的蒙层与弹窗相对该容器定位
  max-width: 800px;
  height: 320px;
  margin-bottom: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
}
</style>
```

:::

## APIs

### Modal

<br/>

_组件级配置属性：使用 `useModal()` 时设置在 `<ModalProvider>` 上（会透传给内部 `Modal`），直接使用 `<Modal>` 组件时设置在 `<Modal>` 上，两者等价。_

<br/>

_每次调用的个性化配置请参考 [ModalOptions Type](#modaloptions-type)_

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| width | 模态框宽度，单位 `px` | string &#124; number | 420 |
| height | 内容区高度，单位 `px`，默认自适应内容高度；指定后内容区内部滚动 | string &#124; number | 'auto' |
| icon | 自定义图标 | VNode &#124; Slot | undefined |
| title | 模态框标题 | string &#124; VNode &#124; 渲染函数 | undefined |
| titleClass | 自定义标题类名 | string | undefined |
| titleStyle | 自定义标题样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| content | 模态框内容 | string &#124; VNode &#124; 渲染函数 | undefined |
| contentClass | 自定义内容类名 | string | undefined |
| contentStyle | 自定义内容样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| scrollbarProps | 内容滚动条 `Scrollbar` 属性配置 | [ScrollbarProps](./scrollbar.md#scrollbar) | {} |
| bodyClass | 自定义 `body` 类名 | string | undefined |
| bodyStyle | 自定义 `body` 样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| cancelText | 取消按钮文字 | string | '取消' |
| cancelProps | 取消按钮 `props` 配置，参考 [Button Props](./button.md#button) | [ButtonProps](./button.md#button) | {} |
| okText | 确认按钮文字 | string | '确定' |
| okType | 确认按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | 'primary' |
| okProps | 确认按钮 `props` 配置，优先级高于 `okType`，参考 [Button Props](./button.md#button) | [ButtonProps](./button.md#button) | {} |
| noticeText | 通知按钮文字 | string | '知道了' |
| noticeProps | 通知按钮 `props` 配置，参考 [Button Props](./button.md#button) | [ButtonProps](./button.md#button) | {} |
| footer | 是否显示底部按钮区，`false` 隐藏，`slot` 自定义 | boolean &#124; slot | true |
| closable | 是否显示右上角关闭按钮，默认 `false`，需要时显式开启 | boolean | false |
| closeIcon | 自定义关闭图标 | VNode &#124; Slot | undefined |
| destroyOnClose | 关闭时是否销毁 `Modal` 里的子元素，实例栈下关闭即从栈中移除，内容随之销毁 | boolean | false |
| renderBeforeOpen | 首次打开前是否渲染内容（关闭懒渲染） | boolean | false |
| centered | 是否水平垂直居中，否则固定高度水平居中 | boolean | false |
| top | 固定高度水平居中时，距顶部高度，仅当 `centered: false` 时生效，单位 `px` | string &#124; number | 100 |
| transformOrigin | 模态框动画出现的位置 | 'mouse' &#124; 'center' | 'mouse' |
| confirmLoading | 确定按钮 `loading` | boolean | false |
| blockScroll | 是否在打开模态框时禁用背景滚动 | boolean | true |
| keyboard | 是否支持键盘 `esc` 关闭 | boolean | true |
| mask | 是否展示遮罩 | boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |
| maskClass | 自定义蒙层类名 | string | undefined |
| maskStyle | 自定义蒙层样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| wrapClass | 自定义外层容器（`.modal-wrap`）类名，多实例同时打开时以栈顶为准 | string | undefined |
| wrapStyle | 自定义外层容器（`.modal-wrap`）样式，多实例同时打开时以栈顶为准 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| containerClass | 自定义弹窗容器（`.modal-container`）类名 | string | undefined |
| containerStyle | 自定义弹窗容器（`.modal-container`）样式，优先级高于 `width` / `top` / `zIndex` 等内置样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| zIndex | 模态框层级，遮罩取该值，弹窗取该值 `+ 10` | number | 1000 |
| autoFocusButton | 打开时自动聚焦的按钮，`null` 表示不聚焦 | null &#124; 'ok' &#124; 'cancel' | 'ok' |
| focusTriggerAfterClose | 关闭后是否将焦点归还给触发元素 | boolean | true |
| trapFocus | 是否将键盘焦点锁定在弹窗内，开启后 `Tab` / `Shift + Tab` 在弹窗内循环 | boolean | true |
| modalRender | 自定义渲染弹窗内容，常用于包裹拖拽逻辑；与 [`#modalRender`](#slots) 插槽等价，该属性优先级更高 | (arg: { originVNode: VNode }) => VNode | undefined |
| afterClose | 完全关闭（离场动画结束）后的回调 | () => void | undefined |
| onEsc | 按下 `Esc` 键的回调，无论是否允许关闭都会触发 | (e: KeyboardEvent) => void | undefined |
| onMaskClick | 点击遮罩的回调，无论是否允许关闭都会触发 | (e: MouseEvent) => void | undefined |
| to | 容器 `Teleport` 的目标 | string &#124; HTMLElement | 'body' |
| open | (v-model) 模态框是否可见，声明式用法下生效 | boolean | false |

> 多实例同时打开时，各实例按自身 `zIndex` 分层（遮罩取 `zIndex`，弹窗取 `zIndex + 10`）；外层容器的层级取栈中打开实例的最大 `zIndex`，`wrapClass` / `wrapStyle` 以栈顶为准。

### ModalOptions Type

<br/>

_调用时传入的 `ModalOptions` 类型（`info` / `success` / `error` / `warning` / `confirm` / `erase` / `create` 的参数），以下属性均具有更高优先级（覆盖组件级配置）_

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| width? | 模态框宽度，单位 `px` | string &#124; number | undefined |
| height? | 内容区高度，单位 `px`，指定后内容区内部滚动 | string &#124; number | undefined |
| icon? | 自定义图标 | VNode &#124; 渲染函数 | undefined |
| title? | 模态框标题 | string &#124; VNode &#124; 渲染函数 | undefined |
| titleClass? | 自定义标题类名 | string | undefined |
| titleStyle? | 自定义标题样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| content? | 模态框内容 | string &#124; VNode &#124; 渲染函数 | undefined |
| contentClass? | 自定义内容类名 | string | undefined |
| contentStyle? | 自定义内容样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| scrollbarProps? | 内容滚动条 `Scrollbar` 属性配置 | [ScrollbarProps](./scrollbar.md#scrollbar) | undefined |
| bodyClass? | 自定义 `body` 类名 | string | undefined |
| bodyStyle? | 自定义 `body` 样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| showCancel? | 是否显示取消按钮，仅 `confirm` &#124; `erase` 双按钮形态生效，默认 `true`；`info` 等单按钮形态与 `create` 完全自定义形态不生效 | boolean | undefined |
| cancelText? | 取消按钮文字 | string | undefined |
| cancelProps? | 取消按钮 `props` 配置，参考 [Button Props](./button.md#button) | [ButtonProps](./button.md#button) | undefined |
| okText? | 确认按钮文字 | string | undefined |
| okType? | 确认按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | undefined |
| okProps? | 确认按钮 `props` 配置，优先级高于 `okType`，参考 [Button Props](./button.md#button) | [ButtonProps](./button.md#button) | undefined |
| noticeText? | 通知按钮文字 | string | undefined |
| noticeProps? | 通知按钮 `props` 配置，参考 [Button Props](./button.md#button) | [ButtonProps](./button.md#button) | undefined |
| footer? | 底部区域，`false` 隐藏，函数则完全自定义；无内置按钮组时（`create` 调用）即便为 `true` 也不渲染空白区域 | boolean &#124; 渲染函数 | undefined |
| closable? | 是否显示右上角关闭按钮，默认 `false`，需要时显式开启 | boolean | undefined |
| closeIcon? | 自定义关闭图标 | VNode &#124; 渲染函数 | undefined |
| renderBeforeOpen? | 首次打开前是否渲染内容（关闭懒渲染） | boolean | undefined |
| destroyOnClose? | 关闭时是否销毁 `Modal` 里的子元素，命令式默认 `true` | boolean | undefined |
| centered? | 是否水平垂直居中，否则固定高度水平居中 | boolean | undefined |
| top? | 固定高度水平居中时，距顶部高度，仅当 `centered: false` 时生效，单位 `px` | string &#124; number | undefined |
| transformOrigin? | 模态框动画出现的位置 | 'mouse' &#124; 'center' | undefined |
| blockScroll? | 是否在打开模态框时禁用背景滚动 | boolean | undefined |
| keyboard? | 是否支持键盘 `esc` 关闭 | boolean | undefined |
| mask? | 是否展示遮罩 | boolean | undefined |
| maskClosable? | 点击蒙层是否允许关闭，命令式调用默认 `false`（避免误触关闭），需要时显式传 `true` | boolean | undefined |
| maskClass? | 自定义蒙层类名 | string | undefined |
| maskStyle? | 自定义蒙层样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| wrapClass? | 自定义外层容器（`.modal-wrap`）类名，多实例同时打开时以栈顶为准 | string | undefined |
| wrapStyle? | 自定义外层容器（`.modal-wrap`）样式，多实例同时打开时以栈顶为准 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| containerClass? | 自定义弹窗容器（`.modal-container`）类名 | string | undefined |
| containerStyle? | 自定义弹窗容器（`.modal-container`）样式，优先级高于 `width` / `top` / `zIndex` 等内置样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| zIndex? | 模态框层级，遮罩取该值，弹窗取该值 `+ 10` | number | undefined |
| autoFocusButton? | 打开时自动聚焦的按钮，`null` 表示不聚焦 | null &#124; 'ok' &#124; 'cancel' | undefined |
| focusTriggerAfterClose? | 关闭后是否将焦点归还给触发元素 | boolean | undefined |
| trapFocus? | 是否将键盘焦点锁定在弹窗内，开启后 `Tab` / `Shift + Tab` 在弹窗内循环 | boolean | undefined |
| modalRender? | 自定义渲染弹窗内容，常用于包裹拖拽逻辑 | (arg: { originVNode: VNode }) => VNode | undefined |
| afterClose? | 完全关闭（离场动画结束）后的回调 | () => void | undefined |
| onKnow? | 点击知道了按钮的回调，返回 `false` 或 `Promise` reject 时阻止关闭 | () => unknown &#124; Promise\<unknown\> | undefined |
| onOk? | 点击确认按钮的回调，返回 `false` 或 `Promise` reject 时阻止关闭 | () => unknown &#124; Promise\<unknown\> | undefined |
| onCancel? | 点击遮罩层、`Esc` 键或取消按钮的回调，返回 `false` 或 `Promise` reject 时阻止关闭 | () => unknown &#124; Promise\<unknown\> | undefined |
| onEsc? | 按下 `Esc` 键的回调，无论是否允许关闭都会触发 | (e: KeyboardEvent) => void | undefined |
| onMaskClick? | 点击遮罩的回调，无论是否允许关闭都会触发 | (e: MouseEvent) => void | undefined |

### ModalUpdate Type

<br/>

_`update` 可更新的字段为 `ModalOptions` 的全部属性，另支持 `mode` 用于切换弹窗类型，进而决定内置图标与按钮组。_

> 注意：若该弹窗设置了自定义 `icon`，图标不随 `mode` 切换。

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| mode? | 弹窗类型，决定内置图标与按钮组（仅 `update` 可传此字段） | 'info' &#124; 'success' &#124; 'error' &#124; 'warning' &#124; 'confirm' &#124; 'erase' &#124; 'custom' |
| loading? | 手动控制按钮 `loading`，供外部异步流程驱动 | boolean |

## Slots

| 名称       | 说明             | 类型              |
| :--------- | :--------------- | :---------------- |
| icon       | 自定义图标       | v-slot:icon       |
| title      | 自定义模态框标题 | v-slot:title      |
| default    | 自定义模态框内容 | v-slot:default    |
| footer     | 自定义底部按钮区 | v-slot:footer     |
| closeIcon  | 自定义关闭图标   | v-slot:closeIcon  |
| modalRender | 自定义渲染弹窗内容 | v-slot:modalRender |

> `modalRender` 为作用域插槽，可接收 `{ originVNode }` 对弹窗内容做包裹式自定义渲染（常用于拖拽等场景），仅声明式用法下生效；命令式用法请使用同名的 `modalRender` 属性。当属性与该插槽同时配置时，**属性优先级更高**。

## Methods

_`useModal()` 返回的 `ModalApi`，或通过 `<Modal>` / `<ModalProvider>` 的 `@ready` 事件获取：_

| 名称       | 说明           | 类型                                                                              |
| :--------- | :------------- | :-------------------------------------------------------------------------------- |
| info       | 信息提示模态框 | (data: [ModalOptions](#modaloptions-type)) => [ModalReactive](#modalreactive-type) |
| success    | 成功提示模态框 | (data: [ModalOptions](#modaloptions-type)) => [ModalReactive](#modalreactive-type) |
| error      | 错误提示模态框 | (data: [ModalOptions](#modaloptions-type)) => [ModalReactive](#modalreactive-type) |
| warning    | 警告提示模态框 | (data: [ModalOptions](#modaloptions-type)) => [ModalReactive](#modalreactive-type) |
| confirm    | 确认提示模态框 | (data: [ModalOptions](#modaloptions-type)) => [ModalReactive](#modalreactive-type) |
| erase      | 删除提示模态框 | (data: [ModalOptions](#modaloptions-type)) => [ModalReactive](#modalreactive-type) |
| create     | 完全自定义模态框（不渲染内置图标与按钮组，顶部图标与底部区域由 `icon` / `footer` 自行组合） | (data: [ModalOptions](#modaloptions-type)) => [ModalReactive](#modalreactive-type) |
| destroyAll | 关闭并销毁所有模态框，逐实例走正常关闭流程以保留离场动画 | () => void                                                                        |

### ModalReactive Type

<br/>

_单个模态框的句柄，由 `info` / `success` 等方法调用后返回：_

| 名称    | 说明                                            | 类型                                                     |
| :------ | :---------------------------------------------- | :------------------------------------------------------- |
| key     | 该模态框的唯一标识（只读）                      | string                                                   |
| destroy | 关闭该模态框                                    | () => void                                               |
| update  | 更新该模态框，`mode` 可切换弹窗类型与内置图标    | (options: [ModalUpdate](#modalupdate-type)) => void       |
| show    | 重新打开该模态框，实例已销毁时调用无效          | () => void                                               |

## Events

_`cancel` / `ok` / `know` / `change` / `ready` 为 `<Modal>` 与 `<ModalProvider>` 组件的事件（需通过组件标签监听）；使用 `useModal()` 时，请在调用参数中使用 `onOk` / `onCancel` / `onKnow` 等回调。_

| 名称   | 说明                                | 类型                            |
| :----- | :---------------------------------- | :------------------------------ |
| ready | 实例挂载完成时触发，参数为该实例的 api | (api: [ModalApi](#methods)) => void |
| cancel | 点击蒙层或 `Esc` 键或取消按钮的回调 | (e: Event) => void              |
| ok     | 点击确定按钮的回调                  | (e: MouseEvent) => void         |
| know   | 点击知道了按钮的回调                | (e: MouseEvent) => void         |
| change | 任一弹窗打开 / 关闭时触发，多实例下携带该实例 `key` | (open: boolean, key: string) => void |
| update:open | 声明式用法下 `v-model:open` 对应的更新事件 | (open: boolean) => void |
