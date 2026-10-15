<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { toggleDark, useMutationObserver, useWindowWidth } from 'components/utils'
import SideMenu from './components/SideMenu.vue'
import type { SideMenuSize } from './components/SideMenu.vue'
import type { Scrollbar } from 'vue-amazing-ui'
const route = useRoute() // 返回当前路由地址，相当于在模板中使用 $route
const themeDark = ref<boolean>(false)
const html = document.documentElement
onMounted(() => {
  themeDark.value = html.classList.contains('dark')
})
// 只关心主题类名的变化：toggleDark 还会同时改写 html.style.colorScheme，
// 不限定属性名会让每次主题切换触发两次回调
useMutationObserver(
  html,
  () => {
    themeDark.value = html.classList.contains('dark')
  },
  { attributeFilter: ['class'] }
)
const contentScrollRef = ref<InstanceType<typeof Scrollbar> | null>(null)
// 路由变化后把内容区滚动位置复位：滚动由内容区的 Scrollbar 容器承载，
// router 的 scrollBehavior 只作用于 window，管不到它
watch(
  () => route.fullPath,
  () => {
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
</script>
<template>
  <Row style="width: 100%">
    <!--
      侧栏宽度按视口分档（232 / 204 / 176 / 152），档位随菜单密度一起变化，见上方 asideSize。
      宽度写在 `width` 上、flex-basis 交由 `0 0 auto` 遵循：flex-basis 直接写像素值会被 min-width: auto
      的 min-content（菜单最长项）撑开，`width` 则能提供 specified size suggestion 解除该限制
    -->
    <Col :flex="'0 0 auto'" :style="{ position: 'relative', width: `${asideWidth}px` }">
      <Switch
        class="switch-theme"
        v-model:value="themeDark"
        ripple-color="#faad14"
        :circle-style="{ background: themeDark ? '#001529' : '#fff' }"
        @change="toggleDark"
      >
        <template #node>
          <svg
            v-if="themeDark"
            class="svg-dark"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path
              d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"
            ></path>
          </svg>
          <svg
            v-else
            class="svg-light"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path
              d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"
            ></path>
            <path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path>
            <path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path>
            <path
              d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"
            ></path>
            <path
              d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"
            ></path>
            <path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path>
            <path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path>
            <path
              d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"
            ></path>
            <path
              d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"
            ></path>
          </svg>
        </template>
      </Switch>
      <SideMenu :theme="themeDark ? 'dark' : 'light'" :size="asideSize" />
    </Col>
    <Col :flex="'1 1 0%'" style="min-width: 0">
      <!--
        不开 x-scrollable：该模式下 Scrollbar 会把内容层内联设为 `width: fit-content`，
        内容比容器宽时按 max-content 撑开（无上限），页面内所有 `width: 100%` 的组件会跟着变宽。
        这里要求内容宽度始终限制在内容区宽度内（溢出由容器自身承载），故保持默认
      -->
      <Scrollbar ref="contentScrollRef" style="height: 100vh">
        <div class="router-view">
          <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <component :is="Component" />
            </Transition>
          </RouterView>
          <BackTop v-if="route.meta.backTop !== false" />
        </div>
      </Scrollbar>
    </Col>
  </Row>
</template>
<style lang="less" scoped>
.switch-theme {
  position: absolute !important;
  top: 13px;
  right: 13px;
  z-index: 3;
  :deep(&.switch-checked) {
    background: #faad14 !important;
    &:hover {
      background: #e8b339 !important;
    }
  }
}
.svg-dark {
  width: 12px;
  height: 12px;
  fill: #fff;
}
.svg-light {
  width: 12px;
  height: 12px;
  fill: rgba(60, 60, 67, 0.75);
}
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
