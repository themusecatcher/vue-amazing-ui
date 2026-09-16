<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import Dropdown from '../dropdown/Dropdown.vue'
import type { MenuOption, Key, DropdownArrowOptions } from '../dropdown/Dropdown.vue'
import Button from 'components/button'
export interface Props {
  menus?: MenuOption[] // 菜单项配置数据 (配置式)，与 overlay 插槽二选一
  placement?: 'topLeft' | 'top' | 'topRight' | 'bottomLeft' | 'bottom' | 'bottomRight' // 下拉菜单弹出位置
  trigger?: 'hover' | 'click' | 'contextMenu' // 触发下拉行为的方式
  disabled?: boolean // 菜单是否禁用
  arrow?: boolean | DropdownArrowOptions // 是否显示下拉箭头；传 { pointAtCenter: true } 时箭头指向触发器中心
  open?: boolean // (v-model) 下拉菜单是否展开
  type?: 'default' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 左侧按钮类型，同 Button
  size?: 'small' | 'middle' | 'large' // 按钮尺寸，同 Button
  loading?: boolean // 左侧按钮加载状态
  icon?: VNode // 右侧下拉按钮图标（默认为省略号，对齐 antdv 的 EllipsisOutlined）
  to?: string | HTMLElement | false // 下拉菜单挂载的容器节点
  overlayClassName?: string // 下拉菜单根元素的类名
  overlayStyle?: CSSProperties // 下拉菜单根元素的样式
}
// 声明组件插槽类型
export interface DropdownButtonSlots {
  default?: () => VNode[]
  overlay?: () => VNode[]
  icon?: () => VNode[]
  label?: (props: { option: MenuOption }) => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  menus: () => [],
  placement: 'bottomRight',
  trigger: 'hover',
  disabled: false,
  arrow: false,
  open: undefined,
  type: 'default',
  size: 'middle',
  loading: false,
  icon: undefined,
  to: 'body',
  overlayClassName: undefined,
  overlayStyle: () => ({})
})
defineSlots<DropdownButtonSlots>()
const emits = defineEmits(['update:open', 'openChange', 'menuClick', 'click'])
const mergedOpen = computed<boolean | undefined>(() => props.open)
function onLeftClick(e: MouseEvent): void {
  if (props.disabled || props.loading) {
    return
  }
  emits('click', e)
}
function onOpenChange(val: boolean): void {
  emits('update:open', val)
  emits('openChange', val)
}
function onMenuClick(key: Key | undefined, option: MenuOption): void {
  emits('menuClick', key, option)
}
</script>
<template>
  <div class="dropdown-button-wrap" :class="{ 'dropdown-button-loading': loading }">
    <Button
      class="dropdown-button-left"
      :type="type"
      :size="size"
      :disabled="disabled"
      :loading="loading"
      @click="onLeftClick"
    >
      <slot></slot>
    </Button>
    <Dropdown
      :menus="menus"
      :placement="placement"
      :trigger="trigger"
      :disabled="disabled"
      :arrow="arrow"
      :open="mergedOpen"
      :to="to"
      :overlay-class-name="overlayClassName"
      :overlay-style="overlayStyle"
      @update:open="onOpenChange"
      @open-change="onOpenChange"
      @menu-click="onMenuClick"
    >
      <template v-if="$slots.overlay" #overlay>
        <slot name="overlay"></slot>
      </template>
      <template v-if="$slots.label" #label="{ option }">
        <slot name="label" :option="option"></slot>
      </template>
      <Button class="dropdown-button-right" :type="type" :size="size" :disabled="disabled">
        <!-- 放进 icon 插槽：Button 据此识别为图标按钮（icon-only 正方形，对齐 antdv Dropdown.Button 的右按钮） -->
        <template #icon>
          <slot name="icon">
            <component :is="icon" v-if="icon" />
            <svg
              v-else
              focusable="false"
              data-icon="ellipsis"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="64 64 896 896"
            >
              <path
                d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"
              ></path>
            </svg>
          </slot>
        </template>
      </Button>
    </Dropdown>
  </div>
</template>
<style lang="less" scoped>
.dropdown-button-wrap {
  display: inline-flex;
  align-items: stretch;
  // hover / focus 时提升层级，避免相邻按钮共享的那条边框被覆盖（对齐 antd button group 的 z-index 规则）
  :deep(.dropdown-button-left),
  :deep(.dropdown-button-right) {
    position: relative;
    z-index: 1;
    &:hover,
    &:focus,
    &:active {
      z-index: 2;
    }
    &.btn-disabled {
      z-index: 0;
    }
  }
  :deep(.dropdown-button-left) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    // 共享边用 hover 色，使两个实心按钮之间呈现可见的分隔线（对齐 antd button group 的 border 色规则）
    &.btn-primary:not(.btn-disabled) {
      border-right-color: var(--button-primary-color-hover);
    }
    &.btn-danger:not(.btn-disabled) {
      border-right-color: var(--button-danger-color-hover);
    }
  }
  // 左按钮 loading 时，右按钮同步变淡且不可交互（对齐 antd dropdown button 的 loading 联动规则）
  &.dropdown-button-loading {
    :deep(.dropdown-button-right) {
      opacity: 0.65;
      cursor: default;
      pointer-events: none;
    }
  }
  :deep(.dropdown-button-right) {
    margin-left: -1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &.btn-primary:not(.btn-disabled) {
      border-left-color: var(--button-primary-color-hover);
    }
    &.btn-danger:not(.btn-disabled) {
      border-left-color: var(--button-danger-color-hover);
    }
  }
}
</style>
