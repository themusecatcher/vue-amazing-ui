<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import Tooltip from 'components/tooltip'
import { useResizeObserver } from 'components/utils'
export interface Props {
  maxWidth?: string | number // 文本最大宽度，单位 px
  tooltipMaxWidth?: string | number // 弹出提示最大宽度，单位 px，默认为 文本宽度 + 24
  line?: number // 最大行数
  expand?: boolean // 是否启用点击文本展开全部
  tooltip?: boolean // 是否启用文本提示框，可自定义设置弹出提示内容 boolean | slot
}
const props = withDefaults(defineProps<Props>(), {
  maxWidth: '100%',
  tooltipMaxWidth: undefined,
  line: undefined,
  expand: false,
  tooltip: true
})
const tooltipRef = ref() // tooltip 组件引用
const observeScroll = ref() // tooltip 组件暴露的 observeScroll 函数
const showTooltip = ref(false) // 是否显示提示框
const showExpand = ref(false) // 是否可以启用点击展开
const expanded = ref(false) // 启用点击展开时，是否展开
const ellipsisRef = ref() // 文本 DOM 引用
const computedTooltipMaxWidth = ref() // 计算后的弹出提示最大宽度
const ellipsisLine = ref() // 行数
const stopObservation = ref(false)
const emit = defineEmits(['expandChange'])
const textMaxWidth = computed(() => {
  if (typeof props.maxWidth === 'number') {
    return `${props.maxWidth}px`
  }
  return props.maxWidth
})
watch(
  () => props.line,
  (to) => {
    if (to !== undefined) {
      ellipsisLine.value = to
    } else {
      ellipsisLine.value = 'none'
    }
  },
  {
    immediate: true
  }
)
watch(
  () => [props.maxWidth, props.line, props.tooltip],
  () => {
    updateTooltipShow()
  },
  {
    deep: true,
    flush: 'post'
  }
)
useResizeObserver(ellipsisRef, () => {
  if (stopObservation.value) {
    setTimeout(() => {
      stopObservation.value = false
    })
  } else {
    updateTooltipShow()
  }
})
onMounted(() => {
  updateTooltipShow()
  observeScroll.value = tooltipRef.value.observeScroll
})
function updateTooltipShow() {
  const scrollWidth = ellipsisRef.value.scrollWidth
  const scrollHeight = ellipsisRef.value.scrollHeight
  const clientWidth = ellipsisRef.value.clientWidth
  const clientHeight = ellipsisRef.value.clientHeight
  const offsetWidth = ellipsisRef.value.offsetWidth
  computedTooltipMaxWidth.value = `${offsetWidth + 24}px`
  if (scrollWidth > clientWidth || scrollHeight > clientHeight) {
    if (props.expand) {
      showExpand.value = true
    }
    if (props.tooltip) {
      showTooltip.value = true
    }
  } else {
    if (props.expand) {
      showExpand.value = false
    }
    if (props.tooltip) {
      showTooltip.value = false
    }
  }
}
function onExpand() {
  stopObservation.value = true
  if (ellipsisLine.value !== 'none') {
    ellipsisLine.value = 'none'
    if (props.tooltip && showTooltip.value) {
      expanded.value = true
      tooltipRef.value.hide()
    }
    emit('expandChange', true)
  } else {
    ellipsisLine.value = props.line ?? 'none'
    if (props.tooltip && !showTooltip.value) {
      expanded.value = false
      showTooltip.value = true
      tooltipRef.value.show()
    }
    emit('expandChange', false)
  }
}
function onAnimationEnd() {
  if (expanded.value) {
    showTooltip.value = false
  }
}
defineExpose({
  observeScroll
})
</script>
<template>
  <Tooltip
    ref="tooltipRef"
    :style="`max-width: ${textMaxWidth}`"
    :max-width="computedTooltipMaxWidth"
    :content-style="{ maxWidth: textMaxWidth }"
    :tooltip-style="{ padding: '8px 12px' }"
    :transition-duration="200"
    @animationend="onAnimationEnd"
    v-bind="$attrs"
  >
    <template #tooltip>
      <slot v-if="showTooltip" name="tooltip">
        <slot></slot>
      </slot>
    </template>
    <div
      ref="ellipsisRef"
      class="m-ellipsis"
      :class="[line ? 'ellipsis-line' : 'not-ellipsis-line', { 'ellipsis-cursor-pointer': showExpand }]"
      :style="`--ellipsis-max-width: ${textMaxWidth}; --ellipsis-line: ${ellipsisLine};`"
      @click="showExpand ? onExpand() : () => false"
    >
      <slot></slot>
    </div>
  </Tooltip>
</template>
<style lang="less" scoped>
.m-ellipsis {
  overflow: hidden;
  cursor: text;
  max-width: var(--ellipsis-max-width);
}
.ellipsis-line {
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--ellipsis-line);
}
.not-ellipsis-line {
  display: inline-block;
  vertical-align: bottom;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ellipsis-cursor-pointer {
  cursor: pointer;
}
</style>
