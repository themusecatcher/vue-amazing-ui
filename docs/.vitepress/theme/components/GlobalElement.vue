<script setup lang="ts">
import { computed, ref } from 'vue'
import { BgColorsOutlined } from '@ant-design/icons-vue'
import MailSVG from './MailSVG.vue'
import { THEME_SWATCHES, themePrimary } from '../theme-color'
interface Props {
  hideSponsor?: boolean // 是否隐藏 赞助 按钮
  hideBackTop?: boolean // 是否隐藏 BackTop 组件
  hideWatermark?: boolean // 是否隐藏 Watermark 组件
}
withDefaults(defineProps<Props>(), {
  hideSponsor: false,
  hideBackTop: false,
  hideWatermark: false
})
// 常驻浮钮的气泡皮肤：几处共用一份，避免逐条重复
const tooltipProps = {
  tooltipStyle: {
    fontWeight: 500,
    padding: '8px 12px',
    textAlign: 'center' as const
  }
}
// 邮箱气泡：地址需整行展示，故放宽最大宽度（默认 200 会把域名尾巴挤到第二行）
const mailTooltipProps = { ...tooltipProps, maxWidth: 240 }
const panelOpen = ref<boolean>(false) // 取色面板显隐（受控，用于连同气泡一起收起）
// 面板限定 hex 模式：主题种子只接受不透明的 #rgb / #rrggbb，rgb() / hsl() 会被 ConfigProvider 判为非法并回退默认值
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
  <!-- 主题色设置：浮钮作为 ColorPicker 的自定义触发器 ——
       外壳已固定在按钮位置，面板锚点即按钮本身，弹层不会被带到页面左上角；
       外壳自带 role/tabindex（且不绘制焦点环），tabindex 置 -1 只留浮钮一个键盘停留点，开合仍由外壳接管 -->
  <ColorPicker
    class="theme-color-picker"
    v-model:value="themePrimary"
    v-model:open="panelOpen"
    placement="leftBottom"
    :offset="12"
    :show-alpha="false"
    :modes="['hex']"
    :swatches="THEME_SWATCHES"
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
      <p class="theme-color-tip">选中的颜色作为组件库主色，应用到文档站内所有组件，刷新后保持</p>
    </template>
  </ColorPicker>
  <FloatButton
    v-if="!hideSponsor"
    :bottom="220"
    type="primary"
    tooltip="成为赞助者 ✨"
    :tooltip-props="tooltipProps"
    href="https://themusecatcher.github.io/vue-amazing-ui/sponsor/charge.html"
    target="_blank"
  >
    <template #description>
      <span style="font-size: 14px; font-weight: 600">赞助</span>
    </template>
  </FloatButton>
  <FloatButton :bottom="160" type="primary" :tooltip-props="mailTooltipProps">
    <template #icon>
      <MailSVG />
    </template>
    <template #tooltip>
      <span class="mail-tooltip">
        <span class="mail-tooltip-title"><MailSVG /> Email Me</span>
        <span class="mail-address">themusecatcher@163.com</span>
      </span>
    </template>
  </FloatButton>
  <BackTop v-if="!hideBackTop" />
  <Watermark v-if="!hideWatermark" fullscreen content="Vue Amazing UI" />
</template>
<style lang="less" scoped>
/* 取色器外壳：本身固定成 44 × 44 的浮钮占位，既是面板锚点也是浮钮的排布容器 */
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
/* 邮箱气泡：标题行 + 地址行，地址整行展示（避免域名尾巴被折断到第二行） */
.mail-tooltip {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mail-tooltip-title {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.mail-address {
  font-size: 13px;
  letter-spacing: 0.2px;
  white-space: nowrap;
}
</style>
