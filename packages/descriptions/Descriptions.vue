<script setup lang="ts">
interface Props {
  title?: string // 描述列表的标题，显示在最顶部 string | slot
  bordered?: boolean // 是否展示边框
  column?: number // 一行的 DescriptionItems 数量，可以写成像素值或支持响应式的对象写法 { xs: 8, sm: 16, md: 24}
  extra?: string // 描述列表的操作区域，显示在右上方
  layout?: 'horizontal'|'vertical' // 描述布局
  size?: 'default'|'middle'|'small' // 设置列表的大小
}
withDefaults(defineProps<Props>(), {
  title: '',
  bordered: false,
  column: 3,
  extra: '',
  layout: 'horizontal',
  size: 'default'
})
</script>
<template>
  <div class="m-desc">
    <div class="m-header">
      <div class="u-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="u-extra">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>
    <div ref="childWrapper"></div>
    <div ref="view" class="m-desc-view" :class="{bordered: bordered}" :style="`--column: ${column}; --bordered: ${bordered};`">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-desc {
  font-size: 14px;
  color: rgba(0, 0, 0, .88);
  line-height: 1.5714285714285714;
  .m-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .u-title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex: auto;
      font-weight: 600;
      font-size: 16px;
      color: rgba(0, 0, 0, .88);
      line-height: 1.5;
    }
    .u-extra {
      margin-inline-start: auto;
      font-size: 14px;
      color: rgba(0, 0, 0, .88);
    }
  }
  .m-desc-view {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
  .bordered {
    border: 1px solid rgba(5, 5, 5, .06);
    :deep(.m-desc-item) {
      padding-bottom: 0;
    }
    :deep(.u-label) {
      background-color: rgba(0, 0, 0, .02);
      padding: 16px 24px;
      border-inline-end: 1px solid rgba(5, 5, 5, .06);
      border-bottom: 1px solid rgba(5, 5, 5, .06);
      &::after {
        content: '' !important;
      }
    }
    :deep(.u-content) {
      padding: 16px 24px;
      border-inline-end: 1px solid rgba(5, 5, 5, .06);
      border-bottom: 1px solid rgba(5, 5, 5, .06);
    }
  }
}
</style>
