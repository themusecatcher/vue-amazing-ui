<script setup lang="ts">
import { ref, computed, isVNode, h } from 'vue'
import type { CSSProperties, VNode, Slot } from 'vue'
import { useInject } from 'components/utils'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
export interface Item {
  label?: string | VNode // 菜单标题
  icon?: VNode // 菜单图标
  title?: string // 设置收缩时展示的悬浮标题
  key: string | number // 菜单唯一标识
  children?: Item[] // 子菜单的菜单项
  disabled?: boolean // 是否禁用
  onTitleClick?: Function // 点击子菜单标题的回调函数
}
export interface Props {
  inlineCollapsed?: boolean // inline 时菜单是否收起状态
  inlineIndent?: number // inline 模式的菜单缩进宽度，单位 px
  items?: Item[] // 菜单目录
  mode?: 'vertical' | 'horizontal' | 'inline' // 菜单类型，支持垂直、水平和内嵌三种模式
  openKeys?: (string | number)[] // (v-model) 当前展开的 SubMenu 菜单项 key 数组
  overflowedIndicator?: VNode | Slot // 用于自定义 Menu 水平空间不足时的省略收缩的图标
  selectable?: boolean // 是否允许选中
  selectedKeys?: (string | number)[] // (v-model) 当前选中的菜单项 key 数组
  theme?: 'light' | 'dark' // 主题颜色
  triggerSubMenuAction?: 'click' | 'hover' // 触发子菜单展开的行为，支持点击和悬停
}
const props = withDefaults(defineProps<Props>(), {
  inlineCollapsed: undefined,
  inlineIndent: 24,
  items: () => [],
  mode: 'vertical',
  openKeys: () => [],
  overflowedIndicator: undefined,
  selectable: true,
  selectedKeys: () => [],
  theme: 'light',
  triggerSubMenuAction: 'click'
})
const icon = h(AppstoreOutlined)
console.log('isVNode', isVNode(typeof icon === 'function' ? (icon as Function)() : icon))
const { colorPalettes } = useInject('Menu') // 主题色注入
const emits = defineEmits(['update:openKeys', 'update:selectedKeys', 'click', 'select', 'openChange'])
</script>
<template>
  <div
    class="m-menu menu-overflow"
    :class="{
      'menu-horizontal': props.mode === 'horizontal',
      'menu-vertical': props.mode === 'vertical',
      'menu-light': props.theme === 'light',
      'menu-dark': props.theme === 'dark'
    }"
    :style="`--menu-primary-color: ${colorPalettes[5]};`"
  >
    <div
      tabindex="-1"
      class="menu-item"
      :class="{ 'menu-item-selected': props.selectedKeys.includes(item.key) }"
      :style="`opacity: 1; order: ${index};`"
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
    >
      <component class="menu-item-icon" v-if="isVNode(item.icon)" :is="item.icon" />
      <span v-if="isVNode(item.label)" class="menu-item-label">
        <component :is="item.label" />
      </span>
      <span v-else class="menu-item-label">{{ item.label }}</span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-menu {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  outline: none;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  .menu-item {
    position: relative;
    display: block;
    margin: 0;
    border-radius: 8px;
    white-space: nowrap;
    cursor: pointer;
    transition: border-color 0.3s, background 0.3s, padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    .menu-item-icon {
      color: var(--menu-primary-color);
    }
    .menu-item-label {
      transition: color 0.3s;
    }
    .menu-item-icon +span {
      margin-left: 10px;
      opacity: 1;
      transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), margin 0.3s, color 0.3s;
    }
    a::before {
      color: inherit;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: transparent;
      content: "";
    }
  }
}
.menu-overflow {
  display: flex;
  .menu-item {
    flex: none;
  }
}
.menu-horizontal {
  line-height: 46px;
  border: 0;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  box-shadow: none;
  .menu-item {
    position: relative;
    display: inline-block;
    vertical-align: bottom;
    padding-inline: 16px;
    transition: border-color 0.3s, background 0.3s;
  }
}
.menu-light {
  color: rgba(0, 0, 0, 0.88);
  background: #ffffff;
  .menu-item-selected {
    color: var(--menu-primary-color);
    background-color: #ffefe6;
  }
}
.menu-light.menu-horizontal {
  & >.menu-item {
    top: 1px;
    margin-top: -1px;
    margin-bottom: 0;
    border-radius: 0;
    &::after {
      position: absolute;
      left: 16px;
      right: 16px;
      bottom: 0;
      border-bottom: 2px solid transparent;
      transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      content: "";
    }
  }
  & >.menu-item-selected {
    color: var(--menu-primary-color);
    background-color: transparent;
    &::after {
      border-bottom-width: 2px;
      border-bottom-color: var(--menu-primary-color);
    }
  }
}
</style>
