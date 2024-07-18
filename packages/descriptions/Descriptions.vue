<script setup lang="ts">
import { useSlots, computed, nextTick, ref, watch, onMounted } from 'vue'
import type { CSSProperties, Slot } from 'vue'
import { throttle, useEventListener } from '../utils'
interface Responsive {
  xs?: number // <576px 响应式栅格
  sm?: number // ≥576px 响应式栅格
  md?: number // ≥768px 响应式栅格
  lg?: number // ≥992px 响应式栅格
  xl?: number // ≥1200px 响应式栅格
  xxl?: number // ≥1600px 响应式栅格
}
interface Props {
  title?: string | Slot // 描述列表的标题，显示在最顶部 string | slot
  extra?: string | Slot // 描述列表的操作区域，显示在右上方 string | slot
  bordered?: boolean // 是否展示边框
  vertical?: boolean // 是否使用垂直描述列表
  size?: 'default' | 'middle' | 'small' // 设置列表的大小
  column?: number | Responsive // 一行的 DescriptionItems 数量，可以写成数值或支持响应式的对象写法 { xs: 8, sm: 16, md: 24 }
  labelStyle?: CSSProperties // 自定义标签样式，优先级低于 DescriptionItems 的 labelStyle
  contentStyle?: CSSProperties // 自定义内容样式，优先级低于 DescriptionItems 的 contentStyle
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  extra: undefined,
  bordered: false,
  vertical: false,
  size: 'default',
  column: () => ({ xs: 1, sm: 2, md: 3 }),
  labelStyle: () => ({}),
  contentStyle: () => ({})
})
const defaultSlotsRef = ref() // 所有渲染的 DescriptionsItems 节点引用
const showDefaultSlots = ref(true) // 用于刷新 <slot></slot>
const children = ref<any[]>() // DescriptionsItems 节点
const cols = ref() // 放置 DescriptionsItems 节点的模板引用数组
const thCols = ref() // 放置垂直列表的 DescriptionsItems 节点的 th 模板引用数组
const tdCols = ref() // 放置垂直列表的 DescriptionsItems 节点的 td 模板引用数组
const rows = ref() // 放置 DescriptionsItems 节点的模板引用数组（带边框）
const thRows = ref() // 放置垂直列表的 DescriptionsItems 节点的 th 模板引用数组（带边框）
const tdRows = ref() // 放置垂直列表的 DescriptionsItems 节点的 td 模板引用数组（带边框）
const groupItems = ref<any[]>([]) // 处理后的 DescriptionsItems 节点数组
const clientWidth = ref(document.documentElement.clientWidth)
function getBrowserSize() {
  // document.documentElement返回<html>元素
  clientWidth.value = document.documentElement.clientWidth
}
const throttleEvent = throttle(getBrowserSize, 100)
useEventListener(window, 'resize', throttleEvent)
const slots = useSlots()
const showHeader = computed(() => {
  const titleSlots = slots.title?.()
  const extraSlots = slots.extra?.()
  let n = 0
  if (titleSlots && titleSlots[0].children?.length) {
    n++
  }
  if (extraSlots && extraSlots[0].children?.length) {
    n++
  }
  return Boolean(n) || props.title || props.extra
})
const responsiveColumn = computed(() => {
  if (typeof props.column === 'object') {
    if (clientWidth.value >= 1600 && props.column.xxl) {
      return props.column.xxl
    }
    if (clientWidth.value >= 1200 && props.column.xl) {
      return props.column.xl
    }
    if (clientWidth.value >= 992 && props.column.lg) {
      return props.column.lg
    }
    if (clientWidth.value >= 768 && props.column.md) {
      return props.column.md
    }
    if (clientWidth.value >= 576 && props.column.sm) {
      return props.column.sm
    }
    if (clientWidth.value < 576 && props.column.xs) {
      return props.column.xs
    }
    return 1
  }
  return props.column
})
watch(
  () => [props.bordered, props.vertical, responsiveColumn.value],
  () => {
    resetDefaultSlots()
  },
  {
    deep: true
  }
)
watch(
  () => [children.value, props.labelStyle, props.contentStyle],
  async () => {
    if (groupItems.value.length) {
      groupItems.value.splice(0) // 清空列表
      await nextTick()
    }
    // console.log('watch')
    if (children.value && children.value.length) {
      observer.disconnect()
      getGroupItems(children.value, responsiveColumn.value as number)
      await nextTick()
      observer.observe(defaultSlotsRef.value, options)
    }
  },
  {
    deep: true,
    flush: 'post'
  }
)
// 监听 defaultSlotsRef DOM 节点数量变化，重新渲染 Descriptions
const options = { childList: true, attributes: true, subtree: true, characterData: true }
const observer = new MutationObserver((MutationRecord: any) => {
  // console.log('mutation', MutationRecord)
  const mutation = MutationRecord.some((mutation: any) => mutation.type === 'childList')
  if (mutation) {
    resetDefaultSlots()
  }
})
onMounted(() => {
  getChildren()
  observer.observe(defaultSlotsRef.value, options)
})
async function resetDefaultSlots() {
  observer.disconnect()
  showDefaultSlots.value = false
  await nextTick()
  showDefaultSlots.value = true
  await nextTick()
  getChildren()
}
function getChildren() {
  children.value = Array.from(defaultSlotsRef.value.children).filter((element: any) => {
    return element.className === (props.bordered ? 'm-desc-item-bordered' : 'm-desc-item')
  })
}
// 计算当前 group 中所有 span 之和
function getTotalSpan(group: any): number {
  return group.reduce((accumulator: number, currentValue: any) => accumulator + currentValue.span, 0)
}
// 根据不同 cloumn 处理 DescriptionsItems 节点
async function getGroupItems(children: any, responsiveColumn: number) {
  const len = children.length
  let group: any[] = []
  for (let n = 0; n < len; n++) {
    const item = {
      span: Math.min(children[n].dataset.span ?? 1, responsiveColumn),
      element: children[n]
    }
    if (getTotalSpan(group) < responsiveColumn) {
      // 已有 items 的 totalSpan ＜ column
      item.span = Math.min(item.span, responsiveColumn - getTotalSpan(group))
      group.push(item)
    } else {
      groupItems.value.push(group)
      group = [item]
    }
  }
  // 当使用水平列表，且未设置 span 时等效于 span: 1，除了最后一行的最后一项，会将最后一行剩余的列数全部分配给该项
  if (!props.vertical && !children[len - 1].dataset.span && getTotalSpan(group) < responsiveColumn) {
    const groupLen = group.length
    group[groupLen - 1].span = group[groupLen - 1].span + responsiveColumn - getTotalSpan(group)
  }
  groupItems.value.push(group)
  await nextTick()
  if (props.bordered) {
    // 带边框列表
    groupItems.value.forEach((items: any, index: number) => {
      // 每一行 tr
      items.forEach((item: any) => {
        const itemChildren: any[] = Array.from(item.element.children)
        // 创建节点副本，否则原节点将先被移除，后插入到新位置，影响后续响应式布局计算
        const th = itemChildren[0]
        // 动态添加节点样式
        setStyle(th, { ...props.labelStyle, ...JSON.parse(item.element.dataset.labelStyle) })
        const td = itemChildren[1]
        // 动态添加节点样式
        setStyle(td, { ...props.contentStyle, ...JSON.parse(item.element.dataset.contentStyle) })
        // 插入节点到指定位置
        if (props.vertical) {
          // 垂直列表
          th.colSpan = item.span
          td.colSpan = item.span
          thRows.value[index].appendChild(th)
          tdRows.value[index].appendChild(td)
        } else {
          th.colSpan = 1
          td.colSpan = item.span * 2 - 1
          rows.value[index].appendChild(th)
          rows.value[index].appendChild(td)
        }
      })
    })
  } else {
    children.forEach((element: any, index: number) => {
      const elementChildren: any[] = Array.from(element.children)
      const label = elementChildren[0]
      // 动态添加节点样式
      setStyle(label, { ...props.labelStyle, ...JSON.parse(element.dataset.labelStyle) })
      const content = elementChildren[1]
      // 动态添加节点样式
      setStyle(content, { ...props.contentStyle, ...JSON.parse(element.dataset.contentStyle) })
      // 插入节点到指定位置
      if (props.vertical) {
        // 垂直列表
        thCols.value[index].appendChild(element.firstChild)
        tdCols.value[index].appendChild(element.lastChild)
      } else {
        cols.value[index].appendChild(element)
      }
    })
  }
}
// 为元素添加内联样式
function setStyle(element: any, styles: any) {
  if (JSON.stringify(styles) !== '{}') {
    Object.keys(styles).forEach((key: string) => {
      element.style[key] = styles[key]
    })
  }
}
</script>
<template>
  <div class="m-desc" :class="`desc-${size}`">
    <div class="m-desc-header" v-if="showHeader">
      <div class="u-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="u-extra">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>
    <div ref="defaultSlotsRef" v-show="false">
      <slot v-if="showDefaultSlots"></slot>
    </div>
    <div v-if="!vertical" class="m-desc-view" :class="{ 'm-bordered': bordered }">
      <table>
        <tbody v-if="!bordered">
          <tr v-for="(items, row) in groupItems" :key="row">
            <td ref="cols" class="u-item-td" :colspan="item.span" v-for="(item, col) in items" :key="col"></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr ref="rows" class="tr-bordered" v-for="row of groupItems.length" :key="row"></tr>
        </tbody>
      </table>
    </div>
    <div v-else class="m-desc-view" :class="{ 'm-bordered': bordered }">
      <table>
        <tbody v-if="!bordered">
          <template v-for="(items, row) in groupItems" :key="row">
            <tr>
              <th class="u-item-th" :colspan="item.span" v-for="(item, col) in items" :key="col">
                <div ref="thCols" class="m-desc-item"></div>
              </th>
            </tr>
            <tr>
              <td class="u-item-td" :colspan="item.span" v-for="(item, col) in items" :key="col">
                <div ref="tdCols" class="m-desc-item"></div>
              </td>
            </tr>
          </template>
        </tbody>
        <tbody v-else>
          <template v-for="row in groupItems.length" :key="row">
            <tr ref="thRows" class="tr-bordered"></tr>
            <tr ref="tdRows" class="tr-bordered"></tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  .m-desc-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .u-title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex: auto;
      font-weight: 600;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.88);
      line-height: 1.5714285714285714;
    }
    .u-extra {
      margin-inline-start: auto;
      color: rgba(0, 0, 0, 0.88);
      font-size: 14px;
    }
  }
  .m-desc-view {
    width: 100%;
    border-radius: 8px;
    table {
      width: 100%;
      table-layout: fixed;
      display: table; // 可选，只为兼容 vitepress 中 .vp-doc 的样式入侵，下同
      border-collapse: separate; // 可选
      margin: 0; // 可选
      tr {
        // 可选
        border: none;
        background: transparent;
      }
      .u-item-th {
        padding: 0; // 可选
        border: none; // 可选
        padding-bottom: 16px;
        vertical-align: top;
        background: transparent; // 可选
      }
      .u-item-td {
        padding: 0; // 可选
        border: none; // 可选
        padding-bottom: 16px;
        vertical-align: top;
      }
      .m-desc-item {
        display: flex;
      }
    }
  }
  .m-bordered {
    border: 1px solid rgba(5, 5, 5, 0.06);
    table {
      table-layout: auto;
      border-collapse: collapse;
      display: table; // 可选
      margin: 0; // 可选
      .tr-bordered {
        border-bottom: 1px solid rgba(5, 5, 5, 0.06);
        &:last-child {
          border-bottom: none;
        }
        :deep(.u-label-th) {
          border: none; // 可选
          color: rgba(0, 0, 0, 0.88);
          font-weight: normal;
          font-size: 14px;
          line-height: 1.5714285714285714;
          text-align: start;
          background-color: rgba(0, 0, 0, 0.02);
          padding: 16px 24px;
          border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
          &:last-child {
            // 消除 vertical 列表最后一个 th 的边框
            border-inline-end: none;
          }
        }
        :deep(.u-content-td) {
          border: none; // 可选
          display: table-cell;
          flex: 1;
          padding: 16px 24px;
          border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
          color: rgba(0, 0, 0, 0.88);
          font-size: 14px;
          line-height: 1.5714285714285714;
          word-break: break-word;
          overflow-wrap: break-word;
          &:last-child {
            border-inline-end: none;
          }
        }
      }
    }
  }
}
.desc-middle {
  .m-desc-view {
    .u-item-td {
      padding-bottom: 12px !important;
    }
  }
  .m-bordered {
    :deep(.u-label-th) {
      padding: 12px 24px !important;
    }
    :deep(.u-content-td) {
      padding: 12px 24px !important;
    }
  }
}
.desc-small {
  .m-desc-view {
    .u-item-td {
      padding-bottom: 8px !important;
    }
  }
  .m-bordered {
    :deep(.u-label-th) {
      padding: 8px 16px !important;
    }
    :deep(.u-content-td) {
      padding: 8px 16px !important;
    }
  }
}
</style>
