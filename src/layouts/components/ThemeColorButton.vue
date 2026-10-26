<script setup lang="ts">
import { computed, ref } from 'vue'
import { BgColorsOutlined } from '@ant-design/icons-vue'
import { DEFAULT_PRIMARY, setThemePrimary, theme } from '@/theme'
// 主色即可写回共享主题的种子（未取色时回落默认主色），与取色面板双向绑定
// 面板限定 hex 模式：主题种子只接受不透明的 #rgb / #rrggbb，rgb() / hsl() 会被 ConfigProvider 判为非法并回退默认值
const primary = computed<string>({
  get: () => theme.value.seed?.primary ?? DEFAULT_PRIMARY,
  set: (color) => {
    if (color) setThemePrimary(color)
  }
})
// 取色面板的预设色板：每个色系只留一个代表色（近似色会让「换主题色」失去意义），
// 与文档站 docs/.vitepress/theme/theme-color.ts 保持同一份口径
const swatches = ['#1677ff', '#722ed1', '#eb2f96', '#f5222d', '#FF6900', '#FFB400', '#52c41a', '#13c2c2']
const tooltipProps = {
  tooltipStyle: {
    fontWeight: 500,
    padding: '8px 12px',
    textAlign: 'center' as const
  }
}
const panelOpen = ref<boolean>(false) // 取色面板显隐（受控，用于连同气泡一起收起）
const triggerHovered = ref<boolean>(false) // 触发器的鼠标悬停态
// 面板打开时收起气泡：气泡族层级（1070）本就高于下拉面板族（1050），不收起会盖住取色面板；
// 收起的时机取「面板一打开就关」，而不是等鼠标移开（指针停在按钮上时会一直挡住面板）；
// 气泡方向沿用 FloatButton 的默认左侧（与取色面板同侧），不在此覆盖 placement
const themeTooltipProps = computed(() => ({
  ...tooltipProps,
  openControl: true,
  open: triggerHovered.value && !panelOpen.value
}))
</script>
<template>
  <!-- 浮钮作为 ColorPicker 的自定义触发器：外壳已固定在按钮位置，面板锚点即按钮本身；
       外壳自带 role/tabindex（且不绘制焦点环），tabindex 置 -1 只留浮钮一个键盘停留点，开合仍由外壳接管 -->
  <ColorPicker
    class="theme-color-picker"
    v-model:value="primary"
    v-model:open="panelOpen"
    placement="leftBottom"
    :offset="12"
    :show-alpha="false"
    :modes="['hex']"
    :swatches="swatches"
    :panel-style="{ width: '224px' }"
    :tabindex="-1"
  >
    <template #trigger>
      <!-- 气泡与面板同侧（FloatButton 默认朝左）：面板打开期间气泡由 themeTooltipProps 收起，不会与面板同时出现 -->
      <FloatButton
        type="primary"
        :tooltip-props="themeTooltipProps"
        @mouseenter="triggerHovered = true"
        @mouseleave="triggerHovered = false"
      >
        <template #icon>
          <BgColorsOutlined />
        </template>
        <template #tooltip>主题色设置</template>
      </FloatButton>
    </template>
    <template #footer>
      <p class="theme-color-tip">选中的颜色作为组件库主色，应用到演示站内所有组件，刷新后保持</p>
    </template>
  </ColorPicker>
</template>
<style lang="less" scoped>
/* 取色器外壳：固定成 44 × 44 的浮钮占位，既是面板锚点也是浮钮的排布容器；位于 BackTop（bottom: 40）上方 */
.theme-color-picker {
  position: fixed;
  right: calc(40px + var(--va-scrollbar-width, 0px));
  bottom: 100px;
  z-index: 99;
  width: 44px;
  height: 44px;
  /* FloatButton 自身是 position: fixed（偏移取自自身 props），这里改为随外壳排布，
     让「按钮所在位置」与「ColorPicker 的锚点」只有一个来源，避免两处坐标各写一遍 */
  :deep(.float-btn-wrap) {
    position: static;
    width: 100%;
    height: 100%;
  }
}
.theme-color-tip {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--va-text-color-3);
}
</style>
