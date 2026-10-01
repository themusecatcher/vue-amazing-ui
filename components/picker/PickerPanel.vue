<script setup lang="ts">
import type { VNode } from 'vue'
export interface PickerPanelProps {
  showFooter?: boolean // 是否展示面板底部（内容由 footer 插槽提供），各面板按自身视图切换
}
export interface PickerPanelSlots {
  default?: () => VNode[] // 面板主体：各面板自行组合头部与内容，日期时间形态为「日期 + 时间」两列
  footer?: () => VNode[]
}
withDefaults(defineProps<PickerPanelProps>(), {
  showFooter: false
})
defineSlots<PickerPanelSlots>()
/** 面板内按下不转移焦点（对齐参考实现的面板容器口径）：真实鼠标点击面板不应让触发器输入框失焦 */
function onPanelMousedown(event: MouseEvent): void {
  event.preventDefault()
}
</script>
<template>
  <div class="picker-panel" @mousedown="onPanelMousedown">
    <div class="picker-panel-body">
      <slot />
    </div>
    <div v-if="showFooter" class="picker-panel-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.picker-panel {
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  // 面板宽度：7 列日期格（36px × 7）+ 日期面板左右内边距（12px × 2）+ 参考实现的 4px 余额，
  // 日期 / 月 / 年三种视图共用同一宽度，避免切换视图时面板宽度跳动
  width: 280px;
  text-align: center;
  background: var(--picker-panel-bg-color, #fff);
  // 面板自身不画边框：外边界由圆角 + 阴影提供，overflow 负责裁掉内容在圆角处的溢出
  // （参考实现同样在容器内清掉面板边框，面板尺寸因此等于内容宽度）
  border-radius: 8px;
  outline: none;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  .picker-panel-body {
    display: flex;
    flex-direction: column;
  }
  .picker-panel-footer {
    width: min-content;
    min-width: 100%;
    line-height: 38px;
    text-align: center;
    border-top: 1px solid rgba(5, 5, 5, 0.06);
  }
}
</style>
