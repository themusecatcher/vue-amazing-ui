<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  width?: string|number // 区域宽度
  vertical?: boolean // flex 主轴的方向是否垂直，vertical 使用 flex-direction: column
  wrap?: 'nowrap'|'wrap'|'wrap-reverse' // 设置元素单行显示还是多行显示；参考 flex-wrap
  justify?: string // 设置元素在主轴方向上的对齐方式；参考 justify-content
  align?: string // 设置元素在交叉轴方向上的对齐方式；参考 align-items
  gap?: number|number[]|'small'|'middle'|'large' // 设置网格之间的间隙，数组时表示: [水平间距, 垂直间距]
}
const props = withDefaults(defineProps<Props>(), {
  width: 'auto',
  vertical: false,
  wrap: 'nowrap',
  justify: 'normal',
  align: 'normal',
  gap: undefined
})
const flexWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})
const gapValue = computed(() => {
  if (props.gap === undefined) {
    return 0
  }
  if (typeof props.gap === 'number') {
    return props.gap + 'px'
  }
  if (Array.isArray(props.gap)) {
    return props.gap[1] + 'px ' + props.gap[0] + 'px '
  }
  if (['small', 'middle', 'large'].includes(props.gap)) {
    const gapMap = {
      small: '8px',
      middle: '16px',
      large: '24px'
    }
    return gapMap[props.gap]
  }
})
</script>
<template>
  <div
    class="m-flex"
    :class="{'flex-vertical': vertical}"
    :style="`
      width: ${flexWidth};
      gap: ${gapValue};
      margin-bottom: -${Array.isArray(props.gap) && wrap ? props.gap[1] : 0}px;
      --wrap: ${wrap};
      --justify: ${justify};
      --align: ${align};
    `">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.m-flex {
  display: flex;
  flex-wrap: var(--wrap);
  justify-content: var(--justify);
  align-items: var(--align);
  font-size: 14px;
  color: rgba(0, 0, 0, .88);
  transition: all .3s;
}
.flex-vertical {
  flex-direction: column;
}
</style>
