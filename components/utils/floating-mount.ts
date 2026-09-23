import { computed } from 'vue'
import type { ComputedRef } from 'vue'

/**
 * 浮层挂载点契约（同域模型）
 *
 * 层叠关系本质是一棵树：甲类浮层（锚点跟随型，如 `Select` 面板）只有在**承载层**
 * （Modal / Drawer / Dialog / Popup 面板）自身的层叠上下文内，才谈得上「恒在承载层之上」；
 * 而「后出现者在上」只应作用于**没有承载关系的独立浮层之间**。把两者编码进同一个 z 值序列必然冲突，
 * 故用 DOM 承载关系表达前者：
 *
 * 承载层在自己的**内容容器**上标记 `data-va-floating-mount`，甲类浮层以锚点就近查找该标记作为
 * `Teleport` 目标。由此（无需任何 z 值补丁）天然获得：容器隐藏 / 位移 / 缩放动画时浮层同步跟随；
 * 嵌套（Drawer ⊃ Modal ⊃ Select）逐层就近命中；未命中任何承载层（页面级浮层）则回落 `body`。
 *
 * 承载关系交给 CSS 后，`useZIndex` 的职责收缩为「独立浮层之间的先后排序」，不再与
 * 「子层必须在父层之上」冲突。
 */

/** 承载层内容容器上的挂载点标记（属性存在即代表「此处可挂浮层」） */
export const FLOATING_MOUNT_ATTR = 'data-va-floating-mount'

/** 挂载点选择器（由属性名派生，避免两处硬编码不一致） */
export const FLOATING_MOUNT_SELECTOR = `[${FLOATING_MOUNT_ATTR}]`

/**
 * 把浮层容器移到其父节点的末尾
 *
 * 未传 `baseZIndex`（无层级分配器）时，同族浮层的上下关系由 **DOM 顺序** 决定，而容器只在**首次展示**
 * 时被 `Teleport` 追加到目标末尾、之后开合不再改变顺序 —— 层叠关系会退化为「谁先打开过谁在下」。
 * 每次「出现」时移到末尾，即可让 DOM 顺序始终等于最近一次打开的顺序，且无需改动任何层级数值。
 *
 * 就地渲染（`to: false`）时容器位于组件自身 DOM 内，移动会打乱组件内部结构，调用方必须跳过。
 *
 * @param container - 浮层容器（定位参照容器）
 */
export function raiseFloatingOrder(container: HTMLElement | null | undefined): void {
  const parent = container?.parentNode
  if (!container || !parent || parent.lastElementChild === container) {
    return
  }
  parent.appendChild(container)
}

/**
 * 由锚点解析浮层挂载点
 *
 * 沿锚点的 DOM 祖先链就近查找承载层标记：命中即挂进该容器（处于其层叠上下文内），
 * 未命中（页面级浮层）则回落 `'body'`。
 *
 * @param anchor - 锚点元素（甲类浮层的触发器/锚点）
 * @returns Teleport 目标
 */
export function resolveFloatingMount(anchor: HTMLElement | null | undefined): string | HTMLElement {
  return anchor?.closest<HTMLElement>(FLOATING_MOUNT_SELECTOR) ?? 'body'
}

/**
 * 组合式函数：解析甲类浮层的 `Teleport` 目标
 *
 * 优先级：**显式 `to`（含 `false` = 就地渲染）> 最近承载层内容容器 > `body`**。
 * 用 computed 逐次求值（而非一次性算出），是因为锚点与承载层容器都在挂载后才就绪：
 * 首次可能落到 `body`，容器出现后本函数重新求值，`Teleport` 随之迁移。
 *
 * @param anchor - 锚点元素 getter（触发器 / 面板锚点）
 * @param to - 组件自身的 `to` prop getter
 * @returns `Teleport` 目标（`false` 表示就地渲染）
 */
export function useFloatingTeleportTarget(
  anchor: () => HTMLElement | null | undefined,
  to: () => string | HTMLElement | false | undefined
): ComputedRef<string | HTMLElement | false> {
  return computed(() => {
    const explicit = to()
    // 显式指定优先：false 就地渲染；字符串（标签名 / 选择器）或元素按用户意图挂载
    if (explicit !== undefined) {
      return explicit
    }
    return resolveFloatingMount(anchor())
  })
}
