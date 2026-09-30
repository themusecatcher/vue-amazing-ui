<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, provide, ref, useSlots, watch } from 'vue'
import type { CSSProperties, VNode, VNodeChild } from 'vue'
import { FLOATING_LAYER_Z_INDEX, siderCollapsedKey, useInject } from 'components/utils'
import MenuNodes from './MenuNodes'
import { getItemKey, menuContextKey } from './context'
import type { MenuContext } from './context'
import { splitOverflowItems } from './overflow'
import { parseSlotItems } from './slotItems'
import type {
  ItemType,
  MenuExpandIconInfo,
  MenuInfo,
  MenuKey,
  MenuMode,
  MenuTheme,
  SelectInfo,
  SubMenuType
} from './interface'

/**
 * 导航菜单
 *
 * 以 `items` 配置描述菜单结构：`children` 表示子菜单、`type: 'group'` 表示分组、`type: 'divider'` 表示分割线。
 * 展开与选中状态受控（`v-model:openKeys` / `v-model:selectedKeys`）与非受控均可使用。
 */
export interface Props {
  // 双向绑定
  openKeys?: MenuKey[] // 当前展开的子菜单 key 数组
  selectedKeys?: MenuKey[] // 当前选中的菜单项 key 数组
  // 内容数据
  items?: ItemType[] // 菜单内容
  // 形态外观
  mode?: MenuMode // 菜单类型
  theme?: MenuTheme // 主题颜色
  inlineCollapsed?: boolean // inline 模式下是否收起（收起时子菜单改为浮层展开）；外层为 LayoutSider 时以其收起态为准
  inlineIndent?: number // inline 模式每一级菜单项的缩进宽度
  expandIcon?: (info: MenuExpandIconInfo) => VNodeChild // 自定义子菜单的展开收起图标
  // 状态反馈
  disabled?: boolean // 是否禁用整个菜单
  selectable?: boolean // 是否允许选中
  multiple?: boolean // 是否允许多选
  // 行为交互
  triggerSubMenuAction?: 'click' | 'hover' // 子菜单的展开触发方式
  subMenuOpenDelay?: number // 鼠标进入子菜单后开启的延时，单位秒
  subMenuCloseDelay?: number // 鼠标离开子菜单后关闭的延时，单位秒
  forceSubMenuRender?: boolean // 是否在子菜单展示之前就渲染进 DOM（首次展开因而无需等待挂载）
}

export interface MenuSlots {
  default?: () => VNode[] // 子组件式菜单内容（MenuItem / MenuSubMenu / MenuItemGroup / MenuDivider）
  expandIcon?: (info: MenuExpandIconInfo) => VNode[]
  overflowedIndicator?: () => VNode[] // 水平空间不足时收进省略子菜单的指示器，缺省为内置三点图标
}

const props = withDefaults(defineProps<Props>(), {
  openKeys: undefined,
  selectedKeys: undefined,
  items: () => [],
  mode: 'vertical',
  theme: 'light',
  inlineCollapsed: false,
  inlineIndent: 24,
  expandIcon: undefined,
  disabled: false,
  selectable: true,
  multiple: false,
  triggerSubMenuAction: 'hover',
  subMenuOpenDelay: 0,
  subMenuCloseDelay: 0.1,
  forceSubMenuRender: false
})
defineSlots<MenuSlots>()

const emit = defineEmits<{
  click: [info: MenuInfo] // 点击菜单项时调用
  deselect: [info: SelectInfo] // 取消选中时调用，仅在 multiple 生效
  openChange: [openKeys: MenuKey[]] // 子菜单展开 / 收起时调用
  select: [info: SelectInfo] // 被选中时调用
  'update:openKeys': [openKeys: MenuKey[]] // 展开的子菜单 key 数组变化
  'update:selectedKeys': [selectedKeys: MenuKey[]] // 选中的菜单项 key 数组变化
}>()

const EMPTY_KEYS: MenuKey[] = [] // 稳定的空数组：避免每次渲染都产生新引用而触发子组件更新
// 显式标注插槽类型：`useSlots()` 的返回值参与 `menuItems` / `displayItems` 的推导，构成推断环
// （构建期的 dts 程序会报 TS7022 / TS7024），标注后即断开；类型与 `defineSlots<MenuSlots>()` 一致
const slots: MenuSlots = useSlots()
const { colorPalettes } = useInject('Menu')
// 强调色与选中底色取自组件主题（可在 ConfigProvider 中按 Menu 覆盖）
const primaryColor = computed(() => colorPalettes.value[5] ?? colorPalettes.value[0])
const primaryPalette = computed(() => colorPalettes.value[0] ?? primaryColor.value)
const rootStyle = computed<CSSProperties>(
  () =>
    ({
      '--menu-primary-color': primaryColor.value,
      '--menu-primary-palette-1': primaryPalette.value
    }) as CSSProperties
)

