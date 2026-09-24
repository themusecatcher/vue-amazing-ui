import { defineComponent, h, inject, onBeforeUnmount, ref, watch } from 'vue'
import type { InjectionKey, PropType, Ref, VNode } from 'vue'
import Popup from 'components/popup'
import { FLOATING_LAYER_Z_INDEX } from 'components/utils'
import type { MenuOption } from './Dropdown.vue'
/**
 * 下拉菜单渲染（内部模块 · 渲染函数实现）
 *
 * 为什么是 `.ts` 而不是 `.vue`：菜单需**递归渲染任意层级**，而递归要求每级子菜单
 * 自持状态（标题元素引用 + 开合态），这只有组件形态才能表达。但产物契约不允许在同目录新增 `.vue` ——
 * `build/generate-style-entries.ts` 只把 `<组件名>.css` 注入样式入口，同目录私有 SFC 的 CSS 会**无人引用**
 * （按需引入静默缺样式）。`.ts` 辅助模块是 `development/component-design.md` §单组件目录的辅助文件
 * 明示允许的形态（同 `ModalRenderHost.ts`）。
 *
 * 由此带来的样式归属：渲染函数创建的 VNode **不带** `Dropdown.vue` 的 scope id（Vue 仅在组件自身 render
 * 期通过 `createBaseVNode` 的 `scopeId: currentScopeId` 打标），故菜单内容样式写在 `Dropdown.vue` 的
 * **全局** `<style>` 块内，并以 `.dropdown-overlay` 收口 —— 与该文件「面板壳 / 箭头 / 动画走全局」同因。
 *
 * 子菜单：每级都是独立的浮层面板（复用 `Popup` 宿主），锚点取本级标题元素，方向 `rightTop`
 * 并开启翻转。
 */
/** 菜单上下文：`Dropdown` provide，任意层级菜单项 / 子菜单 inject（避免逐层透传 props） */
export interface DropdownMenuContext {
  /** `label` 插槽渲染（返回空数组表示未提供，回退 `option.label`） */
  renderLabel: (option: MenuOption) => VNode[] | undefined
  /** 菜单项（非子菜单标题）被点击 */
  onSelect: (option: MenuOption) => void
  /** 浮层是否展开：面板常驻不卸载，主浮层关闭时据此收起子菜单 */
  isOpen: Ref<boolean>
}
export const DROPDOWN_MENU_KEY: InjectionKey<DropdownMenuContext> = Symbol('dropdownMenu')
/** 子菜单收起延迟（毫秒）：为「标题 → 子面板」之间的空隙移动留出时间，避免掠过即收起 */
const SUBMENU_HIDE_DELAY = 100
/**
 * 加载指示符
 *
 * 按项目既有惯例内联 SVG 图标代码（同 `Select` 的 close-circle、`DropdownButton` 的省略号），
 * 不引入图标运行时依赖；每次调用返回新 VNode，避免同一 VNode 实例在多个菜单项间复用。
 */
function renderLoadingIcon(): VNode {
  return h(
    'svg',
    {
      class: 'dropdown-menu-item-loading',
      focusable: 'false',
      'data-icon': 'loading',
      width: '1em',
      height: '1em',
      fill: 'currentColor',
      'aria-hidden': 'true',
      viewBox: '0 0 1024 1024'
    },
    [
      h('path', {
        d: 'M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z'
      })
    ]
  )
}
/**
 * 子菜单展开图标
 *
 * 按项目既有惯例内联 SVG 图标代码，不引入图标运行时依赖。
 */
function renderExpandIcon(): VNode {
  return h(
    'svg',
    {
      class: 'dropdown-menu-item-arrow-icon',
      focusable: 'false',
      'data-icon': 'right',
      width: '1em',
      height: '1em',
      fill: 'currentColor',
      'aria-hidden': 'true',
      viewBox: '64 64 896 896'
    },
    [
      h('path', {
        d: 'M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z'
      })
    ]
  )
}
/**
 * 渲染菜单项文本：`label` 插槽优先，未提供（或渲染为空）时回退 `option.label`
 */
