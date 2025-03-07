<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { CSSProperties } from 'vue'
import { useEventListener } from 'components/utils'
export interface Responsive {
  xs?: number // 480px
  sm?: number // 576px
  md?: number // 768px
  lg?: number // 992px
  xl?: number // 1200px
  xxl?: number // 1600px
  xxxl?: number // 2000px
}
export interface Props {
  class?: string // 容器 class
  style?: CSSProperties // 指定样式
  width?: number | string // 宽度，单位 px
  collapsible?: boolean // 是否可收起
  collapsedWidth?: number | Responsive // 收起时的宽度，设置为 0 会出现特殊 trigger，支持像素值或响应式的对象写法
  trigger?: string // 自定义收起触发器，设置为 null 时隐藏触发器 string | slot
  breakpoint?: keyof Responsive // 触发收起的断点
  collapsed?: boolean // (v-model) 当前收起状态
}
const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  style: () => ({}),
  width: 200,
  collapsible: false,
  collapsedWidth: 80,
  trigger: undefined,
  breakpoint: undefined,
  collapsed: undefined
})
const responsiveSize = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
  xxxl: 2000
}
const viewportWidth = ref(window.innerWidth)
const siderCollapsed = ref<boolean>()
const emits = defineEmits(['update:collapsed', 'collapse', 'breakpoint'])
const collapsedSiderWidth = computed(() => {
  if (typeof props.collapsedWidth === 'number') {
    return props.collapsedWidth
  } else {
    return getResponsiveCollapsedWidth(props.collapsedWidth)
  }
})
const siderWidth = computed(() => {
  if (props.collapsible && siderCollapsed.value) {
    return `${collapsedSiderWidth.value}px`
  }
  return typeof props.width === 'number' ? `${props.width}px` : props.width
})
const siderStyle = computed(() => {
  const style: CSSProperties = {
    ...props.style,
    flex: `0 0 ${siderWidth.value}`,
    maxWidth: siderWidth.value,
    minWidth: siderWidth.value,
    width: siderWidth.value
  }
  return style
})
const breakpointCollapsed = computed(() => {
  if (props.breakpoint) {
    return viewportWidth.value < responsiveSize[props.breakpoint]
  }
  return null
})
watchEffect(() => {
  siderCollapsed.value = props.collapsed
})
useEventListener(window, 'resize', onResize)
function onResize() {
  getViewportWidth()
  if (breakpointCollapsed.value !== null && siderCollapsed.value !== breakpointCollapsed.value) {
    siderCollapsed.value = breakpointCollapsed.value
    emits('update:collapsed', siderCollapsed.value)
    emits('collapse', siderCollapsed.value, 'responsiveBreakpoint')
  }
}
function getViewportWidth() {
  viewportWidth.value = window.innerWidth
}
function getResponsiveCollapsedWidth(collapsedWidth: Responsive) {
  if (viewportWidth.value >= 2000 && collapsedWidth.xxxl !== undefined) {
    return collapsedWidth.xxxl
  }
  if (viewportWidth.value >= 1600 && collapsedWidth.xxl !== undefined) {
    return collapsedWidth.xxl
  }
  if (viewportWidth.value >= 1200 && collapsedWidth.xl !== undefined) {
    return collapsedWidth.xl
  }
  if (viewportWidth.value >= 992 && collapsedWidth.lg !== undefined) {
    return collapsedWidth.lg
  }
  if (viewportWidth.value >= 768 && collapsedWidth.md !== undefined) {
    return collapsedWidth.md
  }
  if (viewportWidth.value >= 576 && collapsedWidth.sm !== undefined) {
    return collapsedWidth.sm
  }
  if (viewportWidth.value < 576 && collapsedWidth.xs !== undefined) {
    return collapsedWidth.xs
  }
  return 80
}
function toggleCollapse() {
  siderCollapsed.value = !siderCollapsed.value
  emits('update:collapsed', siderCollapsed.value)
  emits('collapse', siderCollapsed.value, 'clickTrigger')
}
</script>
<template>
  <aside class="layout-sider" :class="{ 'layout-sider-has-trigger': collapsible }" :style="siderStyle">
    <div class="layout-sider-children" :style="`collapsed-sider-width: ${collapsedSiderWidth}px;`">
      <slot></slot>
    </div>
    <template v-if="trigger !== null && collapsible">
      <span
        v-if="collapsedSiderWidth === 0"
        class="layout-sider-zero-width-trigger layout-sider-zero-width-trigger-left"
        @click="toggleCollapse"
      >
        <svg
          class="bars-svg"
          focusable="false"
          data-icon="bars"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"
          ></path>
        </svg>
      </span>
      <div v-else class="layout-sider-trigger" :style="`width: ${siderWidth}`" @click="toggleCollapse">
        <svg
          class="arrow-svg"
          :class="{ 'rotate-arrow': siderCollapsed }"
          focusable="false"
          data-icon="left"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
          ></path>
        </svg>
      </div>
    </template>
  </aside>
</template>
<style lang="less" scoped>
.layout-sider-children {
  :deep(.ant-menu-inline-collapsed) {
    width: var(--collapsed-sider-width);
  }
}
.bars-svg {
  fill: currentColor;
}
.arrow-svg {
  fill: currentColor;
  transition: all 0.2s;
}
.rotate-arrow {
  transform: rotateY(180deg);
}
</style>