// 受控 / 非受控：传入即为受控，内部副本随外部同步
const innerOpenKeys = ref<MenuKey[]>(Array.isArray(props.openKeys) ? [...props.openKeys] : [])
const innerSelectedKeys = ref<MenuKey[]>(Array.isArray(props.selectedKeys) ? [...props.selectedKeys] : [])
watch(
  () => props.openKeys,
  (keys) => {
    if (Array.isArray(keys)) {
      innerOpenKeys.value = [...keys]
    }
  },
  { deep: true }
)
watch(
  () => props.selectedKeys,
  (keys) => {
    if (Array.isArray(keys)) {
      innerSelectedKeys.value = [...keys]
    }
  },
  { deep: true }
)

// 当前激活路径：悬浮或焦点所在项的完整 key 链（含祖先）。子菜单浮层经 Teleport 脱离 DOM 树，
// 浮层内的项被悬浮时父级标题无法用 `:hover` 感知，故统一由这条路径驱动高亮
const activeKeys = ref<MenuKey[]>([])
function changeActiveKeys(keys: MenuKey[]): void {
  activeKeys.value = keys
}

// 模式归一：inline 收起后菜单退化为 vertical（子菜单改用浮层承载），样式与布局随之为同一套
// 外层侧边栏下发的收起态优先：此时菜单宽度由侧边栏决定，自身 inlineCollapsed 不再参与
const siderCollapsed = inject(siderCollapsedKey, null)
const collapsed = computed(() => Boolean(siderCollapsed?.value ?? props.inlineCollapsed))
const mergedInlineCollapsed = computed(() => (props.mode === 'inline' || props.mode === 'vertical') && collapsed.value)
const mergedMode = computed<MenuMode>(() => (mergedInlineCollapsed.value ? 'vertical' : props.mode))
const isInlineMode = computed(() => mergedMode.value === 'inline')
const theme = computed(() => props.theme)

// 菜单内容：组件式写法（default 插槽）存在时以插槽为准，否则取 items（项目统一约定：插槽优先于 prop）
// 子组件只承载配置描述，这里读回为与 items 同构的配置树，两条数据源因此共用后续全部逻辑
const menuItems = computed<ItemType[]>(() => (slots.default ? parseSlotItems(slots.default()) : props.items))

// 水平溢出：放不下的菜单项收进「…」子菜单。起点由内核测量后回传，切分后的配置树参与
// 渲染与下方索引，故溢出子菜单对 keyPath、父级高亮、后代收起也与用户配置等价
const overflowStart = ref<number>(Number.POSITIVE_INFINITY)
const displayItems = computed<ItemType[]>(() =>
  props.mode === 'horizontal'
    ? splitOverflowItems(menuItems.value, overflowStart.value, slots.overflowedIndicator)
    : menuItems.value
)

// 结构索引：key → 祖先链与是否为子菜单，供 keyPath、父级高亮、后代收起使用
// 索引建立在切分后的配置树上：溢出子菜单合成于根组件，其子项因此与平铺时同源
const keyMetaMap = computed(() => {
  const map = new Map<MenuKey, { parents: MenuKey[]; isSubMenu: boolean }>()
  const walk = (nodes: ItemType[], parents: MenuKey[]): void => {
    nodes.forEach((node, index) => {
      if (!node || ('type' in node && node.type === 'divider')) {
        return
      }
      if ('type' in node && node.type === 'group') {
        walk(node.children ?? [], parents)
        return
      }
      const isSubMenu = 'children' in node && Array.isArray(node.children)
      // key 的取法与渲染内核同源（`getItemKey`）：配置未提供 key 时同样按下标兜底，
      // 否则本索引存下的 key 与内核渲染出的 key 对不上，父级高亮与后代收起都会失准
      const key = getItemKey(node, index)
      map.set(key, { parents, isSubMenu })
      if (isSubMenu) {
        walk((node as SubMenuType).children, [...parents, key])
      }
    })
  }
  walk(displayItems.value, [])
  return map
})
// 含选中项的子菜单整链高亮：父级被选中态需要它（内嵌与浮层两种形态共用）
const selectedSubMenuKeys = computed(() => {
  const keys = new Set<MenuKey>()
  innerSelectedKeys.value.forEach((key) => {
    keyMetaMap.value.get(key)?.parents.forEach((parent) => keys.add(parent))
  })
  return [...keys]
})

