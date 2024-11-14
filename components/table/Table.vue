<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { Slot } from 'vue'
import Spin from '../spin'
import Empty from '../empty'
import Ellipsis from '../ellipsis'
import Pagination from '../pagination'
import { useSlotsExist } from '../utils'
interface Column {
  title?: string // 列头显示文字
  width?: number | string // 列宽度，单位 px
  dataIndex: string // 列数据字符索引
  ellipsis?: boolean // 超过宽度是否自动省略，设置为 true 时，表格布局 tableLayout 默认值为 'fixed'
  fixed?: 'left' | 'right' // 列是否固定
  slot?: string // 列插槽名称索引
  customCell?: Function // 设置单元格属性
  [propName: string]: any // 用于包含带有任意数量的其他属性
}
interface ScrollOption {
  x?: string | number | true // 设置横向滚动，也可用于指定滚动区域的宽，可以设置为像素值，百分比，true 和 'max-content'
  y?: string | number // 设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值
}
interface Props {
  bordered?: boolean // 是否展示外边框和列边框
  tableLayout?: 'auto' | 'fixed' // 表格布局方式，设为 fixed 表示内容不会影响列的布局，参考 table-layout 属性
  header?: string // 表格标题 string | slot
  footer?: string // 表格尾部 string | slot
  columns?: Column[] // 表格列的配置项
  dataSource?: any[] // 表格数据数组
  showExpandColumn?: boolean // 是否展示展开列
  expandColumnTitle?: string // 自定义展开列表头 string | slot
  expandColumnWidth?: number | string // 展开列的宽度
  expandCell?: Slot // 自定义展开按钮 slot
  expandedRowRender?: Slot // 自定义额外的展开行内容 slot
  expandFixed?: boolean // 是否固定展开列
  expandedRowKeys?: (string | number)[] // (v-model) 展开行的 key 数组，控制展开行的属性
  expandRowByClick?: boolean // 点击行是否展开
  scroll?: ScrollOption // 表格是否可滚动，也可以指定滚动区域的宽、高，配置项
  loading?: boolean // 是否加载中
  spinProps?: object // Spin 组件属性配置，参考 Spin Props，用于配置数据加载中样式
  emptyProps?: object // Empty 组件属性配置，参考 Empty Props，用于配置暂无数据样式
  showPagination?: boolean // 是否显示分页
  pagination?: object // Pagination 组件属性配置，参考 Pagination Props，用于配置分页功能
}
const props = withDefaults(defineProps<Props>(), {
  bordered: false,
  tableLayout: undefined, // 固定表头/列或使用了 column.ellipsis 时，默认值为 fixed
  header: undefined,
  footer: undefined,
  columns: () => [],
  dataSource: () => [],
  showExpandColumn: false,
  expandColumnTitle: undefined,
  expandColumnWidth: 48,
  expandCell: undefined,
  expandedRowRender: undefined,
  expandFixed: false,
  expandedRowKeys: () => [],
  expandRowByClick: false,
  scroll: undefined,
  loading: false,
  spinProps: () => ({}),
  emptyProps: () => ({}),
  showPagination: true,
  pagination: () => ({})
})
interface Coords {
  row: number
  col: number
}
const hoverRowIndex = ref<number | null>() // 鼠标悬浮行的索引
const mergeHoverCoords = ref<Coords[]>([]) // 鼠标悬浮时被合并单元格的坐标
const tableExpandedRowKeys = ref<(string | number)[]>([])
const tableContentRef = ref() // 水平滚动容器 DOM 引用
const scrollLeft = ref<number>(0) // 表格水平滚动时距容器左边位置
const scrollWidth = ref<number>(0) // 表格水平滚动元素宽度，包括溢出滚动
const offsetWidth = ref<number>(0) // 表格水平滚动元素宽度，不包括溢出滚动
const tableThExpandRef = ref() // 表格展开列 th 的引用
const tableThRef = ref() // 表格除展开列以外的 th 的引用
const slotsExist = useSlotsExist(['header', 'footer'])
const emits = defineEmits(['update:expandedRowKeys', 'change'])
const headerFixed = computed(() => {
  return props.scroll?.y
})
const showShadowLeft = computed(() => {
  return scrollLeft.value > 0
})
const showShadowRight = computed(() => {
  return scrollWidth.value - offsetWidth.value > scrollLeft.value
})
const hasFixLeft = computed(() => {
  const fixedLeft = props.columns.some((column: Column) => column.fixed === 'left')
  return props.expandFixed || fixedLeft
})
const hasFixRight = computed(() => {
  const fixedRight = props.columns.some((column: Column) => column.fixed === 'right')
  return fixedRight
})
const showHeader = computed(() => {
  return slotsExist.header || props.header
})
const tableContainerStyle = computed(() => {
  const style: any = {}
  const scroll = props.scroll
  if (scroll?.x !== undefined) {
    style.overflow = 'auto hidden'
  }
  return style
})
const tableLayoutComputed = computed(() => {
  if (props.tableLayout === undefined) {
    const ellipsis = props.columns.some((column: Column) => column.ellipsis)
    const columnFixed = props.columns.some((column: Column) => column.fixed)
    if (ellipsis || columnFixed || (props.showExpandColumn && props.expandFixed)) {
      return 'fixed'
    }
    return 'auto'
  }
  return props.tableLayout
})
const tableStyle = computed(() => {
  const style: any = {
    minWidth: '100%'
  }
  const scroll = props.scroll
  if (scroll?.x !== undefined) {
    if (typeof scroll.x === 'boolean') {
      style.width = 'auto'
    } else {
      style.width = typeof scroll.x === 'number' ? `${scroll.x}px` : scroll.x
    }
  }
  return {
    ...style,
    tableLayout: tableLayoutComputed.value
  }
})
const tableThExpandStyle = computed(() => {
  return {
    width: typeof props.expandColumnWidth === 'number' ? `${props.expandColumnWidth}px` : props.expandColumnWidth
  }
})
const tableExpandCellFixStyle = computed(() => {
  if (props.expandFixed) {
    return {
      position: 'sticky',
      left: '0px'
    }
  }
  return {}
})
const tableBodyStyle = computed(() => {
  const style: any = {}
  const scroll = props.scroll
  if (scroll?.y !== undefined) {
    style.overflowY = 'scroll'
    style.maxHeight = typeof scroll.y === 'number' ? `${scroll.y}px` : scroll.y
  }
  return style
})
const thColumns = computed(() => {
  return props.columns.filter((column: Column) => column.colSpan !== 0)
})
const tableExpandRowFixStyle = computed(() => {
  const style: any = {}
  if (props.expandFixed) {
    style.width = `${offsetWidth.value + (props.bordered ? 1 : 0)}px`
    style.position = 'sticky'
    style.left = '0px'
    style.overflow = 'hidden'
  }
  return style
})
const showFooter = computed(() => {
  return slotsExist.footer || props.footer
})
watchEffect(() => {
  tableExpandedRowKeys.value = props.expandedRowKeys
})
onMounted(() => {
  scrollWidth.value = tableContentRef.value.scrollWidth
  offsetWidth.value = tableContentRef.value.offsetWidth
  console.log('scrollWidth', scrollWidth.value)
  console.log('offsetWidth', offsetWidth.value)
})
function onHorizontalScroll(e: Event) {
  scrollLeft.value = (e.target as HTMLElement).scrollLeft
  scrollWidth.value = (e.target as HTMLElement).scrollWidth
  offsetWidth.value = (e.target as HTMLElement).offsetWidth
}
function checkFixLeftLast(columns: Column[], column: Column, index: number) {
  if (column.fixed === 'left' && index < columns.length - 1) {
    if (columns[index + 1].fixed !== 'left') {
      return true
    }
  }
  return false
}
function checkFixRightLast(columns: Column[], column: Column, index: number) {
  if (column.fixed === 'right' && index > 0) {
    if (columns[index - 1].fixed !== 'right') {
      return true
    }
  }
  return false
}
function tableThWidthStyle(column: Column) {
  if (column.width !== undefined) {
    return {
      width: typeof column.width === 'number' ? `${column.width}px` : column.width
    }
  }
  return {}
}
function tableCellFixStyle(column: Column, colIndex: number) {
  if (tableThExpandRef.value || tableThRef.value) {
    const style: any = {
      position: 'sticky'
    }
    if (column.fixed === 'left') {
      let offset = 0
      if (props.showExpandColumn && props.expandFixed) {
        offset += tableThExpandRef.value.offsetWidth
      }
      for (let i = 0; i < colIndex; i++) {
        offset += tableThRef.value[i].offsetWidth
      }
      return {
        ...style,
        left: `${offset}px`
      }
    }
    if (column.fixed === 'right') {
      let offset = 0
      for (let i = tableThRef.value.length - 1; i > colIndex; i--) {
        offset += tableThRef.value[i].offsetWidth
      }
      return {
        ...style,
        right: `${offset}px`
      }
    }
  }
  return {}
}
function tdColumns(record: any, rowIndex: number) {
  return props.columns.filter((column: Column) => {
    if (column.customCell) {
      const custom = column.customCell(record, rowIndex, column)
      if (custom) {
        if ('colSpan' in custom && custom.colSpan === 0) {
          return false
        }
        if ('rowSpan' in custom && custom.rowSpan === 0) {
          return false
        }
      }
    }
    return true
  })
}
function getMergedCellsIndex(record: any, rowIndex: number): number[] {
  const mergedCellIndex: number[] = []
  props.columns.forEach((column: Column, colIndex: number) => {
    if (column.customCell) {
      const custom = column.customCell(record, rowIndex, column)
      if (custom && 'rowSpan' in custom && custom.rowSpan === 0) {
        mergedCellIndex.push(colIndex)
      }
    }
  })
  return mergedCellIndex
}
function getMergeCellRowIndex(record: any, column: Column, rowIndex: number) {
  if (rowIndex >= 0) {
    const custom = column.customCell?.(record, rowIndex, column)
    if (custom && 'rowSpan' in custom && custom.rowSpan > 0) {
      return rowIndex
    } else {
      return getMergeCellRowIndex(record, column, rowIndex - 1)
    }
  }
}
function onEnterRow(record: any, rowIndex: number) {
  hoverRowIndex.value = rowIndex
  const mergedCellsColIndex = getMergedCellsIndex(record, rowIndex)
  if (mergedCellsColIndex.length) {
    mergedCellsColIndex.forEach((colIndex: number) => {
      const column = props.columns[colIndex]
      mergeHoverCoords.value.push({
        row: getMergeCellRowIndex(props.dataSource[rowIndex - 1], column, rowIndex - 1) as number,
        col: colIndex
      })
    })
  }
}
function onLeaveRow() {
  hoverRowIndex.value = null
  mergeHoverCoords.value.splice(0) // 重置被合并单元格的坐标
}
function checkHoverCoord(row: number, col: number) {
  return mergeHoverCoords.value.some((coord: Coords) => coord.row === row && coord.col === col)
}
function onExpandCell(key: string | number) {
  console.log('key', key)
  if (tableExpandedRowKeys.value.includes(key)) {
    tableExpandedRowKeys.value = tableExpandedRowKeys.value.filter((rowKey: string | number) => rowKey !== key)
  } else {
    tableExpandedRowKeys.value.push(key)
  }
  emits('update:expandedRowKeys', tableExpandedRowKeys.value)
}
function onChange(page: number, pageSize: number) {
  // 分页回调
  emits('change', page, pageSize)
}
</script>
<template>
  <div class="m-table-wrap">
    <Spin size="small" :spinning="loading" v-bind="spinProps">
      <div
        class="m-table"
        :class="{
          'table-fixed-header': headerFixed,
          'table-shadow-left': showShadowLeft,
          'table-shadow-right': showShadowRight,
          'table-has-fix-left': hasFixLeft,
          'table-has-fix-right': hasFixRight,
          'table-bordered': bordered
        }"
      >
        <div v-if="showHeader" class="table-header">
          <slot name="header">{{ header }}</slot>
        </div>
        <div class="table-container">
          <div ref="tableContentRef" class="table-content" :style="tableContainerStyle" @scroll="onHorizontalScroll">
            <table :style="tableStyle">
              <thead>
                <tr>
                  <th
                    v-if="showExpandColumn"
                    ref="tableThExpandRef"
                    class="table-th"
                    :class="{
                      'table-cell-fix-left': expandFixed,
                      'table-cell-fix-left-last': expandFixed && columns[1].fixed !== 'left'
                    }"
                    :style="[tableThExpandStyle, tableExpandCellFixStyle]"
                  >
                    <slot name="expandColumnTitle">{{ expandColumnTitle }}</slot>
                  </th>
                  <th
                    ref="tableThRef"
                    class="table-th"
                    :class="{
                      'table-cell-fix-left': column.fixed === 'left',
                      'table-cell-fix-left-last': checkFixLeftLast(thColumns, column, index),
                      'table-cell-fix-right': column.fixed === 'right',
                      'table-cell-fix-right-first': checkFixRightLast(thColumns, column, index)
                    }"
                    :style="[tableThWidthStyle(column), tableCellFixStyle(column, index)]"
                    v-for="(column, index) in thColumns"
                    :key="index"
                    :colspan="column.colSpan"
                  >
                    <slot v-if="column.ellipsis" name="headerCell" :column="column" :title="column.title">
                      <Ellipsis>{{ column.title }}</Ellipsis>
                    </slot>
                    <slot v-else name="headerCell" :column="column" :title="column.title">
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
                  <template v-for="(record, rowIndex) in dataSource" :key="rowIndex">
                    <tr
                      class="table-tr"
                      @mouseenter="onEnterRow(record, rowIndex)"
                      @mouseleave="onLeaveRow"
                      @click="expandRowByClick ? onExpandCell(record.key) : () => false"
                    >
                      <td
                        v-if="showExpandColumn"
                        class="table-td"
                        :class="{
                          'table-td-hover': hoverRowIndex === rowIndex,
                          'table-cell-fix-left': expandFixed,
                          'table-cell-fix-left-last': expandFixed && columns[1].fixed !== 'left'
                        }"
                        :style="tableExpandCellFixStyle"
                        @click.stop="onExpandCell(record.key)"
                      >
                        <slot
                          name="expandCell"
                          :record="record"
                          :index="rowIndex"
                          :expanded="tableExpandedRowKeys.includes(record.key)"
                        >
                          <button
                            class="expand-btn"
                            :class="{ 'expand-btn-collapsed': !tableExpandedRowKeys.includes(record.key) }"
                          ></button>
                        </slot>
                      </td>
                      <td
                        class="table-td"
                        :class="{
                          'table-td-hover': hoverRowIndex === rowIndex || checkHoverCoord(rowIndex, colIndex),
                          'table-cell-fix-left': column.fixed === 'left',
                          'table-cell-fix-left-last': checkFixLeftLast(tdColumns(record, rowIndex), column, colIndex),
                          'table-cell-fix-right': column.fixed === 'right',
                          'table-cell-fix-right-first': checkFixRightLast(tdColumns(record, rowIndex), column, colIndex)
                        }"
                        :style="tableCellFixStyle(column, colIndex)"
                        v-for="(column, colIndex) in tdColumns(record, rowIndex)"
                        :key="column.dataIndex"
                        v-bind="column.customCell && column.customCell(record, rowIndex, column)"
                      >
                        <slot
                          v-if="column.ellipsis"
                          name="bodyCell"
                          :column="column"
                          :record="record"
                          :text="record[column.dataIndex]"
                          :index="rowIndex"
                        >
                          <Ellipsis>{{ record[column.dataIndex] }}</Ellipsis>
                        </slot>
                        <slot
                          v-else
                          name="bodyCell"
                          :column="column"
                          :record="record"
                          :text="record[column.dataIndex]"
                          :index="rowIndex"
                        >
                          {{ record[column.dataIndex] }}
                        </slot>
                      </td>
                    </tr>
                    <template v-if="showExpandColumn">
                      <tr v-show="tableExpandedRowKeys.includes(record.key)" class="table-tr table-tr-expand">
                        <td class="table-td" :colspan="columns.length + 1">
                          <div v-if="expandFixed" class="table-expand-row-fixed" :style="tableExpandRowFixStyle">
                            <slot
                              name="expandedRowRender"
                              :record="record"
                              :index="rowIndex"
                              :expanded="tableExpandedRowKeys.includes(record.key)"
                            ></slot>
                          </div>
                          <slot
                            v-else
                            name="expandedRowRender"
                            :record="record"
                            :index="rowIndex"
                            :expanded="tableExpandedRowKeys.includes(record.key)"
                          ></slot>
                        </td>
                      </tr>
                    </template>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="showFooter" class="table-footer">
          <slot name="footer">{{ footer }}</slot>
        </div>
      </div>
      <Pagination v-if="showPagination" class="mt16" placement="right" @change="onChange" v-bind="pagination" />
    </Spin>
  </div>
