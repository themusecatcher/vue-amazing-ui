<script setup lang="ts">
import { computed } from 'vue'
import Spin from 'components/spin'
import Empty from 'components/empty'
import Pagination from 'components/pagination'
import { useSlotsExist } from 'components/utils'
export interface Props {
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
const slotsExist = useSlotsExist(['header', 'default', 'footer'])
const showHeader = computed(() => {
  return slotsExist.header || props.header
})
const showFooter = computed(() => {
  return slotsExist.footer || props.footer
})
</script>
<template>
  <Spin size="small" :spinning="loading" v-bind="spinProps">
    <div
      class="list-wrap"
      :class="{
        'list-bordered': bordered,
        'list-vertical': vertical,
        'list-split': split,
        'list-small': size === 'small',
        'list-large': size === 'large',
        'list-hoverable': hoverable
      }"
    >
      <div v-if="showHeader" class="list-header">
        <slot name="header">{{ header }}</slot>
      </div>
      <slot v-if="slotsExist.default"></slot>
      <div v-else class="list-empty">
        <Empty image="outlined" v-bind="emptyProps" />
      </div>
      <div v-if="showFooter" class="list-footer">
        <slot name="footer">{{ footer }}</slot>
      </div>
      <div v-if="showPagination" class="list-pagination">
        <Pagination placement="right" v-bind="pagination" />
      </div>
    </div>
  </Spin>
</template>
<style lang="less" scoped>
.list-wrap {
  margin: 0;
  position: relative;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  .list-header,
  .list-footer {
    background: transparent;
    padding: 12px 0;
    transition: all 0.3s;
  }
  .list-empty {
    padding: 16px;
  }
  .list-pagination {
    margin-top: 24px;
  }
}
.list-bordered {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  .list-header,
  :deep(.list-item-wrap),
  .list-footer {
    padding-inline: 24px;
  }
  .list-pagination {
    margin: 16px 24px;
  }
}
.list-vertical {
  :deep(.list-item-wrap) {
    align-items: initial;
    .list-item-main {
      display: block;
      .list-item-meta {
        margin-bottom: 16px;
        .list-item-content {
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
  .list-header {
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  }
  :deep(.list-item-wrap) {
    &:not(:last-child) {
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    }
  }
}
.list-small {
  :deep(.list-item-wrap) {
    padding: 8px 16px;
  }
}
.list-bordered.list-small {
  .list-header,
  :deep(.list-item-wrap),
  .list-footer {
    padding: 8px 16px;
  }
}
.list-large {
  :deep(.list-item-wrap) {
    padding: 16px 24px;
  }
}
.list-bordered.list-large {
  .list-header,
  :deep(.list-item-wrap),
  .list-footer {
    padding: 16px 24px;
  }
}
.list-hoverable {
  :deep(.list-item-wrap) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
}
</style>