function isSameKeys(current: MenuKey[], next: MenuKey[]): boolean {
  return current.length === next.length && next.every((key) => current.includes(key))
}

// 后代 key：浮层型子菜单关闭时须一并收起，否则后代留在展开集合中形成「幽灵展开」
function collectDescendantKeys(key: MenuKey): MenuKey[] {
  const keys: MenuKey[] = []
  keyMetaMap.value.forEach((meta, itemKey) => {
    if (meta.parents.includes(key)) {
      keys.push(itemKey)
    }
  })
  return keys
}

function triggerOpenKeys(keys: MenuKey[]): void {
  innerOpenKeys.value = keys
  emit('update:openKeys', keys)
  emit('openChange', keys)
}

function handleOpenChange(key: MenuKey, open: boolean): void {
  let keys = innerOpenKeys.value.filter((item) => item !== key)
  if (open) {
    keys.push(key)
  } else if (!isInlineMode.value) {
    const descendants = collectDescendantKeys(key)
    keys = keys.filter((item) => !descendants.includes(item))
  }
  if (!isSameKeys(keys, innerOpenKeys.value)) {
    triggerOpenKeys(keys)
  }
}

function handleItemClick(info: MenuInfo): void {
  emit('click', info)
  if (props.selectable) {
    const { key } = info
    const existed = innerSelectedKeys.value.includes(key)
    const nextKeys = props.multiple
      ? existed
        ? innerSelectedKeys.value.filter((item) => item !== key)
        : [...innerSelectedKeys.value, key]
      : [key]
    if (!isSameKeys(nextKeys, innerSelectedKeys.value)) {
      // 受控时只回传，等外部更新后再经 watch 同步；非受控直接落到内部副本
      if (props.selectedKeys === undefined) {
        innerSelectedKeys.value = nextKeys
      }
      const selectInfo: SelectInfo = { ...info, selectedKeys: nextKeys }
      emit('update:selectedKeys', nextKeys)
      if (existed && props.multiple) {
        emit('deselect', selectInfo)
      } else {
        emit('select', selectInfo)
      }
    }
  }
  // 浮层型子菜单在选中后收起；多选不收起，便于连续勾选
  if (!isInlineMode.value && !props.multiple && innerOpenKeys.value.length) {
    triggerOpenKeys([])
  }
}

function handleTitleClick(item: SubMenuType, domEvent: MouseEvent): void {
  item.onTitleClick?.({ key: item.key, domEvent })
  if (isInlineMode.value) {
    handleOpenChange(item.key, !innerOpenKeys.value.includes(item.key))
  } else if (props.triggerSubMenuAction === 'click') {
    // 点击触发时同级只保留一个展开项，与「点击外部即收起」的语义一致
    triggerOpenKeys(innerOpenKeys.value.includes(item.key) ? [] : [item.key])
  }
}

// 展开集合在 inline 与浮层形态之间不可直接沿用（浮层态无处表达「内嵌展开」），故缓存后还原
const cachedOpenKeys = ref<MenuKey[]>([...innerOpenKeys.value])
let modeInitialized = false
watch(
  innerOpenKeys,
  (keys) => {
    if (isInlineMode.value) {
      cachedOpenKeys.value = [...keys]
    }
  },
  { immediate: true }
)
// 收起瞬间保留内嵌渲染：子菜单列表的收起动画要一个动画时长才播完，若当即换成浮层形态，
// 列表会整块消失、收起过程少一段「内容收拢」的动作（时长与样式表里的折叠过渡同源）
const INLINE_COLLAPSE_DURATION = 200
const retainingInline = ref(false)
let retainInlineTimer: ReturnType<typeof setTimeout> | undefined

function setRetainingInline(retaining: boolean): void {
  if (retainInlineTimer !== undefined) {
    clearTimeout(retainInlineTimer)
    retainInlineTimer = undefined
  }
  retainingInline.value = retaining
  if (retaining) {
    retainInlineTimer = setTimeout(() => {
      retainingInline.value = false
      retainInlineTimer = undefined
    }, INLINE_COLLAPSE_DURATION)
  }
}

