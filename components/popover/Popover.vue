<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import Tooltip from '../tooltip'
import { useSlotsExist } from '../utils'
interface Props {
  title?: string // 卡片标题 string | slot
  titleStyle?: CSSProperties // 卡片标题样式
  content?: string // 卡片内容 string | slot
  contentStyle?: CSSProperties // 卡片内容样式
  tooltipStyle?: CSSProperties // 设置弹出提示的样式
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  titleStyle: () => ({}),
  content: undefined,
  contentStyle: () => ({}),
  tooltipStyle: () => ({})
})
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
    v-bind="$attrs"
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
