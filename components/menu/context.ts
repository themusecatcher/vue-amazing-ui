import type { ComputedRef, InjectionKey, Ref, VNodeChild } from 'vue'
import type { MenuExpandIconInfo, MenuInfo, MenuItemType, MenuKey, MenuMode, MenuTheme, SubMenuType } from './interface'

/**
 * 渲染内核与根组件之间共享的菜单状态
 *
 * 菜单项子树由内部渲染内核（`MenuNodes`）递归生成，而选中 / 展开状态、事件出口都收在根组件，
 * 故经注入下发；内核自身不持有菜单级状态（仅持有与 DOM 相关的浮层锚点与计时器）。
 */
export interface MenuContext {
  mode: ComputedRef<MenuMode> // 归一后的模式：inline 收起时降级为 vertical
  theme: ComputedRef<MenuTheme> // 菜单主题
  inlineCollapsed: ComputedRef<boolean> // 是否处于 inline 收起态
  retainingInline: Ref<boolean> // 收起瞬间是否仍按内嵌形态渲染（供子菜单列表播完收起动画）
  inlineIndent: ComputedRef<number> // inline 模式每级缩进宽度
  disabled: ComputedRef<boolean> // 是否禁用整个菜单
  triggerSubMenuAction: ComputedRef<'click' | 'hover'> // 子菜单展开触发方式
  subMenuOpenDelay: ComputedRef<number> // 鼠标进入子菜单后的展开延时，单位秒
  subMenuCloseDelay: ComputedRef<number> // 鼠标离开子菜单后的关闭延时，单位秒
  openKeys: Ref<MenuKey[]> // 已展开的子菜单 key
  selectedKeys: Ref<MenuKey[]> // 已选中的菜单项 key
  overflowStart: Ref<number> // 水平模式下收进溢出子菜单的起始下标（`Infinity` 表示未溢出）
  onOverflowChange: (start: number) => void // 汇报溢出起点，由根组件切分菜单配置
  selectedSubMenuKeys: ComputedRef<MenuKey[]> // 含选中项的子菜单 key，用于父级高亮
  subMenuZIndex: number // 弹出子菜单的默认层级
  primaryColor: ComputedRef<string> // 主题强调色：浮层面板脱离根节点，需随面板样式一并带入
  primaryPalette: ComputedRef<string> // 强调色的最浅一阶：浅色主题的选中底色
  expandIcon: ComputedRef<((info: MenuExpandIconInfo) => VNodeChild) | undefined>
  onOpenChange: (key: MenuKey, open: boolean) => void // 展开 / 收起子菜单
  onItemClick: (info: MenuInfo) => void // 点击菜单项（含选中与关闭弹出菜单）
  onTitleClick: (item: SubMenuType, domEvent: MouseEvent) => void // 点击子菜单标题
}

/** 菜单上下文的注入键 */
export const menuContextKey: InjectionKey<MenuContext> = Symbol('menuContext')

/** 从菜单配置里取到稳定的 key：配置未提供 key 时以列表下标兜底，避免渲染出现重复 key */
export function getItemKey(node: MenuItemType | SubMenuType | null | undefined, index: number): MenuKey {
  return node?.key ?? `menu-item-${index}`
}
