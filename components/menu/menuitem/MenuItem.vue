<script setup lang="ts">
import { computed, cloneVNode, isVNode, ref, watch, nextTick, onBeforeUnmount, onMounted } from 'vue'
import type { VNode } from 'vue'
import type { ItemType, MenuItemType, SubMenuType, MenuItemGroupType, MenuMotion } from '../menu/Menu.vue'

/**
 * Menu 内部递归渲染单元（P1：inline 内嵌模式 + P2：vertical/horizontal 弹出模式）
 * 根据 item 类型分发渲染：divider / group / submenu / item
 */
export interface Props {
  item: ItemType // 当前渲染的菜单数据项
  level?: number // 当前层级，从 1 开始，用于 inline 逐级缩进
  mode?: 'vertical' | 'horizontal' | 'inline' // 菜单模式
  theme?: 'light' | 'dark' // 主题色
  inlineCollapsed?: boolean // 是否收起状态（仅 mode='inline' 时生效）
  inlineIndent?: number // inline 模式每级缩进宽度，单位 px
  selectedKeys?: (string | number)[] // 当前选中的菜单项 key 数组
  openKeys?: (string | number)[] // 当前展开的 SubMenu key 数组
  selectedSubMenuKeys?: (string | number)[] // 选中项的祖先 SubMenu key（用于父级标题级联高亮）
  triggerSubMenuAction?: 'click' | 'hover' // 触发子菜单展开的行为（inline 恒为点击）
  subMenuOpenDelay?: number // 鼠标进入子菜单后开启延时，单位秒
  subMenuCloseDelay?: number // 鼠标离开子菜单后关闭延时，单位秒
  getPopupContainer?: (node: HTMLElement) => HTMLElement // 自定义弹出层挂载容器
  expandIcon?: VNode | ((info: { isOpen: boolean }) => VNode) // 自定义 SubMenu 展开图标（全局）
  forceSubMenuRender?: boolean // 子菜单未展开时也预渲染进 DOM
  motion?: MenuMotion // 动画配置，作用于 inline 展开/收起动画
}
const props = withDefaults(defineProps<Props>(), {
  level: 1,
  mode: 'vertical',
  theme: 'light',
  inlineCollapsed: false,
  inlineIndent: 24,
  selectedKeys: () => [],
  openKeys: () => [],
  selectedSubMenuKeys: () => [],
  triggerSubMenuAction: 'hover',
  subMenuOpenDelay: 0,
  subMenuCloseDelay: 0.1,
  getPopupContainer: undefined,
  expandIcon: undefined,
  forceSubMenuRender: false,
  motion: undefined
})
const emits = defineEmits(['select', 'open'])

// 判断当前项类型（配置式 antdvItemType 体系）
const itemType = computed<'divider' | 'group' | 'submenu' | 'item'>(() => {
  const type = (props.item as MenuDividerLike)?.type
  if (type === 'divider') return 'divider'
  if (type === 'group') return 'group'
  const children = (props.item as SubMenuType)?.children
  if (children?.length) return 'submenu'
  return 'item'
})
interface MenuDividerLike {
  type?: 'group' | 'divider'
  dashed?: boolean
}
const asItem = computed(() => props.item as MenuItemType)
const asSubMenu = computed(() => props.item as SubMenuType)
const asGroup = computed(() => props.item as MenuItemGroupType)
const asDivider = computed(() => props.item as MenuDividerLike)

// 获取子菜单标题文本（用于 collapsed 模式下 tooltip）
const subMenuTitle = computed(() => {
  const label = asSubMenu.value?.label
  return typeof label === 'string' ? label : (asSubMenu.value?.title ?? '')
})
// per-submenu theme 覆盖：submenu 指定 theme 时，其弹出层与子内容用该 theme（对齐 antdv submenu-theme）
const childTheme = computed<'light' | 'dark'>(() => asSubMenu.value?.theme ?? props.theme)

