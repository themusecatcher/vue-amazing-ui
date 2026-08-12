<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { VNode, Slot, CSSProperties, BaseTransitionProps } from 'vue'
import { useInject } from 'components/utils'
import MenuItem from '../menuitem/MenuItem.vue'

// ---- antdv ItemType 配置式类型体系（P1）----
// 所有菜单项共享的样式属性（对齐 antdv ItemSharedProps）
interface ItemSharedProps {
  style?: CSSProperties // 自定义行内样式
  class?: string // 自定义类名
}
// 菜单项 hover 回调参数
export interface MenuItemHoverInfo {
  key: string | number
  domEvent: MouseEvent
}
// 菜单项点击回调参数
export interface MenuItemClickInfo {
  item: MenuItemType
  key: string | number
  keyPath: (string | number)[]
  domEvent: MouseEvent
}
export interface MenuItemType extends ItemSharedProps {
  danger?: boolean // 危险样式，默认 false
  disabled?: boolean // 是否禁用，默认 false
  icon?: VNode | (() => VNode) // 菜单图标
  key: string | number // 菜单唯一标识
  label?: string | VNode // 菜单标题
  title?: string // 收起时展示的悬浮标题
  onMouseenter?: (info: MenuItemHoverInfo) => void // 鼠标移入回调
  onMouseleave?: (info: MenuItemHoverInfo) => void // 鼠标移出回调
  onClick?: (info: MenuItemClickInfo) => void // 点击回调
}
export interface SubMenuType extends ItemSharedProps {
  children: ItemType[] // 子菜单项
  disabled?: boolean // 是否禁用，默认 false
  icon?: VNode | (() => VNode) // 菜单图标
  key: string | number // 菜单唯一标识（必填）
  label?: string | VNode // 菜单标题
  title?: string // 收起时展示的悬浮标题
  popupClassName?: string // 弹出层类名（inline 模式无效，留待 P3）
  popupOffset?: [number, number] // 弹出层偏移（inline 模式无效，留待 P3）
  rootClassName?: string // 弹出层根类名（附加到弹出层根元素）
  theme?: 'light' | 'dark' // 主题色
  expandIcon?: VNode | ((info: { isOpen: boolean }) => VNode) // 自定义展开图标（覆盖 Menu 级 expandIcon）
  onMouseenter?: (info: MenuItemHoverInfo) => void // 鼠标移入回调
  onMouseleave?: (info: MenuItemHoverInfo) => void // 鼠标移出回调
  onTitleClick?: (info: { key: string | number; domEvent: MouseEvent }) => void // 点击子菜单标题的回调
}
export interface MenuItemGroupType extends ItemSharedProps {
  type: 'group' // 分组标识（必填）
  label?: string | VNode // 分组标题
  children: ItemType[] // 分组内菜单项
  key?: string | number // 可选唯一标识
}
export interface MenuDividerType extends ItemSharedProps {
  type: 'divider' // 分割线标识（必填）
  dashed?: boolean // 是否虚线，默认 false
}
export type ItemType = MenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType

// B8：动画配置（对齐 antdv motion: CSSMotionProps，即 Vue Transition 属性子集 + name），当前作用于 inline 展开/收起动画
export type MenuMotion = Partial<BaseTransitionProps> & { name?: string }

