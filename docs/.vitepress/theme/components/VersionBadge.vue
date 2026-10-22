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
const label = computed(() => (props.screen ? `当前版本 ${version.value}` : version.value))
</script>

<template>
  <a
    v-if="version"
    class="version-badge"
    :class="{ 'version-badge--screen': screen }"
    :href="href"
    :title="`查看 ${version} 更新日志`"
    :aria-label="`当前版本 ${version}，查看更新日志`"
  >
    {{ label }}
  </a>
</template>

<style scoped>
/* 导航栏形态：与 VPNavBarMenuLink 保持同一套排版（14px / 500 / --vp-c-text-1），
   高度取 24px（社交图标 36px、主题开关 22px），只占文本本身的高度，不撑满整条导航栏 */
.version-badge {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 24px;
  margin-left: 8px;
  padding: 0 12px;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  text-decoration: none;
  /* 导航栏 content-body 在站点样式里被设为 pointer-events: none，徽标需自行恢复可点击 */
  pointer-events: auto;
  transition: color 0.25s;
}

.version-badge:hover {
  color: var(--vp-c-brand-1);
}

/* 导航栏形态：<768px 隐藏（空间被搜索与汉堡占满），改由移动端菜单内的形态承接 */
@media (max-width: 767px) {
  .version-badge:not(.version-badge--screen) {
    display: none;
  }
}

/* 移动端导航屏形态：菜单底部独立一行，与上方社交图标（居中）对齐 */
.version-badge--screen {
  justify-content: center;
  height: auto;
  margin: 20px 0 0;
  padding: 0;
  color: var(--vp-c-text-3);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
}
</style>
