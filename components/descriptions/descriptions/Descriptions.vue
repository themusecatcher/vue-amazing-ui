<script setup lang="ts">
import { computed, createTextVNode, isVNode, useSlots, Comment, Fragment, Text } from 'vue'
import type { CSSProperties, VNode } from 'vue'
import { useMediaQuery, useMounted, useSlotsExist } from 'components/utils'
import DescriptionsItem from '../descriptions-item'
export interface Responsive {
  xs?: number // <576px 响应式栅格
  sm?: number // ≥576px 响应式栅格
  md?: number // ≥768px 响应式栅格
  lg?: number // ≥992px 响应式栅格
  xl?: number // ≥1200px 响应式栅格
  xxl?: number // ≥1600px 响应式栅格
  xxxl?: number // ≥2000px 响应式栅格
}
export interface Props {
  title?: string | VNode // 描述列表的标题，显示在最顶部
  extra?: string | VNode // 描述列表的操作区域，显示在右上方
  bordered?: boolean // 是否展示边框
  layout?: 'horizontal' | 'vertical' // 描述列表布局方式
  size?: 'default' | 'middle' | 'small' // 设置列表的大小
  colon?: boolean // 是否显示标签后的冒号（边框模式不显示冒号）
  column?: number | Responsive // 一行的 DescriptionsItem 数量，可以写成数值或支持响应式的对象写法 { xs: 8, sm: 16, md: 24 }
  labelAlign?: 'left' | 'right' | 'center' // 标签对齐方式
  labelClass?: string // 标签自定义类名，与 DescriptionsItem 的 labelClass 叠加
  contentClass?: string // 内容自定义类名，与 DescriptionsItem 的 contentClass 叠加
  labelStyle?: CSSProperties // 自定义标签样式，优先级低于 DescriptionsItem 的 labelStyle
  contentStyle?: CSSProperties // 自定义内容样式，优先级低于 DescriptionsItem 的 contentStyle
}
// 声明组件插槽类型
export interface DescriptionsSlots {
  default?: () => VNode[]
  header?: () => VNode[] // 自定义整个头部区域，存在时替代 title 与 extra
  title?: () => VNode[]
  extra?: () => VNode[]
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  extra: undefined,
  bordered: false,
  layout: 'horizontal',
  size: 'default',
  colon: true,
  column: () => ({ xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3, xxxl: 3 }),
  labelAlign: 'left',
  labelClass: undefined,
  contentClass: undefined,
  labelStyle: undefined,
  contentStyle: undefined
})
defineSlots<DescriptionsSlots>()
const slots = useSlots()
// 响应式断点
const MEDIA_QUERIES = {
  xxxl: '(min-width: 2000px)',
  xxl: '(min-width: 1600px)',
  xl: '(min-width: 1200px)',
  lg: '(min-width: 992px)',
  md: '(min-width: 768px)',
  sm: '(min-width: 576px)',
  xs: '(max-width: 575px)'
}
const DEFAULT_COLUMN = 3
const xxxlMatched = useMediaQuery(MEDIA_QUERIES.xxxl).match
const xxlMatched = useMediaQuery(MEDIA_QUERIES.xxl).match
const xlMatched = useMediaQuery(MEDIA_QUERIES.xl).match
const lgMatched = useMediaQuery(MEDIA_QUERIES.lg).match
const mdMatched = useMediaQuery(MEDIA_QUERIES.md).match
const smMatched = useMediaQuery(MEDIA_QUERIES.sm).match
const xsMatched = useMediaQuery(MEDIA_QUERIES.xs).match
const isMounted = useMounted()
// 归一化列数：非有限数或小于 1 时回退默认值，避免 colspan 出现 0 / NaN
function normalizeColumn(value: number): number {
  return Number.isFinite(value) && value >= 1 ? Math.floor(value) : DEFAULT_COLUMN
}
// 归一化 span：非有限数或小于 1 时按 1 处理
function normalizeSpan(value: number): number {
  return Number.isFinite(value) && value >= 1 ? Math.floor(value) : 1
}
const responsiveColumn = computed(() => {
  const column = props.column
  if (typeof column === 'number') {
    return normalizeColumn(column)
  }
  // 未挂载（含 SSR）时统一取默认列数，保证服务端与客户端首次渲染一致，避免 hydration 不一致
  if (!isMounted.value) {
    return DEFAULT_COLUMN
  }
  if (column.xxxl !== undefined && xxxlMatched.value) {
    return normalizeColumn(column.xxxl)
  }
  if (column.xxl !== undefined && xxlMatched.value) {
    return normalizeColumn(column.xxl)
  }
  if (column.xl !== undefined && xlMatched.value) {
    return normalizeColumn(column.xl)
  }
  if (column.lg !== undefined && lgMatched.value) {
    return normalizeColumn(column.lg)
  }
  if (column.md !== undefined && mdMatched.value) {
    return normalizeColumn(column.md)
  }
  if (column.sm !== undefined && smMatched.value) {
    return normalizeColumn(column.sm)
  }
  if (column.xs !== undefined && xsMatched.value) {
    return normalizeColumn(column.xs)
  }
  return DEFAULT_COLUMN
})
const slotsExist = useSlotsExist(['header', 'title', 'extra'])
const showHeader = computed(() => {
  return Boolean(slotsExist.header || slotsExist.title || slotsExist.extra || props.title || props.extra)
})
// 垂直布局：layout 为 'vertical' 时启用
const isVertical = computed(() => props.layout === 'vertical')
interface CellData {
  key: PropertyKey
  labelNodes: VNode[]
  contentNodes: VNode[]
  hasLabel: boolean
  rawSpan: number | undefined
  span: number
  labelStyle: CSSProperties
  contentStyle: CSSProperties
  labelClass: string | undefined
  contentClass: string | undefined
}
// 归一化任意插槽 / 属性返回值为 VNode 数组：
// 兼容字符串、数字、布尔、单个 VNode 与嵌套数组，保证后续一律按 VNode 处理
function toNodes(value: unknown): VNode[] {
  if (value === undefined || value === null || typeof value === 'boolean') {
    return []
  }
  if (Array.isArray(value)) {
    return value.reduce<VNode[]>((result, child) => result.concat(toNodes(child)), [])
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return [createTextVNode(String(value))]
  }
  return [value as VNode]
}
// VNode 的 children 有两类形态：插槽对象（模板编译产物）与普通子节点（手写渲染函数场景），
// 仅前者能按插槽名取用，故用 isVNode 将两者区分开
function isSlotObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }
  return !isVNode(value)
}
// 递归拍平 Fragment 与嵌套数组：兼容 v-for / template 包裹产生的子节点结构
function flattenChildren(children: unknown): VNode[] {
  const result: VNode[] = []
  toNodes(children).forEach((vnode) => {
    if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      result.push(...flattenChildren(vnode.children))
      return
    }
    result.push(vnode)
  })
  return result
}
// 判断一组 VNode 是否含可渲染内容（空数组 / 注释 / 空白文本视为无内容）：
// 用于「label 为空时不渲染标签与冒号」，判定口径与 useSlotsExist 的插槽探测保持一致
function hasRenderableContent(nodes: VNode[]): boolean {
  return nodes.some((node) => {
    if (node.type === Comment) {
      return false
    }
    if (Array.isArray(node.children) && node.children.length === 0) {
      return false
    }
    if (node.type === Text) {
      return typeof node.children === 'string' && node.children.trim() !== ''
    }
    return true
  })
}
// 从 default 插槽解析出单元格数据：只认 DescriptionsItem，其余节点开发态告警
const cells = computed<CellData[]>(() => {
  const childNodes = flattenChildren(slots.default?.())
  const itemNodes = childNodes.filter((node) => node.type === DescriptionsItem)
  if (import.meta.env.DEV && itemNodes.length !== childNodes.length) {
    console.warn('[vue-amazing-ui] Descriptions 仅支持 DescriptionsItem 作为子节点，其余节点已被忽略')
  }
  return itemNodes.map((node, index) => {
    const itemProps = (node.props ?? {}) as Record<string, unknown>
    const rawChildren = node.children
    const slotObject = isSlotObject(rawChildren) ? rawChildren : {}
    const labelSlot = slotObject.label
    const contentSlot = slotObject.default
    // 标签优先级：label 插槽 > label 属性
    const labelNodes: VNode[] =
      typeof labelSlot === 'function'
        ? toNodes((labelSlot as () => unknown)())
        : itemProps.label === undefined
          ? []
          : toNodes(itemProps.label)
    // 内容优先级：default 插槽 > 直接挂在组件上的子节点（手写渲染函数场景）
    const contentNodes: VNode[] =
      typeof contentSlot === 'function'
        ? toNodes((contentSlot as () => unknown)())
        : isSlotObject(rawChildren)
          ? []
          : toNodes(rawChildren)
    const rawSpan = typeof itemProps.span === 'number' ? itemProps.span : undefined
    return {
      key: node.key ?? index,
      labelNodes,
      contentNodes,
      hasLabel: hasRenderableContent(labelNodes),
      rawSpan,
      span: normalizeSpan(rawSpan ?? 1),
      // 样式与类名均为「组件级打底 + item 级覆盖」
      labelStyle: { ...props.labelStyle, ...(itemProps.labelStyle as CSSProperties | undefined) },
      contentStyle: { ...props.contentStyle, ...(itemProps.contentStyle as CSSProperties | undefined) },
      labelClass: itemProps.labelClass as string | undefined,
      contentClass: itemProps.contentClass as string | undefined
    }
  })
})
// 行末补满：未显式设置 span 或 span 超出本行剩余列数时，收缩为剩余列数
function fillSpan(cell: CellData, restCol: number): CellData {
  if (cell.rawSpan === undefined || cell.span > restCol) {
    if (import.meta.env.DEV && cell.rawSpan !== undefined && cell.span > restCol) {
      console.warn('[vue-amazing-ui] Descriptions 中同一行 span 之和超过 column，已自动收缩为剩余列数')
    }
    return { ...cell, span: restCol }
  }
  return cell
}
// 按 column 切行：span 累计达到 column 即换行；行末剩余列由该项补满
const rows = computed<CellData[][]>(() => {
  const column = responsiveColumn.value
  const list = cells.value
  if (!list.length) {
    return []
  }
  const result: CellData[][] = []
  let row: CellData[] = []
  let restCol = column
  list.forEach((cell, index) => {
    if (index === list.length - 1) {
      row.push(fillSpan(cell, restCol))
      result.push(row)
      return
    }
    if (cell.span < restCol) {
      restCol -= cell.span
      row.push(cell)
    } else {
      row.push(fillSpan(cell, restCol))
      result.push(row)
      row = []
      restCol = column
    }
  })
  return result
})
</script>
<template>
  <div class="descriptions-wrap" :class="`descriptions-${size}`">
    <div v-if="showHeader" class="descriptions-header">
      <slot name="header">
        <div class="descriptions-title">
          <slot name="title">
            <component v-if="isVNode(title)" :is="title" />
            <template v-else>{{ title }}</template>
          </slot>
        </div>
        <div class="descriptions-extra">
          <slot name="extra">
            <component v-if="isVNode(extra)" :is="extra" />
            <template v-else>{{ extra }}</template>
          </slot>
        </div>
      </slot>
    </div>
    <div class="descriptions-view" :class="{ 'descriptions-bordered': bordered }">
      <table>
        <tbody>
          <template v-for="(row, rowIndex) in rows" :key="rowIndex">
            <!-- 垂直布局：标签行 + 内容行 -->
            <template v-if="isVertical">
              <tr class="descriptions-row">
                <th
                  v-for="cell in row"
                  :key="cell.key"
                  class="descriptions-item-label"
                  :class="[
                    labelClass,
                    cell.labelClass,
                    `descriptions-label-align-${labelAlign}`,
                    { 'descriptions-item-no-colon': !colon }
                  ]"
                  :colspan="cell.span"
                  :style="cell.labelStyle"
                >
                  <component v-for="(child, childIndex) in cell.labelNodes" :key="childIndex" :is="child" />
                </th>
              </tr>
              <tr class="descriptions-row">
                <td
                  v-for="cell in row"
                  :key="cell.key"
                  class="descriptions-item-content"
                  :class="[contentClass, cell.contentClass]"
                  :colspan="cell.span"
                  :style="cell.contentStyle"
                >
                  <component v-for="(child, childIndex) in cell.contentNodes" :key="childIndex" :is="child" />
                </td>
              </tr>
            </template>
            <!-- 水平 + 边框：标签 / 内容成对 -->
            <tr v-else-if="bordered" class="descriptions-row">
              <template v-for="cell in row" :key="cell.key">
                <th
                  class="descriptions-item-label"
                  :class="[
                    labelClass,
                    cell.labelClass,
                    `descriptions-label-align-${labelAlign}`,
                    { 'descriptions-item-no-colon': !colon }
                  ]"
                  :style="cell.labelStyle"
                >
                  <component v-for="(child, childIndex) in cell.labelNodes" :key="childIndex" :is="child" />
                </th>
                <td
                  class="descriptions-item-content"
                  :class="[contentClass, cell.contentClass]"
                  :colspan="cell.span * 2 - 1"
                  :style="cell.contentStyle"
                >
                  <component v-for="(child, childIndex) in cell.contentNodes" :key="childIndex" :is="child" />
                </td>
              </template>
            </tr>
            <!-- 水平 + 无边框：单个单元格内含标签与内容 -->
            <tr v-else class="descriptions-row">
              <td v-for="cell in row" :key="cell.key" class="descriptions-item" :colspan="cell.span">
                <div class="descriptions-item-container">
                  <span
                    v-if="cell.hasLabel"
                    class="descriptions-item-label"
                    :class="[
                      labelClass,
                      cell.labelClass,
                      `descriptions-label-align-${labelAlign}`,
                      { 'descriptions-item-no-colon': !colon }
                    ]"
                    :style="cell.labelStyle"
                  >
                    <component v-for="(child, childIndex) in cell.labelNodes" :key="childIndex" :is="child" />
                  </span>
                  <span
                    class="descriptions-item-content"
                    :class="[contentClass, cell.contentClass]"
                    :style="cell.contentStyle"
                  >
                    <component v-for="(child, childIndex) in cell.contentNodes" :key="childIndex" :is="child" />
                  </span>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="less" scoped>