export interface Props {
  inlineCollapsed?: boolean // inline 时菜单是否收起状态（留待 P4）
  inlineIndent?: number // inline 模式的菜单缩进宽度，单位 px
  items?: ItemType[] // 菜单目录（配置式）
  mode?: 'vertical' | 'horizontal' | 'inline' // 菜单类型，支持垂直、水平和内嵌三种模式
  openKeys?: (string | number)[] // (v-model) 当前展开的 SubMenu 菜单项 key 数组
  overflowedIndicator?: VNode | Slot // 水平空间不足时的省略收缩图标（留待 P3）
  selectable?: boolean // 是否允许选中
  selectedKeys?: (string | number)[] // (v-model) 当前选中的菜单项 key 数组
  theme?: 'light' | 'dark' // 主题颜色
  triggerSubMenuAction?: 'click' | 'hover' // 触发子菜单展开的行为（inline 恒为点击）
  subMenuOpenDelay?: number // 鼠标进入子菜单后开启延时，单位秒，默认 0
  subMenuCloseDelay?: number // 鼠标离开子菜单后关闭延时，单位秒，默认 0.1
  multiple?: boolean // 是否允许多选，默认 false
  getPopupContainer?: (node: HTMLElement) => HTMLElement // 自定义弹出层挂载容器，默认 body
  expandIcon?: VNode | ((info: { isOpen: boolean }) => VNode) // 自定义 SubMenu 展开图标（全局）
  forceSubMenuRender?: boolean // 子菜单未展开时也预渲染进 DOM（对齐 antdv，默认 false）
  motion?: MenuMotion // 动画配置，作用于 inline 展开/收起动画
  disabled?: boolean // 整个菜单是否禁用，默认 false
  id?: string // 根元素 id（无障碍）
  tabindex?: number | string // 根元素 tabindex（无障碍）
  role?: string // 根元素 role（无障碍）
}
const props = withDefaults(defineProps<Props>(), {
  inlineCollapsed: undefined,
  inlineIndent: 24,
  items: () => [],
  mode: 'vertical',
  openKeys: () => [],
  overflowedIndicator: undefined,
  selectable: true,
  selectedKeys: () => [],
  theme: 'light',
  triggerSubMenuAction: 'hover',
  subMenuOpenDelay: 0,
  subMenuCloseDelay: 0.1,
  multiple: false,
  getPopupContainer: undefined,
  expandIcon: undefined,
  forceSubMenuRender: false,
  motion: undefined,
  disabled: false,
  id: undefined,
  tabindex: undefined,
  role: undefined
})
const { colorPalettes } = useInject('Menu') // 主题色注入
const emits = defineEmits([
  'update:openKeys',
  'update:selectedKeys',
  'click',
  'select',
  'deselect',
  'openChange',
  'focus',
  'blur',
  'mousedown'
])

// 主题色 CSS 变量（供 MenuItem 子组件通过 var() 使用）
const menuStyle = computed(() => {
  const base: Record<string, string> = {
    '--menu-primary-color': colorPalettes.value[5],
    '--menu-item-active-bg': colorPalettes.value[0],
    '--menu-item-hover-bg': props.theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'
  }
  return base
})
// 是否处于收起状态
const isCollapsed = computed(() => props.mode === 'inline' && !!props.inlineCollapsed)

// D3：inlineCollapsed 切换时缓存/恢复 openKeys（对齐 antdv inlineCacheOpenKeys 机制）
// 完整 inline 展开态时持续缓存最新 openKeys；收起时清空，回到展开态时回填缓存
const inlineCacheOpenKeys = ref<(string | number)[]>(props.openKeys)
const isInlineExpanded = computed(() => props.mode === 'inline' && !props.inlineCollapsed)
watch(
  () => props.openKeys,
  (keys) => {
    if (isInlineExpanded.value) {
      inlineCacheOpenKeys.value = keys
    }
  }
)
watch(isInlineExpanded, (expanded) => {
  if (expanded) {
    emits('update:openKeys', inlineCacheOpenKeys.value)
    emits('openChange', inlineCacheOpenKeys.value)
  } else {
    emits('update:openKeys', [])
    emits('openChange', [])
  }
})

/**
 * 在菜单树中查找从根到目标 key 的路径（keyPath）
 * 返回从当前项到根的 key 数组（antdv 顺序：当前项在前，根在后）
 */