//当前 SubMenu 是否展开
const opened = computed(() => {
  const key = asSubMenu.value?.key
  return key !== undefined && props.openKeys?.includes(key)
})
// 当前 MenuItem 是否选中
const selected = computed(() => {
  const key = asItem.value?.key
  return key !== undefined && props.selectedKeys?.includes(key)
})
// 当前 SubMenu 是否级联高亮（其子孙项被选中，对齐 antdv selectedSubMenuKeys）
const subMenuSelected = computed(() => {
  const key = asSubMenu.value?.key
  return key !== undefined && props.selectedSubMenuKeys?.includes(key)
})
// 是否禁用
const disabled = computed(() => Boolean((props.item as MenuItemType | SubMenuType)?.disabled))
// 是否危险样式
const danger = computed(() => Boolean(asItem.value?.danger))
// 缩进（padding-left）：inline 模式按层级缩进；vertical/horizontal 固定 16px（对齐 antdv paddingInline）
const paddingLeft = computed(() => (props.mode === 'inline' ? props.level * props.inlineIndent : 16))

// 是否收起模式（collapse 时展示图标 + 弹出层，非 collapse 和 P2 popup 模式共用 Teleport popup 逻辑）
const isCollapsed = computed(() => props.inlineCollapsed === true)

// ---- P2：vertical/horizontal 弹出模式 ----
// 弹出层 ref 和标题 ref
const titleRef = ref<HTMLElement | null>(null)
const popupRef = ref<HTMLElement | null>(null)
const popupTop = ref(0)
const popupLeft = ref(0)
// 弹出层是否需要渲染（非 inline 模式 + 已展开）
const isPopupMode = computed(() => props.mode !== 'inline')
// 弹出层定位样式
const popupStyle = computed(() => {
  if (!isPopupMode.value) return {}
  return {
    position: 'fixed' as const,
    top: popupTop.value + 'px',
    left: popupLeft.value + 'px',
    zIndex: 1050
  }
})
// 触发方式
const isClickTrigger = computed(() => props.triggerSubMenuAction === 'click')

// 计算弹出层位置（默认偏移对齐 antdv：horizontal 下偏 8px、vertical 右偏 10px，per-item popupOffset 可覆盖）
function updatePopupPosition() {
  if (!titleRef.value || !opened.value) return
  const titleRect = titleRef.value.getBoundingClientRect()
  const popupOffset = asSubMenu.value?.popupOffset
  if (props.mode === 'horizontal') {
    popupTop.value = titleRect.bottom + (popupOffset?.[1] ?? 8)
    popupLeft.value = titleRect.left + (popupOffset?.[0] ?? 0)
  } else {
    // vertical 模式：弹出层在菜单项右侧，顶部对齐
    popupTop.value = titleRect.top + (popupOffset?.[1] ?? 0)
    popupLeft.value = titleRect.right + (popupOffset?.[0] ?? 10)
  }
}

// 弹出层可见性变化时更新位置
watch(opened, async (val) => {
  if (val && isPopupMode.value) {
    await nextTick()
    updatePopupPosition()
  }
})

// 点击外部关闭弹出层
function onDocumentClick(e: MouseEvent) {
  if (!opened.value || !isPopupMode.value) return
  const target = e.target as Node
  // 点击在标题或弹出层内则不关闭
  if (titleRef.value?.contains(target) || popupRef.value?.contains(target)) return
  emits('open', asSubMenu.value.key)
}

// 绑定/解绑 click-outside 事件
watch(
  () => opened.value && isPopupMode.value && isClickTrigger.value,
  (shouldBind) => {
    if (shouldBind) {
      // 延迟绑定，避免立即触发的 click 事件关闭弹出层
      setTimeout(() => document.addEventListener('click', onDocumentClick, true), 0)
    } else {
      document.removeEventListener('click', onDocumentClick, true)
    }
  }
)

// 滚动/窗口变化时更新位置
function onScrollOrResize() {
  if (opened.value && isPopupMode.value) {
    updatePopupPosition()
  }
}

