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
  // 字号：面板属「浮层面板」容器，文字规格由面板自身给定 —— 面板根按项目正文基准声明默认字号
  // （见 development/component-design.md §字体口径），面板内自绘文本一律继承此值。
  // 不声明则会跟随宿主页面字号：文档站 `html` 为 16px（面板整体被放大），而演示站被 `Row` / `Col`
  // 的 14px 压住，同一组件在两处呈现不同字号
  font-size: 14px;
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
  // 额外页脚左对齐（与居中的操作行区分），水平内边距与面板头部 / 内容一致
  .picker-panel-footer-extra {
    padding: 0 8px;
    line-height: 38px;
    text-align: start;
    // 之后还有操作行时补一道分隔线，额外页脚落在页脚末尾则不补（避免底部多出一道线）
    &:not(:last-child) {
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    }
  }
}
// 预设侧栏存在时宽度交给内容（侧栏 + 主体）
.picker-panel.picker-panel-has-presets {
  width: auto;
}
</style>
