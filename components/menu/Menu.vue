<script setup lang="ts">
import { cloneVNode, computed, isVNode, onBeforeUnmount, onMounted, provide, ref, useSlots, watch } from 'vue'
import type { CSSProperties, VNode, VNodeChild } from 'vue'
import { FLOATING_LAYER_Z_INDEX, useInject } from 'components/utils'
import MenuNodes from './MenuNodes'
import { menuContextKey } from './context'
import type { MenuContext } from './context'
import { splitOverflowItems } from './overflow'
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
  // >>>>> 双向绑定
  openKeys?: MenuKey[] // 当前展开的子菜单 key 数组
  selectedKeys?: MenuKey[] // 当前选中的菜单项 key 数组
  // >>>>> 内容数据
  items?: ItemType[] // 菜单内容
  // >>>>> 形态外观
  mode?: MenuMode // 菜单类型
  theme?: MenuTheme // 主题颜色
  inlineCollapsed?: boolean // inline 模式下是否收起（收起时子菜单改为浮层展开）
  inlineIndent?: number // inline 模式每一级菜单项的缩进宽度
  expandIcon?: (info: MenuExpandIconInfo) => VNodeChild // 自定义子菜单的展开收起图标
  // >>>>> 状态反馈
  disabled?: boolean // 是否禁用整个菜单
  selectable?: boolean // 是否允许选中
  multiple?: boolean // 是否允许多选
  // >>>>> 行为交互
  triggerSubMenuAction?: 'click' | 'hover' // 子菜单的展开触发方式
  subMenuOpenDelay?: number // 鼠标进入子菜单后开启的延时，单位秒
  subMenuCloseDelay?: number // 鼠标离开子菜单后关闭的延时，单位秒
}

