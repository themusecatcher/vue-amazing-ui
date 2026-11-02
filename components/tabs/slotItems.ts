import { Fragment, isVNode } from 'vue'
import type { VNode } from 'vue'

/**
 * default 插槽 → 页签内核模型
 *
 * 组件式写法（`TabPane`）只承载配置描述、自身不产出 DOM，本模块把插槽里的 vnode 读回为页签模型，
 * 导航栏、指示条与面板容器继而由 `Tabs` 按同一份模型渲染 —— 页签顺序、key 兜底与插槽内容求值
 * 口径因此只有一处。
 */

/** 静态标记：`TabPane` 挂在自身 `vnode.type` 上的识别字段（静态标记约定，同 `MenuItem`） */
interface TabPaneMarker {
  isTabPane?: boolean
}

/** 面板内容的渲染口径：非激活时立即卸载 | 保留 | 首次激活后保留 */
export type TabsDisplayDirective = 'if' | 'show' | 'show:lazy'

/**
 * 页签内核模型
 *
 * `tab` 与 `tabSlot` 并存时以插槽为准（项目统一约定：插槽优先于 prop）。
 */
export interface TabsPane {
  key: string | number // 对应 activeKey；未写 key 时按下标兜底
  tab?: string // 页签显示文字
  tabSlot?: () => VNode[] // 自定义页签内容（图标 + 文字等富内容）
  contentSlot?: () => VNode[] // 标签页内容
  disabled: boolean // 是否禁用页签
  closable: boolean // 是否展示关闭按钮
  displayDirective?: TabsDisplayDirective // 面板内容渲染口径，未设置时由组件级 destroyInactiveTabPane 兜底
}

/** vnode.key 归一为 string | number（symbol / null 视为未设置） */
function getVNodeKey(vnode: VNode): string | number | undefined {
  const { key } = vnode
  return typeof key === 'string' || typeof key === 'number' ? key : undefined
}

/** 插槽返回值归一为数组：数组原样、单节点包成数组、空值转空数组 */
function toSlotChildren(result: unknown): unknown[] {
  if (Array.isArray(result)) {
    return result
  }
  if (result === undefined || result === null) {
    return []
  }
  return [result]
}

/** 布尔属性归一：静态属性书写时编译为空串（`<TabPane disabled />`），与 Vue 的 Boolean 属性转换口径一致 */
function readBoolean(value: unknown): boolean {
  return value === '' || Boolean(value)
}

const DISPLAY_DIRECTIVES: TabsDisplayDirective[] = ['if', 'show', 'show:lazy']

/** 渲染口径归一：非法值视为未设置，交回组件级兜底 */
function readDisplayDirective(value: unknown): TabsDisplayDirective | undefined {
  return DISPLAY_DIRECTIVES.includes(value as TabsDisplayDirective) ? (value as TabsDisplayDirective) : undefined
}

/**
 * 递归收集页签
 *
 * `v-for` / `v-if` 产生的 Fragment 展开后继续，其余非 `TabPane` 节点忽略；`key` 取 vnode.key，
 * 缺省时按「已收集数量」兜底 —— 下标口径跨 Fragment 连续，与旧的配置式下标记法同序。
 */
function collectTabPanes(nodes: unknown[], panes: TabsPane[]): void {
  nodes.forEach((node) => {
    if (!isVNode(node)) {
      return
    }
    if (node.type === Fragment) {
      collectTabPanes(toSlotChildren(node.children), panes)
      return
    }
    if (!(node.type as TabPaneMarker | null)?.isTabPane) {
      return
    }
    // 组件 vnode 的属性即传入的 props；插槽内容位于 children（对象形态）
    const slotProps = (node.props ?? {}) as Record<string, unknown>
    const slotFns = node.children as Record<string, (() => VNode[]) | undefined> | null
    panes.push({
      key: getVNodeKey(node) ?? panes.length,
      tab: slotProps.tab as string | undefined,
      tabSlot: slotFns?.tab,
      contentSlot: slotFns?.default,
      disabled: readBoolean(slotProps.disabled),
      closable: readBoolean(slotProps.closable),
      // 模板里写 `display-directive` 时 vnode.props 保留连字符形式，须与 camelCase 一并读取
      displayDirective: readDisplayDirective(slotProps.displayDirective ?? slotProps['display-directive'])
    })
  })
}

/** 解析 default 插槽的 vnode 为页签模型 */
export function parseTabPanes(nodes: unknown[]): TabsPane[] {
  const panes: TabsPane[] = []
  collectTabPanes(nodes, panes)
  return panes
}
