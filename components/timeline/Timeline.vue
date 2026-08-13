<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
export interface Item {
  desc: string // 文字描述 string | slot
  color?: 'blue' | 'green' | 'red' | 'gray' | string // 圆圈颜色，默认值 blue
}
export interface Props {
  items?: Item[] // 时间轴内容数组
  width?: number | string // 时间轴区域总宽度，单位 px
  lineStyle?: 'solid' | 'dashed' | 'dotted' // 时间线样式
  mode?: 'left' | 'center' | 'right' // 通过设置 mode 可以改变时间轴和内容的相对位置
  position?: 'left' | 'right' // 当 mode 为 center 时，内容交替展现，内容从左边（left）开始或者右边（right）开始展现
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  width: '100%',
  lineStyle: 'solid',
  mode: 'left',
  position: 'left'
})
// 颜色主题对象
enum ColorStyle {
  blue = '#1677ff',
  green = '#52c41a',
  red = '#ff4d4f',
  gray = '#00000040'
}
const descRef = ref()
const dotsHeight = ref<string[]>([])
const totalWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  } else {
    return props.width
  }
})
const len = computed(() => {
  return props.items.length
})
function getDotsHeight() {
  for (let n = 0; n < len.value; n++) {
    dotsHeight.value[n] = getComputedStyle(
      descRef.value[n].firstElementChild || descRef.value[n],
      null
    ).getPropertyValue('line-height')
  }
}
watchEffect(
  () => {
    getDotsHeight()
  },
  { flush: 'post' }
)
watchEffect(
  () => {
    if (props.mode === 'center') {
      for (let n = 0; n < len.value; n++) {
        if ((n + 1) % 2) {
          // odd
          if (props.position === 'left') {
            descRef.value[n].classList.add('desc-alternate-left')
          } else {
            descRef.value[n].classList.add('desc-alternate-right')
          }
        } else {
          // even
          if (props.position === 'left') {
            descRef.value[n].classList.add('desc-alternate-right')
          } else {
            descRef.value[n].classList.add('desc-alternate-left')
          }
        }
      }
    }
  },
  { flush: 'post' }
)
</script>
<template>
  <div class="timeline-wrap" :style="`width: ${totalWidth};`">
    <div
      class="timeline-item"
      :class="{ 'item-last': index === items.length - 1 }"
      v-for="(item, index) in items"
      :key="index"
    >
      <span class="timeline-tail" :class="`tail-${mode}`" :style="`border-left-style: ${lineStyle};`"></span>
      <div class="timeline-dot" :class="`dot-${mode}`" :style="`height: ${dotsHeight[index]}`">
        <slot name="dot" :item="item" :index="index">
          <span class="dot-item" v-if="item.color === 'red'" :style="{ borderColor: ColorStyle.red }"></span>
          <span class="dot-item" v-else-if="item.color === 'gray'" :style="{ borderColor: ColorStyle.gray }"></span>
          <span class="dot-item" v-else-if="item.color === 'green'" :style="{ borderColor: ColorStyle.green }"></span>
          <span class="dot-item" v-else-if="item.color === 'blue'" :style="{ borderColor: ColorStyle.blue }"></span>
          <span class="dot-item" v-else :style="{ borderColor: item.color || ColorStyle.blue }"></span>
        </slot>
      </div>
      <div ref="descRef" :class="`timeline-desc desc-${mode}`">
        <slot name="desc" :item="item" :index="index">{{ item.desc || '--' }}</slot>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.timeline-wrap {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  .timeline-item {
    position: relative;
    padding-bottom: 30px;
    .timeline-tail {
      position: absolute;
      top: 12px;
      width: 0;
      height: 100%;
      border-left-width: 2px;
      border-left-color: #e8e8e8;
    }
    .tail-left {
      left: 5px;
    }
    .tail-center {
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .tail-right {
      right: 5px;
    }
    .timeline-dot {
      position: absolute;
      display: flex;
      align-items: center;
      :deep(svg) {
        fill: currentColor;
      }
      .dot-item {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-width: 2px;
        border-style: solid;
        border-radius: 50%;
        background: #fff;
      }
    }
    .dot-left {
      left: 6px;
      transform: translateX(-50%);
    }
    .dot-center {
      left: 50%;
      transform: translateX(-50%);
    }
    .dot-right {
      right: 6px;
      transform: translateX(50%);
    }
    .timeline-desc {
      font-size: 14px;
      line-height: 1.5714285714285714;
      word-break: break-all;
    }
    .desc-left {
      margin-left: 25px;
    }
    .desc-center {
      width: calc(50% - 12px);
    }
    .desc-alternate-left {
      text-align: end;
    }
    .desc-alternate-right {
      margin-left: calc(50% + 12px);
    }
    .desc-right {
      margin-right: 25px;
      text-align: end;
    }
  }
  .item-last {
    .timeline-tail {
      display: none;
    }
  }
}
</style>
