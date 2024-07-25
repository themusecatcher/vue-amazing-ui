<script setup lang="ts">
import Tooltip from '../tooltip'
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { useResizeObserver } from '../utils'
interface Props {
  maxWidth?: number | string // 文本最大宽度
  line?: number // 最大行数
  expand?: boolean // 是否启用点击文本展开全部
  tooltip?: boolean // 是否启用文本提示框
  // 以下均为 tooltip 组件属性
  tooltipMaxWidth?: number // 提示框内容最大宽度，单位 px，默认不设置时，提示文本内容自动与展示文本宽度保持一致
  tooltipFontSize?: number // 提示文本字体大小，单位 px，优先级高于 overlayStyle
  tooltipColor?: string // 提示文本字体颜色，优先级高于 overlayStyle
  tooltipBackgroundColor?: string // 提示框背景颜色，优先级高于 overlayStyle
  tooltipOverlayStyle?: CSSProperties // 提示框内容区域样式
}
const props = withDefaults(defineProps<Props>(), {
  maxWidth: '100%',
  line: undefined,
  expand: false,
  tooltip: true,
  tooltipMaxWidth: undefined,
  tooltipFontSize: 14,
  tooltipColor: '#FFF',
  tooltipBackgroundColor: 'rgba(0, 0, 0, 0.85)',
  tooltipOverlayStyle: () => ({ padding: '8px 12px', textAlign: 'justify' })
})
const showTooltip = ref(false) // 是否显示提示框
const showExpand = ref(false) // 是否可以启用点击展开
const ellipsisRef = ref()
const defaultTooltipMaxWidth = ref()
const textMaxWidth = computed(() => {
  if (typeof props.maxWidth === 'number') {
    return props.maxWidth + 'px'
  }
  return props.maxWidth
})
watch(
  () => [props.maxWidth, props.line, props.tooltip],
  () => {
    if (props.tooltip) {
      showTooltip.value = getTooltipShow()
    }
  },
  {
    deep: true,
    flush: 'post'
  }
)
useResizeObserver(ellipsisRef, () => {
  if (props.tooltip) {
    showTooltip.value = getTooltipShow()
  }
})
onMounted(() => {
  if (props.tooltip) {
    showTooltip.value = getTooltipShow()
  }
})
function getTooltipShow() {
  const scrollWidth = ellipsisRef.value.scrollWidth
  const scrollHeight = ellipsisRef.value.scrollHeight
  const clientWidth = ellipsisRef.value.clientWidth
  const clientHeight = ellipsisRef.value.clientHeight
  if (scrollWidth > clientWidth || scrollHeight > clientHeight) {
    if (props.tooltipMaxWidth) {
      defaultTooltipMaxWidth.value = props.tooltipMaxWidth
    } else {
      defaultTooltipMaxWidth.value = ellipsisRef.value.offsetWidth + 24
    }
    if (props.expand) {
      showExpand.value = true
    }
    return true
  } else {
    if (props.expand) {
      showExpand.value = false
    }
    return false
  }
}
const emit = defineEmits(['expandChange'])
function onExpand() {
  if (ellipsisRef.value.style['-webkit-line-clamp']) {
    if (props.tooltip) {
      showTooltip.value = false
      nextTick(() => {
        ellipsisRef.value.style['-webkit-line-clamp'] = ''
      })
    } else {
      ellipsisRef.value.style['-webkit-line-clamp'] = ''
    }
    emit('expandChange', true)
  } else {
    if (props.tooltip) {
      showTooltip.value = true
    }
    ellipsisRef.value.style['-webkit-line-clamp'] = props.line
    emit('expandChange', false)
  }
}
</script>
<template>
  <Tooltip
    v-if="showTooltip"
    :max-width="defaultTooltipMaxWidth"
    :fontSize="tooltipFontSize"
    :color="tooltipColor"
    :backgroundColor="tooltipBackgroundColor"
    :overlayStyle="tooltipOverlayStyle"
  >
    <template #tooltip>
      <slot name="tooltip">
        <slot></slot>
      </slot>
    </template>
    <div
      ref="ellipsisRef"
      class="m-ellipsis"
      :class="[line ? 'ellipsis-line' : 'not-ellipsis-line', { 'cursor-pointer': showExpand }]"
      :style="`-webkit-line-clamp: ${line}; max-width: ${textMaxWidth};`"
      @click="showExpand ? onExpand() : () => false"
      v-bind="$attrs"
    >
      <slot></slot>
    </div>
  </Tooltip>
  <div
    v-else
    ref="ellipsisRef"
    class="m-ellipsis"
    :class="[line ? 'ellipsis-line' : 'not-ellipsis-line', { 'cursor-pointer': showExpand }]"
    :style="`-webkit-line-clamp: ${line}; max-width: ${textMaxWidth};`"
    @click="showExpand ? onExpand() : () => false"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.m-ellipsis {
  overflow: hidden;
  cursor: text;
}
.ellipsis-line {
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
}
.not-ellipsis-line {
  display: inline-block;
  vertical-align: bottom;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
