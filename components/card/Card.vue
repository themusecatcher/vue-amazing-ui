<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import Skeleton from '../skeleton'
import { useSlotsExist } from '../utils'
interface Props {
  width?: number | string // 卡片宽度，单位 px
  bordered?: boolean // 是否有边框
  size?: 'small' | 'middle' | 'large' // 卡片的尺寸
  hoverable?: boolean // 鼠标移过时可浮起
  loading?: boolean // 当卡片内容还在加载中时，可以用 loading 展示一个占位
  skeletonProps?: object // 加载中时，骨架屏的属性配置，参考 Skeleton Props
  title?: string // 卡片标题 string | slot
  extra?: string // 卡片右上角的操作区域 string | slot
  headStyle?: CSSProperties // 自定义标题区域样式
  bodyStyle?: CSSProperties // 自定义内容区域样式
}
const props = withDefaults(defineProps<Props>(), {
  width: 'auto',
  bordered: true,
  size: 'middle',
  hoverable: false,
  loading: false,
  skeletonProps: () => ({}),
  title: undefined,
  extra: undefined,
  headStyle: () => ({}),
  bodyStyle: () => ({})
})
const slotsExist = useSlotsExist(['title', 'extra'])
const cardWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})
const showHeader = computed(() => {
  return slotsExist.title || slotsExist.extra || props.title || props.extra
})
const showTitle = computed(() => {
  return slotsExist.title || props.title
})
const showExtra = computed(() => {
  return slotsExist.extra || props.extra
})
</script>
<template>
  <div
    class="m-card"
    :class="{
      'card-bordered': bordered,
      'card-small': size === 'small',
      'card-middle': size === 'middle',
      'card-large': size === 'large',
      'card-hoverable': hoverable
    }"
    :style="`width: ${cardWidth};`"
  >
    <div class="m-card-head" :style="headStyle" v-if="showHeader">
      <div class="m-head-wrapper">
        <div v-if="showTitle" class="head-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div v-if="showExtra" class="head-extra">
          <slot name="extra">{{ extra }}</slot>
        </div>
      </div>
    </div>
    <div class="m-card-body" :style="bodyStyle">
      <Skeleton :title="false" :loading="loading" v-bind="skeletonProps">
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
  transition: width 0.2s;
  .m-card-head {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: -1px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    background: transparent;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 8px 8px 0 0;
    transition: all 0.2s;
    .m-head-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      .head-title {
        display: inline-block;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .head-extra {
        margin-left: auto;
        font-weight: normal;
        font-size: 14px;
        transition: font-size 0.2s;
      }
    }
  }
  .m-card-body {
    border-radius: 0 0 8px 8px;
    transition: padding 0.2s;
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
.card-middle {
  .m-card-head {
    min-height: 56px;
    padding: 0 24px;
    font-size: 16px;
  }
  .m-card-body {
    padding: 24px;
  }
}
.card-large {
  font-size: 16px;
  .m-card-head {
    min-height: 74px;
    padding: 0 36px;
    font-size: 18px;
    .m-head-wrapper .head-extra {
      font-size: 16px;
    }
  }
  .m-card-body {
    padding: 36px;
  }
}
.card-hoverable {
  cursor: pointer;
  transition:
    box-shadow 0.2s,
    border-color 0.2s;
  &:hover {
    box-shadow:
      0 1px 2px -2px rgba(0, 0, 0, 0.16),
      0 3px 6px 0 rgba(0, 0, 0, 0.12),
      0 5px 12px 4px rgba(0, 0, 0, 0.09);
  }
}
</style>