watch(
  isInlineMode,
  (inline) => {
    if (!modeInitialized) {
      modeInitialized = true
      return
    }
    if (inline) {
      setRetainingInline(false)
      innerOpenKeys.value = [...cachedOpenKeys.value]
    } else if (innerOpenKeys.value.length) {
      setRetainingInline(true)
      triggerOpenKeys([])
    }
  },
  { immediate: true }
)

// 展开图标：插槽优先于属性（项目统一约定）；图标类名由渲染内核统一补，与子菜单级 expandIcon 同源
const expandIcon = computed<MenuContext['expandIcon']['value']>(() => {
  const fromSlot = slots.expandIcon
  const fromProp = props.expandIcon
  if (!fromSlot && !fromProp) {
    return undefined
  }
  return (info: MenuExpandIconInfo): VNodeChild => (fromSlot ? fromSlot(info) : fromProp?.(info))
})

// 点击触发模式下，浮层需在点击菜单外部时收起
function handleDocumentMouseDown(event: MouseEvent): void {
  if (props.triggerSubMenuAction !== 'click' || isInlineMode.value || !innerOpenKeys.value.length) {
    return
  }
  const target = event.target as HTMLElement | null
  if (target?.closest('.menu-wrap') || target?.closest('.menu-submenu-popup')) {
    return
  }
  triggerOpenKeys([])
}
onMounted(() => {
  // 文档级监听在挂载后挂接：SSR 环境下没有 document
  if (typeof document !== 'undefined') {
    document.addEventListener('mousedown', handleDocumentMouseDown, true)
  }
})
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('mousedown', handleDocumentMouseDown, true)
  }
  if (retainInlineTimer !== undefined) {
    clearTimeout(retainInlineTimer)
  }
})

provide<MenuContext>(menuContextKey, {
  mode: mergedMode,
  theme,
  inlineCollapsed: mergedInlineCollapsed,
  retainingInline,
  inlineIndent: computed(() => props.inlineIndent),
  disabled: computed(() => props.disabled),
  triggerSubMenuAction: computed(() => props.triggerSubMenuAction),
  subMenuOpenDelay: computed(() => props.subMenuOpenDelay),
  subMenuCloseDelay: computed(() => props.subMenuCloseDelay),
  openKeys: innerOpenKeys,
  selectedKeys: innerSelectedKeys,
  activeKeys,
  changeActiveKeys,
  overflowStart,
  onOverflowChange: (start: number) => {
    overflowStart.value = start
  },
  overflowedIndicator: computed(() => slots.overflowedIndicator),
  forceSubMenuRender: computed(() => props.forceSubMenuRender),
  selectedSubMenuKeys,
  subMenuZIndex: FLOATING_LAYER_Z_INDEX.select,
  primaryColor,
  primaryPalette,
  expandIcon,
  onOpenChange: handleOpenChange,
  onItemClick: handleItemClick,
  onTitleClick: handleTitleClick
})
</script>

<template>
  <MenuNodes :nodes="displayItems" is-root :level="1" :parent-keys="EMPTY_KEYS" :style="rootStyle" />
</template>

<style lang="less">
/**
 * 样式统一落全局块：整棵菜单树由内部渲染内核（`MenuNodes`）递归生成，其元素不带本 SFC 的
 * scope id（与 `<Popup>` 宿主编译的面板壳同理，见 `Tooltip` 的全局块说明），scoped 规则匹配不到。
 * 为免 `menu-*` 裸类名外溢到宿主页面，除主题变量外，其余规则一律以 `.menu-wrap`（根列表）
 * 与 `.menu-submenu-popup` / `.menu-tooltip-popup`（浮层面板）三个锚点收口。
 */
/* 主题变量：`<ul>` 与浮层面板都会带上主题类，故两处都能取到值。
   主色（`--menu-primary-color` / `--menu-primary-palette-1`）随组件主题由根组件与浮层面板内联注入，不在此声明 */
