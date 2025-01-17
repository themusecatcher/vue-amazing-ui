<script setup lang="ts">
import { ref, computed, watch, watchEffect, onMounted, onUnmounted, nextTick } from 'vue'
import type { VNode, Slot, CSSProperties } from 'vue'
import Button from 'components/button'
export interface Props {
  width?: string | number // 模态框宽度，单位 px
  icon?: VNode | Slot // 自定义图标
  title?: string // 模态框标题 string | slot
  titleStyle?: CSSProperties // 自定义标题样式
  content?: string // 模态框内容 string | slot
  contentStyle?: CSSProperties // 自定义内容样式
  bodyClass?: string // 自定义 body 类名
  bodyStyle?: CSSProperties // 自定义 body 样式
  cancelText?: string // 取消按钮文字
  cancelProps?: object // 取消按钮 props 配置，参考 Button 组件 Props
  okText?: string // 确认按钮文字
  okType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 确认按钮类型
  okProps?: object // 确认按钮 props 配置，优先级高于 okType，参考 Button 组件 Props
  noticeText?: string // 通知按钮文字
  noticeProps?: object // 通知按钮 props 配置，参考 Button 组件 Props
  destroyOnClose?: boolean // 关闭时是否销毁 Modal 里的子元素
  centered?: boolean // 是否水平垂直居中，否则固定高度水平居中
  top?: string | number // 固定高度水平居中时，距顶部高度，仅当 center: false 时生效，单位 px
  transformOrigin?: 'mouse' | 'center' // 模态框动画出现的位置
  confirmLoading?: boolean // 确认按钮 loading
  blockScroll?: boolean // 是否在打开模态框时禁用背景滚动
  keyboard?: boolean // 是否支持键盘 esc 关闭
  maskClosable?: boolean // 点击蒙层是否允许关闭
  maskStyle?: CSSProperties // 自定义蒙层样式
}
const props = withDefaults(defineProps<Props>(), {
  width: 420,
  icon: undefined,
  title: undefined,
  titleStyle: () => ({}),
  content: undefined,
  contentStyle: () => ({}),
  bodyClass: undefined,
  bodyStyle: () => ({}),
  cancelText: '取消',
  cancelProps: () => ({}),
  okText: '确定',
  okType: 'primary',
  okProps: () => ({}),
  noticeText: '知道了',
  noticeProps: () => ({}),
  destroyOnClose: false,
  centered: false,
  top: 100,
  transformOrigin: 'mouse',
  confirmLoading: false,
  blockScroll: true,
  keyboard: true,
  maskClosable: true,
  maskStyle: () => ({})
})
export interface Modal {
  width?: string | number // 模态框宽度，单位 px
  icon?: VNode // 自定义图标
  title?: string // 模态框标题
  titleStyle?: CSSProperties // 自定义标题样式
  content?: string // 模态框内容
  contentStyle?: CSSProperties // 自定义内容样式
  bodyClass?: string // 自定义 body 类名
  bodyStyle?: CSSProperties // 自定义 body 样式
  cancelText?: string // 取消按钮文字
  cancelProps?: object // 取消按钮 props 配置，参考 Button 组件 Props
  okText?: string // 确认按钮文字
  okType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 确认按钮类型
  okProps?: object // 确认按钮 props 配置，优先级高于 okType，参考 Button 组件 Props
  noticeText?: string // 通知按钮文字
  noticeProps?: object // 通知按钮 props 配置，参考 Button 组件 Props
  destroyOnClose?: boolean // 关闭时是否销毁 Modal 里的子元素
  centered?: boolean // 是否水平垂直居中，否则固定高度水平居中
  top?: string | number // 固定高度水平居中时，距顶部高度，仅当 center: false 时生效，单位 px
  transformOrigin?: 'mouse' | 'center' // 模态框动画出现的位置
  blockScroll?: boolean // 是否在打开模态框时禁用背景滚动
  keyboard?: boolean // 是否支持键盘 esc 关闭
  maskClosable?: boolean // 点击蒙层是否允许关闭
  maskStyle?: CSSProperties // 自定义蒙层样式
  onKnow?: Function // 点击知道了按钮的回调
  onOk?: Function // 点击确认按钮的回调
  onCancel?: Function // 点击遮罩层或取消按钮的回调
}
const modalWrapRef = ref() // modal DOM 引用
const mousePosition = ref<{ x: number; y: number } | null>(null) // 鼠标点击位置
const modalOpen = ref<boolean>(false)
const showModalWrap = ref<boolean>(false)
const confirmBtnLoading = ref<boolean>(false)
const transformOrigin = ref<string>('50% 50%')
const modalData = ref<Modal>()
const modalMode = ref() // 弹窗类型：'info' 'success' 'error' 'warning' 'confirm' 'erase'
const emits = defineEmits(['update:open', 'cancel', 'ok', 'know'])
const modalWidth = computed(() => {
  const width = getComputedValue('width')
  return typeof width === 'number' ? `${width}px` : width
})
const modalTop = computed(() => {
  const top = getComputedValue('top')
  return typeof top === 'number' ? `${top}px` : top
})
const modalCentered = computed(() => {
  return getComputedValue('centered')
})
const modalStyle = computed(() => {
  if (modalCentered.value) {
    return {
      width: modalWidth.value,
      transformOrigin: transformOrigin.value
    } as CSSProperties
  } else {
    return {
      width: modalWidth.value,
      top: modalTop.value,
      transformOrigin: transformOrigin.value
    } as CSSProperties
  }
})
const modalTitleStyle = computed(() => {
  return getComputedValue('titleStyle') as CSSProperties
})
const modalContentStyle = computed(() => {
  return getComputedValue('contentStyle') as CSSProperties
})
const modalBodyClass = computed(() => {
  return getComputedValue('bodyClass')
})
const modalBodyStyle = computed(() => {
  return getComputedValue('bodyStyle') as CSSProperties
})
const modalMaskStyle = computed(() => {
  return getComputedValue('maskStyle') as CSSProperties
})
const modalIcon = computed(() => {
  return getComputedValue('icon')
})
const modalTitle = computed(() => {
  return getComputedValue('title')
})
const modalContent = computed(() => {
  return getComputedValue('content')
})
const modalCancelText = computed(() => {
  return getComputedValue('cancelText')
})
const modalCancelProps: object = computed(() => {
  return getComputedValue('cancelProps')
})
const modalOkType = computed(() => {
  return getComputedValue('okType') as 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link'
})
const modalOkText = computed(() => {
  return getComputedValue('okText')
})
const modalOkProps: object = computed(() => {
  return getComputedValue('okProps')
})
const modalNoticeText = computed(() => {
  return getComputedValue('noticeText')
})
const modalNoticeProps: object = computed(() => {
  return getComputedValue('noticeProps')
})
const modalDestroyOnClose = computed(() => {
  return getComputedValue('destroyOnClose')
})
watch(
  modalOpen,
  async (to) => {
    const blockScroll = getComputedValue('blockScroll')
    if (to) {
      await nextTick()
      modalWrapRef.value.focus()
      if (blockScroll) {
        // 锁定滚动
        document.documentElement.style.overflowY = 'hidden'
        document.body.style.overflowY = 'hidden'
      }
    } else {
      if (blockScroll) {
        // 解锁滚动
        document.documentElement.style.removeProperty('overflow-y')
        document.body.style.removeProperty('overflow-y')
      }
    }
  },
  {
    immediate: true
  }
)
watchEffect(() => {
  confirmBtnLoading.value = props.confirmLoading
})
onMounted(() => {
  document.addEventListener('click', getClickPosition, true) // 事件在捕获阶段执行
})
onUnmounted(() => {
  document.removeEventListener('click', getClickPosition, true)
})
function getClickPosition(e: MouseEvent) {
  if (!modalOpen.value) {
    mousePosition.value = {
      x: e.clientX, // 相对于浏览器视口左上角的 X 坐标，不页面滚动而改变
      y: e.clientY // 相对于浏览器视口左上角的 Y 坐标，不页面滚动而改变
    }
  }
}
async function onBeforeEnter(el: Element) {
  showModalWrap.value = true
  await nextTick()
  const transOrigin = getComputedValue('transformOrigin')
  if (transOrigin === 'mouse' && mousePosition.value) {
    const rect = el.getBoundingClientRect()
    transformOrigin.value = `${mousePosition.value.x - rect.left}px ${mousePosition.value.y - rect.top}px`
  } else {
    transformOrigin.value = '50% 50%'
  }
}
function onBeforeLeave(el: Element) {
  const transOrigin = getComputedValue('transformOrigin')
  if (transOrigin === 'mouse' && mousePosition.value) {
    const rect = el.getBoundingClientRect()
    transformOrigin.value = `${mousePosition.value.x - rect.left}px ${mousePosition.value.y - rect.top}px`
  } else {
    transformOrigin.value = '50% 50%'
  }
}
function onAfterLeave() {
  showModalWrap.value = false
}
function getComputedValue(key: keyof Props) {
  let computedValue = props[key as keyof Props]
  if (modalData.value?.[key as keyof Modal] !== undefined) {
    computedValue = modalData.value[key as keyof Modal]
  }
  return computedValue
}
function info(data: Modal) {
  modalMode.value = 'info'
  modalData.value = data
  openModal()
}
function success(data: Modal) {
  modalMode.value = 'success'
  modalData.value = data
  openModal()
}
function error(data: Modal) {
  modalMode.value = 'error'
  modalData.value = data
  openModal()
}
function warning(data: Modal) {
  modalMode.value = 'warning'
  modalData.value = data
  openModal()
}
function confirm(data: Modal) {
  modalMode.value = 'confirm'
  modalData.value = data
  openModal()
}
function erase(data: Modal) {
  modalMode.value = 'erase'
  modalData.value = data
  openModal()
}
function openModal() {
  modalOpen.value = true
  emits('update:open', true)
}
function onCancel() {
  modalData.value?.onCancel && modalData.value.onCancel()
  modalOpen.value = false
  emits('cancel')
}
async function onOK() {
  if (modalData.value?.onOk) {
    confirmBtnLoading.value = true
    await modalData.value.onOk()
    confirmBtnLoading.value = false
  }
  modalOpen.value = false
  emits('ok')
}
function onKnow() {
  modalData.value?.onKnow && modalData.value.onKnow()
  modalOpen.value = false
  emits('know')
}
defineExpose({
  info,
  success,
  error,
  warning,
  confirm,
  erase
})
</script>
<template>
  <div class="m-modal-root">
    <Transition name="fade">
      <div v-show="modalOpen" class="modal-mask" :style="modalMaskStyle"></div>
    </Transition>
    <div
      v-show="showModalWrap"
      tabindex="-1"
      ref="modalWrapRef"
      class="m-modal-wrap"
      :class="{ 'flex-centered': modalCentered }"
      @click.self="getComputedValue('maskClosable') ? onCancel() : () => false"
      @keydown.esc="getComputedValue('keyboard') ? onCancel() : () => false"
    >
      <Transition
        name="zoom"
        enter-from-class="zoom-enter"
        enter-active-class="zoom-enter"
        enter-to-class="zoom-enter zoom-enter-active"
        leave-from-class="zoom-leave"
        leave-active-class="zoom-leave zoom-leave-active"
        leave-to-class="zoom-leave zoom-leave-active"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
        @after-leave="onAfterLeave"
      >
        <div v-show="modalOpen" class="m-modal" :style="modalStyle">
          <div v-if="!modalDestroyOnClose" class="modal-body-wrap" :class="modalBodyClass" :style="modalBodyStyle">
            <div class="modal-body">
              <div
                class="modal-header"
                :class="{
                  [`icon-${modalMode}`]: ['info', 'success', 'error', 'warning', 'confirm', 'erase'].includes(modalMode)
                }"
              >
                <slot name="icon">
                  <component v-if="modalIcon" :is="modalIcon" class="icon-svg" />
                  <svg
                    v-else-if="modalMode === 'confirm' || modalMode === 'erase'"
                    class="icon-svg"
                    focusable="false"
                    data-icon="exclamation-circle"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                    ></path>
                    <path
                      d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="modalMode === 'info'"
                    class="icon-svg"
                    focusable="false"
                    data-icon="info-circle"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="modalMode === 'success'"
                    class="icon-svg"
                    focusable="false"
                    data-icon="check-circle"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="modalMode === 'error'"
                    class="icon-svg"
                    focusable="false"
                    data-icon="close-circle"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    fill-rule="evenodd"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="modalMode === 'warning'"
                    class="icon-svg"
                    focusable="false"
                    data-icon="exclamation-circle"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
                    ></path>
                  </svg>
                </slot>
                <div class="modal-title" :style="modalTitleStyle">
                  <slot name="title">{{ modalTitle }}</slot>
                </div>
              </div>
              <div class="modal-content" :style="modalContentStyle">
                <slot>{{ modalContent }}</slot>
              </div>
            </div>
            <div class="modal-btns">
              <template v-if="['confirm', 'erase'].includes(modalMode)">
                <Button class="mr8" @click="onCancel" v-bind="modalCancelProps">
                  {{ modalCancelText }}
                </Button>
                <Button :type="modalOkType" :loading="confirmBtnLoading" @click="onOK" v-bind="modalOkProps">
                  {{ modalOkText }}
                </Button>
              </template>
              <Button
                v-if="['info', 'success', 'error', 'warning'].includes(modalMode)"
                type="primary"
                :loading="confirmBtnLoading"
                @click="onKnow"
                v-bind="modalNoticeProps"
              >
                {{ modalNoticeText }}
              </Button>
            </div>
          </div>
          <div
            v-if="modalDestroyOnClose && modalOpen"
            class="modal-body-wrap"
            :class="modalBodyClass"
            :style="modalBodyStyle"
          >
            <div class="modal-body">
              <div
                class="modal-header"
                :class="{
                  [`icon-${modalMode}`]: ['info', 'success', 'error', 'warning', 'confirm', 'erase'].includes(modalMode)
                }"
              >
                <slot name="icon">
                  <component v-if="modalIcon" :is="modalIcon" class="icon-svg" />
                  <svg
                    v-else-if="modalMode === 'confirm' || modalMode === 'erase'"
                    class="icon-svg"
                    focusable="false"
                    data-icon="exclamation-circle"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                    ></path>
                    <path
                      d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="modalMode === 'info'"
                    class="icon-svg"
                    focusable="false"
                    data-icon="info-circle"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="modalMode === 'success'"
                    class="icon-svg"
                    focusable="false"
                    data-icon="check-circle"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="modalMode === 'error'"
                    class="icon-svg"
                    focusable="false"
                    data-icon="close-circle"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    fill-rule="evenodd"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="modalMode === 'warning'"
                    class="icon-svg"
                    focusable="false"
                    data-icon="exclamation-circle"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
                    ></path>
                  </svg>
                </slot>
                <div class="modal-title" :style="modalTitleStyle">
                  <slot name="title">{{ modalTitle }}</slot>
                </div>
              </div>
              <div class="modal-content" :style="modalContentStyle">
                <slot>{{ modalContent }}</slot>
              </div>
            </div>
            <div class="modal-btns">
              <template v-if="['confirm', 'erase'].includes(modalMode)">
                <Button class="mr8" @click="onCancel" v-bind="modalCancelProps">
                  {{ modalCancelText }}
                </Button>
                <Button :type="modalOkType" :loading="confirmBtnLoading" @click="onOK" v-bind="modalOkProps">
                  {{ modalOkText }}
                </Button>
              </template>
              <Button
                v-if="['info', 'success', 'error', 'warning'].includes(modalMode)"
                type="primary"
                :loading="confirmBtnLoading"
                @click="onKnow"
                v-bind="modalNoticeProps"
              >
                {{ modalNoticeText }}
              </Button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.zoom-enter {
  transform: none;
  opacity: 0;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
  animation-play-state: paused;
}
.zoom-enter-active {
  animation-name: zoomIn;
  animation-play-state: running;
  @keyframes zoomIn {
    0% {
      transform: scale(0.2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
}
.zoom-leave {
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
  animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.zoom-leave-active {
  animation-name: zoomOut;
  animation-play-state: running;
  @keyframes zoomOut {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.2);
      opacity: 0;
    }
  }
}
.modal-mask {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.45);
}
.m-modal-wrap {
  position: fixed;
  inset: 0;
  overflow: auto;
  outline: 0;
  z-index: 1010;
  .m-modal {
    position: relative;
    margin: 0 auto;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    padding-bottom: 24px;
    outline: none;
    .modal-body-wrap {
      position: relative;
      word-break: break-all;
      padding: 20px 24px;
      background-color: #fff;
      border-radius: 8px;
      width: auto;
      max-width: calc(100vw - 32px);
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
      .modal-body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .modal-header {
          display: flex;
          align-items: center;
          :deep(.icon-svg) {
            flex-shrink: 0;
            align-self: flex-start;
            display: inline-block;
            margin-right: 12px;
            margin-top: 1px;
            font-size: 22px;
            fill: currentColor;
          }
          .modal-title {
            display: inline-block;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.88);
            line-height: 1.5;
            font-weight: 600;
          }
          :deep(svg) {
            fill: currentColor;
          }
        }
        .icon-confirm,
        .icon-erase {
          color: #faad14;
        }
        .icon-info {
          color: @themeColor;
        }
        .icon-success {
          color: #52c41a;
        }
        .icon-error {
          color: #ff4d4f;
        }
        .icon-warning {
          color: #faad14;
        }
        .modal-content {
          flex-basis: 100%;
          margin-top: 8px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.88);
          margin-left: 34px;
          max-width: calc(100% - 34px);
        }
      }
      .modal-btns {
        margin-top: 12px;
        text-align: right;
        .mr8 {
          margin-right: 8px;
        }
      }
    }
  }
}
.flex-centered {
  display: flex;
  justify-content: center;
  align-items: center;
  .m-modal {
    padding-bottom: 0;
  }
}
</style>
