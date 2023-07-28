<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  title?: string // 标题 string | slot
  width?: string|number // 宽度，在 placement 为 right 或 left 时使用
  height?: string|number // 高度，在 placement 为 top 或 bottom 时使用
  closable?: boolean // 是否显示左上角的关闭按钮
  destroyOnClose?: boolean // 关闭时是否销毁 Drawer 里的子元素
  extra?: string // 抽屉右上角的操作区域 string | slot
  placement?: 'top'|'right'|'bottom'|'left' // 抽屉的方向
  zIndex?: number // 设置 Drawer 的 z-index
  open?: boolean // (v-model) 抽屉是否可见
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  width: 378,
  height: 378,
  closable: true,
  destroyOnClose: false,
  extra: '',
  placement: 'right',
  zIndex: 1000,
  open: false
})
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
const emits = defineEmits(['update:open', 'close'])
function onBlur (e: Event) {
  onClose(e)
}
function onClose (e: Event) {
  emits('update:open', false)
  emits('close', e)
}
</script>
<template>
  <div class="m-drawer" tabindex="-1">
    <Transition name="fade">
      <div v-show="open" class="m-drawer-mask" @click.self="onBlur"></div>
    </Transition>
    <Transition :name="`motion-${placement}`">
      <div
        v-show="open"
        class="m-drawer-wrapper"
        :class="`drawer-${placement}`"
        :style="`z-index: ${zIndex}; ${['top', 'bottom'].includes(placement) ? 'height:' + drawerHeight : 'width:' + drawerWidth};`">
        <div class="m-drawer-content">
          <div class="m-drawer-body-wrapper" v-if="!destroyOnClose">
            <div class="m-drawer-header">
              <div class="m-header-title">
                <svg v-if="closable" focusable="false" @click="onClose" class="u-close" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
                <p class="u-title">
                  <slot name="title">{{ title }}</slot>
                </p>
              </div>
              <div class="m-drawer-extra">
                <slot name="extra">{{ extra }}</slot>
              </div>
            </div>
            <div class="m-drawer-body">
              <slot></slot>
            </div>
          </div>
          <div class="m-drawer-body-wrapper" v-if="destroyOnClose&&open">
            <div class="m-drawer-header">
              <div class="m-header-title">
                <svg focusable="false" @click="onClose" class="u-close" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
                <p class="u-title">
                  <slot name="title">{{ title }}</slot>
                </p>
              </div>
              <div class="m-drawer-extra">
                <slot name="extra">{{ extra }}</slot>
              </div>
            </div>
            <div class="m-drawer-body">
              <slot></slot>
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
  transition: opacity .3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.motion-top-enter-active,
.motion-top-leave-active {
  transition: all .3s;
}
.motion-top-enter-from,
.motion-top-leave-to {
  transform: translateY(-100%);
}
.motion-right-enter-active,
.motion-right-leave-active {
  transition: all .3s;
}
.motion-right-enter-from,
.motion-right-leave-to {
  transform: translateX(100%);
}
.motion-bottom-enter-active,
.motion-bottom-leave-active {
  transition: all .3s;
}
.motion-bottom-enter-from,
.motion-bottom-leave-to {
  transform: translateY(100%);
}
.motion-left-enter-active,
.motion-left-leave-active {
  transition: all .3s;
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
  .m-drawer-mask {
    position: absolute;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, .45);
    pointer-events: auto;
  }
  .m-drawer-wrapper {
    position: absolute;
    transition: all .3s;
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
          border-bottom: 1px solid rgba(5, 5, 5, .06);
          .m-header-title {
            display: flex;
            flex: 1;
            align-items: center;
            min-width: 0;
            min-height: 0;
            .u-close {
              display: inline-block;
              margin-inline-end: 12px;
              width: 16px;
              height: 16px;
              fill: rgba(0, 0, 0, .45);
              cursor: pointer;
              transition: fill .2s;
              &:hover {
                fill: rgba(0, 0, 0, .88);
              }
            }
            .u-title {
              flex: 1;
              margin: 0;
              color: rgba(0, 0, 0, 0.88);
              font-weight: 600;
              font-size: 16px;
              line-height: 1.5;
            }
          }
          .m-drawer-extra {
            flex: none;
          }
        }
        .m-drawer-body {
          flex: 1;
          min-width: 0;
          min-height: 0;
          padding: 24px;
          overflow: auto;
        }
      }
    }
  }
}
.drawer-top {
  top: 0;
  inset-inline: 0;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
.drawer-right {
  top: 0;
  right: 0;
  bottom: 0;
  box-shadow: -6px 0 16px 0 rgba(0, 0, 0, .08), -3px 0 6px -4px rgba(0, 0, 0, .12), -9px 0 28px 8px rgba(0, 0, 0, .05);
}
.drawer-bottom {
  bottom: 0;
  inset-inline: 0;
  box-shadow: 0 -6px 16px 0 rgba(0, 0, 0, 0.08), 0 -3px 6px -4px rgba(0, 0, 0, 0.12), 0 -9px 28px 8px rgba(0, 0, 0, 0.05);
}
.drawer-left {
  top: 0;
  bottom: 0;
  left: 0;
  box-shadow: 6px 0 16px 0 rgba(0, 0, 0, 0.08), 3px 0 6px -4px rgba(0, 0, 0, 0.12), 9px 0 28px 8px rgba(0, 0, 0, 0.05);
}
</style>
