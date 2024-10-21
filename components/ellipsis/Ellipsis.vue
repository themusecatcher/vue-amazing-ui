<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import Tooltip from '../tooltip'
import { useResizeObserver } from '../utils'
interface Props {
  maxWidth?: string | number // 文本最大宽度，单位 px
  line?: number // 最大行数
  expand?: boolean // 是否启用点击文本展开全部
  tooltip?: boolean // 是否启用文本提示框
  tooltipProps?: object // Tooltip 组件属性配置，参考 Tooltip Props
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
const ellipsisLine = ref()
const stopObservation = ref(false)
const defaultTooltipMaxWidth = ref()
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
})
function updateTooltipShow() {
  const scrollWidth = ellipsisRef.value.scrollWidth
  const scrollHeight = ellipsisRef.value.scrollHeight
  const clientWidth = ellipsisRef.value.clientWidth
  const clientHeight = ellipsisRef.value.clientHeight
  if (scrollWidth > clientWidth || scrollHeight > clientHeight) {
    defaultTooltipMaxWidth.value = ellipsisRef.value.offsetWidth + 24
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
      showTooltip.value = false
    }
    emit('expandChange', true)
  } else {
    ellipsisLine.value = props.line ?? 'none'
    if (props.tooltip && !showTooltip.value) {
      showTooltip.value = true
    }
    emit('expandChange', false)
  }
}
</script>
<template>
  <Tooltip
    :style="`max-width: ${textMaxWidth}`"
    :max-width="defaultTooltipMaxWidth"
    :content-style="{ maxWidth: textMaxWidth }"
    :tooltip-style="{ padding: '8px 12px', textAlign: 'justify' }"
    v-bind="tooltipProps"
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
      v-bind="$attrs"
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
