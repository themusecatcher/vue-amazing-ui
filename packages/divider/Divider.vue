<script setup lang="ts">
import { computed, useSlots } from 'vue'
interface Props {
  dashed?: boolean // 是否为虚线
  orientation?: 'left'|'center'|'right' // 分割线标题的位置
  orientationMargin?: string|number // 标题和最近 left/right 边框之间的距离，去除了分割线，同时 orientation 必须为 left 或 right
  borderWidth?: number // 分割线宽度
  type?: 'horizontal'|'vertical' // 水平或者垂直类型
}
const props = withDefaults(defineProps<Props>(), {
  dashed: false,
  orientation: 'center', // 可选 left center right
  orientationMargin: '',
  borderWidth: 1,
  type: 'horizontal'
})
const margin = computed(() => {
  if (props.orientationMargin !== '') {
    if (typeof props.orientationMargin === 'number') {
      return props.orientationMargin + 'px'
    } else {
      return props.orientationMargin
    }
  }
})
const slots = useSlots()
const showText = computed(() => {
  const defaultSlots = slots.default?.()
  if (defaultSlots) {
    return Boolean(defaultSlots[0].children?.length)
  }
  return false
})
</script>
<template>
  <div
    v-if="type==='horizontal'"
    :class="[`m-divider-horizontal ${orientation}`,
      {
        dashed: dashed,
        margin24: !showText,
        marginLeft: orientationMargin !== '' && orientation === 'left',
        marginRight: orientationMargin !== '' && orientation === 'right'
      }
    ]"
    :style="`--border-width: ${borderWidth}px;`">
    <span class="u-text" v-if="orientation === 'left'" :style="`margin-left: ${margin};`" v-show="showText">
      <slot></slot>
    </span>
    <span class="u-text" v-else-if="orientation === 'right'" :style="`margin-right: ${margin};`" v-show="showText">
      <slot></slot>
    </span>
    <span class="u-text" v-else v-show="showText">
      <slot></slot>
    </span>
  </div>
  <div v-else class="m-divider-vertical"></div>
</template>
<style lang="less" scoped>
.m-divider-horizontal {
  display: flex;
  align-items: center;
  margin: 16px 0;
  width: 100%;
  min-width: 100%;
  &::before, &::after {
    position: relative;
    width: 50%;
    border-top-width: var(--border-width);
    border-top-style: solid;
    border-top-color: rgba(5, 5, 5, .06);
    transform: translateY(50%);
    content: '';
  }
  .u-text {
    display: inline-block;
    font-size: 16px;
    color: rgba(0, 0, 0, .88);
    font-weight: 500;
    line-height: 1.5714285714285714;
    white-space: nowrap;
    text-align: center;
    padding: 0 16px;
  }
}
.m-divider-vertical {
  position: relative;
  top: -.06em;
  display: inline-block;
  height: .9em;
  margin: 0 8px;
  vertical-align: middle;
  border-top: 0;
  border-inline-start: 1px solid rgba(5, 5, 5, .06);
}
.dashed {
  &::before {
    border-top-style: dashed;
  }
  &::after {
    border-top-style: dashed;
  }
}
.left {
  &::before {
    width: 5%;
  }
  &::after {
    width: 95%;
  }
}
.right {
  &::before {
    width: 95%;
  }
  &::after {
    width: 5%;
  }
}
.margin24 {
  margin: 24px 0;
}
.marginLeft {
  &::before {
    width: 0;
  }
  &::after {
    width: 100%;
  }
}
.marginRight {
  &::before {
    width: 100%;
  }
  &::after {
    width: 0;
  }
}
</style>
