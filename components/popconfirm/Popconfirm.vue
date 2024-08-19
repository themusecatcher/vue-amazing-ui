<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import Button from '../button'
interface Props {
  title?: string // 确认框的标题 string | slot
  description?: string // 确认框的内容描述 string | slot
  content?: string // 展示的文本 string | slot
  icon?: string // 自定义弹出确认框 Icon 图标 string | slot
  iconType?: 'success' | 'info' | 'warning' | 'error' // 弹出确认框 Icon 图标类型
  maxWidth?: string | number // 弹出确认框内容最大宽度
  cancelText?: string // 取消按钮文字 string | slot
  cancelType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 取消按钮类型
  cancelProps?: object // 取消按钮 props，优先级高于 cancelType，参考 Button 组件 props
  okText?: string // 确认按钮文字 string | slot
  okType?: 'default' | 'reverse' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 确认按钮类型
  okProps?: object // 确认按钮 props，优先级高于 okType，参考 Button 组件 props
  showCancel?: boolean // 是否显示取消按钮
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  description: undefined,
  content: undefined,
  icon: undefined,
  iconType: 'warning',
  maxWidth: 'auto',
  cancelText: '取消',
  cancelType: 'default',
  cancelProps: () => ({}),
  okText: '确定',
  okType: 'primary',
  okProps: () => ({}),
  showCancel: true
})
const popMaxWidth = computed(() => {
  if (typeof props.maxWidth === 'number') {
    return props.maxWidth + 'px'
  }
  return props.maxWidth
})
const slots = useSlots()
const showDesc = computed(() => {
  const descriptionSlots = slots.description?.()
  return Boolean(descriptionSlots && descriptionSlots?.length) || props.description
})
const visible = ref(false)
const top = ref(0) // 提示框top定位
const left = ref(0) // 提示框left定位
const contentRef = ref() // 声明一个同名的模板引用
const popRef = ref() // 声明一个同名的模板引用
const emits = defineEmits(['cancel', 'ok', 'openChange'])
const activeBlur = ref(true) // 是否激活 blur 事件
function onEnter() {
  activeBlur.value = false
}
function onLeave() {
  activeBlur.value = true
  popRef.value.focus()
}
function onBlur() {
  visible.value = false
  emits('openChange', false)
}
function onOpen() {
  visible.value = !visible.value
  if (visible.value) {
    getPosition()
    popRef.value.focus()
  }
  emits('openChange', visible.value)
}
function getPosition() {
  const contentWidth = contentRef.value.offsetWidth // 展示文本宽度
  const popWidth = popRef.value.offsetWidth // 提示文本宽度
  const popHeight = popRef.value.offsetHeight // 提示文本高度
  top.value = popHeight + 4
  left.value = (popWidth - contentWidth) / 2
}
function onCancel(e: Event) {
  visible.value = false
  emits('openChange', false)
  emits('cancel', e)
}
function onOk(e: Event) {
  visible.value = false
  emits('openChange', false)
  emits('ok', e)
}
</script>
<template>
  <div
    class="m-popconfirm"
    @mouseenter="visible ? onEnter() : () => false"
    @mouseleave="visible ? onLeave() : () => false"
  >
    <div
      ref="popRef"
      tabindex="1"
      class="m-pop-content"
      :class="{ 'pop-visible': visible }"
      :style="`max-width: ${popMaxWidth}; transform-origin: 50% ${top}px; top: ${-top}px; left: ${-left}px;`"
      @blur="visible && activeBlur ? onBlur() : () => false"
      @keydown.esc="onCancel"
    >
      <div class="m-pop">
        <div class="m-pop-message">
          <span class="m-icon">
            <slot name="icon">
              <svg
                v-if="iconType === 'info'"
                class="u-icon icon-info"
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="64 64 896 896"
                data-icon="info-circle"
                aria-hidden="true"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
                ></path>
              </svg>
              <svg
                v-if="iconType === 'success'"
                class="u-icon icon-success"
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="64 64 896 896"
                data-icon="check-circle"
                aria-hidden="true"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                ></path>
              </svg>
              <svg
                v-if="iconType === 'error'"
                class="u-icon icon-error"
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="64 64 896 896"
                data-icon="close-circle"
                aria-hidden="true"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
                ></path>
              </svg>
              <svg
                v-if="iconType === 'warning'"
                class="u-icon icon-warning"
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="64 64 896 896"
                data-icon="exclamation-circle"
                aria-hidden="true"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
                ></path>
              </svg>
            </slot>
          </span>
          <div class="m-title" :class="{ 'font-weight': showDesc }">
            <slot name="title">{{ title }}</slot>
          </div>
        </div>
        <div class="m-pop-description" v-if="showDesc">
          <slot name="description">{{ description }}</slot>
        </div>
        <div class="m-pop-buttons">
          <Button v-if="showCancel" @click="onCancel" size="small" :type="cancelType" v-bind="cancelProps">
            <slot name="cancelText">{{ cancelText }}</slot>
          </Button>
          <Button @click="onOk" size="small" :type="okType" v-bind="okProps">
            <slot name="okText">{{ okText }}</slot>
          </Button>
        </div>
      </div>
      <div class="m-pop-arrow">
        <span class="u-pop-arrow"></span>
      </div>
    </div>
    <div ref="contentRef" @click="onOpen">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-popconfirm {
  position: relative;
  display: inline-block;
  .m-pop-content {
    position: absolute;
    z-index: 999;
    width: max-content;
    padding-bottom: 12px;
    pointer-events: none;
    transform: scale(0.8);
    opacity: 0;
    transition:
      transform 0.15s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      opacity 0.15s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    outline: none;
    .m-pop {
      min-width: 32px;
      min-height: 32px;
      padding: 12px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.88);
      line-height: 1.5714285714285714;
      text-align: start;
      text-decoration: none;
      word-break: break-all;
      cursor: auto;
      user-select: text;
      background-color: #fff;
      border-radius: 8px;
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
      .m-pop-message {
        position: relative;
        margin-bottom: 8px;
        font-size: 14px;
        display: flex;
        flex-wrap: nowrap;
        align-items: start;
        .m-icon {
          content: '';
          flex: none;
          line-height: 1;
          padding-top: 4px;
          display: inline-block;
          text-align: center;
          .u-icon {
            display: inline-block;
            line-height: 1;
          }
          .icon-info {
            color: @themeColor;
            fill: @themeColor;
          }
          .icon-success {
            color: #52c41a;
            fill: #52c41a;
          }
          .icon-warning {
            color: #faad14;
            fill: #faad14;
          }
          .icon-error {
            color: #ff4d4f;
            fill: #ff4d4f;
          }
        }
        .m-title {
          flex: auto;
          margin-inline-start: 8px;
        }
        .font-weight {
          font-weight: 600;
        }
      }
      .m-pop-description {
        position: relative;
        margin-inline-start: 22px;
        margin-bottom: 8px;
        font-size: 14px;
      }
      .m-pop-buttons {
        text-align: end;
        .m-btn {
          margin-inline-start: 8px;
        }
      }
    }
    .m-pop-arrow {
      position: absolute;
      z-index: 9;
      left: 50%;
      bottom: 12px;
      transform: translateX(-50%) translateY(100%) rotate(180deg);
      display: block;
      pointer-events: none;
      width: 16px;
      height: 16px;
      overflow: hidden;
      &::before {
        position: absolute;
        bottom: 0;
        inset-inline-start: 0;
        width: 16px;
        height: 8px;
        background-color: #fff;
        clip-path: path(
          'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
        );
        content: '';
      }
      &::after {
        position: absolute;
        width: 8.970562748477143px;
        height: 8.970562748477143px;
        bottom: 0;
        inset-inline: 0;
        margin: auto;
        border-radius: 0 0 2px 0;
        transform: translateY(50%) rotate(-135deg);
        box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
        z-index: 0;
        background: transparent;
        content: '';
      }
    }
  }
  .pop-visible {
    pointer-events: auto;
    transform: scale(1);
    opacity: 1;
  }
}
</style>