function renderItemLabel(option: MenuOption, context: DropdownMenuContext | null): VNode[] | string | undefined {
  const slotLabel = context?.renderLabel(option)
  return slotLabel?.length ? slotLabel : option.label
}
/**
 * 渲染菜单项内容（图标 / 加载指示符 + 文本 + 可选尾部节点）
 *
 * 普通项与子菜单标题共用：差异仅在尾部节点（子菜单多一个展开箭头）与挂载点，故由调用方给出
 * `tail`（尾部节点）与 `elementProps`（子菜单标题追加 `ref` 与开合事件）。
 */
function renderItemContent(
  option: MenuOption,
  context: DropdownMenuContext | null,
  tail: VNode | null,
  elementProps: Record<string, unknown> = {}
): VNode {
  const iconNode = option.loading ? renderLoadingIcon() : option.icon
  return h(
    option.href ? 'a' : 'div',
    {
      ...elementProps,
      class: 'dropdown-menu-item-content',
      href: option.href,
      target: option.href ? option.target : undefined
    },
    [
      iconNode ? h('span', { class: 'dropdown-menu-item-icon' }, [iconNode]) : null,
      h('span', { class: 'dropdown-menu-item-label' }, renderItemLabel(option, context)),
      tail
    ]
  )
}
/** 渲染普通菜单项（含链接项）：整项可点，禁用 / 危险态由类名表达 */
function renderItem(option: MenuOption, index: number, context: DropdownMenuContext | null): VNode {
  return h(
    'li',
    {
      key: option.key ?? index,
      class: [
        'dropdown-menu-item',
        {
          'dropdown-menu-item-disabled': option.disabled,
          'dropdown-menu-item-danger': option.danger
        }
      ],
      role: 'menuitem',
      onClick: () => context?.onSelect(option)
    },
    [renderItemContent(option, context, null)]
  )
}
/** 渲染菜单项集合（普通项 / 分割线 / 分组 / 子菜单） */
function renderOptions(options: MenuOption[], context: DropdownMenuContext | null): VNode[] {
  return options.map((option, index) => {
    const type = option.type ?? 'item'
    if (type === 'divider') {
      return h('li', { key: option.key ?? index, class: 'dropdown-menu-divider', role: 'separator' })
    }
    if (type === 'group') {
      return h('li', { key: option.key ?? index, class: 'dropdown-menu-group', role: 'presentation' }, [
        h('div', { class: 'dropdown-menu-group-title' }, renderItemLabel(option, context)),
        h('ul', { class: 'dropdown-menu-group-list' }, renderOptions(option.children ?? [], context))
      ])
    }
    if (option.children?.length) {
      return h(DropdownSubMenu, { key: option.key ?? index, option })
    }
    return renderItem(option, index, context)
  })
}
/**
 * 子菜单（内部组件 · 递归）
 *
 * 每级子菜单自持「标题元素引用 + 开合态」，并以独立 `Popup` 浮层承载子项列表（递归渲染 `DropdownMenu`）。
 * 开合语义：标题移入展开、移出延迟收起（移入子面板即取消）、标题点击切换、
 * 禁用项不响应。挂载点由 `Popup` 依锚点就近解析 —— 子面板因此挂进**父面板内部**（`data-va-floating-mount`
 * 由父面板声明），层级关系由 CSS 包含关系表达，不经层级分配器与父面板争层级。
 */
