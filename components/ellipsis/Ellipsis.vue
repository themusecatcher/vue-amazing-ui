<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
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
const stopObservation = ref(false)
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
  if (props.tooltip) {
    const scrollWidth = ellipsisRef.value.scrollWidth
    const scrollHeight = ellipsisRef.value.scrollHeight
    const clientWidth = ellipsisRef.value.clientWidth
    const clientHeight = ellipsisRef.value.clientHeight
    if (scrollWidth > clientWidth || scrollHeight > clientHeight) {
      defaultTooltipMaxWidth.value = ellipsisRef.value.offsetWidth + 24
      if (props.expand) {
        showExpand.value = true
      }
      showTooltip.value = true
    } else {
      if (props.expand) {
        showExpand.value = false
      }
      showTooltip.value = false
    }
  }
}
const emit = defineEmits(['expandChange'])
async function onExpand() {
  if (ellipsisRef.value.style['-webkit-line-clamp']) {
    if (props.tooltip && showTooltip.value) {
      stopObservation.value = true
      showTooltip.value = false
      await nextTick()
    }
    ellipsisRef.value.style.removeProperty('-webkit-line-clamp')
    emit('expandChange', true)
  } else {
    if (props.tooltip && !showTooltip.value) {
      showTooltip.value = true
    }
    emit('expandChange', false)
  }
}
</script>
<template>
  <Tooltip
    v-if="showTooltip"
    :style="`max-width: ${textMaxWidth}`"
    :max-width="defaultTooltipMaxWidth"
    :content-style="{ maxWidth: textMaxWidth }"
    :tooltip-style="{ padding: '8px 12px', textAlign: 'justify' }"
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
      :class="[line ? 'ellipsis-line' : 'not-ellipsis-line', { 'ellipsis-cursor-pointer': showExpand }]"
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
    :class="[line ? 'ellipsis-line' : 'not-ellipsis-line', { 'ellipsis-cursor-pointer': showExpand }]"
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
  // display: inline-flex;
  // flex-direction: column;
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