.descriptions-wrap {
  // 尺寸相关内边距用 CSS 变量承载，避免用 !important 覆盖基础规则
  --descriptions-item-padding-bottom: 16px;
  --descriptions-bordered-padding: 16px 24px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  &.descriptions-middle {
    --descriptions-item-padding-bottom: 12px;
    --descriptions-bordered-padding: 12px 24px;
  }
  &.descriptions-small {
    --descriptions-item-padding-bottom: 8px;
    --descriptions-bordered-padding: 8px 16px;
  }
  .descriptions-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .descriptions-title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex: auto;
      font-weight: 600;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.88);
      line-height: 1.5714285714285714;
    }
    .descriptions-extra {
      margin-left: auto;
      color: rgba(0, 0, 0, 0.88);
      font-size: 14px;
    }
  }
  // 行内单元格统一底部留白：只作用于 tr 的直接子级，
  // 避免命中无边框水平模式中 container 内的 span（那会与 td 的内边距叠加）
  .descriptions-row {
    border: none; // 可选
    background: transparent; // 可选
    > .descriptions-item,
    > .descriptions-item-label,
    > .descriptions-item-content {
      // 重置 vitepress 等外部环境对 th / td 的边框与背景入侵（.vp-doc th/td 默认带 1px 边框），
      // 保证无边框模式干净；带边框模式的 border-right 与标签底色在其后声明，优先级相同故会正常覆盖
      border: none;
      background: transparent;
      padding: 0 0 var(--descriptions-item-padding-bottom);
      vertical-align: top;
      // 尺寸（size）切换时内边距平滑过渡，避免 default / middle / small 之间生硬跳变
      transition: padding 0.3s;
    }
  }
  .descriptions-item-label {
    color: rgba(0, 0, 0, 0.88);
    font-weight: normal;
    font-size: 14px;
    line-height: 1.5714285714285714;
    &.descriptions-label-align-left {
      text-align: left;
    }
    &.descriptions-label-align-right {
      text-align: right;
    }
    &.descriptions-label-align-center {
      text-align: center;
    }
    &::after {
      content: ':';
      position: relative;
      top: -0.5px;
      margin-inline: 2px 8px;
    }
    // 关闭冒号时仅清空内容，保留标签后的间距，否则标签与内容会粘连在一起
    &.descriptions-item-no-colon::after {
      content: '';
    }
  }
  .descriptions-item-content {
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    word-break: break-word;
    overflow-wrap: break-word;
  }
  // 仅无边框水平模式的内容容器需要弹性布局，避免影响 th / td 的表格单元格语义
  .descriptions-item-container {
    display: flex;
    > .descriptions-item-label,
    > .descriptions-item-content {
      display: inline-flex;
      align-items: baseline;
    }
    > .descriptions-item-content {
      flex: 1;
    }
  }
  .descriptions-view {
    width: 100%;
    border-radius: 8px;
    table {
      width: 100%;
      table-layout: fixed;
      display: table; // 可选，只为兼容 vitepress 中 .vp-doc 的样式入侵，下同
      border-collapse: separate; // 可选
      margin: 0; // 可选
    }
  }
  .descriptions-bordered {
    border: 1px solid rgba(5, 5, 5, 0.06);
    table {
      table-layout: auto;
      border-collapse: collapse;
    }
    .descriptions-row {
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);
      &:last-child {
        border-bottom: none;
      }
    }
    .descriptions-item-label,
    .descriptions-item-content {
      // 简写内边距覆盖基础规则的 padding-bottom
      padding: var(--descriptions-bordered-padding);
      border-right: 1px solid rgba(5, 5, 5, 0.06);
      display: table-cell;
      // 边框模式下内容垂直居中，覆盖基础规则中为非边框模式设置的 top
      vertical-align: middle;
      &:last-child {
        border-right: none;
      }
    }
    .descriptions-item-label {
      font-weight: normal;
      background-color: rgba(0, 0, 0, 0.02);
      &::after {
        // 边框模式不显示冒号
        display: none;
      }
    }
  }
}
</style>
