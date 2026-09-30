<script setup lang="ts">
export interface PickerPanelProps {
  showHeader?: boolean // 是否展示面板头部（导航与视图切换）
  showSingleNav?: boolean // 是否展示「上一/下一」单步按钮（月、年面板只保留跨单位跳转）
  showFooter?: boolean // 是否展示面板底部（内容由 footer 插槽提供），各面板按自身视图切换
}
withDefaults(defineProps<PickerPanelProps>(), {
  showHeader: true,
  showSingleNav: true,
  showFooter: false
})
const emits = defineEmits<{
  superPrev: []
  prev: []
  next: []
  superNext: []
}>()
/** 面板内按下不转移焦点（对齐参考实现的面板容器口径）：真实鼠标点击面板不应让触发器输入框失焦 */
function onPanelMousedown(event: MouseEvent): void {
  event.preventDefault()
}
</script>
<template>
  <div class="picker-panel" @mousedown="onPanelMousedown">
    <div v-if="showHeader" class="picker-panel-header">
      <button type="button" tabindex="-1" class="picker-panel-super-prev" @click="emits('superPrev')">
        <span class="picker-panel-nav-icon picker-panel-nav-icon-super picker-panel-nav-icon-prev" />
      </button>
      <button v-if="showSingleNav" type="button" tabindex="-1" class="picker-panel-prev" @click="emits('prev')">
        <span class="picker-panel-nav-icon picker-panel-nav-icon-prev" />
      </button>
      <div class="picker-panel-view">
        <slot name="header" />
      </div>
      <button v-if="showSingleNav" type="button" tabindex="-1" class="picker-panel-next" @click="emits('next')">
        <span class="picker-panel-nav-icon picker-panel-nav-icon-next" />
      </button>
      <button type="button" tabindex="-1" class="picker-panel-super-next" @click="emits('superNext')">
        <span class="picker-panel-nav-icon picker-panel-nav-icon-super picker-panel-nav-icon-next" />
      </button>
    </div>
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
  // 三种视图（日 / 月 / 年）共用同一宽度，避免切换视图时面板宽度跳动
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
      // 视图切换按钮由各面板经 #header 插槽传进来，scoped 样式默认选不中插槽内容，须显式声明 :slotted
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