</template>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.m-table-wrap {
  clear: both;
  max-width: 100%;
  .m-table {
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    background: #ffffff;
    border-radius: 8px 8px 0 0;
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
      position: relative;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      overflow: hidden;
      &::before,
      &::after {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 4;
        width: 30px;
        transition: box-shadow 0.3s;
        content: '';
        pointer-events: none;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
      .table-content {
        table {
          display: table;
          margin: 0;
          width: 100%;
          text-align: start;
          border-radius: 8px 8px 0 0;
          border-collapse: separate;
          border-spacing: 0;
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
            &[colspan]:not([colspan='1']) {
              text-align: center;
            }
          }
          .table-cell-fix-left {
            position: sticky !important;
            z-index: 2;
            &:not(.table-th) {
              background: #ffffff;
            }
          }
          .table-cell-fix-left-last {
            &::after {
              position: absolute;
              top: 0;
              bottom: -1px;
              right: 0;
              width: 30px;
              transform: translateX(100%);
              transition: box-shadow 0.3s;
              content: '';
              pointer-events: none;
            }
          }
          .table-cell-fix-right {
            position: sticky !important;
            z-index: 2;
            &:not(.table-th) {
              background: #ffffff;
            }
          }
          .table-cell-fix-right-first {
            &::before {
              position: absolute;
              top: 0;
              bottom: -1px;
              left: 0;
              width: 30px;
              transform: translateX(-100%);
              transition: box-shadow 0.3s;
              content: '';
              pointer-events: none;
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
            .table-td {
              padding: 16px;
              padding: 16px;
              border-bottom: 1px solid #f0f0f0;
              .expand-btn {
                position: relative;
                color: inherit;
                float: left;
                width: 26px;
                height: 26px;
                line-height: 26px;
                background: #ffffff;
                border: 1px solid #f0f0f0;
                border-radius: 8px;
                outline: none;
                cursor: pointer;
                transform: scale(0.7692307692307693);
                user-select: none;
                transition: all 0.3s;
                &:hover {
                  color: #4096ff;
                  border-color: #4096ff;
                }
                &::before {
                  position: absolute;
                  top: 11px;
                  left: 5px;
                  right: 5px;
                  height: 2px;
                  border-radius: 2px;
                  background: currentcolor;
                  transition: transform 0.3s ease-out;
                  content: '';
                }
                &::after {
                  position: absolute;
                  top: 5px;
                  bottom: 5px;
                  left: 11px;
                  width: 2px;
                  border-radius: 2px;
                  transform: rotate(90deg);
                  background: currentcolor;
                  transition: transform 0.3s ease-out;
                  content: '';
                }
              }
              .expand-btn-collapsed {
                &::before {
                  transform: rotate(-180deg);
                }
                &::after {
                  transform: rotate(0deg);
                }
              }
              .table-expand-row-fixed {
                position: relative;
                margin: -16px -16px;
                padding: 16px 16px;
              }
            }
            .table-td-hover {
              background-color: #fafafa;
            }
          }
          .table-tr-expand {
            .table-td {
              background: rgba(0, 0, 0, 0.02);
            }
          }
        }
      }
    }
    .table-header + .table-container {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      table {
        border-radius: 0;
        .table-th {
          &:first-child,
          &:last-child {
            border-radius: 0;
          }
        }
      }
    }
  }
  .table-shadow-left {
    &:not(.table-has-fix-left) {
      .table-container {
        &::before {
          box-shadow: inset 10px 0 8px -8px rgba(5, 5, 5, 0.06);
        }
      }
    }
    .table-container {
      .table-content {
        .table-cell-fix-left-last {
          &::after {
            box-shadow: inset 10px 0 8px -8px rgba(5, 5, 5, 0.06);
          }
        }
      }
    }
  }
  .table-shadow-right {
    &:not(.table-has-fix-right) {
      .table-container {
        &::after {
          box-shadow: inset -10px 0 8px -8px rgba(5, 5, 5, 0.06);
        }
      }
    }
    .table-container {
      .table-content {
        .table-cell-fix-right-first {
          &::before {
            box-shadow: inset -10px 0 8px -8px rgba(5, 5, 5, 0.06);
          }
        }
      }
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
      border: 1px solid #f0f0f0;
      border-bottom: 0;
      .table-content {
        table {
          th,
          td {
            &:not(:last-child) {
              border-right: 1px solid #f0f0f0;
            }
          }
          .table-tr {
            .table-td {
              .table-expand-row-fixed {
                margin: -16px -17px;
              }
            }
          }
        }
      }
    }
  }
  .mt16 {
    margin-top: 16px;
  }
}
</style>
