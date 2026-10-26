<script setup lang="ts">
import { computed } from 'vue'
import type { FunctionalComponent, VNode } from 'vue'
import { useSlotsExist } from 'components/utils'
export interface PickerPanelProps {
  showFooter?: boolean // 是否展示面板底部（内容由 footer 插槽提供），各面板按自身视图切换
  extraFooter?: () => VNode[] // 面板底部的额外页脚：渲染在操作行之上，存在时页脚容器一并展示
}
export interface PickerPanelSlots {
  presets?: () => VNode[] // 面板左侧的预设侧栏：与面板主体并列的独立区域（自带滚动与分隔线）
  default?: () => VNode[] // 面板主体：各面板自行组合头部与内容，日期时间形态为「日期 + 时间」两列
  footer?: () => VNode[]
}
const props = withDefaults(defineProps<PickerPanelProps>(), {
  showFooter: false,
  extraFooter: undefined
})
defineSlots<PickerPanelSlots>()
// 预设侧栏存在时面板宽度随内容展开：主体列靠自身内容定宽（日期列 / 日期时间列 / 双日期面板各有显式宽度）
const slotsExist = useSlotsExist(['presets'])
const hasExtraFooter = computed(() => Boolean(props.extraFooter))
/**
 * 额外页脚的承载组件
 *
 * 用函数式组件承载而非在 `computed` 里直接求值：VNode 必须在渲染上下文内创建，
 * 否则其上的 ref 会成为「无主的 hoisted vnode」（Vue 会告警并跳过 setRef）。
 */
const ExtraFooter: FunctionalComponent = () => props.extraFooter?.() ?? null
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
        <div v-if="showFooter || hasExtraFooter" class="picker-panel-footer">
          <div v-if="hasExtraFooter" class="picker-panel-footer-extra">
            <ExtraFooter />
          </div>
          <slot v-if="showFooter" name="footer" />
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
  font-size: 14px;
  text-align: center;
  background: var(--picker-panel-bg-color, var(--va-bg-elevated-color));
  border-radius: 8px;
  outline: none;
  box-shadow: var(--va-popup-shadow);
  overflow: hidden;
  .picker-panel-body {
    display: flex;
  }
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
    border-top: 1px solid var(--va-border-split-color);
  }
  .picker-panel-footer-extra {
    display: flex;
    align-items: center;
    min-height: 39px;
    padding: 0 8px;
    text-align: start;
    &:not(:last-child) {
      border-bottom: 1px solid var(--va-border-split-color);
    }
  }
}
.picker-panel.picker-panel-has-presets {
  width: auto;
}
</style>
