<script setup lang="ts">
import { ref, computed } from 'vue'
import { throttle, useEventListener } from '../utils'
interface Props {
  span?: number // 栅格占位格数，取 0,1,2...24，为 0 时相当于 display: none，优先级低于 xs, sm, md, lg, xl, xxl
  offset?: number // 栅格左侧的间隔格数，取 0,1,2...24
  flex?: string | number //	flex 布局填充
  order?: number // 栅格顺序，取 0,1,2...
  xs?: number | { span?: number; offset?: number } // <576px 响应式栅格
  sm?: number | { span?: number; offset?: number } // ≥576px 响应式栅格
  md?: number | { span?: number; offset?: number } // ≥768px 响应式栅格
  lg?: number | { span?: number; offset?: number } // ≥992px 响应式栅格
  xl?: number | { span?: number; offset?: number } // ≥1200px 响应式栅格
  xxl?: number | { span?: number; offset?: number } // ≥1600px 响应式栅格
}
const props = withDefaults(defineProps<Props>(), {
  span: undefined,
  offset: 0,
  flex: undefined,
  order: 0,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  xxl: undefined
})
const flexValue = computed(() => {
  if (typeof props.flex === 'number') {
    return `${props.flex} ${props.flex} auto`
  }
  return props.flex
})
const responsiveProperties = computed(() => {
  return [
    {
      width: 1600,
      value: props.xxl
    },
    {
      width: 1200,
      value: props.xl
    },
    {
      width: 992,
      value: props.lg
    },
    {
      width: 768,
      value: props.md
    },
    {
      width: 576,
      value: props.sm
    },
    {
      width: 0,
      value: props.xs
    }
  ]
})
const viewportWidth = ref(window.innerWidth)
function getViewportWidth() {
  viewportWidth.value = window.innerWidth
}
const throttleEvent = throttle(getViewportWidth, 100)
useEventListener(window, 'resize', throttleEvent)
const responsiveValue = computed(() => {
  for (const responsive of responsiveProperties.value) {
    if (responsive.value && viewportWidth.value >= responsive.width) {
      if (typeof responsive.value === 'object') {
        return {
          span: responsive.value.span || props.span,
          offset: responsive.value.offset || props.offset
        }
      } else {
        return {
          span: responsive.value,
          offset: props.offset
        }
      }
    }
  }
  return {
    span: props.span,
    offset: props.offset
  }
})
</script>
<template>
  <div
    :class="`m-col col-${responsiveValue.span} offset-${responsiveValue.offset}`"
    style="padding-left: var(--xGap); padding-right: var(--xGap)"
    :style="`flex: ${flexValue}; order: ${order};`"
  >
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.m-col {
  position: relative;
  max-width: 100%;
  min-height: 1px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  transition: all 0.3s;
}
.col-0 {
  display: none;
}
.col-1 {
  display: block;
  flex: 0 0 4.16666666666666%;
  max-width: 4.16666666666666%;
}
.offset-1 {
  margin-inline-start: 4.16666666666666%;
}
.col-2 {
  display: block;
  flex: 0 0 8.33333333333333%;
  max-width: 8.33333333333333%;
}
.offset-2 {
  margin-inline-start: 8.33333333333333%;
}
.col-3 {
  display: block;
  flex: 0 0 12.5%;
  max-width: 12.5%;
}
.offset-3 {
  margin-inline-start: 12.5%;
}
.col-4 {
  display: block;
  flex: 0 0 16.66666666666666%;
  max-width: 16.66666666666666%;
}
.offset-4 {
  margin-inline-start: 16.66666666666666%;
}
.col-5 {
  display: block;
  flex: 0 0 20.83333333333333%;
  max-width: 20.83333333333333%;
}
.offset-5 {
  margin-inline-start: 20.83333333333333%;
}
.col-6 {
  display: block;
  flex: 0 0 25%;
  max-width: 25%;
}
.offset-6 {
  margin-inline-start: 25%;
}
.col-7 {
  display: block;
  flex: 0 0 29.16666666666666%;
  max-width: 29.16666666666666%;
}
.offset-7 {
  margin-inline-start: 29.16666666666666%;
}
.col-8 {
  display: block;
  flex: 0 0 33.33333333333333%;
  max-width: 33.33333333333333%;
}
.offset-8 {
  margin-inline-start: 33.33333333333333%;
}
.col-9 {
  display: block;
  flex: 0 0 37.5%;
  max-width: 37.5%;
}
.offset-9 {
  margin-inline-start: 37.5%;
}
.col-10 {
  display: block;
  flex: 0 0 41.66666666666666%;
  max-width: 41.66666666666666%;
}
.offset-10 {
  margin-inline-start: 41.66666666666666%;
}
.col-11 {
  display: block;
  flex: 0 0 45.83333333333333%;
  max-width: 45.83333333333333%;
}
.offset-11 {
  margin-inline-start: 45.83333333333333%;
}
.col-12 {
  display: block;
  flex: 0 0 50%;
  max-width: 50%;
}
.offset-12 {
  margin-inline-start: 50%;
}
.col-13 {
  display: block;
  flex: 0 0 54.16666666666666%;
  max-width: 54.16666666666666%;
}
.offset-13 {
  margin-inline-start: 54.16666666666666%;
}
.col-14 {
  display: block;
  flex: 0 0 58.33333333333333%;
  max-width: 58.33333333333333%;
}
.offset-14 {
  margin-inline-start: 58.33333333333333%;
}
.col-15 {
  display: block;
  flex: 0 0 62.5%;
  max-width: 62.5%;
}
.offset-15 {
  margin-inline-start: 62.5%;
}
.col-16 {
  display: block;
  flex: 0 0 66.66666666666666%;
  max-width: 66.66666666666666%;
}
.offset-16 {
  margin-inline-start: 66.6666666666666%;
}
.col-17 {
  display: block;
  flex: 0 0 70.83333333333333%;
  max-width: 70.83333333333333%;
}
.offset-17 {
  margin-inline-start: 70.83333333333333%;
}
.col-18 {
  display: block;
  flex: 0 0 75%;
  max-width: 75%;
}
.offset-18 {
  margin-inline-start: 75%;
}
.col-19 {
  display: block;
  flex: 0 0 79.16666666666666%;
  max-width: 79.16666666666666%;
}
.offset-19 {
  margin-inline-start: 79.16666666666666%;
}
.col-20 {
  display: block;
  flex: 0 0 83.33333333333333%;
  max-width: 83.33333333333333%;
}
.offset-20 {
  margin-inline-start: 83.33333333333333%;
}
.col-21 {
  display: block;
  flex: 0 0 87.5%;
  max-width: 87.5%;
}
.offset-21 {
  margin-inline-start: 87.5%;
}
.col-22 {
  display: block;
  flex: 0 0 91.66666666666666%;
  max-width: 91.66666666666666%;
}
.offset-22 {
  margin-inline-start: 91.66666666666666%;
}
.col-23 {
  display: block;
  flex: 0 0 95.83333333333333%;
  max-width: 95.83333333333333%;
}
.offset-23 {
  margin-inline-start: 95.83333333333333%;
}
.col-24 {
  display: block;
  flex: 0 0 100%;
  max-width: 100%;
}
.offset-24 {
  margin-inline-start: 100%;
}
</style>
