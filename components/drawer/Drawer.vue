<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import Scrollbar from '../scrollbar'
import { useSlotsExist } from '../utils'
interface Props {
  width?: string | number // 抽屉宽度，在 placement 为 right 或 left 时使用，单位 px
  height?: string | number // 抽屉高度，在 placement 为 top 或 bottom 时使用，单位 px
  title?: string // 标题 string | slot
  closable?: boolean // 是否显示左上角的关闭按钮
  placement?: 'top' | 'right' | 'bottom' | 'left' // 抽屉的方向
  headerClass?: string // 设置 Drawer 头部的类名
  headerStyle?: CSSProperties // 设置 Drawer 头部的样式
  scrollbarProps?: object // Scrollbar 组件属性配置，用于设置内容滚动条的样式
  bodyClass?: string // 设置 Drawer 内容部分的类名
  bodyStyle?: CSSProperties // 设置 Drawer 内容部分的样式
  extra?: string // 抽屉右上角的操作区域 string | slot
  footer?: string // 抽屉的页脚 string | slot
  footerClass?: string // 设置 Drawer 页脚的类名
  footerStyle?: CSSProperties // 设置 Drawer 页脚的样式
  destroyOnClose?: boolean // 关闭时是否销毁 Drawer 里的子元素
  zIndex?: number // 设置 Drawer 的 z-index
  open?: boolean // (v-model) 抽屉是否可见
}
const props = withDefaults(defineProps<Props>(), {
  width: 378,
  height: 378,
  title: undefined,
  closable: true,
  placement: 'right',
  headerClass: undefined,
  headerStyle: () => ({}),
  scrollbarProps: () => ({}),
  bodyClass: undefined,
  bodyStyle: () => ({}),
  extra: undefined,
  footer: undefined,
  footerClass: undefined,
  footerStyle: () => ({}),
  destroyOnClose: false,
  zIndex: 1000,
  open: false
})
const slotsExist = useSlotsExist(['title', 'extra', 'footer'])
const emits = defineEmits(['update:open', 'close'])
const drawerWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})
const drawerHeight = computed(() => {
  if (typeof props.height === 'number') {
    return props.height + 'px'
  }
  return props.height
})
const drawerStyle = computed(() => {
  if (['top', 'bottom'].includes(props.placement)) {
    return {
      zIndex: props.zIndex,
      height: drawerHeight.value
    }
  } else {
    return {
      zIndex: props.zIndex,
      width: drawerWidth.value
    }
  }
})
const showHeader = computed(() => {
  return slotsExist.title || slotsExist.extra || props.title || props.extra || props.closable
})
const showTitle = computed(() => {
  return slotsExist.title || props.title
})
const showExtra = computed(() => {
  return slotsExist.extra || props.extra
})
const showFooter = computed(() => {
  return slotsExist.footer || props.footer
})
const drawerRef = ref()
watch(
  () => props.open,
  (to) => {
    if (to) {
      nextTick(() => {
        drawerRef.value.focus()
      })
    }
  }
)
function onBlur(e: Event) {
  emits('update:open', false)
  emits('close', e)
}
function onClose(e: Event) {
  emits('update:open', false)
  emits('close', e)
}
</script>
<template>
  <div ref="drawerRef" tabindex="-1" class="m-drawer" @keydown.esc="onClose">
    <Transition name="fade">
      <div v-show="open" class="m-drawer-mask" @click.self="onBlur"></div>
    </Transition>
    <Transition :name="`motion-${placement}`">
      <div v-show="open" class="m-drawer-wrap" :class="`drawer-${placement}`" :style="drawerStyle">
        <div class="m-drawer-content">
          <div v-if="!destroyOnClose" class="m-drawer-body-wrapper">
            <div v-show="showHeader" class="m-drawer-header" :class="headerClass" :style="headerStyle">
              <div class="m-header-title">
                <svg
                  v-if="closable"
                  focusable="false"
                  class="svg-close"
                  data-icon="close"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="64 64 896 896"
                  @click="onClose"
                >
                  <path
                    d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                  ></path>
                </svg>
                <div v-if="showTitle" class="header-title">
                  <slot name="title">{{ title }}</slot>
                </div>
              </div>
              <div v-if="showExtra" class="header-extra">
                <slot name="extra">{{ extra }}</slot>
              </div>
            </div>
            <Scrollbar :content-style="{ height: '100%' }" v-bind="scrollbarProps">
              <div class="m-drawer-body" :class="bodyClass" :style="bodyStyle">
                <slot></slot>
              </div>
            </Scrollbar>
            <div v-if="showFooter" class="m-drawer-footer" :class="footerClass" :style="footerStyle">
              <slot name="footer">{{ footer }}</slot>
            </div>
          </div>
          <div v-if="destroyOnClose && open" class="m-drawer-body-wrapper">
            <div v-show="showHeader" class="m-drawer-header" :class="headerClass" :style="headerStyle">
              <div class="m-header-title">
                <svg
                  v-if="closable"
                  focusable="false"
                  class="svg-close"
                  data-icon="close"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="64 64 896 896"
                  @click="onClose"
                >
                  <path
                    d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                  ></path>
                </svg>
                <div v-if="showTitle" class="header-title">
                  <slot name="title">{{ title }}</slot>
                </div>
              </div>
              <div v-if="showExtra" class="header-extra">
                <slot name="extra">{{ extra }}</slot>
              </div>
            </div>
            <Scrollbar :content-style="{ height: '100%' }" v-bind="scrollbarProps">
              <div class="m-drawer-body" :class="bodyClass" :style="bodyStyle">
                <slot></slot>
              </div>
            </Scrollbar>
            <div v-if="showFooter" class="m-drawer-footer" :class="footerClass" :style="footerStyle">
              <slot name="footer">{{ footer }}</slot>
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
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.motion-top-enter-active,
.motion-top-leave-active {
  transition: all 0.3s;
}
.motion-top-enter-from,
.motion-top-leave-to {
  transform: translateY(-100%);
}
.motion-right-enter-active,
.motion-right-leave-active {
  transition: all 0.3s;
}
.motion-right-enter-from,
.motion-right-leave-to {
  transform: translateX(100%);
}
.motion-bottom-enter-active,
.motion-bottom-leave-active {
  transition: all 0.3s;
}
.motion-bottom-enter-from,
.motion-bottom-leave-to {
  transform: translateY(100%);
}
.motion-left-enter-active,
.motion-left-leave-active {
  transition: all 0.3s;
}
.motion-left-enter-from,
.motion-left-leave-to {
  transform: translateX(-100%);
}
.m-drawer {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
  outline: none;
  .m-drawer-mask {
    position: absolute;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.45);
    pointer-events: auto;
  }
  .m-drawer-wrap {
    position: absolute;
    transition: all 0.3s;
    .m-drawer-content {
      width: 100%;
      height: 100%;
      overflow: auto;
      background: #ffffff;
      pointer-events: auto;
      .m-drawer-body-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        .m-drawer-header {
          display: flex;
          flex: 0;
          align-items: center;
          padding: 16px 24px;
          font-size: 16px;
          line-height: 1.5;
          border-bottom: 1px solid rgba(5, 5, 5, 0.06);
          .m-header-title {
            display: flex;
            flex: 1;
            align-items: center;
            min-width: 0;
            min-height: 0;
            .svg-close {
              display: inline-block;
              margin-right: 12px;
              font-size: 16px;
              font-weight: 600;
              color: rgba(0, 0, 0, 0.45);
              fill: currentColor;
              cursor: pointer;
              transition: color 0.2s;
              &:hover {
                color: rgba(0, 0, 0, 0.88);
              }
            }
            .header-title {
              flex: 1;
              margin: 0;
              color: rgba(0, 0, 0, 0.88);
              font-weight: 600;
              font-size: 16px;
              line-height: 1.5;
            }
          }
          .header-extra {
            flex: none;
            color: rgba(0, 0, 0, 0.88);
          }
        }
        .m-drawer-body {
          height: 100%;
          padding: 24px;
          word-break: break-all;
        }
        .m-drawer-footer {
          flex-shrink: 0;
          padding: 8px 16px;
          border-top: 1px solid rgba(5, 5, 5, 0.06);
          color: rgba(0, 0, 0, 0.88);
        }
      }
    }
  }
  .drawer-top {
    top: 0;
    inset-inline: 0;
    box-shadow:
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
  }
  .drawer-right {
    top: 0;
    right: 0;
    bottom: 0;
    box-shadow:
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05);
  }
  .drawer-bottom {
    bottom: 0;
    inset-inline: 0;
    box-shadow:
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05);
  }
  .drawer-left {
    top: 0;
    bottom: 0;
    left: 0;
    box-shadow:
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05);
  }
}
</style>
