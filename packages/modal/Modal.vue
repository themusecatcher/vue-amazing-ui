<script setup lang="ts">
import { ref, nextTick } from 'vue'
import Button from '../button'
interface Desc {
  title: string // 标题
  content: string // 内容
}
interface Props {
  width?: number // 提示框宽度，单位 px
  cancelText?: string // 取消按钮文字
  cancelProps?: object // 取消按钮 props 配置，参考 Button 组件 Props
  okText?: string // 确定按钮文字
  okType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 确认按钮类型
  okProps?: object // 确认按钮 props 配置，优先级高于 okType，参考 Button 组件 Props
  noticeText?: string // 通知按钮文字
  noticeProps?: object // 通知按钮 props 配置，参考 Button 组件 Props
  center?: boolean // 水平垂直居中：true  固定高度水平居中：false
  top?: number // 固定高度水平居中时，距顶部高度，仅当 center: false 时生效，单位 px
  loading?: boolean // 确定按钮 loading
  show?: boolean // 提示框是否可见
}
withDefaults(defineProps<Props>(), {
  width: 420,
  cancelText: '取消',
  cancelProps: () => ({}),
  okText: '确定',
  okType: 'primary',
  okProps: () => ({}),
  noticeText: '知道了',
  noticeProps: () => ({}),
  center: true,
  top: 100,
  loading: false,
  show: false
})
// 弹窗类型：'info' 'success' 'error' 'warning' 'confirm' 'erase'
const mode = ref('')
const desc = ref<Desc>()
const modalRef = ref() // DOM引用
const emits = defineEmits(['update:show', 'cancel', 'ok', 'know'])
function info(data: Desc) {
  mode.value = 'info'
  desc.value = data
  showModal()
}
function success(data: Desc) {
  mode.value = 'success'
  desc.value = data
  showModal()
}
function error(data: Desc) {
  mode.value = 'error'
  desc.value = data
  showModal()
}
function warning(data: Desc) {
  mode.value = 'warning'
  desc.value = data
  showModal()
}
function confirm(data: Desc) {
  mode.value = 'confirm'
  desc.value = data
  showModal()
}
function erase(data: Desc) {
  mode.value = 'erase'
  desc.value = data
  showModal()
}
function showModal() {
  emits('update:show', true)
  nextTick(() => {
    modalRef.value.focus()
  })
}
function onBlur() {
  emits('update:show', false)
  emits('cancel')
}
function onCancel() {
  emits('update:show', false)
  emits('cancel')
}
function onOK() {
  emits('ok')
}
function onKnow() {
  emits('update:show', false)
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
      <div v-show="show" class="m-modal-mask"></div>
    </Transition>
    <Transition name="zoom">
      <div v-show="show" class="m-modal-wrap" @click.self="onBlur">
        <div
          ref="modalRef"
          tabindex="-1"
          :class="['m-modal', center ? 'relative-hv-center' : 'top-center']"
          :style="`width: ${width}px; top: ${!center ? top + 'px' : '50%'};`"
          @keydown.esc="onCancel"
        >
          <div class="m-modal-body">
            <div class="m-body">
              <div class="m-title">
                <template v-if="mode === 'confirm' || mode === 'erase'">
                  <svg
                    class="u-icon icon-confirm"
                    focusable="false"
                    data-icon="exclamation-circle"
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
                </template>
                <svg
                  v-if="mode === 'info'"
                  class="u-icon icon-info"
                  focusable="false"
                  data-icon="info-circle"
                  aria-hidden="true"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
                  ></path>
                </svg>
                <svg
                  v-if="mode === 'success'"
                  class="u-icon icon-success"
                  focusable="false"
                  data-icon="check-circle"
                  aria-hidden="true"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                  ></path>
                </svg>
                <svg
                  v-if="mode === 'error'"
                  class="u-icon icon-error"
                  focusable="false"
                  data-icon="close-circle"
                  aria-hidden="true"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
                  ></path>
                </svg>
                <svg
                  v-if="mode === 'warning'"
                  class="u-icon icon-warning"
                  focusable="false"
                  data-icon="exclamation-circle"
                  aria-hidden="true"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
                  ></path>
                </svg>
                <div class="u-title">{{ desc?.title }}</div>
              </div>
              <div class="u-content">{{ desc?.content }}</div>
            </div>
            <div class="m-btns">
              <template v-if="mode === 'confirm' || mode === 'erase'">
                <Button class="mr8" @click="onCancel" v-bind="cancelProps">{{ cancelText }}</Button>
                <Button :type="okType" :loading="loading" v-bind="okProps" @click="onOK">{{ okText }}</Button>
              </template>
              <template v-if="['info', 'success', 'error', 'warning'].includes(mode)">
                <Button type="primary" :loading="loading" v-bind="noticeProps" @click="onKnow">{{ noticeText }}</Button>
              </template>
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
}
.m-modal-mask {
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
.m-modal-wrap {
  position: fixed;
  top: 0;
  inset-inline-end: 0;
  bottom: 0;
  inset-inline-start: 0;
  overflow: auto;
  outline: 0;
  inset: 0;
  z-index: 1010;
  .m-modal {
    width: 420px;
    margin: 0 auto;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    outline: none;
    .m-modal-body {
      position: relative;
      word-break: break-all;
      padding: 20px 24px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
      .m-body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .m-title {
          width: 100%;
          .u-icon {
            display: inline-block;
            margin-right: 12px;
            margin-top: 1px;
            width: 22px;
            height: 22px;
            vertical-align: top;
          }
          .icon-confirm {
            fill: #faad14;
          }
          .icon-info {
            fill: @themeColor;
          }
          .icon-success {
            fill: #52c41a;
          }
          .icon-error {
            fill: #ff4d4f;
          }
          .icon-warning {
            fill: #faad14;
          }
          .u-title {
            display: inline-block;
            vertical-align: top;
            font-size: 16px;
            line-height: 1.5;
            font-weight: 600;
            max-width: calc(100% - 34px);
          }
        }
        .u-content {
          flex-basis: 100%;
          margin-left: 34px;
          margin-top: 8px;
          font-size: 14px;
          max-width: calc(100% - 34px);
        }
      }
      .m-btns {
        margin-top: 12px;
        text-align: right;
        .mr8 {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
