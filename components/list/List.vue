<script setup lang="ts">
import { computed, useSlots } from 'vue'
interface Props {
  bordered?: boolean // 是否展示边框
  dataSource?: any[] // 列表数据源
  header?: string // 列表头部 string | slot
  footer?: string // 列表底部 string | slot
  grid?: object // 	列表栅格配置
  vertical?: boolean // 是否使用竖直样式
  loading?: boolean // 是否加载中
  loadMore?: string // 加载更多 string | slot
  pagination?: boolean | object // 对应的 pagination 配置, 设置 false 不显示
  rowKey?: (item: any) => string | number // 各项 key 的取值，可以是字符串或一个函数
  size?: 'small' | 'middle' | 'large' // 列表尺寸
  split?: boolean // 是否展示分割线
}
const props = withDefaults(defineProps<Props>(), {
  bordered: false,
  dataSource: () => [],
  header: undefined,
  footer: undefined,
  grid: () => ({}),
  vertical: false,
  loading: false,
  loadMore: undefined,
  pagination: false,
  rowKey: undefined,
  size: 'middle',
  split: true
})
const slots = useSlots()
const showHeader = computed(() => {
  const headerSlots = slots.header?.()
  return Boolean(headerSlots && headerSlots?.length)
})
const showFooter = computed(() => {
  const footerSlots = slots.footer?.()
  return Boolean(footerSlots && footerSlots?.length)
})
</script>
<template>
  <div
    class="m-list"
    :class="{
      'list-bordered': bordered,
      'list-split': split,
      'list-small': size === 'small',
      'list-large': size === 'large'
    }"
  >
    <div class="m-list-header" v-if="showHeader">
      <slot name="header"></slot>
    </div>
    <slot></slot>
    <div class="m-list-footer" v-if="showFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-list {
  margin: 0;
  position: relative;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  .m-list-header,
  .m-list-footer {
    background: transparent;
    padding-block: 12px;
    transition: all 0.3s;
  }
}
.list-bordered {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  .m-list-header,
  :deep(.m-list-item),
  .m-list-footer {
    padding-inline: 24px;
  }
}
.list-split {
  .m-list-header {
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  }
  :deep(.m-list-item) {
    &:not(:last-child) {
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    }
  }
}
.list-small {
  .m-list-header,
  :deep(.m-list-item),
  .m-list-footer {
    padding: 8px 16px;
  }
}
.list-large {
  .m-list-header,
  :deep(.m-list-item),
  .m-list-footer {
    padding: 16px 24px;
  }
}
</style>