export interface MenuSlots {
  expandIcon?: (info: MenuExpandIconInfo) => VNode[]
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
  subMenuCloseDelay: 0.1
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
const slots = useSlots()
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

// >>>>> 受控 / 非受控：传入即为受控，内部副本随外部同步
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

// >>>>> 模式归一：inline 收起后菜单退化为 vertical（子菜单改用浮层承载），样式与布局随之为同一套
const collapsed = computed(() => !!props.inlineCollapsed)
const mergedInlineCollapsed = computed(() => (props.mode === 'inline' || props.mode === 'vertical') && collapsed.value)
const mergedMode = computed<MenuMode>(() => (mergedInlineCollapsed.value ? 'vertical' : props.mode))
const isInlineMode = computed(() => mergedMode.value === 'inline')
const theme = computed(() => props.theme)

// >>>>> 水平溢出：放不下的菜单项收进「…」子菜单。起点由内核测量后回传，切分后的配置树参与
// 渲染与下方索引，故溢出子菜单对 keyPath、父级高亮、后代收起也与用户配置等价
const overflowStart = ref<number>(Number.POSITIVE_INFINITY)
const displayItems = computed<ItemType[]>(() =>
  props.mode === 'horizontal' ? splitOverflowItems(props.items, overflowStart.value) : props.items
)

// >>>>> 结构索引：key → 祖先链与是否为子菜单，供 keyPath、父级高亮、后代收起使用
// 索引建立在切分后的配置树上：溢出子菜单合成于根组件，其子项因此与平铺时同源
const keyMetaMap = computed(() => {
  const map = new Map<MenuKey, { parents: MenuKey[]; isSubMenu: boolean }>()
  const walk = (nodes: ItemType[], parents: MenuKey[]): void => {
    nodes.forEach((node) => {
      if (!node || ('type' in node && node.type === 'divider')) {
        return
      }
      if ('type' in node && node.type === 'group') {
        walk(node.children ?? [], parents)
        return
      }
      const isSubMenu = 'children' in node && Array.isArray(node.children)
      map.set(node.key, { parents, isSubMenu })
      if (isSubMenu) {
        walk((node as SubMenuType).children, [...parents, node.key])
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
// >>>>> 收起瞬间保留内嵌渲染：子菜单列表的收起动画要一个动画时长才播完，若当即换成浮层形态，
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

const expandIcon = computed<MenuContext['expandIcon']['value']>(() => {
  const fromSlot = slots.expandIcon
  const fromProp = props.expandIcon
  if (!fromSlot && !fromProp) {
    return undefined
  }
  // 插槽形态可能返回多个节点，故逐个补类名；类名挂在调用方传入的节点上，不额外包一层元素
  const withIconClass = (node: VNode): VNode => {
    const base = node.props?.class
    return cloneVNode(node, {
      class: typeof base === 'string' && base ? `${base} menu-submenu-expand-icon` : 'menu-submenu-expand-icon'
    })
  }
  return (info: MenuExpandIconInfo) => {
    const node = fromSlot ? fromSlot(info) : fromProp?.(info)
    if (Array.isArray(node)) {
      return node.map((item) => (isVNode(item) ? withIconClass(item) : item))
    }
    return isVNode(node) ? withIconClass(node) : (node as VNodeChild)
  }
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
  overflowStart,
  onOverflowChange: (start: number) => {
    overflowStart.value = start
  },
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
/* ============ 根列表 ============ */
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
  /* 收起态的宽度变化做过渡：内嵌菜单收起后靠「容器百分比」把内容居中，宽度若突变，图标会在一帧内瞬移 */
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1);
}
.menu-wrap.menu-horizontal {
  display: flex;
  flex-wrap: nowrap;
  /* 高度由行高推导（项不锁高）：消费方覆盖行高即可整体改高（如 Layout 头部 64px 的场景） */
  line-height: 46px;
  border-bottom: 1px solid var(--menu-border-color);
}
.menu-wrap.menu-vertical,
.menu-wrap.menu-inline {
  width: 100%;
}
/* 浅色纵向菜单的右边界：用于与内容区分离（横向菜单改由下边界表达，深色主题无此边界） */
.menu-wrap.menu-light.menu-vertical,
.menu-wrap.menu-light.menu-inline {
  border-right: 1px solid var(--menu-border-color);
}
/* 纵向 / 内嵌列表带 clearfix：使首尾菜单项的外边距被包含在列表盒内。展开收起的过渡态会给列表临时加
   `overflow: hidden`（此时外边距必然被包含），若列表常态允许外边距塌陷，「动画进行中」与「动画结束后」
   的盒高口径不同，就会在收尾瞬间出现列表高度与内容位置的跳变；水平模式是 flex 容器，
   本就不参与外边距塌陷，无需处理 */
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
/* ============ 弹出浮层 ============ */
.menu-submenu-popup {
  min-width: 160px;
  font-size: 14px;
  /* 面板被 Teleport 到根节点之外，字体、颜色、背景都要自带，不能依赖根列表继承 */
  line-height: 1.5714285714285714;
  color: var(--menu-color);
  background-color: var(--menu-background);
  border-radius: 8px;
  box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
/* 收起态的标题提示：只做信息补足，故不接管指针事件，避免遮挡相邻菜单项的悬浮判定 */
.menu-tooltip-popup {
  pointer-events: none;
  .menu-tooltip-card {
    max-width: 250px;
    min-height: 32px;
    padding: 6px 8px;
    font-size: 14px;
    line-height: 1.5714285714285714;
    color: #fff;
    word-break: break-word;
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 6px;
    box-shadow:
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
  }
}
/* ============ 列表与菜单项（根列表、弹出面板内的列表共用同一套） ============ */
.menu-wrap,
.menu-submenu-popup {
  .menu-submenu-list,
  .menu-item-group-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  /* 子列表容器的底色与内边距随形态（内嵌子菜单 ↔ 浮层）切换，带过渡避免收起态切换时的底色突变 */
  .menu-submenu-list {
    transition:
      background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  /* 分组列表内的项比分组标题（左内边距 16px）再进一档：取两倍字号，使两者形成层次 */
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
    /* 左右各留 4px：菜单项的背景 / 选中态不贴容器边缘（弹出浮层以标题右边缘定位，间距随之对齐） */
    width: calc(100% - 8px);
    height: 40px;
    margin: 4px;
    padding: 0 16px;
    line-height: 40px;
    white-space: nowrap;
    /* 溢出裁切：常态让过长标题显示省略号；收起态则由它承接「标题被裁切滑出」的观感（见 inline 收起态） */
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--menu-color);
    border-radius: 8px;
    cursor: pointer;
    /* padding 过渡与形态相关：纵向 / 水平取 0.3s 缓入缓出，内嵌形态另有更短的覆盖（见后文） */
    transition:
      color 0.3s,
      background-color 0.3s,
      border-color 0.3s,
      padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      color: var(--menu-item-hover-color);
      background-color: var(--menu-item-hover-background);
    }
    &.menu-item-selected {
      color: var(--menu-item-selected-color);
      background-color: var(--menu-item-selected-background);
    }
    &.menu-item-disabled {
      /* 禁用时不保留选中 / 悬浮底色：底色是「可交互」的视觉语言，禁用态继续呈现会误导为可点击 */
      color: var(--menu-item-disabled-color);
      background-color: transparent;
      cursor: not-allowed;
      &:hover {
        color: var(--menu-item-disabled-color);
        background-color: transparent;
      }
    }
  }
  /* 内容中的链接交由项级接管：`<a>` 自带的浏览器 / 站点级样式会盖掉项级状态 —— 字色另取一套
     （选中 / 悬浮 / 禁用失效），且消费方若没有页面级链接重置，链接还会带上默认装饰线 */
  .menu-item,
  .menu-submenu-title {
    a,
    a:hover {
      color: inherit;
      text-decoration: none;
    }
    /* 链接铺满整项：`<a>` 是行内元素，默认只有文字区域是链接热区，点击项的其余区域只会切换选中
       而不触发跳转；`::before` 覆盖层以最近的定位祖先（项 / 标题）为基准铺满整项 */
    a::before {
      position: absolute;
      inset: 0;
      background-color: transparent;
      content: '';
    }
  }
  /* 危险项：常态字色取错误色 */
  .menu-item-danger {
    color: var(--menu-item-danger-color);
  }
  /* 危险项悬浮：字色单独取色（仅非选中态；深色下比常态更亮） */
  .menu-item-danger:not(.menu-item-selected):not(.menu-item-disabled):hover {
    color: var(--menu-item-danger-hover-color);
  }
  /* 危险项选中：底色取错误色系，不与普通项的选中底色同色（禁用项不参与，仍走禁用口径） */
  .menu-item-danger.menu-item-selected:not(.menu-item-disabled) {
    color: var(--menu-item-danger-selected-color);
    background-color: var(--menu-item-danger-selected-background);
  }
  .menu-item-group-title {
    padding: 8px 16px;
    font-size: 14px;
    line-height: 1.5714285714285714;
    color: var(--menu-group-title-color);
    /* 收起态会改内边距，故过渡覆盖全部可变属性，避免分组标题在收起瞬间跳位 */
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
  .menu-item-icon {
    /* 图标盒按内容取高：若退化为行内块，收起态的行高会把图标盒撑到 40px，图标因此比同行的文字低 2px */
    display: inline-flex;
    align-items: center;
    min-width: 14px;
    font-size: 14px;
    vertical-align: -0.125em;
    /* 图标在收起态会改字号与边距（见 inline 收起态），带过渡才不会瞬变 */
    transition:
      font-size 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
      margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      color 0.3s;
    /* 图标与标题的间距挂在标题侧：收起过程中标题淡出，其位置不随图标边距收缩而漂移 */
    + .menu-title-content {
      margin-left: 10px;
      opacity: 1;
      transition:
        opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        margin 0.3s,
        color 0.3s;
    }
  }
  /* 子菜单盒带零高表格盒，挡住标题下外边距塌陷出盒：否则「子菜单 → 其后菜单项」的间距会比
     普通项之间少 4px */
  .menu-submenu {
    /* 子菜单盒自身的底色 / 内边距在形态切换时变化，带过渡避免收起瞬间突变 */
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
    /* 右侧预留箭头的位置（箭头贴右 16px、宽 10px） */
    padding: 0 34px 0 16px;
    line-height: 40px;
    white-space: nowrap;
    /* 与菜单项同口径：标题过长显示省略号，收起态由它承接裁切滑出（箭头为绝对定位，不受裁切影响） */
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--menu-color);
    border-radius: 8px;
    cursor: pointer;
    /* 与菜单项同口径 */
    transition:
      color 0.3s,
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
  .menu-submenu-disabled > .menu-submenu-title {
    color: var(--menu-item-disabled-color);
    cursor: not-allowed;
  }
  /* 箭头由两条短斜线拼成，指向靠「旋转方向 + 平移方向」两两互换来表达，故过渡落在伪元素上：
     整体旋转会让两段线一同翻转（画面上像整块翻个），与两段线各自翻转的观感不同 */
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
/* ============ 按下反馈 ============ */
/* 未选中项在鼠标按下的瞬间呈现选中底色，作为「按下」的即时反馈；水平模式由下划线表达状态、
   禁用项不参与交互反馈，两者均排除 */
.menu-wrap:not(.menu-horizontal),
.menu-submenu-popup {
  .menu-item:not(.menu-item-selected):not(.menu-item-disabled):active {
    background-color: var(--menu-item-selected-background);
  }
  /* 危险项的底色取错误色系，不与普通项的选中底色同色 */
  .menu-item-danger.menu-item:not(.menu-item-selected):not(.menu-item-disabled):active {
    background-color: var(--menu-item-danger-active-background);
  }
  .menu-submenu:not(.menu-submenu-disabled) > .menu-submenu-title:active {
    background-color: var(--menu-item-selected-background);
  }
}
/* 内嵌形态的项与标题：弹性布局 + 更短的 padding 过渡（纵向 / 水平取共享规则里的 0.3s 缓入缓出）。
   标题占满剩余空间并在自身内部裁切 —— 宽度不足时标题宽度可收缩到 0，整行不再溢出、也就不会
   出现「内容被压成省略号」；图标与箭头（绝对定位）不参与伸缩，按交叉轴居中 */
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
/* ============ 选中底色的落脚 ============ */
/* 选中底色的变化不做过渡：点击浮层内的菜单项会随即收起浮层，底色若仍处于 0.3s 渐变中，收起的
   全过程都看不到选中效果。此处只覆盖「选中态」的过渡声明，未选中态的 hover 底色过渡不受影响 */
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
/* 内嵌子菜单的底色只属于 inline 形态：浮层内的列表若沿用该底色，会以不透明块盖住面板圆角（面板
   看起来成直角）并在面板内叠出一块更深的底色；浮层自身已有面板底色，无需再叠一层 */
.menu-wrap.menu-inline .menu-submenu-list {
  background-color: var(--menu-inline-submenu-background);
}
/* 内嵌菜单的箭头改为指向下方，展开后转向上方 */
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
/* 浮层内菜单项用更小的圆角，与面板自身的圆角形成层次（须在共享规则之后覆盖） */
.menu-submenu-popup {
  .menu-item,
  .menu-submenu-title {
    border-radius: 4px;
  }
}
/* ============ 水平模式 ============ */
.menu-wrap.menu-horizontal {
  > .menu-item,
  > .menu-submenu {
    position: relative;
    /* 不参与伸缩：宽度即内容宽度，空间不足时由溢出省略收进「…」子菜单，而非压缩文字 */
    flex: none;
    /* 不锁高：高度随行高（根列表的 line-height，可被消费方内联覆盖）推导 */
    height: auto;
    /* 上移 1px：使选中态的 2px 下划线正好压在容器底边上 */
    margin: -1px 0 0;
    padding: 0 16px;
    line-height: inherit;
    width: auto;
    border-radius: 0;
    /* 水平项不由自身裁切内容（与子菜单标题同口径） */
    overflow: visible;
    /* 选中 / 悬浮 / 展开用下划线表达：子菜单盒另有「零高表格盒」的 `::after`，此处必须显式声明为
       块级，否则被表格布局接管、宽度算成 0，任何状态都看不到这条下划线 */
    &::after {
      position: absolute;
      display: block;
      right: 16px;
      bottom: 0;
      left: 16px;
      border-bottom: 2px solid transparent;
      transition: border-color 0.3s;
      content: '';
    }
  }
  > .menu-item:hover::after,
  > .menu-submenu:hover::after,
  > .menu-submenu-open::after,
  > .menu-submenu-selected::after {
    border-bottom-color: var(--menu-item-selected-color);
  }
  > .menu-item-selected::after {
    border-bottom-color: var(--menu-item-selected-color);
  }
  /* 水平模式不用底色表达状态：悬浮态由下划线承接，选中态由下划线 + 字色承接 */
  > .menu-item-selected,
  > .menu-item:hover,
  > .menu-submenu > .menu-submenu-title:hover {
    background-color: transparent;
  }
  > .menu-submenu > .menu-submenu-title {
    height: 100%;
    margin: 0;
    padding: 0;
    /* 与同级菜单项同口径：高度随行高推导 */
    line-height: inherit;
    /* 宽度取内容宽度：继承项级的「右留白 8px」会让标题比内容窄 8px，溢出的指示图标（宽 1em）
       因而被裁成一个点 */
    width: auto;
    /* 水平项不由自身裁切内容：放不下的项由溢出省略收进「…」子菜单承担 */
    overflow: visible;
  }
  /* 箭头在水平模式下由样式表隐藏：结构上仍保留，避免两种形态结构分叉 */
  .menu-submenu-arrow {
    display: none;
  }
}
/* ============ 水平溢出 ============ */
/* 测量探针：与真实菜单项同构（同图标、同标题内容、同内边距），脱离文档流且不可见，仅用于按内容宽度
   判定溢出。绝对定位使宽度取内容宽度，与不参与伸缩的菜单项口径一致 */
.menu-wrap.menu-horizontal > .menu-overflow-probe {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}
.menu-overflow-indicator {
  vertical-align: -0.125em;
}
/* ============ inline 收起态 ============ */
/* 收起后内容盒按「容器一半 − 半个图标盒」留白，图标落在容器中线上；标题与箭头改为淡出而非移除 ——
   两者保留占位，由菜单项的 overflow 裁切，宽度收窄时会呈现「内容被裁切滑出」的观感（直接移除是瞬跳） */
.menu-wrap.menu-inline-collapsed {
  width: 80px;
  /* 只处理一级项（含分组内的一级项）：更深层级在收起态不会内嵌呈现，其间距由浮层自行承担 */
  > .menu-item,
  > .menu-item-group > .menu-item-group-list > .menu-item,
  > .menu-item-group > .menu-item-group-list > .menu-submenu > .menu-submenu-title,
  > .menu-submenu > .menu-submenu-title {
    padding: 0 calc(50% - 12px);
    /* 收起态只做裁切、不出省略号：内容本身就是「离心」的，省略号会浮在图标旁显得脏 */
    text-overflow: clip;
    .menu-submenu-arrow {
      opacity: 0;
    }
    .menu-item-icon {
      margin: 0;
      font-size: 16px;
      line-height: 40px;
      /* 图标后的标题一并淡出，只留图标居中 */
      + .menu-title-content {
        display: inline-block;
        opacity: 0;
      }
    }
  }
  /* 无图标的一级项在收起态以标题首字兜底 */
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
/* ============ 过渡与动画 ============ */
/* 展开 / 收起进行中，「高度 + 透明度」的过渡必须压过列表自身的「底色 + 内边距」过渡（两者同时命中
   同一元素），故选择器锚定到列表本身并带上级类提高优先级 —— 不使用 `!important` */
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
