<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

interface Props {
  screen?: boolean // 是否用于移动端导航屏（导航栏形态在 <768px 隐藏，由该形态承接）
}
const props = withDefaults(defineProps<Props>(), {
  screen: false
})

const { theme } = useData()
// 版本号来自 config.ts 的 themeConfig.version；docs/ 不在任何 tsconfig 的 include 中，
// 此处用窄断言读取，避免依赖类型扩充文件的加载时机
const version = computed(() => (theme.value as { version?: string }).version ?? '')
const href = withBase('/guide/changelog')
</script>

<template>
  <a
    v-if="version"
    class="version-badge"
    :class="{ 'version-badge--screen': screen }"
    :href="href"
    :aria-label="`当前版本 ${version}，查看更新日志`"
  >
    <!-- 导航栏形态直接用作组件库的 Tag（processing = 主色系），于是颜色来自 ConfigProvider 的 seed.primary，
         跟着文档站右下角取色器一起变；移动端菜单内仍是纯文本，不套标签 -->
    <Tag v-if="!screen" color="processing">{{ version }}</Tag>
    <template v-else>当前版本 {{ version }}</template>
  </a>
</template>

<style scoped>
/* 导航栏形态：外壳只负责排版与可达性，视觉全部交给 Tag（22px 高 / 无边框 / 6px 圆角）。
   margin 与社交图标拉开 14px，读作「另一组」信息 */
.version-badge {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  margin-left: 14px;
  text-decoration: none;
  /* 导航栏 content-body 在站点样式里被设为 pointer-events: none，徽标需自行恢复可点击 */
  pointer-events: auto;
  transition: transform 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

/* 悬停只做轻微放大（沿用站点 pager-link / DocSearch 的手感），颜色交给 Tag 自己的主题色 */
.version-badge:hover {
  transform: scale(1.05);
}

/* 版本数字比 Tag 默认排版更「像版本号」：等宽数字 + 略加字重与字距，缩小后也不易糊成一团；
   圆角取 6px（Tag 默认 4px 偏方、round 的胶囊又太软），横向内边距比默认多 2px；
   无边框：描边只保留 1px 宽度并置透明，几何尺寸不变，形状交给底色 + 一层极淡投影 */
.version-badge :deep(.tag-wrap) {
  padding-inline: 9px;
  border-color: transparent;
  border-radius: 6px;
  /* 双层投影：近处一层负责「贴地」的边缘，远处一层大模糊负扩散负责环境感。
     只有一种阴影基色可用，两层叠出层次；负扩散把边缘收窄，避免发灰 */
  box-shadow:
    0 1px 2px var(--va-shadow-color),
    0 4px 12px -2px var(--va-shadow-color);
  font-weight: 600;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
}

/* 悬停：加一层光晕会重新长出「边框」的观感，所以改为整体抬升 —— 两层投影同时加大位移与模糊，
   层数不变（两层 → 两层），transition 才能按层插值，不会跳变 */
.version-badge:hover :deep(.tag-wrap) {
  box-shadow:
    0 2px 4px var(--va-shadow-color),
    0 8px 20px -4px var(--va-shadow-color);
}

/* 焦点环只在键盘导航时出现，且画在胶囊上（与 Tag 关闭按钮同一口径：2px 主色实色），
   鼠标点击/悬停都不留环 —— 链接的默认 outline 是方框，与胶囊形状对不上，一律接管 */
.version-badge:focus {
  outline: none;
}

.version-badge:focus-visible :deep(.tag-wrap) {
  box-shadow: 0 0 0 2px var(--va-primary-color);
}

/* 暗色：Tag 的主色浅底（#111a2c）比导航底还暗，无边框时会糊成一块，改用中性提亮底（白 8%）；
   文字提亮到主色的 hover 变体 —— 深底上原本的暗色变体偏闷、对比度不足。
   投影在暗色下一律关掉：阴影基色是 45% 纯黑，大模糊层会在深底上糊出一圈脏晕，
   而深色表面本来也不靠投影分层，层次交给底色 */
.dark .version-badge :deep(.tag-wrap) {
  background-color: var(--va-fill-color-1);
  color: var(--va-primary-color-hover);
  box-shadow: none;
}

/* 暗色的悬停反馈改由底色提亮一档承担（白 8% → 12%），配合外壳的放大 */
.dark .version-badge:hover :deep(.tag-wrap) {
  background-color: var(--va-fill-color-2);
  box-shadow: none;
}

/* 上面的暗色规则会盖掉焦点环（权重同为 0,4,0 且在后方），单独再声明一次 */
.dark .version-badge:focus-visible :deep(.tag-wrap) {
  box-shadow: 0 0 0 2px var(--va-primary-color-hover);
}

/* 导航栏形态：<768px 隐藏（空间被搜索与汉堡占满），改由移动端菜单内的形态承接 */
@media (max-width: 767px) {
  .version-badge:not(.version-badge--screen) {
    display: none;
  }
}

/* 移动端导航屏形态：菜单底部独立一行，与上方社交图标（居中）对齐。
   这里必须是块级 flex（内容居中后才与上方图标同轴），inline-flex 会按内容宽度收缩、贴到左侧 */
.version-badge--screen {
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
  color: var(--vp-c-text-3);
  font-size: 13px;
  line-height: 1.4;
}

.version-badge--screen:hover {
  transform: none;
}
</style>
