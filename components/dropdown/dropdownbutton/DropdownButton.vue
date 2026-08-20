<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import Dropdown from '../dropdown/Dropdown.vue'
import type { MenuOption, Key } from '../dropdown/Dropdown.vue'
import Button from 'components/button'
export interface Props {
  menus?: MenuOption[] // 菜单项配置数据 (配置式)，与 overlay 插槽二选一
  placement?: 'topLeft' | 'top' | 'topRight' | 'bottomLeft' | 'bottom' | 'bottomRight' // 下拉菜单弹出位置
  trigger?: 'hover' | 'click' | 'contextMenu' // 触发下拉行为的方式
  disabled?: boolean // 菜单是否禁用
  arrow?: boolean // 是否显示下拉箭头
  open?: boolean // (v-model) 下拉菜单是否展开
  type?: 'default' | 'primary' | 'danger' | 'dashed' | 'text' | 'link' // 左侧按钮类型，同 Button
  size?: 'small' | 'middle' | 'large' // 按钮尺寸，同 Button
  loading?: boolean // 左侧按钮加载状态
  icon?: VNode // 右侧下拉按钮图标（默认为下拉箭头）
  to?: string | HTMLElement | false // 下拉菜单挂载的容器节点
  overlayClassName?: string // 下拉菜单根元素的类名
  overlayStyle?: CSSProperties // 下拉菜单根元素的样式
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
  <div class="dropdown-button">
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
        <span class="dropdown-button-right-icon">
          <component :is="icon" v-if="icon" />
          <span v-else class="dropdown-button-right-arrow"></span>
        </span>
      </Button>
    </Dropdown>
  </div>
</template>
<style lang="less" scoped>
.dropdown-button {
  display: inline-flex;
  align-items: stretch;
  :deep(.dropdown-button-left) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  :deep(.dropdown-button-right) {
    margin-left: -1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &-right {
    &-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    &-arrow {
      width: 0;
      height: 0;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
      border-top: 5px solid currentcolor;
    }
  }
}
</style>