const DropdownSubMenu = defineComponent({
  name: 'DropdownSubMenu',
  props: {
    option: { type: Object as PropType<MenuOption>, required: true }
  },
  setup(props) {
    const context = inject(DROPDOWN_MENU_KEY, null)
    const titleRef = ref<HTMLElement | null>(null) // 子菜单浮层的锚点（标题内容元素）
    const submenuOpen = ref<boolean>(false)
    let hideTimer: ReturnType<typeof setTimeout> | null = null
    function clearHideTimer(): void {
      if (hideTimer !== null) {
        clearTimeout(hideTimer)
        hideTimer = null
      }
    }
    function openSubMenu(): void {
      if (props.option.disabled) return
      clearHideTimer()
      submenuOpen.value = true
    }
    function closeSubMenu(): void {
      clearHideTimer()
      submenuOpen.value = false
    }
    function scheduleClose(): void {
      clearHideTimer()
      hideTimer = setTimeout(() => {
        hideTimer = null
        submenuOpen.value = false
      }, SUBMENU_HIDE_DELAY)
    }
    function toggleSubMenu(): void {
      if (props.option.disabled) return
      clearHideTimer()
      submenuOpen.value = !submenuOpen.value
    }
    // 主浮层收起时同步收起子菜单：面板常驻（v-show）不卸载，若不同步，重新展开下拉时会带着「上次遗留的展开子菜单」
    if (context) {
      watch(context.isOpen, (open) => {
        if (!open) {
          closeSubMenu()
        }
      })
    }
    onBeforeUnmount(clearHideTimer)
    return () => {
      const { option } = props
      const title = renderItemContent(
        option,
        context,
        h('span', { class: 'dropdown-menu-item-arrow' }, [renderExpandIcon()]),
        {
          ref: titleRef,
          onMouseenter: openSubMenu,
          onMouseleave: scheduleClose,
          onClick: toggleSubMenu
        }
      )
      return h(
        'li',
        {
          class: [
            'dropdown-menu-item',
            'dropdown-menu-item-submenu',
            {
              'dropdown-menu-item-disabled': option.disabled,
              'dropdown-menu-item-danger': option.danger
            }
          ],
          role: 'menuitem',
          'aria-expanded': submenuOpen.value ? 'true' : 'false'
        },
        [
          title,
          h(
            Popup,
            {
              show: submenuOpen.value,
              anchor: titleRef.value,
              placement: 'rightTop',
              flip: true,
              shift: true,
              offset: 12,
              arrow: false,
              panelClass: 'dropdown-overlay dropdown-submenu-overlay',
              defaultZIndex: FLOATING_LAYER_Z_INDEX.select,
              transitionProps: submenuTransitionProps,
              onMouseenter: openSubMenu,
              onMouseleave: scheduleClose
            },
            { default: () => h(DropdownMenu, { options: option.children ?? [] }) }
          )
        ]
      )
    }
  }
})
/**
 * 子菜单过渡配置
 *
 * 只动独立变换属性 `scale` 与 `opacity`：定位写在独立属性 `translate` 上（复合链最外层，不受缩放影响），
 * 缩放原点由定位内核依实际方向给出（`rightTop` → 左上角）。
 * 缓动分进出场：enter 用 `motionEaseOutCirc`、leave 用 `motionEaseInOutCirc`。
 */
const submenuTransitionProps = {
  name: 'dropdown-zoom',
  enterFromClass: 'dropdown-zoom-enter',
  enterActiveClass: 'dropdown-zoom-enter',
  enterToClass: 'dropdown-zoom-enter dropdown-zoom-enter-active',
  leaveFromClass: 'dropdown-zoom-leave',
  leaveActiveClass: 'dropdown-zoom-leave dropdown-zoom-leave-active',
  leaveToClass: 'dropdown-zoom-leave dropdown-zoom-leave-active'
}
/** 下拉菜单（内部组件）：菜单项列表容器，递归自引用以支持任意层级 */
export const DropdownMenu = defineComponent({
  name: 'DropdownMenu',
  props: {
    options: { type: Array as PropType<MenuOption[]>, default: () => [] }
  },
  setup(props) {
    const context = inject(DROPDOWN_MENU_KEY, null)
    return () => h('ul', { class: 'dropdown-menu', role: 'menu' }, renderOptions(props.options, context))
  }
})
