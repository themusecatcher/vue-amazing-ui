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
import { Button, Modal, ModalProvider, Switch, createDiscreteApi, useMessage, useModal } from 'vue-amazing-ui'
import type { DiscreteApiInstance, ModalApi, ModalReactive, ModalUpdate } from 'vue-amazing-ui'
// setup 内调用 useModal()：需外层存在 <ModalProvider>（本项目已在 App.vue 入口全局包裹）
const modal = useModal()
// 用于把各类回调结果反馈到页面上，避免只能看控制台
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
            本页示例在 <code>setup</code> 内通过 <code>useModal()</code> 获取 api，需在应用入口 <code>App.vue</code> 用
            <code>&lt;ModalProvider&gt;</code> 包裹（本项目已在入口全局包裹）。<br />
            在 <code>setup</code> 之外（axios 拦截器、路由守卫、Pinia action 等）调用时，改用
            <code>createDiscreteApi(['modal'])</code>，无需外层 Provider：
          </p>
          <Button type="primary" @click="onDiscreteModal">Discrete Modal（setup 外调用）</Button>
        </Space>
      </template>
    </Alert>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10">
      共有六种内置形态：<code>info</code> / <code>success</code> / <code>error</code> /
      <code>warning</code> 为单按钮（知道了），<code>confirm</code> / <code>erase</code> 为双按钮（取消 + 确定）。
    </p>
    <Space>
      <Button type="primary" @click="onInfo">Info</Button>
      <Button type="primary" @click="onSuccess">Success</Button>
      <Button type="primary" @click="onError">Error</Button>
      <Button type="primary" @click="onWarning">Warning</Button>
      <Button type="primary" @click="onConfirm">Confirm</Button>
      <Button type="primary" @click="onErase">Erase</Button>
    </Space>
    <h2 class="mt30 mb10">声明式用法</h2>
    <p class="mb10">
      用 <code>v-model:open</code> 控制显隐，标题、内容、底部均可用插槽自定义；<code>change</code>
      事件在每次开关时触发，并携带该实例的 <code>key</code>。
    </p>
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
    <h2 class="mt30 mb10">内容保留、预渲染与关闭回调</h2>
    <p class="mb10">
      命令式弹窗默认 <code>destroyOnClose: true</code>，关闭即销毁；声明式弹窗默认 <code>false</code>，关闭后保留内容。
      下面分三组演示内容保留、预渲染与关闭回调的差异。
    </p>

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
    <h2 class="mt30 mb10">内容区高度与滚动</h2>
    <Space>
      <Button type="primary" @click="onWholeScrollModal">整体弹框滚动</Button>
      <Button type="primary" @click="onInnerScrollModal">内容区内部滚动</Button>
      <Button type="primary" @click="onCustomScrollbarModal">自定义滚动条</Button>
    </Space>
    <h2 class="mt30 mb10">自定义宽度</h2>
    <Space>
      <Button type="primary" @click="onNumberWidthModal">数值宽度</Button>
      <Button type="primary" @click="onPercentWidthModal">百分比宽度</Button>
    </Space>
    <h2 class="mt30 mb10">自定义图标</h2>
    <Space>
      <Button type="primary" @click="onVNodeIconModal">VNode 图标</Button>
      <Button type="primary" @click="onRenderFnIconModal">渲染函数图标</Button>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Space>
      <Button type="primary" @click="onCustomClassModal">自定义内容样式类</Button>
      <Button type="primary" @click="onBodyMaskStyleModal">自定义内容与遮罩样式</Button>
      <Button type="primary" @click="onTitleContentStyleModal">自定义标题与内容样式</Button>
      <Button type="primary" @click="onContainerStyleModal">自定义容器样式</Button>
    </Space>
    <h2 class="mt30 mb10">自定义按钮</h2>
    <Space>
      <Button type="primary" @click="onNoticeBtnModal">自定义按钮文案</Button>
      <Button type="primary" @click="onConfirmBtnsModal">自定义确认按钮</Button>
      <Button type="primary" @click="onHideCancelModal">隐藏取消按钮</Button>
    </Space>
    <h2 class="mt30 mb10">自定义底部区域</h2>
    <Space>
      <Button type="primary" @click="onFooterRenderModal">自定义底部渲染</Button>
      <Button type="primary" @click="onFooterlessModal">无底部按钮</Button>
    </Space>
    <h2 class="mt30 mb10">完全自定义</h2>
    <Button type="primary" @click="onCreateModal">自定义模态框</Button>
    <h2 class="mt30 mb10">关闭按钮</h2>
    <Space>
      <Button type="primary" @click="onClosableModal">显示关闭按钮</Button>
      <Button type="primary" @click="onCustomCloseIconModal">自定义关闭图标</Button>
    </Space>
    <h2 class="mt30 mb10">自定义位置</h2>
    <Space>
      <Button type="primary" @click="onNumberTopModal">数值顶距</Button>
      <Button type="primary" @click="onPercentTopModal">百分比顶距</Button>
      <Button type="primary" @click="onCenteredModal">垂直居中</Button>
    </Space>
    <h2 class="mt30 mb10">动画出现位置</h2>
    <Space>
      <Button type="primary" @click="onMouseOriginModal">从鼠标位置展开（默认）</Button>
      <Button type="primary" @click="onCenterOriginModal">从中心展开</Button>
    </Space>
    <h2 class="mt30 mb10">异步关闭与阻止关闭</h2>
    <p class="mb10">
      <code>onOk</code> / <code>onKnow</code> / <code>onCancel</code> 返回 <code>false</code> 或
      <code>Promise</code> reject 时阻止关闭，其余情况（含 <code>Promise</code> resolve）自动关闭；返回
      <code>Promise</code> 期间按钮保持 loading。
    </p>
    <Space>
      <Button type="primary" @click="onAsyncOkModal">异步关闭（自动）</Button>
      <Button type="primary" @click="onRejectOkModal">阻止关闭（失败）</Button>
      <Button type="primary" @click="onPreventOkModal">阻止关闭（同步）</Button>
      <Button type="primary" @click="onPreventCancelModal">阻止取消</Button>
    </Space>
    <h2 class="mt30 mb10">原地更新</h2>
    <p class="mb10">
      <code>update</code> 可更新 <code>ModalOptions</code> 的全部属性，另支持
      <code>mode</code>（切换弹窗类型与内置按钮组）与 <code>loading</code>（手动驱动按钮 loading）。
    </p>
    <Button type="primary" @click="onProgressUpload">异步上传</Button>
    <h2 class="mt30 mb10">多实例层叠</h2>
    <p class="mb10">
      连续调用依次入栈，各实例按自身 <code>zIndex</code> 分层（遮罩取 <code>zIndex</code>，弹窗取
      <code>zIndex + 10</code>）；点击遮罩只关闭栈顶，<code>destroyAll()</code> 关闭并销毁全部。
    </p>
    <Space>
      <Button type="primary" @click="onStackModal">开启 3 层弹窗</Button>
      <Button type="danger" @click="onDestroyAllModals">开启 3 层并 2 秒后全部销毁</Button>
    </Space>
    <h2 class="mt30 mb10">遮罩、键盘与滚动锁定</h2>
    <p class="mb10">
      命令式调用默认 <code>maskClosable: false</code>、<code>keyboard: true</code>、<code>blockScroll: true</code>；
      <code>onMaskClick</code> / <code>onEsc</code> 无论是否允许关闭都会触发。
    </p>
    <Space>
      <Button type="primary" @click="onNoMaskModal">无遮罩</Button>
      <Button type="primary" @click="onMaskClosableModal">点击遮罩关闭</Button>
      <Button type="primary" @click="onNoKeyboardModal">禁用 Esc 关闭</Button>
      <Button type="primary" @click="onMaskEscCallbackModal">遮罩与 Esc 回调</Button>
      <Button type="primary" @click="onBlockScrollModal">锁定背景滚动</Button>
      <Button type="primary" @click="onNoBlockScrollModal">不锁定滚动</Button>
    </Space>
    <h2 class="mt30 mb10">焦点管理</h2>
    <p class="mb10">
      <code>autoFocusButton</code> 控制入场后自动聚焦的按钮，<code>trapFocus</code> 将
      <code>Tab</code> 焦点锁定在弹窗内循环， <code>focusTriggerAfterClose</code> 控制关闭后是否把焦点归还触发元素。
    </p>
    <Space>
      <Button type="primary" @click="onAutoFocusOkModal">聚焦确定按钮</Button>
      <Button type="primary" @click="onAutoFocusCancelModal">聚焦取消按钮</Button>
      <Button type="primary" @click="onAutoFocusNullModal">不自动聚焦</Button>
      <Button type="primary" @click="onNoTrapFocusModal">取消焦点陷阱</Button>
      <Button type="primary" @click="onNoFocusRestoreModal">关闭不归还焦点</Button>
    </Space>
    <h2 class="mt30 mb10">自定义渲染</h2>
    <p class="mb10">
      <code>modalRender</code> 可拿到默认内容节点 <code>originVNode</code>，包一层自定义容器即可叠加拖拽等增强能力；
      声明式用法下也可使用同名的 <code>#modalRender</code> 作用域插槽，属性优先级更高。
    </p>
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
        声明式用法下同样通过 <code>#modalRender</code> 作用域插槽拿到 <code>originVNode</code>， 外包一层
        <code>.draggable-modal</code> 容器并挂上 <code>v-drag-modal</code> 指令即可。
      </p>
    </Modal>
    <h2 class="mt30 mb10">自定义挂载容器 to</h2>
    <p class="mb10">
      通过 <code>to</code> 指定 <code>Teleport</code> 的目标，默认挂载到 <code>body</code>。下方虚线框即为挂载容器；
      目标容器与组件位于同一组件树时，需等挂载完成后再渲染组件（<code>v-if</code> 延迟），Teleport 才能定位目标。
    </p>
    <div id="modal-to-container" class="teleport-container"></div>
    <ModalProvider v-if="toReady" to="#modal-to-container" @ready="toModal = $event" />
    <Button type="primary" @click="onToModal">挂载到指定容器</Button>
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
.draggable-modal {
  .modal-header {
    cursor: move;
    user-select: none;
  }
}
</style>