// 绑定滚动和 resize 事件
watch(
  () => opened.value && isPopupMode.value,
  (shouldBind) => {
    if (shouldBind) {
      window.addEventListener('scroll', onScrollOrResize, true)
      window.addEventListener('resize', onScrollOrResize)
    } else {
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }
)

// hover 触发：open/close 各用独立延时（对齐 antdv subMenuOpenDelay/subMenuCloseDelay，单位秒）
let openTimer: ReturnType<typeof setTimeout> | null = null
let closeTimer: ReturnType<typeof setTimeout> | null = null
function clearHoverTimers() {
  if (openTimer) {
    clearTimeout(openTimer)
    openTimer = null
  }
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}
function onTitleMouseEnter(domEvent: MouseEvent) {
  // C2：SubMenu per-item hover 回调（独立于展开逻辑）
  if (!disabled.value) asSubMenu.value.onMouseenter?.({ key: asSubMenu.value.key, domEvent })
  if (disabled.value || !isPopupMode.value || isClickTrigger.value) return
  clearHoverTimers()
  openTimer = setTimeout(() => {
    if (!opened.value) emits('open', asSubMenu.value.key)
  }, props.subMenuOpenDelay * 1000)
}
function onTitleMouseLeave(domEvent: MouseEvent) {
  // C7：SubMenu per-item hover 回调
  if (!disabled.value) asSubMenu.value.onMouseleave?.({ key: asSubMenu.value.key, domEvent })
  if (!isPopupMode.value || isClickTrigger.value) return
  clearHoverTimers()
  closeTimer = setTimeout(() => {
    if (opened.value) emits('open', asSubMenu.value.key)
  }, props.subMenuCloseDelay * 1000)
}
function onPopupMouseEnter() {
  if (!isPopupMode.value || isClickTrigger.value) return
  clearHoverTimers()
}
function onPopupMouseLeave() {
  if (!isPopupMode.value || isClickTrigger.value) return
  clearHoverTimers()
  closeTimer = setTimeout(() => {
    if (opened.value) emits('open', asSubMenu.value.key)
  }, props.subMenuCloseDelay * 1000)
}

// 初始 openKeys 已包含当前 SubMenu（如收起菜单/子菜单主题初始展开）时补一次定位
// 修复 watch(opened) 仅响应变化的缺口，避免初始展开的弹出层定位在 (0,0)
onMounted(() => {
  if (opened.value && isPopupMode.value) {
    nextTick(updatePopupPosition)
  }
})

// 组件卸载时清理
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick, true)
  window.removeEventListener('scroll', onScrollOrResize, true)
  window.removeEventListener('resize', onScrollOrResize)
  clearHoverTimers()
})

// 渲染 icon：支持 VNode 或 () => VNode
function renderIcon(icon: unknown): VNode | null {
  if (!icon) return null
  if (typeof icon === 'function') {
    const vnode = (icon as () => VNode)()
    return isVNode(vnode) ? cloneVNode(vnode) : null
  }
  return isVNode(icon) ? cloneVNode(icon as VNode) : null
}
const itemIcon = computed(() => renderIcon((props.item as MenuItemType | SubMenuType)?.icon))

// B6：展开图标 —— per-item expandIcon 优先，其次全局 expandIcon，均无则用默认箭头
const expandIconVNode = computed<VNode | null>(() => {
  const custom = asSubMenu.value?.expandIcon ?? props.expandIcon
  if (!custom) return null
  const raw = typeof custom === 'function' ? custom({ isOpen: !!opened.value }) : custom
  return isVNode(raw) ? cloneVNode(raw) : null
})
// B5：弹出层挂载容器 —— getPopupContainer 返回值优先，默认 body
const popupContainer = computed<HTMLElement | string>(() => {
  if (props.getPopupContainer && titleRef.value) {
    return props.getPopupContainer(titleRef.value)
  }
  return 'body'
})

// B8：inline 展开动画配置 —— 默认内置 collapse 动画，motion 可覆盖 name/appear 等 Transition 属性
// 注意：enter/leave 等高度计算钩子由组件内部接管（显式绑定优先于 v-bind 对象）
const inlineMotion = computed(() => ({ name: 'menu-inline-collapse', ...props.motion }))

// label是否为纯字符串
function isStringLabel(label: unknown): label is string {
  return typeof label === 'string'
}

