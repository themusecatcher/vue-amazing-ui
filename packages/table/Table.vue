<script setup lang="ts">
import Spin from '../spin'
import Empty from '../empty'
import Pagination from '../pagination'
interface Column {
  title?: string // 列头显示文字
  width: number | string // 列宽度
  dataIndex: string // 列数据字符索引
  slot?: string // 列插槽名称索引
}
interface Pagination {
  // 具体可参考 Pagination 分页组件相关 APIs
  page?: number // 当前页码
  pageSize?: number // 每页条数
  pageSizeOptions?: string[] | number[] // 每页可以显示多少条
  pageListNum?: number // 显示的页码数组长度
  hideOnSinglePage?: boolean // 只有一页时是否隐藏分页
  showQuickJumper?: boolean // 是否可以快速跳转至某页
  showSizeChanger?: boolean // 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
  showTotal?: boolean // 是否显示当前页数和数据总量
  placement?: 'left' | 'center' | 'right' // 分页展示位置：靠左、居中、靠右
}
interface Props {
  columns?: Column[] // 表格列的配置项
  dataSource?: any[] // 表格数据数组
  pagination?: Pagination // 分页配置
  showPagination?: boolean // 是否显示分页
  total?: number // 数据总数
  loading?: boolean // 是否加载中
}
withDefaults(defineProps<Props>(), {
  columns: () => [],
  dataSource: () => [],
  pagination: () => ({}),
  showPagination: true,
  total: 0,
  loading: false
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
          <Spin class="m-loading" size="small" :colspan="columns.length" />
        </tr>
        <tr class="m-tr-empty" v-show="!total">
          <td class="m-td-empty" :colspan="columns.length">
            <Empty class="empty" image="outlined" />
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
    <Pagination
      class="mt20"
      @change="changePage"
      :total="total"
      :page="pagination.page"
      :pageSize="pagination.pageSize"
      :pageSizeOptions="pagination.pageSizeOptions"
      :pageListNum="pagination.pageListNum"
      :hideOnSinglePage="pagination.hideOnSinglePage"
      :showQuickJumper="pagination.showQuickJumper"
      :showSizeChanger="pagination.showSizeChanger"
      :showTotal="pagination.showTotal"
      :placement="pagination.placement"
      v-if="showPagination && total"
    />
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
