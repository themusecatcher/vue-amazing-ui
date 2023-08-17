<script setup lang="ts">
import { onMounted, onUnmounted, computed, nextTick, ref, watch, watchEffect } from 'vue'
import type { CSSProperties } from 'vue'
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
  bordered?: boolean // 是否展示边框
  column?: number|Responsive // 一行的 DescriptionItems 数量，可以写成数值或支持响应式的对象写法 { xs: 8, sm: 16, md: 24}
  extra?: string // 描述列表的操作区域，显示在右上方 string | slot
  size?: 'default'|'middle'|'small' // 设置列表的大小
  labelStyle?: CSSProperties // 自定义标签样式，优先级低于 DescriptionItems
  contentStyle?: CSSProperties // 自定义内容样式，优先级低于 DescriptionItems
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  bordered: false,
  column: () => ({xs: 1, sm: 2, md: 3}),
  extra: '',
  size: 'default',
  labelStyle: () => ({}),
  contentStyle: () => ({})
})
const clientWidth = ref(document.documentElement.clientWidth)
onMounted(() => {
  window.addEventListener('resize', getBrowserSize)
})
onUnmounted(() => {
  window.removeEventListener('resize', getBrowserSize)
})
function getBrowserSize () {
  // document.documentElement返回<html>元素
  clientWidth.value = document.documentElement.clientWidth
}
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
const view = ref()
const children = ref<any[]>() // DescriptionsItems 节点
const cols = ref() // 放置 DescriptionsItems 节点的模板引用数组
const rows = ref() // 放置 DescriptionsItems 节点的模板引用数组（带边框）
const groupItems = ref<any[]>([]) // 处理后的 DescriptionsItems 节点数组
const groupRows = computed(() => {
  return groupItems.value.length
})
watchEffect(() => {
  if (props.bordered) {
    children.value = Array.from(view.value.children).filter((element: any) => element.className === 'm-desc-item-bordered')
  } else {
    children.value = Array.from(view.value.children).filter((element: any) => element.className === 'm-desc-item')
  }
}, {flush: 'post'})
watch(children, (to) => {
  groupItems.value = []
  nextTick(() => {
    getGroupItems(to, responsiveColumn.value as number)
  })
})
watch(responsiveColumn, (to) => {
  groupItems.value = []
  nextTick(() => {
    getGroupItems(children.value, to as number)
  })
})
// 根据不同 cloumn 处理 DescriptionsItems 节点
function getGroupItems (children: any, responsiveColumn: number) {
  const len = children.length
  let group: any[] = []
  for (let n = 0; n < len; n++) {
    const item = {
      span: Math.min(children[n].dataset.span, responsiveColumn),
      element: children[n]
    }
    if (getTotalSpan(group) < responsiveColumn) { // 已有 items 的 totalSpan ＜ column
      item.span = Math.min(item.span, responsiveColumn - getTotalSpan(group))
      if (n === len - 1) { // 最后一个
        item.span = responsiveColumn - getTotalSpan(group)
      }
      group.push(item)
      if (n === len - 1) {
        groupItems.value.push(group)
      }
    } else {
      groupItems.value.push(group)
      group = [item]
      if (n === len - 1) { // 最后一个
        item.span = responsiveColumn
        groupItems.value.push(group)
      }
    }
  }
  if (props.bordered) { // 带边框
    nextTick(() => {
      groupItems.value.forEach((items: any, index: number) => {
        // 每一行 tr
        items.forEach((item: any) => {
          const itemChildren: any[] = Array.from(item.element.children)
          // 创建节点副本，否则原节点将先被移除，后插入到新位置，影响后续响应式布局计算
          const th = itemChildren[0].cloneNode(true)
          th.colSpan = 1
          // 动态添加节点样式
          setStyle(th, props.labelStyle)
          setStyle(th, JSON.parse(item.element.dataset.labelStyle))
          const td = itemChildren[1].cloneNode(true)
          td.colSpan = item.span * 2 - 1
          // 动态添加节点样式
          setStyle(td, props.contentStyle)
          setStyle(td, JSON.parse(item.element.dataset.contentStyle))
          // 插入节点到指定位置
          rows.value[index].appendChild(th)
          rows.value[index].appendChild(td)
        })
      })
    })
  } else {
    nextTick(() => {
      children.forEach((element: any, index: number) => {
        const elementChildren: any[] = Array.from(element.children)
        const label = elementChildren[0]
        // 动态添加节点样式
        setStyle(label, props.labelStyle)
        setStyle(label, JSON.parse(element.dataset.labelStyle))
        const content = elementChildren[1]
        // 动态添加节点样式
        setStyle(content, props.contentStyle)
        setStyle(content, JSON.parse(element.dataset.contentStyle))
        // 插入节点到指定位置
        cols.value[index].appendChild(element)
      })
    })
  }
}
// 计算当前 group 中所有 span 之和
function getTotalSpan (group: any): number {
  return group.reduce((accumulator: number, currentValue: any) => accumulator + currentValue.span, 0)
}
// 为元素添加内联样式
function setStyle(element: any, style: any) {
  if (JSON.stringify(style) !== "{}") {
    Object.keys(style).forEach(key => {
      element.style[key] = style[key]
    })
  }
}
</script>
<template>
  <div class="m-desc" :class="`desc-${size}`">
    <div class="m-header">
      <div class="u-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="u-extra">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>
    <div ref="view" v-show="false">
      <slot></slot>
    </div>
    <div class="m-desc-view" :class="{'m-bordered': bordered}">
      <table>
        <tbody v-if="!bordered">
          <tr v-for="(items, row) in groupItems" :key="row">
            <td
              ref="cols"
              class="u-item-td"
              :colspan="item.span"
              v-for="(item, col) in items" :key="col">
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <template v-if="groupRows">
            <tr
              ref="rows"
              class="tr-bordered"
              v-for="row of groupRows" :key="row">
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-desc {
  font-size: 14px;
  color: rgba(0, 0, 0, .88);
  line-height: 1.5714285714285714;
  .m-header {
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
      color: rgba(0, 0, 0, .88);
      line-height: 1.5714285714285714;
    }
    .u-extra {
      margin-inline-start: auto;
      color: rgba(0, 0, 0, .88);
      font-size: 14px;
    }
  }
  .m-desc-view {
    width: 100%;
    border-radius: 8px;
    table {
      width: 100%;
      table-layout: fixed;
      display: table; // 可选，只为兼容 vitepress 总 .vp-doc 的样式入侵，下同
      border-collapse: separate; // 可选
      margin: 0; // 可选
      tr { // 可选
        border: none;
        background: transparent;
      }
      .u-item-td {
        padding: 0; // 可选
        border: none; // 可选
        padding-bottom: 16px;
        vertical-align: top;
      }
    }
  }
  .m-bordered {
    border: 1px solid rgba(5, 5, 5, .06);
    table {
      table-layout: auto;
      border-collapse: collapse;
      display: table; // 可选
      margin: 0; // 可选
      .tr-bordered {
        border-bottom: 1px solid rgba(5, 5, 5, .06);
        &:last-child {
          border-bottom: none;
        }
        :deep(.u-label-th) {
          border: none; // 可选
          color: rgba(0, 0, 0, .88);
          font-weight: normal;
          font-size: 14px;
          line-height: 1.5714285714285714;
          text-align: start;
          background-color: rgba(0, 0, 0, .02);
          padding: 16px 24px;
          border-inline-end: 1px solid rgba(5, 5, 5, .06);
        }
        :deep(.u-content-td) {
          border: none; // 可选
          display: table-cell;
          flex: 1;
          padding: 16px 24px;
          border-inline-end: 1px solid rgba(5, 5, 5, .06);
          color: rgba(0, 0, 0, .88);
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
