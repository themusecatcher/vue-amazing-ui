<script setup lang="ts">
import type { VNode } from 'vue'
import { useSlotsExist } from 'components/utils'
export interface PickerPanelProps {
  showFooter?: boolean // 是否展示面板底部（内容由 footer 插槽提供），各面板按自身视图切换
}
export interface PickerPanelSlots {
  presets?: () => VNode[] // 面板左侧的预设侧栏：与面板主体并列的独立区域（自带滚动与分隔线）
  default?: () => VNode[] // 面板主体：各面板自行组合头部与内容，日期时间形态为「日期 + 时间」两列
  footer?: () => VNode[]
}
withDefaults(defineProps<PickerPanelProps>(), {
  showFooter: false
})
defineSlots<PickerPanelSlots>()
// 预设侧栏存在时面板宽度随内容展开：主体列靠自身内容定宽（日期列 / 日期时间列 / 双日期面板各有显式宽度）
const slotsExist = useSlotsExist(['presets'])
/** 面板内按下不转移焦点：真实鼠标点击面板不应让触发器输入框失焦 */
function onPanelMousedown(event: MouseEvent): void {
  event.preventDefault()
}
</script>
<template>
  <div class="picker-panel" :class="{ 'picker-panel-has-presets': slotsExist.presets }" @mousedown="onPanelMousedown">
    <div class="picker-panel-body">
      <slot name="presets" />
      <!-- 主体列：内容与页脚同属面板区域，页脚因此不会横跨到侧栏下方 -->
      <div class="picker-panel-main">
        <slot />
        <div v-if="showFooter" class="picker-panel-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.picker-panel {
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 280px;
  text-align: center;
  background: var(--picker-panel-bg-color, #fff);
  // 面板自身不画边框：外边界由圆角 + 阴影提供，overflow 负责裁掉内容在圆角处的溢出
  border-radius: 8px;
  outline: none;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  // 行布局：预设侧栏与主体列并排（无侧栏时主体列独占整宽，观感与单列无异）
  .picker-panel-body {
    display: flex;
  }
  // 列布局：主体内容在上、页脚在下
  .picker-panel-main {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
  }
  .picker-panel-footer {
    width: min-content;
    min-width: 100%;
    line-height: 38px;
    text-align: center;
    border-top: 1px solid rgba(5, 5, 5, 0.06);
  }
}
// 预设侧栏存在时宽度交给内容（侧栏 + 主体）
.picker-panel.picker-panel-has-presets {
  width: auto;
}
</style>
