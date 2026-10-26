<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useWindowWidth } from 'components/utils'
import SideMenu from './components/SideMenu.vue'
import ThemeColorButton from './components/ThemeColorButton.vue'
import ThemeModeButton from './components/ThemeModeButton.vue'
import type { SideMenuSize } from './components/SideMenu.vue'
import { theme } from '@/theme'
import type { Scrollbar } from 'vue-amazing-ui'
const route = useRoute() // 返回当前路由地址，相当于在模板中使用 $route
// 侧栏菜单的明暗跟随共享主题（模式切换入口统一收敛到右下角的暗黑模式浮钮）
const isDark = computed<boolean>(() => theme.value.mode === 'dark')
const contentScrollRef = ref<InstanceType<typeof Scrollbar> | null>(null)
// 少数演示页需要验证「随文档滚动」的行为（如全屏水印 fixed=false），改为整页滚动：
// 此时不套 Scrollbar，侧栏用 sticky 固定在视口
const windowScroll = computed(() => route.meta.windowScroll === true)
// 路由变化后把滚动位置复位：内容区滚动由 Scrollbar 承载（window 的 scrollBehavior 管不到），
// 整页滚动页则复位 window
watch(
  () => route.fullPath,
  () => {
    window.scrollTo({ top: 0 })
    contentScrollRef.value?.scrollTo({ top: 0 })
  },
  { flush: 'post' }
)

// 侧栏分档：档位与库内 Col 断点口径一致（xl ≥1200 / lg ≥992 / md ≥768 / sm 更窄），
// 宽度与菜单密度（字号、行高、内边距、文案详略）一起变化，取值见 SideMenu.vue
const ASIDE_WIDTH: Record<SideMenuSize, number> = { xl: 232, lg: 204, md: 176, sm: 152 }
const viewportWidth = useWindowWidth()
const asideSize = computed<SideMenuSize>(() => {
  const width = viewportWidth.value
  if (width >= 1200) return 'xl'
  if (width >= 992) return 'lg'
  if (width >= 768) return 'md'
  return 'sm'
})
const asideWidth = computed<number>(() => ASIDE_WIDTH[asideSize.value])
// 整页滚动页：侧栏吸附在视口顶部（sticky），其余页面沿用相对定位
const asideColStyle = computed(() =>
  windowScroll.value
    ? {
        position: 'sticky' as const,
        top: '0',
        alignSelf: 'flex-start' as const,
        height: '100vh',
        width: `${asideWidth.value}px`
      }
    : { position: 'relative' as const, width: `${asideWidth.value}px` }
)
</script>
<template>
  <Row :style="windowScroll ? { alignItems: 'flex-start' } : undefined" style="width: 100%">
    <!--
      侧栏宽度按视口分档（232 / 204 / 176 / 152），档位随菜单密度一起变化，见上方 asideSize。
      宽度写在 `width` 上、flex-basis 交由 `0 0 auto` 遵循：flex-basis 直接写像素值会被 min-width: auto
      的 min-content（菜单最长项）撑开，`width` 则能提供 specified size suggestion 解除该限制
    -->
    <Col :flex="'0 0 auto'" :style="asideColStyle">
      <SideMenu :theme="isDark ? 'dark' : 'light'" :size="asideSize" />
    </Col>
    <Col :flex="'1 1 0%'" style="min-width: 0">
      <!--
        不开 x-scrollable：该模式下 Scrollbar 会把内容层内联设为 `width: fit-content`，
        内容比容器宽时按 max-content 撑开（无上限），页面内所有 `width: 100%` 的组件会跟着变宽。
        这里要求内容宽度始终限制在内容区宽度内（溢出由容器自身承载），故保持默认
      -->
      <Scrollbar v-if="!windowScroll" ref="contentScrollRef" style="height: 100vh">
        <div class="router-view">
          <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <component :is="Component" />
            </Transition>
          </RouterView>
          <ThemeColorButton />
          <ThemeModeButton />
          <BackTop v-if="route.meta.backTop !== false" />
        </div>
      </Scrollbar>
      <!-- 整页滚动页：不套 Scrollbar，滚动交给文档（window），供全屏水印等需要「随文档滚动」的演示验证 -->
      <div v-else class="router-view">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
        <ThemeColorButton />
        <ThemeModeButton />
        <BackTop v-if="route.meta.backTop !== false" />
      </div>
    </Col>
  </Row>
</template>
<style lang="less" scoped>
.router-view {
  padding: 36px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
