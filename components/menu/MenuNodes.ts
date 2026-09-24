import {
  Transition,
  cloneVNode,
  computed,
  defineComponent,
  h,
  inject,
  isVNode,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  shallowReactive,
  withDirectives,
  vShow
} from 'vue'
import type { CSSProperties, ComponentPublicInstance, PropType, TransitionProps, VNode, VNodeChild } from 'vue'
import Popup from 'components/popup'
import { useResizeObserver } from 'components/utils'
import { getItemKey, menuContextKey } from './context'
import type { ItemType, MenuIcon, MenuItemGroupType, MenuItemType, MenuKey, MenuNode, SubMenuType } from './interface'
import { flattenOverflowItems, renderOverflowIndicator } from './overflow'

/**
 * 菜单节点渲染内核（内部组件，不对外导出）
 *
 * 按 `items` 配置递归产出列表：根列表与各级子列表共用同一份实现，差异只在层级与容器类名。
 * 菜单级状态（选中 / 展开 / 主题）经 `MenuContext` 注入取得，内核自身只持有与 DOM 相关的临时状态
 * （浮层锚点、延时计时器、收起态的悬浮项）。
 *
 * 水平模式的根列表额外承担溢出省略：按与菜单项同构的隐藏探针量出各项宽度，算出放不下的起点并
 * 回传给根组件，由其把放不下的项切分进「…」子菜单（见 `Menu` 的 `overflowStart`）。
 */

/** 子菜单列表（内嵌与浮层内同构）与分组列表的容器类名 */
const SUBMENU_LIST_CLASS = 'menu-submenu-list'
const GROUP_LIST_CLASS = 'menu-item-group-list'

/** 分组标题的缩进步长：小于菜单项的 inlineIndent，使分组标题与其下菜单项在视觉上分出层次 */
const GROUP_TITLE_INDENT = 16

/**
 * 弹出浮层的间距
 *
 * 向外弹出的一对取值（水平菜单 `[0, 8]`、其余 `[10, 0]`），
 * 消费方按弹出方向取同轴分量（向下取后者、向右取前者）。
 */
const POPUP_GAP = { horizontal: 8, vertical: 10 } as const

/** 收起态标题提示与锚点之间的距离 */
const TOOLTIP_GAP = 10

/**
 * 弹出浮层的过渡
 *
 * 类名与关键帧统一带 `menu-` 前缀：过渡类由浮层宿主落在面板上（无法用选择器作用域收口），
 * 前缀可避免与宿主页面 / 动画库的裸名撞名。
 */
const POPUP_TRANSITION: TransitionProps = {
  name: 'menu-zoom',
  enterFromClass: 'menu-zoom-enter',
  enterActiveClass: 'menu-zoom-enter',
  enterToClass: 'menu-zoom-enter menu-zoom-enter-active',
  leaveFromClass: 'menu-zoom-leave',
  leaveActiveClass: 'menu-zoom-leave menu-zoom-leave-active',
  leaveToClass: 'menu-zoom-leave menu-zoom-leave-active'
}

/** 内嵌子菜单展开收起：先落定像素高度，再由过渡推进到目标高度（`auto` 无法参与过渡） */
function setCollapseHeight(el: Element): void {
  const node = el as HTMLElement
  node.style.overflow = 'hidden'
  node.style.height = `${node.scrollHeight}px`
}

function onCollapseEnter(el: Element): void {
  const node = el as HTMLElement
  node.style.height = '0px'
  node.style.opacity = '0'
  // 读一次布局属性强制同步样式，使「0 → 内容高度」的过渡有明确的起点
  void node.scrollHeight
  setCollapseHeight(node)
  node.style.opacity = '1'
}

function onCollapseLeave(el: Element): void {
  setCollapseHeight(el)
  const node = el as HTMLElement
  void node.scrollHeight
  node.style.height = '0px'
  node.style.opacity = '0'
}

function onCollapseAfter(el: Element): void {
  const node = el as HTMLElement
  node.style.removeProperty('height')
  node.style.removeProperty('opacity')
  node.style.removeProperty('overflow')
}

