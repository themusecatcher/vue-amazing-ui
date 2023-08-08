<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
enum ColorStyle { // 颜色主题对象
  blue = '#1677ff',
  green = '#52c41a',
  red = '#ff4d4f',
  gray = '#00000040'
}
interface Data {
  desc: string // 文字描述 string | slot
  color?: string // 圆圈颜色，可选四种预置颜色：blue | green | red | gray 或者 使用颜色值，string | slot
}
interface Props {
  timelineData: Data[] // 时间轴内容数组
  width?: number|string // 时间轴区域总宽度，单位px
  lineStyle?: 'solid'|'dashed'|'dotted' // 时间线样式
}
const props = withDefaults(defineProps<Props>(), {
  timelineData: () => [],
  width: 360,
  lineStyle: 'solid'
})
const desc = ref()
const dotsHeight = ref<string[]>([])
const totalWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
function getDotsHeight () {
  const len = props.timelineData.length
  for (let n = 0; n < len; n++) {
    dotsHeight.value[n] = getComputedStyle(desc.value[n].firstElementChild || desc.value[n], null).getPropertyValue('line-height')
  }
}
watchEffect(() => {
  getDotsHeight()
}, {flush: 'post'})
</script>
<template>
  <div class="m-timeline-area" :style="`width: ${totalWidth};`">
    <div class="m-timeline">
      <div
        :class="['m-timeline-item', {'last': index === timelineData.length - 1}]"
        v-for="(data, index) in timelineData" :key="index">
        <span class="u-tail" :style="`border-left-style: ${lineStyle};`"></span>
        <div class="m-dot" :style="`height: ${dotsHeight[index]}`">
          <slot name="dot" :index="index">
            <span class="u-dot" v-if="data.color === 'red'" :style="{borderColor: ColorStyle.red}"></span>
            <span class="u-dot" v-else-if="data.color === 'gray'" :style="{borderColor: ColorStyle.gray}"></span>
            <span class="u-dot" v-else-if="data.color === 'green'" :style="{borderColor: ColorStyle.green}"></span>
            <span class="u-dot" v-else-if="data.color === 'blue'" :style="{borderColor: ColorStyle.blue}"></span>
            <span class="u-dot" v-else :style="{borderColor: data.color || ColorStyle.blue}"></span>
          </slot>
        </div>
        <div ref="desc" class="u-desc">
          <slot name="desc" :index="index">{{ data.desc || '--' }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-timeline-area {
  .m-timeline {
    .m-timeline-item {
      position: relative;
      padding-bottom: 30px;
      .u-tail {
        position: absolute;
        top: 12px;
        left: 5px;
        height: 100%;
        border-left-width: 2px;
        border-left-color: #e8e8e8;
      }
      .m-dot {
        position: absolute;
        left: 6px;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        .u-dot {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-width: 2px;
          border-style: solid;
          border-radius: 50%;
          background: #FFF;
        }
      }
      .u-desc {
        font-size: 14px;
        line-height: 1.5714285714285714;
        margin-left: 25px;
        word-break: break-all;
      }
    }
    .last {
      .u-tail {
        display: none;
      }
    }
  }
}
</style>
