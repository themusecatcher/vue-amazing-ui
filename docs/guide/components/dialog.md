# 对话框 Dialog

<GlobalElement />

*弹出的对话框*

## 何时使用

- 在当前页面正中打开一个浮层，承载相应的操作或者展示内容

::: warning 提示
`Dialog` 提供两种用法：声明式 `<Dialog v-model:open>`（**推荐**）与命令式 `useDialog()`（需外层存在 `<DialogProvider>`），前者由 `v-model:open` 驱动显隐。<br/>
`Dialog` 承担大批量内容展示与表单渲染职责，内容往往就是页面模板的一部分，因此首推声明式用法；命令式用法留给脱离模板的编程式场景（动态批量打开、`setup` 外调用等）。<br/>
如果你想在 `setup` 外使用（例如路由守卫、`axios` 拦截器、`Pinia action` 等），请参考文档末尾的 [在 setup 外使用](#在-setup-外使用)。
:::

## 使用方式

| 调用方式 | API | 适用位置 |
| :-- | :-- | :-- |
| 声明式用法 <Tag color="success" size="small">推荐</Tag> | `<Dialog v-model:open>` | 模板中，内容 / 表单 / 底部由插槽描述时 |
| 命令式调用 <Tag color="warning" size="small">脱离模板</Tag> | `useDialog()` | 组件 `setup` 内编程式打开，需外层存在 `<DialogProvider>` |
| 脱离组件树调用 <Tag color="processing" size="small">无需 DialogProvider</Tag> | `createDiscreteApi()` | 任意位置（`axios` 拦截器、路由守卫、`Pinia action` 等） |

> **与 `Modal` 的职责边界**：`Modal` 承担通知提醒职责（内容少、带类型图标、按 `info` / `success` / `error` / `warning` / `confirm` / `erase` 区分方法）；<br/>
> `Dialog` 承担大批量内容展示与表单渲染职责（尺寸更大、不区分类型、不带语义图标）。<br/>
> **为什么两者推荐顺序相反**：`Modal` 是「一句话提醒」，调用即走，命令式 `useModal().confirm()` 最顺手；`Dialog` 承载的是表单 / 表格 / 长内容，本身就是页面模板的一部分，用 `<Dialog v-model:open>` 把内容直接写进插槽，即可复用模板语法、业务组件与类型提示，而命令式只能把内容塞进 `content: () => h(...)` 渲染函数，越复杂越难维护。<br/>
> 因此 `Dialog` 只提供与类型无关的 `open` / `destroyAll`，需要语义化调用请使用 [`useModal()`](./modal.md)。

### 一、声明式用法：`<Dialog v-model:open>` <Tag color="success" size="small">推荐</Tag>

<br/>

_由 `v-model:open` 驱动显隐，内容写在默认插槽中，标题 / 底部 / 关闭图标可用同名插槽接管；无需任何 `Provider`，在模板中直接使用即可_

::: tip XXX.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from 'vue-amazing-ui'
const open = ref(false)
// 声明式下确定按钮只派发 ok，关闭时机由使用者决定
function onOk() {
  open.value = false
}
</script>
<template>
  <Button type="primary" @click="open = true">打开对话框</Button>
  <Dialog v-model:open="open" title="声明式对话框" @ok="onOk">
    <p>Some descriptions ...</p>
    <p>Some descriptions ...</p>
  </Dialog>
</template>
```

:::

### 二、命令式调用：`useDialog()`

<br/>

_适用于编程式打开：先在应用根节点放置一次 `<DialogProvider>`，之后任意层级组件均可通过 `useDialog()` 取得同一实例_

::: info 关于 `DialogProvider` 与 `Dialog`

- `DialogProvider` 内部渲染一个 `Dialog` 组件，并通过 `provide/inject` 向下提供 `useDialog()` 所需的 API，自身不渲染任何可见内容
- 组件级配置属性（`width` / `height` / `centered` / `top` / `blockScroll` / `to` 等）会透传给内部的 `Dialog`，因此直接参考下方 [Dialog Props](#dialog) 设置即可
- 使用 `useDialog()` 时，组件级配置设置在 `<DialogProvider>` 上（无法直接接触内部 `Dialog`）；每次调用的个性化配置（`title` / `content` / `width` / `onOk` 等）则在调用 `open` 方法时作为参数传入，参考 [DialogOptions Type](#dialogoptions-type)
- 命令式的内容只能用 `string` / `VNode` / 渲染函数三种形态表达（见 [内容三种形态](#内容三种形态)）；内容复杂（表单 / 表格 / 多段排版）时请改用声明式，把内容写进默认插槽

:::

**1. 在应用根节点放置 `DialogProvider`**

::: tip App.vue

```vue
<script setup lang="ts">
import { DialogProvider } from 'vue-amazing-ui'
</script>
<template>
  <DialogProvider>
    <RouterView />
  </DialogProvider>
</template>
```

:::

**2. 在任意层级组件中调用 `useDialog()`**

::: tip XXX.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useDialog } from 'vue-amazing-ui'
const dialog = useDialog()
const saving = ref(false)

function openConfirm() {
  dialog.open({
    title: '确认提交本次变更？',
    width: 420,
    okType: 'danger',
    okText: '提交',
    content: '提交后将同步到生产环境，该操作不可撤销；表单等复杂内容请改用声明式写进默认插槽。',
    async onOk() {
      // 返回 Promise 时确定按钮自动 loading 并禁用，resolve 后自动关闭；
      // 返回 false 或 Promise reject 则阻止关闭，适合校验不通过的场景
      saving.value = true
      await new Promise((resolve) => setTimeout(resolve, 1500))
      saving.value = false
    }
  })
}
</script>
<template>
  <Button type="primary" @click="openConfirm">Open Confirm Dialog</Button>
</template>
```

:::

::: tip 声明式与命令式的差异

- **实例生命周期**：声明式实例常驻（默认 `destroyOnClose: false`），关闭后内容 DOM 与内部状态保留，重新打开可复用同一实例；命令式 `open()` 每次调用入栈一个新实例，默认关闭即销毁（`destroyOnClose: true`）
- **默认关闭行为**：两者点击「取消」/ 遮罩 / `Esc` / 关闭按钮都会关闭（声明式自动回写 `false`）；但「确定」按钮在声明式下**只派发 `ok` 事件、不自动关闭**，需在 `@ok` 中自行将 `open` 置为 `false`；命令式下 `onOk` 回调结束后自动关闭（返回 `false` 或 `Promise` reject 时阻止关闭，期间按钮保持 `loading`）
- **内容来源**：声明式以插槽为主（`#title` / `#default` / `#footer` / `#closeIcon`），`title` / `content` 等属性同样可用；命令式只能通过 `title` / `content` 等参数传入，支持 `string` / `VNode` / 渲染函数三种形态
- **关闭按钮**：`Dialog` 组件级默认 `closable: true`，命令式实例同样默认展示右上角关闭按钮（与 `Modal` 默认不展示相反），无需显式开启

:::

> 本文档网站已在主题层全局包裹 `<DialogProvider>`：声明式演示直接在模板中书写 `<Dialog v-model:open>`（与真实项目用法一致，无需任何额外配置）；命令式演示通过 `useDialog()` 获取实例；需要不同组件级配置的演示，均通过页面内局部嵌套 `<DialogProvider>` 实现。

<script setup lang="ts">
import { computed, defineComponent, h, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { CloseCircleFilled } from '@ant-design/icons-vue'
import { format } from 'date-fns'
import { Button, Switch, createDiscreteApi, useDialog, useMessage } from 'vue-amazing-ui'
import type { DialogApi, DialogReactive, DialogUpdate, DiscreteApiInstance } from 'vue-amazing-ui'
// setup 内调用 useDialog()：需外层存在 <DialogProvider>（docs 站点已在主题层全局包裹）
const dialog = useDialog()
// 用于把各类回调结果反馈到页面上，避免只能看控制台
const message = useMessage()
// setup 外调用示例：createDiscreteApi 创建脱离组件树的独立实例
// 惰性单例：仅首次调用时创建，避免重复创建独立实例与挂载 DOM
let discreteDialog: DiscreteApiInstance<'dialog'> | null = null
function onDiscreteDialog(): void {
  if (!discreteDialog) {
    discreteDialog = createDiscreteApi(['dialog'])
  }
  discreteDialog.dialog.open({
    title: 'Discrete Dialog',
    content: 'This dialog is opened by createDiscreteApi outside setup',
    onOk: () => message.success('点击了「确定」')
  })
}
// 页面级定时器统一登记，卸载时清理，避免组件销毁后仍在跑
const timers: number[] = []
onBeforeUnmount(() => {
  timers.forEach((timer) => {
    clearInterval(timer)
    clearTimeout(timer)
  })
})
// 命令式调用：dialog.open() 立即打开一个弹窗，返回该实例的句柄
function onBasicOpen(): void {
  dialog.open({
    title: '命令式调用',
    content: '无需在模板中声明 Dialog，配置即开；命令式实例默认 destroyOnClose: true，关闭即销毁。',
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => message.error('点击了「取消」/ 遮罩 / Esc / 关闭按钮')
  })
}
// 实例句柄：destroy / update / show 三个方法
let handleDialog: DialogReactive | null = null
// 累计 update 调用次数：每次点击 update 按钮累加，标题与提示都展示当前次数
const handleUpdateCount = ref(0)
function onHandleDialog(): void {
  if (handleDialog) {
    handleDialog.show()
    return
  }
  handleDialog = dialog.open({
    title: '实例句柄（destroy / update / show）',
    content: 'destroyOnClose: false 时实例保留，destroy() 关闭后可用 show() 重新打开，update() 可就地改配置。',
    destroyOnClose: false,
    footer: () =>
      h('div', { style: 'display: flex; justify-content: flex-end; gap: 8px' }, [
        h(Button, { onClick: () => handleDialog?.destroy() }, { default: () => 'destroy() 关闭' }),
        h(
          Button,
          {
            type: 'primary',
            onClick: () => {
              handleUpdateCount.value += 1
              handleDialog?.update({
                title: `已被 update() 修改（第 ${handleUpdateCount.value} 次更新）`
              })
              message.success(`update()：标题已更新（第 ${handleUpdateCount.value} 次）`)
            }
          },
          { default: () => 'update() 更新标题' }
        )
      ])
  })
}
// 命令式切换全屏：switchFullscreen 同样可在 dialog.open() 中配置，右上角出现全屏切换按钮
function onImperativeFullscreen(): void {
  dialog.open({
    title: '命令式切换全屏',
    width: 560,
    content: '命令式调用同样支持 switchFullscreen，点击右上角按钮切换全屏；全屏态下自动禁用拖拽。',
    switchFullscreen: true,
    draggable: true,
    onOk: () => message.success('点击了「确定」')
  })
}
// 声明式用法：v-model:open 控制显隐，change 事件携带 open 与实例 key
const basicOpen = ref(false)
const slotOpen = ref(false)
const closeIconOpen = ref(false)
const longOpen = ref(false)
const fullscreenOpen = ref(false)
const topNumberOpen = ref(false)
const topPercentOpen = ref(false)
const centeredOpen = ref(false)
const originMouseOpen = ref(false)
const originCenterOpen = ref(false)
const dragOpen = ref(false)
function onChange(open: boolean, key: string): void {
  message.info(`change 事件：open: ${open}，key: ${key}`)
}
function onDeclarativeOk(): void {
  // 确定按钮只派发 ok，关闭时机由使用者决定
  basicOpen.value = false
  message.success('点击了「确定」，已在 @ok 中手动关闭')
}
function onDeclarativeCancel(): void {
  message.warning('点击了「取消」/ 遮罩 / Esc / 关闭按钮，v-model:open 已自动同步为 false')
}
// 声明式异步提交：确定按钮不自动关闭，配合 confirmLoading 在异步结束后手动关闭
const asyncOpen = ref(false)
const submitting = ref(false)
function onAsyncSubmit(): void {
  submitting.value = true
  const timer = window.setTimeout(() => {
    submitting.value = false
    asyncOpen.value = false
    message.success('提交成功，弹窗已关闭')
  }, 1500)
  timers.push(timer)
}
function onSlotOk(): void {
  message.success('已提交处理')
  slotOpen.value = false
}
// 内容三种形态：字符串 / VNode / 渲染函数
function onStringContent(): void {
  dialog.open({
    title: '字符串内容',
    content: 'content 传字符串时，内部转为一个文本节点渲染。',
    onOk: () => message.success('点击了「确定」')
  })
}
function onVNodeContent(): void {
  dialog.open({
    title: 'VNode 内容',
    content: h('p', { style: 'margin: 0' }, 'content 传已构造的 VNode 时原样渲染。'),
    onOk: () => message.success('点击了「确定」')
  })
}
// 渲染函数在每次渲染时调用，内部引用响应式数据即可让内容自动更新
function onRenderFnContent(): void {
  const seconds = ref(0)
  const timer = window.setInterval(() => {
    seconds.value += 1
  }, 1000)
  timers.push(timer)
  dialog.open({
    title: '渲染函数内容（响应式）',
    content: () =>
      h('p', { style: 'margin: 0' }, `content 传渲染函数时每次渲染都会调用，当前已打开 ${seconds.value} 秒。`),
    onOk: () => message.success('点击了「确定」'),
    // 关闭动画结束后清理定时器，避免弹窗销毁后仍在跑
    afterClose: () => clearInterval(timer)
  })
}

// 生成演示用的超长内容：每次调用返回新的 VNode，避免复用同一 VNode 实例导致渲染异常
function longText(lines = 30): () => VNode {
  return () =>
    h(
      'div',
      null,
      Array.from({ length: lines }, (_, index) =>
        h('p', { style: 'margin: 0 0 8px' }, `第 ${index + 1} 行：这是一段用于演示超高内容滚动行为的示例文本。`)
      )
    )
}
// 自定义宽高
function onNumberWidth(): void {
  dialog.open({ title: '数值宽度', content: 'width: 365，数值默认按 px 处理。', width: 365 })
}
function onPercentWidth(): void {
  dialog.open({ title: '百分比宽度', content: 'width: 28%，字符串原样透传，百分比同样支持。', width: '28%' })
}
function onFixedHeight(): void {
  dialog.open({
    title: '固定高度',
    content: longText(12),
    height: 260,
    scrollbarProps: { trigger: 'none', contentStyle: { paddingRight: '12px' } }
  })
}
// 内容区高度与滚动
function onWholeScroll(): void {
  dialog.open({
    title: '整体弹框滚动（height 默认 auto）',
    content: longText(),
    centered: true
  })
}
function onInnerScroll(): void {
  dialog.open({
    title: '内容区内部滚动（height + scrollbarProps）',
    content: longText(),
    height: 300,
    scrollbarProps: { trigger: 'none', contentStyle: { paddingRight: '12px' } },
    centered: true
  })
}
function onCustomScrollbar(): void {
  dialog.open({
    title: '自定义滚动条（scrollbarProps）',
    content: longText(),
    height: 300,
    scrollbarProps: { trigger: 'none', size: 10, yPlacement: 'left', contentStyle: { paddingLeft: '12px' } },
    centered: true
  })
}
// 自定义样式：多层结构各由不同 Class / Style 控制
function onCustomClass(): void {
  dialog.open({
    title: '自定义卡片类名（bodyClass）',
    content: 'bodyClass 挂到卡片层 .dialog-body-wrap，配合全局 less 将白卡改为橙色渐变 + 描边。',
    bodyClass: 'custom-dialog-body',
    onOk: () => message.success('点击了「确定」')
  })
}
function onBodyMaskStyle(): void {
  dialog.open({
    title: '自定义卡片与遮罩样式（bodyStyle / maskStyle）',
    content: 'maskStyle 将遮罩染为半透明蓝，bodyStyle 为卡片加上内边距、蓝色描边与圆角。',
    bodyStyle: {
      padding: '32px',
      borderRadius: '20px',
      border: '2px solid #1677ff',
      boxShadow: '0 8px 32px rgba(22, 119, 255, 0.25)'
    },
    maskStyle: { backgroundColor: 'rgba(22, 119, 255, 0.45)' },
    onOk: () => message.success('点击了「确定」')
  })
}
function onTitleContentStyle(): void {
  dialog.open({
    title: '自定义标题与内容样式（titleStyle / contentStyle）',
    content: '上方标题经 titleStyle 放大加粗变红，本段正文经 contentStyle 放大并调色。',
    titleStyle: { fontSize: '20px', fontWeight: 600, color: '#d4380d' },
    contentStyle: { fontSize: '15px', lineHeight: 1.8, color: '#d4380d' },
    onOk: () => message.success('点击了「确定」')
  })
}
// 定位层与卡片层：containerClass / containerStyle 作用于定位层 .dialog-container，用于覆盖 width / top / zIndex；
// 卡片外观（背景 / 圆角 / 阴影 / 描边）请用作用于 .dialog-body-wrap 的 bodyClass / bodyStyle
function onContainerClass(): void {
  dialog.open({
    title: '自定义定位层类名（containerClass）',
    content: '类名挂在定位层 .dialog-container 上，全局样式将默认顶距覆盖为 200px、宽度覆盖为 560px。',
    containerClass: 'custom-dialog-container',
    onOk: () => message.success('点击了「确定」')
  })
}
function onContainerStyle(): void {
  dialog.open({
    title: '自定义定位层样式（containerStyle）',
    content: 'containerStyle 优先级更高，将 width: 520 与默认顶距分别覆盖为 560px 宽、180px 顶距。',
    width: 520,
    containerStyle: { width: '560px', top: '180px' },
    onOk: () => message.success('点击了「确定」')
  })
}
// 无遮罩：背景可交互，点击背景不会误关
function onNoMask(): void {
  dialog.open({
    title: '无遮罩弹窗（mask: false）',
    content:
      'mask: false 时不渲染遮罩，背景内容可直接交互、点击不会误触关闭，适合非阻断式提示。注意：点击背景会使焦点移出弹窗，此时 Esc 不再响应。',
    mask: false,
    onOk: () => message.success('点击了「确定」')
  })
}
// 焦点：autoFocusButton 指定打开后自动聚焦的按钮
function onAutoFocusCancel(): void {
  dialog.open({
    title: '自动聚焦「取消」（autoFocusButton: cancel）',
    content: 'autoFocusButton: "cancel" 时打开后焦点自动落在取消按钮；undefined（默认）聚焦内容容器保证朗读完整。',
    autoFocusButton: 'cancel',
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => message.error('点击了「取消」')
  })
}
// 自定义按钮
function onCustomBtns(): void {
  dialog.open({
    title: '自定义按钮',
    content: 'cancelText / cancelProps 与 okText / okType / okProps 分别配置两个内置按钮。',
    cancelText: 'No',
    cancelProps: { type: 'danger', ghost: true },
    okText: 'Yes',
    okType: 'danger',
    okProps: { ghost: true },
    onOk: () => message.success('点击了 Yes'),
    onCancel: () => message.error('点击了 No')
  })
}
function onDangerOk(): void {
  dialog.open({
    title: '危险操作确认',
    content: 'okType: danger 时确定按钮为危险色，适合删除等不可逆操作。',
    okType: 'danger',
    okText: '删除',
    onOk: () => message.success('已删除')
  })
}
// 自定义底部区域
// footer 传渲染函数时完全接管底部，内置按钮组不再渲染
function onFooterRender(): void {
  const handle: DialogReactive = dialog.open({
    title: '自定义底部渲染',
    content: 'footer 传渲染函数时，底部区域完全由该函数接管。',
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
function onFooterless(): void {
  dialog.open({
    title: '无底部按钮',
    content: 'footer: false 时底部整块隐藏，配合 closable 用右上角关闭。',
    footer: false
  })
}
// 关闭按钮
function onNoClosable(): void {
  dialog.open({
    title: '隐藏关闭按钮',
    content: 'closable: false 时右上角关闭按钮不渲染，只能用「取消」/「确定」/ 遮罩 / Esc 关闭。',
    closable: false,
    onOk: () => message.success('点击了「确定」')
  })
}
// closeIcon 支持 VNode 与渲染函数两种形态，声明式用法下还支持 #closeIcon 插槽
function onVNodeCloseIcon(): void {
  dialog.open({
    title: '自定义关闭图标（VNode）',
    content: 'closeIcon 直接传一个已构造的 VNode。',
    closeIcon: h(CloseCircleFilled, { style: 'color: #ff4d4f' }),
    onOk: () => message.success('点击了「确定」')
  })
}
function onRenderFnCloseIcon(): void {
  dialog.open({
    title: '自定义关闭图标（渲染函数）',
    content: 'closeIcon 传渲染函数时，每次渲染都会调用。',
    closeIcon: () => h(CloseCircleFilled, { style: 'color: #722ed1' }),
    onOk: () => message.success('点击了「确定」')
  })
}
function onNoCloseFocusable(): void {
  dialog.open({
    title: '关闭按钮不参与 Tab 序列',
    content:
      'closeFocusable: false 时右上角关闭按钮 tabindex 为 -1，Tab / Shift + Tab 会跳过它，但 Esc 与鼠标点击照常。',
    closeFocusable: false,
    onOk: () => message.success('点击了「确定」')
  })
}
// 内容保留与销毁
let draftDialog: DialogReactive | null = null
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
function createSwitchContent(desc: string): () => VNode {
  return () =>
    h('div', { style: 'display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 4px;' }, [
      h('span', null, desc),
      h(SwitchDemo)
    ])
}
function onOpenDraftDialog(): void {
  draftOpenCount.value += 1
  if (draftDialog) {
    draftDialog.show()
    return
  }
  draftDialog = dialog.open({
    title: '开关状态',
    content: createSwitchContent('打开开关后关闭弹窗，重新打开对比状态是否保留：'),
    destroyOnClose: false,
    onOk: () => message.success('已保存开关状态（组件实例保留）')
  })
}
function onOpenOnceDialog(): void {
  onceOpenCount.value += 1
  dialog.open({
    title: '开关状态',
    content: createSwitchContent('打开开关后关闭弹窗，重新打开对比状态是否重置：'),
    destroyOnClose: true,
    onOk: () => message.success('已提交（组件实例已销毁，下次打开全新）')
  })
}
// 预渲染：renderBeforeOpen 控制内容是否在首次打开前即渲染
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
// 内容挂载即开始计时：挂载时机即为内容渲染时机
// 定时器在 onMounted 中启动：SSR 阶段不执行挂载生命周期，window 仅在客户端可用
const ContentTimer = defineComponent({
  emits: ['tick'],
  setup(_, { emit }) {
    const elapsed = ref(0)
    let timer: number | undefined
    onMounted(() => {
      timer = window.setInterval(() => {
        elapsed.value += 1
        // 上报渲染时长，供页面级状态展示
        emit('tick', elapsed.value)
      }, 1000)
    })
    onBeforeUnmount(() => {
      if (timer !== undefined) {
        clearInterval(timer)
      }
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
// afterClose 回调
const afterCloseCount = ref(0)
const lastAfterCloseTime = ref<string | null>(null)
function onAfterCloseDialog(): void {
  dialog.open({
    title: 'afterClose 回调',
    content: '关闭动画结束后才触发 afterClose，适合做资源清理或跳转。',
    afterClose: () => {
      afterCloseCount.value += 1
      lastAfterCloseTime.value = format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
      message.success('afterClose 触发：弹窗已完全关闭')
    }
  })
}
// 异步关闭与阻止关闭
// onOk 返回 Promise：resolve 后自动关闭，期间按钮保持 loading 且禁用
function onAsyncOk(): void {
  dialog.open({
    title: '确认提交这些项？',
    content: '点击确定后等待 1.5s，Promise resolve 后自动关闭。',
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
function onRejectOk(): void {
  dialog.open({
    title: '确认删除这些项？',
    content: '点击确定后服务端校验失败，Promise reject 并阻止关闭。',
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
function onPreventOk(): void {
  let submitted = false
  dialog.open({
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
function onPreventCancel(): void {
  dialog.open({
    title: '取消时阻止关闭',
    content: '点击遮罩、按下 Esc 或点击「取消」都会被阻止，只有「确定」可关闭。',
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => {
      message.warning('操作未完成，已阻止关闭')
      return false
    }
  })
}
// 原地更新 update
function onProgressSave(): void {
  const percent = ref(0)
  const handle = dialog.open({
    title: '正在保存草稿',
    // content 传渲染函数：内部引用响应式 percent，进度变化时弹窗内容自动更新
    content: () =>
      h('span', { style: 'white-space: nowrap' }, [
        '正在保存草稿...',
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
    okText: '保存中…',
    // 保存未完成时阻止关闭
    onOk: () => {
      message.warning('保存完成前不可关闭')
      return false
    },
    onCancel: () => {
      message.warning('保存完成前不可取消')
      return false
    }
  })
  // update 支持 loading：手动驱动按钮 loading
  handle.update({ loading: true })
  const timer = window.setInterval(() => {
    percent.value += 5
    if (percent.value < 100) {
      return
    }
    clearInterval(timer)
    // update 支持 DialogOptions 的全部属性 + loading，可一次性重设标题、内容、按钮文案与回调
    const doneOptions: DialogUpdate = {
      title: '保存完成',
      content: '草稿已保存，update() 已把标题、内容、按钮文案与 loading 一并更新。',
      loading: false,
      // 保存完成只剩确认动作，footer 传渲染函数接管底部，只保留「知道了」按钮
      footer: () =>
        h('div', { style: 'display: flex; justify-content: flex-end; gap: 8px' }, [
          h(
            Button,
            { type: 'primary', onClick: () => handle.destroy() },
            { default: () => '知道了' }
          )
        ])
    }
    handle.update(doneOptions)
  }, 120)
  timers.push(timer)
}
// 多实例层叠
// 遮罩会挡住页面，弹窗打开后无法再点击页面按钮，故一次点击开启多层以便观察层叠与逐层关闭
function openStackLayers(content: string): void {
  for (let layer = 1; layer <= 3; layer += 1) {
    dialog.open({
      title: `第 ${layer} 层弹窗`,
      content,
      zIndex: 1000 + layer * 20,
      maskClosable: true
    })
  }
}
function onStackDialog(): void {
  openStackLayers('点击遮罩或「确定」只关闭栈顶弹窗；各实例按自身 zIndex 分层（遮罩取 zIndex，弹窗取 zIndex + 10）。')
}
// destroyAll 同样无法在弹窗打开后从页面触发，故开启多层后用定时器演示一次性全部销毁
function onDestroyAllDialogs(): void {
  openStackLayers('2s 后 destroyAll() 会一次性关闭并销毁全部弹窗。')
  timers.push(
    window.setTimeout(() => {
      dialog.destroyAll()
      message.success('destroyAll：已关闭全部弹窗')
    }, 2000)
  )
}
// 遮罩、键盘与滚动锁定
function onNoMaskClose(): void {
  dialog.open({
    title: '禁止遮罩关闭',
    content: '命令式调用沿用组件 props 的 maskClosable（默认 true），此处显式传 false；onMaskClick 回调仍会触发。',
    maskClosable: false,
    onMaskClick: () => message.info('onMaskClick 回调触发（但不会关闭）'),
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => message.error('点击了「取消」/ Esc / 关闭按钮')
  })
}
// keyboard: false 禁用 Esc 关闭，但 onEsc 回调仍会触发
function onNoKeyboard(): void {
  dialog.open({
    title: '禁用 Esc 关闭',
    content: '按下 Esc 不会关闭弹窗，但 onEsc 回调仍会触发。',
    keyboard: false,
    onEsc: () => message.info('onEsc 回调触发，但已禁用 Esc 关闭')
  })
}
function onBlockScroll(): void {
  dialog.open({
    title: 'blockScroll: true（默认）',
    content: '打开时锁定背景滚动，此时滚动页面无效，全部关闭后自动解锁。'
  })
}
function onNoBlockScroll(): void {
  dialog.open({
    title: 'blockScroll: false',
    content: '不锁定背景滚动，可用滚轮滚动页面，与上一例对比即可看出差异。',
    blockScroll: false
  })
}
// 焦点管理
function onNoFocusRestore(): void {
  dialog.open({
    title: '关闭不归还焦点',
    content: '关闭后焦点不归还给触发按钮；默认 true 时会归还。',
    focusTriggerAfterClose: false,
    onOk: () => message.success('点击了「确定」')
  })
}
// 可拖拽：draggable 开启后标题栏为拖拽句柄
function onDraggableWindow(): void {
  dialog.open({
    title: '限制在视口内（默认）',
    width: 640,
    content: '按住标题栏拖动我，默认限制在视口内；切到全屏态后自动禁用拖拽。',
    switchFullscreen: true,
    draggable: true
  })
}
function onDraggableNone(): void {
  dialog.open({
    title: '不限制边界',
    width: 640,
    content: 'draggable: { bounds: "none" } 时弹窗可被拖出视口。',
    draggable: { bounds: 'none' }
  })
}
// 自定义挂载容器 to
// to 在命令式下为 Provider 级配置，无法逐条传入，故在页面局部嵌套 Provider 演示；@ready 可取到该 Provider 作用域内的 api（声明式用法下直接写 <Dialog to="...">）
const toDialog = ref<DialogApi>()
const toReady = ref(false)
// 目标容器与组件位于同一组件树，需等挂载完成（目标已插入文档）后再渲染组件，Teleport 才能定位到目标
onMounted(() => {
  toReady.value = true
})
function onToDialog(): void {
  toDialog.value?.open({
    title: '自定义挂载容器',
    content: '这个弹窗被挂载到下方虚线容器中'
  })
}
// Statistic 默认 24px 字号在卡片内偏大，统一收窄
const statisticValueStyle: CSSProperties = { fontSize: '20px' }
</script>

---

## 基本使用

_用 `v-model:open` 控制显隐：点击「取消」/ 遮罩 / `Esc` / 关闭按钮会自动回写 `false`；点击「确定」只派发 `ok` 事件、不自动关闭，需在 `@ok` 回调中自行将 `open` 置为 `false`_

<br/>

<Button type="primary" @click="basicOpen = true">open dialog</Button>

<Dialog v-model:open="basicOpen" title="声明式弹窗" @ok="onDeclarativeOk" @cancel="onDeclarativeCancel">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, useMessage } from 'vue-amazing-ui'
const message = useMessage()
const open = ref(false)
// 确定按钮只派发 ok，关闭时机由使用者决定
function onOk() {
  open.value = false
  message.success('点击了「确定」，已在 @ok 中手动关闭')
}
function onCancel() {
  message.warning('点击了「取消」/ 遮罩 / Esc / 关闭按钮，v-model:open 已自动同步为 false')
}
</script>
<template>
  <Button type="primary" @click="open = true">open dialog</Button>
  <Dialog v-model:open="open" title="声明式弹窗" @ok="onOk" @cancel="onCancel">
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

:::

## 声明式用法

_用 `v-model:open` 控制显隐，标题 / 内容 / 底部 / 关闭图标均可用插槽自定义；`change` 事件在每次开关时触发，并携带该实例的 `key`。点击「确定」只派发 `ok` 事件、不自动关闭，需在 `@ok` 中自行将 `open` 置为 `false`；点击「取消」/ 遮罩 / `Esc` / 关闭按钮则自动回写 `false`。需要异步提交时，可用 `confirmLoading` 控制确定按钮 `loading`，在异步结束后再自行关闭_

<br/>

<Space>
  <Button type="primary" @click="slotOpen = true">插槽自定义标题与底部</Button>
  <Button type="primary" @click="asyncOpen = true">声明式异步提交</Button>
</Space>

<Dialog v-model:open="slotOpen" :width="460" @change="onChange">
  <template #title>
    <span>Vue Amazing UI</span>
  </template>
  <template #closeIcon>
    <CloseCircleFilled style="color: #ff6900" />
  </template>
  <p>Some descriptions ...</p>
  <p>Some descriptions ...</p>
  <template #footer>
    <Space>
      <Button @click="slotOpen = false">稍后处理</Button>
      <Button type="primary" @click="onSlotOk">立即处理</Button>
    </Space>
  </template>
</Dialog>

<Dialog
  v-model:open="asyncOpen"
  title="异步提交（声明式）"
  content="点击确定后等待 1.5s，期间由 confirmLoading 控制按钮 loading，异步结束后自行关闭。"
  :confirm-loading="submitting"
  @ok="onAsyncSubmit"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CloseCircleFilled } from '@ant-design/icons-vue'
import { Button, Dialog, useMessage } from 'vue-amazing-ui'
const message = useMessage()
const slotOpen = ref(false)
const asyncOpen = ref(false)
const submitting = ref(false)
// change 事件携带该实例的 key
function onChange(open: boolean, key: string) {
  message.info(`change 事件：open: ${open}，key: ${key}`)
}
function onSlotOk() {
  message.success('已提交处理')
  slotOpen.value = false
}
// 声明式异步提交：确定按钮不自动关闭，配合 confirmLoading 在异步结束后手动关闭
function onAsyncSubmit() {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    asyncOpen.value = false
    message.success('提交成功，弹窗已关闭')
  }, 1500)
}
</script>
<template>
  <Space>
    <Button type="primary" @click="slotOpen = true">插槽自定义标题与底部</Button>
    <Button type="primary" @click="asyncOpen = true">声明式异步提交</Button>
  </Space>
  <Dialog v-model:open="slotOpen" :width="460" @change="onChange">
    <template #title>
      <span>Vue Amazing UI</span>
    </template>
    <template #closeIcon>
      <CloseCircleFilled style="color: #ff6900" />
    </template>
    <p>Some descriptions ...</p>
    <p>Some descriptions ...</p>
    <template #footer>
      <Space>
        <Button @click="slotOpen = false">稍后处理</Button>
        <Button type="primary" @click="onSlotOk">立即处理</Button>
      </Space>
    </template>
  </Dialog>
  <Dialog
    v-model:open="asyncOpen"
    title="异步提交（声明式）"
    content="点击确定后等待 1.5s，期间由 confirmLoading 控制按钮 loading，异步结束后自行关闭。"
    :confirm-loading="submitting"
    @ok="onAsyncSubmit"
  />
</template>
```

:::

## 命令式调用

_`dialog.open(options)` 立即打开一个弹窗并返回该实例的句柄，句柄提供 `key` / `destroy` / `update` / `show` 四个成员，可脱离模板做编程式控制；命令式实例默认 `destroyOnClose: true`，关闭即销毁_

<br/>

<Space>
  <Button type="primary" @click="onBasicOpen">命令式打开弹窗</Button>
  <Button type="primary" @click="onHandleDialog">实例句柄（destroy / update / show）</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { Button, useDialog, useMessage } from 'vue-amazing-ui'
import type { DialogReactive } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
// 命令式打开：配置即开，关闭即销毁
function onBasicOpen() {
  dialog.open({
    title: '命令式调用',
    content: '无需在模板中声明 Dialog，配置即开；命令式实例默认 destroyOnClose: true，关闭即销毁。',
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => message.error('点击了「取消」/ 遮罩 / Esc / 关闭按钮')
  })
}
// 实例句柄：destroy / update / show
let handleDialog: DialogReactive | null = null
const updateCount = ref(0)
function onHandleDialog() {
  if (handleDialog) {
    handleDialog.show()
    return
  }
  handleDialog = dialog.open({
    title: '实例句柄（destroy / update / show）',
    content: 'destroyOnClose: false 时实例保留，destroy() 关闭后可用 show() 重新打开，update() 可就地改配置。',
    destroyOnClose: false,
    footer: () =>
      h('div', { style: 'display: flex; justify-content: flex-end; gap: 8px' }, [
        h(Button, { onClick: () => handleDialog?.destroy() }, { default: () => 'destroy() 关闭' }),
        h(
          Button,
          {
            type: 'primary',
            onClick: () => {
              updateCount.value += 1
              handleDialog?.update({ title: `已被 update() 修改（第 ${updateCount.value} 次更新）` })
            }
          },
          { default: () => 'update() 更新标题' }
        )
      ])
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onBasicOpen">命令式打开弹窗</Button>
    <Button type="primary" @click="onHandleDialog">实例句柄（destroy / update / show）</Button>
  </Space>
</template>
```

:::

## 内容三种形态

_`content` / `title` 均支持 `string` / `VNode` / 渲染函数三种形态，命令式与声明式一致（声明式下内容通常直接写进默认插槽，不必传 `content`）；渲染函数在每次渲染时调用，内部引用响应式数据即可让内容自动更新_

<br/>

<Space>
  <Button type="primary" @click="onStringContent">字符串内容</Button>
  <Button type="primary" @click="onVNodeContent">VNode 内容</Button>
  <Button type="primary" @click="onRenderFnContent">渲染函数内容（响应式）</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { useDialog, useMessage } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
function onStringContent() {
  dialog.open({
    title: '字符串内容',
    content: 'content 传字符串时，内部转为一个文本节点渲染。',
    onOk: () => message.success('点击了「确定」')
  })
}
function onVNodeContent() {
  dialog.open({
    title: 'VNode 内容',
    content: h('p', { style: 'margin: 0' }, 'content 传已构造的 VNode 时原样渲染。'),
    onOk: () => message.success('点击了「确定」')
  })
}
// 渲染函数在每次渲染时调用，内部引用响应式数据即可让内容自动更新
function onRenderFnContent() {
  const seconds = ref(0)
  const timer = window.setInterval(() => {
    seconds.value += 1
  }, 1000)
  dialog.open({
    title: '渲染函数内容（响应式）',
    content: () =>
      h('p', { style: 'margin: 0' }, `content 传渲染函数时每次渲染都会调用，当前已打开 ${seconds.value} 秒。`),
    onOk: () => message.success('点击了「确定」'),
    // 关闭动画结束后清理定时器，避免弹窗销毁后仍在跑
    afterClose: () => clearInterval(timer)
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onStringContent">字符串内容</Button>
    <Button type="primary" @click="onVNodeContent">VNode 内容</Button>
    <Button type="primary" @click="onRenderFnContent">渲染函数内容（响应式）</Button>
  </Space>
</template>
```

:::

## 内容保留、预渲染与关闭回调

_声明式实例默认 `destroyOnClose: false`，内容常驻、重新打开复用同一实例；命令式实例默认 `true`，关闭即销毁，传 `false` 时实例保留、内容 DOM 与内部状态持久化，可用 `show()` 重新打开。下面分三组演示内容保留、预渲染与关闭回调的差异_

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
        <Button type="primary" @click="onOpenDraftDialog">草稿弹窗（保留内容）</Button>
      </template>
      <template #extra>
        <Tag>false</Tag>
      </template>
      <p class="demo-variant-desc">实例保留，重复打开复用同一实例，内部状态持久化</p>
      <Statistic title="已打开" :value="draftOpenCount" suffix="次" :value-style="statisticValueStyle" />
    </Card>
    <Card class="demo-variant">
      <template #title>
        <Button type="primary" @click="onOpenOnceDialog">一次性弹窗（关闭销毁）</Button>
      </template>
      <template #extra>
        <Tag color="success">true</Tag>
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
  <Dialog v-model:open="lazyOpen" title="懒渲染（默认）">
    <ContentTimer @tick="onLazyRenderTick" />
  </Dialog>
  <Dialog v-model:open="preRenderOpen" title="预渲染（render-before-open）" render-before-open>
    <ContentTimer @tick="onPreRenderTick" />
  </Dialog>
</Card>

<Card class="demo-group">
  <template #title>
    <Space :gap="8">
      <Badge :value="3" color="blue" />
      <span>afterClose：关闭后回调</span>
    </Space>
  </template>
  <p class="demo-group-desc">
    点击「确定」/「取消」/ 遮罩或按 <code>Esc</code> 关闭均可触发，回调在<b>关闭动画播放结束后</b>才执行。
  </p>
  <Flex wrap="wrap" :gap="16">
    <Card class="demo-variant">
      <template #title>
        <Button type="primary" @click="onAfterCloseDialog">打开弹窗</Button>
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
import { computed, defineComponent, h, onBeforeUnmount, reactive, ref } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { format } from 'date-fns'
import { Switch, useDialog, useMessage } from 'vue-amazing-ui'
import type { DialogReactive } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
// Statistic 默认 24px 字号在卡片内偏大，统一收窄
const statisticValueStyle: CSSProperties = { fontSize: '20px' }
// 一、destroyOnClose：内容是否保留
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
function createSwitchContent(desc: string): () => VNode {
  return () =>
    h('div', { style: 'display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 4px;' }, [
      h('span', null, desc),
      h(SwitchDemo)
    ])
}
let draftDialog: DialogReactive | null = null
const draftOpenCount = ref(0)
const onceOpenCount = ref(0)
function onOpenDraftDialog() {
  draftOpenCount.value += 1
  if (draftDialog) {
    draftDialog.show()
    return
  }
  draftDialog = dialog.open({
    title: '开关状态',
    content: createSwitchContent('打开开关后关闭弹窗，重新打开对比状态是否保留：'),
    destroyOnClose: false,
    onOk: () => message.success('已保存开关状态（组件实例保留）')
  })
}
function onOpenOnceDialog() {
  onceOpenCount.value += 1
  dialog.open({
    title: '开关状态',
    content: createSwitchContent('打开开关后关闭弹窗，重新打开对比状态是否重置：'),
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
        emit('tick', elapsed.value)
      }, 1000)
    })
    onBeforeUnmount(() => {
      if (timer !== undefined) {
        clearInterval(timer)
      }
    })
    return () => h('p', { style: 'margin: 0' }, `内容已渲染 ${elapsed.value} 秒`)
  }
})
function onLazyRenderTick(seconds: number) {
  renderSeconds.lazy = seconds
}
function onPreRenderTick(seconds: number) {
  renderSeconds.pre = seconds
}
const lazyOpen = ref(false)
const preRenderOpen = ref(false)
// 三、afterClose：关闭后回调
const afterCloseCount = ref(0)
const lastAfterCloseTime = ref<string | null>(null)
function onAfterCloseDialog() {
  dialog.open({
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
    <p class="demo-group-desc">两个弹窗都含 <code>Switch</code> 开关：打开开关 → 关闭 → 重新打开，对比开关状态是否保留。</p>
    <Flex wrap="wrap" :gap="16">
      <Card class="demo-variant">
        <template #title>
          <Button type="primary" @click="onOpenDraftDialog">草稿弹窗（保留内容）</Button>
        </template>
        <template #extra>
          <Tag>false</Tag>
        </template>
        <p class="demo-variant-desc">实例保留，重复打开复用同一实例，内部状态持久化</p>
        <Statistic title="已打开" :value="draftOpenCount" suffix="次" :value-style="statisticValueStyle" />
      </Card>
      <Card class="demo-variant">
        <template #title>
          <Button type="primary" @click="onOpenOnceDialog">一次性弹窗（关闭销毁）</Button>
        </template>
        <template #extra>
          <Tag color="success">true</Tag>
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
    <Dialog v-model:open="lazyOpen" title="懒渲染（默认）">
      <ContentTimer @tick="onLazyRenderTick" />
    </Dialog>
    <Dialog v-model:open="preRenderOpen" title="预渲染（render-before-open）" render-before-open>
      <ContentTimer @tick="onPreRenderTick" />
    </Dialog>
  </Card>

  <Card class="demo-group">
    <template #title>
      <Space :gap="8">
        <Badge :value="3" color="blue" />
        <span>afterClose：关闭后回调</span>
      </Space>
    </template>
    <p class="demo-group-desc">
      点击「确定」/「取消」/ 遮罩或按 <code>Esc</code> 关闭均可触发，回调在<b>关闭动画播放结束后</b>才执行。
    </p>
    <Flex wrap="wrap" :gap="16">
      <Card class="demo-variant">
        <template #title>
          <Button type="primary" @click="onAfterCloseDialog">打开弹窗</Button>
        </template>
        <p class="demo-variant-desc">适合做资源清理或路由跳转</p>
        <Space :gap="32" wrap>
          <Statistic title="触发次数" :value="afterCloseCount" :value-style="statisticValueStyle" />
          <Statistic title="最近触发" :value-style="statisticValueStyle">{{ lastAfterCloseTime ?? '—' }}</Statistic>
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

::::

## 自定义宽高

_`width` / `height` 支持数值（默认 `px`）与百分比（字符串原样透传）两种写法；固定 `height` 后内容超高在内容区内部滚动_

<br/>

<Space>
  <Button type="primary" @click="onNumberWidth">数值宽度</Button>
  <Button type="primary" @click="onPercentWidth">百分比宽度</Button>
  <Button type="primary" @click="onFixedHeight">固定高度</Button>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { useDialog } from 'vue-amazing-ui'
const dialog = useDialog()
function onNumberWidth() {
  dialog.open({ title: '数值宽度', content: 'width: 365，数值默认按 px 处理。', width: 365 })
}
function onPercentWidth() {
  dialog.open({ title: '百分比宽度', content: 'width: 28%，字符串原样透传，百分比同样支持。', width: '28%' })
}
function onFixedHeight() {
  dialog.open({
    title: '固定高度',
    content: 'height: 260 时内容超高在内容区内部滚动，标题与按钮固定可见。',
    height: 260
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onNumberWidth">数值宽度</Button>
    <Button type="primary" @click="onPercentWidth">百分比宽度</Button>
    <Button type="primary" @click="onFixedHeight">固定高度</Button>
  </Space>
</template>
```

::::

## 内容区高度与滚动

_`height` 作用于整个弹窗主体（含标题与底部按钮）：`auto` 时内容自然撑开，超高后整个弹框滚动；指定 `height` 后内容区内部滚动，标题与按钮固定可见。滚动条由内置 `Scrollbar` 接管，可通过 `scrollbarProps` 定制大小、位置与显隐时机。声明式用法下，也可以在默认插槽内直接用 `Scrollbar` 包裹超长内容并限高_

<br/>

<Space>
  <Button type="primary" @click="onWholeScroll">整体弹框滚动</Button>
  <Button type="primary" @click="onInnerScroll">内容区内部滚动</Button>
  <Button type="primary" @click="onCustomScrollbar">自定义滚动条</Button>
  <Button type="primary" @click="longOpen = true">插槽内 Scrollbar 限高</Button>
</Space>

<Dialog v-model:open="longOpen" title="插槽内 Scrollbar 限高">
  <Scrollbar style="max-height: 300px" trigger="none" :content-style="{ paddingRight: '12px' }">
    <p v-for="i in 30" :key="i" style="margin: 0 0 8px"
      >第 {{ i }} 行：这是一段用于演示超高内容滚动行为的示例文本。</p
    >
  </Scrollbar>
</Dialog>

:::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import type { VNode } from 'vue'
import { Dialog, useDialog } from 'vue-amazing-ui'
const dialog = useDialog()
// 生成演示用的超长内容：每次调用返回新的 VNode，避免复用同一 VNode 实例导致渲染异常
function longText(lines = 30): () => VNode {
  return () =>
    h(
      'div',
      null,
      Array.from({ length: lines }, (_, index) =>
        h('p', { style: 'margin: 0 0 8px' }, `第 ${index + 1} 行：这是一段用于演示超高内容滚动行为的示例文本。`)
      )
    )
}
// height 为 auto（默认）时内容自然撑开，超高后整个弹框滚动
function onWholeScroll() {
  dialog.open({
    title: '整体弹框滚动（height 默认 auto）',
    content: longText(),
    centered: true
  })
}
// 指定 height 后内容区内部滚动，标题与按钮固定可见
function onInnerScroll() {
  dialog.open({
    title: '内容区内部滚动（height + scrollbarProps）',
    content: longText(),
    height: 300,
    scrollbarProps: { trigger: 'none', contentStyle: { paddingRight: '12px' } },
    centered: true
  })
}
// scrollbarProps 透传给内置 Scrollbar，可定制滚动条大小与位置
function onCustomScrollbar() {
  dialog.open({
    title: '自定义滚动条（scrollbarProps）',
    content: longText(),
    height: 300,
    scrollbarProps: { trigger: 'none', size: 10, yPlacement: 'left', contentStyle: { paddingLeft: '12px' } },
    centered: true
  })
}
// 声明式用法：插槽内用 Scrollbar 包裹超长内容并限高
const open = ref(false)
</script>
<template>
  <Space>
    <Button type="primary" @click="onWholeScroll">整体弹框滚动</Button>
    <Button type="primary" @click="onInnerScroll">内容区内部滚动</Button>
    <Button type="primary" @click="onCustomScrollbar">自定义滚动条</Button>
    <Button type="primary" @click="open = true">插槽内 Scrollbar 限高</Button>
  </Space>
  <Dialog v-model:open="open" title="插槽内 Scrollbar 限高">
    <Scrollbar style="max-height: 300px" trigger="none" :content-style="{ paddingRight: '12px' }">
      <p v-for="i in 30" :key="i" style="margin: 0 0 8px">
        第 {{ i }} 行：这是一段用于演示超高内容滚动行为的示例文本。
      </p>
    </Scrollbar>
  </Dialog>
</template>
```

::::

## 自定义样式

`Dialog` 渲染为多层结构，各层的外观 / 定位由对应的 `XxxClass` / `XxxStyle` 控制：

| 层级 | DOM 类名 | 职责 | 对应配置项 |
| :-- | :-- | :-- | :-- |
| 外层容器 | `.dialog-wrap` | 铺满视口，多实例共享 | `wrapClass` / `wrapStyle` |
| 蒙层 | `.dialog-mask` | 遮罩 | `maskClass` / `maskStyle` |
| 定位层 | `.dialog-container` | 承载 `width` / `top` / `zIndex` 与拖拽偏移，本身无视觉样式 | `containerClass` / `containerStyle` |
| 卡片层 | `.dialog-body-wrap` | 白底 / 圆角 / 阴影所在的弹窗卡片 | `bodyClass` / `bodyStyle` |
| 标题 | `.dialog-header` | 标题区 | `titleClass` / `titleStyle` |
| 内容 | `.dialog-content` | 正文区 | `contentClass` / `contentStyle` |

<Space>
  <Button type="primary" @click="onCustomClass">自定义卡片类名</Button>
  <Button type="primary" @click="onBodyMaskStyle">自定义卡片与遮罩样式</Button>
  <Button type="primary" @click="onTitleContentStyle">自定义标题与内容样式</Button>
  <Button type="primary" @click="onContainerClass">自定义定位层类名</Button>
  <Button type="primary" @click="onContainerStyle">自定义定位层样式</Button>
</Space>

<style lang="less">
// 弹窗通过 Teleport 挂载到 body 下，scoped 样式无法命中，需使用全局样式
// bodyClass 演示：类名挂在卡片层 .dialog-body-wrap 上，让默认白底卡片变为橙色渐变 + 描边，一眼可辨命中层
.custom-dialog-body {
  background: linear-gradient(135deg, #fff7e6 0%, #ffd591 100%) !important;
  border: 2px solid #ff6900 !important;
  border-radius: 16px !important;
  box-shadow: 0 6px 24px rgba(255, 105, 0, 0.18) !important;
}
// containerClass 演示：类名挂在定位层 .dialog-container 上（透明、本身无视觉），
// 类内用 !important 覆盖内置 top / width，即可直观看到「定位被类接管」
.custom-dialog-container {
  top: 200px !important;
  width: 560px !important;
}
</style>

:::: details Show Code

```vue
<script setup lang="ts">
import { useDialog, useMessage } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
function onCustomClass() {
  dialog.open({
    title: '自定义卡片类名（bodyClass）',
    content: 'bodyClass 挂到卡片层 .dialog-body-wrap，配合全局 less 将白卡改为橙色渐变 + 描边。',
    bodyClass: 'custom-dialog-body',
    onOk: () => message.success('点击了「确定」')
  })
}
function onBodyMaskStyle() {
  dialog.open({
    title: '自定义卡片与遮罩样式（bodyStyle / maskStyle）',
    content: 'maskStyle 将遮罩染为半透明蓝，bodyStyle 为卡片加上内边距、蓝色描边与圆角。',
    bodyStyle: {
      padding: '32px',
      borderRadius: '20px',
      border: '2px solid #1677ff',
      boxShadow: '0 8px 32px rgba(22, 119, 255, 0.25)'
    },
    maskStyle: { backgroundColor: 'rgba(22, 119, 255, 0.45)' },
    onOk: () => message.success('点击了「确定」')
  })
}
function onTitleContentStyle() {
  dialog.open({
    title: '自定义标题与内容样式（titleStyle / contentStyle）',
    content: '上方标题经 titleStyle 放大加粗变红，本段正文经 contentStyle 放大并调色。',
    titleStyle: { fontSize: '20px', fontWeight: 600, color: '#d4380d' },
    contentStyle: { fontSize: '15px', lineHeight: 1.8, color: '#d4380d' },
    onOk: () => message.success('点击了「确定」')
  })
}
// containerClass / containerStyle 作用于定位层 .dialog-container，负责 width / top / zIndex；
// 卡片外观（背景 / 圆角 / 阴影）请用作用于 .dialog-body-wrap 的 bodyClass / bodyStyle
function onContainerClass() {
  dialog.open({
    title: '自定义定位层类名（containerClass）',
    content: '类名挂在定位层 .dialog-container 上，全局样式将默认顶距覆盖为 200px、宽度覆盖为 560px。',
    containerClass: 'custom-dialog-container',
    onOk: () => message.success('点击了「确定」')
  })
}
function onContainerStyle() {
  dialog.open({
    title: '自定义定位层样式（containerStyle）',
    content: 'containerStyle 优先级更高，将 width: 520 与默认顶距分别覆盖为 560px 宽、180px 顶距。',
    width: 520,
    containerStyle: { width: '560px', top: '180px' },
    onOk: () => message.success('点击了「确定」')
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onCustomClass">自定义卡片类名</Button>
    <Button type="primary" @click="onBodyMaskStyle">自定义卡片与遮罩样式</Button>
    <Button type="primary" @click="onTitleContentStyle">自定义标题与内容样式</Button>
    <Button type="primary" @click="onContainerClass">自定义定位层类名</Button>
    <Button type="primary" @click="onContainerStyle">自定义定位层样式</Button>
  </Space>
</template>
<style lang="less">
// 弹窗通过 Teleport 挂载到 body 下，scoped 样式无法命中，需使用全局样式
.custom-dialog-body {
  background: linear-gradient(135deg, #fff7e6 0%, #ffd591 100%) !important;
  border: 2px solid #ff6900 !important;
  border-radius: 16px !important;
  box-shadow: 0 6px 24px rgba(255, 105, 0, 0.18) !important;
}
.custom-dialog-container {
  top: 200px !important;
  width: 560px !important;
}
</style>
```

::::

## 自定义遮罩和聚焦

_`mask: false` 可隐藏遮罩让背景可交互；`autoFocusButton` 控制打开后自动聚焦的按钮（`undefined` 时默认聚焦内容容器）_

<br/>

<Space>
  <Button type="primary" @click="onNoMask">无遮罩</Button>
  <Button type="primary" @click="onAutoFocusCancel">自动聚焦「取消」按钮</Button>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { useDialog, useMessage } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
function onNoMask() {
  dialog.open({
    title: '无遮罩弹窗（mask: false）',
    content: 'mask: false 时不渲染遮罩，背景内容可直接交互、点击不会误触关闭。注意：点击背景会使焦点移出弹窗，此时 Esc 不再响应。',
    mask: false,
    onOk: () => message.success('点击了「确定」')
  })
}
function onAutoFocusCancel() {
  dialog.open({
    title: '自动聚焦「取消」（autoFocusButton: cancel）',
    content: 'autoFocusButton: "cancel" 时打开后焦点自动落在取消按钮；undefined（默认）聚焦内容容器保证朗读完整。',
    autoFocusButton: 'cancel',
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => message.error('点击了「取消」')
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onNoMask">无遮罩</Button>
    <Button type="primary" @click="onAutoFocusCancel">自动聚焦「取消」按钮</Button>
  </Space>
</template>
```

::::

## 自定义按钮

_`cancelText` / `cancelProps` 配置取消按钮，`okText` / `okType` / `okProps` 配置确定按钮；`okProps` 优先级高于 `okType`，两者都传 `type` 时以 `okProps` 为准。`okType: 'danger'` 可用于删除等危险操作_

<br/>

<Space>
  <Button type="primary" @click="onCustomBtns">按钮文案与类型</Button>
  <Button type="primary" @click="onDangerOk">危险操作</Button>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { useDialog, useMessage } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
function onCustomBtns() {
  dialog.open({
    title: '自定义按钮',
    content: 'cancelText / cancelProps 与 okText / okType / okProps 分别配置两个内置按钮。',
    cancelText: 'No',
    cancelProps: { type: 'danger', ghost: true },
    okText: 'Yes',
    okType: 'danger',
    okProps: { ghost: true },
    onOk: () => message.success('点击了 Yes'),
    onCancel: () => message.error('点击了 No')
  })
}
function onDangerOk() {
  dialog.open({
    title: '危险操作确认',
    content: 'okType: danger 时确定按钮为危险色，适合删除等不可逆操作。',
    okType: 'danger',
    okText: '删除',
    onOk: () => message.success('已删除')
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onCustomBtns">按钮文案与类型</Button>
    <Button type="primary" @click="onDangerOk">危险操作</Button>
  </Space>
</template>
```

::::

## 自定义底部区域

_`footer` 传渲染函数时底部区域完全由该函数接管，内置按钮组不再渲染；`footer: false` 时整块隐藏，配合 `closable` 用右上角关闭。声明式用法下还可使用 `#footer` 插槽_

<br/>

<Space>
  <Button type="primary" @click="onFooterRender">自定义底部渲染</Button>
  <Button type="primary" @click="onFooterless">无底部按钮</Button>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { Button, useDialog, useMessage } from 'vue-amazing-ui'
import type { DialogReactive } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
// footer 传渲染函数时完全接管底部，内置按钮组不再渲染
function onFooterRender() {
  const handle: DialogReactive = dialog.open({
    title: '自定义底部渲染',
    content: 'footer 传渲染函数时，底部区域完全由该函数接管。',
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
function onFooterless() {
  dialog.open({
    title: '无底部按钮',
    content: 'footer: false 时底部整块隐藏，配合 closable 用右上角关闭。',
    footer: false
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onFooterRender">自定义底部渲染</Button>
    <Button type="primary" @click="onFooterless">无底部按钮</Button>
  </Space>
</template>
```

::::

## 关闭按钮

_`closable: false` 隐藏右上角关闭按钮；`closeIcon` 支持 `VNode` / 渲染函数两种形态，声明式用法下插槽优先级高于 `closeIcon` 属性；`closeFocusable: false` 让关闭按钮不参与 `Tab` 序列_

<br/>

<Space>
  <Button type="primary" @click="onNoClosable">隐藏关闭按钮</Button>
  <Button type="primary" @click="onVNodeCloseIcon">自定义关闭图标（VNode）</Button>
  <Button type="primary" @click="onRenderFnCloseIcon">自定义关闭图标（渲染函数）</Button>
  <Button type="primary" @click="closeIconOpen = true">插槽自定义关闭图标</Button>
  <Button type="primary" @click="onNoCloseFocusable">关闭按钮不参与 Tab 序列</Button>
</Space>

<Dialog v-model:open="closeIconOpen" title="插槽自定义关闭图标（#closeIcon）">
  <template #closeIcon>
    <CloseCircleFilled style="color: #ff6900" />
  </template>
  <p>声明式用法下可用 <code>#closeIcon</code> 插槽替换右上角图标，插槽优先级高于 <code>closeIcon</code> 属性。</p>
</Dialog>

:::: details Show Code

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import { CloseCircleFilled } from '@ant-design/icons-vue'
import { Dialog, useDialog, useMessage } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
function onNoClosable() {
  dialog.open({
    title: '隐藏关闭按钮',
    content: 'closable: false 时右上角关闭按钮不渲染，只能用「取消」/「确定」/ 遮罩 / Esc 关闭。',
    closable: false,
    onOk: () => message.success('点击了「确定」')
  })
}
// closeIcon 支持 VNode 与渲染函数两种形态
function onVNodeCloseIcon() {
  dialog.open({
    title: '自定义关闭图标（VNode）',
    content: 'closeIcon 直接传一个已构造的 VNode。',
    closeIcon: h(CloseCircleFilled, { style: 'color: #ff4d4f' }),
    onOk: () => message.success('点击了「确定」')
  })
}
function onRenderFnCloseIcon() {
  dialog.open({
    title: '自定义关闭图标（渲染函数）',
    content: 'closeIcon 传渲染函数时，每次渲染都会调用。',
    closeIcon: () => h(CloseCircleFilled, { style: 'color: #722ed1' }),
    onOk: () => message.success('点击了「确定」')
  })
}
// 关闭按钮不参与 Tab 序列
function onNoCloseFocusable() {
  dialog.open({
    title: '关闭按钮不参与 Tab 序列',
    content: 'closeFocusable: false 时右上角关闭按钮 tabindex 为 -1，Tab / Shift + Tab 会跳过它，但 Esc 与鼠标点击照常。',
    closeFocusable: false,
    onOk: () => message.success('点击了「确定」')
  })
}
// 声明式用法：#closeIcon 插槽自定义
const open = ref(false)
</script>
<template>
  <Space>
    <Button type="primary" @click="onNoClosable">隐藏关闭按钮</Button>
    <Button type="primary" @click="onVNodeCloseIcon">自定义关闭图标（VNode）</Button>
    <Button type="primary" @click="onRenderFnCloseIcon">自定义关闭图标（渲染函数）</Button>
    <Button type="primary" @click="open = true">插槽自定义关闭图标</Button>
    <Button type="primary" @click="onNoCloseFocusable">关闭按钮不参与 Tab 序列</Button>
  </Space>
  <Dialog v-model:open="open" title="插槽自定义关闭图标（#closeIcon）">
    <template #closeIcon>
      <CloseCircleFilled style="color: #ff6900" />
    </template>
    <p>声明式用法下可用 <code>#closeIcon</code> 插槽替换右上角图标，插槽优先级高于 <code>closeIcon</code> 属性。</p>
  </Dialog>
</template>
```

::::

## 切换全屏

_`switchFullscreen` 开启后右上角出现全屏切换按钮，切换后弹窗铺满视口；全屏态下自动禁用拖拽。命令式与声明式用法均支持_

<br/>

<Space>
  <Button type="primary" @click="fullscreenOpen = true">声明式切换全屏</Button>
  <Button type="primary" @click="onImperativeFullscreen">命令式切换全屏</Button>
</Space>

<Dialog v-model:open="fullscreenOpen" title="全屏切换演示" switch-fullscreen draggable>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, useDialog, useMessage } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
const open = ref(false)
function onImperativeFullscreen() {
  dialog.open({
    title: '命令式切换全屏',
    width: 560,
    content: '命令式调用同样支持 switchFullscreen，点击右上角按钮切换全屏；全屏态下自动禁用拖拽。',
    switchFullscreen: true,
    draggable: true,
    onOk: () => message.success('点击了「确定」')
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="open = true">声明式切换全屏</Button>
    <Button type="primary" @click="onImperativeFullscreen">命令式切换全屏</Button>
  </Space>
  <Dialog v-model:open="open" title="全屏切换演示" switch-fullscreen draggable>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

::::

## 自定义位置

_默认从顶部 `100px` 处开始垂直排列（非居中）；`top` 支持数值（`px`）与百分比，`centered` 可水平垂直居中_

<br/>

<Space>
  <Button type="primary" @click="topNumberOpen = true">数值顶距</Button>
  <Button type="primary" @click="topPercentOpen = true">百分比顶距</Button>
  <Button type="primary" @click="centeredOpen = true">垂直居中</Button>
</Space>

<Dialog v-model:open="topNumberOpen" title="60px 顶距标题" :top="60">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>
<Dialog v-model:open="topPercentOpen" title="20% 顶距标题" top="20%">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>
<Dialog v-model:open="centeredOpen" title="垂直居中标题" centered>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from 'vue-amazing-ui'
const topNumberOpen = ref(false)
const topPercentOpen = ref(false)
const centeredOpen = ref(false)
</script>
<template>
  <Space>
    <Button type="primary" @click="topNumberOpen = true">数值顶距</Button>
    <Button type="primary" @click="topPercentOpen = true">百分比顶距</Button>
    <Button type="primary" @click="centeredOpen = true">垂直居中</Button>
  </Space>
  <Dialog v-model:open="topNumberOpen" title="60px 顶距标题" :top="60">
    <p>Bla bla ...</p>
  </Dialog>
  <Dialog v-model:open="topPercentOpen" title="20% 顶距标题" top="20%">
    <p>Bla bla ...</p>
  </Dialog>
  <Dialog v-model:open="centeredOpen" title="垂直居中标题" centered>
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

::::

## 动画出现位置

_`transformOrigin: 'mouse'`（默认）时弹窗从鼠标点击位置展开，`'center'` 时从自身中心展开_

<br/>

<Space>
  <Button type="primary" @click="originMouseOpen = true">从鼠标位置展开（默认）</Button>
  <Button type="primary" @click="originCenterOpen = true">从中心展开</Button>
</Space>

<Dialog v-model:open="originMouseOpen" title="从鼠标位置展开" transform-origin="mouse">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>
<Dialog v-model:open="originCenterOpen" title="从中心展开" transform-origin="center">
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
  <p>Bla bla ...</p>
</Dialog>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from 'vue-amazing-ui'
const mouseOpen = ref(false)
const centerOpen = ref(false)
</script>
<template>
  <Space>
    <Button type="primary" @click="mouseOpen = true">从鼠标位置展开（默认）</Button>
    <Button type="primary" @click="centerOpen = true">从中心展开</Button>
  </Space>
  <Dialog v-model:open="mouseOpen" title="从鼠标位置展开" transform-origin="mouse">
    <p>Bla bla ...</p>
  </Dialog>
  <Dialog v-model:open="centerOpen" title="从中心展开" transform-origin="center">
    <p>Bla bla ...</p>
  </Dialog>
</template>
```

::::

## 异步关闭与阻止关闭

_命令式下 `onOk` / `onCancel` 返回 `false` 或 `Promise` `reject` 时阻止关闭，其余情况（含 `Promise` `resolve`）自动关闭；返回 `Promise` 期间确定按钮保持 `loading` 且禁用，避免重复提交。声明式下确定按钮不自动关闭，异步提交请配合 `confirmLoading` 并在 `@ok` 中自行关闭，见 [声明式用法](#声明式用法)_

<br/>

<Space>
  <Button type="primary" @click="onAsyncOk">异步关闭（自动）</Button>
  <Button type="primary" @click="onRejectOk">阻止关闭（失败）</Button>
  <Button type="primary" @click="onPreventOk">阻止关闭（同步）</Button>
  <Button type="primary" @click="onPreventCancel">阻止取消</Button>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { useDialog, useMessage } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
// onOk 返回 Promise：resolve 后自动关闭，期间按钮保持 loading 且禁用
function onAsyncOk() {
  dialog.open({
    title: '确认提交这些项？',
    content: '点击确定后等待 1.5s，Promise resolve 后自动关闭。',
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
function onRejectOk() {
  dialog.open({
    title: '确认删除这些项？',
    content: '点击确定后服务端校验失败，Promise reject 并阻止关闭。',
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
function onPreventOk() {
  let submitted = false
  dialog.open({
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
function onPreventCancel() {
  dialog.open({
    title: '取消时阻止关闭',
    content: '点击遮罩、按下 Esc 或点击「取消」都会被阻止，只有「确定」可关闭。',
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
    <Button type="primary" @click="onAsyncOk">异步关闭（自动）</Button>
    <Button type="primary" @click="onRejectOk">阻止关闭（失败）</Button>
    <Button type="primary" @click="onPreventOk">阻止关闭（同步）</Button>
    <Button type="primary" @click="onPreventCancel">阻止取消</Button>
  </Space>
</template>
```

::::

## 原地更新

_`update` 可更新 `DialogOptions` 的全部属性，另支持 `loading`（手动驱动确定按钮 `loading`，供外部异步流程控制）_

<br/>

<Button type="primary" @click="onProgressSave">异步保存</Button>

:::: details Show Code

```vue
<script setup lang="ts">
import { h, onBeforeUnmount, ref } from 'vue'
import { Button, useDialog, useMessage } from 'vue-amazing-ui'
import type { DialogUpdate } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
// 页面级定时器统一登记，卸载时清理，避免组件销毁后仍在跑
const timers: number[] = []
function onProgressSave() {
  const percent = ref(0)
  const handle = dialog.open({
    title: '正在保存草稿',
    // content 传渲染函数：内部引用响应式 percent，进度变化时弹窗内容自动更新
    content: () =>
      h('span', { style: 'white-space: nowrap' }, [
        '正在保存草稿...',
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
    okText: '保存中…',
    // 保存未完成时阻止关闭
    onOk: () => {
      message.warning('保存完成前不可关闭')
      return false
    },
    onCancel: () => {
      message.warning('保存完成前不可取消')
      return false
    }
  })
  // update 支持 loading：手动驱动按钮 loading
  handle.update({ loading: true })
  const timer = window.setInterval(() => {
    percent.value += 5
    if (percent.value < 100) {
      return
    }
    clearInterval(timer)
    // update 支持 DialogOptions 的全部属性 + loading，可一次性重设标题、内容、按钮文案与回调
    const doneOptions: DialogUpdate = {
      title: '保存完成',
      content: '草稿已保存，update() 已把标题、内容、按钮文案与 loading 一并更新。',
      loading: false,
      // footer 传渲染函数接管底部，只保留「知道了」按钮
      footer: () =>
        h('div', { style: 'display: flex; justify-content: flex-end; gap: 8px' }, [
          h(Button, { type: 'primary', onClick: () => handle.destroy() }, { default: () => '知道了' })
        ])
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
  <Button type="primary" @click="onProgressSave">异步保存</Button>
</template>
```

::::

## 多实例层叠

_连续调用依次入栈，各实例按自身 `zIndex` 分层（遮罩取 `zIndex`，弹窗取 `zIndex + 10`）；点击遮罩只关闭栈顶，`destroyAll()` 关闭并销毁全部_

<br/>

<Space>
  <Button type="primary" @click="onStackDialog">开启 3 层弹窗</Button>
  <Button type="danger" @click="onDestroyAllDialogs">开启 3 层并 2 秒后全部销毁</Button>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { useDialog, useMessage } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
const timers: number[] = []
// 遮罩会挡住页面，弹窗打开后无法再点击页面按钮，故一次点击开启多层以便观察层叠与逐层关闭
function openStackLayers(content: string) {
  for (let layer = 1; layer <= 3; layer += 1) {
    dialog.open({
      title: `第 ${layer} 层弹窗`,
      content,
      zIndex: 1000 + layer * 20,
      maskClosable: true
    })
  }
}
function onStackDialog() {
  openStackLayers('点击遮罩或「确定」只关闭栈顶弹窗；各实例按自身 zIndex 分层（遮罩取 zIndex，弹窗取 zIndex + 10）。')
}
// destroyAll 同样无法在弹窗打开后从页面触发，故开启多层后用定时器演示一次性全部销毁
function onDestroyAllDialogs() {
  openStackLayers('2s 后 destroyAll() 会一次性关闭并销毁全部弹窗。')
  timers.push(
    window.setTimeout(() => {
      dialog.destroyAll()
      message.success('destroyAll：已关闭全部弹窗')
    }, 2000)
  )
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onStackDialog">开启 3 层弹窗</Button>
    <Button type="danger" @click="onDestroyAllDialogs">开启 3 层并 2 秒后全部销毁</Button>
  </Space>
</template>
```

::::

## 遮罩、键盘与滚动锁定

_命令式与声明式沿用同一套组件 `props` 默认值：`maskClosable: true`、`keyboard: true`、`blockScroll: true`，两种用法行为一致（声明式下直接在 `<Dialog>` 上写同名属性即可）。`maskClosable: false` 后点击遮罩不会关闭（`onMaskClick` 回调仍会触发）；`keyboard: false` 后 `Esc` 不会关闭（`onEsc` 回调仍会触发）；`blockScroll` 控制是否锁定背景滚动_

<br/>

<Space>
  <Button type="primary" @click="onNoMaskClose">禁止遮罩关闭</Button>
  <Button type="primary" @click="onNoKeyboard">禁用 Esc 关闭</Button>
  <Button type="primary" @click="onBlockScroll">锁定背景滚动</Button>
  <Button type="primary" @click="onNoBlockScroll">不锁定滚动</Button>
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { useDialog, useMessage } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
function onNoMaskClose() {
  dialog.open({
    title: '禁止遮罩关闭',
    content: '命令式调用沿用组件 props 的 maskClosable（默认 true），此处显式传 false；onMaskClick 回调仍会触发。',
    maskClosable: false,
    onMaskClick: () => message.info('onMaskClick 回调触发（但不会关闭）'),
    onOk: () => message.success('点击了「确定」'),
    onCancel: () => message.error('点击了「取消」/ Esc / 关闭按钮')
  })
}
// keyboard: false 禁用 Esc 关闭，但 onEsc 回调仍会触发
function onNoKeyboard() {
  dialog.open({
    title: '禁用 Esc 关闭',
    content: '按下 Esc 不会关闭弹窗，但 onEsc 回调仍会触发。',
    keyboard: false,
    onEsc: () => message.info('onEsc 回调触发，但已禁用 Esc 关闭')
  })
}
function onBlockScroll() {
  dialog.open({
    title: 'blockScroll: true（默认）',
    content: '打开时锁定背景滚动，此时滚动页面无效，全部关闭后自动解锁。'
  })
}
function onNoBlockScroll() {
  dialog.open({
    title: 'blockScroll: false',
    content: '不锁定背景滚动，可用滚轮滚动页面，与上一例对比即可看出差异。',
    blockScroll: false
  })
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onNoMaskClose">禁止遮罩关闭</Button>
    <Button type="primary" @click="onNoKeyboard">禁用 Esc 关闭</Button>
    <Button type="primary" @click="onBlockScroll">锁定背景滚动</Button>
    <Button type="priary" @click="onNoBlockScroll">不锁定滚动</Button>
  </Space>
</template>
```

::::

## 焦点管理

_`focusTriggerAfterClose` 控制关闭后是否把焦点归还触发元素；`autoFocusButton` 演示见上文「自定义遮罩和聚焦」，`closeFocusable` 演示见上文「关闭按钮」。注意：`Esc` 监听绑定在弹窗主体上，焦点移出弹窗（如 `mask: false` 时点击背景）后不再响应_

<br/>

<Button type="primary" @click="onNoFocusRestore">关闭不归还焦点</Button>

:::: details Show Code

```vue
<script setup lang="ts">
import { useDialog, useMessage } from 'vue-amazing-ui'
const dialog = useDialog()
const message = useMessage()
function onNoFocusRestore() {
  dialog.open({
    title: '关闭不归还焦点',
    content: '关闭后焦点不归还给触发按钮；默认 true 时会归还。',
    focusTriggerAfterClose: false,
    onOk: () => message.success('点击了「确定」')
  })
}
</script>
<template>
  <Button tpe="primary" @click="onNoFocusRestore">关闭不归还焦点</Button>
</template>
```

::::

## 可拖拽

_`draggable` 开启后标题栏为拖拽句柄，支持 `boolean` 与 `{ bounds: 'none' | 'window' }` 两种配置（默认限制在视口内）；全屏态下自动禁用拖拽_

<br/>

<Space>
  <Button type="primary" @click="onDraggableWindow">限制在视口内（默认）</Button>
  <Button type="primary" @click="onDraggableNone">不限制边界</Button>
  <Button type="primary" @click="dragOpen = true">声明式可拖拽</Button>
</Space>

<Dialog v-model:open="dragOpen" title="按住标题栏拖动我（声明式）" :width="640" dragable>
  <p>声明式用法下同样只需传 <code>draggable</code>，标题栏即为拖拽句柄。</p>
</Dialog>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, useDialog } from 'vue-amazing-ui'
const dialog = useDialog()
function onDraggableWindow() {
  dialog.open({
    title: '限制在视口内（默认）',
    width: 640,
    content: '按住标题栏拖动我，默认限制在视口内；切到全屏态后自动禁用拖拽。',
    switchFullscreen: true,
    draggable: true
  })
}
function onDraggableNone() {
  dialog.open({
    title: '不限制边界',
    width: 640,
    content: 'draggable: { bounds: "none" } 时弹窗可被拖出视口。',
    draggable: { bounds: 'none' }
  })
}
const open = ref(false)
</script>
<template>
  <Space>
    <Button type="primary" @click="onDraggableWindow">限制在视口内（默认）</Button>
    <Button type="primary" @click="onDraggableNone">不限制边界</Button>
    <Button type="primary" @click="open = true">声明式可拖拽</Button>
  </Space>
  <Dialog v-model:open="open" title="按住标题栏拖动我（声明式）" :width="640" draggable>
    <p>声明式用法同样只需传 <code>draggable</code>，标题栏即为拖拽句柄。</p>
  </Dialog>
</template>
```

::::

## 自定义挂载容器

_通过 `to` 指定 `Teleport` 的目标，默认挂载到 `body`。声明式用法下直接写在 `<Dialog>` 上（`<Dialog to="#container">`）；命令式用法下 `to` 属于 `Provider` 级配置，需在 `<DialogProvider>` 上设置，无法在 `open()` 中逐条传入，故在页面内局部嵌套 `<DialogProvider>` 演示。目标容器与组件位于同一组件树时，需等挂载完成后再渲染组件（`v-if` 延迟），`Teleport` 才能定位目标_

<br/>

<div id="dialog-to-container" class="dialog-to-container"></div>

<DialogProvider v-if="toReady" to="#dialog-to-container" @ready="toDialog = $event" />

<br/>

<Button type="primary" @click="onToDialog">挂载到指定容器</Button>

<style lang="less" scoped>
.dialog-to-container {
  position: relative;
  transform: translateZ(0); // 建立包含块，使内部 fixed 定位的蒙层与弹窗相对该容器定位
  max-width: 800px;
  height: 320px;
  margin-bottm: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
}
</style>

:::: details Show Code

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { DialogProvider } from 'vue-amazing-ui'
import type { DialogApi } from 'vue-amazing-ui'
// to 在命令式下为 Provider 级配置，无法逐条传入，故在页面局部嵌套 Provider 演示；@ready 可取到该 Provider 作用域内的 api（声明式用法下直接写 <Dialog to="...">）
const toDialog = ref<DialogApi>()
const toReady = ref(false)
// 目标容器与组件位于同一组件树，需等挂载完成（目标已插入文档）后再渲染组件，Teleport 才能定位到目标
onMounted(() => {
  toReady.value = true
})
function onToDialog() {
  toDialog.value?.open({
    title: '自定义挂载容器',
    content: '这个弹窗被挂载到下方虚线容器中'
  })
}
</script>
<template>
  <div id="dialog-to-container" class="dialog-to-container"></div>
  <DialogProvider v-if="toReady" to="#dialog-to-container" @ready="toDialog = $event" />
  <Button type="primary" @click="onToDialog">挂载到指定容器</Button>
</template>
<style lang="less" scoped>
.dialog-to-container {
  position: relative;
  transform: translateZ(0); // 建立包含块，使内部 fixed 定位的蒙层与弹窗相对该容器定位
  max-width: 800px;
  height: 320px;
  margin-bottom: 0px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
}
</style>
```

::::

## APIs

### Dialog

<br/>

_组件级配置属性：声明式用法下直接设置在 `<Dialog>` 上（推荐）；使用 `useDialog()` 时设置在 `<DialogProvider>` 上（会透传给内部 `Dialog`），两者等价。_

<br/>

_每次调用的个性化配置请参考 [DialogOptions Type](#dialogoptions-type)_

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| width | 对话框宽度，单位 `px` | string &#124; number | 520 |
| height | 对话框高度，单位 `px`，默认自适应内容高度；指定后内容超高在内容区内部滚动 | string &#124; number | 'auto' |
| title | 对话框标题，prop 支持 `string` / `VNode` / 渲染函数；插槽形态请用同名 `#title` 插槽 | string &#124; VNode &#124; (() => VNode) | undefined |
| titleClass | 自定义标题类名 | string | undefined |
| titleStyle | 自定义标题样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| content | 对话框内容，prop 支持 `string` / `VNode` / 渲染函数；插槽形态请用默认插槽 | string &#124; VNode &#124; (() => VNode) | undefined |
| contentClass | 自定义内容类名 | string | undefined |
| contentStyle | 自定义内容样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| scrollbarProps | 内容滚动条 `Scrollbar` 组件属性配置，参考 [Scrollbar Props](./scrollbar.md#scrollbar) | [ScrollbarProps](./scrollbar.md#scrollbar) | {} |
| bodyClass | 自定义弹窗卡片（`.dialog-body-wrap`）类名，用于定制背景 / 圆角 / 阴影等外观 | string | undefined |
| bodyStyle | 自定义弹窗卡片（`.dialog-body-wrap`）样式，用于定制背景 / 圆角 / 阴影等外观 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| cancelText | 取消按钮文字 | string | '取消' |
| cancelProps | 取消按钮 `props` 配置，参考 [Button Props](./button.md#button) | [ButtonProps](./button.md#button) | {} |
| okText | 确定按钮文字 | string | '确定' |
| okType | 确定按钮类型 | 'primary' &#124; 'danger' | 'primary' |
| okProps | 确认按钮 `props` 配置，优先级高于 `okType`，参考 [Button Props](./button.md#button) | [ButtonProps](./button.md#button) | {} |
| footer | 是否显示底部按钮区：`false` 隐藏，`true` 渲染内置按钮组，传函数则完全自定义；插槽形态请用 `#footer` | boolean &#124; (() => VNode) | true |
| closable | 是否显示右上角关闭按钮 | boolean | true |
| closeIcon | 自定义关闭图标，prop 支持 `VNode` / 渲染函数；插槽形态请用同名 `#closeIcon` 插槽（优先级高于该属性） | VNode &#124; (() => VNode) | undefined |
| closeFocusable | 关闭按钮是否可聚焦，设为 `false` 后关闭按钮 `tabindex` 为 `-1`，不参与 `Tab` 序列 | boolean | true |
| renderBeforeOpen | 首次打开前是否渲染内容（关闭懒渲染），仅声明式用法生效 | boolean | false |
| destroyOnClose | 关闭时是否销毁 `Dialog` 里的子元素；声明式默认 `false`（内容常驻），命令式默认 `true`（一次性实例，见 [DialogOptions Type](#dialogoptions-type)） | boolean | false |
| switchFullscreen | 是否允许切换全屏，允许后右上角会出现一个切换按钮 | boolean | false |
| centered | 是否水平垂直居中，否则固定高度水平居中 | boolean | false |
| top | 固定高度水平居中时，距顶部高度，仅当 `centered: false` 时生效，单位 `px` | string &#124; number | 100 |
| transformOrigin | 对话框动画出现的位置 | 'mouse' &#124; 'center' | 'mouse' |
| confirmLoading | 确定按钮 `loading`；声明式下需配合 `@ok` 自行将 `open` 置为 `false` | boolean | false |
| blockScroll | 是否在打开对话框时禁用背景滚动 | boolean | true |
| keyboard | 是否支持键盘 `Esc` 关闭。`Esc` 监听在弹窗主体上，焦点离开弹窗（如 `mask: false` 时点击背景）后不再响应 | boolean | true |
| mask | 是否展示遮罩，`false` 时背景可交互 | boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |
| maskClass | 自定义蒙层类名 | string | undefined |
| maskStyle | 自定义蒙层样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| zIndex | 对话框层级，遮罩取该值，弹窗取该值 `+ 10` | number | 1000 |
| wrapClass | 自定义外层容器（`.dialog-wrap`）类名，多实例同时打开时以打开中的实例为准 | string | undefined |
| wrapStyle | 自定义外层容器（`.dialog-wrap`）样式，多实例同时打开时以打开中的实例为准 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| containerClass | 自定义弹窗定位层（`.dialog-container`）类名，用于覆盖 `width` / `top` / `zIndex` 等定位表现 | string | undefined |
| containerStyle | 自定义弹窗定位层（`.dialog-container`）样式，优先级高于 `width` / `top` / `zIndex` 等内置样式；卡片外观（背景 / 圆角 / 阴影）请用 `bodyClass` / `bodyStyle` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| autoFocusButton | 打开时自动聚焦的按钮；`undefined`（默认）聚焦内容容器。`Esc` 监听绑定在弹窗主体上，需聚焦到弹窗内才响应 | 'ok' &#124; 'cancel' | undefined |
| focusTriggerAfterClose | 关闭后是否将焦点归还给触发元素 | boolean | true |
| draggable | 是否可拖拽，开启后标题栏为拖拽句柄，`{ bounds: 'none' }` 时不限制边界（默认限制在视口内） | boolean &#124; { bounds?: 'none' &#124; 'window' } | false |
| afterClose | 完全关闭（离场动画结束）后的回调 | () => void | undefined |
| onEsc | 按下 `Esc` 键的回调，无论是否允许关闭都会触发 | (e: KeyboardEvent) => void | undefined |
| onMaskClick | 点击遮罩的回调，无论是否允许关闭都会触发 | (e: MouseEvent) => void | undefined |
| open <Tag color="cyan">v-model</Tag> | 对话框是否可见，声明式用法下生效 | boolean | false |
| to | 容器 `Teleport` 的目标，可选：元素标签名（例如 `'body'`）或者元素本身 | string &#124; HTMLElement | 'body' |

> 多实例同时打开时，各实例按自身 `zIndex` 分层（遮罩取 `zIndex`，弹窗取 `zIndex + 10`）；外层容器的层级取栈中打开实例的最大 `zIndex`，`wrapClass` / `wrapStyle` 以打开中的实例为准。

### DialogOptions Type

<br/>

_`useDialog().open()` 的配置项，字段与 [Dialog Props](#dialog) 基本一致，以下属性均具有更高优先级（覆盖组件级配置）_

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| width? | 对话框宽度，单位 `px` | string &#124; number | undefined |
| height? | 对话框高度，单位 `px`，默认自适应内容高度 | string &#124; number | undefined |
| title? | 对话框标题 | string &#124; VNode &#124; (() => VNode) | undefined |
| titleClass? | 自定义标题类名 | string | undefined |
| titleStyle? | 自定义标题样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| content? | 对话框内容 | string &#124; VNode &#124; (() => VNode) | undefined |
| contentClass? | 自定义内容类名 | string | undefined |
| contentStyle? | 自定义内容样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| scrollbarProps? | 内容滚动条 `Scrollbar` 组件属性配置 | [ScrollbarProps](./scrollbar.md#scrollbar) | undefined |
| bodyClass? | 自定义弹窗卡片（`.dialog-body-wrap`）类名，用于定制背景 / 圆角 / 阴影等外观 | string | undefined |
| bodyStyle? | 自定义弹窗卡片（`.dialog-body-wrap`）样式，用于定制背景 / 圆角 / 阴影等外观 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| cancelText? | 取消按钮文字 | string | undefined |
| cancelProps? | 取消按钮 `props` 配置，参考 [Button Props](./button.md#button) | [ButtonProps](./button.md#button) | undefined |
| okText? | 确定按钮文字 | string | undefined |
| okType? | 确定按钮类型 | 'primary' &#124; 'danger' | undefined |
| okProps? | 确认按钮 `props` 配置，优先级高于 `okType`，参考 [Button Props](./button.md#button) | [ButtonProps](./button.md#button) | undefined |
| footer? | 底部区域，`false` 隐藏，函数则完全自定义 | boolean &#124; (() => VNode) | undefined |
| closable? | 是否显示右上角关闭按钮 | boolean | undefined |
| closeIcon? | 自定义关闭图标 | VNode &#124; (() => VNode) | undefined |
| closeFocusable? | 关闭按钮是否可聚焦，设为 `false` 后不参与 `Tab` 序列 | boolean | undefined |
| destroyOnClose? | 关闭时是否销毁 `Dialog` 里的子元素，**命令式默认 `true`**（一次性实例，关闭即从栈中移除）；需保留内容复用时显式传 `false` | boolean | true |
| switchFullscreen? | 是否允许切换全屏，允许后右上角会出现一个切换按钮 | boolean | undefined |
| centered? | 是否水平垂直居中，否则固定高度水平居中 | boolean | undefined |
| top? | 固定高度水平居中时，距顶部高度，仅当 `centered: false` 时生效，单位 `px` | string &#124; number | undefined |
| transformOrigin? | 对话框动画出现的位置 | 'mouse' &#124; 'center' | undefined |
| blockScroll? | 是否在打开对话框时禁用背景滚动 | boolean | undefined |
| keyboard? | 是否支持键盘 `Esc` 关闭 | boolean | undefined |
| mask? | 是否展示遮罩 | boolean | undefined |
| maskClosable? | 点击蒙层是否允许关闭 | boolean | undefined |
| maskClass? | 自定义蒙层类名 | string | undefined |
| maskStyle? | 自定义蒙层样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| zIndex? | 对话框层级，遮罩取该值，弹窗取该值 `+ 10` | number | undefined |
| wrapClass? | 自定义外层容器（`.dialog-wrap`）类名 | string | undefined |
| wrapStyle? | 自定义外层容器（`.dialog-wrap`）样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| containerClass? | 自定义弹窗定位层（`.dialog-container`）类名，用于覆盖 `width` / `top` / `zIndex` 等定位表现 | string | undefined |
| containerStyle? | 自定义弹窗定位层（`.dialog-container`）样式；卡片外观（背景 / 圆角 / 阴影）请用 `bodyClass` / `bodyStyle` | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| autoFocusButton? | 打开时自动聚焦的按钮；`undefined`（默认）聚焦内容容器 | 'ok' &#124; 'cancel' | undefined |
| focusTriggerAfterClose? | 关闭后是否将焦点归还给触发元素 | boolean | undefined |
| draggable? | 是否可拖拽，开启后标题栏为拖拽句柄 | boolean &#124; { bounds?: 'none' &#124; 'window' } | undefined |
| afterClose? | 完全关闭（离场动画结束）后的回调 | () => void | undefined |
| onEsc? | 按下 `Esc` 键的回调，无论是否允许关闭都会触发 | (e: KeyboardEvent) => void | undefined |
| onMaskClick? | 点击遮罩的回调，无论是否允许关闭都会触发 | (e: MouseEvent) => void | undefined |
| onOk? | 点击确定按钮的回调，返回 `false` 或 `Promise` `reject` 时阻止关闭，其余情况（含 `Promise` `resolve`）自动关闭并自动维护 `loading` | () => unknown &#124; Promise&lt;unknown&gt; | undefined |
| onCancel? | 点击遮罩 / `Esc` 键 / 关闭按钮 / 取消按钮的回调，返回 `false` 或 `Promise` `reject` 时阻止关闭 | () => unknown &#124; Promise&lt;unknown&gt; | undefined |

> 命令式配置中不含 `open`、`confirmLoading`、`renderBeforeOpen` 与 `to`：前者由 `open()` 自身驱动；`confirmLoading` 无法逐条传入，但组件级 `confirmLoading` 会作为实例的初始 `loading`（随后由实例内部的 `loading` 自动维护，也可通过 `update({ loading })` 覆盖）；`renderBeforeOpen` 仅声明式用法生效；`to` 为 `Provider` 级配置，需通过 `<DialogProvider to="...">` 设置。

### DialogUpdate Type

<br/>

_`DialogReactive.update()` 的配置项，字段与 [DialogOptions](#dialogoptions-type) 一致，另支持：_

| 参数 | 说明 | 类型 |
| :-- | :-- | :-- |
| loading? | 手动控制确定按钮的 `loading`，供外部异步流程驱动；与 `onOk` 返回 `Promise` 时的自动 `loading` 取或值 | boolean |

> 其余字段与 [DialogOptions](#dialogoptions-type) 一致；`update()` 可更新 `DialogOptions` 的全部属性，显式传 `undefined` 可将对应配置重置回组件 `Props` 默认值。

## Slots

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| title | 自定义标题 | v-slot:title |
| default | 自定义内容 | v-slot:default |
| footer | 自定义底部内容，优先级低于 `footer` 渲染函数（均高于内置按钮组） | v-slot:footer |
| closeIcon | 自定义关闭图标，优先级高于 `closeIcon` 属性 | v-slot:closeIcon |

## Methods

_仅命令式调用需要（声明式用法通过 `v-model:open` 控制显隐，无需这些方法）：通过 `useDialog()` 调用，需在 `<DialogProvider>` 内部使用：_

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| open | 打开一个对话框，返回该实例的句柄 | (data: [DialogOptions](#dialogoptions-type)) => [DialogReactive](#dialogreactive-type) |
| destroyAll | 关闭并销毁所有由该 `Provider` 打开的对话框（含 `destroyOnClose: false` 的实例，其句柄后续 `show()` 将失效），逐实例走正常关闭流程以保留离场动画 | () => void |

### DialogReactive Type

<br/>

_单个弹窗的句柄，由 `useDialog().open()` 或 `<Dialog>` / `<DialogProvider>` 的 `@ready` 事件获取：_

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| key | 该弹窗的唯一标识（只读） | string |
| destroy | 关闭该弹窗 | () => void |
| update | 更新该弹窗配置 | (options: [DialogUpdate](#dialogupdate-type)) => void |
| show | 重新打开该弹窗；实例已被销毁（`destroyOnClose: true` 且离场结束）时调用无效 | () => void |

## Events

_`ok` / `cancel` / `change` / `ready` 为 `<Dialog>` 与 `<DialogProvider>` 组件的事件（需通过组件标签监听）；使用 `useDialog()` 时，请在调用参数中使用 `onOk` / `onCancel` 等回调。_

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| ready | 内部 `Dialog` 挂载完成后派发，参数为该实例的 api，供 `<DialogProvider>` 取用 | (api: { open: (data: [DialogOptions](#dialogoptions-type)) => [DialogReactive](#dialogreactive-type); destroyAll: () => void }) => void |
| cancel | 点击蒙层或 `Esc` 键或右上角关闭按钮或取消按钮的回调 | (e?: Event) => void |
| ok | 点击确定按钮的回调；声明式下**不自动关闭**，需自行将 `v-model:open` 置为 `false`；命令式下回调结束后自动关闭 | (e?: MouseEvent) => void |
| change | 弹窗开关状态变化的回调，命令式与声明式实例均会触发，多实例下携带该实例 `key` | (open: boolean, key: string) => void |
| update:open | 声明式用法下 `v-model:open` 对应的更新事件 | (open: boolean) => void |

> 点击「确定」只派发 `ok`，关闭与否由 `v-model:open` 决定；点击「取消」/ 遮罩 / `Esc` / 关闭按钮则自动回写 `false`。

## 在 setup 外使用

_模板之外的场景（路由守卫、`axios` 拦截器、`Pinia action` 等）无法书写 `<Dialog>`，只能走命令式调用：先拿到 api，再在任意位置编程式打开_

### 选择 1：`createDiscreteApi()`（脱离组件树）

<br/>

_适用于 `axios` 拦截器、路由守卫、`Pinia action` 等任意位置：内部会创建一个独立的应用实，因此可在任意位置调用，无需外层 `DialogProvider`，其 `dialog` 与 `useDialog()` 返回的实例完全一致_

:::: tip 注意

- 主题会随 `ConfigProvider` 自动同步，无需手工传入
- 每次调用都会创建一套独立实例（独立的容器与弹窗栈），建议缓存返回值复用，避免重复创建；不再使用时可通过返回的 `dispose()` 销毁该实例
- 内部会访问 `document`，`SSR` 场景请在客户端（点击回调、`onMounted` ）中调用
- 不建议与 `useDialog()` 在同一 App 中混用：两者各自持有独立的弹窗栈与挂载容器，`zIndex` 层级互不感知

::::

```ts
import { createDiscreteApi } from 'vue-amazing-ui'

const { dialog } = createDiscreteApi(['dialog'])

// 例：路由守卫中离开页面前二次确认
router.beforeEach((to, from, next) => {
  if (to.meta.needConfirm) {
    dialog.open({
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

<br/>

<Button type="primary" @click="onDiscreteDilog">Discrete Dialog（脱离组件树调用）</Button>

### 选择 2：挂载到 `window`（复用组件树内实例）

:::: warning 注意

如果你想在 `setup` 外使用 `dialog`，要在顶层 setup` 中把 `useDialog()` 返回的实例挂载到 `window` 下然后再调用，调用前需要确保实例已经挂载成功。

::::

:::: tip App.vue

```vue
<script setup lang="ts">
import { DialogProvider } from 'vue-amazing-ui'
</script>
<template
  <DalogProvider>
    <Content />
  </DialogProvider>
</template>
```

::::

:::: tip content.vue（`<DialogProvider>` 内的顶层组件）

```vue
<script setup lang="ts">
import { useDialog } from 'vue-amazing-ui'

// 挂载到 windo 后，即可任意非组件环境（工具函数、事件监听等）中调用
window.$dialog = useDialog()
</script>
```

::::

:::: tip XXX.ts（任意 .ts 文件）

```ts
// 需确保已在顶层 setup 中执行了 window.$dialog = useDialog(
windw.$dialog?.open({
  title: '确认操作',
  content: '确定要执行该操作吗？'
})
```

::::

:::: tip 可选：为 `window.$dialog` 补充 `TypeScript` 类型声明

```ts
// types/global.d.ts
import type { DialogApi } from 'vue-amazing-ui'

declare global {
  interface Window {
    $dialog?: DialogApi
  }
}
```

::::