function findKeyPath(
  items: ItemType[],
  targetKey: string | number,
  path: (string | number)[] = []
): (string | number)[] | null {
  for (const item of items) {
    const type = (item as MenuDividerType | MenuItemGroupType)?.type
    if (type === 'divider') continue
    if (type === 'group') {
      const found = findKeyPath((item as MenuItemGroupType).children, targetKey, path)
      if (found) return found
      continue
    }
    const current = item as MenuItemType | SubMenuType
    const children = (item as SubMenuType).children
    if (children?.length) {
      const found = findKeyPath(children, targetKey, [current.key, ...path])
      if (found) return found
    } else if (current.key === targetKey) {
      return [targetKey, ...path]
    }
  }
  return null
}
// 根据 key 查找对应的菜单数据项
function findItem(items: ItemType[], targetKey: string | number): MenuItemType | SubMenuType | null {
  for (const item of items) {
    const type = (item as MenuDividerType | MenuItemGroupType)?.type
    if (type === 'divider') continue
    if (type === 'group') {
      const found = findItem((item as MenuItemGroupType).children, targetKey)
      if (found) return found
      continue
    }
    const current = item as MenuItemType | SubMenuType
    if (current.key === targetKey) return current
    const children = (item as SubMenuType).children
    if (children?.length) {
      const found = findItem(children, targetKey)
      if (found) return found
    }
  }
  return null
}

// 对齐 antdv selectedSubMenuKeys：选中项的所有祖先 SubMenu key，用于父级标题级联高亮
const selectedSubMenuKeys = computed<(string | number)[]>(() => {
  const keys = new Set<string | number>()
  props.selectedKeys.forEach((key) => {
    // findKeyPath 返回 [选中项, 父, 祖父, ...]，slice(1) 即祖先 SubMenu keys
    findKeyPath(props.items, key)
      ?.slice(1)
      .forEach((k) => keys.add(k))
  })
  return [...keys]
})

// 选中菜单项（来自 MenuItem 冒泡，domEvent 由点击项透传）
function onSelect(key: string | number, domEvent: MouseEvent) {
  const item = findItem(props.items, key)
  const keyPath = findKeyPath(props.items, key) ?? [key]
  // C3：per-item onClick 先于 Menu 级 click 触发（对齐 antdv MenuItem onInternalClick 顺序）
  if (item) {
    const menuItem = item as MenuItemType
    menuItem.onClick?.({ item: menuItem, key, keyPath, domEvent })
  }
  // click 事件所有可点击项都触发
  emits('click', { item, key, keyPath })
  if (props.selectable) {
    const exist = props.selectedKeys.includes(key)
    // multiple：点击已选项取消、未选项追加；单选：替换
    let selectedKeys: (string | number)[]
    if (props.multiple) {
      selectedKeys = exist ? props.selectedKeys.filter((k) => k !== key) : [...props.selectedKeys, key]
    } else {
      selectedKeys = [key]
    }
    // 单选且未变化时不重复触发（对齐 antdv shallowEqual）
    if (props.multiple || !exist) {
      emits('update:selectedKeys', selectedKeys)
      if (props.multiple && exist) {
        emits('deselect', { item, key, keyPath, selectedKeys })
      } else {
        emits('select', { item, key, keyPath, selectedKeys })
      }
    }
  }
  // 对齐 antdv：非 inline 渲染模式（含收起态）且非 multiple，选中后关闭所有弹出层（无论 selectable）
  if ((props.mode !== 'inline' || isCollapsed.value) && !props.multiple && props.openKeys.length) {
    emits('update:openKeys', [])
    emits('openChange', [])
  }
}
// 展开/收起 SubMenu（来自 MenuItem 冒泡）
function onOpen(key: string | number) {
  let openKeys: (string | number)[]
  if (props.openKeys.includes(key)) {
    openKeys = props.openKeys.filter((k) => k !== key)
  } else {
    openKeys = [...props.openKeys, key]
  }
  emits('update:openKeys', openKeys)
  emits('openChange', openKeys)
}
</script>
<template>
  <ul
    class="menu-wrap"
    :class="{
      'menu-horizontal': props.mode === 'horizontal',
      'menu-vertical': props.mode === 'vertical',
      'menu-inline': props.mode === 'inline',
      'menu-inline-collapsed': isCollapsed,
      'menu-light': props.theme === 'light',
      'menu-dark': props.theme === 'dark'
    }"
    :style="menuStyle"
    :id="id"
    :tabindex="tabindex"
    :role="role"
    @focus="emits('focus', $event)"
    @blur="emits('blur', $event)"
    @mousedown="emits('mousedown', $event)"
  >
    <MenuItem
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :level="1"
      :mode="isCollapsed ? 'vertical' : mode"
      :theme="theme"
      :inline-collapsed="isCollapsed"
      :inline-indent="inlineIndent"
      :selected-keys="selectedKeys"
      :selected-sub-menu-keys="selectedSubMenuKeys"
      :open-keys="openKeys"
      :trigger-sub-menu-action="isCollapsed ? 'hover' : triggerSubMenuAction"
      :sub-menu-open-delay="subMenuOpenDelay"
      :sub-menu-close-delay="subMenuCloseDelay"
      :get-popup-container="getPopupContainer"
      :expand-icon="expandIcon"
      :force-sub-menu-render="forceSubMenuRender"
      :motion="motion"
      :menu-disabled="disabled"
      @select="onSelect"
      @open="onOpen"
    />
  </ul>