function onItemClick(domEvent: MouseEvent) {
  if (disabled.value) return
  emits('select', asItem.value.key, domEvent)
}
// C2/C7：普通菜单项 per-item hover 回调
function onItemMouseEnter(domEvent: MouseEvent) {
  if (disabled.value) return
  asItem.value.onMouseenter?.({ key: asItem.value.key, domEvent })
}
function onItemMouseLeave(domEvent: MouseEvent) {
  if (disabled.value) return
  asItem.value.onMouseleave?.({ key: asItem.value.key, domEvent })
}
function onSubMenuTitleClick(domEvent: MouseEvent) {
  if (disabled.value) return
  const key = asSubMenu.value.key
  emits('open', key)
  asSubMenu.value.onTitleClick?.({ key, domEvent })
}
// 向上冒泡子孙节点的 select / open 事件（透传 domEvent 供 per-item onClick）
function bubbleSelect(key: string | number, domEvent?: MouseEvent) {
  emits('select', key, domEvent)
}
function bubbleOpen(key: string | number) {
  emits('open', key)
}

// SubMenu 展开动画（复用 Collapse 的 height 过渡方案）
function setHeight(el: Element) {
  const dom = el as HTMLElement
  dom.style.height = dom.scrollHeight + 'px'
  dom.style.opacity = '1'
}
function clearHeight(el: Element) {
  const dom = el as HTMLElement
  dom.style.removeProperty('height')
  dom.style.removeProperty('opacity')
}
</script>
<template>
  <!-- 分割线 -->
  <li
    v-if="itemType === 'divider'"
    class="menu-divider"
    :class="[{ 'menu-divider-dashed': asDivider.dashed }, asItem.class]"
    :style="asItem.style"
  ></li>

  <!-- 分组 -->
  <li
    v-else-if="itemType === 'group'"
    class="menu-item-group"
    :class="[{ 'menu-item-group-collapsed': isCollapsed }, asGroup.class]"
    :style="asGroup.style"
  >
    <div v-if="!isCollapsed" class="menu-item-group-title" :style="{ paddingLeft: paddingLeft + 'px' }">
      <template v-if="isStringLabel(asGroup.label)">{{ asGroup.label }}</template>
      <component v-else :is="asGroup.label" />
    </div>
    <ul class="menu-item-group-list">
      <MenuItem
        v-for="(child, index) in asGroup.children"
        :key="index"
        :item="child"
        :level="level"
        :mode="mode"
        :theme="theme"
        :inline-collapsed="inlineCollapsed"
        :inline-indent="inlineIndent"
        :selected-keys="selectedKeys"
        :selected-sub-menu-keys="selectedSubMenuKeys"
        :open-keys="openKeys"
        :trigger-sub-menu-action="triggerSubMenuAction"
        :sub-menu-open-delay="subMenuOpenDelay"
        :sub-menu-close-delay="subMenuCloseDelay"
        :get-popup-container="getPopupContainer"
        :expand-icon="expandIcon"
        :force-sub-menu-render="forceSubMenuRender"
        :motion="motion"
        @select="bubbleSelect"
        @open="bubbleOpen"
      />
    </ul>
  </li>

  <!-- 子菜单 -->
  <li
    v-else-if="itemType === 'submenu'"
    class="menu-submenu"
    :class="[
      {
        'menu-submenu-open': opened,
        'menu-submenu-selected': subMenuSelected,
        'menu-submenu-collapsed': isCollapsed
      },
      asSubMenu.class
    ]"
    :style="asSubMenu.style"
  >
    <div
      ref="titleRef"
      class="menu-submenu-title"
      :class="{ 'menu-item-disabled': disabled, 'menu-submenu-title-collapsed': isCollapsed }"
      :style="{ paddingLeft: isCollapsed ? '' : paddingLeft + 'px' }"
      :title="isCollapsed ? subMenuTitle : asSubMenu.title"
      @click="isPopupMode || isCollapsed ? onSubMenuTitleClick($event) : onSubMenuTitleClick($event)"
      @mouseenter="onTitleMouseEnter"
      @mouseleave="onTitleMouseLeave"
    >
      <component v-if="itemIcon" class="menu-item-icon" :is="itemIcon" />
      <span v-if="!isCollapsed" class="menu-item-label">
        <template v-if="isStringLabel(asSubMenu.label)">{{ asSubMenu.label }}</template>
        <component v-else :is="asSubMenu.label" />
      </span>
      <span
        v-if="!isCollapsed"
        class="menu-submenu-arrow"
        :class="{ 'menu-submenu-arrow-open': opened && !expandIconVNode }"
      >
        <component v-if="expandIconVNode" :is="expandIconVNode" />
        <svg
          v-else
          focusable="false"
          data-icon="right"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
          ></path>
        </svg>
      </span>
    </div>
    <!-- P2：非 inline 模式使用弹出层（B7：forceSubMenuRender 时未展开也预渲染，display:none 隐藏） -->
    <Teleport v-if="isPopupMode && (opened || forceSubMenuRender)" :to="popupContainer">
      <div
        v-show="opened"
        ref="popupRef"
        class="menu-submenu-popup"
        :class="[
          asSubMenu.popupClassName,
          asSubMenu.rootClassName,
          `menu-popup-${childTheme}`,
          { 'menu-popup-horizontal': mode === 'horizontal' }
        ]"
        :style="popupStyle"
        @mouseenter="onPopupMouseEnter"
        @mouseleave="onPopupMouseLeave"
      >
        <ul class="menu-submenu-list">
          <MenuItem
            v-for="(child, index) in asSubMenu.children"
            :key="index"
            :item="child"
            :level="1"
            :mode="mode"
            :theme="childTheme"
            :inline-collapsed="false"
            :inline-indent="inlineIndent"
            :selected-keys="selectedKeys"
            :selected-sub-menu-keys="selectedSubMenuKeys"
            :open-keys="openKeys"
            :trigger-sub-menu-action="triggerSubMenuAction"
            :sub-menu-open-delay="subMenuOpenDelay"
            :sub-menu-close-delay="subMenuCloseDelay"
            :get-popup-container="getPopupContainer"
            :expand-icon="expandIcon"
            @select="bubbleSelect"
            @open="bubbleOpen"
          />
        </ul>
      </div>
    </Teleport>
    <!-- inline 模式使用内嵌展开 -->
    <Transition
      v-if="!isPopupMode"
      v-bind="inlineMotion"
      @enter="setHeight"
      @after-enter="clearHeight"
      @leave="setHeight"
      @after-leave="clearHeight"
    >
      <ul v-show="opened" class="menu-submenu-list">
        <MenuItem
          v-for="(child, index) in asSubMenu.children"
          :key="index"
          :item="child"
          :level="level + 1"
          :mode="mode"
          :theme="childTheme"
          :inline-collapsed="false"
          :inline-indent="inlineIndent"
          :selected-keys="selectedKeys"
          :selected-sub-menu-keys="selectedSubMenuKeys"
          :open-keys="openKeys"
          :trigger-sub-menu-action="triggerSubMenuAction"
          :sub-menu-open-delay="subMenuOpenDelay"
          :sub-menu-close-delay="subMenuCloseDelay"
          :get-popup-container="getPopupContainer"
          :expand-icon="expandIcon"
          :force-sub-menu-render="forceSubMenuRender"
          :motion="motion"
          @select="bubbleSelect"
          @open="bubbleOpen"
        />
      </ul>
    </Transition>
  </li>

  <!-- 普通菜单项 -->
  <li
    v-else
    class="menu-item"
    :class="[
      {
        'menu-item-selected': selected,
        'menu-item-disabled': disabled,
        'menu-item-danger': danger,
        'menu-item-collapsed': isCollapsed
      },
      asItem.class
    ]"
    :style="[{ paddingLeft: isCollapsed ? '' : paddingLeft + 'px' }, asItem.style]"
    :title="asItem.title"
    @click="onItemClick"
    @mouseenter="onItemMouseEnter"
    @mouseleave="onItemMouseLeave"
  >
    <component v-if="itemIcon" class="menu-item-icon" :is="itemIcon" />
    <span v-if="!isCollapsed" class="menu-item-label">
      <template v-if="isStringLabel(asItem.label)">{{ asItem.label }}</template>
      <component v-else :is="asItem.label" />
    </span>
  </li>
