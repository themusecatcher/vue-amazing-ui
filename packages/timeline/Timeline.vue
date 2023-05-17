<script setup lang="ts">
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
  timelineData?: Data[] // 时间轴内容数组
  width?: number // 时间轴区域总宽度
  lineStyle?: 'solid'|'dashed'|'dotted' // 时间线样式
}
withDefaults(defineProps<Props>(), {
  timelineData: () => [],
  width: 360,
  lineStyle: 'solid'
})
</script>
<template>
  <div class="m-timeline-area" :style="`width: ${width}px`">
    <div class="m-timeline">
      <div
        :class="['m-timeline-item', {'last': index === timelineData.length - 1}]"
        v-for="(data, index) in timelineData" :key="index">
        <span class="u-tail" :style="`border-left-style: ${lineStyle};`"></span>
        <div class="m-dot">
          <slot name="dot" :index="index">
            <span class="u-dot" v-if="data.color === 'red'" :style="{borderColor: ColorStyle.red}"></span>
            <span class="u-dot" v-else-if="data.color === 'gray'" :style="{borderColor: ColorStyle.gray}"></span>
            <span class="u-dot" v-else-if="data.color === 'green'" :style="{borderColor: ColorStyle.green}"></span>
            <span class="u-dot" v-else-if="data.color === 'blue'" :style="{borderColor: ColorStyle.blue}"></span>
            <span class="u-dot" v-else :style="{borderColor: data.color || ColorStyle.blue}"></span>
          </slot>
        </div>
        <div class="u-content">
          <slot name="desc" :index="index">{{ data.desc || '--' }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.m-timeline-area {
  .m-timeline {
    .m-timeline-item {
      position: relative;
      padding-bottom: 30px;
      line-height: 1;
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
        top: 13px;
        left: 6px;
        transform: translate(-50%, -50%);
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
      .u-content {
        margin-left: 25px;
        word-break: break-all;
        word-wrap: break-word;
        line-height: 24px;
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
