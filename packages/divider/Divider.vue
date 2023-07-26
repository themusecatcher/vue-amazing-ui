<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
interface Props {
  dashed?: boolean // 是否为虚线
  orientation?: 'left'|'center'|'right' // 分割线标题的位置
  orientationMargin?: string|number // 标题和最近 left/right 边框之间的距离，去除了分割线，同时 orientation 必须为 left 或 right
  borderWidth?: number // 分割线宽度
}
const props = withDefaults(defineProps<Props>(), {
  dashed: false,
  orientation: 'center', // 可选 left center right
  orientationMargin: '',
  borderWidth: 1
})
const text = ref()
const showText = ref(true)
const margin = computed(() => {
  if (props.orientationMargin !== '') {
    if (typeof props.orientationMargin === 'number') {
      return props.orientationMargin + 'px'
    } else {
      return props.orientationMargin
    }
  }
})
onMounted(() => {
  if (!text.value.offsetHeight) {
    showText.value = false
  }
})
</script>
<template>
  <div
    :class="[`m-divider ${orientation}`,
      {
        dashed: dashed,
        margin24: !showText,
        marginLeft: orientationMargin !== '' && orientation === 'left',
        marginRight: orientationMargin !== '' && orientation === 'right'
      }
    ]"
    :style="`--border-width: ${borderWidth}px;`">
    <span class="u-text" v-if="orientation === 'left'" :style="`margin-left: ${margin};`" ref="text" v-show="showText">
      <slot></slot>
    </span>
    <span class="u-text" v-else-if="orientation === 'right'" :style="`margin-right: ${margin};`" ref="text" v-show="showText">
      <slot></slot>
    </span>
    <span class="u-text" v-else ref="text" v-show="showText">
      <slot></slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-divider {
  display: flex;
  align-items: center;
  margin: 16px 0;
  width: 100%;
  min-width: 100%;
  &:before, &:after {
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
    line-height: 1.571;
    white-space: nowrap;
    text-align: center;
    padding: 0 16px;
  }
}
.dashed {
  &:before {
    border-top-style: dashed;
  }
  &:after {
    border-top-style: dashed;
  }
}
.left {
  &:before {
    width: 5%;
  }
  &:after {
    width: 95%;
  }
}
.right {
  &:before {
    width: 95%;
  }
  &:after {
    width: 5%;
  }
}
.margin24 {
  margin: 24px 0;
}
.marginLeft {
  &:before {
    width: 0;
  }
  &:after {
    width: 100%;
  }
}
.marginRight {
  &:before {
    width: 100%;
  }
  &:after {
    width: 0;
  }
}
</style>
