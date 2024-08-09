<script setup lang="ts">
import Spin from '../spin'
import Empty from '../empty'
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
}
withDefaults(defineProps<Props>(), {
  columns: () => [],
  dataSource: () => [],
  loading: false,
  spinProps: () => ({}),
  emptyProps: () => ({}),
  showPagination: true,
  pagination: () => ({})
})
const emit = defineEmits(['change'])
function changePage(page: number, pageSize: number) {
  // 分页回调
  emit('change', page, pageSize)
}
</script>
<template>
  <div class="m-table-wrap">
    <table class="m-table">
      <thead>
        <tr class="m-tr">
          <th
            class="m-th"
            :style="`width: ${typeof item.width === 'number' ? item.width + 'px' : item.width};`"
            v-for="(item, index) in columns"
            :key="index"
          >
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody class="m-body">
        <tr class="m-tr-loading" v-show="loading">
          <Spin class="m-loading" size="small" v-bind="spinProps" :colspan="columns.length" />
        </tr>
        <tr class="m-tr-empty" v-show="!dataSource.length">
          <td class="m-td-empty" :colspan="columns.length">
            <Empty class="empty" image="outlined" v-bind="emptyProps" />
          </td>
        </tr>
        <tr class="m-tr" v-for="(data, index) in dataSource" :key="index">
          <td class="m-td" v-for="(col, n) in columns" :key="n" :title="data[col.dataIndex as any]">
            <slot v-if="col.slot" v-bind="data" :name="col.slot" :index="index">{{
              data[col.dataIndex as any] || '--'
            }}</slot>
            <span v-else>{{ data[col.dataIndex as any] || '--' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination class="mt20" v-bind="pagination" @change="changePage" v-if="showPagination" />
  </div>
</template>
<style lang="less" scoped>
.m-table-wrap {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5714285714285714;
  border-radius: 8px 8px 0 0;
  .m-table {
    display: table;
    table-layout: fixed;
    width: 100%;
    text-align: left;
    border-radius: 8px 8px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    margin: 0;
    .m-th {
      padding: 16px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      text-align: left;
      background: #fafafa;
      border: none;
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.3s ease;
      &:first-child {
        border-top-left-radius: 8px;
      }
      &:last-child {
        border-top-right-radius: 8px;
      }
    }
    .m-body {
      position: relative;
      .m-tr-loading {
        border: none;
        background-color: #fff;
        .m-loading {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
      .m-tr-empty {
        border: none;
        background-color: #fff;
        &:hover {
          background: #fff;
        }
        .m-td-empty {
          padding: 16px;
          border: none;
          border-bottom: 1px solid #f0f0f0;
          .empty {
            margin: 32px 0;
          }
        }
      }
    }
    .m-tr {
      border: none;
      background-color: #fff;
      transition: background-color 0.3s;
      .m-td {
        padding: 16px;
        border: none;
        border-bottom: 1px solid #f0f0f0;
        transition: background 0.3s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:hover {
        background-color: #fafafa;
      }
    }
  }
}
</style>
