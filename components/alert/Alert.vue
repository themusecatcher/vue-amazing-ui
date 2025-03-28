<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import type { Slot } from 'vue'
import { useSlotsExist, useInject } from 'components/utils'
export interface Props {
  message?: string // 警告提示内容 string | slot
  description?: string // 警告提示的辅助性文字介绍 string | slot
  type?: 'default' | 'success' | 'info' | 'warning' | 'error' // 警告提示的类型
  bordered?: boolean // 是否显示边框
  closable?: boolean // 是否显示关闭按钮
  closeText?: string // 自定义关闭按钮 string | slot
  icon?: string // 自定义图标，showIcon 为 true 时有效 string | slot
  showIcon?: boolean // 是否显示辅助图标
  actions?: Slot // 自定义操作项 slot
}
const props = withDefaults(defineProps<Props>(), {
  message: undefined,
  description: undefined,
  type: 'default',
  bordered: true,
  closable: false,
  closeText: undefined,
  icon: undefined,
  showIcon: false,
  actions: undefined
})
const alertRef = ref() // alert 模板引用
const closeAlert = ref(false)
const { colorPalettes } = useInject('Alert') // 主题色注入
const emit = defineEmits(['close'])
const slotsExist = useSlotsExist(['icon', 'description', 'actions'])
const showSlotsIcon = computed(() => {
  return slotsExist.icon || props.icon || ['success', 'info', 'warning', 'error'].includes(props.type)
})
const showDesc = computed(() => {
  return slotsExist.description || props.description
})
async function onClose(e: Event) {
  alertRef.value.style.maxHeight = `${alertRef.value.offsetHeight}px`
  await nextTick()
  closeAlert.value = true
  emit('close', e)
}
</script>
<template>
  <Transition
    name="alert-motion"
    leave-from-class="alert-motion-leave"
    leave-active-class="alert-motion-leave alert-motion-leave-active"
    leave-to-class="alert-motion-leave alert-motion-leave-active"
  >
    <div
      v-if="!closeAlert"
      ref="alertRef"
      class="m-alert"
      :class="[
        `alert-${type}`,
        {
          'alert-borderless': !bordered,
          'alert-width-description': showDesc
        }
      ]"
      :style="`
        --alert-primary-color: ${colorPalettes[5]};
        --alert-primary-bg-color: ${colorPalettes[0]};
        --alert-primary-border-color: ${colorPalettes[2]};
        --alert-success-color: #52c41a;
        --alert-success-bg-color: #f6ffed;
        --alert-success-border-color: #b7eb8f;
        --alert-warning-color: #faad14;
        --alert-warning-bg-color: #fffbe6;
        --alert-warning-border-color: #ffe58f;
        --alert-error-color: #ff4d4f;
        --alert-error-bg-color: #fff2f0;
        --alert-error-border-color: #ffccc7;
      `"
    >
      <template v-if="showIcon && showSlotsIcon">
        <span v-if="!showDesc" class="m-alert-icon">
          <slot name="icon">
            <img v-if="icon" :src="icon" class="icon-img" />
            <svg
              v-else-if="type === 'info'"
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
              v-else-if="type === 'success'"
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
              v-else-if="type === 'warning'"
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
            <svg
              v-else-if="type === 'error'"
              class="icon-svg"
              focusable="false"
              data-icon="close-circle"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="64 64 896 896"
            >
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
              ></path>
            </svg>
          </slot>
        </span>
        <span v-else class="m-big-icon">
          <slot name="icon">
            <img v-if="icon" :src="icon" class="big-icon-img" />
            <svg
              v-else-if="type === 'info'"
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
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
              ></path>
              <path
                d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
              ></path>
            </svg>
            <svg
              v-else-if="type === 'success'"
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
                d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
              ></path>
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
              ></path>
            </svg>
            <svg
              v-else-if="type === 'warning'"
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
              v-else-if="type === 'error'"
              class="icon-svg"
              focusable="false"
              data-icon="close-circle"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="64 64 896 896"
            >
              <path
                d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
              ></path>
              <path
                d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
              ></path>
            </svg>
          </slot>
        </span>
      </template>
      <div class="m-alert-content">
        <div class="alert-message">
          <slot>{{ message }}</slot>
        </div>
        <div v-if="showDesc" class="alert-description">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
      <div v-if="slotsExist.actions" class="m-alert-actions">
        <slot name="actions"></slot>
      </div>
      <a v-if="closable" tabindex="0" class="m-alert-close" @click="onClose" @keydown.enter.prevent="onClose">
        <slot name="closeText">
          <span v-if="closeText">{{ closeText }}</span>
          <svg
            v-else
            class="alert-close"
            focusable="false"
            data-icon="close"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
            ></path>
          </svg>
        </slot>
      </a>
    </div>
  </Transition>
</template>
<style lang="less" scoped>
.alert-motion-leave {
  overflow: hidden;
  opacity: 1;
  transition:
    max-height 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
    opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
    padding 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.alert-motion-leave-active {
  max-height: 0 !important;
  opacity: 0 !important;
  padding-block: 0 !important;
}
.m-alert {
  padding: 8px 12px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  position: relative;
  display: flex;
  align-items: center;
  word-break: break-all;
  border-radius: 8px;
  .m-alert-icon {
    display: inline-block;
    margin-right: 8px;
    line-height: 0;
  }
  .m-big-icon {
    margin-right: 12px;
    font-size: 24px;
    line-height: 0;
  }
  .icon-img {
    display: inline-block;
    width: 14px;
    height: 14px;
  }
  .big-icon-img {
    display: inline-block;
    width: 24px;
    height: 24px;
  }
  .icon-svg {
    display: inline-block;
  }
  .m-alert-content {
    flex: 1;
    min-width: 0;
  }
  .m-alert-actions {
    margin-left: 8px;
  }
  .m-alert-close {
    margin-left: 8px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 12px;
    cursor: pointer;
    outline: none;
    transition: color 0.2s;
    &:hover {
      color: rgba(0, 0, 0, 0.88);
    }
    .alert-close {
      display: inline-block;
      vertical-align: bottom;
      fill: rgba(0, 0, 0, 0.45);
      transition: fill 0.2s;
      &:hover {
        fill: rgba(0, 0, 0, 0.88);
      }
    }
  }
}
.alert-default {
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid #d9d9d9;
  .m-alert-icon,
  .m-big-icon {
    color: rgba(0, 0, 0, 0.88);
    .icon-svg,
    :deep(svg) {
      fill: currentColor;
    }
  }
}
.alert-info {
  background-color: var(--alert-primary-bg-color);
  border: 1px solid var(--alert-primary-border-color);
  .m-alert-icon,
  .m-big-icon {
    color: var(--alert-primary-color);
    .icon-svg,
    :deep(svg) {
      fill: currentColor;
    }
  }
}
.alert-success {
  background-color: var(--alert-success-bg-color);
  border: 1px solid var(--alert-success-border-color);
  .m-alert-icon,
  .m-big-icon {
    color: var(--alert-success-color);
    .icon-svg,
    :deep(svg) {
      fill: currentColor;
    }
  }
}
.alert-warning {
  background-color: var(--alert-warning-bg-color);
  border: 1px solid var(--alert-warning-border-color);
  .m-alert-icon,
  .m-big-icon {
    color: var(--alert-warning-color);
    .icon-svg,
    :deep(svg) {
      fill: currentColor;
    }
  }
}
.alert-error {
  background-color: var(--alert-error-bg-color);
  border: 1px solid var(--alert-error-border-color);
  .m-alert-icon,
  .m-big-icon {
    color: var(--alert-error-color);
    .icon-svg,
    :deep(svg) {
      fill: currentColor;
    }
  }
}
.alert-borderless {
  border: none;
}
.alert-width-description {
  align-items: flex-start;
  padding: 20px 24px;
  .alert-message {
    display: block;
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 16px;
  }
  .alert-description {
    display: block;
  }
}
</style>
