<script setup lang="ts">
import { computed, nextTick, ref, watch, onMounted } from 'vue'
import type { CSSProperties } from 'vue'
import { throttle, useEventListener, useMutationObserver, useSlotsExist } from '../utils'
interface Responsive {
  xs?: number // <576px 响应式栅格
  sm?: number // ≥576px 响应式栅格
  md?: number // ≥768px 响应式栅格
  lg?: number // ≥992px 响应式栅格
  xl?: number // ≥1200px 响应式栅格
  xxl?: number // ≥1600px 响应式栅格
}
interface Props {
  title?: string // 描述列表的标题，显示在最顶部 string | slot
  extra?: string // 描述列表的操作区域，显示在右上方 string | slot
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
const defaultSlots = ref(true) // 用于刷新 <slot></slot>
const observer = ref() // defaultSlotsRef 监听器
const stopObservation = ref(true) // 停止观察器
const children = ref<any[]>() // DescriptionsItems 节点
const tdCols = ref() // 放置 DescriptionsItems 节点的模板引用数组
const thVerticalCols = ref() // 放置垂直列表的 DescriptionsItems 节点的 th 模板引用数组
const tdVerticalCols = ref() // 放置垂直列表的 DescriptionsItems 节点的 td 模板引用数组
const trBorderedRows = ref() // 放置 DescriptionsItems 节点的模板引用数组（带边框）
const thVerticalBorderedRows = ref() // 放置垂直列表的 DescriptionsItems 节点的 th 模板引用数组（带边框）
const tdVerticalBorderedRows = ref() // 放置垂直列表的 DescriptionsItems 节点的 td 模板引用数组（带边框）
const groupItems = ref<any[]>([]) // 处理后的 DescriptionsItems 节点数组
const viewportWidth = ref(window.innerWidth)
function getViewportWidth() {
  viewportWidth.value = window.innerWidth
}
const throttleEvent = throttle(getViewportWidth, 100)
useEventListener(window, 'resize', throttleEvent)
const slotsExist = useSlotsExist(['title', 'extra'])
const showHeader = computed(() => {
  return slotsExist.title || slotsExist.extra || props.title || props.extra
})
const responsiveColumn = computed(() => {
  if (typeof props.column === 'object') {
    if (viewportWidth.value >= 1600 && props.column.xxl) {
      return props.column.xxl
    }
    if (viewportWidth.value >= 1200 && props.column.xl) {
      return props.column.xl
    }
    if (viewportWidth.value >= 992 && props.column.lg) {
      return props.column.lg
    }
    if (viewportWidth.value >= 768 && props.column.md) {
      return props.column.md
    }
    if (viewportWidth.value >= 576 && props.column.sm) {
      return props.column.sm
    }
    if (viewportWidth.value < 576 && props.column.xs) {
      return props.column.xs
    }
    return 1
  }
  return props.column
})
watch(
  () => [props.bordered, props.vertical, responsiveColumn.value, props.labelStyle, props.contentStyle],
  () => {
    if (!stopObservation.value) {
      stopObservation.value = true
    }
    refreshDefaultSlots()
  },
  {
    deep: true
  }
)
// 监听 defaultSlotsRef DOM 节点数量变化，重新渲染 Descriptions
observer.value = useMutationObserver(
  defaultSlotsRef,
  (MutationRecord: MutationRecord[]) => {
    if (!stopObservation.value) {
      stopObservation.value = true
      const mutation = MutationRecord.some((mutation: any) => mutation.type === 'childList')
      if (mutation) {
        refreshDefaultSlots()
      }
    }
  },
  { childList: true, attributes: true, subtree: true }
)
onMounted(() => {
  getGroupItems()
})
async function refreshDefaultSlots() {
  defaultSlots.value = !defaultSlots.value
  await nextTick()
  getGroupItems()
}
// 计算当前 group 中所有 span 之和
function getTotalSpan(group: any): number {
  return group.reduce((accumulator: number, currentValue: any) => accumulator + currentValue.span, 0)
}
// 根据不同 cloumn 处理 DescriptionsItems 节点
async function getGroupItems() {
  children.value = Array.from(defaultSlotsRef.value.children).filter((element: any) => {
    return element.className === (props.bordered ? 'descriptions-item-bordered' : 'descriptions-item')
  })
  if (groupItems.value.length) {
    groupItems.value.splice(0) // 清空列表
    await nextTick()
  }
  if (children.value && children.value.length) {
    const len = children.value.length
    let group: any[] = []
    for (let n = 0; n < len; n++) {
      const item = {
        span: Math.min(children.value[n].dataset.span ?? 1, responsiveColumn.value),
        element: children.value[n]
      }
      if (getTotalSpan(group) < responsiveColumn.value) {
        // 已有 items 的 totalSpan ＜ column
        item.span = Math.min(item.span, responsiveColumn.value - getTotalSpan(group))
        group.push(item)
      } else {
        groupItems.value.push(group)
        group = [item]
      }
    }
    // 当使用水平列表且未设置 span 时等效于 span: 1，但最后一行的最后一项，会包含该行剩余的所有列数
    if (!props.vertical && !children.value[len - 1].dataset.span && getTotalSpan(group) < responsiveColumn.value) {
      const groupLen = group.length
      group[groupLen - 1].span = group[groupLen - 1].span + responsiveColumn.value - getTotalSpan(group)
    }
    groupItems.value.push(group)
    await nextTick()
    updateDescriptions()
  } else {
    stopObservation.value = false
  }
}
async function updateDescriptions() {
  if (props.bordered) {
    // 带边框列表
    groupItems.value.forEach((items: any, index: number) => {
      // 每一行 tr
      items.forEach((item: any) => {
        const itemChildren: any[] = Array.from(item.element.children)
        // 创建节点副本，否则原节点将先被移除，后插入到新位置，影响后续响应式布局计算
        const th = itemChildren[0]
        // 动态添加节点样式
        setStyle(th, props.labelStyle)
        const td = itemChildren[1]
        // 动态添加节点样式
        setStyle(td, props.contentStyle)
        // 插入节点到指定位置
        if (props.vertical) {
          // 垂直列表
          th.colSpan = item.span
          td.colSpan = item.span
          thVerticalBorderedRows.value[index].appendChild(th)
          tdVerticalBorderedRows.value[index].appendChild(td)
        } else {
          th.colSpan = 1
          td.colSpan = item.span * 2 - 1
          trBorderedRows.value[index].appendChild(th)
          trBorderedRows.value[index].appendChild(td)
        }
      })
    })
  } else {
    ;(children.value as any[]).forEach((element: any, index: number) => {
      const elementChildren: any[] = Array.from(element.children)
      const label = elementChildren[0]
      // 动态添加节点样式
      setStyle(label, props.labelStyle)
      const content = elementChildren[1]
      // 动态添加节点样式
      setStyle(content, props.contentStyle)
      // 插入节点到指定位置
      if (props.vertical) {
        // 垂直列表
        thVerticalCols.value[index].appendChild(element.firstChild)
        tdVerticalCols.value[index].appendChild(element.lastChild)
      } else {
        tdCols.value[index].appendChild(element)
      }
    })
  }
  await nextTick()
  stopObservation.value = false
}
// 为元素添加内联样式
function setStyle(element: any, styles: any) {
  if (JSON.stringify(styles) !== '{}') {
    Object.keys(styles).forEach((key: string) => {
      if (!element.style[key]) {
        element.style[key] = styles[key]
      }
    })
  }
}
</script>
<template>
  <div class="m-descriptions" :class="`descriptions-${size}`">
    <div class="m-descriptions-header" v-if="showHeader">
      <div class="descriptions-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="descriptions-extra">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>
    <div v-if="!vertical" class="m-descriptions-view" :class="{ 'descriptions-bordered': bordered }">
      <table>
        <tbody v-if="!bordered">
          <tr v-for="(items, row) in groupItems" :key="row">
            <td
              ref="tdCols"
              class="descriptions-item-td"
              :colspan="item.span"
              v-for="(item, col) in items"
              :key="col"
            ></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr ref="trBorderedRows" class="descriptions-bordered-tr" v-for="row of groupItems.length" :key="row"></tr>
        </tbody>
      </table>
    </div>
    <div v-else class="m-descriptions-view" :class="{ 'descriptions-bordered': bordered }">
      <table>
        <tbody v-if="!bordered">
          <template v-for="(items, row) in groupItems" :key="row">
            <tr>
              <th class="descriptions-item-th" :colspan="item.span" v-for="(item, col) in items" :key="col">
                <div ref="thVerticalCols" class="descriptions-item"></div>
              </th>
            </tr>
            <tr>
              <td class="descriptions-item-td" :colspan="item.span" v-for="(item, col) in items" :key="col">
                <div ref="tdVerticalCols" class="descriptions-item"></div>
              </td>
            </tr>
          </template>
        </tbody>
        <tbody v-else>
          <template v-for="row in groupItems.length" :key="row">
            <tr ref="thVerticalBorderedRows" class="descriptions-bordered-tr"></tr>
            <tr ref="tdVerticalBorderedRows" class="descriptions-bordered-tr"></tr>
          </template>
        </tbody>
      </table>
    </div>
    <div ref="defaultSlotsRef" v-show="false">
      <slot v-if="defaultSlots"></slot>
      <slot v-else></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-descriptions {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  .m-descriptions-header {
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
      margin-inline-start: auto;
      color: rgba(0, 0, 0, 0.88);
      font-size: 14px;
    }
  }
  .m-descriptions-view {
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
      .descriptions-item-th {
        padding: 0; // 可选
        border: none; // 可选
        padding-bottom: 16px;
        vertical-align: top;
        background: transparent; // 可选
      }
      .descriptions-item-td {
        padding: 0; // 可选
        border: none; // 可选
        padding-bottom: 16px;
        vertical-align: top;
      }
      .descriptions-item {
        display: flex;
      }
    }
  }
  .descriptions-bordered {
    border: 1px solid rgba(5, 5, 5, 0.06);
    table {
      table-layout: auto;
      border-collapse: collapse;
      display: table; // 可选
      margin: 0; // 可选
      .descriptions-bordered-tr {
        border-bottom: 1px solid rgba(5, 5, 5, 0.06);
        &:last-child {
          border-bottom: none;
        }
        :deep(.descriptions-label-th) {
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
        :deep(.descriptions-content-td) {
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
.descriptions-middle {
  .m-descriptions-view {
    .descriptions-item-td {
      padding-bottom: 12px !important;
    }
  }
  .descriptions-bordered {
    :deep(.descriptions-label-th) {
      padding: 12px 24px !important;
    }
    :deep(.descriptions-content-td) {
      padding: 12px 24px !important;
    }
  }
}
.descriptions-small {
  .m-descriptions-view {
    .descriptions-item-td {
      padding-bottom: 8px !important;
    }
  }
  .descriptions-bordered {
    :deep(.descriptions-label-th) {
      padding: 8px 16px !important;
    }
    :deep(.descriptions-content-td) {
      padding: 8px 16px !important;
    }
  }
}
</style>
