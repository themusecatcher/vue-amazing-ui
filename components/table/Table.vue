<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import type { Slot } from 'vue'
import Spin from '../spin'
import Empty from '../empty'
import Ellipsis from '../ellipsis'
import Pagination from '../pagination'
import { useSlotsExist } from '../utils'
interface Column {
  title?: string // 列头显示文字
  width?: string | number // 列宽度，单位 px
  dataIndex: string // 列数据字符索引
  ellipsis?: boolean // 超过宽度是否自动省略
  ellipsisProps?: object // Ellipsis 组件属性配置，参考 Ellipsis Props，用于单独配置某列文本省略样式
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
  header?: string // 表格标题 string | slot
  footer?: string // 表格尾部 string | slot
  columns?: Column[] // 表格列的配置项
  dataSource?: any[] // 表格数据数组
  bordered?: boolean // 是否展示外边框和列边框
  size?: 'large' | 'middle' | 'small' // 表格大小
  striped?: boolean // 是否使用斑马条纹
  loading?: boolean // 是否加载中
  spinProps?: object // Spin 组件属性配置，参考 Spin Props，用于配置数据加载中样式
  emptyProps?: object // Empty 组件属性配置，参考 Empty Props，用于配置暂无数据样式
  ellipsisProps?: object // Ellipsis 组件属性配置，参考 Ellipsis Props，用于全局配置文本省略样式
  showPagination?: boolean // 是否显示分页
  pagination?: object // Pagination 组件属性配置，参考 Pagination Props，用于配置分页功能
  scroll?: ScrollOption // 表格是否可滚动，也可以指定滚动区域的宽、高，配置项
  tableLayout?: 'auto' | 'fixed' // 表格布局方式，设为 fixed 表示内容不会影响列的布局，参考 table-layout 属性
  showExpandColumn?: boolean // 是否展示展开列
  expandColumnTitle?: string // 自定义展开列表头 string | slot
  expandColumnWidth?: number | string // 展开列的宽度
  expandCell?: Slot // 自定义展开按钮 slot
  expandedRowRender?: Slot // 自定义额外的展开行内容 slot
  expandFixed?: boolean // 是否固定展开列
  expandedRowKeys?: (string | number)[] // (v-model) 展开行的 key 数组，控制展开行的属性
  expandRowByClick?: boolean // 点击行是否展开
}
const props = withDefaults(defineProps<Props>(), {
  header: undefined,
  footer: undefined,
  columns: () => [],
  dataSource: () => [],
  bordered: false,
  size: 'large',
  striped: false,
  loading: false,
  spinProps: () => ({}),
  emptyProps: () => ({}),
  ellipsisProps: () => ({}),
  showPagination: true,
  pagination: () => ({}),
  scroll: undefined,
  tableLayout: undefined, // 固定表头/列或使用了 column.ellipsis 时，默认值为 fixed
  showExpandColumn: false,
  expandColumnTitle: undefined,
  expandColumnWidth: 48,
  expandCell: undefined,
  expandedRowRender: undefined,
  expandFixed: false,
  expandedRowKeys: () => [],
  expandRowByClick: false
})
interface Coords {
  row: number // 行索引坐标
  col: number // 列索引坐标
}
const tablePage = ref<number>(1) // 分页器当前页数
const tablePageSize = ref<number>(10) // 分页器每页条数
const hoverRowIndex = ref<number | null>() // 鼠标悬浮行的索引
const mergeHoverCoords = ref<Coords[]>([]) // 鼠标悬浮时被合并单元格的坐标
const tableExpandedRowKeys = ref<(string | number)[]>([])
const tableScrollRef = ref() // 水平滚动容器 DOM 引用
const scrollLeft = ref<number>(0) // 表格水平滚动时距容器左边位置
const scrollWidth = ref<number>(0) // 表格水平滚动元素宽度，包括溢出滚动
const offsetWidth = ref<number>(0) // 表格水平滚动元素宽度，不包括溢出滚动
const scrollMax = ref<number>(0) // 表格水平滚动时，最大可滚动距离
const tableThExpandRef = ref() // 表格展开列 th 的引用
const tableThRef = ref() // 表格除展开列以外的 th 的引用
const slotsExist = useSlotsExist(['header', 'footer'])
const emits = defineEmits(['update:expandedRowKeys', 'change'])
const horizontalScroll = computed(() => {
  return props.scroll?.x !== undefined
})
const verticalScroll = computed(() => {
  return props.scroll?.y !== undefined
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
  if (horizontalScroll.value) {
    style.overflow = 'auto hidden'
  }
  return style
})
const tableLayoutComputed = computed(() => {
  if (props.tableLayout === undefined) {
    const ellipsis = props.columns.some((column: Column) => column.ellipsis)
    const columnFixed = props.columns.some((column: Column) => column.fixed)
    if (ellipsis || columnFixed || (props.showExpandColumn && props.expandFixed) || verticalScroll.value) {
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
  if (horizontalScroll.value) {
    if (typeof scroll?.x === 'boolean') {
      style.width = 'auto'
    } else {
      style.width = typeof scroll?.x === 'number' ? `${scroll.x}px` : scroll?.x
    }
  }
  return {
    ...style,
    tableLayout: tableLayoutComputed.value
  }
})
const tableExpandCellStyle = computed(() => {
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
const tableHeadStyle = computed(() => {
  return {
    position: 'relative',
    left: `${-scrollLeft.value}px`
  }
})
const tableBodyStyle = computed(() => {
  const style: any = {}
  if (horizontalScroll.value) {
    style.overflowX = 'auto'
  }
  if (verticalScroll.value) {
    const scroll = props.scroll
    style.overflowY = 'scroll'
    style.maxHeight = typeof scroll?.y === 'number' ? `${scroll.y}px` : scroll?.y
  }
  return style
})
const showFooter = computed(() => {
  return slotsExist.footer || props.footer
})
const totalDataSource = computed(() => {
  let total = props.dataSource.length
  if (props.showPagination && 'total' in props.pagination) {
    total = props.pagination.total as number
  }
  return total
})
const displayDataSource = computed(() => {
  // 展示分页，且数据总数等于数据源的长度，即：一次性加载全部数据并进行分页
  if (props.showPagination && totalDataSource.value === props.dataSource.length) {
    return props.dataSource.slice((tablePage.value - 1) * tablePageSize.value, tablePage.value * tablePageSize.value)
  }
  return props.dataSource
})
watchEffect(() => {
  if (props.showPagination) {
    if ('page' in props.pagination) {
      tablePage.value = props.pagination.page as number
    }
    if ('pageSize' in props.pagination) {
      tablePageSize.value = props.pagination.pageSize as number
    }
  }
})
watchEffect(() => {
  tableExpandedRowKeys.value = props.expandedRowKeys
})
onMounted(() => {
  getScrollData()
})
function getScrollData() {
  if (horizontalScroll.value) {
    scrollWidth.value = tableScrollRef.value.scrollWidth
    offsetWidth.value = tableScrollRef.value.offsetWidth
    scrollMax.value = scrollWidth.value - offsetWidth.value
  }
}
function getComputedValue(column: Column, key: keyof Props) {
  let computedValue = props[key as keyof Props]
  if (column?.[key as keyof Column] !== undefined) {
    computedValue = column[key as keyof Column]
  }
  return computedValue as object
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
function tableCellWidthStyle(column: Column) {
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
        row: getMergeCellRowIndex(displayDataSource.value[rowIndex - 1], column, rowIndex - 1) as number,
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
  if (tableExpandedRowKeys.value.includes(key)) {
    tableExpandedRowKeys.value = tableExpandedRowKeys.value.filter((rowKey: string | number) => rowKey !== key)
  } else {
    tableExpandedRowKeys.value.push(key)
  }
  emits('update:expandedRowKeys', tableExpandedRowKeys.value)
}
function onScroll(e: Event) {
  scrollLeft.value = (e.target as HTMLElement).scrollLeft
  scrollWidth.value = (e.target as HTMLElement).scrollWidth
  offsetWidth.value = (e.target as HTMLElement).offsetWidth
}
function onWheel(e: WheelEvent) {
  if (e.deltaX) {
    const scrollX = e.deltaX * 1 // 滚轮的水平滚动量
    if (scrollLeft.value + scrollX > scrollMax.value) {
      scrollLeft.value = scrollMax.value
    } else if (scrollLeft.value + scrollX < 0) {
      scrollLeft.value = 0
    } else {
      e.stopPropagation() // 阻止事件冒泡
      e.preventDefault() // 禁止浏览器捕获触摸板滑动事件
      scrollLeft.value += scrollX
    }
    tableScrollRef.value.scrollLeft = scrollLeft.value
  }
}
function onPaginationChange(page: number, pageSize: number) {
  tablePage.value = page
  tablePageSize.value = pageSize
  // 分页回调
  emits('change', page, pageSize)
  tableScrollRef.value.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}
</script>
<template>
  <div class="m-table-wrap">
    <Spin size="small" :spinning="loading" v-bind="spinProps">
      <div
        class="m-table"
        :class="{
          'table-fixed-header': verticalScroll,
          'table-shadow-left': showShadowLeft,
          'table-shadow-right': showShadowRight,
          'table-has-fix-left': hasFixLeft,
          'table-has-fix-right': hasFixRight,
          'table-small': size === 'small',
          'table-middle': size === 'middle',
          'table-striped': striped,
          'table-bordered': bordered
        }"
      >
        <div v-if="showHeader" class="table-header">
          <slot name="header">{{ header }}</slot>
        </div>
        <div v-if="!verticalScroll" class="table-container">
          <div ref="tableScrollRef" class="table-content" :style="tableContainerStyle" @scroll="onScroll">
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
                    :style="[tableExpandCellStyle, tableExpandCellFixStyle]"
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
                    :style="[tableCellWidthStyle(column), tableCellFixStyle(column, index)]"
                    v-for="(column, index) in thColumns"
                    :key="index"
                    :colspan="column.colSpan"
                  >
                    <slot v-if="column.ellipsis" name="headerCell" :column="column" :title="column.title">
                      <Ellipsis v-bind="getComputedValue(column, 'ellipsisProps')">{{ column.title }}</Ellipsis>
                    </slot>
                    <slot v-else name="headerCell" :column="column" :title="column.title">
                      {{ column.title }}
                    </slot>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!displayDataSource.length">
                  <td class="table-empty" :colspan="columns.length">
                    <Empty class="empty" image="outlined" v-bind="emptyProps" />
                  </td>
                </tr>
                <template v-if="displayDataSource.length">
                  <template v-for="(record, rowIndex) in displayDataSource" :key="rowIndex">
                    <tr
                      @mouseenter="onEnterRow(record, rowIndex)"
                      @mouseleave="onLeaveRow"
                      @click="expandRowByClick ? onExpandCell(record.key) : () => false"
                    >
                      <td
                        v-if="showExpandColumn"
                        class="table-td"
                        :class="{
                          'table-cell-fix-left': expandFixed,
                          'table-cell-fix-left-last': expandFixed && columns[1].fixed !== 'left',
                          'table-td-hover': hoverRowIndex === rowIndex
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
                          'table-cell-fix-left': column.fixed === 'left',
                          'table-cell-fix-left-last': checkFixLeftLast(tdColumns(record, rowIndex), column, colIndex),
                          'table-cell-fix-right': column.fixed === 'right',
                          'table-cell-fix-right-first': checkFixRightLast(
                            tdColumns(record, rowIndex),
                            column,
                            colIndex
                          ),
                          'table-td-hover': hoverRowIndex === rowIndex || checkHoverCoord(rowIndex, colIndex)
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
                          <Ellipsis v-bind="getComputedValue(column, 'ellipsisProps')">{{
                            record[column.dataIndex]
                          }}</Ellipsis>
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
                      <tr v-show="tableExpandedRowKeys.includes(record.key)">
                        <td class="table-td table-td-expand" :colspan="columns.length + 1">
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
        <div v-else class="table-container">
          <div class="table-head" style="overflow: hidden">
            <table :style="[tableStyle, tableHeadStyle]" @wheel="horizontalScroll ? onWheel($event) : () => false">
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
                    :style="[tableExpandCellStyle, tableExpandCellFixStyle]"
                  >
                    <slot name="expandColumnTitle">{{ expandColumnTitle }}</slot>
                  </th>
                  <th
                    ref="tableThRef"
                    :colstart="index"
                    :colend="index"
                    class="table-th"
                    :class="{
                      'table-cell-fix-left': column.fixed === 'left',
                      'table-cell-fix-left-last': checkFixLeftLast(thColumns, column, index),
                      'table-cell-fix-right': column.fixed === 'right',
                      'table-cell-fix-right-first': checkFixRightLast(thColumns, column, index)
                    }"
                    :style="[tableCellWidthStyle(column), tableCellFixStyle(column, index)]"
                    v-for="(column, index) in thColumns"
                    :key="index"
                    :colspan="column.colSpan"
                  >
                    <slot v-if="column.ellipsis" name="headerCell" :column="column" :title="column.title">
                      <Ellipsis v-bind="getComputedValue(column, 'ellipsisProps')">{{ column.title }}</Ellipsis>
                    </slot>
                    <slot v-else name="headerCell" :column="column" :title="column.title">
                      {{ column.title }}
                    </slot>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div ref="tableScrollRef" class="table-body" :style="tableBodyStyle" @scroll="onScroll">
            <table :style="tableStyle">
              <tbody>
                <tr v-if="!displayDataSource.length">
                  <td class="table-empty" :colspan="columns.length">
                    <Empty class="empty" image="outlined" v-bind="emptyProps" />
                  </td>
                </tr>
                <template v-if="displayDataSource.length">
                  <template v-for="(record, rowIndex) in displayDataSource" :key="rowIndex">
                    <tr
                      @mouseenter="onEnterRow(record, rowIndex)"
                      @mouseleave="onLeaveRow"
                      @click="expandRowByClick ? onExpandCell(record.key) : () => false"
                    >
                      <td
                        v-if="showExpandColumn"
                        class="table-td"
                        :class="{
                          'table-cell-fix-left': expandFixed,
                          'table-cell-fix-left-last': expandFixed && columns[1].fixed !== 'left',
                          'table-td-hover': hoverRowIndex === rowIndex
                        }"
                        :style="[tableExpandCellStyle, tableExpandCellFixStyle]"
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
                          'table-cell-fix-left': column.fixed === 'left',
                          'table-cell-fix-left-last': checkFixLeftLast(tdColumns(record, rowIndex), column, colIndex),
                          'table-cell-fix-right': column.fixed === 'right',
                          'table-cell-fix-right-first': checkFixRightLast(
                            tdColumns(record, rowIndex),
                            column,
                            colIndex
                          ),
                          'table-td-hover': hoverRowIndex === rowIndex || checkHoverCoord(rowIndex, colIndex)
                        }"
                        :style="[tableCellWidthStyle(column), tableCellFixStyle(column, colIndex)]"
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
                          <Ellipsis v-bind="getComputedValue(column, 'ellipsisProps')">{{
                            record[column.dataIndex]
                          }}</Ellipsis>
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
                      <tr v-show="tableExpandedRowKeys.includes(record.key)">
                        <td class="table-td table-td-expand" :colspan="columns.length + 1">
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
      <Pagination
        v-if="showPagination"
        class="table-pagination"
        placement="right"
        :size="size"
        @change="onPaginationChange"
        v-bind="{
          ...pagination,
          page: tablePage,
          pageSize: tablePageSize,
          total: totalDataSource
        }"
      />
    </Spin>
  </div>
