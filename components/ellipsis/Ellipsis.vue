<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import Tooltip from '../tooltip'
import { useResizeObserver } from '../utils'
interface Props {
  maxWidth?: number | string // 文本最大宽度
  line?: number // 最大行数
  expand?: boolean // 是否启用点击文本展开全部
  tooltip?: boolean // 是否启用文本提示框
  tooltipProps?: object // tooltip 组件属性配置
}
const props = withDefaults(defineProps<Props>(), {
  maxWidth: '100%',
  line: undefined,
  expand: false,
  tooltip: true,
  tooltipProps: () => ({})
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
    defaultTooltipMaxWidth.value = ellipsisRef.value.offsetWidth + 24
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
    :overlay-style="{ padding: '8px 12px', textAlign: 'justify' }"
    v-bind="tooltipProps"
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