</template>
<style lang="less" scoped>
// 内嵌折叠动画（复用 Collapse 的 height + opacity 过渡方案）
.menu-inline-collapse-enter-active,
.menu-inline-collapse-leave-active {
  overflow: hidden;
  transition:
    height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
    opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.menu-inline-collapse-enter-from,
.menu-inline-collapse-leave-to {
  height: 0 !important;
  opacity: 0 !important;
}
.menu-item,
.menu-submenu-title {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  margin: 4px 0;
  padding-right: 16px;
  border-radius: 8px;
  white-space: nowrap;
  cursor: pointer;
  transition:
    border-color 0.3s,
    background 0.3s,
    color 0.3s,
    padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  .menu-item-icon {
    display: inline-flex;
    align-items: center;
    color: inherit;
    :deep(svg) {
      min-width: 14px;
      font-size: 14px;
      transition:
        font-size 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
        margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        color 0.3s;
    }
  }
  .menu-item-label {
    flex: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.3s;
  }
  .menu-item-icon + .menu-item-label {
    margin-left: 10px;
  }
  :deep(a) {
    color: inherit;
  }
}
.menu-submenu-arrow {
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  font-size: 12px;
  :deep(svg) {
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
.menu-submenu-arrow-open {
  :deep(svg) {
    transform: rotate(90deg);
  }
}
.menu-item:hover,
.menu-submenu-title:hover {
  background-color: var(--menu-item-hover-bg, rgba(0, 0, 0, 0.06));
}
.menu-item-selected {
  color: var(--menu-primary-color);
  background-color: var(--menu-item-active-bg, #e6f4ff);
  &:hover {
    background-color: var(--menu-item-active-bg, #e6f4ff);
  }
}
.menu-submenu-selected {
  > .menu-submenu-title {
    color: var(--menu-primary-color);
  }
}
.menu-item-danger {
  color: var(--menu-danger-color, #ff4d4f);
  &.menu-item-selected {
    color: var(--menu-danger-color, #ff4d4f);
    background-color: var(--menu-danger-active-bg, #fff2f0);
  }
  &:hover {
    color: var(--menu-danger-color, #ff4d4f);
  }
}
.menu-item-disabled {
  color: rgba(0, 0, 0, 0.25) !important;
  cursor: not-allowed;
  &:hover {
    background-color: transparent !important;
  }
  .menu-item-icon,
  .menu-item-label {
    color: inherit !important;
  }
}
.menu-item-group-title {
  height: 38px;
  padding-right: 16px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 38px;
  transition: all 0.3s;
}
.menu-item-group-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.menu-submenu-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.menu-divider {
  height: 1px;
  margin: 4px 0;
  padding: 0;
  overflow: hidden;
  line-height: 0;
  background-color: rgba(5, 5, 5, 0.06);
}
.menu-divider-dashed {
  height: 0;
  background: none;
  border-top: 1px dashed rgba(5, 5, 5, 0.06);
}

// P2：非 inline 模式弹出层样式（间距/圆角对齐 antdv：容器 padding 0，项 margin 4px、圆角 4px）
.menu-submenu-popup {
  background: #fff;
  border-radius: 8px;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  padding: 0;
  min-width: 160px;
  .menu-submenu-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .menu-item,
  .menu-submenu-title {
    margin: 4px;
    border-radius: 4px;
  }
  .menu-item-group-title {
    padding-left: 16px;
  }
}
// popup dark 主题
.menu-popup-dark {
  background: #001529;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  :deep(.menu-item),
  :deep(.menu-submenu-title) {
    color: rgba(255, 255, 255, 0.65);
  }
  :deep(.menu-item-selected) {
    color: #fff;
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
// horizontal 模式弹出层（与菜单栏之间有 8px 偏移，四角均为 8px 圆角，对齐 antdv）
.menu-popup-horizontal {
  border-radius: 8px;
}

// P3：inlineCollapsed 收起模式
.menu-item-collapsed {
  justify-content: center;
  padding: 0 !important;
  .menu-item-icon {
    margin-right: 0;
  }
}
.menu-submenu-collapsed {
  .menu-submenu-title {
    justify-content: center;
    padding: 0 !important;
    .menu-item-icon {
      margin-right: 0;
    }
  }
}
.menu-submenu-title-collapsed {
  justify-content: center;
}
</style>
