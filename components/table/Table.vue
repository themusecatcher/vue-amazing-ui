<script setup lang="ts">
import Spin from '../spin'
import Empty from '../empty'
import Ellipsis from '../ellipsis'
import Pagination from '../pagination'
interface Column {
  title?: string // 列头显示文字
  width?: number | string // 列宽度，单位 px
  dataIndex: string // 列数据字符索引
  slot?: string // 列插槽名称索引
}
interface Props {
  columns?: Column[] // 表格列的配置项
  dataSource?: any[] // 表格数据数组
  loading?: boolean // 是否加载中
  spinProps?: object // Spin 组件属性配置，参考 Spin Props，用于配置数据加载中样式
  emptyProps?: object // Empty 组件属性配置，参考 Empty Props，用于配置暂无数据样式
  showPagination?: boolean // 是否显示分页
  pagination?: object // Pagination 组件属性配置，参考 Pagination Props，用于配置分页功能
  tableLayout?: 'auto' | 'fixed' // 表格布局方式，设为 fixed 表示内容不会影响列的布局，参考 table-layout 属性
}
withDefaults(defineProps<Props>(), {
  columns: () => [],
  dataSource: () => [],
  loading: false,
  spinProps: () => ({}),
  emptyProps: () => ({}),
  showPagination: true,
  pagination: () => ({}),
  tableLayout: 'fixed'
})
const emit = defineEmits(['change'])
function onChange(page: number, pageSize: number) {
  // 分页回调
  emit('change', page, pageSize)
}
</script>
<template>
  <div class="m-table-wrap">
    <Spin size="small" :spinning="loading" v-bind="spinProps">
      <table class="m-table" :style="`table-layout: ${tableLayout};`">
        <thead>
          <tr>
            <th
              class="table-th"
              :style="`width: ${typeof column.width === 'number' ? column.width + 'px' : column.width};`"
              v-for="(column, index) in columns"
              :key="index"
            >
              <slot name="headerCell" :column="column" :title="column.title">
                {{ column.title }}
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
                <slot name="bodyCell" :record="record" :column="column" :text="record[column.dataIndex]" :index="index">
                  <Ellipsis>
                    {{ record[column.dataIndex] || '--' }}
                  </Ellipsis>
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <Pagination v-if="showPagination" class="mt16" placement="right" @change="onChange" v-bind="pagination" />
    </Spin>
  </div>
</template>
<style lang="less" scoped>
.m-table-wrap {
  max-width: 100%;
  .m-table {
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
  .mt16 {
    margin-top: 16px;
  }
}
</style>
