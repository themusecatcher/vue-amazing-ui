<script setup lang="ts">
import { computed, defineComponent, h, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons-vue'
import { format } from 'date-fns'
import { Button, Switch, createDiscreteApi, useDialog, useMessage } from 'vue-amazing-ui'
import type { DialogApi, DialogReactive, DialogUpdate, DiscreteApiInstance } from 'vue-amazing-ui'
// 命令式调用入口：setup 内通过 useDialog() 获取 api，需外层存在 <DialogProvider>（本项目已在 App.vue 入口全局包裹）
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
const lastChange = ref<string | null>(null)
function onChange(open: boolean, key: string): void {
  lastChange.value = `open: ${open}，key: ${key}`
  message.info(`change 事件：open: ${open}，key: ${key}`)
}
function onDeclarativeOk(): void {
  // 确定按钮只派发 ok，关闭时机由使用者决定
  basicOpen.value = false
  message.success('点击了「确定」，已在 @ok 中手动关闭')
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
function onDeclarativeCancel(): void {
  message.warning('点击了「取消」/ 遮罩 / Esc / 关闭按钮，v-model:open 已自动同步为 false')
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
const ContentTimer = defineComponent({
  emits: ['tick'],
  setup(_, { emit }) {
    const elapsed = ref(0)
    const timer = window.setInterval(() => {
      elapsed.value += 1
      // 上报渲染时长，供页面级状态展示
      emit('tick', elapsed.value)
    }, 1000)
    onBeforeUnmount(() => {
      clearInterval(timer)
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
          h(Button, { type: 'primary', onClick: () => handle.destroy() }, { default: () => '知道了' })
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
// 未渲染时置灰，已变化时高亮，直观展示 change 事件
const changeText = computed(() => lastChange.value ?? '尚未触发 change')
const changeStyle = computed<CSSProperties>(() => ({
  fontSize: '20px',
  color: lastChange.value === null ? 'rgba(0, 0, 0, 0.45)' : '#1677ff'
}))
// Statistic 默认 24px 字号在卡片内偏大，统一收窄
const statisticValueStyle: CSSProperties = { fontSize: '20px' }
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
            <b>声明式 <code>&lt;Dialog v-model:open&gt;</code>（推荐）</b>：内容 / 表单直接写在模板插槽中，无需任何
            Provider，下方「基本使用」「声明式用法」等示例即为此种用法。<br />
          </p>
          <p>
            <b>命令式 <code>useDialog()</code></b
            >：在 <code>setup</code> 内编程式打开，需在应用入口 <code>App.vue</code> 用
            <code>&lt;DialogProvider&gt;</code> 包裹（本项目已在入口全局包裹），适合脱离模板的编程式场景。
          </p>
          <p>
            在 <code>setup</code> 之外（axios 拦截器、路由守卫、Pinia action 等）调用时，改用
            <code>createDiscreteApi(['dialog'])</code>，无需外层 Provider：
          </p>
          <Button type="primary" @click="onDiscreteDialog">Discrete Dialog（setup 外调用）</Button>
        </Space>
      </template>
    </Alert>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10">
      用 <code>v-model:open</code> 控制显隐；点击「取消」/ 遮罩 / <code>Esc</code> / 关闭按钮会自动回写
      <code>false</code>，点击「确定」只派发 <code>ok</code> 事件，需在回调中自行关闭。
    </p>
    <Button type="primary" @click="basicOpen = true">open dialog</Button>
    <Dialog v-model:open="basicOpen" title="声明式弹窗" @ok="onDeclarativeOk" @cancel="onDeclarativeCancel">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">声明式用法</h2>
    <p class="mb10">
      用 <code>v-model:open</code> 控制显隐，标题、内容、底部、关闭图标均可用插槽自定义；<code>change</code>
      事件在每次开关时触发，并携带该实例的 <code>key</code>。<br />
      <b>点击「确定」只派发 <code>ok</code> 事件、不自动关闭</b>，需在 <code>@ok</code> 中自行将 <code>open</code> 置为
      <code>false</code>；点击「取消」/ 遮罩 / <code>Esc</code> / 关闭按钮则自动回写 <code>false</code>。
    </p>
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
    <h2 class="mt30 mb10">命令式调用</h2>
    <p class="mb10">
      <code>dialog.open(options)</code> 立即打开一个弹窗并返回实例句柄，句柄提供 <code>key</code> /
      <code>destroy</code> / <code>update</code> / <code>show</code> 四个成员，可脱离模板做编程式控制。
    </p>
    <Space>
      <Button type="primary" @click="onBasicOpen">命令式打开弹窗</Button>
      <Button type="primary" @click="onHandleDialog">实例句柄（destroy / update / show）</Button>
    </Space>
    <h2 class="mt30 mb10">内容三种形态</h2>
    <p class="mb10">
      <code>content</code> / <code>title</code> 均支持 <code>string</code> / <code>VNode</code> /
      渲染函数三种形态，命令式与声明式一致（声明式下内容通常直接写进默认插槽，不必传 <code>content</code>）；
      渲染函数在每次渲染时调用，内部引用响应式数据即可让内容自动更新。
    </p>
    <Space>
      <Button type="primary" @click="onStringContent">字符串内容</Button>
      <Button type="primary" @click="onVNodeContent">VNode 内容</Button>
      <Button type="primary" @click="onRenderFnContent">渲染函数内容（响应式）</Button>
    </Space>
    <h2 class="mt30 mb10">内容保留、预渲染与关闭回调</h2>
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
    <h2 class="mt30 mb10">自定义宽高</h2>
    <Space>
      <Button type="primary" @click="onNumberWidth">数值宽度</Button>
      <Button type="primary" @click="onPercentWidth">百分比宽度</Button>
      <Button type="primary" @click="onFixedHeight">固定高度</Button>
    </Space>
    <h2 class="mt30 mb10">内容区高度与滚动</h2>
    <p class="mb10">
      <code>height</code> 作用于整个弹窗主体（含标题与底部按钮）：<code>auto</code> 时内容自然撑开，超高后整个弹框滚动；
      指定 <code>height</code> 后内容区内部滚动，标题与按钮固定可见。滚动条由内置 <code>Scrollbar</code> 接管，通过
      <code>scrollbarProps</code> 定制。
    </p>
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
    <h2 class="mt30 mb10">自定义样式</h2>
    <p class="mb10">
      Dialog 由 遮罩 → 定位层 → 卡片层 叠加而成：<code>maskStyle</code> 作用于遮罩； <code>containerClass</code> /
      <code>containerStyle</code> 作用于定位层（宽 / 顶距 / 层级）； <code>bodyClass</code> /
      <code>bodyStyle</code> 作用于卡片外观；<code>titleStyle</code> / <code>contentStyle</code> 作用于标题与正文。
    </p>
    <Space>
      <Button type="primary" @click="onCustomClass">自定义卡片类名</Button>
      <Button type="primary" @click="onBodyMaskStyle">自定义卡片与遮罩样式</Button>
      <Button type="primary" @click="onTitleContentStyle">自定义标题与内容样式</Button>
      <Button type="primary" @click="onContainerClass">自定义定位层类名</Button>
      <Button type="primary" @click="onContainerStyle">自定义定位层样式</Button>
    </Space>
    <h2 class="mt30 mb10">自定义遮罩和聚焦</h2>
    <p class="mb10">
      <code>mask: false</code> 可隐藏遮罩让背景可交互；<code>autoFocusButton</code> 控制打开后自动聚焦的按钮。
    </p>
    <Space>
      <Button type="primary" @click="onNoMask">无遮罩</Button>
      <Button type="primary" @click="onAutoFocusCancel">自动聚焦「取消」按钮</Button>
    </Space>
    <h2 class="mt30 mb10">自定义按钮</h2>
    <p class="mb10">
      <code>okProps</code> 优先级高于 <code>okType</code>：两者都传 <code>type</code> 时以 <code>okProps</code> 为准。
    </p>
    <Space>
      <Button type="primary" @click="onCustomBtns">按钮文案与类型</Button>
      <Button type="primary" @click="onDangerOk">危险操作</Button>
    </Space>
    <h2 class="mt30 mb10">自定义底部区域</h2>
    <Space>
      <Button type="primary" @click="onFooterRender">自定义底部渲染</Button>
      <Button type="primary" @click="onFooterless">无底部按钮</Button>
    </Space>
    <h2 class="mt30 mb10">关闭按钮</h2>
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
    <h2 class="mt30 mb10">切换全屏</h2>
    <p class="mb10">
      <code>switchFullscreen</code> 开启后右上角出现全屏切换按钮，切换后弹窗铺满视口；全屏态下自动禁用拖拽。
    </p>
    <Space>
      <Button type="primary" @click="fullscreenOpen = true">声明式切换全屏</Button>
      <Button type="primary" @click="onImperativeFullscreen">命令式切换全屏</Button>
    </Space>
    <Dialog v-model:open="fullscreenOpen" title="全屏切换演示" switch-fullscreen draggable>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Dialog>
    <h2 class="mt30 mb10">自定义位置</h2>
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
    <h2 class="mt30 mb10">动画出现位置</h2>
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
    <h2 class="mt30 mb10">异步关闭与阻止关闭</h2>
    <p class="mb10">
      命令式下 <code>onOk</code> / <code>onCancel</code> 返回 <code>false</code> 或 <code>Promise</code> reject
      时阻止关闭，其余情况（含 <code>Promise</code> resolve）自动关闭；返回 <code>Promise</code>
      期间确定按钮保持 loading 且禁用，避免重复提交。声明式下确定按钮不自动关闭，异步提交请配合
      <code>confirmLoading</code> 并在 <code>@ok</code> 中自行关闭，见上方「声明式用法」。
    </p>
    <Space>
      <Button type="primary" @click="onAsyncOk">异步关闭（自动）</Button>
      <Button type="primary" @click="onRejectOk">阻止关闭（失败）</Button>
      <Button type="primary" @click="onPreventOk">阻止关闭（同步）</Button>
      <Button type="primary" @click="onPreventCancel">阻止取消</Button>
    </Space>
    <h2 class="mt30 mb10">原地更新</h2>
    <p class="mb10">
      <code>update</code> 可更新 <code>DialogOptions</code> 的全部属性，另支持 <code>loading</code>（手动驱动按钮
      loading，供外部异步流程控制）。
    </p>
    <Button type="primary" @click="onProgressSave">异步保存</Button>
    <h2 class="mt30 mb10">多实例层叠</h2>
    <p class="mb10">
      连续调用依次入栈，各实例按自身 <code>zIndex</code> 分层（遮罩取 <code>zIndex</code>，弹窗取
      <code>zIndex + 10</code>）；点击遮罩只关闭栈顶，<code>destroyAll()</code> 关闭并销毁全部。
    </p>
    <Space>
      <Button type="primary" @click="onStackDialog">开启 3 层弹窗</Button>
      <Button type="danger" @click="onDestroyAllDialogs">开启 3 层并 2 秒后全部销毁</Button>
    </Space>
    <h2 class="mt30 mb10">遮罩、键盘与滚动锁定</h2>
    <Space>
      <Button type="primary" @click="onNoMaskClose">禁止遮罩关闭</Button>
      <Button type="primary" @click="onNoKeyboard">禁用 Esc 关闭</Button>
      <Button type="primary" @click="onBlockScroll">锁定背景滚动</Button>
      <Button type="primary" @click="onNoBlockScroll">不锁定滚动</Button>
    </Space>
    <h2 class="mt30 mb10">焦点管理</h2>
    <p class="mb10">
      <code>focusTriggerAfterClose</code> 控制关闭后是否把焦点归还触发元素，
      <code>closeFocusable</code> 控制右上角关闭按钮是否参与 <code>Tab</code> 序列。
    </p>
    <Space>
      <Button type="primary" @click="onNoFocusRestore">关闭不归还焦点</Button>
    </Space>
    <h2 class="mt30 mb10">可拖拽</h2>
    <p class="mb10">
      <code>draggable</code> 开启后标题栏为拖拽句柄，支持 <code>boolean</code> 与
      <code>{ bounds: 'window' | 'none' }</code> 两种配置；全屏态下自动禁用拖拽。
    </p>
    <Space>
      <Button type="primary" @click="onDraggableWindow">限制在视口内（默认）</Button>
      <Button type="primary" @click="onDraggableNone">不限制边界</Button>
      <Button type="primary" @click="dragOpen = true">声明式可拖拽</Button>
    </Space>
    <Dialog v-model:open="dragOpen" title="按住标题栏拖动我（声明式）" :width="640" draggable>
      <p>声明式用法下同样只需传 <code>draggable</code>，标题栏即为拖拽句柄。</p>
    </Dialog>
    <h2 class="mt30 mb10">自定义挂载容器</h2>
    <p class="mb10">
      通过 <code>to</code> 指定 <code>Teleport</code> 的目标，默认挂载到 <code>body</code>：声明式下直接写在
      <code>&lt;Dialog&gt;</code> 上，命令式下属于 Provider 级配置（需设在
      <code>&lt;DialogProvider&gt;</code> 上，无法逐条传入），故此处用局部 Provider 演示。下方虚线框即为挂载容器；
      目标容器与组件位于同一组件树时，需等挂载完成后再渲染组件（<code>v-if</code> 延迟），Teleport 才能定位目标。
    </p>
    <div id="dialog-to-container" class="teleport-container"></div>
    <DialogProvider v-if="toReady" to="#dialog-to-container" @ready="toDialog = $event" />
    <Button type="primary" @click="onToDialog">挂载到指定容器</Button>
  </div>
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
.teleport-container {
  position: relative;
  transform: translateZ(0); // 建立包含块，使内部 fixed 定位的蒙层与弹窗相对该容器定位
  max-width: 800px;
  height: 320px;
  margin-bottom: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
}
</style>
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
