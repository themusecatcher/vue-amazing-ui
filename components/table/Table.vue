<script setup lang="ts">
import { isVNode, ref, computed, watch, watchEffect, onMounted, nextTick } from 'vue'
import type { VNode, CSSProperties, Slot } from 'vue'
import Spin from 'components/spin'
import Empty from 'components/empty'
import Scrollbar from 'components/scrollbar'
import Checkbox from 'components/checkbox'
import Radio from 'components/radio'
import Tooltip from 'components/tooltip'
import Ellipsis from 'components/ellipsis'
import Pagination from 'components/pagination'
import { useSlotsExist, useResizeObserver } from 'components/utils'
export interface Column {
  title?: string // 列头显示文字
  align?: 'left' | 'center' | 'right' // 列文本的对齐方式
  width?: string | number // 列宽度，单位 px
  className?: string // 自定义列的类名
  colSpan?: number // 表头列合并，设置为 0 时，不渲染
  dataIndex?: string // 列数据在数据项中对应的路径索引；数据展示列必传，操作列可忽略
  key?: string // 自定义列标识
  ellipsis?: boolean // 超过宽度是否自动省略
  ellipsisProps?: object // Ellipsis 组件属性配置，参考 Ellipsis Props，用于单独配置某列文本省略，较高优先级
  fixed?: 'left' | 'right' // 列是否固定，列表头分组时，只需设置所有叶子节点是否固定
  slot?: string // 列插槽名称索引
  children?: Column[] // 列表头分组的子节点
  showSorterTooltip?: boolean // 表头是否显示下一次排序的 tooltip 提示，较高优先级
  sortTooltipProps?: object // Tooltip 组件属性配置，参考 Tooltip Props，用于单独配置某列的排序弹出提示，较高优先级
  defaultSortOrder?: 'ascend' | 'descend' // 默认排序顺序，建议只设置一列的默认排序；如果设置多列，则只有第一列默认排序生效
  sortDirections?: ('ascend' | 'descend')[] // 支持的排序方式
  sorter?: Function // 升序排序函数，参考 Array.sort 的 compareFunction，当列表头分组时，请将排序设置在叶子节点
  customCell?: (record: any, rowIndex: number, column: Column) => object | undefined // 设置单元格属性
  [propName: string]: any // 用于包含带有任意数量的其他属性
}
export interface Selection {
  columnTitle?: string | VNode // 自定义选择框标题
  columnWidth?: string | number // 列表选择框宽度
  fixed?: boolean // 复选框列是否固定在左边
  hideSelectAll?: boolean // 是否隐藏全选复选框
  type?: 'checkbox' | 'radio' // 复选框/单选框
  onChange?: (selectedRowKeys: string[], selectedRows: any[]) => void // 选中项发生变化时的回调
  onSelect?: (record: any, selected: boolean, selectedRows: any[], selectedRowKeys: string[]) => void // 点击除全选外某行选择框时的回调
  onSelectAll?: (
    selected: boolean,
    selectedRows: any[],
    changeRows: any[],
    selectedRowKeys: string[],
    changeRowKeys: string[]
  ) => void // 点击复选框全选时的回调
  getSelectionProps?: (record: any, rowIndex: number) => object // 选择框组件的属性配置
}
export type ScrollOption = {
  initialScrollPositionOnChange?: boolean // 当分页、排序变化后是否滚动到表格初始位置
  x?: string | number | true // 设置横向滚动，也可用于指定滚动区域的宽，可以设置为像素值，百分比，true 和 'max-content'
  y?: string | number // 设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值
}
export interface Props {
  header?: string // 表格标题 string | slot
  footer?: string // 表格尾部 string | slot
  columns?: Column[] // 表格列的配置项
  dataSource?: object[] // 表格数据数组
  bordered?: boolean // 是否展示外边框和列边框
  rowClassName?: string | ((record: any, rowIndex: number) => string) // 自定义行的类名
  size?: 'large' | 'middle' | 'small' // 表格大小
  striped?: boolean // 是否使用斑马条纹
  loading?: boolean // 是否加载中
  spinProps?: object // Spin 组件属性配置，参考 Spin Props，用于配置数据加载中
  emptyProps?: object // Empty 组件属性配置，参考 Empty Props，用于配置暂无数据
  ellipsisProps?: object // Ellipsis 组件属性配置，参考 Ellipsis Props，用于全局配置文本省略
  showSorterTooltip?: boolean // 表头是否显示下一次排序的 tooltip 提示
  sortDirections?: ('ascend' | 'descend')[] // 支持的排序方式
  sortTooltipProps?: object // 排序 Tooltip 组件属性配置，参考 Tooltip Props，用于全局配置排序弹出提示
  sticky?: boolean //	是否设置粘性定位的表头和水平滚动条，设置之后表头和滚动条会跟随页面固定
  showPagination?: boolean // 是否显示分页
  pagination?: object // Pagination 组件属性配置，参考 Pagination Props，用于配置分页功能
  rowSelection?: Selection // 列表项选择配置
  scroll?: ScrollOption // 表格是否可滚动，也可以指定滚动区域的宽、高，配置项
  scrollbarProps?: object // Scrollbar 组件属性配置，参考 Scrollbar Props，用于配置表格滚动条
  tableLayout?: 'auto' | 'fixed' // 表格布局方式，设为 fixed 表示内容不会影响列的布局，参考 table-layout 属性
  showExpandColumn?: boolean // 是否展示展开列
  expandColumnTitle?: string // 自定义展开列表头 string | slot
  expandColumnWidth?: string | number // 展开列的宽度
  expandCell?: Slot // 自定义展开按钮 slot
  expandedRowRender?: Slot // 自定义额外的展开行内容 slot
  expandFixed?: boolean // 是否固定展开列
  expandedRowKeys?: (string | number)[] // (v-model) 展开行的 key 数组，控制展开行的属性；需与 dataSource 数据中的 key 配合使用
  expandRowByClick?: boolean // 点击行是否展开
}
const props = withDefaults(defineProps<Props>(), {
  header: undefined,
  footer: undefined,
  columns: () => [],
  dataSource: () => [],
  bordered: false,
  rowClassName: undefined,
  size: 'large',
  striped: false,
  loading: false,
  spinProps: () => ({}),
  emptyProps: () => ({}),
  ellipsisProps: () => ({}),
  showSorterTooltip: true,
  sortDirections: () => ['ascend', 'descend'],
  sortTooltipProps: () => ({}),
  sticky: false,
  showPagination: true,
  pagination: () => ({}),
  rowSelection: undefined,
  scroll: undefined,
  scrollbarProps: () => ({}),
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
const tableRef = ref() // table 组件模板引用
const tablePage = ref<number>(1) // 分页器当前页数
const tablePageSize = ref<number>(10) // 分页器每页条数
const hoverRowIndex = ref<number | null>() // 鼠标悬浮行的索引
const mergeHoverCoords = ref<Coords[]>([]) // 鼠标悬浮时被合并单元格的坐标
const displayDataSource = ref<any[]>([]) // 当前展示的表格数据
const tableExpandedRowKeys = ref<(string | number)[]>([]) // 当前展开行的 key 数组
const checkAll = ref(false) // 是否全选
const indeterminate = ref(false) // 全选样式控制
const tableOptionsChecked = ref<boolean[]>([]) // 表格选项数组
const selectedRowKeys = ref<string[]>([]) // 已选中行的 key 数组
const changeRowKeys = ref<any[]>([]) // 变化行的 key 数组
const selectedRows = ref<any[]>([]) // 已选中行的数组
const changeRows = ref<any[]>([]) // 变化行的数组
const tooltipRef = ref() // 排序 tooltip 提示组件模板引用
const ellipsisRef = ref() // 文本省略组件模板引用
const scrollbarRef = ref() // 水平滚动容器模板引用
const scrollLeft = ref<number>(0) // 表格水平滚动时距容器左边位置
const scrollWidth = ref<number>(0) // 表格水平滚动元素宽度，包括溢出滚动，不包括边框
const scrollHeight = ref<number>(0) // 表格垂直滚动元素高度，包括溢出滚动，不包括边框
const clientWidth = ref<number>(0) // 表格水平滚动元素宽度，不包括溢出滚动，不包括边框
const clientHeight = ref<number>(0) // 表格垂直滚动元素高度，不包括溢出滚动，不包括边框
const scrollMax = ref<number>(0) // 表格水平滚动时，最大可滚动距离
const colExpandRef = ref() // 表格展开列 col 的引用
const colSelectionRef = ref() // 表格可选择列 col 的引用
const colRef = ref() // 表格除展开列/可选择列以外 col 的引用
const thColumnsLeaf = ref<Column[]>([]) // thColumns 的所有叶子节点,包括 colSpan: 0 的列
const disabledDefaultSort = ref<boolean>(false) // 是否禁用默认排序
const sortColumn = ref<Column | null>(null) // 排序列
const sortColumnDataIndex = ref<string | null>(null) // 排序列的数据索引
const sortColumnSorter = ref<Function | null>(null) // 排序列的升序排序函数
const sortSymbol = ref<'ascend' | 'descend' | null>(null) // 排序标识
const sortHoverDataIndex = ref<string | null>(null) // 鼠标悬浮排序列的数据索引
const clickSorter = ref(false) // 是否点击排序
const slotsExist = useSlotsExist(['header', 'footer'])
const emits = defineEmits(['expand', 'expandedRowsChange', 'update:expandedRowKeys', 'sortChange', 'change'])
// 是否展示复选框
const showSelectionColumn = computed(() => {
  return props.rowSelection !== undefined
})
// 是否自定义了复选框标题
const showSelectionColumnTitle = computed(() => {
  return props.rowSelection?.columnTitle
})
// 是否展示全选复选框
const showSelectionAll = computed(() => {
  return (
    !props.rowSelection?.hideSelectAll &&
    (props.rowSelection?.type === undefined || props.rowSelection?.type === 'checkbox')
  )
})
// 是否设置了水平滚动
const horizontalScroll = computed(() => {
  return props.scroll?.x !== undefined
})
// 是否存在水平滚动
const xScrollable = computed(() => {
  return horizontalScroll.value && scrollWidth.value > clientWidth.value
})
// 是否设置了垂直滚动
const verticalScroll = computed(() => {
  return props.scroll?.y !== undefined
})
// 是否存在垂直滚动
const yScrollable = computed(() => {
  return verticalScroll.value && scrollHeight.value > clientHeight.value
})
// 是否显示左阴影
const showShadowLeft = computed(() => {
  return scrollLeft.value > 0
})
// 是否显示右阴影
const showShadowRight = computed(() => {
  return scrollWidth.value - clientWidth.value > Math.round(scrollLeft.value)
})
// 是否存在左固定列
const hasFixLeft = computed(() => {
  const fixedLeft = props.columns.some((column: Column) => column.fixed === 'left')
  return expandColumnFixed.value || selectionColumnFixed.value || fixedLeft
})
// 是否存在右固定列
const hasFixRight = computed(() => {
  const fixedRight = props.columns.some((column: Column) => column.fixed === 'right')
  return fixedRight
})
// 是否存在表格标题
const showHeader = computed(() => {
  return slotsExist.header || props.header
})
// 表格布局方式
const tableLayoutComputed = computed(() => {
  if (props.tableLayout === undefined) {
    const ellipsis = props.columns.some((column: Column) => column.ellipsis)
    const columnFixed = props.columns.some((column: Column) => column.fixed)
    if (ellipsis || columnFixed || expandColumnFixed.value || selectionColumnFixed.value || verticalScroll.value) {
      return 'fixed'
    }
    return 'auto'
  }
  return props.tableLayout
})
// 表格 table 元素的样式
const tableStyle = computed(() => {
  const style: CSSProperties = {
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
  style.tableLayout = tableLayoutComputed.value
  return style
})
// 无数据时的样式
const emptyFixStyle = computed(() => {
  const style: CSSProperties = {
    width: `${clientWidth.value}px`,
    position: 'sticky',
    left: '0px',
    overflow: 'hidden'
  }
  return style
})
// 展开列的宽度样式
const tableExpandCellStyle = computed(() => {
  return {
    width: typeof props.expandColumnWidth === 'number' ? `${props.expandColumnWidth}px` : props.expandColumnWidth
  }
})
// 复选框列的宽度样式
const tableSelectionCellStyle = computed(() => {
  const style: CSSProperties = {
    width: '32px'
  }
  if (props.rowSelection?.columnWidth !== undefined) {
    if (typeof props.rowSelection.columnWidth === 'number') {
      style.width = `${props.rowSelection.columnWidth}px`
    } else {
      style.width = props.rowSelection.columnWidth
    }
  }
  return style
})
// 过滤掉 colSpan 为 0 的列
const thColumns = computed(() => {
  return props.columns.filter((column: Column) => column.colSpan !== 0)
})
// 表头分组后的 th columns
const thColumnsGroup = computed(() => {
  return getThColumnsGroup(props.columns)
})
const thFirstColumnFixed = computed(() => {
  return thColumnsGroup.value[0][0].fixed === 'left'
})
// 可选择列是否固定
const selectionColumnFixed = computed(() => {
  if (props.rowSelection !== undefined) {
    if (props.rowSelection.fixed || thFirstColumnFixed.value) {
      return true
    }
  }
  return false
})
// 可选择列是否固定，且为最后一个
const selectionColumnFixedLast = computed(() => {
  return selectionColumnFixed.value && !thFirstColumnFixed.value
})
// 展开列是否固定
const expandColumnFixed = computed(() => {
  return (
    props.showExpandColumn &&
    (props.expandFixed || selectionColumnFixed.value || (!showSelectionColumn.value && thFirstColumnFixed.value))
  )
})
// 展开列是否固定，且为最后一个
const expandColumnFixedLast = computed(() => {
  return (
    (expandColumnFixed.value && showSelectionColumn.value && !selectionColumnFixed.value) ||
    (expandColumnFixed.value && !showSelectionColumn.value && !thFirstColumnFixed.value)
  )
})
// 表格展开行固定时的样式
const tableExpandRowFixStyle = computed(() => {
  const style: CSSProperties = {
    width: `${clientWidth.value + (props.bordered ? 1 : 0)}px`,
    position: 'sticky',
    left: '0px',
    overflow: 'hidden'
  }
  return style
})
// 表头固定时的样式，用于模拟滚动效果
const tableHeadStyle = computed(() => {
  const style: CSSProperties = {
    position: 'relative',
    left: `${-scrollLeft.value}px`
  }
  return style
})
// 设置垂直滚动时的 tbody 样式
const tableBodyScrollStyle = computed(() => {
  const style: CSSProperties = {}
  if (verticalScroll.value) {
    const scroll = props.scroll
    style.maxHeight = typeof scroll?.y === 'number' ? `${scroll.y}px` : scroll?.y
  }
  return style
})
// 是否存在表格尾部
const showFooter = computed(() => {
  return slotsExist.footer || props.footer
})
// 表格数据总数
const totalDataSource = computed(() => {
  let total = props.dataSource.length
  if (props.showPagination && 'total' in props.pagination) {
    total = props.pagination.total as number
  }
  return total
})
// 是否一次性加载全部数据并进行分页，即：展示分页，且数据总数等于数据源的长度
const loadAllData = computed(() => {
  return props.showPagination && totalDataSource.value === props.dataSource.length
})
// 监听数据源/是否一次性加载全部数据并进行分页/全部数据/分页状态/排序状态变化，更新展示数据
watch(
  () => [
    props.dataSource,
    loadAllData.value,
    tablePage.value,
    tablePageSize.value,
    sortColumnDataIndex.value,
    sortColumnSorter.value,
    sortSymbol.value
  ],
  () => {
    if (loadAllData.value) {
      let allDataSource: any[]
      if (sortColumnDataIndex.value === null) {
        allDataSource = [...props.dataSource]
      } else {
        allDataSource = [...props.dataSource].sort(sortColumnSorter.value as (a: any, b: any) => number)
        if (sortSymbol.value === 'descend') {
          allDataSource.reverse()
        }
      }
      displayDataSource.value = allDataSource.slice(
        (tablePage.value - 1) * tablePageSize.value,
        tablePage.value * tablePageSize.value
      )
    } else {
      let currentDataSource: any[]
      if (sortColumnDataIndex.value === null) {
        currentDataSource = [...props.dataSource]
      } else {
        currentDataSource = [...props.dataSource].sort(sortColumnSorter.value as (a: any, b: any) => number)
        if (sortSymbol.value === 'descend') {
          currentDataSource.reverse()
        }
      }
      displayDataSource.value = currentDataSource
    }
  },
  {
    immediate: true,
    deep: true
  }
)
// 监听点击排序导致的表格展示数据的变化
watch(
  displayDataSource,
  (to) => {
    tableOptionsChecked.value = new Array(to.length).fill(false)
    if (clickSorter.value) {
      clickSorter.value = false
      emits('sortChange', sortColumn.value, to)
    }
  },
  {
    immediate: true
  }
)
// 监听表格选项数组变化
watch(
  tableOptionsChecked,
  (to) => {
    if (props.rowSelection?.type === undefined || props.rowSelection?.type === 'checkbox') {
      const selectedOptions = to.filter((checked: boolean) => checked)
      let checkboxOptionsAmount = 0
      displayDataSource.value.forEach((record: any, rowIndex: number) => {
        const checkboxProps =
          props.rowSelection?.getSelectionProps && props.rowSelection.getSelectionProps(record, rowIndex)
        if (!(checkboxProps && 'disabled' in checkboxProps && checkboxProps.disabled)) {
          checkboxOptionsAmount++
        }
      })
      indeterminate.value = 0 < selectedOptions.length && selectedOptions.length < checkboxOptionsAmount
      checkAll.value = selectedOptions.length === checkboxOptionsAmount
    }
  },
  {
    deep: true
  }
)
// 初始化默认排序
watchEffect(() => {
  if (!disabledDefaultSort.value) {
    initDefaultSort()
  }
})
// 监听分页状态变化
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
// 监听当前展开行的 key 数组变化
watchEffect(() => {
  tableExpandedRowKeys.value = props.expandedRowKeys
})
onMounted(() => {
  getScrollState()
  tooltipObserveScroll()
  ellipsisObserveScroll()
})
// 监听表格尺寸变化，更新滚动状态
useResizeObserver(tableRef, () => {
  getScrollState()
})
// 点击复选框全选
function onCheckAllChange(checked: boolean) {
  changeRowKeys.value.splice(0)
  changeRows.value.splice(0)
  displayDataSource.value.forEach((record: any, rowIndex: number) => {
    const checkboxProps =
      props.rowSelection?.getSelectionProps && props.rowSelection.getSelectionProps(record, rowIndex)
    if (!(checkboxProps && 'disabled' in checkboxProps && checkboxProps.disabled)) {
      if (checked) {
        // 全选
        if (!tableOptionsChecked.value[rowIndex]) {
          tableOptionsChecked.value[rowIndex] = true
          selectedRowKeys.value.push(record.key)
          selectedRows.value.push(record)
          changeRowKeys.value.push(record.key)
          changeRows.value.push(record)
        }
      } else {
        // 取消全选
        selectedRowKeys.value.splice(0)
        selectedRows.value.splice(0)
        if (tableOptionsChecked.value[rowIndex]) {
          tableOptionsChecked.value[rowIndex] = false
          changeRowKeys.value.push(record.key)
          changeRows.value.push(record)
        }
      }
    }
  })
  props.rowSelection?.onSelectAll &&
    props.rowSelection.onSelectAll(
      checked,
      selectedRows.value,
      changeRows.value,
      selectedRowKeys.value,
      changeRowKeys.value
    )
  props.rowSelection?.onChange && props.rowSelection.onChange(selectedRowKeys.value, selectedRows.value)
}
// 点击某行复选框/单选框
function onTableSelectionChange(checked: boolean, rowIndex: number, key: string, record: any) {
  if (checked) {
    // 选中复选框/单选框
    if (props.rowSelection?.type === 'radio') {
      tableOptionsChecked.value.forEach((checked: boolean, index) => {
        if (index !== rowIndex && checked) {
          tableOptionsChecked.value[index] = false
        }
      })
      selectedRowKeys.value = [key]
      selectedRows.value = [record]
    } else {
      selectedRowKeys.value.push(key)
      selectedRows.value.push(record)
    }
  } else {
    // 复选框取消选中
    selectedRowKeys.value = selectedRowKeys.value.filter((selectedRowKey: string) => selectedRowKey !== key)
    selectedRows.value = selectedRows.value.filter((selectedRow: any) => selectedRow.key !== key)
  }
  props.rowSelection?.onSelect &&
    props.rowSelection.onSelect(record, checked, selectedRows.value, selectedRowKeys.value)
  props.rowSelection?.onChange && props.rowSelection.onChange(selectedRowKeys.value, selectedRows.value)
}
// 初始化默认排序时的数据索引，标识和展示数据
function initDefaultSort() {
  const thLeaf = thColumnsLeaf.value.filter((column: Column) => column.colSpan !== 0)
  const len = thLeaf.length
  for (let i = 0; i < len; i++) {
    const column = thLeaf[i]
    if (column.defaultSortOrder !== undefined) {
      sortColumnDataIndex.value = column.dataIndex as string
      sortColumnSorter.value = column.sorter as (a: any, b: any) => number
      sortSymbol.value = column.defaultSortOrder
      return
    }
  }
}
// 获取滚动状态信息
function getScrollState() {
  if (scrollbarRef.value) {
    const scrollData = scrollbarRef.value.getScrollData()
    if (horizontalScroll.value) {
      scrollWidth.value = scrollData.scrollWidth
      clientWidth.value = scrollData.clientWidth
      scrollMax.value = scrollWidth.value - clientWidth.value
    }
    if (verticalScroll.value) {
      scrollHeight.value = scrollData.scrollHeight
      clientHeight.value = scrollData.clientHeight
    }
  }
}
// 在组件挂载后主动触发 tooltip 组件弹出提示的滚动元素监听
async function tooltipObserveScroll() {
  await nextTick()
  if (tooltipRef.value) {
    tooltipRef.value.forEach((el: any) => el.observeScroll())
  }
}
// 在组件挂载后主动触发 ellipsis 组件弹出提示的滚动元素监听
async function ellipsisObserveScroll() {
  await nextTick()
  if (ellipsisRef.value) {
    ellipsisRef.value.forEach((el: any) => el.observeScroll())
  }
}
// 检查 children 中是否有固定列
function checkChildrenFix(columns: Column[] | undefined, fixed: 'left' | 'right'): boolean {
  if (columns && columns.length) {
    const len = columns.length
    for (let i = 0; i < len; i++) {
      const column = columns[i]
      if (column.fixed && column.fixed === fixed) {
        return true
      } else {
        if (checkChildrenFix(column.children, fixed)) {
          return true
        }
      }
    }
  }
  return false
}
// 获取 children 的叶子节点数量
function getChildrenLeafNumber(columns: Column[]) {
  let result = 0
  columns.forEach((column: Column) => {
    if (column.children && column.children.length > 0) {
      result += getChildrenLeafNumber(column.children)
    } else {
      result += 1
    }
  })
  return result
}
// 获取 columns 的最大深度
function getMaxDepth(columns: Column[], currentDepth = 1) {
  let maxDepth = currentDepth
  columns.forEach((column: Column) => {
    if (column.children && column.children.length > 0) {
      const childDepth = getMaxDepth(column.children, currentDepth + 1)
      if (childDepth > maxDepth) {
        maxDepth = childDepth
      }
    }
  })
  return maxDepth
}
// 计算获取表头分组的 th columns
function getThColumnsGroup(columns: Column[]) {
  thColumnsLeaf.value.splice(0)
  const maxDepth = getMaxDepth(columns)
  const result: Array<Column[]> = []
  for (let i = 0; i < maxDepth; i++) {
    result.push([])
  }
  function processColumns(columns: Column[], depth: number, colStart: number) {
    columns.forEach((column: Column) => {
      if (column.children && column.children.length > 0) {
        column.colSpan = getChildrenLeafNumber(column.children)
        column.colStart = colStart
        column.colEnd = colStart + column.colSpan - 1
        colStart += column.colSpan
        processColumns(column.children, depth + 1, column.colStart)
      } else {
        column.rowSpan = maxDepth - depth
        column.colStart = colStart
        column.colEnd = colStart
        colStart += 1
        thColumnsLeaf.value.push(column) // 添加叶子节点
      }
      if (checkChildrenFix(column.children, 'left')) {
        column.fixed = 'left'
      }
      if (checkChildrenFix(column.children, 'right')) {
        column.fixed = 'right'
      }
      result[depth].push(column)
    })
  }
  processColumns(columns, 0, props.showExpandColumn ? 1 : 0)
  return result
}
// 获取表格对应于表头分组，处理后每行的 columns
function getTdColumnsGroup(record: any, rowIndex: number) {
  return thColumnsLeaf.value.filter((column: Column) => {
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
// 针对于 props 和 Column 都有的属性，获取计算后的值，优先级为 Column's > props's
function getComputedValue(column: Column, key: keyof Props) {
  let computedValue = props[key as keyof Props]
  if (column?.[key as keyof Column] !== undefined) {
    computedValue = column[key as keyof Column]
  }
  return computedValue as object | ('ascend' | 'descend')[]
}
// 获取 sorter 排序提示文本
function getSortTooltip(column: Column) {
  const sortTooltipMap = {
    ascend: '点击升序',
    descend: '点击降序'
  }
  const sortDirections = getComputedValue(column, 'sortDirections') as ('ascend' | 'descend')[]
  if (!disabledDefaultSort.value && sortColumnDataIndex.value === column.dataIndex) {
    // 默认排序列
    if (sortDirections.length === 2) {
      if (column.defaultSortOrder === sortDirections[0]) {
        return sortTooltipMap[sortDirections[1]]
      } else {
        return '取消排序'
      }
    } else {
      // sortDirections.length === 1
      return '取消排序'
    }
  } else {
    if (sortColumnDataIndex.value === column.dataIndex) {
      if (sortSymbol.value === 'ascend') {
        if (sortDirections.length === 1) {
          // ['ascend']
          return '取消排序'
        } else {
          // sortDirections.length === 2
          if (sortDirections[0] === 'ascend') {
            // ['ascend', 'descend']
            return '点击降序'
          } else {
            return '取消排序'
          }
        }
      } else {
        // descend
        if (sortDirections.length === 1) {
          return '取消排序'
        } else {
          // sortDirections.length === 2
          if (sortDirections[0] === 'ascend') {
            // ['ascend', 'descend']
            return '取消排序'
          } else {
            // ['descend', 'ascend']
            return '点击升序'
          }
        }
      }
    } else {
      if (sortDirections.length > 0) {
        return sortTooltipMap[sortDirections[0]]
      } else {
        return undefined
      }
    }
  }
}
// 点击 th 单元格操作排序，更新 sortColumnDataIndex sortColumnSorter sortSymbol
function onSorter(column: Column) {
  clickSorter.value = true
  sortColumn.value = column
  if (!disabledDefaultSort.value) {
    disabledDefaultSort.value = true
  }
  const sortDirections = getComputedValue(column, 'sortDirections') as ('ascend' | 'descend')[]
  if (sortColumnDataIndex.value === column.dataIndex) {
    if (sortSymbol.value === 'ascend') {
      if (sortDirections.length === 1) {
        // ['ascend']
        sortColumnDataIndex.value = null
        sortColumnSorter.value = null
        sortSymbol.value = null
      } else {
        // sortDirections.length === 2
        if (sortDirections[0] === 'ascend') {
          sortSymbol.value = 'descend'
        } else {
          // sortDirections[1] === 'ascend'
          sortColumnDataIndex.value = null
          sortColumnSorter.value = null
          sortSymbol.value = null
        }
      }
    } else {
      // descend
      if (sortDirections.length === 1) {
        // ['ascend', 'descend'] || ['descend']
        sortColumnDataIndex.value = null
        sortColumnSorter.value = null
        sortSymbol.value = null
      } else {
        // sortDirections.length === 2
        if (sortDirections[0] === 'ascend') {
          // ['ascend', 'descend']
          sortColumnDataIndex.value = null
          sortColumnSorter.value = null
          sortSymbol.value = null
        } else {
          // ['descend', 'ascend']
          sortSymbol.value = 'ascend'
        }
      }
    }
  } else {
    sortColumnDataIndex.value = column.dataIndex as string
    sortColumnSorter.value = column.sorter as (a: any, b: any) => number
    if (sortDirections.length > 0) {
      sortSymbol.value = sortDirections[0]
    }
  }
  initialScrollPosition()
}
// 鼠标移入排序
function onEnterSorter(dataIndex: string) {
  sortHoverDataIndex.value = dataIndex
}
// 鼠标离开排序
function onLeaveSorter() {
  sortHoverDataIndex.value = null
}
// 检查是否是左固定列的最后一列
function checkFixLeftLast(columns: Column[], column: Column, index: number) {
  if (column.fixed === 'left' && index < columns.length - 1) {
    if (columns[index + 1].fixed !== 'left') {
      return true
    }
  }
  return false
}
// 检查是否是右固定列的第一列
function checkFixRightFirst(columns: Column[], column: Column, index: number) {
  if (column.fixed === 'right' && index > 0) {
    if (columns[index - 1].fixed !== 'right') {
      return true
    }
  }
  return false
}
// 表格单元格样式
function tableCellWidthStyle(column: Column) {
  const style: CSSProperties = {}
  if (column.width !== undefined) {
    style.width = typeof column.width === 'number' ? `${column.width}px` : column.width
  }
  return style
}
// 展开列固定时的样式
function tableExpandCellFixStyle(fixed: boolean) {
  const style: CSSProperties = {}
  if (fixed) {
    style.position = 'sticky'
    style.left = '0px'
  }
  return style
}
// 可选择列固定时的样式
function tableSelectionCellFixStyle(fixed: boolean) {
  const style: CSSProperties = {}
  if (fixed) {
    style.position = 'sticky'
    style.left = props.showExpandColumn ? `${colExpandRef.value && colExpandRef.value.offsetWidth}px` : '0px'
  }
  return style
}
// 表格单元格固定时的样式
function tableCellFixStyle(column: Column) {
  const style: CSSProperties = {}
  if (column.fixed) {
    if (colRef.value && colRef.value.length) {
      style.position = 'sticky'
      if (column.fixed === 'left') {
        const colStart = column.colStart
        let offset = 0
        if (props.showExpandColumn) {
          offset += colExpandRef.value.offsetWidth
        }
        if (showSelectionColumn.value) {
          offset += colSelectionRef.value.offsetWidth
        }
        for (let i = 0; i < (props.showExpandColumn ? colStart - 1 : colStart); i++) {
          offset += colRef.value[i].offsetWidth
        }
        style.left = `${offset}px`
        return style
      }
      if (column.fixed === 'right') {
        const colEnd = column.colEnd
        let offset = 0
        for (let i = colRef.value.length - 1; i > (props.showExpandColumn ? colEnd - 1 : colEnd); i--) {
          offset += colRef.value[i].offsetWidth
        }
        style.right = `${offset}px`
        return style
      }
    }
  }
  return style
}
// 获取被合并单元格的列索引
function getMergedCellsColIndex(record: any, rowIndex: number): number[] {
  const mergedCellsColIndex: number[] = []
  props.columns.forEach((column: Column, colIndex: number) => {
    if (column.customCell) {
      const custom = column.customCell(record, rowIndex, column)
      if (custom && 'rowSpan' in custom && custom.rowSpan === 0) {
        mergedCellsColIndex.push(colIndex)
      }
    }
  })
  return mergedCellsColIndex
}
// 获取被合并单元格的行索引
function getMergeCellRowIndex(record: any, column: Column, rowIndex: number) {
  if (rowIndex >= 0) {
    const custom = column.customCell?.(record, rowIndex, column)
    if (custom && 'rowSpan' in custom && (custom.rowSpan as number) > 0) {
      return rowIndex
    } else {
      return getMergeCellRowIndex(record, column, rowIndex - 1)
    }
  }
}
// 获取每行的类名
function getRowClassName(record: any, rowIndex: number) {
  if (typeof props.rowClassName == 'function') {
    return props.rowClassName(record, rowIndex)
  }
  return props.rowClassName
}
// 鼠标悬浮某行
function onEnterRow(record: any, rowIndex: number) {
  hoverRowIndex.value = rowIndex
  const mergedCellsColIndex = getMergedCellsColIndex(record, rowIndex)
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
// 鼠标离开某行
function onLeaveRow() {
  hoverRowIndex.value = null
  mergeHoverCoords.value.splice(0) // 重置被合并单元格的坐标
}
// 检查单元格是否处于鼠标悬浮所在的区域，包括行/列合并的单元格
function checkHoverCoord(row: number, col: number) {
  return mergeHoverCoords.value.some((coord: Coords) => coord.row === row && coord.col === col)
}
// 展开/收起展开行
function onExpandCell(record: any) {
  const key = record.key
  if (tableExpandedRowKeys.value.includes(key)) {
    tableExpandedRowKeys.value = tableExpandedRowKeys.value.filter((rowKey: string | number) => rowKey !== key)
  } else {
    tableExpandedRowKeys.value.push(key)
  }
  emits('expand', tableExpandedRowKeys.value.includes(key), record)
  emits('expandedRowsChange', tableExpandedRowKeys.value)
  emits('update:expandedRowKeys', tableExpandedRowKeys.value)
}
// 表格滚动事件
function onScroll(e: Event, direction: 'left' | 'right' | 'top' | 'bottom') {
  if (['left', 'right'].includes(direction)) {
    // 水平滚动
    scrollLeft.value = (e.target as HTMLElement).scrollLeft
    scrollWidth.value = (e.target as HTMLElement).scrollWidth
    clientWidth.value = (e.target as HTMLElement).clientWidth
  }
  if (['top', 'bottom'].includes(direction)) {
    // 垂直滚动
    scrollHeight.value = (e.target as HTMLElement).scrollHeight
    clientHeight.value = (e.target as HTMLElement).clientHeight
  }
}
// 鼠标滚轮或触摸板滑动事件
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
    scrollbarRef.value.scrollTo({
      left: scrollLeft.value,
      behavior: 'instant'
    })
  }
}
function initialScrollPosition() {
  if (props.scroll?.initialScrollPositionOnChange) {
    scrollbarRef.value.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
}
// 分页变化事件
function onPaginationChange(page: number, pageSize: number) {
  tablePage.value = page
  tablePageSize.value = pageSize
  emits('change', page, pageSize)
  initialScrollPosition()
}
</script>
<template>
  <div ref="tableRef" class="m-table-wrap">
    <Spin size="small" :spinning="loading" v-bind="spinProps">
      <div
        class="m-table"
        :class="{
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
        <div
          v-if="!verticalScroll && !sticky"
          class="table-container"
          :class="{ 'container-no-x-scroll': !xScrollable }"
        >
          <Scrollbar
            ref="scrollbarRef"
            style="border-radius: 8px 8px 0 0"
            :x-scrollable="xScrollable"
            :y-scrollable="yScrollable"
            :auto-hide="false"
            @scroll="onScroll"
            v-bind="scrollbarProps"
          >
            <table :style="tableStyle">
              <colgroup>
                <col ref="colExpandRef" v-if="showExpandColumn" :style="tableExpandCellStyle" />
                <col ref="colSelectionRef" v-if="showSelectionColumn" :style="tableSelectionCellStyle" />
                <col
                  ref="colRef"
                  :style="tableCellWidthStyle(column)"
                  v-for="(column, index) in thColumnsLeaf"
                  :key="index"
                />
              </colgroup>
              <thead>
                <tr v-for="(columns, rowIndex) in thColumnsGroup" :key="rowIndex">
                  <template v-if="rowIndex === 0">
                    <th
                      v-if="showExpandColumn"
                      class="table-th"
                      :class="{
                        'table-cell-fix-left': expandColumnFixed,
                        'table-cell-fix-left-last': expandColumnFixedLast
                      }"
                      :style="tableExpandCellFixStyle(expandColumnFixed)"
                      :rowspan="getMaxDepth(thColumns)"
                      :colstart="0"
                      :colend="0"
                    >
                      <slot name="expandColumnTitle">{{ expandColumnTitle }}</slot>
                    </th>
                    <th
                      v-if="showSelectionColumn"
                      class="table-th table-th-selection"
                      :class="{
                        'table-cell-fix-left': selectionColumnFixed,
                        'table-cell-fix-left-last': selectionColumnFixedLast
                      }"
                      :style="tableSelectionCellFixStyle(selectionColumnFixed)"
                      :rowspan="getMaxDepth(thColumns)"
                      :colstart="0"
                      :colend="0"
                    >
                      <template v-if="showSelectionColumnTitle">
                        <component v-if="isVNode(rowSelection?.columnTitle)" :is="rowSelection?.columnTitle" />
                        <template v-else>{{ rowSelection?.columnTitle }}</template>
                      </template>
                      <div v-else-if="showSelectionAll" class="table-selection">
                        <Checkbox
                          :indeterminate="indeterminate"
                          v-model:checked="checkAll"
                          @change="onCheckAllChange"
                        />
                      </div>
                    </th>
                  </template>
                  <template v-for="(column, colIndex) in columns" :key="`${rowIndex}-${colIndex}`">
                    <th
                      v-if="column.colSpan !== 0"
                      class="table-th"
                      :class="[
                        column.className,
                        {
                          'table-cell-has-sorter': column.sorter,
                          'table-cell-sort': sortColumnDataIndex === column.dataIndex,
                          'table-cell-align-left': column.align === 'left',
                          'table-cell-align-center': column.align === 'center',
                          'table-cell-align-right': column.align === 'right',
                          'table-cell-fix-left': column.fixed === 'left',
                          'table-cell-fix-left-last': checkFixLeftLast(columns, column, colIndex),
                          'table-cell-fix-right': column.fixed === 'right',
                          'table-cell-fix-right-first': checkFixRightFirst(columns, column, colIndex)
                        }
                      ]"
                      :style="tableCellFixStyle(column)"
                      :rowspan="column.rowSpan"
                      :colspan="column.colSpan"
                      :colstart="column.colStart"
                      :colend="column.colEnd"
                      @mouseenter="column.sorter ? onEnterSorter(column.dataIndex as string) : () => false"
                      @mouseleave="column.sorter ? onLeaveSorter() : () => false"
                      @click="column.sorter ? onSorter(column) : () => false"
                    >
                      <Tooltip
                        v-if="column.sorter"
                        ref="tooltipRef"
                        style="width: 100%"
                        show-control
                        :show="sortHoverDataIndex === column.dataIndex"
                        :content-style="{ width: '100%' }"
                        :tooltip="getComputedValue(column, 'showSorterTooltip') ? getSortTooltip(column) : undefined"
                        :tooltip-style="{ fontWeight: 'normal' }"
                        v-bind="getComputedValue(column, 'sortTooltipProps')"
                      >
                        <div class="table-cell-sorter">
                          <span class="table-cell-title">
                            <slot v-if="column.ellipsis" name="headerCell" :column="column" :title="column.title">
                              <Ellipsis ref="ellipsisRef" v-bind="getComputedValue(column, 'ellipsisProps')">
                                {{ column.title }}
                              </Ellipsis>
                            </slot>
                            <slot v-else name="headerCell" :column="column" :title="column.title">
                              {{ column.title }}
                            </slot>
                          </span>
                          <span
                            class="table-cell-arrow"
                            :class="{
                              'ascend-arrow': sortColumnDataIndex === column.dataIndex && sortSymbol === 'ascend',
                              'descend-arrow': sortColumnDataIndex === column.dataIndex && sortSymbol === 'descend'
                            }"
                          >
                            <svg
                              width="1.25em"
                              height="1.25em"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 16 16"
                            >
                              <g fill="none">
                                <path
                                  d="M8 14a.75.75 0 0 1-.75-.75V4.463L4.309 7.75a.75.75 0 0 1-1.118-1L7.441 2A.75.75 0 0 1 8.56 2l4.25 4.75a.75.75 0 1 1-1.118 1L8.75 4.463v8.787A.75.75 0 0 1 8 14z"
                                  fill="currentColor"
                                ></path>
                              </g>
                            </svg>
                          </span>
                        </div>
                      </Tooltip>
                      <slot v-else-if="column.ellipsis" name="headerCell" :column="column" :title="column.title">
                        <Ellipsis ref="ellipsisRef" v-bind="getComputedValue(column, 'ellipsisProps')">
                          {{ column.title }}
                        </Ellipsis>
                      </slot>
                      <slot v-else name="headerCell" :column="column" :title="column.title">
                        {{ column.title }}
                      </slot>
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!displayDataSource.length">
                  <td class="table-empty" :colspan="thColumnsLeaf.length">
                    <div v-if="xScrollable" class="table-empty-fixed" :style="emptyFixStyle">
                      <Empty class="empty" image="outlined" v-bind="emptyProps" />
                    </div>
                    <Empty v-else class="empty" image="outlined" v-bind="emptyProps" />
                  </td>
                </tr>
                <template v-if="displayDataSource.length">
                  <template v-for="(record, rowIndex) in displayDataSource" :key="rowIndex">
                    <tr
                      :class="getRowClassName(record, rowIndex)"
                      @mouseenter="onEnterRow(record, rowIndex)"
                      @mouseleave="onLeaveRow"
                      @click="expandRowByClick ? onExpandCell(record) : () => false"
                    >
                      <td
                        v-if="showExpandColumn"
                        class="table-td table-td-expand"
                        :class="{
                          'table-cell-fix-left': expandColumnFixed,
                          'table-cell-fix-left-last': expandColumnFixedLast,
                          'table-td-hover': hoverRowIndex === rowIndex
                        }"
                        :style="tableExpandCellFixStyle(expandColumnFixed)"
                        @click.stop="onExpandCell(record)"
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
                        v-if="showSelectionColumn"
                        class="table-td table-td-selection"
                        :class="{
                          'table-cell-fix-left': selectionColumnFixed,
                          'table-cell-fix-left-last': selectionColumnFixedLast,
                          'table-td-hover': hoverRowIndex === rowIndex
                        }"
                        :style="tableSelectionCellFixStyle(selectionColumnFixed)"
                      >
                        <div class="table-selection">
                          <Radio
                            v-if="rowSelection?.type === 'radio'"
                            v-model:checked="tableOptionsChecked[rowIndex]"
                            @change="onTableSelectionChange($event, rowIndex, record.key, record)"
                            v-bind="rowSelection?.getSelectionProps && rowSelection.getSelectionProps(record, rowIndex)"
                          />
                          <Checkbox
                            v-else
                            v-model:checked="tableOptionsChecked[rowIndex]"
                            @change="onTableSelectionChange($event, rowIndex, record.key, record)"
                            v-bind="rowSelection?.getSelectionProps && rowSelection.getSelectionProps(record, rowIndex)"
                          />
                        </div>
                      </td>
                      <td
                        class="table-td"
                        :class="[
                          column.className,
                          {
                            'table-cell-sort': sortColumnDataIndex === column.dataIndex,
                            'table-cell-align-left': column.align === 'left',
                            'table-cell-align-center': column.align === 'center',
                            'table-cell-align-right': column.align === 'right',
                            'table-cell-fix-left': column.fixed === 'left',
                            'table-cell-fix-left-last': checkFixLeftLast(
                              getTdColumnsGroup(record, rowIndex),
                              column,
                              colIndex
                            ),
                            'table-cell-fix-right': column.fixed === 'right',
                            'table-cell-fix-right-first': checkFixRightFirst(
                              getTdColumnsGroup(record, rowIndex),
                              column,
                              colIndex
                            ),
                            'table-td-hover': hoverRowIndex === rowIndex || checkHoverCoord(rowIndex, colIndex)
                          }
                        ]"
                        :style="tableCellFixStyle(column)"
                        v-for="(column, colIndex) in getTdColumnsGroup(record, rowIndex)"
                        :key="`${rowIndex}-${colIndex}`"
                        v-bind="column.customCell && column.customCell(record, rowIndex, column)"
                      >
                        <slot
                          v-if="column.ellipsis"
                          name="bodyCell"
                          :column="column"
                          :record="record"
                          :text="record[column.dataIndex as string]"
                          :index="rowIndex"
                        >
                          <Ellipsis ref="ellipsisRef" v-bind="getComputedValue(column, 'ellipsisProps')">
                            {{ record[column.dataIndex as string] }}
                          </Ellipsis>
                        </slot>
                        <slot
                          v-else
                          name="bodyCell"
                          :column="column"
                          :record="record"
                          :text="record[column.dataIndex as string]"
                          :index="rowIndex"
                        >
                          {{ record[column.dataIndex as string] }}
                        </slot>
                      </td>
                    </tr>
                    <template v-if="showExpandColumn">
                      <tr v-show="tableExpandedRowKeys.includes(record.key)">
                        <td class="table-td table-td-expand-row" :colspan="thColumnsLeaf.length + 1">
                          <div v-if="expandColumnFixed" class="table-expand-row-fixed" :style="tableExpandRowFixStyle">
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
          </Scrollbar>
        </div>
        <div
          v-else
          class="table-container"
          :class="{
            'container-vertical-no-x-scroll': !xScrollable,
            'container-no-scroll': !xScrollable && !yScrollable
          }"
        >
          <div class="table-head" :class="{ 'table-head-sticky': sticky }">
            <table :style="[tableStyle, tableHeadStyle]" @wheel="xScrollable ? onWheel($event) : () => false">
              <colgroup>
                <col ref="colExpandRef" v-if="showExpandColumn" :style="tableExpandCellStyle" />
                <col ref="colSelectionRef" v-if="showSelectionColumn" :style="tableSelectionCellStyle" />
                <col
                  ref="colRef"
                  :style="tableCellWidthStyle(column)"
                  v-for="(column, index) in thColumnsLeaf"
                  :key="index"
                />
              </colgroup>
              <thead>
                <tr v-for="(columns, rowIndex) in thColumnsGroup" :key="rowIndex">
                  <template v-if="rowIndex === 0">
                    <th
                      v-if="showExpandColumn"
                      class="table-th"
                      :class="{
                        'table-cell-fix-left': expandColumnFixed,
                        'table-cell-fix-left-last': expandColumnFixedLast
                      }"
                      :style="tableExpandCellFixStyle(expandColumnFixed)"
                      :rowspan="getMaxDepth(thColumns)"
                      :colstart="0"
                      :colend="0"
                    >
                      <slot name="expandColumnTitle">{{ expandColumnTitle }}</slot>
                    </th>
                    <th
                      v-if="showSelectionColumn"
                      class="table-th table-th-selection"
                      :class="{
                        'table-cell-fix-left': selectionColumnFixed,
                        'table-cell-fix-left-last': selectionColumnFixedLast
                      }"
                      :style="tableSelectionCellFixStyle(selectionColumnFixed)"
                      :rowspan="getMaxDepth(thColumns)"
                      :colstart="0"
                      :colend="0"
                    >
                      <template v-if="showSelectionColumnTitle">
                        <component v-if="isVNode(rowSelection?.columnTitle)" :is="rowSelection?.columnTitle" />
                        <template v-else>{{ rowSelection?.columnTitle }}</template>
                      </template>
                      <div v-else-if="showSelectionAll" class="table-selection">
                        <Checkbox
                          :indeterminate="indeterminate"
                          v-model:checked="checkAll"
                          @change="onCheckAllChange"
                        />
                      </div>
                    </th>
                  </template>
                  <template v-for="(column, colIndex) in columns" :key="`${rowIndex}-${colIndex}`">
                    <th
                      v-if="column.colSpan !== 0"
                      class="table-th"
                      :class="[
                        column.className,
                        {
                          'table-cell-has-sorter': column.sorter,
                          'table-cell-sort': sortColumnDataIndex === column.dataIndex,
                          'table-cell-align-left': column.align === 'left',
                          'table-cell-align-center': column.align === 'center',
                          'table-cell-align-right': column.align === 'right',
                          'table-cell-fix-left': column.fixed === 'left',
                          'table-cell-fix-left-last': checkFixLeftLast(columns, column, colIndex),
                          'table-cell-fix-right': column.fixed === 'right',
                          'table-cell-fix-right-first': checkFixRightFirst(columns, column, colIndex)
                        }
                      ]"
                      :style="tableCellFixStyle(column)"
                      :rowspan="column.rowSpan"
                      :colspan="column.colSpan"
                      :colstart="column.colStart"
                      :colend="column.colEnd"
                      :title="column.ellipsis && xScrollable ? column.title : undefined"
                      @mouseenter="column.sorter ? onEnterSorter(column.dataIndex as string) : () => false"
                      @mouseleave="column.sorter ? onLeaveSorter() : () => false"
                      @click="column.sorter ? onSorter(column) : () => false"
                    >
                      <Tooltip
                        v-if="column.sorter"
                        ref="tooltipRef"
                        style="width: 100%"
                        show-control
                        :show="sortHoverDataIndex === column.dataIndex"
                        :content-style="{ width: '100%' }"
                        :tooltip="getComputedValue(column, 'showSorterTooltip') ? getSortTooltip(column) : undefined"
                        :tooltip-style="{ fontWeight: 'normal' }"
                        v-bind="getComputedValue(column, 'sortTooltipProps')"
                      >
                        <div class="table-cell-sorter">
                          <span class="table-cell-title">
                            <slot
                              v-if="column.ellipsis && !xScrollable"
                              name="headerCell"
                              :column="column"
                              :title="column.title"
                            >
                              <Ellipsis ref="ellipsisRef" v-bind="getComputedValue(column, 'ellipsisProps')">
                                {{ column.title }}
                              </Ellipsis>
                            </slot>
                            <slot v-else name="headerCell" :column="column" :title="column.title">
                              {{ column.title }}
                            </slot>
                          </span>
                          <span
                            class="table-cell-arrow"
                            :class="{
                              'ascend-arrow': sortColumnDataIndex === column.dataIndex && sortSymbol === 'ascend',
                              'descend-arrow': sortColumnDataIndex === column.dataIndex && sortSymbol === 'descend'
                            }"
                          >
                            <svg
                              width="1.25em"
                              height="1.25em"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 16 16"
                            >
                              <g fill="none">
                                <path
                                  d="M8 14a.75.75 0 0 1-.75-.75V4.463L4.309 7.75a.75.75 0 0 1-1.118-1L7.441 2A.75.75 0 0 1 8.56 2l4.25 4.75a.75.75 0 1 1-1.118 1L8.75 4.463v8.787A.75.75 0 0 1 8 14z"
                                  fill="currentColor"
                                ></path>
                              </g>
                            </svg>
                          </span>
                        </div>
                      </Tooltip>
                      <slot
                        v-else-if="column.ellipsis && !xScrollable"
                        name="headerCell"
                        :column="column"
                        :title="column.title"
                      >
                        <Ellipsis ref="ellipsisRef" v-bind="getComputedValue(column, 'ellipsisProps')">
                          {{ column.title }}
                        </Ellipsis>
                      </slot>
                      <slot v-else name="headerCell" :column="column" :title="column.title">
                        {{ column.title }}
                      </slot>
                    </th>
                  </template>
                </tr>
              </thead>
            </table>
          </div>
          <Scrollbar
            ref="scrollbarRef"
            class="table-body"
            :class="{ 'table-x-scrollbar-sticky': sticky }"
            :x-scrollable="xScrollable"
            :y-scrollable="yScrollable"
            :auto-hide="false"
            :style="tableBodyScrollStyle"
            @scroll="onScroll"
            v-bind="scrollbarProps"
          >
            <table :style="tableStyle">
              <colgroup>
                <col v-if="showExpandColumn" :style="tableExpandCellStyle" />
                <col v-if="showSelectionColumn" :style="tableSelectionCellStyle" />
                <col :style="tableCellWidthStyle(column)" v-for="(column, index) in thColumnsLeaf" :key="index" />
              </colgroup>
              <tbody>
                <tr v-if="!displayDataSource.length">
                  <td class="table-empty" :colspan="thColumnsLeaf.length">
                    <div v-if="xScrollable" class="table-empty-fixed" :style="emptyFixStyle">
                      <Empty class="empty" image="outlined" v-bind="emptyProps" />
                    </div>
                    <Empty v-else class="empty" image="outlined" v-bind="emptyProps" />
                  </td>
                </tr>
                <template v-if="displayDataSource.length">
                  <template v-for="(record, rowIndex) in displayDataSource" :key="rowIndex">
                    <tr
                      :class="getRowClassName(record, rowIndex)"
                      @mouseenter="onEnterRow(record, rowIndex)"
                      @mouseleave="onLeaveRow"
                      @click="expandRowByClick ? onExpandCell(record) : () => false"
                    >
                      <td
                        v-if="showExpandColumn"
                        class="table-td table-td-expand"
                        :class="{
                          'table-cell-fix-left': expandColumnFixed,
                          'table-cell-fix-left-last': expandColumnFixedLast,
                          'table-td-hover': hoverRowIndex === rowIndex
                        }"
                        :style="tableExpandCellFixStyle(expandColumnFixed)"
                        @click.stop="onExpandCell(record)"
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
                        v-if="showSelectionColumn"
                        class="table-td table-td-selection"
                        :class="{
                          'table-cell-fix-left': selectionColumnFixed,
                          'table-cell-fix-left-last': selectionColumnFixedLast,
                          'table-td-hover': hoverRowIndex === rowIndex
                        }"
                        :style="tableSelectionCellFixStyle(selectionColumnFixed)"
                      >
                        <div class="table-selection">
                          <Radio
                            v-if="rowSelection?.type === 'radio'"
                            v-model:checked="tableOptionsChecked[rowIndex]"
                            @change="onTableSelectionChange($event, rowIndex, record.key, record)"
                            v-bind="rowSelection?.getSelectionProps && rowSelection.getSelectionProps(record, rowIndex)"
                          />
                          <Checkbox
                            v-else
                            v-model:checked="tableOptionsChecked[rowIndex]"
                            @change="onTableSelectionChange($event, rowIndex, record.key, record)"
                            v-bind="rowSelection?.getSelectionProps && rowSelection.getSelectionProps(record, rowIndex)"
                          />
                        </div>
                      </td>
                      <td
                        class="table-td"
                        :class="[
                          column.className,
                          {
                            'table-cell-sort': sortColumnDataIndex === column.dataIndex,
                            'table-cell-align-left': column.align === 'left',
                            'table-cell-align-center': column.align === 'center',
                            'table-cell-align-right': column.align === 'right',
                            'table-cell-fix-left': column.fixed === 'left',
                            'table-cell-fix-left-last': checkFixLeftLast(
                              getTdColumnsGroup(record, rowIndex),
                              column,
                              colIndex
                            ),
                            'table-cell-fix-right': column.fixed === 'right',
                            'table-cell-fix-right-first': checkFixRightFirst(
                              getTdColumnsGroup(record, rowIndex),
                              column,
                              colIndex
                            ),
                            'table-td-hover': hoverRowIndex === rowIndex || checkHoverCoord(rowIndex, colIndex)
                          }
                        ]"
                        :style="tableCellFixStyle(column)"
                        v-for="(column, colIndex) in getTdColumnsGroup(record, rowIndex)"
                        :key="`${rowIndex}-${colIndex}`"
                        v-bind="column.customCell && column.customCell(record, rowIndex, column)"
                      >
                        <slot
                          v-if="column.ellipsis"
                          name="bodyCell"
                          :column="column"
                          :record="record"
                          :text="record[column.dataIndex as string]"
                          :index="rowIndex"
                        >
                          <Ellipsis ref="ellipsisRef" v-bind="getComputedValue(column, 'ellipsisProps')">
                            {{ record[column.dataIndex as string] }}
                          </Ellipsis>
                        </slot>
                        <slot
                          v-else
                          name="bodyCell"
                          :column="column"
                          :record="record"
                          :text="record[column.dataIndex as string]"
                          :index="rowIndex"
                        >
                          {{ record[column.dataIndex as string] }}
                        </slot>
                      </td>
                    </tr>
                    <template v-if="showExpandColumn">
                      <tr v-show="tableExpandedRowKeys.includes(record.key)">
                        <td class="table-td table-td-expand-row" :colspan="thColumnsLeaf.length + 1">
                          <div v-if="expandColumnFixed" class="table-expand-row-fixed" :style="tableExpandRowFixStyle">
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
          </Scrollbar>
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
        overflow: hidden;
        border-radius: 8px 8px 0 0;
      }
      .table-head-sticky {
        position: sticky;
        top: 0px;
        z-index: 3;
        background: #ffffff;
      }
      .table-x-scrollbar-sticky {
        overflow: visible;
        :deep(.rail-horizontal-bottom) {
          position: sticky;
          z-index: 3;
        }
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
          &:first-child {
            th {
              &:first-child {
                border-top-left-radius: 8px;
              }
              &:last-child {
                border-top-right-radius: 8px;
              }
            }
          }
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
          &[colspan]:not([colspan='1']) {
            text-align: center;
          }
          &.table-cell-sort {
            background: #f0f0f0;
          }
        }
        .table-th-selection {
          padding-left: 8px;
          padding-right: 8px;
          text-align: center;
          .table-selection {
            height: 22px;
            vertical-align: top;
            display: inline-flex;
            align-items: center;
          }
        }
        .table-th-ellipsis {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-break: keep-all;
        }
        .table-cell-has-sorter {
          outline: none;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            background: #f0f0f0;
            .table-cell-sorter {
              .table-cell-arrow {
                &:not(.ascend-arrow, .descend-arrow) {
                  color: rgba(0, 0, 0, 0.57);
                }
              }
            }
          }
          :deep(.m-tooltip-card) {
            cursor: auto;
          }
          .table-cell-sorter {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .table-cell-title {
              position: relative;
              z-index: 1;
              flex: 1;
              max-width: calc(100% - 22px);
            }
            .table-cell-arrow {
              display: inline-flex;
              align-items: center;
              margin-left: 4px;
              color: rgba(0, 0, 0, 0.29);
              transition: all 0.3s;
              svg {
                fill: currentColor;
              }
            }
            .ascend-arrow {
              color: #1677ff;
            }
            .descend-arrow {
              color: #1677ff;
              transform: rotate(180deg);
            }
          }
        }
        .table-empty {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          .table-empty-fixed {
            padding: 16px;
            margin: -16px -17px;
            border-right: 1px solid #f0f0f0;
          }
          .empty {
            margin: 32px 0;
          }
        }
        .table-td {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          transition: padding 0.3s;
          &.table-cell-sort {
            background: #fafafa;
          }
          .expand-btn {
            position: relative;
            left: -3px;
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
        .table-cell-align-left {
          text-align: left;
        }
        .table-cell-align-center {
          text-align: center;
        }
        .table-cell-align-right {
          text-align: right;
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
          padding-left: 14px;
          padding-right: 14px;
        }
        .table-td-expand-row {
          background: rgba(0, 0, 0, 0.02);
        }
        .table-td-selection {
          padding-left: 8px;
          padding-right: 8px;
          text-align: center;
          .table-selection {
            height: 22px;
            vertical-align: top;
            display: inline-flex;
            align-items: center;
          }
        }
      }
    }
    .container-no-x-scroll {
      .m-scrollbar {
        overflow: visible;
      }
    }
    .container-vertical-no-x-scroll {
      .table-head {
        overflow: visible;
      }
    }
    .container-no-scroll {
      .m-scrollbar {
        overflow: visible;
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
      border-right: 0;
      table {
        th,
        td {
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
  .table-pagination {
    margin: 16px 0;
  }
}
</style>
