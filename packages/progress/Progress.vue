<script setup lang="ts">
import { computed } from 'vue'
interface Gradient {
  '0%'?: string,
  '100%'?: string,
  from?: string,
  to?: string,
  direction?: string
}
interface Props {
  width?: number|string, // 进度条总宽度
  percent?: number, // 当前进度百分比
  strokeColor?: string|Gradient, // 进度条的色彩，传入 string 时为纯色，传入 object 时为渐变
  strokeWidth?: number, // 进度条线的宽度，单位px
  showInfo?: boolean, // 是否显示进度数值或状态图标
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  percent: 0,
  strokeColor: '#1890FF',
  strokeWidth: 8,
  showInfo: true
})
const totalWidth = computed(() => { // 进度条总宽度
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const backgroundColor = computed(() => {
  if (typeof props.strokeColor === 'string') {
    return props.strokeColor
  } else {
    return `linear-gradient(to ${props.strokeColor.direction || 'right'}, ${props.strokeColor['0%'] || props.strokeColor.from}, ${props.strokeColor['100%'] || props.strokeColor.to})`
  }
})
</script>
<template>
  <div class="m-progress" :style="`width:${totalWidth};`">
    <div class="m-progress-outer">
      <div class="m-progress-inner">
        <div :class="['u-progress-bg', {'u-success-bg': percent >= 100}]" :style="`background: ${backgroundColor}; width: ${percent >= 100 ? 100:percent}%; height: ${strokeWidth}px;`"></div>
      </div>
    </div>
    <template v-if="showInfo"></template>
    <svg class="u-success" v-if="percent>=100" viewBox="64 64 896 896" data-icon="check-circle" aria-hidden="true" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>
    <p class="u-progress-text" v-else>{{ percent>=100 ? 100:percent }}%</p>
  </div>
</template>
<style lang="less" scoped>
.m-progress {
  height: 24px;
  &:after {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  .m-progress-outer {
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 44px);
    .m-progress-inner {
      display: inline-block;
      width: 100%;
      background: #f5f5f5;
      border-radius: 100px;
      .u-progress-bg {
        // background: @themeColor;
        // background: linear-gradient(to right, rgb(16, 142, 233), rgb(135, 208, 104));
        border-radius: 100px;
        transition: all .3s cubic-bezier(.08,.82,.17,1);
      }
      .u-success-bg {
        background: #52C41A;
      }
    }
  }
  .u-success {
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
    fill: #52C41A;
    margin-left: 8px;
  }
  .u-progress-text {
    display: inline-block;
    vertical-align: middle;
    width: 36px;
    font-size: 16px;
    line-height: 24px;
    margin-left: 8px;
    color: rgba(0,0,0,.45);
  }
}
</style>
