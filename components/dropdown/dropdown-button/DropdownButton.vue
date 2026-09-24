<script setup lang="ts">
/**
 * 下拉按钮：左侧为普通按钮（承载默认插槽内容与 loading 态），右侧为仅图标的下拉触发器，两者构成按钮组。
 * 菜单能力全部透传给 Dropdown，本组件只处理按钮形态与左按钮点击。
 */
import { computed } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import Dropdown from '../Dropdown.vue'
import type { MenuOption, Key, DropdownArrowOptions, DropdownTrigger } from '../Dropdown.vue'
import Button from 'components/button'
export interface Props {
  open?: boolean // (v-model) 下拉菜单是否展开
  menus?: MenuOption[] // 菜单项配置数据 (配置式)，与 overlay 插槽二选一
  type?: 'default' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 左侧按钮类型，同 Button
  size?: 'small' | 'middle' | 'large' // 按钮尺寸，同 Button
  icon?: VNode // 右侧下拉按钮图标（默认为省略号）
  placement?: 'topLeft' | 'top' | 'topRight' | 'bottomLeft' | 'bottom' | 'bottomRight' // 下拉菜单弹出位置
  arrow?: boolean | DropdownArrowOptions // 是否显示下拉箭头；传 { pointAtCenter: true } 时箭头指向触发器中心
  disabled?: boolean // 菜单是否禁用
  loading?: boolean // 左侧按钮加载状态
  trigger?: DropdownTrigger | DropdownTrigger[] // 触发下拉行为的方式，可传多个组合
  mouseEnterDelay?: number // 移入触发按钮显示下拉菜单的延迟时间，单位 ms，仅当 trigger 含 'hover' 时生效
  mouseLeaveDelay?: number // 移出触发按钮隐藏下拉菜单的延迟时间，单位 ms，仅当 trigger 含 'hover' 时生效
  destroyOnHide?: boolean // 隐藏后是否卸载下拉菜单 DOM
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
  open: undefined,
  menus: () => [],
  type: 'default',
  size: 'middle',
  icon: undefined,
  placement: 'bottomRight',
  arrow: false,
  disabled: false,
  loading: false,
  // 默认值写成返回数组的工厂函数：trigger 为「单值 | 数组」联合，规则要求含数组形态的 prop 默认值
  // 必须是函数且返回数组（裸值 / 返回字符串均会被 vue/require-valid-default-prop 判为非法）
  trigger: () => ['hover'],
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  destroyOnHide: false,
  to: undefined,
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
      :mouse-enter-delay="mouseEnterDelay"
      :mouse-leave-delay="mouseLeaveDelay"
      :destroy-on-hide="destroyOnHide"
      @update:open="onOpenChange"
      @menu-click="onMenuClick"
    >
      <template v-if="$slots.overlay" #overlay>
        <slot name="overlay"></slot>
      </template>
      <template v-if="$slots.label" #label="{ option }">
        <slot name="label" :option="option"></slot>
      </template>
      <Button class="dropdown-button-right" :type="type" :size="size" :disabled="disabled">
        <!-- 放进 icon 插槽：Button 据此识别为图标按钮（icon-only 正方形） -->
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
  // hover / focus 时提升层级，避免相邻按钮共享的那条边框被覆盖
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
    // 共享边用 hover 色，使两个实心按钮之间呈现可见的分隔线
    &.btn-primary:not(.btn-disabled) {
      border-right-color: var(--button-primary-color-hover);
    }
    &.btn-danger:not(.btn-disabled) {
      border-right-color: var(--button-danger-color-hover);
    }
  }
  // 左按钮 loading 时，右按钮同步变淡且不可交互
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
