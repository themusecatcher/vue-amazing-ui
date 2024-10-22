<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Tooltip from '../tooltip'
import Badge from '../badge'
import { useSlotsExist } from '../utils'
interface Props {
  left?: number | string // 按钮定位的左边距，单位 px
  right?: number | string // 按钮定位的右边距，单位 px
  top?: number | string // 按钮定位的上边距，单位 px
  bottom?: number | string // 按钮定位的下边距，单位 px
  width?: number | string // 浮动按钮宽度，单位 px
  height?: number | string // 浮动按钮高度，单位 px
  type?: 'default' | 'primary' // 浮动按钮类型
  shape?: 'circle' | 'square' // 浮动按钮形状
  icon?: string // 浮动按钮图标 string | slot
  description?: string // 文字描述信息 string | slot
  href?: string // 点击跳转的地址，指定此属性按钮的行为和 a 链接一致
  target?: '_self' | '_blank' // 相当于 a 标签的 target 属性，href 存在时生效
  menuTrigger?: 'click' | 'hover' // 浮动按钮菜单显示的触发方式
  tooltip?: string // 气泡卡片的内容 string | slot
  tooltipProps?: object // Tooltip 组件属性配置，参考 Tooltip Props
  badgeProps?: object // 带徽标的浮动按钮（不支持 status 以及相关属性），参考 Badge Props
}
const props = withDefaults(defineProps<Props>(), {
  left: undefined,
  right: 24,
  top: undefined,
  bottom: 48,
  width: 40,
  height: 40,
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
const showMenu = ref(false)
const emits = defineEmits(['click', 'openChange'])
const slotsExist = useSlotsExist(['icon', 'description', 'tooltip', 'menu'])
const floatBtnWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})
const floatBtnHeight = computed(() => {
  if (typeof props.height === 'number') {
    return props.height + 'px'
  }
  return props.height
})
const floatBtnLeft = computed(() => {
  if (typeof props.left === 'number') {
    return props.left + 'px'
  }
  return props.left
})
const floatBtnRight = computed(() => {
  if (props.left) {
    return null
  } else {
    if (typeof props.right === 'number') {
      return props.right + 'px'
    }
    return props.right
  }
})
const floatBtnTop = computed(() => {
  if (typeof props.top === 'number') {
    return props.top + 'px'
  }
  return props.top
})
const floatBtnBottom = computed(() => {
  if (props.top) {
    return null
  } else {
    if (typeof props.bottom === 'number') {
      return props.bottom + 'px'
    }
    return props.bottom
  }
})
const showDescription = computed(() => {
  return slotsExist.description || props.description
})
const showTooltip = computed(() => {
  return slotsExist.tooltip || props.tooltip
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
    class="m-float-btn"
    :class="`float-btn-${type} float-btn-${shape}`"
    :style="`
      --float-btn-width: ${floatBtnWidth};
      --float-btn-height: ${floatBtnHeight};
      --float-btn-left: ${floatBtnLeft};
      --float-btn-right: ${floatBtnRight};
      --float-btn-top: ${floatBtnTop};
      --float-btn-bottom: ${floatBtnBottom}
    `"
    :href="href"
    :target="target"
    @click="onClick"
    @blur="menuTrigger === 'click' ? (showMenu = false) : null"
    @mouseenter="menuTrigger === 'hover' ? (showMenu = true) : null"
    @mouseleave="menuTrigger === 'hover' ? (showMenu = false) : null"
  >
    <Tooltip v-bind="tooltipProps" class="float-btn-tooltip">
      <template v-if="showTooltip" #tooltip>
        <slot name="tooltip">{{ tooltip }}</slot>
      </template>
      <Badge v-bind="badgeProps">
        <div class="float-btn-body">
          <div class="float-btn-content">
            <div v-if="slotsExist.icon" class="float-btn-icon">
              <Transition name="fade">
                <slot v-if="!showMenu" name="icon"></slot>
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
    <Transition v-show="showMenu" name="move">
      <div class="float-btn-menu">
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
.m-float-btn {
  position: fixed;
  left: var(--float-btn-left);
  right: var(--float-btn-right);
  top: var(--float-btn-top);
  bottom: var(--float-btn-bottom);
  z-index: 99;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  display: inline-block;
  width: var(--float-btn-width);
  height: var(--float-btn-height);
  cursor: pointer;
  outline: none;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  .float-btn-tooltip {
    width: 100%;
    height: 100%;
    :deep(.tooltip-content) {
      width: 100%;
      height: 100%;
      .m-badge {
        vertical-align: top;
        width: 100%;
        height: 100%;
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
        text-align: center;
        margin: auto;
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
    .m-float-btn {
      position: static;
    }
    & > * {
      margin-bottom: 16px;
    }
  }
}
.float-btn-default {
  background-color: #ffffff;
  transition: background-color 0.2s;
  & > .float-btn-tooltip {
    .float-btn-body {
      background-color: #ffffff;
      transition: background-color 0.2s;
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
      .float-btn-content {
        .float-btn-icon {
          color: rgba(0, 0, 0, 0.88);
        }
        .float-btn-description {
          display: flex;
          align-items: center;
          line-height: 16px;
          color: rgba(0, 0, 0, 0.88);
          font-size: 12px;
        }
      }
    }
  }
}

.float-btn-primary {
  background-color: @themeColor;
  & > .float-btn-tooltip {
    .float-btn-body {
      background-color: @themeColor;
      transition: background-color 0.2s;
      &:hover {
        background-color: #4096ff;
      }
      .float-btn-content {
        .float-btn-icon {
          color: #fff;
        }
      }
      .float-btn-description {
        display: flex;
        align-items: center;
        line-height: 16px;
        color: #fff;
        font-size: 12px;
      }
    }
  }
}
.float-btn-circle {
  border-radius: 50%;
  .m-badge {
    :deep(.only-dot) {
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
  & > .float-btn-tooltip {
    .float-btn-body {
      height: auto;
      border-radius: 8px;
    }
  }
}
</style>
