<script setup lang="ts">
import { ref, computed, watch, watchEffect, nextTick, onMounted, onUnmounted } from 'vue'
import type { CSSProperties } from 'vue'
import Button from 'components/button'
export interface Props {
  width?: string | number // 对话框宽度，单位 px
  height?: string | number // 对话框高度，单位 px，默认自适应内容高度
  title?: string // 标题 string | slot
  titleStyle?: CSSProperties // 自定义标题样式
  content?: string // 内容 string | slot
  contentStyle?: CSSProperties // 自定义内容样式
  bodyClass?: string // 自定义 body 类名
  bodyStyle?: CSSProperties // 自定义 body 样式
  cancelText?: string // 取消按钮文字
  cancelProps?: object // 取消按钮 props 配置，参考 Button 组件 Props
  okText?: string // 确定按钮文字
  okType?: 'primary' | 'danger' // 确定按钮类型
  okProps?: object // 确认按钮 props 配置，优先级高于 okType，参考 Button 组件 Props
  footer?: boolean // 是否显示底部按钮 boolean | slot
  switchFullscreen?: boolean // 是否允许切换全屏，允许后右上角会出现一个切换按钮
  centered?: boolean // 是否水平垂直居中，否则固定高度水平居中
  top?: string | number // 固定高度水平居中时，距顶部高度，仅当 centered: false 时生效，单位 px
  transformOrigin?: 'mouse' | 'center' // 对话框动画出现的位置
  confirmLoading?: boolean // 确定按钮 loading
  blockScroll?: boolean // 是否在打开对话框时禁用背景滚动
  keyboard?: boolean // 是否支持键盘 esc 关闭
  maskClosable?: boolean // 点击蒙层是否允许关闭
  maskStyle?: CSSProperties // 自定义蒙层样式
  open?: boolean // 对话框是否可见
}
const props = withDefaults(defineProps<Props>(), {
  width: 520,
  height: 'auto',
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
  footer: true,
  switchFullscreen: false,
  centered: false,
  top: 100,
  transformOrigin: 'mouse',
  confirmLoading: false,
  blockScroll: true,
  keyboard: true,
  maskClosable: true,
  maskStyle: () => ({}),
  open: false
})
const dialogRef = ref() // dialog DOM 引用
const mousePosition = ref<{ x: number; y: number } | null>(null) // 鼠标点击位置
const dialogOpen = ref<boolean>()
const showDialogWrap = ref<boolean>()
const transformOrigin = ref<string>('50% 50%')
const fullscreen = ref<boolean>(false)
const emits = defineEmits(['update:open', 'cancel', 'ok'])
const dialogWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const dialogHeight = computed(() => {
  if (typeof props.height === 'number') {
    return `${props.height}px`
  }
  return props.height
})
const dialogTop = computed(() => {
  if (typeof props.top === 'number') {
    return `${props.top}px`
  }
  return props.top
})
const dialogStyle = computed(() => {
  if (fullscreen.value) {
    if (props.transformOrigin === 'mouse') {
      return {
        width: '100%',
        transformOrigin: `${mousePosition.value?.x}px ${mousePosition.value?.y}px`
      }
    } else {
      return {
        width: '100%',
        transformOrigin: transformOrigin.value
      }
    }
  } else {
    if (props.centered) {
      return {
        width: dialogWidth.value,
        transformOrigin: transformOrigin.value
      }
    } else {
      return {
        width: dialogWidth.value,
        transformOrigin: transformOrigin.value,
        top: dialogTop.value
      }
    }
  }
})
const dialogBodyStyle = computed(() => {
  if (fullscreen.value) {
    return {
      height: '100vh',
      ...props.bodyStyle
    }
  } else {
    return {
      height: dialogHeight.value,
      ...props.bodyStyle
    }
  }
})
watch(
  dialogOpen,
  async (to) => {
    if (to) {
      await nextTick()
      dialogRef.value.focus()
      if (props.blockScroll) {
        // 锁定滚动
        document.documentElement.style.overflowY = 'hidden'
        document.body.style.overflowY = 'hidden'
      }
    } else {
      if (props.blockScroll) {
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
  dialogOpen.value = props.open
})
onMounted(() => {
  document.addEventListener('click', getClickPosition, true) // 事件在捕获阶段执行
})
onUnmounted(() => {
  document.removeEventListener('click', getClickPosition, true)
})
function getClickPosition(e: MouseEvent) {
  if (!dialogOpen.value) {
    mousePosition.value = {
      x: e.clientX, // 相对于浏览器视口左上角的 X 坐标，不页面滚动而改变
      y: e.clientY // 相对于浏览器视口左上角的 Y 坐标，不页面滚动而改变
    }
  }
}
async function onBeforeEnter(el: Element) {
  showDialogWrap.value = true
  await nextTick()
  if (props.transformOrigin === 'mouse' && mousePosition.value) {
    const rect = el.getBoundingClientRect()
    transformOrigin.value = `${mousePosition.value.x - rect.left}px ${mousePosition.value.y - rect.top}px`
  } else {
    transformOrigin.value = '50% 50%'
  }
}
function onBeforeLeave(el: Element) {
  if (props.transformOrigin === 'mouse' && mousePosition.value) {
    const rect = el.getBoundingClientRect()
    transformOrigin.value = `${mousePosition.value.x - rect.left}px ${mousePosition.value.y - rect.top}px`
  } else {
    transformOrigin.value = '50% 50%'
  }
}
function onAfterLeave() {
  showDialogWrap.value = false
  // 重置全屏显示
  fullscreen.value = false
}
function onFullScreen() {
  fullscreen.value = !fullscreen.value
}
function onCancel() {
  dialogOpen.value = false
  emits('update:open', false)
  emits('cancel')
}
function onOk() {
  emits('ok')
}
</script>
<template>
  <div class="m-dialog-root">
    <Transition name="fade">
      <div v-show="dialogOpen" class="m-dialog-mask" :style="maskStyle"></div>
    </Transition>
    <div
      v-show="showDialogWrap"
      tabindex="-1"
      ref="dialogRef"
      class="m-dialog-wrap"
      :class="{ 'flex-centered': centered }"
      @click.self="props.maskClosable ? onCancel() : () => false"
      @keydown.esc="props.keyboard ? onCancel() : () => false"
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
        <div
          v-show="dialogOpen"
          class="m-dialog"
          :class="{ 'dialog-with-fullscreen': fullscreen }"
          :style="dialogStyle"
        >
          <div class="m-dialog-body-wrap" :class="bodyClass" :style="dialogBodyStyle">
            <div class="dialog-header" :class="{ 'header-with-switch': switchFullscreen }" :style="titleStyle">
              <slot name="title">{{ title }}</slot>
            </div>
            <span v-if="switchFullscreen" class="fullscreen-action" @click="onFullScreen">
              <svg
                v-show="!fullscreen"
                focusable="false"
                data-icon="fullscreen"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M290 236.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0013.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 000 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 00-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"
                ></path>
              </svg>
              <svg
                v-show="fullscreen"
                focusable="false"
                data-icon="fullscreen-exit"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 000 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 00391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 00-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"
                ></path>
              </svg>
            </span>
            <span class="close-action" @click="onCancel">
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="64 64 896 896"
                data-icon="close"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                ></path>
              </svg>
            </span>
            <div class="dialog-content" :style="contentStyle">
              <slot>{{ content }}</slot>
            </div>
            <div v-if="footer" class="dialog-footer">
              <slot name="footer">
                <Button class="mr8" @click="onCancel" v-bind="cancelProps">{{ cancelText }}</Button>
                <Button :type="okType" :loading="props.confirmLoading" @click="onOk" v-bind="okProps">{{
                  okText
                }}</Button>
              </slot>
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
.m-dialog-mask {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.45);
}
.m-dialog-wrap {
  position: fixed;
  inset: 0;
  overflow: auto;
  outline: 0;
  z-index: 1010;
  .m-dialog {
    position: relative;
    margin: 0 auto;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    width: auto;
    max-width: calc(100vw - 32px);
    padding-bottom: 24px;
    outline: none;
    .m-dialog-body-wrap {
      display: flex;
      flex-direction: column;
      position: relative;
      background-color: #fff;
      border-radius: 8px;
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
      padding: 20px 24px;
      .dialog-header {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.88);
        font-weight: 600;
        line-height: 1.5;
        word-break: break-all;
        background: transparent;
        border-radius: 8px 8px 0 0;
        margin-bottom: 8px;
        max-width: calc(100% - 24px);
      }
      .header-with-switch {
        max-width: calc(100% - 54px);
      }
      .fullscreen-action {
        .close-action();
        right: 48px;
      }
      .close-action {
        position: absolute;
        top: 20px;
        right: 18px;
        z-index: 1010;
        font-weight: 600;
        line-height: 1;
        background: transparent;
        border-radius: 4px;
        width: 22px;
        height: 22px;
        cursor: pointer;
        transition: background 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.45);
          fill: currentColor;
          transition: color 0.2s;
        }
        &:hover {
          background: rgba(0, 0, 0, 0.06);
          svg {
            color: rgba(0, 0, 0, 0.88);
          }
        }
      }
      .dialog-content {
        flex: 1;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.88);
        line-height: 1.5714285714285714;
        word-break: break-all;
        overflow: auto;
        transition: all 0.25s;
      }
      .dialog-footer {
        text-align: end;
        background: transparent;
        margin-top: 12px;
        .mr8 {
          margin-right: 8px;
        }
      }
    }
  }
  .dialog-with-fullscreen {
    max-width: 100%;
    padding-bottom: 0;
  }
}
.flex-centered {
  display: flex;
  justify-content: center;
  align-items: center;
  .m-dialog {
    padding-bottom: 0;
  }
}
</style>