</template>
<style lang="less" scoped>
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
      transition: padding 0.3s;
    }
    .table-footer {
      border-radius: 0 0 8px 8px;
      padding: 16px;
      color: rgba(0, 0, 0, 0.88);
      background: #fafafa;
      transition: padding 0.3s;
    }
    .table-container {
      position: relative;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
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
      .table-head {
        border-radius: 8px 8px 0 0;
      }
      table {
        display: table;
        margin: 0;
        width: 100%;
        text-align: start;
        border-radius: 8px 8px 0 0;
        border-collapse: separate;
        border-spacing: 0;
        tr {
          background-color: transparent;
        }
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
          transition:
            background 0.2s ease,
            padding 0.3s;
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
        .table-empty {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          .empty {
            margin: 32px 0;
          }
        }
        .table-td {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          transition: padding 0.3s;
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
        .table-cell-fix-left {
          position: sticky !important;
          z-index: 2;
          background: #ffffff;
        }
        .table-th.table-cell-fix-left {
          background: #fafafa;
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
          background: #ffffff;
        }
        .table-th.table-cell-fix-right {
          background: #fafafa;
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
        .table-td-hover {
          background-color: #fafafa;
        }
        .table-td-expand {
          background: rgba(0, 0, 0, 0.02);
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
      .table-cell-fix-left-last {
        &::after {
          box-shadow: inset 10px 0 8px -8px rgba(5, 5, 5, 0.06);
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
      .table-cell-fix-right-first {
        &::before {
          box-shadow: inset -10px 0 8px -8px rgba(5, 5, 5, 0.06);
        }
      }
    }
  }
  .table-small {
    font-size: 14px;
    .table-header,
    .table-footer {
      padding: 8px;
    }
    .table-container {
      table {
        .table-th,
        .table-td {
          padding: 8px;
        }
      }
    }
  }
  .table-middle {
    font-size: 14px;
    .table-header,
    .table-footer {
      padding: 12px 8px;
    }
    .table-container {
      table {
        .table-th,
        .table-td {
          padding: 12px 8px;
        }
      }
    }
  }
  .table-striped {
    tbody {
      tr:nth-child(even) {
        .table-td {
          background-color: #fafafa;
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
      table {
        th,
        td {
          &:not(:last-child) {
            border-right: 1px solid #f0f0f0;
          }
        }
        .table-td {
          .table-expand-row-fixed {
            margin: -16px -17px;
          }
        }
      }
    }
  }
  .table-pagination {
    margin: 16px 0;
  }
}
</style>
