<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { CSSProperties } from 'vue'
export interface Props {
  class?: string // 容器 class
  style?: CSSProperties // 指定样式
  width?: number | string // 宽度，单位 px
  collapsible?: boolean // 是否可收起
  trigger?: string // 自定义收起触发器，设置为 null 时隐藏触发器 string | slot
  collapsed?: boolean // (v-model) 当前收起状态
}
const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  style: () => ({}),
  width: 200,
  collapsible: false,
  trigger: undefined,
  collapsed: undefined
})
const siderCollapsed = ref<boolean>()
const emits = defineEmits(['update:collapsed', 'collapse'])
const siderWidth = computed(() => {
  if (props.collapsible && siderCollapsed.value) {
    return '80px'
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
watchEffect(() => {
  siderCollapsed.value = props.collapsed
})
function toggleCollapse() {
  siderCollapsed.value = !siderCollapsed.value
  emits('update:collapsed', siderCollapsed.value)
  emits('collapse', siderCollapsed.value)
}
</script>
<template>
  <aside class="layout-sider" :class="{ 'layout-sider-has-trigger': collapsible }" :style="siderStyle">
    <div class="layout-sider-children">
      <slot></slot>
    </div>
    <div
      v-if="trigger !== null && collapsible"
      class="layout-sider-trigger"
      :style="`width: ${siderWidth}`"
      @click="toggleCollapse"
    >
      <svg class="arrow-svg" :class="{'rotate-arrow': siderCollapsed }" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
    </div>
  </aside>
</template>
<style lang="less" scoped>
.arrow-svg {
  transition: all 0.2s;
}
.rotate-arrow {
  transform: rotateY(180deg);
}
</style>
