<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { VNode } from 'vue'
import Tooltip, { type TooltipProps } from 'components/tooltip'
import Badge, { type BadgeProps } from 'components/badge'
import { useSlotsExist } from 'components/utils'

export interface Props {
  top?: number | string // 按钮定位的上边距，单位 px
  bottom?: number | string // 按钮定位的下边距，单位 px
  left?: number | string // 按钮定位的左边距，单位 px
  right?: number | string // 按钮定位的右边距，单位 px
  zIndex?: number // 设置按钮的 z-index
  width?: number | string // 浮动按钮宽度，单位 px
  height?: number | string // 浮动按钮高度，单位 px
  type?: 'default' | 'primary' // 浮动按钮类型
  shape?: 'circle' | 'square' // 浮动按钮形状
  icon?: VNode | (() => VNode) // 浮动按钮图标；插槽形态请用 #icon
  description?: string // 文字描述信息
  href?: string // 点击跳转的地址，指定此属性按钮的行为和 a 链接一致
  target?: '_self' | '_blank' // 相当于 a 标签的 target 属性，href 存在时生效
  menuTrigger?: 'click' | 'hover' // 浮动按钮菜单显示的触发方式
  tooltip?: string // 气泡卡片的内容
  tooltipProps?: TooltipProps // Tooltip 组件属性配置，参考 Tooltip Props
  badgeProps?: BadgeProps // 带徽标的浮动按钮（不支持 status 以及相关属性），参考 Badge Props
}
// 声明组件插槽类型
export interface FloatButtonSlots {
  tooltip?: () => VNode[]
  icon?: () => VNode[]
  description?: () => VNode[]
  menu?: () => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  top: undefined,
  bottom: 40,
  left: undefined,
  right: 40,
  zIndex: 99,
  width: 44,
  height: 44,
  type: 'default',
  shape: 'circle',
  icon: undefined,
  description: undefined,
  href: undefined,
  target: '_self',
  menuTrigger: undefined,
  tooltip: undefined,
  tooltipProps: () => ({}),
  badgeProps: () => ({})
})
defineSlots<FloatButtonSlots>()
const showMenu = ref(false)
const emits = defineEmits(['click', 'openChange'])
const slotsExist = useSlotsExist(['icon', 'description', 'tooltip', 'menu'])
const showTooltip = computed(() => {
  return slotsExist.tooltip || props.tooltip
})
const showIcon = computed(() => {
  return slotsExist.icon || props.icon
})
const showDescription = computed(() => {
  return slotsExist.description || props.description
})
const floatBtnWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const floatBtnHeight = computed(() => {
  if (typeof props.height === 'number') {
    return `${props.height}px`
  }
  return props.height
})
const floatBtnLeft = computed(() => {
  if (typeof props.left === 'number') {
    return `${props.left}px`
  }
  return props.left
})
const floatBtnRight = computed(() => {
  if (props.left) {
    return null
  } else {
    if (typeof props.right === 'number') {
      return `${props.right}px`
    }
    return props.right
  }
})
const floatBtnTop = computed(() => {
  if (typeof props.top === 'number') {
    return `${props.top}px`
  }
  return props.top
})
const floatBtnBottom = computed(() => {
  if (props.top) {
    return null
  } else {
    if (typeof props.bottom === 'number') {
      return `${props.bottom}px`
    }
    return props.bottom
  }
})
watch(showMenu, (to) => {
  emits('openChange', to)
})
function onClick(e: Event) {
  emits('click', e)
  if (props.menuTrigger === 'click' && slotsExist.menu) {
    showMenu.value = !showMenu.value
  }
}
</script>
<template>
  <component
    :is="href ? 'a' : 'div'"
    tabindex="0"
    class="float-btn-wrap"
    :class="`float-btn-${type} float-btn-${shape}`"
    :style="`
      --float-btn-width: ${floatBtnWidth};
      --float-btn-height: ${floatBtnHeight};
      --float-btn-left: ${floatBtnLeft};
      --float-btn-right: ${floatBtnRight};
      --float-btn-top: ${floatBtnTop};
      --float-btn-bottom: ${floatBtnBottom};
      --float-btn-z-index: ${zIndex};
    `"
    :href="href"
    :target="target"
    @click="onClick"
    @blur="menuTrigger === 'click' ? (showMenu = false) : null"
    @mouseenter="menuTrigger === 'hover' ? (showMenu = true) : null"
    @mouseleave="menuTrigger === 'hover' ? (showMenu = false) : null"
  >
    <!-- 触发器包裹元素的类名走 Tooltip 的公开契约下发（contentClass），不依赖 Tooltip 的内部类名；
         置于 v-bind 之前，允许 tooltipProps 覆盖 -->
    <Tooltip
      v-if="showTooltip"
      placement="left"
      content-class="float-btn-tooltip-content"
      v-bind="tooltipProps"
      class="float-btn-tooltip"
    >
      <template #tooltip>
        <slot name="tooltip">{{ tooltip }}</slot>
      </template>
      <Badge v-bind="badgeProps">
        <div class="float-btn-body">
          <div class="float-btn-content">
            <div v-if="showIcon" class="float-btn-icon">
              <Transition name="fade">
                <slot v-if="!showMenu" name="icon">
                  <component v-if="icon" :is="icon" />
                </slot>
                <svg
                  v-else
                  class="close-svg"
                  focusable="false"
                  data-icon="close"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  fill-rule="evenodd"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"
                  ></path>
                </svg>
              </Transition>
            </div>
            <div v-if="showDescription" class="float-btn-description">
              <slot name="description">{{ description }}</slot>
            </div>
          </div>
        </div>
      </Badge>
    </Tooltip>
    <!-- 无提示内容时不挂载 Tooltip：用同名 class 的普通 div 占位，保证尺寸与状态样式链一致 -->
    <div v-else class="float-btn-tooltip">
      <Badge v-bind="badgeProps">
        <div class="float-btn-body">
          <div class="float-btn-content">
            <div v-if="showIcon" class="float-btn-icon">
              <Transition name="fade">
                <slot v-if="!showMenu" name="icon">
                  <component v-if="icon" :is="icon" />
                </slot>
                <svg
                  v-else
                  class="close-svg"
                  focusable="false"
                  data-icon="close"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  fill-rule="evenodd"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"
                  ></path>
                </svg>
              </Transition>
            </div>
            <div v-if="showDescription" class="float-btn-description">
              <slot name="description">{{ description }}</slot>
            </div>
          </div>
        </div>
      </Badge>
    </div>
    <Transition name="move">
      <div v-show="showMenu" class="float-btn-menu">
        <slot name="menu"></slot>
      </div>
    </Transition>
  </component>
</template>
<style lang="less" scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  transform: scale(0.75);
  opacity: 0;
}
.fade-leave-active {
  position: absolute;
}
.move-enter-active,
.move-leave-active {
  transform-origin: 0 0;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.move-leave-active {
  pointer-events: none;
}
.move-enter-from,
.move-leave-to {
  transform: translate3d(0, var(--float-btn-height), 0);
  transform-origin: 0 0;
  opacity: 0;
}
.float-btn-wrap {
  position: fixed;
  left: var(--float-btn-left);
  // 页面滚动锁：右对齐偏移叠加被回收的滚动条宽度（属性单位约定为 px），锁定期间位置与锁定前一致；
  // 左对齐时 --float-btn-right 为空值，本声明计算失败回退 right: auto，与原先取值一致
  right: calc(var(--float-btn-right) + var(--va-scrollbar-width, 0px));
  top: var(--float-btn-top);
  bottom: var(--float-btn-bottom);
  z-index: var(--float-btn-z-index);
  font-size: 14px;
  color: var(--va-text-color-1);
  line-height: 1.5714285714285714;
  display: inline-block;
  width: var(--float-btn-width);
  height: var(--float-btn-height);
  cursor: pointer;
  outline: none;
  box-shadow: var(--va-popup-shadow);
  .float-btn-tooltip {
    width: 100%;
    height: 100%;
    :deep(.float-btn-tooltip-content) {
      width: 100%;
      height: 100%;
    }
    // 徽标容器上提一层：有提示时位于 content 层内，无提示时直接是 .float-btn-tooltip 的子元素，
    // 上提后两种结构共用同一份尺寸与角标定位
    :deep(.badge-wrap) {
      vertical-align: top;
      width: 100%;
      height: 100%;
      .badge-value:not(.only-dot) {
        transform: translate(0, 0);
        transform-origin: center;
        top: -6px;
        right: -6px;
      }
    }
  }
  .float-btn-body {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    .float-btn-content {
      overflow: hidden;
      text-align: center;
      min-height: var(--float-btn-height);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2px 4px;
      .float-btn-icon {
        font-size: 18px;
        line-height: 1;
        .close-svg {
          display: inline-block;
          vertical-align: bottom;
        }
        :deep(svg) {
          fill: currentColor;
        }
        :deep(img) {
          vertical-align: bottom;
        }
      }
    }
  }
  .float-btn-menu {
    position: absolute;
    bottom: 100%;
    display: block;
    z-index: -1;
    .float-btn-wrap {
      position: static;
    }
    & > * {
      margin-bottom: 16px;
    }
  }
}
.float-btn-default {
  // 暗色下容器色（#141414）与页面底几乎同色，故按钮取抬升表面色避免「融进」背景
  background-color: var(--va-bg-elevated-color);
  transition: background-color 0.2s;
  & > .float-btn-tooltip {
    .float-btn-body {
      background-color: var(--va-bg-elevated-color);
      transition: background-color 0.2s;
      &:hover {
        background-color: var(--va-fill-color-2);
      }
      .float-btn-content {
        .float-btn-icon {
          color: var(--va-text-color-1);
        }
        .float-btn-description {
          display: flex;
          align-items: center;
          line-height: 16px;
          color: var(--va-text-color-1);
          font-size: 12px;
        }
      }
    }
  }
}

.float-btn-primary {
  background-color: var(--va-cp-float-button-primary-color, var(--va-primary-color));
  & > .float-btn-tooltip {
    .float-btn-body {
      background-color: var(--va-cp-float-button-primary-color, var(--va-primary-color));
      transition: background-color 0.2s;
      &:hover {
        background-color: var(--va-cp-float-button-primary-color-hover, var(--va-primary-color-hover));
      }
      .float-btn-content {
        .float-btn-icon {
          color: var(--va-text-color-solid);
        }
      }
      .float-btn-description {
        display: flex;
        align-items: center;
        line-height: 16px;
        color: var(--va-text-color-solid);
        font-size: 12px;
      }
    }
  }
}
.float-btn-circle {
  border-radius: 50%;
  :deep(.badge-wrap) {
    .only-dot {
      top: 5.857864376269049px;
      right: 5.857864376269049px;
    }
  }
  & > .float-btn-tooltip {
    .float-btn-body {
      border-radius: 50%;
    }
  }
}
.float-btn-square {
  height: auto;
  min-height: var(--float-btn-height);
  border-radius: 8px;
  :deep(.badge-wrap) {
    .only-dot {
      top: 2.3431457505076194px;
      right: 2.3431457505076194px;
    }
  }
  & > .float-btn-tooltip {
    .float-btn-body {
      height: auto;
      border-radius: 8px;
    }
  }
}
</style>
