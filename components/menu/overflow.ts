import { h } from 'vue'
import type { VNode } from 'vue'
import type { ItemType, MenuKey, SubMenuType } from './interface'

/**
 * 水平溢出省略
 *
 * 水平模式下菜单项不换行也不收缩，容器放不下的项由内核合成一个以省略号作标题的子菜单收容
 * （`overflowedIndicator` 的默认形态）——本文件承载「合成节点」与「切分 / 还原」的纯函数，
 * 供根组件（切分配置树，使 key 索引与渲染结果同源）与渲染内核（测量、按同构探针取宽度）共用。
 */

/** 溢出子菜单的固定 key：由内核合成，不参与用户配置 */
export const MENU_OVERFLOW_KEY: MenuKey = 'menu-overflow'

/** 溢出指示图标：三点省略号，尺寸随字号以 `1em` 表达 */
export function renderOverflowIndicator(): VNode {
  return h(
    'svg',
    {
      class: 'menu-overflow-indicator',
      viewBox: '64 64 896 896',
      width: '1em',
      height: '1em',
      fill: 'currentColor',
      focusable: 'false',
      'aria-hidden': 'true'
    },
    [
      h('path', {
        d: 'M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z'
      })
    ]
  )
}

/** 合成溢出子菜单：被收起的菜单项原样成为其子项，展开后与平铺时表现一致 */
export function createOverflowNode(children: ItemType[]): SubMenuType {
  return { key: MENU_OVERFLOW_KEY, label: renderOverflowIndicator, children }
}

/**
 * 按溢出起点切分菜单配置
 *
 * 起点之后的菜单项整体收进溢出子菜单；未发生溢出时原样返回入参，避免每次求值都产生新数组引用。
 * 切分结果直接参与渲染与 key 索引，因此合成节点对下游（keyPath、父级高亮、后代收起）与用户配置等价。
 *
 * @param {ItemType[]} items 原始菜单配置
 * @param {number} start 溢出起点（`Infinity` 表示未溢出）
 * @returns {ItemType[]} 可直接渲染的菜单配置
 */
export function splitOverflowItems(items: ItemType[], start: number): ItemType[] {
  if (!Number.isFinite(start) || start >= items.length) {
    return items
  }
  return [...items.slice(0, start), createOverflowNode(items.slice(start))]
}

/**
 * 还原切分前的顺序
 *
 * 溢出子菜单的子项即被收起的原菜单项，展开后与前面的项合起来就是完整顺序，
 * 故测量探针可按同一套下标与原始菜单项一一对应。
 *
 * @param {ItemType[]} nodes 已切分的菜单配置
 * @returns {ItemType[]} 原始顺序的菜单配置
 */
export function flattenOverflowItems(nodes: ItemType[]): ItemType[] {
  const list: ItemType[] = []
  nodes.forEach((node) => {
    if (node && 'key' in node && node.key === MENU_OVERFLOW_KEY && 'children' in node) {
      list.push(...(node.children ?? []))
    } else {
      list.push(node)
    }
  })
  return list
}
