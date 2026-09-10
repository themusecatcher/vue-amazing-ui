<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import Tooltip from 'components/tooltip'
import { useSlotsExist } from 'components/utils'

export interface Props {
  title?: string // 卡片标题
  titleStyle?: CSSProperties // 卡片标题样式
  content?: string // 卡片内容
  contentStyle?: CSSProperties // 卡片内容样式
  tooltipStyle?: CSSProperties // 设置弹出提示的样式
}
// 声明组件插槽类型
export interface PopoverSlots {
  title?: () => VNode[]
  content?: () => VNode[]
  default?: () => VNode[]
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  titleStyle: () => ({}),
  content: undefined,
  contentStyle: () => ({}),
  tooltipStyle: () => ({})
})
defineSlots<PopoverSlots>()
const slotsExist = useSlotsExist(['title', 'content'])
const showTitle = computed(() => {
  return slotsExist.title || props.title
})
const showContent = computed(() => {
  return slotsExist.content || props.content
})
</script>
<template>
  <Tooltip
    max-width="auto"
    bg-color="#fff"
    :tooltip-style="{
      padding: '12px',
      borderRadius: '8px',
      textAlign: 'start',
      ...tooltipStyle
    }"
    :transition-duration="200"
  >
    <template #tooltip>
      <div v-if="showTitle" class="popover-title" :class="{ mb8: showContent }" :style="titleStyle">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="showContent" class="popover-content" :style="contentStyle">
        <slot name="content">{{ content }}</slot>
      </div>
    </template>
    <slot></slot>
  </Tooltip>
</template>
<style lang="less" scoped>
.popover-title {
  min-width: 176px;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
}
.mb8 {
  margin-bottom: 8px;
}
.popover-content {
  color: rgba(0, 0, 0, 0.88);
}
</style>
