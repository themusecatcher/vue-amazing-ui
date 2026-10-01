<script setup lang="ts">
import type { VNode } from 'vue'
export interface PickerPanelHeaderProps {
  showSingleNav?: boolean // 是否展示「上一/下一」单步按钮（月、年面板只保留跨单位跳转）
}
export interface PickerPanelHeaderSlots {
  view?: () => VNode[] // 头部中间的视图内容（如「2026年 9月」按钮组）
}
withDefaults(defineProps<PickerPanelHeaderProps>(), {
  showSingleNav: true
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
    <button type="button" tabindex="-1" class="picker-panel-super-prev" @click="emits('superPrev')">
      <span class="picker-panel-nav-icon picker-panel-nav-icon-super picker-panel-nav-icon-prev" />
    </button>
    <button v-if="showSingleNav" type="button" tabindex="-1" class="picker-panel-prev" @click="emits('prev')">
      <span class="picker-panel-nav-icon picker-panel-nav-icon-prev" />
    </button>
    <div class="picker-panel-view">
      <slot name="view" />
    </div>
    <button v-if="showSingleNav" type="button" tabindex="-1" class="picker-panel-next" @click="emits('next')">
      <span class="picker-panel-nav-icon picker-panel-nav-icon-next" />
    </button>
    <button type="button" tabindex="-1" class="picker-panel-super-next" @click="emits('superNext')">
      <span class="picker-panel-nav-icon picker-panel-nav-icon-super picker-panel-nav-icon-next" />
    </button>
  </div>
</template>
<style lang="less" scoped>
.picker-panel-header {
  display: flex;
  padding: 0 8px;
  color: rgba(0, 0, 0, 0.88);
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  > * {
    flex: none;
  }
  > button {
    min-width: 1.6em;
    padding: 0;
    font-size: 14px;
    line-height: 40px;
    color: rgba(0, 0, 0, 0.45);
    background: transparent;
    border: 0;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: rgba(0, 0, 0, 0.88);
    }
  }
  // V 形箭头：7px 盒 + 1.5px 上 / 左边框，旋转 45° / 135°（与参考实现同构，含描边宽度与基线定位口径）
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
    // 「跨十年 / 跨年」用的双箭头：再叠一层并偏移半格
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
    // 视图文字取浏览器默认按钮字号（13.3333px）：参考实现的年份 / 月份按钮未声明字号，
    // 实际渲染即为该值，此处对齐其视觉尺寸而非沿用面板的 14px
    font-size: 13.3333px;
    font-weight: 600;
    line-height: 40px;
    // 视图切换按钮由各面板经视图插槽传进来，scoped 样式默认选不中插槽内容，须显式声明 :slotted
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
        color: var(--picker-primary-color, #1677ff);
      }
    }
    span {
      display: inline-block;
    }
  }
}
</style>