.menu-light {
  --menu-background: #fff;
  --menu-color: rgba(0, 0, 0, 0.88);
  --menu-border-color: rgba(5, 5, 5, 0.06);
  /* 悬浮态只换底色、不换字色（字色与常态一致） */
  --menu-item-hover-color: rgba(0, 0, 0, 0.88);
  --menu-item-hover-background: rgba(0, 0, 0, 0.06);
  --menu-item-selected-color: var(--menu-primary-color);
  /* 选中态底色取主色的最浅一阶，由根组件按组件主题注入 */
  --menu-item-selected-background: var(--menu-primary-palette-1);
  /* 水平菜单：浅色由下划线表达选中，故不着底色 */
  --menu-horizontal-selected-background: transparent;
  /* 水平菜单状态条（下划线）粗细 */
  --menu-horizontal-active-bar-height: 2px;
  /* 水平菜单容器下边界的厚度：浅色有一条边界，水平项需上移同量，状态条才压在边界上 */
  --menu-horizontal-active-bar-border-size: 1px;
  --menu-item-danger-color: #ff4d4f;
  /* 危险项的悬浮字色：浅色下与常态同色 */
  --menu-item-danger-hover-color: #ff4d4f;
  /* 危险项按下 / 选中时的底色：错误色的最浅一阶 */
  --menu-item-danger-active-background: #fff2f0;
  --menu-item-danger-selected-background: #fff2f0;
  --menu-item-danger-selected-color: #ff4d4f;
  --menu-item-disabled-color: rgba(0, 0, 0, 0.25);
  --menu-group-title-color: rgba(0, 0, 0, 0.45);
  --menu-inline-submenu-background: rgba(0, 0, 0, 0.02);
}
.menu-dark {
  --menu-background: #001529;
  --menu-color: rgba(255, 255, 255, 0.65);
  --menu-border-color: rgba(255, 255, 255, 0.12);
  --menu-item-hover-color: #fff;
  --menu-item-hover-background: rgba(0, 0, 0, 0.06);
  --menu-item-selected-color: #fff;
  --menu-item-selected-background: var(--menu-primary-color);
  /* 水平菜单：深色改由主色填充表达选中，状态条宽度归零（沿用浅色那套下划线会与填充叠加） */
  --menu-horizontal-selected-background: var(--menu-primary-color);
  --menu-horizontal-active-bar-height: 0;
  /* 深色既无状态条也无容器下边界，上移量随之归零 */
  --menu-horizontal-active-bar-border-size: 0px;
  --menu-item-danger-color: #ff4d4f;
  /* 危险项的悬浮字色：深色下提亮一阶 */
  --menu-item-danger-hover-color: #ff7875;
  /* 危险项按下 / 选中时的底色：深色下直接取错误色本身 */
  --menu-item-danger-active-background: #ff4d4f;
  --menu-item-danger-selected-background: #ff4d4f;
  --menu-item-danger-selected-color: #fff;
  --menu-item-disabled-color: rgba(255, 255, 255, 0.25);
  --menu-group-title-color: rgba(255, 255, 255, 0.65);
  --menu-inline-submenu-background: #000c17;
}
.menu-wrap {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1.5714285714285714;
  color: var(--menu-color);
  background-color: var(--menu-background);
  list-style: none;
  outline: none;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1);
}
.menu-wrap.menu-root {
  margin: 0;
  padding: 0;
  list-style: none;
}
.menu-wrap.menu-horizontal {
  display: flex;
  flex-wrap: nowrap;
  line-height: 46px;
  border-bottom: 1px solid var(--menu-border-color);
}
.menu-wrap.menu-vertical,
.menu-wrap.menu-inline {
  width: 100%;
}
.menu-wrap.menu-light.menu-vertical,
.menu-wrap.menu-light.menu-inline {
  border-right: 1px solid var(--menu-border-color);
}
.menu-wrap.menu-vertical,
.menu-wrap.menu-inline,
.menu-submenu-list {
  &::before,
  &::after {
    display: table;
    content: '';
  }
  &::after {
    clear: both;
  }
}
.menu-submenu-popup {
  min-width: 160px;
  font-size: 14px;
  line-height: 1.5714285714285714;
  color: var(--menu-color);
  background-color: var(--menu-background);
  border-radius: 8px;
  box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
.menu-tooltip-popup {
  --menu-tooltip-background: rgba(0, 0, 0, 0.85);
  width: max-content;
  pointer-events: none;
  &.va-popup-placement-right,
  &.va-popup-placement-rightTop,
  &.va-popup-placement-rightBottom {
    padding-left: 12px;
  }
  &.va-popup-placement-left,
  &.va-popup-placement-leftTop,
  &.va-popup-placement-leftBottom {
    padding-right: 12px;
  }
  .menu-tooltip-card {
    max-width: 250px;
    min-height: 32px;
    padding: 6px 8px;
    font-size: 14px;
    line-height: 1.5714285714285714;
    color: #fff;
    word-break: break-word;
    background-color: var(--menu-tooltip-background);
    border-radius: 6px;
    box-shadow:
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
  }
  .menu-tooltip-arrow {
    position: absolute;
    z-index: 9;
    display: block;
    pointer-events: none;
    width: 16px;
    height: 16px;
    overflow: hidden;
    transition: top 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 16px;
      height: 8px;
      background-color: var(--menu-tooltip-background);
      clip-path: path(
        'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
      );
      content: '';
    }
    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      width: 8.970562748477143px;
      height: 8.970562748477143px;
      margin: auto;
      border-radius: 0 0 2px 0;
      transform: translateY(50%) rotate(-135deg);
      box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
      z-index: -1;
      background: transparent;
      content: '';
    }
  }
  &.va-popup-placement-right .menu-tooltip-arrow,
  &.va-popup-placement-rightTop .menu-tooltip-arrow,
  &.va-popup-placement-rightBottom .menu-tooltip-arrow {
    top: calc(50% - 8px);
    left: 12px;
    transform: translateX(-100%) rotate(-90deg);
  }
  &.va-popup-placement-left .menu-tooltip-arrow,
  &.va-popup-placement-leftTop .menu-tooltip-arrow,
  &.va-popup-placement-leftBottom .menu-tooltip-arrow {
    top: calc(50% - 8px);
    right: 12px;
    transform: translateX(100%) rotate(90deg);
  }
  &.va-popup-placement-rightTop .menu-tooltip-arrow {
    top: 12px;
    transform: translateX(-100%) rotate(-90deg);
  }
  &.va-popup-placement-rightBottom .menu-tooltip-arrow {
    top: calc(100% - 28px);
    transform: translateX(-100%) rotate(-90deg);
  }
  &.va-popup-placement-leftTop .menu-tooltip-arrow {
    top: 12px;
    transform: translateX(100%) rotate(90deg);
  }
  &.va-popup-placement-leftBottom .menu-tooltip-arrow {
    top: calc(100% - 28px);
    transform: translateX(100%) rotate(90deg);
  }
}
.menu-wrap,
.menu-submenu-popup {
  .menu-submenu-list,
  .menu-item-group-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .menu-submenu-list {
    transition:
      background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .menu-submenu,
  .menu-item-group {
    margin: 0;
  }
  .menu-item-group-list {
    .menu-item,
    .menu-submenu-title {
      padding-left: 2em;
    }
  }
  .menu-item {
    position: relative;
    display: block;
    box-sizing: border-box;
    width: calc(100% - 8px);
    height: 40px;
    margin: 4px;
    padding: 0 16px;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--menu-color);
    border-radius: 8px;
    cursor: pointer;
    transition:
      color 0.3s,
      background-color 0.3s,
      border-color 0.3s,
      padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover,
    &.menu-item-active {
      color: var(--menu-item-hover-color);
      background-color: var(--menu-item-hover-background);
    }
    &.menu-item-selected {
      color: var(--menu-item-selected-color);
      background-color: var(--menu-item-selected-background);
    }
    &.menu-item-disabled {
      color: var(--menu-item-disabled-color);
      background-color: transparent;
      cursor: not-allowed;
      &:hover {
        color: var(--menu-item-disabled-color);
        background-color: transparent;
      }
    }
  }
  .menu-item,
  .menu-submenu-title {
    a,
    a:hover {
      color: inherit;
      text-decoration: none;
    }
    a::before {
      position: absolute;
      inset: 0;
      background-color: transparent;
      content: '';
    }
  }
  .menu-item-danger {
    color: var(--menu-item-danger-color);
  }
  .menu-item-danger:not(.menu-item-selected):not(.menu-item-disabled):hover,
  .menu-item-danger:not(.menu-item-selected):not(.menu-item-disabled).menu-item-active {
    color: var(--menu-item-danger-hover-color);
  }
  .menu-item-danger.menu-item-selected:not(.menu-item-disabled) {
    color: var(--menu-item-danger-selected-color);
    background-color: var(--menu-item-danger-selected-background);
  }
  .menu-item-group-title {
    padding: 8px 16px;
    font-size: 14px;
    line-height: 1.5714285714285714;
    color: var(--menu-group-title-color);
    transition: all 0.3s;
  }
  .menu-item-divider {
    margin: 1px 0;
    overflow: hidden;
    line-height: 0;
    border-bottom: 1px solid var(--menu-border-color);
    &.menu-item-divider-dashed {
      border-bottom-style: dashed;
    }
  }
  .menu-title-content {
    transition: color 0.3s;
  }
  .menu-item-icon {
    display: inline-flex;
    align-items: center;
    min-width: 14px;
    font-size: 14px;
    vertical-align: -0.125em;
    transition:
      font-size 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
      margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      color 0.3s;
    + .menu-title-content {
      margin-left: 10px;
      opacity: 1;
      transition:
        opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        margin 0.3s,
        color 0.3s;
    }
  }
  .menu-submenu {
    transition:
      border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      padding 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    &::after {
      display: table;
      content: '';
    }
  }
  .menu-submenu-title {
    position: relative;
    display: block;
    box-sizing: border-box;
    width: calc(100% - 8px);
    height: 40px;
    margin: 4px;
    padding: 0 34px 0 16px;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--menu-color);
    border-radius: 8px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      border-color 0.3s,
      padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      color: var(--menu-item-hover-color);
      background-color: var(--menu-item-hover-background);
    }
  }
  .menu-submenu-selected > .menu-submenu-title {
    color: var(--menu-item-selected-color);
  }
  .menu-submenu:not(.menu-submenu-disabled) > .menu-submenu-title:hover,
  .menu-submenu-active:not(.menu-submenu-disabled) > .menu-submenu-title {
    color: var(--menu-item-hover-color);
    background-color: var(--menu-item-hover-background);
  }
  .menu-submenu-disabled > .menu-submenu-title {
    color: var(--menu-item-disabled-color);
    cursor: not-allowed;
  }
  .menu-submenu-arrow {
    position: absolute;
    top: 50%;
    right: 16px;
    width: 10px;
    color: currentColor;
    transform: translateY(-50%);
    transition:
      transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      opacity 0.3s;
    &::before,
    &::after {
      position: absolute;
      width: 6px;
      height: 1.5px;
      background-color: currentColor;
      border-radius: 6px;
      transition:
        background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      content: '';
    }
    /* 默认指向右侧：纵向菜单与浮层内的子菜单共用 */
    &::before {
      transform: rotate(45deg) translateY(-2.5px);
    }
    &::after {
      transform: rotate(-45deg) translateY(2.5px);
    }
  }
}
.menu-wrap:not(.menu-horizontal),
.menu-submenu-popup {
  .menu-item:not(.menu-item-selected):not(.menu-item-disabled):active {
    background-color: var(--menu-item-selected-background);
  }
  .menu-item-danger.menu-item:not(.menu-item-selected):not(.menu-item-disabled):active {
    background-color: var(--menu-item-danger-active-background);
  }
  .menu-submenu:not(.menu-submenu-disabled) > .menu-submenu-title:active {
    background-color: var(--menu-item-selected-background);
  }
}
.menu-wrap.menu-inline {
  .menu-item,
  .menu-submenu-title {
    display: flex;
    align-items: center;
    transition:
      color 0.3s,
      background-color 0.3s,
      border-color 0.3s,
      padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    > .menu-title-content {
      flex: auto;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > * {
      flex: none;
    }
  }
}
.menu-wrap .menu-item.menu-item-selected,
.menu-submenu-popup .menu-item.menu-item-selected {
  transition:
    color 0.3s,
    border-color 0.3s,
    padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.menu-wrap.menu-inline .menu-item.menu-item-selected {
  transition:
    color 0.3s,
    border-color 0.3s,
    padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.menu-wrap.menu-inline .menu-submenu-list {
  background-color: var(--menu-inline-submenu-background);
}
.menu-wrap.menu-inline .menu-submenu .menu-submenu-arrow {
  &::before {
    transform: rotate(-45deg) translateX(2.5px);
  }
  &::after {
    transform: rotate(45deg) translateX(-2.5px);
  }
}
.menu-wrap.menu-inline .menu-submenu-open > .menu-submenu-title > .menu-submenu-arrow {
  transform: translateY(-2px);
  &::before {
    transform: rotate(45deg) translateX(2.5px);
  }
  &::after {
    transform: rotate(-45deg) translateX(-2.5px);
  }
}
.menu-submenu-popup {
  .menu-item,
  .menu-submenu-title {
    border-radius: 4px;
  }
}
.menu-wrap.menu-horizontal {
  > .menu-item,
  > .menu-submenu {
    position: relative;
    flex: none;
    height: auto;
    margin: calc(-1 * var(--menu-horizontal-active-bar-border-size)) 0 0;
    padding: 0 16px;
    line-height: inherit;
    width: auto;
    border-radius: 0;
    overflow: visible;
    &::after {
      position: absolute;
      display: block;
      right: 16px;
      bottom: 0;
      left: 16px;
      border-bottom: var(--menu-horizontal-active-bar-height) solid transparent;
      transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      content: '';
    }
  }
  /* 顶层普通项：悬浮/激活/选中即点亮下划线 */
  > .menu-item {
    &:hover::after,
    &.menu-item-active::after,
    &.menu-item-selected::after {
      border-bottom-color: var(--menu-item-selected-color);
    }
  }
  /* 顶层子菜单：悬浮/激活/展开/选中即点亮下划线 */
  > .menu-submenu {
    &:hover::after,
    &.menu-submenu-active::after,
    &.menu-submenu-open::after,
    &.menu-submenu-selected::after {
      border-bottom-color: var(--menu-item-selected-color);
    }
  }
  > .menu-item:hover,
  > .menu-item-active,
  > .menu-submenu > .menu-submenu-title:hover,
  > .menu-submenu-active > .menu-submenu-title {
    background-color: transparent;
  }
  > .menu-item.menu-item-selected,
  > .menu-submenu.menu-submenu-selected {
    background-color: var(--menu-horizontal-selected-background);
  }
  > .menu-submenu > .menu-submenu-title {
    height: 100%;
    margin: 0;
    padding: 0;
    line-height: inherit;
    width: auto;
    overflow: visible;
  }
  .menu-submenu-arrow {
    display: none;
  }
}
.menu-wrap.menu-dark.menu-horizontal {
  border-bottom: 0;
}
.menu-wrap.menu-horizontal > .menu-overflow-probe {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}
.menu-overflow-indicator {
  display: inline-block;
  vertical-align: -0.125em;
}
.menu-wrap.menu-inline-collapsed {
  width: var(--layout-sider-width, 80px);
  > .menu-item,
  > .menu-item-group > .menu-item-group-list > .menu-item,
  > .menu-item-group > .menu-item-group-list > .menu-submenu > .menu-submenu-title,
  > .menu-submenu > .menu-submenu-title {
    padding: 0 calc(50% - 12px);
    text-overflow: clip;
    .menu-submenu-arrow,
    .menu-submenu-expand-icon {
      opacity: 0;
    }
    .menu-item-icon {
      margin: 0;
      font-size: 16px;
      line-height: 40px;
      + .menu-title-content {
        display: inline-block;
        opacity: 0;
      }
    }
  }
  .menu-inline-collapsed-noicon {
    display: inline-block;
    font-size: 16px;
    line-height: 40px;
  }
  .menu-item-group-title {
    padding-inline: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.menu-wrap .menu-submenu-list.menu-motion-collapse-enter-active,
.menu-wrap .menu-submenu-list.menu-motion-collapse-leave-active {
  overflow: hidden;
  transition:
    height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
    opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.menu-zoom-enter,
.menu-zoom-leave {
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.menu-zoom-fast-enter,
.menu-zoom-fast-leave {
  animation-duration: 0.1s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.menu-zoom-fast-enter {
  scale: none;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.menu-zoom-fast-enter-active {
  animation-name: menu-zoom-in;
  animation-play-state: running;
}
.menu-zoom-fast-leave {
  animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.menu-zoom-fast-leave-active {
  animation-name: menu-zoom-out;
  animation-play-state: running;
}
.menu-slide-enter,
.menu-slide-leave {
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.menu-slide-enter {
  scale: 1 0.8;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
.menu-slide-enter-active {
  animation-name: menu-slide-in;
  animation-play-state: running;
}
.menu-slide-leave {
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
}
.menu-slide-leave-active {
  animation-name: menu-slide-out;
  animation-play-state: running;
}
@keyframes menu-slide-in {
  0% {
    scale: 1 0.8;
    opacity: 0;
  }
  100% {
    scale: 1;
    opacity: 1;
  }
}
@keyframes menu-slide-out {
  0% {
    scale: 1;
    opacity: 1;
  }
  100% {
    scale: 1 0.8;
    opacity: 0;
  }
}
.menu-zoom-enter {
  scale: none;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.menu-zoom-enter-active {
  animation-name: menu-zoom-in;
  animation-play-state: running;
}
.menu-zoom-leave {
  animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.menu-zoom-leave-active {
  animation-name: menu-zoom-out;
  animation-play-state: running;
}
@keyframes menu-zoom-in {
  0% {
    scale: 0.8;
    opacity: 0;
  }
  100% {
    scale: 1;
    opacity: 1;
  }
}
@keyframes menu-zoom-out {
  0% {
    scale: 1;
    opacity: 1;
  }
  100% {
    scale: 0.8;
    opacity: 0;
  }
}
</style>
