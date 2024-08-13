<script setup lang="ts">
import { computed, useSlots } from 'vue'
import Pagination from '../pagination'
interface Props {
  bordered?: boolean // 是否展示边框
  header?: string // 列表头部 string | slot
  footer?: string // 列表底部 string | slot
  vertical?: boolean // 是否使用竖直样式
  loading?: boolean // 是否加载中
  showPagination?: boolean // 是否显示分页
  pagination?: object // Pagination 组件属性配置，参考 Pagination Props
  rowKey?: (item: any) => string | number // 各项 key 的取值，可以是字符串或一个函数
  size?: 'small' | 'middle' | 'large' // 列表尺寸
  split?: boolean // 是否展示分割线
}
withDefaults(defineProps<Props>(), {
  bordered: false,
  header: undefined,
  footer: undefined,
  grid: undefined,
  vertical: false,
  loading: false,
  showPagination: false,
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
      'list-vertical': vertical,
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
    <div class="m-list-pagination" v-if="showPagination">
      <Pagination placement="right" v-bind="pagination" />
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
    padding: 12px 0;
    transition: all 0.3s;
  }
  .m-list-pagination {
    margin-top: 24px;
    text-align: end;
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
.list-vertical {
  :deep(.m-list-item) {
    align-items: initial;
    .m-list-item-main {
      display: block;
      flex: 1;
      .m-list-item-meta {
        margin-bottom: 16px;
        .m-list-item-content {
          .list-item-title {
            margin-bottom: 12px;
            color: rgba(0, 0, 0, 0.88);
            font-size: 16px;
            line-height: 1.5;
          }
        }
      }
      .list-item-actions {
        margin-top: 16px;
        margin-left: auto;
        & > * {
          padding: 0 16px;
          &:first-child {
            padding-left: 0;
          }
        }
      }
    }
    .list-item-extra {
      margin-left: 24px;
    }
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
  :deep(.m-list-item) {
    padding: 16px 24px;
  }
}
.list-bordered.list-large {
  .m-list-header,
  :deep(.m-list-item),
  .m-list-footer {
    padding: 16px 24px;
  }
}
</style>
