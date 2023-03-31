<script setup lang="ts">
enum ColorStyle { // 颜色主题对象
  blue = '#1677ff',
  green = '#52c41a',
  red = '#ff4d4f',
  gray = '#00000040'
}
interface Data {
  desc: string,
  color?: string
}
interface Props {
  timelineData?: Data[], // 时间轴内容数组
  width?: number // 时间轴区域总宽度
}
withDefaults(defineProps<Props>(), {
  timelineData: () => [],
  width: 360
})
</script>
<template>
  <div class="m-timeline-area" :style="`width: ${width}px`">
    <div class="m-timeline">
      <div
        :class="['m-timeline-item', {'last': index === timelineData.length - 1}]"
        v-for="(data, index) in timelineData" :key="index">
        <span class="u-tail"></span>
        <div class="m-dot">
          <slot name="dot" :index="index">
            <span class="u-dot" v-if="data.color === 'red'" :style="{borderColor: ColorStyle.red}"></span>
            <span class="u-dot" v-else-if="data.color === 'gray'" :style="{borderColor: ColorStyle.gray}"></span>
            <span class="u-dot" v-else-if="data.color === 'green'" :style="{borderColor: ColorStyle.green}"></span>
            <span class="u-dot" v-else="data.color === 'blue'" :style="{borderColor: ColorStyle.blue}"></span>
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
        border-left: 2px solid #e8e8e8; // 实线
        // border-left: 2px dotted #e8e8e8; // 点线
        // border-left: 2px dashed #e8e8e8; // 虚线
      }
      .m-dot {
        position: absolute;
        top: 13px;
        left: 6px;
        transform: translate(-50%, -50%);
        .u-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
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
