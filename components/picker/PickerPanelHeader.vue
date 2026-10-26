<script setup lang="ts">
import type { VNode } from 'vue'
export interface PickerPanelHeaderProps {
  showSingleNav?: boolean // 是否渲染「上一/下一」单步按钮（月、年面板只保留跨单位跳转）
  showPrev?: boolean // 「上一」导航组是否可见（范围形态下右面板隐去，占位保留）
  showNext?: boolean // 「下一」导航组是否可见（范围形态下左面板隐去，占位保留）
}
export interface PickerPanelHeaderSlots {
  view?: () => VNode[] // 头部中间的视图内容（如「2026年 9月」按钮组）
}
const props = withDefaults(defineProps<PickerPanelHeaderProps>(), {
  showSingleNav: true,
  showPrev: true,
  showNext: true
})
defineSlots<PickerPanelHeaderSlots>()
const emits = defineEmits<{
  superPrev: []
  prev: []
  next: []
  superNext: []
}>()
</script>
<template>
  <div class="picker-panel-header">
    <button
      type="button"
      tabindex="-1"
      class="picker-panel-super-prev"
      :class="{ 'picker-panel-nav-hidden': !showPrev }"
      @click="emits('superPrev')"
    >
      <span class="picker-panel-nav-icon picker-panel-nav-icon-super picker-panel-nav-icon-prev" />
    </button>
    <button
      v-if="showSingleNav"
      type="button"
      tabindex="-1"
      class="picker-panel-prev"
      :class="{ 'picker-panel-nav-hidden': !showPrev }"
      @click="emits('prev')"
    >
      <span class="picker-panel-nav-icon picker-panel-nav-icon-prev" />
    </button>
    <div class="picker-panel-view">
      <slot name="view" />
    </div>
    <button
      v-if="showSingleNav"
      type="button"
      tabindex="-1"
      class="picker-panel-next"
      :class="{ 'picker-panel-nav-hidden': !showNext }"
      @click="emits('next')"
    >
      <span class="picker-panel-nav-icon picker-panel-nav-icon-next" />
    </button>
    <button
      type="button"
      tabindex="-1"
      class="picker-panel-super-next"
      :class="{ 'picker-panel-nav-hidden': !showNext }"
      @click="emits('superNext')"
    >
      <span class="picker-panel-nav-icon picker-panel-nav-icon-super picker-panel-nav-icon-next" />
    </button>
  </div>
</template>
<style lang="less" scoped>
.picker-panel-header {
  display: flex;
  padding: 0 8px;
  color: var(--va-text-color-1);
  border-bottom: 1px solid var(--va-border-split-color);
  > * {
    flex: none;
  }
  > button {
    min-width: 1.6em;
    padding: 0;
    font-size: 14px;
    line-height: 40px;
    color: var(--va-text-color-3);
    background: transparent;
    border: 0;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: var(--va-text-color-1);
    }
  }
  .picker-panel-nav-hidden {
    visibility: hidden;
  }
  .picker-panel-nav-icon {
    position: relative;
    display: inline-block;
    width: 7px;
    height: 7px;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 7px;
      height: 7px;
      content: '';
      border: 0 solid currentcolor;
      border-top-width: 1.5px;
      border-left-width: 1.5px;
    }
    &-super::after {
      position: absolute;
      top: 4px;
      left: 4px;
      display: inline-block;
      width: 7px;
      height: 7px;
      content: '';
      border: 0 solid currentcolor;
      border-top-width: 1.5px;
      border-left-width: 1.5px;
    }
    &-prev {
      transform: rotate(-45deg);
    }
    &-next {
      transform: rotate(135deg);
    }
  }
  .picker-panel-view {
    flex: auto;
    font-size: 13.3333px;
    font-weight: 600;
    line-height: 40px;
    :slotted(button) {
      padding: 0;
      font: inherit;
      font-weight: inherit;
      color: inherit;
      vertical-align: top;
      background: transparent;
      border: 0;
      cursor: pointer;
      &:not(:first-child) {
        margin-left: 8px;
      }
      &:hover {
        color: var(--picker-primary-color, var(--va-primary-color));
      }
    }
    span {
      display: inline-block;
    }
  }
}
</style>
