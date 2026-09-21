import { computed } from 'vue'
import type { ComputedRef } from 'vue'
/**
 * 浮层挂载点契约（同域模型）
 *
 * **为什么需要**：层叠关系本质是树 —— 甲类浮层只有在**承载层（Modal / Drawer / Dialog / Popup 面板）
 * 自身的层叠上下文内**，才谈得上「恒在承载层之上」；而「后出现者在上」只应作用在**没有承载关系的
 * 独立浮层之间**（多个弹窗、多个页面级下拉）。把这两件事编码进同一个 z 值序列必然冲突：容器重新
 * 出现时会越过自己的内部浮层（实测：`Select` 面板 1030 < 遮罩 1040 < 弹窗 1050），且容器关闭不
 * 卸载内容时，内部浮层还会以「已占层」的身份继续参与排序。
 *
 * **做法**：依次取**最近**的承载层节点（弹窗卡片 / 抽屉容器 / 浮层面板），都没有才回落 `body`：
 * 承载层在自己的**内容容器**上标记 `data-va-floating-mount`，甲类浮层以锚点就近查找该标记作为
 * `Teleport` 目标。
 *
 * **由此得到的性质**（不再依赖任何 z 值补丁）：
 * - 容器隐藏 → 浮层随之隐藏（同域，天然成立）；
 * - 容器位移 / 缩放动画 → 浮层随同域同步变化（如弹窗打开时下拉随卡片一起缩放）；
 * - 多层嵌套（Drawer ⊃ Modal ⊃ Select、Popover ⊃ Select）递归成立 —— 就近取到最内层容器；
 * - 未标记任何承载层（页面级浮层）→ 回落 `body`。
 *
 * 承载关系交给 CSS 之后，`useZIndex` 的职责收缩为「独立浮层之间的先后排序」，其契约不再与
 * 「子层必须在父层之上」冲突。
 */

/** 承载层内容容器上的挂载点标记（属性存在即代表「此处可挂浮层」） */
export const FLOATING_MOUNT_ATTR = 'data-va-floating-mount'

/** 挂载点选择器（由属性名派生，避免两处硬编码不一致） */
export const FLOATING_MOUNT_SELECTOR = `[${FLOATING_MOUNT_ATTR}]`

/**
 * 把浮层容器移到其父节点的末尾
 *
 * **为什么需要**：未传 `baseZIndex`（无层级分配器）时，同族同层级浮层的上下关系由 **DOM 顺序** 决定，
 * 而容器只在「**首次展示**」时被 `Teleport` 追加到目标末尾 —— 之后再怎么开合都不会改变顺序，
 * 于是层叠关系退化为「谁先打开过谁就在下」，而非「后打开者在上」。
 * 在每次「出现」时把容器移到末尾，可让 DOM 顺序**始终等于最近一次打开的顺序**，
 * 且不需要改动任何层级数值（默认层级表保持静态、可预测）。
 *
 * 就地渲染（`to: false`）时容器位于组件自身 DOM 内，移动会打乱组件内部结构，故调用方必须跳过。
 *
 * @param {HTMLElement | null | undefined} container 浮层容器（定位参照容器）
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
 * @param {HTMLElement | null | undefined} anchor 锚点元素（甲类浮层的触发器/锚点）
 * @returns {string | HTMLElement} Teleport 目标
 */
export function resolveFloatingMount(anchor: HTMLElement | null | undefined): string | HTMLElement {
  return anchor?.closest<HTMLElement>(FLOATING_MOUNT_SELECTOR) ?? 'body'
}

/**
 * 组合式函数
 * 解析甲类浮层的 `Teleport` 目标
 *
 * 优先级：**显式 `to`（含 `false` = 就地渲染）> 最近承载层内容容器 > `body`**。
 * 之所以要在模板表达式里逐次求值（而非一次性算出），是因为锚点元素与承载层容器都在挂载后才
 * 就绪：首次求值可能落到 `body`，容器元素出现后本函数会重新求值，`Teleport` 随之迁移到容器内。
 *
 * @param {() => HTMLElement | null | undefined} anchor 锚点元素 getter（触发器 / 面板锚点）
 * @param {() => string | HTMLElement | false | undefined} to 组件自身的 `to` prop getter
 * @returns {ComputedRef<string | HTMLElement | false>} `Teleport` 目标（`false` 表示就地渲染）
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
