<script setup lang="ts">
import Tooltip from '../tooltip'
import { ref, computed, watchEffect, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
interface Props {
  maxWidth?: number|string // 文本最大宽度
  line?: number // 最大行数
  trigger?: 'click' // 展开的触发方式
  tooltip?: boolean // 是否启用文本提示框
  // 以下均为 tooltip 组件属性
  tooltipMaxWidth?: number // 提示框内容最大宽度，单位px，默认不设置时，提示文本内容自动与展示文本宽度保持一致
  tooltipFontSize?: number // 提示文本字体大小，单位px，优先级高于 overlayStyle
  tooltipColor?: string // 提示文本字体颜色，优先级高于 overlayStyle
  tooltipBackgroundColor?: string // 提示框背景颜色，优先级高于 overlayStyle
  tooltipOverlayStyle?: CSSProperties // 提示框内容区域样式
}
const props = withDefaults(defineProps<Props>(), {
  maxWidth: '100%',
  line: undefined,
  trigger: undefined,
  tooltip: true,
  tooltipMaxWidth: undefined,
  tooltipFontSize: 14,
  tooltipColor: '#FFF',
  tooltipBackgroundColor: 'rgba(0, 0, 0, .85)',
  tooltipOverlayStyle: () => ({padding: '8px 12px', textAlign: 'justify'})
})
const textMaxWidth = computed(() => {
  if (typeof props.maxWidth === 'number') {
    return props.maxWidth + 'px'
  }
  return props.maxWidth
})
const showTooltip = ref()
const ellipsis = ref()
const defaultTooltipMaxWidth = ref()
watchEffect(() => {
  showTooltip.value = props.tooltip
})
watchEffect(() => {
  if (props.tooltip) {
    if (props.tooltipMaxWidth) {
      defaultTooltipMaxWidth.value = props.tooltipMaxWidth
    } else {
      defaultTooltipMaxWidth.value = ellipsis.value.offsetWidth + 24
    }
  }
}, {flush: 'post'})
const emit = defineEmits(['expand'])
function onExpand () {
  if (ellipsis.value.style['-webkit-line-clamp']) {
    if (props.tooltip) {
      showTooltip.value = false
      nextTick(() => {
        ellipsis.value.style['-webkit-line-clamp'] = ''
      })
    } else {
      ellipsis.value.style['-webkit-line-clamp'] = ''
    }
    emit('expand', true)
  } else {
    if (props.tooltip) {
      showTooltip.value = true
    }
    ellipsis.value.style['-webkit-line-clamp'] = props.line
    emit('expand', false)
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
    :overlayStyle="tooltipOverlayStyle">
    <template #title>
      <slot name="tooltip">
        <slot></slot>
      </slot>
    </template>
    <div
      ref="ellipsis"
      class="m-ellipsis"
      :class="[line ? 'ellipsis-line' : 'not-ellipsis-line', {'cursor-pointer': trigger === 'click'}]"
      :style="`-webkit-line-clamp: ${line}; max-width: ${textMaxWidth};`"
      @click="trigger === 'click' ? onExpand() : () => false"
      v-bind="$attrs">
      <slot></slot>
    </div>
  </Tooltip>
  <div
    v-else
    ref="ellipsis"
    class="m-ellipsis"
    :class="[line ? 'ellipsis-line' : 'not-ellipsis-line', {'cursor-pointer': trigger === 'click'}]"
    :style="`-webkit-line-clamp: ${line}; max-width: ${textMaxWidth};`"
    @click="trigger === 'click' ? onExpand() : () => false"
    v-bind="$attrs">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.m-ellipsis {
  font-size: 14px;
  line-height: 1.5714285714285714;
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