export default defineComponent({
  name: 'MenuNodes',
  props: {
    nodes: { type: Array as PropType<ItemType[]>, default: () => [] },
    level: { type: Number, default: 1 }, // 节点所处层级，决定 inline 缩进宽度
    parentKeys: { type: Array as PropType<MenuKey[]>, default: () => [] }, // 祖先 key 链，用于组装 keyPath
    isRoot: { type: Boolean, default: false } // 是否为根列表：决定是否输出根类名与模式 / 主题类名
  },
  setup(props) {
    const injected = inject(menuContextKey)
    if (!injected) {
      throw new Error('[Menu] 菜单节点渲染内核必须在 Menu 内部使用')
    }
    const menu = injected
    // 锚点表为响应式：元素在首次渲染的 ref 回调里才登记，浮层的首次定位（已展开态）必须在其后重跑，
    // 否则浮层会按「无锚点」定位在原点（页面左上角）
    const titleEls = shallowReactive(new Map<MenuKey, HTMLElement>()) // 子菜单标题元素：弹出浮层的定位锚点
    const itemEls = shallowReactive(new Map<MenuKey, HTMLElement>()) // 菜单项元素：收起态标题提示的定位锚点
    const closeTimers = new Map<MenuKey, ReturnType<typeof setTimeout>>() // 子菜单延时开合计时器
    const hoverKey = ref<MenuKey | null>(null) // 当前悬浮的菜单项（仅收起态用于标题提示）
    // >>>>> 水平溢出省略（仅根列表生效）
    const overflowEnabled = computed(() => props.isRoot && menu.mode.value === 'horizontal')
    const containerEl = ref<HTMLElement | null>(null) // 根列表元素：取容器可用宽度
    const probeEls = new Map<number, HTMLElement>() // 探针元素，键为原始顺序下标
    let indicatorEl: HTMLElement | null = null // 溢出指示项的探针：判定溢出时需为其留出宽度
    let fontsReadyAttached = false // 字体就绪回调每实例至多挂一次
    onBeforeUnmount(() => {
      closeTimers.forEach((timer) => clearTimeout(timer))
      closeTimers.clear()
    })

    /** 渲染标题 / 文本配置：渲染函数直接求值，其余形态原样交给 Vue */
    function renderValue(value: MenuNode): VNodeChild {
      return typeof value === 'function' ? (value as () => VNodeChild)() : value
    }

    /** 渲染图标：渲染函数入参为所在项的配置；图标类名挂在传入节点上，不额外包一层元素 */
    function renderIcon(icon: MenuIcon | undefined, item: MenuItemType | SubMenuType): VNode | null {
      if (icon === undefined || icon === null || icon === false) {
        return null
      }
      const node = typeof icon === 'function' ? icon(item) : icon
      if (!isVNode(node)) {
        return null
      }
      const base = node.props?.class
      const merged = typeof base === 'string' && base ? `${base} menu-item-icon` : 'menu-item-icon'
      return cloneVNode(node, { class: merged })
    }

    /** inline 模式按层级缩进；其余模式的间距由样式表统一给出 */
    function indentStyle(level: number): CSSProperties | undefined {
      return menu.mode.value === 'inline' ? { paddingLeft: `${level * menu.inlineIndent.value}px` } : undefined
    }

    /** 分组标题的缩进步长小于菜单项（视觉上与所属层级的菜单项区分开） */
    function groupIndentStyle(level: number): CSSProperties | undefined {
      return menu.mode.value === 'inline' ? { paddingLeft: `${level * GROUP_TITLE_INDENT}px` } : undefined
    }

    /**
     * 溢出测量探针
     *
     * 与真实菜单项同构：同图标、同标题内容、同内边距；但不带交互、不登记锚点、不进 key 体系。
     * 绝对定位且不可见，宽度即内容宽度，与不参与伸缩的菜单项口径一致。
     */
    function renderProbe(node: ItemType, index: number): VNode | null {
      // 分组与分割线没有可比宽的内容，不参与溢出判定
      if (!node || ('type' in node && (node.type === 'divider' || node.type === 'group'))) {
        return null
      }
      return renderProbeShell(`menu-overflow-probe-${index}`, (el) => setProbeEl(index, el), [
        renderIcon(node.icon, node),
        h('span', { class: 'menu-title-content' }, [renderValue(node.label)])
      ])
    }

    /** 溢出指示项的探针：判定溢出时需为其预留宽度 */
    function renderIndicatorProbe(): VNode {
      return renderProbeShell(
        'menu-overflow-probe-indicator',
        (el) => {
          indicatorEl = el instanceof HTMLElement ? el : null
        },
        [h('span', { class: 'menu-title-content' }, [renderOverflowIndicator()])]
      )
    }

    /** 探针外壳：与菜单项共用类名以获得同样的内边距与排版，仅元素引用回调不同 */
    function renderProbeShell(
      key: string,
      setEl: (el: Element | ComponentPublicInstance | null) => void,
      children: VNodeChild[]
    ): VNode {
      return h('li', { key, class: ['menu-item', 'menu-overflow-probe'], 'aria-hidden': 'true', ref: setEl }, children)
    }

    /** 面板样式：浮层脱离根节点，主题色变量需随面板一并带入 */
    function panelStyle(): CSSProperties {
      return {
        '--menu-primary-color': menu.primaryColor.value,
        '--menu-primary-palette-1': menu.primaryPalette.value
      } as CSSProperties
    }

    function clearCloseTimer(key: MenuKey): void {
      const timer = closeTimers.get(key)
      if (timer !== undefined) {
        clearTimeout(timer)
        closeTimers.delete(key)
      }
    }

    /** 悬浮展开：仅弹出型子菜单受延时控制，inline 的展开由点击驱动 */
    function scheduleOpen(key: MenuKey, disabled: boolean): void {
      if (disabled || menu.mode.value === 'inline' || menu.triggerSubMenuAction.value !== 'hover') {
        return
      }
      clearCloseTimer(key)
      const delay = menu.subMenuOpenDelay.value * 1000
      if (delay > 0) {
        closeTimers.set(
          key,
          setTimeout(() => menu.onOpenChange(key, true), delay)
        )
      } else {
        menu.onOpenChange(key, true)
      }
    }

    /** 离开收起：延时留出「移入浮层」的过渡时间，移入浮层时会取消该计时 */
    function scheduleClose(key: MenuKey, disabled: boolean): void {
      if (disabled || menu.mode.value === 'inline' || menu.triggerSubMenuAction.value !== 'hover') {
        return
      }
      clearCloseTimer(key)
      closeTimers.set(
        key,
        setTimeout(() => menu.onOpenChange(key, false), menu.subMenuCloseDelay.value * 1000)
      )
    }

    function setTitleEl(key: MenuKey, el: Element | ComponentPublicInstance | null): void {
      if (el instanceof HTMLElement) {
        titleEls.set(key, el)
      } else {
        titleEls.delete(key)
      }
    }

    function setItemEl(key: MenuKey, el: Element | ComponentPublicInstance | null): void {
      if (el instanceof HTMLElement) {
        itemEls.set(key, el)
      } else {
        itemEls.delete(key)
      }
    }

    function setProbeEl(index: number, el: Element | ComponentPublicInstance | null): void {
      if (el instanceof HTMLElement) {
        probeEls.set(index, el)
      } else {
        probeEls.delete(index)
      }
    }

    /**
     * 测量溢出起点
     *
     * 逐项累加探针宽度，找到「再放一项就装不下（含为指示项预留的宽度）」的下标作为溢出起点；
     * 全部装得下则回传 `Infinity`。根组件据此切分配置树，未变化时不回传，避免无谓渲染。
     */
    function measureOverflow(): void {
      if (!overflowEnabled.value) {
        return
      }
      const container = containerEl.value
      const available = container?.clientWidth ?? 0
      if (!available) {
        return
      }
      const nodes = flattenOverflowItems(props.nodes)
      const widths = nodes.map((_, index) => probeEls.get(index)?.offsetWidth ?? 0)
      const total = widths.reduce((sum, width) => sum + width, 0)
      let next = Number.POSITIVE_INFINITY
      if (total > available) {
        const indicatorWidth = indicatorEl?.offsetWidth ?? 0
        let used = 0
        next = nodes.length
        for (let index = 0; index < widths.length; index += 1) {
          used += widths[index]
          if (used + indicatorWidth > available) {
            next = index
            break
          }
        }
      }
      if (next !== menu.overflowStart.value) {
        menu.onOverflowChange(next)
      }
    }

    // 溢出判定依赖真实布局，故在挂载后、每次更新后与容器尺寸变化时各测一次；字体就绪会改变文字宽度，
    // 同样需要复测（字体就绪回调每实例至多挂一次）
    useResizeObserver(containerEl, () => measureOverflow())
    onMounted(() => {
      measureOverflow()
      if (!fontsReadyAttached && typeof document !== 'undefined') {
        fontsReadyAttached = true
        document.fonts?.ready
          .then(() => measureOverflow())
          .catch(() => {
            // 字体就绪检测失败时跳过本次复测：字体宽度属乐观增强，不影响已有测量结果
          })
      }
    })
    onUpdated(() => measureOverflow())

    function renderMenuItem(node: MenuItemType, index: number, level: number, parentKeys: MenuKey[]): VNode {
      const key = getItemKey(node, index)
      const keyPath = [...parentKeys, key]
      const disabled = menu.disabled.value || !!node.disabled
      const collapsed = menu.inlineCollapsed.value
      const iconNode = renderIcon(node.icon, node)
      // 收起态只保留图标；无图标时以标题首字兜底，避免整项只剩空白
      const showNoIcon = collapsed && level === 1 && !iconNode && typeof node.label === 'string'
      const content = showNoIcon
        ? h('div', { class: 'menu-inline-collapsed-noicon' }, (node.label as string).charAt(0))
        : h('span', { class: 'menu-title-content' }, [renderValue(node.label)])
      const tipText = collapsed && level === 1 ? (node.title ?? (typeof node.label === 'string' ? node.label : '')) : ''
      const itemEl = tipText ? itemEls.get(key) : undefined
      // 锚点未登记时先不渲染：提示浮层以锚点定位，无锚点会被定位到页面原点
      const tooltip =
        tipText && itemEl
          ? h(
              Popup,
              {
                show: hoverKey.value === key,
                anchor: itemEl,
                placement: 'right',
                offset: TOOLTIP_GAP,
                panelClass: 'menu-tooltip-popup',
                panelStyle: panelStyle(),
                defaultZIndex: menu.subMenuZIndex,
                transitionProps: POPUP_TRANSITION
              },
              { default: () => h('div', { class: 'menu-tooltip-card' }, tipText) }
            )
          : null
      return h(
        'li',
        {
          key,
          class: [
            'menu-item',
            {
              'menu-item-selected': menu.selectedKeys.value.includes(key),
              'menu-item-disabled': disabled,
              'menu-item-danger': !!node.danger
            },
            node.class
          ],
          style: { ...(node.style ?? {}), ...indentStyle(level) },
          role: 'menuitem',
          tabindex: disabled ? undefined : -1,
          title: node.title,
          'data-menu-id': key,
          'aria-disabled': disabled || undefined,
          ref: (el: Element | ComponentPublicInstance | null) => setItemEl(key, el),
          onClick: (event: MouseEvent) => {
            if (!disabled) {
              menu.onItemClick({ key, keyPath, item: node, domEvent: event })
            }
          },
          // 收起态才需要感知悬浮（承载标题提示），避免常态下每次悬浮都重渲染整个列表
          onMouseenter: () => {
            if (collapsed) {
              hoverKey.value = key
            }
          },
          onMouseleave: () => {
            if (hoverKey.value === key) {
              hoverKey.value = null
            }
          }
        },
        [iconNode, content, tooltip]
      )
    }

    function renderSubMenu(node: SubMenuType, index: number, level: number, parentKeys: MenuKey[]): VNode {
      const key = getItemKey(node, index)
      const keyPath = [...parentKeys, key]
      const disabled = menu.disabled.value || !!node.disabled
      const open = menu.openKeys.value.includes(key)
      // 收起瞬间仍按内嵌形态渲染一个动画时长，让子菜单列表播完收起动画再换成浮层形态（见根组件的
      // `retainingInline`）；其余场景一律按模式判定
      const inline = menu.mode.value === 'inline' || menu.retainingInline.value
      const horizontal = menu.mode.value === 'horizontal'
      // 弹出方向：水平菜单的一级子菜单向下弹出，其浮层内的更深层级改为向右弹出 —— 浮层内继续向下
      // 弹出会盖住浮层自身的内容
      const popupHorizontal = horizontal && keyPath.length === 1
      // 偏移与弹出方向同源（向下取纵轴间距、向右取横轴间距）：浮层内的子菜单虽属水平菜单，但其
      // 内容按纵向呈现（见上），间距口径因而随纵向取值，否则面板会与父面板贴边
      const popupOffsetPair =
        node.popupOffset ?? (popupHorizontal ? [0, POPUP_GAP.horizontal] : [POPUP_GAP.vertical, 0])
      const collapsed = menu.inlineCollapsed.value
      const theme = node.theme ?? menu.theme.value
      const iconNode = renderIcon(node.icon, node)
      const showNoIcon = collapsed && level === 1 && !iconNode && typeof node.label === 'string'
      const titleContent = showNoIcon
        ? h('div', { class: 'menu-inline-collapsed-noicon' }, (node.label as string).charAt(0))
        : h('span', { class: 'menu-title-content' }, [renderValue(node.label)])
      // 水平模式的箭头由样式表隐藏：与其它模式保持同一结构，避免结构差异带来额外的分支
      const arrow =
        !horizontal && menu.expandIcon.value
          ? menu.expandIcon.value({ ...node, isOpen: open })
          : h('i', { class: 'menu-submenu-arrow', 'aria-hidden': 'true' })
      const titleNode = h(
        'div',
        {
          class: 'menu-submenu-title',
          style: inline ? indentStyle(level) : undefined,
          role: 'menuitem',
          tabindex: disabled ? undefined : -1,
          'data-menu-id': key,
          'aria-expanded': open,
          'aria-haspopup': 'true',
          'aria-disabled': disabled || undefined,
          ref: (el: Element | ComponentPublicInstance | null) => setTitleEl(key, el),
          onClick: (event: MouseEvent) => {
            if (!disabled) {
              menu.onTitleClick(node, event)
            }
          }
        },
        [iconNode, titleContent, arrow]
      )
      const childList = h(
        'ul',
        { class: SUBMENU_LIST_CLASS, role: 'menu' },
        renderNodes(node.children, level + 1, keyPath)
      )
      const popupClass = ['menu-submenu-popup', `menu-${theme}`, node.popupClassName]
        .filter((item): item is string => !!item)
        .join(' ')
      const titleEl = inline ? undefined : titleEls.get(key)
      let childrenNode: VNode | null = null
      if (inline) {
        childrenNode = h(
          Transition,
          {
            name: 'menu-motion-collapse',
            appear: level === 1,
            onEnter: onCollapseEnter,
            onAfterEnter: onCollapseAfter,
            onLeave: onCollapseLeave,
            onAfterLeave: onCollapseAfter
          },
          { default: () => withDirectives(childList, [[vShow, open]]) }
        )
      } else if (titleEl) {
        // 锚点未登记时先不渲染浮层：面板定位以锚点为准，无锚点会被定位到页面原点
        childrenNode = h(
          Popup,
          {
            show: open,
            anchor: titleEl,
            placement: popupHorizontal ? 'bottomLeft' : 'rightTop',
            offset: popupOffsetPair[popupHorizontal ? 1 : 0],
            // 次轴不做自适应：面板相对标题的位置（向右展开时顶边对齐、向下展开时左边缘对齐）是子菜单
            // 的视觉契约，不随与视口的远近而改变（主轴方向与溢出仍由 flip / 内推处理）
            shift: false,
            matchTriggerWidth: popupHorizontal ? 'minWidth' : false,
            panelClass: popupClass,
            panelStyle: panelStyle(),
            defaultZIndex: menu.subMenuZIndex,
            transitionProps: POPUP_TRANSITION,
            // 移入浮层即取消收起计时：光标穿过锚点与面板之间的间隙时不应关闭
            onMouseenter: () => clearCloseTimer(key),
            onMouseleave: () => scheduleClose(key, disabled)
          },
          { default: () => childList }
        )
      }
      return h(
        'li',
        {
          key,
          class: [
            'menu-submenu',
            `menu-submenu-${menu.mode.value}`,
            {
              'menu-submenu-open': open,
              'menu-submenu-selected': menu.selectedSubMenuKeys.value.includes(key),
              'menu-submenu-disabled': disabled
            },
            node.class
          ],
          style: node.style,
          role: 'none',
          onMouseenter: () => scheduleOpen(key, disabled),
          onMouseleave: () => scheduleClose(key, disabled)
        },
        [titleNode, childrenNode]
      )
    }

    function renderItemGroup(node: MenuItemGroupType, index: number, level: number, parentKeys: MenuKey[]): VNode {
      return h(
        'li',
        {
          key: `menu-group-${index}`,
          class: ['menu-item-group', node.class],
          style: node.style,
          role: 'presentation',
          // 分组标题只是分组说明，点击它不应触达菜单的选中逻辑
          onClick: (event: MouseEvent) => event.stopPropagation()
        },
        [
          h(
            'div',
            {
              class: 'menu-item-group-title',
              style: groupIndentStyle(level),
              title: typeof node.label === 'string' ? node.label : undefined
            },
            [renderValue(node.label)]
          ),
          h('ul', { class: GROUP_LIST_CLASS, role: 'menu' }, renderNodes(node.children ?? [], level, parentKeys))
        ]
      )
    }

    function renderNode(node: ItemType, index: number, level: number, parentKeys: MenuKey[]): VNode | null {
      if (!node) {
        return null
      }
      if ('type' in node && node.type === 'divider') {
        return h('li', {
          key: `menu-divider-${index}`,
          class: ['menu-item-divider', { 'menu-item-divider-dashed': !!node.dashed }, node.class],
          style: node.style,
          role: 'separator'
        })
      }
      if ('type' in node && node.type === 'group') {
        return renderItemGroup(node, index, level, parentKeys)
      }
      // 配置里带 children（含空数组）即为子菜单：与「有子节点才可展开」的语义一致
      if ('children' in node && Array.isArray(node.children)) {
        return renderSubMenu(node, index, level, parentKeys)
      }
      return renderMenuItem(node, index, level, parentKeys)
    }

    function renderNodes(nodes: ItemType[], level: number, parentKeys: MenuKey[]): VNode[] {
      return nodes
        .map((node, index) => renderNode(node, index, level, parentKeys))
        .filter((node): node is VNode => !!node)
    }

    return () => {
      const classList: string[] = []
      if (props.isRoot) {
        classList.push('menu-wrap', 'menu-root', `menu-${menu.mode.value}`, `menu-${menu.theme.value}`)
        if (menu.inlineCollapsed.value) {
          classList.push('menu-inline-collapsed')
        }
      }
      const children = renderNodes(props.nodes, props.level, props.parentKeys)
      const overflow = overflowEnabled.value
      if (overflow) {
        // 探针按未切分的原始顺序渲染，宽度与渲染结果无关，因此切分前后都能量到每一项的宽度
        flattenOverflowItems(props.nodes).forEach((node, index) => {
          const probe = renderProbe(node, index)
          if (probe) {
            children.push(probe)
          }
        })
        children.push(renderIndicatorProbe())
      }
      return h(
        'ul',
        {
          class: classList,
          role: 'menu',
          ref: (el: Element | ComponentPublicInstance | null) => {
            containerEl.value = overflow && el instanceof HTMLElement ? el : null
          }
        },
        children
      )
    }
  }
})
