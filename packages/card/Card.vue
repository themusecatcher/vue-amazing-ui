<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { CSSProperties } from 'vue'
import Skeleton from '../skeleton'
interface Props {
  width?: number | string // 卡片宽度
  title?: string // 卡片标题 string | slot
  extra?: string // 卡片右上角的操作区域 string | slot
  bordered?: boolean // 是否有边框
  loading?: boolean // 当卡片内容还在加载中时，可以用 loading 展示一个占位
  size?: 'default' | 'small' // 卡片的尺寸
  headStyle?: CSSProperties //	标题区域自定义样式
  bodyStyle?: CSSProperties // 内容区域自定义样式
}
const props = withDefaults(defineProps<Props>(), {
  width: 'auto',
  title: undefined,
  extra: undefined,
  bordered: true,
  loading: false,
  size: 'default',
  headStyle: () => ({}),
  bodyStyle: () => ({})
})
const cardWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})
const slots = useSlots()
const showHeader = computed(() => {
  const titleSlots = slots.title?.()
  const extraSlots = slots.extra?.()
  let n = 0
  if (titleSlots && titleSlots[0].children?.length) {
    n++
  }
  if (extraSlots && extraSlots[0].children?.length) {
    n++
  }
  return Boolean(n) || props.title || props.extra
})
</script>
<template>
  <div
    class="m-card"
    :class="{ 'card-bordered': bordered, 'card-small': size === 'small' }"
    :style="`width: ${cardWidth};`"
  >
    <div class="m-card-head" :style="headStyle" v-if="showHeader">
      <div class="m-head-wrapper">
        <div class="u-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="u-extra">
          <slot name="extra">{{ extra }}</slot>
        </div>
      </div>
    </div>
    <div class="m-card-body" :style="bodyStyle">
      <Skeleton :title="false" :loading="loading">
        <slot></slot>
      </Skeleton>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-card {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  text-align: left;
  .m-card-head {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 56px;
    margin-bottom: -1px;
    padding: 0 24px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
    background: transparent;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 8px 8px 0 0;
    .m-head-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      .u-title {
        display: inline-block;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .u-extra {
        margin-inline-start: auto;
        font-weight: normal;
        font-size: 14px;
      }
    }
  }
  .m-card-body {
    padding: 24px;
    border-radius: 0 0 8px 8px;
  }
}
.card-bordered {
  border: 1px solid #f0f0f0;
}
.card-small {
  .m-card-head {
    min-height: 38px;
    padding: 0 12px;
    font-size: 14px;
  }
  .m-card-body {
    padding: 12px;
  }
}
</style>
