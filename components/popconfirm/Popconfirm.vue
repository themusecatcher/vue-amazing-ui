<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CSSProperties, VNode, Slot } from 'vue'
import Tooltip from '../tooltip'
import Button from '../button'
import { useSlotsExist } from '../utils'
export interface Props {
  title?: string // 弹出确认框的标题 string | slot
  titleStyle?: CSSProperties // 设置标题的样式
  description?: string // 弹出确认框的内容描述 string | slot
  descriptionStyle?: CSSProperties // 设置内容描述的样式
  keyboard?: boolean // 是否支持按键操作 (enter 显示；esc 关闭)
  tooltipStyle?: CSSProperties // 设置弹出提示的样式
  icon?: 'success' | 'info' | 'warning' | 'danger' | VNode | Slot // 自定义 Icon 图标，预置四种类型图标 string | VNode | slot
  iconStyle?: CSSProperties // 设置 Icon 图标的样式，一般不需要设置，主要用于自定义 Icon 图标时
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
  titleStyle: () => ({}),
  description: undefined,
  descriptionStyle: () => ({}),
  keyboard: true,
  tooltipStyle: () => ({}),
  icon: 'warning',
  iconStyle: () => ({}),
  cancelText: '取消',
  cancelType: 'default',
  cancelProps: () => ({}),
  okText: '确定',
  okType: 'primary',
  okProps: () => ({}),
  showCancel: true
})
const tooltipRef = ref() // Tooltip 组件模板引用
const emits = defineEmits(['cancel', 'ok'])
const slotsExist = useSlotsExist(['description'])
const showDesc = computed(() => {
  return slotsExist.description || props.description
})
function onCancel(e: Event) {
  emits('cancel', e)
  tooltipRef.value.hide()
}
function onOk(e: Event) {
  emits('ok', e)
  tooltipRef.value.hide()
}
</script>
<template>
  <Tooltip
    ref="tooltipRef"
    max-width="auto"
    bg-color="#fff"
    :tooltip-style="{
      padding: '12px',
      borderRadius: '8px',
      textAlign: 'start',
      ...tooltipStyle
    }"
    trigger="click"
    :keyboard="keyboard"
    :transition-duration="200"
    v-bind="$attrs"
  >
    <template #tooltip>
      <div class="m-popconfirm-message">
        <span class="m-popconfirm-icon" :style="iconStyle">
          <slot name="icon">
            <svg
              v-if="icon === 'info'"
              class="icon-info"
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
              v-else-if="icon === 'success'"
              class="icon-success"
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
              v-else-if="icon === 'danger'"
              class="icon-danger"
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
              v-else-if="icon === 'warning'"
              class="icon-warning"
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
            <component v-else-if="icon" :is="icon" />
          </slot>
        </span>
        <div class="popconfirm-title" :class="{ 'title-font-weight': showDesc }" :style="titleStyle">
          <slot name="title">{{ title }}</slot>
        </div>
      </div>
      <div v-if="showDesc" class="popconfirm-description" :style="descriptionStyle">
        <slot name="description">{{ description }}</slot>
      </div>
      <div class="popconfirm-buttons">
        <Button v-if="showCancel" size="small" :type="cancelType" @click="onCancel" v-bind="cancelProps">
          <slot name="cancelText">{{ cancelText }}</slot>
        </Button>
        <Button size="small" :type="okType" @click="onOk" v-bind="okProps">
          <slot name="okText">{{ okText }}</slot>
        </Button>
      </div>
    </template>
    <slot></slot>
  </Tooltip>
</template>
<style lang="less" scoped>
.m-popconfirm-message {
  position: relative;
  margin-bottom: 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  display: flex;
  flex-wrap: nowrap;
  align-items: start;
  .m-popconfirm-icon {
    flex: none;
    font-size: 14px;
    line-height: 1;
    padding-top: 4px;
    display: inline-block;
    text-align: center;
    .icon-svg {
      display: inline-block;
      fill: currentColor;
    }
    :deep(svg) {
      fill: currentColor;
    }
  }
  .icon-info {
    color: @themeColor;
  }
  .icon-success {
    color: #52c41a;
  }
  .icon-danger {
    color: #ff4d4f;
  }
  .icon-warning {
    color: #faad14;
  }
  .popconfirm-title {
    flex: auto;
    margin-left: 8px;
  }
  .title-font-weight {
    font-weight: 600;
  }
}
.popconfirm-description {
  position: relative;
  margin-left: 22px;
  margin-bottom: 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
}
.popconfirm-buttons {
  text-align: end;
  .m-btn {
    margin-left: 8px;
  }
}
</style>
