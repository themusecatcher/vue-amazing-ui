import type { CSSProperties, VNodeChild } from 'vue'

/** 菜单项 key */
export type MenuKey = string | number

/** 菜单类型 */
export type MenuMode = 'horizontal' | 'vertical' | 'inline'

/** 主题颜色 */
export type MenuTheme = 'light' | 'dark'

/** 标题 / 文本内容的渲染单元：值或返回值的渲染函数 */
export type MenuNode = VNodeChild | (() => VNodeChild)

/** 图标渲染单元：值或渲染函数（渲染函数入参为所在菜单项的配置） */
export type MenuIcon = VNodeChild | ((item: MenuItemType | SubMenuType) => VNodeChild)

/** 子菜单的展开触发方式 */
export type MenuTriggerAction = 'click' | 'hover'

/** 子菜单展开图标的渲染入参：所在的子菜单配置 + 当前是否展开 */
export type MenuExpandIconInfo = SubMenuType & { isOpen?: boolean }

interface ItemSharedProps {
  style?: CSSProperties // 菜单项自定义样式
  class?: string // 菜单项自定义类名
}

/** 菜单项配置项 */
export interface MenuItemType extends ItemSharedProps {
  key: MenuKey // 唯一标志
  label?: MenuNode // 菜单项标题
  disabled?: boolean // 是否禁用
  danger?: boolean // 是否展示错误状态样式
  icon?: MenuIcon // 菜单图标
  title?: string // 收起时展示的悬浮标题
}

/** 子菜单配置项 */
export interface SubMenuType extends ItemSharedProps {
  key: MenuKey // 唯一标志
  label?: MenuNode // 子菜单标题
  children: ItemType[] // 子菜单的菜单项
  disabled?: boolean // 是否禁用
  icon?: MenuIcon // 菜单图标
  theme?: MenuTheme // 子菜单主题，不传则继承 Menu 的 theme
  title?: string // 收起时展示的悬浮标题
  popupClassName?: string // 弹出子菜单的自定义类名，inline 模式下无效
  popupOffset?: [number, number] // 弹出子菜单与锚点的偏移，inline 模式下无效
  onTitleClick?: (info: MenuTitleInfo) => void // 点击子菜单标题
}

/** 菜单分组配置项 */
export interface MenuItemGroupType extends ItemSharedProps {
  type: 'group' // 固定为 group，标记该项为分组
  label?: MenuNode // 分组标题
  children?: ItemType[] // 分组的菜单项
}

/** 菜单分割线配置项 */
export interface MenuDividerType extends ItemSharedProps {
  type: 'divider' // 固定为 divider，标记该项为分割线
  dashed?: boolean // 是否虚线
}

/** 菜单内容 */
export type ItemType = SubMenuType | MenuItemType | MenuItemGroupType | MenuDividerType | null | undefined

/** 点击 / 选中回调携带的菜单项信息 */
export interface MenuInfo {
  key: MenuKey // 触发项的 key
  keyPath: MenuKey[] // 由根到触发项的 key 路径
  item: MenuItemType | SubMenuType // 触发项的原始配置
  domEvent: MouseEvent | KeyboardEvent // 触发的原生事件
}

/** 子菜单标题点击回调携带的信息 */
export interface MenuTitleInfo {
  key: MenuKey // 子菜单的 key
  domEvent: MouseEvent | KeyboardEvent // 触发的原生事件
}

/** 选中回调携带的信息 */
export interface SelectInfo extends MenuInfo {
  selectedKeys: MenuKey[] // 变化后的选中项 key 数组
}
