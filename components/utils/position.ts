import { ref, nextTick } from 'vue'
import type { Ref } from 'vue'
/**
 * 组合式函数（定位测量层）
 *
 * 为所有弹出类组件（Select / AutoComplete / Tooltip 等）提供统一的测量骨架，只负责「量」，
 * 不负责「往哪弹」：
 * - 定位容器查询：从面板元素向上找到最近的非 static 祖先（getPositionedContainer），
 *   作为面板绝对定位的参照坐标系；
 * - 矩形测量：在 nextTick 后统一测量定位容器与触发器的视口矩形，消除各组件重复的测量样板。
 *
 * 职责边界：翻转算法、对齐几何等「定位决策」因组件需求不同，刻意保留在各组件层
 * （如 Tooltip 支持四轴翻转、Select 仅垂直翻转），本函数不参与决策；
 * 遮挡边界的「测量」不属定位决策——三处逻辑完全一致，统一由下方 getShelterRect 提供。
 *
 * @param {Ref<HTMLElement | null>} contentRef 触发器内容元素
 * @param {Ref<HTMLElement | null>} panelRef 弹出面板（同时作为 getPositionedContainer 的查询起点）
 * @returns {{ positionedContainerRect: Ref<DOMRect | undefined>, contentRect: Ref<DOMRect | undefined>, measure: () => Promise<void> }} 返回定位容器与内容元素的测量矩形及测量方法
 */
export function useFloatingPosition(
  contentRef: Ref<HTMLElement | null>,
  panelRef: Ref<HTMLElement | null>
): {
  positionedContainerRect: Ref<DOMRect | undefined>
  contentRect: Ref<DOMRect | undefined>
  measure: () => Promise<void>
} {
  const positionedContainer = ref<HTMLElement | null>(null) // 弹出框相对定位的容器元素
  const positionedContainerRect = ref<DOMRect>() // positionedContainer 元素的大小及其相对于视口的位置
  const contentRect = ref<DOMRect>() // 内容元素的大小及其相对于视口的位置

  // 获取弹出框相对定位的容器元素
  function getPositionedContainer(): void {
    let parentElement = panelRef.value?.parentElement
    while (parentElement) {
      if (parentElement === document.documentElement) {
        positionedContainer.value = document.documentElement
        return
      }
      const { position } = getComputedStyle(parentElement)
      if (position !== 'static') {
        positionedContainer.value = parentElement
        return
      }
      parentElement = parentElement.parentElement
    }
  }

  // 在 nextTick 后测量定位容器与内容元素的视口矩形
  async function measure(): Promise<void> {
    await nextTick()
    getPositionedContainer()
    positionedContainerRect.value = positionedContainer.value?.getBoundingClientRect() as DOMRect
    contentRect.value = contentRef.value?.getBoundingClientRect() as DOMRect
  }

  return { positionedContainerRect, contentRect, measure }
}

/**
 * 获取遮挡边界矩形
 *
 * 仅当可滚动父元素真正裁剪弹出层（即弹出层挂载在该容器内）时，才以其为界，否则以视口为界。
 * 修复：弹出层 Teleport 到 body / 具名容器时不受中间滚动容器 overflow 裁剪，flip 边界应为视口，
 * 避免空间充足却意外翻转。
 *
 * 返回四条边供各组件按需取用（Tooltip 需要四轴，Select / AutoComplete 只用上下边界）；
 * 视口尺寸由调用方从 useScrollParent 取得后传入，与各组件既有的测量来源保持一致。
 *
 * @param scrollTarget 最近的可滚动父元素（来自 useScrollParent），为 null 时以视口为界
 * @param panel 弹出层元素，用于判断是否真的被 scrollTarget 裁剪
 * @param viewportWidth 视口宽度
 * @param viewportHeight 视口高度
 * @returns {{ top: number, left: number, bottom: number, right: number }} 遮挡边界矩形相对视口的四条边
 */
export function getShelterRect(
  scrollTarget: HTMLElement | null,
  panel: HTMLElement | null,
  viewportWidth: number,
  viewportHeight: number
): { top: number; left: number; bottom: number; right: number } {
  // 以视口为界的兜底：可滚动父元素不存在、其自身即视口（documentElement）、
  // 或并未真正包含弹出层（弹出层 Teleport 到 body / 具名容器时不受中间滚动容器 overflow 裁剪）
  const viewportRect = { top: 0, left: 0, bottom: viewportHeight, right: viewportWidth }
  if (!scrollTarget || scrollTarget === document.documentElement || !scrollTarget.contains(panel)) {
    return viewportRect
  }
  const { top, left, bottom, right } = scrollTarget.getBoundingClientRect()
  return {
    top: top < 0 ? 0 : top,
    left: left < 0 ? 0 : left,
    bottom: bottom > viewportHeight ? viewportHeight : bottom,
    right: right > viewportWidth ? viewportWidth : right
  }
}
