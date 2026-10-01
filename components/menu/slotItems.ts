import { Fragment, Text, isVNode } from 'vue'
import type { VNode } from 'vue'
import type { ItemType, MenuItemType, MenuKey, MenuNode, MenuTheme, MenuTitleInfo } from './interface'

/**
 * default 插槽 → 菜单配置树
 *
 * 组件式写法（`MenuItem` / `MenuSubMenu` / `MenuItemGroup` / `MenuDivider`）只承载配置描述、自身不产出 DOM，
 * 本模块把插槽里的 vnode 读回为与 `items` 同构的配置树，继而交给同一套渲染内核 —— 两条数据源因此
 * 共用模式 / 主题 / 选中 / 展开 / 溢出等全部逻辑，不存在第二套渲染路径。
 */

/** 子组件挂在自身 `vnode.type` 上的静态标记（静态标记约定，同 `SelectOption`） */
interface MenuMarker {
  isMenuItem?: boolean
  isMenuSubMenu?: boolean
  isMenuItemGroup?: boolean
  isMenuDivider?: boolean
}

/** 标记组件的种类 */
type MarkerKind = 'item' | 'subMenu' | 'itemGroup' | 'divider'

/**
 * 识别标记组件
 *
 * 以静态标记而非组件引用比较：同一组件经不同入口取得时引用未必相同，标记则恒定。
 * 判定顺序与渲染内核一致 —— 分割线 / 分组先于子菜单与菜单项。非标记节点（普通元素 / 文本）返回 null。
 */
function getMarkerKind(vnode: VNode): MarkerKind | null {
  const type = vnode.type as MenuMarker | null
  if (!type) {
    return null
  }
  if (type.isMenuDivider) {
    return 'divider'
  }
  if (type.isMenuItemGroup) {
    return 'itemGroup'
  }
  if (type.isMenuSubMenu) {
    return 'subMenu'
  }
  if (type.isMenuItem) {
    return 'item'
  }
  return null
}

/** vnode.key 归一为 string | number（symbol / null 视为未设置） */
function getVNodeKey(vnode: VNode): MenuKey | undefined {
  const { key } = vnode
  return typeof key === 'string' || typeof key === 'number' ? key : undefined
}

/** 插槽返回值归一为数组：数组原样、单节点 / 文本包成数组、空值转空数组 */
function toSlotChildren(result: unknown): unknown[] {
  if (Array.isArray(result)) {
    return result
  }
  if (result === undefined || result === null) {
    return []
  }
  return [result]
}

/** 节点是否为纯文本：模板里直接书写的文本会被编译成 Text vnode，`h()` 形态则是字符串 / 数字 */
function isPlainTextNode(node: unknown): boolean {
  if (typeof node === 'string' || typeof node === 'number') {
    return true
  }
  return isVNode(node) && node.type === Text
}

/** 取纯文本节点的文本内容 */
function plainTextOf(node: unknown): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }
  const children = (node as VNode).children
  return typeof children === 'string' ? children : String(children ?? '')
}

/** 布尔属性归一：静态属性书写时编译为空串（`<MenuItem disabled />`），与 Vue 的 Boolean 属性转换口径一致 */
function readBoolean(value: unknown): boolean {
  return value === '' || Boolean(value)
}

/**
 * 插槽内容 → 标题内容
 *
 * 纯文本内容归一为字符串：收起态的首字兜底与悬浮标题的原生 `title` 属性都依赖字符串形态；
 * 含节点（图标 + 文本等富内容）时保留插槽函数，交由内核按渲染函数求值，内容不丢失。
 */
function resolveSlotContent(slotFn: (() => VNode[]) | undefined): MenuNode | undefined {
  if (!slotFn) {
    return undefined
  }
  const nodes = toSlotChildren(slotFn())
  if (!nodes.length) {
    return undefined
  }
  return nodes.every((node) => isPlainTextNode(node)) ? nodes.map((node) => plainTextOf(node)).join('') : slotFn
}

/** 标题取值：插槽优先于属性（项目统一约定：插槽优先于 prop） */
function resolveContent(slotFn: (() => VNode[]) | undefined, prop: unknown): MenuNode | undefined {
  return slotFn ? resolveSlotContent(slotFn) : (prop as MenuNode | undefined)
}

/**
 * 解析 default 插槽的 vnode 为菜单配置树
 *
 * `v-for` / `v-if` 产生的 Fragment 展开后继续；其余非标记节点忽略。配置的 `key` 取 vnode.key，
 * 缺省时按下标兜底（与配置式的 key 兜底同名同序）。
 */
export function parseSlotItems(nodes: unknown[]): ItemType[] {
  const items: ItemType[] = []
  nodes.forEach((node) => {
    // 纯文本 / 注释节点与普通元素都不是菜单配置载体，直接忽略
    if (!isVNode(node)) {
      return
    }
    const vnode = node
    if (vnode.type === Fragment) {
      items.push(...parseSlotItems(toSlotChildren(vnode.children)))
      return
    }
    const kind = getMarkerKind(vnode)
    if (!kind) {
      return
    }
    // 组件 vnode 的属性即传入的 props；插槽内容位于 children（对象形态）
    const slotProps = (vnode.props ?? {}) as Record<string, unknown>
    const slotFns = vnode.children as Record<string, (() => VNode[]) | undefined> | null
    if (kind === 'divider') {
      items.push({ type: 'divider', dashed: readBoolean(slotProps.dashed) })
      return
    }
    if (kind === 'itemGroup') {
      items.push({
        type: 'group',
        label: resolveContent(slotFns?.title, slotProps.title),
        children: parseSlotItems(toSlotChildren(slotFns?.default?.()))
      })
      return
    }
    if (kind === 'subMenu') {
      items.push({
        key: getVNodeKey(vnode) ?? `menu-item-${items.length}`,
        label: resolveContent(slotFns?.title, slotProps.title),
        icon: slotFns?.icon,
        expandIcon: slotFns?.expandIcon,
        children: parseSlotItems(toSlotChildren(slotFns?.default?.())),
        disabled: readBoolean(slotProps.disabled),
        theme: slotProps.theme as MenuTheme | undefined,
        popupClassName: slotProps.popupClassName as string | undefined,
        popupOffset: slotProps.popupOffset as [number, number] | undefined,
        onTitleClick: slotProps.onTitleClick as ((info: MenuTitleInfo) => void) | undefined
      })
      return
    }
    const item: MenuItemType = {
      key: getVNodeKey(vnode) ?? `menu-item-${items.length}`,
      label: resolveSlotContent(slotFns?.default),
      icon: slotFns?.icon,
      title: resolveContent(slotFns?.title, slotProps.title),
      disabled: readBoolean(slotProps.disabled),
      danger: readBoolean(slotProps.danger)
    }
    items.push(item)
  })
  return items
}
