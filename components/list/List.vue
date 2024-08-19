<script setup lang="ts">
import { computed, useSlots } from 'vue'
import Spin from '../spin'
import Empty from '../empty'
import Pagination from '../pagination'
interface Props {
  bordered?: boolean // 是否展示边框
  vertical?: boolean // 是否使用竖直样式
  split?: boolean // 是否展示分割线
  size?: 'small' | 'middle' | 'large' // 列表尺寸
  loading?: boolean // 是否加载中
  hoverable?: boolean // 是否显示悬浮样式
  header?: string // 列表头部 string | slot
  footer?: string // 列表底部 string | slot
  spinProps?: object // Spin 组件属性配置，参考 Spin Props，用于配置列表加载中样式
  emptyProps?: object // Empty 组件属性配置，参考 Empty Props，用于配置暂无数据样式
  showPagination?: boolean // 是否显示分页
  pagination?: object // Pagination 组件属性配置，参考 Pagination Props，用于配置分页功能
}
const props = withDefaults(defineProps<Props>(), {
  bordered: false,
  vertical: false,
  split: true,
  size: 'middle',
  loading: false,
  hoverable: false,
  header: undefined,
  footer: undefined,
  spinProps: () => ({}),
  emptyProps: () => ({}),
  showPagination: false,
  pagination: () => ({})
})
const slots = useSlots()
const showHeader = computed(() => {
  const headerSlots = slots.header?.()
  return Boolean(headerSlots && headerSlots?.length) || props.header
})
const showDefault = computed(() => {
  const defaultSlots = slots.default?.()
  return Boolean(defaultSlots && defaultSlots?.length && defaultSlots[0].children?.length)
})
const showFooter = computed(() => {
  const footerSlots = slots.footer?.()
  return Boolean(footerSlots && footerSlots?.length) || props.footer
})
</script>
<template>
  <Spin :spinning="loading" size="small" v-bind="spinProps">
    <div
      class="m-list"
      :class="{
        'list-bordered': bordered,
        'list-vertical': vertical,
        'list-split': split,
        'list-small': size === 'small',
        'list-large': size === 'large',
        'list-hoverable': hoverable
      }"
    >
      <div class="m-list-header" v-if="showHeader">
        <slot name="header">{{ header }}</slot>
      </div>
      <slot v-if="showDefault"></slot>
      <div class="m-list-empty" v-else>
        <Empty image="outlined" v-bind="emptyProps" />
      </div>
      <div class="m-list-footer" v-if="showFooter">
        <slot name="footer">{{ footer }}</slot>
      </div>
      <div class="m-list-pagination" v-if="showPagination">
        <Pagination placement="right" v-bind="pagination" />
      </div>
    </div>
  </Spin>
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
  .m-list-empty {
    padding: 16px;
  }
  .m-list-pagination {
    margin-top: 24px;
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
  .m-list-pagination {
    margin: 16px 24px;
  }
}
.list-vertical {
  :deep(.m-list-item) {
    align-items: initial;
    .m-list-item-main {
      display: block;
      .m-list-item-meta {
        margin-bottom: 16px;
        .m-list-item-content {
          .list-item-title {
            margin-bottom: 12px;
            color: rgba(0, 0, 0, 0.88);
            font-size: 16px;
            font-weight: 700;
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
  :deep(.m-list-item) {
    padding: 8px 16px;
  }
}
.list-bordered.list-small {
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
.list-hoverable {
  :deep(.m-list-item) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
}
</style>