</template>
<style lang="less" scoped>
.menu-wrap {
  margin: 0;
  padding: 0 4px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  list-style: none;
  outline: none;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
}
.menu-inline {
  border-right: 1px solid rgba(5, 5, 5, 0.06);
}
.menu-inline-collapsed {
  width: 80px;
}
.menu-vertical {
  border-right: 1px solid rgba(5, 5, 5, 0.06);
}
.menu-horizontal {
  display: flex;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  // 对齐 antdv horizontal：顶层项 46px 高、无圆角无垂直间距、悬浮/展开/选中显示主色底部 ink bar、无背景色
  :deep(.menu-item),
  :deep(.menu-submenu-title) {
    display: inline-flex;
    align-items: center;
    height: 46px;
    margin: 0;
    border-radius: 0;
    vertical-align: bottom;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 16px;
      right: 16px;
      border-bottom: 2px solid transparent;
      transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    &:hover {
      background-color: transparent;
      &::after {
        border-bottom-color: var(--menu-primary-color);
      }
    }
  }
  :deep(.menu-submenu) {
    display: inline-flex;
    align-items: center;
  }
  // 顶层子菜单隐藏箭头（对齐 antdv）
  :deep(.menu-submenu-arrow) {
    display: none;
  }
  // 子菜单展开/级联选中时标题显示 ink bar
  :deep(.menu-submenu-open),
  :deep(.menu-submenu-selected) {
    > .menu-submenu-title::after {
      border-bottom-color: var(--menu-primary-color);
    }
  }
  // 选中项：主色文字 + 透明背景 + ink bar
  :deep(.menu-item-selected) {
    background-color: transparent;
    &::after {
      border-bottom-color: var(--menu-primary-color);
    }
    &:hover {
      background-color: transparent;
    }
  }
}
.menu-light {
  color: rgba(0, 0, 0, 0.88);
  background: #ffffff;
}
.menu-dark {
  color: rgba(255, 255, 255, 0.65);
  background: #001529;
  border-right: 0;
  border-bottom: 0;
  :deep(.menu-item),
  :deep(.menu-submenu-title) {
    color: rgba(255, 255, 255, 0.65);
  }
  :deep(.menu-item-selected) {
    color: #ffffff;
    background-color: var(--menu-primary-color);
    &:hover {
      background-color: var(--menu-primary-color);
    }
  }
  :deep(.menu-item-group-title) {
    color: rgba(255, 255, 255, 0.45);
  }
  :deep(.menu-divider) {
    background-color: rgba(255, 255, 255, 0.12);
  }
}
</style>
