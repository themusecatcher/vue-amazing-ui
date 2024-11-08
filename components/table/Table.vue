<script setup lang="ts">
import { computed } from 'vue'
import Spin from '../spin'
import Empty from '../empty'
import Ellipsis from '../ellipsis'
import Pagination from '../pagination'
import { useSlotsExist } from '../utils'
interface Column {
  title?: string // 列头显示文字
  width?: number | string // 列宽度，单位 px
  dataIndex: string // 列数据字符索引
  slot?: string // 列插槽名称索引
  [propName: string]: any // 用于包含带有任意数量的其他属性
}
interface Props {
  bordered?: boolean // 是否展示外边框和列边框
  tableLayout?: 'auto' | 'fixed' // 表格布局方式，设为 fixed 表示内容不会影响列的布局，参考 table-layout 属性
  header?: string // 表格标题 string | slot
  footer?: string // 表格尾部 string | slot
  columns?: Column[] // 表格列的配置项
  dataSource?: any[] // 表格数据数组
  loading?: boolean // 是否加载中
  spinProps?: object // Spin 组件属性配置，参考 Spin Props，用于配置数据加载中样式
  emptyProps?: object // Empty 组件属性配置，参考 Empty Props，用于配置暂无数据样式
  showPagination?: boolean // 是否显示分页
  pagination?: object // Pagination 组件属性配置，参考 Pagination Props，用于配置分页功能
}
const props = withDefaults(defineProps<Props>(), {
  bordered: false,
  tableLayout: 'fixed',
  header: undefined,
  footer: undefined,
  columns: () => [],
  dataSource: () => [],
  loading: false,
  spinProps: () => ({}),
  emptyProps: () => ({}),
  showPagination: true,
  pagination: () => ({})
})
const slotsExist = useSlotsExist(['header', 'footer'])
const emit = defineEmits(['change'])
const showHeader = computed(() => {
  return slotsExist.header || props.header
})
const showFooter = computed(() => {
  return slotsExist.footer || props.footer
})
function onChange(page: number, pageSize: number) {
  // 分页回调
  emit('change', page, pageSize)
}
</script>
<template>
  <div class="m-table-wrap" :class="{ 'table-bordered': bordered }">
    <Spin size="small" :spinning="loading" v-bind="spinProps">
      <div v-if="showHeader" class="table-header">
        <slot name="header">
          {{ header }}
        </slot>
      </div>
      <table class="table-container" :style="`table-layout: ${tableLayout};`">
        <thead>
          <tr>
            <th
              class="table-th"
              :style="`width: ${typeof column.width === 'number' ? column.width + 'px' : column.width};`"
              v-for="(column, index) in columns"
              :key="index"
            >
              <slot name="headerCell" :column="column" :title="column.title">
                <Ellipsis>{{ column.title }}</Ellipsis>
              </slot>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!dataSource.length">
            <td class="table-empty" :colspan="columns.length">
              <Empty class="empty" image="outlined" v-bind="emptyProps" />
            </td>
          </tr>
          <template v-if="dataSource.length">
            <tr class="table-tr" v-for="(record, index) in dataSource" :key="index">
              <td class="table-td" v-for="(column, n) in columns" :key="n">
                <slot name="bodyCell" :column="column" :record="record" :text="record[column.dataIndex]" :index="index">
                  <Ellipsis>{{ record[column.dataIndex] }}</Ellipsis>
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div v-if="showFooter" class="table-footer">
        <slot name="footer">
          {{ footer }}
        </slot>
      </div>
      <Pagination v-if="showPagination" class="mt16" placement="right" @change="onChange" v-bind="pagination" />
    </Spin>
  </div>
</template>
<style lang="less" scoped>
.m-table-wrap {
  max-width: 100%;
  .table-header {
    border-radius: 8px 8px 0 0;
    padding: 16px;
  }
  .table-footer {
    border-radius: 0 0 8px 8px;
    padding: 16px;
    color: rgba(0, 0, 0, 0.88);
    background: #fafafa;
  }
  .table-container {
    display: table;
    table-layout: fixed;
    width: 100%;
    text-align: start;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    background: #ffffff;
    border-radius: 8px 8px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    margin: 0;
    th,
    td {
      border: none;
      :deep(svg) {
        fill: CurrentColor;
      }
    }
    .table-th {
      color: rgba(0, 0, 0, 0.88);
      font-weight: 600;
      text-align: start;
      background: #fafafa;
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
      overflow-wrap: break-word;
      transition: background 0.2s ease;
      &:first-child {
        border-top-left-radius: 8px;
      }
      &:last-child {
        border-top-right-radius: 8px;
      }
    }
    .table-empty {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
      .empty {
        margin: 32px 0;
      }
    }
    .table-tr {
      background-color: #fff;
      transition: background-color 0.2s;
      &:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }
      .table-td {
        padding: 16px;
        padding: 16px;
        border-bottom: 1px solid #f0f0f0;
      }
    }
  }
  .table-header + .table-container {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    .table-th {
      &:first-child,
      &:last-child {
        border-radius: 0;
      }
    }
  }
  .mt16 {
    margin-top: 16px;
  }
}
.table-bordered {
  .table-header {
    border: 1px solid #f0f0f0;
    border-bottom: 0;
  }
  .table-footer {
    border: 1px solid #f0f0f0;
    border-top: 0;
  }
  .table-container {
    border-left: 1px solid #f0f0f0;
    border-top: 1px solid #f0f0f0;
    th,
    td {
      border-right: 1px solid #f0f0f0;
    }
  }
}
</style>
