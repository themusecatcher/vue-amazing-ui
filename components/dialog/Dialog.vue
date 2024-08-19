<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import Button from '../button'
interface Props {
  title?: string // 标题 string | slot
  content?: string // 内容 string | slot
  width?: number // 对话框宽度，单位 px
  height?: number | string // 对话框高度，单位 px，默认 auto，自适应内容高度
  cancelText?: string // 取消按钮文字
  cancelProps?: object // 取消按钮 props 配置，参考 Button 组件 Props
  okText?: string // 确定按钮文字
  okType?: 'primary' | 'danger' // 确定按钮类型
  okProps?: object // 确认按钮 props 配置，优先级高于 okType，参考 Button 组件 Props
  bodyStyle?: CSSProperties // 设置对话框 body 样式
  footer?: boolean // 是否显示底部按钮 boolean | slot
  center?: boolean // 水平垂直居中：true  固定高度水平居中：false
  top?: number // 固定高度水平居中时，距顶部高度，仅当 center: false 时生效，单位 px
  switchFullscreen?: boolean // 是否允许切换全屏，允许后右上角会出现一个按钮
  loading?: boolean // 确定按钮 loading
  show?: boolean // 对话框是否可见
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  content: undefined,
  width: 540,
  height: 'auto',
  cancelText: '取消',
  cancelProps: () => ({}),
  okText: '确定',
  okType: 'primary',
  okProps: () => ({}),
  bodyStyle: () => ({}),
  footer: true,
  center: true,
  top: 100,
  switchFullscreen: false,
  loading: false,
  show: false
})
const fullScreen = ref(false)
const dialogHeight = computed(() => {
  if (typeof props.height === 'number') {
    return props.height + 'px'
  } else {
    return props.height
  }
})
const dialogRef = ref() // DOM 引用
watch(
  () => props.show,
  (to) => {
    if (to) {
      nextTick(() => {
        dialogRef.value.focus()
      })
      // 重置全屏显示
      fullScreen.value = false
    }
  }
)
const emits = defineEmits(['update:show', 'cancel', 'ok'])
function onBlur() {
  emits('update:show', false)
  emits('cancel')
}
function onFullScreen() {
  fullScreen.value = !fullScreen.value
}
function onClose() {
  emits('update:show', false)
  emits('cancel')
}
function onCancel() {
  emits('update:show', false)
  emits('cancel')
}
function onOk() {
  emits('ok')
}
</script>
<template>
  <div class="m-dialog-root">
    <Transition name="fade">
      <div v-show="show" class="m-dialog-mask"></div>
    </Transition>
    <Transition name="zoom">
      <div
        v-show="show"
        ref="dialogRef"
        tabindex="-1"
        class="m-dialog-wrap"
        @click.self="onBlur"
        @keydown.esc="onClose"
      >
        <div
          :class="['m-dialog', center ? 'relative-hv-center' : 'top-center']"
          :style="`width: ${fullScreen ? '100%' : props.width + 'px'}; top: ${center ? '50%' : fullScreen ? 0 : top + 'px'};`"
        >
          <div class="m-dialog-content" :style="`--height: ${fullScreen ? '100vh' : dialogHeight}`">
            <div class="m-dialog-header">
              <p class="u-head">
                <slot name="title">{{ title }}</slot>
              </p>
            </div>
            <span class="m-screen" @click="onFullScreen" v-if="switchFullscreen">
              <svg
                v-show="!fullScreen"
                class="u-svg"
                viewBox="64 64 896 896"
                data-icon="fullscreen"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"
                ></path>
              </svg>
              <svg
                v-show="fullScreen"
                class="u-svg"
                viewBox="64 64 896 896"
                data-icon="fullscreen-exit"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"
                ></path>
              </svg>
            </span>
            <span class="m-close" @click="onClose">
              <svg class="u-svg" viewBox="64 64 896 896" data-icon="close" aria-hidden="true" focusable="false">
                <path
                  d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                ></path>
              </svg>
            </span>
            <div class="m-dialog-body" :style="bodyStyle">
              <slot>{{ content }}</slot>
            </div>
            <div class="m-dialog-footer" v-if="footer">
              <slot name="footer">
                <Button class="mr8" @click="onCancel" v-bind="cancelProps">{{ cancelText }}</Button>
                <Button :type="okType" :loading="loading" @click="onOk" v-bind="okProps">{{ okText }}</Button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
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
.zoom-enter-active {
  transition: all 0.3s;
}
.zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.2);
}
.flex-hv-center {
  // 水平垂直居中方法①：弹性布局，随内容增大高度，并自适应水平垂直居中
  display: flex;
  justify-content: center;
  align-items: center;
}
.relative-hv-center {
  // 水平垂直居中方法②：相对定位，随内容增大高度，并自适应水平垂直居中
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.top-center {
  // 相对定位，固定高度，始终距离视图顶端100px
  position: relative;
  // top: 100px;
}
.m-dialog-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.45);
}
.m-dialog-wrap {
  position: fixed;
  top: 0;
  inset-inline-end: 0;
  bottom: 0;
  inset-inline-start: 0;
  overflow: auto;
  outline: 0;
  inset: 0;
  z-index: 1010;
  .m-dialog {
    margin: 0 auto;
    .m-dialog-content {
      display: flex;
      flex-direction: column;
      height: var(--height);
      position: relative;
      background-color: #fff;
      border-radius: 8px;
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
      padding: 20px 24px;
      .m-dialog-header {
        color: rgba(0, 0, 0, 0.88);
        background: transparent;
        border-radius: 8px 8px 0 0;
        margin-bottom: 8px;
        max-width: calc(100% - 54px);
        .u-head {
          margin: 0;
          color: rgba(0, 0, 0, 0.88);
          font-weight: 600;
          font-size: 16px;
          line-height: 1.5;
          word-break: break-all;
        }
      }
      .m-screen {
        .m-close();
        inset-inline-end: 48px;
      }
      .m-close {
        position: absolute;
        top: 17px;
        inset-inline-end: 17px;
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
        .u-svg {
          display: inline-block;
          width: 16px;
          height: 16px;
          line-height: 22px;
          fill: rgba(0, 0, 0, 0.45);
          cursor: pointer;
          transition: fill 0.2s;
        }
        &:hover {
          background: rgba(0, 0, 0, 0.06);
          .u-svg {
            fill: rgba(0, 0, 0, 0.88);
          }
        }
      }
      .m-dialog-body {
        flex: 1;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.88);
        line-height: 1.5714285714285714;
        word-break: break-all;
        overflow: auto;
        transition: all 0.25s;
      }
      .m-dialog-footer {
        text-align: end;
        background: transparent;
        margin-top: 12px;
        .mr8 {
          margin-inline-end: 8px;
        }
      }
    }
  }
}
</style>
